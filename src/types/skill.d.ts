import { TResistance, TStat } from ".";
import { CharacterClass, EffectType } from "../enums";

export interface ISkillEffect {
	type: EffectType;
	modifier: TStat;
	multiplier: number;
	min: number;
	max: number;
}

export interface IBaseSkill {
	class: "basic" | CharacterClass;
	name: string;
	description: string;
	icon: string;
	damageType: TResistance;
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
