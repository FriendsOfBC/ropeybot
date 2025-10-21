/*
 * Copied from the original bot hub, with permission.
 */

import { logger, API_Connector,
API_Character,
API_Chatroom,
AnyBotEvent, AnyCharacterEvent, AnyLogicEvent, LogicEvent_Beep, LogicEvent_CharacterEntered, LogicEvent_CharacterLeft, LogicEvent_Message, LogicEvent_RoomForceLeave, LogicEvent_RoomUpdate,
LogicBase } from "bc-bot";
import promClient from "prom-client";

import _ from "lodash";
import fs from "fs";
import { ConfigFile } from "../../config";

export interface IAdminLogicSettings {
	/** @default true */
	log: boolean;
	/** @default false */
	logConnectionMemberNumber: boolean;
	/** @default false */
	logConnectionName: boolean;
	/** @default true */
	kickVotingEnabled: boolean;
	/** @default true */
	votingEnabled: boolean;
	/** @default true */
	catchUnknownCommands: boolean;
	/** @default 900000 (15 minutes) */
	inactivityKickTimer: number | null;
	/** @default 600000 (10 minutes) */
	inactivityWarningTimer: number | null;
	/** @default null */
	inactivityKickEnabledOnlyBelowFreeSlotsCount: number | null;
	/** @default true */
	roomGuardEnabled: boolean;
}

interface IAdminCommandInfo {
	description: string | null;
}

type AdminCommandHandlerRaw = (connection: API_Connector, args: string, sender: API_Character) => void | Promise<any>;
type AdminCommandHandlerParsed = (connection: API_Connector, argv: string[], sender: API_Character) => void | Promise<any>;
type AdminCommandHandlerSu = (connection: API_Connector, argv: string[], sender: number, respond: (response: string) => void) => void | Promise<any>;

interface IAdminCommandRaw extends IAdminCommandInfo {
	parse: false;
	callback: AdminCommandHandlerRaw;
}

interface IAdminCommandParsed extends IAdminCommandInfo {
	parse: true;
	callback: AdminCommandHandlerParsed;
}

export interface IAdminVoteResults {
	name: string;
	yes: number;
	no: number;
	didNotVote: number;
}

interface IAdminVoteData {
	name: string;
	description: string;
	votes: Map<API_Character, boolean | null>;
	endTime: number;
	reportProgress: boolean;
	progress?: (data: IAdminVoteResults) => boolean;
	endHook?: (name: string) => void;
	resolve: (results: IAdminVoteResults) => void;
}

interface IAdminGuardData {
	points: number;
	log: [string, number][];
}

// Global config
const KICKVOTE_DURATION: number = 300;
const KICKVOTE_PROTECTION_DURATION: number = 360;
const KICKVOTE_BAN_AVAILABILITY: number = 3600;
// TODO: maybe refactor those three above also in the more clear format e.g. 60 * 60 * 1000
// to be consistent with the style few lines below and not add the *1000 only in the function

/** Per-second decay of guard points */
const ROOMGUARD_POINT_DECAY: number = 0.4;
const ROOMGUARD_CHAT_WIDTH: number = 60;
const ROOMGUARD_THRESHOLD_OK: number = 10;
const ROOMGUARD_THRESHOLD_WARN: number = 30;
const ROOMGUARD_THRESHOLD_ACTION: number = 40;

// Metrics
const metric_players = new promClient.Gauge({
	name: "hub_players_in_room",
	help: "hub_players_in_room",
	labelNames: ["roomName"] as const
});
const metric_commands = new promClient.Counter({
	name: "hub_admin_commands_ran",
	help: "hub_admin_commands_ran",
	labelNames: ["roomName", "command"] as const
});
const metric_guard_points_current = new promClient.Gauge({
	name: "hub_admin_guard_points_current",
	help: "hub_admin_guard_points_current",
	labelNames: ["memberNumber"] as const
});
const metric_guard_points = new promClient.Counter({
	name: "hub_admin_guard_points",
	help: "hub_admin_guard_points",
	labelNames: ["memberNumber"] as const
});

export class AdministrationLogic extends LogicBase {

	private readonly a_settings: IAdminLogicSettings = {
		log: true,
		logConnectionMemberNumber: false,
		logConnectionName: false,
		kickVotingEnabled: true,
		votingEnabled: true,
		catchUnknownCommands: true,
		inactivityKickTimer: /*15 * 60 * 1000*/null,
		inactivityWarningTimer: 10 * 60 * 1000,
		inactivityKickEnabledOnlyBelowFreeSlotsCount: null,
		roomGuardEnabled: true
	};
	private a_destroyed: boolean = false;
	private readonly a_tickTimer: NodeJS.Timeout;

	private a_commands: Map<string, IAdminCommandRaw | IAdminCommandParsed> = new Map();
	private a_SUCommands: Map<string, AdminCommandHandlerSu> = new Map();
	private a_pendingVotes: Map<string, IAdminVoteData> = new Map();

	private a_pendingKickVotes: Map<number, string> = new Map();
	private a_kickProtection: WeakMap<API_Character, number> = new WeakMap();
	private a_banAvailability: Map<number, number> = new Map();
	private a_notBanComfirmation: WeakMap<API_Character, number> = new WeakMap();

	private a_lastActivity: Map<API_Character, number> = new Map();
	private a_inactivityDidWarn: WeakSet<API_Character> = new WeakSet();

	private a_guard_points: Map<number, IAdminGuardData> = new Map();
	private a_guard_didWarn: Set<number> = new Set();
	private a_guard_Acted: Set<number> = new Set();
	private a_guard_lastMessage: WeakMap<API_Character, string> = new WeakMap();

