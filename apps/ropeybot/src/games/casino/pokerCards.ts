const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

export type Card = { suit: string; value: string };

export function createDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of SUITS) {
        for (const value of VALUES) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export function getCardString(card: Card): string {
    if (card.suit === "Spades") {
        return `${card.value}♠`;
    } else if (card.suit === "Hearts") {
        return `${card.value}♥`;
    } else if (card.suit === "Diamonds") {
        return `${card.value}♦`;
    } else if (card.suit === "Clubs") {
        return `${card.value}♣`;
    }
    return `${card.value}?`;
}
