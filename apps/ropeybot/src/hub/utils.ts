/*
 * Copied from the original bot hub, with permission.
 */

/**
 * Waits for set amount of time, returning promes
 * @param ms The time in ms to wait for
 */
export function wait(ms: number): Promise<void> {
	return new Promise(r => setTimeout(r, ms));
}

/**
 * Waits for a condition to be true, returning a promise
 * @param condition The condition to wait for
 * @param interval The time in ms to wait between checks
 */
export function waitForCondition(condition: () => boolean, interval = 100): Promise<void> {
	return new Promise((resolve) => {
		const timer = setInterval(() => {
		  if (condition()) {
			clearInterval(timer);
			resolve();
		  }
		}, interval);
	  });
}


/**
 * Shuffles an array in-place
 * @param array The array to shuffle
 */
export function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

/** Custom function for stringifying data when logging into file */
function anyToString(data: unknown): string {
	if (typeof data === "string") {
		return data;
	}

	if (typeof data === "object" && data !== null && !Array.isArray(data)) {
		if (data instanceof Error) {
			return data.stack ? `[${data.stack}\n]` : `[Error ${data.name}: ${data.message}]`;
		}
		const customString = String(data);
		if (customString !== "[object Object]") {
			return customString;
		}
	}

	return (
		JSON.stringify(data, (k, v) => {
			if (typeof v === "object" && v !== null && v !== data) {
				return Array.isArray(v) ? "[object Array]" : String(v);
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return v;
		}) ?? "undefined"
	);
}