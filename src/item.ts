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
import { AssetType } from "./appearance.ts";
import { AssetFemale3DCG, PoseFemale3DCG } from "./bcdata/female3DCG.js";
import { AssetFemale3DCGExtended } from "./bcdata/Female3DCGExtended.ts";

// An item as it appears on the wire (similar to Item but instead of the Asset
// there's just Name representing the asset name), plus a Group

export type BC_AppearanceItem = ServerItemBundle;

interface PartialCraftingData {
    Name: string;
    Description: string;
    Property?: CraftingPropertyType;
    MemberName?: string;
    MemberNumber?: number;
    Effects?: CraftingItem["Effects"];
}

/**
 *
 * @param poses Given a list of poses, return a set of the pose categories that have poses in the list
 */
function getPoseCategories(
    poses: Iterable<AssetPoseName>,
): Set<AssetPoseCategory> {
    const cats = new Set<AssetPoseCategory>();
    for (const pose of poses) {
        const poseObj = PoseFemale3DCG.find((x) => x.Name === pose);
        if (!poseObj) {
            console.warn("Couldn't find pose", pose);
        } else {
            cats.add(poseObj.Category);
        }
    }

    return cats;
}

export class API_AppearanceItem {
    private _removed: boolean = false;
    private _extendedItem: ExtendedItem | undefined;

    private updateTask: NodeJS.Immediate | undefined;

    constructor(
        private character: API_Character,
        private data: BC_AppearanceItem,
    ) {
        const def = getAssetDef(AssetGet(data.Group, data.Name));
        if (def && def.Extended) {
            this._extendedItem = new ExtendedItem(this, data);
        }
    }

    public get Group(): AssetGroupName {
        return this.data.Group;
    }
    public get Name(): string {
        return this.data.Name;
    }
    public get Asset(): AssetType {
        return makeAssetType(AssetGet(this.data.Group, this.data.Name));
    }
    public get AssetGroup(): AssetGroupDefinition {
        return AssetFemale3DCG.find((x) => x.Group === this.Group)!;
    }
    public get Extended(): ExtendedItem | undefined {
        return this._extendedItem;
    }

    public getAssetDef(): AssetDefinition {
        return getAssetDef(AssetGet(this.data.Group, this.data.Name))!;
    }

    public GetExpression(): ExpressionName | undefined {
        return this.data.Property?.Expression;
    }

    public SetExpression(expr: ExpressionName) {
        this.data.Property = this.data.Property ?? {};
        if (expr) {
            this.data.Property.Expression = expr;
        } else {
            delete this.data.Property.Expression;
        }

        this.queueUpdate();
    }

    public SetDifficulty(difficulty: number): void {
        this.data.Difficulty = difficulty;
        this.queueUpdate();
    }

    public GetColor(): ItemColor | undefined {
        return this.data.Color;
    }

    public SetColor(colors: ItemColor): void {
        this.data.Color = colors;
        this.queueUpdate();
    }

    public SetCraft(craft: PartialCraftingData): void {
        this.data.Craft = Object.assign(
            {
                Item: this.data.Name,
                MemberName: this.character.Name,
                MemberNumber: this.character.MemberNumber,
                Property: "Normal" as CraftingPropertyType,
                Color: new Array(this.Asset.countColorableLayers())
                    .fill("Default")
                    .join(","),
                Lock: "" as "",
                Private: true,
                ItemProperty: {} as ItemProperties,
                Effects: craft.Effects ?? {},
            },
            craft,
        );

        this.queueUpdate();
    }

    public AllowRemove(): boolean {
        // TODO
        return true;
    }

    public lock(
        lockType: AssetLockType,
        lockedBy: number,
        opts: Record<string, any>,
    ): void {
        if (!this.getAssetDef().AllowLock) return;

        this.data.Property ??= {};
        this.data.Property.LockedBy = lockType;
        this.data.Property.LockMemberNumber = lockedBy;
        this.data.Property.Effect = this.data.Property.Effect ?? [];
        if (!this.data.Property.Effect.includes("Lock"))
            this.data.Property.Effect.push("Lock");
        Object.assign(this.data.Property, opts);
        this.queueUpdate();
    }

    public SetOverrideHeight(height: number | undefined): void {
        if (height) {
            this.data.Property ??= {};
            this.data.Property.OverrideHeight = {
                Priority: 100,
                Height: height,
            };
        } else if (this.data.Property) {
            delete this.data.Property.OverrideHeight;
        }
        this.queueUpdate();
    }

    public getEffects(): EffectName[] {
        return this.data.Property?.Effect ?? [];
    }

    public setRemoved(): void {
        this._removed = true;
    }

    public setProperty<K extends keyof ItemProperties>(
        prop: K,
        value: ItemProperties[K],
    ): void {
        this.data.Property ??= {};
        this.data.Property[prop] = value;
        this.queueUpdate();
    }

    public getData(): BC_AppearanceItem {
        return this.data;
    }

    public queueUpdate(): void {
        this.character.Appearance.updateItemData(this.data);
        if (this.updateTask) return;

        this.updateTask = setImmediate(this.doUpdate);
    }

    private doUpdate = (): void => {
        this.updateTask = undefined;
        this.character.sendItemUpdate(this.data);
        //this.character.sendAppearanceUpdate();
    };
}

