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

import { ChatRoomMapViewGetObjectAtPos, ChatRoomMapViewGetConnectivityDirections, CurrentTime } from "./defs.ts";

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
	HasEffect: (_effect: string) => true,
	CanInteract: () => true,
};

const ChatRoomPlayerIsAdmin = () => false;

// Taken from BC (with just conversion into TS syntax)
export const ChatRoomMapViewTileList: ChatRoomMapTile[] = [
	{ ID: 100, Type: "Floor", Style: "OakWood" },
	{ ID: 110, Type: "Floor", Style: "Stone" },
	{ ID: 115, Type: "Floor", Style: "Pavement" },
	{ ID: 120, Type: "Floor", Style: "Ceramic" },
	{ ID: 121, Type: "Floor", Style: "CeramicDark" },
	{ ID: 130, Type: "Floor", Style: "CarpetPink" },
	{ ID: 131, Type: "Floor", Style: "CarpetBlue" },
	{ ID: 132, Type: "Floor", Style: "CarpetRed" },
	{ ID: 140, Type: "Floor", Style: "Padded" },
	{ ID: 150, Type: "Floor", Style: "LatexFloor" },
	{ ID: 160, Type: "Floor", Style: "Tile" },
	{ ID: 170, Type: "Floor", Style: "HexBlue" },
	{ ID: 171, Type: "Floor", Style: "HexPurple" },
	{ ID: 172, Type: "Floor", Style: "Machine" },
	{ ID: 199, Type: "Floor", Style: "HalfWall", BlockVision: true, CanEnter: () => false, },

	{ ID: 200, Type: "FloorExterior", Style: "Dirt" },
	{ ID: 210, Type: "FloorExterior", Style: "Grass" },
	{ ID: 215, Type: "FloorExterior", Style: "LongGrass" },
	{ ID: 220, Type: "FloorExterior", Style: "Sand" },
	{ ID: 230, Type: "FloorExterior", Style: "Gravel" },
	{ ID: 235, Type: "FloorExterior", Style: "Asphalt" },
	{ ID: 240, Type: "FloorExterior", Style: "Snow" },
	{ ID: 250, Type: "FloorExterior", Style: "StoneSquareGray" },
	{ ID: 260, Type: "FloorExterior", Style: "ScatteredLeaves" },
	{ ID: 270, Type: "FloorExterior", Style: "ScatteredLeavesDirt" },
	{ ID: 280, Type: "FloorExterior", Style: "ScatteredLeavesThick" },

	{ ID: 1000, Type: "Wall", Style: "MixedWood", BlockVision: true, CanEnter: () => false, },
	{ ID: 1001, Type: "Wall", Style: "CedarWood", BlockVision: true, CanEnter: () => false, },
	{ ID: 1010, Type: "Wall", Style: "Log", BlockVision: true, CanEnter: () => false, },
	{ ID: 1020, Type: "Wall", Style: "Japanese", BlockVision: true, CanEnter: () => false, },
	{ ID: 1030, Type: "Wall", Style: "Stone", BlockVision: true, CanEnter: () => false, },
	{ ID: 1040, Type: "Wall", Style: "Brick", BlockVision: true, CanEnter: () => false, },
	{ ID: 1050, Type: "Wall", Style: "Dungeon", BlockVision: true, CanEnter: () => false, },
	{ ID: 1060, Type: "Wall", Style: "Square", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1070, Type: "Wall", Style: "Steel", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1080, Type: "Wall", Style: "Padded", BlockVision: true, BlockHearing: true, CanEnter: () => false, },
	{ ID: 1090, Type: "Wall", Style: "Tile", BlockVision: true, CanEnter: () => false, },
	{ ID: 1100, Type: "Wall", Style: "Lattice", BlockVision: true, CanEnter: () => false, },
	{ ID: 1200, Type: "Wall", Style: "HexBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1201, Type: "Wall", Style: "HexPurple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1202, Type: "Wall", Style: "PipeBlue", BlockVision: true, CanEnter: () => false, },
	{ ID: 1203, Type: "Wall", Style: "PipePurple", BlockVision: true, CanEnter: () => false, },
	{ ID: 1204, Type: "Wall", Style: "SteelBlack", BlockVision: true, CanEnter: () => false, },
	{ ID: 1205, Type: "Wall", Style: "SteelGary", BlockVision: true, CanEnter: () => false, },

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

export const ChatRoomMapViewObjectList: ChatRoomMapObject[] = [

	{ ID: 100, Type: "FloorDecoration", Style: "Blank" },
	{ ID: 110, Type: "FloorDecoration", Style: "EntryFlag", Top: -0.125, Exit: true, Unique: true },
	{ ID: 115, Type: "FloorDecoration", Style: "ExitFlag", Top: -0.125, Exit: true },
	{ ID: 120, Type: "FloorDecoration", Style: "BedTeal", Top: -0.25, AssetName: "Bed", AssetGroup: "ItemDevices"},
	{ ID: 130, Type: "FloorDecoration", Style: "PillowPink" },
	{ ID: 140, Type: "FloorDecoration", Style: "TableBrown" },
	{ ID: 151, Type: "FloorDecoration", Style: "ChairWood", Top: -0.5, Height: 1.5 },
	{ ID: 150, Type: "FloorDecoration", Style: "ThroneRed", Top: -1, Height: 2 },
	{ ID: 160, Type: "FloorDecoration", Style: "KeyBronze", OnEnter: function(){ Player.MapData.PrivateState.HasKeyBronze = true; }, IsVisible: function(){ return !Player.MapData.PrivateState.HasKeyBronze; } },
	{ ID: 162, Type: "FloorDecoration", Style: "KeySilver", OnEnter: function(){ Player.MapData.PrivateState.HasKeySilver = true; }, IsVisible: function(){ return !Player.MapData.PrivateState.HasKeySilver; } },
	{ ID: 164, Type: "FloorDecoration", Style: "KeyGold" , OnEnter: function(){ Player.MapData.PrivateState.HasKeyGold = true; }, IsVisible: function(){ return !Player.MapData.PrivateState.HasKeyGold; } },
	{ ID: 165, Type: "FloorDecoration", Style: "VikingChair" , Top: -0.5, Height: 2 },
	{ ID: 166, Type: "FloorDecoration", Style: "Bed" , Top: -0.82, Left: 0.05, Height: 1.8, Width: 0.90, AssetName: "Bed", AssetGroup: "ItemDevices" },
	{ ID: 170, Type: "FloorDecoration", Style: "Stairs" , Top: 0, Left: 0 },
	{ ID: 180, Type: "FloorDecoration", Style: "AirConditioner" , Top: 0, Left: 0 },


	{ ID: 200, Type: "FloorDecorationThemed", Style: "Blank" },
	{ ID: 210, Type: "FloorDecorationThemed", Style: "TeacherDesk", Top: -0.25 },
	{ ID: 220, Type: "FloorDecorationThemed", Style: "StudentDesk", Top: -0.1 },
	{ ID: 250, Type: "FloorDecorationThemed", Style: "SinkDishes", Top: -0.35 },
	{ ID: 260, Type: "FloorDecorationThemed", Style: "LaundryMachine", Top: -0.55, Height: 1.25 },
	{ ID: 270, Type: "FloorDecorationThemed", Style: "IroningBoard", Top: -0.35 },
	{ ID: 300, Type: "FloorDecorationThemed", Style: "ShibariFrame", Top: -1, Height: 2 },
	{ ID: 310, Type: "FloorDecorationThemed", Style: "JapaneseTable", Top: -0.1 },
	{ ID: 320, Type: "FloorDecorationThemed", Style: "BanzaiTree", Top: -0.1 },
	{ ID: 350, Type: "FloorDecorationThemed", Style: "MedicalDesk", Top: -0.15 },
	{ ID: 370, Type: "FloorDecorationThemed", Style: "Toilet", Top: -0.65, Left: 0.05, Height: 1.5, Width: 0.9 },
	{ ID: 380, Type: "FloorDecorationThemed", Style: "DeskBlue" },
	{ ID: 381, Type: "FloorDecorationThemed", Style: "DeskPurple" },
	{ ID: 382, Type: "FloorDecorationThemed", Style: "ConsoleLeft", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 383, Type: "FloorDecorationThemed", Style: "ConsoleRight", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 384, Type: "FloorDecorationThemed", Style: "LongDeskLeft", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 385, Type: "FloorDecorationThemed", Style: "LongDeskRight", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 386, Type: "FloorDecorationThemed", Style: "Cabinet", Top: -0.9, Left: 0, Height: 2, Width: 1 },
	{ ID: 387, Type: "FloorDecorationThemed", Style: "Television", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 388, Type: "FloorDecorationThemed", Style: "TelevisionBack", Top: -0.3, Left: 0, Height: 1.3, Width: 1 },
	{ ID: 389, Type: "FloorDecorationThemed", Style: "Wardrobe", Top: -0.9, Left: 0, Height: 2, Width: 1 },
	{ ID: 390, Type: "FloorDecorationThemed", Style: "StandingBellflowerBanner", Top: -1.1, Left: 0.15, Height: 1.7, Width: 0.7 },
	{ ID: 391, Type: "FloorDecorationThemed", Style: "BondageClubBanner", Top: -1.1, Left: 0.15, Height: 1.7, Width: 0.7 },
	{ ID: 392, Type: "FloorDecorationThemed", Style: "VoidOrderBanner", Top: -0.9, Left: 0.13, Height: 1.5, Width: 0.7 },
	{ ID: 393, Type: "FloorDecorationThemed", Style: "KatanaOnStand", Top: -0.4, Left: 0.1, Height: 1.0, Width: 0.8 },
	{ ID: 394, Type: "FloorDecorationThemed", Style: "MagicMark", Top: 0.03, Left: 0.05, Height: 0.9, Width: 0.9 },

	{ ID: 500, Type: "FloorDecorationParty", Style: "Blank" },
	{ ID: 510, Type: "FloorDecorationParty", Style: "BalloonFiveColor", Top: -0.6, Height: 1.5 },
	{ ID: 511, Type: "FloorDecorationParty", Style: "BalloonTwoHeart", Top: -0.15 },
	{ ID: 520, Type: "FloorDecorationParty", Style: "WeddingCake", Top: -1, Height: 2 },
	{ ID: 521, Type: "FloorDecorationParty", Style: "WeddingArch", Top: -1, Height: 2 },
	{ ID: 530, Type: "FloorDecorationParty", Style: "FlowerVasePink", Top: -0.33 },
	{ ID: 560, Type: "FloorDecorationParty", Style: "BeachUmbrellaStripe", Top: -1.1, Height: 2 },
	{ ID: 570, Type: "FloorDecorationParty", Style: "BeachTowelStripe" },
	{ ID: 580, Type: "FloorDecorationParty", Style: "Speaker", Top: -1.2, Height: 1.85 },
	{ ID: 590, Type: "FloorDecorationParty", Style: "Presents", Top: 0.25, Height: 0.50 },

	{ ID: 600, Type: "FloorDecorationCamping", Style: "Blank" },
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
	{ ID: 620, Type: "FloorDecorationCamping", Style: "LogSingle", Top: -0.2 },
	{ ID: 630, Type: "FloorDecorationCamping", Style: "TentBlue", Top: -0.3 },
	{ ID: 640, Type: "FloorDecorationCamping", Style: "SleepingBagBlue" },
	{ ID: 650, Type: "FloorDecorationCamping", Style: "ChairRed", Top: -0.35 },
	{ ID: 660, Type: "FloorDecorationCamping", Style: "Hurdle1", CanEnter: () => !Player.HasEffect("Freeze") },
	{ ID: 670, Type: "FloorDecorationCamping", Style: "Hurdle2", CanEnter: () => !Player.HasEffect("Freeze") && !Player.HasEffect("Slow") },
	{ ID: 680, Type: "FloorDecorationCamping", Style: "Hurdle3" },

	{ ID: 700, Type: "FloorDecorationExpanding", Style: "Blank" },
	{
		ID: 710,
		Type: "FloorDecorationExpanding",
		Style: "CouchPinkPreview",
		BuildImageName: function(X, Y) {
			let LeftObject = ChatRoomMapViewGetObjectAtPos(X - 1, Y);
			let RightObject = ChatRoomMapViewGetObjectAtPos(X + 1, Y);
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
			let LeftObject = ChatRoomMapViewGetObjectAtPos(X - 1, Y);
			let RightObject = ChatRoomMapViewGetObjectAtPos(X + 1, Y);
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
			let LeftObject = ChatRoomMapViewGetObjectAtPos(X - 1, Y);
			let RightObject = ChatRoomMapViewGetObjectAtPos(X + 1, Y);
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
			let LeftObject = ChatRoomMapViewGetObjectAtPos(X - 1, Y);
			let RightObject = ChatRoomMapViewGetObjectAtPos(X + 1, Y);
			if ((LeftObject != null) && (LeftObject.ID == this.ID) && ((RightObject != null) && (RightObject.ID == this.ID))) return "VikingTableMiddle";
			if ((LeftObject != null) && (LeftObject.ID == this.ID)) return "VikingTableRight";
			if ((RightObject != null) && (RightObject.ID == this.ID)) return "VikingTableLeft";
			return "VikingTableSmall";
		},
		Top: -0.25,
		Height: 1.25,
		Transparency: 1,
		TransparencyCutoutHeight: 0.96
	},
	{
		ID: 750,
		Type: "FloorDecorationExpanding",
		Style: "RailroadPreview", // The image shown in the map editor palette
		BuildImageName: function(X, Y) {
			// Get the connections as True/False
			let directions = ChatRoomMapViewGetConnectivityDirections(X, Y, (tX, tY) => {
				const neighbor = ChatRoomMapViewGetObjectAtPos(tX, tY);
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
	{ ID: 800, Type: "FloorDecorationAnimal", Style: "Blank" },
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

	{ ID: 1000, Type: "FloorItem", Style: "Blank" },
	{ ID: 1010, Type: "FloorItem", Style: "Kennel", Top: -1, Height: 2, AssetName: "Kennel", AssetGroup: "ItemDevices" },
	{ ID: 1020, Type: "FloorItem", Style: "X-Cross", Top: -1, Height: 2, AssetName: "X-Cross", AssetGroup: "ItemDevices" },
	{ ID: 1030, Type: "FloorItem", Style: "BondageBench", Top: -1, Height: 2, AssetName: "BondageBench", AssetGroup: "ItemDevices" },
	{ ID: 1040, Type: "FloorItem", Style: "Trolley", Top: -1, Height: 2, AssetName: "Trolley", AssetGroup: "ItemDevices" },
	{ ID: 1050, Type: "FloorItem", Style: "Locker", Top: -1, Height: 2, AssetName: "Locker", AssetGroup: "ItemDevices" },
	{ ID: 1060, Type: "FloorItem", Style: "WoodenBox", Top: -1, Height: 2, AssetName: "WoodenBox", AssetGroup: "ItemDevices" },
	{ ID: 1070, Type: "FloorItem", Style: "Coffin", Top: -1.2, Height: 1.85, AssetName: "Coffin", AssetGroup: "ItemDevices" },
	{ ID: 1080, Type: "FloorItem", Style: "TheDisplayFrame", Top: -1, Height: 2, AssetName: "TheDisplayFrame", AssetGroup: "ItemDevices" },
	{ ID: 1090, Type: "FloorItem", Style: "Pole", Top: -0.85, Height: 1.8, AssetName: "Pole", AssetGroup: "ItemDevices" },
	{ ID: 1095, Type: "FloorItem", Style: "MedicalBed", Top: -0.82, Left: 0.05, Height: 1.8, Width: 0.90, AssetName: "MedicalBed", AssetGroup: "ItemDevices" },
	{ ID: 1096, Type: "FloorItem", Style: "FuturisticCrate", Top: -0.95, Height: 2, AssetName: "FuturisticCrate", AssetGroup: "ItemDevices" },

	{ ID: 1100, Type: "FloorNumber", Style: "Blank" },
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

	{ ID: 1200, Type: "FloorLetter", Style: "Blank" },
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

	{ ID: 1300, Type: "FloorIcon", Style: "Blank" },
	{ ID: 1301, Type: "FloorIcon", Style: "IconCircle" },
	{ ID: 1302, Type: "FloorIcon", Style: "IconSquare" },
	{ ID: 1303, Type: "FloorIcon", Style: "IconTriangle" },
	{ ID: 1304, Type: "FloorIcon", Style: "IconCross" },
	{ ID: 1305, Type: "FloorIcon", Style: "IconDiamond" },
	{ ID: 1306, Type: "FloorIcon", Style: "IconArrowUp" },
	{ ID: 1307, Type: "FloorIcon", Style: "IconArrowDown" },
	{ ID: 1308, Type: "FloorIcon", Style: "IconArrowLeft" },
	{ ID: 1309, Type: "FloorIcon", Style: "IconArrowRight" },

	{ ID: 2000, Type: "FloorObstacle", Style: "Blank", CanEnter: () => false, },
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
			let LeftObject = ChatRoomMapViewGetObjectAtPos(x - 1, y);
			let RightObject = ChatRoomMapViewGetObjectAtPos(x + 1, y);
			if ((LeftObject != null) && (LeftObject.ID == this.ID) && ((RightObject != null) && (RightObject.ID == this.ID))) return "VelourRopeBarrierMiddle";
			if ((LeftObject != null) && (LeftObject.ID == this.ID)) return "VelourRopeBarrierRight";
			if ((RightObject != null) && (RightObject.ID == this.ID)) return "VelourRopeBarrierLeft";
			return "VelourRopeBarrier";
		},
		Top: -0.35
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
	{ ID: 2098, Type: "FloorObstacle", Style: "Pillar", Top: -1.25, Left: 0.16, Height: 2, Width: 0.70, CanEnter: () => false, },

	{ ID: 3000, Type: "WallDecoration", Style: "Blank" },
	{ ID: 3010, Type: "WallDecoration", Style: "Painting" },
	{ ID: 3020, Type: "WallDecoration", Style: "Mirror" },
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
	{ ID: 3050, Type: "WallDecoration", Style: "Fireplace" },
	{ ID: 3060, Type: "WallDecoration", Style: "Stocking",Top: 0.35, Left: 0.25, Height: 0.5, Width: 0.5 },
	{ ID: 3070, Type: "WallDecoration", Style: "Moss", Top: 0.15, Height: 0.8 },
	{ ID: 3075, Type: "WallDecoration", Style: "Vines", Top: 0.15, Height: 0.8 },
	{ ID: 3076, Type: "WallDecoration", Style: "Vines2", Top: 0.15, Height: 0.8 },
	{ ID: 3100, Type: "WallDecoration", Style: "SilverShield" },
	{ ID: 3110, Type: "WallDecoration", Style: "CrossedSabers" },
	{ ID: 3120, Type: "WallDecoration", Style: "Window", Top: 0.2, Left: 0.1, Height: 0.80, Width: 0.80 },
	{ ID: 3121, Type: "WallDecoration", Style: "WindowNight", Top: 0.22, Left: 0.1, Height: 0.80, Width: 0.80 },
	{ ID: 3122, Type: "WallDecoration", Style: "StainedGlass", Top: 0.25, Left: 0.13, Height: 0.75, Width: 0.75 },
	{ ID: 3200, Type: "WallDecoration", Style: "SchoolBoard" },
	{ ID: 3250, Type: "WallDecoration", Style: "FirstAidKit" },
	{ ID: 3260, Type: "WallDecoration", Style: "EyeTest" },
	{ ID: 3261, Type: "WallDecoration", Style: "Scroll", Left: 0.2, Top: 0.3, Height: 0.6, Width: 0.60 },
	{ ID: 3262, Type: "WallDecoration", Style: "Wanted", Left: 0.2, Top: 0.25, Height: 0.7, Width: 0.6 },
	{ ID: 3270, Type: "WallDecoration", Style: "Bookshelf" },
	{ ID: 3275, Type: "WallDecoration", Style: "AirConditioner", Top: 0.27, Height: 0.8 },
	{ ID: 3280, Type: "WallDecoration", Style: "ShowerHead" },
	{ ID: 3290, Type: "WallDecoration", Style: "EnemaHead" },
	{ ID: 3301, Type: "WallDecoration", Style: "MonitorSmall" },
	{ ID: 3302, Type: "WallDecoration", Style: "MonitorBigLeft" },
	{ ID: 3303, Type: "WallDecoration", Style: "MonitorBigRight" },


	{ ID: 4000, Type: "WallPath", Style: "Blank", CanEnter: function() { return false; } },
	{ ID: 4010, Type: "WallPath", Style: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return true; } },
	{ ID: 4011, Type: "WallPath", Style: "WoodClosed", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.CanInteract(); } },
	{ ID: 4012, Type: "WallPath", Style: "WoodLocked", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.CanInteract() && ChatRoomPlayerIsAdmin(); } },
	{ ID: 4013, Type: "WallPath", Style: "WoodLockedBronze", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.MapData.PrivateState.HasKeyBronze == true; } },
	{ ID: 4014, Type: "WallPath", Style: "WoodLockedSilver", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.MapData.PrivateState.HasKeySilver == true; } },
	{ ID: 4015, Type: "WallPath", Style: "WoodLockedGold", OccupiedStyle: "WoodOpen", Top: -1, Height: 2, CanEnter: function() { return Player.MapData.PrivateState.HasKeyGold == true; } },
	{ ID: 4020, Type: "WallPath", Style: "Metal", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function() { return true; } },
	{ ID: 4021, Type: "WallPath", Style: "MetalUp", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function(Direction) { return Direction === "U" || Direction === "";  } },
	{ ID: 4022, Type: "WallPath", Style: "MetalDown", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function (Direction) { return Direction === "D" || Direction === ""; } },
	{ ID: 4023, Type: "WallPath", Style: "MetalLockedBronze", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function () { return Player.MapData.PrivateState.HasKeyBronze == true; } },
	{ ID: 4024, Type: "WallPath", Style: "MetalLockedSilver", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function () { return Player.MapData.PrivateState.HasKeySilver == true; } },
	{ ID: 4025, Type: "WallPath", Style: "MetalLockedGold", OccupiedStyle: "MetalOpen", Top: -1, Height: 2, CanEnter: function () { return Player.MapData.PrivateState.HasKeyGold == true; } },
	{ ID: 4030, Type: "WallPath", Style: "BrownDoor", OccupiedStyle: "BrownDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4031, Type: "WallPath", Style: "BrownDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4032, Type: "WallPath", Style: "RoyalDoor", OccupiedStyle: "RoyalDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4033, Type: "WallPath", Style: "RoyalDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4034, Type: "WallPath", Style: "SteelDoor", OccupiedStyle: "SteelDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4035, Type: "WallPath", Style: "SteelDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },
	{ ID: 4036, Type: "WallPath", Style: "GrayDoor", OccupiedStyle: "GrayDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return Player.CanInteract(); } },
	{ ID: 4037, Type: "WallPath", Style: "GrayDoorOpen", Top: -0.55, Height: 1.55, Left: 0.06, Width: 0.85, CanEnter: function () { return true; } },


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