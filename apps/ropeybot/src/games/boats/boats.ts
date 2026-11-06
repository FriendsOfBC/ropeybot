import { randomBytes } from "node:crypto";
import {
    API_Connector,
    CommandParser,
    API_Character,
    BC_Server_ChatRoomMessage,
    AssetGet,
    importBundle,
    offerBCPlusContract,
    parseBCPlusContract,
    type BCPlusContract,
} from "bc-bot";
import { WebServer, type WebRequest, type WebResponse } from "../../webserver";
import {
    BOARD_SIZE,
    BOAT_LENGTHS,
    parsePlacements,
    randomPlacements,
    renderPlacementPage,
    type BoatPlacement,
} from "./placementPage";
import { decompressFromBase64 } from "lz-string";
import { wait } from "../../hub/utils";

const DISCONNECT_TIMEOUT_MS = 2 * 60 * 1000;
const BOT_POSITION = { X: 39, Y: 0 };
const GRID_ORIGIN_P1 = { X: 4, Y: 25 };
const GRID_ORIGIN_P2 = { X: 15, Y: 25 };

export interface BoatsConfig {
    // Public base URL of the web server, eg. https://example.com/
    baseUrl: string;
    // Port the web server listens on
    port: number;
}

const PLAYER_TITLES = [
    "Dread Captain",
    "Fearless Buccaneer",
    "Daring Corsair",
    "Privateer",
    "Admiral",
];

const BOAT_NAMES: Record<number, string> = {
    1: "Dinghy",
    2: "Pirate Ship",
    3: "Subbiemarine",
    4: "Kinky Cruise Ship",
    5: "Carrier",
};

interface BoatsPlayer {
    memberNumber: number;
    name: string;
    token: string;
    placement?: BoatPlacement[];
    // Shots this player's board has received, as "x,y"
    shotsReceived: Set<string>;
    sunkBoats: number;
}

const CONTRACT_PREFIX = "BCP1:contract:";

interface Stakes {
    type: "outfit" | "contract";
    code: string;
    contract?: BCPlusContract;
    proposer: number;
    accepted: boolean;
}

const MAP =
    "N4IgKgngDgpiBcICCAbA7gQwgZxAGnAEsUZdEATSq6m2u+hxp5l1t9jzr7n3v/gYKHCRoseImSp0mbLnzugJpBlK1WvUbFTRQCq9+g4aNGtjXcYuW9phuav2DN+ncAsQG/cedAYJ++/+pzpXDxDvP3CA7X0Q0PCI6yi9GM84/wSzaOS3MNSvSIykrJcc1PzbTKySuLLnCuSq+J1A2mDK3J8aoLqYhrSmxIdB5po7Qfth6lGxywmqKenjWcp5hcMl8nwQAHkAIwArGABjABcyEAULy6vrm9u7+4fHp+eX17f3j8+v75/fv/+AYCgXcAHYCTYAYRgKBQABEMMcMAhgABfFFAA=@EAApAIABfwb/e/9//284fg==";

export class Boats {
    public static description = `Boats
 =====

BOATS, BOATS, BOATS!

Yarr, me hearties! This be a game of naval strategy upon the high seas! Sink the
other cap'n's fleet afore they sink yers, else ye be tied to the mast!
Resemblance to any other grid-based naval strategy game be purely coincidental, ye scurvy land lubber.

!join
Joins the game. You'll be whispered a link to place your boats.

!join random
Joins the game with a randomly placed fleet, instead of choosing placements yourself.

!stakes <outfit code or BC+ contract code>
Proposes stakes for the game: the loser will have the outfit applied, or be offered the contract.
The other player must use !stakes accept before the game can start.
Use the command again to change the stakes, or !stakes none to cancel them.

!start
Starts the game once both players have placed their boats.

!fire
Move onto the square of your opponent's board that you want to target, then use !fire to fire at it.
`;

    private commandParser: CommandParser;
    private players: BoatsPlayer[] = [];
    private started = false;
    private stakes?: Stakes;
    private finished = false;
    private currentPlayer = 0;
    private web: WebServer;
    private disconnectTimers = new Map<number, ReturnType<typeof setTimeout>>();

