import { resolve } from "path";
import { waitForCondition } from "../../hub/utils";
import { Casino, getItemsBlockingForfeit } from "../casino";
import { FORFEITS } from "./forfeits";
import { Bet, Game } from "./game";
import { Card, createDeck, getCardString, shuffleDeck } from "./pokerCards";
import {
    API_Character,
    API_Connector,
    BC_Server_ChatRoomMessage,
    API_AppearanceItem,
    AssetGet,
} from "bc-bot";
//TODOs:
// + fix forfeit pushing
// + reconsider payouts for forfeits half as much makes more sense
// + (I'd recommend a /bot forfeits command or something to list that menu) + bot commands as help is too long
// + Split hands...max once?
// - insurance
// - random bonus rounds
// + multiple decks per shoe

const BLACKJACKCOMMANDS = `Blackjack commands:
/bot bet <amount> - Bet on the current hand. Odds: 1:1.
/bot hit - Take another card from the deck.
/bot stand - Keep your current hand
/bot double - Double your bet and take one more card. Only available on your first two cards.
/bot split - Split your hand into two hands if you have two cards of the same value.
/bot cancel - Cancel your bet. Only available before any cards are dealt.
/bot chips - Show your current chip balance.
/bot give <name or member number> <amount> - Give chips to another player.
/bot help - Show this help
/bot commands - Show all available commands.
/bot forfeits - Show available forfeits.
`;

const BLACKJACKHELP = `Blackjack is a card game where the goal is to get as close to 21 as possible without going over.
Each player is dealt two cards, and can choose to "hit" (take another card) or "stand" (keep their current hand).
The dealer also has a hand, and must hit until they reach 17 or higher.
Blackjack (21 with two cards) pays 3:2 rounding down to the nearest whole number.

Every card has a value:
- Number cards (2-10) are worth their face value.
- Jacks, Queens, and Kings are worth 10.
- Aces can be worth 1 or 11, depending on what is more beneficial for the hand.
`;

const BLACKJACKHELPCOMMAND = `
${BLACKJACKHELP}

For more information on commands or forfeits, use the following commands:
/bot commands - Show all available commands.
/bot forfeits - Show available forfeits.
`;

const BLACKJACKEXAMPLES = `
/bot bet 10
    bets 10 chips
/bot bet leg binder
    bets the 'leg binder' forfeit (worth 7 chips)
`;
const FULLBLACKJACKHELP = `${BLACKJACKHELP}

${BLACKJACKCOMMANDS}
`;

const TIME_UNTIL_DEAL_MS = 35000;
// const TIME_UNTIL_DEAL_MS = 6000;
const BET_CANCEL_THRESHOLD_MS = 1000;
const AUTO_STAND_TIMEOUT_MS = 45000;
const SPLIT_TIMEOUT_INCREASE_MS = 10000; // Time added to the auto-stand timeout when a player splits their hand
// const AUTO_STAND_TIMEOUT_MS = 10000;
const RESET_TIMEOUT_MS = 10000; // Time after a game ends before a new game can start

export interface BlackjackPlayer {
    memberNumber: number;
    memberName: string;
    playingHand: number;
    bets: BlackjackBet[];
}

export interface BlackjackBet extends Bet {
    stake: number;
    stakeForfeit: string;
    standing: boolean;
}

type Hand = Card[];

export class BlackjackGame implements Game {
    private casino: Casino;
    private deck: Card[] = [];
    private dealerHand: Hand = [];
    private playerHands: Map<BlackjackBet, Hand> = new Map();
    private willDealAt: number | undefined;
    private willStandAt: number | undefined;
    private players: BlackjackPlayer[] = [];
    private resetTimeout: NodeJS.Timeout | undefined; // after finishing a game
    private dealTimeout: NodeJS.Timeout | undefined; // after first bet until the deal
    private autoStandTimeout: NodeJS.Timeout; // after the deal until all players stand

