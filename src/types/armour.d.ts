import { TDamageTypes, TStats } from ".";
import { DamageType, EquipmentType, WeaponType } from "../enums";
import { IWeaponEffect } from "./effect";

export interface IArmour {
	type: EquipmentType;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	armour: number;
	modifiers?: {
		stats?: Partial<TStats>;
		resistances?: Partial<TDamageTypes>;
	};
}
