/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { io } from "socket.io-client";
import { API_Character, API_Character_Data, ItemPermissionLevel } from "./apiCharacter";
import { API_Chatroom, API_Chatroom_Data, ChatRoomAccessVisibility } from "./apiChatroom";
import { Socket } from "socket.io-client";
import { LogicBase } from "./logicBase";
import { API_AppearanceItem, BC_AppearanceItem } from "./item";
import { compressToUTF16 } from "lz-string";
import { EventEmitter } from "stream";
import { BC_Server_ChatRoomMessage, TBeepType } from "./logicEvent";
import { SocketWrapper } from "./socketWrapper";
import { wait } from "./util/wait";

export enum LeaveReason {
    DISCONNECT = "ServerDisconnect",
    LEAVE = "ServerLeave",
    KICK = "ServerKick",
    BAN = "ServerBan",
}

export type TellType = "Whisper" | "Chat" | "Emote" | "Activity";

export interface RoomDefinition {
    Name: string;
    Description: string;
    Background: string;
    Private?: boolean;
    Locked?: boolean | null;
    Access: ChatRoomAccessVisibility[];
    Visibility: ChatRoomAccessVisibility[];
    Space: ServerChatRoomSpace;
    Admin: number[];
    Ban: number[];
    Limit: number | string;
    BlockCategory: ServerChatRoomBlockCategory[];
    Game: ServerChatRoomGame;
    Language: ServerChatRoomLanguage;
    MapData?: ServerChatRoomMapData;
}

export interface SingleItemUpdate extends BC_AppearanceItem {
    Target: number;
}

export interface SyncItemPayload {
    Source: number;
    Item: SingleItemUpdate;
}

export interface SyncMapDataPayload {
    MemberNumber: number;
    MapData: ChatRoomMapData;
}

// What the bot advertises as its game version
const GAMEVERSION = "R116";
const LZSTRING_MAGIC = "╬";

class PromiseResolve<T> {
    public prom: Promise<T>;
    public resolve!: (x: T) => void;

    constructor() {
        this.prom = new Promise<T>((r) => {
            this.resolve = r;
        });
    }
}

interface ChatRoomAllowItem {
    MemberNumber: number;
}

interface ChatRoomAllowItemResponse extends ChatRoomAllowItem {
    AllowItem: boolean;
}

interface ReorderPlayers {
    PlayerOrder: number[];
}

interface ChatRoomAdmin {
    Action: "Update" | "MoveLeft" | "MoveRight" | "Kick";
    MemberNumber?: number;
    Publish?: boolean;
    Room?: Partial<RoomDefinition>;
}

export interface MessageEvent {
    sender: API_Character;
    message: BC_Server_ChatRoomMessage;
}

interface OnlineFriendResult {
    ChatRoomName: string;
    ChatRoomSpace: string;
    MemberName: string;
    MemberNumber: number;
    Private: boolean;
    Type: string;
}

interface ConnectorEvents {
    PoseChange: [{character: API_Character}];
    Message: [message: MessageEvent];
    Beep: [{ payload: TBeepType }];
    RoomJoin: [];
    RoomCreate: [];
    CharacterEntered: [character: API_Character];
    CharacterLeft: [{
        sourceMemberNumber: number,
        character: API_Character,
        leaveMessage: string | null,
        intentional: boolean,
    }];
}

export class API_Connector extends EventEmitter<ConnectorEvents> {
    private sock: Socket;
    private wrappedSock: SocketWrapper;
    private _player: API_Character | undefined;
    public _chatRoom?: API_Chatroom;

    private started = false;
    private roomJoined: RoomDefinition;

    private loggedIn = new PromiseResolve<void>();
    private roomSynced = new PromiseResolve<void>();

    private roomJoinPromise: PromiseResolve<string>;
    private roomCreatePromise: PromiseResolve<string>;
    private roomSearchPromise: PromiseResolve<RoomDefinition[]>; // (type not quite right: has 'Creator', MemberCount, MemberLimit)
    private onlineFriendsPromise: PromiseResolve<OnlineFriendResult[]>;
    private itemAllowQueries = new Map<
        number,
        PromiseResolve<ChatRoomAllowItemResponse>
    >();

    private leaveReasons = new Map<number, LeaveReason>();

    private bot?: LogicBase;

