import { readFile, writeFile } from "fs/promises";
import {
    API_Connector,
    CommandParser,
    API_Character,
    BC_Server_ChatRoomMessage,
    AssetGet,
} from "bc-bot";
import { wait } from "../hub/utils";

const BOT_POSITION = { X: 0, Y: 0 };
const GRID_ORIGIN = { X: 5, Y: 5 };
const GRID_WIDTH = 34;
const GRID_HEIGHT = 20;
const ENTRY_FLAG_POSITION = {
    X: Math.floor(GRID_ORIGIN.X),
    Y: GRID_ORIGIN.Y + GRID_HEIGHT - 1,
};
const MINE_COUNTER_WIDTH = 4;
const LOSERS_AREA = {
    X: ENTRY_FLAG_POSITION.X + 2,
    Y: ENTRY_FLAG_POSITION.Y - 1,
    width: GRID_ORIGIN.X + GRID_WIDTH - (ENTRY_FLAG_POSITION.X + 2),
};
const WINNERS_AREA = {
    X: 0,
    Y: ENTRY_FLAG_POSITION.Y - 1,
    width: GRID_ORIGIN.X - 1,
};
const IDLE_TITLE = "SWEEPYMINE";
const IDLE_TITLE_PADDING = 1;
const IDLE_TITLE_BORDER = 2;
const SLIME_FLOORS = [
    { tile: "SlimeGreen", colour: "green", itemColour: "#57AB5E" },
    { tile: "SlimePink", colour: "pink", itemColour: "#FF69B4" },
    { tile: "SlimeRed", colour: "red", itemColour: "#D92D2D" },
    { tile: "SlimeBlue", colour: "blue", itemColour: "#3A86D9" },
] as const;
const PRIZE_ITEMS = [
    "BunPlush",
    "Cat",
    "Dog",
    "DragonPlush",
    "FoxPlush",
    "Panda",
    "Penguin",
    "Unicorn",
    "Chocolate",
    "CandyCane",
    "GrilledSausage",
    "PetPotato",
    "Karl",
] as const;

const DIFFICULTIES = {
    easy: { width: 9, height: 9, mines: 10 },
    medium: { width: 16, height: 16, mines: 40 },
    hard: { width: 30, height: 15, mines: 99 },
} as const;

type Difficulty = keyof typeof DIFFICULTIES;

interface LeaderboardEntry {
    memberNumber: number;
    name: string;
    nickName: string;
    difficulty: Difficulty;
    startedAt: string;
    gameTime: number;
}

const defaultMessage = "Clear the latex mines without setting them off!";

const helpText = `
💣💣💣💣💣 Sweepymine 💣💣💣💣💣

!start <difficulty>
Starts a new game. Difficulty can be easy, medium, or hard.

!flag
Flags or unflags the square you are standing on.
Aliases: !f and f

!sweep
Reveals the square you are standing on when it does not contain a mine.
Aliases: !s and s

!reset
Clears the board.

!free
Frees a loser's arms.

!leaderboard <difficulty>
Displays today's and the all-time leaderboard for easy, medium, or hard.

!open
Opens a Sweepymine winner's prize.

!help
Shows this help message.
`;

export class Mines {
    public static description = `Mines
 =====

MINESWEEPER GAME

${helpText}
`;

    private commandParser: CommandParser;
    private mines = new Set<number>();
    private flags = new Set<number>();
    private revealed = new Set<number>();
    private boardOrigin = { ...GRID_ORIGIN };
    private boardSize = { width: 0, height: 0 };
    private activePlayerName: string | undefined;
    private activePlayerMemberNumber: number | undefined;
    private activeDifficulty: Difficulty | undefined;
    private gameStartedAt: number | undefined;
    private gameEnded = false;
    private disconnectTimers: ReturnType<typeof setTimeout>[] = [];
    private victoryBalloonPositions = new Set<string>();

    public constructor(private conn: API_Connector) {
        this.conn.on("RoomCreate", this.onChatRoomCreated);
        this.conn.on("RoomJoin", this.onChatRoomJoined);
        this.conn.on("CharacterEntered", this.onCharacterEntered);
        this.conn.on("CharacterLeft", this.onCharacterLeft);

        this.commandParser = new CommandParser(conn);
        this.commandParser.register("start", this.onStart);
        this.commandParser.register("flag", this.onFlag);
        this.commandParser.register("f", this.onFlag, true);
        this.commandParser.register("sweep", this.onSweep);
        this.commandParser.register("s", this.onSweep, true);
        this.commandParser.register("reset", this.onReset);
        this.commandParser.register("free", this.onFree);
        this.commandParser.register("cheat", this.onCheat);
        this.commandParser.register("win", this.onWin);
        this.commandParser.register("open", this.onOpen);
        this.commandParser.register("leaderboard", this.onLeaderboard);
        this.commandParser.register("help", this.onHelp);
    }

    public async init(): Promise<void> {
        await this.setupRoom();
    }

    private onChatRoomCreated = async () => {
        await this.setupRoom();
        await this.setupCharacter();
    };

    private onChatRoomJoined = async () => {
        await this.setupCharacter();
        await this.updateRoomDescription();
    };

