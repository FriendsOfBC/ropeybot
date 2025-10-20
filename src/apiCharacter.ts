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

import { API_Chatroom } from "./apiChatroom.ts";
import { API_Connector, TellType } from "./apiConnector.ts";
import { AppearanceType } from "./appearance.ts";
import { BC_AppearanceItem } from "./item.ts";

interface PoseObject {
    Name: string;
}

export enum ItemPermissionLevel {
    EveryoneNoExceptions = 0,
    EveryoneExceptBlacklist = 1,
    OwnerLoverWhitelistDominants = 2,
    OwnerLoverWhitelist = 3,
    OwnerLover = 4,
    OwnerOnly = 5,
}

export interface API_Character_Data {
    ID: string;
    Name: string;
    Nickname: string;
    Description: string;
    Appearance: BC_AppearanceItem[];
    MemberNumber: number;
    ActivePose: readonly AssetPoseName[];
    WhiteList: number[];
    OnlineSharedSettings: CharacterOnlineSharedSettings;
    ItemPermission: ItemPermissionLevel;
    FriendList: number[];
    MapData?: ChatRoomMapData;
    BlockItems: ServerItemPermissionsPacked;
    LimitedItems: ServerItemPermissionsPacked;
}

export function transformToCharacterData(
    character: ServerAccountDataSynced,
): API_Character_Data {
    const defaultOnlineSettings: CharacterOnlineSharedSettings = {
        AllowFullWardrobeAccess: false,
        BlockBodyCosplay: false,
        AllowPlayerLeashing: false,
        AllowRename: false,
        DisablePickingLocksOnSelf: false,
        GameVersion: "",
        ItemsAffectExpressions: false,
        ScriptPermissions: {
            Hide: {
                permission: 0,
            },
            Block: {
                permission: 0,
            },
        },
        WheelFortune: "",
    };
    let blockItems: ServerItemPermissionsPacked = {};
    if (Array.isArray(character.BlockItems)) {
        console.warn("character with unpacked blocked items?");
    } else {
        blockItems = character.BlockItems ?? {};
    }
    let limitedItems: ServerItemPermissionsPacked = {};
    if (Array.isArray(character.LimitedItems)) {
        console.warn("character with unpacked limited items?");
    } else {
        limitedItems = character.LimitedItems ?? {};
    }
    return {
        ...character,
        Nickname: character.Nickname ?? "",
        Description: character.Description ?? "",
        Appearance: character.Appearance ?? [],
        ActivePose: character.ActivePose ?? [],
        FriendList:
            "FriendList" in character ? (character.FriendList as number[]) : [],
        OnlineSharedSettings: Object.assign(
            defaultOnlineSettings,
            character.OnlineSharedSettings,
        ),
        MapData: character.MapData,
        BlockItems: blockItems,
        LimitedItems: limitedItems,
    };
}

export function isNaked(character: API_Character): boolean {
    return (
        character.Appearance.InventoryGet("Cloth") === null &&
        character.Appearance.InventoryGet("ClothAccessory") === null &&
        character.Appearance.InventoryGet("ClothLower") === null &&
        character.Appearance.InventoryGet("Suit") === null &&
        character.Appearance.InventoryGet("SuitLower") === null &&
        character.Appearance.InventoryGet("Bra") === null &&
        character.Appearance.InventoryGet("Corset") === null &&
        character.Appearance.InventoryGet("Panties") === null &&
        character.Appearance.InventoryGet("Socks") === null &&
        character.Appearance.InventoryGet("Shoes") === null &&
        character.Appearance.InventoryGet("Gloves") === null
    );
}

export class API_Character {
    private _appearance: AppearanceType;

    constructor(
        protected readonly data: API_Character_Data,
        public readonly connection: API_Connector,
    ) {
        this._appearance = new AppearanceType(this, data);
    }

