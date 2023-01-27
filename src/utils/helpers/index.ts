import { TStats, TDamageTypes } from "../../types";
import {
	AUXILLARY_RESISTANCES,
	ELEMENTAL_RESISTANCES,
	PHYSICAL_RESISTANCES,
	RESISTANCES,
	RESISTANCES_NAME_MAP,
	STATS,
	STATS_NAME_MAP,
} from "../constants";
import { DamageType, Stat } from "../enums";

export const getStatsArray = (stats: TStats) =>
	STATS.map((stat) => ({
		key: stat,
		name: STATS_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getPartialStatsArray = (stats: Partial<TStats>) =>
	Object.keys(stats).map((stat) => ({
		key: stat,
		name: STATS_NAME_MAP[stat as Stat],
		value: stats[stat] as number,
	}));

export const getResistancesArray = (stats: TDamageTypes) =>
	RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getPartialResistancesArray = (stats: Partial<TDamageTypes>) =>
	Object.keys(stats).map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat as DamageType],
		value: stats[stat] as number,
	}));

export const getPhysicalResistancesArray = (stats: TDamageTypes) =>
	PHYSICAL_RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getElementalResistancesArray = (stats: TDamageTypes) =>
	ELEMENTAL_RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getAuxillaryResistancesArray = (stats: TDamageTypes) =>
	AUXILLARY_RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getKeyFromName = (name: string) =>
	name.toLowerCase().replaceAll(" ", "_").trim();

export * from "./skills";
export * from "./monsters";
export * from "./weapons";
export * from "./armours";