	constructor(settings: Partial<IAdminLogicSettings>, private config: ConfigFile) {
		super();
		Object.assign(this.a_settings, settings);
		//logConfig.onFatal.push(this.destroy.bind(this));
		this.registerCommand("help", (connection, args, sender) => this.on_Help(sender), "Shows this list of commands");
		this.registerCommand("?", (connection, args, sender) => this.on_Help(sender), null);

		if (this.a_settings.kickVotingEnabled) {
			this.a_settings.votingEnabled = true;
			this.registerCommand("kick", this.a_command_kick.bind(this, false), "Starts a vote to kick player");
			this.registerCommand("ban", this.a_command_kick.bind(this, true), null);
		}

		if (this.a_settings.votingEnabled) {
			this.registerCommand("yes", this.a_CharacterVote.bind(this, true), null);
			this.registerCommand("no", this.a_CharacterVote.bind(this, false), null);
			this.registerCommand("listvotes", this.a_command_listVotes.bind(this), "List currently ongoing votes");
		}

		this.registerCommand("feedback", this.a_command_feedback.bind(this), "Send a message as feedback to the authors");

		const suRunner: AdminCommandHandlerParsed = (connection, argv, sender) => this.a_command_su(connection, argv, sender.MemberNumber, response => sender.Tell("Whisper", response));
		this.registerCommandParsed("su", suRunner, null);
		this.registerCommandParsed("sudo", suRunner, null);
		this.registerCommandParsed("admin", suRunner, null);

		//#region Admin commands
		this.registerSUCommand("help", (connection, argv, sender, respond) => {
			respond(`Registered SU commands:\n${Array.from(this.a_SUCommands.keys()).join("\n")}`);
		});

		this.registerSUCommand("say", (connection, argv, sender, respond) => {
			const msg = argv.join(" ").trim();
			if (msg) {
				logger.info(`${this.a_LogHeader(connection)} Admin chat from ${sender}: ${msg}`);
				if (msg.startsWith("*") && msg.length > 1) {
					connection.SendMessage("Emote", msg.substr(1).trim());
				} else {
					connection.SendMessage("Chat", msg);
				}
			} else {
				respond("Message expected.");
			}
		});

		this.registerSUCommand("kick", (connection, argv, sender, respond) => {
			if (argv.length !== 1) {
				return respond(`Target expected.`);
			}
			const target = this.identifyPlayerInRoom(connection.chatRoom, argv[0]);
			if (typeof target === "string") {
				respond(target);
				return;
			} else {
				respond("Ok");
				connection.SendMessage("Emote", `*${target} has been kicked by administrator.`);
				return target.Kick();
			}
		});

		this.registerSUCommand("ban", (connection, argv, sender, respond) => {
			if (argv.length !== 1) {
				return respond(`Target expected.`);
			}
			const target = this.identifyPlayerInRoom(connection.chatRoom, argv[0]);
			if (typeof target === "string") {
				if (/^[0-9]+$/.test(argv[0])) {
					const MemberNumber = Number.parseInt(argv[0], 10);
					if (connection.chatRoom.Ban.includes(MemberNumber)) {
						respond(`Target already banned.`);
					} else {
						respond(`Ok, target not in room.`);
						return connection.ChatRoomUpdate({
							Ban: _(connection.chatRoom.Ban.concat(MemberNumber)).uniq().sort().value()
						});
					}
				} else {
					respond(target);
				}
				return;
			} else {
				respond("Ok");
				connection.SendMessage("Emote", `*${target} has been banned by administrator.`);
				return target.Ban();
			}
		});

		this.registerSUCommand("resize", (connection, argv, sender, respond) => {
			if (argv.length !== 1) {
				return respond(`Size expected.`);
			}
			const size = Number.parseInt(argv[0], 10);
			if (isNaN(size) || !Number.isInteger(size) || size < 2 || size > 10) {
				return respond(`Invalid size "${size}".`);
			}
			respond("Ok");
			return connection.ChatRoomUpdate({
				Limit: size
			});
		});

		this.registerSUCommand("private", (connection, argv, sender, respond) => {
			if (argv.length !== 1) {
				return respond(`Value expected.`);
			}
			if (argv[0] !== "true" && argv[0] !== "false") {
				return respond(`Expected true or false.`);
			}
			respond("Ok");
			return connection.ChatRoomUpdate({
				Private: argv[0] === "true"
			});
		});

		this.registerSUCommand("list", (connection, argv, sender, respond) => {
			respond(
				`List of players in room:\n` +
				connection.chatRoom.characters.map(c => `${c}${c === connection.Player ? " - Me" : ""}`).join("\n")
			);
		});

		this.registerSUCommand("promoteme", (connection, argv, sender) => {
			return connection.ChatRoomUpdate({
				Admin: _.uniq(connection.chatRoom.Admin.concat(sender))
			});
		});

		//#endregion

		this.a_tickTimer = setInterval(this.a_Tick.bind(this), 1000);
	}

	destroy() {
		if (!this.a_destroyed) {
			this.a_destroyed = true;
			clearInterval(this.a_tickTimer);
		}
	}

	//#region Commands
	/**
	 * To register a new command for the adminLogic
	 * @param name The name of the command, how it is supposed to be typed by the user
	 * @param callback The call back that is triggered when the command is used in the format
	 * 				   of `(connection, args, sender) => functionUsingSomeOfTheseVariablesThatWillBeTriggered()`
	 * @param description The description of the command. It is intended that `null` means the command will be not showing up in the
	 *                    command list, either because it is an alias for another command using the same callback or it is a hidden one.
	 */
	protected registerCommand(name: string, callback: AdminCommandHandlerRaw, description: string | null = "") {
		name = name.toLocaleLowerCase();
		if (this.a_commands.has(name)) {
			throw new Error(`Command "${name}" already registered!`);
		}
		this.a_commands.set(name, {
			parse: false,
			callback,
			description
		});
	}

	/**
	 * To register a new command for the adminLogic, with argumetns parsed by logic itself
	 * @param name The name of the command, how it is supposed to be typed by the user
	 * @param callback The call back that is triggered when the command is used in the format
	 * 				   of `(connection, argv, sender) => functionUsingSomeOfTheseVariablesThatWillBeTriggered()`
	 * @param description The description of the command. It is intended that `null` means the command will be not showing up in the
	 *                    command list, either because it is an alias for another command using the same callback or it is a hidden one.
	 */
	protected registerCommandParsed(name: string, callback: AdminCommandHandlerParsed, description: string | null = "") {
		name = name.toLocaleLowerCase();
		if (this.a_commands.has(name)) {
			throw new Error(`Command "${name}" already registered!`);
		}
		this.a_commands.set(name, {
			parse: true,
			callback,
			description
		});
	}

