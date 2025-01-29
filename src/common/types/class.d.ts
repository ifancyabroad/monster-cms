import { TEquipment } from "common/types";
import {
	ArmourType,
	SkillClass,
	Stat,
	Tactics,
	WeaponType,
} from "common/utils";

export interface IBaseCharacterClass {
	description: string;
	name: string;
	portrait: string;
	fallenImage: string;
	icon: string;
	skillClasses: SkillClass[];
	armourTypes: ArmourType[];
	weaponTypes: WeaponType[];
	skills: string[];
	stats: TStats;
	tactics: Tactics;
	equipment?: Partial<TEquipment>;
}

export interface ICharacterClass extends IBaseCharacterClass {
	id: string;
}

export interface ISaveClass {
	characterClass: IBaseCharacterClass;
	image: File | null;
	fallenImage: File | null;
	icon: File | null;
}

export interface IUpdateClass extends ISaveClass {
	id: string;
	oldImage?: string;
	oldFallenImage?: string;
	oldIcon?: string;
}

export interface IClassFilters {
	name: "";
}

export type TClassesOrderBy = keyof ICharacterClass | Stat;
