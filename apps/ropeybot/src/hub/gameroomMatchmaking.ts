/*
 * Copied from the original bot hub, with permission.
 */

import { logger, API_Character, API_Connector } from "bc-bot";
import promClient from "prom-client";

// Metrics
const metric_registered = new promClient.Counter({
	name: "hub_matchmaking_registered",
	help: "hub_matchmaking_registered",
	labelNames: ["roomName"] as const
});
const metric_success = new promClient.Counter({
	name: "hub_matchmaking_success",
	help: "hub_matchmaking_success",
	labelNames: ["roomName"] as const
});

export class MatchmakingNotifier {

	/** The matchmaking list with the players in the queue */
	public matchmaking_list: Set<API_Character> = new Set();

	/** The bot using this service */
	readonly connection: API_Connector;

	/** The matchmaking queue count that triggers a beep message to everyone on it */
	readonly beepAtThisCount: number;

	get waitingPlayers(): number {
		return this.matchmaking_list.size;
	}

	constructor(connection: API_Connector, beepAtThisCount: number) {
		this.connection = connection;
		this.beepAtThisCount = beepAtThisCount;
	}

	/**
	 * Adds the sender to the matchmaking_list if they are mutual friends with the bot
	 * @param sender the API_Character who used this function
	 */
	async addPlayerToTheMatchmakingQueue(sender: API_Character) {
		sender.friend();

		const friendListOnlineInfo = await this.connection.QueryOnlineFriends();

		if (Array.from(this.matchmaking_list).some(m => m.MemberNumber === sender.MemberNumber)) {
			sender.Tell("Whisper", `You have already used this and are on the 'matchmaking queue' to be notified via beep message.`);
			return;
		}
		// if sender is not one of the bot's friends online, bot will remove sender from FriendList again
		if (!friendListOnlineInfo.some(f => f.MemberNumber === sender.MemberNumber)) {
			sender.unfriend();
			sender.Tell("Whisper", `You need to add the Bot to your friend list first, so it can send you beep messages. After ` +
				`you have done this, please use the '!beepme' command again.`
			);
			return;
		}

		this.matchmaking_list.add(sender);
		await this.cleanupOffline();
		metric_registered
			.labels({ roomName: sender.chatRoom.Name })
			.inc();
		logger.info(`${sender} was added to the matchmaking queue. There are now ${this.matchmaking_list.size} in it.`);
		sender.Tell("Chat", `GAME: You are now on the 'matchmaking queue' for the game. There ${this.matchmaking_list.size > 1 ? `are` : `is`} ` +
			`now ${this.matchmaking_list.size} in it. After ${this.beepAtThisCount} players are queued, ` +
			`you and everyone else will receive a beep message that you should come back to this room to start ` +
			`the game. In the meantime, you can either stay in this room or leave it. Note that going offline may ` +
			`remove you from the queue, but you can use 'beepme' again when you are back. Please avoid ` +
			`using this service when you are not sure if you are interested in joining a game later!`
		);
	}

	/**
	 * Beeps everyone still online on the list at beepAtThisCount
	 * @param registeredPlayers a list of all registered players of the game room
	 * @returns 'true' if the call of this functions triggered a beep to everyone on the matchmaking list, otherwise 'false'
	 */
	async notifyPlayersOfEnoughInterest(registeredPlayers: readonly API_Character[]) {
		const beepMsg = `There are now enough people in the 'matchmaking queue' to start a game. You and several others got beeped. ` +
			`Please move to the game room now and wait a few minutes there until everyone has switched rooms.\nNote: You still need ` +
			`to whisper '!joingame' to the bot inside the game room.\n\nYou are hereby removed from the queue and have to whisper ` +
			`'!beepme' again inside the room, if you want to be put onto the 'matchmaking queue' again at a later time. Enjoy!~`;

		for (let i = 0; i < 2; i++) {
			if (this.matchmaking_list.size === 0) {
				break;
			}
			// consider only registered players not on the matchmaking list
			const tmpArray: API_Character[] = registeredPlayers.filter(C => !this.matchmaking_list.has(C));
			// registered players in the room also count for the beepAtThisCount condition
			if (this.matchmaking_list.size + tmpArray.length >= this.beepAtThisCount) {
				// during the first loop, check if they are friends with all of them and if they are online
				// -> else: unfriend them and remove them from the matchmaking list
				if (i === 0) {
					await this.cleanupOffline();
					continue;
				}
				// beep everyone that there are enough for a game and then remove them from the friend list and queue
				this.matchmaking_list.forEach(M => {
					this.connection.AccountBeep(M.MemberNumber, null, beepMsg);
					M.unfriend();
				});
				metric_success.labels({ roomName: this.connection.chatRoom.Name }).inc();
				logger.alert(`Successful matchmaking with ${this.matchmaking_list.size} on the list.`);
				this.matchmaking_list.clear();
				return true;
			}
		}
		return false;
	}

	async cleanupOffline() {
		const friendListOnlineInfo = await this.connection.QueryOnlineFriends();
		const onlineMemberNumbers: number[] = friendListOnlineInfo.map(f => f.MemberNumber);
		Array.from(this.matchmaking_list)
			.filter(character => !onlineMemberNumbers.includes(character.MemberNumber))
			.forEach(p => {
				this.matchmaking_list.delete(p);
				// TODO: reduce to info in a few weeks
				logger.alert(`${p} was removed from the matchmaking queue. There are now ${this.matchmaking_list.size} in it.`);
				p.unfriend();
			});
	}
}
