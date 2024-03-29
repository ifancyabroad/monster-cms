import { DamageType, EquipmentSlot, Stat } from "common/utils";

export type TOrder = "asc" | "desc";

export type TStats = Record<Stat, number>;
export type TDamageTypes = Record<DamageType, number>;
export type TEquipment = Record<EquipmentSlot, string>;

export * from "./monster";
export * from "./skill";
export * from "./effect";
export * from "./weapon";
export * from "./armour";
export * from "./property";
export * from "./class";
