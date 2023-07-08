import { SkillClass, Target } from "common/utils";
import { ISkillEffect } from "./effect";

export interface IBaseSkill {
	class: SkillClass;
	name: string;
	description: string;
	icon: string;
	effects: ISkillEffect[];
	price: number;
	maxUses: number;
	level: number;
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
	class: SkillClass | "all";
	type: SkillType | "all";
	price: number;
	level: number;
}

export type TSkillsOrderBy = keyof ISkill | "type";
