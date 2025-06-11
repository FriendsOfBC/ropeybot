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

import { decompressFromBase64 } from "lz-string";
import { API_Character } from "./apiCharacter";
import { API_Chatroom_Data } from "./apiChatroom";
import { API_Connector } from "./apiConnector";
import { EventEmitter } from "stream";
import { ChatRoomMapViewObjectList, ChatRoomMapViewTileList } from "./bcdata/ChatRoomMap";

export interface MapRegion {
    TopLeft: ChatRoomMapPos;
    BottomRight: ChatRoomMapPos;
}

function mapTileByName(name: string): ChatRoomMapTile {
    return ChatRoomMapViewTileList.find((tile) => tile.Style === name);
}

function mapObjectByName(name: string): ChatRoomMapObject {
    return ChatRoomMapViewObjectList.find((tile) => tile.Style === name);
}

interface TileTrigger {
    prevPos?: ChatRoomMapPos;
    callback: TriggerCallback;
}

interface RegionTrigger {
    region: MapRegion;
    callback: TriggerCallback;
}

type TriggerCallback = (char: API_Character, prevPos: ChatRoomMapPos) => void;

export function positionEquals(a: ChatRoomMapPos, b: ChatRoomMapPos): boolean {
    return a.X === b.X && a.Y === b.Y;
}

export function positionIsInRegion(
    pos: ChatRoomMapPos,
    region: MapRegion,
): boolean {
    return (
        pos.X >= region.TopLeft.X &&
        pos.X <= region.BottomRight.X &&
        pos.Y >= region.TopLeft.Y &&
        pos.Y <= region.BottomRight.Y
    );
}

export function makeDoorRegion(
    pos: ChatRoomMapPos,
    above: boolean,
    below: boolean,
): MapRegion {
    const region = {
        TopLeft: Object.assign({}, pos),
        BottomRight: Object.assign({}, pos),
    };

    if (above) region.TopLeft.Y--;
    if (below) region.BottomRight.Y++;

    return region;
}

interface MapEvents {
    MapUpdate: [];
}

export class API_Map extends EventEmitter<MapEvents> {
    private updateTask: NodeJS.Immediate;
    private tileTriggers = new Map<number, TileTrigger[]>();
    private enterRegionTriggers: RegionTrigger[] = [];
    private leaveRegionTriggers: RegionTrigger[] = [];

    constructor(
        private conn: API_Connector,
        private roomData: API_Chatroom_Data,
    ) {
        super();
    }

    public setMapFromString(mapDataBundle: string): void {
        const mapData = JSON.parse(decompressFromBase64(mapDataBundle));
        this.setMapFromData(mapData);
    }

    public setMapFromData(mapData: ServerChatRoomMapData): void {
        Object.assign(this.roomData, { MapData: mapData });
        this.queueUpdate();
    }

    public get mapData(): ServerChatRoomMapData | undefined {
        return this.roomData.MapData;
    }

    public set mapData(data: ServerChatRoomMapData | undefined) {
        this.roomData.MapData = data;
    }

    public addTileTrigger(
        where: ChatRoomMapPos,
        callback: TriggerCallback,
        prevPos?: ChatRoomMapPos,
    ): void {
        const pos = where.X + where.Y * 40;
        const list = this.tileTriggers.get(pos) ?? [];
        list.push({ prevPos, callback });
        this.tileTriggers.set(pos, list);
    }

    public addEnterRegionTrigger(
        region: MapRegion,
        callback: TriggerCallback,
    ): void {
        this.enterRegionTriggers.push({ region, callback });
    }

    public removeEnterRegionTrigger(callback: TriggerCallback): void {
        this.enterRegionTriggers = this.enterRegionTriggers.filter(
            (trigger) => trigger.callback !== callback,
        );
    }

    public addLeaveRegionTrigger(
        region: MapRegion,
        callback: TriggerCallback,
    ): void {
        this.leaveRegionTriggers.push({ region, callback });
    }

    public removeLeaveRegionTrigger(callback: TriggerCallback): void {
        this.leaveRegionTriggers = this.enterRegionTriggers.filter(
            (trigger) => trigger.callback !== callback,
        );
    }

    public removeTileTrigger(
        x: number,
        y: number,
        callback: TriggerCallback,
    ): void {
        const pos = x + y * 40;
        const list = this.tileTriggers.get(pos);
        if (!list) return;

        const idx = list.findIndex((trigger) => trigger.callback === callback);
        if (idx < 0) return;

        list.splice(idx, 1);
        if (list.length === 0) {
            this.tileTriggers.delete(pos);
        } else {
            this.tileTriggers.set(pos, list);
        }
    }

    public setTile(pos: ChatRoomMapPos, tileName: string): void {
        if (!this.mapData) return;

        const tile = mapTileByName(tileName);

        const tileNum = pos.X + pos.Y * 40;
        this.mapData.Tiles =
            this.mapData.Tiles.substring(0, tileNum) +
            String.fromCharCode(tile.ID) +
            this.mapData.Tiles.substring(tileNum + 1);

        this.queueUpdate();
    }

    public getObject(pos: ChatRoomMapPos): string {
        if (!this.mapData) return "";

        const tileNum = pos.X + pos.Y * 40;
        const objID = this.mapData.Objects.charCodeAt(tileNum);
        const obj = ChatRoomMapViewObjectList.find((o) => o.ID === objID);
        return obj?.Style;
    }

    public setObject(pos: ChatRoomMapPos, objectName: string): void {
        if (!this.mapData) return;

        const tile = mapObjectByName(objectName);

        const tileNum = pos.X + pos.Y * 40;
        this.mapData.Objects =
            this.mapData.Objects.substring(0, tileNum) +
            String.fromCharCode(tile.ID) +
            this.mapData.Objects.substring(tileNum + 1);

        this.queueUpdate();
    }

    public onCharacterMove(
        character: API_Character,
        prevPos: ChatRoomMapPos,
    ): void {
        // maybe? if necessary?
        //this.emit("CharacterMapMove", this.getCharacter(memberNumber));
        if (
            character.MapPos.X === prevPos.X &&
            character.MapPos.Y === prevPos.Y
        ) {
            console.log(`Discarding duplicate move event for ${character}`);
            return;
        }

        const tileTriggers = this.tileTriggers.get(
            character.X + character.Y * 40,
        );
        if (tileTriggers) {
            for (const trigger of tileTriggers) {
                if (
                    trigger.prevPos === undefined ||
                    positionEquals(prevPos, trigger.prevPos)
                ) {
                    trigger.callback(character, prevPos);
                }
            }
        }

        for (const trigger of this.enterRegionTriggers) {
            if (
                positionIsInRegion(character.MapPos, trigger.region) &&
                !positionIsInRegion(prevPos, trigger.region)
            ) {
                trigger.callback(character, prevPos);
            }
        }

        for (const trigger of this.leaveRegionTriggers) {
            if (
                !positionIsInRegion(character.MapPos, trigger.region) &&
                positionIsInRegion(prevPos, trigger.region)
            ) {
                trigger.callback(character, prevPos);
            }
        }
    }

    public onMapUpdate(): void {
        this.emit("MapUpdate");
    }

    private queueUpdate(): void {
        if (this.updateTask) return;

        this.updateTask = setImmediate(this.doUpdate);
    }

    private doUpdate = (): void => {
        this.updateTask = undefined;
        this.conn.ChatRoomUpdate({ MapData: this.mapData });
    };
}
