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

import { API_Character } from "./apiCharacter.ts";
import { API_Connector } from "./apiConnector.ts";
import { API_AppearanceItem } from "./item.ts";

export type BC_Server_ChatRoomMessage = ServerChatRoomMessage;

export type AnyLogicEvent =
    | LogicEvent_Message
    | LogicEvent_CharacterLeft
    | LogicEvent_CharacterEntered
    | LogicEvent_RoomForceLeave
    | LogicEvent_RoomUpdate
    | AnyCharacterEvent_Wrapper
    | LogicEvent_Beep
    | AnyBotEvent_Wrapper;

interface LogicEvent {
    connection: API_Connector;
}

export interface LogicEvent_Message extends LogicEvent {
    name: "Message";
    message: BC_Server_ChatRoomMessage;
    Sender: API_Character;
}

export interface LogicEvent_CharacterLeft extends LogicEvent {
    name: "CharacterLeft";
    sourceMemberNumber: number;
    character: API_Character;
    leaveMessage: string;
    intentional: boolean;
}

export interface LogicEvent_CharacterEntered extends LogicEvent {
    name: "CharacterEntered";
    character: API_Character;
}

export interface LogicEvent_RoomForceLeave extends LogicEvent {
    name: "RoomForceLeave";
    type: string;
}

export interface LogicEvent_RoomUpdate extends LogicEvent {
    name: "RoomUpdate";
    sourceMemberNumber: number;
    oldInfo: Record<string, any>;
}

export interface AnyCharacterEvent_Wrapper extends LogicEvent {
    name: "CharacterEvent";
    event: AnyCharacterEvent; // ??
}

export interface LogicEvent_Beep extends LogicEvent {
    name: "Beep";
    beep: ServerAccountBeepResponse;
}

export interface AnyBotEvent {
    name: string;
    Dictionary: unknown;
    Target: number;
    Type: "Hidden";
    Content: unknown;
}

export interface AnyCharacterEvent {
    name:
        | "ItemAdd"
        | "ItemRemove"
        | "ItemChange"
        | "PoseChanged"
        | "SafewordUsed";
    character: API_Character;
    source?: API_Character;
    item?: API_AppearanceItem;
    initial?: boolean;
    release?: unknown;
}

export interface AnyBotEvent_Wrapper extends LogicEvent {
    name: "BotEvent";
    event: AnyBotEvent; // ?
}

export type BC_Server_AccountBeep = ServerAccountBeepResponse;