function resolveExtendedAsset(group: AssetGroupName, asset: string) {
    let config = getExtendedAssetDef(AssetGet(group, asset));
    while (config && config.CopyConfig) {
        config = getExtendedAssetDef(
            AssetGet(
                config.CopyConfig.GroupName ?? group,
                config.CopyConfig.AssetName,
            ),
        );
    }
    return config;
}

export class ExtendedItem {
    private extendedDef: AssetArchetypeConfig;

    constructor(
        private itemType: API_AppearanceItem,
        private item: BC_AppearanceItem,
    ) {
        let config = resolveExtendedAsset(this.item.Group, this.item.Name);
        if (!config) throw new Error();
        this.extendedDef = config;
        //console.log(`Made extended item for ${item.Group} / ${item.Name}, Extended def is ${this.extendedDef}`);
    }

    public get Type() {
        return this.item.Property?.Type;
    }

    public SetText(text: string): void {
        const textParts = text.split("\n");

        this.item.Property ??= {};
        this.item.Property.Text = textParts[0];
        this.item.Property.Text2 = textParts[1];
        this.item.Property.Text3 = textParts[2];
        this.itemType.queueUpdate();
    }

    public SetType(t: string): void {
        //console.log(`Setting type for asset ${this.item.Group} / ${this.item.Name} with extended def ${JSON.stringify(this.extendedDef)} to ${t}`);
        if (this.extendedDef.Archetype !== "typed") {
            throw new Error(
                `Tried to set type of non-typed asset ${this.item.Name}`,
            );
        }

        const optionSetIdx =
            this.extendedDef.Options?.findIndex((x) => x.Name === t) ?? -1;
        if (optionSetIdx === -1) {
            throw new Error(`Invalid type ${t} for item ${this.item.Name}`);
        }
        const optionSet = this.extendedDef.Options?.[optionSetIdx];

        this.item.Property ??= {};
        const oldEffect = this.item.Property.Effect;
        Object.assign(this.item.Property, optionSet?.Property, {
            TypeRecord: { typed: optionSetIdx },
        });
        if (oldEffect)
            this.item.Property.Effect = Array.from(
                new Set([...oldEffect, ...(optionSet?.Property?.Effect ?? [])]),
            );
        this.fixupAllowActivePose(); // we probably need to do this other times too
        this.itemType.queueUpdate();
    }

    private fixupAllowActivePose(): void {
        this.item.Property ??= {};
        if (this.item.Property.SetPose) {
            // AllowActivePos is sometimes specified explictly and sometimes not, coming from SetPose.
            // Either way, extra ones need to be added implicitly - see AssetParsePosePrerequisite in BC
            // Unfortunately if you don't get it right, BC's validator will reject the whole change.
            const allowActivePoseSet = new Set<AssetPoseName>();
            if (this.item.Property.AllowActivePose) {
                for (const pose of this.item.Property.AllowActivePose) {
                    allowActivePoseSet.add(pose);
                }
            }
            if (this.item.Property.SetPose) {
                for (const pose of this.item.Property.SetPose) {
                    allowActivePoseSet.add(pose);
                }
            }
            if (this.item.Property.AllowActivePose) {
                for (const pose of this.item.Property.AllowActivePose) {
                    allowActivePoseSet.add(pose);
                }
            }
            const poseCategories = getPoseCategories(allowActivePoseSet);

            if (
                (poseCategories.has("BodyLower") ||
                    poseCategories.has("BodyUpper")) &&
                (!poseCategories.has("BodyUpper") ||
                    allowActivePoseSet.has("BackElbowTouch")) &&
                (!poseCategories.has("BodyLower") ||
                    allowActivePoseSet.has("Kneel"))
            ) {
                allowActivePoseSet.add("Hogtied");
            }

            if (
                !poseCategories.has("BodyUpper") &&
                poseCategories.has("BodyLower") &&
                allowActivePoseSet.has("Kneel")
            ) {
                allowActivePoseSet.add("AllFours");
            }

            this.item.Property.AllowActivePose = Array.from(allowActivePoseSet);
        }
    }
}

export function AssetGet(
    groupName: AssetGroupName,
    assetName: string,
): BC_AppearanceItem {
    return {
        Group: groupName,
        Name: assetName,
    };
}

export function getAssetDef(desc: BC_AppearanceItem): AssetDefinition | null {
    const grp = AssetFemale3DCG.find((g) => g.Group === desc.Group);
    if (!grp) {
        // We could add support for the echo slots, but until then, don't spam about them
        if (!desc.Group.includes("Luzi"))
            console.warn("Invalid item group: " + desc.Group);
        return null;
    }

    const assetDef = grp.Asset.find(
        (a) => typeof a !== "string" && a.Name === desc.Name,
    );

    // FIXME: those are the simple string; they'd need to be expanded
    if (typeof assetDef === "string" || assetDef === undefined) return null;

    return assetDef;
}

export function getExtendedAssetDef(
    desc: BC_AppearanceItem,
): AssetArchetypeConfig | null {
    const grp = AssetFemale3DCGExtended[desc.Group];
    if (!grp) {
        console.warn("Invalid item group: " + desc.Group);
        return null;
    }

    return grp[desc.Name];
}

function makeAssetType(desc: BC_AppearanceItem) {
    return new AssetType(getAssetDef(desc) as unknown as Asset);
}
