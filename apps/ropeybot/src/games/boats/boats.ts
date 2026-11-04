import { randomBytes } from "crypto";
import {
    API_Connector,
    CommandParser,
    API_Character,
    BC_Server_ChatRoomMessage,
} from "bc-bot";
import { WebServer, type WebRequest, type WebResponse } from "../../webserver";
import {
    parsePlacements,
    renderPlacementPage,
    type BoatPlacement,
} from "./placementPage";
import { decompressFromBase64 } from "lz-string";

const BOT_POSITION = { X: 0, Y: 39 };
const GRID_ORIGIN_P1 = { X: 4, Y: 25 };
const GRID_ORIGIN_P2 = { X: 15, Y: 25 };

export interface BoatsConfig {
    // Public base URL of the web server, eg. https://example.com/
    baseUrl: string;
    // Port the web server listens on
    port: number;
}

interface BoatsPlayer {
    memberNumber: number;
    name: string;
    token: string;
    placement?: BoatPlacement[];
}

const MAP = "N4IgKgngDgpiBcICCAbA7gQwgZxAGnAEsUZdEATSq6m2u+hxp5l1t9jzr7n3v/gYKHCRoseImSp0mbLnzugJpBlK1WvUbFTRQCq9+g4aNGtjXcYuW9phuav2DN+ncAsQG/cedAYJ++/+pzpXDxDvP3CA7X0Q0PCI6yi9GM84/wSzaOS3MNSvSIykrJcc1PzbTKySuLLnCuSq+J1A2mDK3J8aoLqYhrSmxIdB5po7Qfth6lGxywmqKenjWcp5hcMl8nwQAHkAIwArGABjABcyEAULy6vrm9u7+4fHp+eX17f3j8+v75/fv/+AYCgXcAHYCTYAYRgKBQABEMMcMAhgABfFFAA=@EAApAIABfwb/e/9//284fg==";

export class Boats {
    public static description = `Boats
 =====

BOATS, BOATS, BOATS!

Sink the other player's boats before they sink yours.
A game whose resemblance to any other grid-based naval strategy game is purely coincidental.

!join
Joins the game. You'll be whispered a link to place your boats.
`;

    private commandParser: CommandParser;
    private players: BoatsPlayer[] = [];
    private web: WebServer;

    public constructor(
        private conn: API_Connector,
        private config: BoatsConfig,
    ) {
        this.conn.on("RoomCreate", this.onChatRoomCreated);
        this.conn.on("RoomJoin", this.onChatRoomJoined);

        this.commandParser = new CommandParser(conn);
        this.commandParser.register("join", this.onJoin);

        this.web = new WebServer(config.port);
        this.web.route("/place", (req) => this.placePage(req));
        this.web.start();
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

    private setupRoom = async () => {
        this.conn.moveOnMap(BOT_POSITION.X, BOT_POSITION.Y);
        this.conn.chatRoom.map.setMapFromData(
            JSON.parse(decompressFromBase64(MAP)),
        );
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
                return { status: 400, body: "You have already placed your boats" };
            }
            const placement = parsePlacements(req.body);
            if (!placement) {
                return { status: 400, body: "Invalid placement" };
            }
            player.placement = placement;
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
                this.conn.reply(msg, "The game is full.");
                return;
            }
            player = {
                memberNumber: sender.MemberNumber,
                name: sender.toString(),
                token: randomBytes(16).toString("hex"),
            };
            this.players.push(player);
            this.conn.SendMessage("Emote", `( ${sender} joins the game.`);
        }
        sender.Tell(
            "Whisper",
            `( You're in! Place your boats: ${this.placeUrl(player.token)} )`,
        );
    };
}
