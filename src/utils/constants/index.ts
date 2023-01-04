import {
	AuxiliaryEffect,
	CharacterClass,
	DamageType,
	EffectType,
	SkillType,
	Stat,
} from "../../enums";

export const DRAWER_WIDTH = 240;

export const MAX_SKILL_LEVEL = 9;
export const MAX_GOLD_VALUE = 10000;
export const MAX_SKILL_USES = 20;
export const MAX_DURATION = 20;
export const MAX_DAMAGE = 100;
export const MAX_MULTIPLIER = 10;

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
	EffectType.WeaponDamage,
	EffectType.Damage,
	EffectType.Heal,
	EffectType.Status,
	EffectType.Auxiliary,
] as const;

export const EFFECTS_NAME_MAP = {
	[EffectType.WeaponDamage]: "Weapon Damage",
	[EffectType.Damage]: "Damage",
	[EffectType.Heal]: "Heal",
	[EffectType.Status]: "Status",
	[EffectType.Auxiliary]: "Auxiliary",
};

export const AUXILIARY_EFFECTS = [
	AuxiliaryEffect.Poison,
	AuxiliaryEffect.Stun,
	AuxiliaryEffect.Bleed,
] as const;

export const AUXILIARY_EFFECTS_NAME_MAP = {
	[AuxiliaryEffect.Poison]: "Poison",
	[AuxiliaryEffect.Stun]: "Stun",
	[AuxiliaryEffect.Bleed]: "Bleed",
};

export const CLASSES = [
	CharacterClass.Common,
	CharacterClass.Warrior,
	CharacterClass.Mage,
	CharacterClass.Rogue,
	CharacterClass.Cleric,
] as const;

export const CLASS_NAME_MAP = {
	[CharacterClass.Common]: "Common",
	[CharacterClass.Warrior]: "Warrior",
	[CharacterClass.Mage]: "Mage",
	[CharacterClass.Rogue]: "Rogue",
	[CharacterClass.Cleric]: "Cleric",
};

export const SKILL_TYPES = [
	SkillType.WeaponAttack,
	SkillType.Attack,
	SkillType.Heal,
	SkillType.Buff,
	SkillType.Debuff,
	SkillType.Other,
] as const;

export const SKILL_TYPE_NAME_MAP = {
	[SkillType.WeaponAttack]: "Weapon Attack",
	[SkillType.Attack]: "Attack",
	[SkillType.Heal]: "Heal",
	[SkillType.Buff]: "Buff",
	[SkillType.Debuff]: "Debuff",
	[SkillType.Other]: "Other",
};
