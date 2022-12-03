import { DamageType, Reward, Stat } from "../../enums";

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
	DamageType.Physical,
	DamageType.Arcane,
	DamageType.Cold,
	DamageType.Fire,
	DamageType.Divine,
	DamageType.Unholy,
] as const;

export const REWARDS = [Reward.Experience, Reward.Gold] as const;

export const STATS_NAME_MAP = {
	[Stat.Charisma]: "Charisma",
	[Stat.Constitution]: "Constitution",
	[Stat.Dexterity]: "Dexterity",
	[Stat.Intelligence]: "Intelligence",
	[Stat.Strength]: "Strength",
	[Stat.Wisdom]: "Wisdom",
};

export const RESISTANCES_NAME_MAP = {
	[DamageType.Arcane]: "Arcane",
	[DamageType.Cold]: "Cold",
	[DamageType.Divine]: "Divine",
	[DamageType.Fire]: "Fire",
	[DamageType.Physical]: "Physical",
	[DamageType.Unholy]: "Unholy",
};

export const REWARDS_NAME_MAP = {
	[Reward.Experience]: "Experience",
	[Reward.Gold]: "Gold",
};
