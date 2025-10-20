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
import {
    API_Character,
    API_Character_Data,
    ItemPermissionLevel,
    transformToCharacterData,
} from "./apiCharacter.ts";
import {
    API_Chatroom,
    API_Chatroom_Data,
    transformToChatRoomData,
} from "./apiChatroom.ts";
import { Socket } from "socket.io-client";
import { LogicBase } from "./logicBase.ts";
import { API_AppearanceItem, BC_AppearanceItem } from "./item.ts";
import lzString from "lz-string";
import { EventEmitter } from "node:events";
import { BC_Server_ChatRoomMessage } from "./logicEvent.ts";
import { SocketWrapper } from "./socketWrapper.ts";
import { wait } from "./util/wait.ts";
import { API_PlayerCharacter } from "./playerCharacter.ts";

export enum LeaveReason {
    DISCONNECT = "ServerDisconnect",
    LEAVE = "ServerLeave",
    KICK = "ServerKick",
    BAN = "ServerBan",
}

export type TellType = "Whisper" | "Chat" | "Emote" | "Activity" | "Hidden";

export interface RoomDefinition {
    Name: string;
    Description: string;
    Background: string;
    Private?: boolean;
    Locked?: boolean | null;
    Access: ServerChatRoomRole[];
    Visibility: ServerChatRoomRole[];
    Space: ServerChatRoomSpace;
    Admin: number[];
    Ban: number[];
    Limit: number | string;
    BlockCategory: ServerChatRoomBlockCategory[];
    Game: ServerChatRoomGame;
    Language: ServerChatRoomLanguage;
    MapData?: ServerChatRoomMapData;
}

// What the bot advertises as its game version
const GAMEVERSION = "R121";
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

class API_Error extends Error {
    constructor(name: string, message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = name;
    }
}

export interface API_Message {
    sender: API_Character;
    message: BC_Server_ChatRoomMessage;
}

interface ConnectorEvents {
    PoseChange: [character: API_Character];
    Message: [message: API_Message];
    Beep: [beep: ServerAccountBeepResponse];
    RoomJoin: [];
    RoomCreate: [];
    CharacterEntered: [character: API_Character];
    CharacterSync: [character: API_Character];
    CharacterLeft: [
        sourceMemberNumber: number,
        character: API_Character,
        leaveMessage: string | null,
        intentional: boolean,
    ];
}

export class API_Connector extends EventEmitter<ConnectorEvents> {
    private sock: Socket<ServerToClientEvents, ClientToServerEvents>;
    private wrappedSock: SocketWrapper<
        ServerToClientEvents,
        ClientToServerEvents
    >;
    private _player: API_PlayerCharacter | undefined;
    public _chatRoom?: API_Chatroom;

    private started = false;
    private roomJoined: RoomDefinition | undefined;

    private loggedIn = new PromiseResolve<void>();
    private roomSynced = new PromiseResolve<void>();

    private roomJoinPromise: PromiseResolve<string> | undefined;
    private roomCreatePromise: PromiseResolve<string> | undefined;
    private roomSearchPromise:
        | PromiseResolve<ServerChatRoomSearchData[]>
        | undefined;
    private onlineFriendsPromise:
        | PromiseResolve<ServerFriendInfo[]>
        | undefined;
    private itemAllowQueries = new Map<
        number,
        PromiseResolve<ServerChatRoomAllowItemResponse>
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
            // FIXME: this is not actually a BC server-client message?
            // @ts-expect-error
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

    public getBot(): LogicBase | undefined {
        return this.bot;
    }

