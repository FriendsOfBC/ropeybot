import { API_Character } from "./apiCharacter.ts";
import { API_Connector } from "./apiConnector.ts";
import { BC_AppearanceItem } from "./item.ts";

export class API_PlayerCharacter extends API_Character {
    constructor(
        protected data: ServerAccountData,
        connection: API_Connector,
    ) {
        super(data, connection);
    }

    // #region Online Shared Settings

    private updateOnlineSharedSettings(): void {
        this.connection.accountUpdate({
            OnlineSharedSettings: this.data.OnlineSharedSettings,
        });
    }

    set allowFullWardrobeAccess(value: boolean) {
        this.OnlineSharedSettings.AllowFullWardrobeAccess = value;
        this.updateOnlineSharedSettings();
    }

    set blockBodyCosplay(value: boolean) {
        this.OnlineSharedSettings.BlockBodyCosplay = value;
        this.updateOnlineSharedSettings();
    }

    set allowPlayerLeashing(value: boolean) {
        this.OnlineSharedSettings.AllowPlayerLeashing = value;
        this.updateOnlineSharedSettings();
    }

    set allowRename(value: boolean) {
        this.OnlineSharedSettings.AllowRename = value;
        this.updateOnlineSharedSettings();
    }

    set disablePickingLocksOnSelf(value: boolean) {
        this.OnlineSharedSettings.DisablePickingLocksOnSelf = value;
        this.updateOnlineSharedSettings();
    }

    set itemsAffectExpressions(value: boolean) {
        this.OnlineSharedSettings.ItemsAffectExpressions = value;
        this.updateOnlineSharedSettings();
    }

    public setScriptPermissions(hide: boolean, block: boolean): void {
        this.OnlineSharedSettings.ScriptPermissions.Hide.permission = hide
            ? 1
            : 0;
        this.OnlineSharedSettings.ScriptPermissions.Block.permission =
            block ? 1 : 0;
        this.updateOnlineSharedSettings();
    }

    // #endregion

    public sendItemUpdate(data: BC_AppearanceItem): void {
        super.sendItemUpdate(data);
        this.connection.accountUpdate({ Appearance: this.data.Appearance });
    }

    public sendAppearanceUpdate(): void {
        super.sendAppearanceUpdate();
        this.connection.accountUpdate({ Appearance: this.data.Appearance });
    }

    get friendList(): number[] {
        return this.data.FriendList;
    }

    /**
     * Add the given number to the player's friendlist
     */
    addFriends(...members: number[]) {
        const list = this.data.FriendList;
        let update = false;
        for (const member of members) {
            if (list.includes(member) || member === this.MemberNumber) {
                continue;
            }
            list.push(member);
            update = true;
        }

        if (update) {
            this.connection.accountUpdate({
                FriendList: list,
            });
        }
    }

    /**
     * Remove the given number from the player's friendlist
     */
    removeFriends(...members: number[]) {
        const list = this.connection.Player.friendList;
        let update = false;
        for (const member of members) {
            const idx = list.findIndex((num) => num === member);
            if (idx === -1) return;
            list.splice(idx, 1);
            update = true;
        }
        if (update) {
            this.connection.accountUpdate({
                FriendList: list,
            });
        }
    }

    public addWhitelist(...members: number[]): void {
        this.manageWhitelist("add", ...members);
    }
    public removeWhitelist(...members: number[]): void {
        this.manageWhitelist("remove", ...members);
    }
}
