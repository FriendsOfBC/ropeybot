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
import { API_Connector, MessageEvent, makeDoorRegion, MapRegion, API_Character, AssetGet, BC_AppearanceItem, CommandParser, BC_Server_ChatRoomMessage } from "bc-bot";
import { remainingTimeString } from "../utils";
import { wait } from "../hub/utils";

const RECEPTION_AREA: MapRegion = {
    TopLeft: { X: 13, Y: 11 },
    BottomRight: { X: 33, Y: 15 },
};

const RECEPTIONIST_POSITION = { X: 22, Y: 11 };

const EXHIBIT_1: ChatRoomMapPos = { X: 26, Y: 12 };
const EXHIBIT_2: ChatRoomMapPos = { X: 28, Y: 12 };
const EXHIBIT_3: ChatRoomMapPos = { X: 30, Y: 12 };
const EXHIBIT_4: ChatRoomMapPos = { X: 32, Y: 12 };

const HALLWAY_TO_PET_AREA_DOOR: ChatRoomMapPos = { X: 18, Y: 2 };
const COMMON_AREA_TO_RECEPTION_DOOR: ChatRoomMapPos = { X: 14, Y: 10 };
const REDRESSING_PAD: ChatRoomMapPos = { X: 18, Y: 8 };

const DRESSING_PAD: ChatRoomMapPos = { X: 23, Y: 5 };

const MAP =
    "N4IgKgngDgpiBcICCAbA7gQwgZxAGnAEsUZdEAgyq6m8wH+AAPJ5hugEw86+9t6sZZN23EZz586kyc2GiR4hfRlzRi8QNYr5a3gIDBsrRyknTZqcqNWjGw9fsc9bWw9dcXbroAXwHz/NnPb18vO25/EytgkJsAEL04hPjQkSjkrhiMzKy0oN8c4yzC/I5U2MLMu0An4Grq8hr6hsam+oB1tvaOzrbKroAz/q6unsGRluGO/t7R9vHpjtm2ybmx5c6FlqW59a29Xb39g8PKg+Xjw/Pzs73Ti9v9q92bu7uHvSfni9f3j6OTnZ/Ln8Wr4hgDAft2iC1mDfhC2lD5jCDl94T5QUi9ijpq8YVjRjiwXiRgSAUTBiSfmT0Ri9FToTTaUD8QzGXDsSzXvgQAB5ABGACsYABjAAuZBAgUlHEo2hlUu00vIRkANfDyrhytWarXayWAKvgdQbPIAxoCNhocgC4gS2Wg3ULSAavgRA6zdZAEPQbDdHsNACXnb63IABQD9QZUTuDYZ1gA/wDiAIAhwyIo1psHGzYBV8F9CeToljmaD2edgAYgDiALfAc8G0/GM37KwbC3Jq8766Wq2HGy2462DR2G5wu54uQAxAD2AHMEAAzDAobAwAC+QA";

const PERMITTED_WORDS = new Set([
    "meow",
    "mew",
    "nya",
    "purr",
    "hiss",
    "woof",
    "bark",
    "growl",
    "grrr",
    "awoo",
]);

export const PET_EARS: BC_AppearanceItem = {
    Name: "HarnessCatMask",
    Group: "ItemHood",
    Color: ["#202020", "#FF00FF", "#ADADAD"],
    Property: {
        TypeRecord: {
            typed: 1,
        },
        OverridePriority: {
            Base: 0,
        },
    },
};

export class PetSpa {
    public static description = [
        "This is an example to show how to use the ropeybot API to create a simple game.",
        "Commands:",
        "",
        "/bot residents - List the current residents of the spa",
        "/bot freeandleave - Immediately removes any restraints added and kicks you from the room",
        "Code at https://github.com/FriendsOfBC/ropeybot",
    ].join("\n");

    private exitTime = new Map<number, number>();
    private earsAdded = new Set<number>();
    private tailAdded = new Set<number>();

    private commandParser: CommandParser;

