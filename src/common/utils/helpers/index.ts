import { TStats, TDamageTypes, TAuxiliaryStats } from "common/types";
import {
	AUXILIARY_STATS,
	AUXILIARY_STATS_ABBR_MAP,
	AUXILIARY_STATS_NAME_MAP,
	AuxiliaryStat,
	AUXILLARY_RESISTANCES,
	DamageType,
	ELEMENTAL_RESISTANCES,
	PHYSICAL_RESISTANCES,
	RESISTANCES,
	RESISTANCES_ABBR_MAP,
	RESISTANCES_COLOUR_MAP,
	RESISTANCES_NAME_MAP,
	Stat,
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
	}));

export const getPartialStatsArray = (stats: Partial<TStats>) =>
	Object.keys(stats).map((stat) => ({
		key: stat,
		abbr: STATS_ABBR_MAP[stat as Stat],
		name: STATS_NAME_MAP[stat as Stat],
		value: stats[stat as Stat] as number,
	}));

export const getAuxiliaryStatsArray = (stats: TAuxiliaryStats) =>
	AUXILIARY_STATS.map((stat) => ({
		key: stat,
		abbr: AUXILIARY_STATS_ABBR_MAP[stat],
		name: AUXILIARY_STATS_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getPartialAuxiliaryStatsArray = (
	stats: Partial<TAuxiliaryStats>
) =>
	Object.keys(stats).map((stat) => ({
		key: stat,
		abbr: AUXILIARY_STATS_ABBR_MAP[stat as AuxiliaryStat],
		name: AUXILIARY_STATS_NAME_MAP[stat as AuxiliaryStat],
		value: stats[stat as AuxiliaryStat] as number,
	}));

export const getResistancesArray = (stats: TDamageTypes) =>
	RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		colour: RESISTANCES_COLOUR_MAP[stat],
	}));

export const getPartialResistancesArray = (stats: Partial<TDamageTypes>) =>
	Object.keys(stats).map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat as DamageType],
		value: stats[stat as DamageType] as number,
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getPhysicalResistancesArray = (stats: TDamageTypes) =>
	PHYSICAL_RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getElementalResistancesArray = (stats: TDamageTypes) =>
	ELEMENTAL_RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getAuxillaryResistancesArray = (stats: TDamageTypes) =>
	AUXILLARY_RESISTANCES.map((stat) => ({
		key: stat,
		abbr: RESISTANCES_ABBR_MAP[stat as DamageType],
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
		colour: RESISTANCES_COLOUR_MAP[stat as DamageType],
	}));

export const getKeyFromName = (name: string) =>
	name.toLowerCase().replaceAll(" ", "_").trim();

export * from "./skills";
export * from "./monsters";
export * from "./weapons";
export * from "./armours";
export * from "./equipment";
