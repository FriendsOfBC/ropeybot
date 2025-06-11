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

import { EventEmitter } from "stream";
import { API_Character, API_Character_Data } from "./apiCharacter";
import { API_Connector, SingleItemUpdate } from "./apiConnector";
import { API_Map } from "./apiMap";
import { API_AppearanceItem } from "./item";

export type ChatRoomAccessVisibility = "All" | "Whitelist" | "Admin";

// This should be ServerChatRoomData
export interface API_Chatroom_Data {
    Name: string;
    Description: string;
    Character: API_Character_Data[];
    Admin: number[];
    Ban: number[];
    Private: boolean;
    Access: ChatRoomAccessVisibility[]
    Visibility: ChatRoomAccessVisibility[]
    Limit: number;
    Background: string;
    Locked: boolean;
    Space: ServerChatRoomSpace;
    BlockCategories: ServerChatRoomBlockCategory[];
    Game: ServerChatRoomGame;
    Language: ServerChatRoomLanguage;
    MapData?: ServerChatRoomMapData;
}

interface ChatRoomEvents {
    ItemAdd: [character: API_Character, item: API_AppearanceItem];
    ItemRemove: [character: API_Character, items: API_AppearanceItem[]];
    ItemChange: [character: API_Character, oldItem: API_AppearanceItem, newItem: API_AppearanceItem];
}

export class API_Chatroom extends EventEmitter<ChatRoomEvents> {
    private characterCache = new Map<number, API_Character>();

    private reorderWatcher = new EventEmitter();

    public map: API_Map;

    constructor(
        private data: API_Chatroom_Data,
        private conn: API_Connector,
        player: API_Character,
    ) {
        super();

        this.map = new API_Map(conn, data);
        this.cacheCharacter(player);
    }

    public get Name(): string {
        return this.data.Name;
    }
    public get characters(): API_Character[] {
        return this.data.Character.map((c) => this.characterFromCache(c));
    }
    public get Admin(): number[] {
        return this.data.Admin;
    }
    public get Ban(): number[] {
        return this.data.Ban;
    }
    public get Private(): boolean {
        return this.data.Private;
    }
    public get Limit(): number {
        return this.data.Limit;
    }
    public get charactersCount(): number {
        return this.data.Character.length;
    }

    public set Admin(value: number[]) {
        this.data.Admin = value;
    }

    public update(data: Partial<API_Chatroom_Data>) {
        Object.assign(this.data, data);
        if (data.MapData) {
            this.map.onMapUpdate();
        }
    }

    public memberJoined(member: API_Character_Data) {
        this.data.Character.push(member);
    }

    public memberLeft(memberNumber: number) {
        this.data.Character = this.data.Character.filter(
            (x) => x.MemberNumber !== memberNumber,
        );
    }

    public characterSync(
        memberNumber: number,
        charData: API_Character_Data,
        sourceMemberNo: number,
    ) {
        const char = this.getCharacter(memberNumber);
        if (!char) {
            console.warn(
                `Trying to sync member number ${charData.MemberNumber} but can't find them!`,
            );
            return;
        }

        const oldItems = char.Appearance.Appearance;

        char.update(charData);

        const removed: API_AppearanceItem[] = [];
        for (const oldItem of oldItems) {
            if (
                !char.Appearance.Appearance.find(
                    (newItem) => oldItem.Group === newItem.Group,
                )
            ) {
                removed.push(oldItem);

                this.conn.getBot()?.onCharacterEventPub(this.conn, {
                    name: "ItemRemove",
                    character: this.getCharacter(memberNumber),
                    source: this.getCharacter(sourceMemberNo),
                    item: oldItem,
                });
            }
        }
        if (removed.length > 0)
            this.emit("ItemRemove", this.getCharacter(sourceMemberNo), removed);

        for (const newItem of char.Appearance.Appearance) {
            const oldItem = oldItems.find(
                (oldItem) => oldItem.Group === newItem.Group,
            );
            if (!oldItem) {
                this.emit(
                    "ItemAdd",
                    this.getCharacter(sourceMemberNo),
                    newItem,
                );

                this.conn.getBot()?.onCharacterEventPub(this.conn, {
                    name: "ItemAdd",
                    character: this.getCharacter(memberNumber),
                    source: this.getCharacter(sourceMemberNo),
                    item: newItem,
                });
            } else if (
                JSON.stringify(newItem.getData()) !==
                JSON.stringify(oldItem.getData())
            ) {
                this.emit(
                    "ItemChange",
                    this.getCharacter(sourceMemberNo),
                    newItem,
                    oldItem,
                );

                this.conn.getBot()?.onCharacterEventPub(this.conn, {
                    name: "ItemChange",
                    character: this.getCharacter(memberNumber),
                    source: this.getCharacter(sourceMemberNo),
                    item: newItem,
                });
            }
        }
    }

