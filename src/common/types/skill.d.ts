import { CharacterClass, Target } from "common/utils";
import { ISkillEffect } from "./effect";

export interface IBaseSkill {
	class: CharacterClass;
	name: string;
	description: string;
	icon: string;
	effects: ISkillEffect[];
	price: number;
	maxUses: number;
	level: number;
	target: Target;
}

export interface ISkill extends IBaseSkill {
	id: string;
}

export interface ISaveSkill {
	skill: IBaseSkill;
	image: File | null;
}

export interface IUpdateSkill extends ISaveSkill {
	id: string;
	oldImage?: string;
}

export interface ISkillFilters {
	name: "";
	class: CharacterClass | "all";
	type: SkillType | "all";
	price: number;
	level: number;
}

export type TSkillsOrderBy = keyof ISkill | "type";
