import { DamageType, EquipmentType, WeaponType } from "../enums";
import { IWeaponEffect } from "./effect";

export interface IWeapon {
	type: EquipmentType.Weapon;
	class: WeaponType;
	name: string;
	description: string;
	icon: string;
	price: number;
	level: number;
	damageType: DamageType;
	min: number;
	max: number;
	effects: IWeaponEffect[];
}
