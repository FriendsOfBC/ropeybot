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

import { API_Character, AssetGet, BC_AppearanceItem } from "bc-bot";
import { generatePassword } from "../../utils";
import { PET_EARS } from "../petspa";

interface Forfeit {
    name: string;
    value: number;
    items: (player: API_Character) => BC_AppearanceItem[];
    lock?: BC_AppearanceItem;
    lockTimeMs?: number;
    colourLayers?: number[];
    applyItems?: (char: API_Character, lockMemberNumber: number) => void;
}

export const FORFEITS: Record<string, Forfeit> = {
    boots: {
        name: "Boots",
        value: 5,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        items: () => [AssetGet("ItemBoots", "BalletHeels")],
    },
    legbinder: {
        name: "Leg binder",
        value: 7,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        colourLayers: [0],
        items: () => [AssetGet("ItemLegs", "ShinyLegBinder")],
    },
    frogtie: {
        name: "Frogtie straps",
        value: 8,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        items: () => [AssetGet("ItemLegs", "FrogtieStraps")],
    },
    gag: {
        name: "Gag",
        value: 7,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        colourLayers: [0],
        items: () => {
            const gag = AssetGet("ItemMouth", "HarnessBallGag");
            gag.Property = { TypeRecord: { typed: 2 } };
            return [gag];
        },
    },
    blindfold: {
        name: "Blindfold",
        value: 7,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        items: () => [AssetGet("ItemHead", "LatexBlindfold")],
    },
    mittens: {
        name: "Mittens",
        value: 9,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        colourLayers: [0],
        items: () => {
            const mittens = AssetGet("ItemHands", "LatexBondageMitts");
            mittens.Property = { TypeRecord: { t: 1, w: 1, r: 0, l: 0 } };
            return [mittens];
        },
    },
    paws: {
        name: "Paws",
        value: 9,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        colourLayers: [0],
        items: () => {
            const mittens = AssetGet("ItemHands", "ElbowLengthMittens");
            mittens.Property = { TypeRecord: { typed: 0 } };
            return [mittens];
        },
    },
    armbinder: {
        name: "Armbinder",
        colourLayers: [0],
        value: 10,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        items: () => [AssetGet("ItemArms", "ShinyArmbinder")],
    },
    yoke: {
        name: "Yoke",
        value: 10,
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        items: () => [AssetGet("ItemArms", "Yoke")],
    },
    cage: {
        name: "Cage",
        value: 30,
        items: () => {
            const cage = AssetGet("ItemDevices", "Kennel");
            cage.Property = { TypeRecord: { d: 1, p: 1 } };
            return [cage];
        },
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        applyItems: (character: API_Character, lockMemberNumber: number) => {
            const cage = character.Appearance.AddItem(
                AssetGet("ItemDevices", "Kennel"),
            );
            cage.setProperty("TypeRecord", { d: 1, p: 1 });
            cage.SetDifficulty(20);
            cage.lock("TimerPasswordPadlock", lockMemberNumber, {
                Password: generatePassword(),
                Hint: "Better luck next time!",
                RemoveItem: true,
                RemoveTimer: Date.now() + FORFEITS.cage.lockTimeMs,
                ShowTimer: true,
                LockSet: true,
            });
        },
    },
    pet: {
        name: "Pet",
        value: 12,
        items: () => [AssetGet("ItemArms", "ShinyPetSuit")],
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        applyItems: makePet.bind(null, 0),
    },
    pet1hour: {
        name: "Pet: 1 hour",
        value: 15,
        items: () => [AssetGet("ItemArms", "ShinyPetSuit")],
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 1 * 60 * 60 * 1000,
        applyItems: makePet.bind(null, 1),
    },
    pet2hours: {
        name: "Pet: 2 hours",
        value: 20,
        items: () => [AssetGet("ItemArms", "ShinyPetSuit")],
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 2 * 60 * 60 * 1000,
        applyItems: makePet.bind(null, 2),
    },
    pet3hours: {
        name: "Pet: 3 hours",
        value: 25,
        items: () => [AssetGet("ItemArms", "ShinyPetSuit")],
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 3 * 60 * 60 * 1000,
        applyItems: makePet.bind(null, 3),
    },
    pet4hours: {
        name: "Pet: 4 hours",
        value: 30,
        items: () => [AssetGet("ItemArms", "ShinyPetSuit")],
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 4 * 60 * 60 * 1000,
        applyItems: makePet.bind(null, 4),
    },
    chastity: {
        name: "Chastity",
        value: 15,
        items: (sender) => {
            if (!sender || !sender.Appearance) {
                return [AssetGet("ItemPelvis", "ModularChastityBelt")];
            }
            const item = sender.Appearance.InventoryGet("Pussy");
            if (item.Name == "Penis") {
                return [AssetGet("ItemVulva", "PlasticChastityCage2")];
            } else {
                return [AssetGet("ItemPelvis", "ModularChastityBelt")];
            }
        },
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
        applyItems: makeChaste.bind(null),
    } /*
    hypnovisor: {
        name: "Hypnotic Visor",
        colourLayers: [2],
        value: 6,
        items: () => [AssetGet("ItemHead", "HypnoticVisor")],
        lock: AssetGet("ItemMisc", "TimerPasswordPadlock"),
        lockTimeMs: 20 * 60 * 1000,
    }*/,
};

