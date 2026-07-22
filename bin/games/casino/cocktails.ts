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

export interface Cocktail {
    name: string;
    description: string;
    colour: HexColor;
}

export const COCKTAILS: Record<string, Cocktail> = {
    dragon: {
        name: "Dragon's Kiss",
        colour: "#D77070",
        description:
            "A deep, ruby red drink served in a coupe glass. Spiced rum, smokey Islay peated scotch, ginger beer, " +
            "ghost pepper reduction and a dash of lime.",
    },
    pinkpaw: {
        name: "Pink Paw",
        colour: "#C65F9E",
        description:
            "A fuscia pink strawberry with fresh mint and sherbert. Sweet and zingy, but easily tamed with soda water.",
    },
};
