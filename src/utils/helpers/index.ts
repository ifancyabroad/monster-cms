import { TStats, TResistances, TRewards } from "../../types";
import { RESISTANCES, RESISTANCES_NAME_MAP, REWARDS, REWARDS_NAME_MAP, STATS, STATS_NAME_MAP } from "../constants";

export const getStatsArray = (stats: TStats) => STATS.map(stat => ({
    key: stat,
    name: STATS_NAME_MAP[stat],
    value: stats[stat]
}));

export const getResistancesArray = (stats: TResistances) => RESISTANCES.map(stat => ({
    key: stat,
    name: RESISTANCES_NAME_MAP[stat],
    value: stats[stat]
}));

export const getRewardsArray = (stats: TRewards) => REWARDS.map(stat => ({
    key: stat,
    name: REWARDS_NAME_MAP[stat],
    value: stats[stat]
}));

export const getKeyFromName = (name: string) => name.toLowerCase().replaceAll(" ", "-").trim();