    constructor(
        private url: string,
        public username: string,
        private password: string,
        env: "live" | "test",
    ) {
        super();

        const origin =
            env === "live"
                ? "https://www.bondageprojects.elementfx.com"
                : "http://localhost:7777";

        console.log(`Connecting to ${this.url} with origin ${origin}`);
        this.sock = io(this.url, {
            transports: ["websocket"],
            extraHeaders: {
                Origin: origin,
            },
        });
        this.wrappedSock = new SocketWrapper(this.sock);

        this.sock.on("connect", this.onSocketConnect);
        this.sock.on("connect_error", this.onSocketConnectError);
        this.sock.io.on("reconnect", this.onSocketReconnect);
        this.sock.io.on("reconnect_attempt", this.onSocketReconnectAttempt);
        this.sock.on("disconnect", this.onSocketDisconnect);
        this.sock.on("ServerInfo", this.onServerInfo);
        this.sock.on("LoginResponse", this.onLoginResponse);
        this.sock.on("ChatRoomCreateResponse", this.onChatRoomCreateResponse);
        this.sock.on("ChatRoomUpdateResponse", this.onChatRoomUpdateResponse);
        this.sock.on("ChatRoomSync", this.onChatRoomSync);
        this.sock.on("ChatRoomSyncMemberJoin", this.onChatRoomSyncMemberJoin);
        this.sock.on("ChatRoomSyncMemberLeave", this.onChatRoomSyncMemberLeave);
        this.sock.on(
            "ChatRoomSyncRoomProperties",
            this.onChatRoomSyncRoomProperties,
        );
        this.sock.on("ChatRoomSyncCharacter", this.onChatRoomSyncCharacter);
        this.sock.on(
            "ChatRoomSyncReorderPlayers",
            this.onChatRoomSyncReorderPlayers,
        );
        this.sock.on("ChatRoomSyncSingle", this.onChatRoomSyncSingle);
        this.sock.on("ChatRoomSyncExpression", this.onChatRoomSyncExpression);
        this.sock.on("ChatRoomSyncPose", this.onChatRoomSyncPose);
        this.sock.on("ChatRoomSyncArousal", this.onChatRoomSyncArousal);
        this.sock.on("ChatRoomSyncItem", this.onChatRoomSyncItem);
        this.sock.on("ChatRoomSyncMapData", this.onChatRoomSyncMapData);
        this.sock.on("ChatRoomMessage", this.onChatRoomMessage);
        this.sock.on("ChatRoomAllowItem", this.onChatRoomAllowItem);
        this.sock.on(
            "ChatRoomCharacterItemUpdate",
            this.onChatRoomCharacterItemUpdate,
        );
        this.sock.on("ChatRoomSearchResult", this.onChatRoomSearchResult);
        this.sock.on("ChatRoomSearchResponse", this.onChatRoomSearchResponse);
        this.sock.on("AccountBeep", this.onAccountBeep);
        this.sock.on("AccountQueryResult", this.onAccountQueryResult);
    }

    public isConnected(): boolean {
        return this.sock.connected;
    }

    public getBot(): LogicBase {
        return this.bot;
    }

    public get Player(): API_Character {
        return this._player!;
    }

    public get chatRoom(): API_Chatroom {
        return this._chatRoom!;
    }

    public SendMessage(
        type: TellType,
        msg: string,
        target?: number,
        dict?: Record<string, any>[],
    ): void {
        if (msg.length > 1000) {
            console.error("Message too long, truncating");
            msg = msg.substring(0, 1000);
        }

        console.log(`Sending ${type}`, msg);

        const payload = { Type: type, Content: msg } as Record<string, any>;
        if (target) payload.Target = target;
        if (dict) payload.Dictionary = dict;
        this.wrappedSock.emit("ChatRoomChat", payload);
    }

    public reply(orig: BC_Server_ChatRoomMessage, reply: string): void {
        const prefix = this.chatRoom.usesMaps() ? "(" : "";

        if (orig.Type === "Chat") {
            if (this.chatRoom.usesMaps()) {
                this.SendMessage("Chat", prefix + reply);
            } else {
                this.SendMessage("Emote", "*" + prefix + reply);
            }
        } else {
            this.SendMessage("Whisper", prefix + reply, orig.Sender);
        }
    }

