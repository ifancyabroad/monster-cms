import { TEquipment } from "common/types";
import { SkillClass } from "common/utils";

export interface IBaseCharacterClass {
	description: string;
	name: string;
	portrait: string;
	skillClass: SkillClass;
	skills: string[];
	stats: TStats;
	equipment?: Partial<TEquipment>;
}

export interface ICharacterClass extends IBaseCharacterClass {
	id: string;
}

export interface ISaveClass {
	characterClass: IBaseCharacterClass;
	image: File | null;
}

export interface IUpdateClass extends ISaveClass {
	id: string;
	oldImage?: string;
}

export interface IClassFilters {
	name: "";
}

export type TClassesOrderBy = keyof ICharacterClass;
