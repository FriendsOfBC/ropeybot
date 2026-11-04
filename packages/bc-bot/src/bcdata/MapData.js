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

import { ChatRoomMapViewGetConnectivityDirections, CurrentTime } from "./defs.ts";

// dummy definitions so the below can be copied from BC as verbatim as possible
const Player = {
	Title: "",
	MapData: {
		PrivateState: {
			HasKeyBronze: false,
			HasKeySilver: false,
			HasKeyGold: false,
		},
	},
	HasEffect: (_effect) => true,
	CanInteract: () => true,
	SetMapState: (_1, _2) => {},
	HasMapState: (_state) => false,
};

const ChatRoomPlayerIsAdmin = () => false;
const ChatRoomMapViewCreateRowImage = (_imageName) => (_x, _y) => "";
const ChatRoomMapViewCreateKitchenCounterImage = (_imageName) => (_x, _y) => "";
const ChatRoomMapViewCreateAnimation = (_imageName, _frameCount, _duration, _loop) =>
	(_x, _y) => "";
const ChatRoomMapViewCreateOnEnterConveyorLogic = (_direction, _delay) => (..._args) => {};
const ChatRoomMapViewCreateOnClickSignLogic = (_signName) => (..._args) => {};
const ChatRoomMapViewCreateOnEnterTeleportLogic = (_delay) => (..._args) => {};
const ChatRoomMapViewCreateOnClickTeleportLogic = () => (..._args) => {};
const ChatRoomMapViewTeleportPadPreview = { indexes: [], color: "" };
const MapCoordinatesToIndex = (_x, _y) => 0;
const MapManager = {
	Map: {
		getObject: (_x, _y) => null,
		getObjectId: (_x, _y) => -1,
		getTeleporterColor: (_x, _y) => "",
	},
};

// @ts-d

// Taken from BC (with just conversion into TS syntax)
/**
 * A list of predefined lighting effects. May be replaced with a color picker in the future.
 * @type {ChatRoomMapEffect[]}
 */
export const AssetsMapDataEffects = [
	{ ID: 10, Type: "StaticLighting", TypeId: 1, Color: [0, 0, 0, 0.0] }, // Blank
	{ ID: 11, Type: "StaticLighting", TypeId: 1, Color: [0, 0, 0, 0.2] }, // ShadowLight
	{ ID: 12, Type: "StaticLighting", TypeId: 1, Color: [0, 0, 0, 0.5] }, // ShadowMedium
	{ ID: 13, Type: "StaticLighting", TypeId: 1, Color: [0, 0, 0, 0.8] }, // ShadowDark
	{ ID: 14, Type: "StaticLighting", TypeId: 1, Color: [255, 0, 0, 0.3] }, // TintRed
	{ ID: 15, Type: "StaticLighting", TypeId: 1, Color: [0, 0, 255, 0.3] }, // TintBlue
	{ ID: 16, Type: "StaticLighting", TypeId: 1, Color: [0, 255, 0, 0.3] }, // TintGreen
	{ ID: 17, Type: "StaticLighting", TypeId: 1, Color: [255, 255, 0, 0.3] }, // GlowYellow
];