    public ChatRoomUpdate(update: Record<string, any>): void {
        this.chatRoom.update(update);
        const payload = {
            Action: "Update",
            MemberNumber: 0,
            Room: {
                ...this.chatRoom.ToInfo(),
                //...update,
            },
        } as ChatRoomAdmin;
        if (payload.Room.Limit !== undefined)
            payload.Room.Limit = payload.Room.Limit + "";
        //console.log("Updating chat room", payload);
        this.chatRoomAdmin(payload);
    }

    public chatRoomAdmin(payload: ChatRoomAdmin) {
        this.wrappedSock.emit("ChatRoomAdmin", payload);
    }

    public AccountBeep(
        memberNumber: number,
        beepType: null,
        message: string,
    ): void {
        this.wrappedSock.emit("AccountBeep", {
            BeepType: beepType ?? "",
            MemberNumber: memberNumber,
            Message: message,
        });
    }

    public async QueryOnlineFriends(): Promise<API_Character[]> {
        if (!this.onlineFriendsPromise) {
            this.onlineFriendsPromise = new PromiseResolve<
                OnlineFriendResult[]
            >();
            this.wrappedSock.emit("AccountQuery", {
                Query: "OnlineFriends",
            });
        }

        const result = await this.onlineFriendsPromise.prom;
        return result.map((m) =>
            this._chatRoom.findMember(m.MemberNumber),
        );
    }

    private onSocketConnect = async () => {
        console.log("Socket connected!");
        this.wrappedSock.emit("AccountLogin", {
            AccountName: this.username,
            Password: this.password,
        });
        if (!this.started) await this.start();
        if (this.roomJoined) await this.joinOrCreateRoom(this.roomJoined);
    };

    private onSocketConnectError = (err: Error) => {
        console.log(`Socket connect error: ${err.message}`);
    };

    private onSocketReconnect = () => {
        console.log("Socket reconnected");
    };

    private onSocketReconnectAttempt = () => {
        console.log("Socket reconnect attempt");
    };

    private onSocketDisconnect = () => {
        console.log("Socket disconnected");
        this.loggedIn = new PromiseResolve<void>();
        this.roomSynced = new PromiseResolve<void>();
    };

    private onServerInfo = (info: any) => {
        console.log("Server info: ", info);
    };

    private onLoginResponse = (resp: API_Character_Data) => {
        console.log("Got login response", resp);
        this._player = new API_Character(resp, this, undefined);
        this.loggedIn.resolve();
    };

    private onChatRoomCreateResponse = (resp: string) => {
        console.log("Got chat room create response", resp);
        this.roomCreatePromise.resolve(resp);
    };

    private onChatRoomUpdateResponse = (resp: any) => {
        console.log("Got chat room update response", resp);
    };

    private onChatRoomSync = (resp: API_Chatroom_Data) => {
        //console.log("Got chat room sync", resp);
        if (!this._chatRoom) {
            this._chatRoom = new API_Chatroom(resp, this, this._player);
        } else {
            this._chatRoom.update(resp);
        }
        this.roomSynced.resolve();
        this.roomJoined = {
            Name: resp.Name,
            Description: resp.Description,
            Background: resp.Background,
            Access: resp.Access,
            Visibility: resp.Visibility,
            Space: resp.Space,
            Admin: resp.Admin,
            Ban: resp.Ban,
            Limit: resp.Limit,
            BlockCategory: resp.BlockCategories,
            Game: resp.Game,
            Language: resp.Language,
        };
    };

    private onChatRoomSyncMemberJoin = (resp: any) => {
        console.log("Chat room member joined", resp.Character?.Name);

        this.leaveReasons.delete(resp.Character.MemberNumber);

        this._chatRoom.memberJoined(resp.Character);

        const char = this._chatRoom.getCharacter(resp.Character.MemberNumber);

        this.emit("CharacterEntered", char);
        this.bot?.onEvent({
            name: "CharacterEntered",
            connection: this,
            character: char,
        });
        this.bot?.onCharacterEnteredPub(this, char);
    };

