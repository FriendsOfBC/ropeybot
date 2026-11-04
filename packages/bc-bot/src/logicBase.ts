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
import {
    AnyCharacterEvent,
    AnyLogicEvent,
    BC_Server_ChatRoomMessage,
} from "./logicEvent.ts";

export class LogicBase {
    public onEvent(ev: AnyLogicEvent) {}

    public onCharacterEnteredPub(
        conn: API_Connector,
        character: API_Character,
    ): Promise<void> {
        return this.onCharacterEntered(conn, character);
    }

    public onCharacterLeftPub(
        conn: API_Connector,
        character: API_Character,
        intentional: boolean,
    ): void {
        this.onCharacterLeft(conn, character, intentional);
    }

    public onMessagePub(
        conn: API_Connector,
        message: BC_Server_ChatRoomMessage,
        sender: API_Character,
    ): void {
        this.onMessage(conn, message, sender);
    }

    public onCharacterEventPub(
        connection: API_Connector,
        event: AnyCharacterEvent,
    ) {
        this.onCharacterEvent(connection, event);
    }

    protected onCharacterEntered(
        conn: API_Connector,
        character: API_Character,
    ): Promise<void> {
        return Promise.resolve();
    }
    protected onCharacterLeft(
        connection: API_Connector,
        character: API_Character,
        intentional: boolean,
    ): void {}
    protected onMessage(
        connection: API_Connector,
        message: BC_Server_ChatRoomMessage,
        sender: API_Character,
    ): void {}
    protected onCharacterEvent(
        connection: API_Connector,
        event: AnyCharacterEvent,
    ) {}
}
