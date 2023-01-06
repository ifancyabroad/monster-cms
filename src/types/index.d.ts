import { DamageType, Stat } from "../enums";

export interface IDictionary<T> {
	[K: string]: T;
}

export interface IImagePath {
	id: string;
	imagePath: string;
}

export type TOrder = "asc" | "desc";

export type TStats = Record<Stat, number>;
export type TDamageTypes = Record<DamageType, number>;

export * from "./monster";
export * from "./skill";
export * from "./effect";
export * from "./armour";
