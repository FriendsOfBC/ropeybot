/*
 * Copied from the original bot hub, with permission.
 */

import { wait } from "../utils";

const SUPERUSERS: number[] = [];

import _ from "lodash";
import fs from "fs";
import { LoggingLogic } from "./loggingLogic";
import { API_Character, API_AppearanceItem, AssetGet, BC_AppearanceItem, logger, API_Connector, AnyCharacterEvent, BC_Server_ChatRoomMessage, JMod_allowApplyAppearanceBundle, JMod_importAppearanceBundle, JMod_exportAppearanceBundle, JMod_applyAppearanceBundle } from "bc-bot";

/** The following enums are structuring the overall story scene and have values that
 * mean "Chapter-Part-Branch" with nomenclature [C00-C99]-[P00-P99]-[A-Z]-[*] or END */
enum StoryProgress {
	/** Beginning */
	introduction = "C00",
	/** The club party */
	theParty = "C01",
	/** Any end */
	theEnd = "END"
}

enum IntroductionProgress {
	/** Player meets the head maid after entering the club */
	meetingTheHeadMaid = "C00-P01",
	/** Head maid expects player to strip before giving her the assignment */
	acceptingTheAssignmentStrip = "C00-P02-A-Strip",
	/** Player gets a special assignment by the head maid */
	acceptingTheAssignment = "C00-P02-A",
	/** Player refuses the special assignment and faces a punishment */
	refusingTheAssignment = "C00-P02-B",
	/** Player gets tied up and equipped for the party */
	gettingReady = "C00-P03-A",
	/** Player faces a punishment with the paddle for wasting everyone's time */
	recievingPunishment = "C00-P03-B",
	/** After introduction ended */
	end = "END"
}

enum ThePartyProgress {
	/** Player arrives freshly at the party */
	arrivingAtTheParty = "C01-P01",
}

enum TeasingLadyProgress {
	notMet = "00",
	meetingForTheFirstTime = "01",
	meetingForTheSecondTime = "02"
}

type EventPosition =
	| "introduction"
	| "party_entrance"
	| "teasing_lady_entrance";

type UsedRoomBackgrounds =
	| "SynthWave"
	| "MaidQuarters"
	| "SlumCellar"
	| "MainHall"
	| "NightClub";

const listOfUsedItemsInThisScene: ([AssetGroupName, string] | [AssetGroupName, string, string])[] = [
	["ItemHandheld", "Paddle"],
	["ItemMouth", "DusterGag"],
	["ItemArms", "LeatherArmbinder", "WrapStrap"],
	["ItemMouth", "BallGag", "Shiny"],
	["ItemMisc", "ServingTray"]
];

const listOfUsedItemGroups = _.uniq(listOfUsedItemsInThisScene.map(i => i[0]));

const listOfAllPlayerOutfits: Record<string, string> = {
	"playerCasual": "NobwRAcghgtgpmAXGAQlAdgEzlArgRjABowBxAJwHtcAHJVcqYsAYUoBtLz6AROAMzzsALmAC+RcNHj0AChmEBLOAGd8AZmYVqdZPPRLVzNp26JgYAMQAmdbdtgAuhKmwEyAMoALau2zl2VRUAFUo6Em1aehZOYS9jDi4kC0sAVhQABhYspxdIN3pvSlUAFi0qKM8fIxITJPMra3x8VJbcyXyZT2FKAGMAa0V0AHM1cp1Cvv6VBNNkqxQADgB2AFE19tcu1livD0HyYUIIit0dyjiAGUoAdzhuWsSzFOsAQXwUD9zHIA",
	"playerStandardMaid": "NobwRAcghgtgpmAXGAClAdgFwJZwM4DsYANGAOIBOA9gK4AOSqGO+JYAwlQDZUWMDEARnbDhYAL7Fw0eIwDKmKgGMA1tnQBzPILaVaDZHOUq8bTjz7IAInABmUGl0wSpkWAmQAhClB2k99IzeUGbcvAKinoKeLtLujAAScHBceABMutSBhgAWVKyk5uHIQgDMguWlsW6yyACyUNgAJgDyNJi22Jh+5FkGHDyYOaEWjDb2js6ScbVgDc0JjRQARhhNPQH9i86FYZZg4w5O1TIeHFCYeDRdmfqMZDwAbgUce0jAYPwAnAAMAIIAFkBYAAuuIQUA===",
	"playerSkimpyMaid": "NobwRAcghgtgpmAXGAEnOAbAzgJjAGjAHEAnAewFcAHJMAZQAsy4sCwBhMjMk2gYhwA2AAyjhYAL75w0eLQCyUAJYATFMpIAjKADsVARjalKNZOoAubTt16JgYPgHZRATmEAhMAF0pM2AmQ6czIAYwBrJR0AcywAFiNyalo6ULDWQmseJHsBAGZhfNzvX0h/ZPMKFRU4NSgSHRZ04kTTMHcSKCsuLLsHAFFY4Rwh4ulSuWROEiw4cyLCYyTJnhnLDO7bHMcADmERQVG/CY4ocywKJTXmk1oibgA3Fi6bbIdt/P3D8YCwRVUAQSo5B0eAWLVo7G45gYzx6OUE/2E7CRX1kPyClTgOnMAHkKOYAGaXXLuMgAd0MYJukyhDH+IRCjR4AE9YZsHAARfLuDyosrICBwcIYKCMynXJaQIVhEWMtmvPgubb6YQqvnHABScF0dAiJCui1akLI0IAMuS4Lx1i9enxcrsAKzCB3FLxAA=="
};

