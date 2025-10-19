import { API_Character, API_Character_Data } from "./apiCharacter.ts";
import { API_Connector } from "./apiConnector.ts";
import { BC_AppearanceItem } from "./item.ts";

export class API_PlayerCharacter extends API_Character {
    constructor(
        protected data: API_Character_Data,
        connection: API_Connector,
    ) {
        super(data, connection);
    }

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
