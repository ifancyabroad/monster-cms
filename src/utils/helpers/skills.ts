import { EffectType, SkillType, Target } from "../../enums";
import { ISkill, ISkillFilters, TOrder, TSkillsOrderBy } from "../../types";

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

const descendingComparator = (
	a: ISkill,
	b: ISkill,
	orderBy: TSkillsOrderBy
) => {
	const first = orderBy === "type" ? getSkillType(a) : a[orderBy];
	const second = orderBy === "type" ? getSkillType(b) : b[orderBy];
	if (second < first) {
		return -1;
	}
	if (second > first) {
		return 1;
	}
	return 0;
};

export const getComparator = (
	order: TOrder,
	orderBy: TSkillsOrderBy
): ((a: ISkill, b: ISkill) => number) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const applyFilters = (
	filters: ISkillFilters
): ((skill: ISkill) => boolean) => {
	return (skill) => {
		const nameFilter = skill.name
			.toLowerCase()
			.includes(filters.name.toLowerCase());
		const classFilter =
			filters.class === "all" || skill.class === filters.class;
		const typeFilter =
			filters.type === "all" || getSkillType(skill) === filters.type;
		const priceFilter = filters.price >= skill.price;
		const levelFilter = filters.level >= skill.level;
		return (
			nameFilter &&
			classFilter &&
			typeFilter &&
			priceFilter &&
			levelFilter
		);
	};
};
