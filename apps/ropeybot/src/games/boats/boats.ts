import { randomBytes } from "node:crypto";
import {
    API_Connector,
    CommandParser,
    API_Character,
    BC_Server_ChatRoomMessage,
} from "bc-bot";
import { WebServer, type WebRequest, type WebResponse } from "../../webserver";
import {
    BOARD_SIZE,
    parsePlacements,
    renderPlacementPage,
    type BoatPlacement,
} from "./placementPage";
import { decompressFromBase64 } from "lz-string";
import { wait } from "../../hub/utils";

const BOT_POSITION = { X: 0, Y: 39 };
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

!fire
Move onto the square of your opponent's board that you want to target, then use !fire to fire at it.
`;

    private commandParser: CommandParser;
    private players: BoatsPlayer[] = [];
    private started = false;
    private finished = false;
    private currentPlayer = 0;
    private web: WebServer;

    public constructor(
        private conn: API_Connector,
        private config: BoatsConfig,
    ) {
        this.conn.on("RoomCreate", this.onChatRoomCreated);
        this.conn.on("RoomJoin", this.onChatRoomJoined);

        this.commandParser = new CommandParser(conn);
        this.commandParser.register("join", this.onJoin);
        this.commandParser.register("fire", this.onFire);

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
        this.conn.Player.SetActivePose(["Kneel"]);
    };

    private writePlayerName(playerIndex: number, name: string) {
        const origin = playerIndex === 0 ? GRID_ORIGIN_P1 : GRID_ORIGIN_P2;
        const maxWidth =
            playerIndex === 0
                ? GRID_ORIGIN_P2.X - GRID_ORIGIN_P1.X
                : 40 - GRID_ORIGIN_P2.X;
        this.conn.chatRoom.map.writeText(
            { X: origin.X, Y: origin.Y - 1 },
            name,
            maxWidth,
        );
    }

    private resetGame() {
        this.players = [];
        this.started = false;
        this.finished = false;
        this.currentPlayer = 0;
        this.drawPlayerNames();
        this.clearBoard();
    }

    private drawPlayerNames() {
        for (let i = 0; i < 2; i++) {
            this.writePlayerName(i, this.players[i]?.name ?? `Player ${i + 1}`);
        }
    }

    private clearBoard() {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                this.conn.chatRoom.map.setObject({ X: GRID_ORIGIN_P1.X + x, Y: GRID_ORIGIN_P1.Y + y }, "IconEmpty");
                this.conn.chatRoom.map.setObject({ X: GRID_ORIGIN_P2.X + x, Y: GRID_ORIGIN_P2.Y + y }, "IconEmpty");
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
            this.maybeStart();
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
            };
            this.players.push(player);
            this.drawPlayerNames();
            this.conn.SendMessage(
                "Emote",
                `( ${PLAYER_TITLES[Math.floor(Math.random() * PLAYER_TITLES.length)]} ${sender} has joined the game.`,
            );
        }
        sender.Tell(
            "Whisper",
            `( You're in! Place your boats: ${this.placeUrl(player.token)} )`,
        );
    };

    private maybeStart(): void {
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

        this.conn.SendMessage("Chat", `(${attacker.name} fires a salvo!`);
        await wait(2000);

        if (!boat) {
            this.conn.chatRoom.map.setObject(tilePos, "IconCross");
            this.conn.SendMessage(
                "Chat",
                `(Plop! ${attacker.name}'s shot misses.`,
            );
        } else {
            this.conn.chatRoom.map.setObject(tilePos, "LogFire");
            const sunk = this.boatCells(boat).every((c) =>
                target.shotsReceived.has(`${c.x},${c.y}`),
            );
            if (sunk) {
                this.conn.SendMessage(
                    "Chat",
                    `(${attacker.name} has destroyed ${target.name}'s ${BOAT_NAMES[boat.length]}!`,
                );
            } else {
                this.conn.SendMessage(
                    "Chat",
                    `(${attacker.name}'s shot has struck a vessel!`,
                );
            }
            if (
                target.placement!.every((b) =>
                    this.boatCells(b).every((c) =>
                        target.shotsReceived.has(`${c.x},${c.y}`),
                    ),
                )
            ) {
                this.finished = true;
                this.conn.SendMessage(
                    "Chat",
                    `(${target.name}'s entire fleet is destroyed. ${attacker.name} wins!`,
                );
                this.resetGame();
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
