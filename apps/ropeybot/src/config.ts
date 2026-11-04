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

import { type RoomDefinition } from "bc-bot";
import { type CasinoConfig } from "./games/casino";

export interface ConfigFile {
    user: string;
    password: string;
    env: "live" | "test";
    url?: string;
    game: string;
    superusers: number[];
    room: RoomDefinition;
    mongo_uri?: string;
    mongo_db?: string;
    members: number[];

    user2: string;
    password2: string;

    casino?: CasinoConfig;
}
