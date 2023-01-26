import { TDamageTypes, TStats } from ".";
import { DamageType, EquipmentType, WeaponSize, WeaponType } from "../utils";
import { IWeaponEffect } from "./effect";

export interface IBaseWeapon {
	type: EquipmentType.Weapon;
	weaponType: WeaponType;
	size: WeaponSize;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	damageType: DamageType;
	min: number;
	max: number;
	effects?: IWeaponEffect[];
	modifiers?: {
		stats?: Partial<TStats>;
		resistances?: Partial<TDamageTypes>;
	};
}

export interface IWeapon extends IBaseWeapon {
	id: string;
}

export interface ISaveWeapon {
	weapon: IBaseWeapon;
	image: File | null;
}

export interface IUpdateWeapon extends ISaveWeapon {
	id: string;
	oldImage?: string;
}

export interface IWeaponFilters {
	name: "";
	type: WeaponType | "all";
	damageType: DamageType | "all";
	price: number;
	level: number;
}

export type TWeaponsOrderBy = keyof IWeapon;
