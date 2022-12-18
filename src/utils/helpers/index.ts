import { EffectType, SkillType, Target } from "../../enums";
import { TStats, TDamageTypes, ISkill } from "../../types";
import {
	AUXILLARY_RESISTANCES,
	ELEMENTAL_RESISTANCES,
	PHYSICAL_RESISTANCES,
	RESISTANCES,
	RESISTANCES_NAME_MAP,
	STATS,
	STATS_NAME_MAP,
} from "../constants";

export const getStatsArray = (stats: TStats) =>
	STATS.map((stat) => ({
		key: stat,
		name: STATS_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getResistancesArray = (stats: TDamageTypes) =>
	RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getPhysicalResistancesArray = (stats: TDamageTypes) =>
	PHYSICAL_RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getElementalResistancesArray = (stats: TDamageTypes) =>
	ELEMENTAL_RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getAuxillaryResistancesArray = (stats: TDamageTypes) =>
	AUXILLARY_RESISTANCES.map((stat) => ({
		key: stat,
		name: RESISTANCES_NAME_MAP[stat],
		value: stats[stat],
	}));

export const getKeyFromName = (name: string) =>
	name.toLowerCase().replaceAll(" ", "_").trim();

export const getSkillType = (skill: ISkill) => {
	const { effects, target } = skill;
	const effectTypes = effects.map((effect) => effect.type);

	if (target === Target.Enemy) {
		if (effectTypes.includes(EffectType.WeaponDamage)) {
			return SkillType.WeaponAttack;
		}

		if (effectTypes.includes(EffectType.Damage)) {
			return SkillType.Attack;
		}

		if (
			effectTypes.includes(EffectType.Status) ||
			effectTypes.includes(EffectType.Auxiliary)
		) {
			return SkillType.Debuff;
		}
	}

	if (target === Target.Self) {
		if (effectTypes.includes(EffectType.Heal)) {
			return SkillType.Heal;
		}

		if (
			effectTypes.includes(EffectType.Status) ||
			effectTypes.includes(EffectType.Auxiliary)
		) {
			return SkillType.Buff;
		}
	}

	return SkillType.Other;
};
