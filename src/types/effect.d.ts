import { TDamageTypes, TStats } from ".";
import { AuxiliaryEffect, DamageType, EffectType, Stat } from "../utils";

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

export type IWeaponEffect = IDamageEffect | IStatusEffect | IAuxiliaryEffect;
