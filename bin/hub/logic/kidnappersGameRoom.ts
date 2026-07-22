/*
 * Copied from the original bot hub, with permission.
 */

import { logger, BC_PermissionLevel, type API_Connector, type API_Character, AssetGet, BC_Server_ChatRoomMessage } from "bc-bot";

import promClient from "prom-client";

import { wait } from "../utils";
import { AdministrationLogic } from "./administrationLogic";
import { MatchmakingNotifier } from "../gameroomMatchmaking";

import _ from "lodash";
import { ConfigFile } from "../../config";

/** INSTRUCTIONS TO ADD A NEW ROLE
 * Step 1: Add the role variables and according supporting variables to the gameConfig interface, gameConfigs and KidnappersGameRoom class.
 * Step 2: Add a description of that role to the online description of the bot.
 * Step 3: Add role variable inside the function onCharacterEntered() to update the character object on rejoin and add to handleStartCommand().
 * Step 4: If the role has an active ability, add the command to the chat or whisper section of the onMessage() function.
 * Step 5: If the role has an active ability, add instructions on how to use it in the giveNightInstructions() function.
 * Step 6: If the role has an active ability, add the role name to the Set 'roleWarnings' and add the if statement for it in the Tick() function.
 * Step 7: If the role has an active ability, check the early night end condition in the Tick() function
 * Step 8: In the setGameState() function, add the role variable to the if (state === "game_not_started") branch and if the role
 *         has an active ability, set her target to null in the according branch.
 * Step 9: Add the role and according instro to handleMyroleCommand, setAllRolesAndCommunicate() (also edit gameEndMessage) and rollForRoleFrom()
 * Step 10: Think about it, if there are special cases or win conditions with that role that need changes
 */

interface gameConfig {
	kidnapper: numberOfKidnappers;
	maid: numberOfMaids;
	switch: numberOfSwitches;
	stalker: numberOfStalkers;
	fan: numberOfFans;
	masochist: numberOfMasochists;
	mistress: numberOfMistresses;
	mistressCanProtectHerself: boolean; // can target herself at night
	announceMistressProtectionSucess: boolean; // if her target prevents a kidnapping, it is told to everyone
	mistressCanpickSameTargetTwice: boolean; // cannot target the same target in two nights following each other
	firstDayDuration: number;
	firstNightDuration: number;
	dayDuration: number;
	nightDuration: number;
	defenseDuration: number;
	votingDuration: number;
	victoryDuration: number;
	openSuspicions: boolean; // suspicions have to be typed into the chat or whispered to the bot
	firstNightKidnapping: boolean; // the kidnapper(s) can kidnap a club member on the first night of the game or not
	discloseRolesAtStart: boolean; // tell the exact numbers of each role in a game round or don't announce it at the game start
}

// changing those will break the game's code severely
type numberOfKidnappers = 1 | 2;
type numberOfMaids = 0 | 1;
type numberOfMistresses = 0 | 1;
type numberOfSwitches = 0 | 1;
type numberOfStalkers = 0 | 1;
type numberOfFans = 0 | 1;
type numberOfMasochists = 0 | 1;

type GameState =
	| "game_not_started"
	| "day_1"
	| "night_1"
	| "waiting_on_night_activities"
	| "waiting_on_day_activities"
	| "waiting_on_accused_defense"
	| "waiting_on_trial_votes"
	| "game_was_won";

type configurationName =
	| "ninePlayers"
	| "eightPlayers"
	| "sevenPlayers"
	| "fiveOrSixPlayers";

// TODO: announce the configuration and role distribution in the current game, related to the last parameter

const gameConfigurations: Record<configurationName, Readonly<gameConfig>> = {
	"fiveOrSixPlayers":
	{
		kidnapper: 1,
		maid: 1,
		switch: 1,
		stalker: 1,
		fan: 0,
		masochist: 0,
		mistress: 0,
		mistressCanProtectHerself: true,
		announceMistressProtectionSucess: true,
		mistressCanpickSameTargetTwice: true,
		firstDayDuration: 120_000,
		firstNightDuration: 70_000,
		dayDuration: 1_200_000,
		nightDuration: 70_000,
		defenseDuration: 50_000,
		votingDuration: 100_000,
		victoryDuration: 60_000,
		openSuspicions: true,
		firstNightKidnapping: false,
		discloseRolesAtStart: true
	},
	"sevenPlayers":
	{
		kidnapper: 1,
		maid: 1,
		switch: 1,
		stalker: 1,
		fan: 1,
		masochist: 0,
		mistress: 0,
		mistressCanProtectHerself: true,
		announceMistressProtectionSucess: true,
		mistressCanpickSameTargetTwice: true,
		firstDayDuration: 120_000,
		firstNightDuration: 70_000,
		dayDuration: 1_100_000,
		nightDuration: 70_000,
		defenseDuration: 50_000,
		votingDuration: 100_000,
		victoryDuration: 60_000,
		openSuspicions: true,
		firstNightKidnapping: false,
		discloseRolesAtStart: true
	},
	"eightPlayers":
	{
		kidnapper: 2,
		maid: 1,
		switch: 0,
		stalker: 0,
		fan: 0,
		masochist: 1,
		mistress: 1,
		mistressCanProtectHerself: true,
		announceMistressProtectionSucess: true,
		mistressCanpickSameTargetTwice: true,
		firstDayDuration: 180_000,
		firstNightDuration: 90_000,
		dayDuration: 1_000_000,
		nightDuration: 90_000,
		defenseDuration: 40_000,
		votingDuration: 120_000,
		victoryDuration: 60_000,
		openSuspicions: true,
		firstNightKidnapping: true,
		discloseRolesAtStart: true
	},
	"ninePlayers":
	{
		kidnapper: 2,
		maid: 1,
		switch: 0,
		stalker: 0,
		fan: 1,
		masochist: 0,
		mistress: 1,
		mistressCanProtectHerself: false,
		announceMistressProtectionSucess: true,
		mistressCanpickSameTargetTwice: true,
		firstDayDuration: 120_000,
		firstNightDuration: 70_000,
		dayDuration: 1_000_000,
		nightDuration: 90_000,
		defenseDuration: 40_000,
		votingDuration: 120_000,
		victoryDuration: 60_000,
		openSuspicions: true,
		firstNightKidnapping: false,
		discloseRolesAtStart: true
	}
};

const listOfUsedItemsInThisScene: ([AssetGroupName, string] | [AssetGroupName, string, string])[] = [
	["ItemArms", "HempRope", "Hogtied"],
	["ItemArms", "HempRope", "BoxTie"],
	["ItemArms", "HempRope", "RopeCuffs"],
	["ItemLegs", "HempRope", "Frogtie"],
	["ItemMouth", "ClothGag", "OTM"],
	["ItemMouth2", "ClothGag", "OTM"],
	["ItemMouth3", "ClothGag", "OTM"]
];

const listOfUsedItemGroups = _.uniq(listOfUsedItemsInThisScene.map(i => i[0]));

/** The matchmaking queue count that triggers a beep message to everyone on it */
const BEEP_AT_THIS_COUNT = 7;

const solo_kidnapper_intro =
	`GAME: You are the kidnapper. You need to play smart to not be found out by the ` +
	`club members, who want to stop your actions.`;

const maid_intro =
	`GAME: You are the shy maid no one really notices, mainly active at night. It is your decision when to ` +
	`communicate that and things you learned to the other club members, since such a claim might make you a primary target for any ` +
	`kidnapper. Wait too long and you might end up as nicely gagged and helpless package anyway~`;

const switch_intro =
	`GAME: You are the switch, who is seen as 'just another subbie' by everyone else. ` +
	`If by the end of the game, you and one kidnapper are the only two free participants left, your domme side is ` +
	`able to easily suppress the kidnapper, since they were not expecting it, thus leading to a victory for the club members. ` +
	`It is your decision if or when to communicate that, since such a claim will make you a primary target for any kidnapper. `;

const fan_intro =
	`GAME: You are the fan, an avid admirer of the kidnappers, who really wants them to succeed by ` +
	`by helping them to kidnap everyone and ultimately yourself. There is one problem however! The kidnappers never took notice of ` +
	`you and you also have no idea who your so admired kidnappers are. Thus, your only chance is to secretly scheme against ` +
	`the club members, without them finding out about your true intentions.\n[NOTE: You win when the kidnapper(s) win.]`;

const masochist_intro =
	`GAME: You are the masochist, a total bondage addict who wants nothing more ` +
	`than to end up in strict bondage. You could care less about kidnappings and day suspicions, not necessarily picking any side, ` +
	`but they are surely great opportunities to use for fulfilling your dark desire.` +
	`\n[NOTE: You win when you are tied up when the game ends, independently of the kidnappers or club members winning.]`;

const stalker_intro =
	`GAME: You are the stalker, obsessively in love with a cute and shy maid you once saw ` +
	`at a maid initiation. She seems to not be around during the day, though. Thus, you are spending each night trying to stalk ` +
	`her. Your dream is to be in tight bondage together with her and therefore you secretly support the cause of the kidnappers, ` +
	`who are trying to snatch away everyone. As a masochistic bondage addict, you just love the thought of seeing everyone ` +
	`helplessly wiggling in tight, unforgiving distress. It is your decision when to communicate your hidden agenda as well as ` +
	`the name of the maid, when you finally found her, since such a claim will have a huge impact on the behavior ` +
	`of everyone else. Especially any kidnapper will surely know how to use you to their advantage.` +
	`\n[NOTE: You win when the kidnapper(s) win.]`;

const mistress_intro =
	`GAME: You are a new mistress in the club. It is your decision when/if to communicate that to ` +
	`the other club members and what you do at night, since revealing yourself might make you a primary target ` +
	`for any kidnapper. But maybe that is your intention~`;

const club_member_intro =
	`GAME: You are one of the club members. Your task is to observe and ask around, in order to ` +
	`find out whether the story of anybody does not add up! If they are a likely kidnapper, it's best to tie them up tightly ` +
	`during the day as fast as possible!`;

// Metrics
const metric_gameStarted = new promClient.Counter({
	name: "hub_kidnappers_game_started",
	help: "hub_kidnappers_game_started",
	labelNames: ["playerCount"] as const
});
const metric_gameEnded = new promClient.Counter({
	name: "hub_kidnappers_game_ended",
	help: "hub_kidnappers_game_ended",
	labelNames: ["winner"] as const
});