    public constructor(private conn: API_Connector) {
        this.commandParser = new CommandParser(this.conn);

        this.conn.on("RoomCreate", this.onChatRoomCreated);
        this.conn.on("RoomJoin", this.onChatRoomJoined);

        conn.on("Message", this.onMessage);

        this.conn.chatRoom.map.addTileTrigger(
            EXHIBIT_1,
            this.onCharacterViewExhibit1,
        );
        this.conn.chatRoom.map.addTileTrigger(
            EXHIBIT_2,
            this.onCharacterViewExhibit2,
        );
        this.conn.chatRoom.map.addTileTrigger(
            EXHIBIT_3,
            this.onCharacterViewExhibit3,
        );
        this.conn.chatRoom.map.addTileTrigger(
            EXHIBIT_4,
            this.onCharacterViewExhibit4,
        );

        this.conn.chatRoom.map.addTileTrigger(
            DRESSING_PAD,
            this.onCharacterEnterDressingPad,
        );
        this.conn.chatRoom.map.addTileTrigger(
            REDRESSING_PAD,
            this.onCharacterEnterRedressingPad,
        );

        this.conn.chatRoom.map.addEnterRegionTrigger(
            RECEPTION_AREA,
            this.onCharacterEnterReception,
        );

        this.conn.chatRoom.map.addEnterRegionTrigger(
            makeDoorRegion(HALLWAY_TO_PET_AREA_DOOR, true, false),
            this.onCharacterApproachHallwayToPetAreaDoor,
        );
        this.conn.chatRoom.map.addLeaveRegionTrigger(
            makeDoorRegion(HALLWAY_TO_PET_AREA_DOOR, true, false),
            this.onCharacterLeaveHallwayToPetAreaDoor,
        );

        this.conn.chatRoom.map.addEnterRegionTrigger(
            makeDoorRegion(COMMON_AREA_TO_RECEPTION_DOOR, true, false),
            this.onCharacterApproachCommonAreaToReceptionDoor,
        );
        this.conn.chatRoom.map.addLeaveRegionTrigger(
            makeDoorRegion(COMMON_AREA_TO_RECEPTION_DOOR, true, false),
            this.onCharacterLeaveCommonAreaToReceptionDoor,
        );

        this.commandParser.register("residents", this.onCommandResidents);
        this.commandParser.register("freeandleave", this.onCommandFreeAndLeave);
    }

    public async init(): Promise<void> {
        await this.setupRoom();
        await this.setupCharacter();
    }

    private onChatRoomCreated = async () => {
        await this.setupRoom();
        await this.setupCharacter();
    };

    private onChatRoomJoined = async () => {
        await this.setupCharacter();
    };

    private setupRoom = async () => {
        try {
            this.conn.chatRoom.map.setMapFromData(
                JSON.parse(decompressFromBase64(MAP)),
            );

            // Reset all the doors to the state they should be in normally at start
            this.conn.chatRoom.map.setObject(
                HALLWAY_TO_PET_AREA_DOOR,
                "WoodLocked",
            );
            this.conn.chatRoom.map.setObject(
                COMMON_AREA_TO_RECEPTION_DOOR,
                "WoodClosed",
            );
        } catch (e) {
            console.log("Map data not loaded", e);
        }
    };

    private setupCharacter = async () => {
        this.conn.moveOnMap(RECEPTIONIST_POSITION.X, RECEPTIONIST_POSITION.Y);
        this.conn.Player.SetActivePose(["Kneel"]);
    };

    private onMessage = async (msg: MessageEvent) => {
        if (
            msg.message.Type === "Chat" &&
            !msg.message.Content.startsWith("(")
        ) {
            const exitTime = this.exitTime.get(msg.sender.MemberNumber);
            if (exitTime === undefined) return;

            const words = msg.message.Content.toLowerCase()
                .split(/^a-z/)
                .filter((word) => word.length > 3)
                // replace duplicate end letters to allow "awoooooo" etc
                .map((w) => w.replace(/(.)\1+$/, "$1"));

            for (const w of words) {
                if (!PERMITTED_WORDS.has(w)) {
                    this.exitTime.set(
                        msg.sender.MemberNumber,
                        exitTime + 2 * 60 * 1000,
                    );
                    msg.sender.Tell(
                        "Whisper",
                        "(BAD PET! Human speech is strictly prohibited in the spa! 2 minutes has been added to your minimum stay.",
                    );
                    return;
                }
            }
        }
    };

