export const PLATFORMS = ["youtube","twitter","facebook","website","custom"] as const;
export type Platform = typeof PLATFORMS[number];