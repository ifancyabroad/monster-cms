import { IDictionary } from "../../types";
import { STATS_MAP } from "../constants";

export const getStatsArray = (stats: IDictionary<number>) => Object.keys(stats).map(stat => ({
    key: stat,
    name: STATS_MAP[stat],
    value: stats[stat]
}));