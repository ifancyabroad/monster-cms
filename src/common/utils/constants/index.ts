import {
	AuxiliaryEffect,
	AuxiliaryStat,
	SkillClass,
	DamageType,
	EffectType,
	EquipmentSlot,
	EquipmentType,
	SkillType,
	Stat,
	WeaponSize,
	WeaponType,
	ArmourType,
	Zone,
	Tactics,
} from "common/utils";

export const DRAWER_TOP = 64;
export const DRAWER_WIDTH = 240;

export const MAX_SKILL_LEVEL = 4;
export const MAX_ITEM_LEVEL = 5;
export const MAX_CHALLENGE_RATING = 30;
export const MAX_GOLD_VALUE = 10000;
export const MAX_SKILL_USES = 20;
export const MAX_DURATION = 20;
export const MAX_DAMAGE = 100;
export const MAX_MULTIPLIER = 10;

export const ATTACK_SKILL_ID = "-NfROP8bobODCeEQFrpd";

export const STATS = [
	Stat.Strength,
	Stat.Dexterity,
	Stat.Constitution,
	Stat.Intelligence,
	Stat.Wisdom,
	Stat.Charisma,
] as const;

export const AUXILIARY_STATS = [
	AuxiliaryStat.ArmourClass,
	AuxiliaryStat.HitChance,
	AuxiliaryStat.CritChance,
] as const;

export const RESISTANCES = [
	DamageType.Slashing,
	DamageType.Crushing,
	DamageType.Piercing,
	DamageType.Cold,
	DamageType.Fire,
	DamageType.Lightning,
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
	DamageType.Lightning,
] as const;

export const AUXILLARY_RESISTANCES = [
	DamageType.Radiant,
	DamageType.Necrotic,
	DamageType.Poison,
	DamageType.Acid,
] as const;

export const STATS_ABBR_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "CHR",
	[Stat.Constitution]: "CON",
	[Stat.Dexterity]: "DEX",
	[Stat.Intelligence]: "INT",
	[Stat.Strength]: "STR",
	[Stat.Wisdom]: "WIS",
};

export const STATS_NAME_MAP: Record<Stat, string> = {
	[Stat.Charisma]: "Charisma",
	[Stat.Constitution]: "Constitution",
	[Stat.Dexterity]: "Dexterity",
	[Stat.Intelligence]: "Intelligence",
	[Stat.Strength]: "Strength",
	[Stat.Wisdom]: "Wisdom",
};

export const AUXILIARY_STATS_ABBR_MAP: Record<AuxiliaryStat, string> = {
	[AuxiliaryStat.ArmourClass]: "AC",
	[AuxiliaryStat.HitChance]: "HIT",
	[AuxiliaryStat.CritChance]: "CRT",
};

export const AUXILIARY_STATS_NAME_MAP: Record<AuxiliaryStat, string> = {
	[AuxiliaryStat.ArmourClass]: "Armour Class",
	[AuxiliaryStat.HitChance]: "Hit Chance",
	[AuxiliaryStat.CritChance]: "Crit Chance",
};

export const RESISTANCES_ABBR_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "SLA",
	[DamageType.Crushing]: "CRU",
	[DamageType.Piercing]: "PIE",
	[DamageType.Cold]: "CLD",
	[DamageType.Fire]: "FRE",
	[DamageType.Lightning]: "LTG",
	[DamageType.Radiant]: "RAD",
	[DamageType.Necrotic]: "NEC",
	[DamageType.Poison]: "PSN",
	[DamageType.Acid]: "ACD",
};

export const RESISTANCES_NAME_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "Slashing",
	[DamageType.Crushing]: "Crushing",
	[DamageType.Piercing]: "Piercing",
	[DamageType.Cold]: "Cold",
	[DamageType.Fire]: "Fire",
	[DamageType.Lightning]: "Lightning",
	[DamageType.Radiant]: "Radiant",
	[DamageType.Necrotic]: "Necrotic",
	[DamageType.Poison]: "Poison",
	[DamageType.Acid]: "Acid",
};

export const RESISTANCES_COLOUR_MAP: Record<DamageType, string> = {
	[DamageType.Slashing]: "#607466",
	[DamageType.Crushing]: "#6C6F7D",
	[DamageType.Piercing]: "#F2D1C9",
	[DamageType.Cold]: "#92D5E6",
	[DamageType.Fire]: "#E4572E",
	[DamageType.Lightning]: "#F9DC5C",
	[DamageType.Radiant]: "#F3FFBD",
	[DamageType.Necrotic]: "#5A0B4D",
	[DamageType.Poison]: "#157145",
	[DamageType.Acid]: "#A1EF8B",
};