    public get Player(): API_PlayerCharacter {
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

    public ChatRoomUpdate(update: Partial<API_Chatroom_Data>): void {
        // @ts-expect-error We make a copy but remove the keys that aren't necessary
        const roomInfo: ServerChatRoomSettings = structuredClone(update);
        delete roomInfo.Character;
        const payload: ServerChatRoomAdminUpdateRequest = {
            Action: "Update",
            MemberNumber: this.Player.MemberNumber,
            Room: roomInfo,
        };
        //console.log("Updating chat room", payload);
        this.chatRoomAdmin(payload);
    }

    public chatRoomAdmin(payload: ServerChatRoomAdminRequest) {
        this.wrappedSock.emit("ChatRoomAdmin", payload);
    }

    public AccountBeep(
        memberNumber: number,
        beepType: ServerBeepType,
        message?: string,
    ): void {
        const beep: ServerAccountBeepRequest = {
            BeepType: beepType,
            MemberNumber: memberNumber,
            Message: message,
        };
        this.wrappedSock.emit("AccountBeep", beep);
    }

    public async QueryOnlineFriends(): Promise<API_Character[]> {
        if (!this.onlineFriendsPromise) {
            this.onlineFriendsPromise = new PromiseResolve<
                ServerFriendInfo[]
            >();
            this.wrappedSock.emit("AccountQuery", {
                Query: "OnlineFriends",
            });
        }

        const result = await this.onlineFriendsPromise.prom;
        return result
            .map((m) => this._chatRoom?.findMember(m.MemberNumber))
            .filter((m) => !!m);
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

    private onServerInfo = (info: ServerInfoMessage) => {
        console.log("Server info: ", info);
    };

    private onLoginResponse = (resp: ServerLoginResponse) => {
        // console.log("Got login response", resp);
        if (resp === "InvalidNamePassword") {
            throw new API_Error(
                "InvalidNamePassword",
                "Invalid name or password",
            );
        }
        const charData = resp as unknown as API_Character_Data;
        this._player = new API_PlayerCharacter(charData, this, undefined);
        this.loggedIn.resolve();
    };

    public async login() {
        return this.loggedIn.prom;
    }

    private onChatRoomCreateResponse = (resp: string) => {
        console.log("Got chat room create response", resp);
        this.roomCreatePromise?.resolve(resp);
    };

    private onChatRoomUpdateResponse = (resp: ServerChatRoomUpdateResponse) => {
        console.log("Got chat room update response", resp);
    };

    private onChatRoomSync = (resp: ServerChatRoomSyncMessage) => {
        //console.log("Got chat room sync", resp);
        const chatRoom = transformToChatRoomData(resp);
        if (!this._chatRoom) {
            this._chatRoom = new API_Chatroom(chatRoom, this, this._player!);
        } else {
            this._chatRoom.update(chatRoom);
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
            BlockCategory: resp.BlockCategory,
            Game: resp.Game,
            Language: resp.Language,
        };
    };

    private onChatRoomSyncMemberJoin = (
        resp: ServerChatRoomSyncMemberJoinResponse,
    ) => {
        console.log("Chat room member joined", resp.Character?.Name);

        this.leaveReasons.delete(resp.Character.MemberNumber);

        this._chatRoom?.memberJoined(transformToCharacterData(resp.Character));

        const char = this._chatRoom?.getCharacter(resp.Character.MemberNumber);
        if (!char) return;

        this.emit("CharacterEntered", char);
        this.bot?.onEvent({
            name: "CharacterEntered",
            connection: this,
            character: char,
        });
        this.bot?.onCharacterEnteredPub(this, char);
    };

    private onChatRoomSyncMemberLeave = (resp: ServerChatRoomLeaveResponse) => {
        console.log(
            `chat room member left with reason ${this.leaveReasons.get(resp.SourceMemberNumber)}`,
            resp,
        );
        this._chatRoom?.memberLeft(resp.SourceMemberNumber);
        const leftMember = this._chatRoom?.getCharacter(
            resp.SourceMemberNumber,
        );
        if (!leftMember) return;

        const isIntentional =
            this.leaveReasons.get(resp.SourceMemberNumber) !==
            LeaveReason.DISCONNECT;
        this.emit(
            "CharacterLeft",
            resp.SourceMemberNumber,
            leftMember,
            null,
            isIntentional,
        );
        this.bot?.onEvent({
            name: "CharacterLeft",
            connection: this,
            sourceMemberNumber: resp.SourceMemberNumber,
            character: leftMember,
            leaveMessage: "",
            intentional: isIntentional,
        });
        this.bot?.onCharacterLeftPub(this, leftMember, true);
    };

    private onChatRoomSyncRoomProperties = (
        resp: ServerChatRoomSyncPropertiesMessage,
    ) => {
        //console.log("sync room properties", resp);
        this._chatRoom?.update(resp);

        // sync some data back to the definition of the room we're joined to so that, after
        // a void, we recreate the room with the same settings
        this.roomJoined!.Access = resp.Access;
        this.roomJoined!.Visibility = resp.Visibility;
        this.roomJoined!.Ban = resp.Ban;
        this.roomJoined!.Limit = resp.Limit;
        this.roomJoined!.BlockCategory = resp.BlockCategory;
        this.roomJoined!.Game = resp.Game;
        this.roomJoined!.Name = resp.Name;
        this.roomJoined!.Description = resp.Description;
        this.roomJoined!.Background = resp.Background;

        // remove these if they're there. The server will have converted to new
        // Access / Visibility fields and won't accept a ChatRoomCreate with both
        // Private/Locked and Access/Visibility
        delete this.roomJoined!.Private;
        delete this.roomJoined!.Locked;
    };

    private onChatRoomSyncCharacter = (
        resp: ServerChatRoomSyncCharacterResponse,
    ) => {
        //console.log("sync character", resp);
        this._chatRoom?.characterSync(
            resp.Character.MemberNumber,
            transformToCharacterData(resp.Character),
            resp.SourceMemberNumber,
        );
    };

    private onChatRoomSyncReorderPlayers = (
        resp: ServerChatRoomReorderResponse,
    ) => {
        //console.log("sync reorder players", resp);
        this._chatRoom?.onReorder(resp.PlayerOrder);
    };

    private onChatRoomSyncSingle = (
        resp: ServerChatRoomSyncCharacterResponse,
    ) => {
        //console.log("sync single", resp);
        this._chatRoom?.characterSync(
            resp.Character.MemberNumber,
            transformToCharacterData(resp.Character),
            resp.SourceMemberNumber,
        );
    };

    private onChatRoomSyncExpression = (
        resp: ServerCharacterExpressionResponse,
    ) => {
        //console.log("sync expression", resp);
        const char = this.chatRoom.getCharacter(resp.MemberNumber);
        if (!char) return;
        const item = new API_AppearanceItem(char, {
            Group: resp.Group as AssetGroupName,
            Name: resp.Name,
            Property: {
                Expression: resp.Name as ExpressionName,
            },
        });
        this.bot?.onCharacterEventPub(this, {
            name: "ItemChange",
            item,
            character: char,
            source: char,
        });
    };

    private onChatRoomSyncPose = (resp: ServerCharacterPoseResponse) => {
        //console.log("got sync pose", resp);
        const char = this.chatRoom.getCharacter(resp.MemberNumber);
        if (!char) return;
        char.update({
            ActivePose: resp.Pose as AssetPoseName[],
        });
        this.emit("PoseChange", char);
        this.bot?.onCharacterEventPub(this, {
            name: "PoseChanged",
            character: char,
        });
    };

    private onChatRoomSyncArousal = (resp: ServerCharacterArousalResponse) => {
        //console.log("Chat room sync arousal", resp);
    };

    private onChatRoomSyncItem = (update: ServerChatRoomSyncItemResponse) => {
        // console.log("Chat room sync item", update);
        this._chatRoom?.characterItemUpdate(update.Item);
        if (update.Item.Target === this._player!.MemberNumber) {
            const payload = {
                AssetFamily: "Female3DCG",
                Appearance: this.Player.Appearance.getAppearanceData(),
            };
            this.accountUpdate(payload);
        }
    };

    private onChatRoomSyncMapData = (update: ServerMapDataResponse) => {
        console.log("chat room map data", update);
        this._chatRoom?.mapPositionUpdate(update.MemberNumber, update.MapData);
    };

    private ignoreMsgs = [
        "BCXMsg",
        "BCEMsg",
        "LSCGMsg",
        "bctMsg",
        "MPA",
        "dogsMsg",
        "bccMsg",
        "ECHO_INFO2",
        "MoonCEBC",
    ];

    private onChatRoomMessage = (msg: ServerChatRoomMessage) => {
        // Don't log *.* spam
        if (
            msg.Type !== "Hidden" &&
            !this.ignoreMsgs.includes(msg.Content) &&
            msg.Sender !== this.Player.MemberNumber
        ) {
            console.log("chat room message", msg);
        }

        if (!msg.Sender) return;
        const char = this._chatRoom?.getCharacter(msg.Sender);
        if (!char) return;

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
        });
        this.bot?.onEvent({
            name: "Message",
            connection: this,
            Sender: char,
            message: msg,
        });
        this.bot?.onMessagePub(this, msg, char);
    };

