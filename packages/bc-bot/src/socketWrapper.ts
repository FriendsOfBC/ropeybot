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

import { DefaultEventsMap, EventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

// Don't send more than NUM_MESSAGES messages in TIME_INTERVAL milliseconds
const NUM_MESSAGES = 5;
const TIME_INTERVAL = 1000;

/**
 * Wraps a socket.io socket to buffer messages, avoiding sending too many too quickly
 * so we don't get ratelimited.
 */
export class SocketWrapper<
    ListenEvents extends EventsMap = DefaultEventsMap,
    EmitEvents extends EventsMap = ListenEvents,
> {
    private queue: [string, any[]][] = [];
    private lastSendTimes: number[] = [];
    private sendTimer?: NodeJS.Timeout;

    constructor(private socket: Socket<ListenEvents, EmitEvents>) {
        for (let i = 0; i < NUM_MESSAGES; i++) {
            this.lastSendTimes.push(0);
        }
    }

    public emit(msg: string, ...args: any[]): void {
        if (!this.socket.connected) {
            console.log(`Socket not connected, dropping message ${msg}`);
            return;
        }

        this.queue.push([msg, args]);
        this.processQueue();
    }

    private processQueue = () => {
        if (this.sendTimer) return;

        while (this.queue.length > 0) {
            const timeForLastMessageBatch = Date.now() - this.lastSendTimes[0];
            if (timeForLastMessageBatch < TIME_INTERVAL) {
                const waitFor = TIME_INTERVAL - timeForLastMessageBatch;
                console.log(`Throttling messages for ${waitFor}ms`);
                this.sendTimer = setTimeout(this.onSendTimer, waitFor);
                return;
            } else {
                this.sendTail();
            }
        }
    };

    private onSendTimer = () => {
        this.sendTimer = undefined;
        this.processQueue();
    };

    private sendTail(): void {
        if (this.queue.length === 0) return;

        const args = this.queue.shift()!;
        this.lastSendTimes.shift();
        this.lastSendTimes.push(Date.now());

        this.socket.emit(
            args[0],
            ...(args[1] as Parameters<EmitEvents[string]>),
        );
    }
}
