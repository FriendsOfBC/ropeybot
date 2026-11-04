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

import { BC_AppearanceItem } from "./item.ts";

function isMainColour(colour: string): boolean {
    return colour.toUpperCase() === "#FF00FF";
}

function isTintColour(colour: string): boolean {
    return colour.toUpperCase() === "#00FF00";
}

function replaceColour(
    colour: string,
    mainColour: string,
    tintColour: string,
): string {
    if (isMainColour(colour)) {
        return mainColour;
    } else if (isTintColour(colour)) {
        return tintColour;
    } else {
        return colour;
    }
}

export function colourOutfit(
    outfit: BC_AppearanceItem[],
    mainColour: string,
    tintColour: string,
): BC_AppearanceItem[] {
    const coloured = JSON.parse(JSON.stringify(outfit));
    for (const item of coloured) {
        if (typeof item.Color === "string") {
            item.Color = replaceColour(item.Color, mainColour, tintColour);
        } else if (typeof item.Color === "object") {
            item.Color = item.Color.map((colour: string) =>
                replaceColour(colour, mainColour, tintColour),
            );
        }
    }

    return coloured;
}