const listOfAllNPCsOutfits: Record<string, string> = {
	"defaultBot": "NobwRAcghgtgpmAXGASnA5gVwDZQE5gA0YA4ngPaYAOSYAspQC4AWRYAwuduQYsGAGIAogHYRAMQlgAugF9C4aPFoAFTAGd1ATwAyAS3TNGARjZlKNZGs1aw8xbATIAQtg2ti56rVfu7CyEdacTc9ABN1MwpvZBDMcMj7QOVkIRhyRj0AY3IAOyiLWjSM7Lz/BxSwIS04ACMKAHd1U09oyyqa+vIm8uSnMAAROAAzKBxGApiwAAkoXIjepX6h0fHJ9um4KDDFoOQIPSoqbDhm9doDo5PEgKWimuaAJnPUh7ZObl5BAGZvqChfrtKtVTsZnq1Cq9TuCOFweLQBL9/oCkndkNMAAwATgALBiXjM4AYjED+gBlGBQbDYAnOchhLQAVSOcAIxA+8OQAHVmHpGAhUXswBSqTSIVM6QydN1WaTaLM9HhxBRciYCQqlSqJuy4V8BAA2AH6x4ADjl6KgiucUCyAGsWqQ2vLLXhrXbzcLGJgwnBVQB5TCMYZ8mFedrsbgsd66pD8ATGLEJhMyQWVHRQfkADzJ5DtZ3F7Rzeejn1jgmMOIrFZTtyFdIy+cdkOFzHIpxLnLjGIArD2e2wBH3e92B8YAIJJrE1ir9ZysuBqgvO7Ww0t8cv64yb/XTvq0Mlen3+wPBxjfOkNB1h2gRjLMMdZLKndQ8Ww6tdx74ic9f3dosAAJKqqyNqZAAbnAABqegvmyTZTAB/IwJs2wdrwcbdvqQjOL2MjECoFBUKyjC2Ig4AACpaERSC5Dg2DEEIwzDHAWQTHwcipv0GohDKeBXk6FqKg+T6aK+3xoWWiLfiav5yLWaYZnAmZCNgtTdCQ3AQZES7IBp5BaRJ65SY8Jk4n+QriIGmB4DBmRZHQfL8rk2nwe0iFwMhcwLO+naCJWOKPJWA7nhIjzsKOzjGJFzhsCsYzYBM0j4YRxGkRRVH9HpBnEAMehMdk4ykRiDFMSxbHAElwpwNgwyMrk3DuogjB4JgcCyLI0hAA=",
	"headMaidKarina": "NobwRAcghgtgpmAXGASnA5gVwDZQE5gA0YA4ngPaYAOSYAspQC4AWRYAChVXHowJ5JwAUQAeVPHADOkgJbkAdrQDKMGXgDWYAL5bC4aPFrtM0vgBkZ6ZowCMbMpRrJjp7XsiwEyAELYTrYgdqWl9/Nk5ybl4BRGExCWk5RUR5HGwddwMvMAAxPxkAE0l7CmDkPMxC4uIIqP5BMFFxKVkFJFTsdN19T1ohGHJGGQBjNsDSp0aBodHFGq4eetjG+Jak9rSMnsNkIT44ACMKAHdJO3HHPv2j8lPwheiGpoTW5I6uzN7kABE4ADMoDhGCVLsgABJQeRFNzbbK/AFAkFlMBguBQAowjw7SAyKhUbBSc6kCa0CC4/FSTFZWgQtTeKDDdREoKTWl4emMqlfDiQoaEgBMSMm7F5MkpxAAwuRsOQCMgAMQAFmVKq52KU5EZkgAbELlJr1NUwFKZXLgGB5QAGb7W61seGA7DAgC63Sx2TBloAnAAOS168FwSzWNUeqBqHIUeSML0BlHhvCRhTAyXS2W0eVerPZ0Ok2UwKDYOPecgFcy3Hi55AQfOF4ulvgAVTxldTptoAHVmDJGAg3dTdvtJLGLsi9uLjWm5RbtbO51XGkOR8TQYupIK2+mFXP5/3uXRwwUAPKYRh/HvMknICUylhsE1b83ygDsEufQnfYFdn2xZigvZEIRsAOW4SBlAA3CcWVoMDyEgo0HzNGdvm1CVUK/PdsTAqBpCkXVR0mbDcIQqcMwAZktCiKIXA9CjZA5IQKS9VwhYFMI9OA4GwSQNxXZElGYcgJ0QpAn2zZ8vWfDCf2ybw8CgZjkTkqB71IxAnxyH0cgAVh06TYVoSMZE6PgAEFxDGPjJhvQZmFM4ZhhaWUBE3JCX1M58fU8jDnSAA=",
	"trixie": "NobwRAcghgtgpmAXGASnA5gVwDZQE5gA0YA4ngPaYAOSYAspQC4AWRYAChVXHowJ5JwAUQAeVPHADOkgJbkAdrQDKMGXgDWYAL5bC4aPFrtM0vgBkZ6ZowCMbMpRrJjp7XsiwEyAELYTrYgdqWl9/Nk5ybl4BRGExCWk5RUR5HGwddwMvMAAxPxkAE0l7CmDkPMxC4uIIqP5BMFFxKVkFJFTsdN19T1ohGHJGGQBjNsDSp0aBodHFGq4eetjG+Jak9rSMnsNkIT44ACMKAHdJO3HHPv2j8lPwheiGpoTW5I6uzN7kABE4ADMoDhGCVLsgABJQeRFNzbbK/AFAkFlMBguBQAowjw7SAyKhUbBSc6kCa0CC4/FSTFZIyQoaEgBMSMm7FpMkpxAAwuRsOQCMgAMQAFmFIqpX3oUEKAHlMIw/jJbEzaByeSwxdi6JKChC1AdIQUiUFJhDgd0sdlUXBsJJGRdkUpmOR2WAuTy+cAwPycgAGABsAEFvAAOMAAXTN1PBkrw3igw3UNm9Sqjalj8fVFujOQo8lsB2TKKzOeBnO5vNo/LgAHYgzYDnYI+KzPh0Ag7ZNvOQCnwAKp4nhsV3l5D+2SQjO0Zt4VsFzvdsy3AeN7HePBQKuztcT5DNxhwERKcjxs4Fw/Hwdl92e73fG83sPL7J7BkF5/VF2XisAVi/QaDP+3Rp9jOW1iVBICpFAoc+U9H8/wAx9aE1QpXVwAh21oABJPcYAgOB01LN0kA9L1vAATm+ciH0+bEwW9Mj6STDDwTgSxrG0UMgA==",
	"mistressEntrance": "NobwRAcghgtgpmAXGASnA5gVwDZQE5gA0YA4ngPaYAOSYAspQC4AWRYAwuduQYsGAGIALAE4hABglgAugF9C4aPFoAFTAGd1ATwAyAS3TNGARjZlKNZGs1aw8xbATIAQtg2ti56rVfu7CyEdaADE3PQATdTMKb2RQzAio+0DlZABRGHJGPQBjcgA7aItaDKzcgv8HVLA0rTgAIwoAd3VTTxjLGrrG8hbKlKcwABE4ADMoHEYi2LAACSh8yP6lQZHxyenO2bgocOWg5Ag9KipsOFbN2iOTs6SAldpZ8READnFL5G2DI33qiB4YFBsB8wM5yOEtABVE5wAjETjcXhgACC6j0C1+g3+eEBwPaxRc4N0vVhmMeUD0eGCFHyJnqIPmlOpBSm8K4PFoAgATOIeTyyZ8KXhnFAcgBrYwiBlCkXigVdc4AVhBtXObARHOQAigOqgAGY9fLVeplfiZsauer2UjtbqDfKVAtsudjIazZ1HbS9Gq2YjOVyA4H5QBlRjkcV6fLoC7u2jB8Niu5VVZwNwADzgYKyUVjyGDzHIPo41qQ/AE4gAbJXK2wBAB2cTiZFN2sNpst4gCPVVt4vGTJB7IHQ7Fiwzh4dRwRgAFXIVDapA6tHHk9Zxb9fEEepEepeu/79wOYB0UEYcDTnsYMcXBI43BYOhJcPXmrLu/ffbkh+qJG4ADdzjdG8Zl/cgAJzF9eDfZtFXEZUv2TK44HFXAcjgR85VzSBkLFVCEF9V9BHEYJxDSUjaxERUXi5IRDTkaQgA",
	"mistressPetEntrance": "NobwRAcghgtgpmAXGASnA5gVwDZQE5gA0YA4ngPaYAOSYAspQC4AWRYAwuduQYsGAGIArADEATADZJYALoBfQuGjxaABUwBnDQE8AMgEt0zRgEY2ZSjWTqt2sAqWwEyAELZNrYheq03HtqoUVHB4jHaI4ACiAB5UeHBa+uQAdrR0cAAm+pgw9g6QTrQi7voZGuYUPsjFmKXl+crOYJEw5Iz6AMYpFZa0LW2d3Q2FyJHacABGFADuGmZelVbN41Pks/aKBSrIACJwAGZQOIw9VWAAElDJZRuO22B7h8enS+dwUBm3W00Q+lRU2AS81Ii1ov3+gPqm0aajgjE42FwBAWvWQAElGHAYBA4B0ANZfGHIBFI3TvDSeEGosAYrE4/FoDSMPBQfTJRjlYgIni0AQADgAzAAGPkiwkjC5CgCcwpetDehmM4vul30eBEFHZAomcuQqvVmpOXK4POQAgkHTEJgFYmVTTGCQFuuWCTY3N4gigUAFAq9dr64w0TpRZwdGltxu4HoEXp9fuGKtZeBcUHxJgA7M79Sn8f7kBAeDAoNhnS5yBltABVf4hN0mj1uVMEhM/QvF0vlvRrWtyGRAA==",
	"teasingLadyEntrance": "NobwRAcghgtgpmAXGASnA5gVwDZQE5gA0YA4ngPaYAOSYAspQC4AWRYAwuduQYsGAGIAHAEEATAFEALAEYwAXQC+hcNHi0ACpgDO2gJ4AZAJbpmjOcTKUayLbr1hlq2AmQAhbDtaWK1Wh69HFUgXWgAxTyMAE202Kz9kCMxo2KcQ9WQJGHJGIwBjcgA7ON8bMCyc/KKg5wzyvTgAIwoAd20LUlLaCQbm8jaa9NcwABE4ADMoHEYS61oACShCmMG1YbHJ6dmEsHm4KCjV0OQIIyoqbDh27bLT88vU4LWFqCM8MIpCxgBmRpuXt4fIozYicbi8fgCKQiWTfKQKNLPZCLN5uKB5ADWADZ/sjXng0ZijnUDPh0AgfHN3OQonoAKrnOAEUFcHj+XBExHHSA8GBQbC4sBuGmGfpM4nDHpXDrxMpS2Is8G0AQAVjVKqEQgl3Qa10pO3lYjYYLZyFV6s12tsS1yVwA7IKNDajFdjazeIIZOwvV6rfQjNpGHgrtphTkFZ0qWAAMrMciuxWmyEABjEydhCKe3JR724LSZMq6eLeIjyeRDPD03zdSr4gjtQjtAE47RJM7V1sHdNX9WV2NwWDWk56RjIROxq0os3Vo+RMdocb3aLP50OIYJkyr0+m2AIsRJ93acVOO7QSNwAG5XMKYZmRnbn8hXiMm9cCVPJoRidhsDZTbAzCeQwLMmTZCMmgp7CYZiOPIQA"
};

let tray: API_AppearanceItem | null = null;

export class MaidsPartyNightSinglePlayerAdventure extends LoggingLogic {
	/** The player */
	player: API_Character | null = null;
	/** Map of player's position in the scene */
	charPos: Map<API_Character, EventPosition> = new Map();
	/** Did the player start the scenario or is she in the holoroom lobby */
	started: boolean = false;
	storyProgress: StoryProgress = StoryProgress.introduction;
	introductionProgress: IntroductionProgress = IntroductionProgress.meetingTheHeadMaid;
	thePartyProgress: ThePartyProgress = ThePartyProgress.arrivingAtTheParty;
	teasingLadyProgress: TeasingLadyProgress = TeasingLadyProgress.notMet;
	/** used in recievingPunishment = "C00-P03-B" */
	paddleHitCount: number = 0;
	timer: NodeJS.Timeout | null = null;
	/** used to store the outfit (no items) of the player when she joins the room */
	playerAppearanceStorage: BC_AppearanceItem[] = [];
	hintShown: boolean = false;

	// TEMP
	/** used once in onCharacterEvent() - the variable and the function it is used for should be removed later when Jomshir has implemented
	 *  a different event handling function, circumventing the problem of the message playing for each single item being removed once
	 */
	toldToStripFully: boolean = false;

	/** the connectors of both bots used to act as NPCs in the scenario, 'conn' is the one that runs the scenario */
	readonly conn: API_Connector;
	readonly conn2: API_Connector;

	// Metrics
	/*
	private metric_players = new promClient.Gauge({
		name: "hub_players_in_room",
		help: "hub_players_in_room",
		labelNames: ["roomName"] as const
	});
	private metric_started = new promClient.Counter({
		name: "hub_maidspartynight_started",
		help: "hub_maidspartynight_started"
	});
	private metric_endings = new promClient.Counter({
		name: "hub_maidspartynight_reached_endings",
		help: "hub_maidspartynight_reached_endings",
		labelNames: ["ending"] as const
	});
	*/

	constructor(conn: API_Connector, conn2: API_Connector) {
		super();
		this.conn = conn;
		this.conn2 = conn2;
	}

	/**
	 * When the scene should be soft reset or fully (character is set to 'null')
	 * @param character the current player - 'null' if there is none
	 */
	async resetRoom(character: API_Character | null) {
		this.player = character;
		this.charPos.clear();
		this.started = false;
		this.storyProgress = StoryProgress.introduction;
		this.introductionProgress = IntroductionProgress.meetingTheHeadMaid;
		this.thePartyProgress = ThePartyProgress.arrivingAtTheParty;
		this.teasingLadyProgress = TeasingLadyProgress.notMet;
		this.paddleHitCount = 0;
		this.resetTimeoutTimer("afkwarn");
		this.hintShown = false;

		if (character !== null) {
			// when there is a player, position the bot next to her
			await this.conn.Player.MoveToPos(this.conn.Player.ChatRoomPosition < character.ChatRoomPosition ? character.ChatRoomPosition - 1 : character.ChatRoomPosition);
		} else {
			// when there is no player, reset her stored outfit
			this.playerAppearanceStorage = [];
		}
		this.changeBotAppearanceTo("defaultBot", this.conn);
		this.changeBotAppearanceTo("defaultBot", this.conn2);
		this.conn.Player.SetActivePose([]);
		this.conn2.Player.SetActivePose([]);
		this.resetBotExpressions(this.conn);
		this.resetBotExpressions(this.conn2);
		this.conn2.ChatRoomLeave();
		await this.changeRoomBackgroundTo("SynthWave");
		this.conn.Player.SetExpression("Mouth", "Smirk");
		const sign = this.conn.Player.Appearance.AddItem(AssetGet("ItemMisc", "WoodenSign"));
		if (sign !== null) {
			sign.Extended?.SetText("Ready\nPlayer One");
			sign.SetColor(["#000000", "#040404", "#FFFFFF"]);
		}

		// TEMP
		this.toldToStripFully = false;
	}