    private onCharacterEntered = (character: API_Character) => {
        if (character.MemberNumber === this.activePlayerMemberNumber) {
            this.clearDisconnectTimers();
            this.conn.SendMessage(
                "Emote",
                `( ${character.Name} has reconnected to the game.`,
            );
        }
        character.Tell(
            "Whisper",
            this.activePlayerName
                ? `( A game is currently in progress. ${this.activePlayerName} is playing. )`
                : "( Let's play Sweepymine! Can you clear all the latex bombs? Careful: set one off and you'll be a beautiful latex statue! " +
                      "Use !start easy, !start medium, or !start hard to start a game.",
        );
    };

    private onCharacterLeft = (
        memberNumber: number,
        character: API_Character,
        leaveMessage: string | null,
        intentional: boolean,
    ) => {
        if (memberNumber !== this.activePlayerMemberNumber) {
            return;
        }
        if (this.gameEnded) {
            return;
        }

        if (intentional) {
            void this.resetGame(
                `${character.Name} left the room, so the game has been reset.`,
            );
            return;
        }

        this.conn.SendMessage(
            "Emote",
            `(${character.Name} has disconnected. The game will reset if they do not rejoin within 2 minutes.`,
        );
        this.clearDisconnectTimers();
        this.disconnectTimers = [
            setTimeout(() => {
                this.conn.SendMessage(
                    "Emote",
                    `(${character.Name} still has not reconnected. The game will reset in 1 minute.`,
                );
            }, 60_000),
            setTimeout(() => {
                this.conn.SendMessage(
                    "Emote",
                    `(${character.Name} still has not reconnected. The game will reset in 30 seconds.`,
                );
            }, 90_000),
            setTimeout(() => {
                void this.resetGame(
                    `(${character.Name} did not reconnect, so the game has been reset.`,
                );
            }, 120_000),
        ];
    };

    private setupCharacter = async () => {
        this.conn.moveOnMap(BOT_POSITION.X, BOT_POSITION.Y);
    };

    private setupRoom = async () => {
        this.conn.chatRoom.useMap(true);
        this.generateMap();
        await wait(200);
        this.conn.moveOnMap(BOT_POSITION.X, BOT_POSITION.Y);
        await this.updateRoomDescription();
    };

    private generateMap(): void {
        this.conn.chatRoom.map.clearObjects();

        // Create 30x20 area enclosed by walls
        // Walls around the grid
        for (
            let x = GRID_ORIGIN.X - 1;
            x < GRID_ORIGIN.X + GRID_WIDTH + 1;
            x++
        ) {
            // Top wall
            this.conn.chatRoom.map.setTile(
                { X: x, Y: GRID_ORIGIN.Y - 1 },
                "SteelBlack",
                "Wall",
            );
            // Bottom wall
            this.conn.chatRoom.map.setTile(
                { X: x, Y: GRID_ORIGIN.Y + GRID_HEIGHT },
                "SteelBlack",
                "Wall",
            );
        }

        for (let y = GRID_ORIGIN.Y; y < GRID_ORIGIN.Y + GRID_HEIGHT; y++) {
            // Left wall
            this.conn.chatRoom.map.setTile(
                { X: GRID_ORIGIN.X - 1, Y: y },
                "SteelBlack",
                "Wall",
            );
            // Right wall
            this.conn.chatRoom.map.setTile(
                { X: GRID_ORIGIN.X + GRID_WIDTH, Y: y },
                "SteelBlack",
                "Wall",
            );
        }

        // Add entry flag at bottom middle
        this.conn.chatRoom.map.setObject(
            ENTRY_FLAG_POSITION,
            "EntryFlag",
            "Functional",
        );

        this.clearBoard();
        this.drawIdleTitle();
        this.drawLosersArea();
    }

    onStart = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        const difficulty = args[0];
        if (!this.isDifficulty(difficulty)) {
            sender.Tell(
                "Whisper",
                "(Please choose a difficulty: !start easy, !start medium, or !start hard.",
            );
            return;
        }

        const settings = DIFFICULTIES[difficulty];
        this.clearBoard();
        this.boardSize = {
            width: settings.width,
            height: settings.height,
        };
        this.boardOrigin = this.getBoardOrigin();
        this.drawBoard(this.boardOrigin, settings.width, settings.height);
        this.placeMines(settings.mines);
        this.activePlayerName = sender.Name;
        this.activePlayerMemberNumber = sender.MemberNumber;
        this.activeDifficulty = difficulty;
        this.gameStartedAt = Date.now();
        this.gameEnded = false;
        this.writeMineCount();
        this.conn.SendMessage(
            "Emote",
            `(The board is set, ${sender.toString()}. Use !sweep to reveal a square and !flag to mark a mine ('s' and 'f' also work). Be careful: set off a mine and you'll be stuck.`,
        );