    public constructor(
        private conn: API_Connector,
        private config: BoatsConfig,
    ) {
        this.conn.on("RoomCreate", this.onChatRoomCreated);
        this.conn.on("RoomJoin", this.onChatRoomJoined);
        this.conn.on("CharacterEntered", this.onCharacterEntered);
        this.conn.on("CharacterLeft", this.onCharacterLeft);

        this.commandParser = new CommandParser(conn);
        this.commandParser.register("join", this.onJoin);
        this.commandParser.register("fire", this.onFire);
        this.commandParser.register("win", this.onWin);
        this.commandParser.register("start", this.onStart);
        this.commandParser.register("stakes", this.onStakes);
        /*
        this.commandParser.register("testcontract", (sender, args) => {
            offerBCPlusContract(this.conn, sender, "BCP1:contract:N4IgLglmA2CmIC5ywM5hAGmQJwLYsRExABMBXbAQ0gHsA7AWQjsQAYsAHG6CAYwE9CsKAAtY2YtjJwCCUFFj4AdADNssYXQDmAeTBjss0JV6QAbvARgpsLLDoqa2XpetlbIaDS2I3HynR0NGR0Lr42WGQosADiXgBGlNDh7ljRYJDaRiBJXgDuAKKUKIIIKknRAL7VWJRk+k6IAIxNABxNAJwdtfUiTgBylLiWIAXQPPCVQA");
        });
        */

        this.web = new WebServer(config.port);
        this.web.route("/place", (req) => this.placePage(req));
        this.web.start();
    }

    public async init(): Promise<void> {
        await this.setupRoom();
        await this.setupCharacter();
    }

    private onChatRoomCreated = async () => {
        await this.setupRoom();
        await this.setupCharacter();
    };

    private onChatRoomJoined = async () => {
        await this.setupCharacter();
    };

    private setupCharacter = async () => {
        this.conn.moveOnMap(BOT_POSITION.X, BOT_POSITION.Y);
    };

    private writePlayerName(playerIndex: number, name: string, maxLength: number) {
        const origin = playerIndex === 0 ? GRID_ORIGIN_P1 : GRID_ORIGIN_P2;
        const maxWidth =
            playerIndex === 0
                ? GRID_ORIGIN_P2.X - GRID_ORIGIN_P1.X
                : 40 - GRID_ORIGIN_P2.X;
        const truncatedName = name.length > maxLength ? name.substring(0, maxLength) : name;
        this.conn.chatRoom.map.writeText(
            { X: origin.X, Y: origin.Y - 1 },
            truncatedName,
            maxWidth,
        );
    }

    private onCharacterEntered = (character: API_Character) => {
        const timer = this.disconnectTimers.get(character.MemberNumber);
        if (timer) {
            clearTimeout(timer);
            this.disconnectTimers.delete(character.MemberNumber);
        }
        if (character.IsBot()) {
            return;
        }
        character.Tell(
            "Whisper",
            this.started && !this.finished
                ? "( Welcome to BondageBoats! A game is currently in progress, please wait until it finishes. )"
                : "( Welcome to BondageBoats! No game is in progress. Use !join to join the game, or !join random to get a randomly placed fleet. )",
        );
    };

    private onCharacterLeft = (
        memberNumber: number,
        character: API_Character,
        leaveMessage: string | null,
        intentional: boolean,
    ) => {
        if (!this.players.some((p) => p.memberNumber === memberNumber)) {
            return;
        }
        if (intentional) {
            this.removePlayer(memberNumber, "left the room");
            return;
        }
        clearTimeout(this.disconnectTimers.get(memberNumber));
        this.disconnectTimers.set(
            memberNumber,
            setTimeout(() => {
                this.disconnectTimers.delete(memberNumber);
                this.removePlayer(memberNumber, "disconnected");
            }, DISCONNECT_TIMEOUT_MS),
        );
    };

    private removePlayer(memberNumber: number, reason: string) {
        const player = this.players.find(
            (p) => p.memberNumber === memberNumber,
        );
        if (!player) {
            return;
        }
        if (this.started && !this.finished) {
            this.conn.SendMessage(
                "Chat",
                `(${player.name} ${reason}, so the game has been abandoned.`,
            );
            this.resetGame();
            return;
        }
        this.players = this.players.filter((p) => p !== player);
        this.stakes = undefined;
        this.conn.SendMessage(
            "Emote",
            `( ${player.name} ${reason} and has been removed from the game. )`,
        );
        this.drawPlayerNames();
    }