    private onChatRoomSyncMemberLeave = (resp: any) => {
        console.log(
            `chat room member left with reason ${this.leaveReasons.get(resp.SourceMemberNumber)}`,
            resp,
        );
        const leftMember = this._chatRoom.getCharacter(resp.SourceMemberNumber);
        this._chatRoom.memberLeft(resp.SourceMemberNumber);

        this.emit("CharacterLeft", {
            sourceMemberNumber: resp.SourceMemberNumber,
            character: leftMember,
            leaveMessage: null,
            intentional:
                this.leaveReasons.get(resp.SourceMemberNumber) !==
                LeaveReason.DISCONNECT,
        });
        this.bot?.onEvent({
            name: "CharacterLeft",
            connection: this,
            sourceMemberNumber: resp.SourceMemberNumber,
            character: leftMember,
            leaveMessage: null,
            intentional:
                this.leaveReasons.get(resp.SourceMemberNumber) !==
                LeaveReason.DISCONNECT,
        });
        this.bot?.onCharacterLeftPub(this, leftMember, true);
    };

    private onChatRoomSyncRoomProperties = (resp: API_Chatroom_Data) => {
        //console.log("sync room properties", resp);
        this._chatRoom.update(resp);

        // sync some data back to the definition of the room we're joined to so that, after
        // a void, we recreate the room with the same settings
        this.roomJoined.Access = resp.Access;
        this.roomJoined.Visibility = resp.Visibility;
        this.roomJoined.Ban = resp.Ban;
        this.roomJoined.Limit = resp.Limit;
        this.roomJoined.BlockCategory = resp.BlockCategories;
        this.roomJoined.Game = resp.Game;
        this.roomJoined.Name = resp.Name;
        this.roomJoined.Description = resp.Description;
        this.roomJoined.Background = resp.Background;

        // remove these if they're there. The server will have converted to new
        // Access / Visibility fields and won't accept a ChatRoomCreate with both
        // Private/Locked and Access/Visibility
        delete this.roomJoined.Private;
        delete this.roomJoined.Locked;
    };

    private onChatRoomSyncCharacter = (resp: any) => {
        //console.log("sync character", resp);
        this._chatRoom.characterSync(
            resp.Character.MemberNumber,
            resp.Character,
            resp.SourceMemberNumber,
        );
    };

    private onChatRoomSyncReorderPlayers = (resp: ReorderPlayers) => {
        //console.log("sync reorder players", resp);
        this._chatRoom.onReorder(resp.PlayerOrder);
    };

    private onChatRoomSyncSingle = (resp: any) => {
        //console.log("sync single", resp);
        this._chatRoom.characterSync(
            resp.Character.MemberNumber,
            resp.Character,
            resp.SourceMemberNumber,
        );
    };

    private onChatRoomSyncExpression = (resp: any) => {
        //console.log("sync expression", resp);
        const char = this.chatRoom.getCharacter(resp.MemberNumber);
        const item = new API_AppearanceItem(char, {
            Group: resp.Group,
            Name: resp.Name,
            Property: {
                Expression: resp.Name,
            },
        });
        this.bot?.onCharacterEventPub(this, {
            name: "ItemChange",
            item,
            character: char,
            source: char,
        });
    };

    private onChatRoomSyncPose = (resp: any) => {
        //console.log("got sync pose", resp);
        const char = this.chatRoom.getCharacter(resp.MemberNumber);
        char.update({
            ActivePose: resp.Pose,
        });
        this.emit("PoseChange", {
            character: char,
        });
        this.bot?.onCharacterEventPub(this, {
            name: "PoseChanged",
            character: char,
        });
    };

    private onChatRoomSyncArousal = (resp: any) => {
        //console.log("Chat room sync arousal", resp);
    };

    private onChatRoomSyncItem = (update: SyncItemPayload) => {
        console.log("Chat room sync item", update);
        this._chatRoom.characterItemUpdate(update.Item);
        if (update.Item.Target === this._player.MemberNumber) {
            const payload = {
                AssetFamily: "Female3DCG",
                Appearance: this.Player.Appearance.getAppearanceData(),
            };
            this.accountUpdate(payload);
        }
    };

    private onChatRoomSyncMapData = (update: SyncMapDataPayload) => {
        console.log("chat room map data", update);
        this._chatRoom.mapPositionUpdate(update.MemberNumber, update.MapData.Pos);
    };