    public characterItemUpdate(itemUpdate: SingleItemUpdate) {
        const charData = this.data.Character.find(
            (x) => x.MemberNumber === itemUpdate.Target,
        );
        if (charData === undefined) {
            console.warn(
                `Trying to update item on member number ${itemUpdate.Target} but can't find them!`,
            );
            return;
        }

        const charObject = this.getCharacter(charData.MemberNumber);

        const oldItemIndex = charData.Appearance.findIndex(
            (i) => i.Group === itemUpdate.Group,
        );
        if (itemUpdate.Name) {
            // An item is being added or updated
            if (oldItemIndex > -1) {
                // The group was present previously: it's an update
                const oldItemObject = charObject.Appearance.Appearance.find(
                    (i) => itemUpdate.Group === i.Group,
                );
                charData.Appearance[oldItemIndex] = itemUpdate;
                charObject.rebuildAppearance();
                const newItemObject = charObject.Appearance.Appearance.find(
                    (i) => itemUpdate.Group === i.Group,
                );
                this.emit(
                    "ItemChange",
                    charObject,
                    newItemObject,
                    oldItemObject,
                );
            } else {
                // An item is being added
                charData.Appearance.push(itemUpdate);
                charObject.rebuildAppearance();
                const itemObject = charObject.Appearance.Appearance.find(
                    (i) => itemUpdate.Group === i.Group,
                );
                this.emit("ItemAdd", charObject, itemObject);
            }
        } else if (oldItemIndex > -1) {
            // An item is being removed
            const itemObject = charObject.Appearance.Appearance.find(
                (i) => itemUpdate.Group === i.Group,
            );
            charData.Appearance.splice(oldItemIndex, 1);
            charObject.rebuildAppearance();
            this.emit("ItemRemove", charObject, [itemObject]);
        }
    }

    public mapPositionUpdate(memberNumber: number, mapData: ChatRoomMapPos) {
        const charData = this.data.Character.find(
            (x) => x.MemberNumber === memberNumber,
        );
        if (charData === undefined) {
            console.warn(
                `Trying to position item on member number ${memberNumber} but can't find them!`,
            );
            return;
        }

        if (!mapData) {
            charData.MapData = null;
            return;
        }

        if (!charData.MapData) {
            charData.MapData = { X: 0, Y: 0 };
        }

        const prevPos = Object.assign({}, charData.MapData ?? { X: 0, Y: 0 });
        Object.assign(charData.MapData, mapData);

        const char = this.findMember(memberNumber);
        try {
            this.map.onCharacterMove(char, prevPos);
        } catch (e) {
            console.log("Error handling character move", e);
        }
    }

    public onReorder(memberNos: number[]): void {
        this.data.Character = memberNos.map((num) =>
            this.data.Character.find((m) => m.MemberNumber === num),
        );
        this.reorderWatcher.emit("reorder");
    }

    public getCharacter(memberNumber: number): API_Character | undefined {
        const char = this.data.Character.find(
            (x) => x.MemberNumber === memberNumber,
        );
        if (!char) return undefined;

        return this.characterFromCache(char);
    }

    public moveCharacterToPos(memberNo: number, pos: number): Promise<void> {
        const prom = new Promise<void>((resolve) => {
            this.reorderWatcher.once("reorder", resolve);
            setTimeout(resolve, 1000);

            const startPos = this.data.Character.findIndex(
                (x) => x.MemberNumber === memberNo,
            );
            if (startPos === pos) return;

            const op = startPos > pos ? "MoveLeft" : "MoveRight";
            const delta = startPos > pos ? -1 : 1;

            for (let i = startPos; i !== pos; i += delta) {
                this.conn.chatRoomAdmin({
                    Action: op,
                    MemberNumber: memberNo,
                    Publish: i == startPos,
                });
            }
        });

        return prom;
    }

    public usesMaps(): boolean {
        if (this.data.MapData === undefined) return false;
        return this.data.MapData.Type !== "Never";
    }

    public ToInfo(): API_Chatroom_Data {
        const info = Object.assign({}, this.data);

        delete info.Character;

        return info;
    }

    public findMember(specifier: number): API_Character | undefined {
        return this.characters.find(
            (c) => c.MemberNumber == specifier
        );
    }

    public saveChanges(): void {
        this.conn.ChatRoomUpdate(this.ToInfo());
    }

    public findCharacter(specifier: string): API_Character | undefined {
        const nameMatches = this.characters.filter(
            (c) => c.NickName?.toLowerCase() === specifier.toLowerCase() || c.Name?.toLowerCase() === specifier.toLowerCase(),
        );
        if (nameMatches.length === 1) return nameMatches[0];

        return this.characters.find(
            (c: API_Character) => c.MemberNumber == parseInt(specifier, 10),
        );
    }

    private cacheCharacter(char: API_Character): void {
        this.characterCache.set(char.MemberNumber, char);
    }

    private characterFromCache(data: API_Character_Data) {
        let char = this.characterCache.get(data.MemberNumber);
        if (!char) {
            char = new API_Character(data, this.conn, this);
            this.characterCache.set(char.MemberNumber, char);

            if (this.characterCache.size > 20) this.pruneCharacterCache();
        } else {
            char.update(data);
        }

        return char;
    }

    public useMap(useMap: boolean)  {
        if (useMap) {
            this.data.MapData.Type = "Always";
        }else{
            this.data.MapData.Type = "Never";
        }
        console.log
        this.conn.ChatRoomUpdate({ MapData: this.data.MapData });
    }

    private pruneCharacterCache() {
        const memberNumbers = new Set(this.data.Character.map((c) => c.MemberNumber));
        for (const memberNumber of this.characterCache.keys()) {
            if (!memberNumbers.has(memberNumber)) {
                this.characterCache.delete(memberNumber);
            }
        }
    }
}