	protected registerSUCommand(name: string, callback: AdminCommandHandlerSu) {
		name = name.toLocaleLowerCase();
		if (this.a_SUCommands.has(name)) {
			throw new Error(`Command "${name}" already registered!`);
		}
		this.a_SUCommands.set(name, callback);
	}

	/**
	 * To unregister an existing command for the adminLogic
	 * @param name The name of the command, how it is supposed to be typed by the user
	 * @returns `true` if unregistering was successful, otherwise `false`
	 */
	protected unregisterCommand(name: string): boolean {
		return this.a_commands.delete(name.toLocaleLowerCase());
	}

	private a_command_su(connection: API_Connector, argv: string[], sender: number, respond: (response: string) => void) {
		if (!this.config.superusers.includes(sender)) {
			respond("You don't have access to administrator features!");
			return;
		}
		if (argv.length < 1) {
			respond("Command expected!");
			return;
		}
		const command = argv[0].toLocaleLowerCase();
		argv = argv.slice(1);
		const processor = this.a_SUCommands.get(command);
		if (!processor) {
			respond(`Admin command "${command}" not found!`);
			return;
		}
		try {
			const result = processor(connection, argv, sender, respond);
			if (result) {
				result.catch(err => {
					logger.fatal(
						`${this.a_LogHeader(connection)} CRASH during async processing of SU command "${command}". Logic: ${this.constructor.name}\n` +
						`Arguments: ${JSON.stringify(argv)}\nError: `,
						err
					);
				});
			}
		} catch (err) {
			logger.fatal(
				`${this.a_LogHeader(connection)} CRASH during processing of SU command "${command}". Logic: ${this.constructor.name}\n` +
				`Arguments: ${JSON.stringify(argv)}\nError: `,
				err
			);
		}
	}

	protected on_Help(sender: API_Character) {
		sender.Tell(
			"Whisper",
			`Available commands:\n` +
			Array.from(this.a_commands.entries())
				.filter(c => c[1].description !== null)
				.map(c => `!${c[0]}` + (c[1].description ? ` - ${c[1].description}` : ""))
				.sort()
				.join("\n")
		);
	}
	//#endregion

	//#region Voting
	protected startVote(name: string, room: API_Chatroom, time: number, options: {
		description?: string;
		announcmentMessage?: string | null;
		participants?: API_Character[];
		autoVoteYes?: API_Character[];
		autoVoteNo?: API_Character[];
		reportProgress?: boolean;
		progress?: (data: IAdminVoteResults) => boolean;
		startHook?: (name: string) => void;
		endHook?: (name: string) => void;
	} = {}): Promise<IAdminVoteResults> {
		let newName = name;
		for (let i = 2; this.a_pendingVotes.has(newName); i++) {
			newName = `${name}_${i}`;
		}
		return new Promise((resolve) => {
			const participants = (options.participants ? options.participants.filter(p => room.characters.includes(p)) : room.characters.slice()).filter(p => !p.IsBot());
			const vote: IAdminVoteData = {
				name: newName,
				description: options.description || "",
				endTime: Date.now() + time * 1000,
				votes: new Map(participants.map(p => [p, null])),
				reportProgress: !!options.reportProgress,
				progress: options.progress,
				endHook: options.endHook,
				resolve
			};
			for (const p of options.autoVoteNo ?? []) {
				vote.votes.set(p, false);
			}
			for (const p of options.autoVoteYes ?? []) {
				vote.votes.set(p, true);
			}
			this.a_pendingVotes.set(newName, vote);
			if (options.announcmentMessage !== null) {
				for (const participant of participants) {
					const targetVote = vote.votes.get(participant);
					participant.Tell(
						"Chat",
						`===== A new vote has started! =====\n` +
						`Vote name: ${vote.name}      Time left: ${Math.floor((vote.endTime - Date.now()) / 1000)}s\n` +
						(options.announcmentMessage ?? vote.description) +
						`\n\n` +
						(targetVote === null ?
							`To submit your vote, whisper one of these to the bot:\n!yes ${vote.name}\n!no ${vote.name}` :
							`You have automatically voted ${targetVote ? "yes" : "no"} for this vote`
						) +
						`\n===================================`
					);
				}
			}
			if (options.startHook) {
				options.startHook(newName);
			}
		});
	}

	private a_makeVoteResults(voteData: IAdminVoteData): IAdminVoteResults {
		const res: IAdminVoteResults = {
			name: voteData.name,
			yes: 0,
			no: 0,
			didNotVote: 0
		};
		for (const v of voteData.votes.values()) {
			if (v === null) {
				res.didNotVote++;
			} else if (v) {
				res.yes++;
			} else {
				res.no++;
			}
		}
		return res;
	}

