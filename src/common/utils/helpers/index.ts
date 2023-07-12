import { TStats, TDamageTypes } from "common/types";
import {
	AUXILLARY_RESISTANCES,
	DamageType,
	ELEMENTAL_RESISTANCES,
	PHYSICAL_RESISTANCES,
	RESISTANCES,
	RESISTANCES_ABBR_MAP,
	RESISTANCES_COLOUR_MAP,
	RESISTANCES_NAME_MAP,
	STATS,
	STATS_ABBR_MAP,
	STATS_NAME_MAP,
} from "common/utils";

export const getStatsArray = (stats: TStats) =>
	STATS.map((stat) => ({
		key: stat,
		abbr: STATS_ABBR_MAP[stat],
		name: STATS_NAME_MAP[stat],
		value: stats[stat],
		min: 1,
		max: 30,
	}));

export const getResistancesArray = (stats: TDamageTypes) =>
	RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		min: 0,
		max: 100,
		suffix: "%",
		colour: RESISTANCES_COLOUR_MAP[stat],
	}));

export const getPhysicalResistancesArray = (stats: TDamageTypes) =>
	PHYSICAL_RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		min: 0,
		max: 100,
		suffix: "%",
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getElementalResistancesArray = (stats: TDamageTypes) =>
	ELEMENTAL_RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		min: 0,
		max: 100,
		suffix: "%",
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getAuxillaryResistancesArray = (stats: TDamageTypes) =>
	AUXILLARY_RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		min: 0,
		max: 100,
		suffix: "%",
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getKeyFromName = (name: string) =>
	name.toLowerCase().replaceAll(" ", "_").trim();

export * from "./skills";
export * from "./monsters";
export * from "./weapons";
export * from "./armours";
export * from "./equipment";
export * from "./properties";