        await wait(1000);
        await this.updateRoomDescription();
    };

    onFlag = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.gameEnded) {
            this.conn.reply(msg, "The game has ended. Reset it to play again.");
            return;
        }
        if (sender.MemberNumber !== this.activePlayerMemberNumber) {
            this.conn.reply(msg, "Only the active player can flag squares.");
            return;
        }

        const x = sender.X - this.boardOrigin.X;
        const y = sender.Y - this.boardOrigin.Y;
        if (
            x < 0 ||
            y < 0 ||
            x >= this.boardSize.width ||
            y >= this.boardSize.height
        ) {
            this.conn.reply(msg, "Stand on a board square to flag it.");
            return;
        }

        const index = x + y * this.boardSize.width;
        if (this.flags.has(index)) {
            this.flags.delete(index);
            this.conn.chatRoom.map.setObject(sender.MapPos, "Passable");
        } else {
            this.flags.add(index);
            this.conn.chatRoom.map.setObject(sender.MapPos, "Red", "Banners");
        }
        this.writeMineCount();
        await this.checkForWin(sender);
    };

    onSweep = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.gameEnded) {
            this.conn.reply(msg, "The game has ended. Reset it to play again.");
            return;
        }
        if (sender.MemberNumber !== this.activePlayerMemberNumber) {
            this.conn.reply(msg, "Only the active player can sweep squares.");
            return;
        }

        const x = sender.X - this.boardOrigin.X;
        const y = sender.Y - this.boardOrigin.Y;
        if (
            x < 0 ||
            y < 0 ||
            x >= this.boardSize.width ||
            y >= this.boardSize.height
        ) {
            this.conn.reply(msg, "Stand on a board square to sweep it.");
            return;
        }

        const index = x + y * this.boardSize.width;
        if (this.flags.has(index)) {
            this.conn.reply(msg, "Unflag this square before sweeping it.");
            return;
        }
        if (this.revealed.has(index)) {
            return;
        }
        if (this.mines.has(index)) {
            await this.playerLose(sender.MapPos);
            return;
        }

        this.revealSafeSquares(index);
        await this.checkForWin(sender);
    };

    onReset = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (
            !this.gameEnded &&
            sender.MemberNumber !== this.activePlayerMemberNumber &&
            !sender.IsRoomAdmin()
        ) {
            this.conn.reply(
                msg,
                "Only room admins and the current player can reset the game.",
            );
            return;
        }
        await this.setupRoom();
        this.conn.SendMessage("Emote", "(The game has been reset.");
    };

    onFree = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (!this.positionIsInArea(sender.MapPos, LOSERS_AREA)) {
            this.conn.reply(msg, "Only losers can use !free.");
            return;
        }
        if (!sender.Appearance.InventoryGet("ItemArms")) {
            this.conn.reply(msg, "Your arms are already free.");
            return;
        }

        sender.Appearance.RemoveItem("ItemArms");
        this.conn.reply(msg, "Your arms have been freed.");
    };

    onOpen = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        const heldItem = sender.Appearance.InventoryGet("ItemHandheld");
        const craft = heldItem?.getData().Craft;
        if (
            heldItem?.Name !== "GiftBox" ||
            craft?.MemberNumber !== this.conn.Player.MemberNumber
        ) {
            this.conn.reply(
                msg,
                "You must be holding a Sweepymine prize to open it.",
            );
            return;
        }

        const description = craft.Description;
        const craftName = craft.Name;
        sender.Appearance.RemoveItem("ItemHandheld");

        const prizeIndex = Math.floor(Math.random() * (PRIZE_ITEMS.length + 1));
        if (prizeIndex < PRIZE_ITEMS.length) {
            const prize = sender.Appearance.AddItem(
                AssetGet("ItemHandheld", PRIZE_ITEMS[prizeIndex]),
            );
            prize.SetCraft({
                Name: craftName,
                Description: description,
                MemberName: this.conn.Player.toString(),
                MemberNumber: this.conn.Player.MemberNumber,
            });
            this.conn.SendMessage(
                "Emote",
                `(🎁 Congratulations ${sender}, please enjoy your prize!`,
            );
            return;
        }

        this.conn.SendMessage(
            "Emote",
            `(🎁 ${sender} as ${sender} opens their prize, they hear an ominous 'click'…`,
        );
        await wait(1000);
        this.conn.SendMessage(
            "Emote",
            `(In recognition of your achievement, please accept one of our premium quality latex mines. Enjoy! Love, Ellie xxxx`,
        );
        await this.explodeAt(sender.MapPos, sender.Name, "winners");
        const wipes = sender.Appearance.AddItem(
            AssetGet("ItemHandheld", "Wipes"),
        );
        wipes.SetCraft({
            Name: craftName,
            Description: `${description} You might need these if you ever get out. Kisses! Ellie xxx`,
            MemberName: this.conn.Player.toString(),
            MemberNumber: this.conn.Player.MemberNumber,
        });
    };

    onCheat = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (!sender.IsRoomAdmin()) {
            this.conn.reply(msg, "Only room admins can use this command.");
            return;
        }

        for (const index of this.mines) {
            this.conn.chatRoom.map.setObject(
                {
                    X: this.boardOrigin.X + (index % this.boardSize.width),
                    Y:
                        this.boardOrigin.Y +
                        Math.floor(index / this.boardSize.width),
                },
                "IconCross",
            );
        }
    };

    onWin = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (!sender.IsRoomAdmin()) {
            this.conn.reply(msg, "Only room admins can use this command.");
            return;
        }
        if (this.gameEnded || this.activePlayerMemberNumber === undefined) {
            this.conn.reply(msg, "There is no game in progress.");
            return;
        }

        const activePlayer = this.conn.chatRoom.characters.find(
            (character) =>
                character.MemberNumber === this.activePlayerMemberNumber,
        );
        if (!activePlayer) {
            this.conn.reply(msg, "The active player is not in the room.");
            return;
        }

        const tileCount = this.boardSize.width * this.boardSize.height;
        for (let index = 0; index < tileCount; index++) {
            if (this.mines.has(index)) {
                this.flags.add(index);
                this.conn.chatRoom.map.setObject(
                    {
                        X: this.boardOrigin.X + (index % this.boardSize.width),
                        Y:
                            this.boardOrigin.Y +
                            Math.floor(index / this.boardSize.width),
                    },
                    "Red",
                    "Banners",
                );
            } else {
                this.revealSafeSquares(index);
            }
        }
        this.writeMineCount();
        await this.checkForWin(activePlayer);
    };

    onHelp = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        sender.Tell("Whisper", "(" + helpText);
    };

    onLeaderboard = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        const difficulty = args[0];
        if (!this.isDifficulty(difficulty)) {
            this.conn.reply(
                msg,
                "Please choose a difficulty: !leaderboard easy, !leaderboard medium, or !leaderboard hard.",
            );
            return;
        }

        let entries: LeaderboardEntry[];
        try {
            entries = await this.readLeaderboard();
        } catch (error) {
            console.error("Unable to read leaderboard.json", error);
            this.conn.reply(msg, "The leaderboard could not be loaded.");
            return;
        }

        const difficultyEntries = entries
            .filter((entry) => entry.difficulty === difficulty)
            .sort((a, b) => a.gameTime - b.gameTime);
        const today = this.utcDateKey(new Date());
        const todayEntries = difficultyEntries.filter(
            (entry) =>
                this.utcDateKey(
                    new Date(Date.parse(entry.startedAt) + entry.gameTime),
                ) === today,
        );

        this.conn.reply(
            msg,
            `${difficulty} leaderboard\nToday:\n${this.formatLeaderboard(todayEntries)}\n\nAll-time:\n${this.formatLeaderboard(difficultyEntries)}`,
        );
    };

    private isDifficulty(
        difficulty: string | undefined,
    ): difficulty is Difficulty {
        return (
            difficulty === "easy" ||
            difficulty === "medium" ||
            difficulty === "hard"
        );
    }

    private async checkForWin(character: API_Character): Promise<void> {
        const tileCount = this.boardSize.width * this.boardSize.height;
        const accountedFor = new Set([...this.revealed, ...this.flags]).size;
        if (tileCount === 0 || accountedFor !== tileCount) {
            return;
        }

        const gameStartedAt = this.gameStartedAt;
        const difficulty = this.activeDifficulty;
        if (gameStartedAt === undefined || difficulty === undefined) {
            throw new Error("Cannot finish a game without start metadata");
        }

        this.gameEnded = true;
        this.clearDisconnectTimers();
        const gameTime = Date.now() - gameStartedAt;
        const startedAt = new Date(gameStartedAt).toISOString();
        this.drawVictoryBalloons();
        const prize = character.Appearance.AddItem(
            AssetGet("ItemHandheld", "GiftBox"),
        );
        prize.SetCraft({
            Name: "Sweepymine Winner's Prize",
            Description: `${character} beat Sweepymine on ${difficulty} mode in ${this.formatGameTime(gameTime)}. Congrats!`,
            MemberName: this.conn.Player.toString(),
            MemberNumber: this.conn.Player.MemberNumber,
        });

        try {
            const positions = await this.addLeaderboardEntry({
                memberNumber: character.MemberNumber,
                name: character.Name,
                nickName: character.NickName,
                difficulty,
                startedAt,
                gameTime,
            });
            this.conn.SendMessage(
                "Emote",
                `(🎉 Congratulations, ${character}! You swept the mines in ${this.formatGameTime(gameTime)}! That's #${positions.today} today and #${positions.allTime} all-time for ${difficulty}. We are delighted to award your prize. You may open it with !open`,
            );
        } catch (error) {
            console.error("Unable to save leaderboard.json", error);
            this.conn.SendMessage(
                "Emote",
                `(🎉 Congratulations, ${character}! You swept the mines in ${this.formatGameTime(gameTime)}! The leaderboard could not be updated, but we are delighted to award your prize. You may open it with !open`,
            );
        }
        await this.updateRoomDescription();
    }

    private drawVictoryBalloons(): void {
        const positions = new Set<string>();
        const addPosition = (position: ChatRoomMapPos) => {
            const key = `${position.X},${position.Y}`;
            positions.add(key);
            this.conn.chatRoom.map.setObject(
                position,
                "BalloonFiveColor",
                "FloorDecorationParty",
            );
        };

        for (
            let x = this.boardOrigin.X - 1;
            x <= this.boardOrigin.X + this.boardSize.width;
            x++
        ) {
            addPosition({ X: x, Y: this.boardOrigin.Y - 1 });
            addPosition({
                X: x,
                Y: this.boardOrigin.Y + this.boardSize.height,
            });
        }
        for (
            let y = this.boardOrigin.Y;
            y < this.boardOrigin.Y + this.boardSize.height;
            y++
        ) {
            addPosition({ X: this.boardOrigin.X - 1, Y: y });
            addPosition({
                X: this.boardOrigin.X + this.boardSize.width,
                Y: y,
            });
        }
        this.victoryBalloonPositions = positions;
    }

    private async addLeaderboardEntry(
        entry: LeaderboardEntry,
    ): Promise<{ today: number; allTime: number }> {
        const entries = await this.readLeaderboard();
        entries.push(entry);
        await writeFile("leaderboard.json", JSON.stringify(entries, null, 2));

        const difficultyEntries = entries
            .filter((candidate) => candidate.difficulty === entry.difficulty)
            .sort((a, b) => a.gameTime - b.gameTime);
        const completedToday = this.utcDateKey(
            new Date(Date.parse(entry.startedAt) + entry.gameTime),
        );
        const todayEntries = difficultyEntries.filter(
            (candidate) =>
                this.utcDateKey(
                    new Date(
                        Date.parse(candidate.startedAt) + candidate.gameTime,
                    ),
                ) === completedToday,
        );

        return {
            today: todayEntries.indexOf(entry) + 1,
            allTime: difficultyEntries.indexOf(entry) + 1,
        };
    }

    private async readLeaderboard(): Promise<LeaderboardEntry[]> {
        let contents: string;
        try {
            contents = await readFile("leaderboard.json", "utf-8");
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
                return [];
            }
            throw error;
        }

        const entries: unknown = JSON.parse(contents);
        if (
            !Array.isArray(entries) ||
            !entries.every((entry) => this.isLeaderboardEntry(entry))
        ) {
            throw new Error(
                "leaderboard.json does not contain a leaderboard array",
            );
        }
        return entries;
    }

    private isLeaderboardEntry(entry: unknown): entry is LeaderboardEntry {
        if (typeof entry !== "object" || entry === null) {
            return false;
        }
        const candidate = entry as Record<string, unknown>;
        return (
            typeof candidate.memberNumber === "number" &&
            typeof candidate.name === "string" &&
            typeof candidate.nickName === "string" &&
            typeof candidate.difficulty === "string" &&
            this.isDifficulty(candidate.difficulty) &&
            typeof candidate.startedAt === "string" &&
            !Number.isNaN(Date.parse(candidate.startedAt)) &&
            typeof candidate.gameTime === "number" &&
            Number.isFinite(candidate.gameTime) &&
            candidate.gameTime >= 0
        );
    }

    private formatLeaderboard(entries: LeaderboardEntry[]): string {
        if (entries.length === 0) {
            return "No wins yet.";
        }
        return entries
            .slice(0, 10)
            .map(
                (entry, index) =>
                    `${index + 1}. ${entry.nickName || entry.name} (#${entry.memberNumber}) - ${this.formatGameTime(entry.gameTime)}`,
            )
            .join("\n");
    }

    private formatGameTime(milliseconds: number): string {
        const totalTenths = Math.round(milliseconds / 100);
        const minutes = Math.floor(totalTenths / 600);
        const seconds = (totalTenths % 600) / 10;
        return minutes > 0
            ? `${minutes}m ${seconds.toFixed(1)}s`
            : `${seconds.toFixed(1)}s`;
    }

    private utcDateKey(date: Date): string {
        return date.toISOString().slice(0, 10);
    }

    private async updateRoomDescription(): Promise<void> {
        if (this.activePlayerName && !this.gameEnded) {
            this.conn.ChatRoomUpdate({
                Description: `${this.activePlayerName} is playing!`,
            });
            return;
        }

        let entries: LeaderboardEntry[];
        try {
            entries = await this.readLeaderboard();
        } catch (error) {
            console.error(
                "Unable to read leaderboard.json for room description",
                error,
            );
            this.conn.ChatRoomUpdate({
                Description: defaultMessage,
            });
            return;
        }

        const today = this.utcDateKey(new Date());
        const todaysEntries = entries.filter(
            (entry) =>
                this.utcDateKey(
                    new Date(Date.parse(entry.startedAt) + entry.gameTime),
                ) === today,
        );
        const difficultyOrder: Difficulty[] = ["hard", "medium", "easy"];
        const highestDifficulty = difficultyOrder.find((difficulty) =>
            todaysEntries.some((entry) => entry.difficulty === difficulty),
        );
        if (!highestDifficulty) {
            this.conn.ChatRoomUpdate({
                Description: defaultMessage,
            });
            return;
        }

        const bestEntry = todaysEntries
            .filter((entry) => entry.difficulty === highestDifficulty)
            .sort((a, b) => a.gameTime - b.gameTime)[0];
        this.conn.ChatRoomUpdate({
            Description: `Today's best time: ${bestEntry.nickName || bestEntry.name} ${this.formatGameTime(bestEntry.gameTime)} (${bestEntry.difficulty})`,
        });
    }

    private async playerLose(position: ChatRoomMapPos): Promise<void> {
        this.gameEnded = true;
        this.clearDisconnectTimers();
        await this.updateRoomDescription();
        this.revealMineResults();
        await this.explodeAt(
            position,
            this.activePlayerName ?? "the player",
            "losers",
        );
    }

    private async explodeAt(
        position: ChatRoomMapPos,
        playerName: string,
        conveyTo: "losers" | "winners" | undefined,
    ): Promise<void> {
        const slime =
            SLIME_FLOORS[Math.floor(Math.random() * SLIME_FLOORS.length)];
        const affectedTiles = this.drawExplosion(position, slime.tile);
        this.drawLosersArea();
        const affectedPlayers = this.conn.chatRoom.characters.filter(
            (character) =>
                affectedTiles.has(`${character.X},${character.Y}`) &&
                !character.IsBot(),
        );
        this.conn.SendMessage(
            "Emote",
            `(💥💥💥Boom!💥💥💥${"\n"}An explosion fills the room and ${playerName} is covered head to toe in a thick layer of slick, liquid ${slime.colour} slime that begins to rapidly harden.`,
        );
        await Promise.all(
            affectedPlayers.map((character) =>
                this.applySlime(character, slime.itemColour),
            ),
        );
        await this.hardenSlime(affectedPlayers, slime.itemColour);
        await wait(5000);
        if (conveyTo) {
            await this.conveyPlayers(affectedPlayers, conveyTo);
        }

        for (const character of affectedPlayers) {
            const glue = character.Appearance.AddItem(
                AssetGet("ItemDevices", "GlueFloor"),
            );
            glue.SetDifficulty(10);
            glue.SetColor(slime.itemColour);
        }
    }

    private revealMineResults(): void {
        for (
            let index = 0;
            index < this.boardSize.width * this.boardSize.height;
            index++
        ) {
            const position = {
                X: this.boardOrigin.X + (index % this.boardSize.width),
                Y:
                    this.boardOrigin.Y +
                    Math.floor(index / this.boardSize.width),
            };

            if (this.mines.has(index) && !this.flags.has(index)) {
                this.conn.chatRoom.map.setObject(position, "Black", "Banners");
            } else if (this.flags.has(index) && !this.mines.has(index)) {
                this.conn.chatRoom.map.setObject(position, "IconCross");
            }
        }
    }

    private drawExplosion(
        position: ChatRoomMapPos,
        floorTile: string,
    ): Set<string> {
        const radius = 3;
        const affectedTiles = new Set<string>();
        for (let offsetY = -radius; offsetY <= radius; offsetY++) {
            for (let offsetX = -radius; offsetX <= radius; offsetX++) {
                if (
                    Math.hypot(offsetX, offsetY) > radius ||
                    (Math.max(Math.abs(offsetX), Math.abs(offsetY)) > 1 &&
                        Math.random() >= 0.4)
                ) {
                    continue;
                }

                const X = position.X + offsetX;
                const Y = position.Y + offsetY;
                if (X < 0 || Y < 0 || X >= 40 || Y >= 40) {
                    continue;
                }
                this.conn.chatRoom.map.setTile({ X, Y }, floorTile, "Floor");
                affectedTiles.add(`${X},${Y}`);
            }
        }
        return affectedTiles;
    }

    private async applySlime(
        character: API_Character,
        colour: HexColor,
    ): Promise<void> {
        const slots = [
            "ItemBoots",
            "ItemFeet",
            "ItemLegs",
            "ItemArms",
            "ItemHood",
        ] as const;
        for (const [index, slot] of slots.entries()) {
            const slime = character.Appearance.AddItem(AssetGet(slot, "Slime"));
            slime.SetColor(colour);
            slime.SetDifficulty(10);
            if (index < slots.length - 1) {
                await wait(100);
            }
        }
    }

    private async hardenSlime(
        characters: API_Character[],
        colour: HexColor,
    ): Promise<void> {
        await wait(5000);
        this.conn.SendMessage(
            "Emote",
            "(Oh no, the slime is starting to harden, tightening into a glossy shell.",
        );
        for (const character of characters) {
            this.replaceItem(character, "ItemHood", "DroneMask", colour);
        }

        await wait(5000);
        this.conn.SendMessage(
            "Emote",
            "(Bad news! The slime continues to solidify, squeezing their arms tightly against their body.",
        );
        for (const character of characters) {
            this.replaceItem(character, "ItemArms", "StraitLeotard", colour);
        }

        await wait(5000);
        this.conn.SendMessage(
            "Emote",
            "(The slime has completely hardened leaving a perfect, sleek statue.",
        );
        for (const character of characters) {
            this.replaceItem(
                character,
                "ItemLegs",
                "SeamlessHobbleSkirt",
                colour,
            );
            character.Appearance.RemoveItem("ItemFeet");
            character.Appearance.stripBulk({ clothing: true });
            character.sendAppearanceUpdate();
        }
    }

    private replaceItem(
        character: API_Character,
        group: AssetGroupName,
        name: string,
        colour: HexColor,
    ): void {
        const item = character.Appearance.AddItem(AssetGet(group, name));
        item.SetColor(colour);
        item.SetDifficulty(10);
    }

    private drawLosersArea(): void {
        for (
            let x = LOSERS_AREA.X;
            x < LOSERS_AREA.X + LOSERS_AREA.width;
            x++
        ) {
            this.conn.chatRoom.map.setTile(
                { X: x, Y: LOSERS_AREA.Y },
                "CarpetRed2",
                "Floor",
            );
        }
        this.conn.chatRoom.map.writeText(
            { X: LOSERS_AREA.X, Y: LOSERS_AREA.Y },
            "LOSERS",
            LOSERS_AREA.width,
        );
    }

    private async conveyPlayers(
        characters: API_Character[],
        destinationArea: "losers" | "winners",
    ): Promise<void> {
        const area = destinationArea === "losers" ? LOSERS_AREA : WINNERS_AREA;
        const reserved = new Set(
            this.conn.chatRoom.characters
                .filter((character) =>
                    this.positionIsInArea(character.MapPos, area),
                )
                .map((character) => `${character.X},${character.Y}`),
        );

        for (const character of characters) {
            const destination = this.findFreeAreaSquare(area, reserved);
            if (!destination) {
                break;
            }
            reserved.add(`${destination.X},${destination.Y}`);
            const path = this.findConveyorPath(character.MapPos, destination);
            if (path.length < 2) {
                continue;
            }

            this.conn.SendMessage(
                "Emote",
                `(${character.Name} is being conveyed to the ${destinationArea === "losers" ? "loser's" : "special winner's"} area.`,
            );
            this.drawConveyorPath(path);
            character.mapTeleport(path[1]);
            await wait((path.length - 1) * 600);
            character.mapTeleport(destination);
            this.clearConveyorPath(path);
        }
    }

    private findFreeAreaSquare(
        area: { X: number; Y: number; width: number },
        reserved: Set<string>,
    ): ChatRoomMapPos | undefined {
        for (let x = area.X; x < area.X + area.width; x++) {
            const position = { X: x, Y: area.Y };
            if (!reserved.has(`${position.X},${position.Y}`)) {
                return position;
            }
        }
        return undefined;
    }

    private positionIsInArea(
        position: ChatRoomMapPos,
        area: { X: number; Y: number; width: number },
    ): boolean {
        return (
            position.Y === area.Y &&
            position.X >= area.X &&
            position.X < area.X + area.width
        );
    }

    private findConveyorPath(
        start: ChatRoomMapPos,
        destination: ChatRoomMapPos,
    ): ChatRoomMapPos[] {
        const pending: ChatRoomMapPos[][] = [[{ ...start }]];
        const visited = new Set([`${start.X},${start.Y}`]);
        const directions = [
            { X: 1, Y: 0 },
            { X: -1, Y: 0 },
            { X: 0, Y: 1 },
            { X: 0, Y: -1 },
        ];

        while (pending.length > 0) {
            const path = pending.shift()!;
            const current = path[path.length - 1];
            if (current.X === destination.X && current.Y === destination.Y) {
                return path;
            }

            for (const direction of directions) {
                const next = {
                    X: current.X + direction.X,
                    Y: current.Y + direction.Y,
                };
                const key = `${next.X},${next.Y}`;
                if (
                    next.X >= 0 &&
                    next.X < 40 &&
                    next.Y >= GRID_ORIGIN.Y &&
                    next.Y < GRID_ORIGIN.Y + GRID_HEIGHT &&
                    !visited.has(key)
                ) {
                    visited.add(key);
                    pending.push([...path, next]);
                }
            }
        }
        return [];
    }

    private drawConveyorPath(path: ChatRoomMapPos[]): void {
        for (let index = 0; index < path.length - 1; index++) {
            const current = path[index];
            const next = path[index + 1];
            let rotation = 0;
            if (next.X > current.X) rotation = 180;
            else if (next.Y > current.Y) rotation = 270;
            else if (next.Y < current.Y) rotation = 90;

            this.conn.chatRoom.map.setObject(
                current,
                "ConveyorBelt1",
                "Functional",
                rotation,
            );
        }
    }

    private clearConveyorPath(path: ChatRoomMapPos[]): void {
        for (let index = 0; index < path.length - 1; index++) {
            this.conn.chatRoom.map.setObject(path[index], "Passable");
        }
        this.drawLosersArea();
    }

    private clearBoard(): void {
        for (const position of this.victoryBalloonPositions) {
            const [x, y] = position.split(",").map(Number);
            this.conn.chatRoom.map.setObject({ X: x, Y: y }, "Passable");
        }
        this.victoryBalloonPositions.clear();

        for (let y = GRID_ORIGIN.Y; y < GRID_ORIGIN.Y + GRID_HEIGHT; y++) {
            for (let x = GRID_ORIGIN.X; x < GRID_ORIGIN.X + GRID_WIDTH; x++) {
                this.conn.chatRoom.map.setTile(
                    { X: x, Y: y },
                    "CarpetBlack",
                    "Floor",
                );
                if (
                    x !== ENTRY_FLAG_POSITION.X ||
                    y !== ENTRY_FLAG_POSITION.Y
                ) {
                    this.conn.chatRoom.map.setObject(
                        { X: x, Y: y },
                        "Passable",
                    );
                }
            }
        }
        this.clearMineCount();
        this.boardOrigin = { ...GRID_ORIGIN };
        this.boardSize = { width: 0, height: 0 };
        this.mines.clear();
        this.flags.clear();
        this.revealed.clear();
        this.activePlayerName = undefined;
        this.activePlayerMemberNumber = undefined;
        this.activeDifficulty = undefined;
        this.gameStartedAt = undefined;
        this.gameEnded = false;
        this.clearDisconnectTimers();
        this.drawLosersArea();
    }

    private clearDisconnectTimers(): void {
        for (const timer of this.disconnectTimers) {
            clearTimeout(timer);
        }
        this.disconnectTimers = [];
    }

    private async resetGame(message: string): Promise<void> {
        await this.setupRoom();
        this.conn.SendMessage("Emote", `( ${message} )`);
    }

    private drawIdleTitle(): void {
        const paddedWidth = IDLE_TITLE.length + IDLE_TITLE_PADDING * 2;
        const paddedHeight = 1 + IDLE_TITLE_PADDING * 2;
        const width = paddedWidth + IDLE_TITLE_BORDER * 2;
        const height = paddedHeight + IDLE_TITLE_BORDER * 2;
        const origin = {
            X: GRID_ORIGIN.X + 2,
            Y: GRID_ORIGIN.Y + GRID_HEIGHT - height - 3,
        };

        for (let offsetY = 0; offsetY < height; offsetY++) {
            for (let offsetX = 0; offsetX < width; offsetX++) {
                const inPadding =
                    offsetX >= IDLE_TITLE_BORDER &&
                    offsetX < IDLE_TITLE_BORDER + paddedWidth &&
                    offsetY >= IDLE_TITLE_BORDER &&
                    offsetY < IDLE_TITLE_BORDER + paddedHeight;
                this.conn.chatRoom.map.setTile(
                    { X: origin.X + offsetX, Y: origin.Y + offsetY },
                    inPadding
                        ? "PaddedYellow"
                        : (offsetX + offsetY) % 2 === 0
                          ? "PaddedRed"
                          : "PaddedOrange",
                    "Floor",
                );
            }
        }

        this.conn.chatRoom.map.writeText(
            {
                X: origin.X + IDLE_TITLE_BORDER + IDLE_TITLE_PADDING,
                Y: origin.Y + IDLE_TITLE_BORDER + IDLE_TITLE_PADDING,
            },
            IDLE_TITLE,
        );
    }

    private getBoardOrigin(): { X: number; Y: number } {
        return {
            X: GRID_ORIGIN.X + 2,
            Y: GRID_ORIGIN.Y + GRID_HEIGHT - this.boardSize.height - 3,
        };
    }

    private drawBoard(
        origin: { X: number; Y: number },
        width: number,
        height: number,
    ): void {
        for (let y = origin.Y; y < origin.Y + height; y++) {
            for (let x = origin.X; x < origin.X + width; x++) {
                this.conn.chatRoom.map.setTile({ X: x, Y: y }, "Tile", "Floor");
            }
        }
    }

    private placeMines(count: number): void {
        const positions = Array.from(
            { length: this.boardSize.width * this.boardSize.height },
            (_, index) => index,
        );

        for (let i = 0; i < count; i++) {
            const randomIndex =
                i + Math.floor(Math.random() * (positions.length - i));
            [positions[i], positions[randomIndex]] = [
                positions[randomIndex],
                positions[i],
            ];
            this.mines.add(positions[i]);
        }
    }

    private revealSafeSquares(startIndex: number): void {
        const pending = [startIndex];

        while (pending.length > 0) {
            const index = pending.shift()!;
            if (
                this.revealed.has(index) ||
                this.flags.has(index) ||
                this.mines.has(index)
            ) {
                continue;
            }

            const x = index % this.boardSize.width;
            const y = Math.floor(index / this.boardSize.width);
            const adjacentMineCount = this.countAdjacentMines(x, y);
            const position = {
                X: this.boardOrigin.X + x,
                Y: this.boardOrigin.Y + y,
            };

            this.revealed.add(index);
            this.conn.chatRoom.map.setTile(position, "TileGray", "Floor");
            this.conn.chatRoom.map.setObject(
                position,
                adjacentMineCount > 0
                    ? `Number${adjacentMineCount}`
                    : "Passable",
            );

            if (adjacentMineCount === 0) {
                for (let offsetY = -1; offsetY <= 1; offsetY++) {
                    for (let offsetX = -1; offsetX <= 1; offsetX++) {
                        if (offsetX === 0 && offsetY === 0) continue;

                        const adjacentX = x + offsetX;
                        const adjacentY = y + offsetY;
                        if (
                            adjacentX >= 0 &&
                            adjacentY >= 0 &&
                            adjacentX < this.boardSize.width &&
                            adjacentY < this.boardSize.height
                        ) {
                            pending.push(
                                adjacentX + adjacentY * this.boardSize.width,
                            );
                        }
                    }
                }
            }
        }
    }

    private countAdjacentMines(x: number, y: number): number {
        let count = 0;
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
            for (let offsetX = -1; offsetX <= 1; offsetX++) {
                if (offsetX === 0 && offsetY === 0) continue;

                const adjacentX = x + offsetX;
                const adjacentY = y + offsetY;
                if (
                    adjacentX >= 0 &&
                    adjacentY >= 0 &&
                    adjacentX < this.boardSize.width &&
                    adjacentY < this.boardSize.height &&
                    this.mines.has(adjacentX + adjacentY * this.boardSize.width)
                ) {
                    count++;
                }
            }
        }
        return count;
    }

    private clearMineCount(): void {
        this.conn.chatRoom.map.writeText(
            { X: this.boardOrigin.X, Y: this.boardOrigin.Y - 1 },
            " ".repeat(MINE_COUNTER_WIDTH),
        );
    }

    private writeMineCount(): void {
        const remaining = this.mines.size - this.flags.size;
        const position = {
            X: this.boardOrigin.X,
            Y: this.boardOrigin.Y - 1,
        };
        this.clearMineCount();

        if (remaining < 0) {
            this.conn.chatRoom.map.setObject(position, "IconArrowDown");
            this.conn.chatRoom.map.writeText(
                { X: position.X + 1, Y: position.Y },
                Math.abs(remaining).toString(),
            );
        } else {
            this.conn.chatRoom.map.writeText(position, remaining.toString());
        }
    }
}
