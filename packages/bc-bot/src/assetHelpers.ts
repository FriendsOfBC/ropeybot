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

import { AssetFemale3DCG } from "./bcdata/female3DCG.js";
import { BC_AppearanceItem, getAssetDef } from "./item.ts";

function getAssetGroup(groupName: AssetGroupName): AssetGroupDefinition | null {
    return AssetFemale3DCG.find((g) => g.Group === groupName) ?? null;
}

export function isClothing(item: BC_AppearanceItem): boolean {
    const group = getAssetGroup(item.Group);
    if (!group) return false;

    // These slots are cosplay, not clothing, whatever the category actually thinks
    if (["HairAccessory2", "TailStraps", "Wings"].includes(item.Group))
        return false;
    return (
        group.Category === undefined &&
        !!group.Clothing &&
        (group.AllowNone ?? true)
    );
}

export function isCosplay(item: BC_AppearanceItem): boolean {
    const group = getAssetGroup(item.Group);
    // These slots are cosplay, whatever the category actually thinks
    if (["HairAccessory2", "TailStraps", "Wings"].includes(item.Group))
        return true;
    const assetDef = getAssetDef(item);
    return (
        !!group &&
        group.Category === undefined &&
        !!group.Clothing &&
        (group.BodyCosplay || (assetDef?.BodyCosplay ?? false)) &&
        (group.AllowNone ?? true)
    );
}

export function isBody(item: BC_AppearanceItem): boolean {
    const group = getAssetGroup(item.Group);
    if (!group) return false;
    return (
        (group.Category === undefined && !group.Clothing) ||
        group.AllowNone === false
    );
}

export function isBind(item: BC_AppearanceItem): boolean {
    const group = getAssetGroup(item.Group);
    return group?.Category === "Item" && !group.BodyCosplay;
}
