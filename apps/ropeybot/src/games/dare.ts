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

import { readFile, writeFile } from "fs/promises";
import {
    API_Connector,
    CommandParser,
    API_Character,
    BC_Server_ChatRoomMessage,
} from "bc-bot";
import { wait } from "../hub/utils";

export class Dare {
    public static description = `Dares
 =====

Collects dare / forfeit cards privately & anonymously that can then be drawn.

!dare add <dare>
eg. !dare add take off one item of clothing
(This should be whispered to the bot so your dare stays secret!)

!dare draw
Draws a dare card (you can do this in the public room)

!pick
Chooses someone in the room who isn't the bot or yourself (for dares that involve someone else)

Rules
=====
1. Everyone rolls a d100 (/dice 100) to start and placed in the room from lowest to highest.
2. Players take turns to draw a dare, from left to right.
3. Dares last 10 minutes unless the dare says otherwise.
4. For dares involving someone else, spin the wheel to decide who. Re-spin if they're already a
   target for a dare.
5. If you're writing a dare that involves someone else, you can let the person doing the dare pick
   someone or have them spin the bot wheel to choose. Your dare can't involve another specific,
   named person (eg. you can say, "tie a random person", you can't say, "tie Deya").
6. No "free pass" cards: 'cos skipping a turn is boring!
7. When applying new dares, be sure to be whispering the Bot if you want them to be secret, otherwise everyone will know what dare you added.
8. For those that cant arrive at the start: every round finished, if there are new players waiting, they can join in. They will be added at the last spot of the next round so they have time to add their own dares to the Bot while the others play their turns.
9. For dares you can be as creative as you want but dont make very elaborated RP dares as those would take too long and this game is suposed to be fast.
`;

    private commandParser: CommandParser;

    private allDares: string[];
    private unusedDares: string[];

    public constructor(private conn: API_Connector) {
        this.commandParser = new CommandParser(conn);

        this.commandParser.register("pick", this.onPick);
        this.commandParser.register("dare", this.onDare);
        this.loadDares();
    }

    private async loadDares(): Promise<void> {
        let result;

        try {
            result = await readFile("dares.json", "utf-8");
            this.allDares = JSON.parse(result);
        } catch (e) {
            this.allDares = [];
        }

        try {
            result = await readFile("unuseddares.json", "utf-8");
            this.unusedDares = JSON.parse(result);
        } catch (e) {
            this.unusedDares = [];
        }
    }

    private addDare(dare: string) {
        this.allDares.push(dare);
        this.unusedDares.push(dare);
        this.saveDares();
    }

    private async saveDares(): Promise<void> {
        await writeFile(`dares.json`, JSON.stringify(this.allDares));
        await writeFile(`unuseddares.json`, JSON.stringify(this.unusedDares));
    }

    private dareSummary(): string {
        return `${this.unusedDares.length} dares remain out of ${this.allDares.length} total.`;
    }

    onDare = async (
        senderCharacter: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (args.length < 1) {
            this.conn.SendMessage("Emote", "*" + this.dareSummary());
            return;
        }

        switch (args[0]) {
            case "add":
                if (args.length < 2) {
                    this.conn.SendMessage("Emote", "*Usage: !dare add <dare>");
                    return;
                }
                this.addDare(args.slice(1).join(" "));
                this.conn.SendMessage(
                    "Emote",
                    `*Dare saved, thanks ${senderCharacter}! ${this.dareSummary()}`,
                );

                break;
            case "draw":
                if (this.unusedDares.length === 0) {
                    this.conn.SendMessage("Emote", `*No more dares left!`);
                    return;
                }
                this.conn.SendMessage(
                    "Emote",
                    `*${senderCharacter} draws a dare card...`,
                );
                await wait(2000);

                const n = Math.floor(Math.random() * this.unusedDares.length);
                const dare = this.unusedDares[n];
                this.unusedDares.splice(n, 1);
                this.saveDares();
                this.conn.SendMessage(
                    "Emote",
                    `*${senderCharacter} draws: ${dare}\n${this.dareSummary()}`,
                );
                break;
            case "reset":
                this.unusedDares = Array.from(this.allDares);
                this.saveDares();
                this.conn.SendMessage("Emote", "*" + this.dareSummary());
                break;
            default:
                this.conn.SendMessage(
                    "Emote",
                    "*Usage: !dare <add|draw|reset>",
                );
                return;
        }
    };

    onPick = async (
        senderCharacter: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        this.conn.SendMessage(
            "Emote",
            `*${senderCharacter} randomly selects a room member...`,
        );
        await wait(2000);

        const possibleMembers = this.conn.chatRoom.characters.filter(
            (m) =>
                ![
                    senderCharacter.MemberNumber,
                    this.conn.Player.MemberNumber,
                ].includes(m.MemberNumber),
        );
        const n = Math.floor(Math.random() * possibleMembers.length);
        const target = possibleMembers[n];
        this.conn.SendMessage("Emote", `*${target} has been selected!`);
    };
}
