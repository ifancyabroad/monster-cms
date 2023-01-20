import { TDamageTypes, TStats } from ".";
import { DamageType, EquipmentType, WeaponType } from "../enums";
import { IWeaponEffect } from "./effect";

export interface IBaseArmour {
	type: EquipmentType;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	defense: number;
	modifiers?: {
		stats?: Partial<TStats>;
		resistances?: Partial<TDamageTypes>;
	};
}

export interface IArmour extends IBaseArmour {
	id: string;
}

export interface ISaveArmour {
	armour: IBaseArmour;
	image: File | null;
}

export interface IUpdateArmour extends ISaveArmour {
	id: string;
	oldImage?: string;
}