	private a_CharacterVote(vote: boolean, connection: API_Connector, args: string, sender: API_Character) {
		if (!args.trim()) {
			const votes = Array.from(this.a_pendingVotes.entries()).filter(i => i[1].votes.has(sender));
			if (votes.length === 0) {
				sender.Tell("Whisper", "There are currently no active votes you can vote on");
			} if (votes.length === 1) {
				args = votes[0][0];
			} else {
				sender.Tell(
					"Whisper",
					"There are multiple ongoing votes. Please use one of the following to select which vote you want to vote on:\n" +
					votes.map(i => `!${vote ? "yes" : "no"} ${i[0]}`).join("\n")
				);
				return;
			}
		}
		const voteData = this.a_pendingVotes.get(args.trim());
		if (!voteData) {
			sender.Tell("Whisper", "No such vote found. To see currently ongoing votes, use '!listvotes'\n" +
				"You have to use the vote identifier that was shown to you when the vote was announced after your command, such as '!yes 12345' / '!no 12345'. Just '!yes' is not working.");
			return;
		}
		if (!voteData.votes.has(sender)) {
			sender.Tell("Whisper", "You are not eligible to vote in this vote.");
			return;
		}
		const res = voteData.votes.get(sender);
		if (res !== null) {
			sender.Tell("Whisper", `You already voted ${res ? "yes" : "no"} in this vote. Votes cannot be changed.`);
			return;
		}
		voteData.votes.set(sender, vote);
		sender.Tell("Whisper", "Vote accepted");
		let end = false;
		const results = this.a_makeVoteResults(voteData);
		if (voteData.progress) {
			end = voteData.progress(results);
		}
		if (!end && Array.from(voteData.votes.values()).every(v => v !== null)) {
			end = true;
		}
		if (end) {
			this.a_endVote(voteData);
		} else if (voteData.reportProgress) {
			connection.SendMessage("Chat", `Vote "${voteData.name}" update:\nYes: ${results.yes}  No: ${results.no}`);
		}
	}

	private a_command_listVotes(connection: API_Connector, args: string, sender: API_Character) {
		if (this.a_pendingVotes.size === 0) {
			sender.Tell("Whisper", "There are currently no ongoing votes");
			return;
		}
		sender.Tell(
			"Whisper",
			`List of currently ongoing votes: \n` +
			Array.from(this.a_pendingVotes.values())
				.map((v) => `> "${v.name}" ${v.description ? `- ${v.description} ` : ""}(${Math.floor((v.endTime - Date.now()) / 1000)}s left)`)
				.join("\n") +
			(Array.from(this.a_pendingVotes.values()).some(v => v.votes.get(sender) === null) ?
				`\n\nTo vote whisper one of the following commands to the bot:\n` +
				`'!yes <vote name>' / '!no <vote name>'`
				: "")
		);
	}

	private a_endVote(vote: IAdminVoteData) {
		if (!this.a_pendingVotes.delete(vote.name)) {
			throw new Error(`Attempt to end non-pending vote "${vote.name}"`);
		}
		if (vote.endHook) {
			vote.endHook(vote.name);
		}
		vote.resolve(this.a_makeVoteResults(vote));
	}
	//#endregion

	protected identifyPlayerInRoom(room: API_Chatroom, identifier: string): API_Character | string {
		if (/^[0-9]+$/.test(identifier)) {
			const MemberNumber = Number.parseInt(identifier, 10);
			const target = room.characters.find(c => c.MemberNumber === MemberNumber);
			if (!target) {
				return `Could not find player #${MemberNumber} in room`;
			}
			return target;
		}
		let targets = room.characters.filter(c => c.Name === identifier);
		if (targets.length === 0)
			targets = room.characters.filter(c => c.Name.toLocaleLowerCase() === identifier.toLocaleLowerCase());
		if (targets.length === 0)
			targets = room.characters.filter(c => c.Name.toLocaleLowerCase().startsWith(identifier.toLocaleLowerCase()));

		if (targets.length === 1) {
			return targets[0];
		} else if (targets.length === 0) {
			return `Player "${identifier}" not found in room`;
		} else {
			return `Multiple players match "${identifier}". Please use Member Number instead.`;
		}
	}

	//#region Kickvoting
	private a_command_kick(ban: boolean, connection: API_Connector, args: string, sender: API_Character) {
		const targetMatch = /^(\S+)(?:\s|$)(.*)$/.exec(args);
		if (!targetMatch) {
			sender.Tell("Whisper", `Expected format: !${ban ? "ban" : "kick"} <target> [Reason]`);
			return;
		}
		const target = this.identifyPlayerInRoom(sender.chatRoom, targetMatch[1]);
		if (typeof target === "string") {
			sender.Tell("Whisper", `Failed to start vote:\n${target}`);
			return;
		}

		if (target === sender) {
			sender.Tell("Whisper", "You know you can just leave the room, right?");
			return;
		}

		if (target.IsRoomAdmin()) {
			sender.Tell("Whisper", `Failed to start vote:\nRoom administrators cannot be kicked/banned.`);
			return;
		}

		const existingVote = this.a_pendingKickVotes.get(target.MemberNumber);
		if (existingVote !== undefined) {
			sender.Tell(
				"Whisper",
				`There already is pending vote against this player. Please use one of the following to vote:\n` +
				`!yes ${existingVote}\n!no ${existingVote}`
			);
			return;
		}

		const protectedUntil = this.a_kickProtection.get(target);
		if (protectedUntil != null && protectedUntil > Date.now()) {
			sender.Tell(
				"Whisper",
				`Failed to start vote:\n` +
				`${target} was already subject of a recent voting. You need to wait a few minutes before you can start the same vote again.`
			);
			return;
		}

		const canBeBannedUntil = this.a_banAvailability.get(target.MemberNumber);
		if (canBeBannedUntil != null && canBeBannedUntil >= Date.now()) {
			if (!ban && this.a_notBanComfirmation.get(sender) !== target.MemberNumber) {
				sender.Tell(
					"Whisper",
					`Note:\n` +
					`${target} was already recently kicked from this room. This means you can start a ban vote instead with '!ban ${target.MemberNumber}'.\n` +
					`If you wish to still only kick target, repeat the command '!kick ${args}'`
				);
				this.a_notBanComfirmation.set(sender, target.MemberNumber);
				return;
			}
		} else if (ban) {
			sender.Tell(
				"Whisper",
				`Failed to start vote:\n` +
				`${target} hasn't been recently kicked from room. Players need to have been kicked recently to be able to ban them`
			);
			return;
		}

		const reason = targetMatch[2];
		this.a_start_kickvote(connection, ban, target, sender, reason);
	}