interface Service {
    name: string;
    description: string;
    value: number;
}

export const SERVICES: Record<string, Service> = {
    cocktail: {
        name: "House Special Cocktail",
        description:
            "Hand crafted by our expert mixologist. Please drink responsibly.",
        value: 10,
    },
    player: {
        name: "Buy a caged player",
        description: "Why waste their misfortune?",
        value: 100,
    },
    lap: {
        name: "Sit in Lilly's lap",
        description: "Enjoy sitting in Lilly's lap for an hour.",
        value: 20000,
    },
    /*"massage": {
        name: "Pixie Massage",
        description: "Let Miss Ellie melt away those tensions with a soothing massage.",
        value: 800,
    },
    "session": {
        name: "Session with Miss Ellie",
        description: "Something you'd like to try? Need to give up control? Name your kink and let Miss Ellie take you to the depths of your subby desires.",
        value: 1000,
    },
    "rent-a-pixie": {
        name: "Rent-a-pixie™️",
        description: "Ellie is at your service for up to 60 mins. Skills include bar work, pet walking and casino management.",
        value: 2000,
    },
    "modelling": {
        name: "Modelling",
        description: "Ellie will wear an outfit of your choice (clothes only) for a full 24 hours. No nudity!",
        value: 5000,
    },
    "pixiepet": {
        name: "Pixie Pet",
        description: "Your very own personal pet for 2 hours.",
        value: 10000,
    },*/
};

function makeChaste(character: API_Character, lockMemberNumber: number): void {
    if (character.Appearance.InventoryGet("Pussy").Name == "Penis") {
        const chastityCage = character.Appearance.AddItem(
            AssetGet("ItemVulva", "PlasticChastityCage2"),
        );
        chastityCage.SetCraft({
            Name: `Pixie Casino Chastity Cage`,
            Description:
                `After betting and losing at the Pixie Casino, ${character} has lost the privilege to orgasm. ` +
                `This chastity cage will ensure that the rule is followed.`,
        });
        const hairColor =
            character.Appearance.InventoryGet("HairFront").GetColor();
        const targetColor: BCColor =
            hairColor.length > 1
                ? (hairColor[0] as HexColor)
                : (hairColor as HexColor);
        chastityCage.SetColor(["Default", targetColor, targetColor, "#FFBC00"]);
        chastityCage.lock("TimerPasswordPadlock", lockMemberNumber, {
            Password: generatePassword(),
            Hint: "Better luck next time!",
            RemoveItem: true,
            RemoveTimer: Date.now() + FORFEITS.chastity.lockTimeMs,
            ShowTimer: true,
            LockSet: true,
        });
    } else {
        const chastityBelt = character.Appearance.AddItem(
            AssetGet("ItemPelvis", "ModularChastityBelt"),
        );
        chastityBelt.SetCraft({
            Name: `Pixie Casino Chastity Belt`,
            Description:
                `After betting and losing at the Pixie Casino, ${character} has lost her privileges to orgasm. ` +
                `This chastity belt will ensure that she is kept chaste until her time is up.`,
        });
        chastityBelt.SetColor(
            character.Appearance.InventoryGet("HairFront").GetColor(),
        );
        chastityBelt.setProperty("TypeRecord", {
            a: 1,
            c: 1,
            i: 0,
            o: 0,
            p: 0,
            s: 0,
            v: 0,
        });
        chastityBelt.lock("TimerPasswordPadlock", lockMemberNumber, {
            Password: generatePassword(),
            Hint: "Better luck next time!",
            RemoveItem: true,
            RemoveTimer: Date.now() + FORFEITS.chastity.lockTimeMs,
            ShowTimer: true,
            LockSet: true,
        });
    }
}