    public HELPMESSAGE = FULLBLACKJACKHELP;
    public EXAMPLES = BLACKJACKEXAMPLES;
    public HELPCOMMANDMESSAGE = BLACKJACKHELPCOMMAND;
    public COMMANDSMESSAGE = BLACKJACKCOMMANDS;

    constructor(
        private conn: API_Connector,
        casino: Casino,
    ) {
        this.casino = casino;
        this.casino.commandParser.register("cancel", this.onCommandCancel);
        this.casino.commandParser.register("bet", this.onCommandBet);
        this.casino.commandParser.register("hit", this.onCommandHit);
        this.casino.commandParser.register("stand", this.onCommandStand);
        this.casino.commandParser.register("double", this.onCommandDouble);
        this.casino.commandParser.register("split", this.onCommandSplit);
        this.casino.commandParser.register("sign", (sender, msg, args) => {
            const sign = this.casino.getSign();

            sign.setProperty("OverridePriority", { Text: 63 });
            sign.setProperty("Text", "Place bets!");
            sign.setProperty("Text2", " ");
            this.casino.setTextColor("#ffffff");
        });

        setTimeout(() => {
            this.getPole();
            const sign = this.casino.getSign();

            sign.setProperty("OverridePriority", { Text: 63 });
            sign.setProperty("Text", "Place bets!");
            sign.setProperty("Text2", " ");
            this.casino.setTextColor("#ffffff");

            this.casino.setBio().catch((e) => {
                console.error("Failed to set bio.", e);
            });

            this.conn.Player.setScriptPermissions(true, false);

            const scriptItem = this.conn.Player.Appearance.AddItem(
                AssetGet("ItemScript", "Script"),
            );
            scriptItem.setProperty("Hide", [
                "Height",
                "BodyUpper",
                "ArmsLeft",
                "ArmsRight",
                "HandsLeft",
                "HandsRight",
                "BodyLower",
                "HairFront",
                "HairBack",
                "Eyebrows",
                "Eyes",
                "Eyes2",
                "Mouth",
                "Nipples",
                "Pussy",
                "Pronouns",
                "Head",
                "Blush",
                "Fluids",
                "Emoticon",
                "ItemNeck",
                "ItemHead",
                "Cloth",
                "Bra",
                "Socks",
                "Shoes",
                "ClothAccessory",
                "Necklace",
                "ClothLower",
                "Panties",
                "Suit",
                "Gloves",
            ]);
        }, 500);
    }

    getPole(): API_AppearanceItem {
        let pole = this.conn.Player.Appearance.InventoryGet("ItemDevices");
        if (pole && pole.Name === "Pole") {
            // console.log("Pole already exists in inventory", pole);
            return pole;
        }

        /*this.conn.Player.Appearance.RemoveItem("ItemDevices");
        pole = this.conn.Player.Appearance.AddItem(
            AssetGet("ItemDevices", "Pole"),
        );
        console.log("Adding pole to appearance");
        pole.SetColor(["#AC9A85"]);
/**/
        console.log("Adding pole to inventory");
        let newPole = AssetGet("ItemDevices", "Pole");
        newPole.Color = ["#AC9A85"];
        this.conn.Player.Appearance.AddItem(newPole);
        return this.conn.Player.Appearance.InventoryGet("ItemDevices");
    }

    async endGame(): Promise<void> {
        await waitForCondition(() => this.willDealAt === undefined);
        // await wait(2000);

        this.casino.commandParser.unregister("cancel");
        this.casino.commandParser.unregister("bet");
        this.casino.commandParser.unregister("hit");
        this.casino.commandParser.unregister("stand");
        this.casino.commandParser.unregister("double");
        this.casino.commandParser.unregister("sign");
        this.clear();
        resolve();
    }