	private a_start_kickvote(connection: API_Connector, ban: boolean, target: API_Character, sender: API_Character, reason: string) {
		if (this.a_pendingKickVotes.has(target.MemberNumber))
			return;

		const voteName = `${ban ? "ban" : "kick"} ${target.MemberNumber}`;
		this.a_kickProtection.set(target, Date.now() + KICKVOTE_PROTECTION_DURATION * 1000);
		this.startVote(voteName, target.chatRoom, KICKVOTE_DURATION, {
			description: `Vote to ${ban ? "ban" : "kick"} ${target}`,
			announcmentMessage: `${sender} started vote to ${ban ? "ban" : "kick"} ${target}!\n` +
				`Reason: ${reason}`,
			autoVoteYes: [sender],
			autoVoteNo: [target],
			reportProgress: true,
			progress: ({ yes, no, didNotVote }) => yes > no + didNotVote || no >= yes + didNotVote,
			startHook: name => {
				logger.alert(`${this.a_LogHeader(connection)} Vote to ${ban ? "ban" : "kick"} ${target} started by ${sender} (vote id: ${name})`);
				this.a_pendingKickVotes.set(target.MemberNumber, name);
			},
			endHook: () => {
				this.a_pendingKickVotes.delete(target.MemberNumber);
			}
		}).then(result => {
			if (target.IsRoomAdmin()) {
				// Silently fail kick vote, if target became admin
				return;
			}
			logger.alert(`${this.a_LogHeader(connection)} Vote to ${ban ? "ban" : "kick"} ${target} (vote id: ${result.name}) ended with result Y: ${result.yes}  N: ${result.no}  DNV: ${result.didNotVote}`);
			if (result.yes > result.no + Math.floor(result.didNotVote / 2)) {
				connection.SendMessage("Chat",
					`Player ${target} ${ban ? "ban" : "kick"} vote passed.\n` +
					`Yes: ${result.yes}  No: ${result.no}  Did not vote: ${result.didNotVote}`
				);
				if (!ban) {
					this.a_banAvailability.set(target.MemberNumber, Date.now() + KICKVOTE_BAN_AVAILABILITY * 1000);
				}
				const target2 = connection.chatRoom.characters.find(c => c.MemberNumber === target.MemberNumber);
				if (target2) {
					if (ban) {
						void target2.Ban();
					} else {
						void target2.Kick();
					}
				} else if (ban) {
					void connection.ChatRoomUpdate({
						Ban: _(connection.chatRoom.Ban.concat(target.MemberNumber)).uniq().sort().value()
					});
				}
			} else {
				connection.SendMessage("Chat",
					`Player ${target} ${ban ? "ban" : "kick"} vote failed.\n` +
					`Yes: ${result.yes}  No: ${result.no}  Did not vote: ${result.didNotVote}`
				);
			}
		}, logger.fatal.bind(logger));
	}
	//#endregion

	//#region Room guard
	private a_guard_givePoints(target: API_Character, points: number, reason: string) {
		if (!this.a_settings.roomGuardEnabled)
			return;
		if (!(points > 0)) {
			logger.error(`${this.a_LogHeader(target.connection)} Non-positive number of points for guard to give`, points, new Error());
			return;
		}
		if (target.IsRoomAdmin())
			return;
		let data = this.a_guard_points.get(target.MemberNumber);
		if (!data) {
			data = {
				points: 0,
				log: []
			};
			this.a_guard_points.set(target.MemberNumber, data);
		}
		data.points += points;
		data.log.push([reason, points]);
		if (data.log.length > 32) {
			data.log.shift();
		}
		metric_guard_points_current.labels({ memberNumber: target.MemberNumber }).set(data.points);
		metric_guard_points.labels({ memberNumber: target.MemberNumber }).inc(points);
		if (data.points >= ROOMGUARD_THRESHOLD_WARN && !this.a_guard_didWarn.has(target.MemberNumber)) {
			logger.alert(`${this.a_LogHeader(target.connection)} GuardPoints warning for ${target}: ${data.points}\n`, ...data.log);
			data.points = ROOMGUARD_THRESHOLD_WARN;
			this.a_guard_didWarn.add(target.MemberNumber);
			target.Tell(
				"Chat",
				`(\n` +
				`==========[ ROOM GUARD ]==========\n` +
				`Warning: Room guard has detected your actions as potentially disruptive or spamming.\n` +
				`Please slow down a bit with what you are currently doing. If your actions continue like this, you will be automatically kicked from the room.\n` +
				`Please be tolerant and try to not disrupt the room and others in it. Thank you!\n` +
				`\n` +
				`As Room Guard is experimental, this warning has been logged and admins will be checking the actions leading to it manually at a later point in time. ` +
				`If you believe this was triggered for no good reason, there is a high chance that our investigation will make us tweak the sensitivity of the room guard further.\n` +
				`==================================\n`
			);
		} else if (data.points >= ROOMGUARD_THRESHOLD_ACTION && !this.a_guard_Acted.has(target.MemberNumber)) {
			const canBeBannedUntil = this.a_banAvailability.get(target.MemberNumber);
			this.a_guard_Acted.add(target.MemberNumber);
			this.a_banAvailability.set(target.MemberNumber, Date.now() + KICKVOTE_BAN_AVAILABILITY * 1000);

			logger.alert(`${this.a_LogHeader(target.connection)} RoomGuard kicked ${target}: ${data.points}\n`, ...data.log);
			target.connection.SendMessage("Emote", `*${target} has been automatically kicked by Room Guard™, as their actions have been detected as likely disruptive.`);
			target.Kick();
			// Reset points to 0, resetting roomguard for specific user after kicking
			data.points = 0;

			if (canBeBannedUntil != null && canBeBannedUntil >= Date.now()) {
				this.a_start_kickvote(target.connection, true, target, target.connection.Player, "Room Guard™ detected repeated, likely disruptive or spammy actions.");
			}
		}
		/* TODO: Ban on repetitive violation
==========[ ROOM GUARD ]==========
Warning: Room guard has detected your actions as potentially disruptive or spamming.
Please slow down a bit with what you are currently doing. If your actions continue like this, you will be automatically banned from the room, as this is not your first violation!
Please be nice to other people that want to just enjoy themselves. Thank you!
==================================
*/
	}