/** @type {ChatRoomMapTile[]} */
export const AssetsMapDataTiles = [
	{ ID: 100, Type: "Floor", Style: "OakWood", Name: "Oak Planks"},
	{ ID: 101, Type: "Floor", Style: "WoodWhite", Name: "White Planks"},
	{ ID: 102, Type: "Floor", Style: "WoodPine", Name: "Pine Planks"},
	{ ID: 103, Type: "Floor", Style: "WoodMaple", Name: "Maple Planks"},
	{ ID: 104, Type: "Floor", Style: "WoodAcacia", Name: "Acacia Planks"},
	{ ID: 105, Type: "Floor", Style: "WoodMahogany", Name: "Mahogany Planks"},
	{ ID: 106, Type: "Floor", Style: "WoodMangrove", Name: "Mangrove Planks"},
	{ ID: 107, Type: "Floor", Style: "WoodCherry", Name: "Cherry Planks"},
	{ ID: 108, Type: "Floor", Style: "Tatami", Name: "Tatami Mat"},

	{ ID: 110, Type: "Floor", Style: "Stone", Name: "Stone"},
	{ ID: 115, Type: "Floor", Style: "Pavement", Name: "Pavement"},
	{ ID: 120, Type: "Floor", Style: "Ceramic", Name: "Ceramic"},
	{ ID: 121, Type: "Floor", Style: "CeramicDark", Name: "Dark Ceramic"},

	{ ID: 132, Type: "Floor", Style: "CarpetRed", Name: "Red Carpet"},
	{ ID: 170, Type: "Floor", Style: "HexBlue", Name: "Blue Hex"},
	{ ID: 171, Type: "Floor", Style: "HexPurple", Name: "Purple Hex"},
	{ ID: 172, Type: "Floor", Style: "Machine", Name: "Machine"},
	{ ID: 199, Type: "Floor", Style: "HalfWall", BlockVision: true, CanEnter: () => false, Name: "Half Wall"},

	{ ID: 200, Type: "FloorExterior", Style: "Dirt", Name: "Dirt"},
	{ ID: 210, Type: "FloorExterior", Style: "Grass", Name: "Grass"},
	{ ID: 215, Type: "FloorExterior", Style: "LongGrass", Name: "Long Grass"},
	{ ID: 220, Type: "FloorExterior", Style: "Sand", Name: "Sand"},
	{ ID: 230, Type: "FloorExterior", Style: "Gravel", Name: "Gravel"},
	{ ID: 235, Type: "FloorExterior", Style: "Asphalt", Name: "Asphalt"},
	{ ID: 240, Type: "FloorExterior", Style: "Snow", Name: "Snow"},
	{ ID: 250, Type: "FloorExterior", Style: "StoneSquareGray", Name: "Gray Stone Squares"},
	{ ID: 260, Type: "FloorExterior", Style: "ScatteredLeaves", Name: "Scattered Leaves"},
	{ ID: 270, Type: "FloorExterior", Style: "ScatteredLeavesDirt", Name: "Scattered Leaves On Dirt"},
	{ ID: 280, Type: "FloorExterior", Style: "ScatteredLeavesThick", Name: "Dense Leaves"},

	{ ID: 140, Type: "Floor", Style: "Padded", Name: "White Padding" }, // white
	{ ID: 500, Type: "Floor", Style: "PaddedBlack", Name: "Black Padding" },
	{ ID: 501, Type: "Floor", Style: "PaddedGray", Name: "Gray Padding" },
	{ ID: 502, Type: "Floor", Style: "PaddedBlue", Name: "Blue Padding" },
	{ ID: 503, Type: "Floor", Style: "PaddedGreen", Name: "Green Padding" },
	{ ID: 504, Type: "Floor", Style: "PaddedRed", Name: "Red Padding" },
	{ ID: 505, Type: "Floor", Style: "PaddedOrange", Name: "Orange Padding" },
	{ ID: 506, Type: "Floor", Style: "PaddedYellow", Name: "Yellow Padding" },
	{ ID: 507, Type: "Floor", Style: "PaddedLightBlue", Name: "Light Blue Padding" },
	{ ID: 508, Type: "Floor", Style: "PaddedPink", Name: "Pink Padding" },
	{ ID: 509, Type: "Floor", Style: "PaddedPurple", Name: "Purple Padding" },
	{ ID: 510, Type: "Floor", Style: "PaddedBrown", Name: "Brown Padding" },

	// #TODO NAMES

	{ ID: 150, Type: "Floor", Style: "LatexFloor" }, // black
	{ ID: 520, Type: "Floor", Style: "LatexFloorGray" },
	{ ID: 521, Type: "Floor", Style: "LatexFloorBlue" },
	{ ID: 522, Type: "Floor", Style: "LatexFloorGreen" },
	{ ID: 523, Type: "Floor", Style: "LatexFloorRed" },
	{ ID: 524, Type: "Floor", Style: "LatexFloorOrange" },
	{ ID: 525, Type: "Floor", Style: "LatexFloorYellow" },
	{ ID: 526, Type: "Floor", Style: "LatexFloorLightBlue" },
	{ ID: 527, Type: "Floor", Style: "LatexFloorPink" },
	{ ID: 528, Type: "Floor", Style: "LatexFloorPurple" },
	{ ID: 529, Type: "Floor", Style: "LatexFloorBrown" },
	{ ID: 530, Type: "Floor", Style: "LatexFloorWhite" },

	{ ID: 160, Type: "Floor", Style: "Tile" }, // white
	{ ID: 540, Type: "Floor", Style: "TileGray" },
	{ ID: 541, Type: "Floor", Style: "TileBlue" },
	{ ID: 542, Type: "Floor", Style: "TileGreen" },
	{ ID: 543, Type: "Floor", Style: "TileRed" },
	{ ID: 544, Type: "Floor", Style: "TileOrange" },
	{ ID: 545, Type: "Floor", Style: "TileYellow" },
	{ ID: 546, Type: "Floor", Style: "TileLightBlue" },
	{ ID: 547, Type: "Floor", Style: "TilePink" },
	{ ID: 548, Type: "Floor", Style: "TilePurple" },
	{ ID: 549, Type: "Floor", Style: "TileBrown" },
	{ ID: 550, Type: "Floor", Style: "TileBlack" },

	{ ID: 130, Type: "Floor", Style: "CarpetPink" },
	{ ID: 131, Type: "Floor", Style: "CarpetBlue" },
	{ ID: 560, Type: "Floor", Style: "CarpetGreen" },
	{ ID: 561, Type: "Floor", Style: "CarpetRed2" },
	{ ID: 562, Type: "Floor", Style: "CarpetOrange" },
	{ ID: 563, Type: "Floor", Style: "CarpetYellow" },
	{ ID: 564, Type: "Floor", Style: "CarpetLightBlue" },
	{ ID: 565, Type: "Floor", Style: "CarpetPurple" },
	{ ID: 566, Type: "Floor", Style: "CarpetBrown" },
	{ ID: 567, Type: "Floor", Style: "CarpetBlack" },
	{ ID: 568, Type: "Floor", Style: "CarpetGray" },

	{ ID: 570, Type: "Floor", Style: "CheckerCarpetWhite" },
	{ ID: 571, Type: "Floor", Style: "CheckerCarpetGray" },
	{ ID: 572, Type: "Floor", Style: "CheckerCarpetBlue" },
	{ ID: 573, Type: "Floor", Style: "CheckerCarpetGreen" },
	{ ID: 574, Type: "Floor", Style: "CheckerCarpetRed" },
	{ ID: 575, Type: "Floor", Style: "CheckerCarpetOrange" },
	{ ID: 576, Type: "Floor", Style: "CheckerCarpetYellow" },
	{ ID: 577, Type: "Floor", Style: "CheckerCarpetLightBlue" },
	{ ID: 578, Type: "Floor", Style: "CheckerCarpetPink" },
	{ ID: 579, Type: "Floor", Style: "CheckerCarpetPurple" },
	{ ID: 580, Type: "Floor", Style: "CheckerCarpetBrown" },
	{ ID: 581, Type: "Floor", Style: "CheckerCarpetBlack" },

	{ ID: 590, Type: "Floor", Style: "SlimeGreen"},
	{ ID: 591, Type: "Floor", Style: "SlimePink" },
	{ ID: 592, Type: "Floor", Style: "SlimeRed" },
	{ ID: 593, Type: "Floor", Style: "SlimeBlue" },
	{ ID: 594, Type: "Floor", Style: "HoneyOrange" },
	{ ID: 595, Type: "Floor", Style: "HoneyRed" },
	{ ID: 596, Type: "Floor", Style: "HoneyPurple" },
	{ ID: 597, Type: "Floor", Style: "HoneyBlue" },

	{ ID: 1000, Type: "Wall", Style: "MixedWood", BlockVision: true, CanEnter: () => false, },
	{ ID: 1020, Type: "Wall", Style: "Japanese", BlockVision: true, CanEnter: () => false, },
	{ ID: 1030, Type: "Wall", Style: "Stone", BlockVision: true, CanEnter: () => false, },
	{ ID: 1040, Type: "Wall", Style: "Brick", BlockVision: true, CanEnter: () => false, },
	{ ID: 1050, Type: "Wall", Style: "Dungeon", BlockVision: true, CanEnter: () => false, },
	{ ID: 1060, Type: "Wall", Style: "Square", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1070, Type: "Wall", Style: "Steel", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1100, Type: "Wall", Style: "Lattice", BlockVision: true, CanEnter: () => false, },
	{ ID: 1200, Type: "Wall", Style: "HexBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1201, Type: "Wall", Style: "HexPurple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1202, Type: "Wall", Style: "PipeBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1203, Type: "Wall", Style: "PipePurple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1204, Type: "Wall", Style: "SteelBlack", BlockVision: true, CanEnter: () => false, },
	{ ID: 1205, Type: "Wall", Style: "SteelGary", BlockVision: true, CanEnter: () => false, },
	{ ID: 1227, Type: "Wall", Style: "SpiderWeb", BlockVision: true, CanEnter: () => false, },

	{ ID: 1001, Type: "Wall", Style: "CedarWood", BlockVision: true, CanEnter: () => false, },
	{ ID: 1500, Type: "Wall", Style: "WoodPine", BlockVision: true, CanEnter: () => false, },
	{ ID: 1501, Type: "Wall", Style: "WoodMaple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1502, Type: "Wall", Style: "WoodAcacia", BlockVision: true, CanEnter: () => false, },
	{ ID: 1503, Type: "Wall", Style: "WoodMahogany", BlockVision: true, CanEnter: () => false, },
	{ ID: 1504, Type: "Wall", Style: "WoodMangrove", BlockVision: true, CanEnter: () => false, },
	{ ID: 1505, Type: "Wall", Style: "WoodCherry", BlockVision: true, CanEnter: () => false, },
	{ ID: 1506, Type: "Wall", Style: "WoodWhite", BlockVision: true, CanEnter: () => false, },
	{ ID: 1507, Type: "Wall", Style: "WoodOak", BlockVision: true, CanEnter: () => false, },


	{ ID: 1010, Type: "Wall", Style: "Log", BlockVision: true, CanEnter: () => false, },
	{ ID: 1510, Type: "Wall", Style: "LogPine", BlockVision: true, CanEnter: () => false, },
	{ ID: 1511, Type: "Wall", Style: "LogMaple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1512, Type: "Wall", Style: "LogAcacia", BlockVision: true, CanEnter: () => false, },
	{ ID: 1513, Type: "Wall", Style: "LogMahogany", BlockVision: true, CanEnter: () => false, },
	{ ID: 1514, Type: "Wall", Style: "LogMangrove", BlockVision: true, CanEnter: () => false, },
	{ ID: 1515, Type: "Wall", Style: "LogCherry", BlockVision: true, CanEnter: () => false, },
	{ ID: 1516, Type: "Wall", Style: "LogWhite", BlockVision: true, CanEnter: () => false, },
	{ ID: 1517, Type: "Wall", Style: "LogOak", BlockVision: true, CanEnter: () => false, },

	{ ID: 1080, Type: "Wall", Style: "Padded", BlockVision: true, BlockHearing: true, CanEnter: () => false, }, // white
	{ ID: 1530, Type: "Wall", Style: "PaddedBlack", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1531, Type: "Wall", Style: "PaddedGray", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1532, Type: "Wall", Style: "PaddedBlue", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1533, Type: "Wall", Style: "PaddedGreen", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1534, Type: "Wall", Style: "PaddedRed", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1535, Type: "Wall", Style: "PaddedYellow", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1536, Type: "Wall", Style: "PaddedBrown", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1539, Type: "Wall", Style: "PaddedOrange", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1540, Type: "Wall", Style: "PaddedPurple", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1541, Type: "Wall", Style: "PaddedPink", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1542, Type: "Wall", Style: "PaddedLightBlue", BlockVision: true, BlockHearing: true, CanEnter: () => false, },

	{ ID: 1090, Type: "Wall", Style: "Tile", BlockVision: true, CanEnter: () => false, }, // white
	{ ID: 1550, Type: "Wall", Style: "TileGray", BlockVision: true, CanEnter: () => false, },
	{ ID: 1551, Type: "Wall", Style: "TileBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1552, Type: "Wall", Style: "TileGreen", BlockVision: true, CanEnter: () => false, },
	{ ID: 1553, Type: "Wall", Style: "TileRed", BlockVision: true, CanEnter: () => false, },
	{ ID: 1554, Type: "Wall", Style: "TileYellow", BlockVision: true, CanEnter: () => false, },
	{ ID: 1555, Type: "Wall", Style: "TileBrown", BlockVision: true, CanEnter: () => false, },
	{ ID: 1559, Type: "Wall", Style: "TileOrange", BlockVision: true, CanEnter: () => false, },
	{ ID: 1560, Type: "Wall", Style: "TilePurple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1561, Type: "Wall", Style: "TilePink", BlockVision: true, CanEnter: () => false, },
	{ ID: 1562, Type: "Wall", Style: "TileLightBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1563, Type: "Wall", Style: "TileBlack", BlockVision: true, CanEnter: () => false, },

	{ ID: 1580, Type: "Wall", Style: "SlimeGreen", BlockVision: true, CanEnter: () => false, },
	{ ID: 1581, Type: "Wall", Style: "SlimePink", BlockVision: true, CanEnter: () => false, },
	{ ID: 1582, Type: "Wall", Style: "SlimeRed", BlockVision: true, CanEnter: () => false, },
	{ ID: 1583, Type: "Wall", Style: "SlimeBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1584, Type: "Wall", Style: "HoneyOrange", BlockVision: true, CanEnter: () => false, },
	{ ID: 1585, Type: "Wall", Style: "HoneyRed", BlockVision: true, CanEnter: () => false, },
	{ ID: 1586, Type: "Wall", Style: "HoneyPurple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1587, Type: "Wall", Style: "HoneyBlue", BlockVision: true, CanEnter: () => false, },


	{ ID: 2000, Type: "Water", Style: "Pool", Transparency: 0.5, TransparencyCutoutHeight: 0.45 },
	{ ID: 2010, Type: "Water", Style: "Sea", Transparency: 0.5, TransparencyCutoutHeight: 0.45 },
	{ ID: 2020, Type: "Water", Style: "Ocean", Transparency: 0.5, TransparencyCutoutHeight: 0.3 },
	{ ID: 2025, Type: "Water", Style: "OceanCyan", Transparency: 0.5, TransparencyCutoutHeight: 0.3 },
	{ ID: 2030, Type: "Water", Style: "OceanCalm", Transparency: 0.3, TransparencyCutoutHeight: 0.5 },
	{ ID: 2040, Type: "Water", Style: "Swamp", Transparency: 0.9, TransparencyCutoutHeight: 0.5 },
	{ ID: 2050, Type: "Water", Style: "Waves", Transparency: 0.6, TransparencyCutoutHeight: 0.1 },
	{ ID: 2060, Type: "Water", Style: "Shallow", Transparency: 0.3, TransparencyCutoutHeight: 0.5 },
	{ ID: 2090, Type: "Water", Style: "Lava", Transparency: 0.9, TransparencyCutoutHeight: 0.3, CanEnter: () => Player.Title === "Dragon"},
];


/** @type {ChatRoomMapObject[]} */
export const AssetsMapDataObjects = [
	{ ID: 100, Type: "EmptySpace", Style: "Passable", CanPlaceOnFloors: true, CanPlaceOnWalls: true, CanPlaceInWalls: true },
	{ ID: 101, Type: "EmptySpace", Style: "Impassable", PaletteImage: "Impassable", CanEnter: function() { return false; }, CanPlaceOnFloors: true, CanPlaceOnWalls: true, CanPlaceInWalls: true },
	{ ID: 200, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 211, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 249, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 342, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 400, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 500, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 600, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 700, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 800, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 1000, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 1100, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 1200, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 1300, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 1399, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 2000, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 3000, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 3281, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 3499, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 4000, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 }, // The OG accidentally impassable blank
	{ ID: 4500, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },
	{ ID: 5000, Type: "EmptySpace", Style: "Passable", DeprecatedID: 100 },

	{ ID: 110, Type: "Functional", Style: "EntryFlag", Top: -0.125, Exit: true, Unique: true },
	{ ID: 115, Type: "Functional", Style: "ExitFlag", Top: -0.125, Exit: true },
	{ ID: 120, Type: "Bedroom", Style: "BedTeal", Top: -0.25, AssetName: "Bed", AssetGroup: "ItemDevices"},
	{ ID: 130, Type: "LivingRoom", Style: "PillowPink" },
	{ ID: 140, Type: "LivingRoom", Style: "TableBrown" },
	{ ID: 150, Type: "LivingRoom", Style: "ThroneRed", Top: -1, Height: 2 },
	{ ID: 151, Type: "LivingRoom", Style: "ChairWood", Top: -0.5, Height: 1.5 },
	{ ID: 160, Type: "Functional", Style: "KeyBronze", OnEnter: function(){ Player.SetMapState("BronzeKey", true); }, IsVisible: function(){ return !Player.HasMapState("BronzeKey"); } },
	{ ID: 162, Type: "Functional", Style: "KeySilver", OnEnter: function(){ Player.SetMapState("SilverKey", true); }, IsVisible: function(){ return !Player.HasMapState("SilverKey"); } },
	{ ID: 164, Type: "Functional", Style: "KeyGold" , OnEnter: function(){ Player.SetMapState("GoldKey", true); }, IsVisible: function(){ return !Player.HasMapState("GoldKey"); } },
	{ ID: 165, Type: "LivingRoom", Style: "VikingChair" , Top: -0.5, Height: 2 },
	{ ID: 166, Type: "Bedroom", Style: "Bed" , Top: -0.82, Left: 0.05, Height: 1.8, Width: 0.90, AssetName: "Bed", AssetGroup: "ItemDevices" },
	{ ID: 170, Type: "LivingRoom", Style: "Stairs" , Top: 0, Left: 0 },
	{ ID: 175, Type: "LivingRoom", Style: "ModernDiningChair", Top: -0.5, Height: 1.5 },
	{ ID: 176, Type: "LivingRoom", Style: "ModernLampFloor", Top: -1.2, Height: 2.2 },
	{ ID: 177, Type: "LivingRoom", Style: "ModernLampArc", Left: -0.25, Width: 1.5, Top: -1.2, Height: 2.2 },
	{ ID: 178, Type: "LivingRoom", Style: "ModernLampTripod", Top: -1.1, Height: 2.1 },
	{ ID: 180, Type: "LivingRoom", Style: "AirConditioner" , Top: 0, Left: 0 },
	// Master LivingRoom set (keep published IDs)
	{ ID: 190, Type: "LivingRoom", Style: "FloorLamp", Top: -1.15, Left: 0.13, Height: 2, Width: 0.74 },
	{ ID: 191, Type: "LivingRoom", Style: "VelvetArmchair", Top: -0.26, Height: 1.11 },
	{ ID: 192, Type: "LivingRoom", Style: "CoffeeTable", Top: 0.17, Height: 0.68 },
	{ ID: 193, Type: "LivingRoom", Style: "Piano", Top: -0.08, Height: 0.93 },
	{ ID: 194, Type: "LivingRoom", Style: "FaintingCouch", Top: 0.3, Height: 0.55 },
	{ ID: 195, Type: "LivingRoom", Style: "FiddleLeafFig", Top: -0.95, Left: 0.02, Height: 1.8, Width: 0.97 },
	// Our LivingRoom set remapped off 190-195
	{ ID: 185, Type: "LivingRoom", Style: "ModernLowboardSingle", Top: 0, Height: 1, BuildImageName: ChatRoomMapViewCreateRowImage("ModernLowboard") },
	{ ID: 186, Type: "LivingRoom", Style: "ModernHighboardSingle", Top: -0.8, Height: 1.8, BuildImageName: ChatRoomMapViewCreateRowImage("ModernHighboard") },
	{ ID: 187, Type: "LivingRoom", Style: "ModernBookshelfSingle", Top: -1.3, Height: 2.3, BuildImageName: ChatRoomMapViewCreateRowImage("ModernBookshelf") },
	{ ID: 188, Type: "LivingRoom", Style: "NordicSideboardSingle", Top: -0.3, Height: 1.3, BuildImageName: ChatRoomMapViewCreateRowImage("NordicSideboard") },
	{ ID: 189, Type: "LivingRoom", Style: "NordicCabinet", Top: -1.2, Height: 2.2 },
	{ ID: 221, Type: "LivingRoom", Style: "ModernWardrobe", Top: -1.2, Height: 2.2 },
	{
		ID: 196,
		Type: "FloorDecorationThemed",
		Style: "ThroneCage",
		Top: -0.25,
		Height: 1.25,
		Transparency: 1,
		// Cutout 0: redraw full cage over the character so the roof stone stays solid
		TransparencyCutoutHeight: 0,
	},
	{ ID: 197, Type: "FloorDecorationThemed", Style: "ThroneCageThrone", Top: -0.85, Height: 1.6 },
	{ ID: 167, Type: "FloorDecorationThemed", Style: "ThroneCageStairsRight", Top: -0.25, Height: 1.25 },
	{ ID: 198, Type: "FloorDecorationThemed", Style: "ThroneCageStairsLeft", Top: -0.25, Height: 1.25 },
	{ ID: 181, Type: "FloorDecorationThemed", Style: "Stage", Top: -0.25, Height: 1.25 },
	{ ID: 182, Type: "FloorDecorationThemed", Style: "StageWood", Top: -0.25, Height: 1.25 },
	{ ID: 183, Type: "FloorDecorationThemed", Style: "StageStairsLeftWood", Top: -0.25, Height: 1.25 },
	{ ID: 184, Type: "FloorDecorationThemed", Style: "StageStairsRightWood", Top: -0.25, Height: 1.25 },
	{ ID: 401, Type: "Bedroom", Style: "TeddyBear" },
	{ ID: 402, Type: "Bedroom", Style: "PinkTeddyBear" },
	{ ID: 403, Type: "Bedroom", Style: "Nightstand" },
	{ ID: 404, Type: "Bedroom", Style: "PinkNightstand" },
	// Master Bedroom set (keep published IDs)
	{ ID: 405, Type: "Bedroom", Style: "Vanity", Top: -0.44, Height: 1.29 },
	{ ID: 406, Type: "Bedroom", Style: "Dresser", Top: -0.63, Height: 1.48 },
	{ ID: 407, Type: "Bedroom", Style: "FoldingScreen", Top: -0.13, Height: 0.98 },
	{ ID: 408, Type: "Bedroom", Style: "DressForm", Top: -0.95, Left: 0.16, Height: 1.8, Width: 0.69 },
	// Our Bedroom set remapped off 405-408
	{ ID: 409, Type: "Bedroom", Style: "SlidingDoorCabinet", Top: -1.2, Height: 2.2 },
	{ ID: 410, Type: "Bedroom", Style: "MakeupTable", Top: -0.8, Height: 1.8 },
	{ ID: 411, Type: "Bedroom", Style: "ModernNightstand", Top: -0.25, Height: 1.0 },
	{ ID: 412, Type: "Bedroom", Style: "ModernNightstandLamp", Top: -0.55, Height: 1.3 },

	{ ID: 210, Type: "School", Style: "TeacherDesk", Top: -0.25 },
	{ ID: 212, Type: "School", Style: "Globe", Top: -0.25, Left: 0.16, Height: 1.1, Width: 0.69 },
	{ ID: 213, Type: "School", Style: "Lectern", Top: -0.4, Height: 1.25 },
	{ ID: 220, Type: "School", Style: "StudentDesk", Top: -0.1 },
	{ ID: 250, Type: "Kitchen", Style: "SinkDishes", Top: -0.35 },
	{ ID: 260, Type: "Bathroom", Style: "LaundryMachine", Top: -0.55, Height: 1.25 },
	{ ID: 270, Type: "Bathroom", Style: "IroningBoard", Top: -0.35 },
	{ ID: 300, Type: "FloorDecorationThemed", Style: "ShibariFrame", Top: -1, Height: 2 },
	{ ID: 310, Type: "LivingRoom", Style: "JapaneseTable", Top: -0.1 },
	{ ID: 320, Type: "FloorDecorationThemed", Style: "BanzaiTree", Top: -0.1 },
	{ ID: 330, Type: "Kitchen", Style: "KitchenCounterSingle", Top: -0.3, Height: 1.3, BuildImageName: ChatRoomMapViewCreateKitchenCounterImage("KitchenCounter") },
	{ ID: 331, Type: "Kitchen", Style: "KitchenCounterSinkSingle", Top: -0.3, Height: 1.3, BuildImageName: ChatRoomMapViewCreateKitchenCounterImage("KitchenCounterSink") },
	{ ID: 332, Type: "Kitchen", Style: "KitchenCounterStoveElectricSingle", Top: -0.3, Height: 1.3, BuildImageName: ChatRoomMapViewCreateKitchenCounterImage("KitchenCounterStoveElectric") },
	{ ID: 333, Type: "Kitchen", Style: "KitchenCounterStoveGasSingle", Top: -0.3, Height: 1.3, BuildImageName: ChatRoomMapViewCreateKitchenCounterImage("KitchenCounterStoveGas") },
	{ ID: 334, Type: "Kitchen", Style: "KitchenTallCabinetSingle", Top: -1.2, Height: 2.2 },
	{ ID: 335, Type: "Kitchen", Style: "KitchenWallCabinetSingle", CanPlaceOnWalls: true, CanPlaceOnFloors: false, Top: 0.05, Height: 0.75, BuildImageName: ChatRoomMapViewCreateRowImage("KitchenWallCabinet") },
	{ ID: 336, Type: "Office", Style: "OfficeStandingTable", Top: -0.5, Height: 1.5 },
	{ ID: 337, Type: "Office", Style: "OfficeDeskComputer", Top: -0.35, Height: 1.35 },
	{ ID: 338, Type: "Office", Style: "OfficeChair", Top: -0.5, Height: 1.5 },
	{ ID: 339, Type: "Office", Style: "OfficeFilingCabinet", Top: -1.0, Height: 2.0 },
	{ ID: 340, Type: "Office", Style: "OfficeFileDrawer", Top: -0.3, Height: 1.3 },
	{ ID: 341, Type: "Office", Style: "OfficePrinter", Top: -0.5, Height: 1.5 },
	{ ID: 350, Type: "FloorDecorationThemed", Style: "MedicalDesk", Top: -0.15 },
	{ ID: 360, Type: "FloorDecorationThemed", Style: "anvil", Top: 0.03, Left: 0.05, Height: 0.9, Width: 0.9 },
	{ ID: 361, Type: "FloorDecorationThemed", Style: "grindstone", Top: 0.03, Left: 0.05, Height: 0.9, Width: 0.9 },
	{ ID: 362, Type: "FloorDecorationThemed", Style: "furnace", Top: -0.8, Left: 0.05, Height: 1.8, Width: 0.9 },
	{ ID: 363, Type: "Kitchen", Style: "microwave", Top: 0.03, Left: 0.05, Height: 0.9, Width: 0.9 },
	{ ID: 364, Type: "Kitchen", Style: "stove", Top: -0.29, Left: 0.05, Height: 1.22, Width: 0.9 },
	{ ID: 365, Type: "Kitchen", Style: "fridge", Top: -0.8, Left: 0.05, Height: 1.8, Width: 0.9 },
	{ ID: 366, Type: "Kitchen", Style: "KitchenWallKnifeMagnet", CanPlaceOnWalls: true, CanPlaceOnFloors: false, Top: 0.05, Height: 0.5 },
	{ ID: 367, Type: "Kitchen", Style: "KitchenWallCoffeeArt", CanPlaceOnWalls: true, CanPlaceOnFloors: false, Top: 0.05, Height: 0.8 },
	{ ID: 370, Type: "Bathroom", Style: "Toilet", Top: -0.65, Left: 0.05, Height: 1.5, Width: 0.9 },
	{ ID: 380, Type: "FloorDecorationThemed", Style: "DeskBlue" },
	{ ID: 381, Type: "FloorDecorationThemed", Style: "DeskPurple" },
	{ ID: 382, Type: "FloorDecorationThemed", Style: "ConsoleLeft", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 383, Type: "FloorDecorationThemed", Style: "ConsoleRight", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 384, Type: "FloorDecorationThemed", Style: "LongDeskLeft", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 385, Type: "FloorDecorationThemed", Style: "LongDeskRight", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 386, Type: "FloorDecorationThemed", Style: "Cabinet", Top: -0.9, Left: 0, Height: 2, Width: 1 },
	{ ID: 387, Type: "LivingRoom", Style: "Television", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 388, Type: "LivingRoom", Style: "TelevisionBack", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 389, Type: "Bedroom", Style: "Wardrobe", Top: -0.9, Left: 0, Height: 2, Width: 1 },
	{ ID: 390, Type: "FloorDecorationThemed", Style: "StandingBellflowerBanner", Top: -1.1, Left: 0.15, Height: 1.7, Width: 0.7 },
	{ ID: 391, Type: "FloorDecorationThemed", Style: "BondageClubBanner", Top: -1.1, Left: 0.15, Height: 1.7, Width: 0.7 },
	{ ID: 392, Type: "FloorDecorationThemed", Style: "VoidOrderBanner", Top: -0.9, Left: 0.13, Height: 1.5, Width: 0.7 },
	{ ID: 393, Type: "FloorDecorationThemed", Style: "KatanaOnStand", Top: -0.4, Left: 0.1, Height: 1.0, Width: 0.8 },
	{ ID: 394, Type: "FloorDecorationThemed", Style: "MagicMark", Top: 0.03, Left: 0.05, Height: 0.9, Width: 0.9 },
	{ ID: 395, Type: "FloorDecorationThemed", Style: "Pillory", Top: 0.04, Height: 0.81 },
	{ ID: 396, Type: "FloorDecorationThemed", Style: "Cage", Top: -0.65, Height: 1.5 },

	{ ID: 510, Type: "FloorDecorationParty", Style: "BalloonFiveColor", Top: -0.6, Height: 1.5 },
	{ ID: 511, Type: "FloorDecorationParty", Style: "BalloonTwoHeart", Top: -0.15 },
	{ ID: 520, Type: "FloorDecorationParty", Style: "WeddingCake", Top: -1, Height: 2 },
	{ ID: 521, Type: "FloorDecorationParty", Style: "WeddingArch", Top: -1, Height: 2 },
	{ ID: 530, Type: "FloorDecorationParty", Style: "FlowerVasePink", Top: -0.33 },
	{ ID: 560, Type: "FloorDecorationParty", Style: "BeachUmbrellaStripe", Top: -1.1, Height: 2 },
	{ ID: 570, Type: "FloorDecorationParty", Style: "BeachTowelStripe" },
	{ ID: 580, Type: "FloorDecorationParty", Style: "Speaker", Top: -1.2, Height: 1.85 },
	{ ID: 590, Type: "FloorDecorationParty", Style: "Presents", Top: 0.25, Height: 0.50 },
	{ ID: 595, Type: "FloorDecorationParty", Style: "Pumpkin", Top: 0.25, Left: 0.25, Height: 0.5, Width: 0.5 },
	{ ID: 596, Type: "FloorDecorationParty", Style: "JackOLantern", Top: 0.25, Left: 0, Height: 0.5, Width: 1 },
	{ ID: 598, Type: "FloorDecorationParty", Style: "ChampagneTower", Top: -0.45, Height: 1.3 },
	{ ID: 599, Type: "FloorDecorationParty", Style: "DJBooth", Name: "DJ Booth", Top: 0.38, Height: 0.47 },

	{ ID: 610, Type: "FloorDecorationCamping", Style: "LogFire", Top: -0.35 },
	{
		ID: 611,
		Type: "FloorDecorationCamping",
		Style: "LogFireAnim0",
		Height: 1,
		Top: -0.5,
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor(CurrentTime / 150) + X + Y * 3) % 10;
			return "LogFireAnim" + Frame.toString();
		}
	},
	{ ID: 612, Type: "FloorDecorationCamping", Style: "NordicFireBowl", Left: -0.5, Width: 2, Top: -1, Height: 2, CanEnter: () => false },
	{ ID: 620, Type: "FloorDecorationCamping", Style: "LogSingle", Top: -0.2 },
	{ ID: 630, Type: "FloorDecorationCamping", Style: "TentBlue", Top: -0.3 },
	{ ID: 640, Type: "FloorDecorationCamping", Style: "SleepingBagBlue" },
	{ ID: 650, Type: "FloorDecorationCamping", Style: "ChairRed", Top: -0.35 },
	{ ID: 660, Type: "FloorDecorationCamping", Style: "Hurdle1", CanEnter: () => !Player.HasEffect("Freeze") },
	{ ID: 670, Type: "FloorDecorationCamping", Style: "Hurdle2", CanEnter: () => !Player.HasEffect("Freeze") && !Player.HasEffect("Slow") },
	{ ID: 680, Type: "FloorDecorationCamping", Style: "Hurdle3" },
	{ ID: 690, Type: "FloorDecorationCamping", Style: "Lantern", Top: 0.05, Left: 0.29, Height: 0.8, Width: 0.42 },
	{ ID: 691, Type: "FloorDecorationCamping", Style: "Backpack", Top: -0.15, Left: 0.03, Height: 1, Width: 0.94 },
	{ ID: 692, Type: "FloorDecorationCamping", Style: "Cooler", Top: 0.13, Height: 0.72 },

	{
		ID: 710,
		Type: "FloorDecorationExpanding",
		Style: "CouchPinkPreview",
		BuildImageName: function(X, Y) {
			let LeftObject = MapManager.Map.getObject(X - 1, Y);
			let RightObject = MapManager.Map.getObject(X + 1, Y);
			if ((LeftObject != null) && (LeftObject.ID == this.ID) && ((RightObject != null) && (RightObject.ID == this.ID))) return "CouchPinkMiddle";
			if ((LeftObject != null) && (LeftObject.ID == this.ID)) return "CouchPinkRight";
			if ((RightObject != null) && (RightObject.ID == this.ID))return "CouchPinkLeft";
			return "CouckPinkSmall";
		},
		Top: -0.35
	},
	{
		ID: 720,
		Type: "FloorDecorationExpanding",
		Style: "BedBluePreview",
		BuildImageName: function(X, Y) {
			let LeftObject = MapManager.Map.getObject(X - 1, Y);
			let RightObject = MapManager.Map.getObject(X + 1, Y);
			if ((LeftObject != null) && (LeftObject.ID == this.ID) && ((RightObject != null) && (RightObject.ID == this.ID))) return "BedBlueMiddle";
			if ((LeftObject != null) && (LeftObject.ID == this.ID)) return "BedBlueRight";
			if ((RightObject != null) && (RightObject.ID == this.ID)) return "BedBlueLeft";
			return "BedBlueSmall";
		},
		Top: -1,
		Height: 2
	},
	{
		ID: 730,
		Type: "FloorDecorationExpanding",
		Style: "BallPitPreview",
		BuildImageName: function(X, Y) {
			let LeftObject = MapManager.Map.getObject(X - 1, Y);
			let RightObject = MapManager.Map.getObject(X + 1, Y);
			if ((LeftObject != null) && (LeftObject.ID == this.ID) && ((RightObject != null) && (RightObject.ID == this.ID))) return "BallPitMiddle";
			if ((LeftObject != null) && (LeftObject.ID == this.ID)) return "BallPitRight";
			if ((RightObject != null) && (RightObject.ID == this.ID)) return "BallPitLeft";
			return "BallPitSmall";
		},
		Top: -0.25,
		Height: 1.25,
		Transparency: 1,
		TransparencyCutoutHeight: 0.96
	},
	{
		ID: 740,
		Type: "FloorDecorationExpanding",
		Style: "VikingTablePreview",
		BuildImageName: function(X, Y) {
			let LeftObject = MapManager.Map.getObject(X - 1, Y);
			let RightObject = MapManager.Map.getObject(X + 1, Y);
			if ((LeftObject != null) && (LeftObject.ID == this.ID) && ((RightObject != null) && (RightObject.ID == this.ID))) return "VikingTableMiddle";
			if ((LeftObject != null) && (LeftObject.ID == this.ID)) return "VikingTableRight";
			if ((RightObject != null) && (RightObject.ID == this.ID)) return "VikingTableLeft";
			return "VikingTableSmall";
		},
		Top: -0.25,
		Height: 1.25,
		Transparency: 1,
		TransparencyCutoutHeight: 0
	},
	{
		ID: 750,
		Type: "FloorDecorationExpanding",
		Style: "RailroadPreview", // The image shown in the map editor palette
		BuildImageName: function(X, Y) {
			// Get the connections as True/False
			let directions = ChatRoomMapViewGetConnectivityDirections(X, Y, (tX, tY) => {
				const neighbor = MapManager.Map.getObject(tX, tY);
				// Connect if neighbor exists and has the exact same ID as this track
				return neighbor != null && neighbor.ID === this.ID;
			});

			// Build the suffix string in a strict order
			let Suffix = "";
			if (directions.North) Suffix += "North";
			if (directions.South) Suffix += "South";
			if (directions.East)  Suffix += "East";
			if (directions.West)  Suffix += "West";

			// Handle the "Single" case (no connections)
			if (Suffix === "") return "Railroad"; // Default to vertical if alone

			// Return the final image name
			return "Railroad" + Suffix;
		},
		Top: 0,
	},
	{ ID: 801, Type: "FloorDecorationAnimal", Style: "PetBed", Top: 0.19, Height: 0.66 },
	{ ID: 802, Type: "FloorDecorationAnimal", Style: "PetBowls", Top: 0.55, Height: 0.3 },
	{
		ID: 810,
		Type: "FloorDecorationAnimal",
		Style: "CatCaramelHappy",
		Top: -0.2,
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor((CurrentTime + X * 331 + Y * 197) / 2500) + X * 331 + Y * 197) % 100;
			let Anim;
			if ((Frame >= 25) && (Frame <= 27)) Anim = "Stretch";
			else if ((Frame >= 28) && (Frame <= 30)) Anim = "Idle";
			else if ((Frame >= 31) && (Frame <= 33)) Anim = "Happy";
			else if ((Frame >= 34) && (Frame <= 35)) Anim = "Idle";
			else if ((Frame >= 36) && (Frame <= 38)) Anim = "Meow";
			else if ((Frame >= 39) && (Frame <= 40)) Anim = "Happy";
			else if ((Frame >= 41) && (Frame <= 42)) Anim = "Idle";
			else if ((Frame >= 43) && (Frame <= 44)) Anim = "Happy";
			else if ((Frame >= 45) && (Frame <= 49)) Anim = "Play";
			else if ((Frame >= 50) && (Frame <= 51)) Anim = "Meow";
			else if ((Frame >= 52) && (Frame <= 54)) Anim = "Idle";
			else if ((Frame >= 55) && (Frame <= 60)) Anim = "Sleep";
			else if ((Frame >= 61) && (Frame <= 62)) Anim = "Idle";
			else if ((Frame >= 63) && (Frame <= 65)) Anim = "Play";
			else if ((Frame >= 66) && (Frame <= 69)) Anim = "Stretch";
			else if ((Frame >= 70) && (Frame <= 72)) Anim = "Meow";
			else if ((Frame >= 73) && (Frame <= 74)) Anim = "Idle";
			else if ((Frame >= 75) && (Frame <= 75)) Anim = "Happy";
			else if ((Frame >= 76) && (Frame <= 76)) Anim = "Idle";
			else if ((Frame >= 77) && (Frame <= 79)) Anim = "Meow";
			else if ((Frame >= 80) && (Frame <= 81)) Anim = "Stretch";
			else if ((Frame >= 82) && (Frame <= 85)) Anim = "Play";
			else if ((Frame >= 86) && (Frame <= 87)) Anim = "Meow";
			else if ((Frame >= 88) && (Frame <= 90)) Anim = "Happy";
			else if ((Frame >= 91) && (Frame <= 94)) Anim = "Idle";
			else if ((Frame >= 95) && (Frame <= 96)) Anim = "Meow";
			else if ((Frame >= 97) && (Frame <= 100)) Anim = "Stretch";
			else Anim = "Sleep";
			return "CatCaramel" + Anim;
		}
	},
	{
		ID: 820,
		Type: "FloorDecorationAnimal",
		Style: "DogBrownHappy",
		Top: -0.4,
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor((CurrentTime + X * 347 + Y * 179) / 2000) + X * 347 + Y * 179) % 100;
			let Anim;
			if ((Frame >= 20) && (Frame <= 22)) Anim = "Roll";
			else if ((Frame >= 23) && (Frame <= 24)) Anim = "Search";
			else if ((Frame >= 25) && (Frame <= 25)) Anim = "Howl";
			else if ((Frame >= 26) && (Frame <= 27)) Anim = "Crazy";
			else if ((Frame >= 28) && (Frame <= 30)) Anim = "Happy";
			else if ((Frame >= 31) && (Frame <= 31)) Anim = "Play";
			else if ((Frame >= 32) && (Frame <= 34)) Anim = "Scratch";
			else if ((Frame >= 35) && (Frame <= 36)) Anim = "Play";
			else if ((Frame >= 37) && (Frame <= 39)) Anim = "Ball";
			else if ((Frame >= 40) && (Frame <= 41)) Anim = "Crazy";
			else if ((Frame >= 42) && (Frame <= 44)) Anim = "Search";
			else if ((Frame >= 45) && (Frame <= 46)) Anim = "Howl";
			else if ((Frame >= 47) && (Frame <= 49)) Anim = "Roll";
			else if ((Frame >= 50) && (Frame <= 50)) Anim = "Search";
			else if ((Frame >= 51) && (Frame <= 52)) Anim = "Scratch";
			else if ((Frame >= 53) && (Frame <= 64)) Anim = "Happy";
			else if ((Frame >= 55) && (Frame <= 63)) Anim = "Sleep";
			else if ((Frame >= 64) && (Frame <= 67)) Anim = "Search";
			else if ((Frame >= 68) && (Frame <= 70)) Anim = "Ball";
			else if ((Frame >= 71) && (Frame <= 72)) Anim = "Crazy";
			else if ((Frame >= 73) && (Frame <= 73)) Anim = "Howl";
			else if ((Frame >= 74) && (Frame <= 74)) Anim = "Play";
			else if ((Frame >= 75) && (Frame <= 75)) Anim = "Howl";
			else if ((Frame >= 76) && (Frame <= 78)) Anim = "Scratch";
			else if ((Frame >= 79) && (Frame <= 82)) Anim = "Roll";
			else if ((Frame >= 83) && (Frame <= 84)) Anim = "Search";
			else if ((Frame >= 85) && (Frame <= 86)) Anim = "Ball";
			else if ((Frame >= 87) && (Frame <= 89)) Anim = "Crazy";
			else if ((Frame >= 90) && (Frame <= 91)) Anim = "Happy";
			else if ((Frame >= 92) && (Frame <= 92)) Anim = "Howl";
			else if ((Frame >= 93) && (Frame <= 94)) Anim = "Search";
			else if ((Frame >= 95) && (Frame <= 97)) Anim = "Scratch";
			else if ((Frame >= 98) && (Frame <= 100)) Anim = "Roll";
			else Anim = "Sleep";
			return "DogBrown" + Anim;
		}
	},

	{
		ID: 830,
		Type: "FloorDecorationAnimal",
		Style: "RabbitBrownStand",
		Top: -0.3,
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor((CurrentTime + X * 349 + Y * 193) / 1700) + X * 347 + Y * 193) % 200;
			let Anim;
			let F = Frame % 100;
			if ((F >= 2) && (F <= 5)) Anim = "Idle";
			else if ((F >= 6) && (F <= 7)) Anim = "Watch";
			else if ((F >= 8) && (F <= 9)) Anim = "Idle";
			else if ((F >= 10) && (F <= 13)) Anim = "Wait";
			else if ((F >= 14) && (F <= 16)) Anim = "Cute";
			else if ((F >= 17) && (F <= 21)) Anim = "Stand";
			else if ((F >= 22) && (F <= 23)) Anim = "Cute";
			else if ((F >= 24) && (F <= 27)) Anim = "Wait";
			else if ((F >= 28) && (F <= 30)) Anim = "Watch";
			else if ((F >= 31) && (F <= 34)) Anim = "Idle";
			else if ((F >= 35) && (F <= 41)) Anim = "Relax";
			else if ((F >= 42) && (F <= 44)) Anim = "Wait";
			else if ((F >= 45) && (F <= 45)) Anim = "Idle";
			else if ((F >= 46) && (F <= 49)) Anim = "Wait";
			else if ((F >= 50) && (F <= 55)) Anim = "Cute";
			else if ((F >= 56) && (F <= 59)) Anim = "Stand";
			else if ((F >= 60) && (F <= 61)) Anim = "Cute";
			else if ((F >= 62) && (F <= 64)) Anim = "Relax";
			else if ((F >= 65) && (F <= 69)) Anim = "Watch";
			else if ((F >= 70) && (F <= 74)) Anim = "Wait";
			else if ((F >= 75) && (F <= 76)) Anim = "Idle";
			else if ((F >= 77) && (F <= 82)) Anim = "Relax";
			else if ((F >= 83) && (F <= 85)) Anim = "Wait";
			else if ((F >= 86) && (F <= 89)) Anim = "Watch";
			else if ((F >= 90) && (F <= 91)) Anim = "Idle";
			else if ((F >= 92) && (F <= 94)) Anim = "Relax";
			else if ((F >= 95) && (F <= 98)) Anim = "Cute";
			else Anim = "Stand";
			return "RabbitBrown" + Anim + ((Frame >= 100) ? "Right" : "");
		}
	},
	{
		ID: 840,
		Type: "FloorDecorationAnimal",
		Style: "ChickenBrownIdleLeft",
		Left: 0.25,
		Width: 0.5,
		Height: 0.5,
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor((CurrentTime + X * 367 + Y * 173) / 1500) + X * 367 + Y * 173) % 100;
			let Anim;
			if ((Frame >= 14) && (Frame <= 16)) Anim = "IdleLeft";
			else if (Frame == 17) Anim = "EatLeft";
			else if (Frame == 18) Anim = "IdleLeft";
			else if (Frame == 19) Anim = "EatLeft";
			else if (Frame == 20) Anim = "IdleLeft";
			else if (Frame == 21) Anim = "EatLeft";
			else if ((Frame >= 22) && (Frame <= 24)) Anim = "IdleLeft";
			else if (Frame == 25) Anim = "WalkLeft";
			else if (Frame == 26) Anim = "WalkRight";
			else if (Frame == 27) Anim = "WalkLeft";
			else if (Frame == 28) Anim = "WalkRight";
			else if (Frame == 30) Anim = "WalkLeft";
			else if (Frame == 31) Anim = "WalkRight";
			else if ((Frame >= 32) && (Frame <= 34)) Anim = "IdleRight";
			else if ((Frame >= 35) && (Frame <= 39)) Anim = "EatRight";
			else if ((Frame >= 40) && (Frame <= 41)) Anim = "IdleRight";
			else if (Frame == 42) Anim = "WalkLeft";
			else if (Frame == 43) Anim = "WalkRight";
			else if (Frame == 44) Anim = "WalkLeft";
			else if (Frame == 45) Anim = "WalkRight";
			else if ((Frame >= 46) && (Frame <= 50)) Anim = "IdleRight";
			else if ((Frame >= 51) && (Frame <= 67)) Anim = "SleepRight";
			else if ((Frame >= 67) && (Frame <= 69)) Anim = "IdleRight";
			else if ((Frame >= 70) && (Frame <= 71)) Anim = "EatRight";
			else if (Frame == 72) Anim = "IdleRight";
			else if (Frame == 73) Anim = "EatRight";
			else if (Frame == 74) Anim = "IdleRight";
			else if (Frame == 75) Anim = "EatRight";
			else if ((Frame >= 76) && (Frame <= 84)) Anim = "IdleRight";
			else if (Frame == 85) Anim = "WalkRight";
			else if (Frame == 86) Anim = "WalkLeft";
			else if (Frame == 87) Anim = "WalkRight";
			else if (Frame == 88) Anim = "WalkLeft";
			else if (Frame == 89) Anim = "WalkRight";
			else if (Frame == 90) Anim = "WalkLeft";
			else if ((Frame >= 91) && (Frame <= 92)) Anim = "IdleLeft";
			else if ((Frame >= 93) && (Frame <= 97)) Anim = "EatLeft";
			else if ((Frame >= 98) && (Frame <= 100)) Anim = "IdleLeft";
			else Anim = "SleepLeft";
			return "ChickenBrown" + Anim;
		}
	},
	{
		ID: 850,
		Type: "FloorDecorationAnimal",
		Style: "Fireflies0",
		Top: -0.5,
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor((CurrentTime + X * 337 + Y * 191) / 150) + X * 7 + Y * 11) % 16;
			return "Fireflies" + Frame.toString();
		}
	},

	{ ID: 1010, Type: "FloorItem", Style: "Kennel", Top: -1, Height: 2, AssetName: "Kennel", AssetGroup: "ItemDevices" },
	{ ID: 1020, Type: "FloorItem", Style: "X-Cross", Top: -1, Height: 2, AssetName: "X-Cross", AssetGroup: "ItemDevices" },
	{ ID: 1030, Type: "FloorItem", Style: "BondageBench", Top: -1, Height: 2, AssetName: "BondageBench", AssetGroup: "ItemDevices" },
	{ ID: 1040, Type: "FloorItem", Style: "Trolley", Top: -1, Height: 2, AssetName: "Trolley", AssetGroup: "ItemDevices" },
	{ ID: 1050, Type: "School", Style: "Locker", Top: -1, Height: 2, AssetName: "Locker", AssetGroup: "ItemDevices" },
	{ ID: 1060, Type: "FloorItem", Style: "WoodenBox", Top: -1, Height: 2, AssetName: "WoodenBox", AssetGroup: "ItemDevices" },
	{ ID: 1070, Type: "FloorItem", Style: "Coffin", Top: -1.2, Height: 1.85, AssetName: "Coffin", AssetGroup: "ItemDevices" },
	{ ID: 1080, Type: "FloorItem", Style: "TheDisplayFrame", Top: -1, Height: 2, AssetName: "TheDisplayFrame", AssetGroup: "ItemDevices" },
	{ ID: 1090, Type: "FloorItem", Style: "Pole", Top: -0.85, Height: 1.8, AssetName: "Pole", AssetGroup: "ItemDevices" },
	{ ID: 1095, Type: "FloorItem", Style: "MedicalBed", Top: -0.82, Left: 0.05, Height: 1.8, Width: 0.90, AssetName: "MedicalBed", AssetGroup: "ItemDevices" },
	{ ID: 1096, Type: "FloorItem", Style: "FuturisticCrate", Top: -0.95, Height: 2, AssetName: "FuturisticCrate", AssetGroup: "ItemDevices" },
	{ ID: 1097, Type: "ABDL", Style: "HighChair", Top: -0.95, Height: 2, AssetName: "Highchair", AssetGroup: "ItemDevices" },
	{ ID: 1098, Type: "ABDL", Style: "Crib", Top: -0.95, Height: 2, AssetName: "Crib", AssetGroup: "ItemDevices" },
	{ ID: 1099, Type: "ABDL", Style: "PinkCrib", Top: -0.95, Height: 2, AssetName: "Crib", AssetGroup: "ItemDevices" },

	{ ID: 1110, Type: "FloorNumber", Style: "Number0" },
	{ ID: 1111, Type: "FloorNumber", Style: "Number1" },
	{ ID: 1112, Type: "FloorNumber", Style: "Number2" },
	{ ID: 1113, Type: "FloorNumber", Style: "Number3" },
	{ ID: 1114, Type: "FloorNumber", Style: "Number4" },
	{ ID: 1115, Type: "FloorNumber", Style: "Number5" },
	{ ID: 1116, Type: "FloorNumber", Style: "Number6" },
	{ ID: 1117, Type: "FloorNumber", Style: "Number7" },
	{ ID: 1118, Type: "FloorNumber", Style: "Number8" },
	{ ID: 1119, Type: "FloorNumber", Style: "Number9" },

	{ ID: 1201, Type: "FloorLetter", Style: "LetterA" },
	{ ID: 1202, Type: "FloorLetter", Style: "LetterB" },
	{ ID: 1203, Type: "FloorLetter", Style: "LetterC" },
	{ ID: 1204, Type: "FloorLetter", Style: "LetterD" },
	{ ID: 1205, Type: "FloorLetter", Style: "LetterE" },
	{ ID: 1206, Type: "FloorLetter", Style: "LetterF" },
	{ ID: 1207, Type: "FloorLetter", Style: "LetterG" },
	{ ID: 1208, Type: "FloorLetter", Style: "LetterH" },
	{ ID: 1209, Type: "FloorLetter", Style: "LetterI" },
	{ ID: 1210, Type: "FloorLetter", Style: "LetterJ" },
	{ ID: 1211, Type: "FloorLetter", Style: "LetterK" },
	{ ID: 1212, Type: "FloorLetter", Style: "LetterL" },
	{ ID: 1213, Type: "FloorLetter", Style: "LetterM" },
	{ ID: 1214, Type: "FloorLetter", Style: "LetterN" },
	{ ID: 1215, Type: "FloorLetter", Style: "LetterO" },
	{ ID: 1216, Type: "FloorLetter", Style: "LetterP" },
	{ ID: 1217, Type: "FloorLetter", Style: "LetterQ" },
	{ ID: 1218, Type: "FloorLetter", Style: "LetterR" },
	{ ID: 1219, Type: "FloorLetter", Style: "LetterS" },
	{ ID: 1220, Type: "FloorLetter", Style: "LetterT" },
	{ ID: 1221, Type: "FloorLetter", Style: "LetterU" },
	{ ID: 1222, Type: "FloorLetter", Style: "LetterV" },
	{ ID: 1223, Type: "FloorLetter", Style: "LetterW" },
	{ ID: 1224, Type: "FloorLetter", Style: "LetterX" },
	{ ID: 1225, Type: "FloorLetter", Style: "LetterY" },
	{ ID: 1226, Type: "FloorLetter", Style: "LetterZ" },

	{ ID: 1301, Type: "FloorIcon", Style: "IconCircle" },
	{ ID: 1302, Type: "FloorIcon", Style: "IconSquare" },
	{ ID: 1303, Type: "FloorIcon", Style: "IconTriangle" },
	{ ID: 1304, Type: "FloorIcon", Style: "IconCross" },
	{ ID: 1305, Type: "FloorIcon", Style: "IconDiamond" },
	{ ID: 1306, Type: "FloorIcon", Style: "IconArrowUp" },
	{ ID: 1307, Type: "FloorIcon", Style: "IconArrowDown" },
	{ ID: 1308, Type: "FloorIcon", Style: "IconArrowLeft" },
	{ ID: 1309, Type: "FloorIcon", Style: "IconArrowRight" },

	{ ID: 1400, Type: "ABDL", Style: "PinkPotty", Top: 0, Height: 1, AssetName: "Potty", AssetGroup: "ItemDevices" },
	{ ID: 1401, Type: "ABDL", Style: "BluePotty", Top: 0, Height: 1, AssetName: "Potty", AssetGroup: "ItemDevices" },
	{ ID: 1402, Type: "ABDL", Style: "ChangingTable", Top: -1, Height: 2, AssetName: "ChangingTable", AssetGroup: "ItemDevices" },
	{ ID: 1403, Type: "ABDL", Style: "RockingHorse", Top: 0.07, Height: 0.78 },

	{ ID: 2004, Type: "FloorObstacle", Style: "Stalagmite", Top: -0.125, Height: 1, CanEnter: () => false, },
	{ ID: 2005, Type: "FloorObstacle", Style: "Rocks", Top: -0.125, Height: 1.125, CanEnter: () => false, },
	{ ID: 2006, Type: "FloorObstacle", Style: "GoldStones", Top: 0.10, Left: 0.25, Height: 0.5, Width: 0.5, CanEnter: () => false, },
	{ ID: 2007, Type: "FloorObstacle", Style: "StonePile", Top: 0.10, Left: 0.25, Height: 0.5, Width: 0.5, CanEnter: () => false, },
	{ ID: 2010, Type: "FloorObstacle", Style: "Statue", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2011, Type: "FloorObstacle", Style: "Knight", Top: -1.25, Left: 0.05, Height: 1.65, Width: 0.75, CanEnter: () => false, },
	{ ID: 2012, Type: "FloorObstacle", Style: "Samurai", Top: -1.25, Left: 0.05, Height: 1.75, Width: 0.85, CanEnter: () => false, },
	{ ID: 2013, Type: "FloorObstacle", Style: "Totem", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2014, Type: "FloorObstacle", Style: "EasterIsland", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2015, Type: "FloorObstacle", Style: "OrderOfTheVoidTotem", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2016, Type: "FloorObstacle", Style: "NordicPillar", Top: -1.35, Left: 0.15, Height: 2.3, Width: 0.7, CanEnter: () => false, },
	{ ID: 2017, Type: "FloorObstacle", Style: "FreyaStatue", Top: -1.55, Height: 2.5, CanEnter: () => false, },
	{ ID: 2018, Type: "FloorObstacle", Style: "NordicTreasureChest", Top: -0.2, Height: 1.2, CanEnter: () => false, },
	{ ID: 2020, Type: "FloorObstacle", Style: "Barrel", Top: -0.5, Height: 1.5, CanEnter: () => false, },
	{ ID: 2025, Type: "FloorObstacle", Style: "Chest", Top: 0, Height: 1, CanEnter: () => false, },
	{ ID: 2030, Type: "FloorObstacle", Style: "IronBars", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2031, Type: "FloorObstacle", Style: "BarbFence", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2032, Type: "FloorObstacle", Style: "PicketFence", Top: -0.80, Height: 0.75, Width: 1, CanEnter: () => false, },
	{
		ID: 2033,
		Type: "FloorObstacle",
		Style: "VelourRopeBarrier",
		BuildImageName: function(x, y) {
			let leftObjectId = MapManager.Map.getObjectId(x - 1, y);
			let rightObjectId = MapManager.Map.getObjectId(x + 1, y);
			if ((leftObjectId === this.ID) && ((rightObjectId === this.ID))) return "VelourRopeBarrierMiddle";
			if ((leftObjectId === this.ID)) return "VelourRopeBarrierRight";
			if ((rightObjectId === this.ID)) return "VelourRopeBarrierLeft";
			return "VelourRopeBarrier";
		},
		Top: -0.35
	},
	{
		ID: 2034,
		Type: "FloorObstacle",
		Style: "FarmFenceSingle",
		Top: -0.15,
		Height: 1.1,
		CanEnter: () => false,
		// Row join; intermediate post every 2 tiles from the left end of the run
		BuildImageName: function(x, y) {
			const left = MapManager.Map.getObjectId(x - 1, y) === this.ID;
			const right = MapManager.Map.getObjectId(x + 1, y) === this.ID;
			if (!left && !right) return "FarmFenceSingle";
			if (!left && right) return "FarmFenceLeft";
			if (left && !right) return "FarmFenceRight";
			let dist = 0;
			while (MapManager.Map.getObjectId(x - dist - 1, y) === this.ID) dist++;
			return (dist % 2 === 0) ? "FarmFenceMiddlePost" : "FarmFenceMiddle";
		},
	},
	{
		ID: 2036,
		Type: "FloorObstacle",
		Style: "HomeFenceSingle",
		Top: -0.15,
		Height: 1.1,
		CanEnter: () => false,
		// Row join; intermediate post every 2 tiles from the left end of the run
		BuildImageName: function(x, y) {
			const left = MapManager.Map.getObjectId(x - 1, y) === this.ID;
			const right = MapManager.Map.getObjectId(x + 1, y) === this.ID;
			if (!left && !right) return "HomeFenceSingle";
			if (!left && right) return "HomeFenceLeft";
			if (left && !right) return "HomeFenceRight";
			let dist = 0;
			while (MapManager.Map.getObjectId(x - dist - 1, y) === this.ID) dist++;
			return (dist % 2 === 0) ? "HomeFenceMiddlePost" : "HomeFenceMiddle";
		},
	},
	{ ID: 2035, Type: "FloorObstacle", Style: "Bush", Top: -0.25, Height: 1, CanEnter: () => false, },
	{ ID: 2040, Type: "FloorObstacle", Style: "OakTree", Left: -0.25, Top: -1.5, Width: 1.5, Height: 2.5, CanEnter: () => false, },
	{ ID: 2045, Type: "FloorObstacle", Style: "OakTree_Fall", Left: -0.25, Top: -1.5, Width: 1.5, Height: 2.5, CanEnter: () => false, },
	{ ID: 2048, Type: "FloorObstacle", Style: "LeaflessTree", Top: -1.25, Height: 2, CanEnter: () => false, },
	{ ID: 2050, Type: "FloorObstacle", Style: "PineTree", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2055, Type: "FloorObstacle", Style: "PalmTree", Left: -0.30, Top: -1.5, Width: 1.65, Height: 2.5, CanEnter: () => false, },
	{ ID: 2059, Type: "FloorObstacle", Style: "Sakura", Left: -0.30, Top: -1.5, Width: 1.3, Height: 2.0, CanEnter: () => false, },
	{ ID: 2057, Type: "FloorObstacle", Style: "Cactus", Left: -0.20, Top: -1.20, Width: 1.3, Height: 1.8, CanEnter: () => false, },
	{ ID: 2060, Type: "FloorObstacle", Style: "ChristmasTree", Top: -1, Height: 2, CanEnter: () => false, },
	{ ID: 2070, Type: "FloorObstacle", Style: "Window", Top: -0.5, Height: 1.5, CanEnter: () => false, },
	{ ID: 2080, Type: "FloorObstacle", Style: "TrashCan", Top: -0.25, Height: 0.75, Width: 0.75, CanEnter: () => false, },
	{ ID: 2085, Type: "FloorObstacle", Style: "RoadCone", Top: 0, Left: 0.13, Height: 0.75, Width: 0.75, CanEnter: () => false, },
	{ ID: 2090, Type: "FloorObstacle", Style: "LampPost", Top: -1.25, Height: 2, CanEnter: () => false, },
	{ ID: 2091, Type: "FloorObstacle", Style: "Fountain", Top: -0.1, Height: 0.95, CanEnter: () => false, },
	{ ID: 2092, Type: "FloorObstacle", Style: "ParkBench", Top: 0.19, Height: 0.66, CanEnter: () => false, },
	{ ID: 2093, Type: "FloorObstacle", Style: "WishingWell", Top: -0.47, Height: 1.32, CanEnter: () => false, },
	{ ID: 2098, Type: "FloorObstacle", Style: "Pillar", Top: -1.25, Left: 0.16, Height: 2, Width: 0.70, CanEnter: () => false, },

	{ ID: 3010, Type: "WallDecoration", Style: "Painting" },
	{ ID: 3020, Type: "Bathroom", Style: "Mirror", CanPlaceOnWalls: true },
	{ ID: 3021, Type: "Bathroom", Style: "BlueBathroomMat" },
	{ ID: 3022, Type: "Bathroom", Style: "GreenBathroomMat" },
	{ ID: 3023, Type: "Bathroom", Style: "PinkBathroomMat" },
	{ ID: 3024, Type: "Bathroom", Style: "Sink" },
	{ ID: 3025, Type: "Bathroom", Style: "ToiletPaper" },
	{ ID: 3026, Type: "Bathroom", Style: "Bathtub" },
	{ ID: 3027, Type: "Bathroom", Style: "TowelRack", Top: -0.34, Height: 1.19 },
	{ ID: 3028, Type: "Bathroom", Style: "LaundryBasket", Top: 0.05, Left: 0.01, Height: 0.8, Width: 0.98 },
	{
		ID: 3030,
		Type: "WallDecoration",
		Style: "Candelabra0",
		BuildImageName: function(X, Y) {
			let Frame = (Math.floor((CurrentTime + X * 349 + Y * 193) / 150) + X * 347 + Y * 193) % 17;
			if (Frame > 8) Frame = 16 - Frame;
			return "Candelabra" + Frame.toString();
		}
	},
	{ ID: 3040, Type: "WallDecoration", Style: "Whip" },
	{ ID: 3050, Type: "LivingRoom", Style: "Fireplace", CanPlaceOnWalls: true, CanPlaceOnFloors: false },
	{ ID: 3060, Type: "WallDecoration", Style: "Stocking",Top: 0.35, Left: 0.25, Height: 0.5, Width: 0.5 },
	{ ID: 3070, Type: "WallDecoration", Style: "Moss", Top: 0.15, Height: 0.8 },
	{ ID: 3075, Type: "WallDecoration", Style: "Vines", Top: 0.15, Height: 0.8 },
	{ ID: 3076, Type: "WallDecoration", Style: "Vines2", Top: 0.15, Height: 0.8 },
	{ ID: 3100, Type: "WallDecoration", Style: "SilverShield" },
	{ ID: 3110, Type: "WallDecoration", Style: "CrossedSabers" },
	{ ID: 3120, Type: "WallDecoration", Style: "Window", Top: 0.2, Left: 0.1, Height: 0.80, Width: 0.80 },
	{ ID: 3121, Type: "WallDecoration", Style: "WindowNight", Top: 0.22, Left: 0.1, Height: 0.80, Width: 0.80 },
	{ ID: 3122, Type: "WallDecoration", Style: "StainedGlass", Top: 0.25, Left: 0.13, Height: 0.75, Width: 0.75 },
	// Master wall set (keep published IDs)
	{ ID: 3130, Type: "WallDecoration", Style: "WallShelf", Top: 0.1, Height: 0.76 },
	{ ID: 3131, Type: "WallDecoration", Style: "WallSconce", Top: 0.1, Left: 0.11, Height: 0.8, Width: 0.78 },
	{ ID: 3132, Type: "WallDecoration", Style: "CoatRack", Top: 0.1, Left: 0.1, Height: 0.8, Width: 0.79 },
	// Our wall set remapped off 3130-3132
	{ ID: 3133, Type: "WallDecoration", Style: "NordicAxesCrossed", Top: 0.1, Height: 0.85 },
	{ ID: 3134, Type: "WallDecoration", Style: "NordicShieldRound", Top: 0.1, Height: 0.85 },
	{ ID: 3135, Type: "WallDecoration", Style: "NordicShieldKnot", Top: 0.1, Height: 0.85 },
	{ ID: 3136, Type: "WallDecoration", Style: "NordicShieldAxes", Top: 0, Height: 1 },
	{ ID: 3137, Type: "WallDecoration", Style: "NordicDragonHeadLeft", Top: 0.1, Height: 0.85 },
	{ ID: 3138, Type: "WallDecoration", Style: "NordicDragonHeadRight", Top: 0.1, Height: 0.85 },
	{ ID: 3139, Type: "WallDecoration", Style: "ModernWallSconce", Top: 0.05, Height: 0.9 },
	{ ID: 3140, Type: "WallDecoration", Style: "ModernWallSconceDouble", Top: 0.05, Height: 0.9 },
	{ ID: 3200, Type: "School", Style: "SchoolBoard", CanPlaceOnWalls: true, CanPlaceOnFloors: false },
	{ ID: 3201, Type: "School", Style: "Clock",Top: 0.25, Left: 0.13, CanPlaceOnWalls: true, CanPlaceOnFloors: false, Height: 0.75, Width: 0.75 },
	{ ID: 3250, Type: "WallDecoration", Style: "FirstAidKit" },
	{ ID: 3260, Type: "WallDecoration", Style: "EyeTest" },
	{ ID: 3261, Type: "WallDecoration", Style: "Scroll", Left: 0.2, Top: 0.3, Height: 0.6, Width: 0.60 },
	{ ID: 3262, Type: "WallDecoration", Style: "Wanted", Left: 0.2, Top: 0.25, Height: 0.7, Width: 0.6 },
	{ ID: 3270, Type: "LivingRoom", Style: "Bookshelf", CanPlaceOnWalls: true, CanPlaceOnFloors: false },
	{ ID: 3275, Type: "WallDecoration", Style: "AirConditioner", Top: 0.27, Height: 0.8 },
	{ ID: 3280, Type: "Bathroom", Style: "ShowerHead", CanPlaceOnWalls: true, CanPlaceOnFloors: false },
	{ ID: 3290, Type: "Bathroom", Style: "EnemaHead", CanPlaceOnWalls: true, CanPlaceOnFloors: false },
	{ ID: 3301, Type: "WallDecoration", Style: "MonitorSmall" },
	{ ID: 3302, Type: "WallDecoration", Style: "MonitorBigLeft" },
	{ ID: 3303, Type: "WallDecoration", Style: "MonitorBigRight" },

	// <- right / west / 0
	{ ID: 3500, Type: "Functional", Style: "ConveyorBelt1", Top: 0, Left: 0,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBelt", 20, 2000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("West", 600),
		CanEnter: function(direction) { return direction !== "East"; }
	},
	// -> left / east / 270
	{ ID: 3501, Type: "Functional", Style: "ConveyorBelt1", Top: 0, Left: 0, Rotation: 180,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBelt", 20, 2000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("East", 600),
		CanEnter: function(direction) { return direction !== "West"; }
	},
	// v down / south / 180
	{ ID: 3502, Type: "Functional", Style: "ConveyorBelt1", Top: 0, Left: 0, Rotation: 270,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBelt", 20, 2000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("South", 600),
		CanEnter: function(direction) { return direction !== "North"; }
	},
	// ^ up / north / 90
	{ ID: 3503, Type: "Functional", Style: "ConveyorBelt1", Top: 0, Left: 0, Rotation: 90,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBelt", 20, 2000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("North", 600),
		CanEnter: function(direction) { return direction !== "South"; }
	},

	// <- right / west / 0
	{ ID: 3510, Type: "Functional", Style: "ConveyorBeltFast1", Top: 0, Left: 0,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBeltFast", 20, 1000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("West", 200),
		CanEnter: function(direction) { return direction !== "East"; }
	},
	// -> left / east / 270
	{ ID: 3511, Type: "Functional", Style: "ConveyorBeltFast1", Top: 0, Left: 0, Rotation: 180,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBeltFast", 20, 1000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("East", 200),
		CanEnter: function(direction) { return direction !== "West"; }
	},
	// v down / south / 180
	{ ID: 3512, Type: "Functional", Style: "ConveyorBeltFast1", Top: 0, Left: 0, Rotation: 270,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBeltFast", 20, 1000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("South", 200),
		CanEnter: function(direction) { return direction !== "North"; }
	},
	// ^ up / north / 90
	{ ID: 3513, Type: "Functional", Style: "ConveyorBeltFast1", Top: 0, Left: 0, Rotation: 90,
		BuildImageName: ChatRoomMapViewCreateAnimation("ConveyorBeltFast", 20, 1000, true),
		OnEnter: ChatRoomMapViewCreateOnEnterConveyorLogic("North", 200),
		CanEnter: function(direction) { return direction !== "South"; }
	},
	{ ID: 3520, Type: "Functional", Style: "SignWood", OnClick: ChatRoomMapViewCreateOnClickSignLogic("Wooden Sign"),  Top: -0.25},
	{ ID: 3521, Type: "Functional", Style: "SignWoodWall", CanPlaceOnWalls: true, CanPlaceOnFloors: false,Top: 0.1, OnClick: ChatRoomMapViewCreateOnClickSignLogic("Wooden Sign")},
	{ ID: 3522, Type: "Functional", Style: "SignMetal", OnClick: ChatRoomMapViewCreateOnClickSignLogic("Metal Sign"),  Top: -0.25},
	{ ID: 3523, Type: "Functional", Style: "SignMetalWall", CanPlaceOnWalls: true, CanPlaceOnFloors: false, Top: 0.1, OnClick: ChatRoomMapViewCreateOnClickSignLogic("Metal Sign")},

	{ ID: 3530, Type: "Functional", Style: "TeleportPad", Name: "Teleport Pad",
		DefaultObjectConfig: { Type: "Teleporter", Shared: true },
		BuildImageColor: (x, y) => {
			const preview = ChatRoomMapViewTeleportPadPreview;
			if (preview?.indexes.includes(MapCoordinatesToIndex(x, y))) return preview.color;
			return MapManager.Map.getTeleporterColor(x, y);
		},
		OnEnter: ChatRoomMapViewCreateOnEnterTeleportLogic(400),
		OnClick: ChatRoomMapViewCreateOnClickTeleportLogic(),
	},

	{ ID: 4010, Type: "WallPath", Style: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return true; } },
	{ ID: 4011, Type: "WallPath", Style: "WoodClosed", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.CanInteract(); } },
	{ ID: 4012, Type: "WallPath", Style: "WoodLocked", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.CanInteract() && ChatRoomPlayerIsAdmin(); } },
	{ ID: 4013, Type: "WallPath", Style: "WoodLockedBronze", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.HasMapState("BronzeKey"); } },
	{ ID: 4014, Type: "WallPath", Style: "WoodLockedSilver", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.HasMapState("SilverKey"); } },
	{ ID: 4015, Type: "WallPath", Style: "WoodLockedGold", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.HasMapState("GoldKey"); } },
	{ ID: 4016, Type: "WallPath", Style: "WoodClosedAuto", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return true; } },
	{ ID: 4017, Type: "WallPath", Style: "WoodClosedAutoUp", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function(Direction) { return Direction === "North" || Direction === ""; } },
	{ ID: 4018, Type: "WallPath", Style: "WoodClosedAutoDown", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function(Direction) { return Direction === "South" || Direction === ""; } },
	{ ID: 4020, Type: "WallPath", Style: "Metal", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function() { return true; } },
	{ ID: 4021, Type: "WallPath", Style: "MetalUp", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function(Direction) { return Direction === "North" || Direction === "";  } },
	{ ID: 4022, Type: "WallPath", Style: "MetalDown", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function (Direction) { return Direction === "South" || Direction === ""; } },
	{ ID: 4023, Type: "WallPath", Style: "MetalLockedBronze", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function () { return Player.HasMapState("BronzeKey"); } },
	{ ID: 4024, Type: "WallPath", Style: "MetalLockedSilver", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function () { return Player.HasMapState("SilverKey"); } },
	{ ID: 4025, Type: "WallPath", Style: "MetalLockedGold", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function () { return Player.HasMapState("GoldKey"); } },
	{ ID: 4030, Type: "WallPath", Style: "BrownDoor", OccupiedStyle: "BrownDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4031, Type: "WallPath", Style: "BrownDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4032, Type: "WallPath", Style: "RoyalDoor", OccupiedStyle: "RoyalDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4033, Type: "WallPath", Style: "RoyalDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4034, Type: "WallPath", Style: "SteelDoor", OccupiedStyle: "SteelDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4035, Type: "WallPath", Style: "SteelDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4036, Type: "WallPath", Style: "GrayDoor", OccupiedStyle: "GrayDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4037, Type: "WallPath", Style: "GrayDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4038, Type: "WallPath", Style: "BrownDoorAuto", OccupiedStyle: "BrownDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4039, Type: "WallPath", Style: "SteelDoorAuto", OccupiedStyle: "SteelDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4040, Type: "WallPath", Style: "GrayDoorAuto", OccupiedStyle: "GrayDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },

	{ ID: 4501,  Type: "FloorFoamTiles", Style: "PlayTileWhite", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4502,  Type: "FloorFoamTiles", Style: "PlayTileGray", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4503,  Type: "FloorFoamTiles", Style: "PlayTileBlack", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4504,  Type: "FloorFoamTiles", Style: "PlayTileBlue", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4505,  Type: "FloorFoamTiles", Style: "PlayTileGreen", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4506,  Type: "FloorFoamTiles", Style: "PlayTileRed", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4507,  Type: "FloorFoamTiles", Style: "PlayTileYellow", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4508,  Type: "FloorFoamTiles", Style: "PlayTileOrange", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4509,  Type: "FloorFoamTiles", Style: "PlayTilePurple", Top: -0.10, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4510,  Type: "FloorFoamTiles", Style: "PlayTilePink", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4511,  Type: "FloorFoamTiles", Style: "PlayTileBrown", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },
	{ ID: 4512,  Type: "FloorFoamTiles", Style: "PlayTileLightBlue", Top: -0.1, Left: -0.1, Height: 1.1, Width: 1.1 },

	{ ID: 5010, Type: "Banners", Style: "Red", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5011, Type: "Banners", Style: "Blue", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5012, Type: "Banners", Style: "Green", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5013, Type: "Banners", Style: "Yellow", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5014, Type: "Banners", Style: "Black", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5015, Type: "Banners", Style: "PaladinBanner", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5016, Type: "Banners", Style: "ServiOrdinisBanner", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5017, Type: "Banners", Style: "BellflowerBanner", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5018, Type: "Banners", Style: "BondageClub", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5019, Type: "Banners", Style: "Inquisition", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5020, Type: "Banners", Style: "MagesSacrosanctorum", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5021, Type: "Banners", Style: "MaidSorority", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5022, Type: "Banners", Style: "Priesthood", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
	{ ID: 5023, Type: "Banners", Style: "VoidOrder", Top: 0.25, Left: 0.25, Height: 0.6, Width: 0.50, },
];