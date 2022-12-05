import { TDamageTypes, TStats } from ".";
import { CharacterClass, DamageType, EffectType, Stat } from "../enums";

export interface IDamageEffect {
	type: EffectType.Damage;
	modifier: Stat;
	multiplier: number;
	min: number;
	max: number;
}

export interface IHealEffect {
	type: EffectType.Heal;
	modifier: Stat.Intelligence;
	multiplier: number;
	min: number;
	max: number;
}

export interface IBuffEffect {
	type: EffectType.Buff;
	modifiers: {
		stats: Partial<TStats>;
		resistances: Partial<TDamageTypes>;
	};
	accuracy: number;
	duration: number;
}

export interface IDebuffEffect {
	type: EffectType.Debuff;
	modifiers: {
		stats: Partial<TStats>;
		resistances: Partial<TDamageTypes>;
	};
	accuracy: number;
	duration: number;
}

export interface IStunEffect {
	type: EffectType.Stun;
	accuracy: number;
	duration: number;
}

export interface IPoisonEffect {
	type: EffectType.Poison;
	accuracy: number;
	duration: number;
	damage: number;
}

export type ISkillEffect =
	| IDamageEffect
	| IHealEffect
	| IBuffEffect
	| IDebuffEffect
	| IStunEffect
	| IPoisonEffect;

export interface IBaseSkill {
	class: "basic" | CharacterClass;
	name: string;
	description: string;
	icon: string;
	damageType: DamageType;
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
