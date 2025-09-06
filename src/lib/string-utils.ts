/**
 * Removes backticks from a string.
 * Useful for normalizing titles for display or sorting.
 */
export const stripBackticks = (s?: string) => (s || '').replace(/`/g, '');