    public get Name(): string {
        return this.data.Name;
    }
    public get NickName(): string {
        return this.data.Nickname;
    }
    public get Appearance(): AppearanceType {
        return this._appearance;
    }
    public get MemberNumber(): number {
        return this.data.MemberNumber;
    }
    public get Pose(): PoseObject[] {
        return this.data.ActivePose.map((p) => {
            return { Name: p };
        });
    }
    public get WhiteList(): number[] {
        return this.data.WhiteList;
    }
    protected manageWhitelist(arg: "add" | "remove", ...members: number[]) {
        const list = this.connection.Player.WhiteList;
        let update = false;
        for (const member of members) {
            const numIdx = list.indexOf(member);
            if (arg === "add" && numIdx === -1) {
                // Don't let adding ourselves to the list
                if (member === this.MemberNumber) continue;
                list.push(member);
                update = true;
            } else if (arg === "remove" && numIdx !== -1) {
                list.splice(numIdx, 1);
                update = true;
            }
        }
        if (update) {
            this.connection.accountUpdate({ WhiteList: list });
        }
    }
    public whitelist(): void {
        this.manageWhitelist("add", this.MemberNumber);
    }
    public unwhitelist(): void {
        this.manageWhitelist("remove", this.MemberNumber);
    }
    // #region Online Shared Settings

    public get OnlineSharedSettings(): CharacterOnlineSharedSettings {
        return this.data.OnlineSharedSettings;
    }
    get allowFullWardrobeAccess(): boolean {
        return this.data.OnlineSharedSettings.AllowFullWardrobeAccess;
    }
    get blockBodyCosplay(): boolean {
        return this.data.OnlineSharedSettings.BlockBodyCosplay;
    }
    get allowPlayerLeashing(): boolean {
        return this.data.OnlineSharedSettings.AllowPlayerLeashing;
    }
    get allowRename(): boolean {
        return this.data.OnlineSharedSettings.AllowRename;
    }
    get disablePickingLocksOnSelf(): boolean {
        return this.data.OnlineSharedSettings.DisablePickingLocksOnSelf;
    }
    get gameVersion(): string {
        return this.data.OnlineSharedSettings.GameVersion ?? "";
    }
    get itemsAffectExpressions(): boolean {
        return this.data.OnlineSharedSettings.ItemsAffectExpressions;
    }
    // get WheelFortune(): string {
    //     return this.data.OnlineSharedSettings.WheelFortune;
    // }

    public getScriptPermissions(): { hide: boolean; block: boolean } {
        const ret = {
            hide:
                this.data.OnlineSharedSettings.ScriptPermissions.Hide
                    .permission !== 0,
            block:
                this.data.OnlineSharedSettings.ScriptPermissions.Block
                    .permission !== 0,
        };
        return ret;
    }

    // #endregion
    public get ItemPermission(): ItemPermissionLevel {
        return this.data.ItemPermission;
    }
    public get ChatRoomPosition(): number | undefined {
        return this.chatRoom?.characters.indexOf(this);
    }
    public get chatRoom(): API_Chatroom | undefined {
        return this.connection._chatRoom;
    }
    public get X(): number {
        return this.data.MapData?.Pos?.X ?? 0;
    }
    public get Y(): number {
        return this.data.MapData?.Pos?.Y ?? 0;
    }

    public get MapPos(): ChatRoomMapPos {
        return this.data.MapData?.Pos ?? { X: 0, Y: 0 };
    }

    public mapTeleport(pos: ChatRoomMapPos): void {
        this.connection.SendMessage(
            "Hidden",
            "ChatRoomMapViewTeleport",
            this.MemberNumber,
            [{ Tag: "MapViewTeleport", Position: pos }],
        );
    }

    public IsRoomAdmin(): boolean {
        return this.chatRoom?.Admin.includes(this.MemberNumber) ?? false;
    }

    public Tell(msgType: TellType, msg: string): void {
        console.log(`Tell (${msgType}) ${this}: ${msg}`);
        this.connection.SendMessage(msgType, msg, this.data.MemberNumber);
    }

    public SetActivePose(pose: AssetPoseName[]): void {
        this.data.ActivePose = pose;
        this.connection.characterPoseUpdate(pose);
    }

    public IsItemPermissionAccessible(
        asset: BC_AppearanceItem,
        variant?: string,
    ): boolean {
        if (this.ItemPermission >= ItemPermissionLevel.OwnerLover) return false;

        // XXX support variants too
        if (this.data.BlockItems[asset.Group]?.[asset.Name]) {
            return false;
        }
        if (
            this.data.LimitedItems[asset.Group]?.[asset.Name] &&
            !this.WhiteList.includes(this.connection.Player.MemberNumber)
        ) {
            return false;
        }
        return true;
    }