    private resetGame() {
        this.disconnectTimers.forEach((t) => clearTimeout(t));
        this.disconnectTimers.clear();
        this.players = [];
        this.started = false;
        this.finished = false;
        this.stakes = undefined;
        this.currentPlayer = 0;
        this.drawPlayerNames();
        this.clearBoard();
    }

    private drawPlayerNames() {
        for (let i = 0; i < 2; i++) {
            this.writePlayerName(i, this.players[i]?.name ?? `Player ${i + 1}`, BOARD_SIZE);
        }
    }

    private clearBoard() {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                this.conn.chatRoom.map.setObject(
                    { X: GRID_ORIGIN_P1.X + x, Y: GRID_ORIGIN_P1.Y + y },
                    "Blank",
                );
                this.conn.chatRoom.map.setObject(
                    { X: GRID_ORIGIN_P2.X + x, Y: GRID_ORIGIN_P2.Y + y },
                    "Blank",
                );
            }
        }
    }

    private setupRoom = async () => {
        this.conn.moveOnMap(BOT_POSITION.X, BOT_POSITION.Y);
        this.conn.chatRoom.map.setMapFromData(
            JSON.parse(decompressFromBase64(MAP)),
        );
        this.resetGame();
    };

    private placePage(req: WebRequest): WebResponse {
        const token = req.url.searchParams.get("token");
        const player = token
            ? this.players.find((p) => p.token === token)
            : undefined;
        if (!player) {
            return { status: 403, body: "Invalid token" };
        }
        if (req.method === "POST") {
            if (player.placement) {
                return {
                    status: 400,
                    body: "You have already placed your boats",
                };
            }
            const placement = parsePlacements(req.body);
            if (!placement) {
                return { status: 400, body: "Invalid placement" };
            }
            player.placement = placement;
            this.conn.SendMessage(
                "Emote",
                `( ${player.name} has placed their boats. )`,
            );
            this.maybeAnnounceStart();
            return { status: 200, body: "OK" };
        }
        if (req.method !== "GET") {
            return { status: 405, body: "Method not allowed" };
        }
        return { status: 200, body: renderPlacementPage(player.name) };
    }

    private placeUrl(token: string): string {
        const base = this.config.baseUrl.replace(/\/+$/, "");
        return `${base}/place?token=${token}`;
    }

    onJoin = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        // The finished board stays up until someone joins the next game
        if (this.finished) {
            this.resetGame();
        }
        let player = this.players.find(
            (p) => p.memberNumber === sender.MemberNumber,
        );
        if (!player) {
            if (this.players.length >= 2) {
                this.conn.reply(
                    msg,
                    "Sorry, the game is full, please wait until the next game!",
                );
                return;
            }
            player = {
                memberNumber: sender.MemberNumber,
                name: sender.toString(),
                token: randomBytes(16).toString("hex"),
                shotsReceived: new Set(),
                sunkBoats: 0,
            };
            this.players.push(player);
            this.drawPlayerNames();
            this.conn.SendMessage(
                "Emote",
                `( ${PLAYER_TITLES[Math.floor(Math.random() * PLAYER_TITLES.length)]} ${sender} has joined the game.`,
            );
        }
        if (args[0]?.toLowerCase() === "random") {
            if (player.placement) {
                this.conn.reply(msg, "You have already placed your boats.");
                return;
            }
            player.placement = randomPlacements();
            this.conn.SendMessage(
                "Emote",
                `( ${player.name} has placed their boats. )`,
            );
            this.maybeAnnounceStart();
            return;
        }
        sender.Tell(
            "Whisper",
            `( You're in! Place your boats: ${this.placeUrl(player.token)} )`,
        );
    };

    private maybeAnnounceStart(): void {
        if (
            this.started ||
            this.players.length !== 2 ||
            !this.players.every((p) => p.placement)
        ) {
            return;
        }
        this.conn.SendMessage(
            "Chat",
            `(Both players have placed their boats! Use !stakes <outfit code or BC+ contract code> to propose stakes, or !start to begin the game.` +
                (this.stakes && !this.stakes.accepted
                    ? " The proposed stakes must be accepted with !stakes accept first."
                    : ""),
        );
    }

    private start(): void {
        if (
            this.started ||
            this.players.length !== 2 ||
            !this.players.every((p) => p.placement)
        ) {
            return;
        }
        this.started = true;
        this.currentPlayer = 0;
        this.conn.SendMessage(
            "Chat",
            `(The game is starting! ${this.players[0].name}, it's your turn. ` +
                `Move to a square on your opponent's board and use !fire to fire at it.`,
        );
    }

    private boardOrigin(playerIndex: number) {
        return playerIndex === 0 ? GRID_ORIGIN_P1 : GRID_ORIGIN_P2;
    }

    private boatCells(boat: BoatPlacement): { x: number; y: number }[] {
        const cells = [];
        for (let i = 0; i < boat.length; i++) {
            cells.push({
                x: boat.x + (boat.horizontal ? i : 0),
                y: boat.y + (boat.horizontal ? 0 : i),
            });
        }
        return cells;
    }

    private applySinkingReward(player: BoatsPlayer): void {
        const character = this.conn.chatRoom.characters.find(
            (c) => c.MemberNumber === player.memberNumber,
        );
        if (!character) {
            return;
        }

        switch (player.sunkBoats) {
            case 1:
                const mittens = character.Appearance.AddItem(
                    AssetGet("ItemHands", "LatexBondageMitts"),
                );
                mittens.SetDifficulty(20);
                break;
            case 2: {
                const rope = character.Appearance.AddItem(
                    AssetGet("ItemArms", "HempRope"),
                );
                rope.Extended?.SetType("BoxTie");
                rope.SetDifficulty(20);
                break;
            }
            case 3:
                character.Appearance.AddItem(
                    AssetGet("ItemBoots", "BalletHeels"),
                );
                break;
            case 4:
                character.Appearance.AddItem(AssetGet("ItemLegs", "HempRope"));
                break;
            case 5: {
                if (this.stakes?.type === "outfit") break;

                const rope = character.Appearance.AddItem(
                    AssetGet("ItemArms", "HempRope"),
                );
                rope.Extended?.SetType("Hogtied");
                rope.SetDifficulty(20);
                character.Appearance.AddItem(
                    AssetGet("ItemMouth", "ClothStuffing"),
                );
                const ballGag = character.Appearance.AddItem(
                    AssetGet("ItemMouth2", "BallGag"),
                );
                ballGag.Extended.SetType("Tight");
                break;
            }
        }
    }

    private removeSinkingRewards(player: BoatsPlayer): void {
        const character = this.conn.chatRoom.characters.find(
            (c) => c.MemberNumber === player.memberNumber,
        );
        if (!character) {
            return;
        }

        const rewards = [
            [1, "ItemHands", "LatexBondageMitts"],
            [2, "ItemArms", "HempRope"],
            [3, "ItemBoots", "BalletHeels"],
            [4, "ItemLegs", "HempRope"],
            [5, "ItemMouth", "ClothStuffing"],
            [5, "ItemMouth2", "BallGag"],
        ] as const;
        for (const [sunkBoats, group, itemName] of rewards) {
            if (
                player.sunkBoats >= sunkBoats &&
                character.Appearance.InventoryGet(group)?.Name === itemName
            ) {
                character.Appearance.RemoveItem(group);
            }
        }
    }

    private endGame(winner: BoatsPlayer, loser: BoatsPlayer): void {
        this.finished = true;
        this.conn.SendMessage(
            "Chat",
            `(${loser.name}'s entire fleet is destroyed. ${winner.name} wins!`,
        );
        this.removeSinkingRewards(winner);
        this.applyStakes(loser);
    }

    private applyStakes(loser: BoatsPlayer): void {
        const stakes = this.stakes;
        this.stakes = undefined;
        if (!stakes) {
            return;
        }
        const character = this.conn.chatRoom.characters.find(
            (c) => c.MemberNumber === loser.memberNumber,
        );
        if (!character) {
            this.conn.SendMessage(
                "Emote",
                `( ${loser.name} is no longer here, so the stakes cannot be applied. )`,
            );
            return;
        }

        try {
            if (stakes.type === "outfit") {
                this.removeSinkingRewards(loser);

                this.conn.SendMessage(
                    "Emote",
                    `( ${loser.name}, prepare to receive your agreed outfit. )`,
                );
                character.Appearance.slowlyApplyBundle(
                    importBundle(stakes.code),
                );
            } else {
                offerBCPlusContract(this.conn, character, stakes.contract!);
                this.conn.SendMessage(
                    "Emote",
                    `( ${loser.name} has been sent the contract agreed in the stakes. )`,
                );
            }
        } catch (e) {
            this.conn.SendMessage(
                "Emote",
                `( The stakes could not be applied to ${loser.name}. )`,
            );
        }
    }

    // Testing command: immediately wins the game for the sender
    onWin = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (!sender.IsRoomAdmin()) {
            this.conn.reply(msg, "Only room admins can use this command.");
            return;
        }
        if (!this.started || this.finished) {
            this.conn.reply(msg, "The game isn't in progress.");
            return;
        }
        const winner = this.players.find(
            (p) => p.memberNumber === sender.MemberNumber,
        );
        if (!winner) {
            this.conn.reply(msg, "You're not in this game.");
            return;
        }
        const loser = this.players.find((p) => p !== winner)!;
        while (loser.sunkBoats < BOAT_LENGTHS.length) {
            loser.sunkBoats++;
            this.applySinkingReward(loser);
        }
        this.endGame(winner, loser);
    };

    onStart = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        const player = this.players.find(
            (p) => p.memberNumber === sender.MemberNumber,
        );
        if (!player) {
            this.conn.reply(msg, "You're not in this game.");
            return;
        }
        if (this.started) {
            this.conn.reply(msg, "The game has already started.");
            return;
        }
        if (this.players.length !== 2) {
            this.conn.reply(msg, "Both players must be in the game to start.");
            return;
        }
        if (!this.players.every((p) => p.placement)) {
            this.conn.reply(msg, "Both players must have placed their boats.");
            return;
        }
        if (this.stakes && !this.stakes.accepted) {
            this.conn.reply(
                msg,
                "The proposed stakes must be accepted by the other player with !stakes accept first (or cancelled with !stakes none).",
            );
            return;
        }
        this.start();
    };

    onStakes = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        const player = this.players.find(
            (p) => p.memberNumber === sender.MemberNumber,
        );
        if (!player) {
            this.conn.reply(msg, "You're not in this game.");
            return;
        }
        if (this.started) {
            this.conn.reply(
                msg,
                "Stakes can't be changed once the game has started.",
            );
            return;
        }
        const arg = args.join(" ").trim();
        if (!arg) {
            this.conn.reply(
                msg,
                "Usage: !stakes <outfit code or BC+ contract code>, !stakes accept, or !stakes none",
            );
            return;
        }
        const keyword = arg.toLowerCase();

        if (keyword === "none") {
            if (!this.stakes) {
                this.conn.reply(msg, "There are no stakes to cancel.");
                return;
            }
            this.stakes = undefined;
            this.conn.SendMessage(
                "Emote",
                `( ${player.name} has cancelled the stakes. )`,
            );
            return;
        }

        if (keyword === "accept") {
            if (!this.stakes) {
                this.conn.reply(msg, "There are no stakes to accept.");
                return;
            }
            if (this.stakes.proposer === player.memberNumber) {
                this.conn.reply(
                    msg,
                    "The other player must accept your stakes.",
                );
                return;
            }
            if (this.stakes.accepted) {
                this.conn.reply(msg, "The stakes are already accepted.");
                return;
            }
            this.stakes.accepted = true;
            this.conn.SendMessage(
                "Emote",
                `( ${player.name} has accepted the stakes. )`,
            );
            return;
        }

        let type: Stakes["type"];
        let contract: BCPlusContract | undefined;
        if (arg.startsWith(CONTRACT_PREFIX)) {
            type = "contract";
            try {
                contract = parseBCPlusContract(arg);
                if (
                    (!contract.durationMin || contract.durationMin <= 0) &&
                    contract.policy === "author"
                ) {
                    this.conn.reply(
                        msg,
                        "BC+ contracts used as stakes must have a duration or be endable by the signer: the bot will not end them!",
                    );
                    return;
                }
            } catch (e) {
                this.conn.reply(
                    msg,
                    `That isn't a valid BC+ contract code: ${e instanceof Error ? e.message : e}`,
                );
                return;
            }
        } else {
            type = "outfit";
            try {
                if (!Array.isArray(importBundle(arg))) {
                    throw new TypeError("Not an outfit");
                }
            } catch {
                this.conn.reply(msg, "That isn't a valid outfit code.");
                return;
            }
        }
        this.stakes = {
            type,
            code: arg,
            contract,
            proposer: player.memberNumber,
            accepted: false,
        };
        this.conn.SendMessage(
            "Emote",
            `( ${player.name} proposes stakes: the loser ${
                type === "outfit"
                    ? "will be dressed in a chosen outfit"
                    : "will be offered a BC+ contract"
            }. The other player can use !stakes accept to agree, or propose their own. !stakes none removes. )`,
        );
    };

    onFire = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (!this.started || this.finished) {
            this.conn.reply(msg, "The game isn't in progress.");
            return;
        }
        const attacker = this.players[this.currentPlayer];
        if (sender.MemberNumber !== attacker.memberNumber) {
            this.conn.reply(msg, "It's not your turn.");
            return;
        }
        const targetIndex = 1 - this.currentPlayer;
        const origin = this.boardOrigin(targetIndex);
        const pos = sender.MapPos;
        const square = {
            x: (pos?.X ?? -1) - origin.X,
            y: (pos?.Y ?? -1) - origin.Y,
        };
        if (
            square.x < 0 ||
            square.y < 0 ||
            square.x >= BOARD_SIZE ||
            square.y >= BOARD_SIZE
        ) {
            this.conn.reply(
                msg,
                "We need to target the opponent's fleet, cap'n! Move onto a square of your opponent's board first, then use !fire.",
            );
            return;
        }
        const target = this.players[targetIndex];
        const key = `${square.x},${square.y}`;
        if (target.shotsReceived.has(key)) {
            this.conn.reply(msg, "We've already fired at that square, cap'n!");
            return;
        }
        target.shotsReceived.add(key);

        const tilePos = { X: pos.X, Y: pos.Y };
        const boat = target.placement!.find((b) =>
            this.boatCells(b).some((c) => c.x === square.x && c.y === square.y),
        );

        //this.conn.SendMessage("Chat", `(${attacker.name} fires a salvo!`);
        await wait(1000);

        if (!boat) {
            this.conn.chatRoom.map.setObject(tilePos, "IconCross");
            this.conn.SendMessage(
                "Chat",
                `(❌ miss`,
            );
        } else {
            this.conn.chatRoom.map.setObject(tilePos, "LogFire");
            const sunk = this.boatCells(boat).every((c) =>
                target.shotsReceived.has(`${c.x},${c.y}`),
            );
            if (sunk) {
                for (const cell of this.boatCells(boat)) {
                    this.conn.chatRoom.map.setObject(
                        { X: origin.X + cell.x, Y: origin.Y + cell.y },
                        "TrashCan",
                    );
                }
                target.sunkBoats++;
                this.applySinkingReward(target);
                this.conn.SendMessage(
                    "Chat",
                    `(🚢❌ ${attacker.name} has destroyed ${target.name}'s ${BOAT_NAMES[boat.length]}!`,
                );
            } else {
                this.conn.SendMessage(
                    "Chat",
                    `(🔥${attacker.name}'s shot has struck a vessel!`,
                );
            }
            if (
                target.placement!.every((b) =>
                    this.boatCells(b).every((c) =>
                        target.shotsReceived.has(`${c.x},${c.y}`),
                    ),
                )
            ) {
                this.endGame(attacker, target);
                return;
            }
        }

        this.currentPlayer = targetIndex;
        this.conn.SendMessage(
            "Chat",
            `(${target.name}, it's your turn. Use !fire to choose a square on your opponent's board.`,
        );
    };
}