	/**
	 * The timeout timer will be reset if it is running and a new one will be started for a given reason that will happen if timer runs out
	 * @param reason can be that the player disconnected and will fail to return in time OR
	 *               will be afk for too long and therefore kicked OR player will be given a warning before starting the final afk timer
	 */
	resetTimeoutTimer(reason: "disconnect" | "afk" | "afkwarn") {
		if (this.timer !== null) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		if (this.player !== null) {
			// 300000 are 5 mins
			this.timer = setTimeout(() => { void this.cleanUpSinceActivePlayerWasLostForThisReason(reason); }, 300_000);
		}
	}

	/**
	 * The opening note when the player starts the scene
	 * @param character the current player
	 * @param everything if the whole greeting should be printed or only the 2nd part
	 */
	playerGreeting(character: API_Character, everything: boolean) {
		if (everything) {
			character.Tell("Emote", "*Welcome to holoroom scenario");
			character.Tell("Chat", "'A maid's party night'");
			character.Tell("Emote", "*by Claudia and Jomshir. It is a demo of a choice-based single player experience for submissives, with the goal " +
				"to inspire others to also create content for the club, using Jomshir's BotAPI. Navigate the story by typing " +
				"emotes [text beginning with '*' or '/me ' ] containing the trigger words in round brackets you can find in many text blocks, such as (start) here. " +
				"[NOTE: You can also roleplay using the words in brackets: so (start) could be typed as '*start' or '/me starts up the holoroom.' ]"
			);
		}
		// TODO: Maybe remove 'leave' part after we have the VIP system for rooms available and implemented for this scenario
		//
		// TODO: Idea: have a hardcore mode - like we could add option to disable holoroom "safety" - forbidding the player from resetting it~
		// or possibly even not letting them leave so they cannot reset it by a quick leave and rejoin (dc does not reset)
		// TODO: Idea: Maybe add a command for showing a spoiler-free changelog that helps people to judge whether it is worth it to play through it again
		character.Tell("Emote", "*You can (reset the scene fully) at any point in time with '*reset the scene fully' " +
			` in the chat or by whispering 'end simulation' to the bot. ` +
			`At any time, you can leave the locked room by whispering 'leave' to the main bot '${this.conn.Player.Name}'.\n` +
			`Whispering 'help' will bring up this text again. If you would like to contact us or get more info on Jomshir's BotAPI, whisper 'contact'. Please enjoy!`);
		if (!character.CanTalk()) {
			character.Tell("Whisper", `Because you are gagged, you may not be able to use whispers depending on your settings. Therefore, only right now, ` +
				`you can still decide to (leave) instead of (starting) the scenario.`
			);
		}
	}

	async playerCheck(character: API_Character): Promise<boolean> {
		let hadWarnings = false;
		const allow = await character.GetAllowItem();
		if (!character.ProtectionAllowInteract()) {
			character.Tell("Chat", `Warning: The bot currently cannot interact with you ` +
				`because your bondage club version is newer than the bot's version.\n` +
				`This might be caused by either you being on beta or the bot not yet being updated to the latest version. ` +
				`If you are using beta, please login using the normal version to enable the bot to interact with you.`
			);
			logger.info(`Player check for ${character}: Protection: Version=${character.OnlineSharedSettings.GameVersion}, Admin=${this.conn.Player.IsRoomAdmin()}`);
			hadWarnings = true;
		} else if (!allow) {
			character.Tell("Chat", `Warning: The bot currently cannot interact with you because of your permission settings. Please change them or white list the bot.`);
			//logger.info(`Player check for ${character}: Permission level: ` + BC_PermissionLevel[character.ItemPermission]);
			hadWarnings = true;
		}
		const itemsCannotRemove = character.Appearance.Appearance.filter(A => listOfUsedItemGroups.includes(A.Group) && !A.AllowRemove());
		if (itemsCannotRemove.length > 0) {
			character.Tell("Chat", `Warning: Scenario will conflict with following restraints you have on you:\n` +
				itemsCannotRemove.map(A => A.Name).join(", ") +
				`\nScenario cannot remove these because of locks or other limiting factors`
			);
			logger.info(`Player check for ${character}: Unremovable items: ` + itemsCannotRemove.map(A => A.Name).join(", "));
			hadWarnings = true;
		}
		const itemsToRemove = character.Appearance.Appearance.filter(A => listOfUsedItemGroups.includes(A.Group) && A.AllowRemove());
		if (itemsToRemove.length !== 0) {
			character.Tell("Chat", `Warning: Starting the scenario will remove the following restraints you have on you:\n` +
				itemsToRemove.map(A => A.Name).join(", ")
			);
			logger.info(`Player check for ${character}: Items to remove: ` + itemsToRemove.map(A => A.Name).join(", "));
			hadWarnings = true;
		}
		const itemsCannotUse = listOfUsedItemsInThisScene.filter(item => !character.IsItemPermissionAccessible(AssetGet(item[0], item[1]), item[2]));
		if (itemsCannotUse.length > 0) {
			character.Tell("Chat", `Warning: The scenario uses following items, but you have them blocked or limited:\n` +
				itemsCannotUse.map(A => A.join(":")).join(", ")
			);
			logger.info(`Player check for ${character}: Blocked items: ` + itemsCannotUse.map(A => A.join(":")).join(", "));
			hadWarnings = true;
		}
		const outfitsCannotUse = Object.entries(listOfAllPlayerOutfits).filter(([k, v]) => {
			return !JMod_allowApplyAppearanceBundle(character, JMod_importAppearanceBundle(v), {
				appearance: false,
				bodyCosplay: false,
				clothing: true,
				item: false
			});
		}).map(i => i[0]);
		if (allow && outfitsCannotUse.length > 0) {
			character.Tell("Chat", `Warning: Following outfits used by scenario cannot be used on you,` +
				`because you have some clothing blocked or limited:\n` +
				outfitsCannotUse.join(", ")
			);
			logger.info(`Player check for ${character}: Blocked outfits: ` + outfitsCannotUse.join(", "));
			hadWarnings = true;
		}
		if (hadWarnings) {
			character.Tell("Whisper", `These warnings won't prevent you from playing, but may cause your experience to be degraded.\n` +
				`We recommend fixing these and re-running the check by whispering 'check' to the bot`
			);
		} else {
			logger.info(`Player check for ${character}: No warning`);
		}
		return !hadWarnings;
	}

	/**
	 * The messages sent when the player reaches a generic ending of the scene.
	 * @param character the current player
	 * @param toBeContinued if the intention of the message is to indicate that this path could be continued according to player feedback
	 */
	playerGenericEnd(character: API_Character, toBeContinued: boolean) {
		this.storyProgress = StoryProgress.theEnd;
		this.conn.SendMessage("Emote", `*- The End -`);
		// TODO: Remove 'leave' part after we have the VIP system for rooms available and implemented for this scenario
		character.Tell("Whisper", `${(toBeContinued ? "END OF THE DEMO: You have reached the current" : "END: You have reached the")} ` +
			`end of this path. You can (end) the scenario to reset it, getting your original clothes back, or just (leave) the room like you are right now. ` +
			`As this scenario is an experiment / tech demo, we would love any feedback and suggestions. For that, whisper a message starting with ! to the bot. ` +
			`${(toBeContinued ? "This demo ends intentionally open-end and will most likely not be continued. It is there to inspire others to use the wide feature-set of Jomshir's bot API to create something themselves. " : "")}Thank you for playing!`
		);
	}

	/**
	 * When character enters the room
	 * @param connection Originating connection
	 * @param character The character that entered the room
	 */
	protected async onCharacterEntered(connection: API_Connector, character: API_Character): Promise<void> {
		if (character.IsBot()) return;
		super.onCharacterEntered(connection, character);

		/*
		this.metric_players
			.labels({ roomName: character.chatRoom.Name })
			.set(character.chatRoom.characters.filter(c => !c.IsBot()).length);
		*/

		if (this.player === null && !connection.chatRoom.Admin.includes(character.MemberNumber)) {
			await this.conn.ChatRoomUpdate({
				Limit: 10,
				Access: ["Admin", "Whitelist"]
			});
			await this.resetRoom(character);
			this.playerAppearanceStorage = character.Appearance.MakeAppearanceBundle();
			this.charPos.set(character, "introduction");
			// TODO: Add a another trigger to the playerGreeting that enables the player to skip the introduction and start during the party, tied up
			// use pointsOfInterestAtEntranceForMaid() as entry point
			await wait(2000);
			this.printChatSeparator();
			this.playerGreeting(character, true);
			await this.playerCheck(character);
			this.conn.SendMessage("Chat", `--- System ready. Awaiting input * ---`);
		} else if (character.MemberNumber === this.player?.MemberNumber) {
			this.player = character;
			await this.player.Demote();
			this.resetTimeoutTimer("afkwarn");
		} else if (connection.chatRoom.Admin.includes(character.MemberNumber)) {
			// just a little easter egg - could be removed
			if (SUPERUSERS.includes(character.MemberNumber)) {
				this.conn.SendMessage("Chat", `Welcome back, Mistress ${character.Name}!`);
				this.conn.SendMessage("Emote", `bows politely.`);
			}
			// easter egg ends above
			if (this.player === null) {
				await this.makeRoomSizeOneMoreThanAdminsPresentAndUnlockRoom();
			}
		} else {
			character.Tell(
				"Emote",
				"*Welcome to the room. A scene is already in progress. As it is a single player experience, you cannot join at this time. " +
				"Also please tell us how you managed to enter, as it shouldn't have been possible!"
			);
		}
	}

	/**
	 * When character leaves the room
	 * @param connection Originating connection
	 * @param character The character that left the room
	 * @param intentional If the leave was (likely) caused by user
	 */
	protected async onCharacterLeft(connection: API_Connector, character: API_Character, intentional: boolean): Promise<void> {
		if (character.IsBot()) return;
		super.onCharacterLeft(connection, character, intentional);

		/*
		this.metric_players
			.labels({ roomName: character.chatRoom.Name })
			.set(character.chatRoom.characters.filter(c => !c.IsBot()).length);
		*/

		if (this.player === character && (intentional || !this.started)) {
			// TODO: this can only be reached via 'leave' or force DC, as the player cannot leave the locked room themself >>
			// not ideal! - Wait for VIP system!
			await this.cleanUpSinceActivePlayerWasLostForThisReason("left");
			await this.makeRoomSizeOneMoreThanAdminsPresentAndUnlockRoom();
		} else if (this.player === character && !intentional) {
			this.resetTimeoutTimer("disconnect");
			await this.conn.ChatRoomUpdate({
				Admin: [this.conn.Player.MemberNumber, this.conn2.Player.MemberNumber, character.MemberNumber, ...SUPERUSERS]
			});
			this.conn.SendMessage("Emote", "*NOTE: Since the player disconnected, we will now wait 5 minutes before the room will be reset.");
		} else if (character.IsRoomAdmin() && this.player === null) {
			await this.makeRoomSizeOneMoreThanAdminsPresentAndUnlockRoom();
		} else if (this.player === null) {
			await this.makeRoomSizeOneMoreThanAdminsPresentAndUnlockRoom();
		}
	}

