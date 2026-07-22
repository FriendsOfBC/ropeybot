/*
 * Copied from the original bot hub, with permission.
 */

import promClient from "prom-client";

import { wait } from "../utils";
import { AdministrationLogic } from "./administrationLogic";
import { MatchmakingNotifier } from "../gameroomMatchmaking";

import _ from "lodash";
import { API_Character, API_Connector, logger, AssetGet } from "bc-bot";
import { ConfigFile } from "../../config";

interface challenge {
	readonly players: number;
	readonly story1: string[];
	readonly role1: string[];
	readonly story2: string[];
	readonly role2: string[];
	readonly story3: string[];
	readonly role3: string[];
	readonly room_background: string[];
}

type GameState =
	| "game_not_started"
	| "waiting_on_next_turn"
	| "waiting_on_roleplay_completion";

/** The matchmaking queue count that triggers a beep message to everyone on it */
const BEEP_AT_THIS_COUNT = 3;

// Metrics
const metric_gameStarted = new promClient.Counter({
	name: "hub_roleplaychallenge_game_started",
	help: "hub_roleplaychallenge_game_started",
	labelNames: ["challenge"] as const
});
const metric_gameExtended = new promClient.Counter({
	name: "hub_roleplaychallenge_game_extended",
	help: "hub_roleplaychallenge_game_extended",
	labelNames: ["challenge"] as const
});

export class RoleplaychallengeGameRoom extends AdministrationLogic {
	/** The registered players */
	players: Set<API_Character> = new Set();
	/** The players that do the roleplay challenge currently */
	active_players: API_Character[] = [];
	/** Last round's active players */
	last_players: Set<API_Character> = new Set();
	last_challenge: string = "none";
	last_challenge_id: number = 0;
	gameState: GameState = "game_not_started";
	turnTimer: number = 0;
	printedChallengeExtension: boolean = false;
	playersVotingForChallengeExtension: Set<API_Character> = new Set();

	matchmaking_notifier: MatchmakingNotifier;
	/** Block the beepme command when this is true */
	blockMatchmakingJoin: boolean = false;
	/** To be set to true when a match was found */
	beepSuccess: boolean = false;
	/** Timer for blocking the beepme command shortly after a successful match*/
	blockMatchmakingTimer: number = 0;

	private tickTimer: NodeJS.Timeout;

	private charTimer: Map<API_Character, ReturnType<typeof setTimeout>> = new Map();

	readonly conn: API_Connector;

	constructor(conn: API_Connector, config: ConfigFile) {
		super({ inactivityKickEnabledOnlyBelowFreeSlotsCount: 5 }, config);
		this.conn = conn;

		this.registerCommand("status", (connection, args, sender) => this.handleStatusCommand(sender), `To get information about the running game'`);
		this.registerCommand("joingame", (connection, args, sender) => this.handleJoingameCommand(sender), `To register as a new player`);
		this.registerCommand("leavegame", (connection, args, sender) => this.unregisterPlayer(sender, " due to withdrawing from the game."), `To unregister from the game`);
		this.registerCommand("next", (connection, args, sender) => this.handleNextCommand(args, sender), `To start a new round after registering`);
		this.registerCommand("start", (connection, args, sender) => this.handleNextCommand(args, sender), null);
		this.registerCommand("extend", (connection, args, sender) => this.handleExtendCommand(sender), `To prolong a challenge 2 minutes before it ends`);
		this.registerCommand("beepme", (connection, args, sender) => this.handleBeepmeCommand(sender), `To get beeped when enough players are online`);

		this.matchmaking_notifier = new MatchmakingNotifier(conn, BEEP_AT_THIS_COUNT);

		this.tickTimer = setInterval(this.Tick.bind(this), 1000);
		this.setGameState("game_not_started");
	}

	/** Array of character RP traits */
	readonly traits: string[] = [
		"slutty", "eager", "friendly", "possessive", "manipulative", "helpful", "lazy", "cute", "overworked",
		"bratty", "cheeky", "serious", "emotionless", "horny", "arrogant", "chatty", "impatient", "shy",
		"lively", "silly-acting", "stubborn", "playful", "charming", "cunning", "funny", "charismatic", "slightly rude",
		"kind", "cheerful", "dignified", "energetic", "enthusiastic", "humble", "kinky", "persuasive", "relaxed",
		"romantic", "sweet", "trusting", "understanding", "quiet", "stern", "strict", "soft", "clumsy",
		"demanding", "difficult", "extravagant", "forgetful", "graceful", "indecisive",
		"naive", "neurotic", "trusting", "paranoid", "provoking", "timid", "passive"
	];

	/** Array of generic character RP roles */
	readonly roles: string[] = [
		"fetish movie maker", "nurse", "reporter", "movie star", "rich lady", "aristocrat", "police officer",
		"escaped asylum patient", "politician", "fetish movie actress", "pet lover", "exhibitionist", "doctor",
		"married wife", "photographer", "curious student", "business woman", "model", "animal trainer"
	];