    private onChatRoomAllowItem = (resp: ServerChatRoomAllowItemResponse) => {
        console.log("ChatRoomAllowItem", resp);
        const promResolve = this.itemAllowQueries.get(resp.MemberNumber);
        if (promResolve) {
            this.itemAllowQueries.delete(resp.MemberNumber);
            promResolve.resolve(resp);
        }
    };

    private onChatRoomCharacterItemUpdate = (
        update: ServerCharacterItemUpdate,
    ) => {
        console.log("Chat room character item update", update);
        this._chatRoom?.characterItemUpdate(update);
        /*if (update.Target === this._player.MemberNumber) {
            const payload = {
                AssetFamily: "Female3DCG",
                Appearance: this.Player.Appearance.getAppearanceData(),
            };
            this.accountUpdate(payload);
        }*/
    };

    private onAccountBeep = (payload: ServerAccountBeepResponse) => {
        if (payload?.Message && typeof payload.Message === "string")
            payload.Message = payload.Message.split("\n\n")[0];
        // legacy
        this.bot?.onEvent({
            name: "Beep",
            connection: this,
            beep: payload,
        });
        // new
        this.emit("Beep", payload);
    };

    private onAccountQueryResult = (payload: ServerAccountQueryResponse) => {
        if (payload.Query === "OnlineFriends") {
            this.onlineFriendsPromise?.resolve(payload.Result);
        }
    };

