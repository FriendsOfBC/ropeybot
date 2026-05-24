// Things we don't really need, but Female3DCGExtended references

// From Common.js
/**
 * An enum encapsulating possible chatroom message substitution tags. Character name substitution tags are interpreted
 * in chatrooms as follows (assuming the character name is Ben987):
 * SOURCE_CHAR: "Ben987"
 * DEST_CHAR: "Ben987's" (if character is not self), "her" (if character is self)
 * DEST_CHAR_NAME: "Ben987's"
 * TARGET_CHAR: "Ben987" (if character is not self), "herself" (if character is self)
 * TARGET_CHAR_NAME: "Ben987"
 * Additionally, sending the following tags will ensure that asset names in messages are correctly translated by
 * recipients:
 * ASSET_NAME: (substituted with the localized name of the asset, if available)
 */
export const CommonChatTags: Record<"SOURCE_CHAR"|"DEST_CHAR"|"DEST_CHAR_NAME"|"TARGET_CHAR"|"TARGET_CHAR_NAME"|"ASSET_NAME"|"AUTOMATIC", CommonChatTags> = {
	SOURCE_CHAR: "SourceCharacter",
	DEST_CHAR: "DestinationCharacter",
	DEST_CHAR_NAME: "DestinationCharacterName",
	TARGET_CHAR: "TargetCharacter",
	TARGET_CHAR_NAME: "TargetCharacterName",
	ASSET_NAME: "AssetName",
	AUTOMATIC: "Automatic",
};

// From ModularItem.js
/**
 * An enum encapsulating the possible chatroom message settings for modular items
 * - PER_MODULE - The item has one chatroom message per module (messages for individual options within a module are all
 * the same)
 * - PER_OPTION - The item has one chatroom message per option (for finer granularity - each individual option within a
 * module can have its own chatroom message)
 */
export const ModularItemChatSetting: Record<"PER_MODULE"|"PER_OPTION", ModularItemChatSetting> = {
	PER_OPTION: "default",
	PER_MODULE: "perModule",
};