function makePet(
    hours: number,
    character: API_Character,
    lockMemberNumber: number,
): void {
    const characterHairColor =
        character.Appearance.InventoryGet("HairFront").GetColor();

    const petSuitItem = character.Appearance.AddItem(
        AssetGet("ItemArms", "ShinyPetSuit"),
    );
    petSuitItem.SetCraft({
        Name: `Pixie Casino Pet Suit`,
        Description:
            `A bold but unfortunate bet from ${character} means that they are now an official Pixie Casino Pet, ` +
            `here to be adorable for all our patrons. Please enjoy their helplessness!`,
    });
    petSuitItem.SetColor(characterHairColor);
    petSuitItem.Extended.SetType("Classic");
    petSuitItem.lock("TimerPasswordPadlock", lockMemberNumber, {
        Password: generatePassword(),
        Hint: "Better luck next time!",
        RemoveItem: true,
        RemoveTimer:
            Date.now() + (hours > 0 ? hours * 60 * 60 * 1000 : 20 * 60 * 1000),
        ShowTimer: true,
        LockSet: true,
    });

    if (!character.Appearance.InventoryGet("HairAccessory2")) {
        const ears = character.Appearance.AddItem(PET_EARS);
        ears.SetDifficulty(20);
        ears.SetColor(
            character.Appearance.InventoryGet("HairFront").GetColor(),
        );
    }

    if (!character.Appearance.InventoryGet("TailStraps")) {
        const tail = character.Appearance.AddItem(
            AssetGet("TailStraps", "PuppyTailStrap"),
        );
        tail.SetColor(
            character.Appearance.InventoryGet("HairFront").GetColor(),
        );
    }

    if (!character.Appearance.InventoryGet("ItemNeck")) {
        const collar = character.Appearance.AddItem(
            AssetGet("ItemNeck", "PetCollar"),
        );
        /*collar.lock("TimerPasswordPadlock", lockMemberNumber, {
            Password: generatePassword(),
            Hint: "Better luck next time!",
            RemoveItem: true,
            RemoveTimer: Date.now() + hours * 60 * 60 * 1000,
            ShowTimer: true,
            LockSet: true,
        });*/
        collar.SetCraft({
            Name: `Pixie Casino Pet Collar`,
            Description:
                `A bold but unfortunate bet from ${character} means that they are now an official Pixie Casino Pet. ` +
                `This collar will remind them of their place until their time is up.`,
        });
    }
}

export function forfeitsString(): string {
    return Object.entries(FORFEITS)
        .map(([name, f]) => `${name}: ${f.value} chips`)
        .join("\n");
}

export function restraintsRemoveString(): string {
    return Object.entries(FORFEITS)
        .map(([name, forfeit]) => `${forfeit.name}: ${forfeit.value * 4} chips`)
        .join("\n");
}

function commandForService(name: string): string {
    return (
        `/bot buy ${name}` +
        (name === "player" ? " <name or member number>" : "")
    );
}

export function servicesString(): string {
    return Object.entries(SERVICES)
        .map(
            ([name, s]) =>
                `${s.name}: ${s.value} chips\n${s.description}\n${commandForService(name)}\n`,
        )
        .join("\n");
}