    parseBetCommand(
        senderCharacter: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ): BlackjackBet | undefined {
        if (this.resetTimeout !== undefined) {
            this.conn.SendMessage(
                "Whisper",
                "The next game hasn't started yet",
                senderCharacter.MemberNumber,
            );
            return;
        }

        if (args.length !== 1) {
            this.conn.SendMessage(
                "Whisper",
                "I couldn't understand that bet. Try, eg. /bot bet 10 or /bot bet boots",
                senderCharacter.MemberNumber,
            );
            return;
        }

        if (
            this.players.find(
                (b) => b.memberNumber === senderCharacter.MemberNumber,
            )
        ) {
            this.conn.SendMessage(
                "Whisper",
                "You already placed a bet. Use !cancel to cancel it.",
                senderCharacter.MemberNumber,
            );
            return;
        }

        const stake = args[0];
        let stakeValue: number;
        let stakeForfeit: string;
        if (FORFEITS[stake] !== undefined) {
            stakeValue = FORFEITS[stake].value;
            stakeForfeit = stake;
        } else {
            if (!/^\d+$/.test(stake)) {
                this.conn.SendMessage(
                    "Whisper",
                    "Invalid stake.",
                    senderCharacter.MemberNumber,
                );
                return;
            }
            stakeValue = parseInt(stake, 10);
            if (isNaN(stakeValue) || stakeValue < 1) {
                this.conn.SendMessage(
                    "Whisper",
                    "Invalid stake.",
                    senderCharacter.MemberNumber,
                );
                return;
            }
        }
        return {
            memberNumber: senderCharacter.MemberNumber,
            memberName: senderCharacter.toString(),
            stake: stakeValue,
            stakeForfeit,
            standing: false,
        };
    }