	private a_guard_pointDecay() {
		for (const [memberNumber, data] of this.a_guard_points.entries()) {
			data.points -= ROOMGUARD_POINT_DECAY;
			if ((this.a_guard_didWarn.has(memberNumber) || this.a_guard_Acted.has(memberNumber)) && data.points <= ROOMGUARD_THRESHOLD_OK) {
				logger.alert(`[A] Room guard warning reset for ${memberNumber}`);
				this.a_guard_didWarn.delete(memberNumber);
				this.a_guard_Acted.delete(memberNumber);
			}
			if (!(data.points > 0)) {
				this.a_guard_points.delete(memberNumber);
				this.a_guard_didWarn.delete(memberNumber);
				this.a_guard_Acted.delete(memberNumber);
				metric_guard_points_current.labels({ memberNumber }).set(0);
			} else {
				metric_guard_points_current.labels({ memberNumber }).set(data.points);
			}
		}
	}
	//#endregion

	private a_command_feedback(connection: API_Connector, args: string, sender: API_Character) {
		const message = args.trim();
		if (!message) {
			sender.Tell("Whisper", `Expected format: !feedback <message>`);
			return;
		}
		sender.Tell("Whisper", "Your feedback has been saved, thank you!");
		this.a_guard_givePoints(sender, 5, "feedback");
		const msg = `${this.a_LogHeader(connection)} Feedback: ${sender}\n${message}`;
		logger.alert(msg);
		fs.writeFileSync("./data/messagelog.txt", msg + "\n\n", { flag: "a", encoding: "utf8" });
	}

	private a_Tick() {
		const now = Date.now();
		for (const vote of Array.from(this.a_pendingVotes.values())) {
			if (now >= vote.endTime) {
				this.a_endVote(vote);
			}
		}

		if (this.a_settings.inactivityKickTimer !== null) {
			for (const [character, lastActivity] of this.a_lastActivity.entries()) {
				if (
					character.IsRoomAdmin() ||
					character.chatRoom.Private ||
					(
						this.a_settings.inactivityKickEnabledOnlyBelowFreeSlotsCount !== null &&
						character.chatRoom.Limit - character.chatRoom.charactersCount >= this.a_settings.inactivityKickEnabledOnlyBelowFreeSlotsCount
					)
				) continue;
				if (
					this.a_settings.inactivityWarningTimer !== null &&
					now >= lastActivity + this.a_settings.inactivityWarningTimer &&
					!this.a_inactivityDidWarn.has(character)
				) {
					this.a_inactivityDidWarn.add(character);
					character.Tell("Chat",
						`===== Inactivity warning! =====\n` +
						`You have not said something for quite a while. If you continue being inactive, you will soon ` +
						`be kicked from the room to make space for others who want to enjoy it. Typing into the chat will reset this.` +
						`\n===============================`
					);
					// Make sure players are warned correct time before being kicked
					this.a_lastActivity.set(character, now - this.a_settings.inactivityWarningTimer);
				} else if (now >= lastActivity + this.a_settings.inactivityKickTimer) {
					character.connection.SendMessage("Emote", `*${character} has been kicked due to inactivity.`);
					void character.Kick();
				}
			}
		}

		this.a_guard_pointDecay();
	}

	private a_LogHeader(connection: API_Connector): string {
		return `[A] [${connection.chatRoom.Name}]` + (this.a_settings.logConnectionMemberNumber ? ` [${connection.Player.MemberNumber}]` : "") + (this.a_settings.logConnectionName ? ` [${connection.username}]` : "");
	}

