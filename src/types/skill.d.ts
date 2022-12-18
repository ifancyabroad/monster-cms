import { TDamageTypes, TStats } from ".";
import {
	CharacterClass,
	DamageType,
	EffectType,
	SkillType,
	Stat,
	Target,
} from "../enums";

export interface IWeaponDamageEffect {
	type: EffectType.WeaponDamage;
	multiplier: number;
}

export interface IDamageEffect {
	type: EffectType.Damage;
	damageType: DamageType;
	modifier: Stat;
	multiplier: number;
	min: number;
	max: number;
}

export interface IHealEffect {
	type: EffectType.Heal;
	modifier: Stat.Wisdom;
	multiplier: number;
	min: number;
	max: number;
}

export interface IStatusEffect {
	type: EffectType.Status;
	modifiers: {
		stats?: Partial<TStats>;
		resistances?: Partial<TDamageTypes>;
	};
	accuracy: number;
	duration: number;
}

export interface IAuxiliaryEffect {
	type: EffectType.Auxiliary;
	effect: AuxiliaryEffect;
	accuracy: number;
	duration: number;
}

export type ISkillEffect =
	| IWeaponDamageEffect
	| IDamageEffect
	| IHealEffect
	| IStatusEffect
	| IAuxiliaryEffect;

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
	value: number;
	level: number;
}
