import { Stat } from "../enums";
import {
	IMonster,
	IMonsterFilters,
	TMonstersOrderBy,
	TOrder,
} from "../../types";

const descendingComparator = (
	a: IMonster,
	b: IMonster,
	orderBy: TMonstersOrderBy
) => {
	const first =
		orderBy in a.stats
			? a.stats[orderBy as Stat]
			: a[orderBy as keyof IMonster];
	const second =
		orderBy in b.stats
			? b.stats[orderBy as Stat]
			: b[orderBy as keyof IMonster];

	if (second < first) {
		return -1;
	}
	if (second > first) {
		return 1;
	}
	return 0;
};

export const getMonstersComparator = (
	order: TOrder,
	orderBy: TMonstersOrderBy
): ((a: IMonster, b: IMonster) => number) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const applyMonstersFilters = (
	filters: IMonsterFilters
): ((monster: IMonster) => boolean) => {
	return (monster) => {
		const nameFilter = monster.name
			.toLowerCase()
			.includes(filters.name.toLowerCase());
		const challengeFilter = filters.challenge >= monster.challenge;
		return nameFilter && challengeFilter;
	};
};