	private a_onMessage(event: LogicEvent_Message): boolean {
		if (this.a_settings.log) {
			const dict = event.message.Dictionary === undefined ? "" : `; dict: ${JSON.stringify(event.message.Dictionary)}`;
			if (event.message.Type !== "Hidden") {
				const msg = `${this.a_LogHeader(event.connection)} Message ${event.message.Type} ` +
					`from ${event.Sender.Name} (${event.Sender.MemberNumber}): ` +
					`${event.message.Content}${dict}`;
				if (event.Sender.IsBot() || event.message.Type === "Action" && ["ActionUse", "ActionRemove"].includes(event.message.Content)) {
					logger.debug(msg);
				} else if (["Chat", "Emote", "Whisper"].includes(event.message.Type)) {
					logger.info(msg);
				} else {
					logger.verbose(msg);
				}
			}
		}

		if (["Chat", "Whisper", "Emote"].includes(event.message.Type)) {
			this.a_lastActivity.set(event.Sender, Date.now());
			this.a_inactivityDidWarn.delete(event.Sender);
		}

		//#region Room guard
		if (event.message.Type === "Chat" || event.message.Type === "Emote") {
			let points = _.sum(event.message.Content.split("\n").map(line => Math.max(1, Math.ceil(line.length / ROOMGUARD_CHAT_WIDTH))));
			if (this.a_guard_lastMessage.get(event.Sender) === event.message.Content) {
				points *= 2;
			} else {
				this.a_guard_lastMessage.set(event.Sender, event.message.Content);
			}
			this.a_guard_givePoints(event.Sender, points, "chat");
		} else if (event.message.Type === "Action" || event.message.Type === "Activity") {
			this.a_guard_givePoints(event.Sender, 2, "action");
		}
		//#endregion

		//#region Commands handling
		if (event.message.Type === "Whisper" && event.message.Content.startsWith("!")) {
			const commandMatch = /^!\s*(\S+)(?:\s|$)(.*)$/.exec(event.message.Content);
			if (commandMatch) {
				const command = commandMatch[1].toLocaleLowerCase();
				const args = commandMatch[2];
				const commandInfo = this.a_commands.get(command);

				if (commandInfo) {
					metric_commands
						.labels({
							command,
							roomName: event.Sender.chatRoom.Name
						})
						.inc();
				}

				if (!commandInfo) {
					// Command not found
					if (this.a_settings.catchUnknownCommands) {
						event.Sender.Tell(
							"Whisper",
							`Unknown command "${command}"\n` +
							`To see list of valid commands whisper '!help'`
						);
						return true;
					}
				} else if (commandInfo.parse) {
					const argv = [...args.matchAll(/".+?(?:"|$)|'.+?(?:'|$)|[^ ]+/g)]
						.map(a => a[0])
						.map(a => a[0] === '"' || a[0] === "'" ? a.substring(1, a[a.length - 1] === a[0] ? a.length - 1 : a.length) : a);
					try {
						const result = commandInfo.callback(event.connection, argv, event.Sender);
						if (result) {
							result.catch(err => {
								logger.fatal(
									`${this.a_LogHeader(event.connection)} CRASH during async processing of command "${command}". Logic: ${this.constructor.name}\n` +
									`Arguments: ${JSON.stringify(argv)}\nError: `,
									err
								);
							});
						}
					} catch (err) {
						logger.fatal(
							`${this.a_LogHeader(event.connection)} CRASH during processing of command "${command}". Logic: ${this.constructor.name}\n` +
							`Arguments: ${JSON.stringify(argv)}\nError: `,
							err
						);
					}
				} else {
					try {
						// @ts-ignore
						const result = commandInfo.callback(event.connection, args, event.Sender);
						if (result) {
							result.catch(err => {
								logger.fatal(
									`${this.a_LogHeader(event.connection)} CRASH during async processing of command "${command}". Logic: ${this.constructor.name}\n` +
									`Arguments: ${JSON.stringify(args)}\nError: `,
									err
								);
							});
						}
					} catch (err) {
						logger.fatal(
							`${this.a_LogHeader(event.connection)} CRASH during processing of command "${command}". Logic: ${this.constructor.name}\n` +
							`Arguments: ${JSON.stringify(args)}\nError: `,
							err
						);
					}
					return true;
				}
			}
		}
		//#endregion

		return false;
	}

	private a_onCharacterLeft(event: LogicEvent_CharacterLeft): boolean {
		if (this.a_settings.log) {
			const resolvedCharacter = event.sourceMemberNumber !== undefined ?
				event.connection.chatRoom.characters.find(c => c.MemberNumber === event.sourceMemberNumber) :
				undefined;
			const byStr = event.sourceMemberNumber !== undefined ?
				resolvedCharacter !== undefined ? ` by ${resolvedCharacter.Name} (${resolvedCharacter.MemberNumber})` :
					` by (${event.sourceMemberNumber})` :
				"";
			logger.info(`${this.a_LogHeader(event.connection)} Left: ` +
				`${event.character.Name} (${event.character.MemberNumber}), ` +
				`reason: ${event.leaveMessage}` + byStr
			);
		}

		this.a_lastActivity.delete(event.character);
		this.a_inactivityDidWarn.delete(event.character);

		if (event.intentional) {
			this.a_guard_givePoints(event.character, 5, "left room");
		}

		metric_players
			.labels({ roomName: event.character.chatRoom.Name })
			.set(event.character.chatRoom.characters.filter(c => !c.IsBot()).length);

		return false;
	}

	private a_onCharacterEntered(event: LogicEvent_CharacterEntered): boolean {
		if (this.a_settings.log) {
			logger.info(`${this.a_LogHeader(event.connection)} Entered: ` +
				`${event.character.Name} (${event.character.MemberNumber})`
			);
			const curseVersion = event.character.getCurseVersion();
			if (curseVersion !== null) {
				logger.verbose(`${this.a_LogHeader(event.connection)} ${event.character.Name} (${event.character.MemberNumber})` +
					` uses curse version: ${curseVersion}`
				);
			}
		}

		// Fix old character references in votes
		for (const vote of this.a_pendingVotes.values()) {
			const oldCharacter = Array.from(vote.votes.keys()).find(c => c.MemberNumber === event.character.MemberNumber);
			if (oldCharacter) {
				vote.votes.set(event.character, vote.votes.get(oldCharacter)!);
				vote.votes.delete(oldCharacter);
			}
		}

		this.a_lastActivity.set(event.character, Date.now());

		this.a_guard_givePoints(event.character, 10, "entered room");

		metric_players
			.labels({ roomName: event.character.chatRoom.Name })
			.set(event.character.chatRoom.characters.filter(c => !c.IsBot()).length);

		return false;
	}

	private a_onRoomForceLeave(event: LogicEvent_RoomForceLeave): boolean {
		if (this.a_settings.log) {
			const player = event.connection.Player;
			logger.alert(`${this.a_LogHeader(event.connection)} Bot ${player.Name} (${player.MemberNumber}) was ${event.type.toLowerCase()} from room\n` +
				`Present room admins: ${event.connection.chatRoom.characters.filter(c => c.IsRoomAdmin()).map(c => `${c.Name} (${c.MemberNumber})`).join(", ")}`);
		}
		return false;
	}

	private a_onRoomUpdate(event: LogicEvent_RoomUpdate): boolean {
		const newInfo = event.connection.chatRoom.ToInfo() as Record<string, any>;
		const oldInfo = event.oldInfo as Record<string, any>;
		const resolvedCharacter = event.connection.chatRoom.characters.find(c => c.MemberNumber === event.sourceMemberNumber);
		const byStr = resolvedCharacter !== undefined ?
			`${resolvedCharacter.Name} (${resolvedCharacter.MemberNumber})` :
			`(${event.sourceMemberNumber})`;
		let txt = `${this.a_LogHeader(event.connection)} Room update by ${byStr}:`;
		for (const k of Object.keys(newInfo)) {
			if (!_.isEqual(oldInfo[k], newInfo[k])) {
				txt += `\n${k}: ${JSON.stringify(oldInfo[k])} -> ${JSON.stringify(newInfo[k])}`;
			}
		}
		logger.info(txt);
		return false;
	}

	private a_onCharacterEvent(connection: API_Connector, event: AnyCharacterEvent): boolean {
		let msg = "";
		let fromBot = false;
		if (event.name === "ItemAdd" && !event.initial) {
			const target = event.character === event.source ? "herself" : `${event.character.Name} (${event.character.MemberNumber})`;
			fromBot = event.source.IsBot();
			const itemName = `${event.item.Group}:${event.item.Name}`;
			msg = `${this.a_LogHeader(connection)} ItemAdd ${event.source.Name} (${event.source.MemberNumber}) on ${target}: ${itemName}`;
		} else if (event.name === "ItemRemove") {
			const target = event.character === event.source ? "herself" : `${event.character.Name} (${event.character.MemberNumber})`;
			fromBot = event.source.IsBot();
			const itemName = `${event.item.Group}:${event.item.Name}`;
			msg = `${this.a_LogHeader(connection)} ItemRemove ${event.source.Name} (${event.source.MemberNumber}) from ${target}: ${itemName}`;
		} else if (event.name === "ItemChange" && !event.initial) {
			const target = event.character === event.source ? "herself" : `${event.character.Name} (${event.character.MemberNumber})`;
			fromBot = event.source.IsBot();
			let itemName = `${event.item.Group}:${event.item.Name}` + (event.item.Extended?.Type != null ? `:${event.item.Extended.Type}` : "");
			if (event.item.Asset.AllowExpression || event.item.AssetGroup.AllowExpression) {
				itemName += ":" + (event.item.GetExpression() ?? "null");
			}
			msg = `${this.a_LogHeader(connection)} ItemChange ${event.source.Name} (${event.source.MemberNumber}) on ${target}: ${itemName}`;
		} else if (event.name === "PoseChanged" && !event.character.IsBot()) {
			logger.debug(`${this.a_LogHeader(connection)} PoseChange ${event.character.Name} (${event.character.MemberNumber}): ` +
				event.character.Pose.map(p => p.Name).join(",")
			);
		} else if (event.name === "SafewordUsed") {
			logger.alert(`${this.a_LogHeader(connection)} ${event.character.Name} (${event.character.MemberNumber}) used swafeword! (full release: ${event.release})`);
		}

		if (msg) {
			if (fromBot) {
				logger.debug(msg);
			} else {
				logger.verbose(msg);
			}
		}

		//#region Room guard
		if (event.name === "ItemAdd" || event.name === "ItemRemove") {
			if (
				event.character !== event.source &&
				!event.character.IsLoverOf(event.source) &&
				!event.character.IsOwnedBy(event.source) &&
				!event.source.IsOwnedBy(event.character) &&
				!event.character.WhiteList.includes(event.source.MemberNumber)
			) {
				let points = 1;
				if (event.item.AssetGroup.Category === "Item") {
					points = event.name === "ItemAdd" ? 3 : 2;
				}
				this.a_guard_givePoints(event.source, points, _.snakeCase(event.name));
			}
		}
		//#endregion

		return false;
	}

	private a_onBeep(event: LogicEvent_Beep): boolean {
		if (typeof event.beep.BeepType === "string" && !event.beep.BeepType.startsWith("{")) {
			const data = event.beep;
			let beep = `${this.a_LogHeader(event.connection)} Received beep from ${data.MemberName} (${data.MemberNumber})`;
			if (data.ChatRoomName !== null) {
				beep += ` in ${data.ChatRoomSpace}:${data.ChatRoomName}`;
			}
			if (data.BeepType) {
				beep += `; Type: ${JSON.stringify(data.BeepType)}`;
			}
			if (data.Message != null) {
				beep += `; Message: ${JSON.stringify(data.Message)}`;
			}
			logger.info(beep);
		}
		if (event.beep.BeepType == null &&
			typeof event.beep.Message === "string" &&
			this.config.superusers.includes(event.beep.MemberNumber)
		) {
			for (const pfx of ["!admin ", "!su ", "!sudo "]) {
				if (event.beep.Message.toLocaleLowerCase().startsWith(pfx)) {
					const argv = [...event.beep.Message.substr(pfx.length).matchAll(/".+?(?:"|$)|'.+?(?:'|$)|[^ ]+/g)]
						.map(a => a[0])
						.map(a => a[0] === '"' || a[0] === "'" ? a.substring(1, a[a.length - 1] === a[0] ? a.length - 1 : a.length) : a);
					this.a_command_su(event.connection, argv, event.beep.MemberNumber, response => event.connection.AccountBeep(event.beep.MemberNumber, null, response));
					return true;
				}
			}
		}
		return false;
	}

	private a_onBotEvent(connection: API_Connector, event: AnyBotEvent): boolean {
		if (event.name === "Message" && this.a_settings.log) {
			const dict = event.Dictionary == null ? "" : `; dict: ${JSON.stringify(event.Dictionary)}`;
			const tc = event.Target !== null && connection.chatRoom.characters.find(c => c.MemberNumber === event.Target);
			const target = event.Target === null ? "" : `to ${tc || event.Target} `;
			if (event.Type !== "Hidden") {
				const msg = `${this.a_LogHeader(connection)} Bot message ${event.Type} ` +
					target +
					`: ` +
					`${event.Content}${dict}`;
				logger.debug(msg);
			}
		}

		return false;
	}

	private a_processEvent(event: AnyLogicEvent): boolean {
		if (event.name === "Message") {
			return this.a_onMessage(event);
		} else if (event.name === "CharacterLeft") {
			return this.a_onCharacterLeft(event);
		} else if (event.name === "CharacterEntered") {
			return this.a_onCharacterEntered(event);
		} else if (event.name === "RoomForceLeave") {
			return this.a_onRoomForceLeave(event);
		} else if (event.name === "RoomUpdate") {
			return this.a_onRoomUpdate(event);
		} else if (event.name === "CharacterEvent") {
			return this.a_onCharacterEvent(event.connection, event.event);
		} else if (event.name === "Beep") {
			return this.a_onBeep(event);
		} else if (event.name === "BotEvent") {
			return this.a_onBotEvent(event.connection, event.event);
		}
		return false;
	}

	public onEvent(event: AnyLogicEvent): void {
		if (!this.a_processEvent(event)) {
			return super.onEvent(event);
		}
	}
}