    private onChatRoomMessage = (msg: BC_Server_ChatRoomMessage) => {
        // Don't log BCX spam
        if (msg.Type !== "Hidden" && !["BCXMsg", "BCEMsg", "LSCGMsg", "bctMsg", "MPA", "dogsMsg", "bccMsg", "ECHO_INFO2", "MoonCEBC"].includes(msg.Content) && msg.Sender !== this.Player.MemberNumber) {
            console.log("chat room message", msg);
        }

        const char = this._chatRoom.getCharacter(msg.Sender);

        if (
            msg.Type === "Action" &&
            Object.values(LeaveReason).includes(msg.Content as LeaveReason)
        ) {
            this.leaveReasons.set(
                char.MemberNumber,
                msg.Content as LeaveReason,
            );
        }

        this.emit("Message", {
            sender: char,
            message: msg,
        } as MessageEvent);
        this.bot?.onEvent({
            name: "Message",
            connection: this,
            Sender: char,
            message: msg,
        });
        this.bot?.onMessagePub(this, msg, char);
    };

    private onChatRoomAllowItem = (resp: ChatRoomAllowItemResponse) => {
        console.log("ChatRoomAllowItem", resp);
        const promResolve = this.itemAllowQueries.get(resp.MemberNumber);
        if (promResolve) {
            this.itemAllowQueries.delete(resp.MemberNumber);
            promResolve.resolve(resp);
        }
    };

    private onChatRoomCharacterItemUpdate = (update: SingleItemUpdate) => {
        console.log("Chat room character item update", update);
        this._chatRoom.characterItemUpdate(update);
        /*if (update.Target === this._player.MemberNumber) {
            const payload = {
                AssetFamily: "Female3DCG",
                Appearance: this.Player.Appearance.getAppearanceData(),
            };
            this.accountUpdate(payload);
        }*/
    };

    private onAccountBeep = (payload: TBeepType) => {
        if (payload?.Message && typeof payload.Message === "string") payload.Message = payload.Message.split("\n\n")[0];
        // legacy
        this.bot?.onEvent({
            name: "Beep",
            connection: this,
            beep: payload,
        });
        // new
        this.emit("Beep", { payload });
    };

    private onAccountQueryResult = (payload: Record<string, any>) => {
        if (payload.Query === "OnlineFriends") {
            this.onlineFriendsPromise.resolve(payload.Result);
        }
    };

    private onChatRoomSearchResult = (results: RoomDefinition[]) => {
        console.log("Chat room search result", results);
        if (!this.roomSearchPromise) return;
        this.roomSearchPromise.resolve(results);
    };

    private onChatRoomSearchResponse = (result: string) => {
        console.log("Chat room search (join) response", result);
        if (!this.roomJoinPromise) return;
        this.roomJoinPromise.resolve(result);
    };

    public async ChatRoomJoin(name: string): Promise<boolean> {
        if (this.roomJoinPromise) {
            const result = await this.roomJoinPromise.prom;
            return result === "JoinedRoom";
        }

        this.roomJoinPromise = new PromiseResolve();

        try {
            this.wrappedSock.emit("ChatRoomJoin", {
                Name: name,
            });

            const joinResult = await this.roomJoinPromise.prom;
            if (joinResult !== "JoinedRoom") {
                console.log("Failed to join room", joinResult);
                return false;
            }
        } finally {
            this.roomJoinPromise = undefined;
        }

        console.log("Room joined");

        await this.roomSynced.prom;
        this._player.chatRoom = this._chatRoom;

        this.emit("RoomJoin");

        return true;
    }

    public async ChatRoomCreate(roomDef: RoomDefinition): Promise<boolean> {
        if (this.roomCreatePromise) {
            const result = await this.roomCreatePromise.prom;
            return result === "ChatRoomCreated";
        }

        console.log("creating room");
        this.roomCreatePromise = new PromiseResolve();

        try {
            this.wrappedSock.emit("ChatRoomCreate", {
                Admin: [this._player.MemberNumber],
                ...roomDef,
            });

            const createResult = await this.roomCreatePromise.prom;
            if (createResult !== "ChatRoomCreated") {
                console.log("Failed to create room", createResult);
                return false;
            }
        } finally {
            this.roomCreatePromise = undefined;
        }

        console.log("Room created");

        await this.roomSynced.prom;
        this._player.chatRoom = this._chatRoom;

        this.emit("RoomCreate");

        return true;
    }

