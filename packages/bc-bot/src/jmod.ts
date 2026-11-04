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
import { BundleApplyConfig, exportBundle, importBundle } from "./appearance.ts";
import { BC_AppearanceItem } from "./item.ts";

export function JMod_importAppearanceBundle(
    bundle: string,
): BC_AppearanceItem[] {
    return importBundle(bundle);
}

export function JMod_exportAppearanceBundle(
    items: BC_AppearanceItem[],
): string {
    return exportBundle(items);
}

export function JMod_allowApplyAppearanceBundle(
    char: API_Character,
    items: BC_AppearanceItem[],
    cfg: BundleApplyConfig,
) {
    // TODO
    return true;
}

export function JMod_applyAppearanceBundle(
    char: API_Character,
    items: BC_AppearanceItem[],
    cfg?: BundleApplyConfig,
    skipGroups?: AssetGroupName[],
): boolean {
    char.Appearance.stripBulk({
        clothing: true,
        item: true,
    });
    return char.Appearance.applyBundle(items, cfg, skipGroups);
}