    private onCommandHit = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.autoStandTimeout === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You can't hit right now.",
                sender.MemberNumber,
            );
            return;
        }
        const player = this.players.find(
            (b) => b.memberNumber === sender.MemberNumber,
        );
        const bet = this.getBetsForPlayer(sender.MemberNumber)[
            player.playingHand
        ];
        if (!bet) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a bet in play.",
                sender.MemberNumber,
            );
            return;
        }
        if (bet.standing) {
            this.conn.SendMessage(
                "Whisper",
                "You can't hit, you're standing.",
                sender.MemberNumber,
            );
            return;
        } else if (this.playerHands.get(bet) === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a hand to hit.",
                sender.MemberNumber,
            );
            return;
        }
        const hand = this.playerHands.get(bet);
        hand.push(this.deck.pop());
        const playerValue = this.calculateHandValue(hand);
        if (playerValue > 20) {
            bet.standing = true; // Player automatically stands after busting or on 21
            if (player.bets.length > player.playingHand + 1) {
                player.playingHand++;
            }
        }
        const handString = await this.buildHandString(true, player);
        this.conn.SendMessage(
            "Whisper",
            `You hit and got a ${getCardString(hand[hand.length - 1])}.\n${handString}`,
            sender.MemberNumber,
        );
        if (this.allPlayersDone()) {
            this.resolveGame();
        }
    };

    private onCommandDouble = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.autoStandTimeout === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You can't double down right now.",
                sender.MemberNumber,
            );
            return;
        }
        const bets = this.getBetsForPlayer(sender.MemberNumber);
        const player = this.players.find(
            (b) => b.memberNumber === sender.MemberNumber,
        );
        const currentBet = bets[player.playingHand];
        if (!bets) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a bet in play.",
                sender.MemberNumber,
            );
            return;
        } else if (currentBet.standing) {
            this.conn.SendMessage(
                "Whisper",
                "You are already standing.",
                sender.MemberNumber,
            );
            return;
        } else if (this.playerHands.get(currentBet) === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a hand to double down on.",
                sender.MemberNumber,
            );
            return;
        } else if (currentBet.stakeForfeit) {
            this.conn.SendMessage(
                "Whisper",
                "You can't double down on a forfeit bet.",
                sender.MemberNumber,
            );
            return;
        }
        const hand = this.playerHands.get(currentBet);
        if (hand.length !== 2) {
            this.conn.SendMessage(
                "Whisper",
                "You can only double down on your initial two cards.",
                sender.MemberNumber,
            );
            return;
        }
        const playerStore = await this.casino.store.getPlayer(
            sender.MemberNumber,
        );
        if (playerStore.credits < currentBet.stake) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have enough chips to double down.",
                sender.MemberNumber,
            );
            return;
        }

        playerStore.credits -= currentBet.stake;
        await this.casino.store.savePlayer(playerStore);
        currentBet.stake *= 2; // Double the stake
        hand.push(this.deck.pop());
        currentBet.standing = true;
        if (player.bets.length > player.playingHand + 1) {
            player.playingHand++;
            const handString = await this.buildHandString(true, player);
            this.conn.SendMessage(
                "Whisper",
                `You doubled down on hand ${player.playingHand} and got a ${getCardString(hand[hand.length - 1])}. You are now playing hand ${player.playingHand}\n${handString}`,
                sender.MemberNumber,
            );
        } else {
            const handString = await this.buildHandString(true, player);
            this.conn.SendMessage(
                "Whisper",
                `You doubled down and got a ${getCardString(hand[hand.length - 1])}.\n${handString}`,
                sender.MemberNumber,
            );
        }
        if (this.allPlayersDone()) {
            this.resolveGame();
        }
    };

    private onCommandSplit = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.autoStandTimeout === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You can't split right now.",
                sender.MemberNumber,
            );
            return;
        }
        const bets = this.getBetsForPlayer(sender.MemberNumber);
        const player = this.players.find(
            (b) => b.memberNumber === sender.MemberNumber,
        );
        const currentBet = bets[player.playingHand];
        if (!bets) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a bet in play.",
                sender.MemberNumber,
            );
            return;
        } else if (currentBet.standing) {
            this.conn.SendMessage(
                "Whisper",
                "You are already standing.",
                sender.MemberNumber,
            );
            return;
        } else if (this.playerHands.get(currentBet) === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a hand to split.",
                sender.MemberNumber,
            );
            return;
        }
        const hand = this.playerHands.get(currentBet);
        if (hand.length !== 2) {
            this.conn.SendMessage(
                "Whisper",
                "You can only split your initial two cards.",
                sender.MemberNumber,
            );
            return;
        }
        if (
            hand[0].value !== hand[1].value &&
            !(
                ["10", "J", "Q", "K"].includes(hand[0].value) &&
                ["10", "J", "Q", "K"].includes(hand[1].value)
            )
        ) {
            this.conn.SendMessage(
                "Whisper",
                "You can only split if your two cards have the same value.",
                sender.MemberNumber,
            );
            return;
        }
        if (currentBet.stakeForfeit) {
            this.conn.SendMessage(
                "Whisper",
                "You can't split a forfeit bet.",
                sender.MemberNumber,
            );
            return;
        }
        const playerStore = await this.casino.store.getPlayer(
            sender.MemberNumber,
        );
        if (playerStore.credits < currentBet.stake) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have enough chips to split.",
                sender.MemberNumber,
            );
            return;
        }
        playerStore.credits -= currentBet.stake;
        await this.casino.store.savePlayer(playerStore);
        player.bets.push({
            memberNumber: sender.MemberNumber,
            memberName: sender.toString(),
            stake: currentBet.stake,
            stakeForfeit: currentBet.stakeForfeit,
            standing: false,
        });
        const newBet = player.bets[player.bets.length - 1];
        this.playerHands.set(newBet, [hand[1], this.deck.pop()]);
        hand[1] = this.deck.pop();
        if (this.calculateHandValue(hand) > 20) {
            currentBet.standing = true; // Player automatically stands on 21
            player.playingHand++;
        }
        if (this.calculateHandValue(this.playerHands.get(newBet)) > 20) {
            newBet.standing = true; // Player automatically stands on 21
        }
        this.conn.SendMessage(
            "Whisper",
            `You split your hand and got a ${getCardString(hand[1])} on the first hand and a ${getCardString(this.playerHands.get(newBet)[1])} on the second hand.\n${await this.buildHandString(true, player)}`,
            sender.MemberNumber,
        );
        this.willStandAt = this.willStandAt + SPLIT_TIMEOUT_INCREASE_MS;
        this.conn.SendMessage(
            "Chat",
            `${sender.toString()} has split their hand! Remaining time has been increased.`,
        );
        if (this.allPlayersDone()) {
            this.resolveGame();
        }
    };

    private async resolveGame(): Promise<void> {
        clearTimeout(this.autoStandTimeout);
        this.autoStandTimeout = undefined;
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.pop());
        }
        await this.showHands(false);
        let message = `Dealer has a hand of ${this.calculateHandValue(this.dealerHand)}\n`;
        const sign = this.casino.getSign();
        sign.setProperty("Text", "Dealer has");
        sign.setProperty(
            "Text2",
            `${this.calculateHandValue(this.dealerHand)}`,
        );
        this.casino.setTextColor("#ffffff");

        for (const player of this.players) {
            let totalWinnings = 0;
            for (const bet of player.bets) {
                const playerHand = this.playerHands.get(bet);
                if (!playerHand) {
                    console.error(
                        `No hand found for player ${player.memberName} (${player.memberNumber})`,
                    );
                    continue;
                }
                const winnings = this.getWinnings(playerHand, bet);
                totalWinnings += winnings;
            }
            if (totalWinnings > 0) {
                const winnerMemberData = await this.casino.store.getPlayer(
                    player.memberNumber,
                );
                winnerMemberData.credits += totalWinnings;
                winnerMemberData.score += totalWinnings;
                await this.casino.store.savePlayer(winnerMemberData);
                message += `${player.memberName} wins ${totalWinnings} chips! \n`;
            } else if (player.bets[0].stakeForfeit && totalWinnings !== -100) {
                this.casino.applyForfeit(player.bets[0]);
                message += `${player.memberName} lost and gets ${FORFEITS[player.bets[0].stakeForfeit].name}! \n`;
            }
        }
        this.clear();
        this.willDealAt = undefined;
        this.casino.multiplier = 1;

        if (this.dealTimeout) {
            clearInterval(this.dealTimeout);
            this.dealTimeout = undefined;
        }
        this.resetTimeout = setTimeout(() => {
            this.resetTimeout = undefined;
            const sign = this.casino.getSign();
            sign.setProperty("Text", "Place bets!");
            sign.setProperty("Text2", " ");
            this.casino.setTextColor("#ffffff");
        }, RESET_TIMEOUT_MS);

        this.conn.SendMessage("Chat", message);
    }

    private onCommandStand = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.autoStandTimeout === undefined) {
            this.conn.SendMessage(
                "Whisper",
                "You can't stand right now.",
                sender.MemberNumber,
            );
            return;
        }
        const player = this.players.find(
            (b) => b.memberNumber === sender.MemberNumber,
        );
        const bet = this.getBetsForPlayer(sender.MemberNumber)[
            player.playingHand
        ];
        if (!bet) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a bet in play.",
                sender.MemberNumber,
            );
            return;
        } else if (bet.standing) {
            this.conn.SendMessage(
                "Whisper",
                "You are already standing.",
                sender.MemberNumber,
            );
            return;
        }
        bet.standing = true;
        if (player.bets.length > player.playingHand + 1) {
            player.playingHand++;
            const handString = await this.buildHandString(true, player);
            this.conn.SendMessage(
                "Whisper",
                `You are standing on hand ${player.playingHand} and are now playing hand ${player.playingHand + 1}. \n${handString}`,
                sender.MemberNumber,
            );
        } else {
            const handString = await this.buildHandString(true, player);
            this.conn.SendMessage(
                "Whisper",
                `You are standing. \n${handString}`,
                sender.MemberNumber,
            );
        }
        if (this.allPlayersDone()) {
            this.resolveGame();
        }
    };

    placeBet(bet: BlackjackBet): void {
        this.players.push({
            memberNumber: bet.memberNumber,
            memberName: bet.memberName,
            playingHand: 0, // first hand played
            bets: [bet],
        });
        if (bet.stakeForfeit) {
            this.conn.SendMessage(
                "Chat",
                `${bet.memberName} bets ${FORFEITS[bet.stakeForfeit].name} for ${bet.stake} chips`,
            );
        } else {
            this.conn.SendMessage(
                "Chat",
                `${bet.memberName} bets ${bet.stake} chips`,
            );
        }
    }

    getBets(): BlackjackBet[] {
        return this.players.map((b) => b.bets[0]);
    }
    public getBetsForPlayer(memberNumber: number): BlackjackBet[] {
        // console.log(this.players.find((b) => b.memberNumber === memberNumber));
        return this.players
            .filter((b) => b.memberNumber === memberNumber)
            .flatMap((b) => b.bets);
    }

    public clearBetsForPlayer(memberNumber: number): undefined {
        this.players = this.players.filter(
            (b) => b.memberNumber !== memberNumber,
        );
    }

    onCommandBet = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.resetTimeout !== undefined) {
            this.conn.SendMessage(
                "Whisper",
                "The next game hasn't started yet",
                sender.MemberNumber,
            );
            return;
        }
        if (
            this.autoStandTimeout !== undefined ||
            this.willDealAt - Date.now() < BET_CANCEL_THRESHOLD_MS
        ) {
            this.conn.SendMessage(
                "Whisper",
                "You can't bet right now.",
                sender.MemberNumber,
            );
            return;
        }

        const bet = this.parseBetCommand(sender, msg, args);
        if (bet === undefined) {
            return;
        }

        const player = await this.casino.store.getPlayer(sender.MemberNumber);

        if (bet.stakeForfeit === undefined) {
            if (player.credits - bet.stake < 0) {
                this.conn.SendMessage(
                    "Whisper",
                    `You don't have enough chips.`,
                    sender.MemberNumber,
                );
                return;
            }

            player.credits -= bet.stake;
            await this.casino.store.savePlayer(player);
        } else {
            const blockers = getItemsBlockingForfeit(
                sender,
                FORFEITS[bet.stakeForfeit].items(sender),
            );
            if (blockers.length > 0) {
                console.log(
                    `Blocked forfeit bet of ${bet.stakeForfeit} with blockers `,
                    blockers,
                );
                this.conn.SendMessage(
                    "Whisper",
                    `You can't bet that while you have: ${blockers.map((i) => i.Name).join(", ")}`,
                    sender.MemberNumber,
                );
                return;
            }

            const canInteract = await sender.GetAllowItem();
            if (!canInteract) {
                this.conn.SendMessage(
                    "Whisper",
                    "You'll need to open up your permissions or whitelist the bot to bet restraints.",
                    sender.MemberNumber,
                );
                return;
            }

            const needItems = [...FORFEITS[bet.stakeForfeit].items(sender)];
            if (FORFEITS[bet.stakeForfeit].lock)
                needItems.push(FORFEITS[bet.stakeForfeit].lock);
            const blocked = needItems.filter(
                (i) => !sender.IsItemPermissionAccessible(i),
            );
            if (blocked.length > 0) {
                this.conn.SendMessage(
                    "Whisper",
                    `You can't bet that forfeit because you've blocked: ${blocked.map((i) => i.Name).join(", ")}.`,
                    player.memberNumber,
                );
                return;
            }

            bet.stake *= this.casino.multiplier;
        }

        if (FORFEITS[bet.stakeForfeit]?.items(sender).length === 1) {
            const forfeitItem = FORFEITS[bet.stakeForfeit].items(sender)[0];
            if (
                Date.now() <
                this.casino.lockedItems
                    .get(sender.MemberNumber)
                    ?.get(forfeitItem.Group)
            ) {
                console.log(
                    `CHEATER DETECTED: ${sender} tried to bet ${bet.stakeForfeit} which should be locked`,
                );
                ++player.cheatStrikes;
                await this.casino.store.savePlayer(player);

                this.casino.cheatPunishment(sender, player);

                return;
            }
        }

        this.placeBet(bet);

        if (this.willDealAt === undefined) {
            if (this.resetTimeout !== undefined) {
                clearTimeout(this.resetTimeout);
                this.resetTimeout = undefined;
            }
            this.willDealAt = Date.now() + TIME_UNTIL_DEAL_MS;
            this.dealTimeout = setInterval(() => {
                this.onDealTimeout();
            }, 1000);
        }
    };

    private onDealTimeout(): void {
        if (!this.willDealAt) return;

        const sign = this.casino.getSign();

        const timeLeft = this.willDealAt - Date.now();
        if (timeLeft <= 0) {
            sign.Extended.SetText("");
            sign.setProperty("Text2", "");

            clearInterval(this.dealTimeout);
            this.initialDeal();
        } else {
            this.casino.setTextColor("#ffffff");
            sign.setProperty("Text", "Place bets!");
            sign.setProperty("Text2", `${Math.ceil(timeLeft / 1000)}`);
        }
    }

    private onStandTimeout(): void {
        if (!this.willStandAt) return;

        const sign = this.casino.getSign();
        const timeLeft = this.willStandAt - Date.now();
        if (timeLeft <= 0) {
            this.players.forEach((player) => {
                player.bets.forEach((bet) => {
                    bet.standing = true; // Automatically stand all bets
                });
            });
            this.conn.SendMessage(
                "Chat",
                "All open bets have been automatically stood.",
            );
            clearInterval(this.autoStandTimeout);
            this.resolveGame();
        } else {
            this.casino.setTextColor("#ffffff");
            sign.setProperty("Text", "Time left");
            sign.setProperty("Text2", `${Math.ceil(timeLeft / 1000)}`);
        }
    }

    private allPlayersDone(): boolean {
        return this.players.every((player) =>
            player.bets.every((bet) => bet.standing),
        );
    }

    onCommandCancel = async (
        sender: API_Character,
        msg: BC_Server_ChatRoomMessage,
        args: string[],
    ) => {
        if (this.getBetsForPlayer(sender.MemberNumber).length === 0) {
            this.conn.SendMessage(
                "Whisper",
                "You don't have a bet in play.",
                sender.MemberNumber,
            );
            return;
        }

        const timeLeft = this.willDealAt - Date.now();
        if (timeLeft <= BET_CANCEL_THRESHOLD_MS) {
            this.conn.SendMessage(
                "Whisper",
                "You can't cancel your bet now.",
                sender.MemberNumber,
            );
            return;
        }

        if (!this.getBetsForPlayer(sender.MemberNumber)[0].stakeForfeit) {
            const player = await this.casino.store.getPlayer(
                sender.MemberNumber,
            );

            this.getBetsForPlayer(sender.MemberNumber).forEach((b) => {
                player.credits += b.stake;
            });
            await this.casino.store.savePlayer(player);
        }

        this.clearBetsForPlayer(sender.MemberNumber);
        this.conn.SendMessage("Whisper", "Bet cancelled.", sender.MemberNumber);
    };

    getWinnings(playerHand: Hand, bet: BlackjackBet): number {
        let playerHandValue: number = this.calculateHandValue(playerHand);
        let dealerHandValue: number = this.calculateHandValue(this.dealerHand);
        if (playerHandValue > 21) {
            return 0;
        }
        if (bet.stakeForfeit) {
            if (playerHandValue === dealerHandValue) {
                return -100; // push for forfeits
            }
            if (playerHandValue === 21 && playerHand.length === 2) {
                return Math.floor(bet.stake * 1.5);
            }
            if (dealerHandValue > 21) {
                return bet.stake;
            }
            if (playerHandValue > dealerHandValue) {
                return bet.stake;
            }
        } else {
            if (playerHandValue === dealerHandValue) {
                return bet.stake;
            }
            if (playerHandValue === 21 && playerHand.length === 2) {
                return Math.floor(bet.stake * 2.5);
            }
            if (dealerHandValue > 21) {
                return bet.stake * 2;
            }
            if (playerHandValue > dealerHandValue) {
                return bet.stake * 2;
            }
        }
        return 0;
    }

    clear(): void {
        this.players = [];
        this.playerHands.clear();
    }

    private calculateDeckCountForRound(activePlayers: number): number {
        return Math.max(1, Math.min(8, Math.floor((activePlayers + 1) / 2)));
    }

    private createShoe(decks: number = 1): void {
        console.log(`Creating a shoe with ${decks} decks.`);
        for (let i = 0; i < decks; i++) {
            if (this.deck.length > 0) {
                this.deck.push(...createDeck());
            } else {
                this.deck = createDeck();
            }
        }
        shuffleDeck(this.deck);
    }

    private initialDeal(): void {
        this.autoStandTimeout = setInterval(() => {
            this.onStandTimeout();
        }, 1000);
        if (this.deck.length < this.players.length * 7 + 5) {
            this.conn.SendMessage(
                "Chat",
                "The deck is running low, shuffling a new deck.",
            );
            this.createShoe(
                this.calculateDeckCountForRound(this.players.length),
            );
        }
        this.dealerHand = [this.deck.pop(), this.deck.pop()];
        for (const player of this.players) {
            // const LillyTestCard = this.deck.pop();
            this.playerHands.set(player.bets[0], [
                this.deck.pop(),
                this.deck.pop(),
                // LillyTestCard,
                // LillyTestCard
            ]);
            if (
                this.calculateHandValue(
                    this.playerHands.get(player.bets[0]),
                ) === 21
            ) {
                player.bets[0].standing = true; // Automatically stand on blackjack
                this.conn.SendMessage(
                    "Whisper",
                    `You got a blackjack! You automatically stand.`,
                    player.memberNumber,
                );
            }
        }

        if (this.calculateHandValue(this.dealerHand) === 21) {
            this.conn.SendMessage(
                "Chat",
                `Dealer got a blackjack! All players lose their bets unless they have blackjack themselves.`,
            );
            this.players.forEach((player) => {
                player.bets.forEach((bet) => {
                    bet.standing = true; // Automatically stand all bets
                });
            });
            this.resolveGame();
            return;
        }

        if (this.allPlayersDone()) {
            this.resolveGame();
        }

        this.willStandAt = Date.now() + AUTO_STAND_TIMEOUT_MS;

        this.showHands(true);
    }

    private async showHands(dealerHidden: boolean): Promise<void> {
        const handString = await this.buildHandString(dealerHidden);
        this.conn.SendMessage("Chat", handString);
    }

    private async buildHandString(
        dealerHidden: boolean,
        requestingPlayer: BlackjackPlayer | undefined = undefined,
    ): Promise<string> {
        const dealerValue = this.calculateHandValue(this.dealerHand);
        const dealerHandString = dealerHidden
            ? `[${getCardString(this.dealerHand[0])}] [???]`
            : this.handToString(this.dealerHand);
        let string = `Dealer's hand: ${dealerHandString} (${dealerHidden ? "???" : dealerValue})\n`;
        for (const player of this.players) {
            for (let i = 0; i < player.bets.length; i++) {
                const bet = player.bets[i];
                const hand = this.playerHands.get(bet);
                const handString = this.handToString(hand);
                const handValue = this.calculateHandValue(hand);
                if (
                    requestingPlayer &&
                    player.memberNumber === requestingPlayer.memberNumber &&
                    i === requestingPlayer.playingHand
                ) {
                    string += `> ${player.memberName} (${bet.memberNumber}) hand: ${handString} (${handValue})\n`;
                } else {
                    string += `${player.memberName} (${bet.memberNumber}) hand: ${handString} (${handValue})\n`;
                }
            }
        }
        return string;
    }

    private handToString(hand: Hand): string {
        if (!hand || hand.length === 0) {
            return "";
        }
        return hand.map((card) => `[${getCardString(card)}]`).join(", ");
    }

    private calculateHandValue(hand: Hand): number {
        let value = 0;
        let aces = 0;
        if (!hand || hand.length === 0) {
            return 0; // No cards, value is 0
        }

        for (const card of hand) {
            if (card.value === "A") {
                aces++;
                value += 11;
            } else if (["J", "Q", "K"].includes(card.value)) {
                value += 10;
            } else {
                value += parseInt(card.value);
            }
        }

        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }

        return value;
    }
}