	/**
	 * When connection receives message inside chatroom
	 * @param connection Originating connection
	 * @param message Received message
	 * @param sender The character that sent the message
	 */
	protected async onMessage(connection: API_Connector, message: BC_Server_ChatRoomMessage, sender: API_Character): Promise<void> {
		if (!sender.IsBot() && message.Type !== "Hidden") {
			super.onMessage(connection, message, sender);
		}

		if (sender === this.player && ["Chat", "Whisper"].includes(message.Type) && (/^.?help($|\W)/i).test(message.Content)) {
			this.playerGreeting(sender, false);
			return;
		}

		if (message.Type === "Whisper") {
			return this.handleCommand(connection, message, sender);
		}

		const msg = message.Content.toLocaleLowerCase();
		const paddleHitNumbers: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

		if (sender === this.player && message.Type === "Emote") {
			this.resetTimeoutTimer("afkwarn");
			/* only the player can always soft reset the scene with '*reset the scene fully' */
			if (msg.includes("reset") && (msg.includes("scene fully") || msg.includes("room fully"))) {
				await this.cleanUpActionsAsActivePlayerTriggeredRoomReset(sender);
			} else if (msg.includes("dev jump")) {
				//* remove following function when run not in development mode */
				// this.developerJumpsToLatestPart();
				return;
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.meetingTheHeadMaid) {
				if (msg.includes("leave")) {
					sender.Tell("Whisper", "Goodbye and all the best!");
					await wait(2500);
					await this.player?.Kick();
					return;
				} else if (msg.includes("start") && !this.started) {
					this.freePlayerInItemSlots(sender, listOfUsedItemGroups);
					this.conn.SendMessage("Emote", `*The image of the bot disappears as the room starts to power up, forming a club corridor around ${sender.Name}, ` +
						`whos clothes are also changing.`
					);
					this.started = true;
					//this.metric_started.inc();
					await wait(2500);
					await this.toggleBotVisibility(true);
					await wait(2000);
					this.changePlayerApperanceTo("playerCasual");
					await this.changeRoomBackgroundTo("MainHall");
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*${sender.Name} is one of the many maids the bondage club employs, just entering the ` +
						`club to start tonight's regular shift. After reaching the maid quarters of the club, ${sender.Name}` +
						` enters the main common room with its cozy fireplace. There are a few maid colleagues inside, ${sender.Name} recognizes. ` +
						`Among them is Head Maid Karina who seems to be on duty tonight and is known to be quite the stickler for details and order. ` +
						`${sender.Name} (greets) the room.`
					);
					// TODO: Message when player has open mouth or arms behind her?
					// if (sender.Pose.some(P => ["BackCuffs", "BackElbowTouch", "BackBoxTie"].includes(P.Name))) {
					// 	sender.Tell("Whisper", `TODO`);
					// }
					// if (["HalfOpen", "Open", "Ahegao", "Moan"].includes(sender.Appearance.InventoryGet("Mouth")?.GetExpression())) {
					// 	sender.Tell("Whisper", `We know you are impressed by the room, but we recommend closing your mouth`);
					// }
					await wait(7000);
					await this.changeRoomBackgroundTo("MaidQuarters");
					return;
				} else if (msg.includes("greet")) {
					await this.toggleBotVisibility(false);
					this.printChatSeparator();
					this.changeBotAppearanceTo("headMaidKarina", this.conn);
					this.conn.SendMessage("Chat", `${sender.Name}: Good evening, everyone!`);
					this.conn.SendMessage("Emote", `*In that very moment, Head Maid Karina turns around, immediately approaching and greeting the new arrival.`);
					this.conn.SendMessage("Chat", `Head Maid Karina: Hello ${sender.Name}, I urgently need you to get ready for a special ` +
						`assignment tonight. They are holding a large bondage party in hall 3 and I need more maids there. I expect you have ` +
						`no problem to get into a bit of naughty bondage fun tonight?`
					);
					this.conn.SendMessage("Emote", `*She smirks quite a bit at ${sender.Name} as she says that.`);
					sender.Tell(
						"Whisper",
						`Possible reactions:` +
						`\n- (Of course), Miss Karina, when does it start?` +
						`\n- Oh, uuhm, I am (very sorry) Miss, but I really don't feel like being exposed to a public audience tonight... `
					);
					return;
				} else if (msg.includes("course")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `${sender.Name}: Of course, Miss Karina, when does it start?`);
					if (this.ifUndressed(sender)) {
						this.toldToStripFully = true;
						this.conn.SendMessage("Chat", `Head Maid Karina: Good. As soon as you are ready.\n...and seeing as you are already naked, ` +
							`let me check your body quickly.`
						);
						this.conn.SendMessage("Emote", `*The head maid ` +
							`seems to inspect every part of ${sender.Name}'s bared body, even crouching down to stare hard at the privates. Eventually, she returns to ` +
							`the front, looking satisfied.`
						);
						this.conn.SendMessage("Chat", `Head Maid Karina: Good. You will be a pleasing enough sight for tonight's special guests. Let's get you ` +
							`ready then. Hold still, dear, while we work on you.`
						);
						this.conn.SendMessage("Emote", `*${sender.Name} (nods slowly), witnessing a few of the other maids smirking and seemingly quite looking ` +
							`forward to what is bound to happen next.`
						);
						this.introductionProgress = IntroductionProgress.acceptingTheAssignment;
						return;
					}
					this.conn.SendMessage("Chat", `Head Maid Karina: Good. As soon as you are ready. Now be a dear and strip fully, I need to check ` +
						`that you will be a pleasing enough sight for tonight's occasion.`
					);
					sender.Tell(
						"Whisper",
						`Possible reactions:` +
						`\n- (Yes), Miss Karina.` +
						`\n- (Noo) way!`
					);
					this.introductionProgress = IntroductionProgress.acceptingTheAssignmentStrip;
					return;
				} else if (msg.includes("sorry")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `${sender.Name}: Oh, uuhm, I am very sorry Miss, but I really don't feel like being exposed to a public audience tonight... `);
					this.conn.SendMessage("Emote", `*The head maid looks quite disappointed and orders ${sender.Name} to immediately (change) into her uniform.`);
					this.introductionProgress = IntroductionProgress.refusingTheAssignment;
					return;
				} else if (!this.hintShown) {
					sender.Tell("Whisper", `HINT: To proceed, type an emote into the chat using the word in round brackets. ` +
						`Here is an example: If you find a word in parentheses somewhere in the text such as (very sorry), you use the word between ` +
						`the round brackets to type an emote into the chat, so in this case '/me very sorry' or '*is very sorry' .`);
					this.hintShown = true;
				}
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.acceptingTheAssignment) {
				if (msg.includes("nods") && this.ifUndressed(sender)) {
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*Karina looks pleased at ${sender.Name}, then turns around, snapping her fingers. One of the ` +
						`other maids quickly walks up to the head maid, holding a maid uniform in her hands.`
					);
					this.changeBotAppearanceTo("trixie", this.conn2);
					this.conn2.Player.SetExpression("Mouth", "Smirk");
					await this.conn2.ChatRoomJoin(this.conn.chatRoom.Name);
					this.conn.SendMessage("Chat", `Head Maid Karina: Trixie, get ${sender.Name} ready for the party! You know the expected outfit.`);
					this.conn.SendMessage("Chat", `Trixie: Yes, Miss Karina.`);
					this.conn.SendMessage("Emote", `*Trixie looks encouragingly at ${sender.Name}, immediately getting to work, giving her friendly instructions ` +
						`and helping her into the maid uniform, piece by piece under the watchful eyes of the head maid. ${sender.Name} (follows) the instructions, ` +
						`the thought of no longer being naked quite appealing, even though the uniform clearly looks skimpier than the standard uniform and almost seems a size too small.`
					);
					// TODO: Idea: Dress up player step by step slowly
					await wait(15000);
					this.changePlayerApperanceTo("playerSkimpyMaid");
					return;
				} else if (msg.includes("follow")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `Trixie: ...aaand all done! Please wait here while I get the restraints.`);
					this.conn.SendMessage("Emote", `*The maid walks off towards a cabinet while ${sender.Name} looks with wide eyes down at the new oufit that is ` +
						`apparently not yet quite complete, realizing that on top of that she is to attend the party tied up.`
					);
					sender.Tell(
						"Whisper",
						`Possible reactions:` +
						`\n- (Say nothing)` +
						`\n- Eeeh? (No wait)! I don't feel like going to yet another party all tied up!`
					);
					await wait(4000);
					await this.conn2.Player.MoveToPos(0);
					return;
				} else if ((msg.includes("say") && msg.includes("nothing")) || msg.includes("promise")) {
					this.printChatSeparator();
					if (msg.includes("promise")) {
						this.conn.SendMessage("Chat", `${sender.Name}: I am s-sorry, Miss Karina, please don't punish me! I will work hard tonight, I promise!`);
						this.conn.SendMessage("Chat", `Head Maid Karina: Hmmm... Fine, you will get another chance to impress me! Trixie, continue please.`);
					}
					this.conn.SendMessage("Emote", `*${sender.Name} silently watches as Trixie comes back with an assortment of restraints and items. First she grabs ` +
						`a kind of hobble skirt and fastens it around ${sender.Name}'s thighs in a snug and walk impairing way, closing the buckles securely.`
					);
					this.conn.SendMessage("Chat", `Trixie: Arms behind your back, please~`);
					this.conn.SendMessage("Emote", `*${sender.Name} clearly accepted her role for tonight, ` +
						`merely watching the happily smiling maid, who is now waiting for her maid sister to move her arms into a tieable position.`
					);
					await wait(4000);
					await this.conn2.Player.MoveToPos(this.conn2.Player.ChatRoomPosition < sender.ChatRoomPosition ? sender.ChatRoomPosition : sender.ChatRoomPosition + 1);
					await wait(1000);
					// Note: Assets.find will be replaced soon
					// Note: AddItem returns if it was successful, maybe worth checking?
					sender.Appearance.AddItem(AssetGet("ClothLower", "PencilSkirt"))?.SetColor('#460000');
					this.introductionProgress = IntroductionProgress.gettingReady;
					return;
				} else if (msg.includes("no wait")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `${sender.Name}: Eeeh?~ No, no, wait! I don't feel like going to it all tied up agaaain!`);
					this.conn.SendMessage("Emote", `*The head maid comes back around, looking very displeased at ${sender.Name}, grabbing her chin strictly and ` +
						`staring deeply into her eyes.`
					);
					this.conn.SendMessage("Chat", `Head Maid Karina: I see~~ Instead you feel like wasting our time, hmm? That's alright then, ` +
						`you won't have to go... That said, I think you need a refresher ` +
						`in discipline, dear. ...... Let's see... ten hits with the paddle will surely help you to remember that you are here to do your work. ` +
						`A work you applied for, fully knowing what will be expected of you! \nNow... Anything to say for yourself?`
					);
					sender.Tell(
						"Whisper",
						`Possible reactions:` +
						`\n- I am sorry, Miss Karina, please don't punish me! I will work hard tonight, I (promise)!` +
						`\n- (Shake your head)`
					);
					return;
				} else if (msg.includes("shake")) {
					this.printChatSeparator();
					await this.conn2.Player.MoveToPos(this.conn2.Player.ChatRoomPosition < sender.ChatRoomPosition ? sender.ChatRoomPosition : sender.ChatRoomPosition + 1);
					this.conn.SendMessage("Emote", `*${sender.Name} squirms a bit, but knowing that she overdid it and Karina would not let her get away with ` +
						`it in front of all the other maids, she merely shakes her head, silently accepting her punishment for refusing the task expected of her.`
					);
					this.conn.SendMessage("Emote", `*Karina nods content and snaps her fingers, prompting Trixie to lead ${sender.Name} to a nearby sofa ` +
						`where she is gently guided into a bent position, leaving her butt cheeks quite accessible. Trixie hands head maid Karina a paddle and steps back.`
					);
					const item = this.conn.Player.Appearance.AddItem(AssetGet("ItemHandheld", "Paddle"));

					this.conn.SendMessage("Emote", `*The head maid smirks, stepping behind ${sender.Name} with the paddle. She follows up by slowly lifting ` +
						`${sender.Name}'s dress, exposing her butt in front of the watching maids, who show a wide range emotions, from excitment to ` +
						`sympathy and even envy. `
					);
					this.conn.SendMessage("Chat", `Head Maid Karina: You will count the strikes out loud! If you make a mistake, ` +
						`we will start over~`
					);
					this.conn.SendMessage("Emote", `*She clearly takes her time with the first strike, letting the tension rise.`);
					await wait(26000);
					sender.Appearance.RemoveItem("ClothLower");
					await wait(8000);
					if (this.storyProgress !== StoryProgress.introduction ||
						this.introductionProgress !== IntroductionProgress.acceptingTheAssignment)
						return;
					this.conn.SendMessage("Emote", `*After about half a minute, Karina swings down the paddle, giving ${sender.Name}'s butt cheeks ` +
						`hit number (one), which is clearly a weaker hit to warm them up.`
					);
					this.conn.SendMessage("Activity", "ChatOther-ItemButt-SpankItem", null, [
						{ Tag: "SourceCharacter", Text: "Head Maid Karina", MemberNumber: this.conn.Player.MemberNumber },
						{ Tag: "TargetCharacter", Text: sender.Name, MemberNumber: sender.MemberNumber },
						{ FocusGroupName: "ItemButt" },
						{ ActivityName: "SpankItem" },
						{ Tag: "ActivityAsset", AssetName: "Paddle", GroupName: "ItemHandheld" },
						{ Tag: "UsedAsset", Text: "paddle" }
					]);
					this.introductionProgress = IntroductionProgress.recievingPunishment;
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.acceptingTheAssignmentStrip) {
				if (msg.includes("yes")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `${sender.Name}: Y-Yes, Miss Karina`);
					this.conn.SendMessage("Emote", `*Karina smiles a bit, but clearly expects ${sender.Name} to promptly strip, a hint of impatience in her eyes.`);
					return;
				} else if (msg.includes("noo")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `${sender.Name}: No way!`);
					this.conn.SendMessage("Emote", `*The head maid looks quite displeased at ${sender.Name}'s sudden refusal and coldly orders her to immediately (change) into her uniform.`);
					this.introductionProgress = IntroductionProgress.refusingTheAssignment;
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.refusingTheAssignment) {
				if (msg.includes("change")) {
					this.printChatSeparator();
					this.changePlayerApperanceTo("playerStandardMaid");
					this.conn.SendMessage("Emote", `*${sender.Name} quickly moves to the dressing room and changes into the standard maid uniform, before ` +
						`rushing back to the head maid, who looks at ${sender.Name} in a somewhat mocking way, holding a duster gag in her hands.`
					);
					this.conn.SendMessage("Chat", `Head Maid Karina: Since you refused the assignment, let's make you otherwise useful for tonight. Open wide, dear!`);
					this.conn.SendMessage("Emote", `*${sender.Name} knows that Karina won't accept yet another refusal without severe consequences ` +
						`for her employment, as she waits for ${sender.Name} to open her mouth, tapping impatiently with one finger on the gag.`
					);
					return;
				} else if (msg.includes("go") && msg.includes("and clean")) {
					/* trigger a spank action - no sound for now and not deemed worth using due to that
					this.conn.SendMessage("Activity", "ChatOther-ItemButt-Spank", null, [
						{ Tag: "SourceCharacter", Text: "Head Maid Karina", MemberNumber: this.conn.Player.MemberNumber },
						{ Tag: "TargetCharacter", Text: sender.Name, MemberNumber: sender.MemberNumber },
						{ Tag: "ActivityGroup", Text: "ItemButt" },
						{ Tag: "ActivityName", Text: "Spank" }
					]);
					*/
					this.changeBotAppearanceTo("defaultBot", this.conn);
					await this.toggleBotVisibility(true);
					await this.changeRoomBackgroundTo("SlumCellar");
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*With a teasing clap on ${sender.Name}'s butt cheeks, the grinning head maid sends her down the hallways ` +
						`to a less frequented part of the club, where she has to dust the storage rooms with their many boxes and furnitures, surly wondering ` +
						`whether refusal was the best decision here.`
					);
					logger.alert(`Player ${sender.Name} (${sender.MemberNumber}) reached ending: Storage cleaning`);
					//this.metric_endings.labels({ ending: "Storage cleaning" }).inc();
					this.playerGenericEnd(sender, false);
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.gettingReady) {
				if (msg.includes("watch")) {
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*The maid carefully buckles the tray around ${sender.Name}'s hips, its strap going comfortably around her neck. ` +
						`Following that, Trixie bring an assortment of various drinks for the party and adds them carefully onto the tray.`
					);
					tray = sender.Appearance.AddItem(AssetGet("ItemMisc", "ServingTray"));
					this.conn.SendMessage("Chat", `Trixie: I think you should be fine balancing it like this. Now there is just the fun part missing~`);
					this.conn.SendMessage("Emote", `*${sender.Name} watches with widening eyes as the upbeat maid brings a box ` +
						`of quite obvious content up to her. The tied up maid (mumbles) in her gag again, but Trixie just giggles and winks at her while ` +
						`reaching into the box.`
					);
					return;
				} else if (msg.includes("mumble")) {
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*Over the course of the next minutes, Trixie arranges a careful selection of various kinky items ` +
						`on ${sender.Name}'s tray. Most notably, a few dildos and plugs of various sizes, as well as vibrating toys, a flogger and even some clamps.`
					);
					if (tray !== null && tray.Extended !== null) {
						tray.Extended.SetType("Toys");
					}
					this.conn.SendMessage("Chat", `Trixie: It is best to be prepared! Who knows what tonight's guests might enjoy~`);
					this.conn.SendMessage("Emote", `*The maid smiles sweetly and dreamy at ${sender.Name}, who can do nothing much than mumble a bit into her gag, ` +
						`watching the tray getting quite full and weighty. Eventually, Trixie turns around and waves happily towards the head maid.`
					);
					this.conn.SendMessage("Chat", `Trixie: Miss Kariiinaa~ My lovely maid sister is all dolled up and ready~`);
					this.conn.SendMessage("Emote", `*As ${sender.Name} (turns) her head, she sees the head maid walking up to them again, grinning a bit ` +
						`as her eyes travel over the bound maid's body, slowly examining her and inspecting the tray.`
					);
					return;
				} else if (msg.includes("turn")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `Head Maid Karina: Well done, Trixie. She indeed looks appropriately equipped for tonight's party.`);
					this.conn.SendMessage("Emote", `*After saying that, she turns her gaze to ${sender.Name}, smiling somewhat warmly.`);
					this.conn.SendMessage("Chat", `Head Maid Karina: Alright, ${sender.Name}. You know what is expected of you. Entertain tonight's club ` +
						`visitors, as long as their requests are reasonable. Now off you (go to hall 3) and I expect you to bring no shame over the maids!`
					);
					this.storyProgress = StoryProgress.theParty;
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.recievingPunishment) {
				if (msg.includes(paddleHitNumbers[this.paddleHitCount])) {
					if (this.paddleHitCount === 9) {
						this.conn.Player.Appearance.RemoveItem("ItemHands");
						this.printChatSeparator();
						this.conn.SendMessage("Chat", `Head Maid Karina: There you go. You took those admirably. I am sure you learned your lesson in good behavior now.`);
						this.conn.SendMessage("Emote", `*Karina leans down and gently brushes over ${sender.Name}'s head, sending her together with Trixie ` +
							`to the maid rest room for after care and an early end of today's work.`);
						this.conn2.ChatRoomLeave();
						this.changeBotAppearanceTo("trixie", this.conn);
						logger.alert(`Player ${sender.Name} (${sender.MemberNumber}) reached ending: Head Maid punishment`);
						//this.metric_endings.labels({ ending: "Head Maid punishment" }).inc();
						this.playerGenericEnd(sender, false);
						return;
					}
					await wait(Math.random() * (2500 - 1000) + 1000);
					if (this.storyProgress !== StoryProgress.introduction ||
						this.introductionProgress !== IntroductionProgress.recievingPunishment)
						return;
					this.conn.SendMessage("Activity", "ChatOther-ItemButt-SpankItem", null, [
						{ Tag: "SourceCharacter", Text: "Head Maid Karina", MemberNumber: this.conn.Player.MemberNumber },
						{ Tag: "TargetCharacter", Text: sender.Name, MemberNumber: sender.MemberNumber },
						{ FocusGroupName: "ItemButt" },
						{ ActivityName: "SpankItem" },
						{ Tag: "ActivityAsset", AssetName: "Paddle", GroupName: "ItemHandheld" },
						{ Tag: "UsedAsset", Text: "paddle" }
					]);
					this.paddleHitCount++;
					return;
				} else if (paddleHitNumbers.some(num => msg.includes(num))) {
					this.conn.SendMessage("Chat", `Head Maid Karina: Ah~ Ah~ That was wrong. Seems ` +
						`we will start at (one) again~`
					);
					this.conn.SendMessage("Emote", `*She swings the paddle again, giving ${sender.Name}'s butt cheeks another hit.`);
					await wait(2500);
					if (this.storyProgress !== StoryProgress.introduction ||
						this.introductionProgress !== IntroductionProgress.recievingPunishment)
						return;
					this.conn.SendMessage("Activity", "ChatOther-ItemButt-SpankItem", null, [
						{ Tag: "SourceCharacter", Text: "Head Maid Karina", MemberNumber: this.conn.Player.MemberNumber },
						{ Tag: "TargetCharacter", Text: sender.Name, MemberNumber: sender.MemberNumber },
						{ FocusGroupName: "ItemButt" },
						{ ActivityName: "SpankItem" },
						{ Tag: "ActivityAsset", AssetName: "Paddle", GroupName: "ItemHandheld" },
						{ Tag: "UsedAsset", Text: "paddle" }
					]);
					this.paddleHitCount = 0;
					return;
				} else {
					this.conn.SendMessage("Chat", `Head Maid Karina: Be serious and speak loud and clear!`);
				}
			} else if (this.storyProgress === StoryProgress.theParty && this.thePartyProgress === ThePartyProgress.arrivingAtTheParty &&
				this.introductionProgress === IntroductionProgress.gettingReady) {
				if (msg.includes("go") && msg.includes("to hall")) {
					this.changeBotAppearanceTo("defaultBot", this.conn);
					this.conn2.ChatRoomLeave();
					await this.toggleBotVisibility(true);
					this.resetBotExpressions(this.conn2);
					await this.changeRoomBackgroundTo("MainHall");
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*${sender.Name} leaves the maid quarters behind, making her way in slow hobbled steps towards hall 3. ` +
						`The hallways are quite empty, only a few guests notice the tied up maid, leaving her alone aside from a few stares of the ` +
						`lustful nature. ${sender.Name} knows the way well and as she (is taking) the last corner, the entrance of ` +
						`hall 3 is now in sight and music as well as chatter can be heard.`
					);
				} else if (msg.includes("is tak")) {
					this.changeBotAppearanceTo("mistressPetEntrance", this.conn2);
					await this.toggleBotVisibility(false);
					await this.conn2.ChatRoomJoin(this.conn.chatRoom.Name);
					this.conn2.Player.SetExpression("Blush", "Medium");
					this.conn2.Player.SetExpression("Eyebrows", "Soft");
					this.conn2.Player.Appearance.AddItem(AssetGet("Hat", "MaidHairband1"));
					this.changeBotAppearanceTo("mistressEntrance", this.conn);
					await this.conn2.Player.MoveToPos(this.conn.Player.ChatRoomPosition + 1);
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*${sender.Name} slowly approaches the entrance, trying to not spill any of the drinks. ` +
						`She sees a few party guests outside of the entrance in the hallway, among them another maid. ` +
						`This maid is suddenly seen stripping down completely, as a dominant woman dressed in fetish clothing ` +
						`snuggly fits a collar around the girl's neck, following up with hooking a leash into the collar's ring. ` +
						`The Mistress smirks and signals the girl to get down on her knees, which she promptly does, her cheeks flushed quite a bit. ` +
						`This is met with excited reactions from the other watching guests, voicing various kinky ideas of how the ` +
						`maid could now entertain them further. In that moment, the Mistress looks up and her gaze meets ${sender.Name}'s.`
					);
					await wait(18000);
					this.conn2.Player.SetActivePose(["Kneel"]);
					this.conn.SendMessage("Emote", `*Not wanting to be tangled up in this, ${sender.Name} quickly continues on to the entrance and (enters).`);
					return;
				} else if (msg.includes("enter")) {
					this.changeBotAppearanceTo("defaultBot", this.conn);
					this.conn2.ChatRoomLeave();
					this.resetBotExpressions(this.conn2);
					this.changeBotAppearanceTo("defaultBot", this.conn2);
					this.conn2.Player.SetActivePose([]);
					this.introductionProgress = IntroductionProgress.end;
					await this.pointsOfInterestAtEntranceForMaid(sender);
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.theParty && this.teasingLadyProgress === TeasingLadyProgress.notMet) {
				if (msg.includes("stunning lady")) {
					await this.toggleBotVisibility(false);
					this.changeBotAppearanceTo("teasingLadyEntrance", this.conn);
					this.conn.Player.SetExpression("Mouth", "Smirk");
					this.charPos.set(sender, "teasing_lady_entrance");
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*${sender.Name} approaches the gorgeous lady curiously, eyeing her from head to toe, wondering ` +
						`why she is standing there all alone. The woman looks fairly bored, her gaze wandering over the various other guests in the ` +
						`room, clearly not interested in anything particular. She notices the tied up maid approaching her fairly late, but when she does, ` +
						`her gaze is quite piercing and dominant. ${sender.Name} stops ` +
						`close to the lady, turning her eyes slightly to the side unconciously under the intense, yet not unfriendly stare.`
					);
					this.conn.SendMessage("Chat", `Lady: My, my, what a cute maid! Are you here to let me play with you?`);
					this.conn.SendMessage("Emote", `*She smirks quite a bit as she says that, her gaze playfully teasing, but leaving no doubt ` +
						`of the role allocation in this encounter. ${sender.Name} looks at the lady, whose aura is clearly having an effect on the ` +
						`helpless maid, unable to reply to her meaningfully. Instead, she (raises) her chest slowly to offer the drinks on her tray.`
					);
					this.teasingLadyProgress = TeasingLadyProgress.meetingForTheFirstTime;
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.theParty && this.teasingLadyProgress === TeasingLadyProgress.meetingForTheFirstTime) {
				if (msg.includes("raise")) {
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*The lady grins somewhat predatory and claps her hands together with mock enthusiasm.`);
					this.conn.SendMessage("Chat", `Lady: Wonderful! You even brought the necessary toys for that with you.`);
					this.conn.SendMessage("Emote", `*${sender.Name} gets quite big eyes from those words, quickly shaking her head, which seems to widen her grin.`);
					this.conn.SendMessage("Chat", `Lady: Reeaaally? Why would you tease me with all those toys, if you don't want me to use them?~`);
					this.conn.SendMessage("Emote", `*The lady's hand raises towards the tray and slowly and playfully moves along the selection ` +
						`of toys, ignoring the drinks completely. She looks up at ${sender.Name}'s eyes, probing her reaction to each item her beautiful ` +
						`fingers almost touch on the tray while the tied up maid is merely (looking down) at the tray, unable to do much.`
					);
					return;
				} else if (msg.includes("look") && msg.includes("down")) {
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*After the lady's fingers almost completed their tour of the tray's kinky items, she stops ` +
						`above a pair of nipple clamps.`
					);
					this.conn.SendMessage("Chat", `Lady: How about those cute clamps? Wouldn't these be just the perfect decoration for ` +
						`a sweet little maid, who is showing off her nipples so cheekily?`
					);
					this.conn.SendMessage("Emote", `*She grins somewhat sadistically while her ` +
						`fingers settle down on the tray, playfully moving around the metal chain connecting the two clamps.`
					);
					sender.Tell(
						"Whisper",
						`Possible reactions:` +
						`\n- (Nods slowly)` +
						`\n- (No please), not the clamps!`
					);
					return;
				} else if (msg.includes("nod") && msg.includes("slowly")) {
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*${sender.Name} slowly nods her head, apparently agreeing with this idea.`);
					this.conn.SendMessage("Chat", `Lady: Oh my!~ Is that so? You want me to clamp them onto your breasts, so you can lewdly show ` +
						`them off to all the other party guests?`
					);
					this.conn.SendMessage("Emote", `*The lady smirks happily, clearly having ${sender.Name} right where she wants her.`);
					this.conn.SendMessage("Chat", `Lady: But who says that naughty little subbies get what they want?~ `);
					this.conn.SendMessage("Emote", `*Her smirk widens a lot as she takes a glass of wine from the tray and steps back, ` +
						`looking quite teasing.`
					);
					this.conn.SendMessage("Chat", `Lady: Thanks for the drink. Now move along dear! I am sure you will find ` +
						`someone to play with you, seeing what a kinky little maid you are~`
					);
					this.commonEndOfFirstEncounterWithTheTeasingLady(sender);
					return;
				} else if (msg.includes("no") && msg.includes("please")) {
					this.printChatSeparator();
					this.conn.SendMessage("Chat", `${sender.Name}: Ne...faeahe, nee ehe kaamfh!`);
					this.conn.SendMessage("Chat", `Lady: Aww~ What a bad little maid you are, telling me "No" when you should be telling me "Yes, Miss"~`);
					this.conn.SendMessage("Emote", `*She elegantly walks in a half circle around ${sender.Name} while her fingers trail teasingly ` +
						`around the side of the helpless maid, eventually stopping behind her. The dominant woman grabs the straps of the ball gag and ` +
						`unbuckles it swiftly, only to tighten them much more, her movements gentle but firm.`
					);
					this.conn.SendMessage("Chat", `Lady: This is not about you, dear. It's about serving guests and making them happy!~ ` +
						`There is no need for your cute mumbling when you don't understand that, sweetie.`
					);
					this.conn.SendMessage("Emote", `*She giggles teasingly and takes a glass of wine from the tray after coming back around to ${sender.Name}'s front.`);
					this.conn.SendMessage("Chat", `Lady: Thanks for the drink. Now move along and remember this lesson. Good things will only come to good girls~`);
					await wait(16000);
					const ballGag = sender.Appearance.AddItem(AssetGet("ItemMouth", "BallGag"));
					ballGag?.SetColor(["#FE3B3B", "Default"]);
					ballGag?.Extended?.SetType("Tight");
					this.commonEndOfFirstEncounterWithTheTeasingLady(sender);
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.theParty && this.teasingLadyProgress === TeasingLadyProgress.meetingForTheSecondTime) {
				if (msg.includes("hobble")) {
					this.changeBotAppearanceTo("defaultBot", this.conn);
					this.resetBotExpressions(this.conn);
					await this.pointsOfInterestAtEntranceForMaid(sender);
					return;
				} else if (msg.includes("stunning lady")) {
					await this.toggleBotVisibility(false);
					this.changeBotAppearanceTo("teasingLadyEntrance", this.conn);
					this.conn.Player.SetExpression("Mouth", "Smirk");
					this.charPos.set(sender, "teasing_lady_entrance");
					this.printChatSeparator();
					this.conn.SendMessage("Emote", `*${sender.Name} approaches the gorgeous lady again. However, she merely smirks mockingly at the ` +
						`maid and shoos her along, not showing any more interest to interact with her. Therefore, ${sender.Name} slowly (hobbles) back ` +
						`again to the entrance area.`
					);
					// TODO: remove the end below when more story was added here
					logger.alert(`Player ${sender.Name} (${sender.MemberNumber}) reached ending: Club lady - end of the demo-`);
					//this.metric_endings.labels({ ending: "Club lady" }).inc();
					this.playerGenericEnd(sender, true);
					return;
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else if (this.storyProgress === StoryProgress.theEnd) {
				if (msg.includes("leave")) {
					sender.Tell("Whisper", "Goodbye and have fun~");
					await wait(2500);
					await this.player?.Kick();
					return;
				} else if (msg.includes("end")) {
					await this.cleanUpActionsAsActivePlayerTriggeredRoomReset(sender);
				} else {
					/* the chat emote/action was nothing recognized, therefore do nothing. */
					return;
				}
			} else {
				/* this should never be reached */
				logger.warning(`Part of the code was reached that should not be able to be reached:` +
					`\n storyProgress:${this.storyProgress},` +
					`\n introductionProgress:${this.introductionProgress},` +
					`\n thePartyProgress:${this.thePartyProgress},` +
					`\n teasingLadyProgress:${this.teasingLadyProgress},`
				);
				return;
			}
		} else {
			/* do nothing. */
			return;
		}
	}

	private commonEndOfFirstEncounterWithTheTeasingLady(sender: API_Character) {
		this.conn.SendMessage("Emote", `*The woman clearly seems to be done with the maid, her beautiful grinning face slowly turning away from ` +
			`her, taking a sip from the wine. ${sender.Name} looks quite teased from this encounter and slowly (hobbles) back towards the entrance area.`
		);
		this.teasingLadyProgress = TeasingLadyProgress.meetingForTheSecondTime;
	}

	private async handleCommand(connection: API_Connector, message: BC_Server_ChatRoomMessage, sender: API_Character) {
		this.resetTimeoutTimer("afkwarn");
		const cmd = message.Content.toLocaleLowerCase();

		if (cmd.startsWith("!")) {
			sender.Tell("Whisper", "Your feedback has been saved, thank you!");
			let msg = `MESSAGE from ${sender.Name} (${sender.MemberNumber}):\n` + message.Content;
			logger.alert(msg);
			msg += `\n[debug data]: ` + JSON.stringify({
				player: this.player?.MemberNumber,
				charPos: Array.from(this.charPos.entries()).map(c => [c[0].MemberNumber, c[1]]),
				started: this.started,
				storyProgress: this.storyProgress,
				introductionProgress: this.introductionProgress,
				thePartyProgress: this.thePartyProgress,
				teasingLadyProgress: this.teasingLadyProgress,
				paddleHitCount: this.paddleHitCount,
				toldToStripFully: this.toldToStripFully
			});
			fs.writeFileSync("./data/messagelog.txt", "\n" + msg + "\n", { flag: "a" });
		} else if (cmd.startsWith("leave")) {
			// TODO: Maybe remove this if statement after we have the VIP system for rooms available and implemented for this scenario
			sender.Tell("Whisper", "Goodbye and all the best!");
			await wait(2500);
			await this.player?.Kick();
		} else if (cmd.startsWith("help")) {
			// the way to show the instructions again
			if (sender === this.player) {
				this.playerGreeting(sender, false);
			} else {
				sender.Tell("Whisper", "Only player can use this command!");
			}
		} else if (cmd.startsWith("check")) {
			if (await this.playerCheck(sender)) {
				sender.Tell("Whisper", "No problems found, have fun!");
			}
		} else if (cmd.startsWith("end simulation") || cmd.startsWith("stop simulation")) {
			await this.cleanUpActionsAsActivePlayerTriggeredRoomReset(sender);
		} else if (cmd.startsWith("contact")) {
			let msg = `You can whisper any feedback (including bug reports) for us to the main bot, by starting your message with '!' (eg. !I would like...)\n` +
				`This bot was created using Jomshir's BotAPI. If you would like to make a bot room similar to this one, you can find` +
				`all necessary info on the Bondage Club Scripting Community Discord: https://discord.gg/SHJMjEh9VH`;
			const admins = this.conn.chatRoom.characters.filter(c => c.IsRoomAdmin() && !c.IsBot());
			if (admins.length > 0) {
				msg += `\nAlternatively, you can also speak directly into the chat, as the following characters are also humans: ` + admins.map(C => C.Name).join(", ");
			}
			sender.Tell("Whisper", msg);
		} else if (cmd.startsWith("exportoutfit") && sender.IsRoomAdmin()) {
			// TODO: secret way for admins to export an outfit on the bot - can possibly be removed later on
			const bundle = this.conn.Player.Appearance.MakeAppearanceBundle();
			const str = JMod_exportAppearanceBundle(bundle);
			this.conn.SendMessage("Chat", str.substr(0, 990));
			if (str.length > 990) {
				this.conn.SendMessage("Chat", str.substr(990));
			}
		} else {
			sender.Tell("Whisper", `Unknown command ${cmd.split(" ", 1)[0]}`);
		}

	}

	/**
	 * Returns all point of interest at the EventPosition "party_entrance" for the player who is the maid
	 * @param character The character involved
	 */
	async pointsOfInterestAtEntranceForMaid(character: API_Character) {
		this.charPos.set(character, "party_entrance");
		await this.toggleBotVisibility(true);
		await this.changeRoomBackgroundTo("NightClub");
		this.printChatSeparator();
		this.conn.SendMessage("Emote", `*Hall 3 is one of the biggest in the club and consists of several sections. The entrance area ` +
			`${character.Name} enters does not look kinky at all and reminds of a flashy night club, including a bar, a dance floor and ` +
			`space for sitting, chatting or playing. Other maids are walking back and forth, offering drinks as well as services. ` +
			`Other than the larger number of guests, there are also some naked girls involved in various activities, most likely submissive guests. ` +
			`It is clear that there seem to be quite a few places to visit here.`
		);
		this.conn.SendMessage("Emote", `*When ${character.Name} looks around, several things stick out. ` +
			`In the corner of the room, an absolutely (stunning lady) is seen, clearly standing alone.`
		);
	}

	/**
	 * Fires on any character event
	 * @param connection Originating connection
	 * @param event The received event
	 */
	protected async onCharacterEvent(connection: API_Connector, event: AnyCharacterEvent): Promise<void> {
		if (event.character === this.player) {
			super.onCharacterEvent(connection, event);
		}
		if (event.name === "ItemRemove" && event.character === this.player) {
			if (this.ifUndressed(event.character) && this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.acceptingTheAssignmentStrip) {
				this.printChatSeparator();
				this.conn.SendMessage("Emote", `*The head maid watches ${event.character.Name} stripping with a somewhat pleased expression. She starts ` +
					`slowly circling the exposed maid, some of the other maids either looking with sympathy or open lust at ${event.character.Name}. ` +
					`Karina seems to inspect every part of the bared body, even crouching down to stare at her privates. Eventually, she returns to ` +
					`the front, looking satisfied.`
				);
				this.conn.SendMessage("Chat", `Head Maid Karina: Good. You will be a pleasing enough sight for tonight's special guests. Let's get you ` +
					`ready then. Hold still, dear, while we work on you.`
				);
				this.conn.SendMessage("Emote", `*${event.character.Name} (nods slowly), witnessing a few of the other maids smirking and seemingly quite looking ` +
					`forward to what is bound to happen next.`
				);
				this.introductionProgress = IntroductionProgress.acceptingTheAssignment;
				return;
			} else if (this.storyProgress === StoryProgress.introduction && this.introductionProgress === IntroductionProgress.acceptingTheAssignmentStrip && !this.toldToStripFully) {
				this.conn.SendMessage("Chat", `Head Maid Karina: Strip fully, dear. Don't keep me waiting!`);
				// temporary solution, see variable declaration comment
				this.toldToStripFully = true;
				return;
			} else {
				/* do nothing. */
				return;
			}
		} else if (event.name === "PoseChanged" && event.character === this.player) {
			if (event.character.Pose.some(P => ["BackCuffs", "BackElbowTouch", "BackBoxTie"].includes(P.Name)) &&
				this.storyProgress === StoryProgress.introduction &&
				this.introductionProgress === IntroductionProgress.gettingReady && event.character.Appearance.InventoryGet("ItemArms") === null) {
				this.printChatSeparator();
				this.conn.SendMessage("Emote", `*After ${event.character.Name} moves her hands behind her back, Trixie gently pushes them together, while slipping ` +
					`an armbinder slowly onto them, securing the restraint with leather straps over ${event.character.Name}'s breasts. The maid then expertly closes and ` +
					`tightens all buckles until ${event.character.Name}'s arms are comfortably immobilized, her bossom slightly pushed out due to the position of the arms.`
				);
				this.conn.SendMessage("Chat", `Trixie: Wonderful~~ Now... please part those sweet lips. I also have a nice gag for you~`);
				this.conn.SendMessage("Emote", `*The beaming maid looks at ${event.character.Name} with eager, sparkling eyes, waiting expectantly.`);
				await wait(3500);
				const armbinder = event.character.Appearance.AddItem(AssetGet("ItemArms", "LeatherArmbinder"));
				armbinder?.Extended?.SetType("WrapStrap");
				armbinder?.SetDifficulty(20);
				return;
			} else {
				/* do nothing. */
				return;
			}
		} else if (event.name === "ItemChange" && event.character === this.player && event.item.Group === "Mouth") {
			if (["HalfOpen", "Open", "Ahegao", "Moan"].includes(event.item.GetExpression()) &&
				this.storyProgress === StoryProgress.introduction && event.character.Appearance.InventoryGet("ItemMouth") === null) {
				this.printChatSeparator();
				if (this.introductionProgress === IntroductionProgress.gettingReady) {
					this.conn.SendMessage("Emote", `*The maid smiles happily, watching ${event.character.Name} opening her mouth, and gently pushes in a red ball gag.`);
					this.conn.SendMessage("Chat", `Trixie: Perfect! You look soo good like this. Now let me just get your serving tray.`);
					this.conn.SendMessage("Emote", `*Having the ball gag snugly buckled around ${event.character.Name}'s head she cannot do much more than mumble a few ` +
						`incoherent words as she (watches) Trixie getting a large serving tray and bringing it back with her.`
					);
					await wait(3000);
					const ballGag = event.character.Appearance.AddItem(AssetGet("ItemMouth", "BallGag"));
					ballGag?.SetColor(["#FE3B3B", "Default"]);
					ballGag?.Extended?.SetType("Shiny");
					return;
				}
				if (this.introductionProgress === IntroductionProgress.refusingTheAssignment) {
					this.conn.SendMessage("Chat", `Head Maid Karina: Good girl~`);
					this.conn.SendMessage("Emote", `*The duster gag quickly finds its way into ${event.character.Name}'s mouth, tightly buckled and locked by the smirking ` +
						`head maid.`
					);
					this.conn.SendMessage("Chat", `Head Maid Karina: Now (go and clean) the storage rooms. I expect it to be spotless!`);
					await wait(3000);
					// TODO: also add a Mistress lock (bot does not yet support locks)
					event.character.Appearance.AddItem(AssetGet("ItemMouth", "DusterGag"));
					return;
				}
			} else {
				/* do nothing. */
				return;
			}
		} else if (event.name === "SafewordUsed" && event.character === this.player && !event.release) {
			this.printChatSeparator();
			this.conn.SendMessage("Emote", `*The room rapidly powers down as the emergency shutdown is triggered, leaving ${event.character.Name} in ` +
				`an empty room like when she entered, the calm face of the service bot greeting her.`
			);
			await wait(1500);
			await this.resetRoom(event.character);
			await wait(3000);
			this.playerGreeting(event.character, false);
			event.character.Tell("Whisper", `Dear ${event.character.Name}, here are the authors of this narrative. We are hoping you are fine, ` +
				`even though something happened that made you use your safeword. We are very sorry if any part of our story caused you discomfort! ` +
				`You can whisper any feedback for us to the main bot, by starting your message with '!' (eg. !I was not okay with...)`
			);
		} else {
			/* do nothing. */
			return;
		}
	}

	/**
	 * When the character is checked for no items in key clothing slots, it can be determined that they are undressed
	 * @param character the current player
	 */
	ifUndressed(character: API_Character) {
		if ((character.Appearance.InventoryGet("Cloth") === null)
			&& (character.Appearance.InventoryGet("ClothAccessory") === null)
			&& (character.Appearance.InventoryGet("ClothLower") === null)
			&& (character.Appearance.InventoryGet("Suit") === null)
			&& (character.Appearance.InventoryGet("SuitLower") === null)
			&& (character.Appearance.InventoryGet("Bra") === null)
			&& (character.Appearance.InventoryGet("Corset") === null)
			&& (character.Appearance.InventoryGet("Panties") === null)
			&& (character.Appearance.InventoryGet("Socks") === null)
			&& (character.Appearance.InventoryGet("Shoes") === null)
			&& (character.Appearance.InventoryGet("Gloves") === null)
			/* You can leave the hat on~~ dum dum duum, dum duuum dum, dum dum duum, dum duum~ */
		) {
			return true;
		} else {
			/* character is not fully undressed*/
			return false;
		}
	}

	/**
	 * Frees the player from the slots given in the function
	 * @param character the current player
	 * @param itemSlots an array of all item slots where the player should be freed
	 */
	freePlayerInItemSlots(character: API_Character, itemSlots: AssetGroupName[]) {
		for (const i of itemSlots) {
			character.Appearance.RemoveItem(i);
		}
	}

	/**
	 * Ensures only the correct members are set as admin and changes the open slots of the room to the number of admins present plus one and unlocks it
	 */
	async makeRoomSizeOneMoreThanAdminsPresentAndUnlockRoom() {
		await this.conn.ChatRoomUpdate({
			Admin: [this.conn.Player.MemberNumber, this.conn2.Player.MemberNumber, ...SUPERUSERS],
			Limit: _.clamp(this.conn.chatRoom.characters.filter(c => c.IsRoomAdmin()).length + 1, 2, 10),
			Access: ["All"],
		});
	}

	/**
	 * The room will be cleaned up and reset since we no longer have an active player
	 * @param reason could have been the player leaving OR disconnecting and failing to return in time OR
	 *               being afk for too long and therefore kicked OR giving them a warning and starting the final afk timer
	 */
	async cleanUpSinceActivePlayerWasLostForThisReason(reason: "left" | "disconnect" | "afk" | "afkwarn") {
		switch (reason) {
			case "left":
				this.conn.SendMessage("Emote", "*NOTE: Since the player has left the room, the scene will be reset.");
				await this.resetRoom(null);
				break;
			case "disconnect":
				this.conn.SendMessage("Emote", "*NOTE: Since the player disconnected and failed to return in time, the scene will be reset.");
				await this.resetRoom(null);
				await this.makeRoomSizeOneMoreThanAdminsPresentAndUnlockRoom();
				break;
			case "afk":
				await this.player?.Kick();
				break;
			case "afkwarn":
				this.conn.SendMessage("Emote", `*WARNING: You have been afk for 5 minutes, ${this.player?.Name}. ` +
					`The room will wait 5 more minutes on you advancing the scenario, before you will be guided out by the maids so that ` +
					`another dear guest can enjoy the room.`);
				this.resetTimeoutTimer("afk");
		}
	}

	/**
	 * The room and player will be cleaned up and reset since the active player triggered one
	 * @param character the current player
	 */
	async cleanUpActionsAsActivePlayerTriggeredRoomReset(character: API_Character) {
		this.printChatSeparator();
		this.conn.SendMessage("Emote", `*The room powers down, leaving ${character.Name} in ` +
			`an empty room like when she entered, the calm face of the service bot greeting her.`
		);
		await wait(2500);
		if (character != null) {
			this.freePlayerInItemSlots(character, listOfUsedItemGroups);
		}
		if (!JMod_applyAppearanceBundle(character, this.playerAppearanceStorage, {
			appearance: false,
			bodyCosplay: false,
			clothing: true,
			item: false
		})) {
			logger.warning(`Failed to set ${character.Name}'s appearance to what they joined with!`);
		}
		await wait(2500);
		this.playerGreeting(character, true);
		await this.resetRoom(character);
	}

	/**
	 * Poor Claudia does not want to play through everything when testing new parts, therefore she gets this convient jump-to-latest-part-function
	 * Note: Functionality needs to be manually changed by the developer
	 */
	developerJumpsToLatestPart() {
		this.storyProgress = StoryProgress.theParty;
		this.introductionProgress = IntroductionProgress.gettingReady;
		this.thePartyProgress = ThePartyProgress.arrivingAtTheParty;
		this.conn.SendMessage("Emote", `*- Progress variables changed -\n Jump to the latest scene with (enter).`);
		if (this.player !== null) {
			const ballGag = this.player.Appearance.AddItem(AssetGet("ItemMouth", "BallGag"));
			ballGag?.SetColor(["#FE3B3B", "Default"]);
			ballGag?.Extended?.SetType("Shiny");
		}
	}

	/**
	 * Changes the specified bot's appearance to the appearance of the character given
	 * @param npc the non-player character
	 * @param bot the connector to the bot in question
	 */
	changeBotAppearanceTo(npc: string, bot: API_Connector) {
		if (!listOfAllNPCsOutfits[npc]) {
			logger.error(`Unable to find outfit for npc ${npc}`);
			return;
		}
		const newAppearance = JMod_importAppearanceBundle(listOfAllNPCsOutfits[npc]);
		if (!JMod_applyAppearanceBundle(bot.Player, newAppearance)) {
			logger.warning(`Failed to set ${bot.Player.Name}'s appearance to ${npc}!`);
		}
	}

	/**
	 * Changes all of the specified bot's expression groups to their default state
	 * @param bot the connector to the bot in question
	 */
	resetBotExpressions(bot: API_Connector) {
		const allExpressionGroups: ExpressionGroupName[] = ["Blush", "Emoticon", "Eyebrows", "Eyes", "Fluids", "Mouth"];
		for (const i of allExpressionGroups) {
			bot.Player.SetExpression(i, null);
		}
	}

	/**
	 * Changes the player's appearance to the given outfit string
	 * @param playerOutfit the outfit for the player, only clothes
	 */
	changePlayerApperanceTo(playerOutfit: string) {
		if (!listOfAllPlayerOutfits[playerOutfit]) {
			logger.error(`Unable to find outfit ${playerOutfit} for the player ${this.player?.Name}`);
			return;
		}
		const newAppearance = JMod_importAppearanceBundle(listOfAllPlayerOutfits[playerOutfit]);
		if (this.player !== null) {
			if (!JMod_applyAppearanceBundle(this.player, newAppearance, {
				appearance: false,
				bodyCosplay: false,
				clothing: true,
				item: false
			}, ["Glasses"])) {
				logger.warning(`Failed to set ${this.player?.Name}'s appearance to ${playerOutfit}!`);
			}
		} else {
			logger.warning(`The player is not set.`);
		}
	}

	/**
	 * Updates the current room the bot is in with a given background
	 * @param name the name of the background
	 */
	async changeRoomBackgroundTo(name: UsedRoomBackgrounds) {
		await this.conn.ChatRoomUpdate({
			Background: name
		});
	}

	/**
	 * Makes the primary bot invisible and swaps positions with the player to make it look like the player is alone in the room
	 * @param active turn on visibility if true, turn off if false
	 * NOTE: Occupies the ItemEars slot to do this by applying the "blue ear buds of greater invisibility"
	 */
	async toggleBotVisibility(active: boolean) {
		if (active) {
			this.conn.Player.SetInvisible(true);
			if (this.player !== null) {
				await this.conn.Player.MoveToPos(this.conn.Player.ChatRoomPosition < this.player.ChatRoomPosition ? this.player.ChatRoomPosition : this.player.ChatRoomPosition + 1);
			}
		} else {
			this.conn.Player.SetInvisible(false);
			if (this.player !== null) {
				await this.conn.Player.MoveToPos(this.conn.Player.ChatRoomPosition < this.player.ChatRoomPosition ? this.player.ChatRoomPosition - 1 : this.player.ChatRoomPosition);
			}
		}
	}

	/**
	 * Main bot will print a seperator line into the chat to make the difference between old and new text blocks more obvious
	 */
	printChatSeparator() {
		this.conn.SendMessage("Chat", "------------------------------------------------------------------");
	}

	/**
	 * Destroys the logic, removing the timer
	 */
	destroy() {
		if (this.timer !== null) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
}
