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

import lzString from "lz-string";
import type { API_Character } from "./apiCharacter.ts";
import { API_Connector } from "./index.ts";

const MAX_OFFER_CODE_LENGTH = 30_000;
const MAX_DECOMPRESSED_LENGTH = 2_000_000;
const BCP_ACTION_TAG = 'MISSING TEXT IN "ActivityDictionary.csv": BCPAction';

/**
 * Sends a BC+ contract offer code to a character in the current room.
 * Throws when the code is malformed or is not a BC+ contract offer.
 */
export function offerBCPlusContract(connection: API_Connector, target: API_Character, offerCode: string): void {
    const code = offerCode.trim();
    if (code.length > MAX_OFFER_CODE_LENGTH) {
        throw new TypeError("BC+ contract offer code is too long");
    }

    const match = /^BCP1:contract:([A-Za-z0-9+/=]+)$/.exec(code);
    if (!match) {
        throw new TypeError("Invalid BC+ contract offer code");
    }

    let payload: unknown;
    try {
        const json = lzString.decompressFromBase64(match[1]!);
        if (!json || json.length > MAX_DECOMPRESSED_LENGTH) {
            throw new TypeError("Invalid or oversized BC+ contract payload");
        }
        payload = JSON.parse(json) as unknown;
    } catch (error) {
        if (error instanceof TypeError) throw error;
        throw new TypeError("Invalid BC+ contract payload", { cause: error });
    }

    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
        throw new TypeError("Code does not contain a BC+ contract offer");
    }

    const contract = payload as Record<string, unknown>;
    if (
        typeof contract.title !== "string"
        || contract.title.trim().length === 0
        || typeof contract.author !== "number"
        || !Number.isInteger(contract.author)
        || contract.author < 0
        || typeof contract.rules !== "object"
        || contract.rules === null
        || Array.isArray(contract.rules)
    ) {
        throw new TypeError("Code does not contain a BC+ contract offer");
    }

    const title = contract.title.trim().slice(0, 60);
    connection.SendBCPMessage({ message: "ContractOffer", payload: contract }, target.MemberNumber);
}
