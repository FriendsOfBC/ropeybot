/*
 * Copied from the original bot hub, with permission.
 */

import { logger, API_Character, API_Connector, LogicBase, AnyCharacterEvent, BC_Server_AccountBeep, BC_Server_ChatRoomMessage } from "bc-bot";

export class LoggingLogic extends LogicBase {
	/**
	 * When connection receives message inside chatroom
	 * @param connection Originating connection
	 * @param message Received message
	 * @param sender The character that sent the message
	 */
	protected onMessage(connection: API_Connector, message: BC_Server_ChatRoomMessage, sender: API_Character): void {
		const dict = message.Dictionary === undefined ? "" : `; dict: ${JSON.stringify(message.Dictionary)}`;
		if (message.Type === "Hidden") {
			logger.debug(`Message ${message.Type} from ${sender.Name} (${sender.MemberNumber}): ` + `${message.Content}${dict}`);
		} else {
			logger.info(`Message ${message.Type} from ${sender.Name} (${sender.MemberNumber}): ` + `${message.Content}${dict}`);
		}
	}

	/**
	 * When character leaves the room
	 * @param connection Originating connection
	 * @param character The character that left the room
	 * @param intentional If the leave was (likely) caused by user
	 */
	protected onCharacterLeft(connection: API_Connector, character: API_Character, intentional: boolean): void {
		logger.info(
			`Character ${character.Name} (${character.MemberNumber}) ` +
				`left room ${connection.chatRoom.Name}, intentional: ${intentional}`
		);
	}

	/**
	 * When character enters the room
	 * @param connection Originating connection
	 * @param character The character that entered the room
	 */
	protected async onCharacterEntered(connection: API_Connector, character: API_Character): Promise<void> {
		logger.info(`Character ${character.Name} (${character.MemberNumber}) entered room ${connection.chatRoom.Name}`);
	}

	/**
	 * When characters in room get moved around
	 * @param connection Originating connection
	 */
	protected onCharacterOrderChanged(connection: API_Connector): void {
		logger.info(`Character order inside room ${connection.chatRoom.Name} changed`);
	}

	/**
	 * When character's medatada (Description, Item permissions, ...) change
	 * @param connection Originating connection
	 * @param character Character in question
	 * @param joining If the change happened during character join
	 */
	protected onCharacterMetadataChanged(connection: API_Connector, character: API_Character, joining: boolean): void {
		if (joining) return;
		logger.info(`Character ${character.Name} (${character.MemberNumber}) metadata changed`);
	}

	/**
	 * When connection receives beep
	 * @param connection Originating connection
	 * @param beep Received beep data
	 */
	protected onBeep(connection: API_Connector, beep: BC_Server_AccountBeep): void {
		// logger.alert(`Received beep from ${beep.MemberName} (${beep.MemberNumber}) in ${beep.ChatRoomSpace}:${beep.ChatRoomName}`);
	}

	/**
	 * When connection is forcefully removed from room
	 * @param connection Originating connection
	 * @param type If it was kicked or banned
	 */
	protected onRoomForceLeave(connection: API_Connector, type: "Kicked" | "Banned"): void {
		logger.error(`${type} from room`);
	}

	/**
	 * When room info was updated in non-managed mode
	 * @param connection Originating connection
	 * @param sourceMemberNumber MemberNumber of player updating the room
	 */
	protected onRoomUpdate(connection: API_Connector, sourceMemberNumber: number): void {
		logger.info(`Chatroom ${connection.chatRoom.Name} updated by ${sourceMemberNumber}`);
	}

	/**
	 * Fires on any character event
	 * @param connection Originating connection
	 * @param event The received event
	 */
	protected onCharacterEvent(connection: API_Connector, event: AnyCharacterEvent): void {
		switch (event.name) {
			case "ItemAdd": {
				if (event.initial) return;
				const source = event.character === event.source ? "" : ` from ${event.source.Name} (${event.source.MemberNumber})`;
				logger.info(
					`ItemAdd for ${event.character.Name} (${event.character.MemberNumber})${source}: ${event.item.Group}:${event.item.Name}`
				);
				break;
			}
			case "ItemChange": {
				if (event.initial) return;
				const source = event.character === event.source ? "" : ` from ${event.source.Name} (${event.source.MemberNumber})`;
				logger.info(
					`ItemChange for ${event.character.Name} (${event.character.MemberNumber})${source}: ${event.item.Group}:${event.item.Name}`
				);
				break;
			}
			case "ItemRemove": {
				const source = event.character === event.source ? "" : ` from ${event.source.Name} (${event.source.MemberNumber})`;
				logger.info(
					`ItemRemove for ${event.character.Name} (${event.character.MemberNumber})${source}: ${event.item.Group}:${event.item.Name}`
				);
				break;
			}
			case "PoseChanged":
				logger.info(`PoseChanged for ${event.character.Name}: ${event.character.Pose.map(P => P.Name)}`);
				break;
			case "SafewordUsed":
				logger.alert(`Character ${event.character.Name} used swafeword! (full release: ${event.release})`);
				break;
			default:
				// @ ts-expect-error: We shouldn't reach this
				logger.info(`Unknown character event ${event.name} from ${event.character.Name}`);
				break;
		}
	}
}