    private onChatRoomSearchResult = (
        results: ServerChatRoomSearchResultResponse,
    ) => {
        console.log("Chat room search result", results);
        if (!this.roomSearchPromise) return;
        this.roomSearchPromise.resolve(results);
    };

    private onChatRoomSearchResponse = (
        result: ServerChatRoomSearchResponse,
    ) => {
        console.log("Chat room search (join) response", result);
        if (!this.roomJoinPromise) return;
        this.roomJoinPromise.resolve(result);
    };

    public async ChatRoomJoin(name: string): Promise<boolean> {
        if (this.roomJoinPromise) {
            const result = await this.roomJoinPromise.prom;
            return result === "JoinedRoom";
        }

        await this.loggedIn.prom;

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
        this._player!.chatRoom = this._chatRoom!;

        this.emit("RoomJoin");

        return true;
    }

    public async ChatRoomCreate(roomDef: RoomDefinition): Promise<boolean> {
        if (this.roomCreatePromise) {
            const result = await this.roomCreatePromise.prom;
            return result === "ChatRoomCreated";
        }

        await this.loggedIn.prom;

        console.log("creating room");
        this.roomCreatePromise = new PromiseResolve();

        const admins = [this._player!.MemberNumber, ...roomDef.Admin];
        let result;
        try {
            this.wrappedSock.emit("ChatRoomCreate", {
                ...roomDef,
                Admin: admins,
            });

            result = await this.roomCreatePromise.prom;
        } finally {
            this.roomCreatePromise = undefined;
        }

        if (result !== "ChatRoomCreated") {
            throw new API_Error(result, "Failed to create room");
        }

        console.log("Room created");

        await this.roomSynced.prom;
        this._player!.chatRoom = this._chatRoom!;

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
    ): Promise<ServerChatRoomSearchData[]> {
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

        if (this.Player.OnlineSharedSettings.GameVersion !== GAMEVERSION) {
            this.Player.OnlineSharedSettings.GameVersion = GAMEVERSION;

            this.accountUpdate({
                OnlineSharedSettings: this.Player.OnlineSharedSettings,
            });
        }
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
            Description: LZSTRING_MAGIC + lzString.compressToUTF16(desc),
        });
    }

    public setScriptPermissions(hide: boolean, block: boolean): void {
        this.accountUpdate({
            OnlineSharedSettings: {
                GameVersion: GAMEVERSION,
                ScriptPermissions: {
                    Hide: {
                        permission: hide ? 1 : 0,
                    },
                    Block: {
                        permission: block ? 1 : 0,
                    },
                },
                AllowFullWardrobeAccess: false,
                BlockBodyCosplay: true,
                AllowPlayerLeashing: false,
                AllowRename: false,
                DisablePickingLocksOnSelf: true,
                ItemsAffectExpressions: false,
                WheelFortune: "",
            },
        });
    }

    public updateCharacterItem(update: ServerCharacterItemUpdate): void {
        /*if (update.Target === this.Player.MemberNumber) {
            const payload = {
                AssetFamily: "Female3DCG",
                Appearance: this.Player.Appearance.getAppearanceData(),
            };
            this.accountUpdate(payload);
        } else {*/
        //console.log("sending ChatRoomCharacterItemUpdate", update);
        this.wrappedSock.emit("ChatRoomCharacterItemUpdate", update);
    }

    public updateCharacter(update: Partial<API_Character_Data>): void {
        // console.log("sending ChatRoomCharacterUpdate", JSON.stringify(update));
        this.wrappedSock.emit("ChatRoomCharacterUpdate", update);
    }

    public characterPoseUpdate(pose: AssetPoseName[]): void {
        console.log("sending pose update", pose);
        this.wrappedSock.emit("ChatRoomCharacterPoseUpdate", {
            Pose: pose,
        });
    }

    public async queryItemAllowed(memberNo: number): Promise<boolean> {
        let query = this.itemAllowQueries.get(memberNo);
        if (!query) {
            query = new PromiseResolve();
            this.itemAllowQueries.set(memberNo, query);
            this.wrappedSock.emit("ChatRoomAllowItem", {
                MemberNumber: memberNo,
            });
        }

        const response = await query.prom;

        return response.AllowItem;
    }

    public accountUpdate(update: Partial<API_Character_Data>): void {
        //console.log("Sending account update", actualUpdate);
        this.wrappedSock.emit("AccountUpdate", update);
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
