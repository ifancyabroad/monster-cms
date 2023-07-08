import { EffectType, SkillType, Target } from "common/utils";
import { ISkill, ISkillFilters, TOrder, TSkillsOrderBy } from "common/types";

export const getSkillType = (skill: ISkill) => {
	const { effects } = skill;
	const offensiveEffectTypes = effects
		.filter((effect) => effect.target === Target.Enemy)
		.map((effect) => effect.type);
	const defensiveEffectTypes = effects
		.filter((effect) => effect.target === Target.Self)
		.map((effect) => effect.type);

	if (offensiveEffectTypes.includes(EffectType.WeaponDamage)) {
		return SkillType.WeaponAttack;
	}

	if (offensiveEffectTypes.includes(EffectType.Damage)) {
		return SkillType.Attack;
	}

	if (
		offensiveEffectTypes.includes(EffectType.Status) ||
		offensiveEffectTypes.includes(EffectType.Auxiliary)
	) {
		return SkillType.Debuff;
	}

	if (defensiveEffectTypes.includes(EffectType.Heal)) {
		return SkillType.Heal;
	}

	if (
		defensiveEffectTypes.includes(EffectType.Status) ||
		defensiveEffectTypes.includes(EffectType.Auxiliary)
	) {
		return SkillType.Buff;
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

export const getSkillsComparator = (
	order: TOrder,
	orderBy: TSkillsOrderBy
): ((a: ISkill, b: ISkill) => number) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const applySkillsFilters = (
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
