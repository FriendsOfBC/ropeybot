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

class Logger {
    public verbose(...args: any[]) {
        console.log(...args);
    }

    public debug(...args: any[]) {
        console.log(...args);
    }

    public info(...args: any[]) {
        console.log(...args);
    }

    public warning(...args: any[]) {
        console.log(...args);
    }

    public error(...args: any[]) {
        console.log(...args);
    }

    public fatal(...args: any[]) {
        console.log(...args);
    }

    public alert(...args: any[]) {
        console.log(...args);
    }
}

export const logger = new Logger();

export const BC_PermissionLevel = [
    "Everyone, no exceptions",
    "Everyone, except blacklist",
    "Owner, Lover, whitelist & Dominants",
    "Owner, Lover and whitelist only",
    "Owner and Lover only",
    "Owner only",
];