    private onCharacterViewExhibit1 = async (char: API_Character) => {
        char.Tell(
            "Whisper",
            "(This is a painting of a large, very happy looking dog having its belly rubbed by an excited looking blonde lady." +
                `The plaque below reads: "Here at the Pet Spa, our pets can truly relax as we take care of their every need. "`,
        );
    };

    private onCharacterViewExhibit2 = async (char: API_Character) => {
        char.Tell(
            "Whisper",
            "(This  painting is of a cat eating tasty looking chunks of food from a bowl." +
                `The plaque below reads: "Our chefs prepare the finest meals daily for our residents. Nothing but the best will do."`,
        );
    };

    private onCharacterViewExhibit3 = async (char: API_Character) => {
        char.Tell(
            "Whisper",
            "(This painting is of a very cute rabbit having its fur brushed by a cheerful lady in uniform." +
                `The plaque below reads: "Grooming is part of our standard service here at the Pet Spa. We believe our pets shoukd look and feel their best."`,
        );
    };

    private onCharacterViewExhibit4 = async (character: API_Character) => {
        character.Tell(
            "Whisper",
            "(This painting is of a fluffy fox with deep red fur, sitting on an examination table while a nurse holds a stethoscope to its chest." +
                `The plaque below reads: "Here at the Pet Spa, the health of our pets is our top priority. Our highly trained vets will every pet's health needs are tended to."`,
        );
    };

    private onCharacterEnterReception = async (character: API_Character) => {
        this.exitTime.delete(character.MemberNumber);
        this.conn.SendMessage(
            "Chat",
            `Welcome to the Pet Spa, ${character}. Is life getting you down? Why not come and unwind with us? We offer a relaxation experience ` +
                `like no other, where you can be pampered and have your every need taken care of. If you'd like to join, please proceed through ` +
                `the door behind me into the dressing area and use the blue dressing pad to be permitted into the spa. ` +
                `Please note that there is a minimum stay of 30 minutes and human speech is strictly prohibited for spa users. ` +
                `If you're not sure, you can take a look at our promotional gallery to the right. If you're here to play with the pets, head ` +
                `right on in through the door to the left! To see our current residents, use /bot residents.`,
        );
    };

    private onCharacterApproachHallwayToPetAreaDoor = async (
        character: API_Character,
    ) => {
        const currentArmItem = character.Appearance.InventoryGet("ItemArms");
        console.log(
            `${character} current arm item name: ${currentArmItem?.Name}`,
        );
        if (
            currentArmItem?.Name === "ShinyPetSuit" ||
            this.exitTime.has(character.MemberNumber)
        ) {
            character.Tell("Whisper", "(You may now enter the spa!");
            this.conn.chatRoom.map.setObject(
                HALLWAY_TO_PET_AREA_DOOR,
                "WoodOpen",
            );
        } else {
            character.Tell(
                "Whisper",
                "(You need to be wearing a spa suit to enter the spa. Please use the dressing pad to get one.",
            );
        }
    };

    private onCharacterLeaveHallwayToPetAreaDoor = async (
        character: API_Character,
    ) => {
        this.conn.chatRoom.map.setObject(
            HALLWAY_TO_PET_AREA_DOOR,
            "WoodLocked",
        );
    };

    private onCharacterApproachCommonAreaToReceptionDoor = async (
        character: API_Character,
    ) => {
        const currentArmItem = character.Appearance.InventoryGet("ItemArms");
        if (currentArmItem) {
            character.Tell(
                "Whisper",
                "(If you'd like to leave the spa, please use the blue redressing pad to do so.",
            );
        }
    };

    private onCharacterLeaveCommonAreaToReceptionDoor = async (
        character: API_Character,
    ) => {
        this.conn.chatRoom.map.setObject(
            COMMON_AREA_TO_RECEPTION_DOOR,
            "WoodClosed",
        );
    };

