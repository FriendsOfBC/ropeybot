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

import { BC_AppearanceItem } from "bc-bot";

export const ROULETTE_WHEEL: BC_AppearanceItem[] = [
    {
        Name: "LuckyWheel",
        Group: "ItemDevices",
        Color: [
            "#403636",
            "#881818",
            "#FFA8DD",
            "#2C2C2C",
            "Default",
            "#7B3D9E",
            "#FF3F3F",
            "#84730B",
            "#F2F2F2",
            "#D43434",
            "#910000",
            "#222222",
            "#E18DC3",
        ],
        Property: {
            TypeRecord: {
                g: 0,
                s: 0,
                m: 1,
                a: 0,
                p: 0,
            },
            Difficulty: 0,
            TargetAngle: 22,
            Texts: [" ", " ", " ", " ", " ", " ", " ", " "],
            Block: [],
            Effect: [],
            Hide: [],
            HideItem: [],
            AllowActivity: [],
            Attribute: [],
        },
    },
];
