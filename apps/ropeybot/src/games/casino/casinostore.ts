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

import { Collection, Db } from "mongodb";
import { BC_AppearanceItem } from "bc-bot";

export interface Player {
    memberNumber: number;
    name: string;
    credits: number;
    score: number;
    lastFreeCredits: number;
    cheatStrikes: number;
}

interface Outfit {
    name: string;
    addedBy: number;
    addedByName: string;
    items: BC_AppearanceItem[];
}

interface Purchase {
    memberNumber: number;
    memberName: string;
    time: number;
    service: string;
    redeemed: boolean;
}

export class CasinoStore {
    private inited = false;
    private players: Collection<Player>;
    private outfits: Collection<Outfit>;

    constructor(private db: Db) {
        this.players = this.db.collection<Player>("players");
        this.outfits = this.db.collection<Outfit>("outfits");
    }

    private async init(): Promise<void> {
        if (this.inited) return;

        await this.players.createIndex({ memberNumber: 1 }, { unique: true });
        await this.outfits.createIndex({ name: 1 }, { unique: true });
        this.inited = true;
    }

    public async getPlayer(memberNumber: number): Promise<Player> {
        await this.init();
        const data = await this.players.findOne({ memberNumber });
        if (data) {
            data.score = data.score ?? 0;
            data.credits = data.credits ?? 0;
            data.lastFreeCredits = data.lastFreeCredits ?? 0;
            data.cheatStrikes = data.cheatStrikes ?? 0;
            return data;
        }
        return {
            memberNumber,
            credits: 0,
            score: 0,
            lastFreeCredits: 0,
            name: "",
            cheatStrikes: 0,
        };
    }

    public getTopPlayers(limit: number): Promise<Player[]> {
        return this.players
            .find({
                score: { $gt: 0 },
                memberNumber: { $ne: 35982 },
                $or: [
                    { cheatStrikes: { $lt: 3 } },
                    { cheatStrikes: { $exists: false } },
                ],
            })
            .sort({ score: -1 })
            .limit(limit)
            .toArray();
    }

    public async savePlayer(memberData: Player): Promise<void> {
        await this.init();
        this.players.updateOne(
            { memberNumber: memberData.memberNumber },
            { $set: memberData },
            { upsert: true },
        );
    }

    public async getOutfit(name: string): Promise<Outfit> {
        await this.init();
        return this.outfits.findOne({ name });
    }

    public async saveOutfit(outfit: Outfit): Promise<void> {
        await this.init();
        this.outfits.updateOne(
            { name: outfit.name },
            { $set: outfit },
            { upsert: true },
        );
    }

    public async addPurchase(purchase: Purchase): Promise<void> {
        await this.init();
        await this.db.collection<Purchase>("purchases").insertOne(purchase);
    }

    public async getUnredeemedPurchases(): Promise<Purchase[]> {
        await this.init();
        return this.db
            .collection<Purchase>("purchases")
            .find({ redeemed: false })
            .toArray();
    }
}
