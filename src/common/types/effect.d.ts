import { TAuxiliaryStats, TDamageTypes, TStats } from "common/types";
import { AuxiliaryEffect, DamageType, EffectType, Stat } from "common/utils";

export interface IWeaponDamageEffect {
	type: EffectType.WeaponDamage;
	multiplier: number;
}

export interface IDamageEffect {
	type: EffectType.Damage;
	damageType: DamageType;
	min: number;
	max: number;
}

export interface IHealEffect {
	type: EffectType.Heal;
	min: number;
	max: number;
}

export interface IStatusEffect {
	type: EffectType.Status;
	modifiers: {
		stats?: Partial<TStats>;
		auxiliaryStats?: Partial<TAuxiliaryStats>;
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