    private onCharacterEnterDressingPad = async (character: API_Character) => {
        character.Tell(
            "Whisper",
            "(Please remain still while the scanner determines exact measurements for your spa suit...",
        );

        await wait(2000);

        character.Tell("Whisper", "(Scan complete. Preparing spa suit...");

        await wait(2000);

        character.Tell(
            "Whisper",
            "(Preparation complete. Please remain still while your suit is fitted...",
        );

        await wait(1000);

        const characterHairColor =
            character.Appearance.InventoryGet("HairFront").GetColor();
        const characterHairSingleColor =
            typeof characterHairColor === "object"
                ? characterHairColor[0]
                : characterHairColor;

        const petSuitItem = character.Appearance.AddItem(
            AssetGet("ItemArms", "ShinyPetSuit"),
        );
        petSuitItem.SetCraft({
            Name: `Pet Spa Suit`,
            Description: `A very comfy suit, specially made for ${character} to ensure the wearer complete, uniterrupted relaxation.`,
        });
        petSuitItem.SetColor(characterHairColor);
        petSuitItem.Extended.SetType("Classic");

        if (character.Appearance.InventoryGet("HairAccessory2") === null) {
            await wait(1000);

            character.Tell("Whisper", `(Adding ears...`);

            const ears = character.Appearance.AddItem(PET_EARS);
            ears.SetColor(
                character.Appearance.InventoryGet("HairFront").GetColor(),
            );

            this.earsAdded.add(character.MemberNumber);
        }

        if (character.Appearance.InventoryGet("TailStraps") === null) {
            await wait(1000);

            character.Tell("Whisper", `(Attaching tail...`);

            const tail = character.Appearance.AddItem(
                AssetGet("TailStraps", "TailStrap"),
            );
            tail.SetColor(
                character.Appearance.InventoryGet("HairFront").GetColor(),
            );

            this.tailAdded.add(character.MemberNumber);
        }

        character.Tell(
            "Whisper",
            "(Thank you, you are now ready to enter the spa! Please approach the door above and it will open for you.",
        );

        this.conn.SendMessage(
            "Emote",
            `*A voice speaks over the tannoy: Please welcome our newest resident: ${character}!`,
        );

        this.exitTime.set(character.MemberNumber, Date.now() + 30 * 60 * 1000);
    };

    private onCharacterEnterRedressingPad = async (
        character: API_Character,
    ) => {
        const exitTime = this.exitTime.get(character.MemberNumber);
        if (exitTime === undefined) return;
        if (exitTime < Date.now()) {
            this.exitTime.delete(character.MemberNumber);

            character.Tell(
                "Whisper",
                "(Thank you for visiting the Pet Spa! We hope you enjoyed your time with us.",
            );
            this.freeCharacter(character);
        } else {
            character.Tell(
                "Whisper",
                `(I'm sorry, ${character}, you may leave the spa in another ${remainingTimeString(exitTime)}.`,
            );
        }
    };

    private onCommandResidents = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        const residents = this.conn.chatRoom.characters.filter((c) =>
            this.exitTime.has(c.MemberNumber),
        );

        const residentsList = residents
            .map(
                (c) =>
                    `${c} - ${remainingTimeString(this.exitTime.get(c.MemberNumber))} remaining`,
            )
            .join("\n");
        if (residentsList.length === 0) {
            this.conn.reply(
                msg,
                "There are no residents in the spa right now.",
            );
        } else {
            this.conn.reply(msg, `Current residents:\n${residentsList}`);
        }
    };

    private onCommandFreeAndLeave = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        this.exitTime.delete(sender.MemberNumber);
        this.freeCharacter(sender);
        await wait(500);
        sender.Kick();
    };

    private freeCharacter(character: API_Character): void {
        character.Appearance.RemoveItem("ItemArms");

        if (this.earsAdded.delete(character.MemberNumber)) {
            character.Appearance.RemoveItem("ItemHood");
        }
        if (this.tailAdded.delete(character.MemberNumber)) {
            character.Appearance.RemoveItem("TailStraps");
        }
    }
}