export const SKILL_EFFECTS = [
	EffectType.WeaponDamage,
	EffectType.Damage,
	EffectType.Heal,
	EffectType.Status,
	EffectType.Auxiliary,
] as const;

export const WEAPON_EFFECTS = [
	EffectType.Damage,
	EffectType.Heal,
	EffectType.Status,
	EffectType.Auxiliary,
] as const;

export const EFFECTS_NAME_MAP: Record<EffectType, string> = {
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
	AuxiliaryEffect.Disarm,
	AuxiliaryEffect.Silence,
	AuxiliaryEffect.Blind,
	AuxiliaryEffect.Frenzy,
	AuxiliaryEffect.Charm,
	AuxiliaryEffect.Haste,
	AuxiliaryEffect.Cripple,
	AuxiliaryEffect.Bless,
	AuxiliaryEffect.Curse,
] as const;

export const AUXILIARY_EFFECTS_NAME_MAP: Record<AuxiliaryEffect, string> = {
	[AuxiliaryEffect.Poison]: "Poison",
	[AuxiliaryEffect.Stun]: "Stun",
	[AuxiliaryEffect.Bleed]: "Bleed",
	[AuxiliaryEffect.Disarm]: "Disarm",
	[AuxiliaryEffect.Silence]: "Silence",
	[AuxiliaryEffect.Blind]: "Blind",
	[AuxiliaryEffect.Frenzy]: "Frenzy",
	[AuxiliaryEffect.Charm]: "Charm",
	[AuxiliaryEffect.Haste]: "Haste",
	[AuxiliaryEffect.Cripple]: "Cripple",
	[AuxiliaryEffect.Bless]: "Bless",
	[AuxiliaryEffect.Curse]: "Curse",
};

export const CLASSES = [
	SkillClass.Common,
	SkillClass.Unique,
	SkillClass.Warrior,
	SkillClass.Barbarian,
	SkillClass.Mage,
	SkillClass.Rogue,
	SkillClass.Assassin,
	SkillClass.Cleric,
	SkillClass.Warlock,
	SkillClass.Occultist,
] as const;

export const CHARACTER_CLASSES = [
	SkillClass.Warrior,
	SkillClass.Barbarian,
	SkillClass.Mage,
	SkillClass.Warlock,
	SkillClass.Rogue,
	SkillClass.Assassin,
	SkillClass.Cleric,
	SkillClass.Occultist,
] as const;

export const CLASS_NAME_MAP: Record<SkillClass, string> = {
	[SkillClass.Common]: "Common",
	[SkillClass.Unique]: "Unique",
	[SkillClass.Warrior]: "Warrior",
	[SkillClass.Barbarian]: "Barbarian",
	[SkillClass.Mage]: "Mage",
	[SkillClass.Warlock]: "Warlock",
	[SkillClass.Rogue]: "Rogue",
	[SkillClass.Assassin]: "Assassin",
	[SkillClass.Cleric]: "Cleric",
	[SkillClass.Occultist]: "Occultist",
};

export const SKILL_TYPES = [
	SkillType.WeaponAttack,
	SkillType.Attack,
	SkillType.Heal,
	SkillType.Buff,
	SkillType.Debuff,
	SkillType.Other,
] as const;

export const SKILL_TYPE_NAME_MAP: Record<SkillType, string> = {
	[SkillType.WeaponAttack]: "Weapon Attack",
	[SkillType.Attack]: "Attack",
	[SkillType.Heal]: "Heal",
	[SkillType.Buff]: "Buff",
	[SkillType.Debuff]: "Debuff",
	[SkillType.Other]: "Other",
};

export const WEAPON_TYPES = [
	WeaponType.Axe,
	WeaponType.Bow,
	WeaponType.Club,
	WeaponType.Crossbow,
	WeaponType.Dagger,
	WeaponType.Hammer,
	WeaponType.Mace,
	WeaponType.Spear,
	WeaponType.Staff,
	WeaponType.Sword,
	WeaponType.Wand,
] as const;

export const WEAPON_SIZES = [
	WeaponSize.OneHanded,
	WeaponSize.TwoHanded,
] as const;

export const WEAPON_SIZE_NAME_MAP: Record<WeaponSize, string> = {
	[WeaponSize.OneHanded]: "One Handed",
	[WeaponSize.TwoHanded]: "Two Handed",
};

