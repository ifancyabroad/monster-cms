import { DamageType, Stat } from "../enums";

export interface IDictionary<T> {
	[K: string]: T;
}

export type TStats = Record<Stat, number>;
export type TDamageTypes = Record<DamageType, number>;

export * from "./monster";
export * from "./skill";
