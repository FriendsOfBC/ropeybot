//@ts-check
"use strict";

/**
 * Female3DCGExtended.js
 * ---------------------
 * This file contains definitions and configuration for extended items. Items which are marked as Extended in
 * `Female3DCG.js` and which have an extended item definition here will have their load/draw/click functions
 * _automatically_ created when assets are loaded, saving the need for an individual extended item script.
 *
 * Currently, modular and typed items are supported, and this is likely to expand in the future.
 */

import {
	AssetsClothAccessoryBibAfterDrawHook,
	AssetsClothCheerleaderTopAfterDrawHook,
	ModularItemChatSetting,
	CommonChatTags,
	FuturisticAccessLoad,
	FuturisticAccessClick,
	FuturisticAccessDraw,
	FuturisticAccessExit,
	FuturisticAccessValidate,
	InventoryItemBreastFuturisticBraDrawHook,
	ExtendedXY,
	InventoryItemArmsFullLatexSuitDrawHook,
	InventoryItemArmsFullLatexSuitClickHook,
	InventoryItemArmsPrisonLockdownSuitClickHook,
	InventoryItemArmsPrisonLockdownSuitDrawHook,
	TypedItemChatSetting,
	InventoryItemArmsTransportJacketLoadHook,
	InventoryItemArmsTransportJacketDrawHook,
	InventoryItemArmsTransportJacketExitHook,
	InventoryItemArmsTransportJacketPublishActionHook,
	AssetsItemNeckAccessoriesCustomCollarTagAfterDrawHook,
	InventoryItemNeckAccessoriesCollarNameTagGetDrawData,
	InventoryItemNeckAccessoriesCollarNameTagPublishActionHook,
	InventoryItemNeckAccessoriesCollarShockUnitDrawHook,
	InventoryItemNeckAccessoriesCollarShockUnitClickHook,
	AssetsItemNeckAccessoriesElectronicTagAfterDrawHook,
	AssetsItemNeckRestraintsPetPostAfterDrawHook,
	AssetsItemHeadDroneMaskAfterDrawHook,
	AssetsItemHoodCanvasHoodAfterDrawHook,
	AssetsItemDevicesFuturisticCrateScriptDrawHook,
	AssetsItemDevicesFuckMachineScriptDrawHook,
	AssetsItemDevicesFuckMachineBeforeDrawHook,
	PropertyOpacityInit,
	PropertyOpacityLoad,
	PropertyOpacityDraw,
	PropertyOpacityExit,
	InventoryItemDevicesVacBedDeluxeDrawHook,
	InventoryItemDevicesLuckyWheelDrawHook,
	InventoryItemDevicesLuckyWheelInitHook,
	InventoryItemDevicesLuckyWheelClickHook,
	InventoryItemDevicesWoodenBoxLoadHook,
	InventoryItemDevicesWoodenBoxDrawHook,
	InventoryItemDevicesWoodenBoxExitHook,
	InventoryItemDevicesWoodenBoxPublishActionHook,
	AssetsItemDevicesWoodenBoxAfterDrawHook,
	AssetsItemDevicesDollBoxAfterDrawHook,
	AssetsItemDevicesPetBowlAfterDrawHook,
	InventoryItemDevicesKabeshiriWallLoadHook,
	InventoryItemDevicesKabeshiriWallDrawHook,
	InventoryItemDevicesKabeshiriWallPublishActionHook,
	InventoryItemDevicesKabeshiriWallExitHook,
	AssetsItemDevicesKabeshiriWallAfterDrawHook,
	InventoryItemButtInflVibeButtPlugDrawHook,
	InventoryItemVulvaClitAndDildoVibratorbeltDrawHook,
	InventoryItemVulvaClitAndDildoVibratorbeltSetOptionHook,
	DialogFocusItem,
	// UNUSED: InventoryItemVulvaLoversVibratorDrawHook,
	InventoryItemVulvaFuturisticVibratorLoadHook,
	InventoryItemVulvaFuturisticVibratorDrawHook,
	InventoryItemVulvaFuturisticVibratorClickHook,
	InventoryItemVulvaFuturisticVibratorExitHook,
	AssetsItemVulvaFuturisticVibratorScriptDrawHook,
	CommonConvertArrayToString,
	ItemVulvaFuturisticVibratorTriggers,
	VibratorModeGetDrawData,
	VibratorModeSet,
	InventoryItemButtAnalBeads2PublishActionHook,
	InventoryItemTorsoFuturisticHarnessClickHook,
	InventoryItemTorsoFuturisticHarnessDrawHook,
	InventoryItemMouthFuturisticPanelGagClickHook,
	InventoryItemMouthFuturisticPanelGagDrawHook,
	AssetsItemMouthFuturisticPanelGagScriptDrawHook,
	AssetsItemMouthFuturisticPanelGagBeforeDrawHook,
	AssetsItemMiscWoodenSignAfterDrawHook,
	AssetsItemPelvisObedienceBeltAfterDrawHook,
	InventoryItemPelvisSciFiPleasurePantiesClickHook,
	InventoryItemPelvisSciFiPleasurePantiesDrawHook,
	InventoryItemPelvisSciFiPleasurePantiesChatPrefix,
	InventoryItemPelvisLoveChastityBeltSetOptionHook,
	// UNUSED: InventoryItemPelvisLoveChastityBeltDraw,
	// UNUSED: InventoryItemPelvisLoveChastityBeltValidate,
	InventoryItemPelvisFuturisticTrainingBeltLoadHook,
	InventoryItemPelvisFuturisticTrainingBeltClickHook,
	InventoryItemPelvisFuturisticTrainingBeltDrawHook,
	InventoryItemPelvisFuturisticTrainingBeltExitHook,
	// UNUSED: AssetsItemPelvisFuturisticTrainingBeltScriptDraw,
	ExtendedXYWithoutImages,
	AssetsBodyMarkingsBodyWritingsAfterDrawHook,
	InventoryItemBreastForbiddenChastityBraDrawHook,
	InventoryItemBreastForbiddenChastityBraClickHook,
	AssetsItemNeckAccessoriesCollarShockUnitBeforeDrawHook,
	AssetsItemBreastForbiddenChastityBraScriptDrawHook,
	PoseAllKneeling,
	InventoryItemNeckPetSuitShockCollars1DrawHook,
	InventoryItemNeckPetSuitShockCollars1ClickHook,
	InventoryItemNeckFuturisticCollarLoadHook,
	InventoryItemNeckFuturisticCollarDrawHook,
	InventoryItemNeckFuturisticCollarClickHook,
	InventoryItemNeckFuturisticCollarExitHook,
	InventoryItemNeckSlaveCollarLoadHook,
	InventoryItemNeckSlaveCollarDrawHook,
	InventoryItemNeckSlaveCollarClickHook,
	AssetsItemNeckAccessoriesCollarShockUnitScriptDrawHook,
	InventoryItemNeckAccessoriesCollarAutoShockUnitClickHook,
	AssetsItemNeckAccessoriesCollarAutoShockUnitBeforeDrawHook,
	AssetsItemNeckAccessoriesCollarAutoShockUnitScriptDrawHook,
	PoseAllStanding,
	InventoryItemDevicesLuckyWheelg0LoadHook,
	InventoryItemDevicesLuckyWheelg0DrawHook,
	InventoryItemDevicesLuckyWheelg0ClickHook,
	InventoryItemDevicesLuckyWheelg0ExitHook,
	InventoryItemDevicesWheelFortuneLoadHook,
	CommonNoop,
	InventoryItemMouthFuturisticPanelGagSetOptionHook,
	InventoryItemMiscHighSecurityPadlockInitHook,
	InventoryItemMiscHighSecurityPadlockLoadHook,
	InventoryItemMiscHighSecurityPadlockDrawHook,
	InventoryItemMiscHighSecurityPadlockClickHook,
	InventoryItemMiscHighSecurityPadlockExitHook,
	InventoryItemMiscIntricatePadlockDrawHook,
	InventoryItemMiscSafewordPadlockLoadHook,
	InventoryItemMiscSafewordPadlockDrawHook,
	InventoryItemMiscSafewordPadlockClickHook,
	InventoryItemMiscPasswordPadlockExitHook,
	InventoryItemMiscTimerPadlockDrawHook,
	InventoryItemMiscTimerPadlockClickHook,
	InventoryItemMiscMistressPadlockDrawHook,
	InventoryItemMiscOwnerTimerPadlockDrawHook,
	InventoryItemMiscOwnerTimerPadlockClickHook,
	InventoryItemMiscLoversTimerPadlockValidator,
	InventoryItemMiscPasswordPadlockLoadHook,
	InventoryItemMiscPasswordPadlockDrawHook,
	InventoryItemMiscPasswordPadlockClickHook,
	InterfaceTextGet,
	InventoryItemMiscOwnerPadlockDrawHook,
	InventoryItemMiscFamilyPadlockDrawHook,
	InventoryItemMiscMistressTimerPadlockDrawHook,
	InventoryItemMiscMistressTimerPadlockClickHook,
	InventoryItemMiscExclusivePadlockDrawHook,
	InventoryItemMiscCombinationPadlockLoadHook,
	InventoryItemMiscCombinationPadlockDrawHook,
	InventoryItemMiscCombinationPadlockClickHook,
	InventoryItemMiscCombinationPadlockExitHook,
	InventoryItemMiscTimerPasswordPadlockLoadHook,
	InventoryItemMiscTimerPasswordPadlockDrawHook,
	InventoryItemMiscTimerPasswordPadlockClickHook,
	InventoryItemPelvisObedienceBelts1DrawHook,
	InventoryItemPelvisObedienceBelts1ClickHook,
	PortalLinkRecieverLoadHook,
	PortalLinkRecieverDrawHook,
	PortalLinkRecieverClickHook,
	PortalLinkRecieverExitHook,
	CommonTime,
	InventoryItemPelvisModularChastityBeltClickHook,
	InventoryItemPelvisModularChastityBeltDrawHook,
	InventoryItemPelvisModularChastityBeltExitHook,
	InventoryItemPelvisModularChastityBeltScriptDrawHook,
	InventoryItemPelvisModularChastityBeltVoiceTriggers,
	InventorySuitLatexCatsuitLoadHook,
	InventorySuitLatexCatsuitDrawHook,
	InventorySuitLatexCatsuitExitHook,
	InventorySuitLatexCatsuitPublishActionHook,
	PortalLinkTransmitterLoadHook,
	PortalLinkTransmitterDrawHook,
	PortalLinkTransmitterClickHook,
	PortalLinkTransmitterExitHook,
	InventoryItemNeckAccessoriesCollarAutoShockUnitDrawHook,
	AssetsFaceMarkingsFaceWritingsAfterDrawHook,
	ItemHeadDroneMaskValidateHook,
	TextItem,

	//#region addendum manual updates
	InventoryItemHandheldPlushiesSetOptionHook,
	InventoryItemMiscOwnerTimerPadlockExitHook,
	InventoryItemMiscMistressTimerPadlockExitHook,
	InventoryItemMiscTimerPasswordPadlockExitHook,
	InventoryItemPelvisLoveChastityBeltDrawHook,
	InventoryItemPelvisLoveChastityBeltValidateHook,
	AssetsItemPelvisFuturisticTrainingBeltScriptDrawHook,
	DynamicDrawTextEffect,
	//#endregion
} from "./defs.ts";

import { E } from "./female3DCG.js";



/**
 * An enum encapsulating the available extended item archetypes
 */
// const ExtendedArchetype: Record<Uppercase<ExtendedArchetype>, ExtendedArchetype> = ({
enum ExtendedArchetype {
	MODULAR = "modular",
	TYPED = "typed",
	VIBRATING = "vibrating",
	VARIABLEHEIGHT = "variableheight",
	TEXT = "text",
	NOARCH = "noarch",
}

/**
 * An object containing all extended item configurations.
 * @type {ExtendedItemMainConfig}
 */
export var AssetFemale3DCGExtended: ExtendedItemMainConfig = {
	BodyUpper: {
		// NOTE: Switch to the `MODULAR` archetype if we'd want to allow for the simultaneous use of multiple overlays
		Small: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Default",
				},
			],
		}, // Small
		Normal: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "BodyUpper", AssetName: "Small" },
		}, // Normal
		Large: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "BodyUpper", AssetName: "Small" },
		}, // Large
		XLarge: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "BodyUpper", AssetName: "Small" },
		}, // XLarge
		FlatSmall: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "BodyUpper", AssetName: "Small" },
		}, // FlatSmall
		FlatMedium: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "BodyUpper", AssetName: "Small" },
		}, // FlatMedium
	},
	Hat: {
		Bandana: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Plain",
				},
				{
					Name: "Circles",
				},
				{
					Name: "Flowers",
				},
				{
					Name: "PolkaDots",
				},
				{
					Name: "Triangles",
				},
			],
		}, //Bandana
		BallCapBack: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "StrapUnder",
				},
				{
					Name: "StrapOver",
				},
			],
		}, //BallCapBack
		BallCapFront: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Blank",
				},
				{
					Name: "BCLogo",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "BDSM",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "BG",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Chain",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Gag",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Knot",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Monogram",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Rock",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Smile",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Sun",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Tick",
					Property: {
						DefaultColor: "Default",
					},
				},
			],
		}, //BallCapFront
		SwimCap: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Pattern",
					Key: "p",
					Options: [{}, {}, {}, {}, {}, {}], //None, Stripes 1, Stripes 2, Triangle, Cowprint, Tigerprint
				},
				{
					Name: "Hair",
					Key: "h",
					Options: [
						{
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
							},
						}, // No Hair Openings
						{
							Property: {
								Hide: ["HairFront", "HairAccessory1", "HairAccessory2"],
							},
						}, // Hair Openings
						{
							Property: { Hide: ["HairFront", "HairBack"] },
						}, // Ear Openings
						{
							Property: { Hide: ["HairFront"] },
						},
					],
				},
			],
		}, // SwimCap
		LatexHabit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
				},
				{
					Name: "Tight",
				},
			],
		}, //LatexHabit
		NunHabit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Blank",
				},
				{
					Name: "Ass",
				},
				{
					Name: "Breasts",
				},
				{
					Name: "Chastity",
				},
				{
					Name: "Cock",
				},
				{
					Name: "Pussy",
				},
				{
					Name: "Thighs",
				},
			],
		}, // NunHabit
		JesterHat: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "LeftPart",
					Key: "l",
					Options: [
						{}, // 0 - No style
						{}, // 1 - Stripes
						{}, // 2 - Dots
						{}, // 3 - Stripes & Dots
					],
				},
				{
					Name: "TopPart",
					Key: "t",
					Options: [
						{}, // 0 - No style
						{}, // 1 - Stripes
						{}, // 2 - Dots
						{}, // 3 - Stripes & Dots
					],
				},
				{
					Name: "RightPart",
					Key: "r",
					Options: [
						{}, // 0 - No style
						{}, // 1 - Stripes
						{}, // 2 - Dots
						{}, // 3 - Stripes & Dots
					],
				},
			],
		}, // JesterHat
		PirateHat: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "Bandana",
					Key: "b",
					Options: [
						{}, // Bandana
						{}, // No bandana :(
					],
				},
				{
					Name: "Symbol",
					Key: "s",
					Options: [
						{}, // Classic
						{}, // Kinky
						{}, // None
					],
				},
				{
					Name: "Feathers",
					Key: "f",
					DrawImages: false,
					Options: [
						{}, // Both
						{}, // Front
						{}, // Back
						{}, // None
					],
				},
			],
		}, // PirateHat
	},
	HandAccessoryLeft: {
		Rings: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Thumb",
					Key: "t",
					Options: [{}, {}],
				},
				{
					Name: "Index",
					Key: "i",
					Options: [{}, {}],
				},
				{
					Name: "Middle",
					Key: "m",
					Options: [{}, {}],
				},
				{
					Name: "Ring",
					Key: "r",
					Options: [{}, {}, {}],
				},
				{
					Name: "Pinkie",
					Key: "p",
					Options: [{}, {}, {}],
				},
				{
					Name: "Fingernails",
					Key: "f",
					Options: [{}, {}, {}],
				},
			],
		},
	},
	HandAccessoryRight: {
		Rings: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Thumb",
					Key: "t",
					Options: [{}, {}],
				},
				{
					Name: "Index",
					Key: "i",
					Options: [{}, {}],
				},
				{
					Name: "Middle",
					Key: "m",
					Options: [{}, {}],
				},
				{
					Name: "Ring",
					Key: "r",
					Options: [{}, {}, {}],
				},
				{
					Name: "Pinkie",
					Key: "p",
					Options: [{}, {}, {}],
				},
				{
					Name: "Fingernails",
					Key: "f",
					Options: [{}, {}, {}],
				},
			],
		},
	},
	TailStraps: {
		RaccoonTailStrap: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		FoxTailStrap: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		WolfTailStrap3: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Style",
					Key: "s", //Style
					DrawImages: false,
					Options: [
						{}, //s0 - Style 1 - Original Style
						{}, //s1 - Style 2 - Flipped Style
					],
				},
				{
					Name: "Rotation",
					Key: "r", //Rotation
					DrawImages: false,
					Options: [
						{}, //r0 - TL - Top Left
						{}, //r1 - TR - Top Right
						{}, //r2 - BL - Bottom Left
						{}, //r3 - BR - Bottom Right
					],
				},
			],
		},
		KittenTailStrap1: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		KittenTailStrap2: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		KitsuneTailStraps: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Tail1",
					Key: "show1_",
					DrawImages: false,
					Options: [
						{}, //show1_0 - Show
						{}, //show1_1 - Hide
					],
				},
				{
					Name: "Tail2",
					Key: "show2_",
					DrawImages: false,
					Options: [
						{}, //show2_0 - Show
						{}, //show2_1 - Hide
					],
				},
				{
					Name: "Tail3",
					Key: "show3_",
					DrawImages: false,
					Options: [
						{}, //show3_0 - Show
						{}, //show3_1 - Hide
					],
				},
				{
					Name: "Tail4",
					Key: "show4_",
					DrawImages: false,
					Options: [
						{}, //show4_0 - Show
						{}, //show4_1 - Hide
					],
				},
				{
					Name: "Tail5",
					Key: "show5_",
					DrawImages: false,
					Options: [
						{}, //show5_0 - Show
						{}, //show5_1 - Hide
					],
				},
				{
					Name: "Tail6",
					Key: "show6_",
					DrawImages: false,
					Options: [
						{}, //show6_0 - Show
						{}, //show6_1 - Hide
					],
				},
				{
					Name: "Tail7",
					Key: "show7_",
					DrawImages: false,
					Options: [
						{}, //show7_0 - Show
						{}, //show7_1 - Hide
					],
				},
				{
					Name: "Tail8",
					Key: "show8_",
					DrawImages: false,
					Options: [
						{}, //show8_0 - Show
						{}, //show8_1 - Hide
					],
				},
				{
					Name: "Tail9",
					Key: "show9_",
					DrawImages: false,
					Options: [
						{}, //show9_0 - Show Left
						{}, //show9_1 - Hide
						{}, //show9_2 - Show Right
					],
				},
			],
			DrawData: {
				elementData: [
					{ position: ExtendedXYWithoutImages[9][0] },
					{ position: ExtendedXYWithoutImages[9][1] },
					{ position: ExtendedXYWithoutImages[9][2] },
					{ position: ExtendedXYWithoutImages[9][3] },
					{ position: ExtendedXYWithoutImages[9][4] },
					{ position: ExtendedXYWithoutImages[9][5] },
					{ position: ExtendedXYWithoutImages[9][6] },
					{ position: ExtendedXYWithoutImages[9][7] },
					{ position: ExtendedXYWithoutImages[9][8] },
				],
				itemsPerPage: 9,
			},
		},
	},
	ClothOuter: {
		JacketHoodie: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Hood",
					Key: "h",
					DrawImages: false,
					Options: [
						{}, //h0 - Hood Up
						{}, //h1 - Hood Down
					],
				},
				{
					Name: "Sleeve",
					Key: "s",
					DrawImages: false,
					Options: [
						{}, //s0 - Sleeveless
						{}, //s1 - Sleeves
					],
				},
			],
		},
		Hoodie: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "Cloth", AssetName: "Hoodie" },
			DialogPrefix: {
				Header: "ClothHoodieSelect",
				Module: "ClothHoodieModule",
				Option: "ClothHoodieOption",
			},
		}, // Hoodie
	},
	Cloth: {
		TShirt2: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Plain",
				},
				{
					Name: "BCLogo",
					Property: {
						DefaultColor: "#FFF0CC",
					},
				},
				{
					Name: "BDSM",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Gag",
					Property: {
						DefaultColor: "Default",
					},
				},
				{
					Name: "Knot",
					Property: {
						DefaultColor: "#CCC088",
					},
				},
				{
					Name: "Rock",
					Property: {
						DefaultColor: "#B03030",
					},
				},
				{
					Name: "Smile",
					Property: {
						DefaultColor: "#BB9911",
					},
				},
				{
					Name: "Tick",
					Property: {
						DefaultColor: "#119977",
					},
				},
			],
		}, // TShirt2
		CustomTShirt: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Shirt",
					Key: "h",
					Options: [
						{
							// h0 - Normal
							Property: {
								OverridePriority: 28,
							},
						},
						{
							// h1 - UnderSkirt
							Property: {
								OverridePriority: 26,
							},
						},
						{
							// h2 - LowerLayer
							Property: {
								OverridePriority: 21,
							},
						},
					],
					DrawImages: false,
				},
				{
					Name: "Stamp",
					Key: "t",
					Options: [
						{}, // t0 - None
						{}, // t1 - BondageCollege
						{}, // t2 - BTG
						{}, // t3 - Dominant
						{}, // t4 - Bonk
						{}, // t5 - OldXGame
						{}, // t6 - Staff
						{}, // t7 - Elite
						{}, // t8 - Raiders
						{}, // t9 - WhiteMoon
						{}, // t10 - ZamStick
						{}, // t11 - Eclipse
						{}, // t12 - RadFrog
						{}, // t13 - ZamStickII
						{}, // t14 - Hornywood
						{}, // t15 - BondageClubRules
						{}, // t16 - BornToBeTied
						{}, // t17 - Hogtied
						{}, // t18 - BCollege2
						{}, // t19 - ControlPad1
						{}, // t20 - AzureCorp
						{}, // t21 - Shibari
						{}, // t22 - BullsEye
						{}, // t23 - Keys?
						{}, // t24 - BTeacher
						{}, // t25 - BunnyCropout
					],
				},
			],
		}, // CustomTShirt
		ChineseDress2: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Red",
				},
				{
					Name: "Purple",
				},
				{
					Name: "Pink",
				},
			],
		}, // ChineseDress2
		LatexLacedSuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Laced",
				},
				{
					Name: "NonLaced",
				},
			],
		}, // LatexLacedSuit
		RetroGirdle: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "NonGarters",
				},
				{
					Name: "Garters",
				},
			],
		}, // RetroGirdle
		ReverseBunnySuit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Suit", AssetName: "Catsuit" },
		}, // ReverseBunnySuit
		Jacket: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Hooded",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"Hat",
						],
					},
				},
				{
					Name: "HoodedEarsOut",
					Property: {
						HideItem: [
							"HairAccessory2UnicornHorn",
							"HairAccessory2DildocornHorn",
						],
						Hide: [
							"HairFront",
							"HairBack",
							"HairAccessory1",
							"HairAccessory3",
							"Hat",
						],
					},
				},
			],
		}, // Jacket
		SlaveRags: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Cloth",
					Key: "c",
					Options: [
						{}, //c0 - Base
						{}, //c1 - BaseStained
						{}, //c2 - Torn1
						{}, //c3 - Torn1Stained
					],
				},
				{
					Name: "Belt",
					Key: "b",
					Options: [
						{}, //b0
						{}, //b1
						{}, //b2
					],
				},
			],
		}, //SlaveRags
		Hoodie: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Hood",
					Key: "h",
					Options: [
						{}, //h0 - Down
						{}, //h1 - Up Regular
						{}, //h2 - Up Ears
					],
				},
				{
					Name: "Length",
					Key: "l",
					DrawImages: false,
					Options: [
						{}, //l0 - Full Length
						{}, //l1 - Cropped
						{}, //l2 - Bolero
					],
				},
				//{
				// Name: "Pouch", Key: "p", // Pouch option not yet implemented
				// Options: [
				// {}, //p0 - Hands Out
				// {}, //p1 - Hands In
				// ],
				//},
			],
		}, //Hoodie
		LatexTankTop: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "BackHood",
					Key: "lh",
					Options: [
						{
							// lh0 - None
							Property: { Effect: [] },
						},
						{
							// lh1 - Down
							Property: { Effect: [] },
						},
						{
							// lh2 - Pulled Up
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
									"Hat",
								],
							},
						},
					],
				},
				{
					Name: "ReverseHood",
					Key: "rh",
					Options: [
						{
							// rh0 - None
							Property: { Effect: [] },
						},
						{
							// rh1 - Loose
							Property: { Effect: [] },
						},
						{
							// rh2 - Pulled Up
							Property: {
								Effect: [E.Slow],
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
									"Hat",
									"Head",
								],
							},
						},
					],
				},
			],
		}, //LatexTankTop
		CheerleaderTop: {
			Archetype: ExtendedArchetype.TEXT,
			MaxLength: { Text: 8 },
			Font: "'Archivo Black', 'Impact', 'Arial Black', 'Franklin Gothic', 'Arial', sans-serif",
			ScriptHooks: {
				AfterDraw: AssetsClothCheerleaderTopAfterDrawHook,
			},
			DialogPrefix: {
				Header: "ClothCheerleaderTopTextLabel",
			},
		}, // CheerleaderTop
		FishnetTop: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "Sleeves",
					Key: "s",
					Options: [
						{}, // Sleeves
						{}, // No sleeves
					],
				},
				{
					Name: "Top",
					Key: "t",
					Options: [
						{}, // Full
						{}, // Crop
					],
				},
			],
		}, // FishnetTop
		MeshTop: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "Sleeves",
					Key: "s",
					Options: [
						{}, // Sleeves
						{}, // No sleeves
					],
				},
				{
					Name: "Top",
					Key: "t",
					Options: [
						{}, // Full
						{}, // Crop
						{}, // Crop2
						{}, // Bolero
						{}, // Leotard
						{}, // Ripped
						{}, // None
					],
				},
			],
		}, // MeshTop
		CorsetDress: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Normal" }, { Name: "NoSkirt" }],
		}, // CorsetDress
		LatexHobbleDress: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Top",
					Key: "t",
					Options: [
						{
							// t0 - Solid
							Property: { Effect: [] },
						},
						{
							// t1 - Oval Cleavage
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "CollarOpt",
					Key: "c",
					Options: [
						{
							// c0 - None
							Property: { Effect: [] },
						},
						{
							// c1 - Collar
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "SkirtOpt",
					Key: "k",
					Options: [
						{
							// k0 - Knee Area
							Property: { Effect: [] },
						},
						{
							// k1 - Ankle Area
							Property: { Effect: [E.Slow] },
						},
					],
				},
				{
					Name: "EndSkirt",
					Key: "r",
					Options: [
						{
							// r0 - Normal
							Property: { Effect: [] },
						},
						{
							// r1 - Mermaid Type
							Property: { Effect: [E.MapSwim] },
						},
					],
				},
				{
					Name: "Belt",
					Key: "b",
					Options: [
						{
							// b0 - None
							Property: { Effect: [] },
						},
						{
							// b1 - Knee Strap Limiter
							Property: { Effect: [E.Slow] },
						},
						{
							// b2 - Ankle Strap Limiter
							Property: { Effect: [E.Slow] },
						},
						{
							// b3 - Both Straps Limiter
							Property: { Effect: [E.Slow] },
						},
					],
				},
			],
		}, // LatexHobbleDress
		OffTheShoulderTop: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Left",
				},
				{
					Name: "Right",
				},
			],
		}, // OffTheShoulderTop
		BrocadeCloudsSnowEmbroideryQipao: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Yes" }, { Name: "No" }],
		}, // BrocadeCloudsSnowEmbroideryQipao
		AllureSidecut: {
			Archetype: ExtendedArchetype.TYPED,
			ChangeWhenLocked: false,
			DrawImages: false,
			Options: [{ Name: "Default" }, { Name: "Transparent" }],
		}, // AllureSidecut
		LittleFormalShirt: {
			Archetype: "modular",
			Modules: [{ Name: "Tie", Key: "t", Options: [{}, {}] }],
		}, // LittleFormalShirt
		StarryOceanEveningGown: {
			Archetype: "modular",
			DrawImages: false,
			Modules: [
				{
					Name: "Mirror",
					Key: "M",
					Options: [{}, { DrawOptions: { Mirror: true } }],
				},
			],
		}, // StarryOceanEveningGown
		CasualDroppedSuit: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{ Name: "Color", Key: "typed", Options: [{}, {}] },
				{
					Name: "Side",
					Key: "M",
					Options: [{}, { DrawOptions: { Mirror: true } }],
				},
			],
		}, // CasualDroppedSuit
		WhiteDress: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "HideNipples",
					Key: "hn",
					Options: [{ Property: { Hide: ["Nipples"] } }, {}],
				},
			],
		}, // WhiteDress
	}, // Cloth
	Decals: {
		MissMariasManor: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Default",
				},
				{
					Name: "Version2",
				},
				{
					Name: "Version3",
				},
			],
		},
	}, // Decals
	BodyMarkings: {
		WombTattoos: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Zoom",
					Key: "z",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Big",
					Key: "b",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Bloom",
					Key: "c",
					Options: [{}, {}], // n,y
				},
				{
					Name: "BottomSpike",
					Key: "d",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Flash",
					Key: "e",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Fly",
					Key: "f",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Grass",
					Key: "g",
					Options: [{}, {}], // n,y
				},

				{
					Name: "Grow",
					Key: "h",
					Options: [{}, {}], // n,y
				},
				{
					Name: "GrowHollow",
					Key: "i",
					Options: [{}, {}], // n,y
				},
				{
					Name: "HeartSmallOutline",
					Key: "j",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Heartline",
					Key: "k",
					Options: [{}, {}], // n,y
				},
				{
					Name: "HeartSmall",
					Key: "l",
					Options: [{}, {}], // n,y
				},
				{
					Name: "HeartSolid",
					Key: "m",
					Options: [{}, {}], // n,y
				},
				{
					Name: "HeartWings",
					Key: "n",
					Options: [{}, {}], // n,y
				},
				{
					Name: "In",
					Key: "o",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Leaves",
					Key: "p",
					Options: [{}, {}], // n,y
				},
				{
					Name: "MidSpike",
					Key: "q",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Ribow",
					Key: "r",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Sense",
					Key: "s",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Shake",
					Key: "t",
					Options: [{}, {}], // n,y
				},
				{
					Name: "SideHearts",
					Key: "u",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Swim",
					Key: "v",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Thorn",
					Key: "w",
					Options: [{}, {}], // n,y
				},
				{
					Name: "ThornOut",
					Key: "x",
					Options: [{}, {}], // n,y
				},
				{
					Name: "TopSpike",
					Key: "y",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Venom",
					Key: "za",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Viper",
					Key: "zb",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Waves",
					Key: "zc",
					Options: [{}, {}], // n,y
				},
				{
					Name: "WingSmall",
					Key: "zd",
					Options: [{}, {}], // n,y
				},
			],
		},
		BodyWritings: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{},
						{},
						{}, // Collar 0-L 1-C 2-R
						{},
						{},
						{}, // Ribs   3-L 4-C 5-R
						{},
						{},
						{}, // Hips   6-L 7-C 8-R
					],
					DrawData: {
						elementData: [
							{ position: ExtendedXYWithoutImages[9][0] },
							{ position: ExtendedXYWithoutImages[9][1] },
							{ position: ExtendedXYWithoutImages[9][2] },
							{ position: ExtendedXYWithoutImages[9][3] },
							{ position: ExtendedXYWithoutImages[9][4] },
							{ position: ExtendedXYWithoutImages[9][5] },
							{ position: ExtendedXYWithoutImages[9][6] },
							{ position: ExtendedXYWithoutImages[9][7] },
							{ position: ExtendedXYWithoutImages[9][8] },
						],
						itemsPerPage: 9,
					},
				},
				{
					Name: "Style",
					Key: "s",
					Options: [
						{}, // Print (Ananda Black) 0
						{}, // Cursive (Satisfy) 1
						{}, // Boilerplate (Saira Stencil One) 2
					],
					DrawData: {
						elementData: [
							{ position: ExtendedXYWithoutImages[3][0] },
							{ position: ExtendedXYWithoutImages[3][1] },
							{ position: ExtendedXYWithoutImages[3][2] },
						],
						itemsPerPage: 3,
					},
				},
				{
					Name: "Text",
					Key: "t",
					Options: [
						{}, // 0-N
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 20, Text2: 20, Text3: 20 },
								Font: "Ananda Black",
								ScriptHooks: {
									AfterDraw: AssetsBodyMarkingsBodyWritingsAfterDrawHook,
								},
							},
						}, // 1-Y
					],
				},
			],
			BaselineProperty: { Text: "", Text2: "", Text3: "" },
		}, // BodyWritings
		FaceScars: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "1",
					Key: "a",
					Options: [{}, {}], // n,y
				},
				{
					Name: "2",
					Key: "b",
					Options: [{}, {}], // n,y
				},
				{
					Name: "3",
					Key: "c",
					Options: [{}, {}], // n,y
				},
				{
					Name: "4",
					Key: "d",
					Options: [{}, {}], // n,y
				},
				{
					Name: "5",
					Key: "e",
					Options: [{}, {}], // n,y
				},
				{
					Name: "6",
					Key: "f",
					Options: [{}, {}], // n,y
				},
				{
					Name: "7",
					Key: "g",
					Options: [{}, {}], // n,y
				},

				{
					Name: "8",
					Key: "h",
					Options: [{}, {}], // n,y
				},
				{
					Name: "9",
					Key: "i",
					Options: [{}, {}], // n,y
				},
				{
					Name: "10",
					Key: "j",
					Options: [{}, {}], // n,y
				},
				{
					Name: "11",
					Key: "k",
					Options: [{}, {}], // n,y
				},
			],
		},
		Splatters: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Forehead1",
					Key: "a",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Forehead2",
					Key: "b",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Forehead3",
					Key: "c",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Face1",
					Key: "d",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Face2",
					Key: "e",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Face3",
					Key: "f",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Chest1",
					Key: "g",
					Options: [{}, {}], // n,y
				},

				{
					Name: "Chest2",
					Key: "h",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Chest3",
					Key: "i",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Chest4",
					Key: "j",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Tummy1",
					Key: "k",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Tummy2",
					Key: "l",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Tummy3",
					Key: "m",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Tummy4",
					Key: "n",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Internal1",
					Key: "o",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Internal2",
					Key: "p",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Internal3",
					Key: "q",
					Options: [{}, {}], // n,y
				},
				{
					Name: "NippleDrip",
					Key: "r",
					Options: [{}, {}], // n,y
				},
			],
			DialogPrefix: {
				Header: "BodyMarkingsSplattersSelect",
				Module: "BodyMarkingsSplattersModule",
				Option: "BodyMarkingsSplattersOption",
				Chat: "BodyMarkingsSplattersSet",
			},
		},
		FacePaints: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "1",
					Key: "a",
					Options: [{}, {}], // n,y
				},
				{
					Name: "2",
					Key: "b",
					Options: [{}, {}], // n,y
				},
				{
					Name: "3",
					Key: "c",
					Options: [{}, {}], // n,y
				},
				{
					Name: "4",
					Key: "d",
					Options: [{}, {}], // n,y
				},
				{
					Name: "5",
					Key: "e",
					Options: [{}, {}], // n,y
				},
				{
					Name: "6",
					Key: "f",
					Options: [{}, {}], // n,y
				},
				{
					Name: "7",
					Key: "g",
					Options: [{}, {}], // n,y
				},

				{
					Name: "8",
					Key: "h",
					Options: [{}, {}], // n,y
				},
				{
					Name: "9",
					Key: "i",
					Options: [{}, {}], // n,y
				},
			],
		},
	},
	FaceMarkings: {
		FaceWritings: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{}, // Right Cheek 0
						{}, // Forehead 1
						{}, // Left Cheek 2
					],
					DrawData: {
						elementData: [
							{ position: ExtendedXYWithoutImages[3][0] },
							{ position: ExtendedXYWithoutImages[3][1] },
							{ position: ExtendedXYWithoutImages[3][2] },
						],
						itemsPerPage: 3,
					},
				},
				{
					Name: "Style",
					Key: "s",
					Options: [
						{}, // Print (Ananda Black) 0
						{}, // Cursive (Satisfy) 1
						{}, // Boilerplate (Saira Stencil One) 2
					],
					DrawData: {
						elementData: [
							{ position: ExtendedXYWithoutImages[3][0] },
							{ position: ExtendedXYWithoutImages[3][1] },
							{ position: ExtendedXYWithoutImages[3][2] },
						],
						itemsPerPage: 3,
					},
				},
				{
					Name: "Text",
					Key: "t",
					Options: [
						{}, // 0-N
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 7, Text2: 6, Text3: 4 },
								ScriptHooks: {
									AfterDraw: AssetsFaceMarkingsFaceWritingsAfterDrawHook,
								},
							},
						}, // 1-Y
					],
				},
			],
			BaselineProperty: { Text: "", Text2: "", Text3: "" },
		}, // FaceWritings
		FaceScars: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "FaceScars" },
		}, // FaceScars
		Splatters: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "Splatters" },
		}, // Splatters
		AnimalNoses: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "ButtonNose",
				},
				{
					Name: "ElegantFelineNose",
				},
				{
					Name: "LargeCanineNose",
				},
			],
		}, // Animal Noses
	},
	HairFront: {
		HairFront60: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Band" }, { Name: "NoBand" }],
		},
		HairFront61: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Long" }, { Name: "Short" }],
		},
		HairFront62a: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Style",
					Key: "Style",
					Options: [{}, {}], // Glossy, Tame
				},
				{
					Name: "Strands",
					Key: "Strands",
					Options: [{}, {}], // Strands, No Strands
				},
				{
					Name: "Extra",
					Key: "Extra",
					Options: [{}, {}, {}], // Braids, Extra, None
				},
			],
		},
		HairFront62b: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Style",
					Key: "Style",
					Options: [{}, {}], // Glossy, Tame
				},
				{
					Name: "Strands",
					Key: "Strands",
					Options: [{}, {}], // Strands, No Strands
				},
				{
					Name: "Extra",
					Key: "Extra",
					Options: [{}, {}, {}], // Braids, Extra, None
				},
			],
		},
		HairFront67: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Braid" }, { Name: "NoBraid" }],
		},
		HairFront71: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Basic" }, { Name: "Translucent" }],
		},
	},
	HairBack: {
		HairBack58: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack58b: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack60: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		}, // HairBack60
		HairBack61: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		}, // HairBack61
		HairBack65: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack65b: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack66: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack67: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack68: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack69: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack69b: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack73: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Long" }, { Name: "Medium" }, { Name: "Short" }],
		},
		HairBack74: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "A" }, { Name: "B" }, { Name: "C" }],
		},
		HairBack75: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "L",
					Options: [{}, {}, {}], // Bun + Strand, Bun, None
				},
				{
					Name: "Right",
					Key: "R",
					Options: [{}, {}, {}], // Bun + Strand, Bun, None
				},
			],
		},
		HairBack76: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "L",
					Options: [{}, {}, {}, {}, {}], // Bun + Strand, Bun + Braid, Bun + Strand, Bun, None
				},
				{
					Name: "Right",
					Key: "R",
					Options: [{}, {}, {}, {}, {}], // Bun + Strand, Bun + Braid, Bun + Strand, Bun, None
				},
			],
		},
		HairBack76b: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		},
		HairBack77: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "L",
					Options: [{}, {}, {}, {}, {}], // Bun + Strand, Bun + Braid, Bun + Strand, Bun, None
				},
				{
					Name: "Right",
					Key: "R",
					Options: [{}, {}, {}, {}, {}], // Bun + Strand, Bun + Braid, Bun + Strand, Bun, None
				},
			],
		},
		HairBack77b: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "L",
					Options: [{}, {}, {}], // Bun + Braid, Bun, None
				},
				{
					Name: "Right",
					Key: "R",
					Options: [{}, {}, {}], // Bun + Braid, Bun, None
				},
			],
		},
		HairBack78: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "L",
					Options: [{}, {}, {}, {}, {}], // Bun + Strand, Bun + Braid, Bun + Strand, Bun, None
				},
				{
					Name: "Right",
					Key: "R",
					Options: [{}, {}, {}, {}, {}], // Bun + Strand, Bun + Braid, Bun + Strand, Bun, None
				},
			],
		},
		HairBack78b: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "L",
					Options: [{}, {}, {}], // Bun + Braid, Bun, None
				},
				{
					Name: "Right",
					Key: "R",
					Options: [{}, {}, {}], // Bun + Braid, Bun, None
				},
			],
		},
		HairBack80: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "LeftOnly" }, { Name: "Both" }, { Name: "RightOnly" }],
		}, // HairBack80
		HairBack82: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Long" }, { Name: "Medium" }],
		}, // HairBack82
		HairBack83: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		}, // HairBack83
		HairBack84: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Both" }, { Name: "LeftOnly" }, { Name: "RightOnly" }],
		}, // HairBack84
	},
	ClothAccessory: {
		LeatherStraps: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemArms", AssetName: "LeatherArmbinder" },
			Options: [
				{
					Name: "WrapStrap",
				},
				{
					Name: "Strap",
				},
			],
		}, // LeatherStraps
		BunnyCollarCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Both",
				},
				{
					Name: "Collar",
				},
				{
					Name: "Cuffs",
				},
			],
		}, // BunnyCollarCuffs
		Bib: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Pattern",
					Key: "p",
					Options: [{}, {}, {}, {}, {}, {}],
				},
				{
					Name: "Txt",
					Key: "x",
					Options: [
						{},
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 24, Text2: 24 },
								Font: "Pacifico",
								ScriptHooks: {
									AfterDraw: AssetsClothAccessoryBibAfterDrawHook,
								},
							},
						},
					],
				},
			],
			BaselineProperty: { Text: "", Text2: "" },
		}, // Bib
		Scarf: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "ShowMouth",
				},
				{
					Name: "Bundled",
				},
				{
					Name: "HideMouth",
				},
			],
			DrawImages: false,
		}, // Scarf
		Glitter: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Freckles",
				},
				{
					Name: "MidFreckles",
				},
				{
					Name: "SplitFreckles",
				},
				{
					Name: "FrecklesSmall",
				},
				{
					Name: "MidFrecklesSmall",
				},
				{
					Name: "SplitFrecklesSmall",
				},
				{
					Name: "StarsBoth",
				},
				{
					Name: "StarsLeft",
				},
				{
					Name: "StarsRight",
				},
				{
					Name: "DotsBoth",
				},
				{
					Name: "DotsLeft",
				},
				{
					Name: "DotsRight",
				},
			],
		}, //Glitter
		Kissmark: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Lcheek",
					Key: "c",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Rcheek",
					Key: "r",
					Options: [{}, {}], // y,n
				},
				{
					Name: "Rfhead",
					Key: "f",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Rneck",
					Key: "n",
					Options: [{}, {}], // n,y
				},
				{
					Name: "Lneck",
					Key: "l",
					Options: [{}, {}], // n,y
				},
			],
		}, //KissMark
		LargeBelt: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Fit",
				},
				{
					Name: "Loose",
				},
			],
			DialogPrefix: {
				Header: "SelectLargeBeltWidth",
				Option: "LargeBeltStyle",
			},
		}, // LargeBelt
		LargeBeltClassic: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Belt",
					Key: "b",
					Options: [
						{
							// b0 - Loose
							Property: { Effect: [] },
						},
						{
							// b1 - Fit
							Property: { Effect: [] },
						},
						{
							// b2 - Loose lower
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Position",
					Key: "p",
					DrawImages: false,
					Options: [
						{
							// p0 - Classic
							Property: {},
						},
						{
							// p1 - Under clothes 1
							Property: { OverridePriority: 30 },
						},
						{
							// p2 - Under clothes 2
							Property: { OverridePriority: 29 },
						},
					],
				},
			],
		}, // LargeBeltClassic
		LatexApron: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Full",
				},
				{
					Name: "Bottom",
				},
			],
			DialogPrefix: {
				Header: "LatexApronSelectType",
				Option: "LatexApronType",
			},
		}, // LatexApron
		WombTattoos: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "WombTattoos" },
		}, //WombTattoos
		BodyWritings: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "BodyWritings" },
		}, //BodyWritings
		FaceWritings: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			CopyConfig: { GroupName: "FaceMarkings", AssetName: "FaceWritings" },
		}, //FaceWritings
		SatinScarf: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Necklace", AssetName: "SatinScarf" },
		}, // SatinScarf
		ComboBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Chain",
					Key: "c",
					Options: [
						{
							// c0 - Added
							Property: { Effect: [] },
						},
						{
							// c1 - None
							Property: { Effect: [] },
						},
					],
				},
			],
		}, // ComboBelt
		HoodedCloak: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Hood",
					Key: "h",
					Options: [
						{
							// h0 - Off
							Property: { Effect: [] },
						},
						{
							// h1 - Over head
							Property: { Effect: [] },
						},
						{
							// h2 - Over eyes
							Property: { Effect: [] },
						},
					],
				},
			],
		},
		RuffledCollar: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "None" }, { Name: "Choker" }],
		}, //RuffledCollar
	}, // ClothAccessory
	ClothLower: {
		PantBoots: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Stripe",
					Key: "s",
					Options: [
						{
							// s0 - No stripe
							Property: { Effect: [] },
						},
						{
							// s1 - Striped
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Boot",
					Key: "b",
					Options: [
						{
							// b0 - Detached Boots
							Property: { Effect: [] },
						},
						{
							// b1 - Attached Boots
							Property: { Effect: [] },
						},
					],
				},
			],
		}, //PantBoots
		SatinSkirt: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Long" }, { Name: "Mid" }],
		}, //SatinSkirt
		BusinessTrousers: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Zipped",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemButt",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemLegs",
						],
						Hide: ["ItemVulvaPiercings", "Panties", "Pussy"],
						HideItem: [
							"ItemButtAnalBeads2",
							"SocksSocksFur",
							"SocksSocks4",
							"SocksSocks5",
							"SocksSocks6",
							"ItemVulvaVibratingLatexPanties",
							"ItemVulvaVibratingDildo",
							"ItemVulvaInflatableVibeDildo",
							"ItemVulvaClitSuctionCup",
							"ItemVulvaTapeStrips",
							"ItemVulvaBenWaBalls",
							"ItemVulvaHeavyWeightClamp",
							"ItemVulvaShockDildo",
						],
					},
				},
				{
					Name: "Unzipped",
					Property: {
						Block: ["ItemButt"],
						HideItem: ["ItemButtAnalBeads2"],
					},
				},
				{
					Name: "Down",
					Property: {},
				},
			],
		}, // BusinessTrousers
		ElegantSkirt: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Default",
					Property: {},
				},
				{
					Name: "Version2",
					Property: {},
				},
			],
		}, // ElegantSkirt
		PVCHobbleSkirt: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Length",
					Key: "l",
					Options: [
						{}, // l0 - Full size
						{}, // l1 - Mid legs
						{ Effect: [E.MapSwim] }, // l2 - Full size plus mermaid end
					],
				},
				{
					Name: "Position",
					Key: "p",
					DrawImages: false,
					Options: [
						{}, // p0 - Normal
						{
							// p1 - Over clothes
							Property: {
								OverridePriority: {
									USkirt: 27,
									Skirt: 28,
									Mermaid: 28,
								},
							},
						},
						{
							// p2 - Under clothes
							Property: {
								OverridePriority: {
									USkirt: 22,
									Skirt: 25,
									Mermaid: 27,
								},
							},
						},
					],
				},
				{
					Name: "Slow",
					Key: "s",
					Options: [
						{
							// s0 - Normal
							Property: {
								AllowActivePose: [
									"BaseLower",
									"LegsOpen",
									"LegsClosed",
									"Kneel",
									"Hogtied",
									"AllFours",
								],
							},
						},
						{
							// s1 - Zipper down
							Property: {
								SetPose: ["LegsClosed"],
								AllowActivePose: ["LegsClosed", "Kneel", "Hogtied", "AllFours"],
								Effect: [E.Slow],
							},
						},
					],
				},
			],
		}, // PVCHobbleSkirt
	}, // ClothLower
	Socks: {
		RippedPantyhose: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "RippedA",
				},
				{
					Name: "RippedB",
				},
				{
					Name: "RippedC",
				},
				{
					Name: "Normal",
				},
			],
		},
	},
	SocksLeft: {
		LooseSocks: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Normal" }, { Name: "Flat" }],
		}, // LooseSocks
	}, // SocksLeft
	SocksRight: {
		LooseSocks: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "SocksLeft", AssetName: "LooseSocks" },
		}, // LooseSocks
	}, // SocksRight
	ItemBreast: {
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "LightWrap",
					Property: { Difficulty: 0 },
				},
				{
					Name: "LightWrapBow",
					Property: { Difficulty: 1 },
				},
				{
					Name: "Wrap",
					Property: { Difficulty: 2 },
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
				Option: "RibbonsStyle",
				Chat: "RibbonsSet",
				Npc: "ItemBreastRibbons",
			},
		}, // Ribbons
		FuturisticBra2: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Display",
					Key: "d",
					Options: [
						{}, // d0 - Display
						{}, // d1 - No Display
					],
				},
				{
					Name: "Shiny",
					Key: "s",
					Options: [
						{}, // s0 - Shiny
						{}, // s1 - No Shiny
					],
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticBra2
		FuturisticBra: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Show",
				},
				{
					Name: "Solid",
				},
				{
					Name: "Show2",
				},
				{
					Name: "Solid2",
				},
			],
			DrawImages: false,
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: InventoryItemBreastFuturisticBraDrawHook,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
			BaselineProperty: { HeartRate: 0 },
		}, // FuturisticBra
		TickleBra: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // TickleBra
		ForbiddenChastityBra: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			DrawImages: false,
			Options: [
				{ Name: "Off" },
				{
					Name: "Low",
					Property: { ShockLevel: 0 },
				},
				{
					Name: "Medium",
					Property: { ShockLevel: 1 },
				},
				{
					Name: "High",
					Property: { ShockLevel: 2 },
				},
			],
			DrawData: {
				elementData: [
					{ position: ExtendedXYWithoutImages[8][0] },
					{ position: ExtendedXYWithoutImages[8][1] },
					{ position: ExtendedXYWithoutImages[8][2] },
					{ position: ExtendedXYWithoutImages[8][3] },
				],
			},
			ScriptHooks: {
				Draw: InventoryItemBreastForbiddenChastityBraDrawHook,
				Click: InventoryItemBreastForbiddenChastityBraClickHook,
				BeforeDraw: AssetsItemNeckAccessoriesCollarShockUnitBeforeDrawHook,
				ScriptDraw: AssetsItemBreastForbiddenChastityBraScriptDrawHook,
			},
			ChangeWhenLocked: false,
			BaselineProperty: {
				TriggerCount: 0,
				ShowText: true,
				BlinkState: false,
				ShockLevel: 0,
				PunishOrgasm: false,
				PunishStandup: false,
				PunishStruggle: false,
			},
		}, // ForbiddenChastityBra
	}, // ItemBreast
	ItemArms: {
		Web: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Dictionary: [
				(dictionary, { newIndex, previousIndex }) => {
					dictionary.text(
						"Action",
						newIndex > previousIndex ? "tightens" : "loosens",
					);
				},
			],
			Options: [
				{
					Name: "Tangled",
					Property: {
						Difficulty: 0,
						SetPose: ["BaseLower", "BackElbowTouch"],
						AllowActivePose: ["Kneel", "LegsOpen", "LegsClosed"],
					},
				},
				{
					Name: "Wrapped",
					BondageLevel: 0,
					SelfBondageLevel: 4,
					Property: {
						Difficulty: 2,
						SetPose: ["LegsClosed", "BackElbowTouch"],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
				},
				{
					Name: "Cocooned",
					BondageLevel: 1,
					SelfBondageLevel: 5,
					Property: {
						Difficulty: 4,
						SetPose: ["LegsClosed", "BackElbowTouch"],
						Block: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
					Random: false,
				},
				{
					Name: "Hogtied",
					BondageLevel: 3,
					SelfBondageLevel: 6,
					Property: {
						Difficulty: 4,
						SetPose: ["Hogtied"],
						Hide: ["ClothAccessory", "Necklace", "Socks"],
						Block: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
					},
					Random: false,
				},
				{
					Name: "Suspended",
					BondageLevel: 4,
					SelfBondageLevel: 8,
					Property: {
						Difficulty: 6,
						SetPose: ["LegsClosed", "BackElbowTouch", "Suspension"],
						Effect: [E.Suspended],
						Block: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
					Random: false,
				},
				{
					Name: "KneelingSuspended",
					BondageLevel: 5,
					SelfBondageLevel: 8,
					Property: {
						Difficulty: 8,
						SetPose: ["LegsClosed", "BackElbowTouch", "Suspension"],
						Effect: [E.Suspended],
						Hide: [
							"BodyLower",
							"SuitLower",
							"Panties",
							"Socks",
							"Pussy",
							"ItemFeet",
							"ItemLegs",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemBoots",
							"ItemHands",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
						Block: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
					},
					Random: false,
				},
				{
					Name: "SuspensionHogtied",
					BondageLevel: 5,
					SelfBondageLevel: 9,
					Property: {
						Difficulty: 11,
						SetPose: ["Hogtied"],
						Effect: [E.Suspended],
						Hide: ["ClothAccessory", "Necklace", "Socks"],
						Block: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"ItemDevices",
						],
						OverrideHeight: {
							Height: 0,
							Priority: 51,
							HeightRatioProportion: 0,
						},
					},
					Random: false,
				},
			],
			DialogPrefix: {
				Header: "WebBondageSelect",
				Option: "WebBondage",
				Chat: "ArmsWebSet",
				Npc: "ItemArmsWeb",
			},
		}, // Web
		InflatableStraightLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Light",
				},
				{
					Name: "Inflated",
					Property: {
						Difficulty: 1,
					},
				},
				{
					Name: "Bloated",
					Property: {
						Difficulty: 2,
					},
				},
				{
					Name: "Max",
					Property: {
						Effect: [E.Freeze],
						Difficulty: 3,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectInflationLevel",
				Option: "InflationAmount",
				Chat: "InflationAmountSet",
				Npc: "ItemArmsInflatableStraightLeotard",
			},
		}, // InflatableStraightLeotard
		MetalCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "InFront",
					Property: {
						SetPose: ["BaseUpper"],
					},
				},
				{
					Name: "BehindBack",
					Property: {
						SetPose: ["BackCuffs"],
					},
					NPCDefault: true,
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "MetalCuffsPose",
				Chat: "MetalCuffsRestrain",
				Npc: "ItemArmsMetalCuffs",
			},
		}, // MetalCuffs
		Chains: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.DEST_CHAR,
			],
			Options: [
				{
					Name: "WristTie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "BoxTie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					NPCDefault: true,
				},
				{
					Name: "ChainCuffs",
					Property: {
						SetPose: ["BackCuffs"],
						Difficulty: 1,
						OverridePriority: 29,
					},
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "WristElbowTie",
					BondageLevel: 2,
					Property: {
						Effect: [E.NotSelfPickable],
						SetPose: ["BackElbowTouch"],
						Difficulty: 2,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "WristElbowHarnessTie",
					BondageLevel: 3,
					Property: {
						Effect: [E.NotSelfPickable],
						SetPose: ["BackElbowTouch"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "KneelingHogtie",
					BondageLevel: 4,
					Property: {
						Effect: [E.Freeze, E.NotSelfPickable],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Kneel", "BackElbowTouch"],
						Difficulty: 3,
						AllowActivePose: [...PoseAllKneeling],
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "Hogtied",
					BondageLevel: 4,
					Property: {
						Effect: [E.Freeze, E.NotSelfPickable],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Hogtied"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "AllFours",
					BondageLevel: 6,
					Property: {
						Effect: [E.NotSelfPickable],
						Block: ["ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemLegs", "ItemFeet"],
						SetPose: ["AllFours"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "SuspensionHogtied",
					BondageLevel: 8,
					Property: {
						Effect: [E.Freeze, E.NotSelfPickable, E.Suspended],
						Block: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						SetPose: ["Hogtied"],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
					HasSubscreen: true,
					ArchetypeConfig: {
						Archetype: ExtendedArchetype.VARIABLEHEIGHT,
						MaxHeight: 0,
						MinHeight: -575,
						DrawData: {
							elementData: [
								{ position: [1140, 650, 100, 500], icon: "player" },
							],
						},
						DialogPrefix: {
							Chat: "SuspensionChange",
						},
					},
				},
			],
			DialogPrefix: {
				Header: "SelectChainBondage",
				Option: "ChainBondage",
				Chat: "ArmsChainSet",
				Npc: "ChainBondage",
			},
			ChangeWhenLocked: false,
		}, // Chains
		HighSecurityStraitJacket: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Crotch",
					Key: "c",
					Options: [
						{}, // c0 - No crotch panel
						{
							// c1 - Crotch panel
							Property: {
								Difficulty: 1,
								Block: [
									"ItemPelvis",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
								],
								Attribute: ["GenitaliaCover"],
								Hide: ["ItemVulvaPiercings", "Pussy"],
								HideItem: ["ItemButtAnalBeads2"],
							},
						},
					],
				},
				{
					Name: "Arms",
					Key: "a",
					Options: [
						{}, // a0 - Arms loose
						{ Property: { Difficulty: 2 }, SelfBondageLevel: 8 }, // a1 - Arms in front
						{ Property: { Difficulty: 3 }, SelfBondageLevel: 8 }, // a2 - Arms behind
					],
				},
				{
					Name: "Straps",
					Key: "s",
					Options: [
						{}, // s0 - No crotch straps
						{
							// s1 - One crotch strap
							Property: {
								Difficulty: 1,
								Block: [
									"ItemPelvis",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
								],
								Hide: ["ItemVulvaPiercings", "Pussy"],
								HideItem: ["ItemButtAnalBeads2"],
							},
						},
						{
							Property: {
								Difficulty: 2,
								Block: ["ItemPelvis"],
								Hide: ["Pussy"],
							},
						}, // s2 - Two crotch straps
						{
							// s3 - Three crotch straps
							Property: {
								Difficulty: 2,
								Block: [
									"ItemPelvis",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
								],
								Hide: ["ItemVulvaPiercings", "Pussy"],
								HideItem: ["ItemButtAnalBeads2"],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // HighSecurityStraitJacket
		LatexButterflyLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Unpolished",
				},
				{
					Name: "Polished",
				},
			],
			DialogPrefix: {
				Header: "ItemArmsLatexLeotardSelect",
				Option: "ItemArmsLatexLeotard",
				Chat: "ItemArmsLatexLeotardSet",
			},
		}, // LatexButterflyLeotard
		LatexBoxtieLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LatexButterflyLeotard" },
		},
		LatexSleevelessLeotard: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LatexButterflyLeotard" },
		},
		CeilingShackles: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "HeadLevel",
					Property: {
						SetPose: ["Yoked"],
					},
				},
				{
					Name: "Overhead",
					Property: {
						SetPose: ["OverTheHead"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Chat: ({ C }) =>
					`ItemArmsCeilingShacklesSet${
						C.PoseMapping.BodyFull === "Suspension" ? "Suspension" : ""
					}`,
			},
		}, // CeilingShackles
		BitchSuit: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "Zipped",
					Key: "z",
					Options: [
						{
							// z0 - Zipped up
							Property: {
								Block: [
									"ItemPelvis",
									"ItemTorso",
									"ItemTorso2",
									"ItemHands",
									"ItemHandheld",
									"ItemBreast",
									"ItemNipples",
									"ItemNipplesPiercings",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
								],
								Hide: [
									"ItemNipples",
									"ItemNipplesPiercings",
									"ItemBreast",
									"ItemVulva",
									"ItemVulvaPiercings",
									"Suit",
									"SuitLower",
								],
							},
						},
						{
							// z1 - Unzipped
							Property: {
								Block: [
									"ItemPelvis",
									"ItemTorso",
									"ItemTorso2",
									"ItemHands",
									"ItemHandheld",
								],
							},
						},
						{
							// z2 - Seemless
							Property: {
								Block: [
									"ItemPelvis",
									"ItemTorso",
									"ItemTorso2",
									"ItemHands",
									"ItemHandheld",
									"ItemBreast",
									"ItemNipples",
									"ItemNipplesPiercings",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
								],
								Hide: [
									"ItemNipples",
									"ItemNipplesPiercings",
									"ItemBreast",
									"ItemVulva",
									"ItemVulvaPiercings",
									"Suit",
									"SuitLower",
								],
							},
						},
						{
							// z3 - Exposed
							Property: {
								Block: [
									"ItemPelvis",
									"ItemTorso",
									"ItemTorso2",
									"ItemHands",
									"ItemHandheld",
								],
							},
						},
					],
				},
				{
					Name: "Straps",
					Key: "st",
					Options: [{}, { Property: { Difficulty: 3 } }],
				},
				{
					Name: "Clothes",
					Key: "cl",
					Options: [{ Property: { Hide: ["Cloth", "ClothLower"] } }, {}],
				},
				{
					Name: "Underwear",
					Key: "un",
					Options: [
						{
							Property: {
								Hide: ["Corset", "Garters", "Socks", "SocksLeft", "SocksRight"],
							},
						},
						{
							Property: {
								OverridePriority: 14,
								Hide: ["Suit", "SuitLower", "Socks", "SocksLeft", "SocksRight"],
							},
						},
						{ Property: { OverridePriority: 14 } },
					],
				},
			],
			ChangeWhenLocked: false,
		}, // BitchSuit
		StrappedPetsuitArms: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "Shine",
					Key: "g",
					Options: [
						{
							// g0 - No Gloss
						},
						{
							// g1 - Gloss
						},
					],
				},
				{
					Name: "Extras",
					Key: "a",
					Options: [
						{
							// a0- Normal
						},
						{
							// a1- Arms Forward
							Property: {
								AllowActivePose: ["BackElbowTouch"],
							},
						},
						{
							// a2- Arms side
							Property: {
								AllowActivePose: ["BackElbowTouch"],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // StrappedPetsuitArms
		ShinyPetSuit: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Exposed",
					Property: {
						Block: ["ItemLegs", "ItemFeet", "ItemHands", "ItemHandheld"],
					},
				},
				{
					Name: "Closed",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemTorso",
							"ItemTorso2",
							"ItemLegs",
							"ItemFeet",
							"ItemHands",
							"ItemHandheld",
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
						Hide: [
							"Bra",
							"Panties",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"Socks",
							"Suit",
							"SuitLower",
						],
					},
				},
				{
					Name: "Open",
					Property: {
						Block: ["ItemLegs", "ItemFeet", "ItemHands", "ItemHandheld"],
					},
				},
				{
					Name: "Classic",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemTorso",
							"ItemTorso2",
							"ItemLegs",
							"ItemFeet",
							"ItemHands",
							"ItemHandheld",
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
						Hide: [
							"Bra",
							"Panties",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"Socks",
							"Suit",
							"SuitLower",
						],
					},
				},
			],
			ChangeWhenLocked: false,
		}, // ShinyPetSuit
		ShinyStraitjacket: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Crosstie",
				},
				{
					Name: "Asylum",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemTorso",
							"ItemTorso2",
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
						Hide: [
							"Bra",
							"Panties",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
					},
				},
				{
					Name: "Hardbinder",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemTorso",
							"ItemTorso2",
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
						Hide: [
							"Bra",
							"Panties",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
					},
				},
				{
					Name: "Classic",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemTorso",
							"ItemTorso2",
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
						Hide: [
							"Bra",
							"Panties",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
					},
				},
			],
			ChangeWhenLocked: false,
		}, // ShinyStraitjacket
		ShinyArmbinder: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Armbinder",
				},
				{
					Name: "Hard",
				},
				{
					Name: "Reverse",
				},
				{
					Name: "Xcross",
				},
			],
			ChangeWhenLocked: false,
		}, // ShinyArmbinder
		LeatherArmbinder: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
					Property: { Difficulty: 0 },
				},
				{
					Name: "Strap",
					Property: { Difficulty: 3 },
				},
				{
					Name: "WrapStrap",
					Property: { Difficulty: 3 },
				},
			],
			DialogPrefix: {
				Header: "ItemArmsLeatherArmbinderSelect",
				Option: "ItemArmsLeatherArmbinder",
				Chat: "ItemArmsLeatherArmbinderSet",
			},
		}, // LeatherArmbinder
		PawPaddedPetsuitArms: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Padding",
				},
				{
					Name: "None",
				},
			],
			ChangeWhenLocked: false,
			DialogPrefix: {
				Header: "ItemArmsPawPaddedPetsuitArmsSelect",
				Option: "ItemArmsPawPaddedPetsuitArms",
				Chat: "ItemArmsPawPaddedPetsuitArmsSet",
			},
		}, // PawPaddedPetsuitArms
		ArmbinderSuit: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Collar",
					Key: "c",
					Options: [
						{
							// c0 - None
							Property: { Difficulty: 0 },
						},
						{
							// c1 - Collar
							Property: { Difficulty: 1 },
						},
					],
				},
				{
					Name: "Binder",
					Key: "b",
					Options: [
						{
							// b0 - Left
							Property: {},
						},
						{
							// b1 - Right
							Property: {},
						},
						{
							// b2 - Center
							Property: {},
						},
						{
							// b3 - Restricted with belts
							Property: { Difficulty: 6 },
						},
						{
							// b4 - Full bind plus link legs
							Property: {
								SetPose: ["BackElbowTouch"],
								AllowActivePose: [
									"BaseLower",
									"LegsOpen",
									"LegsClosed",
									"Kneel",
								],
								Effect: [E.Slow],
								Difficulty: 9,
							},
						},
						{
							// b5 - Force kneel
							Property: {
								SetPose: ["BackElbowTouch", "Kneel"],
								Effect: [E.Freeze, E.Tethered, E.MapImmobile],
								Difficulty: 12,
							},
						},
					],
				},
				{
					Name: "Strap",
					Key: "p",
					Options: [
						{
							// p0 - None
							Property: { Difficulty: 0 },
						},
						{
							// p1 - Shoulders
							Property: { Difficulty: 4 },
						},
					],
				},
				{
					Name: "Zipper",
					Key: "z",
					Options: [
						{
							// z0 - Closed
							Property: {
								Effect: [E.Chaste, E.ButtChaste],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								Difficulty: 0,
							},
						},
						{
							// z1 - Open
							Property: { Difficulty: 0 },
						},
					],
				},
				{
					Name: "Legs",
					Key: "l",
					Options: [
						{
							// l0 - None
							Property: { Difficulty: 0 },
						},
						{
							// l1 - Lower suit
							Property: {
								SetPose: ["BackElbowTouch", "LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								Difficulty: 1,
							},
						},
						{
							// l2 - Knee Belt
							Property: {
								SetPose: ["BackElbowTouch", "LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Slow],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								Difficulty: 3,
							},
						},
						{
							// l3 - Full Thigh Belts
							Property: {
								SetPose: ["BackElbowTouch", "LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Freeze],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								Difficulty: 6,
							},
						},
					],
				},
				{
					Name: "Skirt",
					Key: "k",
					Options: [
						{
							// k0 - None
							Property: { Difficulty: 0 },
						},
						{
							// k1 - Skirt
							Property: { Difficulty: 0 },
						},
					],
				},
				{
					Name: "SingleHeel",
					Key: "h",
					Options: [
						{
							// h0 - None
							Property: { Difficulty: 0 },
						},
						{
							// h1 - Single Heel
							Property: {
								SetPose: ["BackElbowTouch", "LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Slow],
								Block: ["ItemBoots"],
								Difficulty: 6,
							},
						},
						{
							// h2 - Single Heel 2nd belt option
							Property: {
								SetPose: ["BackElbowTouch", "LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Freeze],
								Block: ["ItemBoots"],
								Difficulty: 8,
							},
						},
						{
							// h3 - Single Heel lock in the ground
							Prerequisite: ["NotSuspended", "NotLifted"],
							Property: {
								SetPose: ["BackElbowTouch", "LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Freeze, E.Tethered, E.MapImmobile],
								Block: ["ItemFeet", "ItemBoots", "ItemAddon"],
								Difficulty: 12,
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // ArmbinderSuit
		WristShackles: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "InFront",
				},
				{
					Name: "Behind",
					Property: {
						SetPose: ["BackCuffs"],
						Effect: [E.Block],
						Difficulty: 3,
					},
				},
				{
					Name: "Overhead",
					Property: {
						SetPose: ["OverTheHead"],
						Effect: [E.Block],
						Difficulty: 3,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
			},
		}, // WristShackles
		FuturisticCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
					Property: {
						Difficulty: 0,
						Effect: [],
						SetPose: [],
						SelfUnlock: true,
					},
				},
				{
					Name: "Wrist",
					Property: {
						Difficulty: 2,
						Effect: [E.Block, E.BlockWardrobe],
						SetPose: ["BackBoxTie"],
						SelfUnlock: true,
					},
				},
				{
					Name: "Elbow",
					Property: {
						Difficulty: 4,
						Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
						SetPose: ["BackElbowTouch"],
						SelfUnlock: false,
					},
				},
				{
					Name: "Both",
					Property: {
						Difficulty: 6,
						Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
						SetPose: ["BackElbowTouch"],
						SelfUnlock: false,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemArmsCuffs",
				Chat: "FuturisticCuffsRestrain",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticCuffs
		FuturisticArmbinder: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: { Difficulty: 0 },
				},
				{
					Name: "Tight",
					Property: { Difficulty: 7 },
				},
			],
			DialogPrefix: {
				Header: "SelectFuturisticArmbinderType",
				Option: "FuturisticArmbinderType",
				Chat: "FuturisticArmbinderSet",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticArmbinder
		LeatherCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
					Property: {
						Difficulty: 0,
						Effect: [],
						SetPose: [],
						SelfUnlock: true,
					},
				},
				{
					Name: "Wrist",
					Property: {
						Difficulty: 2,
						Effect: [E.Block, E.BlockWardrobe],
						SetPose: ["BackBoxTie"],
						SelfUnlock: true,
					},
				},
				{
					Name: "Elbow",
					Property: {
						Difficulty: 4,
						Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
						SetPose: ["BackElbowTouch"],
						SelfUnlock: false,
					},
				},
				{
					Name: "Both",
					Property: {
						Difficulty: 6,
						Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
						SetPose: ["BackElbowTouch"],
						SelfUnlock: false,
					},
				},
				{
					Name: "Hogtie",
					Property: {
						Difficulty: 6,
						Effect: [E.Block, E.BlockWardrobe, E.Freeze, E.NotSelfPickable],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Hogtied"],
						SelfUnlock: false,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemArmsCuffs",
			},
		}, // LeatherCuffs
		LeatherDeluxeCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LeatherCuffs" },
		}, // LeatherDeluxeCuffs
		OrnateCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LeatherCuffs" },
		}, // OrnateCuffs
		HighStyleSteelCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "SteelCuffs" },
		}, // HighStyleSteelCuffs
		SteelCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LeatherCuffs" },
			Options: [
				{
					Name: "None",
				},
				{
					Name: "Wrist",
					Property: {
						Effect: [E.Block, E.BlockWardrobe],
						SetPose: ["BackBoxTie"],
					},
				},
			],
		}, // SteelCuffs
		StraitJacket: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {
						Difficulty: 0,
					},
				},
				{
					Name: "Normal",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "Snug",
					Property: {
						Difficulty: 6,
					},
				},
				{
					Name: "Tight",
					Property: {
						Difficulty: 9,
					},
				},
			],
			DialogPrefix: {
				Header: "ItemArmsStraitJacketSelect",
				Option: "ItemArmsStraitJacket",
			},
		}, // StraitJacket
		LeatherStraitJacket: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "StraitJacket" },
		}, // LeatherStraitJacket
		CollarCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {
						Difficulty: 0,
					},
				},
				{
					Name: "Normal",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "Snug",
					Property: {
						Difficulty: 6,
					},
				},
				{
					Name: "Tight",
					Property: {
						Difficulty: 9,
					},
				},
			],
			DrawImages: false,
		}, // CollarCuffs
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Arms",
					Property: { Difficulty: 1 },
				},
				{
					Name: "Bottom",
					SelfBondageLevel: 4,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						SetPose: ["BackElbowTouch"],
						Block: [
							"ItemVulva",
							"ItemButt",
							"ItemPelvis",
							"ItemVulvaPiercings",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
						Difficulty: 2,
					},
				},
				{
					Name: "Top",
					SelfBondageLevel: 6,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						SetPose: ["BackElbowTouch"],
						Block: [
							"ItemTorso",
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
						],
						Difficulty: 4,
					},
				},
				{
					Name: "Full",
					SelfBondageLevel: 8,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						SetPose: ["BackElbowTouch"],
						Block: [
							"ItemVulva",
							"ItemButt",
							"ItemPelvis",
							"ItemTorso",
							"ItemBreast",
							"ItemNipples",
							"ItemVulvaPiercings",
							"ItemNipplesPiercings",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
						Difficulty: 6,
					},
				},
				{
					Name: "Complete",
					SelfBondageLevel: 10,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						SetPose: ["BackElbowTouch"],
						Block: [
							"ItemVulva",
							"ItemButt",
							"ItemPelvis",
							"ItemTorso",
							"ItemBreast",
							"ItemNipples",
							"ItemVulvaPiercings",
							"ItemNipplesPiercings",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
						Difficulty: 7,
					},
				},
				{
					Name: "ExposedComplete",
					SelfBondageLevel: 10,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						SetPose: ["BackElbowTouch"],
						Block: [
							"ItemVulva",
							"ItemButt",
							"ItemPelvis",
							"ItemTorso",
							"ItemVulvaPiercings",
							"ItemBreast",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
						Difficulty: 7,
					},
				},
				{
					Name: "PetTape",
					SelfBondageLevel: 10,
					Property: {
						SetPose: ["BackElbowTouch"],
						AllowActivePose: ["AllFours"],
						Block: ["ItemHands"],
						HideItem: ["ClothAccessoryPoncho"],
						Difficulty: 7,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectTapeWrapping",
			},
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.DEST_CHAR,
			],
		}, // DuctTape
		Zipties: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "ZipLight",
					Property: {
						SetPose: ["BackElbowTouch"],
						Difficulty: 1,
					},
				},
				{
					Name: "ZipMedium",
					Property: {
						SetPose: ["BackElbowTouch"],
						Difficulty: 2,
					},
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "ZipFull",
					Property: {
						SetPose: ["BackElbowTouch"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "ZipElbowWrist",
					Property: {
						SetPose: ["BackElbowTouch"],
						Difficulty: 1,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "ZipWristLight",
					Property: {
						SetPose: ["BackBoxTie"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "ZipWristMedium",
					Property: {
						SetPose: ["BackBoxTie"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "ZipWristFull",
					Property: {
						SetPose: ["BackBoxTie"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "ZipWrist",
					Property: {
						SetPose: ["BackBoxTie"],
						Difficulty: 1,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "ZipKneelingHogtie",
					Property: {
						Effect: [E.Freeze],
						Block: [
							"ItemHands",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
							"ItemDevices",
						],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						SetPose: ["Kneel", "BackElbowTouch"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "ZipHogtied",
					Property: {
						Effect: [E.Freeze],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Hogtied"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "ZipAllFours",
					Property: {
						Block: ["ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemLegs", "ItemFeet"],
						SetPose: ["AllFours"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
			],
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			DialogPrefix: {
				Header: "SelectZipTie",
			},
		}, // Zipties
		ThinLeatherStraps: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{ Name: "Wrist", Property: { SetPose: ["BackBoxTie"] } },
				{
					Name: "Boxtie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 4 },
					NPCDefault: true,
				},
				{
					Name: "WristElbow",
					Property: { SetPose: ["BackElbowTouch"], Difficulty: 3 },
				},
				{
					Name: "WristElbowHarness",
					Property: { SetPose: ["BackElbowTouch"], Difficulty: 5 },
				},
				{
					Name: "Hogtie",
					Property: {
						SetPose: ["Hogtied"],
						Effect: [E.Freeze],
						Difficulty: 6,
					},
					Random: false,
				},
			],
		}, //ThinLeatherStraps
		MermaidSuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Zipped",
					Property: {
						Difficulty: 0,
						Block: [
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
					},
				},
				{
					Name: "UnZip",
					Property: {
						Block: [],
					},
				},
			],
		}, // MermaidSuit
		TightJacket: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Basic",
					Property: {
						Difficulty: 1,
					},
				},
				{
					Name: "PulledStraps",
					Property: {
						Difficulty: 1,
					},
				},
				{
					Name: "LiningStraps",
					Property: {
						Difficulty: 2,
					},
				},
				{
					Name: "ExtraPadding",
					Property: {
						Difficulty: 2,
					},
				},
				{
					Name: "PulledLining",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "PulledPadding",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "PaddedLining",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "FullJacket",
					Property: {
						Difficulty: 4,
					},
				},
			],
			DialogPrefix: {
				Header: "ItemArmsTightJacketSelect",
				Option: "ItemArmsTightJacket",
				Chat: "ItemArmsTightJacketSet",
			},
		}, // TightJacket
		TightJacketCrotch: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "TightJacket" },
		}, // TightJacketCrotch
		WrappedBlanket: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "NormalWrapped",
				},
				{
					Name: "ShouldersWrapped",
				},
				{
					Name: "FeetWrapped",
				},
				{
					Name: "FullWrapped",
				},
			],
		}, // WrappedBlanket
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Cross",
					Property: { Difficulty: 1 },
				},
				{
					Name: "Heavy",
					SelfBondageLevel: 4,
					Property: { Difficulty: 2 },
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
			},
		}, // Ribbons
		SturdyLeatherBelts: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			ChangeWhenLocked: false,
			DialogPrefix: {
				Header: "SturdyLeatherBeltsSelectTightness",
				Option: "SturdyLeatherBeltsPose",
				Chat: "SturdyLeatherBeltsRestrain",
			},
			Options: [
				{
					Name: "One",
				},
				{
					Name: "Two",
					Property: { Difficulty: 2 },
				},
				{
					Name: "Three",
					Property: { Difficulty: 4 },
				},
			],
		}, // SturdyLeatherBelts
		StraitLeotard: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [CommonChatTags.DEST_CHAR_NAME, CommonChatTags.ASSET_NAME],
			Modules: [
				{
					Name: "Cloth",
					Key: "cl",
					Options: [{ Property: { Hide: ["Cloth"] } }, {}],
				},
				{
					Name: "Corset",
					Key: "co",
					Options: [{ Property: { Hide: ["Corset", "ItemTorso"] } }, {}],
				},
				{
					Name: "NipplesPiercings",
					Key: "np",
					Options: [
						{
							Property: {
								Hide: ["ItemNipplesPiercings", "ItemNipples", "ItemBreast"],
							},
						},
						{},
					],
				},
				{
					Name: "VulvaPiercings",
					Key: "vp",
					Options: [
						{
							Property: {
								Hide: ["ItemVulvaPiercings", "Panties", "ItemPelvis"],
							},
						},
						{},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // StraitLeotard
		FuturisticStraitjacket: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Cloth",
					Key: "cl",
					Options: [{ Property: { Hide: ["Cloth"] } }, {}],
				},
				{
					Name: "Corset",
					Key: "co",
					Options: [{ Property: { Hide: ["Corset", "ItemTorso"] } }, {}],
				},
				{
					Name: "NipplesPiercings",
					Key: "np",
					Options: [
						{
							Property: {
								Hide: ["ItemNipplesPiercings", "ItemNipples", "ItemBreast"],
							},
						},
						{},
					],
				},
				{
					Name: "VulvaPiercings",
					Key: "vp",
					Options: [
						{
							Property: {
								Hide: ["ItemVulvaPiercings", "Panties", "ItemPelvis"],
							},
						},
						{},
					],
				},
				{
					Name: "Arms",
					Key: "a",
					Options: [
						{}, // a0 - Arms front
						{
							// a1 - Arms behind
							Property: {
								Difficulty: 2,
							},
						},
					],
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticStraitjacket
		Tentacles: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "BehindBack",
					Property: {
						SetPose: ["BackElbowTouch"],
					},
				},
				{
					Name: "OverTheHead",
					Property: {
						SetPose: ["OverTheHead"],
						HideItem: [
							"ClothAdmiralTop",
							"ClothFurCoat",
							"ClothStudentOutfit2",
							"ClothSweater1",
							"ClothTeacherOutfit1",
						],
					},
				},
			],
		}, // Tentacles
		NylonRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.DEST_CHAR,
			],
			Options: [
				{
					Name: "WristTie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "BoxTie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					NPCDefault: true,
				},
				{
					Name: "WristElbowTie",
					BondageLevel: 2,
					Property: { SetPose: ["BackElbowTouch"], Difficulty: 2 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "SimpleHogtie",
					BondageLevel: 2,
					Property: { SetPose: ["Hogtied"], Difficulty: 2 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
					Random: false,
				},
				{
					Name: "TightBoxtie",
					BondageLevel: 3,
					Property: { SetPose: ["BackBoxTie"], Difficulty: 3 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "WristElbowHarnessTie",
					BondageLevel: 3,
					Property: { SetPose: ["BackElbowTouch"], Difficulty: 3 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "KneelingHogtie",
					BondageLevel: 4,
					Property: {
						Effect: [E.Freeze],
						Block: [
							"ItemHands",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
							"ItemDevices",
						],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						SetPose: ["Kneel", "BackElbowTouch"],
						Difficulty: 3,
						AllowActivePose: [...PoseAllKneeling],
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "Hogtied",
					BondageLevel: 4,
					Property: {
						Effect: [E.Freeze],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Hogtied"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "AllFours",
					BondageLevel: 6,
					Property: {
						Block: ["ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemLegs", "ItemFeet"],
						SetPose: ["AllFours"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "BedSpreadEagle",
					BondageLevel: 1,
					Prerequisite: ["OnBed"],
					Property: {
						Effect: [E.Freeze],
						Block: ["ItemDevices"],
						SetPose: ["Yoked"],
						Difficulty: 5,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Chat: "ArmsRopeSet",
				Npc: "RopeBondage",
			},
		}, // NylonRope
		HempRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.DEST_CHAR,
			],
			Options: [
				{
					Name: "WristTie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "BoxTie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					NPCDefault: true,
				},
				{
					Name: "CrossedBoxtie",
					Property: { SetPose: ["BackBoxTie"], Difficulty: 1 },
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "RopeCuffs",
					Property: {
						SetPose: ["BackCuffs"],
						Difficulty: 1,
						OverridePriority: 29,
					},
					Expression: [{ Group: "Blush", Name: "Low", Timer: 5 }],
				},
				{
					Name: "WristElbowTie",
					BondageLevel: 2,
					Property: { SetPose: ["BackElbowTouch"], Difficulty: 2 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "SimpleHogtie",
					BondageLevel: 2,
					Property: { SetPose: ["Hogtied"], Difficulty: 2 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
					Random: false,
				},
				{
					Name: "TightBoxtie",
					BondageLevel: 3,
					Property: { SetPose: ["BackBoxTie"], Difficulty: 3 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "WristElbowHarnessTie",
					BondageLevel: 3,
					Property: { SetPose: ["BackElbowTouch"], Difficulty: 3 },
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
				{
					Name: "KneelingHogtie",
					BondageLevel: 4,
					Property: {
						Effect: [E.Freeze],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Kneel", "BackElbowTouch"],
						Difficulty: 3,
						AllowActivePose: [...PoseAllKneeling],
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "Hogtied",
					BondageLevel: 4,
					Property: {
						Effect: [E.Freeze],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Hogtied"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "AllFours",
					BondageLevel: 6,
					Property: {
						Block: ["ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemLegs", "ItemFeet"],
						SetPose: ["AllFours"],
						Difficulty: 3,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "BedSpreadEagle",
					BondageLevel: 1,
					Prerequisite: ["OnBed"],
					Property: {
						Effect: [E.Freeze],
						Block: ["ItemDevices"],
						SetPose: ["Yoked"],
						Difficulty: 5,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
				},
				{
					Name: "SuspensionKneelingHogtie",
					BondageLevel: 6,
					Property: {
						Effect: [E.Freeze, E.Suspended],
						Block: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						SetPose: ["Kneel", "BackElbowTouch"],
						AllowActivePose: [...PoseAllKneeling],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
					HasSubscreen: true,
					ArchetypeConfig: {
						Archetype: ExtendedArchetype.VARIABLEHEIGHT,
						MaxHeight: 0,
						MinHeight: -250,
						DrawData: {
							elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
						},
						DialogPrefix: {
							Chat: "SuspensionChange",
						},
					},
				},
				{
					Name: "SuspensionHogtied",
					BondageLevel: 8,
					Property: {
						Effect: [E.Freeze, E.Suspended],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SetPose: ["Hogtied"],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
					HasSubscreen: true,
					ArchetypeConfig: {
						Archetype: ExtendedArchetype.VARIABLEHEIGHT,
						MaxHeight: 0,
						MinHeight: -575,
						DrawData: {
							elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
						},
						DialogPrefix: {
							Chat: "SuspensionChange",
						},
					},
				},
				{
					Name: "SuspensionAllFours",
					BondageLevel: 8,
					Property: {
						Effect: [E.Freeze, E.Suspended],
						Block: ["ItemLegs", "ItemFeet", "ItemDevices"],
						AllowActivityOn: ["ItemLegs", "ItemFeet"],
						SetPose: ["AllFours"],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
					HasSubscreen: true,
					ArchetypeConfig: {
						Archetype: ExtendedArchetype.VARIABLEHEIGHT,
						MaxHeight: 0,
						MinHeight: -560,
						DrawData: {
							elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
						},
						DialogPrefix: {
							Chat: "SuspensionChange",
						},
					},
				},
				{
					Name: "InvertedSuspensionHogtied",
					BondageLevel: 8,
					Property: {
						Effect: [E.Freeze, E.Suspended],
						Block: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet", "ItemBoots"],
						SetPose: ["Hogtied", "Suspension"],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
					HasSubscreen: true,
					ArchetypeConfig: {
						Archetype: ExtendedArchetype.VARIABLEHEIGHT,
						MaxHeight: -50,
						MinHeight: -600,
						DrawData: {
							elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
						},
						DialogPrefix: {
							Chat: "SuspensionChange",
						},
					},
				},
				{
					Name: "InvertedSuspensionAllFours",
					BondageLevel: 8,
					Property: {
						Effect: [E.Freeze, E.Suspended],
						Block: ["ItemLegs", "ItemFeet", "ItemBoots", "ItemDevices"],
						AllowActivityOn: ["ItemLegs", "ItemFeet", "ItemBoots"],
						SetPose: ["AllFours", "Suspension"],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
					Random: false,
					HasSubscreen: true,
					ArchetypeConfig: {
						Archetype: ExtendedArchetype.VARIABLEHEIGHT,
						MaxHeight: 0,
						MinHeight: -560,
						DrawData: {
							elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
						},
						DialogPrefix: {
							Chat: "SuspensionChange",
						},
					},
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Chat: "ArmsRopeSet",
				Npc: "RopeBondage",
			},
		},
		Slime: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{}, // p0 - Arms behind back
						{ Property: { Difficulty: 2, SetPose: ["Hogtied"] } }, // p1 - Hogtied
					],
				},
				{
					Name: "Type",
					Key: "t",
					Options: [
						{}, // t0 - Normal slime
						{ Property: { Difficulty: 3 } }, // t1 - Slime girl
					],
				},
			],
			ChatTags: [CommonChatTags.DEST_CHAR, CommonChatTags.TARGET_CHAR],
		},
		WoodenCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "HandsFront",
					Property: {
						Difficulty: 2,
						SetPose: ["BaseUpper"],
						SelfUnlock: true,
					},
				},
				{
					Name: "HandsBack",
					Property: {
						Difficulty: 3,
						SetPose: ["BackCuffs"],
						SelfUnlock: false,
					},
				},
				{
					Name: "HandsHead",
					Property: {
						Difficulty: 4,
						Effect: [E.NotSelfPickable],
						SetPose: ["Yoked"],
						SelfUnlock: false,
					},
				},
				{
					Name: "Hogtied",
					Property: {
						Difficulty: 5,
						Effect: [E.Freeze, E.NotSelfPickable],
						SetPose: ["Hogtied"],
						Block: ["ItemHands", "ItemLegs", "ItemFeet"],
						AllowActivityOn: ["ItemHands", "ItemLegs", "ItemFeet"],
						SelfUnlock: false,
					},
					Expression: [{ Group: "Blush", Name: "Medium", Timer: 5 }],
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemArmsWoodenCuffs",
			},
		}, // WoodenCuffs
		FullLatexSuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Latex",
					Property: {
						Block: [
							"ItemBreast",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
						],
					},
				},
				{
					Name: "UnZip",
				},
			],
			DrawData: {
				elementData: [
					{ position: ExtendedXY[6][0] },
					{ position: ExtendedXY[6][2] },
				],
			},
			ScriptHooks: {
				Draw: InventoryItemArmsFullLatexSuitDrawHook,
				Click: InventoryItemArmsFullLatexSuitClickHook,
			},
		}, // FullLatexSuit
		PrisonLockdownSuit: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Restraints",
					Key: "r",
					Options: [
						{
							Property: {
								Difficulty: 0,
							},
						}, // r0 - Free
						{
							Property: {
								Difficulty: 2,
							},
						}, // r1 - Ankles
						{
							Property: {
								Difficulty: 1,
							},
						}, // r2 - Thighs
						{
							Property: {
								Difficulty: 3,
								Effect: [E.Freeze],
							},
						}, // r3 - Full
					],
				},
				{
					Name: "ShockModule",
					Key: "s",
					DrawImages: false,
					Options: [
						{ Property: { ShockLevel: 0 } },
						{ Property: { ShockLevel: 1 } },
						{ Property: { ShockLevel: 2 } },
					],
				},
			],
			DrawData: {
				elementData: [
					{}, // Restraints
					{
						imagePath:
							"Screens/Inventory/ItemArms/PrisonLockdownSuit/ShockModule.png",
					}, // ShockModule
				],
			},
			BaselineProperty: { TriggerCount: 0, ShowText: true },
			ScriptHooks: {
				Click: InventoryItemArmsPrisonLockdownSuitClickHook,
				Draw: InventoryItemArmsPrisonLockdownSuitDrawHook,
			},
			DrawImages: true,
		}, // PrisonLockdownSuit
		SmoothLeatherArmbinder1: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "BinderPosition",
					Key: "b",
					Options: [
						{}, // b0 Left
						{}, // b1 Back
						{}, // b2 Right
					],
				},
				{
					Name: "ShoulderStraps",
					Key: "s",
					Options: [
						{}, // s0 No Straps
						{
							Property: {
								Difficulty: 20,
							},
						}, // s1 Basic Shoulder Straps
						{
							Property: {
								Difficulty: 30,
							},
						}, // s2 Wrapping Shoulder Straps
						{
							Property: {
								Difficulty: 40,
							},
						}, // s3 Harness Shoulder Straps
					],

					AllowSelfSelect: false,
				},
			],
		}, // SmoothLeatherArmbinder1
		TransportJacket: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "NoShorts",
					Property: { Difficulty: 0 },
				},
				{
					Name: "Shorts",
					Property: {
						Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
						Hide: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"Panties",
							"Corset",
						],
					},
				},
				{
					Name: "ShortsAndStraps",
					Property: {
						Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
						Hide: [
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"Panties",
							"Corset",
						],
					},
				},
			],
			BaselineProperty: { Text: "" },
			ChatSetting: TypedItemChatSetting.FROM_TO,
			ScriptHooks: {
				Load: InventoryItemArmsTransportJacketLoadHook,
				Draw: InventoryItemArmsTransportJacketDrawHook,
				Exit: InventoryItemArmsTransportJacketExitHook,
				PublishAction: InventoryItemArmsTransportJacketPublishActionHook,
			},
		}, // TransportJacket
		PrisonSJ: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Stripes",
					Key: "p",
					Options: [
						{
							// p0 - No Stripes
							Property: { Effect: [] },
						},
						{
							// p1 - Prison Stripes
							Property: { Effect: [] },
						},
						{
							// p2 - Sides
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Zipper",
					Key: "c",
					Options: [
						{
							// c0 - closed
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
							},
						},
						{
							// c1 - Exposed
							Property: {
								Effect: [],
								Block: [],
							},
						},
					],
				},
			],
		}, //PrisonSJ
		CollarMetalcuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "Normal",
					Property: {
						Difficulty: 5,
					},
				},
				{
					Name: "Snug",
					Property: {
						Difficulty: 8,
					},
				},
				{
					Name: "Tight",
					Property: {
						Difficulty: 12,
						Effect: ["MergedFingers"],
						SetPose: ["BackElbowTouch"],
					},
				},
			],
			DrawImages: false,
		}, // Collar Handcuffs
		BedMetalCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Left",
				},
				{
					Name: "Right",
				},
				{
					Name: "Both",
				},
			],
			DrawImages: false,
		}, // BedMetalCuffs
		InflatableDress: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Hood",
					Key: "h",
					Options: [
						{
							// h0 - None
							Property: {},
						},
						{
							// h1 - Hood
							Property: {
								Difficulty: 4,
								Effect: [E.GagEasy, E.BlockMouth, E.BlindHeavy, E.DeafLight],
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemNose",
									"ItemEars",
									"ItemHead",
								],
								Hide: [
									"Hat",
									"HairAccessory1",
									"Jewelry",
									"Glasses",
									"Mask",
									"HairFront",
									"HairBack",
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
								],
								HideItem: [
									"ItemHoodAccentHood",
									"ItemHoodBalloon",
									"ItemHoodBigMouthHood",
									"ItemHoodBlanketHood",
									"ItemHoodCollarHood",
									"ItemHoodCorsetHood",
									"ItemHoodCreepyIronMask",
									"ItemHoodCustomLatexHood",
									"ItemHoodDogHood",
									"ItemHoodFestivalFoxMask",
									"ItemHoodFoxHood",
									"ItemHoodFoxyMask",
									"ItemHoodFuturisticHelmet",
									"ItemHoodGasMask",
									"ItemHoodGGTSHelmet",
									"ItemHoodGP9GasMask",
									"ItemHoodGwenHood",
									"ItemHoodHarnessCatMask",
									"ItemHoodInflatableGagMask",
									"ItemHoodKigu2Hood",
									"ItemHoodKirugumiMask",
									"ItemHoodKittyHood",
									"ItemHoodLatexHabit",
									"ItemHoodLatexBunny",
									"ItemHoodLatexDogHood",
									"ItemHoodLatexDogMask",
									"ItemHoodLeatherHood",
									"ItemHoodLeatherHoodOpenEyes",
									"ItemHoodLeatherHoodOpenMouth",
									"ItemHoodLeatherHoodSealed",
									"ItemHoodLeatherHoodSensDep",
									"ItemHoodOldGasMask",
									"ItemHoodOpenFaceHood",
									"ItemHoodOpenMouthPlugHood",
									"ItemHoodPantyHood",
									"ItemHoodPantyhose",
									"ItemHoodPonyHood",
									"ItemHoodRubberMask",
									"ItemHoodSensoryDeprivationHood",
									"ItemHoodSpaceMask",
									"ItemHoodTechnoHelmet1",
									"ItemHoodVacHood",
									"ItemHoodZipperHood",
								],
							},
						},
					],
				},
				{
					Name: "Bed",
					Key: "b",
					Options: [
						{
							// b0 - None
							Property: {},
						},
						{
							// b1 - Restraints
							Prerequisite: ["OnBed", "NotSuspended", "NotLifted"],
							Property: {
								SetPose: ["LegsClosed", "BackElbowTouch"],
								Difficulty: 10,
								Effect: [E.Freeze],
								Block: ["ItemDevices"],
							},
						},
					],
				},
			],
		}, // InflatableDress
		SteelBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Belt",
					Key: "b",
					Options: [
						{
							// Under clothes
							Property: {},
						},
						{
							// Over clothes
							Property: {
								HideItem: ["ClothAccessoryLeatherBeltCloth"],
								OverridePriority: {
									Belt: 31,
									BDetail: 31,
									Lock: 31,
								},
							},
						},
					],
				},
				{
					Name: "Handcuffs",
					Key: "h",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Front
							Property: {
								Difficulty: 3,
								SetPose: ["BaseUpper"],
								Effect: [E.Block, E.BlockWardrobe],
							},
						},
						{
							// BackBoxTie
							Property: {
								Difficulty: 5,
								SetPose: ["BackBoxTie"],
								Effect: [E.Block, E.BlockWardrobe],
								HideItem: ["ItemArmsWristShackles"],
							},
						},
						{
							// Strict
							Property: {
								Difficulty: 7,
								SetPose: ["BackElbowTouch"],
								Effect: [E.Block, E.BlockWardrobe],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // SteelBelt
	}, // ItemArms
	ItemNeck: {
		ShinySteelCollar: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "NoRing" }, { Name: "Ring" }],
			DrawImages: false,
		}, // ShinySteelCollar
		TechnoCollar: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "CollarType",
					Key: "c",
					Options: [
						{}, // c0 Slender Collar
						{
							Property: {
								Difficulty: 65,
							},
						}, //c1 Choker Collar
						{
							Property: {
								Difficulty: 70,
							},
						}, //c2 Full Collar
						{
							Property: {
								Difficulty: 75,
							},
						}, //c3 Posture Collar
						{
							Property: {
								Difficulty: 80,
							},
						}, //c4 Strict Posture Collar
					],
				},
				{
					Name: "ShockModule",
					Key: "s",
					DrawImages: false,
					Options: [
						{ Property: { ShockLevel: 0 } },
						{ Property: { ShockLevel: 1 } },
						{ Property: { ShockLevel: 2 } },
					],
				},
			],
			DrawData: {
				elementData: [
					{}, // CollarType
					{
						imagePath:
							"Screens/Inventory/ItemArms/PrisonLockdownSuit/ShockModule.png",
					}, // ShockModule
				],
			},
			BaselineProperty: { TriggerCount: 0, ShowText: true },
			ScriptHooks: {
				Click: InventoryItemArmsPrisonLockdownSuitClickHook,
				Draw: InventoryItemArmsPrisonLockdownSuitDrawHook,
			},
			DrawImages: true,
		}, //TechnoCollar
		ComboHarness: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "BallGag", GroupName: "ItemMouth" },
		}, // ComboHarness
		BonedNeckCorset: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "NoRing" }, { Name: "Ring" }],
		}, // BonedNeckCorset
		ShockCollar: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarShockUnit",
			},
			DialogPrefix: {
				Header: "ItemNeckAccessoriesCollarShockUnitSelect",
				Option: "ItemNeckAccessoriesCollarShockUnit",
				Chat: "ItemNeckAccessoriesCollarShockUnitSet",
				Npc: "ItemNeckAccessoriesCollarShockUnit",
			},
		}, // ShockCollar
		AutoShockCollar: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarAutoShockUnit",
			},
			DialogPrefix: {
				Header: "ItemNeckAccessoriesCollarAutoShockUnitSelect",
				Module: "ItemNeckAccessoriesCollarAutoShockUnitModule",
				Option: "ItemNeckAccessoriesCollarAutoShockUnitOption",
				Chat: "ItemNeckAccessoriesCollarAutoShockUnitSet",
			},
		}, // AutoShockCollar
		PetSuitShockCollar: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			DrawImages: false,
			Modules: [
				{
					DrawImages: false,
					Name: "ShockModule",
					Key: "s",
					Options: [
						{}, // 0 - disabled
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.NOARCH,
								ScriptHooks: {
									Draw: InventoryItemNeckPetSuitShockCollars1DrawHook,
									Click: InventoryItemNeckPetSuitShockCollars1ClickHook,
								},
								DialogPrefix: {
									Header: "ShockLevel",
								},
							},
						}, // 1 - enabled
					],
				},
			],
			ChangeWhenLocked: false,
			BaselineProperty: {
				TriggerCount: 0,
				ShowText: true,
				BlinkState: false,
				ShockLevel: 0,
				PunishActivity: false,
				PunishStandup: false,
				PunishStruggle: false,
			},
		}, // PetSuitShockCollar
		ExtendablePostureCollar: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Style",
					Key: "s",
					Options: [
						{}, // s0 - Black
						{}, // s1 - Micro
					],
				},
				{
					Name: "Hood",
					Key: "h",
					DrawData: {
						elementData: [
							{ position: [1375, 450, 250, 58] },
							{ position: [1248, 532, 250, 58] },
							{ position: [1522, 532, 250, 58] },
							{ position: [1248, 610, 250, 58] },
							{ position: [1522, 610, 250, 58] },
							{ position: [1248, 688, 250, 58] },
							{ position: [1522, 688, 250, 58] },
							{ position: [1248, 766, 250, 58] },
							{ position: [1522, 766, 250, 58] },
							{ position: [1248, 844, 250, 58] },
							{ position: [1522, 844, 250, 58] },
						],
						itemsPerPage: 11,
					},
					Options: [
						{}, // h0 - None
						{}, // h1 - Normal
						{
							Property: {
								Hide: ["HairFront", "HairBack"],
							},
						}, // h2 - Normal (no hair)
						{}, // h3 - Round
						{
							Property: {
								Hide: ["HairFront", "HairBack"],
							},
						}, // h4 - Round (no hair)
						{}, // h5 - Small
						{
							Property: {
								Hide: ["HairFront", "HairBack"],
							},
						}, // h6 - Small (no hair)
						{}, // h7 - Wide
						{
							Property: {
								Hide: ["HairFront", "HairBack"],
							},
						}, // h8 - Wide (no hair)
						{
							Property: {
								Tint: [{ Color: 0x000, Strength: 0.1 }],
							},
						}, // h9 - Grided
						{
							Property: {
								Hide: ["HairFront", "HairBack"],
								Tint: [{ Color: 0x000, Strength: 0.1 }],
							},
						}, // h10 - Grided (no hair)
					],
				},
				{
					Name: "Gag",
					Key: "g",
					Options: [
						{}, // g0 - None
						{}, // g1 - Panel
						{
							Property: {
								Effect: [E.GagMedium],
							},
						}, // g2 - Ballgag
					],
				},
				{
					Name: "Cover",
					Key: "c",
					Options: [
						{}, // c0 - None
						{}, // c1 - Low
						{
							Property: {
								Effect: ["BlindLight"],
							},
						}, // c2 - Med
						{
							Property: {
								Effect: ["BlindHeavy"],
							},
						}, // c3 - High
						{
							Property: {
								Effect: ["BlindTotal"],
							},
						}, // c4 - Full
					],
				},
			],
		},
		FuturisticCollar: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Load: InventoryItemNeckFuturisticCollarLoadHook,
				Draw: InventoryItemNeckFuturisticCollarDrawHook,
				Click: InventoryItemNeckFuturisticCollarClickHook,
				Exit: InventoryItemNeckFuturisticCollarExitHook,
				Validate: FuturisticAccessValidate,
			},
			BaselineProperty: {
				OpenPermission: false,
				OpenPermissionChastity: false,
				OpenPermissionArm: false,
				OpenPermissionLeg: false,
				BlockRemotes: false,
			},
			AllowEffect: [
				E.BlockRemotes,
				E.OpenPermission,
				E.OpenPermissionArm,
				E.OpenPermissionLeg,
				E.OpenPermissionChastity,
			],
		}, // FuturisticCollar
		SlaveCollar: {
			Archetype: ExtendedArchetype.NOARCH,
			DialogPrefix: {
				Header: "SlaveCollarSelectType",
			},
			ScriptHooks: {
				Load: InventoryItemNeckSlaveCollarLoadHook,
				Draw: InventoryItemNeckSlaveCollarDrawHook,
				Click: InventoryItemNeckSlaveCollarClickHook,
			},
			BaselineProperty: {
				TypeRecord: { noarch: 0 },
			},
			AllowEffect: [E.GagNormal, E.FixedHead],
		}, // SlaveCollar
		AsylumCollar: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Normal",
					Property: { Effect: [] },
				},
				{
					Name: "Padded",
					Property: { Effect: [E.FixedHead], Difficulty: 10 },
				},
			],
		}, // AsylumCollar
		ChainCollar: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "LockBodyHeart" }, { Name: "LockBodyPlain" }],
		}, // ChainCollar
		SteampunkCollar: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Straps",
					Key: "t",
					Options: [
						{}, // t0 - No straps
						{
							// t1 - Straps added
							Property: { Difficulty: 5 },
						},
					],
				},
				{
					Name: "Gag",
					Key: "g",
					Options: [
						{}, // g0 - No gag
						{
							// g1 - Ball gag
							Prerequisite: ["GagUnique", "AccessMouth"],
							Expression: [
								{ Name: "Open", Group: "Mouth", Timer: 15 },
								{ Name: "Low", Group: "Blush", Timer: 15 },
								{ Name: "DroolLow", Group: "Fluids", Timer: 15 },
							],
							Property: {
								Difficulty: 4,
								Effect: [E.GagLight, E.BlockMouth],
							},
						},
						{
							// g2 - Ring gag
							Prerequisite: ["GagUnique", "AccessMouth"],
							Expression: [
								{ Name: "Open", Group: "Mouth", Timer: 15 },
								{ Name: "Low", Group: "Blush", Timer: 15 },
								{ Name: "DroolLow", Group: "Fluids", Timer: 15 },
							],
							Property: {
								Difficulty: 4,
								Effect: [E.GagEasy, E.OpenMouth],
							},
						},
						{
							// g3 - Pussy gag
							Prerequisite: ["GagUnique", "AccessMouth"],
							Expression: [
								{ Name: "Open", Group: "Mouth", Timer: 15 },
								{ Name: "Low", Group: "Blush", Timer: 15 },
								{ Name: "DroolLow", Group: "Fluids", Timer: 15 },
							],
							Property: {
								Difficulty: 4,
								Effect: [E.GagNormal, E.OpenMouth],
							},
						},
						{
							// g4 - Inflatable gag - light
							Prerequisite: ["GagUnique", "AccessMouth"],
							Expression: [
								{ Name: "Open", Group: "Mouth", Timer: 15 },
								{ Name: "Low", Group: "Blush", Timer: 15 },
							],
							Property: {
								Difficulty: 2,
								Effect: [E.GagLight, E.BlockMouth],
							},
						},
						{
							// g5 - Inflatable gag - inflated
							Prerequisite: ["GagUnique", "AccessMouth"],
							Expression: [
								{ Name: "Open", Group: "Mouth", Timer: 15 },
								{ Name: "Medium", Group: "Blush", Timer: 15 },
								{ Name: "DroolLow", Group: "Fluids", Timer: 15 },
							],
							Property: {
								Difficulty: 4,
								Effect: [E.GagNormal, E.BlockMouth],
							},
						},
						{
							// g6 - Inflatable gag - bloated
							Prerequisite: ["GagUnique", "AccessMouth"],
							Expression: [
								{ Name: "Open", Group: "Mouth", Timer: 15 },
								{ Name: "High", Group: "Blush", Timer: 15 },
								{ Name: "DroolHigh", Group: "Fluids", Timer: 15 },
							],
							Property: {
								Difficulty: 4,
								Effect: [E.GagHeavy, E.BlockMouth],
							},
						},
					],
				},
				{
					Name: "Spike",
					Key: "s",
					Options: [
						{}, // s0 - No spike collar
						{
							// s1 - Spike collar
							Expression: [{ Name: "Frown", Group: "Mouth", Timer: 15 }],
							Property: {
								Difficulty: 6,
							},
						},
						{
							// s2 - Spike collar higher priority
							Expression: [{ Name: "Frown", Group: "Mouth", Timer: 15 }],
							Property: {
								Difficulty: 6,
								OverridePriority: { Spike: 41, SLock: 41, Ring: 41 },
							},
						},
					],
				},
				{
					Name: "Cover",
					Key: "c",
					Options: [
						{}, // c0 - No cover
						{
							// c1 - Leather cover
							Expression: [{ Name: "Low", Group: "Blush", Timer: 15 }],
							Property: {
								Difficulty: 2,
								Effect: [E.BlockMouth],
							},
						},
						{
							// c2 - Spiked semi-sphere cover
							Expression: [{ Name: "Low", Group: "Blush", Timer: 15 }],
							Property: {
								Difficulty: 3,
								Effect: [E.BlockMouth],
								AllowActivity: ["RubItem", "Scratch"],
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// c3 - Dildo cover
							Expression: [{ Name: "Low", Group: "Blush", Timer: 15 }],
							Property: {
								Difficulty: 3,
								OverridePriority: { Cover: 46 },
								Effect: [E.BlockMouth],
								AllowActivity: [
									"RubItem",
									"SpankItem",
									"MasturbateItem",
									"PenetrateItem",
								],
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
					],
				},
			],
		}, // SteampunkCollar
	}, // ItemNeck
	ItemNeckAccessories: {
		CustomCollarTag: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Tag",
					Key: "t",
					Options: [{}, {}, {}, {}, {}, {}],
				},
				{
					Name: "Txt",
					Key: "x",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 9 },
								Font: "sans-serif",
								ScriptHooks: {
									AfterDraw:
										AssetsItemNeckAccessoriesCustomCollarTagAfterDrawHook,
								},
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
			BaselineProperty: { Text: "Tag" },
		}, // CustomCollarTag
		CollarNameTag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{ Name: "Blank" },
				{ Name: "Angel" },
				{ Name: "BadGirl" },
				{ Name: "BindMe" },
				{ Name: "Bitch" },
				{ Name: "Boobs" },
				{ Name: "Cupcake" },
				{ Name: "Devil" },
				{ Name: "Dom" },
				{ Name: "Free" },
				{ Name: "FuckMe" },
				{ Name: "GagMe" },
				{ Name: "Goddess" },
				{ Name: "GoodGirl" },
				{ Name: "HoldMe" },
				{ Name: "Jewel" },
				{ Name: "Love" },
				{ Name: "Maid" },
				{ Name: "Meat" },
				{ Name: "Miss" },
				{ Name: "Mummy" },
				{ Name: "Nice" },
				{ Name: "Needy" },
				{ Name: "Owned" },
				{ Name: "Precious" },
				{ Name: "Pudding" },
				{ Name: "Queen" },
				{ Name: "Slave" },
				{ Name: "Slut" },
				{ Name: "Sub" },
				{ Name: "Sweetie" },
				{ Name: "Taken" },
				{ Name: "Toy" },
				{ Name: "Useless" },
				{ Name: "UseMe" },
				{ Name: "Whore" },
			],
			DrawData: InventoryItemNeckAccessoriesCollarNameTagGetDrawData(36),
			ScriptHooks: {
				PublishAction:
					InventoryItemNeckAccessoriesCollarNameTagPublishActionHook,
			},
			DrawImages: false,
			ChangeWhenLocked: false,
			ChatSetting: TypedItemChatSetting.SILENT,
		}, // CollarNameTag
		CollarNameTagOval: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarNameTag",
			},
			Options: [
				{ Name: "Blank" },
				{ Name: "AnalSlut" },
				{ Name: "Babe" },
				{ Name: "Bandit" },
				{ Name: "Bimbo" },
				{ Name: "Bratty" },
				{ Name: "ButtSlut" },
				{ Name: "Chair" },
				{ Name: "Chaste" },
				{ Name: "Crazy" },
				{ Name: "Cumslut" },
				{ Name: "Cutie" },
				{ Name: "Damsel" },
				{ Name: "Doll" },
				{ Name: "EdgeMe" },
				{ Name: "Evil" },
				{ Name: "ForSale" },
				{ Name: "Greedy" },
				{ Name: "Happy" },
				{ Name: "Horny" },
				{ Name: "Kinky" },
				{ Name: "Lady" },
				{ Name: "LockMe" },
				{ Name: "Nude" },
				{ Name: "Nurse" },
				{ Name: "Nympho" },
				{ Name: "Painslut" },
				{ Name: "Pillow" },
				{ Name: "Punish" },
				{ Name: "Robber" },
				{ Name: "Sad" },
				{ Name: "Switch" },
				{ Name: "Table" },
				{ Name: "Ticklish" },
				{ Name: "Undress" },
				{ Name: "Victim" },
				{ Name: "Violent" },
				{ Name: "Worm" },
			],
			DrawData: InventoryItemNeckAccessoriesCollarNameTagGetDrawData(38),
		}, // CollarNameTagOval
		CollarNameTagPet: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarNameTag",
			},
			Options: [
				{ Name: "Blank" },
				{ Name: "Bunny" },
				{ Name: "Cat" },
				{ Name: "Dog" },
				{ Name: "Foxy" },
				{ Name: "Kitten" },
				{ Name: "Kitty" },
				{ Name: "Mochi" },
				{ Name: "Panda" },
				{ Name: "Pet" },
				{ Name: "PetMe" },
				{ Name: "Pixie" },
				{ Name: "Pony" },
				{ Name: "Puppy" },
				{ Name: "Racoon" },
				{ Name: "Sloth" },
				{ Name: "Mummy" },
			],
			DrawData: InventoryItemNeckAccessoriesCollarNameTagGetDrawData(17),
		}, // CollarNameTagPet
		CollarNameTagLover: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarNameTag",
			},
			Options: [
				{ Name: "Blank" },
				{ Name: "Cookie" },
				{ Name: "Feather" },
				{ Name: "Lover" },
				{ Name: "Muffin" },
			],
			DrawData: InventoryItemNeckAccessoriesCollarNameTagGetDrawData(5),
		}, // CollarNameTagLover
		CollarNameTagLivestock: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarNameTag",
			},
			Options: [
				{ Name: "Blank" },
				{ Name: "Animal" },
				{ Name: "BreedMe" },
				{ Name: "Cow" },
				{ Name: "Meat" },
				{ Name: "MilkMe" },
				{ Name: "Pig" },
			],
			DrawData: InventoryItemNeckAccessoriesCollarNameTagGetDrawData(7),
		}, // CollarNameTagLivestock
		CollarShockUnit: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.ASSET_NAME,
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
			],
			Options: [
				{ Name: "Low", Property: { ShockLevel: 0 } },
				{ Name: "Medium", Property: { ShockLevel: 1 } },
				{ Name: "High", Property: { ShockLevel: 2 } },
			],
			ScriptHooks: {
				Draw: InventoryItemNeckAccessoriesCollarShockUnitDrawHook,
				Click: InventoryItemNeckAccessoriesCollarShockUnitClickHook,
				BeforeDraw: AssetsItemNeckAccessoriesCollarShockUnitBeforeDrawHook,
				ScriptDraw: AssetsItemNeckAccessoriesCollarShockUnitScriptDrawHook,
			},
			DrawImages: false,
			BaselineProperty: { TriggerCount: 0, ShowText: true, BlinkState: false },
		}, // CollarShockUnit
		CollarAutoShockUnit: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.ASSET_NAME,
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
			],
			Modules: [
				{
					Name: "ShockLevel",
					Key: "s",
					DrawImages: false,
					Options: [
						{ Property: { ShockLevel: 0 } }, // s0 - Level 1
						{ Property: { ShockLevel: 1 } }, // s1 - Level 2
						{ Property: { ShockLevel: 2 } }, // s2 - Level 3
					],
				},
				{
					Name: "AutoPunish",
					Key: "y",
					DrawImages: false,
					Options: [
						{ Property: { AutoPunish: 0 } }, // y0 - Off
						{ Property: { AutoPunish: 1 } }, // y1 - Low
						{ Property: { AutoPunish: 2 } }, // y2 - Medium
						{ Property: { AutoPunish: 3 } }, // y3 - High
					],
				},
			],
			ScriptHooks: {
				Draw: InventoryItemNeckAccessoriesCollarAutoShockUnitDrawHook,
				Click: InventoryItemNeckAccessoriesCollarAutoShockUnitClickHook,
				BeforeDraw: AssetsItemNeckAccessoriesCollarAutoShockUnitBeforeDrawHook,
				ScriptDraw: AssetsItemNeckAccessoriesCollarAutoShockUnitScriptDrawHook,
			},
			BaselineProperty: { TriggerCount: 0, ShowText: true, BlinkState: false },
		}, // CollarAutoShockUnit
		ElectronicTag: {
			Archetype: ExtendedArchetype.TEXT,
			MaxLength: { Text: 9 },
			Font: "sansserif",
			ScriptHooks: {
				AfterDraw: AssetsItemNeckAccessoriesElectronicTagAfterDrawHook,
			},
		}, // ElectronicTag
	}, // ItemNeckAccessories
	ItemNeckRestraints: {
		PetPost: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Plaque",
					Key: "p",
					Options: [
						{}, //p0 - Border
						{}, //p1 - Border
					],
				},
				{
					Name: "Dirt",
					Key: "d",
					Options: [
						{}, //d0 - Clean
						{}, //d1 - Dirty
					],
				},
				{
					Name: "Leash",
					Key: "l",
					Options: [
						{}, //l0 - Leash
						{ Property: { Difficulty: 5 } }, //l1 - Rope
						{ AllowLock: true, Property: { Difficulty: 6 } }, //l2 - Chain
					],
				},
				{
					Name: "Sticker",
					Key: "s",
					Options: [
						{}, //s0 - Paw
						{}, //s1 - Triskel
						{}, //s2 - Moon
						{}, //s3 - LGBT
						{}, //s4 - Trans
						{}, //s5 - Bi
						{}, //s6 - NoSwim
						{}, //s7 - None
					],
				},
				{
					Name: "PostIt",
					Key: "m",
					Options: [
						{}, //m0 - Postit
						{}, //m1 - No PostIt
					],
				},
				{
					Name: "Txt",
					Key: "x",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 14, Text2: 14, Text3: 14 },
								Font: "sans-serif",
								ScriptHooks: {
									AfterDraw: AssetsItemNeckRestraintsPetPostAfterDrawHook,
								},
							},
						}, // text
					],
				},
			],
			ChangeWhenLocked: false,
			BaselineProperty: { Text: "Pet", Text2: "Leashing", Text3: "Post" },
		}, //PetPost
		MCuffCollar: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Handcuffs",
					Key: "h",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Cuffed
							Property: {
								Difficulty: 4,
								SetPose: ["BaseUpper"],
								Effect: [E.BlockWardrobe],
							},
						},
					],
				},
				{
					Name: "Leash",
					Key: "l",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Leashed
							Property: {
								Difficulty: 4,
								Effect: [E.Leash, E.IsLeashed],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // MCuffCollar
	}, //ItemNeckRestraints
	ItemHood: {
		OldGasMask: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Lenses",
					Key: "l",
					Options: [{}, { Property: { Effect: [E.BlindHeavy] } }],
				},
				{
					Name: "Addons",
					Key: "a",
					Options: [
						{},
						{ Property: { Effect: [E.GagEasy] } },
						{ Property: { Effect: [E.GagEasy] } },
						{ Property: { Effect: [E.GagEasy] } },
					],
				},
			],
			ChangeWhenLocked: false,
		},
		InflatedBallHood: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Empty",
					Property: {
						Difficulty: 0,
						InflateLevel: 0,
						Effect: [],
					},
				},
				{
					Name: "Light",
					Property: {
						Difficulty: 2,
						InflateLevel: 1,
						Effect: [E.GagLight],
					},
				},
				{
					Name: "Inflated",
					Property: {
						Difficulty: 4,
						InflateLevel: 2,
						Effect: [E.GagEasy],
					},
				},
				{
					Name: "Bloated",
					Property: {
						Difficulty: 6,
						InflateLevel: 3,
						Effect: [E.GagMedium],
					},
				},
				{
					Name: "Maximum",
					Property: {
						Difficulty: 8,
						InflateLevel: 4,
						Effect: [E.GagVeryHeavy],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectInflateLevel",
				Option: "InflateLevel",
				Chat: ({ newIndex, previousIndex }) =>
					`InflatedHood${newIndex > previousIndex ? "pumps" : "deflates"}To`,
			},
			DrawImages: false,
		}, // InflatedBallHood
		KirugumiMask: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.TARGET_CHAR,
			],
			Modules: [
				{
					Name: "Eyes",
					Key: "e",
					Options: [{}, {}, {}, {}], // All options are merely cosmetic
				},
				{
					Name: "Mouth",
					Key: "m",
					Options: [{}, {}, {}, {}], // All options are merely cosmetic,
				},
				{
					Name: "Blush",
					Key: "b",
					Options: [{}, {}, {}, {}], // All options are merely cosmetic,
				},
				{
					Name: "Brows",
					Key: "br",
					Options: [{}, {}, {}, {}], // All options are merely cosmetic,
				},
				{
					Name: "Opacity",
					Key: "op",
					Options: [
						{},
						{
							Property: {
								Effect: [E.BlindLight],
							},
						},
						{
							Property: {
								Effect: [E.BlindHeavy, E.BlockWardrobe],
							},
						},
					], // Opacity
				},
				{
					Name: "MaskStyle",
					Key: "ms",
					Options: [
						{
							Property: {
								Effect: [E.BlockMouth],
								Hide: [
									"Glasses",
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"Mask",
									"ItemHead",
								],
								HideItem: ["ItemHeadSnorkel"],
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"ItemNose",
									"ItemEars",
								],
							},
						},
						{
							Property: {
								OverridePriority: 35,
								Hide: ["Head"],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // KirugumiMask
		GwenHood: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.TARGET_CHAR,
			],
			Modules: [
				{
					Name: "Finish",
					Key: "f",
					Options: [
						{}, //Original
						{}, //Smooth
					],
				},
				{
					Name: "Hair",
					Key: "h",
					Options: [
						{
							Property: {
								Hide: [],
							},
						}, //HairOutAccOut
						{
							Property: {
								Hide: ["HairBack"],
							},
						}, //HairInAccOut
						{
							Property: {
								Hide: ["HairAccessory1", "HairAccessory2", "HairAccessory3"],
							},
						}, //HairOutAccIn
						{
							Property: {
								Hide: [
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
									"HairBack",
								],
							},
						}, //HairInAccIn
					],
				},
			],
			DialogPrefix: {
				Header: "GwenHoodSelectStyle",
				Option: "GwenHoodStyle",
				Chat: "GwenHoodChangeStyle",
			},
			DrawImages: false,
		}, // GwenHood
		OpenFaceHood: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "HideBackHair",
					Property: { Hide: ["HairBack"] },
				},
				{
					Name: "ShowBackHair",
					NPCDefault: true,
				},
			],
			DialogPrefix: {
				Header: "SelectOpenFaceHoodStyle",
				Option: "OpenFaceHoodStyle",
			},
			DrawImages: false,
		}, // OpenFaceHood
		TechnoHelmet1: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Visor",
					Key: "v",
					Options: [
						{
							Property: {
								CustomBlindBackground: "",
								Effect: [],
							},
						}, //v0 No Visor
						{
							Property: {
								CustomBlindBackground: "",
								Effect: [],
								Tint: [{ Color: 0, Strength: 0.1 }],
							},
						}, // v1 Transparent Visor
						{
							Property: {
								CustomBlindBackground: "",
								Effect: [E.BlindLight, E.BlockWardrobe],
								Tint: [{ Color: 0, Strength: 0.2 }],
							},
						}, // v2 Lightly Tinted Visor
						{
							Property: {
								CustomBlindBackground: "",
								Effect: [E.BlindNormal, E.BlockWardrobe],
								Tint: [{ Color: 0, Strength: 0.5 }],
							},
						}, // v3 Heavily Tinted Visor
						{
							Property: {
								CustomBlindBackground: "",
								Effect: [E.BlindHeavy, E.BlockWardrobe],
								Tint: [{ Color: 0, Strength: 1 }],
							},
						}, // v4 Opaque Visor
						{
							Property: {
								CustomBlindBackground: "HypnoSpiral2",
								Effect: [E.BlindHeavy, E.BlockWardrobe],
							},
						}, // v5 Hypnotic Visor
					],
				},
				{
					Name: "DeafeningModule",
					Key: "d",
					Options: [
						{}, //h0 Disabled
						{
							Property: {
								Effect: [E.DeafLight],
							},
						}, //h1 Light
						{
							Property: {
								Effect: [E.DeafHeavy],
							},
						}, //h2 Heavy
						{
							Property: {
								Effect: [E.DeafTotal],
							},
						}, //h3 Noise-Cancelling
					],
				},
				{
					Name: "ChinStrap",
					Key: "c",
					Options: [
						{}, //c0 No Chin Strap
						{
							Property: {
								Difficulty: 10,
							},
						}, //h1 Chin Strap
					],
				},
			],
			ChangeWhenLocked: false,
		}, // TechnoHelmet1
		GGTSHelmet: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "GoodGirl",
				},
				{
					Name: "GoodSlaveGirl",
				},
				{
					Name: "SlaveGirl",
				},
				{
					Name: "PSlaveGirl",
				},
				{
					Name: "PGirl",
				},
			],
			ChangeWhenLocked: false,
		}, // GGTSHelmet
		ZipperHood: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "ZippersOpen",
				},
				{
					Name: "ZippersClosed",
					Property: { Effect: [E.BlindHeavy] },
				},
				{
					Name: "ZippersClosedEyes",
					Property: { Effect: [E.BlindHeavy] },
				},
				{
					Name: "ZippersClosedMouth",
				},
			],
		}, // ZipperHood
		HeadboxSeethrough: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Seethrough",
					Property: {
						Tint: [{ Color: 0, Strength: 1 }],
					},
				},
				{
					Name: "Opaque",
				},
			],
			DrawImages: false,
		}, // HeadboxSeethrough
		KittyHood: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Modules: [
				{
					Name: "Blindfold",
					Key: "b",
					Options: [
						{}, // b0 - None
						{
							Property: {
								Effect: [E.BlindHeavy],
							},
						}, // b1 - Blindfold
					],
				},
				{
					Name: "Gag",
					Key: "g",
					Options: [
						{}, // g0 - None
						{
							Property: {
								Effect: [E.GagLight],
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						}, // g1 - Gag
					],
				},
				{
					Name: "Expression",
					Key: "e",
					Options: [
						{}, // e0 - Neutral
						{}, // e1 - OwO
						{}, // e2 - UwU
					],
				},
				{
					Name: "Tightness",
					Key: "t",
					Options: [{}, {}], // t0 - Loose, t1 - Tight
				},
			],
		}, //KittyHood
		DroneMask: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemHead", AssetName: "DroneMask" },
			Modules: [
				{
					Name: "Mouth",
					Key: "m",
					Options: [
						{
							// m0 - None
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m1 - Onahole
							Property: { Effect: [E.GagMedium, E.OpenMouth] },
						},
						{
							// m2 - Fleshlight
							Property: { Effect: [E.GagMedium, E.OpenMouth] },
						},
						{
							// m3 - Smile
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m4 - Holes
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m5 - Sculpted
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m6 - Subtle
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m7 - Thin
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m8 - Thin Oh
							Property: { Effect: [E.BlockMouth] },
						},
					],
				},
				{
					Name: "Eyes",
					Key: "e",
					Options: [
						{
							// e0 - None
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e1 - Regular
							Property: { Effect: [] },
						},
						{
							// e2 - Spiral
							Property: { Effect: [] },
						},
						{
							// e3 - Smile
							Property: { Effect: [] },
						},
						{
							// e4 - Holes
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e5 - Sculpted
							Property: { Effect: [] },
						},
						{
							// e6 - Concave
							Property: { Effect: [E.BlindLight] },
						},
					],
				},
				{
					Name: "Pattern",
					Key: "p",
					Options: [
						{}, // Blank
						{}, // Barcode
						{}, // Scarab
						{}, // Hex
						{}, // Lines
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 16 },
								Font: "Impact",
								ScriptHooks: {
									AfterDraw: AssetsItemHeadDroneMaskAfterDrawHook,
								},
							},
							Property: {
								HideItem: ["ItemHeadDroneMask"],
							},
						}, // text
						{}, // Machine
						{}, // Fishnet
						{}, // Hexpattern
						{}, // Large Circle
						{}, // Large Split Circle
						{}, // Large Heart
						{}, // Large Stylized Heart
						{}, // Small Heart
						{}, // Lock
						{}, // Large X
					],
				},
				{
					Name: "Glow",
					Key: "g",
					Options: [{}, {}, {}, {}], // Glow Off, Glow Eyes, Mouth On, Glow Pattern On, Glow On
				},
				{
					Name: "Sight",
					Key: "s",
					Options: [
						{
							// s0 - Opaque
							Property: { Effect: [E.BlindHeavy, E.BlockWardrobe] },
						},
						{
							// s1 - One Way
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Helmet",
					Key: "h",
					Options: [
						{}, // h0 - Mask
						{
							Property: {
								Hide: ["HairFront", "HairBack"], //"HairAccessory1", "HairAccessory2"],
								HideItem: [
									"HatBonnet1",
									"HatBonnet2",
									"HatBunnySuccubus2",
									"HatCrown1",
									"HatCrown2",
									"HatCrown4",
									"HatCrown5",
									"HatBand1",
									"HatBand2",
									"HatPirateBandana1",
									"HatVeil1",
									"HatVeil2", // Hat items
									"MaskFuturisticVisor",
									"MaskShinobiMask", // Mask items
									"HairAccessory3Ribbons4", // HairAccessory items
									"HairAccessory1Antennae",
									"HairAccessory1BunnyEars1",
									"HairAccessory1BunnyEars2",
									"HairAccessory1CowHorns",
									"HairAccessory1ElfEars",
									"HairAccessory1Ears1",
									"HairAccessory1Ears2",
									"HairAccessory1FoxEars1",
									"HairAccessory1FoxEars2",
									"HairAccessory1FoxEars3",
									"HairAccessory1KittenEars1",
									"HairAccessory1KittenEars2",
									"HairAccessory1MouseEars1",
									"HairAccessory1MouseEars2",
									"HairAccessory1PuppyEars1",
									"HairAccessory1Ribbons2",
									"HairAccessory1WolfEars1",
									"HairAccessory1WolfEars2",
									"HairAccessory1Ribbons4", // Ear items (HA1)
									"HairAccessory2Antennae",
									"HairAccessory2BunnyEars1",
									"HairAccessory2BunnyEars2",
									"HairAccessory2CowHorns",
									"HairAccessory2ElfEars",
									"HairAccessory2Ears1",
									"HairAccessory2Ears2",
									"HairAccessory2FoxEars1",
									"HairAccessory2FoxEars2",
									"HairAccessory2FoxEars3",
									"HairAccessory2KittenEars1",
									"HairAccessory2KittenEars2",
									"HairAccessory2MouseEars1",
									"HairAccessory2MouseEars2",
									"HairAccessory2PuppyEars1",
									"HairAccessory2Ribbons2",
									"HairAccessory2WolfEars1",
									"HairAccessory2WolfEars2", // Ear items (HA2)
								], // These items are hidden because they have clear mismatch issues with the hood.
							},
						}, // h1 - Helmet (hood)
						{
							// h2 - Helmet ( hood but nothing shows)
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"Hat",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
								],
								HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
							},
						},
					],
				},
				{
					Name: "Layering",
					Key: "j",
					Options: [
						{
							Property: {
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemHead"],
								Hide: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"Glasses",
								],
							},
						}, // No gags or blindfolds visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2", "ItemHead"],
								Hide: ["ItemMouth", "ItemMouth2", "ItemHead", "Glasses"],
							},
						}, // Highest layer gag visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemHead"],
								Hide: ["ItemHead", "Glasses"],
							},
						}, // All gags visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
								Hide: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						}, // Blindfold items visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2"],
								Hide: ["ItemMouth", "ItemMouth2"],
							},
						}, // Blindfold and highest layer gag
						{
							Property: {
								OverridePriority: 12,
								Block: [],
								Hide: [],
							},
						}, // Blindfold and all gags
					],
				},
				{
					Name: "Visibility",
					Key: "b",
					Options: [
						{
							Property: {
								Hide: ["Blush"],
								HideItem: [
									"HatFacePaint",
									"MaskFacePaint",
									"ClothAccessoryFacePaint",
								],
							},
						},
						{
							Property: {
								Hide: [],
								HideItem: [],
							},
						},
					],
				},
			],
		}, // DroneMask
		CustomLatexHood: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "MPanel",
					Key: "m",
					DrawImages: true,
					Options: [
						{
							// m0 - No Mouth
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m1 - Hole Only
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m2 - Round Mouth
							Property: { Effect: [E.OpenMouth] },
						},
						{
							// m3 - Shaped Mouth
							Property: { Effect: [E.OpenMouth] },
						},
						{
							// m4 - No Mouth Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m5 - Hole Only Transparent
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m6 - Round Mouth Transparent
							Property: { Effect: [E.OpenMouth] },
						},
						{
							// m7 - Shaped Mouth Transparent
							Property: { Effect: [E.OpenMouth] },
						},
						{
							// m8 - Round Mouth Opaque, filled Opaque
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m9 - Round Mouth Opaque, filled Opaque + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m10 - Round Mouth Opaque, filled Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m11 - Round Mouth Opaque, filled Transparent + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m12 - Shaped Mouth Opaque, filled Opaque
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m13 - Shaped Mouth Opaque, filled Opaque + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m14 - Shaped Mouth Opaque, filled Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m15 - Shaped Mouth Opaque, filled Transparent + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m16 - Round Mouth Transparent, filled Opaque
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m17 - Round Mouth Transparent, filled Opaque + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m18 - Round Mouth Transparent, filled Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m19 - Round Mouth Transparent, filled Transparent + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m20 - Shaped Mouth Transparent, filled Opaque
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m21 - Shaped Mouth Transparent, filled Opaque + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m22 - Shaped Mouth Transparent, filled Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m23 - Shaped Mouth Transparent, filled Transparent + pinhole
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m24 - Open
							Property: { Effect: [] },
						},
						{
							// m25 - Fishnet Mouth
							Property: {
								Effect: [E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m26 - Circle Mouth
							Property: { Effect: [E.OpenMouth] },
						},
						{
							// m27 - Circle Mouth Transparent
							Property: { Effect: [E.OpenMouth] },
						},
						{
							// m28 - Circle Mouth Opaque, filled Opaque
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m29 - Circle Mouth Transparent, filled Opaque
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m30 - Circle Mouth Opaque, filled Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// m31 - Circle Mouth Transparent, filled Transparent
							Property: {
								Effect: [E.GagEasy, E.BlockMouth],
								OverridePriority: {
									PanelHead: 38,
									PanelHeadTransparent: 38,
									PanelHeadHighlight: 38,
									PanelHeadS: 38,
									PanelHeadTransparentS: 38,
									PanelHeadHighlightS: 38,
									PanelHeadN: 38,
									PanelHeadTransparentN: 38,
									PanelHeadHighlightN: 38,
									PanelNoEye: 38,
									PanelNoEyeTransparent: 38,
									PanelHoleNoEye: 38,
									PanelHoleNoEyeTransparent: 38,
									PanelNoEyeHighlight: 38,
									PanelRoundEye: 38,
									PanelRoundEyeTransparent: 38,
									PanelRoundEyeHighlight: 38,
									PanelShapedEye: 38,
									PanelShapedEyeTransparent: 38,
									PanelShapedEyeHighlight: 38,
									PanelCircleEye: 38,
									PanelCircleEyeTransparent: 38,
									PanelCircleEyeHighlight: 38,
									FillRoundEye: 38,
									FillRoundEyeTransparent: 38,
									FillHoleRoundEye: 38,
									FillHoleRoundEyeTransparent: 38,
									FillRoundEyeHighlight: 38,
									FillShapedEye: 38,
									FillShapedEyeTransparent: 38,
									FillHoleShapedEye: 38,
									FillHoleShapedEyeTransparent: 38,
									FillShapedEyeHighlight: 38,
									FillCircleEye: 38,
									FillCircleEyeTransparent: 38,
									PanelNoMouth: 38,
									PanelNoMouthTransparent: 38,
									PanelHoleNoMouth: 38,
									PanelHoleNoMouthTransparent: 38,
									PanelNoMouthHighlight: 38,
									PanelRoundMouth: 38,
									PanelRoundMouthTransparent: 38,
									PanelRoundMouthHighlight: 38,
									PanelShapedMouth: 38,
									PanelShapedMouthTransparent: 38,
									PanelShapedMouthHighlight: 38,
									PanelFishnetMouth: 38,
									PanelCircleMouth: 38,
									PanelCircleMouthTransparent: 38,
									PanelCircleMouthHighlight: 38,
									FillRoundMouth: 38,
									FillRoundMouthTransparent: 38,
									FillHoleRoundMouth: 38,
									FillHoleRoundMouthTransparent: 38,
									FillShapedMouth: 38,
									FillShapedMouthTransparent: 38,
									FillHoleShapedMouth: 38,
									FillHoleShapedMouthTransparent: 38,
									FillCircleMouth: 38,
									FillCircleMouthTransparent: 38,
									LiningRoundFace: 38,
									LiningRoundFaceHighlight: 38,
									LiningCrossFace: 38,
									LiningCrossFaceHighlight: 38,
									LiningRoundEye: 38,
									LiningRoundEyeHighlight: 38,
									LiningShapedEye: 38,
									LiningShapedEyeHighlight: 38,
									LiningRoundMouth: 38,
									LiningShapedMouth: 38,
									LiningCircleEye: 38,
									LiningCircleEyeHighlight: 38,
									LiningCircleMouth: 38,
								},
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
					],
				},
				{
					Name: "EPanel",
					Key: "e",
					DrawImages: true,
					Options: [
						{
							// e0 - No Eyes
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e1 - Hole Only
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e2 - Round Eyes
							Property: { Effect: [] },
						},
						{
							// e3 - Shaped Eyes
							Property: { Effect: [] },
						},
						{
							// e4 - No Eyes Transparent
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e5 - Hole Only Transparent
							Property: { Effect: [] },
						},
						{
							// e6 - Round Eyes Transparent
							Property: { Effect: [] },
						},
						{
							// e7 - Shaped Eyes Transparent
							Property: { Effect: [] },
						},
						{
							// e8 - Round Eyes Opaque, filled Opaque
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e9 - Round Eyes Opaque, filled Opaque + pinhole
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e10 - Round Eyes Opaque, filled Transparent
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e11 - Round Eyes Opaque, filled Transparent + pinhole
							Property: { Effect: [] },
						},
						{
							// e12 - Shaped Eyes Opaque, filled Opaque
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e13 - Shaped Eyes Opaque, filled Opaque + pinhole
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e14 - Shaped Eyes Opaque, filled Transparent
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e15 - Shaped Eyes Opaque, filled Transparent + pinhole
							Property: { Effect: [] },
						},
						{
							// e16 - Round Eyes Transparent, filled Opaque
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e17 - Round Eyes Transparent, filled Opaque + pinhole
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e18 - Round Eyes Transparent, filled Transparent
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e19 - Round Eyes Transparent, filled Transparent + pinhole
							Property: { Effect: [] },
						},
						{
							// e20 - Shaped Eyes Transparent, filled Opaque
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e21 - Shaped Eyes Transparent, filled Opaque + pinhole
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e22 - Shaped Eyes Transparent, filled Transparent
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e23 - Shaped Eyes Transparent, filled Transparent + pinhole
							Property: { Effect: [] },
						},
						{
							// e24 - Circle Eyes
							Property: { Effect: [] },
						},
						{
							// e25 - Circle Eyes Transparent
							Property: { Effect: [] },
						},
						{
							// e26 - Circle Eyes Opaque, filled Opaque
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e27 - Circle Eyes Opaque, filled Transparent
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e28 - Circle Eyes Transparent, filled Opaque
							Property: { Effect: [E.BlindHeavy] },
						},
						{
							// e29 - Circle Eyes Transparent, filled Transparent
							Property: { Effect: [E.BlindLight] },
						},
					],
					DrawData: {
						elementData: [
							{ position: ExtendedXY[8][0] },
							{ position: ExtendedXY[8][1] },
							{ position: ExtendedXY[8][2] },
							{ position: ExtendedXY[8][3] },
							{ position: ExtendedXY[8][4] },
							{ position: ExtendedXY[8][5] },
							{ position: ExtendedXY[8][6] },
							{ position: ExtendedXY[8][7] },
							{ position: ExtendedXY[8][0] },
							{ position: ExtendedXY[8][1] },
							{ position: ExtendedXY[8][2] },
							{ position: ExtendedXY[8][3] },
							{ position: ExtendedXY[8][4] },
							{ position: ExtendedXY[8][5] },
							{ position: ExtendedXY[8][6] },
							{ position: ExtendedXY[8][7] },
							{ position: ExtendedXY[8][0] },
							{ position: ExtendedXY[8][1] },
							{ position: ExtendedXY[8][2] },
							{ position: ExtendedXY[8][3] },
							{ position: ExtendedXY[8][4] },
							{ position: ExtendedXY[8][5] },
							{ position: ExtendedXY[8][6] },
							{ position: ExtendedXY[8][7] },
							{ position: ExtendedXY[8][0] },
							{ position: ExtendedXY[8][1] },
							{ position: ExtendedXY[8][2] },
							{ position: ExtendedXY[8][3] },
							{ position: ExtendedXY[8][4] },
							{ position: ExtendedXY[8][5] },
						],
						itemsPerPage: 8,
					},
				},
				{
					Name: "HeadT",
					Key: "x",
					Options: [{}, {}], // Opaque, Transparent
				},
				{
					Name: "HairShow",
					Key: "h",
					Options: [
						{}, // h0 - Show Hair
						{
							// h1 - Hide Hair
							Property: {
								Hide: ["HairFront", "HairBack"],
								Attribute: ["ShortHair"],
							},
						},
						{
							// h2 - Show Back Hair
							Property: {
								Hide: ["HairFront"],
								Attribute: ["ShortHair"],
							},
						},
						{
							// h3 - Hide Hair and Accessories
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
								],
								Attribute: ["ShortHair"],
							},
						},
					],
				},
				{
					Name: "ZHood",
					Key: "z",
					Options: [
						{
							// z0 - None
							Property: { Effect: [] },
						},
						{
							// z1 - Open
							Property: {
								Effect: [],
								Hide: ["HairFront"],
								HideItem: ["MaskOpenFaceHood", "MaskFaceVeil", "MaskFoxMask"],
							},
						},
						{
							// z2 - Closed
							Property: {
								Effect: [E.BlindHeavy, E.GagEasy, E.BlockMouth],
								Hide: ["HairFront", "Mask"],
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"ItemNose",
								],
							},
						},
						{
							// z3 - Open Transparent
							Property: {
								Effect: [],
								Hide: ["HairFront"],
								HideItem: ["MaskOpenFaceHood", "MaskFaceVeil", "MaskFoxMask"],
							},
						},
						{
							// z4 - Closed Transparent
							Property: {
								Effect: [E.BlindLight, E.GagEasy, E.BlockMouth],
								Hide: ["HairFront"],
								HideItem: ["MaskOpenFaceHood", "MaskFaceVeil", "MaskFoxMask"],
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"ItemNose",
								],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
			DrawImages: false,
		}, // CustomLatexHood
		HarnessCatMask: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "NoEars" }, { Name: "Ears" }],
			ChangeWhenLocked: false,
		}, // HarnessCatMask
		InflatableGagMask: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Lenses",
					Key: "l",
					Options: [
						{
							Property: { Effect: [] },
						},
						{
							Property: {
								Effect: [E.BlindLight],
								Tint: [{ Color: 2, Strength: 0.2 }],
							},
						},
						{
							Property: { Effect: [E.BlindHeavy] },
						},
					],
				},
				{
					Name: "GagLevel",
					Key: "g",
					Options: [
						{ Property: { Effect: [E.BlockMouth] } },
						{ Property: { Effect: [E.BlockMouth, E.GagLight] } },
						{ Property: { Effect: [E.BlockMouth, E.GagMedium] } },
						{ Property: { Effect: [E.BlockMouth, E.GagVeryHeavy] } },
					],
				},
				{
					Name: "Hair",
					Key: "h",
					Options: [
						{ Property: { Hide: ["HairBack"] } },
						{ Property: { Hide: [] } },
					],
				},
			],
		}, //Inflatable Gag Mask
		BigMouthHood: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{ Name: "Empty", Property: { Effect: [] } },
				{
					Name: "Lenses",
					Property: {
						Effect: [E.BlindLight],
						Tint: [{ Color: 2, Strength: 0.2 }],
					},
				},
				{
					Name: "Mesh",
					Property: {
						Effect: [E.BlindNormal, E.BlockWardrobe],
					},
				},
				{
					Name: "Slim",
					Property: {
						Effect: [E.BlindHeavy, E.BlockWardrobe],
					},
				},
			],
		}, //BigMouthHood
		RubberMask: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Mode",
					Key: "m",
					Options: [
						{
							// "Mask"
							Property: { Effect: [] },
						},
						{
							// "Hood"
							Property: {
								Effect: [E.BlockMouth],
								Hide: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"Mask",
									"ItemHead",
								],
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"ItemNose",
									"ItemEars",
								],
							},
						},
					],
				},
				{
					Name: "Sight",
					Key: "s",
					Options: [
						{
							// "Transparent"
							Property: { Effect: [] },
						},
						{
							// "Lenses"
							Property: {
								Effect: [E.BlindLight],
								Tint: [{ Color: 1, Strength: 0.2 }],
							},
						},
						{
							// "Opaque"
							Property: {
								Effect: [E.BlindNormal, E.BlockWardrobe],
							},
						},
					],
				},
				{
					Name: "Deafness",
					Key: "d",
					Options: [
						{
							// "None"
							Property: { Effect: [] },
						},
						{
							// "Earplug"
							Property: {
								Effect: [E.DeafHeavy],
							},
						},
					],
				},
				{
					Name: "Wig",
					Key: "g",
					Options: [
						{
							// "Normal"
							Property: {
								Hide: ["HairAccessory1", "HairAccessory2"],
								Effect: [],
							},
						},
						{
							// "Wig1"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig2"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig3"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig4"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig5"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig6"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig7"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig8"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig9"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig10"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig11"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig12"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig13"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig14"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig15"
							Property: {
								Hide: [
									"Mask",
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig16"
							Property: {
								Hide: [
									"Mask",
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig17"
							Property: {
								Hide: [
									"Mask",
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig18"
							Property: {
								Hide: [
									"Mask",
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
					],
				},
				{
					Name: "Eyes",
					Key: "e",
					Options: [
						{
							// "Eyes0"
							Property: { Effect: [] },
						},
						{
							// "Eyes1"
							Property: { Effect: [] },
						},
						{
							// "Eyes2"
							Property: { Effect: [] },
						},
						{
							// "Eyes3"
							Property: { Effect: [] },
						},
						{
							// "Eyes4"
							Property: { Effect: [] },
						},
						{
							// "Eyes5"
							Property: { Effect: [] },
						},
						{
							// "Eyes6"
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Eyebrows",
					Key: "y",
					Options: [
						{
							// "Eyebrows0"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows1"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows2"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows3"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows4"
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Lips",
					Key: "l",
					Options: [
						{
							// "Lips0"
							Property: { Effect: [] },
						},
						{
							// "Lips1"
							Property: { Effect: [] },
						},
						{
							// "Lips2"
							Property: { Effect: [] },
						},
						{
							// "Lips3"
							Property: { Effect: [] },
						},
						{
							// "Lips4"
							Property: { Effect: [] },
						},
						{
							// "Lips5"
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Gag",
					Key: "a",
					Options: [
						{
							// "None"
							Property: { Effect: [] },
						},
						{
							// "Gag1"
							Property: {
								Difficulty: 3,
								Effect: [E.BlockMouth, E.GagLight],
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
						{
							// "Gag2"
							Property: {
								Difficulty: 15,
								Effect: [E.BlockMouth, E.GagTotal2],
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // RubberMask
		OpenMouthPlugHood: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "FakeMouth",
					Key: "m",
					Options: [
						{ Property: { Effect: [] } },
						{ Property: { Effect: [E.BlockMouth] } },
					], //None, Fake Mouth
				},
				{
					Name: "Thickness",
					Key: "t",
					Options: [{}, {}],
				}, // Thick, Thin
			],
		}, // Open Mouth Plug Hood
		LatexDogHood: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Thick" }, { Name: "Thin" }],
		}, //Latex Dog Hood
		VacHood: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Breathplay",
					Key: "bp",
					Options: [
						{
							// hp0 - None
							Property: { Effect: [] },
						},
						{
							// hp1 - Hand Pump
							Property: {
								Effect: [E.GagMedium, E.BlockMouth],
							},
						},
						{
							// r1 - Rebreather
							Property: {
								Effect: [E.GagMedium, E.BlockMouth],
							},
						},
					],
				},
				{
					Name: "PlasticClip",
					Key: "pc",
					Options: [
						{
							// pc0 - None
							Property: { Effect: [] },
						},
						{
							// pc1 - Tube Clamped
							Property: {
								Effect: [E.GagMedium, E.BlockMouth],
							},
						},
					],
				},
			],
		}, //VacHood
		LatexHabit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Hat", AssetName: "LatexHabit" },
		}, // Latex Habit
		LatexDogMask: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Muzzle",
					Key: "m",
					Options: [
						{
							// M0 - None
							Property: { Effect: [] },
						},
						{
							// M1 - muzzled
							Property: { Effect: [E.GagMedium, E.BlockMouth] },
						},
					],
				},
				{
					Name: "Lenses",
					Key: "l",
					Options: [
						{
							// l0 - None
							Property: { Effect: [] },
						},
						{
							// l1 - Covered
							Property: { Effect: [E.BlindLight] },
						},
					],
				},
				{
					Name: "Collar",
					Key: "c",
					Options: [
						{
							// M0 - None
							Property: { Effect: [] },
						},
						{
							// M1 - Collar
							Property: { Effect: [] },
						},
					],
				},
			],
		}, //Latex Dog Mask
		CanvasHood: {
			Archetype: ExtendedArchetype.TEXT,
			MaxLength: { Text: 12 },
			Font: "'Saira Stencil One', 'Arial', sans-serif",
			ScriptHooks: {
				AfterDraw: AssetsItemHoodCanvasHoodAfterDrawHook,
			},
		}, // CanvasHood
		SpaceMask: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "One",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"ItemEars",
						],
						HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
					},
				},
				{
					Name: "Two",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"ItemEars",
						],
						HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
					},
				},
				{
					Name: "Three",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"ItemEars",
						],
						HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
					},
				},
				{
					Name: "Four",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"ItemEars",
						],
						HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
					},
				},
				{
					Name: "Five",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"ItemEars",
						],
						HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
					},
				},
				{
					Name: "Six",
					Property: {
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"ItemEars",
						],
						HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
					},
				},
			],
			ChangeWhenLocked: false,
		}, // SpaceMask
		CustomBallHood: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Finish",
					Key: "f",
					Options: [{}, {}], // Matte, Shiny
				},
				{
					Name: "Pattern",
					Key: "p",
					Options: [{}, {}, {}, {}, {}, {}, {}], //None, Pumpkin, Smiley Lines, Smiley Fill, 8Ball, Tree, Quarters
				},
				{
					Name: "Cover",
					Key: "c",
					Options: [
						{
							// Hide everything that could conflict
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
									"Mask",
									"Hat",
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"ItemEars",
									"Glasses",
								],
							},
						},
						{
							// Hide limited conflicts
							Property: {
								Hide: ["HairFront", "HairBack", "HairAccessory2", "Mask"],
							},
						},
						{
							// Hide only hair
							Property: {
								Hide: ["HairFront", "HairBack"],
							},
						},
					],
				},
			],
		}, //CustomBallHood
		Balloon: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {
						Effect: ["BlindLight", "GagLight", "DeafLight", "BlockWardrobe"],
					},
					Expression: [
						{ Group: "Blush", Name: "Low", Timer: 15 },
						{ Group: "Eyebrows", Name: "Lowered", Timer: 15 },
					],
				},
				{
					Name: "Tight",
					Property: {
						Effect: ["BlindLight", "GagHeavy", "DeafLight", "BlockWardrobe"],
					},
					Expression: [
						{ Group: "Blush", Name: "VeryHigh", Timer: 15 },
						{ Group: "Eyes", Name: "Surprised", Timer: 15 },
						{ Group: "Eyebrows", Name: "Soft", Timer: 15 },
						{ Group: "Mouth", Name: "HalfOpen", Timer: 15 },
					],
				},
				{
					Name: "Extreme",
					Property: {
						Effect: ["BlindLight", "GagHeavy", "DeafLight", "BlockWardrobe"],
					},
					Expression: [
						{ Group: "Blush", Name: "ShortBreath", Timer: 15 },
						{ Group: "Eyes", Name: "Scared", Timer: 15 },
						{ Group: "Eyebrows", Name: "Raised", Timer: 15 },
						{ Group: "Mouth", Name: "Open", Timer: 15 },
					],
				},
			],
		}, // Balloon
		Kigu2Hood: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			ChangeWhenLocked: false,
			Options: [
				// Lenses type
				{ Name: "None", Property: { Effect: [] } },
				{
					Name: "Thin",
					Property: {
						Effect: [E.BlindLight],
						Tint: [{ Color: 0, Strength: 0.2 }],
					},
				},
				{
					Name: "Thick",
					Property: {
						Effect: [E.BlindNormal, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.3 }],
					},
				},
				{
					Name: "Opaque",
					Property: {
						Effect: [E.BlindHeavy, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.5 }],
					},
				},
			],
		}, // Kigu2Hood
		CreepyIronMask: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Mode",
					Key: "m",
					Options: [
						{
							// Mask
							Property: {},
						},
						{
							// Semi-Hood
							Property: {
								Effect: [E.BlockMouth],
								Hide: ["HairFront", "HairAccessory1"],
							},
						},
						{
							// Hood
							Property: {
								Effect: [E.BlockMouth],
								Hide: ["HairFront", "HairBack", "HairAccessory1"],
							},
						},
					],
				},
				{
					Name: "Speech",
					Key: "p",
					Options: [
						{
							// Loose on mouth
							Property: { Effect: [] },
						},
						{
							// Tight on mouth
							Property: {
								Effect: [E.GagMedium],
							},
						},
					],
				},
				{
					Name: "Blindfold",
					Key: "b",
					Options: [
						{
							// None
							Property: { Effect: [] },
						},
						{
							// Partial blindfold
							Property: {
								Effect: [E.BlindLight],
							},
						},
						{
							// Blindfold
							Property: {
								Effect: [E.BlindHeavy],
							},
						},
					],
				},
				{
					Name: "Spike",
					Key: "s",
					Options: [
						{
							// None
							Property: { Effect: [] },
						},
						{
							// NeckSpikes
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Nose",
					Key: "n",
					Options: [
						{
							// None
							Property: { Effect: [] },
						},
						{
							// NoseGuard
							Property: {
								Effect: [],
								Block: ["ItemNose"],
								Hide: ["ItemNose"],
							},
						},
					],
				},
			],
		}, // CreepyIronMask
		HalloIII: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Mask",
					Key: "m",
					Options: [
						{
							// Pumpkin
							Property: {},
						},
						{
							// Skull
							Property: {},
						},
						{
							// Witch
							Property: {},
						},
					],
				},
				{
					Name: "Hood",
					Key: "h",
					Options: [
						{
							// None
							Property: { Effect: [] },
						},
						{
							// Normal hood
							Property: {
								Effect: [],
								Difficulty: 3,
								Block: ["ItemNose"],
							},
						},
						{
							// Total hood
							Property: {
								Effect: [
									E.BlockWardrobe,
									E.BlindNormal,
									E.BlockMouth,
									E.GagLight,
								],
								Difficulty: 5,
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemNose",
									"ItemHead",
								],
							},
						},
					],
				},
			],
		}, // HalloIII
		TransparentLatexHood: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Type",
					Key: "t",
					Options: [
						{
							// Nasal and mouth holes
							Property: {},
							Expression: [
								{ Group: "Blush", Name: "Low", Timer: 15 },
								{ Group: "Eyes", Name: "Angry", Timer: 15 },
								{ Group: "Eyebrows", Name: "Soft", Timer: 15 },
								{ Group: "Mouth", Name: "Sad", Timer: 15 },
							],
						},
						{
							// Mouth hole
							Property: { Effect: [E.GagEasy] },
							Expression: [
								{ Group: "Blush", Name: "Medium", Timer: 15 },
								{ Group: "Eyes", Name: "Angry", Timer: 15 },
								{ Group: "Eyebrows", Name: "Soft", Timer: 15 },
								{ Group: "Mouth", Name: "Sad", Timer: 15 },
							],
						},
						{
							// Nasal holes
							Property: {},
							Expression: [
								{ Group: "Blush", Name: "Medium", Timer: 15 },
								{ Group: "Eyes", Name: "Angry", Timer: 15 },
								{ Group: "Eyebrows", Name: "Soft", Timer: 15 },
								{ Group: "Mouth", Name: "HalfOpen", Timer: 15 },
							],
						},
						{
							// Plain hood
							Property: { Effect: [E.GagEasy] },
							Expression: [
								{ Group: "Blush", Name: "ShortBreath", Timer: 15 },
								{ Group: "Eyes", Name: "Scared", Timer: 15 },
								{ Group: "Eyebrows", Name: "Raised", Timer: 15 },
								{ Group: "Mouth", Name: "Open", Timer: 15 },
							],
						},
					],
				},
				{
					Name: "Layer",
					Key: "l",
					Options: [
						{
							// Over mask
							Property: {
								Block: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemNose",
									"ItemHead",
									"ItemEars",
								],
								HideItem: [
									"MaskKigu2Hood",
									"MaskRubberMask",
									"MaskDroneMask",
									"ItemHeadKigu2Hood",
									"ItemHeadBigMouthHood",
									"ItemHeadDroneMask",
								],
							},
						},
						{
							// Under mask
							Property: { OverridePriority: 24 },
						},
					],
				},
			],
		}, // TransparentLatexHood
	}, // ItemHood
	Jewelry: {
		JewelrySet: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Ears1",
					Key: "e", // Left Ear!
					Options: [
						{}, // e0 - none
						{}, // e1 - stud
						{}, // e2 - ring
						{}, // e3 - hoop
						{}, // e4 - indust
						{}, // e5 - bigstud
						{}, // e6 - 2stud
						{}, // e7 - 3stud
						{}, // e8 - 2ring
						{}, // e9 - 3ring
						{}, // e10 - carti
						{}, // e11 - indust mix
					],
				},
				{
					Name: "Ears2",
					Key: "a", // Right Ear!
					Options: [
						{}, // a0 - none
						{}, // a1 - stud
						{}, // a2 - ring
						{}, // a3 - hoop
						{}, // a4 - indust
						{}, // a5 - bigstud
						{}, // a6 - 2stud
						{}, // a7 - 3stud
						{}, // a8 - 2ring
						{}, // a9 - 3ring
						{}, // a10 - carti
						{}, // a11 - indust mix
					],
				},
				{
					Name: "Nose",
					Key: "n",
					Options: [
						{}, // n0 - none
						{}, // n1 - septum ring
						{}, // n2 - stud right
						{}, // n3 - stud left
						{}, // n4 - ring right
						{}, // n5 - ring left
					],
				},
				{
					Name: "Face",
					Key: "f",
					Options: [
						{}, // f0 - none
						{}, // f1 - dermals both
						{}, // f2 - dermals right
						{}, // f3 - dermals left
						{}, // f4 - bridge
						{}, // f5 - monroe right
						{}, // f6 - monroe left
						{}, // f7 - cheeks
						{}, // f8 - combo 1
						{}, // f9 - combo 2
						{}, // f10 - combo 3
						{}, // f11 - combo 4
					],
				},
			],
		}, //JewelrySet
	}, // Jewelry
	Eyebrows: {
		Eyebrows2: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Style",
					Key: "s",
					Options: [
						{}, // s0 eyebrows2
						{}, // s1 eyebrows3
						{}, // s2 eyebrows4
						{}, // s3 eyebrows5
						{}, // s4 eyebrows6
					],
				},
				{
					Name: "LeftPiercing",
					Key: "p",
					Options: [
						{}, // p0 none
						{ PrerequisiteBuyGroup: "JewelrySet" }, // p1 1Bar
						{ PrerequisiteBuyGroup: "JewelrySet" }, // p2 2Bar
						{ PrerequisiteBuyGroup: "JewelrySet" }, // p3 1Ring
						{ PrerequisiteBuyGroup: "JewelrySet" }, // p4 2Ring
					],
				},
				{
					Name: "RightPiercing",
					Key: "r",
					Options: [
						{}, // r0 none
						{ PrerequisiteBuyGroup: "JewelrySet" }, // r1 1Bar
						{ PrerequisiteBuyGroup: "JewelrySet" }, // r2 2Bar
						{ PrerequisiteBuyGroup: "JewelrySet" }, // r3 1Ring
						{ PrerequisiteBuyGroup: "JewelrySet" }, // r4 2Ring
					],
				},
			],
		},
	},
	Mouth: {
		Regular: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Lips",
					Key: "l",
					Options: [
						{}, // l0 - none
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l1 - middle
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l2 - left
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l3 - right
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l4 - both sides
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l5 - triple
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l6 - vertical labret
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l7 - vertical labret with rings
					],
				},
				{
					Name: "Tongue",
					Key: "t",
					Options: [
						{}, // t0 - none
						{ PrerequisiteBuyGroup: "JewelrySet" }, // t1 - one stud
						{ PrerequisiteBuyGroup: "JewelrySet" }, // t2 - double studs
					],
				},
			],
		},
		Full: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Lips",
					Key: "l",
					Options: [
						{}, // l0 - none
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l1 - middle
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l2 - left
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l3 - right
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l4 - both sides
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l5 - triple
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l6 - vertical labret
						{ PrerequisiteBuyGroup: "JewelrySet" }, // l7 - vertical labret with rings
					],
				},
				{
					Name: "Tongue",
					Key: "t",
					Options: [
						{}, // t0 - none
						{ PrerequisiteBuyGroup: "JewelrySet" }, // t1 - one stud
						{ PrerequisiteBuyGroup: "JewelrySet" }, // t2 - double studs
					],
				},
			],
		},
	},
	ItemDevices: {
		FuturisticCrate: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Window",
					Key: "w",
					Options: [
						{}, // d0 - Open
						{
							Property: {
								Difficulty: 20,
								Effect: [E.BlockWardrobe, E.Freeze, E.Enclose],
							},
						}, // d1 - Window
						{
							Property: {
								Difficulty: 22,
								Effect: [E.BlindLight, E.BlockWardrobe, E.Freeze, E.Enclose],
							},
						}, // d2 - Normal Window
						{
							Property: {
								Difficulty: 22,
								Effect: [E.BlindNormal, E.BlockWardrobe, E.Freeze, E.Enclose],
							},
						}, // d3 - Small window
						{
							Property: {
								Difficulty: 52,
								Effect: [
									E.BlindHeavy,
									E.GagLight,
									E.BlockWardrobe,
									E.Freeze,
									E.Enclose,
								],
							},
						}, // d4 - Closed
					],
				},
				{
					Name: "LegCuffs",
					Key: "l",
					Options: [
						{}, // l0 - No leg straps
						{
							// l1 - Kneel leg restraints
							Prerequisite: ["CuffedLegsOrEmpty", "CuffedFeetOrEmpty"],
							Property: {
								Difficulty: 18,
								SetPose: ["Kneel"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Mounted],
								Hide: ["ItemBoots", "Shoes"],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
						{
							// l2 - Closed leg restraints
							Prerequisite: ["CuffedLegsOrEmpty", "CuffedFeetOrEmpty"],
							Property: {
								Difficulty: 22,
								SetPose: ["LegsClosed"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Mounted],
								Hide: ["ItemBoots", "Shoes"],
							},
						},
						{
							// l3 - Spread leg restraints
							Prerequisite: ["CuffedLegsOrEmpty", "CuffedFeetOrEmpty"],
							Property: {
								Difficulty: 22,
								SetPose: ["Spread"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Mounted],
								Hide: ["ItemBoots", "Shoes"],
							},
						},
					],
				},
				{
					Name: "ArmCuffs",
					Key: "a",
					Options: [
						{}, // s0 - No arm cuffs
						{
							// s1 - Elbow cuffs
							Prerequisite: ["CuffedArmsOrEmpty"],
							Property: {
								Difficulty: 18,
								SetPose: ["BackElbowTouch"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Block, E.Mounted],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
						{
							// s2 - Box cuffs
							Prerequisite: ["CuffedArmsOrEmpty"],
							Property: {
								Difficulty: 18,
								SetPose: ["BackBoxTie"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Block, E.Mounted],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
						{
							// s3 - Overhead restraints
							Prerequisite: ["CuffedArmsOrEmpty"],
							Property: {
								Difficulty: 22,
								SetPose: ["OverTheHead"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Block, E.Mounted],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
					],
				},
				{
					Name: "Device",
					Key: "d",
					Options: [
						{}, // d0 - No device
						{
							// s1 - Pleasure module
							HasSubscreen: true,
							Prerequisite: ["AccessVulva", "VulvaEmpty"],
							Property: {
								SetPose: ["BaseLower"],
								AllowActivePose: [...PoseAllStanding],
								Effect: [E.BlockWardrobe, E.Freeze, E.VulvaShaft],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.VIBRATING,
								ScriptHooks: {
									ScriptDraw: AssetsItemDevicesFuturisticCrateScriptDrawHook,
								},
							},
						},
					],
				},
				{
					Name: "Structure",
					Key: "t",
					Options: [
						{}, // t0 - No harness
						{}, // t1 - X
						{}, // t2 - +
						{}, // t3 - H
					],
				},
				{
					Name: "Harness",
					Key: "h",
					Options: [
						{}, // h0 - None
						{
							// h1 - Minimal
							Property: {
								Difficulty: 12,
								Effect: [E.BlockWardrobe, E.Freeze],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
						{
							// h2 - Comprehensive
							Property: {
								Difficulty: 18,
								Effect: [E.BlockWardrobe, E.Freeze],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
						{
							// h3 - Comprehensive (breast)
							Property: {
								Difficulty: 18,
								Effect: [E.BlockWardrobe, E.Freeze],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
						{
							// h4 - High Security
							Property: {
								Difficulty: 24,
								Effect: [E.BlockWardrobe, E.Freeze],
								OverrideHeight: { Height: 0, Priority: 60 },
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticCrate
		PersonalCage: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Lowered",
					Property: {
						Difficulty: 10,
					},
				},
				{
					Name: "Suspended",
					Property: {
						Difficulty: 15,
						OverrideHeight: {
							Height: 30,
							Priority: 51,
							HeightRatioProportion: 0,
						},
						Effect: [E.Lifted],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectPersonalCageHeight",
				Option: "PersonalCageHeight",
				Chat: "PersonalCageHeightSet",
				Npc: "PersonalCageHeight",
			},
			ChangeWhenLocked: false,
		}, // PersonalCage
		LeatherCage: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Face",
					Key: "f",
					Options: [
						{
							// Normal
							Property: {},
						},
						{
							// Face free
							Property: {},
						},
					],
				},
				{
					Name: "Suspension",
					Key: "s",
					Options: [
						{
							// Ground
							Property: {
								Difficulty: 20,
							},
						},
						{
							// Lifted
							Property: {
								Difficulty: 25,
								OverrideHeight: {
									Height: 45,
									Priority: 60,
									HeightRatioProportion: 0,
								},
								Effect: [E.Lifted],
							},
						},
					],
				},
				{
					Name: "Cuff",
					Key: "c",
					Options: [
						{
							// No neck cuff
							Property: {},
						},
						{
							// Neck cuff
							Property: { Difficulty: 30 },
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // LeatherCage
		BondageBench: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.TARGET_CHAR,
			],
			Options: [
				{
					Name: "None",
					AllowLock: false,
					Property: {
						Difficulty: 0,
						SetPose: ["LegsClosed"],
					},
				},
				{
					Name: "Light",
					SelfBondageLevel: 2,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						Difficulty: 2,
						SetPose: ["LegsClosed", "BaseUpper"],
						AllowActivePose: ["BackCuffs", "BackBoxTie", "BackElbowTouch"],
						Effect: [E.Block, E.BlockWardrobe, E.Freeze],
						Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
					},
				},
				{
					Name: "Normal",
					SelfBondageLevel: 3,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						Difficulty: 3,
						SetPose: ["LegsClosed", "BaseUpper"],
						AllowActivePose: ["BackCuffs", "BackBoxTie", "BackElbowTouch"],
						Effect: [E.Block, E.BlockWardrobe, E.Freeze],
						Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
					},
				},
				{
					Name: "Heavy",
					SelfBondageLevel: 6,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						Difficulty: 6,
						SetPose: ["LegsClosed", "BaseUpper"],
						AllowActivePose: ["BackCuffs", "BackBoxTie", "BackElbowTouch"],
						Effect: [E.Block, E.BlockWardrobe, E.Freeze],
						Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
				},
				{
					Name: "Full",
					SelfBondageLevel: 9,
					Prerequisite: ["NoOuterClothes"],
					Property: {
						Difficulty: 9,
						SetPose: ["LegsClosed", "BaseUpper"],
						AllowActivePose: ["BackCuffs", "BackBoxTie", "BackElbowTouch"],
						Effect: [E.Block, E.BlockWardrobe, E.Freeze],
						Hide: ["HairBack", "Wings", "TailStraps", "ItemButt"],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
				},
			],
			DialogPrefix: {
				Header: "BondageBenchStrapsSelectTightness",
				Option: "BondageBenchStrapsPose",
				Chat: "BondageBenchStrapsRestrain",
			},
		}, // BondageBench
		Cushion: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Hold",
					Property: {
						HideItem: ["ItemMiscTeddyBear"],
						AllowActivity: ["SpankItem"],
					},
				},
				{
					Name: "Sit",
					Property: {
						OverrideHeight: { Height: -200, Priority: 21 },
						OverridePriority: 1,
						AllowActivePose: ["Kneel", "KneelingSpread", "AllFours"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectCushionStyle",
				Option: "CushionType",
			},
			ChatSetting: TypedItemChatSetting.SILENT,
		}, // Cushion
		Crib: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Gate",
					Key: "g",
					Options: [
						{}, // g0 - Gate open
						{ Property: { Difficulty: 15 } }, // g1 - Gate closed
					],
				},
				{
					Name: "Plushies",
					Key: "p",
					Options: [
						{}, // p0 - No plushies
						{}, // p1 - Plushies
					],
				},
			],
		}, // Crib
		PetBed: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "NoBlanket",
				},
				{
					Name: "Blanket",
					Property: {
						SetPose: ["AllFours"],
						AllowActivePose: ["Hogtied"],
						Hide: ["ItemArms", "ItemButt", "TailStraps", "Wings"],
						HideItem: ["ItemMiscTeddyBear"],
						HideItemExclude: [
							"ItemArmsBitchSuit",
							"ItemArmsBitchSuitExposed",
							"ItemArmsShinyPetSuit",
						],
						Block: [
							"ItemArms",
							"ItemBreast",
							"ItemButt",
							"ItemFeet",
							"ItemBoots",
							"ItemLegs",
							"ItemMisc",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemPelvis",
							"ItemTorso",
							"ItemVulva",
							"ItemVulvaPiercings",
						],
					},
					Random: false,
				},
			],
		}, // PetBed
		Vacbed: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Nohair",
					Property: {
						Hide: [
							"HairFront",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"Hat",
						],
					},
				},
			],
		}, // Vacbed
		Familiar: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Bat",
				},
				{
					Name: "Cat",
				},
				{
					Name: "Skeleton",
				},
				{
					Name: "Parrot",
				},
			],
		}, // Familiar
		LittleMonster: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Black",
				},
				{
					Name: "Red",
				},
				{
					Name: "Green",
				},
				{
					Name: "Blue",
				},
			],
		}, // LittleMonster
		InflatableBodyBag: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Light",
					Property: {
						Difficulty: 0,
					},
				},
				{
					Name: "Inflated",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "Bloated",
					Property: {
						Difficulty: 6,
					},
				},
				{
					Name: "Max",
					Property: {
						Difficulty: 9,
					},
				},
			],
		}, // InflatableBodyBag
		TheHangingFrame: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Inflated",
					Property: {
						Block: ["ItemLegs"],
						Hide: [
							"HairFront",
							"HairBack",
							"HairAccessory1",
							"Cloth",
							"ClothLower",
							"Hat",
						],
					},
				},
			],
			DrawImages: false,
		}, // TheHangingFrame
		FurBlanketWrap: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR_NAME],
			Options: [
				{
					Name: "Loose",
					Property: {
						Difficulty: 3,
					},
				},
				{
					Name: "Tight",
					Property: {
						Difficulty: 5,
					},
				},
				{
					Name: "Belts",
					AllowLock: true,
					Property: {
						Difficulty: 8,
					},
				},
			],
			DrawImages: false,
			ChangeWhenLocked: false,
		}, // FurBlanketWrap
		Pole: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Untied",
				},
				{
					Name: "Tied",
					SelfBondageLevel: 2,
					Property: {
						Difficulty: 8,
						SetPose: ["BackBoxTie"],
						Effect: [E.Block, E.Freeze, E.BlockWardrobe],
					},
				},
				{
					Name: "TiedElbow",
					SelfBondageLevel: 5,
					Property: {
						Difficulty: 10,
						SetPose: ["BackElbowTouch"],
						Effect: [E.Block, E.Freeze, E.BlockWardrobe],
					},
				},
			],
		}, // Pole
		CryoCapsule: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Open",
					Property: {
						Difficulty: 0,
						Effect: [E.Freeze],
						SelfUnlock: true,
					},
				},
				{
					Name: "Closed",
					Property: {
						Difficulty: 50,
						Effect: [
							E.Freeze,
							E.GagMedium,
							E.BlockWardrobe,
							E.Enclose,
							E.BlindLight,
						],
						SelfUnlock: false,
					},
				},
			],
			ChangeWhenLocked: false,
			DialogPrefix: {
				Header: "SelectCryoCapsuleType",
				Option: "CryoCapsuleType",
				Chat: "CryoCapsuleSet",
			},
		}, // CryoCapsule
		Coffin: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "CryoCapsule" },
			Options: [
				{
					Name: "Open",
					Property: {
						Difficulty: 0,
						Effect: [E.Freeze],
						SelfUnlock: true,
					},
				},
				{
					Name: "Closed",
					Property: {
						Difficulty: 50,
						Effect: [
							E.Freeze,
							E.GagMedium,
							E.BlockWardrobe,
							E.Enclose,
							E.BlindLight,
						],
						SelfUnlock: false,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectCoffinType",
				Option: "CoffinType",
				Chat: "CoffinSet",
			},
		}, // Coffin
		Net: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR_NAME],
			Options: [
				{
					Name: "Kneel",
					Property: {
						Difficulty: 3,
						SetPose: ["Kneel"],
					},
				},
				{
					Name: "AllFours",
					Property: {
						Difficulty: 6,
						SetPose: ["AllFours"],
						AllowActivePose: ["Hogtied"],
					},
				},
				{
					Name: "Suspended",
					Property: {
						Difficulty: 7,
						Effect: [E.Suspended],
						SetPose: ["Hogtied"],
						Block: [
							"ItemArms",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemTorso",
							"ItemHands",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
						Hide: [
							"ItemArms",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemTorso",
							"ItemHands",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
						],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
						OverrideHeight: {
							Height: 25,
							Priority: 51,
							HeightRatioProportion: 0,
						},
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemDevicesNet",
			},
		}, // Net
		WoodenRack: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.TARGET_CHAR_NAME,
			],
			Modules: [
				{
					Name: "Frame",
					Key: "f",
					Options: [
						{}, // f0 - Normal
						{}, // f1 - Stained
						{}, // f2 - HalfBack
						{}, // f3 - NoBack
					],
				},
				{
					Name: "TopRestraints",
					Key: "t",
					Options: [
						{}, // t0 - No
						{
							Prerequisite: ["CuffedArmsOrEmpty"],
							Property: {
								Difficulty: 6,
								SetPose: ["Yoked"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Block],
							},
						}, // t1 - Rope
						{
							Prerequisite: ["CuffedArmsOrEmpty"],
							Property: {
								Difficulty: 6,
								SetPose: ["OverTheHead"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Block],
							},
						}, // t2 - RopeTight
						{
							AllowLock: true,
							Prerequisite: ["CuffedArms"],
							Property: {
								Difficulty: 10,
								SetPose: ["Yoked"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Block],
							},
						}, // t3 - Chains
						{
							AllowLock: true,
							Prerequisite: ["CuffedArms"],
							Property: {
								Difficulty: 10,
								SetPose: ["OverTheHead"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe, E.Block],
							},
						}, // t4 - ChainsTight
						{
							AllowLock: true,
							Property: {
								Difficulty: 12,
								SetPose: ["Yoked"],
								AllowActivePose: [...PoseAllStanding],
								Block: ["ItemArms"],
								Effect: [E.BlockWardrobe],
							},
						}, // t5 - Stocks
					],
				},
				{
					Name: "BotRestraints",
					Key: "b",
					Options: [
						{}, // b0 - No
						{
							Property: {
								Difficulty: 6,
								SetPose: ["Spread"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe],
								Hide: ["ItemBoots", "Shoes"],
							},
						}, // b1 - Rope
						{
							Property: {
								Difficulty: 6,
								SetPose: ["LegsClosed"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe],
								Hide: ["ItemBoots", "Shoes"],
							},
						}, // b2 - RopeTight
						{
							AllowLock: true,
							Prerequisite: ["CuffedLegs"],
							Property: {
								Difficulty: 10,
								SetPose: ["Spread"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe],
								Hide: ["ItemBoots", "Shoes"],
							},
						}, // b3 - Chains
						{
							AllowLock: true,
							Prerequisite: ["CuffedLegs"],
							Property: {
								Difficulty: 10,
								SetPose: ["LegsClosed"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe],
								Hide: ["ItemBoots", "Shoes"],
							},
						}, // b4 - ChainsTogether
						{
							AllowLock: true,
							Property: {
								Difficulty: 12,
								SetPose: ["LegsOpen"],
								Block: ["ItemFeet"],
								Effect: [E.BlockWardrobe],
								Hide: ["ItemBoots", "Shoes"],
							},
						}, // b5 - Stocks
					],
				},
			],
		}, //WoodenRack
		Potty: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Text",
					Key: "e",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 16 },
								Font: "sans-serif",
								ScriptHooks: {
									AfterDraw: (...args) =>
										TextItem.GenericTextArcDrawHook(...args, {
											YOffset: 170,
											XOffset: 185,
											drawOptions: {
												fontSize: 20,
												radius: 60,
												effect: DynamicDrawTextEffect.BURN,
											},
										}),
								},
							},
						},
					],
				},
			],
		},
		Sybian: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // Sybian
		FuckMachine: {
			Archetype: ExtendedArchetype.VIBRATING,
			ScriptHooks: {
				ScriptDraw: AssetsItemDevicesFuckMachineScriptDrawHook,
				BeforeDraw: AssetsItemDevicesFuckMachineBeforeDrawHook,
			},
		}, // FuckMachine
		Kennel: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Door",
					Key: "d",
					Options: [
						{ Property: { Difficulty: -100, Door: false } },
						{
							Property: {
								Difficulty: 10,
								Effect: [E.OneWayEnclose, E.BlockWardrobe, E.Freeze],
								Door: true,
							},
						},
					],
				},
				{
					Name: "Padding",
					Key: "p",
					Options: [
						{ Property: { Padding: false } },
						{ Property: { Padding: true } },
					],
				},
			],
			ChangeWhenLocked: false,
		}, // Kennel
		Locker: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Vents",
					Property: { Effect: [E.BlindLight] },
				},
				{
					Name: "Ventless",
					Property: { Effect: [E.GagLight, E.BlindHeavy] },
				},
			],
			BaselineProperty: { Opacity: 0 },
			ScriptHooks: {
				Init: PropertyOpacityInit,
				Load: PropertyOpacityLoad,
				Draw: PropertyOpacityDraw,
				Exit: PropertyOpacityExit,
			},
			DialogPrefix: {
				Npc: (C, Option, PreviousOption) => `ItemDevicesLocker${Option.Name}`,
			},
		}, // Locker
		SmallLocker: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemDevices", AssetName: "Locker" },
			DialogPrefix: {
				Header: "ItemDevicesLockerSelect",
				Option: "ItemDevicesLocker",
				Chat: "ItemDevicesLockerSet",
				Npc: (C, Option, PreviousOption) => `ItemDevicesLocker${Option.Name}`,
			},
		}, // SmallLocker
		VacBedDeluxe: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Legs",
					Key: "l",
					Options: [
						{
							Property: { SetPose: ["BaseLower"] },
						}, // l0 - Legs spread
						{
							Property: { SetPose: ["LegsClosed"] },
						}, // l1 - Legs closed
					],
				},
				{
					Name: "Arms",
					Key: "a",
					Options: [
						{ Property: { SetPose: ["BaseUpper"] } }, // a0 - Arms down
						{ Property: { SetPose: ["Yoked"] } }, // a1 - Arms yoked
					],
				},
			],
			BaselineProperty: { Opacity: 1 },
			ScriptHooks: {
				Init: PropertyOpacityInit,
				Load: PropertyOpacityLoad,
				Draw: InventoryItemDevicesVacBedDeluxeDrawHook,
				Exit: PropertyOpacityExit,
			},
		}, // VacBedDeluxe
		WoodenBox: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "SWNE",
				},
				{
					Name: "NWSE",
				},
			],
			BaselineProperty: { Opacity: 0, Text: "" },
			ScriptHooks: {
				Load: InventoryItemDevicesWoodenBoxLoadHook,
				Draw: InventoryItemDevicesWoodenBoxDrawHook,
				Exit: InventoryItemDevicesWoodenBoxExitHook,
				PublishAction: InventoryItemDevicesWoodenBoxPublishActionHook,
				AfterDraw: AssetsItemDevicesWoodenBoxAfterDrawHook,
			},
			AllowEffect: [E.BlindNormal, E.GagLight],
		}, // WoodenBox
		TransportWoodenBox: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemDevices", AssetName: "WoodenBox" },
			DialogPrefix: {
				Header: "ItemDevicesWoodenBoxSelect",
				Option: "ItemDevicesWoodenBox",
				Chat: "ItemDevicesWoodenBoxSet",
			},
		}, // TransportWoodenBox
		LuckyWheel: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Game",
					Key: "g",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.NOARCH,
								ScriptHooks: {
									Load: InventoryItemDevicesLuckyWheelg0LoadHook,
									Draw: InventoryItemDevicesLuckyWheelg0DrawHook,
									Click: InventoryItemDevicesLuckyWheelg0ClickHook,
									Exit: InventoryItemDevicesLuckyWheelg0ExitHook,
								},
							},
						},
					],
				},
				{
					Name: "Stand",
					Key: "s",
					Options: [
						{},
						{}, // s0 - WoodenBase, s1 - MetalBase
					],
				},
				{
					Name: "Misc",
					Key: "m",
					Options: [
						{},
						{}, // m0 - MiscOn, m1 - MiscOff
					],
				},
				{
					Name: "Arrow",
					Key: "a",
					Options: [
						{},
						{},
						{}, // a0 - DefaultArrow, a1 - AlternateArrow, a2 - PlugArrow
					],
				},
				{
					Name: "Position",
					Key: "p",
					Options: [
						{}, // p0 - WheelFront
						{
							// p1 - WheelBack
							Property: {
								OverridePriority: 0,
							},
						},
					],
				},
			],
			ScriptHooks: {
				Draw: InventoryItemDevicesLuckyWheelDrawHook,
				Click: InventoryItemDevicesLuckyWheelClickHook,
				Init: InventoryItemDevicesLuckyWheelInitHook,
			},
			BaselineProperty: { TargetAngle: 0 },
		}, //LuckyWheel
		FoldingScreen: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Opaque",
					Property: {
						Hide: [
							"BodyLower",
							"BodyUpper",
							"ArmsLeft",
							"ArmsRight",
							"HandsLeft",
							"HandsRight",
							"HairFront",
							"HairBack",
							"Glasses",
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"FacialHair",
							"HairAccessory1",
							"HairAccessory2",
							"HairAccessory3",
							"Hat",
							"Mask",
							"ItemEars",
							"ItemHead",
							"Cloth",
							"ClothLower",
							"ClothAccessory",
							"Necklace",
							"Suit",
							"SuitLower",
							"Bra",
							"Panties",
							"Garters",
							"Socks",
							"AnkletRight",
							"AnkletLeft",
							"Shoes",
							"Gloves",
							"TailStraps",
							"Wings",
							"ItemFeet",
							"ItemLegs",
							"ItemVulva",
							"ItemVulvaPiercings",
							"ItemButt",
							"ItemPelvis",
							"ItemTorso",
							"ItemTorso2",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"ItemArms",
							"ItemHands",
							"ItemHandheld",
							"ItemBoots",
							"Pussy",
							"Corset",
							"Bracelet",
							"HandAccessoryLeft",
							"HandAccessoryRight",
						],
					},
				},
				{
					Name: "Shadow",
					Property: { Hide: [] },
				},
			],
			BaselineProperty: { Opacity: 1 },
		}, // FoldingScreen
		DollBox: {
			Archetype: ExtendedArchetype.TEXT,
			ScriptHooks: {
				AfterDraw: AssetsItemDevicesDollBoxAfterDrawHook,
			},
			MaxLength: { Text: 22, Text2: 22 },
			Font: "'Satisfy', cursive",
		}, // DollBox
		PetBowl: {
			Archetype: ExtendedArchetype.TEXT,
			ScriptHooks: {
				AfterDraw: AssetsItemDevicesPetBowlAfterDrawHook,
			},
			MaxLength: { Text: 12 },
			Font: "'Saira Stencil One', 'Arial', sans-serif",
		}, // PetBowl
		KabeshiriWall: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "Legs",
					Key: "l",
					Options: [
						{}, // l0 - Cuffed
						{
							Property: {
								AllowActivityOn: ["ItemLegs", "ItemFeet"],
							},
						}, // l1 - Visible & uncuffed
						{
							Property: {
								Block: ["ItemBoots"],
							},
						}, // l2 - Hidden
					],
				},
				{
					Name: "Arms",
					Key: "a",
					Options: [
						{}, // a0 - Cuffed
						{
							Property: {
								Block: ["ItemHands"],
							},
						}, // a1 - Hidden
					],
				},
				{
					Name: "Cum",
					Key: "c",
					Options: [
						{}, // c0 - none
						{}, // c1 - butt
						{ Prerequisite: ["HasVagina"] }, // c2 - pussy
						{ Prerequisite: ["HasVagina"] }, // c3 - both
					],
				},
				{
					Name: "Wall",
					Key: "w",
					Options: [
						{}, // w0 - monitor
						{}, // w1 - photo
						{}, // w2 - blank
					],
				},
			],
			DrawData: {
				elementData: [
					{ position: ExtendedXY[8][0] },
					{ position: ExtendedXY[8][1] },
					{ position: ExtendedXY[8][2] },
					{ position: ExtendedXY[8][3] },
				],
			},
			ScriptHooks: {
				Load: InventoryItemDevicesKabeshiriWallLoadHook,
				Draw: InventoryItemDevicesKabeshiriWallDrawHook,
				PublishAction: InventoryItemDevicesKabeshiriWallPublishActionHook,
				Exit: InventoryItemDevicesKabeshiriWallExitHook,
				AfterDraw: AssetsItemDevicesKabeshiriWallAfterDrawHook,
			},
			BaselineProperty: { Text: "", Text2: "" },
		}, // KabeshiriWall
		Trolley: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR_NAME],
			Options: [
				{
					Name: "Open",
					Property: {
						Difficulty: -2,
					},
				},
				{
					Name: "Closed",
					AllowLock: true,
					Property: {
						Difficulty: 5,
						SetPose: ["BaseLower"],
						AllowActivePose: [...PoseAllStanding],
					},
				},
			],
			DrawImages: false,
			ChangeWhenLocked: false,
		}, // Trolley
		WheelFortune: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Load: InventoryItemDevicesWheelFortuneLoadHook,
				Draw: CommonNoop,
				Click: CommonNoop,
			},
		}, // WheelFortune
		GlueFloor: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Stand",
					AllowSelfSelect: false,
					Prerequisite: ["CanLegsOpen"],
				},
				{
					Name: "LegsClosed",
					Prerequisite: ["CanLegsClosed"],
					Property: {
						SetPose: ["LegsClosed"],
					},
				},
			],
		}, // GlueFloor
		OneBarGirl: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Model",
					Key: "m",
					Options: [
						{
							// m0 - Model 1
							Property: {},
						},
						{
							// m1 - Model 2
							Property: {},
						},
						{
							// m2 - Model 3
							Property: {},
						},
						{
							// m3 - Model 4
							Property: {},
						},
						{
							// m4 - Model 5
							Property: {},
						},
						{
							// m5 - Model 6
							Property: {},
						},
						{
							// m6 - Model 7
							Property: {},
						},
						{
							// m7 - Model 8
							Property: {},
						},
					],
				},
				{
					Name: "Vibration",
					Key: "v",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1, Effect: [] } }, // v0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // v1 - Low
						{ Property: { Intensity: 1, Effect: [E.Egged, E.Vibrating] } }, // v2 - Medium
						{ Property: { Intensity: 1, Effect: [E.Egged, E.Vibrating] } }, // v3 - High
						{ Property: { Intensity: 2, Effect: [E.Egged, E.Vibrating] } }, // v4 - Maximum
					],
				},
				{
					Name: "InflateLevel",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { InflateLevel: 0 } }, // i0 - Empty
						{ Property: { InflateLevel: 1 } }, // i1 - Light
						{ Property: { InflateLevel: 2 } }, // i2 - Inflated
						{ Property: { InflateLevel: 3 } }, // i3 - Bloated
						{ Property: { InflateLevel: 4 } }, // i4 - Maximum
					],
				},
			],
			ChangeWhenLocked: false,
		}, // OneBarGirl
		Cement: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Pole",
					Key: "p",
					Options: [
						{
							// p0 - None
							Property: {
								Difficulty: 0,
							},
						},
						{
							// p1 - Ankles
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								Difficulty: 3,
							},
						},
						{
							// p2 - UnderKnee
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								Difficulty: 4,
							},
						},
						{
							// p3 - FullLegs
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								Difficulty: 6,
							},
						},
					],
				},
				{
					Name: "Material",
					Key: "c",
					Options: [
						{
							// c0 - None
							Property: {},
						},
						{
							// c1 - Foam
							Property: {
								Effect: [E.BlockWardrobe, E.Slow],
								Difficulty: 6,
							},
						},
						{
							// c2 - Slime
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								Difficulty: 8,
							},
						},
						{
							// c3 - Glue
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								Difficulty: 10,
							},
						},
						{
							// c4 - Cement
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								Difficulty: 16,
							},
						},
					],
				},
				{
					Name: "Bucket",
					Key: "b",
					Options: [
						{
							// b0 - With Bucket
							Property: {
								Effect: [E.BlockWardrobe, E.Slow],
								Difficulty: 2,
							},
						},
						{
							// b1 - No Bucket
							Property: {},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // Cement
		BrickWall: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
					Property: {},
				},
				{
					Name: "Legs",
					Property: {
						Effect: [E.Block],
						Block: ["ItemLegs", "ItemFeet", "ItemBoots"],
						Difficulty: 8,
					},
				},
				{
					Name: "Chest",
					Property: {
						Effect: [E.Block],
						Block: [
							"ItemArms",
							"ItemHands",
							"ItemTorso",
							"ItemTorso2",
							"ItemPelvis",
							"ItemButt",
							"ItemVulvaPiercings",
							"ItemVulva",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
						],
						Difficulty: 15,
					},
				},
				{
					Name: "Neck",
					Property: {
						Effect: [E.Block],
						Block: [
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"ItemArms",
							"ItemHands",
							"ItemTorso",
							"ItemTorso2",
							"ItemPelvis",
							"ItemButt",
							"ItemVulvaPiercings",
							"ItemVulva",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
						],
						Difficulty: 18,
					},
				},
				{
					Name: "Full",
					Property: {
						Effect: [E.Block],
						Block: [
							"ItemHood",
							"ItemHead",
							"ItemEars",
							"ItemNose",
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"ItemNeck",
							"ItemNeckAccessories",
							"ItemNeckRestraints",
							"ItemMisc",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"ItemArms",
							"ItemHands",
							"ItemTorso",
							"ItemTorso2",
							"ItemPelvis",
							"ItemButt",
							"ItemVulvaPiercings",
							"ItemVulva",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
						],
						Difficulty: 25,
					},
				},
				{
					Name: "FullOpt",
					Property: {
						Effect: [E.Block],
						Block: [
							"ItemHood",
							"ItemHead",
							"ItemEars",
							"ItemNose",
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"ItemNeck",
							"ItemNeckAccessories",
							"ItemNeckRestraints",
							"ItemMisc",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"ItemArms",
							"ItemHands",
							"ItemTorso",
							"ItemTorso2",
							"ItemPelvis",
							"ItemButt",
							"ItemVulvaPiercings",
							"ItemVulva",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
						],
						Difficulty: 26,
					},
				},
				{
					Name: "LastBrick",
					Property: {
						Effect: [E.DeafHeavy, E.BlindTotal, E.GagMedium, E.Block],
						Block: [
							"ItemHood",
							"ItemHead",
							"ItemEars",
							"ItemNose",
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"ItemNeck",
							"ItemNeckAccessories",
							"ItemNeckRestraints",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemBreast",
							"ItemArms",
							"ItemHands",
							"ItemTorso",
							"ItemTorso2",
							"ItemPelvis",
							"ItemButt",
							"ItemVulvaPiercings",
							"ItemVulva",
							"ItemLegs",
							"ItemFeet",
							"ItemBoots",
						],
						Difficulty: 30,
					},
				},
			],
			ChangeWhenLocked: false,
		}, // BrickWall
		PogoBall: {
			Archetype: ExtendedArchetype.TYPED,
			ChangeWhenLocked: false,
			Options: [
				{
					Name: "Light",
					Property: {
						Effect: [E.Slow, E.BlockWardrobe],
						Difficulty: 0,
					},
				},
				{
					Name: "Heavy",
					Property: {
						Effect: [E.Freeze, E.BlockWardrobe],
						Difficulty: 5,
					},
				},
			],
		}, // PogoBall
		ExclusiveWaitress: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Bar",
					Key: "c",
					Options: [
						{
							// c0 - Open
							Property: {
								Block: [
									"ItemArms",
									"ItemHands",
									"ItemHandheld",
									"ItemBoots",
									"ItemAddon",
								],
							},
							ChangeWhenLocked: false,
						},
						{
							// c1 - Closed with window
							Property: {
								Block: [
									"ItemTorso",
									"ItemTorso2",
									"ItemPelvis",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
									"ItemArms",
									"ItemHands",
									"ItemHandheld",
									"ItemLegs",
									"ItemFeet",
									"ItemBoots",
									"ItemAddon",
								],
							},
							ChangeWhenLocked: false,
						},
						{
							// c2 - Closed with metal door
							Property: {
								Block: [
									"ItemTorso",
									"ItemTorso2",
									"ItemPelvis",
									"ItemVulva",
									"ItemVulvaPiercings",
									"ItemButt",
									"ItemArms",
									"ItemHands",
									"ItemHandheld",
									"ItemLegs",
									"ItemFeet",
									"ItemBoots",
									"ItemAddon",
								],
							},
							ChangeWhenLocked: false,
						},
					],
				},
				{
					Name: "Omb",
					Key: "b",
					Options: [
						{
							// b0 - None
							Property: {},
							ChangeWhenLocked: true,
						},
						{
							// b1 - Sunshade
							Property: {},
							ChangeWhenLocked: true,
						},
					],
				},
				{
					Name: "Follow",
					Key: "f",
					Options: [
						{
							// f0 - Autonomous mode -LED ON-
							Property: {
								Effect: [E.Slow],
								OverrideHeight: { Height: 55, Priority: 60 },
							},
							ChangeWhenLocked: false,
						},
						{
							// f1 - Follow mode -LED ON-
							AllowSelfSelect: false,
							Property: {
								Effect: [E.Leash, E.Mounted, E.Wiggling],
								OverrideHeight: { Height: 55, Priority: 60 },
							},
							ChangeWhenLocked: false,
						},
						{
							// f2 - In the ground -LED ON-
							Property: {
								Effect: [E.Block, E.Freeze, E.Tethered, E.MapImmobile],
							},
							ChangeWhenLocked: false,
						},
						{
							// f3 - Autonomous mode -LED OFF-
							Property: {
								Effect: [E.BlockWardrobe, E.Slow],
								OverrideHeight: { Height: 55, Priority: 60 },
							},
							ChangeWhenLocked: false,
						},
						{
							// f4 - Follow mode -LED OFF-
							AllowSelfSelect: false,
							Property: {
								Effect: [
									E.BlockWardrobe,
									E.Block,
									E.MergedFingers,
									E.Leash,
									E.Mounted,
									E.Wiggling,
								],
								OverrideHeight: { Height: 55, Priority: 60 },
							},
							ChangeWhenLocked: false,
						},
						{
							// f5 - In the ground -LED OFF-
							Property: {
								Effect: [
									E.BlockWardrobe,
									E.Block,
									E.MergedFingers,
									E.Freeze,
									E.Tethered,
									E.MapImmobile,
								],
							},
							ChangeWhenLocked: false,
						},
					],
				},
				{
					Name: "ObjectL",
					Key: "l",
					Options: [
						{
							// l0 - None
							Property: {},
						},
						{
							// l1 - Menu
							Property: {},
						},
						{
							// l2 - Poker cards
							Property: {},
						},
						{
							// l3 - Club cards
							Property: {},
						},
						{
							// l4 - Coffee
							Property: {},
						},
						{
							// l5 - Iced tea
							Property: {},
						},
						{
							// l6 - Juice glass
							Property: {},
						},
						{
							// l7 - Soda can
							Property: {},
						},
						{
							// l8 - Whiskey
							Property: {},
						},
						{
							// l9 - Long Neck
							Property: {},
						},
						{
							// l10 - Small beer glass
							Property: {},
						},
						{
							// l11 - Marguerita glass
							Property: {},
						},
						{
							// l12 - Champagne glass
							Property: {},
						},
						{
							// l13 - Sake cup
							Property: {},
						},
						{
							// l14 - Penauts
							Property: {},
						},
						{
							// l15 - Banana split
							Property: {},
						},
						{
							// l16 - Sundae
							Property: {},
						},
						{
							// l17 - Fries
							Property: {},
						},
						{
							// l18 - Burguer
							Property: {},
						},
						{
							// l19 - Origiri
							Property: {},
						},
						{
							// l20 - Hot dog
							Property: {},
						},
						{
							// l21 - Taco
							Property: {},
						},
						{
							// l22 - Bill and changes
							Property: {},
						},
						{
							// l23 - Ashtray
							Property: {},
						},
					],
				},
				{
					Name: "ObjectM",
					Key: "m",
					Options: [
						{
							// m0 - None
							Property: {},
						},
						{
							// m1 - Welcome sign
							Property: {},
						},
						{
							// m2 - Cards and chips
							Property: {},
						},
						{
							// m3 - Club cards
							Property: {},
						},
						{
							// m4 - Old coffee pot
							Property: {},
						},
						{
							// m5 - 2 Iced tea glasses
							Property: {},
						},
						{
							// m6 - Juice glass
							Property: {},
						},
						{
							// m7 - Bunch of soda can
							Property: {},
						},
						{
							// m8 - Whiskey bottle
							Property: {},
						},
						{
							// m9 - Box of long neck beer
							Property: {},
						},
						{
							// m10 - Beer bottle
							Property: {},
						},
						{
							// m11 - Marguerita glass
							Property: {},
						},
						{
							// m12 - Champagne bucket
							Property: {},
						},
						{
							// m13 - Sake bottle
							Property: {},
						},
						{
							// m14 - Penauts
							Property: {},
						},
						{
							// m15 - Banana split
							Property: {},
						},
						{
							// m16 - Sundae
							Property: {},
						},
						{
							// m17 - Fries
							Property: {},
						},
						{
							// m18 - Burguer
							Property: {},
						},
						{
							// m19 - Pair of Origiri
							Property: {},
						},
						{
							// m20 - Two hot dogs
							Property: {},
						},
						{
							// m21 - Some tacos
							Property: {},
						},
						{
							// m22 - Tips pot
							Property: {},
						},
						{
							// m23 - No smoking sign
							Property: {},
						},
					],
				},
				{
					Name: "ObjectR",
					Key: "r",
					Options: [
						{
							// r0 - None
							Property: {},
						},
						{
							// r1 - Menu
							Property: {},
						},
						{
							// r2 - Poker cards
							Property: {},
						},
						{
							// r3 - Club cards
							Property: {},
						},
						{
							// r4 - Coffee
							Property: {},
						},
						{
							// r5 - Iced tea
							Property: {},
						},
						{
							// r6 - Juice glass
							Property: {},
						},
						{
							// r7 - Soda can
							Property: {},
						},
						{
							// r8 - Whiskey
							Property: {},
						},
						{
							// r9 - Long Neck
							Property: {},
						},
						{
							// r10 - Small beer glass
							Property: {},
						},
						{
							// r11 - Marguerita glass
							Property: {},
						},
						{
							// r12 - Champagne glass
							Property: {},
						},
						{
							// r13 - Sake cup
							Property: {},
						},
						{
							// r14 - Penauts
							Property: {},
						},
						{
							// r15 - Banana split
							Property: {},
						},
						{
							// r16 - Sundae
							Property: {},
						},
						{
							// r17 - Fries
							Property: {},
						},
						{
							// r18 - Burguer
							Property: {},
						},
						{
							// r19 - Origiri
							Property: {},
						},
						{
							// r20 - Hot dog
							Property: {},
						},
						{
							// r21 - Taco
							Property: {},
						},
						{
							// r22 - Bill and changes
							Property: {},
						},
						{
							// r23 - Ashtray
							Property: {},
						},
					],
				},
			],
		}, // ExclusiveWaitress
		Highchair: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Drink",
					Key: "b",
					Options: [
						{}, // None
						{}, // Bottle
						{}, // Sippy
					],
				},
				{
					Name: "Stains",
					Key: "c",
					Options: [
						{}, // None
						{}, // Stains
					],
				},
				{
					Name: "Food",
					Key: "a",
					Options: [
						{}, // None
						{}, // Baby Food
						{}, // Plate of Food
						{}, // Cookies
					],
				},
			],
		},
		SingleBalletBoot: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemBoots", AssetName: "SingleBalletBoot" },
		}, // SingleBalletBoot
		GiftBox: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Open",
				},
				{
					Name: "Closed",
					Property: {
						SetPose: ["AllFours"],
						AllowActivePose: ["Hogtied"],
						Hide: ["ItemButt", "TailStraps", "Wings"],
						HideItem: ["ItemMiscTeddyBear"],
						HideItemExclude: [
							"ItemArmsBitchSuit",
							"ItemArmsBitchSuitExposed",
							"ItemArmsShinyPetSuit",
						],
						Block: [
							"ItemArms",
							"ItemBreast",
							"ItemButt",
							"ItemFeet",
							"ItemBoots",
							"ItemLegs",
							"ItemMisc",
							"ItemNipples",
							"ItemNipplesPiercings",
							"ItemPelvis",
							"ItemTorso",
							"ItemVulva",
							"ItemVulvaPiercings",
						],
					},
					Random: false,
				},
			],
		}, //GiftBox
		XFrame: {
			Archetype: ExtendedArchetype.MODULAR,

			Modules: [
				{
					Name: "ArmRestraint",
					Key: "a",
					Options: [
						{}, // a0 - None
						{
							Prerequisite: "CuffedArms",
							Property: {
								SetPose: ["OverTheHead"],
								Difficulty: 9,
								Effect: [E.Block, E.Mounted, E.Freeze],
							},
						}, // a1 - Cuff Links
						{
							Prerequisite: "CuffedArms",
							Property: {
								SetPose: ["Yoked"],
								Difficulty: 9,
								Effect: [E.Block, E.Mounted, E.Freeze],
							},
						}, // a2 - Low Cuff Chain
						{
							Property: {
								SetPose: ["OverTheHead"],
								Difficulty: 9,
								Effect: [E.Block, E.Mounted, E.Freeze],
							},
						}, // a3 Rope Ties
					],
				},
				{
					Name: "LegRestraint",
					Key: "b",
					Options: [
						{}, // b0 None
						{
							Prerequisite: "CuffedFeet",
							Property: {
								SetPose: ["BaseLower"],
								Effect: [E.Mounted, E.Freeze],
							},
						}, // b1 - Cuff Links
						{
							Property: {
								SetPose: ["Spread"],
								Effect: [E.Mounted, E.Freeze],
							},
						}, // b2 Rope Ties
						{
							Property: {
								SetPose: ["LegsClosed"],
								Effect: [E.Mounted, E.Freeze],
							},
						}, // b3 Rope Ties (Together)
						{
							Property: {
								SetPose: ["KneelingSpread"],
								OverrideHeight: { Height: 3, Priority: 60 },
								Effect: [E.Mounted, E.Freeze],
							},
						}, // b4 Rope Tied (Hips)
					],
				},
				{
					Name: "Chains",
					Key: "c",
					Options: [
						{}, // c0 No Chains
						{}, // c1 Chains
					],
				},
				{
					Name: "Stains",
					Key: "s",
					Options: [
						{}, // s0 No Stains
						{}, // s1 Stains
					],
				},
			],
		}, //XFrame
	}, // ItemDevices
	ItemBoots: {
		ToeTape: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Toes",
					Property: { Difficulty: 0 },
				},
				{
					Name: "Full",
					Property: { Difficulty: 2 },
				},
			],
			DialogPrefix: {
				Header: "SelectTapeWrapping",
				Option: "ToeTapePose",
				Chat: "ToeTapeSet",
				Npc: "",
			},
		}, // ToeTape
		FuturisticHeels: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Shoes",
					Property: { HeightModifier: 6 },
				},
				{
					Name: "Heel",
					Property: { HeightModifier: 16 },
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticHeels
		FuturisticHeels2: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Shiny" }, { Name: "Matte" }],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticHeels2
		MonoHeel: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Full",
					Property: { Difficulty: 1 },
				},
				{
					Name: "Half",
					Property: { Difficulty: 0 },
				},
			],
		}, // MonoHeel
		TormentHeels: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Boots",
					Key: "b",
					Options: [
						{
							// b0 - Shoes mode
							Property: { Difficulty: 0 },
						},
						{
							// b1 - Boots mode
							Property: { Difficulty: 1 },
						},
					],
				},
				{
					Name: "Vibration",
					Key: "v",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1, Effect: [] } }, // v0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // v1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // v2 - Medium
						{ Property: { Intensity: 1, Effect: [E.Egged, E.Vibrating] } }, // v3 - High
						{ Property: { Intensity: 2, Effect: [E.Egged, E.Vibrating] } }, // v4 - Maximum
					],
				},
			],
			ChangeWhenLocked: false,
		}, // TormentHeels
		StrictPonyBoots: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Base" }, { Name: "BootsOnly" }],
		}, // StrictPonyBoots
		BalletMittens: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Pogo",
					Key: "p",
					Options: [
						{
							// p0 - None
							Property: {},
						},
						{
							// p1 - LightPogo
							Property: {
								Effect: [E.BlockWardrobe],
								SetPose: ["LegsClosed"],
								Difficulty: 4,
							},
						},
						{
							// p2 - HeavyPogo
							Property: {
								Effect: [E.Freeze, E.BlockWardrobe],
								SetPose: ["LegsClosed"],
								Difficulty: 8,
							},
						},
					],
				},
			],
		}, // BalletMittens
		HeellessHoof: {
			Archetype: ExtendedArchetype.TYPED,
			ChangeWhenLocked: false,
			Options: [
				{
					Name: "Hoofs",
					Property: {},
				},
				{
					Name: "IronBallet",
					Expression: [
						{ Name: "Low", Group: "Blush", Timer: 10 },
						{ Name: "Soft", Group: "Eyebrows", Timer: 10 },
						{ Name: "Sad", Group: "Eyes", Timer: 10 },
					],
					Property: {
						Difficulty: 5,
						Effect: [E.Slow],
					},
				},
			],
		}, // HeellessHoof
		HoofBoots: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Normal",
					Property: {},
				},
				{
					Name: "Straps",
					Property: { Difficulty: 5 },
				},
			],
		}, // HoofBoots
		ZipperBBoots: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: {},
				},
				{
					Name: "FullLeg",
					Property: { Difficulty: 2 },
				},
			],
		}, // ZipperBBoots
		SingleBalletBoot: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Mode",
					Key: "m",
					Options: [
						{
							// m0 - Stand up restraint mode
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
							},
						},
						{
							// m1 - Kneel restraint mode
							Property: {
								Effect: [E.BlockWardrobe, E.Freeze],
								SetPose: ["Kneel"],
							},
						},
						{
							// m2 - Training hops
							Property: { Effect: [E.BlockWardrobe, E.Slow] },
						},
					],
				},
				{
					Name: "Thighs",
					Key: "t",
					Options: [
						{
							// t0 - Just under knee boot
							Property: {},
						},
						{
							// t1 - Full boot length
							Property: { Difficulty: 2 },
						},
					],
				},
				{
					Name: "LowerBelts",
					Key: "e",
					Options: [
						{
							// e0 - No belts
							Property: {},
						},
						{
							// e1 - Under knee belts
							Property: { Difficulty: 3 },
						},
					],
				},
				{
					Name: "ThighBelts",
					Key: "b",
					Options: [
						{
							// b0 - No belts
							Property: {},
						},
						{
							// b1 - Thigh belts
							Property: { Difficulty: 3 },
						},
					],
				},
				{
					Name: "FoamTape",
					Key: "f",
					Options: [
						{
							// f0 - No tape
							Property: {},
						},
						{
							// f1 - Under knee
							Property: { Difficulty: 5 },
						},
						{
							// f2 - Full leg
							Property: { Difficulty: 7 },
						},
					],
				},
				{
					Name: "Pillory",
					Key: "p",
					Options: [
						{
							// p0 - No pillory
							Property: {},
						},
						{
							// p1 - Double pillories
							Property: { Difficulty: 8 },
						},
					],
				},
				{
					Name: "Vibration",
					Key: "v",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1, Effect: [] } }, // v0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // v1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // v2 - Medium
						{ Property: { Intensity: 1, Effect: [E.Egged, E.Vibrating] } }, // v3 - High
						{ Property: { Intensity: 2, Effect: [E.Egged, E.Vibrating] } }, // v4 - Maximum
					],
				},
			],
			ChangeWhenLocked: false,
			DrawImages: false,
		}, // SingleBalletBoot
	}, // ItemBoots
	ItemVulva: {
		ClitSuctionCup: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Loose",
					Property: {
						SuctionLevel: 0,
					},
				},
				{
					Name: "Light",
					Property: {
						SuctionLevel: 1,
					},
				},
				{
					Name: "Medium",
					Property: {
						SuctionLevel: 2,
					},
				},
				{
					Name: "Heavy",
					Property: {
						SuctionLevel: 3,
					},
				},
				{
					Name: "Maximum",
					Property: {
						SuctionLevel: 4,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectSuctionLevel",
				Option: "SuctionLevel",
				Chat: ({ newIndex, previousIndex }) =>
					`ClitSuc${newIndex > previousIndex ? "tightens" : "loosens"}To`,
				Npc: "ItemVulvaClitSuctionCupNPCReaction",
			},
			DrawImages: false,
		}, // ClitSuctionCup
		DoubleEndDildo: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.DEST_CHAR_NAME, CommonChatTags.ASSET_NAME],
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Large",
				},
			],
			DrawImages: false,
		}, // DoubleEndDildo
		VibratingDildo: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibratingDildo
		ClitoralStimulator: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // ClitoralStimulator
		VibratingEgg: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibratingEgg
		VibratingLatexPanties: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibratingLatexPanties
		InflatableVibratingPanties: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "InflateLevel",
					Key: "f",
					DrawImages: false,
					Options: [
						{ Property: { InflateLevel: 0 } }, // f0 - Empty
						{ Property: { InflateLevel: 1 } }, // f1 - Light
						{ Property: { InflateLevel: 2 } }, // f2 - Inflated
						{ Property: { InflateLevel: 3 } }, // f3 - Bloated
						{ Property: { InflateLevel: 4 } }, // f4 - Maximum
					],
				},
				{
					Name: "Intensity",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1 } }, // i0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // i1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // i2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Vibrating] } }, // i3 - High
						{ Property: { Intensity: 3, Effect: [E.Vibrating] } }, // i4 - Maximum
					],
				},
			],
			ScriptHooks: {
				Draw: InventoryItemButtInflVibeButtPlugDrawHook,
			},
			DialogPrefix: {
				Header: "InflatableVibratingPantiesSelect",
				Module: "InflatableVibratingPantiesModule",
				Option: "InflatableVibratingPantiesOption",
				Chat: ({ previousOption, newOption }) => {
					const Prefix = "InflatableVibratingPanties";
					const Change =
						Number.parseInt(newOption.Name[1]) -
						Number.parseInt(previousOption.Name[1]);
					const StateChange = Change > 0 ? "Increase" : "Decrease";
					return `${Prefix}${StateChange}To`;
				},
			},
		}, // InflatableVibratingPanties
		WandBelt: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // WandBelt
		FullLatexSuitWand: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // FullLatexSuitWand
		HempRopeBelt: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // HempRopeBelt
		WiredEgg: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // WiredEgg
		Stitches: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Straight",
				},
				{
					Name: "ZigZag",
				},
				{
					Name: "Skewed",
				},
				{
					Name: "Cross",
				},
			],
		}, // Stitches
		VibeEggPenisBase: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibeEggPenisBase
		InflatableVibeDildo: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemButt", AssetName: "InflVibeButtPlug" },
		}, // InflatableVibeDildo
		ShockDildo: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarShockUnit",
			},
			DialogPrefix: {
				Header: "ItemNeckAccessoriesCollarShockUnitSelect",
				Option: "ItemNeckAccessoriesCollarShockUnit",
				Chat: "ItemNeckAccessoriesCollarShockUnitSet",
				Npc: "ItemNeckAccessoriesCollarShockUnit",
			},
		}, // ShockDildo
		ClitAndDildoVibratorbelt: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [CommonChatTags.DEST_CHAR_NAME, CommonChatTags.ASSET_NAME],
			Modules: [
				{
					Name: "DildoIntensity",
					Key: "d",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1 } }, // d0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // d1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // d2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Vibrating] } }, // d3 - High
						{ Property: { Intensity: 3, Effect: [E.Vibrating] } }, // d4 - Maximum
					],
				},
				{
					Name: "EggIntensity",
					Key: "e",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1 } }, // e0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // e1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // e2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Vibrating] } }, // e3 - High
						{ Property: { Intensity: 3, Effect: [E.Vibrating] } }, // e4 - Maximum
					],
				},
			],
			ScriptHooks: {
				Draw: InventoryItemVulvaClitAndDildoVibratorbeltDrawHook,
				SetOption: InventoryItemVulvaClitAndDildoVibratorbeltSetOptionHook,
			},
			DialogPrefix: {
				Chat: ({ previousOption, newOption }) => {
					if (DialogFocusItem == null) {
						return "";
					}
					const Prefix =
						DialogFocusItem.Asset.Group.Name + DialogFocusItem.Asset.Name;
					const Change =
						Number.parseInt(newOption.Name[1]) -
						Number.parseInt(previousOption.Name[1]);
					const StateChange = Change > 0 ? "Increase" : "Decrease";
					return `${Prefix}${StateChange}`;
				},
			},
		}, // ClitAndDildoVibratorbelt
		LoversVibrator: {
			Archetype: ExtendedArchetype.VIBRATING,
			DrawData: VibratorModeGetDrawData(
				[VibratorModeSet.ADVANCED, VibratorModeSet.STANDARD],
				{},
				525,
			),
		}, // LoversVibrator
		FuturisticVibrator: {
			Archetype: ExtendedArchetype.VIBRATING,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
				CommonChatTags.AUTOMATIC,
			],
			ScriptHooks: {
				Load: InventoryItemVulvaFuturisticVibratorLoadHook,
				Draw: InventoryItemVulvaFuturisticVibratorDrawHook,
				Click: InventoryItemVulvaFuturisticVibratorClickHook,
				Exit: InventoryItemVulvaFuturisticVibratorExitHook,
				Validate: FuturisticAccessValidate,
				ScriptDraw: AssetsItemVulvaFuturisticVibratorScriptDrawHook,
			},
			BaselineProperty: {
				AccessMode: "",
				TriggerValues: CommonConvertArrayToString(
					ItemVulvaFuturisticVibratorTriggers,
				),
			},
		}, // FuturisticVibrator
		FullCasingCage: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Fox",
				},
				{
					Name: "Dog",
				},
			],
			DialogPrefix: {
				Header: "SelectCageType",
				Option: "FullCasingCageType",
				Chat: "FullCasingCageSet",
			},
		}, //Full Casing Cage
		LatexNulge: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // Latex Nulge
		MysteryBox: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Closed",
					Property: {
						Block: ["ItemPelvis", "ItemVulvaPiercings"],
						Hide: ["ItemVulvaPiercings", "Panties", "Pussy"],
						HideItem: [
							"ItemVulvaVibratingLatexPanties",
							"ItemVulvaVibratingDildo",
							"ItemVulvaInflatableVibeDildo",
							"ItemVulvaClitSuctionCup",
							"ItemVulvaTapeStrips",
							"ItemVulvaBenWaBalls",
							"ItemVulvaHeavyWeightClamp",
							"ItemVulvaShockDildo",
						],
					},
				},
				{
					Name: "Open",
					Property: {
						Block: [],
						HideItem: [],
					},
				},
			],
		}, // MysteryBox
		UsedCondom: {
			Archetype: "typed",
			DrawImages: false,
			Options: [{ Name: "A" }, { Name: "B" }, { Name: "C" }],
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
		}, // UsedCondom
	}, // ItemVulva
	ItemVulvaPiercings: {
		ClitRing: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Base",
					Property: {
						Effect: [],
					},
				},
				{
					Name: "Leash",
					Prerequisite: ["NotSuspended"],
					Property: {
						Effect: [E.Leash, E.Wiggling],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectAttachmentState",
				Option: "ClitRingPose",
				Chat: "ClitRingRestrain",
			},
		}, // ClitRing
		RoundClitPiercing: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Ring",
					Property: {
						Effect: [],
					},
				},
				{
					Name: "Weight",
					Property: {
						Effect: [E.Wiggling],
					},
				},
				{
					Name: "Bell",
					Property: {
						Effect: [E.Wiggling],
					},
				},
				{
					Name: "Chain",
					Property: {
						Effect: [E.Wiggling],
						Block: ["ItemNipplesPiercings"],
					},
					Prerequisite: ["NeedsNippleRings"],
				},
				{
					Name: "HaremChain",
					Property: {
						Effect: [E.Wiggling],
						Block: ["ItemNipplesPiercings"],
					},
					Prerequisite: ["NeedsNippleRings"],
				},
			],
		}, // RoundClitPiercings
		VibeHeartClitPiercing: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibeHeartClitPiercing
		TapedClitEgg: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // TapedClitEgg
		VibeEggGlans: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibeEggGlans
		UrethralSound: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "In",
					Property: {
						Effect: [E.DenialMode],
					},
				},
				{
					Name: "Out",
				},
			],
			DrawImages: false,
		}, // UrethralSound
	}, // ItemVulvaPiercings
	ItemButt: {
		WolfTail3: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Style",
					Key: "s", //Style
					DrawImages: false,
					Options: [
						{}, //s0 - Style 1 - Original Style
						{}, //s1 - Style 2 - Flipped Style
					],
				},
				{
					Name: "Rotation",
					Key: "r", //Rotation
					DrawImages: false,
					Options: [
						{}, //r0 - TL - Top Left
						{}, //r1 - TR - Top Right
						{}, //r2 - BL - Bottom Left
						{}, //r3 - BR - Bottom Right
					],
				},
			],
		},
		RaccoonTailPlug: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		KittenTail1: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		KittenTail2: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		FoxTail: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "TL",
				},
				{
					Name: "TR",
				},
				{
					Name: "BL",
				},
				{
					Name: "BR",
				},
			],
		},
		AnalHook: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Base",
					Property: {
						Difficulty: 0,
						Intensity: 0,
					},
				},
				{
					Name: "Chain",
					Property: {
						Difficulty: 8,
						Intensity: 1,
						Effect: [E.Freeze, E.Egged],
					},
					Random: false,
				},
				{
					Name: "Hair",
					Property: {
						Difficulty: 4,
						Intensity: 1,
						Effect: [E.Egged],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectAttachmentState",
				Option: "AnalHookPose",
				Chat: "AnalHookRestrain",
				Npc: "InventoryItemButtAnalHookNPCReaction",
			},
		}, // AnalHook
		ButtPlugLock: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Base",
				},
				{
					Name: "ChainShort",
					Property: {
						Effect: [E.Freeze, E.IsChained, E.MapImmobile],
						SetPose: ["Kneel"],
					},
					Random: false,
				},
				{
					Name: "ChainLong",
					Prerequisite: ["NotSuspended"],
					Property: {
						Effect: [E.Tethered, E.IsChained, E.MapImmobile],
					},
					Random: false,
				},
			],
			DialogPrefix: {
				Header: "SelectAttachmentState",
				Option: "ButtPlugLockPose",
				Chat: "ButtPlugLockRestrain",
				Npc: "ButtPlugLockSet",
			},
		}, // ButtPlugLock
		ButtPump: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Empty",
					Property: {
						InflateLevel: 0,
					},
				},
				{
					Name: "Light",
					Property: {
						InflateLevel: 1,
					},
				},
				{
					Name: "Inflated",
					Property: {
						InflateLevel: 2,
					},
				},
				{
					Name: "Bloated",
					Property: {
						InflateLevel: 3,
					},
				},
				{
					Name: "Maximum",
					Property: {
						InflateLevel: 4,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectInflateLevel",
				Option: "InflateLevel",
				Chat: ({ newIndex, previousIndex }) =>
					`BPumps${newIndex > previousIndex ? "pumps" : "deflates"}To`,
				Npc: "InventoryItemButtButtPumpNPCReaction",
			},
			DrawImages: false,
		}, // ButtPump
		VibratingButtplug: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibratingButtplug
		VibratingDildoPlug: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibratingDildoPlug
		BunnyTailVibePlug: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // BunnyTailVibePlug
		EggVibePlugXXL: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // EggVibePlugXXL
		LockingVibePlug: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // LockingVibePlug
		FuckPlug: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // FuckPlug
		AnalBeads2: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{ Name: "_1in", Property: { InsertedBeads: 1 } },
				{ Name: "_2in", Property: { InsertedBeads: 2 } },
				{ Name: "_3in", Property: { InsertedBeads: 3 } },
				{ Name: "_4in", Property: { InsertedBeads: 4 } },
				{ Name: "_5in", Property: { InsertedBeads: 5 } },
			],
			DrawImages: false,
			ChatSetting: TypedItemChatSetting.SILENT,
			ScriptHooks: {
				PublishAction: InventoryItemButtAnalBeads2PublishActionHook,
			},
		}, // AnalBeads2
		InflVibeButtPlug: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "InflateLevel",
					Key: "f",
					DrawImages: false,
					Options: [
						{ Property: { InflateLevel: 0 } }, // f0 - Empty
						{ Property: { InflateLevel: 1 } }, // f1 - Light
						{ Property: { InflateLevel: 2 } }, // f2 - Inflated
						{ Property: { InflateLevel: 3 } }, // f3 - Bloated
						{ Property: { InflateLevel: 4 } }, // f4 - Maximum
					],
				},
				{
					Name: "Intensity",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1, Effect: [E.Egged] } }, // i0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Egged, E.Vibrating] } }, // i1 - Low
						{ Property: { Intensity: 1, Effect: [E.Egged, E.Vibrating] } }, // i2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Egged, E.Vibrating] } }, // i3 - High
						{ Property: { Intensity: 3, Effect: [E.Egged, E.Vibrating] } }, // i4 - Maximum
					],
				},
			],
			ScriptHooks: {
				Draw: InventoryItemButtInflVibeButtPlugDrawHook,
			},
			DialogPrefix: {
				Header: "ItemButtInflVibeButtPlugSelect",
				Module: "ItemButtInflVibeButtPlugModule",
				Option: "ItemButtInflVibeButtPlugOption",
				Chat: ({ previousOption, newOption }) => {
					const Prefix = "ItemButtInflVibeButtPlug";
					const Change =
						Number.parseInt(newOption.Name[1]) -
						Number.parseInt(previousOption.Name[1]);
					const StateChange = Change > 0 ? "Increase" : "Decrease";
					return `${Prefix}${StateChange}To`;
				},
			},
		}, // InflVibeButtPlug
		ShockPlug: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarShockUnit",
			},
			DialogPrefix: {
				Header: "ItemNeckAccessoriesCollarShockUnitSelect",
				Option: "ItemNeckAccessoriesCollarShockUnit",
				Chat: "ItemNeckAccessoriesCollarShockUnitSet",
				Npc: "ItemNeckAccessoriesCollarShockUnit",
			},
		}, // ShockPlug
	}, // ItemButt
	ItemNipplesPiercings: {
		RoundPiercing: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Base",
					BondageLevel: 0,
					Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
					Property: {
						Difficulty: 0,
					},
				},
				{
					Name: "Chain",
					BondageLevel: 0,
					Prerequisite: ["AccessBreast", "AccessBreastSuitZip", "Collared"],
					Property: {
						Difficulty: 0,
						Block: ["ItemNeck"],
						AllowActivityOn: ["ItemNeck"],
					},
				},
				{
					Name: "Weighted",
					BondageLevel: 0,
					Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
					Property: {
						Difficulty: 0,
						Effect: [E.Wiggling],
					},
				},
				{
					Name: "WeightedChain",
					BondageLevel: 0,
					Prerequisite: ["AccessBreast", "AccessBreastSuitZip", "Collared"],
					Property: {
						Difficulty: 0,
						Block: ["ItemNeck"],
						AllowActivityOn: ["ItemNeck"],
						Effect: [E.Wiggling],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectPiercingState",
				Option: "RoundPiercingPose",
				Chat: "RoundPiercingRestrain",
				Npc: "RoundPiercingNPCReaction",
			},
		}, // RoundPiercing
		VibeHeartPiercings: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibeHeartPiercings
	}, // ItemNipplesPiercings
	ItemNipples: {
		ChainClamp: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Chain",
				},
				{
					Name: "Chain2",
				},
			],
			DialogPrefix: {
				Header: "SelectChainType",
				Option: "ChainClapNipples",
				Chat: "ChainClampSet",
				Npc: "ItemNipplesChainClamp",
			},
		}, //ChainClamp
		LactationPump: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Off",
					Property: {
						SuctionLevel: 0,
					},
				},
				{
					Name: "LowSuction",
					Property: {
						SuctionLevel: 1,
					},
				},
				{
					Name: "MediumSuction",
					Property: {
						SuctionLevel: 2,
					},
				},
				{
					Name: "HighSuction",
					Property: {
						SuctionLevel: 3,
					},
				},
				{
					Name: "MaximumSuction",
					Property: {
						SuctionLevel: 4,
					},
				},
			],
			DialogPrefix: {
				Header: "LactationPumpSelectSetting",
				Option: "LactationPump",
				Chat: ({ newIndex, previousIndex }) =>
					`LactationPumpPower${
						newIndex > previousIndex ? "tightens" : "loosens"
					}To`,
			},
			DrawImages: false,
		}, // LactationPump
		NippleSuctionCups: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Loose",
					Property: {
						SuctionLevel: 0,
					},
				},
				{
					Name: "Light",
					Property: {
						SuctionLevel: 1,
					},
				},
				{
					Name: "Medium",
					Property: {
						SuctionLevel: 2,
					},
				},
				{
					Name: "Heavy",
					Property: {
						SuctionLevel: 3,
					},
				},
				{
					Name: "Maximum",
					Property: {
						SuctionLevel: 4,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectSuctionLevel",
				Option: "SuctionLevel",
				Chat: ({ newIndex, previousIndex }) =>
					`NipSuc${newIndex > previousIndex ? "tightens" : "loosens"}To`,
			},
			DrawImages: false,
		}, // NippleSuctionCups
		PlateClamps: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Loose",
				},
				{
					Name: "Tight",
				},
			],
			DialogPrefix: {
				Header: "ItemNipplesPlateClampsSelectTightness",
				Option: "ItemNipplesPlateClampsTightnessLevel",
				Chat: "ItemNipplesPlateClamps",
			},
			DrawImages: false,
		}, // PlateClamps
		VibeNippleClamp: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // VibeNippleClamp
		TapedVibeEggs: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // TapedVibeEggs
		NippleVibe: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // NippleVibe
		ShockClamps: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemNeckAccessories",
				AssetName: "CollarShockUnit",
			},
			DialogPrefix: {
				Header: "ItemNeckAccessoriesCollarShockUnitSelect",
				Option: "ItemNeckAccessoriesCollarShockUnit",
				Chat: "ItemNeckAccessoriesCollarShockUnitSet",
				Npc: "ItemNeckAccessoriesCollarShockUnit",
			},
		}, // ShockClamps
	}, // ItemNipples
	Corset: {
		LatexCorset1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Garter",
				},
				{
					Name: "Garterless",
				},
			],
			DialogPrefix: {
				Header: "LatexCorset1Select",
				Option: "LatexCorset1",
				Chat: "LatexCorset1Set",
			},
		}, // LatexCorset1
		CorsetDress: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Cloth", AssetName: "CorsetDress" },
		}, // CorsetDress
		BarrelCorset: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "BarrelCorset" },
			DialogPrefix: {
				Header: "ItemTorsoBarrelCorsetSelect",
				Module: "ItemTorsoBarrelCorsetModule",
				Option: "ItemTorsoBarrelCorsetOption",
				Chat: "ItemTorsoBarrelCorsetSet",
			},
			// This is a copy, just because we don't want any item-type effects on that one
			Modules: [
				{
					Name: "Priority",
					Key: "z",
					Options: [
						{
							// Under Clothes
							Property: {
								OverridePriority: {
									Upper: 25,
									Lower: 25,
									Upper4: 25,
									BellyB: 25,
									BellyM: 25,
									BellyLock: 25,
									LegB: 25,
									LegM: 25,
									LegLock: 25,
									Neck: 25,
									NeckB: 25,
									NeckM: 25,
								},
							},
						},
						{
							// Over Clothes
							Property: {
								OverridePriority: {
									Upper: 30,
									Lower: 30,
									Upper4: 30,
									BellyB: 30,
									BellyM: 30,
									BellyLock: 30,
									LegB: 30,
									LegM: 30,
									LegLock: 30,
									Neck: 30,
									NeckB: 30,
									NeckM: 30,
								},
								Hide: ["ClothLower", "Panties", "Garters"],
								HideItem: [
									"ClothAccessoryLeatherBeltCloth",
									"ClothFurCoat",
									"CorsetCorsetDress",
								],
							},
						},
					],
				},
				{
					Name: "NeckCollar",
					Key: "y",
					Options: [
						{}, // None
						{}, // Equipped
						{}, // Equipped with straps
					],
				},
				{
					Name: "BellyBelt",
					Key: "w",
					Options: [
						{}, // None
						{}, // Equipped
					],
				},
				{
					Name: "LegBelts",
					Key: "x",
					Options: [
						{}, // None
						{}, // Equipped
					],
				},
			],
		}, // BarrelCorset
	}, // Corset
	ItemTorso: {
		HeavyLatexCorset: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Straps",
				},
			],
			DialogPrefix: {
				Header: "SelectHeavyLatexCorsetType",
				Option: "HeavyLatexCorsetType",
				Chat: "HeavyLatexCorsetSet",
				Npc: "HeavyLatexCorset",
			},
		}, // HeavyLatexCorset
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Basic",
					Property: { Difficulty: 1 },
				},
				{
					Name: "Harness1",
					BondageLevel: 2,
					Property: { Difficulty: 3, Effect: [E.CrotchRope] },
				},
				{
					Name: "Harness2",
					BondageLevel: 3,
					Property: { Difficulty: 4, Effect: [E.CrotchRope] },
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
				Option: "RibbonsTorso",
				Chat: "TorsoRibbonsSet",
				Npc: "ItemTorsoRibbons",
			},
		}, // Ribbons
		HighSecurityHarness: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "LowSec",
				},
				{
					Name: "h2", // MedSec
					Property: { Difficulty: 5, Effect: [E.CrotchRope] },
				},
				{
					Name: "h3", // MedSecBreast
					Property: { Difficulty: 5 },
				},
				{
					Name: "h4", // MaxSec
					Property: { Difficulty: 10, Effect: [E.CrotchRope] },
				},
			],
			DialogPrefix: {
				Header: "HighSecurityHarnessType",
				Option: "HighSecurityHarnessType",
				Chat: "HighSecurityHarnessSet",
			},
		}, // HighSecurityHarness
		LatexCorset1: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Corset", AssetName: "LatexCorset1" },
		}, //LatexCorset1
		ThinLeatherStraps: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Crotch" }, { Name: "Waist" }, { Name: "Harness" }],
		}, // ThinLeatherStraps
		NylonRopeHarness: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "HempRopeHarness" },
		}, // NylonRopeHarness
		HempRopeHarness: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Crotch",
					Property: {
						Difficulty: 1,
						Effect: [E.CrotchRope],
						Attribute: ["IsHipHarness"],
					},
				},
				{
					Name: "Waist",
					Property: { Difficulty: 1, Attribute: ["IsHipHarness"] },
				},
				{
					Name: "Harness",
					BondageLevel: 2,
					Property: {
						Difficulty: 1,
						Effect: [E.CrotchRope],
						Attribute: ["IsHipHarness"],
					},
				},
				{
					Name: "Star",
					BondageLevel: 3,
					Property: { Difficulty: 2 },
				},
				{
					Name: "Diamond",
					BondageLevel: 4,
					Property: {
						Difficulty: 3,
						Effect: [E.CrotchRope],
						Attribute: ["IsHipHarness"],
					},
				},
				{
					Name: "Hishi",
					BondageLevel: 4,
					Property: {
						Difficulty: 4,
						Effect: [E.CrotchRope],
						Attribute: ["IsHipHarness"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Chat: "RopeHarnessSet",
				Npc: "RopeBondage",
			},
		}, // HempRopeHarness
		LockingSwimsuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Shiny",
				},
				{
					Name: "Dull",
				},
			],
		}, //LockingSwimsuit
		FuturisticHarness: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Full",
					Property: { Difficulty: 2 },
				},
				{
					Name: "Upper",
					Property: { Difficulty: 0 },
				},
				{
					Name: "Lower",
					Property: { Difficulty: 0 },
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: InventoryItemTorsoFuturisticHarnessClickHook,
				Draw: InventoryItemTorsoFuturisticHarnessDrawHook,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticHarness
		NavelBar1: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Jewel",
					Key: "j",
					DrawImages: false,
					Options: [
						{ Property: {} }, // j0 - Detached
						{ Property: {} }, // j1 - Attached
					],
				},
				{
					Name: "Chain",
					Key: "c",
					DrawImages: false,
					Options: [
						{ Property: {} }, // c0 - Detached
						{ Property: {} }, // c1 - Single Chain
						{ Property: {} }, // c2 - Waist Chain
					],
				},
			],
		}, // NavelBar1
		SteelBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Belt",
					Key: "b",
					Options: [
						{
							// Under clothes
							Property: {},
						},
						{
							// Over clothes
							Property: {
								HideItem: ["ClothAccessoryLeatherBeltCloth"],
								OverridePriority: {
									Belt: 31,
									BDetail: 31,
									Lock: 31,
								},
							},
						},
					],
				},
				{
					Name: "Handcuffs",
					Key: "h",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Front
							Property: {
								Difficulty: 3,
								SetPose: ["BaseUpper"],
								Effect: [E.Block, E.BlockWardrobe],
							},
						},
						{
							// BackBoxTie
							Property: {
								Difficulty: 5,
								SetPose: ["BackBoxTie"],
								Effect: [E.Block, E.BlockWardrobe],
								HideItem: ["ItemArmsWristShackles"],
							},
						},
						{
							// Strict
							Prerequisite: ["NoItemArms"],
							Property: {
								Difficulty: 7,
								SetPose: ["BackElbowTouch"],
								Effect: [E.Block, E.BlockWardrobe],
								Block: ["ItemArms"],
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // SteelBelt
		BarrelCorset: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Priority",
					Key: "z",
					Options: [
						{
							// Under Clothes
							Property: {
								OverridePriority: {
									Upper: 25,
									Lower: 25,
									Upper4: 25,
									BellyB: 25,
									BellyM: 25,
									BellyLock: 25,
									LegB: 25,
									LegM: 25,
									LegLock: 25,
									Neck: 25,
									NeckB: 25,
									NeckM: 25,
								},
							},
						},
						{
							// Over Clothes
							Property: {
								OverridePriority: {
									Upper: 30,
									Lower: 30,
									Upper4: 30,
									BellyB: 30,
									BellyM: 30,
									BellyLock: 30,
									LegB: 30,
									LegM: 30,
									LegLock: 30,
									Neck: 30,
									NeckB: 30,
									NeckM: 30,
								},
								Hide: ["ClothLower", "Panties", "Garters"],
								HideItem: [
									"ClothAccessoryLeatherBeltCloth",
									"ClothFurCoat",
									"CorsetCorsetDress",
								],
							},
						},
					],
				},
				{
					Name: "Tightness",
					Key: "s",
					Options: [
						{
							// Loose
							Property: {},
						},
						{
							// Thigh
							Property: {
								Difficulty: 3,
								Effect: [E.BlockWardrobe, E.Freeze],
							},
							Expression: [
								{ Name: "Low", Group: "Blush", Timer: 10 },
								{ Name: "OneRaised", Group: "Eyebrows", Timer: 10 },
								{ Name: "Surprised", Group: "Eyes", Timer: 10 },
								{ Name: "HalfOpen", Group: "Mouth", Timer: 10 },
							],
						},
					],
				},
				{
					Name: "NeckCollar",
					Key: "y",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Equipped
							Property: { Difficulty: 1 },
						},
						{
							// Equipped with straps
							Property: { Difficulty: 2 },
						},
					],
				},
				{
					Name: "BellyBelt",
					Key: "w",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Equipped
							Property: { Difficulty: 2 },
						},
					],
				},
				{
					Name: "LegBelts",
					Key: "x",
					Options: [
						{
							// None
							Property: {},
						},
						{
							// Equipped
							Property: { Difficulty: 2 },
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // BarrelCorset
	}, // ItemTorso
	ItemTorso2: {
		LockingSwimsuit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "LockingSwimsuit" },
		}, // LockingSwimsuit
		NylonRopeHarness: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "HempRopeHarness" },
		}, // NylonRopeHarness
		HempRopeHarness: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "HempRopeHarness" },
		}, // HempRopeHarness
		HighSecurityHarness: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "HighSecurityHarness" },
		}, // HighSecurityHarness
		LatexCorset1: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Corset", AssetName: "LatexCorset1" },
		}, // LatexCorset1
		HeavyLatexCorset: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "HeavyLatexCorset" },
		}, // HeavyLatexCorset
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "Ribbons" },
		}, // Ribbons
		ThinLeatherStraps: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "ThinLeatherStraps" },
		}, // ThinLeatherStraps
		FuturisticHarness: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "FuturisticHarness" },
			DialogPrefix: {
				Header: "ItemTorsoFuturisticHarnessSelect",
				Option: "ItemTorsoFuturisticHarness",
				Chat: "ItemTorsoFuturisticHarnessSet",
			},
		}, // FuturisticHarness
		NavelBar1: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "NavelBar1" },
		}, // NavelBar1
		SteelBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "SteelBelt" },
		}, // SteelBelt
		BarrelCorset: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "BarrelCorset" },
		}, // BarrelCorset
	}, //ItemTorso2
	Shoes: {
		FuturisticHeels2: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Shiny" }, { Name: "Matte" }],
		}, // FuturisticHeels2
		TallerBoots: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Legs",
					Key: "l",
					Options: [
						{
							// l0 - Short Boots
							Property: { Effect: [] },
						},
						{
							// l1 - High Boots
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Belt",
					Key: "b",
					Options: [
						{
							// b0 - No Belt
							Property: { Effect: [] },
						},
						{
							// b1 - Belt
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Metal",
					Key: "m",
					Options: [
						{
							// m0 - No Details
							Property: { Effect: [] },
						},
						{
							// m1 - Metal Details
							Property: { Effect: [] },
						},
					],
				},
			],
		}, // TallerBoots
		ThighBoots: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Layer",
					Key: "l",
					Options: [{}, {}, {}], // None, Sock, Thigh High
				},
				{
					Name: "Band",
					Key: "b",
					Options: [{}, {}], // None, Band
				},
			],
		}, // Thighboots
		StilettoHeels: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Layer",
					Key: "t",
					Options: [{}, {}], // Normal, Round
				},
				{
					Name: "Center",
					Key: "c",
					Options: [{}, {}], // None, Center
				},
			],
		}, // StilettoHeels
		StrictPonyBoots: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			CopyConfig: {
				GroupName: "ItemBoots",
				AssetName: "StrictPonyBoots",
			},
		},
		CustomHeels: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Strap1",
					Key: "m",
					Options: [
						{
							// m0 - None
							Property: { Effect: [] },
						},
						{
							// m1 - Ankle Strap
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Strap2",
					Key: "n",
					Options: [
						{
							// n0 - None
							Property: { Effect: [] },
						},
						{
							// n1 - Mid Strap
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Strap3",
					Key: "o",
					Options: [
						{
							// o0 - No Details
							Property: { Effect: [] },
						},
						{
							// o1 - Lower Strap
							Property: { Effect: [] },
						},
					],
				},
			],
			DrawImages: false,
		}, // CustomHeels
		HeellessHoof: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Normal",
					Property: {},
				},
				{
					Name: "Padlock",
					// Just cosmetic addon
					Property: {},
				},
			],
		}, // HeellessHoof
		HoofBoots: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Normal",
					Property: {},
				},
				{
					Name: "Locked",
					// Just cosmetic addon
					Property: {},
				},
			],
		}, // HoofBoots
		ZipperBBoots: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: {},
				},
				{
					Name: "FullLeg",
					Property: {},
				},
			],
		}, // ZipperBBoots
		PumpHighHeels: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Straps",
					Property: {},
				},
				{
					Name: "None",
					Property: {},
				},
			],
		}, // PumpHighHeels
		ZipperLeatherBoots: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "LeftSide",
					Key: "l",
					DrawImages: false,
					Options: [{}, {}],
				},
				{
					Name: "RightSide",
					Key: "r",
					DrawImages: false,
					Options: [{}, {}],
				},
			],
		}, // ZipperLeatherBoots
	}, // Shoes
	HairAccessory1: {
		ElfEars: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "InFront",
				},
				{
					Name: "Behind",
					Property: { OverridePriority: 10 },
				},
			],
			DialogPrefix: {
				Header: "HairAccessory1ElfEarsSelect",
				Option: "HairAccessory1ElfEars",
			},
		}, // ElfEars
		Halo: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Default",
				},
				{
					Name: "Broken",
				},
			],
			ScriptHooks: {
				Init: PropertyOpacityInit,
				Load: (...args) => PropertyOpacityLoad(...args, "lightbulb"),
				Draw: (...args) => PropertyOpacityDraw(...args, 0, 400, "Brightness"),
				Exit: PropertyOpacityExit,
			},
			BaselineProperty: { Opacity: 0 },
		}, // Halo
		Onihorns: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "LeftHorn",
					Key: "l",
					Options: [{}, {}, {}], //short, med, long
				},
				{
					Name: "RightHorn",
					Key: "r",
					Options: [{}, {}, {}], //short, med, long
				},
			],
		},
		AquaticEars: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Small",
				},
				{
					Name: "Large",
				},
			],
		},
		CustomizableFluffyEars1: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Stud1",
					Key: "s1",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "Stud2",
					Key: "s2",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "Stud3",
					Key: "s3",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "Stud4",
					Key: "s4",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "Bar",
					Key: "b1",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "Bells",
					Key: "b2",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "SmallRing1",
					Key: "r1",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "SmallRing2",
					Key: "r2",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "SmallRing3",
					Key: "r3",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "SmallRing4",
					Key: "r4",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "BigRing1",
					Key: "br1",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "BigRing2",
					Key: "br2",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
				{
					Name: "Tag",
					Key: "t1",
					Options: [{}, {}, {}, {}], // None, Left, Right, Both
				},
			],
		},
		CustomizableFluffyEars2: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableFluffyEars3: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableCatEars: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableElfEars: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableCowEars: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		Antenna: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{ Name: "Right" },
				{ Name: "RightGlowing" },
				{ Name: "Left" },
				{ Name: "LeftGlowing" },
				{ Name: "LeftRight" },
				{ Name: "LeftRightGlowing" },
			],
		}, // Antenna
	}, // HairAccessory1
	HairAccessory2: {
		ElfEars: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "HairAccessory1", AssetName: "ElfEars" },
		},
		Onihorns: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "HairAccessory1", AssetName: "Onihorns" },
		},
		AquaticEars: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "HairAccessory1", AssetName: "AquaticEars" },
		},
		CustomizableFluffyEars1: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableFluffyEars2: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableFluffyEars3: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableCatEars: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableElfEars: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
		CustomizableCowEars: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
		},
	}, // HairAccessory2
	HairAccessory3: {
		Halo: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "HairAccessory1", AssetName: "Halo" },
			DialogPrefix: {
				Header: "HairAccessory1HaloSelect",
				Option: "HairAccessory1Halo",
				Chat: "HairAccessory1HaloSet",
				Npc: "HairAccessory1Halo",
			},
		},
	}, // HairAccessory3
	ItemMouth: {
		ClothGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Small",
					Property: {
						Effect: [E.GagVeryLight],
					},
				},
				{
					Name: "Cleave",
					Property: {
						Effect: [E.GagLight],
					},
				},
				{
					Name: "Knotted",
					Property: {
						Effect: [E.GagLight],
					},
				},
				{
					Name: "OTM",
					Property: {
						Effect: [E.GagLight],
					},
				},
				{
					Name: "OTN",
					Property: {
						Effect: [E.GagLight],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "ClothGagType",
				Chat: "ClothGagSet",
			},
		}, // ClothGag
		ScarfGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {
						Effect: [E.GagVeryLight],
					},
				},
				{
					Name: "OTN",
					Property: {
						Effect: [E.GagLight],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "ScarfGagType",
				Chat: "ScarfGagSet",
			},
		}, // ScarfGag
		WiffleGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Tight",
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "BallGagMouthType",
				Chat: "BallGagMouthSet",
			},
		}, // WiffleGag
		BallGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Shiny",
				},
				{
					Name: "Tight",
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "BallGagMouthType",
				Chat: "BallGagMouthSet",
			},
		}, // BallGag
		RopeBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: {
						Effect: [E.GagEasy],
					},
				},
				{
					Name: "Tight",
					Property: {
						Effect: [E.GagNormal],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "BallGagMouthType",
				Chat: "BallGagMouthSet",
			},
		}, // RopeBallGag
		HarnessBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "BallGag" },
		},
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Small",
					Property: {
						Effect: [E.GagVeryLight],
					},
				},
				{
					Name: "Crossed",
					Property: {
						Effect: [E.GagLight],
					},
				},
				{
					Name: "Full",
					Property: {
						Effect: [E.GagEasy],
					},
				},
				{
					Name: "Double",
					Property: {
						Effect: [E.GagNormal],
					},
				},
				{
					Name: "Cover",
					Property: {
						Effect: [E.GagMedium],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "DuctTapeMouthType",
				Chat: "DuctTapeMouthSet",
			},
		}, // DuctTape
		HarnessBallGag1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
				},
				{
					Name: "Tight",
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "BallGagMouthType",
				Chat: "BallGagMouthSet",
			},
		}, // HarnessBallGag1
		CupholderGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "NoCup",
				},
				{
					Name: "Tip",
				},
				{
					Name: "Cup",
				},
			],
			DialogPrefix: {
				Header: "CupholderGagOptions",
				Option: "CupholderGagOptions",
				Chat: "CupholderGagSet",
			},
			DrawImages: false,
		}, // CupholderGag
		PumpGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Empty",
					Property: {
						InflateLevel: 0,
						Difficulty: 0,
					},
				},
				{
					Name: "Light",
					Property: {
						InflateLevel: 1,
						Difficulty: 2,
						Effect: [E.GagLight],
					},
				},
				{
					Name: "Inflated",
					Property: {
						InflateLevel: 2,
						Difficulty: 4,
						Effect: [E.GagEasy],
					},
				},
				{
					Name: "Bloated",
					Property: {
						InflateLevel: 3,
						Difficulty: 6,
						Effect: [E.GagMedium],
					},
				},
				{
					Name: "Maximum",
					Property: {
						InflateLevel: 4,
						Difficulty: 8,
						Effect: [E.GagVeryHeavy],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectInflateLevel",
				Option: "InflateLevel",
				Chat: ({ previousIndex, newIndex }) =>
					`PumpGag${newIndex > previousIndex ? "pumps" : "deflates"}To`,
			},
			DrawImages: false,
		}, // PumpGag
		PlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Open",
					Property: {
						Effect: [E.GagMedium, E.OpenMouth],
					},
				},
				{
					Name: "Plug",
					Prerequisite: ["AccessMouth", "GagUnique"],
					Property: {
						Effect: [E.BlockMouth, E.GagTotal],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "PlugGagMouthType",
				Chat: "PlugGagMouthSet",
			},
		}, // PlugGag
		DildoPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Open",
					Property: {
						Effect: [E.GagEasy, E.OpenMouth],
					},
				},
				{
					Name: "Plug",
					Prerequisite: ["AccessMouth", "GagUnique"],
					Property: {
						Effect: [E.BlockMouth, E.GagTotal2],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "PlugGagMouthType",
				Chat: "DildoPlugGagMouthSet",
			},
		}, // DildoPlugGag
		MilkBottle: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Rest",
				},
				{
					Name: "Raised",
				},
				{
					Name: "Chug",
				},
			],
			DialogPrefix: {
				Header: "SelectMilkBottleState",
				Option: "MilkBottle",
				Chat: "MilkBottleSet",
			},
		}, // MilkBottle
		FunnelGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
					Property: {
						Effect: [E.OpenMouth],
					},
				},
				{
					Name: "Funnel",
					Property: {
						Effect: [E.BlockMouth, E.ProtrudingMouth],
						Block: ["ItemMouth2", "ItemMouth3", "ItemHood"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "FunnelGagMouthType",
				Chat: "FunnelGagMouthSet",
			},
		}, // FunnelGag
		HarnessPonyBits: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Attached",
					Property: {
						Effect: [E.BlockMouth, E.GagLight],
					},
				},
				{
					Name: "Detached",
					Property: {
						Effect: [E.OpenMouth],
					},
				},
			],
			DialogPrefix: {
				Header: "ItemMouthHarnessPonyBitsSelect",
				Option: "ItemMouthHarnessPonyBits",
				Chat: "ItemMouthHarnessPonyBitsSet",
				Npc: "ItemMouthHarnessPonyBits",
			},
		}, // PonyBit
		DentalGag: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Open",
					Property: {
						Effect: [E.OpenMouth, E.GagLight],
					},
				},
				{
					Name: "Closed",
					Property: {
						Effect: [E.BlockMouth, E.GagMedium],
					},
				},
			],
			DialogPrefix: {
				Header: "ItemMouthDentalGagSelect",
				Option: "ItemMouthDentalGag",
				Chat: "ItemMouthDentalGagSet",
			},
			ChangeWhenLocked: false,
		}, // DentalGag
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Basic",
					Property: {
						Effect: [E.GagVeryLight],
					},
				},
				{
					Name: "Bow",
					Property: {
						Effect: [E.GagLight],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
				Option: "RibbonType",
				Chat: "RibbonsGagSet",
			},
		}, // Ribbons
		BigMouth: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Default",
				},
				{
					Name: "Open",
				},
				{
					Name: "Serious",
				},
				{
					Name: "Grin",
				},
			],
			DialogPrefix: {
				Header: "BigMouthSelectMouthStyle",
				Option: "BigMouthMouthStyle",
			},
		}, // BigMouth
		FuturisticMuzzle: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Nose",
					Key: "n",
					Options: [
						{}, // n0 - No nose
						{
							// n1 - OTN
							Property: {
								Difficulty: 1,
							},
						},
					],
				},
				{
					Name: "Harness",
					Key: "h",
					Options: [
						{}, // h0 - No straps
						{
							// h1 - Harness straps
							Property: {
								Difficulty: 1,
							},
						},
					],
				},
				{
					Name: "Symbol",
					Key: "s",
					Options: [
						{}, // s0 - Nothing
						{}, // s1 - Lock symbol
						{}, // s2 - Mute symbol
						{}, // s3 - X symbol
					],
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
			},
		}, // FuturisticMuzzle
		OTNPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Open",
					Property: {
						Effect: [E.GagMedium, E.OpenMouth],
					},
				},
				{
					Name: "Plug",
					Prerequisite: ["AccessMouth"],
					Property: {
						Effect: [E.BlockMouth, E.GagTotal],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "PlugGagMouthType",
				Chat: "PlugGagMouthSet",
			},
		}, // OTNPlugGag
		TechnoGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Masked",
					Property: {
						Effect: [E.BlockMouth],
					},
				},
				{
					Name: "Gagged",
					Property: {
						Effect: [E.BlockMouth, E.GagMedium],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "ItemMouthTechnoGag",
				Chat: "ItemMouthTechnoGagSet",
			},
		}, // TechnoGag
		PonyGag: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.DEST_CHAR,
			],
			Modules: [
				{
					Name: "Gag",
					Key: "g",
					Options: [
						{ Property: { Effect: [E.BlockMouth, E.GagLight] } }, //g0 - Regular BitGag
						{ Property: {} }, //g1 - No Gag
						{ Property: { Effect: [E.BlockMouth, E.GagMedium] } }, //g2 - Thick BitGag
						{ Property: { Effect: [E.BlockMouth, E.GagHeavy] } }, //g3 - Tongue Depressor
						{ Property: { Effect: [E.BlockMouth, E.GagMedium] } }, //g4 - Ballgag
						{
							Property: {
								Effect: [E.BlockMouth, E.GagVeryHeavy],
								Hide: ["Mouth"],
							},
						}, //g5 - DildoGag
					],
				},
				{
					Name: "Panel",
					Key: "p",
					Options: [
						{}, //None
						{}, //p1 - Panel
						{}, //p2 - PanelShield
						{}, //p3 - PanelHex
						{}, //p4 - PanelSun
						{}, //p5 - PanelMoon
						{}, //p6 - PanelHeart
						{}, //p7 - PanelHorse
						{}, //p8 - PanelTriskel
						{}, //p9 - PanelPentacle
					],
				},
				{
					Name: "Reins",
					Key: "r",
					Options: [
						{}, //r0 - None
						{ Property: { Effect: [E.Leash] } }, //r1 - Reins
						{ Property: { Effect: [E.Leash] } }, //r2 - Rope
						{
							Property: {
								Effect: [E.Tethered, E.IsChained],
								Block: ["ItemAddon", "ItemDevices"],
							},
						}, //r3 - Pole
					],
				},
				{
					Name: "Top",
					Key: "t",
					Options: [
						{}, //t0 - None
						{}, //t1 - Plume
						{ Property: { Hide: ["HairFront"] } }, //t2 - Mane Left
						{ Property: { Hide: ["HairFront"] } }, //t3 - Mane Right
						{ Property: { Hide: ["HairFront"] } }, //t4 - Mohawk
					],
				},
				{
					Name: "Extra",
					Key: "e",
					Options: [
						{}, //e0 - None
						{ Property: { Difficulty: 7 } }, //e1 - ExtraStraps
						{}, //e2 - Flags
					],
				},
				{
					Name: "Horn",
					Key: "h",
					Options: [
						{}, //h0 - None
						{ Property: { AllowActivity: ["PenetrateItem"] } }, //h1 - Horn
						{ Property: { AllowActivity: ["PenetrateItem"] } }, //h2 - Dildocorn
					],
				},
				{
					Name: "Blinders",
					Key: "b",
					Options: [
						{}, //b0 - None
						{}, //b1 - Blinders
					],
				},
			],
			ChangeWhenLocked: false,
			DialogPrefix: {
				Header: "ItemMouthPonyGagSelect",
				Module: "ItemMouthPonyGagModule",
				Option: "ItemMouthPonyGagOption",
				Chat: "ItemMouthPonyGagSet",
			},
		}, // PonyGag
		LatexSheathGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Thin",
				},
				{
					Name: "Thick",
					Property: { Effect: [E.GagVeryLight] },
				},
				{
					Name: "VeryThick",
					Property: { Effect: [E.GagMedium] },
				},
			],
			DrawImages: false,
			DialogPrefix: {
				Header: "ItemMouthLatexSheathGagSelect",
				Option: "ItemMouthLatexSheathGag",
				Chat: "ItemMouthLatexSheathGagSet",
			},
		}, //LatexSheathGag
		FuturisticPanelGag: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.ASSET_NAME,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
			],
			Modules: [
				{
					Name: "Gag",
					Key: "g",
					DrawImages: true,
					Options: [
						{}, // g0 - Padded
						{
							Property: { Effect: [E.GagVeryLight] },
							Prerequisite: ["GagUnique"],
						}, // g1 - LightBall
						{
							Property: { Effect: [E.GagMedium] },
							Prerequisite: ["AccessMouth", "GagUnique"],
						}, // g2 - Ball
						{
							Property: { Effect: [E.GagTotal] },
							Prerequisite: ["AccessMouth", "GagUnique"],
						}, // g3 - Plug
					],
				},
				{
					Name: "AutoPunish",
					Key: "p",
					DrawImages: false,
					Options: [
						{ Property: { AutoPunish: 0 } }, // p0 - Off
						{ Property: { AutoPunish: 1 } }, // p1 - Low
						{ Property: { AutoPunish: 2 } }, // p2 - Medium
						{ Property: { AutoPunish: 3 } }, // p3 - Maximum
					],
				},
				{
					Name: "DeflationTime",
					Key: "t",
					DrawImages: false,
					Options: [
						{ Property: { AutoPunishUndoTimeSetting: 120000 } }, // t0 - 2 min
						{ Property: { AutoPunishUndoTimeSetting: 300000 } }, // t1 - 5 min
						{ Property: { AutoPunishUndoTimeSetting: 900000 } }, // t2 - 15 min
						{ Property: { AutoPunishUndoTimeSetting: 3600000 } }, // t3 - 1 hour
						{ Property: { AutoPunishUndoTimeSetting: 72000000 } }, // t4 - 24 hours
					],
				},
			],
			BaselineProperty: {
				ShowText: true,
				BlinkState: false,
				AutoPunishUndoTime: 0,
				OriginalSetting: 0,
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: InventoryItemMouthFuturisticPanelGagClickHook,
				Draw: InventoryItemMouthFuturisticPanelGagDrawHook,
				SetOption: InventoryItemMouthFuturisticPanelGagSetOptionHook,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
				ScriptDraw: AssetsItemMouthFuturisticPanelGagScriptDrawHook,
				BeforeDraw: AssetsItemMouthFuturisticPanelGagBeforeDrawHook,
			},
			DialogPrefix: {
				Header: "ItemMouthFuturisticPanelGagSelect",
				Module: "ItemMouthFuturisticPanelGagModule",
				Option: "ItemMouthFuturisticPanelGagOption",
				Chat: "ItemMouthFuturisticPanelGagSet",
			},
		}, // FuturisticPanelGag
		FuturisticHarnessPanelGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FuturisticPanelGag" },
		}, // FuturisticHarnessPanelGag
		FuturisticHarnessBallGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FuturisticPanelGag" },
			Modules: [
				{
					Name: "Gag",
					Key: "g",
					DrawImages: true,
					Options: [
						{ Property: { Effect: [E.GagLight] } }, // g0 - LightBall
						{
							Property: { Effect: [E.GagMedium] },
							Prerequisite: ["AccessMouth"],
						}, // g1 - Ball
						{
							Property: { Effect: [E.GagTotal] },
							Prerequisite: ["AccessMouth"],
						}, // g2 - Plug
					],
				},
				{
					Name: "AutoPunish",
					Key: "p",
					DrawImages: false,
					Options: [
						{ Property: { AutoPunish: 0 } }, // p0 - Off
						{ Property: { AutoPunish: 1 } }, // p1 - Low
						{ Property: { AutoPunish: 2 } }, // p2 - Medium
						{ Property: { AutoPunish: 3 } }, // p3 - Maximum
					],
				},
				{
					Name: "DeflationTime",
					Key: "t",
					DrawImages: false,
					Options: [
						{ Property: { AutoPunishUndoTimeSetting: 120000 } }, // t0 - 2 min
						{ Property: { AutoPunishUndoTimeSetting: 300000 } }, // t1 - 5 min
						{ Property: { AutoPunishUndoTimeSetting: 900000 } }, // t2 - 15 min
						{ Property: { AutoPunishUndoTimeSetting: 3600000 } }, // t3 - 1 hour
						{ Property: { AutoPunishUndoTimeSetting: 72000000 } }, // t4 - 24 hours
					],
				},
			],
			DialogPrefix: {
				Header: "ItemMouthFuturisticPanelGagSelect",
				Module: "ItemMouthFuturisticPanelGagModule",
				Option: "ItemMouthFuturisticHarnessBallGagOption",
				Chat: "ItemMouthFuturisticHarnessBallGagSet",
			},
		}, // FuturisticHarnessBallGag
		BallGagMask: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: {},
				},
				{
					Name: "Shiny",
					Property: {},
				},
				{
					Name: "Tight",
					Property: {},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "BallGagMouthType",
				Chat: "BallGagMouthSet",
			},
		}, // BallGagMask
		LatexMuzzleMask: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: {
						Effect: [E.GagLight],
						Difficulty: 4,
					},
				},
				{
					Name: "Loose",
					Property: {
						Effect: [E.GagVeryLight],
						Difficulty: 3,
					},
				},
				{
					Name: "Panel",
					Property: {
						Effect: [E.GagHeavy],
						Difficulty: 6,
					},
					ChangeWhenLocked: false,
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "LatexMuzzleMaskMouthType",
				Chat: "LatexMuzzleMaskMouthSet",
			},
		}, // LatexMuzzleMask
		ModularGag: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Gag",
					Key: "g",
					DrawImages: true,
					Options: [
						{}, // 0 - Detached
						{
							// 1 - BallGag
							Property: {
								Fetish: ["Gagged"],
								Effect: ["BlockMouth", "GagMedium"],
								Hide: ["Mouth"],
							},
							Prerequisite: "GagUnique",
						},
						{
							// 2 Dildo BallGag
							Property: {
								Fetish: ["Gagged"],
								Effect: ["BlockMouth", "GagTotal"],
								Hide: ["Mouth"],
							},
							Prerequisite: "GagUnique",
						},
						{
							// 3 - RingGag
							Property: {
								Fetish: ["Gagged"],
								Effect: ["OpenMouth", "GagMedium"],
								Hide: ["Mouth"],
							},
							Prerequisite: "GagUnique",
						},
						{
							// 4 - RingGag with Depressor
							Property: {
								Fetish: ["Gagged"],
								Effect: ["OpenMouth", "GagHeavy"],
								Hide: ["Mouth"],
							},
							Prerequisite: "GagUnique",
						},
						{
							// 5 - BitGag
							Property: {
								Fetish: ["Gagged", "Pony", "Pet"],
								Effect: ["BlockMouth", "GagMedium"],
								Hide: ["Mouth"],
							},
							Prerequisite: "GagUnique",
						},
						{
							// 6 - BitGagDepressor
							Property: {
								Fetish: ["Gagged", "Pony", "Pet"],
								Effect: ["BlockMouth", "GagHeavy"],
								Hide: ["Mouth"],
							},
							Prerequisite: "GagUnique",
						},
					],
				},
				{
					Name: "Headress",
					Key: "h",
					DrawImages: false,
					Options: [
						{}, // 0 - Detached
						{}, // 1 - Base
						{}, // 2 - Forehead
					],
				},
				{
					Name: "ChinStrap",
					Key: "c",
					DrawImages: true,
					Options: [
						{}, // 0 - Detached
						{}, // 1 - Attached
					],
				},
				{
					Name: "Blindfold",
					Key: "b",
					DrawImages: false,
					Options: [
						{}, // 0 - None
						{
							Property: {
								Fetish: ["Pony"],
							},
						}, // 1 - Pony Blinders
					],
				},
				{
					Name: "Ears",
					Key: "e",
					DrawImages: false,
					Options: [
						{}, // 0 - None
						{
							Property: {
								Fetish: ["Pony"],
							},
						}, // 1 - Pony
					],
				},
			],
		}, //ModularGag
		TonguePiercingGag: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Hook",
					Property: {},
				},
				{
					Name: "Ring",
					Property: {},
				},
				{
					Name: "Bells",
					Property: {},
				},
				{
					Name: "Chain",
					Property: {},
					Prerequisite: ["Collared"],
				},
				{
					Name: "Nail",
					Property: {},
				},
				{
					Name: "Padlock",
					Property: {},
				},
				{
					Name: "Peg",
					Property: {},
				},
				{
					Name: "BitGag1",
					Property: {},
				},
				{
					Name: "BitGag2",
					Property: {},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "TonguePiercingGagMouthType",
				Chat: "TonguePiercingGagMouthSet",
			},
		},
		Stitches: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Straight",
				},
				{
					Name: "ZigZag",
				},
				{
					Name: "Skewed",
				},
				{
					Name: "Cross",
				},
			],
			DialogPrefix: {
				Header: "ItemMouthStitchesSelect",
				Option: "ItemMouthStitches",
				Chat: "ItemMouthStitchesSet",
			},
		}, // StitchGag
		PaddedFaceMask: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Thickness",
					Key: "t",
					Options: [
						{},
						{
							Property: { Effect: [E.GagLight] },
						},
					],
				},
				{
					Name: "Pattern",
					Key: "p",
					Options: [{}, {}, {}], //None, Lips, Heart
				},
			],
			DialogPrefix: {
				Header: "ItemMouthPaddedFaceMaskSelect",
				Module: "ItemMouthPaddedFaceMaskModule",
				Option: "ItemMouthPaddedFaceMaskOption",
				Chat: "ItemMouthPaddedFaceMaskSet",
			},
		}, // PaddedFaceMask
		LatexRespirator: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Filter",
					Key: "f",
					Options: [{}, {}, {}, {}], // None,Filter,SmallTubes,LargeTubes
				},
				{
					Name: "Glow",
					Key: "g",
					Options: [{}, {}], //  Glow off or on
				},
				{
					Name: "Straps",
					Key: "s",
					Options: [{}, {}], // No Straps, Straps
				},
				{
					Name: "Mask",
					Key: "m",
					Options: [
						{ Property: { Effect: [E.BlockMouth] } },
						{ Property: { Effect: [E.BlockMouth, E.GagVeryLight] } },
						{ Property: { Effect: [] } },
					], // Mask, Thick Filters, No Mask
				},
				{
					Name: "Length",
					Key: "l",
					Options: [
						{},
						{
							Property: {
								OverridePriority: {
									Filter: 55,
									FilterFixing: 55,
									FilterGlow: 55,
									SmallTube: 55,
									SmallTubeGlow: 55,
									Tube: 55,
									TubeGlow: 55,
								},
							},
						},
					], // Behind Hair, Over Hair
				},
			],
			DialogPrefix: {
				Header: "ItemMouthLatexRespiratorSelect",
				Module: "ItemMouthLatexRespiratorModule",
				Option: "ItemMouthLatexRespiratorOption",
				Chat: "ItemMouthLatexRespiratorSet",
			},
		}, //LatexRespirator
		QualityHarnessGag: {
			Archetype: ExtendedArchetype.TYPED,
			ChangeWhenLocked: false,
			DrawImages: false,
			Options: [
				{
					Name: "BallGag",
					Property: {
						Effect: [E.BlockMouth],
					},
				},
				{
					Name: "RingGag",
					Property: {
						Effect: [E.OpenMouth],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "QualityHarnessGagType",
				Chat: "QualityHarnessGagSet",
			},
		}, // QualityHarnessGag
		GenitalGag: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Pussy",
					Property: {
						Effect: [E.GagEasy],
						Difficulty: 5,
					},
				},
				{
					Name: "Butthole",
					Property: {
						Effect: [E.GagLight],
						Difficulty: 6,
					},
				},
			],
			DrawImages: false,
		}, // GenitalGag
		PremiumMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			ChangeWhenLocked: false,
			Options: [
				{
					Name: "Normal",
					Property: {
						Effect: [E.GagMedium],
						Difficulty: 4,
					},
				},
				{
					Name: "CrossStraps",
					Property: {
						Effect: [E.GagMedium],
						Difficulty: 5,
					},
				},
				{
					Name: "ExtraMuzzle",
					Property: {
						Effect: [E.GagHeavy],
						Difficulty: 6,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectGagType",
				Option: "PremiumMuzzleMouthType",
				Chat: "PremiumMuzzleMouthSet",
			},
		}, // PremiumMuzzle
		OverfilledGag: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Gagtype",
					Key: "Gagtype",
					Options: [
						{
							Property: {
								Effect: [E.GagMedium],
							},
						},
						{
							Property: {
								Effect: [E.GagLight],
							},
						},
						{
							Property: {
								Effect: [E.GagHeavy],
							},
						},

						{
							Property: {
								Effect: [E.GagHeavy],
							},
						},
						{},
					], // Cloth, Cross Tape, Tape, Tape + panties, None
				},
				{
					Name: "Stuffing",
					Key: "Stuffing",
					Options: [
						{
							Property: {
								Effect: [E.GagMedium],
								Fetish: ["Lingerie"],
							},
						},
						{
							Property: {
								Effect: [E.GagMedium],
								Fetish: ["Lingerie"],
							},
						},
					], // Panties, Wad
				},
			],
			DialogPrefix: {
				Header: "OverfilledGagSelect",
				Module: "OverfilledGagModule",
				Option: "OverfilledGagOption",
				Chat: "OverfilledGagSet",
			},
		}, // Overfilled Gag
		AOMGag: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Lips",
					AllowLock: false,
					Property: {},
				},
				{
					Name: "Straps",
					AllowLock: true,
					Property: { Difficulty: 4 },
				},
			],
		}, // AOMGag
		HorrorMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
					Property: {},
				},
				{
					Name: "Rivets",
					Property: { Difficulty: 3 },
				},
			],
		}, // HorrorMuzzle
		AsylumMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Normal",
					Property: { Effect: [E.GagEasy] },
				},
				{
					Name: "Padded",
					Property: { Effect: [E.GagNormal], Difficulty: 3 },
				},
			],
		}, // AsylumMuzzle
		CompGag: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "FoamBall",
					Key: "b",
					Options: [
						{
							// b0 - One ball
							Property: {
								Difficulty: 1,
								Effect: [E.GagEasy],
							},
						},
						{
							// b1 - Two balls
							Property: {
								Difficulty: 2,
								Effect: [E.GagLight],
							},
						},
						{
							// b2 - Three balls
							Property: {
								Difficulty: 3,
								Effect: [E.GagNormal],
							},
						},
						{}, // b3 - Empty mouth
					],
				},
				{
					Name: "UnderTape",
					Key: "t",
					Options: [
						{}, // t0 - No tape
						{
							// t1 - Foam tape
							Property: {
								Difficulty: 3,
								Effect: [E.GagLight],
							},
						},
					],
				},
				{
					Name: "RubberGlue",
					Key: "g",
					Options: [
						{}, // g0 - No rubber glue
						{
							// g1 - Rubber glue
							Property: {
								Difficulty: 4,
								Effect: [E.GagNormal],
							},
						},
					],
				},
				{
					Name: "RubberTape",
					Key: "r",
					Options: [
						{}, // r0 - No rubber tape
						{
							// r1 - Rubber tape
							Property: {
								Difficulty: 5,
								Effect: [E.GagNormal],
							},
						},
					],
				},
				{
					Name: "MetalStrip",
					Key: "s",
					Options: [
						{}, // s0 - No metal strip
						{
							// s1 - metal strip
							Property: {
								Difficulty: 7,
								Effect: [E.GagHeavy],
							},
						},
					],
				},
				{
					Name: "FoamTape",
					Key: "m",
					Options: [
						{}, // m0 - No tape
						{
							// m1 - Gagged
							Property: {
								Difficulty: 10,
								Effect: [E.GagHeavy],
							},
						},
						{
							// m2 - Gagged and blinded
							Property: {
								Difficulty: 12,
								Effect: [E.GagHeavy, E.BlindNormal],
								AllowActivityOn: ["ItemHead"],
							},
						},
						{
							// m3 - Gagged and hooded
							Property: {
								Difficulty: 12,
								Effect: [E.GagHeavy],
								Hide: ["HairFront", "HairBack", "Mask"],
								Attribute: ["ShortHair"],
							},
						},
						{
							// m4 - Full wrapped
							Property: {
								Difficulty: 15,
								Effect: [E.GagTotal, E.BlindHeavy],
								AllowActivityOn: ["ItemHead"],
								Hide: ["HairFront", "HairBack", "Mask"],
								Attribute: ["ShortHair"],
							},
						},
					],
				},
			],
		}, // CompGag
		BishopGag: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Open",
					Property: {},
				},
				{
					Name: "Covered",
					Property: {
						Difficulty: 6,
					},
				},
			],
		},
		BallGag2: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "StrapType",
					Key: "s",
					Options: [
						{}, // s0 Basic Strap
						{}, // s1 Head Harness 1
					],
				},
				{
					Name: "BallType",
					Key: "b",
					Options: [
						{ Property: { Effect: [E.GagLight] } }, // b0 Regular Size
						{ Property: { Effect: [E.GagMedium] } }, // b1 Large Size
						{ Property: { Effect: [E.GagHeavy] } }, // b2 XL Size
					],
				},
			],
		},
	}, // ItemMouth
	ItemMouth2: {
		ClothGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ClothGag" },
		},
		ScarfGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ScarfGag" },
		},
		WiffleGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "WiffleGag" },
		},
		BallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		RopeBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "RopeBallGag" },
		},
		HarnessBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		HarnessPonyBits: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "HarnessPonyBits" },
		},
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DuctTape" },
		},
		HarnessBallGag1: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "HarnessBallGag1" },
		},
		CupholderGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "CupholderGag" },
		},
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "Ribbons" },
		},
		FuturisticMuzzle: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FuturisticMuzzle" },
		},
		PonyGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PonyGag" },
		},
		FuturisticPanelGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FuturisticPanelGag" },
		},
		FuturisticHarnessPanelGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "ItemMouth",
				AssetName: "FuturisticHarnessPanelGag",
			},
		},
		FuturisticHarnessBallGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "ItemMouth",
				AssetName: "FuturisticHarnessBallGag",
			},
		},
		BallGagMask: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGagMask" },
		},
		LatexMuzzleMask: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "LatexMuzzleMask" },
		},
		ModularGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ModularGag" },
		},
		Stitches: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "Stitches" },
		}, // StitchGag
		PaddedFaceMask: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PaddedFaceMask" },
		}, // PaddedFaceMask
		LatexRespirator: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "LatexRespirator" },
		}, //LatexRespirator
		DildoPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DildoPlugGag" },
		}, // DildoPlugGag
		BigMouth: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BigMouth" },
		}, // BigMouth
		DentalGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DentalGag" },
		}, // DentalGag
		OTNPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "OTNPlugGag" },
		}, // OTNPlugGag
		LatexSheathGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "LatexSheathGag" },
		}, // LatexSheathGag
		PlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PlugGag" },
		}, // PlugGag
		PumpGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PumpGag" },
		}, // PumpGag
		TonguePiercingGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "TonguePiercingGag" },
		}, // TonguePiercingGag
		TechnoGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "TechnoGag" },
		}, // TechnoGag
		MilkBottle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "MilkBottle" },
		}, // MilkBottle
		FunnelGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FunnelGag" },
			Options: [
				{
					Name: "None",
					Property: {
						Effect: [E.OpenMouth],
					},
				},
				{
					Name: "Funnel",
					Property: {
						Effect: [E.BlockMouth, E.ProtrudingMouth],
						Block: ["ItemMouth3", "ItemHood"],
					},
				},
			],
		}, // FunnelGag
		QualityHarnessGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "QualityHarnessGag" },
		}, // QualityHarnessGag
		GenitalGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "GenitalGag" },
		}, // GenitalGag
		PremiumMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PremiumMuzzle" },
		}, // PremiumMuzzle
		OverfilledGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "OverfilledGag" },
		}, // OverfilledGag
		AOMGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "AOMGag" },
		}, // AOMGag
		HorrorMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "HorrorMuzzle" },
		}, // HorrorMuzzle
		AsylumMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "AsylumMuzzle" },
		}, // AsylumMuzzle
		CompGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "CompGag" },
		}, // CompGag
		BishopGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BishopGag" },
			DialogPrefix: {
				Header: "ItemMouthBishopGagSelect",
				Chat: "ItemMouthBishopGagSet",
				Option: "ItemMouthBishopGag",
			},
		}, // BishopGag
		BallGag2: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag2" },
			DialogPrefix: {
				Header: "ItemMouthBallGag2Select",
				Module: "ItemMouthBallGag2Module",
				Option: "ItemMouthBallGag2Option",
				Chat: "ItemMouthBallGag2Set",
			},
		},
	}, // ItemMouth2
	ItemMouth3: {
		ClothGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ClothGag" },
		},
		ScarfGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ScarfGag" },
		},
		WiffleGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "WiffleGag" },
		},
		BallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		RopeBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "RopeBallGag" },
		},
		HarnessBallGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag" },
		},
		HarnessPonyBits: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "HarnessPonyBits" },
		},
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DuctTape" },
		},
		HarnessBallGag1: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "HarnessBallGag1" },
		},
		CupholderGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "CupholderGag" },
		},
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "Ribbons" },
		},
		FuturisticMuzzle: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FuturisticMuzzle" },
		},
		PonyGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PonyGag" },
		},
		FuturisticPanelGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FuturisticPanelGag" },
		},
		FuturisticHarnessPanelGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "ItemMouth",
				AssetName: "FuturisticHarnessPanelGag",
			},
		},
		FuturisticHarnessBallGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "ItemMouth",
				AssetName: "FuturisticHarnessBallGag",
			},
		},
		Stitches: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "Stitches" },
		}, // StitchGag
		LatexRespirator: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "LatexRespirator" },
		}, //LatexRespirator
		PaddedFaceMask: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PaddedFaceMask" },
		}, // PaddedFaceMask
		BallGagMask: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGagMask" },
		},
		LatexMuzzleMask: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "LatexMuzzleMask" },
		},
		ModularGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "ModularGag" },
		},
		DildoPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DildoPlugGag" },
		}, // DildoPlugGag
		BigMouth: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BigMouth" },
		}, // BigMouth
		DentalGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "DentalGag" },
		}, // DentalGag
		OTNPlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "OTNPlugGag" },
		}, // OTNPlugGag
		LatexSheathGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "LatexSheathGag" },
		}, // LatexSheathGag
		PlugGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PlugGag" },
		}, // PlugGag
		PumpGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PumpGag" },
		}, // PumpGag
		TonguePiercingGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "TonguePiercingGag" },
		}, // TonguePiercingGag
		TechnoGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "TechnoGag" },
		}, // TechnoGag
		MilkBottle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "MilkBottle" },
		}, // MilkBottle
		FunnelGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "FunnelGag" },
			Options: [
				{
					Name: "None",
					Property: {
						Effect: [E.OpenMouth],
					},
				},
				{
					Name: "Funnel",
					Property: {
						Effect: [E.BlockMouth, E.ProtrudingMouth],
						Block: ["ItemHood"],
					},
				},
			],
		}, // FunnelGag
		QualityHarnessGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "QualityHarnessGag" },
		}, // QualityHarnessGag
		PremiumMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "PremiumMuzzle" },
		}, // PremiumMuzzle
		OverfilledGag: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "OverfilledGag" },
		}, // OverfilledGag
		AOMGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "AOMGag" },
		}, // AOMGag
		HorrorMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "HorrorMuzzle" },
		}, // HorrorMuzzle
		AsylumMuzzle: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "AsylumMuzzle" },
		}, // AsylumMuzzle
		BishopGag: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BishopGag" },
			DialogPrefix: {
				Header: "ItemMouthBishopGagSelect",
				Chat: "ItemMouthBishopGagSet",
				Option: "ItemMouthBishopGag",
			},
		}, // BishopGag
		BallGag2: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemMouth", AssetName: "BallGag2" },
			DialogPrefix: {
				Header: "ItemMouthBallGag2Select",
				Module: "ItemMouthBallGag2Module",
				Option: "ItemMouthBallGag2Option",
				Chat: "ItemMouthBallGag2Set",
			},
		},
	}, // ItemMouth3
	Mask: {
		BunnyMask1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Ears",
				},
				{
					Name: "Earless",
					Property: { OverridePriority: 51 },
				},
			],
			DialogPrefix: {
				Header: "SelectBunnyMaskStyle",
				Option: "BunnyMaskType",
			},
		}, // BunnyMask1
		OpenFaceHood: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "HideBackHair",
					Property: { Hide: ["HairBack"] },
				},
				{
					Name: "ShowBackHair",
					NPCDefault: true,
				},
			],
			DialogPrefix: {
				Header: "SelectOpenFaceHoodStyle",
				Option: "OpenFaceHoodStyle",
			},
			DrawImages: false,
		}, // OpenFaceHood
		PetNose: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Nose",
					Key: "n",
					Options: [
						{}, // n0 - Nose
						{}, // n1 - No Nose
					],
				},
				{
					Name: "Cheeks",
					Key: "c",
					Options: [
						{}, // c0 - No Cheeks
						{}, // c1 - Small Cheeks
						{}, // c2 - Big Cheeks
					],
				},
				{
					Name: "Whiskers",
					Key: "w",
					Options: [
						{}, // w0 - No Whiskers
						{}, // w1 - Short Whiskers
						{}, // w2 - Long Whiskers
					],
				},
				{
					Name: "Mouth",
					Key: "m",
					Options: [
						{}, // m0 - Show Mouth
						{ Property: { Hide: ["Mouth"] } }, // m1 - Hide Mouth
					],
				},
			],
		}, //PetNose
		Glitter: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Freckles",
				},
				{
					Name: "MidFreckles",
				},
				{
					Name: "SplitFreckles",
				},
				{
					Name: "FrecklesSmall",
				},
				{
					Name: "MidFrecklesSmall",
				},
				{
					Name: "SplitFrecklesSmall",
				},
				{
					Name: "StarsBoth",
				},
				{
					Name: "StarsLeft",
				},
				{
					Name: "StarsRight",
				},
				{
					Name: "DotsBoth",
				},
				{
					Name: "DotsLeft",
				},
				{
					Name: "DotsRight",
				},
			],
		}, //Glitter
		HeadHarness: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Simple",
				},
				{
					Name: "Heavy",
				},
			],
		}, //HeadHarness
		Kissmark: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ClothAccessory", AssetName: "Kissmark" },
			DialogPrefix: {
				Header: "ClothAccessoryKissmarkSelect",
				Module: "ClothAccessoryKissmarkModule",
				Option: "ClothAccessoryKissmarkOption",
				Chat: "ClothAccessoryKissmarkSet",
			},
		}, //KissMark
		SwimCap: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "Hat", AssetName: "SwimCap" },
		},
		DroneMask: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemHead", AssetName: "DroneMask" },
			Modules: [
				{
					Name: "Mouth",
					Key: "m",
					Options: [{}, {}, {}, {}, {}, {}, {}, {}, {}], // none, onahole, fleshlight, smile, holes, sculpted, subtle, thin, thin oh
				},
				{
					Name: "Eyes",
					Key: "e",
					Options: [{}, {}, {}, {}, {}, {}, {}], // none, regular, spiral, smile, holes, sculpted, concave
				},
				{
					Name: "Pattern",
					Key: "p",
					Options: [
						{}, // Blank
						{}, // Barcode
						{}, // Scarab
						{}, // Hex
						{}, // Lines
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 16 },
								Font: "Impact",
								ScriptHooks: {
									AfterDraw: AssetsItemHeadDroneMaskAfterDrawHook,
								},
							},
							Property: {
								HideItem: ["ItemHeadDroneMask", "ItemHoodDroneMask"],
							},
						}, // text
						{}, // Machine
						{}, // Fishnet
						{}, // Hexpattern
						{}, // Large Circle
						{}, // Large Split Circle
						{}, // Large Heart
						{}, // Large Stylized Heart
						{}, // Small Heart
						{}, // Lock
						{}, // Large X
					],
				},
				{
					Name: "Glow",
					Key: "g",
					Options: [{}, {}, {}, {}], // Glow Off, Glow Eyes, Mouth On, Glow Pattern On, Glow On
				},
				{
					Name: "Helmet",
					Key: "h",
					Options: [
						{}, // h0 - Mask
						{
							Property: {
								Hide: ["HairFront", "HairBack"], //"HairAccessory1", "HairAccessory2"],
								HideItem: [
									"HatBonnet1",
									"HatBonnet2",
									"HatBunnySuccubus2",
									"HatCrown1",
									"HatCrown2",
									"HatCrown4",
									"HatCrown5",
									"HatBand1",
									"HatBand2",
									"HatPirateBandana1",
									"HatVeil1",
									"HatVeil2", // Hat items
									"MaskFuturisticVisor",
									"MaskShinobiMask", // Mask items
									"HairAccessory3Ribbons4", // HairAccessory items
									"HairAccessory1Antennae",
									"HairAccessory1BunnyEars1",
									"HairAccessory1BunnyEars2",
									"HairAccessory1CowHorns",
									"HairAccessory1ElfEars",
									"HairAccessory1Ears1",
									"HairAccessory1Ears2",
									"HairAccessory1FoxEars1",
									"HairAccessory1FoxEars2",
									"HairAccessory1FoxEars3",
									"HairAccessory1KittenEars1",
									"HairAccessory1KittenEars2",
									"HairAccessory1MouseEars1",
									"HairAccessory1MouseEars2",
									"HairAccessory1PuppyEars1",
									"HairAccessory1Ribbons2",
									"HairAccessory1WolfEars1",
									"HairAccessory1WolfEars2",
									"HairAccessory1Ribbons4", // Ear items (HA1)
									"HairAccessory2Antennae",
									"HairAccessory2BunnyEars1",
									"HairAccessory2BunnyEars2",
									"HairAccessory2CowHorns",
									"HairAccessory2ElfEars",
									"HairAccessory2Ears1",
									"HairAccessory2Ears2",
									"HairAccessory2FoxEars1",
									"HairAccessory2FoxEars2",
									"HairAccessory2FoxEars3",
									"HairAccessory2KittenEars1",
									"HairAccessory2KittenEars2",
									"HairAccessory2MouseEars1",
									"HairAccessory2MouseEars2",
									"HairAccessory2PuppyEars1",
									"HairAccessory2Ribbons2",
									"HairAccessory2WolfEars1",
									"HairAccessory2WolfEars2", // Ear items (HA2)
								], // These items are hidden because they have clear mismatch issues with the hood.
							},
						}, // h1 - Helmet (hood)
						{
							// h2 - Helmet ( hood but nothing shows)
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"Hat",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
								],
								HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
							},
						},
					],
				},
				{
					Name: "Layering",
					Key: "j",
					Options: [
						{
							Property: {
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3", "ItemHead"],
								Hide: [
									"ItemMouth",
									"ItemMouth2",
									"ItemMouth3",
									"ItemHead",
									"Glasses",
								],
							},
						}, // No gags or blindfolds visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2", "ItemHead"],
								Hide: ["ItemMouth", "ItemMouth2", "ItemHead", "Glasses"],
							},
						}, // Highest layer gag visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemHead"],
								Hide: ["ItemHead", "Glasses"],
							},
						}, // All gags visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
								Hide: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
							},
						}, // Blindfold items visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2"],
								Hide: ["ItemMouth", "ItemMouth2"],
							},
						}, // Blindfold and highest layer gag
						{
							Property: {
								OverridePriority: 12,
								Block: [],
								Hide: [],
							},
						}, // Blindfold and all gags
					],
				},
				{
					Name: "Visibility",
					Key: "b",
					Options: [
						{
							Property: {
								Hide: ["Blush"],
								HideItem: [
									"HatFacePaint",
									"MaskFacePaint",
									"ClothAccessoryFacePaint",
								],
							},
						},
						{
							Property: {
								Hide: [],
								HideItem: [],
							},
						},
					],
				},
			],
		}, // DroneMask
		RubberMask: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Wig",
					Key: "g",
					Options: [
						{
							// "Normal"
							Property: {
								Hide: ["HairAccessory1", "HairAccessory2"],
								Effect: [],
							},
						},
						{
							// "Wig1"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig2"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig3"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig4"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig5"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig6"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig7"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig8"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig9"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig10"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig11"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig12"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig13"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig14"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig15"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig16"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig17"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
						{
							// "Wig18"
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"HairAccessory1",
									"HairAccessory2",
								],
								Effect: [],
							},
						},
					],
				},
				{
					Name: "Eyes",
					Key: "e",
					Options: [
						{
							// "Eyes0"
							Property: { Effect: [] },
						},
						{
							// "Eyes1"
							Property: { Effect: [] },
						},
						{
							// "Eyes2"
							Property: { Effect: [] },
						},
						{
							// "Eyes3"
							Property: { Effect: [] },
						},
						{
							// "Eyes4"
							Property: { Effect: [] },
						},
						{
							// "Eyes5"
							Property: { Effect: [] },
						},
						{
							// "Eyes6"
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Eyebrows",
					Key: "y",
					Options: [
						{
							// "Eyebrows0"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows1"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows2"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows3"
							Property: { Effect: [] },
						},
						{
							// "Eyebrows4"
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Lips",
					Key: "l",
					Options: [
						{
							// "Lips0"
							Property: { Effect: [] },
						},
						{
							// "Lips1"
							Property: { Effect: [] },
						},
						{
							// "Lips2"
							Property: { Effect: [] },
						},
						{
							// "Lips3"
							Property: { Effect: [] },
						},
						{
							// "Lips4"
							Property: { Effect: [] },
						},
						{
							// "Lips5"
							Property: { Effect: [] },
						},
					],
				},
			],
		}, // RubberMask
		FaceScars: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "FaceScars" },
		}, // FaceScars
		AnimalNoses: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "ButtonNose",
				},
				{
					Name: "ElegantFelineNose",
				},
				{
					Name: "LargeCanineNose",
				},
			],
		}, // Animal Noses
		EldritchMask: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Eyes",
				},
				{
					Name: "GlowingEyes",
				},
			],
		}, // Eldritch Mask
		Splatters: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "Splatters" },
		}, // Splatters
		KirugumiMask: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemHood", AssetName: "KirugumiMask" },
			DialogPrefix: {
				Header: "ItemHoodKirugumiMaskSelect",
				Module: "ItemHoodKirugumiMaskModule",
				Option: "ItemHoodKirugumiMaskOption",
			},
		},
	}, // Mask
	ItemLegs: {
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Legs",
					Property: {
						Difficulty: 0,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "HalfLegs",
					Prerequisite: ["NoClothLower"],
					Property: {
						Hide: ["ClothLower", "Garters"],
						Difficulty: 2,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "MostLegs",
					Prerequisite: ["NoClothLower"],
					Property: {
						Hide: ["ClothLower", "Garters"],
						Difficulty: 4,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
				},
				{
					Name: "CompleteLegs",
					Prerequisite: ["NoClothLower"],
					Property: {
						Hide: ["ClothLower", "Garters"],
						Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
						Difficulty: 6,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						HideItem: [
							"PantiesPoofyDiaper",
							"PantiesBulkyDiaper",
							"ItemPelvisPoofyDiaper",
							"ItemPelvisBulkyDiaper",
						],
					},
				},
				{
					Name: "PetLegs",
					Prerequisite: ["NoClothLower"],
					Property: {
						Hide: ["ClothLower", "Garters"],
						SetPose: ["Kneel"],
						Difficulty: 6,
					},
					Random: false,
				},
				{
					Name: "CutOut",
					Prerequisite: ["NoClothLower"],
					Property: {
						Hide: ["ClothLower", "Garters"],
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 6,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectTapeWrapping",
				Option: "DuctTapePose",
				Chat: "DuctTapeRestrain",
				Npc: "DuctTapePose",
			},
		}, // DuctTape
		NylonRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Knees",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "Thighs",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "KneesThighs",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "Frogtie",
					BondageLevel: 3,
					Property: {
						SetPose: ["Kneel"],
						AllowActivePose: [...PoseAllKneeling, "AllFours", "Hogtied"],
						Difficulty: 3,
					},
					Random: false,
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Chat: "LegRopeSet",
				Npc: "RopeBondage",
			},
		}, // NylonRope
		HempRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Basic",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "FullBinding",
					BondageLevel: 2,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "Link",
					BondageLevel: 2,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "Frogtie",
					BondageLevel: 3,
					Property: {
						SetPose: ["Kneel"],
						AllowActivePose: ["Kneel", "KneelingSpread", "Hogtied", "AllFours"],
						Difficulty: 3,
					},
					Random: false,
				},
				{
					Name: "Crossed",
					BondageLevel: 4,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 4,
					},
				},
				{
					Name: "Mermaid",
					BondageLevel: 4,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 4,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Chat: "LegRopeSet",
				Npc: "RopeBondage",
			},
		}, // HempRope
		Chains: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Basic",
					BondageLevel: 0,
					Property: { Difficulty: 0 },
				},
				{
					Name: "Strict",
					BondageLevel: 2,
					Property: { Difficulty: 2 },
				},
			],
			DialogPrefix: {
				Header: "SelectChainBondage",
				Option: "ChainBondage",
				Chat: "LegChainSet",
				Npc: "ChainBondage",
			},
			ChangeWhenLocked: false,
		}, // Chains
		SturdyLeatherBelts: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemArms", AssetName: "SturdyLeatherBelts" },
			Options: [
				{
					Name: "One",
				},
				{
					Name: "Two",
					Property: { Difficulty: 2 },
				},
			],
		}, // SturdyLeatherBelts
		FuturisticLegCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemLegs", AssetName: "LeatherLegCuffs" },
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemLegsLeatherLegCuffs",
				Chat: "FuturisticLegCuffsRestrain",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticLegCuffs
		ShinyLegBinder: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Laced",
				},
				{
					Name: "Asylum",
				},
				{
					Name: "Beltbinder",
				},
				{
					Name: "Classic",
				},
			],
			ChangeWhenLocked: false,
		}, // ShinyLegBinder
		LeatherLegCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "None",
				},
				{
					Name: "Closed",
					Property: {
						SetPose: ["LegsClosed"],
						Effect: [E.BlockWardrobe, E.Slow],
						AllowActivePose: ["Kneel", "LegsClosed"],
						Difficulty: 6,
					},
				},
				{
					Name: "Chained",
					Property: {
						Effect: [E.Slow],
						SetPose: ["BaseLower"],
						AllowActivePose: ["Kneel", ...PoseAllStanding],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
			},
		}, // LeatherLegCuffs
		LeatherDeluxeLegCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemLegs", AssetName: "LeatherLegCuffs" },
		}, // LeatherDeluxeLegCuffs
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Messystyle",
					Property: { Difficulty: 3 },
				},
				{
					Name: "MessyWrap",
					Property: { Difficulty: 4 },
				},
				{
					Name: "Cross",
					Property: { Difficulty: 5 },
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
			},
		}, // Ribbons
		OrnateLegCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "LeatherLegCuffs" },
		}, // OrnateLegCuffs
		Zipties: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "ZipLegLight",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "ZipLegMedium",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "ZipLegFull",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "ZipFrogtie",
					Property: {
						SetPose: ["Kneel"],
						AllowActivePose: ["AllFours", "Hogtied"],
						Difficulty: 3,
					},
					Random: false,
				},
			],
			DialogPrefix: {
				Header: "SelectZipTie",
				Option: "ZipBondage",
				Npc: "Zip",
			},
		}, // Zipties
		MermaidTail: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // MermaidTail
		BarrelCorset: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemTorso", AssetName: "BarrelCorset" },
		}, // BarrelCorset
		PawPaddedPetsuitLegs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Padding",
				},
				{
					Name: "None",
				},
			],
			ChangeWhenLocked: false,
			DialogPrefix: {
				Header: "ItemLegsPawPaddedPetsuitLegsSelect",
				Option: "ItemLegsPawPaddedPetsuitLegs",
				Chat: "ItemLegsPawPaddedPetsuitLegsSet",
			},
		}, // PawPaddedPetsuitLegs
	}, // ItemLegs
	ItemFeet: {
		SpreaderMetal: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Narrow",
					Property: {
						SetPose: ["LegsOpen"],
					},
				},
				{
					Name: "Wide",
					Property: {
						SetPose: ["Spread"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectSpreaderType",
				Option: "SpreaderMetalPose",
			},
			ChatSetting: TypedItemChatSetting.SILENT,
		}, // SpreaderMetal
		HeavySpreaderMetal: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemFeet", AssetName: "SpreaderMetal" },
			DialogPrefix: {
				Header: "SelectSpreaderType",
				Option: "HeavySpreaderMetalPose",
			},
		}, // HeavySpreaderMetal
		Chains: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Basic",
					BondageLevel: 0,
					Property: {
						Difficulty: 0,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "Strict",
					BondageLevel: 2,
					Property: {
						Difficulty: 2,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "Suspension",
					BondageLevel: 6,
					Property: {
						Difficulty: 4,
						SetPose: ["Suspension", "LegsClosed"],
					},
					Random: false,
				},
			],
			DialogPrefix: {
				Header: "SelectChainBondage",
				Option: "ChainBondage",
				Chat: "LegChainSet",
				Npc: "ChainBondage",
			},
			ChangeWhenLocked: false,
		}, // Chains
		FuturisticAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemFeet", AssetName: "SteelAnkleCuffs" },
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticAnkleCuffs
		SteelAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "None",
					Property: {
						Difficulty: 0,
					},
				},
				{
					Name: "Closed",
					Property: {
						Effect: [E.BlockWardrobe, E.Freeze],
						SetPose: ["LegsClosed"],
						Difficulty: 6,
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "Chained",
					Property: {
						Effect: [E.Slow],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemFeetSteelAnkleCuffs",
				Chat: "ItemFeetSteelAnkleCuffsSet",
			},
		}, // SteelAnkleCuffs
		SturdyLeatherBelts: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemArms", AssetName: "SturdyLeatherBelts" },
		}, // SturdyLeatherBelts
		LeatherAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "SteelAnkleCuffs" },
		}, // LeatherAnkleCuffs
		LeatherDeluxeAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "SteelAnkleCuffs" },
		}, // LeatherDeluxeAnkleCuffs
		OrnateAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "SteelAnkleCuffs" },
		}, // OrnateAnkleCuffs
		HighStyleSteelAnkleCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "SteelAnkleCuffs" },
		}, // HighStyleSteelAnkleCuffs
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Feet",
					Property: {
						Difficulty: 0,
						Hide: [],
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "HalfFeet",
					Property: {
						Difficulty: 2,
						Hide: ["ClothLower", "Shoes"],
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "MostFeet",
					Property: {
						Difficulty: 4,
						Hide: ["ClothLower", "Shoes"],
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
				{
					Name: "CompleteFeet",
					Property: {
						Difficulty: 6,
						Hide: ["ClothLower", "Shoes"],
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectTapeWrapping",
				Chat: "DuctTapeRestrain",
				Npc: "DuctTapeRestrain",
				Option: "DuctTapePose",
			},
		}, // DuctTape
		Zipties: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "ZipFeetLight",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "ZipFeetMedium",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "ZipFeetFull",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectZipTie",
				Chat: "ZipFeetSet",
				Npc: "ZipFeetSet",
				Option: "ZipBondage",
			},
		}, // Zipties
		Tentacles: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Closed",
					Property: { SetPose: ["LegsClosed"], AllowActivePose: ["Kneel"] },
				},
				{
					Name: "Spread",
					Property: {
						OverridePriority: 25,
						SetPose: ["Spread"],
						OverrideHeight: { Height: 0, Priority: 60 },
					},
				},
			],
		}, // Tentacles
		WoodenCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "LegsOpen",
					Property: {
						Difficulty: 2,
						SetPose: ["LegsOpen"],
						SelfUnlock: true,
					},
				},
				{
					Name: "Spread2",
					Property: {
						Difficulty: 3,
						SetPose: ["Spread"],
						SelfUnlock: true,
					},
				},
				{
					Name: "Spread3",
					Property: {
						Difficulty: 3,
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						SelfUnlock: true,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBondagePosition",
				Option: "ItemFeetWoodenCuffs",
			},
		}, // WoodenCuffs
		NylonRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Ankles",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "Knees",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "AnklesKnees",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "BedSpreadEagle",
					BondageLevel: 1,
					Property: {
						Block: ["ItemDevices"],
						SetPose: ["Spread"],
						Difficulty: 5,
					},
					Prerequisite: ["OnBed"],
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Npc: "RopeBondage",
				Chat: "FeetRopeSet",
			},
		}, // NylonRope
		HempRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Basic",
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 1,
					},
				},
				{
					Name: "FullBinding",
					BondageLevel: 2,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "Link",
					BondageLevel: 2,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 2,
					},
				},
				{
					Name: "Diamond",
					BondageLevel: 4,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 4,
					},
				},
				{
					Name: "Mermaid",
					BondageLevel: 4,
					Property: {
						SetPose: ["LegsClosed"],
						AllowActivePose: ["Kneel"],
						Difficulty: 4,
					},
				},
				{
					Name: "Suspension",
					BondageLevel: 6,
					Property: {
						SetPose: ["LegsClosed", "Suspension"],
						Difficulty: 6,
					},
					Expression: [{ Group: "Blush", Name: "High", Timer: 30 }],
				},
				{
					Name: "BedSpreadEagle",
					BondageLevel: 1,
					Property: {
						Block: ["ItemDevices"],
						SetPose: ["Spread"],
						Difficulty: 5,
					},
					Prerequisite: ["OnBed"],
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Npc: "RopeBondage",
				Chat: "LegRopeSet",
			},
		},
		SpreaderVibratingDildoBar: {
			Archetype: ExtendedArchetype.VIBRATING,
		}, // SpreaderVibratingDildoBar
		KneeOvernighter: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {
						Difficulty: 5,
					},
				},
				{
					Name: "Thigh",
					Property: {
						Difficulty: 7,
						Effect: [E.Freeze],
					},
				},
			],
			DrawImages: false,
			ChangeWhenLocked: false,
		}, // KneeOvernighter
		HeelBinders: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "Restraints",
					Key: "r",
					Options: [
						{
							// r0 - Chain
							Property: {
								Effect: [E.Slow],
								Difficulty: 5,
							},
						},
						{
							// r1 - None
							Property: {},
						},
						{
							// r2 - ShortChain
							Property: {
								SetPose: ["LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Slow, E.BlockWardrobe],
								Difficulty: 6,
							},
						},
						{
							// r3 - Strap Limiter
							Property: {
								AllowActivePose: [
									"LegsOpen",
									"LegsClosed",
									"Kneel",
									"AllFours",
									"Hogtied",
								],
								Effect: [E.Slow, E.BlockWardrobe],
								Difficulty: 5,
							},
						},
						{
							// r4 - Spread Bar Stand
							Property: {
								SetPose: ["LegsOpen"],
								AllowActivePose: ["Kneel"],
								Effect: [E.BlockWardrobe, E.Freeze, E.MapImmobile],
								Difficulty: 7,
							},
						},
						{
							// r5 - Spread Bar Spread
							Property: {
								SetPose: ["Spread"],
								AllowActivePose: ["KneelingSpread"],
								Effect: [E.BlockWardrobe, E.Freeze, E.MapImmobile],
								Difficulty: 8,
							},
						},
						{
							// r6 - Spread Bar Sus.Inverted
							Property: {
								SetPose: ["Spread", "Suspension"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Tethered, E.MapImmobile],
								OverrideHeight: { Height: -20, Priority: 41 },
								Difficulty: 9,
							},
						},
						{
							// r7 - Spread Bar Spread.Ground
							Property: {
								SetPose: ["Spread"],
								Effect: [E.BlockWardrobe, E.Freeze, E.Tethered, E.MapImmobile],
								Difficulty: 9,
							},
						},
					],
				},
			],
		}, // HeelBinders
	}, // ItemFeet
	ItemMisc: {
		ServingTray: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{ Name: "Empty" },
				{ Name: "Drinks" },
				{ Name: "Cake" },
				{ Name: "Cookies" },
				{ Name: "Toys" },
			],
		}, // WoodenMaidTray
		TeddyBear: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Bear",
				},
				{
					Name: "Fox",
				},
				{
					Name: "Pup",
				},
				{
					Name: "Pony",
				},
				{
					Name: "Kitty",
				},
				{
					Name: "Bunny",
				},
			],
		}, // TeddyBear
		PetPost: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ItemNeckRestraints", AssetName: "PetPost" },
			Modules: [
				{
					Name: "Plaque",
					Key: "p",
					Options: [
						{}, //p0 - Border
						{}, //p1 - Border
					],
				},
				{
					Name: "Dirt",
					Key: "d",
					Options: [
						{}, //d0 - Clean
						{}, //d1 - Dirty
					],
				},
				{
					Name: "Sticker",
					Key: "s",
					Options: [
						{}, //s0 - Paw
						{}, //s1 - Triskel
						{}, //s2 - Moon
						{}, //s3 - LGBT
						{}, //s4 - Trans
						{}, //s5 - Bi
						{}, //s6 - NoSwim
						{}, //s7 - None
					],
				},
				{
					Name: "PostIt",
					Key: "m",
					Options: [
						{}, //m0 - Postit
						{}, //m1 - No PostIt
					],
				},
				{
					Name: "Txt",
					Key: "x",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 14, Text2: 14, Text3: 14 },
								Font: "sans-serif",
								ScriptHooks: {
									AfterDraw: AssetsItemNeckRestraintsPetPostAfterDrawHook,
								},
							},
						}, // text
					],
				},
			],
			DialogPrefix: {
				Chat: "ItemNeckRestraintsPetPostSet",
			},
		}, //PetPost
		WoodenSign: {
			Archetype: ExtendedArchetype.TEXT,
			MaxLength: { Text: 12, Text2: 12 },
			Font: "'Calligraffitti', cursive",
			ScriptHooks: {
				AfterDraw: AssetsItemMiscWoodenSignAfterDrawHook,
			},
		}, // WoodenSign
		PetPotato: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.ASSET_NAME],
			Options: [{ Name: "Lap" }, { Name: "Floor" }],
			DrawImages: false,
			DialogPrefix: {
				Header: "ItemMiscPetPotatoSelect",
				Option: "ItemMiscPetPotato",
				Chat: "ItemMiscPetPotatoSet",
			},
		}, // PetPotato
		Karl: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "PetPotato" },
		}, // Karl
		FoxPlush: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "PetPotato" },
		}, // FoxPlush
		BunPlush: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "PetPotato" },
		}, // BunPlush
		IntricatePadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscIntricatePadlockDrawHook,
			},
		}, // IntricatePadlock
		HighSecurityPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Init: InventoryItemMiscHighSecurityPadlockInitHook,
				Load: InventoryItemMiscHighSecurityPadlockLoadHook,
				Draw: InventoryItemMiscHighSecurityPadlockDrawHook,
				Click: InventoryItemMiscHighSecurityPadlockClickHook,
				Exit: InventoryItemMiscHighSecurityPadlockExitHook,
			},
			BaselineProperty: {
				MemberNumberListKeys: "",
			},
		}, // HighSecurityPadlock
		SafewordPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "PasswordPadlock" },
			ScriptHooks: {
				Load: InventoryItemMiscSafewordPadlockLoadHook,
				Draw: InventoryItemMiscSafewordPadlockDrawHook,
				Click: InventoryItemMiscSafewordPadlockClickHook,
				Exit: InventoryItemMiscPasswordPadlockExitHook,
			},
		}, // SafewordPadlock
		TimerPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscTimerPadlockDrawHook,
				Click: InventoryItemMiscTimerPadlockClickHook,
			},
		}, // TimerPadlock
		PasswordPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			DialogPrefix: {
				Header: (data, C, item) => {
					const lockmemberNumber = item.Property?.LockMemberNumber;
					if (lockmemberNumber == null) {
						return "";
					}
					return `${InterfaceTextGet("LockMemberNumber")} ${lockmemberNumber}`;
				},
			},
			ScriptHooks: {
				Load: InventoryItemMiscPasswordPadlockLoadHook,
				Draw: InventoryItemMiscPasswordPadlockDrawHook,
				Click: InventoryItemMiscPasswordPadlockClickHook,
				Exit: InventoryItemMiscPasswordPadlockExitHook,
			},
			BaselineProperty: {
				Password: "PASSWORD",
				Hint: "Take a guess...",
				LockSet: false,
				RemoveOnUnlock: false,
			},
		}, // PasswordPadlock
		MistressPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscMistressPadlockDrawHook,
			},
		}, // MistressPadlock
		PandoraPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "MistressPadlock" },
		}, // PandoraPadlock
		OwnerTimerPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscOwnerTimerPadlockDrawHook,
				Click: InventoryItemMiscOwnerTimerPadlockClickHook,
				Exit: InventoryItemMiscOwnerTimerPadlockExitHook,
			},
			BaselineProperty: {
				RemoveItem: false,
				ShowTimer: true,
				EnableRandomInput: false,
				MemberNumberList: [],
			},
		}, // OwnerTimerPadlock
		LoversTimerPadlock: {
			CopyConfig: { GroupName: "ItemMisc", AssetName: "OwnerTimerPadlock" },
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: (...args) =>
					InventoryItemMiscOwnerTimerPadlockDrawHook(
						...args,
						InventoryItemMiscLoversTimerPadlockValidator,
					),
				Click: (...args) =>
					InventoryItemMiscOwnerTimerPadlockClickHook(
						...args,
						InventoryItemMiscLoversTimerPadlockValidator,
					),
				Exit: (...args) => InventoryItemMiscOwnerTimerPadlockExitHook(...args),
			},
		}, // LoversTimerPadlock
		OwnerPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscOwnerPadlockDrawHook,
			},
		}, // OwnerPadlock
		LoversPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "OwnerPadlock" },
		}, // LoversPadlock
		FamilyPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscFamilyPadlockDrawHook,
			},
		}, // FamilyPadlock
		PortalLinkPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "ExclusivePadlock" },
		}, // PortalLinkPadlock
		MistressTimerPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscMistressTimerPadlockDrawHook,
				Click: InventoryItemMiscMistressTimerPadlockClickHook,
				Exit: InventoryItemMiscMistressTimerPadlockExitHook,
			},
			BaselineProperty: {
				RemoveItem: false,
				ShowTimer: true,
				EnableRandomInput: false,
				MemberNumberList: [],
			},
		}, // MistressTimerPadlock
		MetalPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			CopyConfig: { GroupName: "ItemMisc", AssetName: "IntricatePadlock" },
		}, // MetalPadlock
		ExclusivePadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Draw: InventoryItemMiscExclusivePadlockDrawHook,
			},
		}, // ExclusivePadlock
		CombinationPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Load: InventoryItemMiscCombinationPadlockLoadHook,
				Draw: InventoryItemMiscCombinationPadlockDrawHook,
				Click: InventoryItemMiscCombinationPadlockClickHook,
				Exit: InventoryItemMiscCombinationPadlockExitHook,
			},
			BaselineProperty: {
				CombinationNumber: "0000",
			},
		}, // ExclusivePadlock
		TimerPasswordPadlock: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Load: InventoryItemMiscTimerPasswordPadlockLoadHook,
				Draw: InventoryItemMiscTimerPasswordPadlockDrawHook,
				Click: InventoryItemMiscTimerPasswordPadlockClickHook,
				Exit: InventoryItemMiscTimerPasswordPadlockExitHook,
			},
			BaselineProperty: {
				Password: "PASSWORD",
				Hint: "Take a guess...",
				LockSet: false,
				RemoveItem: false,
				ShowTimer: true,
				EnableRandomInput: false,
				MemberNumberList: [],
			},
		}, // TimerPasswordPadlock
		Plushie: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "ItemHandheld",
				AssetName: "Plushie",
			},
			DialogPrefix: {
				Header: "ItemHandheldPlushieSelect",
				Module: "ItemHandheldPlushieModule",
				Option: "ItemHandheldPlushieOption",
				Chat: "ItemHandheldPlushieSet",
			},
		}, //Plushie
		MiniDolls: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				GroupName: "ItemHandheld",
				AssetName: "MiniDolls",
			},
			DialogPrefix: {
				Header: "SelectDollType",
				Option: "MinidollsItemHandheldType",
				Chat: "MinidollsItemHandheldSet",
			},
		}, // Minidolls
	}, // ItemMisc
	ItemPelvis: {
		FuturisticChastityBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Model",
					Key: "m",
					Options: [{}, {}, {}, {}],
				},
				{
					Name: "Front",
					Key: "f",
					Options: [
						{
							Property: {},
						},
						{
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								Effect: [E.Chaste],
							},
						},
					],
				},
				{
					Name: "Back",
					Key: "b",
					Options: [
						{
							Property: {},
						},
						{
							Property: {
								Block: ["ItemButt"],
							},
						},
					],
				},
				{
					Name: "Tamper",
					Key: "t",
					Options: [{}, {}, {}],
				},
				{
					Name: "Orgasm",
					Key: "o",
					Options: [{}, {}],
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
			},
		}, // FuturisticChastityBelt
		MetalChastityBelt: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "OpenBack",
					Property: {
						Block: [],
					},
				},
				{
					Name: "ClosedBack",
					Property: {
						Block: ["ItemButt"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectBackShield",
				Option: "Chastity",
				Npc: "Chastity",
				Chat: "ChastityBeltBackShield",
			},
			ChangeWhenLocked: false,
		}, // MetalChastityBelt
		ForbiddenChastityBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			DrawImages: true,
			Modules: [
				{
					Name: "CrotchShield",
					Key: "c",
					Options: [
						{}, // 0 - open
						{
							// 1 - close front
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
							},
						},
						{
							// 2 - close back
							Property: {
								Effect: [E.ButtChaste],
								Block: ["ItemButt"],
							},
						},
						{
							// 3 - close both
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste, E.ButtChaste],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
							},
						},
					],
				},
				{
					Name: "ShockModule",
					Key: "s",
					DrawImages: false,
					DrawData: {
						elementData: [
							{ position: ExtendedXYWithoutImages[8][0] },
							{ position: ExtendedXYWithoutImages[8][1] },
							{ position: ExtendedXYWithoutImages[8][2] },
							{ position: ExtendedXYWithoutImages[8][3] },
						],
					},
					Options: [
						{}, // Off
						{ Property: { ShockLevel: 0 } }, // Low
						{ Property: { ShockLevel: 1 } }, // Medium
						{ Property: { ShockLevel: 2 } }, // High
					],
				},
			],
			DrawData: {
				elementData: [
					{}, // CrotchShield
					{
						imagePath:
							"Screens/Inventory/ItemPelvis/ForbiddenChastityBelt/s0.png",
					}, // ShockModule
				],
			},
			ScriptHooks: {
				Draw: InventoryItemBreastForbiddenChastityBraDrawHook,
				Click: InventoryItemBreastForbiddenChastityBraClickHook,
				BeforeDraw: AssetsItemNeckAccessoriesCollarShockUnitBeforeDrawHook,
				ScriptDraw: AssetsItemBreastForbiddenChastityBraScriptDrawHook,
			},
			ChangeWhenLocked: false,
			BaselineProperty: {
				TriggerCount: 0,
				ShowText: true,
				BlinkState: false,
				PunishOrgasm: false,
				PunishStandup: false,
				PunishStruggle: false,
			},
		}, // ForbiddenChastityBelt
		OrnateChastityBelt: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "MetalChastityBelt" },
		}, // OrnateChastityBelt
		StuddedChastityBelt: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "MetalChastityBelt" },
		}, // StuddedChastityBelt
		PolishedChastityBelt: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "MetalChastityBelt" },
		}, // PolishedChastityBelt
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "BowWrap",
					Property: { Difficulty: 3, OverridePriority: 21 },
				},
				{
					Name: "CrotchWrapping",
					Property: { Difficulty: 4 },
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
				Option: "RibbonsBelt",
				Npc: "ItemPelvisRibbons",
				Chat: "PelvisRibbonsSet",
			},
		}, // Ribbons
		HempRope: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			Options: [
				{
					Name: "Crotch",
					Property: { Difficulty: 1, Effect: [E.CrotchRope] },
				},
				{
					Name: "OverPanties",
					Property: {
						Difficulty: 1,
						OverridePriority: 21,
						Effect: [E.CrotchRope],
					},
				},
				{
					Name: "SwissSeat",
					BondageLevel: 4,
					Property: { Difficulty: 4 },
				},
				{
					Name: "KikkouHip",
					BondageLevel: 5,
					Property: { Difficulty: 5 },
				},
			],
			DialogPrefix: {
				Header: "SelectRopeBondage",
				Option: "RopeBondage",
				Npc: "RopeBondage",
				Chat: "PelvisRopeSet",
			},
		}, // HempRope
		PoofyDiaper: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.DEST_CHAR_NAME],
			Options: [
				{
					Name: "RegularPadding",
				},
				{
					Name: "Poofy",
					Property: {
						HideItem: ["ClothLowerSkirt3", "ClothLowerTennisSkirt1"],
					},
				},
			],
		}, // PoofyDiaper
		ObedienceBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "CrotchShield",
					Key: "c",
					Options: [
						{}, // 0 - open
						{
							// 1 - close front
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								HideItem: [
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
								],
							},
						},
						{
							// 2 - close back
							Property: {
								Effect: [E.ButtChaste],
								Block: ["ItemButt"],
							},
						},
						{
							// 3 - close both
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste, E.ButtChaste],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								HideItem: [
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
								],
							},
						},
					],
				},
				{
					Name: "ShockModule",
					Key: "s",
					Options: [
						{}, // 0 - disabled
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.NOARCH,
								ScriptHooks: {
									Draw: InventoryItemPelvisObedienceBelts1DrawHook,
									Click: InventoryItemPelvisObedienceBelts1ClickHook,
								},
							},
						}, // 1 - enabled
					],
				},
				{
					Name: "Engraving",
					Key: "e",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 13 },
								Font: "Arial, sans-serif",
								DialogPrefix: {
									Chat: "ObedienceBeltEngraving",
								},
								ScriptHooks: {
									AfterDraw: AssetsItemPelvisObedienceBeltAfterDrawHook,
								},
							},
						}, // text
					],
				},
			],
			BaselineProperty: {
				Text: "",
				ShowText: false,
				PunishOrgasm: false,
				PunishStandup: false,
				NextShockTime: 0,
			},
		},
		SciFiPleasurePanties: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "CrotchShield",
					Key: "c",
					DrawImages: false,
					Options: [
						{}, // 0 - open
						{
							// 1 - close front
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
							},
						},
						{
							// 2 - close back
							Property: {
								Effect: [E.ButtChaste],
								Block: ["ItemButt"],
							},
						},
						{
							// 3 - close both
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste, E.ButtChaste],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
							},
						},
					],
				},
				{
					Name: "Intensity",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1 } }, // i0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // i1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // i2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Vibrating] } }, // i3 - High
						{ Property: { Intensity: 3, Effect: [E.Vibrating] } }, // i4 - Maximum
					],
				},
				{
					Name: "OrgasmLock",
					Key: "o",
					DrawImages: false,
					Options: [
						{}, // o0 - Normal
						{ Property: { Effect: [E.DenialMode] } }, // o1 - Edge
						{ Property: { Effect: [E.DenialMode, E.RuinOrgasms] } }, // o2 - Deny
					],
				},
				{
					Name: "ShockLevel",
					Key: "s",
					DrawImages: false,
					Options: [
						{ Property: { ShockLevel: 0 } }, // s0 - Level 1
						{ Property: { ShockLevel: 1 } }, // s1 - Level 2
						{ Property: { ShockLevel: 2 } }, // s2 - Level 3
					],
				},
			],
			BaselineProperty: { ShowText: true },
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: InventoryItemPelvisSciFiPleasurePantiesClickHook,
				Draw: InventoryItemPelvisSciFiPleasurePantiesDrawHook,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
			DialogPrefix: {
				Chat: InventoryItemPelvisSciFiPleasurePantiesChatPrefix,
			},
		},
		PortalPanties: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [CommonChatTags.DEST_CHAR_NAME, CommonChatTags.ASSET_NAME],
			Modules: [
				{
					Name: "Code",
					Key: "o",
					Options: [
						{
							HasSubscreen: true,
							ChangeWhenLocked: false,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.NOARCH,
								ScriptHooks: {
									Load: PortalLinkRecieverLoadHook,
									Draw: PortalLinkRecieverDrawHook,
									Click: PortalLinkRecieverClickHook,
									Exit: PortalLinkRecieverExitHook,
								},
							},
						},
					],
				},
				{
					Name: "CrotchShield",
					Key: "c",
					Options: [
						{}, // 0 - open
						{
							// 1 - close front
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								Attribute: [
									"PortalLinkTargetItemVulva",
									"PortalLinkActivityCaress",
									"PortalLinkActivityKiss",
									"PortalLinkActivitySlap",
									"PortalLinkActivityMasturbateHand",
									"PortalLinkActivityMasturbateTongue",
								],
								Hide: ["Pussy"],
							},
						},
						{
							// 2 - close back
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemButt"],
								Attribute: [
									"PortalLinkTargetItemButt",
									"PortalLinkActivityCaress",
									"PortalLinkActivityKiss",
									"PortalLinkActivitySlap",
									"PortalLinkActivityMasturbateHand",
									"PortalLinkActivityMasturbateTongue",
								],
								Hide: ["Pussy"],
							},
						},
						{
							// 3 - close both
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								Hide: ["Pussy"],
							},
						},
					],
				},
			],
			DrawData: {
				elementData: [{ position: ExtendedXY[1][0] }, { hidden: true }],
			},
			BaselineProperty: {
				PortalLinkCode: "00000000",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
			},
		},
		LoveChastityBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Modules: [
				{
					Name: "FrontShield",
					Key: "f",
					DrawImages: false,
					Options: [
						{
							// 0 - open
							Expression: [{ Name: "Low", Group: "Blush", Timer: 10 }],
						},
						{
							// 1 - close front
							Prerequisite: ["CanCoverVulva"],
							Expression: [{ Name: "Medium", Group: "Blush", Timer: 10 }],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
							},
						},
						{
							// 2 - close front & vibrator
							Prerequisite: ["CanCoverVulva"],
							Expression: [{ Name: "Medium", Group: "Blush", Timer: 10 }],
							Property: {
								Effect: [E.Chaste, E.Egged],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
							},
						},
						{
							// 3 - close front & shock unit
							Prerequisite: ["CanCoverVulva"],
							Expression: [{ Name: "Medium", Group: "Blush", Timer: 10 }],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
							},
						},
					],
				},
				{
					Name: "BackShield",
					Key: "b",
					DrawImages: false,
					Options: [
						{}, // 0 - open
						{
							// 1 - closed
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemButt"],
							},
						},
					],
				},
				{
					Name: "Intensity",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1 } }, // i0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // i1 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // i2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Vibrating] } }, // i3 - High
						{ Property: { Intensity: 3, Effect: [E.Vibrating] } }, // i4 - Maximum
					],
				},
				{
					Name: "ShockLevel",
					Key: "s",
					DrawImages: false,
					Options: [
						{ Property: { ShockLevel: 0 } }, // s0 - Level 1
						{ Property: { ShockLevel: 1 } }, // s1 - Level 2
						{ Property: { ShockLevel: 2 } }, // s2 - Level 3
					],
				},
			],
			BaselineProperty: { ShowText: true },
			ScriptHooks: {
				SetOption: InventoryItemPelvisLoveChastityBeltSetOptionHook,
				Draw: InventoryItemPelvisLoveChastityBeltDrawHook,
				Validate: InventoryItemPelvisLoveChastityBeltValidateHook,
				Click: (...args) => {
					InventoryItemPelvisSciFiPleasurePantiesClickHook(...args, false);
				},
			},
			DialogPrefix: {
				Chat: InventoryItemPelvisSciFiPleasurePantiesChatPrefix,
			},
		}, // LoveChastityBelt
		FuturisticTrainingBelt: {
			Archetype: ExtendedArchetype.VIBRATING,
			Options: [VibratorModeSet.STANDARD],
			ScriptHooks: {
				Load: InventoryItemPelvisFuturisticTrainingBeltLoadHook,
				Click: InventoryItemPelvisFuturisticTrainingBeltClickHook,
				Draw: InventoryItemPelvisFuturisticTrainingBeltDrawHook,
				Exit: InventoryItemPelvisFuturisticTrainingBeltExitHook,
				Validate: FuturisticAccessValidate,
				ScriptDraw: AssetsItemPelvisFuturisticTrainingBeltScriptDrawHook,
			},
			BaselineProperty: {
				ShowText: false,
				NextShockTime: 0,
				PunishStruggle: false,
				PunishStruggleOther: false,
				PunishOrgasm: false,
				PunishStandup: false,
				PunishSpeech: 0,
				PunishRequiredSpeech: 0,
				PunishRequiredSpeechWord: "Miss",
				PunishProhibitedSpeech: 0,
				PunishProhibitedSpeechWords: "I,me,am,my,im",
				PublicModeCurrent: 0,
				PublicModePermission: 0,
			},
			AllowEffect: [E.DenialMode, E.RuinOrgasms],
		}, // FuturisticTrainingBelt
		HeavyDutyBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "CrotchShield",
					Key: "c",
					Options: [
						{}, // 0 - open
						{
							// 1 - transparent
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								Hide: ["Pussy"],
							},
						},
						{
							// 2 - metal
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								HideItem: [
									"ItemButtAnalBeads2",
									"ItemVulvaVibratingDildo",
									"ItemVulvaClitSuctionCup",
									"ItemVulvaInflatableVibeDildo",
									"ItemVulvaHeavyWeightClamp",
									"ItemVulvaPenisDildo",
									"ItemVulvaShockDildo",
									"ItemVulvaPiercingsVibeHeartClitPiercing",
									"ItemVulvaPiercingsClitRing",
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
									"ItemVulvaPlasticChastityCage1",
									"ItemVulvaPlasticChastityCage2",
									"ItemVulvaTechnoChastityCage",
									"ItemVulvaFlatChastityCage",
									"ItemVulvaVibeEggPenisBase",
									"ItemVulvaChastityPouch",
								],
								Hide: ["Pussy"],
							},
						},
					],
				},
				{
					Name: "BackShield",
					Key: "b",
					DrawImages: false,
					Options: [
						{}, // 0 - open
						{
							// 1 - close back
							Property: {
								Block: ["ItemButt"],
							},
						},
					],
				},
				{
					Name: "Modules",
					Key: "m",
					Options: [
						{}, // 0 - none
						{
							// 1 - cage/spreader
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								Hide: ["Pussy"],
							},
						},
						{
							// 2 - rotors
							Property: {
								Hide: ["Pussy"],
							},
						},
						{
							// 3 - both
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: [E.Chaste],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								Hide: ["Pussy"],
							},
						},
					],
				},
				{
					Name: "Intensity",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1, Effect: [E.Egged] } }, // i0 - Turn Off
						{ Property: { Intensity: 0, Effect: [E.Egged, E.Vibrating] } }, // i1 - Low
						{ Property: { Intensity: 1, Effect: [E.Egged, E.Vibrating] } }, // i2 - Medium
						{ Property: { Intensity: 2, Effect: [E.Egged, E.Vibrating] } }, // i3 - High
						{ Property: { Intensity: 3, Effect: [E.Egged, E.Vibrating] } }, // i4 - Maximum
					],
				},
				{
					Name: "OrgasmLock",
					Key: "o",
					DrawImages: false,
					Options: [
						{}, // o0 - Normal
						{ Property: { Effect: [E.DenialMode] } }, // o1 - Edge
						{ Property: { Effect: [E.DenialMode, E.RuinOrgasms] } }, // o2 - Deny
					],
				},
			],
		}, //HeavyDutyBelt
		ModularChastityBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "BeltType",
					Key: "a",
					Options: [
						{}, // 0 - Invisible
						{}, // 1 - Standard
					],
				},
				{
					Name: "CrotchShield",
					Key: "c",
					DrawImages: false,
					Options: [
						{}, // 0 - open
						{
							// 1 - Close Front
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: ["Chaste"],
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								HideItem: [
									"ItemButtAnalBeads2",
									"ItemVulvaPenisDildo",
									"ItemVulvaShockDildo",
									"ItemVulvaVibratingDildo",
									"ItemVulvaInflatableVibeDildo",
									"ItemVulvaClitoralStimulator",
									"ItemVulvaClitSuctionCup",
									"ItemVulvaHeavyWeightClamp",
									"ItemVulvaLoversVibrator",
									"ItemVulvaDoubleEndDildo",
									"ItemVulvaBasicCockring",
									"ItemVulvaPlasticChastityCage1",
									"ItemVulvaVibeEggPenisBase",
									"ItemVulvaPlasticChastityCage2",
									"ItemVulvaTechnoChastityCage",
									"ItemVulvaFlatChastityCage",
									"ItemVulvaChastityPouch",
									"ItemVulvaFullCasingCage",
									"ItemVulvaPiercingsVibeHeartClitPiercing",
									"ItemVulvaPiercingsClitRing",
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
								],
								Hide: ["Pussy"],
							},
						},
						{
							// 2 - close back
							Property: {
								Effect: ["ButtChaste"],
								Block: ["ItemButt"],
							},
						},
						{
							// 3 - Close both
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Effect: ["Chaste", "ButtChaste"],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								HideItem: [
									"ItemButtAnalBeads2",
									"ItemVulvaPenisDildo",
									"ItemVulvaShockDildo",
									"ItemVulvaVibratingDildo",
									"ItemVulvaInflatableVibeDildo",
									"ItemVulvaClitoralStimulator",
									"ItemVulvaClitSuctionCup",
									"ItemVulvaHeavyWeightClamp",
									"ItemVulvaLoversVibrator",
									"ItemVulvaDoubleEndDildo",
									"ItemVulvaBasicCockring",
									"ItemVulvaPlasticChastityCage1",
									"ItemVulvaVibeEggPenisBase",
									"ItemVulvaPlasticChastityCage2",
									"ItemVulvaTechnoChastityCage",
									"ItemVulvaFlatChastityCage",
									"ItemVulvaChastityPouch",
									"ItemVulvaFullCasingCage",
									"ItemVulvaPiercingsVibeHeartClitPiercing",
									"ItemVulvaPiercingsClitRing",
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
								],
								Hide: ["Pussy"],
							},
						},
					],
				},
				{
					Name: "Intensity",
					Key: "i",
					DrawImages: false,
					Options: [
						{ Property: { Intensity: -1, Effect: ["Egged"] } }, // i0 - Turn Off
						{ Property: { Intensity: 0, Effect: ["Egged", "Vibrating"] } }, // i1 - Low
						{ Property: { Intensity: 1, Effect: ["Egged", "Vibrating"] } }, // i2 - Medium
						{ Property: { Intensity: 2, Effect: ["Egged", "Vibrating"] } }, // i3 - High
						{ Property: { Intensity: 3, Effect: ["Egged", "Vibrating"] } }, // i4 - Maximum
					],
				},
				{
					Name: "Plugs",
					Key: "p",
					DrawImages: false,
					Options: [
						{ Property: { InflateLevel: 0 } }, // p0 - Empty
						{
							Property: {
								InflateLevel: 1,
								Block: ["ItemVulva", "ItemButt"],
								Effect: ["FillVulva", "IsPlugged"],
							},
						}, // p1 - Light
						{
							Property: {
								InflateLevel: 2,
								Block: ["ItemVulva", "ItemButt"],
								Effect: ["FillVulva", "IsPlugged"],
							},
						}, // p2 - Inflated
						{
							Property: {
								InflateLevel: 3,
								Block: ["ItemVulva", "ItemButt"],
								Effect: ["FillVulva", "IsPlugged", "Slow"],
							},
						}, // p3 - Bloated
						{
							Property: {
								InflateLevel: 4,
								Block: ["ItemVulva", "ItemButt"],
								Effect: ["FillVulva", "IsPlugged", "Slow"],
							},
						}, // p4 - Maximum
					],
				},
				{
					Name: "ShockModule",
					Key: "s",
					DrawImages: false,
					Options: [
						{ Property: { ShockLevel: 0 } }, // s0 - Off
						{ Property: { ShockLevel: 0 } }, // s1 - Level 1
						{ Property: { ShockLevel: 1 } }, // s2 - Level 2
						{ Property: { ShockLevel: 2 } }, // s3 - Level 3
					],
					DrawData: {
						elementData: [
							{ position: ExtendedXYWithoutImages[8][0] },
							{ position: ExtendedXYWithoutImages[8][1] },
							{ position: ExtendedXYWithoutImages[8][2] },
							{ position: ExtendedXYWithoutImages[8][3] },
						],
					},
				},
				{
					Name: "VoiceControl",
					Key: "v",
					DrawImages: false,
					Options: [
						{}, //v0 - Off
						{}, //v1 - On
					],
				},
				{
					Name: "OrgasmLock",
					Key: "o",
					DrawImages: false,
					Options: [
						{}, // o0 - Normal
						{ Property: { Effect: ["DenialMode"] } }, // o1 - Edge
						{ Property: { Effect: ["DenialMode", "RuinOrgasms"] } }, // o2 - Deny
					],
				},
			],
			ScriptHooks: {
				Click: InventoryItemPelvisModularChastityBeltClickHook,
				Draw: InventoryItemPelvisModularChastityBeltDrawHook,
				Exit: InventoryItemPelvisModularChastityBeltExitHook,
				ScriptDraw: InventoryItemPelvisModularChastityBeltScriptDrawHook,
			},
			BaselineProperty: {
				TriggerCount: 0,
				OrgasmCount: 0,
				RuinedOrgasmCount: 0,
				TimeWorn: CommonTime(),
				TimeSinceLastOrgasm: CommonTime(),
				ShowText: true,
				ShockLevel: 0,
				PunishOrgasm: false,
				PunishStandup: false,
				PunishStruggle: false,
				PunishStruggleOther: false,
				AccessMode: "",
				TriggerValues: CommonConvertArrayToString(
					InventoryItemPelvisModularChastityBeltVoiceTriggers,
				),
			},
		}, // ModularChastityBelt
		WaistLegHarness: {
			Archetype: ExtendedArchetype.MODULAR,
			ChangeWhenLocked: false,
			Modules: [
				{
					Name: "LinkLegs",
					Key: "l",
					Options: [
						{
							// l0 - None
							Property: {},
						},
						{
							// l1 - Loose Strap
							Property: { Difficulty: 2 },
						},
						{
							// l2 - Locked
							Property: {
								SetPose: ["LegsClosed"],
								AllowActivePose: ["Kneel"],
								Effect: [E.Slow],
								Difficulty: 3,
							},
						},
					],
				},
				{
					Name: "BeltAcc_A",
					Key: "x",
					Options: [
						{
							// x0 - None
							Property: { Difficulty: 0 },
						},
						{
							// x1 - Equipped
							Property: { Difficulty: 1 },
						},
					],
				},
				{
					Name: "BeltAcc_B",
					Key: "y",
					Options: [
						{
							// y0 - None
							Property: { Difficulty: 0 },
						},
						{
							// y1 - Equipped
							Property: { Difficulty: 1 },
						},
					],
				},
				{
					Name: "StrapOn",
					Key: "c",
					Options: [
						{
							// c0 - None
							Property: { Difficulty: 0 },
						},
						{
							// c1 - Equipped
							Property: {
								Difficulty: 1,
								AllowActivity: ["PenetrateItem"],
							},
						},
					],
				},
				{
					Name: "Vibrator",
					Key: "v",
					Options: [
						{
							// v0 - None
							Property: { Difficulty: 1 },
						},
						{
							// v1 - With wand
							Property: { Difficulty: 2 },
						},
						// v2 to v6 - Wand intensity
						{ Property: { Intensity: 0, Effect: [E.Vibrating] } }, // v2 - Low
						{ Property: { Intensity: 1, Effect: [E.Vibrating] } }, // v3 - Mid-Low
						{ Property: { Intensity: 2, Effect: [E.Vibrating] } }, // v4 - Medium
						{ Property: { Intensity: 2, Effect: [E.Egged, E.Vibrating] } }, // v5 - High
						{ Property: { Intensity: 3, Effect: [E.Egged, E.Vibrating] } }, // v6 - Maximum
					],
				},
				{
					Name: "Chastity",
					Key: "t",
					Options: [
						{
							// t0 - None
							Property: { Difficulty: 0 },
						},
						{
							// t1 - Just Strap
							Property: { Difficulty: 5 },
						},
						{
							// t2 - Lock Vagina
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Difficulty: 10,
								Block: ["ItemVulva", "ItemVulvaPiercings"],
								Effect: [E.Chaste],
								HideItem: [
									"ItemButtAnalBeads2",
									"ItemVulvaPenisDildo",
									"ItemVulvaShockDildo",
									"ItemVulvaVibratingDildo",
									"ItemVulvaInflatableVibeDildo",
									"ItemVulvaClitoralStimulator",
									"ItemVulvaClitSuctionCup",
									"ItemVulvaHeavyWeightClamp",
									"ItemVulvaLoversVibrator",
									"ItemVulvaDoubleEndDildo",
									"ItemVulvaBasicCockring",
									"ItemVulvaPlasticChastityCage1",
									"ItemVulvaVibeEggPenisBase",
									"ItemVulvaPlasticChastityCage2",
									"ItemVulvaTechnoChastityCage",
									"ItemVulvaFlatChastityCage",
									"ItemVulvaChastityPouch",
									"ItemVulvaFullCasingCage",
									"ItemVulvaPiercingsVibeHeartClitPiercing",
									"ItemVulvaPiercingsClitRing",
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
								],
								Hide: ["Pussy"],
							},
						},
						{
							// t3 - Lock Ass
							Property: {
								Difficulty: 9,
								Effect: ["ButtChaste"],
								Block: ["ItemButt"],
							},
						},
						{
							// t4 - Lock Both
							Prerequisite: ["CanCoverVulva"],
							Property: {
								Difficulty: 20,
								Effect: ["Chaste", "ButtChaste"],
								Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
								HideItem: [
									"ItemButtAnalBeads2",
									"ItemVulvaPenisDildo",
									"ItemVulvaShockDildo",
									"ItemVulvaVibratingDildo",
									"ItemVulvaInflatableVibeDildo",
									"ItemVulvaClitoralStimulator",
									"ItemVulvaClitSuctionCup",
									"ItemVulvaHeavyWeightClamp",
									"ItemVulvaLoversVibrator",
									"ItemVulvaDoubleEndDildo",
									"ItemVulvaBasicCockring",
									"ItemVulvaPlasticChastityCage1",
									"ItemVulvaVibeEggPenisBase",
									"ItemVulvaPlasticChastityCage2",
									"ItemVulvaTechnoChastityCage",
									"ItemVulvaFlatChastityCage",
									"ItemVulvaChastityPouch",
									"ItemVulvaFullCasingCage",
									"ItemVulvaPiercingsVibeHeartClitPiercing",
									"ItemVulvaPiercingsClitRing",
									"ItemVulvaPiercingsChastityClitShield",
									"ItemVulvaPiercingsHighSecurityVulvaShield",
								],
								Hide: ["Pussy"],
							},
						},
					],
				},
			],
		}, // WaistLegHarness
		WombTattoos: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			CopyConfig: { GroupName: "BodyMarkings", AssetName: "WombTattoos" },
			DialogPrefix: {
				Header: "BodyMarkingsWombTattoosSelect",
				Module: "BodyMarkingsWombTattoosModule",
				Option: "BodyMarkingsWombTattoosOption",
				Chat: "BodyMarkingsWombTattoosSet",
			},
		}, //WombTattoos
	}, // ItemPelvis
	ItemEars: {
		FuturisticEarphones: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Off",
					Property: {
						Effect: [],
					},
				},
				{
					Name: "Light",
					Property: {
						Effect: [E.DeafLight],
					},
				},
				{
					Name: "Heavy",
					Property: {
						Effect: [E.DeafHeavy],
					},
				},
				{
					Name: "NoiseCancelling",
					Property: {
						Effect: [E.DeafTotal],
					},
				},
			],
			DialogPrefix: {
				Header: "HeadphoneEarPlugsSelectLoudness",
				Option: "HeadphoneEarPlugsPose",
				Chat: "HeadphoneEarPlugsRestrain",
				Npc: "ItemEarsHeadphonePlugs",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticEarphones
		HeadphoneEarPlugs: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Off",
					Property: {
						Effect: [],
					},
				},
				{
					Name: "Light",
					Property: {
						Effect: [E.DeafLight],
					},
				},
				{
					Name: "Heavy",
					Property: {
						Effect: [E.DeafHeavy],
					},
				},
				{
					Name: "NoiseCancelling",
					Property: {
						Effect: [E.DeafTotal],
					},
				},
			],
			DialogPrefix: {
				Header: "HeadphoneEarPlugsSelectLoudness",
				Option: "HeadphoneEarPlugsPose",
				Chat: "HeadphoneEarPlugsRestrain",
				Npc: "ItemEarsHeadphonePlugs",
			},
		}, // HeadphoneEarPlugs
		Headphones: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "HeadphoneEarPlugs" },
		}, // Headphones
		BluetoothEarbuds: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "HeadphoneEarPlugs" },
		}, // BluetoothEarbuds
		CustomizableFluffyEars1: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
			DialogPrefix: {
				Header: "HairAccessory1CustomizableFluffyEars1Select",
				Module: "HairAccessory1CustomizableFluffyEars1Module",
				Option: "HairAccessory1CustomizableFluffyEars1Option",
				Chat: "HairAccessory1CustomizableFluffyEars1Set",
			},
		}, // Customizable Fluffy Ears 1
		CustomizableFluffyEars2: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
			DialogPrefix: {
				Header: "HairAccessory1CustomizableFluffyEars1Select",
				Module: "HairAccessory1CustomizableFluffyEars1Module",
				Option: "HairAccessory1CustomizableFluffyEars1Option",
				Chat: "HairAccessory1CustomizableFluffyEars1Set",
			},
		}, // Customizable Fluffy Ears 2
		CustomizableFluffyEars3: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
			DialogPrefix: {
				Header: "HairAccessory1CustomizableFluffyEars1Select",
				Module: "HairAccessory1CustomizableFluffyEars1Module",
				Option: "HairAccessory1CustomizableFluffyEars1Option",
				Chat: "HairAccessory1CustomizableFluffyEars1Set",
			},
		}, // Customizable Fluffy Ears 3
		CustomizableCatEars: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
			DialogPrefix: {
				Header: "HairAccessory1CustomizableFluffyEars1Select",
				Module: "HairAccessory1CustomizableFluffyEars1Module",
				Option: "HairAccessory1CustomizableFluffyEars1Option",
				Chat: "HairAccessory1CustomizableFluffyEars1Set",
			},
		}, // Customizable Cat Ears
		CustomizableElfEars: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
			DialogPrefix: {
				Header: "HairAccessory1CustomizableFluffyEars1Select",
				Module: "HairAccessory1CustomizableFluffyEars1Module",
				Option: "HairAccessory1CustomizableFluffyEars1Option",
				Chat: "HairAccessory1CustomizableFluffyEars1Set",
			},
		}, // Customizable Elf Ears
		CustomizableCowEars: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			CopyConfig: {
				GroupName: "HairAccessory1",
				AssetName: "CustomizableFluffyEars1",
			},
			DialogPrefix: {
				Header: "HairAccessory1CustomizableFluffyEars1Select",
				Module: "HairAccessory1CustomizableFluffyEars1Module",
				Option: "HairAccessory1CustomizableFluffyEars1Option",
				Chat: "HairAccessory1CustomizableFluffyEars1Set",
			},
		}, // Customizable Cow Ears
	}, // ItemEars
	Bra: {
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: {
				AssetName: "Ribbons",
				GroupName: "ItemBreast",
			},
		}, // Ribbons
		SexyBikini1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Open",
				},
				{
					Name: "Closed",
				},
			],
			DialogPrefix: {
				Option: "BikiniType",
				Header: "SelectBikiniType",
			},
		}, // SexyBikini1
		CuteBikini1: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "SexyBikini1" },
		}, // CuteBikini1
		Swimsuit1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Shiny",
				},
				{
					Name: "Dull",
				},
			],
		}, // ChineseDress2
		MeshTop: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: {
				GroupName: "Cloth",
				AssetName: "MeshTop",
			},
			DialogPrefix: {
				Header: "ClothMeshTopSelect",
				Module: "ClothMeshTopModule",
				Option: "ClothMeshTopOption",
				Chat: "ClothMeshTopSet",
			},
		}, //Mesh Top
		SportSwimsuit: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Style",
					Key: "s",
					Options: [
						{}, //s0 - Style1
						{}, //s1 - Style2
						{}, //s2 - Style3
					],
				},
			],
		}, //Sport Bra
	}, // Bra
	Panties: {
		Diapers4: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
				},
				{
					Name: "StrawBerry",
				},
				{
					Name: "Flower",
				},
				{
					Name: "Butterfly",
				},
				{
					Name: "Spots",
				},
			],
		}, // Diapers4
		PoofyDiaper: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.DEST_CHAR_NAME],
			Options: [
				{
					Name: "RegularPadding",
				},
				{
					Name: "Poofy",
					Property: {
						HideItem: ["ClothLowerSkirt3", "ClothLowerTennisSkirt1"],
					},
				},
			],
		}, // PoofyDiaper
		MaleCatsuitPanties: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "SuitLower", AssetName: "MaleSeamlessCatsuit" },
		}, // MaleCatsuitPanties - Panties
		Jockstrap: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "String",
				},
				{
					Name: "Sidestraps",
				},
				{
					Name: "Holemesh",
				},
			],
		}, // Jockstrap
		PullDownPanties: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "PutOn",
					Property: {
						Block: [
							"ItemPelvis",
							"ItemButt",
							"ItemVulva",
							"ItemVulvaPiercings",
						],
						HideItem: [
							"ItemButtAnalBeads2",
							"ItemVulvaVibratingDildo",
							"ItemVulvaInflatableVibeDildo",
							"ItemVulvaClitSuctionCup",
							"ItemVulvaTapeStrips",
							"ItemVulvaBenWaBalls",
							"ItemVulvaHeavyWeightClamp",
							"ItemVulvaShockDildo",
						],
					},
				},
				{
					Name: "PulledAside",
					Property: {
						HideItem: ["ItemButtAnalBeads2"],
					},
				},
				{
					Name: "CrotchExposed",
					Property: {
						Effect: [E.Slow],
					},
				},
				{
					Name: "AroundThighs",
					Property: {
						Effect: [E.Slow],
					},
				},
				{
					Name: "AroundKnees",
					Property: {
						Effect: [E.Slow],
					},
				},
				{
					Name: "AroundAnkles",
					Property: {
						Effect: [E.Slow],
					},
				},
			],
		}, // PullDownPanties
		RoyalDiaper: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "None",
				},
				{
					Name: "Simple",
				},
				{
					Name: "HisMajesty",
				},
				{
					Name: "HerMajesty",
				},
				{
					Name: "Lock",
				},
			],
		}, // RoyalDiaper
	}, // Panties
	Glasses: {
		EyePatch1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Left",
				},
				{
					Name: "Right",
				},
			],
			DialogPrefix: {
				Header: "SelectEyePatchType",
				Option: "EyePatchType",
			},
		}, // EyePatch1
		CatGlasses: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Front",
					Property: {
						OverridePriority: 53,
					},
				},
				{
					Name: "Back",
					Property: {
						OverridePriority: 27,
					},
				},
			],
			DialogPrefix: {
				Header: "CatGlassesSelectStyle",
				Option: "CatGlassesStyle",
			},
			DrawImages: false,
		}, // CatGlasses
		GradientSunglasses: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "GradUp",
				},
				{
					Name: "GradDipped",
				},
				{
					Name: "FlatUp",
				},
				{
					Name: "FlatDipped",
				},
			],
			DialogPrefix: {
				Header: "GradientSunglassesSelectType",
				Option: "GradientSunglassesType",
			},
			DrawImages: false,
		}, // GradientSunglasses
		StreetEyewear: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{
							// p0 - Under front hair
							Property: { OverridePriority: 27 },
						},
						{
							// p1 - Over front hair
							Property: { OverridePriority: 53 },
						},
					],
				},
				{
					Name: "Frame",
					Key: "f",
					Options: [
						{
							// f0 - Normal frame
							Property: {},
						},
						{
							// f1 - Half frame
							Property: {},
						},
					],
				},
			],
			DrawImages: false,
		}, // StreetEyewear
		Pincenez: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{
							// p0 - Under front hair
							Property: { OverridePriority: 27 },
						},
						{
							// p1 - Over front hair
							Property: { OverridePriority: 53 },
						},
					],
				},
				{
					Name: "Accessory",
					Key: "a",
					Options: [
						{
							// a0 - No chain acc
							Property: {},
						},
						{
							// a1 - Chain acc
							Property: {},
						},
					],
				},
			],
			DrawImages: false,
		}, // Pincenez
		RoundSunglasses: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{
							// p0 - Under front hair
							Property: { OverridePriority: 27 },
						},
						{
							// p1 - Over front hair
							Property: { OverridePriority: 53 },
						},
					],
				},
				{
					Name: "Lenses",
					Key: "l",
					Options: [
						{
							// l0 - Darker lenses
							Property: {},
						},
						{
							// l1 - Clear lenses
							Property: {},
						},
					],
				},
			],
			DrawImages: false,
		}, // RoundSunglasses
		VintageSunglasses: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{
							// p0 - Under front hair
							Property: { OverridePriority: 27 },
						},
						{
							// p1 - Over front hair
							Property: { OverridePriority: 53 },
						},
					],
				},
				{
					Name: "Faceline",
					Key: "f",
					Options: [
						{
							// f0 - Eye line
							Property: {},
						},
						{
							// f1 - Lower line
							Property: {},
						},
					],
				},
			],
		}, // VintageSunglasses
		ShutterSunshades: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Position",
					Key: "p",
					Options: [
						{
							// p0 - Under front hair
							Property: { OverridePriority: 27 },
						},
						{
							// p1 - Over front hair
							Property: { OverridePriority: 53 },
						},
					],
				},
				{
					Name: "Lenses",
					Key: "l",
					Options: [
						{
							// l0 - Shutter form
							Property: {},
						},
						{
							// l1 - Clear lenses
							Property: {},
						},
						{
							// l2 - Colorful lenses
							Property: {},
						},
					],
				},
			],
		}, // ShutterSunshades
		Monocle: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Left",
				},
				{
					Name: "Both",
				},
				{
					Name: "Right",
				},
			],
			DrawImages: false,
		}, // Monocle
	}, // Glasses
	Bracelet: {
		Band1: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Left",
				},
				{
					Name: "Both",
				},
				{
					Name: "Right",
				},
			],
			DrawImages: false,
		}, // Band1
		SpikeBands: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Both",
				},
				{
					Name: "Right",
				},
				{
					Name: "Left",
				},
			],
			DialogPrefix: {
				Header: "BraceletSpikeBandsSelect",
				Option: "BraceletSpikeBands",
			},
		}, // SpikeBands
		Wristband: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Right",
					Key: "r",
					Options: [
						{
							// r0 - Equipped
							Property: {},
						},
						{
							// r1 - None
							Property: {},
						},
					],
				},
				{
					Name: "Left",
					Key: "l",
					Options: [
						{
							// l0 - Equipped
							Property: {},
						},
						{
							// l1 - None
							Property: {},
						},
					],
				},
				{
					Name: "Position",
					Key: "p",
					Options: [
						{
							// p0 - Under gloves
							Property: {
								OverridePriority: {
									RBand: 26,
									LBand: 26,
								},
							},
						},
						{
							// p1 - Over gloves
							Property: {
								OverridePriority: {
									RBand: 32,
									LBand: 32,
								},
							},
						},
					],
				},
			],
			DrawImages: false,
		}, // Wristband
		WristWatch: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "Left",
					Key: "l",
					Options: [{}, {}, {}], // Circle, Square, None
				},
				{
					Name: "Right",
					Key: "r",
					Options: [{}, {}, {}], // Circle, Square, None
				},
			],
		}, // WristWatch
	}, //Bracelet
	Garters: {
		GarterBelt: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Both",
				},
				{
					Name: "Right",
				},
				{
					Name: "Left",
				},
			],
			DrawImages: false,
		}, // GarterBelt
		ComboBelt: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "ClothAccessory", AssetName: "ComboBelt" },
			DrawImages: false,
			Modules: [
				{
					Name: "Chain",
					Key: "c",
					Options: [
						{
							// c0 - Added
							Property: { Effect: [] },
						},
						{
							// c1 - None
							Property: { Effect: [] },
						},
					],
				},
			],
		}, // ComboBelt
		ButterflyGarter: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			Modules: [
				{
					Name: "RightLeg",
					Key: "r",
					Options: [
						{
							// r0 - Added
							Property: { Effect: [] },
						},
						{
							// r1 - None
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "LeftLeg",
					Key: "l",
					Options: [
						{
							// l0 - Added
							Property: { Effect: [] },
						},
						{
							// l1 - None
							Property: { Effect: [] },
						},
					],
				},
			],
		}, // ButterflyGarter
		LaceLegRing: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [{ Name: "Leftleg" }, { Name: "Rightleg" }, { Name: "Both" }],
		}, // LaceLegRing
	}, // Garters
	AnkletRight: {
		LegFur: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Ankle",
					Key: "n",
					Options: [
						{
							// n0 - None
							Property: { Effect: [] },
						},
						{
							// n1 - Fur
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Knee",
					Key: "k",
					Options: [
						{
							// k0 - None
							Property: { Effect: [] },
						},
						{
							// k1 - Fur
							Property: { Effect: [] },
						},
					],
				},
			],
			DrawImages: false,
		}, // LegFur
	}, // AnkletRight
	AnkletLeft: {
		LegFur: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Ankle",
					Key: "n",
					Options: [
						{
							// n0 - None
							Property: { Effect: [] },
						},
						{
							// n1 - Fur
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Knee",
					Key: "k",
					Options: [
						{
							// k0 - None
							Property: { Effect: [] },
						},
						{
							// k1 - Fur
							Property: { Effect: [] },
						},
					],
				},
			],
			DrawImages: false,
		}, // LegFur
	}, // AnkletLeft
	Gloves: {
		WarmGloves: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Fur" }, { Name: "NoFur" }],
			DrawImages: false,
		}, // WarmGloves
		OperaGloves: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [{ Name: "Long" }, { Name: "Default" }],
			DrawImages: false,
		}, // OperaGloves
	}, // Gloves
	Necklace: {
		NecklaceKey: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Normal",
					Property: {
						OverridePriority: 31,
					},
				},
				{
					Name: "Tucked",
					Property: {
						OverridePriority: 29,
					},
				},
			],
			DialogPrefix: {
				Header: "SelectPriorityType",
				Option: "ClothPriorityType",
			},
		}, // NecklaceKey
		NecklaceLock: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "NecklaceKey" },
		}, // NecklaceLock
		NecklaceRope: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Short",
				},
				{
					Name: "Long",
				},
			],
		}, //NecklaceRope
		ChokerTattoo: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loops",
				},
				{
					Name: "Flowers",
				},
			],
		}, //ChokerTattoo
		PearlNecklace1: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Option1",
					Key: "m",
					Options: [
						{
							// m0 - None
							Property: { Effect: [] },
						},
						{
							// m1 - Equipped
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Option2",
					Key: "n",
					Options: [
						{
							// n0 - None
							Property: { Effect: [] },
						},
						{
							// n1 - Equipped
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Option3",
					Key: "o",
					Options: [
						{
							// o0 - No Details
							Property: { Effect: [] },
						},
						{
							// o1 - Metal Details
							Property: { Effect: [] },
						},
					],
				},
			],
			DrawImages: false,
		}, // PearlNecklace1
		SatinScarf: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Style1",
				},
				{
					Name: "Style2",
				},
				{
					Name: "Style3",
				},
				{
					Name: "Style4",
				},
			],
		}, //SatinScarf
		BeadNecklace: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Gemstone",
					Property: {
						DefaultColor: "#119977",
					},
				},
				{
					Name: "IceSickle",
					Property: {
						DefaultColor: "#94E8F8",
					},
				},
				{
					Name: "PawPad",
					Property: {
						DefaultColor: "#778486",
					},
				},
				{
					Name: "Razor",
					Property: {
						DefaultColor: "#919C9E",
					},
				},
				{
					Name: "Shuriken",
					Property: {
						DefaultColor: "#737677",
					},
				},
				{
					Name: "Teeth",
					Property: {
						DefaultColor: "#B9B384",
					},
				},
				{
					Name: "Dragon",
					Property: {
						DefaultColor: "#56AB4E",
					},
				},
				{
					Name: "CursedEye",
					Property: {
						DefaultColor: "#AB9B4E",
					},
				},
			],
		}, //BeadNecklace
		RuffledCollar: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ClothAccessory", AssetName: "RuffledCollar" },
		}, // RuffledCollar
	}, // Necklace
	Suit: {
		Catsuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "NoGloves",
				},
				{
					Name: "OpaqueGloves",
					Property: {
						Hide: ["HandsLeft", "HandsRight"],
					},
				},
				{
					Name: "TransparentGloves",
				},
			],
			DialogPrefix: {
				Header: "SelectSuitGloves",
				Option: "SuitGloveType",
			},
			DrawImages: false,
		}, // Catsuit
		LatexCatsuit: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.DEST_CHAR_NAME,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Standard",
				},
				{
					Name: "Prisoner",
				},
				{
					Name: "Transparent",
				},
				{
					Name: "PrisonerTransparent",
				},
			],
			DrawImages: false,
			BaselineProperty: { Text: "PRISONER", Text2: "#0000", Text3: "" },
			ChatSetting: TypedItemChatSetting.FROM_TO,
			ScriptHooks: {
				Load: InventorySuitLatexCatsuitLoadHook,
				Draw: InventorySuitLatexCatsuitDrawHook,
				Exit: InventorySuitLatexCatsuitExitHook,
				PublishAction: InventorySuitLatexCatsuitPublishActionHook,
			},
		}, // LatexCatsuit
		SeamlessCatsuit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Suit", AssetName: "Catsuit" },
		}, // SeamlessCatsuit
		PilotSuit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Suit", AssetName: "Catsuit" },
		}, // PilotSuit
		SeethroughSuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "NoGloves",
				},
				{
					Name: "TransparentGloves",
				},
				{
					Name: "OpaqueGloves",
					Property: {
						Hide: ["HandsLeft", "HandsRight"],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectSuitGloves",
				Option: "SuitGloveType",
			},
			DrawImages: false,
		}, // SeethroughSuit
		SeethroughSuitZip: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Suit", AssetName: "SeethroughSuit" },
		}, // SeethroughSuitZip
		ReverseBunnySuit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Suit", AssetName: "Catsuit" },
		}, // ReverseBunnySuit
		MaleSeamlessCatsuit: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Suit", AssetName: "Catsuit" },
		}, // MaleSeamlessCatsuit
		FishnetTop: {
			Archetype: ExtendedArchetype.MODULAR,
			CopyConfig: { GroupName: "Cloth", AssetName: "FishnetTop" },
			DialogPrefix: {
				Header: "ClothFishnetTopSelect",
				Module: "ClothFishnetTopModule",
				Option: "ClothFishnetTopOption",
				Chat: "ClothFishnetTopSet",
			},
		}, // FishnetTop
		GlossyBodystocking: {
			Archetype: "modular",
			DrawImages: false,
			Modules: [
				{ Name: "HandStyle", Key: "h", Options: [{}, {}, {}, {}] },
				{ Name: "TailorStyle", Key: "m", Options: [{}, {}, {}, {}, {}] },
				{ Name: "ChestStyle", Key: "b", Options: [{}, {}] },
			],
		}, // GlossyBodystocking
	}, // Suit
	SuitLower: {
		MaleSeamlessCatsuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Tucked",
				},
				{
					Name: "Bulge",
				},
				{
					Name: "SkinTight",
				},
				{
					Name: "Lock",
				},
			],
		}, // MaleSeamlessCatsuit
		LatexCatsuit: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Standard",
				},
				{
					Name: "Prisoner",
				},
				{
					Name: "Transparent",
				},
				{
					Name: "PrisonerTransparent",
				},
			],
			DialogPrefix: {
				Header: "SuitLatexCatsuitSelect",
				Option: "SuitLatexCatsuit",
			},
			DrawImages: false,
		}, // LatexCatsuit
		MaleCatsuitPanties: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "SuitLower", AssetName: "MaleSeamlessCatsuit" },
		}, // MaleCatsuitPanties - SuitLower
		RippedPantyhose: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "Socks", AssetName: "RippedPantyhose" },
		},
	}, // SuitLower
	ItemHead: {
		DuctTape: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Double",
					Property: {
						Block: ["ItemNose"],
						Effect: [E.BlindNormal, E.BlockWardrobe],
					},
				},
				{
					Name: "Wrap",
					Property: {
						Block: ["ItemNose"],
						Effect: [E.BlindNormal, E.BlockWardrobe],
					},
				},
				{
					Name: "Mummy",
					Property: {
						Hide: ["HairFront", "HairBack"],
						Block: [
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"ItemEars",
							"ItemHood",
							"ItemNose",
						],
						Effect: [E.GagNormal, E.BlindNormal, E.BlockWardrobe, E.BlockMouth],
					},
				},
				{
					Name: "Open",
					Property: {
						Hide: ["HairFront", "HairBack"],
						Block: [
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"ItemEars",
							"ItemHood",
						],
						Effect: [E.GagNormal, E.BlockMouth],
					},
				},
			],
		}, // DuctTape
		Ribbons: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Basic",
					Property: {
						Effect: [E.BlindLight],
					},
				},
				{
					Name: "Wrap",
					Property: {
						Effect: [E.BlindNormal],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectRibbonType",
			},
		}, // Ribbons
		WebBlindfold: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Blindfold",
					Property: {
						Difficulty: 0,
						Block: ["ItemNose"],
						Effect: [E.BlindLight],
					},
				},
				{
					Name: "Cocoon",
					Property: {
						Difficulty: 30,
						Hide: [
							"HairFront",
							"HairBack",
							"Hat",
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
						],
						Block: [
							"ItemMouth",
							"ItemMouth2",
							"ItemMouth3",
							"ItemEars",
							"ItemHood",
							"ItemNose",
						],
						Effect: [E.BlindHeavy, E.GagNormal, E.BlockMouth],
					},
				},
			],
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.TARGET_CHAR],
			DialogPrefix: {
				Header: "WebBondageSelect",
			},
		}, // WebBlindfold
		FuturisticMask: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Transparent",
					Property: {
						SelfUnlock: true,
						Effect: [],
					},
				},
				{
					Name: "LightTint",
					Property: {
						Effect: [E.BlindLight, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.2 }],
					},
				},
				{
					Name: "HeavyTint",
					Property: {
						Effect: [E.BlindNormal, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.5 }],
					},
				},
				{
					Name: "Blind",
					Property: {
						Effect: [E.BlindHeavy, E.BlockWardrobe],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectVisorType",
				Option: "ItemHeadInteractiveVisorType",
				Chat: "ItemHeadInteractiveVisorSet",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticMask
		InteractiveVisor: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Transparent",
					Property: {
						SelfUnlock: true,
						Effect: [],
					},
				},
				{
					Name: "LightTint",
					Property: {
						Effect: [E.BlindLight, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.2 }],
					},
				},
				{
					Name: "HeavyTint",
					Property: {
						Effect: [E.BlindNormal, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.5 }],
					},
				},
				{
					Name: "Blind",
					Property: {
						Effect: [E.BlindHeavy, E.BlockWardrobe],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectVisorType",
				Option: "ItemHeadInteractiveVisorType",
				Chat: "ItemHeadInteractiveVisorSet",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // InteractiveVisor
		InteractiveVRHeadset: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Background",
					Key: "b",
					Options: [
						{
							// b0 - Passthrough
							Property: {
								CustomBlindBackground: "",
							},
						},
						{
							// b1 - SynthWave
							Property: {
								CustomBlindBackground: "SynthWave",
								Effect: [],
							},
						},
						{
							// b2 - Dungeon
							Property: {
								CustomBlindBackground: "Dungeon",
								Effect: [],
							},
						},
						{
							// b3 - SciFiCell
							Property: {
								CustomBlindBackground: "SciFiCell",
								Effect: [],
							},
						},
						{
							// b4 - AncientRuins
							Property: {
								CustomBlindBackground: "AncientRuins",
								Effect: [],
							},
						},
						{
							// b5 - HypnoticSpiral
							Property: {
								CustomBlindBackground: "HypnoticSpiral",
								Effect: [],
							},
						},
					],
				},
				{
					// Use `BlindTotal` for VR avatars to ensure that the `thin` property never reduces the blindness level below `BlindHeavy`,
					// as lowering it any more will result in visual oddities related to partial blindness
					Name: "Function",
					Key: "f",
					Options: [
						{
							// f0 - Passthrough
							Property: {
								Effect: [],
							},
						},
						{
							// f1 - Off
							Property: {
								Effect: [E.BlindHeavy, E.BlockWardrobe],
							},
						},
						{
							// f2 - VR Avatar
							Property: {
								Effect: [E.BlindTotal, E.BlockWardrobe, E.VRAvatars],
							},
						},
						{
							// f3 - VR Avatar (hide restraints)
							Property: {
								Effect: [E.BlindTotal, E.VRAvatars, E.HideRestraints],
							},
						},
					],
				},
				{
					Name: "Game",
					Key: "g",
					Options: [
						{
							// g0 - None
							Property: {
								Effect: [],
							},
						},
						{
							// f1 - Kinky Dungeon
							Property: {
								Effect: [E.KinkyDungeonParty],
							},
						},
					],
				},
			],
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
			},
		}, // InteractiveVRHeadset
		HypnoticVisor: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Frame",
					Key: "t",
					Options: [
						{}, // t0 - Frame A
						{}, // t1 - Frame B
					],
				},
				{
					Name: "Pattern",
					Key: "p",
					Options: [
						{}, // p0 - Opaque
						{}, // p1 - Pattern 1
						{}, // p2 - Pattern 2
						{}, // p3 - Pattern 3
					],
				},
				{
					Name: "Decal",
					Key: "d",
					Options: [
						{}, // d0 - None
						{}, // d1 - Bunny
						{}, // d2 - Cat
						{}, // d3 - Snake
						{}, // d4 - Fox
						{}, // d5 - Pony
						{}, // d6 - Xeno
						{}, // d7 - Leaf
					],
				},
				{
					Name: "Text",
					Key: "e",
					Options: [
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 16 },
								Font: "sans-serif",
								ScriptHooks: {
									AfterDraw: (...args) =>
										TextItem.GenericTextDrawHook(...args, {
											YOffset: 10,
											drawOptions: { fontSize: 12 },
										}),
								},
							},
						},
					],
				},
			],
		},
		MedicalPatch: {
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Eye",
					Key: "e",
					Options: [
						{
							Property: {
								Effect: [E.BlindNormal, E.BlockWardrobe],
							},
						},
						{},
						{},
					],
				},
				{
					Name: "RightSticker",
					Key: "r",
					Options: [{}, {}, {}, {}, {}], //Just blank and cosmetic options
				},
				{
					Name: "LeftSticker",
					Key: "l",
					Options: [{}, {}, {}, {}, {}], //Just blank and cosmetic options
				},
			],
		}, //MedicalPatch
		BigMouthHood: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemHood", AssetName: "BigMouthHood" },
			Options: [
				{ Name: "Empty", Property: { Effect: [] } },
				{
					Name: "Lenses",
					Property: {
						Effect: [E.BlindLight],
						Tint: [{ Color: 2, Strength: 0.2 }],
					},
				},
				{
					Name: "Mesh",
					Property: {
						Effect: [E.BlindNormal, E.BlockWardrobe],
					},
				},
				{
					Name: "Slim",
					Property: {
						Effect: [E.BlindHeavy, E.BlockWardrobe],
					},
				},
			],
		}, //BigMouthHood
		DroneMask: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "Mouth",
					Key: "m",
					Options: [
						{
							// m0 - None
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m1 - Onahole
							Property: { Effect: [E.GagMedium, E.OpenMouth] },
						},
						{
							// m2 - Fleshlight
							Property: { Effect: [E.GagMedium, E.OpenMouth] },
						},
						{
							// m3 - Smile
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m4 - Holes
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m5 - Sculpted
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m6 - Subtle
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m7 - Thin
							Property: { Effect: [E.BlockMouth] },
						},
						{
							// m8 - Thin Oh
							Property: { Effect: [E.BlockMouth] },
						},
					],
				},
				{
					Name: "Eyes",
					Key: "e",
					Options: [
						{
							// e0 - None
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e1 - Regular
							Property: { Effect: [] },
						},
						{
							// e2 - Spiral
							Property: { Effect: [] },
						},
						{
							// e3 - Smile
							Property: { Effect: [] },
						},
						{
							// e4 - Holes
							Property: { Effect: [E.BlindLight] },
						},
						{
							// e5 - Sculpted
							Property: { Effect: [] },
						},
						{
							// e6 - Concave
							Property: { Effect: [E.BlindLight] },
						},
					],
				},
				{
					Name: "Pattern",
					Key: "p",
					Options: [
						{}, // Blank
						{}, // Barcode
						{}, // Scarab
						{}, // Hex
						{}, // Lines
						{
							HasSubscreen: true,
							ArchetypeConfig: {
								Archetype: ExtendedArchetype.TEXT,
								MaxLength: { Text: 16 },
								Font: "Impact",
								ScriptHooks: {
									AfterDraw: AssetsItemHeadDroneMaskAfterDrawHook,
								},
							},
						}, // text
						{}, // Machine
						{}, // Fishnet
						{}, // Hexpattern
						{}, // Large Circle
						{}, // Large Split Circle
						{}, // Large Heart
						{}, // Large Stylized Heart
						{}, // Small Heart
						{}, // Lock
						{}, // Large X
					],
				},
				{
					Name: "Glow",
					Key: "g",
					Options: [{}, {}, {}, {}], // Glow Off, Glow Eyes, Mouth On, Glow Pattern On, Glow On
				},
				{
					Name: "Sight",
					Key: "s",
					Options: [
						{
							// s0 - Opaque
							Property: { Effect: [E.BlindHeavy, E.BlockWardrobe] },
						},
						{
							// s1 - One Way
							Property: { Effect: [] },
						},
					],
				},
				{
					Name: "Helmet",
					Key: "h",
					Options: [
						{}, // h0 - Mask
						{
							Property: {
								Hide: ["HairFront", "HairBack"], //"HairAccessory1", "HairAccessory2"],
								HideItem: [
									"HatBonnet1",
									"HatBonnet2",
									"HatBunnySuccubus2",
									"HatCrown1",
									"HatCrown2",
									"HatCrown4",
									"HatCrown5",
									"HatBand1",
									"HatBand2",
									"HatPirateBandana1",
									"HatVeil1",
									"HatVeil2", // Hat items
									"MaskFuturisticVisor",
									"MaskShinobiMask", // Mask items
									"HairAccessory3Ribbons4", // HairAccessory items
									"HairAccessory1Antennae",
									"HairAccessory1BunnyEars1",
									"HairAccessory1BunnyEars2",
									"HairAccessory1CowHorns",
									"HairAccessory1ElfEars",
									"HairAccessory1Ears1",
									"HairAccessory1Ears2",
									"HairAccessory1FoxEars1",
									"HairAccessory1FoxEars2",
									"HairAccessory1FoxEars3",
									"HairAccessory1KittenEars1",
									"HairAccessory1KittenEars2",
									"HairAccessory1MouseEars1",
									"HairAccessory1MouseEars2",
									"HairAccessory1PuppyEars1",
									"HairAccessory1Ribbons2",
									"HairAccessory1WolfEars1",
									"HairAccessory1WolfEars2",
									"HairAccessory1Ribbons4", // Ear items (HA1)
									"HairAccessory2Antennae",
									"HairAccessory2BunnyEars1",
									"HairAccessory2BunnyEars2",
									"HairAccessory2CowHorns",
									"HairAccessory2ElfEars",
									"HairAccessory2Ears1",
									"HairAccessory2Ears2",
									"HairAccessory2FoxEars1",
									"HairAccessory2FoxEars2",
									"HairAccessory2FoxEars3",
									"HairAccessory2KittenEars1",
									"HairAccessory2KittenEars2",
									"HairAccessory2MouseEars1",
									"HairAccessory2MouseEars2",
									"HairAccessory2PuppyEars1",
									"HairAccessory2Ribbons2",
									"HairAccessory2WolfEars1",
									"HairAccessory2WolfEars2", // Ear items (HA2)
								], // These items are hidden because they have clear mismatch issues with the hood.
							},
						}, // h1 - Helmet (hood)
						{
							// h2 - Helmet ( hood but nothing shows)
							Property: {
								Hide: [
									"HairFront",
									"HairBack",
									"Hat",
									"HairAccessory1",
									"HairAccessory2",
									"HairAccessory3",
								],
								HideItem: ["MaskFuturisticVisor", "MaskShinobiMask"],
							},
						},
					],
				},
				{
					Name: "Layering",
					Key: "j",
					Options: [
						{
							Property: {
								Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
								Hide: ["ItemMouth", "ItemMouth2", "ItemMouth3", "Glasses"],
							},
						}, // No gags visible
						{
							Property: {
								OverridePriority: 12,
								Block: ["ItemMouth", "ItemMouth2"],
								Hide: ["ItemMouth", "ItemMouth2", "Glasses"],
							},
						}, // Highest layer gag visible
						{
							Property: {
								OverridePriority: 12,
								Block: [],
								Hide: [],
							},
						}, // All gags visible
						{}, // Blindfold items visible
						{}, // Blindfold and highest layer gag
						{}, // Blindfold and all gags
					],
				},
				{
					Name: "Visibility",
					Key: "b",
					Options: [
						{
							Property: {
								Hide: ["Blush"],
								HideItem: [
									"HatFacePaint",
									"MaskFacePaint",
									"ClothAccessoryFacePaint",
								],
							},
						},
						{
							Property: {
								Hide: [],
								HideItem: [],
							},
						},
					],
				},
			],
			ScriptHooks: {
				Validate: ItemHeadDroneMaskValidateHook,
			},
			ChangeWhenLocked: false,
			BaselineProperty: { Text: "" },
		}, // DroneMask
		Stitches: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Main",
					Key: "m",
					Options: [
						{ Property: { Hide: ["Eyes"] } }, // Right Eye
						{ Property: { Hide: ["Eyes2"] } }, // Left Eye
						{
							Property: {
								Hide: ["Eyes", "Eyes2"],
								Effect: [E.BlindHeavy, E.BlockWardrobe],
							},
						}, //Both Eyes
					],
				},
				{
					Name: "Right",
					Key: "r",
					Options: [
						{}, // Straight
						{}, // ZigZag
						{}, // Skewed
						{}, // Crossed
					],
				},
				{
					Name: "Left",
					Key: "l",
					Options: [
						{}, // Straight
						{}, // ZigZag
						{}, // Skewed
						{}, // Crossed
					],
				},
			],
		}, // Stitches
		Kigu2Hood: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemHood", AssetName: "Kigu2Hood" },
			DrawImages: false,
			ChangeWhenLocked: false,
			Options: [
				// Lenses type
				{ Name: "None", Property: { Effect: [] } },
				{
					Name: "Thin",
					Property: {
						Effect: [E.BlindLight],
						Tint: [{ Color: 0, Strength: 0.2 }],
					},
				},
				{
					Name: "Thick",
					Property: {
						Effect: [E.BlindNormal, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.3 }],
					},
				},
				{
					Name: "Opaque",
					Property: {
						Effect: [E.BlindHeavy, E.BlockWardrobe],
						Tint: [{ Color: 0, Strength: 0.5 }],
					},
				},
			],
		}, // Kigu2Hood
		AsylumBlindfold: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Normal",
					Property: { Effect: [E.BlindLight] },
				},
				{
					Name: "Padded",
					Property: { Effect: [E.BlindNormal], Difficulty: 3 },
				},
			],
		}, // AsylumBlindfold
	}, // ItemHead
	ItemHands: {
		FuturisticMittens: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Mittens",
					Property: {
						Difficulty: 8,
						SelfUnlock: false,
						Effect: [E.Block, E.BlockWardrobe, E.MergedFingers],
						Block: ["ItemHandheld"],
						Hide: ["ItemHandheld"],
						HideItemExclude: [
							"ItemHandheldFoxPlush",
							"ItemHandheldBunPlush",
							"ItemHandheldKarl",
							"ItemHandheldShark",
							"ItemHandheldPetPotato",
						],
					},
				},
				{
					Name: "Gloves",
					Property: { Difficulty: 0, SelfUnlock: true, Block: [] },
				},
			],
			DialogPrefix: {
				Header: "SelectFuturisticMittensType",
				Option: "FuturisticMittensType",
				Chat: "FuturisticMittensSet",
			},
			ScriptHooks: {
				Load: FuturisticAccessLoad,
				Click: FuturisticAccessClick,
				Draw: FuturisticAccessDraw,
				Exit: FuturisticAccessExit,
				Validate: FuturisticAccessValidate,
			},
		}, // FuturisticMittens
		PaddedMittens: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Unchained",
					Property: {
						HideItemExclude: [
							"ItemHandheldFoxPlush",
							"ItemHandheldBunPlush",
							"ItemHandheldKarl",
							"ItemHandheldShark",
							"ItemHandheldPetPotato",
						],
					},
				},
				{
					Name: "Chained",
					Prerequisite: ["CanAttachMittens", "NoItemArms"],
					Property: {
						SetPose: ["BaseUpper"],
						Block: ["ItemTorso", "ItemTorso2"],
					},
				},
			],
		}, // PaddedMittens
		PawMittens: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "PaddedMittens" },
		}, // PawMittens
		PonyMittensBinder: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Unchained",
					Property: {
						HideItemExclude: [
							"ItemHandheldFoxPlush",
							"ItemHandheldBunPlush",
							"ItemHandheldKarl",
							"ItemHandheldShark",
							"ItemHandheldPetPotato",
						],
					},
				},
				{
					Name: "Chained",
					Prerequisite: ["NoItemArms"],
					Property: {
						SetPose: ["BackElbowTouch"],
						Block: ["ItemArms"],
						Difficulty: 10,
					},
				},
			],
		}, // PonyMittensBinder
		ElbowLengthMittens: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { AssetName: "PonyMittensBinder" },
		}, // ElbowLengthMittens
		HempRopeCuffs: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Unlinked",
					Property: {
						Difficulty: 0,
					},
				},
				{
					Name: "Cuffed",
					Property: {
						Effect: [E.Block],
						Difficulty: 2,
						SetPose: ["BackCuffs"],
					},
				},
				{
					Name: "HarnessFront",
					Prerequisite: ["NeedsHipHarness"],
					Property: {
						Effect: [E.Block],
						Difficulty: 3,
						SetPose: ["BaseUpper"],
					},
				},
				{
					Name: "HarnessBack",
					Prerequisite: ["NeedsHipHarness"],
					SelfBondageLevel: 4,
					Property: {
						Effect: [E.Block],
						Difficulty: 4,
						SetPose: ["BackElbowTouch"],
					},
				},
			],
		},
		FullMittens: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Restraints",
					Key: "r",
					Options: [
						{
							// r0 - None
							Property: {},
						},
						{
							// r1 - Bar Yoke Position
							Property: {
								SetPose: ["Yoked"],
								Effect: [
									E.Block,
									E.BlockWardrobe,
									E.Freeze,
									E.NotSelfPickable,
									E.Tethered,
									E.MapImmobile,
								],
								Difficulty: 9,
							},
						},
						{
							// r2 - Bar Over Position
							Property: {
								SetPose: ["OverTheHead"],
								Effect: [
									E.Block,
									E.BlockWardrobe,
									E.Freeze,
									E.NotSelfPickable,
									E.Tethered,
									E.MapImmobile,
								],
								Difficulty: 12,
							},
						},
						{
							// r3 - StraitJacket Mode
							Property: {
								SetPose: ["BackBoxTie"],
								Block: ["ItemArms"],
								Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
								Difficulty: 8,
							},
						},
						{
							// r4 - Restrict Belts
							Property: {
								SetPose: ["BackElbowTouch"],
								Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
								Difficulty: 6,
							},
						},
						{
							// r5 - Armbinder Mode
							Property: {
								SetPose: ["BackElbowTouch"],
								Block: ["ItemArms"],
								Effect: [E.Block, E.BlockWardrobe, E.NotSelfPickable],
								Difficulty: 9,
							},
						},
						{
							// r6 - Full Armbinder and Ankles Combo
							Property: {
								SetPose: ["BackElbowTouch"],
								Block: ["ItemArms"],
								Effect: [E.Block, E.BlockWardrobe, E.Slow, E.NotSelfPickable],
								Difficulty: 12,
							},
						},
					],
				},
			],
			ChangeWhenLocked: false,
		}, // FullMittens
		LatexBondageMitts: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			Modules: [
				{
					Name: "GloveType",
					Key: "t",
					Options: [{}, {}, {}], // Padded, Balloon, Balloon w nozzle
				},
				{
					Name: "Wrist",
					Key: "w",
					Options: [{}, {}, {}], // No wrist, Firm Wrist, Fitted Wrist
				},
				{
					Name: "PatternRight",
					Key: "r",
					Options: [{}, {}, {}, {}, {}, {}, {}], // None, Pumpkin (underside only), Pumpkin, Smiley (underside only), Smiley, Split, Quarters
				},
				{
					Name: "PatternLeft",
					Key: "l",
					Options: [{}, {}, {}, {}, {}, {}, {}], // None, Pumpkin (underside only), Pumpkin, Smiley (underside only), Smiley, Split, Quarters
				},
			],
		}, //LatexBondageMitts
	}, // ItemHands
	ItemAddon: {
		CeilingChain: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.TARGET_CHAR,
				CommonChatTags.ASSET_NAME,
			],
			Options: [
				{
					Name: "Lowered",
					Property: { Difficulty: 6 },
				},
				{
					Name: "LoweredShort",
					Property: {
						Difficulty: 6,
						SetPose: ["BaseLower"],
						AllowActivePose: [...PoseAllStanding],
					},
				},
				{
					Name: "Suspended",
					Property: {
						Difficulty: 7,
						OverrideHeight: {
							Height: 30,
							Priority: 51,
							HeightRatioProportion: 0,
						},
						Effect: [E.Lifted],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectCeilingChainState",
				Option: "CeilingChainBondage",
				Chat: "CeilingChainSet",
				Npc: "CeilingChain",
			},
			ChangeWhenLocked: false,
		}, // CeilingChain
		CeilingRope: {
			Archetype: ExtendedArchetype.TYPED,
			CopyConfig: { GroupName: "ItemAddon", AssetName: "CeilingChain" },
		}, // CeilingRope
		CeilingNeckCuff: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Loose",
					Property: {},
				},
				{
					Name: "Strict",
					Property: {
						Difficulty: 6,
						SetPose: ["BaseLower"],
						AllowActivePose: [...PoseAllStanding],
					},
				},
			],
			DrawImages: false,
			ChangeWhenLocked: false,
		}, // CeilingNeckCuff
	}, // ItemAddon
	ItemNose: {
		NoseRing: {
			Archetype: ExtendedArchetype.TYPED,
			ChatTags: [CommonChatTags.SOURCE_CHAR, CommonChatTags.DEST_CHAR],
			Options: [
				{
					Name: "Base",
				},
				{
					Name: "ChainShort",
					Prerequisite: ["NotSuspended"],
					Property: {
						SetPose: ["Kneel"],
						AllowActivePose: [...PoseAllKneeling],
						Effect: [E.Freeze, E.IsChained],
					},
				},
				{
					Name: "ChainLong",
					Prerequisite: ["NotSuspended"],
					Property: {
						Effect: [E.Tethered, E.IsChained],
					},
				},
				{
					Name: "Leash",
					Prerequisite: ["NotSuspended"],
					Property: {
						Effect: [E.Leash],
					},
				},
			],
			DialogPrefix: {
				Header: "SelectAttachmentState",
				Option: "NoseRingPose",
				Chat: "NoseRingRestrain",
				Npc: "InventoryItemNoseNoseRingNPCReaction",
			},
		}, // NoseRing
		NoseShackle: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Shackle",
					Key: "s",
					DrawImages: true,
					Options: [
						{ Property: { Difficulty: 11 } }, //s_0 - Single
						{ Property: { Difficulty: 13 } }, //s_1 - Double
					],
				},
				{
					Name: "Attachment",
					Key: "a",
					DrawImages: true,
					Options: [
						{}, //a_0 - None
						{
							Prerequisite: ["NotSuspended"],
							Property: {
								Effect: [E.Tethered, E.IsChained],
							},
						}, //a_1 - Chainlong
						{
							Prerequisite: ["NotSuspended"],
							Property: {
								SetPose: ["Kneel"],
								AllowActivePose: [...PoseAllKneeling],
								Effect: [E.Freeze, E.IsChained],
							},
						}, //a_2 - Chainshort
						{
							Prerequisite: ["NotSuspended"],
							Property: {
								Effect: [E.Leash],
							},
						}, //a_3 - Leash
					],
				},
			],
		}, // NoseShackle
	}, // ItemNose
	Wings: {
		SteampunkWings: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Off",
				},
				{
					Name: "On",
				},
			],
		}, // SteampunkWings
		SeraphWings: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "Wing1",
					Key: "show1",
					DrawImages: false,
					Options: [
						{}, //show1_0 - Show
						{}, //show1_1 - Hide
					],
				},
				{
					Name: "Wing2",
					Key: "show2",
					DrawImages: false,
					Options: [
						{}, //show2_0 - Show
						{}, //show2_1 - Hide
					],
				},
				{
					Name: "Wing3",
					Key: "show3",
					DrawImages: false,
					Options: [
						{}, //show3_0 - Show
						{}, //show3_1 - Hide
					],
				},
			],
		}, // SeraphWings
		DragonWings: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: true,
			Options: [
				{
					Name: "Spread",
				},
				{
					Name: "Folded",
				},
				{
					Name: "Bound",
				},
			],
		}, // DragonWings
	}, // Wings
	ItemHandheld: {
		Smartphone: {
			Archetype: ExtendedArchetype.MODULAR,
			ChatSetting: ModularItemChatSetting.PER_MODULE,
			DrawImages: false,
			Modules: [
				{
					Name: "Case",
					Key: "c",
					DrawImages: true,
					Options: [
						// none, matte, stripes, dots, hearts
						{},
						{},
						{},
						{},
						{},
					],
				},
			],
		}, // Smartphone
		PortalTablet: {
			Archetype: ExtendedArchetype.NOARCH,
			ScriptHooks: {
				Load: PortalLinkTransmitterLoadHook,
				Draw: PortalLinkTransmitterDrawHook,
				Click: PortalLinkTransmitterClickHook,
				Exit: PortalLinkTransmitterExitHook,
			},
			BaselineProperty: { PortalLinkCode: "" },
		}, // PortalTablet
		AnimeGirlWand: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Staff",
					Property: {
						AllowActivity: ["SpankItem"],
					},
				},
				{
					Name: "Wand",
					Property: {
						AllowActivity: ["MasturbateItem", "RubItem"],
					},
				},
			],
		}, // AnimeGirlWand
		Kyosensu: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					// Cherry blossoms
					Name: "Type1",
					Property: {},
				},
				{
					// Lightning bolt
					Name: "Type2",
					Property: {},
				},
				{
					// Sun
					Name: "Type3",
					Property: {},
				},
				{
					// Sea art
					Name: "Type4",
					Property: {},
				},
				{
					// Moon
					Name: "Type5",
					Property: {},
				},
				{
					// Flowers
					Name: "Type6",
					Property: {},
				},
			],
		}, // Kyosensu
		Uchiwa: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					// Cherry blossoms
					Name: "Type1",
					Property: {},
				},
				{
					// Lightning bolt
					Name: "Type2",
					Property: {},
				},
				{
					// Sun
					Name: "Type3",
					Property: {},
				},
				{
					// Wave art
					Name: "Type4",
					Property: {},
				},
				{
					// Moon
					Name: "Type5",
					Property: {},
				},
				{
					// Flowers
					Name: "Type6",
					Property: {},
				},
			],
		}, // Uchiwa
		CustomPaddle: {
			Archetype: ExtendedArchetype.MODULAR,
			Modules: [
				{
					Name: "CustomText",
					Key: "c",
					DrawImages: false,
					Options: [
						{}, // c0 - Blank
						{}, // c1 - Brat
						{}, // c2 - Hearts
						{}, // c3 - Owned
						{}, // c4 - Pet
						{}, // c5 - Slave
						{}, // c6 - Slut
						{}, // c7 - Toy
						{}, // c8 - Bitch
					],
				},
			],
		}, // Custom Paddle
		Cigarette: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "InMouth",
				},
				{
					Name: "InHand",
				},
			],
		}, // Cigarette
		Plushie: {
			Archetype: ExtendedArchetype.MODULAR,
			DrawImages: false,
			//ChatSetting: ModularItemChatSetting.PER_OPTION,
			Modules: [
				{
					Name: "DenOfSin",
					Key: "DenOfSin",
					DrawImages: true,
					Options: [
						{}, // Off
						{}, // Sin
						{}, // Raven
						{}, // CassandraLee
						{}, // Rika
						{}, // Roslin
						{}, // Felix
						{}, // Donna
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Sin.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Raven.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_CassandraLee.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Rika.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Roslin.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Felix.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_PrincessDonna.png",
							},
						],
					},
				},
				{
					Name: "Gangriels",
					Key: "Gangriels",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Gangriel
						{}, // Mable/Bat
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_Gangriel.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Mable.png" },
						],
					},
				},
				{
					Name: "CelestialEnchants",
					Key: "CelestialEnchants",
					DrawImages: true,
					Options: [
						{}, // Off
						{}, // Celiko
						{}, // Lavender
						{}, // Siscuit
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Celiko.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_Lavender.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Siscuit.png",
							},
						],
					},
				},
				{
					Name: "LatexLab",
					Key: "LatexLab",
					DrawImages: true,
					Options: [
						{}, // Off
						{}, // Aeri
						{}, // Delta
						{}, // Khloe
						{}, // Lillian
						{}, // TinyRavin
						{}, // XDress
						{}, // Elora
						{}, // Lisa
						{}, // Melanie
						{}, // Iris
						{}, // Kelsey
						{}, // Fae
						{}, // Maria
						{}, // Lyko
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Aeri.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Delta.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Khloe.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Lillian.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_TinyRavin.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_XDress.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Elora.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Lisa.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Melanie.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Iris.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Kelsey.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Fae.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Maria.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Lyko.png" },
						],
					},
				},
				{
					Name: "VoidOrder",
					Key: "VoidOrder",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Magdalena
						{}, // Sonic
						{}, // Jagodka
						{}, // Shade
						{}, // Paladin
						{}, // Hazel
						{}, // Lisa2
						{}, // Robin
						{}, // Sneaki
						{}, // Mai
						{}, // Tachi
						{}, // Carol2
						{}, // Jakkie
						{}, // Inquisitor
						{}, // Maid
						{}, // Priestess
						{}, // Psyker
						{}, // Dante
						{}, // Sarah Jade Kelly
						{}, // Wolfie
						{}, // Vi
						{}, // Neddle
						{}, // Mist
						{}, // Milim
						{}, // Lisa3
						{}, // Kirumi
						{}, // AlexCarameii
						{}, // KatrinaThunder
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_Magdalena.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Sonic.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Jagodka.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Shade.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_VoidPaladin.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Hazel.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Lisa2.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Robin.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Sneaki.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Mai.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Tachi.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Carol2.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Jakkie.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_VoidInquisitor.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_VoidMaid.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_VoidPriestess.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_VoidPsyker.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Dante.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_SarahJadeKelly.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Wolfie.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Vi.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Neddle.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Mist.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Milim.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Lisa3.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Kirumi.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_AlexCarameii.png",
							},
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_KatrinaThunder.png",
							},
						],
					},
				},
				{
					Name: "EnsLivingRoom",
					Key: "EnsLivingRoom",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Alunra
						{}, // Mel
						{}, // Zannah
						{}, // Zoe
						{}, // Chloe
						{}, // Liesel
						{}, // Skylar
						{}, // Amy
						{}, // Arelia
						{}, // Dawn
						{}, // Bella
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Alunra.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Mel.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Zannah.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Zoe.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Chloe.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Liesel.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Skylar.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Amy.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Arelia.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Dawn.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Bella.png" },
						],
					},
				},
				{
					Name: "Vagrants",
					Key: "Vagrants",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Nabi
						{}, // Hoshiko
						{}, // Layottu
						{}, // Sabie
						{}, // LittleSera
						{}, // Mana
						{}, // Minerva
						{}, // Zoi
						{}, // Takao
						{}, // Carol
						{}, // Brioche
						{}, // Flare
						{}, // Lara
						{}, // Kitty
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Nabi.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_HoshiKo.png",
							},
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Layottu.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Sabie.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_LittleSera.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Mana.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Minerva.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Zoi.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Takao.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Carol.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Brioche.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Flare.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Lara.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Kitty.png" },
						],
					},
				},
				{
					Name: "DawnsDarlings",
					Key: "DawnsDarlings",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Kin
						{}, // Laura
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Kin.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Laura.png" },
						],
					},
				},
				{
					Name: "NelsStorage",
					Key: "NelsStorage",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Nel
						{}, // Fallen
						{}, // Reina
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Nel.png" },
							{
								imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Fallen.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Reina.png" },
						],
					},
				},
				{
					Name: "CCLounge",
					Key: "CCLounge",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Donna
						{}, // Deasy
						{}, // Jennifer
						{}, // Tsuki
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Dana.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Deasy.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_Jennifer.png",
							},
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Tsuki.png" },
						],
					},
				},
				{
					Name: "SakisDen",
					Key: "SakisDen",
					DrawImages: true,
					Options: [
						{}, // off
						{}, // Saki
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Saki.png" },
						],
					},
				},
				{
					Name: "SarahsWorld",
					Key: "SarahsWorld",
					DrawImages: true,
					Options: [
						{}, // Off
						{}, // Sarah
						{}, // Samantha
					],
					DrawData: {
						elementData: [
							{ imagePath: "Screens/Inventory/ItemHandheld/Plushies/None.png" },
							{ imagePath: "Assets/Female3DCG/ItemHandheld/Plushie_Sarah.png" },
							{
								imagePath:
									"Assets/Female3DCG/ItemHandheld/Plushie_Samantha.png",
							},
						],
					},
				},
			],
			ScriptHooks: {
				SetOption: InventoryItemHandheldPlushiesSetOptionHook,
			},
		}, // Plushie
		FoamRoll: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "Roll",
					AllowSelfSelect: false,
					Property: { AllowActivity: ["RubItem"] },
				},
				{
					Name: "Mittens",
					SelfBondageLevel: 3,
					Property: {
						OverridePriority: 33,
						Difficulty: 4,
						SetPose: ["TapedHands"],
						Effect: [E.Block, E.BlockWardrobe, E.MergedFingers],
						HideItem: ["ItemHandsFuturisticMittens"],
					},
				},
			],
		}, // FoamRoll
		MiniDolls: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Haruhi",
				},
				{
					Name: "Mina",
				},
				{
					Name: "Lonely",
				},
				{
					Name: "Salem",
				},
				{
					Name: "Nadine",
				},
			],
			DialogPrefix: {
				Header: "SelectDollType",
				Option: "MinidollsItemHandheldType",
				Chat: "MinidollsItemHandheldSet",
			},
		}, // Minidolls
		DragonPlush: {
			Archetype: ExtendedArchetype.TYPED,
			Options: [
				{
					Name: "Holding",
				},
				{
					Name: "Floor",
				},
			],
		}, // DragonPlush
		Chocolate: {
			Archetype: "modular",
			DrawImages: false,
			Modules: [{ Name: "Type", Key: "p", Options: [{}, {}, {}, {}] }],
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
		}, // Chocolate
		Laptop: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{ Name: "Closed" },
				{ Name: "Open", Property: { OverridePriority: 35 } },
			],
			ChatTags: [
				CommonChatTags.SOURCE_CHAR,
				CommonChatTags.DEST_CHAR,
				CommonChatTags.ASSET_NAME,
			],
		}, // Laptop
	}, // ItemHandheld
	EyeShadow: {
		Running: {
			Archetype: ExtendedArchetype.TYPED,
			DrawImages: false,
			Options: [
				{
					Name: "0",
				},
				{
					Name: "1",
				},
				{
					Name: "2",
				},
				{
					Name: "3",
				},
				{
					Name: "4",
				},
			],
		},
	},
};