export const EQUIPMENT_ARMOUR_TYPES = [
	EquipmentType.Amulet,
	EquipmentType.Armour,
	EquipmentType.Belt,
	EquipmentType.Boots,
	EquipmentType.Gloves,
	EquipmentType.Helmet,
	EquipmentType.Ring,
	EquipmentType.Shield,
] as const;

export const ARMOUR_TYPES = [
	ArmourType.Heavy,
	ArmourType.Medium,
	ArmourType.Light,
	ArmourType.Cloth,
	ArmourType.Miscellaneous,
] as const;

export const ARMOUR_TYPE_NAME_MAP: Record<ArmourType, string> = {
	[ArmourType.Heavy]: "Heavy",
	[ArmourType.Medium]: "Medium",
	[ArmourType.Light]: "Light",
	[ArmourType.Cloth]: "Cloth",
	[ArmourType.Miscellaneous]: "Misc",
};

export const EQUIPMENT_TYPE_NAME_MAP: Record<
	EquipmentType | WeaponType,
	string
> = {
	[EquipmentType.Amulet]: "Amulet",
	[EquipmentType.Armour]: "Armour",
	[EquipmentType.Belt]: "Belt",
	[EquipmentType.Boots]: "Boots",
	[EquipmentType.Gloves]: "Gloves",
	[EquipmentType.Helmet]: "Helmet",
	[EquipmentType.Ring]: "Ring",
	[EquipmentType.Shield]: "Shield",
	[EquipmentType.Weapon]: "Weapon",
	[WeaponType.Axe]: "Axe",
	[WeaponType.Bow]: "Bow",
	[WeaponType.Club]: "Club",
	[WeaponType.Crossbow]: "Crossbow",
	[WeaponType.Dagger]: "Dagger",
	[WeaponType.Hammer]: "Hammer",
	[WeaponType.Mace]: "Mace",
	[WeaponType.Spear]: "Spear",
	[WeaponType.Staff]: "Staff",
	[WeaponType.Sword]: "Sword",
	[WeaponType.Wand]: "Wand",
};

export const EQUIPMENT_SLOT_TYPE_MAP: Record<EquipmentType, EquipmentSlot[]> = {
	[EquipmentType.Helmet]: [EquipmentSlot.Head],
	[EquipmentType.Amulet]: [EquipmentSlot.Neck],
	[EquipmentType.Armour]: [EquipmentSlot.Body],
	[EquipmentType.Belt]: [EquipmentSlot.Waist],
	[EquipmentType.Gloves]: [EquipmentSlot.Hands],
	[EquipmentType.Boots]: [EquipmentSlot.Feet],
	[EquipmentType.Ring]: [EquipmentSlot.Finger1, EquipmentSlot.Finger2],
	[EquipmentType.Weapon]: [EquipmentSlot.Hand1, EquipmentSlot.Hand2],
	[EquipmentType.Shield]: [EquipmentSlot.Hand2],
};

export const EQUIPMENT_SLOTS = [
	EquipmentSlot.Head,
	EquipmentSlot.Neck,
	EquipmentSlot.Body,
	EquipmentSlot.Waist,
	EquipmentSlot.Hands,
	EquipmentSlot.Feet,
	EquipmentSlot.Finger1,
	EquipmentSlot.Finger2,
	EquipmentSlot.Hand1,
	EquipmentSlot.Hand2,
] as const;

export const EQUIPMENT_SLOT_NAME_MAP: Record<EquipmentSlot, string> = {
	[EquipmentSlot.Head]: "Head",
	[EquipmentSlot.Neck]: "Neck",
	[EquipmentSlot.Body]: "Body",
	[EquipmentSlot.Waist]: "Waist",
	[EquipmentSlot.Hands]: "Hands",
	[EquipmentSlot.Feet]: "Feet",
	[EquipmentSlot.Finger1]: "Finger",
	[EquipmentSlot.Finger2]: "Finger",
	[EquipmentSlot.Hand1]: "Main Hand",
	[EquipmentSlot.Hand2]: "Off Hand",
};

export const ZONES = [
	Zone.Forest,
	Zone.Castle,
	Zone.Desert,
	Zone.Plains,
	Zone.Hills,
	Zone.Ocean,
	Zone.Volcano,
	Zone.Abyss,
	Zone.Dungeon,
	Zone.Tower,
] as const;

export const TACTICS = [
	Tactics.Default,
	Tactics.Caster,
	Tactics.Concede,
] as const;

export * from "./config";
