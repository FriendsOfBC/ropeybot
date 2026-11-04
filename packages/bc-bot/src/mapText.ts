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

// Object style that clears a tile's object
export const BLANK_OBJECT = "Passable";

// Latin letters that have no Unicode decomposition
const SPECIAL_LETTERS: Record<string, string> = {
    ø: "o",
    Ø: "O",
    đ: "d",
    Đ: "D",
    ł: "l",
    Ł: "L",
    ß: "ss",
    æ: "ae",
    Æ: "AE",
    œ: "oe",
    Œ: "OE",
    þ: "th",
    Þ: "TH",
    ð: "d",
    Ð: "D",
    ı: "i",
};

/**
 * Translates text into the names of FloorLetter / FloorNumber map objects.
 */
export class MapTextUtil {
    /**
     * Reduces accented, styled (e.g. mathematical italic) and fullwidth
     * characters to their base Latin letters / digits where possible.
     */
    public static simplify(text: string): string {
        return text
            .replace(/[\p{L}]/gu, (ch) => SPECIAL_LETTERS[ch] ?? ch)
            .normalize("NFKD")
            .replace(/\p{M}/gu, "");
    }

    /**
     * Converts a string into a sequence of object style names (e.g. "LetterA",
     * "Number1"). Characters are simplified first (see {@link simplify});
     * each whitespace character becomes a blank ("Passable") object, other
     * non-alphanumeric characters are dropped and letters are
     * case-insensitive.
     */
    public static textToObjectNames(text: string): string[] {
        const names: string[] = [];
        for (const ch of MapTextUtil.simplify(text)) {
            if (/[a-zA-Z]/.test(ch)) {
                names.push(`Letter${ch.toUpperCase()}`);
            } else if (/[0-9]/.test(ch)) {
                names.push(`Number${ch}`);
            } else if (/\s/.test(ch)) {
                names.push(BLANK_OBJECT);
            }
        }
        return names;
    }
}