	/** Array of room backgrounds */
	readonly backgrounds: string[] = [
		"BDSMRoomBlue",
		"BDSMRoomRed",
		"BDSMRoomPurple",
		"Beach",
		"BarRestaurant",
		"BeachHotel",
		"BondageBedChamber",
		"Management",
		"ChillRoom",
		"BoutiqueMain",
		"CozyLivingRoom",
		"CosyChalet",
		"ForestPath",
		"Gardens",
		"Introduction", // bar-like space
		"KidnapLeague", // fancy room
		"LostVages", //casino
		"MaidQuarters",
		"MainHall",
		"NightClub",
		"MaidCafe",
		"Castle",
		"OutdoorPool",
		"ParkDay",
		"Ranch",
		"SnowyStreetDay1",
		"RooftopParty",
		"SheikhPrivate",
		"ThroneRoom"
	];

	/** Array of RP challenges */
	readonly challenges: challenge[] = [
		{
			players: 2,
			story1: [],
			role1: ["club member"],
			story2: ["wanting to complain to"],
			role2: ["club maid", "mistress"],
			story3: [", about the selection of toys in the club", ", about loud noises from the other guests in the next room"],
			role3: [],
			room_background: ["BDSMRoomRed", "BDSMRoomBlue", "BDSMRoomPurple", "Management", "BondageBedChamber", "MainHall"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["wanting to book a fetish room in the club from"],
			role2: ["club maid", "mistress"],
			story3: [],
			role3: [],
			room_background: ["BDSMRoomRed", "BDSMRoomBlue", "BDSMRoomPurple", "Management", "BondageBedChamber", "MainHall"]
		},
		{
			players: 2,
			story1: [],
			role1: ["clerk"],
			story2: ["at the local fetish store, watching"],
			role2: ["friend", "mistress", "famous idol", "professor at her university", "maid", "reporter"],
			story3: [", curiously wandering into the store"],
			role3: [],
			room_background: ["BoutiqueMain"]
		},
		{
			players: 3,
			story1: [],
			role1: [],
			story2: ["going shopping for a new (pick some item) in the local fetish store, meeting"],
			role2: ["friend", "mistress", "famous idol", "professor at her university"],
			story3: [", followed by her leashed partner"],
			role3: ["pet girl", "subbie wife"],
			room_background: ["BoutiqueMain"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["going on a blind BDSM play date with"],
			role2: [],
			story3: [],
			role3: [],
			room_background: ["NightClub", "MaidCafe", "SheikhPrivate", "BDSMRoomBlue", "BDSMRoomRed", "BDSMRoomPurple",
				"BarRestaurant", "BeachHotel", "BondageBedChamber", "Management", "ChillRoom"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["finding out her best friend"],
			role2: ["career woman", "teacher", "wife", "politician", "writer", "artist"],
			story3: [", is a regular in the bondage club"],
			role3: [],
			room_background: ["NightClub", "MaidCafe", "BDSMRoomBlue", "BDSMRoomRed", "BDSMRoomPurple",
				"BondageBedChamber", "Management"]
		},
		{
			players: 2,
			story1: [],
			role1: ["club maid"],
			story2: ["asking"],
			role2: ["head maid"],
			story3: [" at the club, for a raise"],
			role3: [],
			room_background: ["MaidQuarters"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["meeting her old high school flame"],
			role2: [],
			story3: [", at a beach that is allowing nudity, eventually finding out they are staying at the same beach hotel nearby"],
			role3: [],
			room_background: ["Beach", "BeachHotel"]
		},
		{
			players: 2,
			story1: [],
			role1: ["bored wife"],
			story2: ["inviting"],
			role2: ["sales woman for kinky toys"],
			story3: [", into her home"],
			role3: [],
			room_background: ["BeachHotel", "BondageBedChamber", "ChillRoom", "CozyLivingRoom", "CosyChalet", "KidnapLeague"]
		},
		{
			players: 3,
			story1: [],
			role1: [],
			story2: ["inviting"],
			role2: ["sales woman for kinky toys"],
			story3: [", into her home, thinking that the person she is sharing the flat with is not here currently. Her flat mate is"],
			role3: [],
			room_background: ["BeachHotel", "BondageBedChamber", "ChillRoom", "CozyLivingRoom", "CosyChalet", "KidnapLeague", "Castle"]
		},
		{
			players: 3,
			story1: [],
			role1: [],
			story2: ["going to the club for the first time together with her married wife"],
			role2: [],
			story3: [", already getting deep into a conversation with"],
			role3: ["club mistress", "club maid", "club pet"],
			room_background: ["NightClub", "MaidCafe", "Introduction", "Management", "SheikhPrivate"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["finding out her new neighbour"],
			role2: [],
			story3: [", is into BDSM because she found something while helping her to move in"],
			role3: [],
			room_background: ["BondageBedChamber", "ChillRoom", "CozyLivingRoom", "CosyChalet", "KidnapLeague"]
		},
		{
			players: 2,
			story1: [],
			role1: ["employee"],
			story2: ["suddenly getting a special offer from"],
			role2: ["tyrant of a boss"],
			story3: [", to get the promotion she always wanted"],
			role3: [],
			room_background: ["BoutiqueMain", "Introduction", "LostVages", "NightClub", "MaidCafe", "ParkDay", "Ranch"]
		},
		{
			players: 2,
			story1: [],
			role1: ["college student"],
			story2: ["getting a choice between taking her bad grade or receiving a special lesson from"],
			role2: ["teaching assistant", "professor"],
			story3: [],
			role3: [],
			room_background: ["KidnapLeague", "SlipperyClassroom"]
		},
		{
			players: 2,
			story1: [],
			role1: ["club member"],
			story2: ["gambling in the bondage club's casino at the table of"],
			role2: ["croupier"],
			story3: [". The poor player just lost all the money she had with her tonight and is offered an alternative way of payment to stay in the dice game"],
			role3: [],
			room_background: ["LostVages"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["visiting a dear friend who is currently in therapy at the asylum, but after being let in she got lost, meeting"],
			role2: ["patient", "nurse"],
			story3: [],
			role3: [],
			room_background: ["AsylumEntrance", "AsylumTherapy"]
		},
		{
			players: 2,
			story1: [],
			role1: [],
			story2: ["making it into the finals of the ever popular TV game show 'The kinkster', competing against"],
			role2: [],
			story3: [". To win the big prize, their task is to explain a kink of them to the audience in the room and why they love it, " +
				"in hopes of getting the most votes and the elusive title 'The kinkster'"],
			role3: [],
			room_background: ["MovieStudio", "BondageBedChamber", "KidnapLeague"]
		},
		{
			players: 2,
			story1: [],
			role1: ["club maid", "club member", "club mistress's pet girl", "asylum nurse"],
			story2: ["who lost a bet and now got the seemingly impossible task to convince"],
			role2: ["head maid", "club mistress"],
			story3: [", to agree to being tied up in public"],
			role3: [],
			room_background: ["KidnapLeague", "NightClub", "Introduction", "Management"]
		},
		{
			players: 3,
			story1: [],
			role1: ["club maid", "club member"],
			story2: ["who just witnessed that"],
			role2: ["club maid", "club member", ", owned pet girl"],
			story3: [", clumsily spilled a drink over the outfit of"],
			role3: ["club mistress", "club member"],
			room_background: ["MaidCafe", "BDSMRoomRed", "NightClub", "Introduction", "Management"]
		},
		{
			players: 2,
			story1: ["As 'The Great Houdini',"],
			role1: ["well-known stage performer in the bondage club,"],
			story2: ["who is currently entertaining the audience with her latest show, selecting"],
			role2: [],
			story3: [", as a volunteer for the next magic trick"],
			role3: [],
			room_background: ["CollegeTheater"]
		},
		{
			players: 3,
			story1: [],
			role1: [],
			story2: ["sneaking into the infamous cult of kink. But she was detected by"],
			role2: ["acolyte", "member"],
			story3: [" at the cult, trying to call for"],
			role3: ["inquisitor", "head cultist", "high priestess"],
			room_background: ["Confessions", "Management", "AbandonedBuilding", "BDSMRoomPurple"]
		},
		{
			players: 3,
			story1: [],
			role1: ["patient"],
			story2: ["in therapy at the asylum, currently scheduled for a visit by"],
			role2: ["doctor", "nurse", "lawyer"],
			story3: [", accompanied by"],
			role3: ["nurse in training", "medical student, doing her internship at the asylum"],
			room_background: ["AsylumEntrance", "AsylumTherapy"]
		},
		{
			players: 3,
			story1: [],
			role1: ["actress"],
			story2: ["going to an audition for her next role. However, it is an audition for a fetish movie - a fact not known to her. She is greeted by"],
			role2: ["director", "interviewer"],
			story3: [", accompanied by"],
			role3: ["young woman, doing an internship here", "actress, also applying for the role", "lead actress of the movie", "secretary"],
			room_background: ["KidnapLeague", "ChillRoom", "MovieStudio"]
		},
		{
			players: 2,
			story1: [],
			role1: ["actress"],
			story2: ["going to an audition for her next role. However, it is an audition for a fetish movie - a fact not known to her. There she meets"],
			role2: ["director of the movie", "lead actress of the movie", "actress, also applying for the role"],
			story3: [],
			role3: [],
			room_background: ["KidnapLeague", "ChillRoom", "MovieStudio"]
		},
		{
			players: 2,
			story1: [],
			role1: ["inventor of fetish toys", "bondage club owner", "rope maker"],
			story2: ["going to the bank to present her business plan for getting a larger investiment into her latest business idea. Inside, she is greeted by"],
			role2: ["bank employee", "bank manager"],
			story3: [],
			role3: [],
			room_background: ["KidnapLeague", "MainHall"]
		},
		{
			players: 3,
			story1: [],
			role1: ["inventor of fetish toys", "bondage club owner", "rope maker"],
			story2: ["going to the bank to present her business plan for getting a larger investiment into her latest business idea. Inside, she is greeted by"],
			role2: ["bank employee", "bank manager"],
			story3: [", as well as"],
			role3: ["secretary", "business consultant"],
			room_background: ["KidnapLeague", "MainHall"]
		},
		{
			players: 3,
			story1: [],
			role1: [],
			story2: ["shadowing her wife"],
			role2: ["bank manager", "model", "politician", "teacher", "doctor"],
			story3: [", secretly to uncover why she comes late so often. She follows her into what appears to be a fetish night club, where she spots her wife together with"],
			role3: ["BDSM veteran", "bondage lover", "switch", "mistress"],
			room_background: ["KidnapLeague", "BondageBedChamber", "Management", "BDSMRoomBlue", "BDSMRoomPurple"]
		}
	];
	// [story1] [player1] is a [trait] [role1] [story2] [player2], who is a [trait] [role2] [story3] [player3], a [trait] [role3].


	aggregateVariantsOfAllChallenges() {
		let int: number = 1;
		const arrayLength = this.challenges.length;
		for (let i = 0; i < arrayLength; i++) {
			if (this.challenges[i].players === 2 || this.challenges[i].players === 3) {
				let tmp = this.traits.length * this.traits.length *
					(this.challenges[i].story1.length > 1 ? this.challenges[i].story1.length : 1) *
					(this.challenges[i].story2.length > 1 ? this.challenges[i].story2.length : 1) *
					(this.challenges[i].story3.length > 1 ? this.challenges[i].story3.length : 1) *
					(this.challenges[i].role1.length === 0 ? this.roles.length : this.challenges[i].role1.length) *
					(this.challenges[i].role2.length === 0 ? this.roles.length : this.challenges[i].role2.length);
				if (this.challenges[i].players === 3) {
					tmp *= this.traits.length *
						(this.challenges[i].role3.length === 0 ? this.roles.length : this.challenges[i].role3.length);
				}
				int += tmp;
			} else {
				logger.error(`Unsupported number of players in this.challenges[${i}]: ${this.challenges[i].players}.`);
			}
		}
		// return rounded down number in million
		return Math.floor(int / 1000000);
	}

	/**
	 * The opening note when a player enters the room
	 * @param character the player in question
	 */
	playerGreeting(character: API_Character) {
		character.Tell("Emote", "*Welcome to this game room where we play");
		character.Tell("Chat", "'Roleplay challenge'");
		// TODO: Another great oppurtunity to advertise the bot and add some link to more info in the bot's profile
		character.Tell("Emote", `*a game by Claudia, room concept by Claudia & Clare, and bot by Jomshir. The game currently offers ` +
			`${this.challenges.length} randomized roleplay challenges in over ` +
			`${this.aggregateVariantsOfAllChallenges().toFixed(0)} million unique variants. It is played ` +
			`with two or three players and is a vehicle to bring more roleplay back to the public rooms of the club. ` +
			`\nPlease find the manual and the WHISPER commands to participate in the profile / online description ` +
			`of the game's host '${this.conn.Player}'.`
		);
		character.Tell("Chat", "NEWS: If you want to be notified when a game can be started, there is a new command for sending you a BEEP (see bot profile).");
	}

	// Backup of the online description of the bot
	static readonly description = `
ROLEPLAY CHALLENGE
===================================================================
a game by Claudia, room concept by Claudia & Clare, using Jomshir's BotAPI

The game offers many randomized roleplay challenges in several million unique variants. It is played with two to three players and is a vehicle to bring more roleplay back to the public rooms of the club. This room may make it easier to meet new people who love to roleplay, like most members did in the early days of the club. The length of a play is flexible, beyond the first 15 mins.

Game flow
---------------------------
In each game round, two to three out of all registered players will be randomly selected and given a random, open roleplay setting that they are supposed to act out improvised, at least 15 minutes long, and for fun and entertainment, with the rest of the players being the audience. So be funny, be silly, be kinky, do it your way! Oh, and feel free to dress according to your roles for extra immersion.

Two minutes before the end of the challenge, every registered player has the chance to vote for prolonging the running roleplay by 10 more minutes if everyone likes the way it is going.

Due to the randomized nature of the challenges, the settings are designed very open and unspecific, sometimes even a bit silly. It is intentional to leave a lot of freedom to fill the scene with your ideas and kinks. Also a dominant role given to a submissive person does not mean she cannot be dommed by the maid who is actually a dominant. You can lead the scene according to your enjoyments as long as everyone is fine with it. It's all about having fun together!

PLEASE RESPECT EACH OTHER'S LIMITS! Therefore, it is recommended to read the profile / character description of the other players and always obey (OOC - out of character) statements in round brackets!

When a challenge has timed out and someone triggers the next challenge with the chat command '!next', please come to an end to not have two roleplays running at the same time in the room.

If you just want to watch and don't join the game, that is fine as long as there are enough registered players, but please don't disturb the roleplay and don't afk in the room! If you have a great idea for a roleplay scenario to add to the game, please leave us feedback.

Enjoy, be fair and respect each other and the rules!


The game commands
===================================================================
Note: All these commands need to be whispered to the bot. Please be mindful that your immersion settings or owner rules may prevent you from being able to whisper.

► !help                  To show a list of these commands into the chat, whisper '!?' or '!help'

► !beepme             To get beeped when enough players for a game are available
► !feedback          To send the message after the command as feedback to the authors
► !joingame          To register as a new player, whisper '!joingame'
► !kick                  To start a vote to kick someone from the room: !kick [name] [reason]
► !leavegame       To unregister yourself from the game and become a spectator (current challenge will go on)
► !listvotes           To list all currently running types of votes, e.g. kick votes
► !next                 To start a new round, whisper '!next', after registering. Needs 2+ players.
                              Number of players is randomized but you can use '!next 3' (or 2) to select it.
► !status              To get information about the running game, whisper '!status'

Note: There may be some further context-specific commands used during short phases of the game that are not listet here or in the help. Those are announced in-game when relevant.


Add your own roleplay challenge to the game
======================================================
We are happy for your propoals on scenes to add to the game in the future. You can write them very freely, but there are some special parts that can be used:

mandatory: {player#} a randomly selected player, this spot will be replaced with the name of the player later
optional: {trait} the trait of a player, will be randomly replaced by something like: shy, stern, grumpy
optional: {role} the role or job of a player, if you want that to be randomly filled
If you want to add your own randomized choices, use the <option1|option2|...> notation anywhere in the text.

Examples of how freely challenges can be written
--------------------------------------------------
• {player1} is a {trait} club member wanting to complain to {player2}, who is a {trait} <club maid|mistress>, about <the selection of toys in the club|loud noises from the other guests in the next room>.

• As 'The Great Houdini', {player1} is well known in the club, always attracting a crowd. This evening, she is once more entertaining the audience with her kinky magic show, asking for volunteers for the the final trick. In the end, she picks {player2}, a {trait} {role}, and {player3}, a {trait} {role}.

• The asylum is a place of many kinky rumours. Today, the {trait} <reporter|lawyer> {player1} was visiting due to a job assignment there, but <got lost on her way out|lost her visiting permit>. She is spotted by the two nurses {player2} and {player3}, the latter one behaving very {trait}.

Note: The challenges are intentionally not too specific, giving some freedom to the roleplayers on what may happen next, not focusing on specific kinks or forcing someone directly and irreversibly into a domme or sub role.

How to send your ideas to us?
-------------------------------------------
Just send it as feedback to us, adding "!feedback " in front of it and whispering it to the bot. When we add it, we will attribute it to your name, telling in-game that it is a challenge by you, unless you don't want that. Looking forward to your roleplay challenge!


Weekly game room rotation
===================================
We noticed that running all three of the game rooms in parallel does not work well, due to interested players not waiting if the room is empty but also not sufficiently using the !beepme command for matchmaking purposes. For now, we therefore put the game rooms on a weekly rotation to focus player interest:

Monday         I wouldn't mind
Tuesday        Roleplay Challenge
Wednesday   Kidnappers
Thursday       Roleplay Challenge
Friday            I wouldn't mind
Saturday        Kidnappers + I wouldn't mind
Sunday          Kidnappers + Roleplay Challenge


Contact us
===================================
You can whisper any feedback (including bug reports) for the authors of the room to the bot, by starting your message with '!feedback' (e.g. !feedback I want to tell you that...).
In urgent cases, you can also contact Jomshir, the creator of the bot, on BondageClub discord: Jomshir98#0022

This bot was created using Jomshir's BotAPI.
If you would like to make a bot room similar to this one, you can find all necessary info on the Bondage Club Scripting Community Discord: https://discord.gg/SHJMjEh9VH

☻Have fun~☺
`.trim();

	/**
	 * When character enters the room
	 * @param connection Originating connection
	 * @param character The character that entered the room
	 */
	protected async onCharacterEntered(connection: API_Connector, character: API_Character): Promise<void> {
		if (character.IsBot()) return;
		super.onCharacterEntered(connection, character);
		const oldPlayer = Array.from(this.players.values()).find(p => p.MemberNumber === character.MemberNumber);
		if (oldPlayer) {
			// old player returning

			this.charTimer.forEach((value, key) => key.MemberNumber === character.MemberNumber && clearTimeout(value));

			const active_players_index = this.active_players.indexOf(oldPlayer);
			if (active_players_index >= 0) {
				this.active_players.splice(active_players_index, 1, character);
			}
			if (this.last_players.has(oldPlayer)) {
				this.last_players.delete(oldPlayer);
				this.last_players.add(character);
			}
			if (this.playersVotingForChallengeExtension.has(oldPlayer)) {
				this.playersVotingForChallengeExtension.delete(oldPlayer);
				this.playersVotingForChallengeExtension.add(character);
			}
			this.players.delete(oldPlayer);
			this.players.add(character);

			// Move player back to original position
			if (this.active_players.includes(character)) {
				await this.reorderPlayers();
			}
		} else {
			// new player
			await wait(2000);
			this.playerGreeting(character);
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
		if (this.players.has(character) && intentional) {
			await this.unregisterPlayer(character, " due to leaving the room.");
		} else if (this.players.has(character) && !intentional) {
			this.charTimer.set(character, setTimeout(() => { void this.unregisterPlayer(character, " due to disconnecting."); }, 90_000));
		}
	}

	private async unregisterPlayer(character: API_Character, message: string) {
		if (this.players.has(character)) {
			this.conn.SendMessage("Emote", `*GAME: ${character} was unregistered as an active player` + message);
			// player at turn left, therefore do a soft reset
			if (this.active_players.includes(character) && this.players.size > 1) {
				if (!this.conn.chatRoom.characters.includes(character)) {
					await this.waitForNextRoundAsPlayerLeft();
				}
			}
			_.remove(this.active_players, c => c === character);
			this.players.delete(character);
			if (this.players.size === 0) {
				this.setGameState("game_not_started");
				void this.conn.ChatRoomUpdate({
					Description: "[BOT] scripted multiplayer gameroom | manual in bot profile | READY",
					Background: "CollegeTheater"
				});
			}

		}
	}

	public roomCanShutDown(): boolean {
		if (this.players.size === 0 && this.conn.chatRoom.characters.length === 1) {
			return true;
		}
		return false;
	}

	private async waitForNextRoundAsPlayerLeft() {
		this.setGameState("waiting_on_next_turn");
		// Move bot to pos 0
		await this.reorderPlayers();
		await this.conn.ChatRoomUpdate({
			Description: "[BOT] scripted multiplayer gameroom | manual in bot profile | READY",
			Background: "CollegeTheater"
		});
		this.conn.SendMessage("Emote", `*GAME: As the player at turn has left the room, every registered player can ` +
			` the next round by whispering '!next' to the bot.`
		);
	}


	handleStatusCommand(sender: API_Character) {
		sender.Tell("Whisper", `This is the current status of the game:` +
			`${(this.gameState === "game_not_started" || this.gameState === "waiting_on_next_turn") ?
				`There are ${this.matchmaking_notifier.waitingPlayers > 0 ? `players` : `no players`} in the 'matchmaking ` +
				`queue'. You may want to consider joining the queue with the beepme command to speed up the next match.\n` : ``}` +
			`\nThe game has the following registered players:\n` +
			Array.from(this.players.values()).map(A => A.toString()).join(", ") + `\nThe latest roleplay challenge is:\n${this.last_challenge}`
		);
	}

	async handleJoingameCommand(sender: API_Character) {
		if (this.players.has(sender)) {
			return;
		}
		this.players.add(sender);
		this.conn.SendMessage("Emote", `*GAME: ${sender} was registered as an active player.`);

		this.beepSuccess = await this.matchmaking_notifier.notifyPlayersOfEnoughInterest(Array.from(this.players));
		void this.conn.ChatRoomUpdate({
			Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | ${this.matchmaking_notifier.waitingPlayers} queued`,
			Background: "CollegeTheater"
		});
		if (this.beepSuccess) {
			sender.Tell("Chat", `GAME: You joining the game triggered a matchmaking beep to ${BEEP_AT_THIS_COUNT} players in ` +
				`the waiting queue just now. Please stay around until everyone who was beeped will join the room within the next ` +
				`few minutes in order to start a game. Have fun!~`
			);
		} else if (this.matchmaking_notifier.waitingPlayers > 0) {
			sender.Tell("Chat", `GAME: There ${this.matchmaking_notifier.waitingPlayers > 1 ? `are` : `is`} currently ` +
				`${this.matchmaking_notifier.waitingPlayers} ` +
				`player${this.matchmaking_notifier.waitingPlayers > 1 ? `s` : ``} in the 'matchmaking ` +
				`queue'. At ${BEEP_AT_THIS_COUNT} players in the queue, everyone will be beeped. ` +
				`You may want to consider also joining the queue with the beepme command to speed up the next match.`
			);
		}
		await this.doTheWiggleDance();
		// saw some bugs, therefore make sure it was reset
		await wait(7000);
		this.conn.Player.SetActivePose([]);
	}

	async handleNextCommand(args: string, sender: API_Character) {
		if (!this.players.has(sender)) {
			sender.Tell("Whisper", "GAME: Please register first by writing '!joingame' into the chat.");
		} else if (this.players.has(sender) && (this.gameState === "game_not_started" || this.gameState === "waiting_on_next_turn")) {
			if (this.players.size < 2) {
				this.conn.SendMessage("Emote", `*GAME: The game needs a minimum of two registered players to start the next round.`);
				return;
			}
			this.setGameState("waiting_on_roleplay_completion");
			await this.determineNextChallenge(args);
		} else {
			sender.Tell("Whisper", `GAME: Cannot start, as a challenge is currently already in progress. You will be in the pool ` +
				`of potential players for the next one.`
			);
		}
	}

	async handleBeepmeCommand(sender: API_Character) {
		if (this.blockMatchmakingJoin) {
			sender.Tell("Whisper", `GAME: The beepme command is temporarily deactivated, since the previous 'matchmaking' ` +
				`was successful just now. Please wait until everyone who was beeped will join this room and try the command ` +
				`again in a few minutes, in case not enough players for starting a game will join.`
			);
		} else if (this.gameState === "game_not_started" || this.gameState === "waiting_on_next_turn") {
			await this.matchmaking_notifier.addPlayerToTheMatchmakingQueue(sender);
			void this.conn.ChatRoomUpdate({
				Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | ${this.matchmaking_notifier.waitingPlayers} queued`,
				Background: "CollegeTheater"
			});
			this.beepSuccess =
				await this.matchmaking_notifier.notifyPlayersOfEnoughInterest(Array.from(this.players));
		} else {
			sender.Tell("Whisper", `GAME: You cannot use this during a running game. Please register as a player ` +
				`if you have not done so and wait in the room until the next round starts.`
			);
		}
	}

	handleExtendCommand(sender: API_Character) {
		if (this.players.has(sender) && !this.playersVotingForChallengeExtension.has(sender) && this.printedChallengeExtension) {
			this.playersVotingForChallengeExtension.add(sender);
			if (this.playersVotingForChallengeExtension.size / this.players.size > 0.7) {
				this.turnTimer = Date.now() + 600_000;
				this.conn.SendMessage("Emote", `*GAME: The current role play challenge was successfully extended by another 10 mins.`);
				this.playersVotingForChallengeExtension.clear();
				this.printedChallengeExtension = false;
				metric_gameExtended
					.labels({ challenge: this.last_challenge_id })
					.inc();
				logger.alert("Challenge was extended by another 10 minutes.");
			} else {
				this.conn.SendMessage("Emote", `*GAME: ${sender} likes the ongoing roleplay and has used '!extend'. To prolong ` +
					`the current challenge by 10 more ` +
					`minutes, ${Math.ceil(0.71 * this.players.size) - this.playersVotingForChallengeExtension.size} more ` +
					`registered player(s) need to whisper an extension vote.`
				);
			}
		}
	}

	// TODO: Idea: Introduce a new command !new that both active players can use in the first minute of a running challenge to ask for a new one,
	// if all vote for it. That said, maybe this is not needed, since if a player at turn leaves the room, the challenge is stopped, too.
	private Tick() {
		const now = Date.now();

		if (this.beepSuccess) {
			this.blockMatchmakingTimer = now + 3 * 60 * 1000;
			this.beepSuccess = false;
			this.blockMatchmakingJoin = true;
		}
		if (now >= this.blockMatchmakingTimer) {
			this.blockMatchmakingJoin = false;
		}

		if (this.gameState === "game_not_started" || this.gameState === "waiting_on_next_turn") return;

		if (this.turnTimer - now <= 120_000 && this.gameState === "waiting_on_roleplay_completion" && !this.printedChallengeExtension) {
			this.conn.SendMessage("Emote", `*GAME: Two minutes remaining. Every registered player can now vote to extend the ` +
				`time of the current role play challenge by another 10 mins by whispering '!extend' to the bot.`
			);
			this.printedChallengeExtension = true;
		}
		if (now >= this.turnTimer) {
			if (this.gameState === "waiting_on_roleplay_completion") {
				this.setGameState("waiting_on_next_turn");
				// move Bot to room pos 0
				void this.reorderPlayers();
				void this.conn.ChatRoomUpdate({
					Description: "[BOT] scripted multiplayer gameroom | manual in bot profile | READY"
				});
				this.conn.SendMessage("Emote", `*GAME: The time for this roleplay challenge is over. Please bring the scene slowly to an end ` +
					`or continue it in a new room. Any registered player can now start the next challenge with '!next'.`
				);
			}
		}

		this.updateSign();
	}

	private updateSign() {
		const now = Date.now();
		const tickAlternateText = (Math.floor(now / 1000) % 10) < 5;

		const sign = this.conn.Player.Appearance.AddItem(AssetGet("ItemMisc", "WoodenSign"));
		if (sign) {
			// sign.
			let text = "";
			let textColor = "#FFFFFF";
			const green = "#7AFF4F";
			const orange = "#FFB732";
			const timeLeft = Math.ceil(Math.max(0, this.turnTimer - now) / 1000);
			const timeLeftString = `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`;
			if (this.gameState === "game_not_started") {
				text = "Roleplay\nChallenge";
			} else if (this.gameState === "waiting_on_roleplay_completion") {
				text = tickAlternateText ? `Roleplay\nin progress` : `${timeLeftString}\nleft`;
				textColor = timeLeft < 120 ? orange : green;
			} else if (this.gameState === "waiting_on_next_turn") {
				text = "Waiting for\nnext round";
			} else {
				text = "ERROR";
			}
			sign.Extended?.SetText(text);
			sign.SetColor(["#000000", "#040404", textColor as HexColor]);
		}
	}

	private setGameState(state: GameState) {
		this.gameState = state;
		if (state === "game_not_started") {
			this.active_players = [];
			this.playersVotingForChallengeExtension.clear();
			this.printedChallengeExtension = false;
		} else if (state === "waiting_on_roleplay_completion") {
			// 15m to role play
			this.turnTimer = Date.now() + 900_000;
		} else if (state === "waiting_on_next_turn") {
			this.playersVotingForChallengeExtension.clear();
			this.printedChallengeExtension = false;
			this.active_players = [];
		} else {
			logger.error("Bad state", state);
		}

		this.updateSign();
	}

	async doTheWiggleDance() {
		for (let i = 0; i < 4; i++) {
			this.conn.Player.SetActivePose(["Yoked"]);
			await wait(350);
			this.conn.Player.SetHeightOverride(50);
			this.conn.Player.SetActivePose(["OverTheHead", "Kneel"]);
			await wait(600);
			this.conn.Player.SetHeightOverride(null);
		}
		this.conn.Player.SetActivePose(["Yoked"]);
		await wait(400);
		this.conn.Player.SetActivePose(["BaseUpper"]);
	}

	async determineNextChallenge(players: string) {
		const number_of_previous_round_participants = this.last_players.size;
		let number_of_next_round_participants: number = 2;
		let index: number = -1;

		if (this.players.size < 3) {
			index = this.getRandomChallengeWithThisNumberOfPlayers(2);
			number_of_next_round_participants = 2;
		} else {
			if (players.startsWith("2")) {
				index = this.getRandomChallengeWithThisNumberOfPlayers(2);
				number_of_next_round_participants = 2;
			} else if (players.startsWith("3")) {
				index = this.getRandomChallengeWithThisNumberOfPlayers(3);
				number_of_next_round_participants = 3;
			} else {
				index = Math.floor(Math.random() * this.challenges.length);
				number_of_next_round_participants = this.challenges[index].players;
			}
		}

		this.active_players = [];
		if (this.players.size >= number_of_previous_round_participants + number_of_next_round_participants) {
			let i = 0;
			while (i < number_of_next_round_participants) {
				const keys = Array.from(this.players.keys());
				const key = keys[Math.floor(Math.random() * keys.length)];
				if (!this.active_players.includes(key) && !this.last_players.has(key)) {
					this.active_players.push(key);
					i++;
				}
			}

		} else {
			let i = 0;
			while (i < number_of_next_round_participants) {
				const keys = Array.from(this.players.keys());
				const key = keys[Math.floor(Math.random() * keys.length)];
				if (!this.active_players.includes(key)) {
					this.active_players.push(key);
					i++;
				}
			}
		}

		await this.constructAndStartChallenge(index);

		this.last_players.clear();
		this.last_players = new Set(this.active_players);
	}

	private getRandomChallengeWithThisNumberOfPlayers(players: number) {
		let index: number = 0;
		let continues = true;
		while (continues) {
			index = Math.floor(Math.random() * this.challenges.length);
			if (this.challenges[index].players === players) {
				continues = false;
			}
		}
		return index;
	}

	async constructAndStartChallenge(index: number) {
		// [story1] [player1] is a [trait] [role1] [story2] [player2] who is a [trait] [role2] [story3]{3 players? [player3], a [trait] [role3]}.
		// story1: use generic function to pick random element from array
		// role1: if empty, pick all-roles-array, else use generic function to pick random element from array
		// story2: generic function to pick random element from array
		// role2: if empty, pick all-roles-array, else use generic function to pick random element from array
		// story3: generic function to pick random element from array
		// role3: if empty, pick all-roles-array, else use generic function to pick random element from array
		// trait: use generic function to pick random element from array

		const player_array = this.active_players;

		let msg = `` +
			`${this.getRandomElementFromArray(this.challenges[index].story1)} ` +
			`${player_array[0]} is ${this.getRandomElementFromTraitsArray()} ` +
			`${this.challenges[index].role1.length === 0 ? this.getRandomElementFromArray(this.roles) : this.getRandomElementFromArray(this.challenges[index].role1)} ` +
			`${this.getRandomElementFromArray(this.challenges[index].story2)} ` +
			`${player_array[1]}, who is ${this.getRandomElementFromTraitsArray()} ` +
			`${this.challenges[index].role2.length === 0 ? this.getRandomElementFromArray(this.roles) : this.getRandomElementFromArray(this.challenges[index].role2)}` +
			`${this.getRandomElementFromArray(this.challenges[index].story3)}`;
		if (player_array.length === 3) {
			msg = msg + ` ` +
				`${player_array[2]}, ${this.getRandomElementFromTraitsArray()} ` +
				`${this.challenges[index].role3.length === 0 ? this.getRandomElementFromArray(this.roles) : this.getRandomElementFromArray(this.challenges[index].role3)}`;
		}
		msg = msg + `.`;
		this.last_challenge = msg;
		this.last_challenge_id = index;

		// change room background: if empty, pick all-backgrounds-array, else use generic function to pick random element from array
		const name = this.challenges[index].room_background.length === 0 ?
			this.getRandomElementFromArray(this.backgrounds) : this.getRandomElementFromArray(this.challenges[index].room_background);
		await this.conn.ChatRoomUpdate({
			Description: "[BOT] scripted multiplayer gameroom | manual in bot profile | ONGOING RP",
			Background: name
		});

		// Move players to their positions
		await this.reorderPlayers();

		this.conn.SendMessage("Emote", `*GAME: Here is the next roleplay challenge:` +
			`\n=======================================` +
			`\n${msg}` +
			`\n=======================================` +
			// TODO: Idea: introduce voting system to select a new challenge and advertise it here
			``
		);
		metric_gameStarted
			.labels({ challenge: index })
			.inc();
		logger.alert(msg);
	}

	async reorderPlayers() {
		let pos = 0;
		for (const player of this.active_players) {
			try {
				await player.MoveToPos(pos);
				pos++;
			} catch (error) {
				logger.warning(`Failed to move player ${player}:`, error);
			}
		}
		try {
			await this.conn.Player.MoveToPos(pos);
		} catch (error) {
			logger.warning(`Failed to move bot:`, error);
		}
	}

	getRandomElementFromArray(list: string[]) {
		return list.length > 0 ? list[Math.floor(Math.random() * list.length)] : "";
	}

	getRandomElementFromTraitsArray() {
		let indefinite_article: string;
		const strn = (this.traits.length > 0 ? this.traits[Math.floor(Math.random() * this.traits.length)] : "");
		if (['a', 'e', 'i', 'o', 'u'].some(vowel => strn.startsWith(vowel))) {
			indefinite_article = "an ";
		} else {
			indefinite_article = "a ";
		}
		return indefinite_article + strn;
	}

	destroy() {
		clearInterval(this.tickTimer);
		super.destroy();
	}

}