export class KidnappersGameRoom extends AdministrationLogic {
	/** The registered players */
	players: API_Character[] = [];
	/** The players that are kidnappers */
	kidnappers: Set<API_Character> = new Set();
	/** a copy of the kidnappers set for knowing during the win condition who the kidnappers were */
	persistent_copy_of_kidnappers: Set<API_Character> = new Set();
	/** an always up to date list of all players not yet tied up */
	club_members: Set<API_Character> = new Set();
	kidnappers_target: API_Character | null = null;
	mistress: API_Character | null = null;
	mistress_target: API_Character | null = null;
	mistress_last_target: API_Character | null = null;
	maid: API_Character | null = null;
	maid_target: API_Character | null = null;
	switch: API_Character | null = null;
	stalker: API_Character | null = null;
	stalker_target: API_Character | null = null;
	fan: API_Character | null = null;
	masochist: API_Character | null = null;
	roleWarnings: Set<"kidnappers" | "maid" | "stalker" | "mistress"> = new Set();
	skip_day: Set<API_Character> = new Set();
	suspicions: Map<API_Character, API_Character> = new Map();
	the_accused: API_Character | null = null;
	guilty_votes: Set<API_Character> = new Set();
	innocent_votes: Set<API_Character> = new Set();
	gameState: GameState = "game_not_started";
	turnTimer: number = 0;
	dayTimer: number = 0;
	dayTimerWarn: boolean = false;
	gameEndMessage: string = "";

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
		super({ inactivityKickEnabledOnlyBelowFreeSlotsCount: 6 }, config);
		this.conn = conn;

		this.registerCommand("status", (connection, args, sender) => this.handleStatusCommand(sender), `To get information about the running game`);
		this.registerCommand("joingame", (connection, args, sender) => this.handleJoingameCommand(sender), `To register as a new player`);
		this.registerCommand("freeandleave", (connection, args, sender) => this.handleFreeandleaveCommand(sender), `To urgently leave. Will untie and kick you`);
		this.registerCommand("start", (connection, args, sender) => this.handleStartCommand(sender), `To start a new round after registering`);
		this.registerCommand("skip", (connection, args, sender) => this.handleSkipCommand(sender), `To propose ending a day phase early`);
		this.registerCommand("suspect", (connection, args, sender) => this.handleSuspectCommand(args, sender), `To suspect someone during the day`);
		this.registerCommand("guilty", (connection, args, sender) => this.handleGuiltyCommand(sender), `To vote against a suspect during a day time vote`);
		this.registerCommand("innocent", (connection, args, sender) => this.handleInnocentCommand(sender), `To believe in a suspect during a day time vote`);
		this.registerCommand("kidnap", (connection, args, sender) => this.handleKidnapCommand(args, sender), null);
		this.registerCommand("watch", (connection, args, sender) => this.handleWatchCommand(args, sender), null);
		this.registerCommand("stalk", (connection, args, sender) => this.handleStalkCommand(args, sender), null);
		this.registerCommand("protect", (connection, args, sender) => this.handleProtectCommand(args, sender), null);
		this.registerCommand("beepme", (connection, args, sender) => this.handleBeepmeCommand(sender), `To get beeped when enough players are online`);
		this.registerCommand("myrole", (connection, args, sender) => this.handleMyroleCommand(sender), `To show only you your assigned role again`);

		this.matchmaking_notifier = new MatchmakingNotifier(conn, BEEP_AT_THIS_COUNT);

