/*
 * Copied from the original bot hub, with permission.
 */

/**
 * Waits for set amount of time, returning promes
 * @param ms The time in ms to wait for
 */
export function wait(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}