// dummy definitions for Hooks
export function AssetsClothAccessoryBibAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsClothCheerleaderTopAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesDollBoxAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesFuckMachineBeforeDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesFuckMachineScriptDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesFuturisticCrateScriptDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesKabeshiriWallAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesPetBowlAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemDevicesWoodenBoxAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemHeadDroneMaskAfterDrawHook(...args: any[]): any {
	return null;
}
export function ItemHeadDroneMaskValidateHook(...args: any[]): any {
	return null;
}
export function AssetsItemHoodCanvasHoodAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemMiscWoodenSignAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemMouthFuturisticPanelGagBeforeDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemMouthFuturisticPanelGagScriptDrawHook(...args: any[]): any {
	return null;
}
export function AssetsFaceMarkingsFaceWritingsAfterDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemMouthFuturisticPanelGagSetOptionHook(...args: any[]): any {
	return null;
}
export function AssetsItemNeckAccessoriesCustomCollarTagAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemNeckAccessoriesElectronicTagAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemNeckRestraintsPetPostAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemPelvisObedienceBeltAfterDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemVulvaFuturisticVibratorScriptDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsFullLatexSuitClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsFullLatexSuitDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsPrisonLockdownSuitClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsPrisonLockdownSuitDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsTransportJacketDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsTransportJacketExitHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsTransportJacketLoadHook(...args: any[]): any {
	return null;
}
export function InventoryItemArmsTransportJacketPublishActionHook(...args: any[]): any {
	return null;
}
export function InventoryItemBreastFuturisticBraDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemButtAnalBeads2PublishActionHook(...args: any[]): any {
	return null;
}
export function InventoryItemButtInflVibeButtPlugDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesKabeshiriWallDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesKabeshiriWallExitHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesKabeshiriWallLoadHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesKabeshiriWallPublishActionHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesLuckyWheelClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesLuckyWheelDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesLuckyWheelInitHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesVacBedDeluxeDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesWoodenBoxDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesWoodenBoxExitHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesWoodenBoxLoadHook(...args: any[]): any {
	return null;
}
export function InventoryItemDevicesWoodenBoxPublishActionHook(...args: any[]): any {
	return null;
}
export function InventoryItemMouthFuturisticPanelGagClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemMouthFuturisticPanelGagDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarNameTagPublishActionHook(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarShockUnitClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarShockUnitDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarAutoShockUnitBeforeDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisFuturisticTrainingBeltClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisFuturisticTrainingBeltDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisFuturisticTrainingBeltExitHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisFuturisticTrainingBeltLoadHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisLoveChastityBeltSetOptionHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisSciFiPleasurePantiesClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemPelvisSciFiPleasurePantiesDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemTorsoFuturisticHarnessClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemTorsoFuturisticHarnessDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaClitAndDildoVibratorbeltDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaClitAndDildoVibratorbeltSetOptionHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaFuturisticVibratorClickHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaFuturisticVibratorDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaFuturisticVibratorExitHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaFuturisticVibratorLoadHook(...args: any[]): any {
	return null;
}
export function InventoryItemVulvaLoversVibratorDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarAutoShockUnitDraw(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarAutoShockUnitClick(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarAutoShockUnitDrawHook(...args: any[]): any {
	return null;
}
export function InventoryItemNeckAccessoriesCollarAutoShockUnitClickHook(...args: any[]): any {
	return null;
}
export function AssetsItemNeckAccessoriesCollarAutoShockUnitBeforeDrawHook(...args: any[]): any {
	return null;
}
export function AssetsItemNeckAccessoriesCollarAutoShockUnitScriptDrawHook(...args: any[]): any {
	return null;
}

export function InventoryItemMiscIntricatePadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscHighSecurityPadlockInitHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscHighSecurityPadlockLoadHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscHighSecurityPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscHighSecurityPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscHighSecurityPadlockExitHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscSafewordPadlockLoadHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscSafewordPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscSafewordPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscPasswordPadlockExitHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscTimerPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscTimerPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscMistressPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscOwnerTimerPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscOwnerTimerPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscLoversTimerPadlockValidator(...args: any[]): any {
	return null;
};
export function InventoryItemMiscPasswordPadlockLoadHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscPasswordPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscPasswordPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscOwnerPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscMistressTimerPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscMistressTimerPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscFamilyPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscExclusivePadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscCombinationPadlockLoadHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscCombinationPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscCombinationPadlockClickHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscCombinationPadlockExitHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscTimerPasswordPadlockLoadHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscTimerPasswordPadlockDrawHook(...args: any[]): any {
	return null;
};
export function InventoryItemMiscTimerPasswordPadlockClickHook(...args: any[]): any {
	return null;
};

export const InventoryItemPelvisLoveChastityBeltDraw = undefined;
export const InventoryItemPelvisLoveChastityBeltValidate = undefined;
export const AssetsItemPelvisFuturisticTrainingBeltScriptDraw = undefined;
export const InventoryItemPelvisObedienceBelts1DrawHook = undefined;
export const InventoryItemPelvisObedienceBelts1ClickHook = undefined;
export const PortalLinkRecieverLoadHook = undefined;
export const PortalLinkRecieverDrawHook = undefined;
export const PortalLinkRecieverClickHook = undefined;
export const PortalLinkRecieverExitHook = undefined;
export const InventoryItemPelvisModularChastityBeltClickHook = undefined;
export const InventoryItemPelvisModularChastityBeltDrawHook = undefined;
export const InventoryItemPelvisModularChastityBeltExitHook = undefined;
export const InventoryItemPelvisModularChastityBeltScriptDrawHook = undefined;
export const InventoryItemPelvisModularChastityBeltVoiceTriggers = [];
export const InventorySuitLatexCatsuitLoadHook = undefined;
export const InventorySuitLatexCatsuitDrawHook = undefined;
export const InventorySuitLatexCatsuitExitHook = undefined;
export const InventorySuitLatexCatsuitPublishActionHook = undefined;
export const PortalLinkTransmitterLoadHook = undefined;
export const PortalLinkTransmitterDrawHook = undefined;
export const PortalLinkTransmitterClickHook = undefined;
export const PortalLinkTransmitterExitHook = undefined;

export const FuturisticAccessLoad = undefined;
export const FuturisticAccessClick = undefined;
export const FuturisticAccessDraw = undefined;
export const FuturisticAccessExit = undefined;
export const FuturisticAccessValidate = undefined;

export function PropertyOpacityInit(...args: any[]): any {
	return null;
};
export function PropertyOpacityLoad(...args: any[]): any {
	return null;
};
export function PropertyOpacityDraw(...args: any[]): any {
	return null;
};
export function PropertyOpacityExit(...args: any[]): any {
	return null;
};
export function PropertyOpacityValidate(...args: any[]): any {
	return null;
};


// from ExtendedItem.js (we don't care about the values, but the array needs to be the right size)
/**
 * The X & Y co-ordinates of each option's button, based on the number to be displayed per page.
 */
export const ExtendedXY: [number, number][][] = [
	[], //0 placeholder
	[[1385, 500]], //1 option per page
	[[1185, 500], [1590, 500]], //2 options per page
	[[1080, 500], [1385, 500], [1695, 500]], //3 options per page
	[[1185, 400], [1590, 400], [1185, 700], [1590, 700]], //4 options per page
	[[1080, 400], [1385, 400], [1695, 400], [1185, 700], [1590, 700]], //5 options per page
	[[1080, 400], [1385, 400], [1695, 400], [1080, 700], [1385, 700], [1695, 700]], //6 options per page
	[[1020, 400], [1265, 400], [1510, 400], [1755, 400], [1080, 700], [1385, 700], [1695, 700]], //7 options per page
	[[1020, 400], [1265, 400], [1510, 400], [1755, 400], [1020, 700], [1265, 700], [1510, 700], [1755, 700]], //8 options per page
];

/**
 * The X & Y co-ordinates of each option's button, based on the number to be displayed per page.
 */
export const ExtendedXYWithoutImages: [number, number][][] = [
    [], //0 placeholder
    [[1385, 450]], //1 option per page
    [[1260, 450], [1510, 450]], //2 options per page
    [[1135, 450], [1385, 450], [1635, 450]], //3 options per page
    [[1260, 450], [1510, 450], [1260, 525], [1510, 525]], //4 options per page
    [[1135, 450], [1385, 450], [1635, 450], [1260, 525], [1510, 525]], //5 options per page
    [[1135, 450], [1385, 450], [1635, 450], [1135, 525], [1385, 525], [1635, 525]], //6 options per page
    [[1010, 450], [1260, 450], [1510, 450], [1760, 450], [1135, 525], [1385, 525], [1635, 525]], //7 options per page
    [[1010, 450], [1260, 450], [1510, 450], [1760, 450], [1010, 525], [1260, 525], [1510, 525], [1760, 525]], //8 options per page
    [[1135, 450], [1385, 450], [1635, 450], [1135, 525], [1385, 525], [1635, 525], [1135, 600], [1385, 600], [1635, 600]], //9 options per page
];

// from TypedItem.js
/**
 * An enum encapsulating the possible chatroom message settings for typed items
 * - TO_ONLY - The item has one chatroom message per type (indicating that the type has been selected)
 * - FROM_TO - The item has a chatroom message for from/to type pairing
 * - SILENT - The item doesn't publish an action when a type is selected.
 */
export const TypedItemChatSetting: Record<"TO_ONLY"|"FROM_TO"|"SILENT", TypedItemChatSetting> = {
	TO_ONLY: "default",
	FROM_TO: "fromTo",
	SILENT: "silent",
};

export function InventoryItemNeckAccessoriesCollarNameTagGetDrawData(x: number): ExtendedItemConfigDrawData<ElementMetaData.Typed> {
	// @ts-expect-error we're mocking this
	return null;
};

export const DialogFocusItem: Item | null = null;

// from VibratorMode.js (stubbed)
/**
 * An enum for the vibrator configuration sets that a vibrator can have
 */
export const VibratorModeSet: {STANDARD: "Standard", ADVANCED: "Advanced"} = {
	STANDARD: "Standard",
	ADVANCED: "Advanced",
};


/**
 * Parse the passed typed item draw data as passed via the extended item config
 * @param {readonly VibratorModeSet[]} modeSet - The vibrator mode sets for the item
 * @param {ExtendedItemConfigDrawData<{ drawImage?: false }> | undefined} drawData - The to-be parsed draw data
 * @param {number} y - The y-coordinate at which to start drawing the controls
 * @return {ExtendedItemDrawData<ElementMetaData.Vibrating>} - The parsed draw data
 */
export function VibratorModeGetDrawData(modeSet: readonly VibratorModeSet[], drawData: ExtendedItemConfigDrawData<{ drawImage?: false }> | undefined, y=450): ExtendedItemConfigDrawData<Partial<ElementMetaData.Vibrating>> {
	// @ts-expect-error mocking
	return null;
}

export function CommonConvertArrayToString(x: any[]) { return ""; }
export const ItemVulvaFuturisticVibratorTriggers = [];
export const InventoryItemPelvisSciFiPleasurePantiesChatPrefix = undefined;
export const AssetsBodyMarkingsBodyWritingsAfterDrawHook = undefined;
export const InventoryItemBreastForbiddenChastityBraDrawHook = undefined;
export const InventoryItemBreastForbiddenChastityBraClickHook = undefined;
export const AssetsItemNeckAccessoriesCollarShockUnitBeforeDrawHook = undefined;
export const AssetsItemNeckAccessoriesCollarShockUnitScriptDrawHook = undefined;
export const AssetsItemBreastForbiddenChastityBraScriptDrawHook = undefined;
export const InventoryItemNeckPetSuitShockCollars1DrawHook = undefined;
export const InventoryItemNeckPetSuitShockCollars1ClickHook = undefined;
export const InventoryItemNeckFuturisticCollarLoadHook = undefined;
export const InventoryItemNeckFuturisticCollarDrawHook = undefined;
export const InventoryItemNeckFuturisticCollarClickHook = undefined;
export const InventoryItemNeckFuturisticCollarExitHook = undefined;
export const InventoryItemNeckSlaveCollarLoadHook = undefined;
export const InventoryItemNeckSlaveCollarDrawHook = undefined;
export const InventoryItemNeckSlaveCollarClickHook = undefined;
export const InventoryItemDevicesLuckyWheelg0LoadHook = undefined;
export const InventoryItemDevicesLuckyWheelg0DrawHook = undefined;
export const InventoryItemDevicesLuckyWheelg0ClickHook = undefined;
export const InventoryItemDevicesLuckyWheelg0ExitHook = undefined;
export const InventoryItemDevicesWheelFortuneLoadHook = undefined;
export const CommonNoop = undefined;
export const CommonTime = () => 0;

export const PoseAllKneeling: readonly AssetPoseName[] = Object.freeze(["Kneel", "KneelingSpread"]);
export const PoseAllStanding: readonly AssetPoseName[] = Object.freeze(["BaseLower", "LegsOpen", "LegsClosed", "Spread"]);

export const InterfaceTextGet = (x: string) => undefined;



// from TextItem.js (stubbed)
export const TextItem = {
	Init: (..._: any[]) => false,
	Load: (..._: any[]) => {},
	Draw: (..._: any[]) => {},
	Exit: (..._: any[]) => {},
	PublishAction: (..._: any[]) => {},
	GenericTextDrawHook: (..._: any[]) => {},
	GenericTextArcDrawHook: (..._: any[]) => {},
};

// from Time.js I believe. exists in Timer.js as well(stubbed)
export const CurrentTime = 0;

// from ChatRoomMapView.js (stubbed)
export const ChatRoomMapViewGetObjectAtPos = (x: number, y: number): ChatRoomMapObject | null => null;

export function ChatRoomMapViewGetConnectivityDirections(X: number, Y: number, Condition: (X: number, Y: number) => boolean) {
	return {
		North: Condition(X, Y - 1),
		South: Condition(X, Y + 1),
		East: Condition(X + 1, Y),
		West: Condition(X - 1, Y)
	};
}

//#region addendum, manual updates
export function InventoryItemHandheldPlushiesSetOptionHook(...args: any[]): any {
	return null;
};

// OwnerTimerPadlock.js
export const InventoryItemMiscOwnerTimerPadlockExitHook = (..._: any[]) => {};

// MistressTimerPadlock.js
export const InventoryItemMiscMistressTimerPadlockExitHook = (..._: any[]) => {};

// TimerPasswordPadlock.js
export const InventoryItemMiscTimerPasswordPadlockExitHook = (..._: any[]) => {};

// LoveChastityBelt.js
export const InventoryItemPelvisLoveChastityBeltDrawHook = (..._: any[]) => {};
export const InventoryItemPelvisLoveChastityBeltValidateHook = (..._: any[]): any => {};

// FuturisticTrainingBelt.js
export const AssetsItemPelvisFuturisticTrainingBeltScriptDrawHook = (..._: any[]) => {};

// DynamicDraw.js
export const DynamicDrawTextEffect = {
	BURN: "burn",
};
//#endregion