    public hasPenis(): boolean {
        return this.Appearance.InventoryGet("Pussy")?.Name === "Penis";
    }

    public upperBodyStyle(): "male" | "female" {
        const upperBody = this.Appearance.InventoryGet("BodyUpper");
        return upperBody?.Name.startsWith("Flat") ? "male" : "female";
    }

    public lowerBodyStyle(): "male" | "female" {
        const upperBody = this.Appearance.InventoryGet("Pussy");
        return upperBody?.Name === "Penis" ? "male" : "female";
    }

    public Kick(): void {
        this.connection.chatRoomAdmin({
            Action: "Kick",
            MemberNumber: this.MemberNumber,
            Publish: true,
        });
    }

    public Ban(): void {
        this.chatRoom?.banCharacter(this);
    }

    public Promote(): void {
        this.chatRoom?.promoteAdmin(this);
    }

    public Demote(): void {
        this.chatRoom?.demoteAdmin(this);
    }

    public IsBot(): boolean {
        return this.data.MemberNumber === this.connection.Player.MemberNumber;
    }

    public IsLoverOf(char: API_Character): boolean {
        // TODO
        return false;
    }

    public IsOwnedBy(char: API_Character): boolean {
        // TODO
        return false;
    }

    public getCurseVersion(): unknown {
        return null;
    }

    public ProtectionAllowInteract(): boolean {
        // TODO
        return true;
    }

    public GetAllowItem(): Promise<boolean> {
        return this.connection.queryItemAllowed(this.MemberNumber);
    }

    public IsRestrained(): boolean {
        // In the real game this Freeze || Block || Prone effects
        // This isn't correct at all but rather than calculating effects,
        // this is good enough for kidnappers.
        return Boolean(this.Appearance.InventoryGet("ItemArms"));
    }

    public CanTalk(): boolean {
        // See above
        return !Boolean(
            this.Appearance.InventoryGet("ItemMouth") ||
                this.Appearance.InventoryGet("ItemMouth2") ||
                this.Appearance.InventoryGet("ItemMouth3"),
        );
    }

    public hasEffect(effect: EffectName): boolean {
        for (const item of this.Appearance.allItems()) {
            if (item.getEffects().includes(effect)) {
                return true;
            }
        }

        return false;
    }

    public SetHeightOverride(override: number | undefined): void {
        const emoticon = this.Appearance.InventoryGet("Emoticon");
        if (!emoticon) {
            console.warn("No emoticon found for height override");
            return;
        }

        emoticon.SetOverrideHeight(override);
    }

    public SetInvisible(invisible: boolean): void {
        // TODO
    }

    get isFriend(): boolean {
        return this.connection.Player.friendList.includes(
            this.data.MemberNumber,
        );
    }

    /**
     * Add the character as a friend.
     */
    public friend(): void {
        this.connection.Player.addFriends(this.data.MemberNumber);
    }

    /**
     * Remove the character as a friend.
     */
    public unfriend(): void {
        this.connection.Player.removeFriends(this.data.MemberNumber);
    }

    public MoveToPos(pos: number): void {
        this.chatRoom?.moveCharacterToPos(this.data.MemberNumber, pos);
    }

    public SetExpression(
        group: ExpressionGroupName,
        expr: ExpressionName,
    ): void {
        this.Appearance.SetExpression(group, expr);
    }

    public toString(): string {
        return this.NickName || this.Name;
    }

    public sendItemUpdate(data: BC_AppearanceItem): void {
        this.connection.updateCharacterItem({
            Target: this.MemberNumber,
            ...data,
            Color: data.Color ?? [],
            Difficulty: data.Difficulty ?? 0,
        });
    }

    public sendAppearanceUpdate(): void {
        this.connection.updateCharacter({
            ID: this.data.ID,
            Appearance: this.data.Appearance,
        });
    }

    public update(data: Partial<API_Character_Data>): void {
        Object.assign(this.data, data);
        this.rebuildAppearance();
    }

    public rebuildAppearance(): void {
        this._appearance = new AppearanceType(this, this.data);
    }
}
