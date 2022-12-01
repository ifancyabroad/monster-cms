import { RESISTANCES, REWARDS, STATS } from "../utils";

export interface IDictionary<T> {
	[K: string]: T;
}

export type TStat = typeof STATS[number];
export type TResistance = typeof RESISTANCES[number];
export type TReward = typeof REWARDS[number];

export type TStats = {
	[key in TStat]: number;
};

export type TResistances = {
	[key in TResistance]: number;
};

export type TRewards = {
	[key in TReward]: number;
};

export * from "./monster";
export * from "./skill";
