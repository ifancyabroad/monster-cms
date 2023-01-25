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

export const getStatsArray = (stats: TStats) =>
	STATS.map((stat) => ({
		key: stat,
		name: STATS_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getResistancesArray = (stats: TDamageTypes) =>
	RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
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
