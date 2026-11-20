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
import { API_Connector, API_Message } from "./apiConnector.ts";
import { BC_Server_ChatRoomMessage } from "./logicEvent.ts";

type CommandCallback = (
    sender: API_Character,
    msg: BC_Server_ChatRoomMessage,
    args: string[],
) => void | Promise<void>;

const SLASH_BOT_PREFIX = "ChatRoomBot ";

export class CommandParser {
    private commands = new Map<string, CommandCallback>();
    private bareCommands = new Map<string, CommandCallback>();

    public constructor(private conn: API_Connector) {
        conn.on("Message", this.onMessage);
    }

    public register(
        cmd: string,
        cb: CommandCallback,
        allowWithoutPrefix = false,
    ) {
        this.commands.set(cmd, cb);
        if (allowWithoutPrefix) this.bareCommands.set(cmd, cb);
    }

    public unregister(cmd: string) {
        this.commands.delete(cmd);
        this.bareCommands.delete(cmd);
    }

    public unregisterAll() {
        this.commands.clear();
        this.bareCommands.clear();
    }

    private onMessage = (ev: API_Message) => {
        // trim any leading or trailing parentheses from the message
        const msg = ev.message.Content.replace(/^\(+/, "").replace(/\)+$/, "");

        if (
            ["Whisper", "Chat"].includes(ev.message.Type) &&
            msg.startsWith("!") &&
            msg.length > 1
        ) {
            const cmdString = msg.substring(1);

            this.processCmdString(ev, cmdString);
        } else if (
            ev.message.Type === "Hidden" &&
            ev.message.Content.startsWith(SLASH_BOT_PREFIX)
        ) {
            const cmdString = msg
                .substring(SLASH_BOT_PREFIX.length)
                .trimStart();
            this.processCmdString(ev, cmdString);
        } else if (
            ["Whisper", "Chat"].includes(ev.message.Type) &&
            this.bareCommands.has(msg.toLowerCase())
        ) {
            this.processCallback(
                ev,
                this.bareCommands.get(msg.toLowerCase())!,
                [],
            );
        }
    };

    private processCallback(
        ev: API_Message,
        callback: CommandCallback,
        args: string[],
    ): void {
        try {
            const ret = callback(ev.sender, ev.message, args);
            const promiseRet = ret as Promise<void>;
            if (promiseRet && promiseRet.catch) {
                promiseRet.catch((e) => {
                    console.log("Command handler threw async exception", e);
                });
            }
        } catch (e) {
            console.log("Command handler threw exception", e);
        }
    }

    private processCmdString(ev: API_Message, cmdString: string): void {
        const parts = cmdString.toLowerCase().split(" ");
        let cmd = [];

        // try more words of the command until we run out of parts, so
        // we can support multi-word commands
        while (parts.length > 0) {
            cmd.push(parts.shift());

            const cb = this.commands.get(cmd.join(" "));
            if (cb) {
                this.processCallback(ev, cb, parts);
                return;
            }
        }
        this.conn.reply(ev.message, "Unknown command");
    }
}