    public async joinOrCreateRoom(roomDef: RoomDefinition): Promise<void> {
        await this.loggedIn.prom;

        // after a void, we can race between creating the room and other players
        // reappearing and creating it, so we need to try both until one works
        while (true) {
            console.log("Trying to join room...", roomDef);
            const joinResult = await this.ChatRoomJoin(roomDef.Name);
            if (joinResult) return;

            console.log("Failed to join room, trying to create...", roomDef);
            const createResult = await this.ChatRoomCreate(roomDef);
            if (createResult) return;

            await wait(3000);
        }
    }

    public ChatRoomLeave() {
        this.roomSynced = new PromiseResolve<void>();
        this.wrappedSock.emit("ChatRoomLeave", "");
        this.roomJoined = undefined;
    }

    private searchRooms(
        q: string,
        space: ServerChatRoomSpace,
    ): Promise<RoomDefinition[]> {
        if (this.roomSearchPromise) return this.roomSearchPromise.prom;

        this.roomSearchPromise = new PromiseResolve();
        this.wrappedSock.emit("ChatRoomSearch", {
            Query: q,
            Language: "",
            Space: space,
            FullRooms: true,
        });

        return this.roomSearchPromise.prom;
    }

    private async start(): Promise<void> {
        this.started = true;
        await this.loggedIn.prom;
        console.log("Logged in.");

        this.accountUpdate({
            OnlineSharedSettings: {
                GameVersion: GAMEVERSION,
            },
        });
        console.log("Connector started.");
    }

    public setItemPermission(perm: ItemPermissionLevel): void {
        this.accountUpdate({
            ItemPermission: perm,
        });
    }

    public startBot(bot: LogicBase) {
        this.bot = bot;
    }

    public setBotDescription(desc: string) {
        this.accountUpdate({
            Description: LZSTRING_MAGIC + compressToUTF16(desc),
        });
    }

    public setScriptPermissions(hide: boolean, block: boolean): void {
        this.accountUpdate({
            OnlineSharedSettings: {
                GameVersion: GAMEVERSION,
                ScriptPermissions: {
                    "Hide": {
                        "permission": hide ? 1 : 0,
                    },
                    "Block": {
                        "permission": block ? 1 : 0,
                    }
                }
            },
        });
    }

    public updateCharacterItem(update: SingleItemUpdate): void {
        /*if (update.Target === this.Player.MemberNumber) {
            const payload = {
                AssetFamily: "Female3DCG",
                Appearance: this.Player.Appearance.getAppearanceData(),
            };
            this.accountUpdate(payload);
        } else {*/
        //console.log("sending ChatRoomCharacterItemUpdate", update);
        this.wrappedSock.emit("ChatRoomCharacterItemUpdate", update);
        //}
    }

    public updateCharacter(update: Partial<API_Character_Data>): void {
        console.log("sending ChatRoomCharacterUpdate", JSON.stringify(update));
        this.wrappedSock.emit("ChatRoomCharacterUpdate", update);
    }

    public characterPoseUpdate(pose: AssetPoseName[]): void {
        console.log("sending pose update", pose);
        this.wrappedSock.emit("ChatRoomCharacterPoseUpdate", {
            Pose: pose,
        });
    }

    public async queryItemAllowed(memberNo: number): Promise<boolean> {
        if (!this.itemAllowQueries.has(memberNo)) {
            this.itemAllowQueries.set(memberNo, new PromiseResolve());
            this.wrappedSock.emit("ChatRoomAllowItem", {
                MemberNumber: memberNo,
            } as ChatRoomAllowItem);
        }

        const response = await this.itemAllowQueries.get(memberNo).prom;

        return response.AllowItem;
    }

    public accountUpdate(update: Partial<API_Character_Data>): void {
        const actualUpdate = { ... update };
        if (actualUpdate.Appearance === undefined) {
            actualUpdate.Appearance = this.Player.Appearance.getAppearanceData();
        }
        //console.log("Sending account update", actualUpdate);
        this.wrappedSock.emit("AccountUpdate", actualUpdate);
    }

    public moveOnMap(x: number, y: number): void {
        this.wrappedSock.emit("ChatRoomCharacterMapDataUpdate", {
            Pos: {
                X: x,
                Y: y,
            },
            PrivateState: {},
        });
    }
}
