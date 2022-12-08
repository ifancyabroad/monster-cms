import { DamageType, EffectType, Stat } from "../../enums";

export const DRAWER_WIDTH = 240;

export const STATS = [
	Stat.Strength,
	Stat.Dexterity,
	Stat.Constitution,
	Stat.Intelligence,
	Stat.Wisdom,
	Stat.Charisma,
] as const;

export const RESISTANCES = [
	DamageType.Slashing,
	DamageType.Crushing,
	DamageType.Piercing,
	DamageType.Cold,
	DamageType.Fire,
	DamageType.Lighting,
	DamageType.Radiant,
	DamageType.Necrotic,
	DamageType.Poison,
	DamageType.Acid,
] as const;

export const PHYSICAL_RESISTANCES = [
	DamageType.Slashing,
	DamageType.Crushing,
	DamageType.Piercing,
] as const;

export const ELEMENTAL_RESISTANCES = [
	DamageType.Cold,
	DamageType.Fire,
	DamageType.Lighting,
] as const;

export const AUXILLARY_RESISTANCES = [
	DamageType.Radiant,
	DamageType.Necrotic,
	DamageType.Poison,
	DamageType.Acid,
] as const;

export const STATS_NAME_MAP = {
	[Stat.Charisma]: "Charisma",
	[Stat.Constitution]: "Constitution",
	[Stat.Dexterity]: "Dexterity",
	[Stat.Intelligence]: "Intelligence",
	[Stat.Strength]: "Strength",
	[Stat.Wisdom]: "Wisdom",
};

export const RESISTANCES_NAME_MAP = {
	[DamageType.Slashing]: "Slashing",
	[DamageType.Crushing]: "Crushing",
	[DamageType.Piercing]: "Piercing",
	[DamageType.Cold]: "Cold",
	[DamageType.Fire]: "Fire",
	[DamageType.Lighting]: "Lighting",
	[DamageType.Radiant]: "Radiant",
	[DamageType.Necrotic]: "Necrotic",
	[DamageType.Poison]: "Poison",
	[DamageType.Acid]: "Acid",
};

export const EFFECTS = [
	EffectType.Damage,
	EffectType.Heal,
	EffectType.Buff,
	EffectType.Debuff,
	EffectType.Stun,
	EffectType.Poison,
] as const;

export const EFFECTS_NAME_MAP = {
	[EffectType.Damage]: "Damage",
	[EffectType.Heal]: "Heal",
	[EffectType.Buff]: "Buff",
	[EffectType.Debuff]: "Debuff",
	[EffectType.Stun]: "Stun",
	[EffectType.Poison]: "Poison",
};