		this.tickTimer = setInterval(this.Tick.bind(this), 1000);
		this.setActiveConfigFromTemplate("fiveOrSixPlayers");
		this.setGameState("game_not_started", false);
	}

	active_config!: gameConfig;

	setActiveConfigFromTemplate(name: configurationName) {
		this.active_config = _.cloneDeep(gameConfigurations[name]);
	}

	/**
	 * The opening note when a player enters the room
	 * @param character the player in question
	 */
	playerGreeting(character: API_Character) {
		character.Tell("Emote", "*Welcome to this game room where we play");
		character.Tell("Chat", "'Kidnappers'");
		// TODO: Another great oppurtunity to advertise the bot and add some link to more info in the bot's profile
		character.Tell("Emote", `*a social deduction game to some maybe known as 'Mafia' or 'Werewolf' ` +
			`(modern digital variants are 'Town of Salem' or 'Among us'). It needs five to nine players. ` +
			`Please find the manual and the WHISPER commands to participate in the online description / profile ` +
			`of the game's host '${this.conn.Player}'.`
		);
		character.Tell("Chat", `NEWS: There is a new command !myrole to whisper you your role once more during a running game.`);
	}

	// Backup of the online description of the bot
	static readonly description = `
KIDNAPPERS - The Game
===================================================================
by D. Davidoff / A. Plotkin, room concept by Claudia & Clare, using ropeybot.

The game needs five to nine players. 'Kidnappers' is based on a social deduction game to some maybe known as 'Mafia' or 'Werewolf' (modern digital variants are 'Town of Salem' or 'Among us') and is a special variant the bondage club's Kidnappers League sometimes hosts for registered members of the league. One game takes around 30 minutes, depending on the amount of players.

Game flow (will also be explained while you play)
------------------------------------------------------------------
The game consists of several rounds, referred to as 'days' in-game. Depending on the number of participants in the game, one or two of them will be secretly chosen as this event's kidnappers by the league and will try to kidnap one (two kidnappers cannot kidnap two) of the other participants every night from their bed rooms in the club.
Every following day, all participants will come together and talk about the events from last night, possibly accusing someone of being a kidnapper. If enough agree to start a vote, this club member will have the chance to defend herself and then everyone can cast a vote whether they think she is guilty or not. If a majority agrees that the accused is better kept tied up, or when the time runs out, nightfall will happen again.

Game end
----------------
When all kidnappers are held in strict bondage or the club members no longer stand a chance, the game ends in a win for either the club members or the kidnappers.

Description of all secret roles
----------------------------------------
There are also special roles that are secretly given to some of the participating players according to the game configuration announced at the game start (see later chapter on game configurations):
► The maid role can observe any participant during the night and find out if they are a kidnapper or not.
► The stalker role wins with the kidnapper(s) and can shadow any participant during the night to find out if they are the cute maid
► The mistress role can either prevent herself from being kidnapped or can spend the night with another club member, preventing her from being kidnapped.
► The switch role wins the game for the club members if only her and one kidnapper are left, due to being an undrestimated domme.
► The fan role wants the kidnappers secretly to win, but has no information nor abilities. She wins with the kidnapper(s).
► The masochist role independently wins if she ends up tied up by any of the two sides. It is a neutral role.

Note: Not everyone will have a special role. Some players will be normal club members.

Please only join the game if you have enough time to stay for the full length. That said, please feel free to leave if you got tied up and don't plan to participate in the next game.
Please don't afk in the room or disturb the game!
Enjoy, be fair and respect each other and the rules!


The game commands
===================================================================
Note: All these commands need to be whispered to the bot. Please be mindful that your immersion settings or owner rules may prevent you from being able to whisper.

► !help                  To show a list of these commands into the chat, whisper '!?' or '!help'

► !beepme             To get beeped when enough players for a game are available
► !feedback          To send the message after the command as feedback to the authors
► !freeandleave    To urgently leave, '!freeandleave' will untie you and kick you from the room
► !joingame          To register as a new player, whisper '!joingame'
► !kick                  To start a vote to kick someone from the room: !kick [name] [reason]
► !listvotes           To list all currently running types of votes, e.g. kick votes
► !myrole              To whisper you your assigned role again during a running game
► !skip                  To propose ending a day phase early, whisper '!skip'
► !start                  Starts the game for everyone! Needs 5+ players
► !status               To get information about the running game, whisper '!status'

Note: There may be some further context-specific commands used during short phases of the game that are not listet here or in the help. Those are announced in-game when relevant.


Game configurations
===================================================================
Depending on the number of registered players at game start, different game configurations will be loaded, which will play very differently. These are all configurations in the game currently (they may be changed once in a while):

"five or six players"
----------------------------
kidnapper: 1
maid: 1
switch: 1
stalker: 1
fan: 0
masochist: 0
mistress: 0
mistressCanProtectHerself: true
announceMistressProtectionSucess: true
mistressCanpickSameTargetTwice: true
openSuspicions: true
firstNightKidnapping: false
discloseRolesAtStart: true

"seven players"
----------------------------
kidnapper: 1
maid: 1
switch: 1
stalker: 1
fan: 1
masochist: 0
mistress: 0
mistressCanProtectHerself: true
announceMistressProtectionSucess: true
mistressCanpickSameTargetTwice: true
openSuspicions: true
firstNightKidnapping: false
discloseRolesAtStart: true

"eight players"
----------------------------
kidnapper: 2
maid: 1
switch: 0
stalker: 0
fan: 0
masochist: 1
mistress: 1
mistressCanProtectHerself: true
announceMistressProtectionSucess: true
mistressCanpickSameTargetTwice: true
openSuspicions: true
firstNightKidnapping: true
discloseRolesAtStart: true

"nine players"
----------------------------
kidnapper: 2
maid: 1
switch: 0
stalker: 0
fan: 1
masochist: 0
mistress: 1
mistressCanProtectHerself: false
announceMistressProtectionSucess: true
mistressCanpickSameTargetTwice: true
openSuspicions: true
firstNightKidnapping: false
discloseRolesAtStart: true


Contact us
===================================
You can whisper any feedback (including bug reports) for the authors of the room to the bot, by starting your message with '!feedback' (e.g. !feedback I want to tell you that...).
In urgent cases, you can also contact EllieThePink, on BondageClub discord.

This bot is made with ropeybot, from Jomshir's original BotAPI code. Fixes and improvements welcome!
https://github.com/FriendsOfBC/ropeybot
`.trim();


	/**
	 * When character enters the room
	 * @param connection Originating connection
	 * @param character The character that entered the room
	 */
	protected async onCharacterEntered(connection: API_Connector, character: API_Character): Promise<void> {
		if (character.IsBot()) return;
		super.onCharacterEntered(connection, character);
		const oldIndex = this.players.findIndex(p => p.MemberNumber === character.MemberNumber);
		if (oldIndex >= 0) {
			// old player returning
			const oldCharacter = this.players[oldIndex];

			this.charTimer.forEach((value, key) => key.MemberNumber === character.MemberNumber && clearTimeout(value));

			if (this.club_members.has(oldCharacter)) {
				this.club_members.delete(oldCharacter);
				this.club_members.add(character);

				if (this.kidnappers.has(oldCharacter)) {
					this.kidnappers.delete(oldCharacter);
					this.kidnappers.add(character);
				}
				if (this.persistent_copy_of_kidnappers.has(oldCharacter)) {
					this.persistent_copy_of_kidnappers.delete(oldCharacter);
					this.persistent_copy_of_kidnappers.add(character);
				}
				if (this.skip_day.has(oldCharacter)) {
					this.skip_day.delete(oldCharacter);
					this.skip_day.add(character);
				}
				if (this.guilty_votes.has(oldCharacter)) {
					this.guilty_votes.delete(oldCharacter);
					this.guilty_votes.add(character);
				}
				if (this.innocent_votes.has(oldCharacter)) {
					this.innocent_votes.delete(oldCharacter);
					this.innocent_votes.add(character);
				}
				if (this.kidnappers_target === oldCharacter) {
					this.kidnappers_target = character;
				}
				if (this.mistress === oldCharacter) {
					this.mistress = character;
				}
				if (this.mistress_target === oldCharacter) {
					this.mistress_target = character;
				}
				if (this.mistress_last_target === oldCharacter) {
					this.mistress_last_target = character;
				}
				if (this.maid === oldCharacter) {
					this.maid = character;
				}
				if (this.maid_target === oldCharacter) {
					this.maid_target = character;
				}
				if (this.switch === oldCharacter) {
					this.switch = character;
				}
				if (this.fan === oldCharacter) {
					this.fan = character;
				}
				if (this.masochist === oldCharacter) {
					this.masochist = character;
				}
				if (this.stalker === oldCharacter) {
					this.stalker = character;
				}
				if (this.stalker_target === oldCharacter) {
					this.stalker_target = character;
				}
				if (this.the_accused === oldCharacter) {
					this.the_accused = character;
				}
				if (this.suspicions.has(oldCharacter)) {
					this.suspicions.set(character, this.suspicions.get(oldCharacter)!);
					this.suspicions.delete(oldCharacter);
				}
				this.suspicions.forEach((key, value) => { if (value === oldCharacter) this.suspicions.set(key, character); });
			}
			this.players.splice(oldIndex, 1, character);
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
	protected onCharacterLeft(connection: API_Connector, character: API_Character, intentional: boolean): void {
		if (character.IsBot()) return;
		if (this.players.includes(character) && intentional) {
			this.unregisterPlayer(character, " due to leaving the room.");
		} else if (this.players.includes(character) && !intentional) {
			this.charTimer.set(character, setTimeout(() => { void this.unregisterPlayer(character, " due to disconnecting."); }, 80_000));
		}
	}

	private unregisterPlayer(character: API_Character, message: string) {
		if (this.players.includes(character)) {
			this.conn.SendMessage("Emote", `*GAME: ${character} was unregistered as an active player` + message);
			const index = this.players.indexOf(character, 0);
			if (index > -1) {
				this.players.splice(index, 1);
				if (this.players.length === 0) {
					this.setGameState("game_not_started");
					void this.conn.ChatRoomUpdate({
						Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | ${this.matchmaking_notifier.waitingPlayers} queued`,
						Background: "MainHall"
					});
				}
			}
			this.resolvePlayerRemovals(character);
		}
	}

	public roomCanShutDown(): boolean {
		if (this.players.length === 0 && this.conn.chatRoom.characters.length === 1) {
			return true;
		}
		return false;
	}

	private resolvePlayerRemovals(character: API_Character) {
		this.kidnappers.delete(character);
		this.club_members.delete(character);
		if (this.maid?.MemberNumber === character.MemberNumber) {
			this.maid = null;
		}
		if (this.switch?.MemberNumber === character.MemberNumber) {
			this.switch = null;
		}
		if (this.stalker?.MemberNumber === character.MemberNumber) {
			this.stalker = null;
		}
		if (this.fan?.MemberNumber === character.MemberNumber) {
			this.fan = null;
		}
		if (this.masochist?.MemberNumber === character.MemberNumber) {
			this.masochist = null;
		}
		if (this.mistress?.MemberNumber === character.MemberNumber) {
			this.mistress = null;
		}

		if (this.kidnappers.size === 0 && this.gameState !== "game_not_started" && this.gameState !== "game_was_won") {
			this.clubMembersWin();
		}
	}

	/**
	 * When connection receives message inside chatroom
	 * @param connection Originating connection
	 * @param message Received message
	 * @param sender The character that sent the message
	 */
	protected onMessage(connection: API_Connector, message: BC_Server_ChatRoomMessage, sender: API_Character): void {
		const msg = message.Content.toLocaleLowerCase();

		if (message.Type === "Chat") {
			if (msg.startsWith("!suspect") && this.gameState === "waiting_on_day_activities" && this.club_members.has(sender)) {
				if (!this.active_config.openSuspicions) {
					sender.Tell("Whisper", `GAME: In the configuration for this game round, suspicions need to be whispered to the bot.`);
				} else {
					this.handleSuspicion(msg, sender);
				}
			}
		}
	}

	handleStatusCommand(sender: API_Character) {
		if (this.gameState === "game_not_started" || this.gameState === "game_was_won") {
			sender.Tell("Whisper", `GAME: Start the next game with !start when enough players have registered using !joingame` +
				`\nThere are ${this.matchmaking_notifier.waitingPlayers > 0 ? `players` : `no players`} in the 'matchmaking ` +
				`queue'. You may want to consider joining the queue with the beepme command to speed up the next match.`
			);
		} else {
			sender.Tell("Whisper", `GAME: This is the current status of the game:` +
				`\nThe remaining participants in the current round are:\n` +
				Array.from(this.club_members.values()).map(A => A.toString()).join(", ")
			);
		}
		sender.Tell("Whisper", `The game has the following registered players:\n` +
			this.players.map(A => A.Name).join(", ")
		);
	}

	async handleJoingameCommand(sender: API_Character) {
		if (this.players.includes(sender)) {
			return;
		}
		if (!sender.ProtectionAllowInteract()) {
			sender.Tell("Chat", `Warning: You are unable to join the game because the bot currently cannot interact with you ` +
				`because your bondage club version is newer than the bot's version.\n` +
				`This might be caused by either you being on beta or the bot not yet being updated to the latest version. ` +
				`If you are using beta, please login using the normal version to enable the bot to interact with you.`
			);
			logger.info(`Player check for ${sender}: Protection: Version=${sender.OnlineSharedSettings.GameVersion}, Admin=${this.conn.Player.IsRoomAdmin()}`);
			return;
		}
		const allow = await sender.GetAllowItem();
		if (!allow) {
			sender.Tell("Chat", `Warning: You are unable to join the game because the bot cannot interact with you due to ` +
				`your permission settings. Please change them or white list the bot '${this.conn.Player.Name}' and join ` +
				`with !joingame again if you want to play.`
			);
			logger.info(`Player check for ${sender}: Permission level: ` + BC_PermissionLevel[sender.ItemPermission]);
			return;
		}
		this.players.push(sender);
		this.conn.SendMessage("Emote", `*GAME: ${sender} was registered as an active player.`);

		this.beepSuccess = await this.matchmaking_notifier.notifyPlayersOfEnoughInterest(this.players);
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
		void this.conn.ChatRoomUpdate({
			Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | ${this.matchmaking_notifier.waitingPlayers} queued`
		});
		await this.doTheWiggleDance();
		// saw some bugs, therefore make sure it was reset
		await wait(5000);
		this.playerCheck(sender);
		this.conn.Player.SetActivePose([]);
	}

	async handleFreeandleaveCommand(sender: API_Character) {
		this.freePlayerInItemSlots(sender, listOfUsedItemGroups);
		sender.Tell("Whisper", "GAME: Goodbye and all the best!");
		await wait(2500);
		await sender.Kick();
	}

	handleStartCommand(sender: API_Character) {
		if (!this.players.includes(sender)) {
			sender.Tell("Whisper", "GAME: Please register first by writing '!joingame' into the chat.");
		} else if (this.gameState !== "game_not_started") {
			sender.Tell("Whisper", "GAME: Cannot start, as a game is currently already in progress. You will be part of the next one.");
		} else if (this.players.includes(sender) && this.gameState === "game_not_started") {
			let config: configurationName;
			if (this.players.length < 5) {
				this.conn.SendMessage("Emote", `*GAME: The game needs a minimum of five registered players to start the next round.`);
				return;
			} else if (this.players.length < 7) {
				config = "fiveOrSixPlayers";
			} else if (this.players.length === 7) {
				config = "sevenPlayers";
			} else if (this.players.length === 8) {
				config = "eightPlayers";
			} else {
				config = "ninePlayers";
			}
			void this.conn.ChatRoomUpdate({
				Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | PLAYING`,
				Visibility: ["Admin", "Whitelist"],
			});
			this.setActiveConfigFromTemplate(config);
			this.players.map(P => this.freePlayerInItemSlots(P, listOfUsedItemGroups));
			this.conn.SendMessage("Emote", `*GAME: It's on! The league started the event. It might be a good idea to take ` +
				`today to get to know the other participants. Maybe one can already sense if someone only acts like an innocent ` +
				`club member and is in reality a mean kidnapper!`
			);
			this.conn.SendMessage("Emote", `*GAME: This round is played with the game configuration '${config}' ` +
				`(see bot's profile / online description)`
			);
			if (this.active_config.discloseRolesAtStart) {
				this.conn.SendMessage("Emote", `*GAME: The following secret roles are present:` +
					`\n${this.active_config.kidnapper === 1 ? `1 kidnapper` : `2 kidnappers`}\n` +
					`${this.active_config.mistress === 1 ? `1 mistress\n` : ``}` +
					`${this.active_config.maid === 1 ? `1 maid\n` : ``}` +
					`${this.active_config.stalker === 1 ? `1 stalker\n` : ``}` +
					`${this.active_config.switch === 1 ? `1 switch\n` : ``}` +
					`${this.active_config.fan === 1 ? `1 fan\n` : ``}` +
					`${this.active_config.masochist === 1 ? `1 masochist\n` : ``}`
				);
			}
			this.setAllRolesAndCommunicate();
			metric_gameStarted
				.labels({ playerCount: this.players.length })
				.inc();
			this.setGameState("day_1");
		}
	}

	handleSkipCommand(sender: API_Character) {
		if ((this.gameState === "waiting_on_trial_votes" || this.gameState === "waiting_on_accused_defense" ||
			this.gameState === "waiting_on_day_activities" || this.gameState === "day_1")
			&& this.club_members.has(sender) && !this.skip_day.has(sender)) {
			if (this.gameState === "waiting_on_day_activities") {
				this.skip_day.add(sender);
				this.conn.SendMessage("Emote", `*GAME: ${sender} seems to get ready for an early night.`);
			} else {
				sender.Tell("Whisper", 'GAME: You cannot use this right now. Please wait until after the voting.');
			}
			if (this.skip_day.size === this.club_members.size) {
				this.setGameState("waiting_on_night_activities");
				this.giveNightInstructions();
			}

		} else if (this.skip_day.has(sender)) {
			sender.Tell("Whisper", 'GAME: You already have voted in favor of ending today early.');
		} else {
			sender.Tell("Whisper", 'GAME: You can only use this command during the day phase of a running game.');
		}
	}

	async handleBeepmeCommand(sender: API_Character) {
		if (this.blockMatchmakingJoin) {
			sender.Tell("Whisper", `GAME: The beepme command is temporarily deactivated, since the previous 'matchmaking' ` +
				`was successful just now. Please wait until everyone who was beeped will join this room and try the command ` +
				`again in a few minutes, in case not enough players for starting a game will join.`
			);
		} else if (this.gameState === "game_not_started" || this.gameState === "game_was_won") {
			await this.matchmaking_notifier.addPlayerToTheMatchmakingQueue(sender);
			this.beepSuccess =
				await this.matchmaking_notifier.notifyPlayersOfEnoughInterest(this.players);
			void this.conn.ChatRoomUpdate({
				Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | ${this.matchmaking_notifier.waitingPlayers} queued`,
				Background: "MainHall"
			});
		} else {
			sender.Tell("Whisper", `GAME: You cannot use this during a running game. Please register as a player ` +
				`if you have not done so and wait in the room until the next round starts.`
			);
		}
	}

	handleGuiltyCommand(sender: API_Character) {
		if (this.gameState === "waiting_on_trial_votes" && this.club_members.has(sender)) {
			if (this.guilty_votes.has(sender)) {
				return;
			}
			this.guilty_votes.add(sender);
			this.conn.SendMessage("Emote", `*GAME: ${sender} found ${this.the_accused} to be GUILTY!`);
			this.innocent_votes.delete(sender);
			if (this.guilty_votes.size / this.club_members.size > 0.5) {
				this.conn.SendMessage("Emote", `*GAME: The club members have cast their vote on ${this.the_accused} and the ` +
					`suspicions and doubts against her were too great. Therefore, the club members decided to tie her up more, ` +
					`hoping that keeping her helplessly secured would stop the kidnappings.`
				);
				this.freeAndGiveTrialStats();
				if (this.the_accused !== null) {
					this.tieUpCharacterAndRemove("club", this.the_accused);
				}
				if (this.club_members.size !== 0 && this.kidnappers.size !== 0) {
					this.setGameState("waiting_on_night_activities");
					this.giveNightInstructions();
				}
			} else if (this.guilty_votes.size + this.innocent_votes.size === this.club_members.size) {
				this.conn.SendMessage("Emote", `*GAME: The club members have cast their vote and ${this.the_accused} ` +
					`was declared innocent and freed.`
				);
				this.freeAndGiveTrialStats();
				this.setGameState("waiting_on_day_activities");
			}
		}
	}

	handleInnocentCommand(sender: API_Character) {
		if (this.gameState === "waiting_on_trial_votes" && this.club_members.has(sender)) {
			if (this.innocent_votes.has(sender)) {
				return;
			}
			this.guilty_votes.delete(sender);
			this.innocent_votes.add(sender);
			this.conn.SendMessage("Emote", `*GAME: ${sender} found ${this.the_accused} to be INNOCENT!`);
			if (this.guilty_votes.size + this.innocent_votes.size === this.club_members.size) {
				this.conn.SendMessage("Emote", `*GAME: The club members have cast their vote and ${this.the_accused} ` +
					`was declared innocent and freed.`
				);
				this.freeAndGiveTrialStats();
				this.setGameState("waiting_on_day_activities");
			}
		}
	}

	handleSuspectCommand(msg: string, sender: API_Character) {
		if (this.gameState === "waiting_on_day_activities" && this.club_members.has(sender)) {
			this.handleSuspicion(msg.toLocaleLowerCase(), sender);
		}
	}

	private handleMyroleCommand(sender: API_Character) {
		if (this.players.find(e => e === sender) === undefined) {
			sender.Tell("Whisper", `GAME: You are not part of the currently running game as you did not yet register as a player.`);
			return;
		}

		this.sendRoleMessage(sender);
	}

	handleKidnapCommand(msg: string, sender: API_Character) {
		if (this.kidnappers.has(sender)) {
			if (this.kidnappers_target === null &&
				(this.gameState === "waiting_on_night_activities" || (this.gameState === "night_1" && this.active_config.firstNightKidnapping))) {
				let isInteger: boolean = true;
				const list: API_Character[] = [];
				let match = (/^([0-9]+)$/i).exec(msg);
				if (!match) {
					isInteger = false;
					match = (/^([a-z ]+)$/i).exec(msg);
				}
				if (!match) {
					sender.Tell("Whisper", `GAME: Bad format, expected '!kidnap [name OR memberID]' for example !kidnap ${sender.Name} or ` +
						`!kidnap ${sender.MemberNumber}`
					);
					return;
				}
				if (isInteger) {
					const i = Number.parseInt(match[1], 10);
					this.club_members.forEach(item => item.MemberNumber === i && list.push(item));
				} else {
					const i = match[1].toLocaleLowerCase();
					this.club_members.forEach(item => item.Name.toLocaleLowerCase() === i && list.push(item));
				}
				if (list.length > 1) {
					sender.Tell("Whisper", `GAME: The player name is not unique, please use the member number of the person instead, ` +
						`for example !kidnap ${sender.MemberNumber}`
					);
				} else if (list.length > 0) {
					this.kidnappers_target = list[0];
					const kidnappers_team: API_Character[] = Array.from(this.kidnappers);
					let tmp_array: number[] = [];
					if (kidnappers_team.length === 2) {
						tmp_array = [0, 1];
					} else if (kidnappers_team.length === 1) {
						tmp_array = [0];
					} else {
						logger.error(`Unexpected value for kidnapper's team size: ${kidnappers_team.length}`);
					}
					for (const i of tmp_array) {
						if (this.kidnappers_target.MemberNumber === kidnappers_team[i].MemberNumber) {
							sender.Tell("Whisper", `GAME: No kidnapper kidnaps one of their own!`);
							this.kidnappers_target = null;
							return;
						}
					}
					this.whisperRemainingKidnappers(`You are moving in, preparing to kidnap ${this.kidnappers_target.Name}`);
				} else {
					sender.Tell("Whisper", `GAME: This player name or member number is not recognized! Please try again.`);
				}
			} else {
				sender.Tell("Whisper", `GAME: You cannot kidnap someone ${this.kidnappers_target === null ? `` : `else `}` +
					`right now. Please wait until next night.`
				);
			}
		}
	}

	handleWatchCommand(msg: string, sender: API_Character) {
		if (this.maid === sender && this.maid_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1") && this.club_members.has(this.maid)) {
			let isInteger: boolean = true;
			const list: API_Character[] = [];
			let match = (/^([0-9]+)$/i).exec(msg);
			if (!match) {
				isInteger = false;
				match = (/^([a-z ]+)$/i).exec(msg);
			}
			if (!match) {
				sender.Tell("Whisper", `GAME: Bad format, expected '!watch [name OR memberID]' for example !watch ${sender.Name} or ` +
					`!watch ${sender.MemberNumber}`
				);
				return;
			}
			if (isInteger) {
				const i = Number.parseInt(match[1], 10);
				this.club_members.forEach(item => item.MemberNumber === i && list.push(item));
			} else {
				const i = match[1].toLocaleLowerCase();
				this.club_members.forEach(item => item.Name.toLocaleLowerCase() === i && list.push(item));
			}
			if (list.length > 1) {
				sender.Tell("Whisper", `GAME: The player name is not unique, please use the member number of the person instead, ` +
					`for example !watch ${sender.MemberNumber}`
				);
			} else if (list.length > 0) {
				this.maid_target = list[0];
				if (this.maid_target.MemberNumber === this.maid.MemberNumber) {
					sender.Tell("Whisper", `GAME: You decided to stare at your mirror image all night long. ` +
						`You are definately not a kidnapper.`
					);
				} else {
					sender.Tell("Whisper", `GAME: You watched ${this.maid_target.Name} all night long, ` +
						`even sneaking into their room with your maid cleaning service general key ` +
						`${this.kidnappers.has(this.maid_target) ? 'and eventually spotted her trying to kidnap an unsuspecting ' +
							`club member! You quickly retreat, your heart beating fast. She definately is a ` +
							`kidnapper!` : `, but could find no signs that she ever has or will do some backhanded kidnapping, ` +
						`ruling her out as a suspect completely.`}`
					);
				}
			} else {
				sender.Tell("Whisper", `GAME: This player name or member number is not recognized! Please try again.`);
			}
		}
	}

	handleStalkCommand(msg: string, sender: API_Character) {
		if (this.stalker === sender && this.stalker_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1") && this.club_members.has(this.stalker)) {
			let isInteger: boolean = true;
			const list: API_Character[] = [];
			let match = (/^([0-9]+)$/i).exec(msg);
			if (!match) {
				isInteger = false;
				match = (/^([a-z ]+)$/i).exec(msg);
			}
			if (!match) {
				sender.Tell("Whisper", `GAME: Bad format, expected '!stalk [name OR memberID]' for example !stalk ${sender.Name} or ` +
					`!stalk ${sender.MemberNumber}`
				);
				return;
			}
			if (isInteger) {
				const i = Number.parseInt(match[1], 10);
				this.club_members.forEach(item => item.MemberNumber === i && list.push(item));
			} else {
				const i = match[1].toLocaleLowerCase();
				this.club_members.forEach(item => item.Name.toLocaleLowerCase() === i && list.push(item));
			}
			if (list.length > 1) {
				sender.Tell("Whisper", `GAME: The player name is not unique, please use the member number of the person instead, ` +
					`for example !stalk ${sender.MemberNumber}`
				);
			} else if (list.length > 0) {
				this.stalker_target = list[0];
				if (this.stalker_target.MemberNumber === this.stalker.MemberNumber) {
					sender.Tell("Whisper", `GAME: You decided to not stalk anyone tonight.`);
				} else {
					sender.Tell("Whisper", `GAME: You stalked ${this.stalker_target.Name} all night long, ` +
						`${this.maid === this.stalker_target ? 'while grinning happily, as she is your beloved shy maid in the flesh!' :
							`but she is clearly not your maid. What a sad night!`}`
					);
				}
			} else {
				sender.Tell("Whisper", `GAME: This player name or member number is not recognized! Please try again.`);
			}
		}
	}

	handleProtectCommand(msg: string, sender: API_Character) {
		if (this.mistress === sender && this.mistress_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1") && this.club_members.has(this.mistress)) {
			let isInteger: boolean = true;
			const list: API_Character[] = [];
			let match = (/^([0-9]+)$/i).exec(msg);
			if (!match) {
				isInteger = false;
				match = (/^([a-z ]+)$/i).exec(msg);
			}
			if (!match) {
				sender.Tell("Whisper", `GAME: Bad format, expected '!protect [name OR memberID]' for example !protect ${sender.Name} or ` +
					`!protect ${sender.MemberNumber}`
				);
				return;
			}
			if (isInteger) {
				const i = Number.parseInt(match[1], 10);
				this.club_members.forEach(item => item.MemberNumber === i && list.push(item));
			} else {
				const i = match[1].toLocaleLowerCase();
				this.club_members.forEach(item => item.Name.toLocaleLowerCase() === i && list.push(item));
			}
			if (list.length > 1) {
				sender.Tell("Whisper", `GAME: The player name is not unique, please use the member number of the person instead, ` +
					`for example !protect ${sender.MemberNumber}`
				);
			} else if (list.length > 0) {
				if (this.mistress_last_target === list[0] && !this.active_config.mistressCanpickSameTargetTwice) {
					sender.Tell("Whisper", `GAME: You don't feel like doing the same thing as last night again. ` +
						`[Note: It is not possible to pick the same target again the following night in the configuration for this game round.]`
					);
					return;
				} else {
					this.mistress_target = list[0];
				}
				if (this.mistress_target.MemberNumber === this.mistress.MemberNumber) {
					if (this.active_config.mistressCanProtectHerself) {
						sender.Tell("Whisper", `GAME: You spent the night in full mistress gear, your bull whip in hand, ` +
							`while sitting on your throne, hoping a kidnapper would visit you. No one dared showing up though.`
						);
					} else {
						sender.Tell("Whisper", `GAME: You really don't feel like staying up all night, just for the off chance that ` +
							`a kidnapper comes visiting you. [Note: It is not possible to target yourself in the configuration for this game round.]`
						);
						this.mistress_target = null;
					}
				} else {
					sender.Tell("Whisper", `GAME: You summoned the lovely ${this.mistress_target.Name} to your room and spent most of ` +
						`the night in a hot bondage session, scaring away any potential kidnapping attempt. You sent her home ` +
						`afterwards with a maid escort, while you took a long, hot and very relaxing shower, leaving yourself wide open.`
					);
				}
			} else {
				sender.Tell("Whisper", `GAME: This player name or member number is not recognized! Please try again.`);
			}
		}
	}

	handleSuspicion(msg: string, sender: API_Character) {
		let isInteger: boolean = true;
		const list: API_Character[] = [];
		let match;

		if (msg.startsWith("!suspect")) {
			match = (/^!suspect ([0-9]+)$/i).exec(msg);
			if (!match) {
				isInteger = false;
				match = (/^!suspect ([a-z ]+)$/i).exec(msg);
			}
		} else {
			match = (/^([0-9]+)$/i).exec(msg);
			if (!match) {
				isInteger = false;
				match = (/^([a-z ]+)$/i).exec(msg);
			}
		}
		if (!match) {
			sender.Tell("Whisper", `GAME: Bad format, expected '!suspect [name OR memberID]' for example !suspect ${sender.Name} or ` +
				`!suspect ${sender.MemberNumber}`
			);
			return;
		}
		if (isInteger) {
			const i = Number.parseInt(match[1], 10);
			this.club_members.forEach(item => item.MemberNumber === i && list.push(item));
		} else {
			const i = match[1].toLocaleLowerCase();
			this.club_members.forEach(item => item.Name.toLocaleLowerCase() === i && list.push(item));
		}
		if (list.length > 1) {
			sender.Tell("Whisper", `GAME: The player name is not unique, please use the member number of the person instead, ` +
				`for example !suspect ${sender.MemberNumber}`
			);
		} else if (list.length > 0) {
			// check map if target is in there already and if it was not the same player twice, then announce, advance and clear
			// otherwise set target in the map
			if (this.suspicions.has(list[0])) {
				if (this.suspicions.get(list[0]) === sender) {
					sender.Tell("Whisper", `GAME: You already voiced a suspicion against ${list[0].Name}.`);
				} else {
					this.guilty_votes.clear();
					this.innocent_votes.clear();
					this.the_accused = list[0];
					this.innocent_votes.add(this.the_accused);
					this.conn.SendMessage("Emote", `*GAME: ${this.the_accused} is suspected of being a kidnapper` +
						`${this.active_config.openSuspicions ? ` by ${sender} and ${this.suspicions.get(list[0])}` : ``} and was ` +
						`temporarily restrained. She now has ${this.active_config.defenseDuration / 1000} seconds to address the ` +
						`accusations, before her fate will be decided in a vote on keeping her tied up for everyone's safety.`
					);
					const rope = list[0].Appearance.AddItem(AssetGet("ItemArms", "HempRope"));
					rope?.Extended?.SetType("RopeCuffs");
					rope?.SetDifficulty(20);
					this.setGameState("waiting_on_accused_defense");
					this.suspicions.clear();
				}
			} else {
				// if they had a previous initial suspicion, delete it before letting them make a new one
				this.suspicions.forEach((value, key) => value.MemberNumber === sender.MemberNumber && this.suspicions.delete(key));
				this.suspicions.set(list[0], sender);
				if (list[0] === sender && this.active_config.openSuspicions) {
					this.conn.SendMessage("Emote", `*GAME: A suspicion against herself has been voiced by ${sender}! ` +
						`Why would she do something crazy like that?`
					);
				} else {
					this.conn.SendMessage("Emote", `*GAME: A suspicion against ${list[0]} has been voiced ${this.active_config.openSuspicions ?
						`by ${sender}` : ``}! Is she really a kidnapper?`
					);
				}
			}
		} else {
			sender.Tell("Whisper", `GAME: This player name or member number is not recognized! Please try again.`);
		}
	}

	private freeAndGiveTrialStats() {
		const no_vote_list = Array.from(this.club_members.values()).filter(A => !this.guilty_votes.has(A) && !this.innocent_votes.has(A));

		this.the_accused?.Appearance.RemoveItem("ItemArms");

		this.conn.SendMessage("Emote", `*GAME: These club members voted guilty:\n` +
			Array.from(this.guilty_votes.values()).map(A => A.toString()).join(", ") +
			`\nThese club members voted innocent:\n` +
			Array.from(this.innocent_votes.values()).map(A => A.toString()).join(", ") +
			`\nThese club members did not vote:\n` +
			no_vote_list.map(A => A.toString()).join(", ")
		);
	}

	private Tick() {
		if (!this.conn.isConnected()) return;

		const now = Date.now();

		if (this.beepSuccess) {
			this.blockMatchmakingTimer = now + 3 * 60 * 1000;
			this.beepSuccess = false;
			this.blockMatchmakingJoin = true;
		}
		if (now >= this.blockMatchmakingTimer) {
			this.blockMatchmakingJoin = false;
		}

		if (this.gameState === "game_not_started") return;

		if (!this.roleWarnings.has("mistress") && now + 25_000 >= this.turnTimer && this.mistress_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1")) {
			if (this.mistress !== null) {
				this.mistress.Tell("Whisper", `GAME: Psssst... only 25 seconds left to make night plans, glorious mistress !`);
				this.roleWarnings.add("mistress");
			}
		}
		if (!this.roleWarnings.has("maid") && now + 25_000 >= this.turnTimer && this.maid_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1")) {
			if (this.maid !== null) {
				this.maid.Tell("Whisper", `GAME: Psssst... only 25 seconds left to invstigate a club member, sneaky maid !`);
				this.roleWarnings.add("maid");
			}
		}
		if (!this.roleWarnings.has("stalker") && now + 25_000 >= this.turnTimer && this.stalker_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1")) {
			if (this.stalker !== null) {
				this.stalker.Tell("Whisper", `GAME: Psssst... only 25 seconds left to find the maid, love-struck stalker !`);
				this.roleWarnings.add("stalker");
			}
		}
		if (!this.roleWarnings.has("kidnappers") && now + 25_000 >= this.turnTimer && this.kidnappers_target === null
			&& (this.gameState === "waiting_on_night_activities" || this.gameState === "night_1")) {
			this.whisperRemainingKidnappers("Psssst... only 25 seconds left to kidnap a club member");
			this.roleWarnings.add("kidnappers");
		}

		/**
		/ if all roles that are in the game and untied have used their night abilities, proceed to tying the kidnapper target up,
		/ unless there is still a mistress under the remaining club members, preventing it
		/ However, if it is the first night and firstNightKidnapping is switch off, then ignore the kidnapping target condition
		/ role in game free and done       this.role !== null &&  this.club_members.has(this.role) && this.roles_target !== null   go-into-if
		/ role in game free and not done   this.role !== null &&  this.club_members.has(this.role) && this.roles_target === null   dont-go-in
		/ role in game not free            this.role !== null && !this.club_members.has(this.role) && this.roles_target === null   go-into-if
		/ role not in game		   		   this.role === null && !this.club_members.has(this.role) && this.roles_target === null   go-into-if
		/
			 SOLUTION:         	   this.role === null || (this.role !== null && !this.club_members.has(this.role)) || this.stalker_target !== null
		*/

		if ((this.gameState === "waiting_on_night_activities" || this.gameState === "night_1")
			&& (this.mistress === null || (this.mistress !== null && !this.club_members.has(this.mistress)) || this.mistress_target !== null)
			&& (this.maid === null || (this.maid !== null && !this.club_members.has(this.maid)) || this.maid_target !== null)
			&& (this.stalker === null || (this.stalker !== null && !this.club_members.has(this.stalker)) || this.stalker_target !== null)) {
			if (this.kidnappers_target !== null) {
				if ((this.mistress !== null && !this.club_members.has(this.mistress))
					|| this.mistress_target !== this.kidnappers_target) {
					this.tieUpCharacterAndRemove("kidnapper", this.kidnappers_target);
					this.conn.SendMessage("Emote", `*GAME: The sun starts rising and the club members slowly realize that ` +
						`${this.kidnappers_target.Name} is missing. Another kidnapping! Who is it?`
					);
				} else if (this.active_config.announceMistressProtectionSucess) {
					this.conn.SendMessage("Emote", `*GAME: The sun starts rising - it's a lovely new day! The dashing mistress ` +
						`prevented a kidnapping last night, as witnesses saw a rope carrying shadow approaching her room but then running away again.`
					);
				} else {
					this.conn.SendMessage("Emote", `*GAME: The sun starts rising - it's a lovely new day! There was no kidnapping last night!`);
				}
				this.setGameState("waiting_on_day_activities");
				this.giveDayInstructions();
			} else if (this.gameState === "night_1" && !this.active_config.firstNightKidnapping) {
				this.conn.SendMessage("Emote", `*GAME: The sun starts rising - it's a lovely new day! The kidnappings seemingly did not start yet.`);
				this.setGameState("waiting_on_day_activities");
				this.giveDayInstructions();
			}
		}


		if (now >= this.turnTimer) {
			if (this.gameState === "day_1") {
				this.setGameState("night_1");
				this.giveNightInstructions();
			} else if (this.gameState === "night_1") {
				if (this.active_config.firstNightKidnapping) {
					if (this.kidnappers_target !== null) {
						this.tieUpCharacterAndRemove("kidnapper", this.kidnappers_target);
						this.conn.SendMessage("Emote", `*GAME: The sun starts rising and the club members slowly realize that ` +
							`${this.kidnappers_target.Name} is missing. Another kidnapping! Who is it?`
						);
					} else {
						this.conn.SendMessage("Emote", `*GAME: The sun starts rising - it's a lovely new day! There was no kidnapping last night!`);
					}
				} else {
					this.conn.SendMessage("Emote", `*GAME: The sun starts rising - it's a lovely new day! There was no kidnapping last night!`);
				}
				this.setGameState("waiting_on_day_activities");
				this.giveDayInstructions();
			} else if (this.gameState === "waiting_on_night_activities") {
				if (this.kidnappers_target !== null) {
					this.tieUpCharacterAndRemove("kidnapper", this.kidnappers_target);
					this.conn.SendMessage("Emote", `*GAME: The sun starts rising and the club members slowly realize that ` +
						`${this.kidnappers_target.Name} is missing. Another kidnapping! Who is it?`
					);
				} else {
					this.conn.SendMessage("Emote", `*GAME: The sun starts rising - it's a lovely new day! There was no kidnapping last night!`);
				}
				this.setGameState("waiting_on_day_activities");
				this.giveDayInstructions();
			} else if (this.gameState === "waiting_on_day_activities" || this.gameState === "waiting_on_accused_defense" ||
				this.gameState === "waiting_on_trial_votes") {
				if (this.gameState === "waiting_on_accused_defense") {
					this.conn.SendMessage("Emote", `*GAME: It got too late so the club members decided to let ${this.the_accused} go for today.`);
					this.the_accused?.Appearance.RemoveItem("ItemArms");
				} else if (this.gameState === "waiting_on_trial_votes") {
					// this should never trigger
					this.conn.SendMessage("Emote", `*GAME: It got too late so the club members decided to let ${this.the_accused} go for today.`);
					this.freeAndGiveTrialStats();
					logger.warning("Reached stat that should not have been possible: The day ended early, during a running voting.");
				}
				this.setGameState("waiting_on_night_activities");
				this.giveNightInstructions();
			} else if (this.gameState === "game_was_won") {
				this.conn.SendMessage("Emote", `*GAME: The next game can now by started by any registered player with '!start'. ` +
					`Every tied up player will be untied then.`
				);
				this.setGameState("game_not_started");
			}
		}

		if (now + 20_000 >= this.dayTimer && !this.dayTimerWarn && this.gameState === "waiting_on_trial_votes") {
			this.dayTimerWarn = true;
			this.conn.SendMessage("Emote", `*GAME: 20 seconds left to cast a vote.`);
		}

		if (now >= this.dayTimer && (this.gameState === "waiting_on_accused_defense" || this.gameState === "waiting_on_trial_votes")) {
			if (this.gameState === "waiting_on_accused_defense") {
				this.setGameState("waiting_on_trial_votes");
				this.giveTrialInstruction();
			} else if (this.gameState === "waiting_on_trial_votes") {
				this.conn.SendMessage("Emote", `*GAME: The club members have cast their vote and ${this.the_accused} was declared innocent and freed.`);
				this.freeAndGiveTrialStats();
				this.setGameState("waiting_on_day_activities");
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
			const red = "#F42C31";
			const timeLeft = Math.ceil(Math.max(0, this.turnTimer - now) / 1000);
			const timeLeftString = `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`;
			const dayActivityTimeLeft = Math.ceil(Math.max(0, this.dayTimer - now) / 1000);
			const dayActivityTimeLeftString = `${Math.floor(dayActivityTimeLeft / 60)}m ${dayActivityTimeLeft % 60}s`;
			if (this.gameState === "game_not_started") {
				text = "Kidnappers\nThe Game";
			} else if (this.gameState === "day_1") {
				text = tickAlternateText ? `Its a\nlovely day` : `${timeLeftString}\nleft`;
				textColor = timeLeft < 60 ? red : green;
			} else if (this.gameState === "night_1") {
				text = tickAlternateText ? `Its\nnight time` : `${timeLeftString}\nleft`;
				textColor = timeLeft < 25 ? red : green;
			} else if (this.gameState === "waiting_on_night_activities") {
				text = tickAlternateText ? `Its\nnight time` : `${timeLeftString}\nleft`;
				textColor = timeLeft < 25 ? red : green;
			} else if (this.gameState === "waiting_on_day_activities") {
				text = tickAlternateText ? `Its \nday time` : `${timeLeftString}\nleft`;
				textColor = timeLeft < 60 ? red : green;
			} else if (this.gameState === "waiting_on_accused_defense") {
				text = tickAlternateText ? `A desperate\ndefense` : `${dayActivityTimeLeftString}\nleft`;
				textColor = dayActivityTimeLeft < 15 ? red : green;
			} else if (this.gameState === "waiting_on_trial_votes") {
				text = tickAlternateText ? `Guilty\nor not` : `${dayActivityTimeLeftString}\nleft`;
				textColor = dayActivityTimeLeft < 20 ? red : green;
			} else if (this.gameState === "game_was_won") {
				text = tickAlternateText ? `Enjoy sweet\nvictory` : `${timeLeftString}\nleft`;
				textColor = "#FFFFFF";
			} else {
				text = "ERROR";
			}
			sign.Extended?.SetText(text);
			sign.SetColor(["#000000", "#040404", textColor as HexColor]);
		}
	}

	private setGameState(state: GameState, updateRoom: boolean = true) {
		let changeTimer: boolean = true;
		if (this.gameState === "waiting_on_trial_votes") {
			changeTimer = false;
		}
		this.gameState = state;
		if (state === "game_not_started") {
			if (updateRoom) {
				void this.conn.ChatRoomUpdate({
					Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | READY`,
					Background: "MainHall",
					Visibility: ["Admin", "Whitelist"]
				});
			}
			this.kidnappers.clear();
			this.persistent_copy_of_kidnappers.clear();
			this.club_members.clear();
			this.kidnappers_target = null;
			this.mistress = null;
			this.mistress_target = null;
			this.mistress_last_target = null;
			this.maid = null;
			this.maid_target = null;
			this.switch = null;
			this.fan = null;
			this.masochist = null;
			this.stalker = null;
			this.stalker_target = null;
			this.guilty_votes.clear();
			this.innocent_votes.clear();
			this.skip_day.clear();
			this.suspicions.clear();
			this.dayTimerWarn = false;
			this.roleWarnings.clear();
			this.the_accused = null;
		} else if (state === "day_1") {
			if (updateRoom) {
				this.changeRoomBackgroundTo("KidnapLeague");
			}
			// default: 3m for introductions
			this.turnTimer = Date.now() + this.active_config.firstDayDuration;
		} else if (state === "night_1") {
			if (updateRoom) {
				this.changeRoomBackgroundTo("Boudoir");
			}
			// default: 1.5m for all night activties
			this.turnTimer = Date.now() + this.active_config.firstNightDuration;
		} else if (state === "waiting_on_night_activities") {
			if (updateRoom) {
				this.changeRoomBackgroundTo("Boudoir");
			}
			// default: 1.5m for all night activties
			this.turnTimer = Date.now() + this.active_config.nightDuration;
			this.guilty_votes.clear();
			this.innocent_votes.clear();
			this.suspicions.clear();
			this.skip_day.clear();
			this.dayTimerWarn = false;
			this.the_accused = null;
		} else if (state === "waiting_on_day_activities") {
			if (updateRoom) {
				this.changeRoomBackgroundTo("KidnapLeague");
			}
			// default: 15m for all day activities
			if (changeTimer) {
				this.turnTimer = Date.now() + this.active_config.dayDuration;
			}
			this.kidnappers_target = null;
			this.mistress_target = null;
			this.maid_target = null;
			this.stalker_target = null;
			this.guilty_votes.clear();
			this.innocent_votes.clear();
			this.dayTimerWarn = false;
			this.roleWarnings.clear();
		} else if (state === "waiting_on_accused_defense") {
			// default: 40sec for the accused to defend herself
			this.dayTimer = Date.now() + this.active_config.defenseDuration;
		} else if (state === "waiting_on_trial_votes") {
			// default: 2m to cast votes against the accused
			this.dayTimer = Date.now() + this.active_config.votingDuration;
			// day would end before the voting ends, so set day end to 10 sec after the voting ends
			if (this.dayTimer > this.turnTimer) {
				this.turnTimer = this.dayTimer + 10_000;
			}
		} else if (state === "game_was_won") {
			// default: 1m before the next game can be started
			if (updateRoom) {
				void this.conn.ChatRoomUpdate({
					Description: `[BOT] scripted multiplayer gameroom | manual in bot profile | READY`,
					Visibility: ["Admin", "Whitelist"]
				});
			}
			this.turnTimer = Date.now() + this.active_config.victoryDuration;
		} else {
			logger.error("Bad state", state);
		}

		this.updateSign();
	}

	giveNightInstructions() {
		// check for win
		if (this.club_members.size === 2 && this.kidnappers.size === 2) {
			this.kidnappersWin();
			return;
		} else if (this.club_members.size === 2 && this.switch !== null && this.club_members.has(this.switch)) {
			this.conn.SendMessage("Emote", `*GAME: Now the switch is all alone, face to face with the kidnapper, who is smirking at ` +
				`her prey, totally underestimating her. In mere moments the switch had the surprised kidnapper tied into a helpless bundle of ropes.`
			);
			this.clubMembersWin();
			return;
		}

		this.conn.SendMessage("Emote", `*GAME: Night falls and all participants slowly walk back to their rooms, sleepy after ` +
			`today's events.`
		);

		const remaining_kidnappers = Array.from(this.kidnappers);
		if (this.gameState === "waiting_on_night_activities" || (this.gameState === "night_1" && this.active_config.firstNightKidnapping)) {
			if (remaining_kidnappers.length > 1) {
				remaining_kidnappers[0].Tell("Whisper", `GAME - WHISPER COMMAND NEEDED:\nYou can now try to kidnap one club member from her bed room together ` +
					`with ${remaining_kidnappers[1]} who is the other kidnapper. ` +
					`Please whisper with her to discuss whom you want to kidnap. Each one of you can make the choice ` +
					`by WHISPERING '!kidnap [name OR memberID]' (e.g. !kidnap ${remaining_kidnappers[0].Name}) to the bot ` +
					`'${this.conn.Player.Name}'. ` +
					`Please be mindful of the time left and be careful not to MISWHISPER!!`
				);
				remaining_kidnappers[1].Tell("Whisper", `GAME - WHISPER COMMAND NEEDED:\nYou can now try to kidnap one club member from her bed room together ` +
					`with ${remaining_kidnappers[0]} who is the other kidnapper. ` +
					`Please whisper with her to discuss whom you want to kidnap. Each one of you can make the choice ` +
					`by WHISPERING '!kidnap [name OR memberID]' (e.g. !kidnap ${remaining_kidnappers[1].Name}) to the bot ` +
					`'${this.conn.Player.Name}'. ` +
					`Please be mindful of the time left and be careful not to MISWHISPER!!`
				);
			} else if (remaining_kidnappers.length > 0) {
				remaining_kidnappers[0].Tell("Whisper", `GAME - WHISPER COMMAND NEEDED:\nYou can now try to kidnap one club member from her bed room. ` +
					`You are the only kidnapper left. ` +
					`Make the choice by WHISPERING '!kidnap [name OR memberID]' (e.g. !kidnap ${remaining_kidnappers[0].Name}) to the bot ` +
					`'${this.conn.Player.Name}'. ` +
					`Please be mindful of the time left and be careful not to MISWHISPER!!`
				);
			}
		} else {
			this.whisperRemainingKidnappers("You are using tonight to prepare tomorrow night's kidnapping thoroughly." +
				"\nNOTE: In the configuration for this game round, a kidnapping during the first night is not allowed");
		}

		if (this.maid !== null && this.club_members.has(this.maid)) {
			this.maid.Tell("Whisper", `GAME - WHISPER COMMAND NEEDED:\nYou can now observe one club member during the night to find out ` +
				`whether they are a kidnapper. Make the choice whom to watch ` +
				`by WHISPERING '!watch [name OR memberID]' (e.g. !watch ${this.maid.Name}) to the bot ` +
				`'${this.conn.Player.Name}' within the time limit. `
			);
		}
		if (this.stalker !== null && this.club_members.has(this.stalker)) {
			this.stalker.Tell("Whisper", `GAME - WHISPER COMMAND NEEDED:\nYou can now stalk one club member during the night in ` +
				`the hope that it is the maid. Make a choice whom to watch ` +
				`by WHISPERING '!stalk [name OR memberID]' (e.g. !stalk ${this.stalker.Name}) to the bot ` +
				`'${this.conn.Player.Name}' within the time limit. `
			);
		}
		if (this.mistress !== null && this.club_members.has(this.mistress)) {
			this.mistress.Tell("Whisper", `GAME - WHISPER COMMAND NEEDED:\n` +
				`${this.active_config.mistressCanProtectHerself ? `You can now decide to either protect yourself from being kidnapped or ` :
					`You can now `}` +
				`summon any other club member for a nightly session, keeping them safe from any kidnapping. ` +
				`If you unknowingly summon a kidnapper, this will not prevent them from kidnapping someone tonight. ` +
				`Make the choice whom to protect by WHISPERING '!protect [name OR memberID]' (e.g. !protect ${this.mistress.Name}) to the bot ` +
				`'${this.conn.Player.Name}' within the time limit.` +
				`${this.active_config.mistressCanpickSameTargetTwice ? `\nNOTE: You could pick the same person in successive nights for as often as you like.` :
					`\nNOTE: You cannot target the same person in two nights following each other!`}`
			);
		}
	}

	giveDayInstructions() {
		// check for win
		if (this.club_members.size < 3) {
			if (this.switch !== null && this.club_members.has(this.switch)) {
				this.conn.SendMessage("Emote", `*GAME: Now the switch is all alone, face to face with the kidnapper, who is smirking at ` +
					`her prey, totally underestimating her. In mere moments the switch had the surprised kidnapper tied into a helpless bundle of ropes.`
				);
				this.clubMembersWin();
				return;
			}
			this.kidnappersWin();
			return;
		}

		this.conn.SendMessage("Emote", `*${this.active_config.openSuspicions ? `GAME:` : `GAME - WHISPER COMMAND NEEDED:\n`}` +
			` Are kidnappers among us? It's almost certain! Now it is time to reveal them! Who is suspicious? Who lies?\nAnyone can ` +
			`${this.active_config.openSuspicions ?
				`openly suspect a club member by writing '!suspect [name OR memberID]' ` +
				`(e.g. !suspect Lily) into the chat at any time. ` :
				`suspect a club member by WHISPERING '!suspect [name OR memberID]' (e.g. !suspect Lily) to the bot ${this.conn.Player.Name} at any time. `}` +
			`When two suspicions were ` +
			`voiced against a club member, a vote about restraining her will be started. In case you don't feel like raising ` +
			`any more suspicions today, you can use '!skip' to indicate that you are ready to end the day early.`
		);
	}

	giveTrialInstruction() {
		this.conn.SendMessage("Emote", `*GAME: After giving ${this.the_accused} ample time to refute the accusations, ` +
			`it is now time to vote on her case. Should she be kept tightly restrained and gagged?` +
			`\nEverybody can now either write !guilty or !innocent into the chat within the next ${this.active_config.votingDuration / 1000}` +
			` seconds. A majority from all remaining participants is needed to make a decision.`
		);
	}

	whisperRemainingKidnappers(msg: string) {
		const kidnappers_team: API_Character[] = Array.from(this.kidnappers);
		let list: number[] = [];
		if (kidnappers_team.length === 2) {
			list = [0, 1];
		} else if (kidnappers_team.length === 1) {
			list = [0];
		} else {
			logger.error(`Unexpected value for kidnapper's team size: ${kidnappers_team.length}`);
		}
		for (const i of list) {
			kidnappers_team[i]?.Tell("Whisper", `GAME: ${msg}.`);
		}
	}

	setAllRolesAndCommunicate() {
		const remainingPlayerSelection: API_Character[] = this.players.slice();
		remainingPlayerSelection.forEach(item => this.club_members.add(item));
		if (this.active_config.maid === 1) {
			this.rollForRoleFrom("maid", remainingPlayerSelection);
		}
		if (this.active_config.mistress === 1) {
			this.rollForRoleFrom("mistress", remainingPlayerSelection);
		}
		if (this.active_config.switch === 1) {
			this.rollForRoleFrom("switch", remainingPlayerSelection);
		}
		if (this.active_config.stalker === 1) {
			this.rollForRoleFrom("stalker", remainingPlayerSelection);
		}
		if (this.active_config.fan === 1) {
			this.rollForRoleFrom("fan", remainingPlayerSelection);
		}
		if (this.active_config.masochist === 1) {
			this.rollForRoleFrom("masochist", remainingPlayerSelection);
		}
		this.rollForRoleFrom("kidnapper", remainingPlayerSelection);
		if (this.active_config.kidnapper === 2) {
			this.rollForRoleFrom("kidnapper", remainingPlayerSelection);
		}

		// Tell everyone about their role!
		for (const p of this.players) {
			this.sendRoleMessage(p);
		}

		const kidnappers_team: API_Character[] = Array.from(this.kidnappers);

		const oneKidnapper = `kidnapper was ${kidnappers_team[0]}`;
		const twokidnappers = `kidnappers were ${kidnappers_team[0]} and ${kidnappers_team[1]}`;

		this.gameEndMessage = `\nIn this game round the brazen ${this.active_config.kidnapper === 1 ? oneKidnapper : twokidnappers}. ` +
			`${this.active_config.mistress === 1 ? `The stunning mistress was ${this.mistress}. ` : ``}` +
			`${this.active_config.maid === 1 ? `The shy but curious maid was ${this.maid}. ` : ``}` +
			`${this.active_config.stalker === 1 ? `The obsessive, masochistic stalker was ${this.stalker}. ` : ``}` +
			`${this.active_config.switch === 1 ? `The underestimated switch was ${this.switch}. ` : ``}` +
			`${this.active_config.fan === 1 ? `The crazed fan was ${this.fan}. ` : ``}` +
			`${this.active_config.masochist === 1 ? `The scheming masochist was ${this.masochist}. ` : ``}` +
			`A round of applause ` +
			`also for the other wonderful club members: ` + remainingPlayerSelection.map(C => C.toString()).join(", ");
	}

	rollForRoleFrom(role: "maid" | "mistress" | "switch" | "stalker" | "fan" | "masochist" | "kidnapper", list: API_Character[]): void {
		const index = this.getRandomIndexFrom(list);
		const target = list[index];
		list.splice(index, 1);
		switch (role) {
			case "maid":
				this.maid = target;
				return;
			case "switch":
				this.switch = target;
				return;
			case "stalker":
				this.stalker = target;
				return;
			case "fan":
				this.fan = target;
				return;
			case "masochist":
				this.masochist = target;
				return;
			case "mistress":
				this.mistress = target;
				return;
			case "kidnapper":
				this.kidnappers.add(target);
				this.persistent_copy_of_kidnappers.add(target);
				return;
		}
	}

	getRandomIndexFrom(list: API_Character[]) {
		return Math.floor(Math.random() * list.length);
	}

	tieUpCharacterAndRemove(who: "club" | "kidnapper" | "club revenge", character: API_Character) {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		const rope = character.Appearance.AddItem(AssetGet("ItemArms", "HempRope"));

		if (who === "kidnapper" || who === "club revenge") {
			rope?.Extended?.SetType("Hogtied");
			if (who === "club revenge") {
				character.Tell("Whisper", `GAME: The club members approached you and tied you up even stricter, making sure ` +
					`there is no way you could ever free yourself, even tying each finger to make sure you cannot ` +
					`reach any knots. They also forced a layered gag on you, clearly not wanting to hear anything from you.`
				);
			} else {
				character.Tell("Whisper", `GAME: When you realized what the kidnapper was trying to do, it was already too late. ` +
					`You had no idea someone can tie a hogtie that strict, every knot well out of reach. ` +
					`She also gagged you tightly, adding layer upon layer, while groping you teasingly. ` +
					`This continued until not even the faintest sound came out of your mouth, leaving you utterly helpless.`
				);
			}
		} else {
			rope?.Extended?.SetType("BoxTie");
			const leg_rope = character.Appearance.AddItem(AssetGet("ItemLegs", "HempRope"));
			leg_rope?.Extended?.SetType("Frogtie");
		}
		rope?.SetDifficulty(20);
		const gag1 = character.Appearance.AddItem(AssetGet("ItemMouth", "ClothGag"));
		gag1?.Extended?.SetType("OTM");
		gag1?.SetColor(("#" + randomColor) as HexColor);
		gag1.SetDifficulty(20);
		const gag2 = character.Appearance.AddItem(AssetGet("ItemMouth2", "ClothGag"));
		gag2?.Extended?.SetType("OTM");
		gag2.SetDifficulty(20);
		const gag3 = character.Appearance.AddItem(AssetGet("ItemMouth3", "ClothGag"));
		gag3?.Extended?.SetType("OTM");
		gag3?.SetColor(character.Appearance.InventoryGet("HairFront").GetColor());
		gag3.SetDifficulty(20);

		for (const g of [gag1, gag2, gag3]) {
			if (who === "kidnapper") {
				g.SetCraft({
					Name: `Kidnapping Gag`,
					Description: `For professional kidnappers: when you need your victim completely silent!`,
					Property: "Large",
				});
			} else {
				g.SetCraft({
					Name: `Anti-kidnapper Gag`,
					Description: `You stand accused of the most heinous crime of kidnapping! What do you have to say for yourself? Nothing, it seems.`,
					Property: "Large",
				});
			}
		}

		// prevent a loop from calling the win condition again
		if (who !== "club revenge") {
			this.resolvePlayerRemovals(character);
		}
	}

	kidnappersWin() {
		Array.from(this.club_members)
			.filter(C => !this.persistent_copy_of_kidnappers.has(C))
			.forEach(C => this.tieUpCharacterAndRemove("kidnapper", C));

		// TODO: Find out why this does not work, because the old and the new asset is HempRope and does not overwrite?
		for (const P of this.players) {
			if (!this.persistent_copy_of_kidnappers.has(P) && P.Appearance.InventoryGet("ItemArms")?.Extended?.Type === "BoxTie") {
				this.freePlayerInItemSlots(P, listOfUsedItemGroups);
				this.tieUpCharacterAndRemove("kidnapper", P);
			}
		}

		this.persistent_copy_of_kidnappers.forEach(K => this.freePlayerInItemSlots(K, listOfUsedItemGroups));

		let msg: string = "";
		if (this.active_config.stalker === 1 && this.active_config.fan === 1) {
			msg = `~ Kidnapper${this.active_config.kidnapper === 2 ? 's' : ''}, stalker and fan win! Congratulations! ~\n`;
		} else if (this.active_config.stalker === 1) {
			msg = `~ The kidnapper${this.active_config.kidnapper === 2 ? 's' : ''} and the stalker win! Congratulations! ~\n`;
		} else if (this.active_config.fan === 1) {
			msg = `~ The kidnapper${this.active_config.kidnapper === 2 ? 's' : ''} and the fan win! Congratulations! ~\n`;
		} else {
			msg = `~ ~ ~ ~ The kidnapper${this.active_config.kidnapper === 2 ? 's win' : ' wins'}! Congratulations! ~ ~ ~ ~\n`;
		}

		this.conn.SendMessage("Emote", `*GAME: The club members were kidnapped one by one, unable to stop it. Eventually, ` +
			`the kidnapper${this.active_config.kidnapper === 2 ? 's' : ''} ` +
			`had them all helplessly bundled up. Oh my~ So many club members in utter distress!\n` +
			`${msg}` +
			`${this.active_config.masochist === 1 ? 'Moreover, the masochist also achieved her goal.' : ''}\n` +
			this.gameEndMessage +
			`\nNote: The next game can be started in ${this.active_config.victoryDuration / 1000} seconds. ` +
			`If you need to leave, you can use !freeandleave to get untied and kicked.`
		);

		metric_gameEnded.labels({ winner: "kidnappers" }).inc();

		this.setGameState("game_was_won");
	}

	clubMembersWin() {
		// free everyone and tie up every kidnapper more strict
		for (const p of this.players) {
			if (p.MemberNumber !== this.stalker?.MemberNumber && p.MemberNumber !== this.fan?.MemberNumber && this.persistent_copy_of_kidnappers.has(p)) {
				console.log(`Freeing ${p}`);
				this.freePlayerInItemSlots(p, listOfUsedItemGroups);
			}
		}

		this.persistent_copy_of_kidnappers.forEach(K => this.tieUpCharacterAndRemove("club revenge", K));

		if (this.stalker !== null) {
			this.tieUpCharacterAndRemove("club revenge", this.stalker);
		}
		if (this.fan !== null) {
			this.tieUpCharacterAndRemove("club revenge", this.fan);
		}

		let msg: string = "";
		if (this.active_config.stalker === 1 && this.active_config.fan === 1) {
			msg = `\n...except for the stalker and fan, who were kept tied up, too.`;
		} else if (this.active_config.stalker === 1) {
			msg = `\n...except for the stalker, who was kept tied up, too.`;
		} else if (this.active_config.fan === 1) {
			msg = `\n...except for the fan, who was kept tied up, too.`;
		} else {
			msg = ``;
		}

		this.conn.SendMessage("Emote", `*GAME: ... and with this, the kidnappings stopped. The club members triumphed over ` +
			`the sneaky and despicable bondage terror! Through thorough tickle interrogations of all tied up club members, the real ` +
			`kidnappers where eventually identified and the innocent victims of false judgement were immediately freed. ` +
			`${msg}` +
			'\n~ ~ ~ ~ The club members win! Congratulations! ~ ~ ~ ~\n' +
			`${this.active_config.masochist === 1 ? `The masochist ${this.masochist?.IsRestrained ? 'achieved her goal, too.' : "didn't achieve her goal."}` : ''}\n` +
			this.gameEndMessage +
			`\nNote: The next game can be started in ${this.active_config.victoryDuration / 1000} seconds. ` +
			`If you need to leave, you can use !freeandleave to get untied and kicked.`
		);

		metric_gameEnded.labels({ winner: "clubMembers" }).inc();

		this.setGameState("game_was_won");
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

	playerCheck(character: API_Character) {
		let hadWarnings = false;
		const itemsCannotRemove = character.Appearance.Appearance.filter(A => listOfUsedItemGroups.includes(A.Group) && !A.AllowRemove());
		if (itemsCannotRemove.length > 0) {
			character.Tell("Chat", `Warning: The game will conflict with following restraints you have on you:\n` +
				itemsCannotRemove.map(A => A.Name).join(", ") +
				`\nThe game cannot remove these because of locks or other limiting factors`
			);
			logger.info(`Player check for ${character}: Unremovable items: ` + itemsCannotRemove.map(A => A.Name).join(", "));
			hadWarnings = true;
		}
		const itemsToRemove = character.Appearance.Appearance.filter(A => listOfUsedItemGroups.includes(A.Group) && A.AllowRemove());
		if (itemsToRemove.length !== 0) {
			character.Tell("Chat", `Warning: Since you are currently tied up, please note that the game will remove the following ` +
				`restraints you have on you at the start of the next game:\n` +
				itemsToRemove.map(A => A.Name).join(", ") +
				`\nIf you are not fine with that, you may want to leave the room again instead.`
			);
			logger.info(`Player check for ${character}: Items to remove: ` + itemsToRemove.map(A => A.Name).join(", "));
			hadWarnings = true;
		}
		const itemsCannotUse = listOfUsedItemsInThisScene.filter(item => !character.IsItemPermissionAccessible(AssetGet(item[0], item[1]), item[2]));
		if (itemsCannotUse.length > 0) {
			character.Tell("Chat", `Warning: The game uses following items, but you have them blocked or limited:\n` +
				itemsCannotUse.map(A => A.join(":")).join(", ")
			);
			logger.info(`Player check for ${character}: Blocked items: ` + itemsCannotUse.map(A => A.join(":")).join(", "));
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

	private sendRoleMessage(character: API_Character): void {
		if (this.persistent_copy_of_kidnappers.size === 1 && this.persistent_copy_of_kidnappers.has(character)) {
			character.Tell("Whisper", solo_kidnapper_intro);
		} else if (this.persistent_copy_of_kidnappers.has(character)) {
			character.Tell("Whisper", `GAME: You are one of the two kidnappers. You need to prevent everyone else ` +
				`from finding out what you are doing at night. The kidnapper team consists of: ` +
				`${Array.from(this.persistent_copy_of_kidnappers.values()).map(A => A.toString()).join(", ")}. ` +
				`You can discuss your joint approach by whispering. Please be careful not to MISWHISPER!!`
			);
		} else if (this.maid === character) {
			character.Tell("Whisper", maid_intro);
		} else if (this.switch === character) {
			character.Tell("Whisper", switch_intro);
		} else if (this.fan === character) {
			character.Tell("Whisper", fan_intro);
		} else if (this.masochist === character) {
			character.Tell("Whisper", masochist_intro);
		} else if (this.stalker === character) {
			character.Tell("Whisper", stalker_intro);
		} else if (this.mistress === character) {
			character.Tell("Whisper", mistress_intro);
		} else if (this.club_members.has(character)) {
			character.Tell("Whisper", club_member_intro);
		} else {
			character.Tell("Whisper", `GAME: Please wait for the next game round to start in order to get a new role assignment.`);
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
	 * Updates the current room the bot is in with a given background
	 * @param name the name of the background
	 */
	changeRoomBackgroundTo(name: string): void {
		void this.conn.ChatRoomUpdate({
			Background: name
		});
	}

	destroy() {
		clearInterval(this.tickTimer);
		super.destroy();
	}

}
