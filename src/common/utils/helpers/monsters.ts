import { Stat } from "common/utils";
import {
	IMonster,
	IMonsterFilters,
	TMonstersOrderBy,
	TOrder,
} from "common/types";

const descendingComparator = (
	a: IMonster,
	b: IMonster,
	orderBy: TMonstersOrderBy
) => {
	const first =
		orderBy in a.stats
			? a.stats[orderBy as Stat]
			: a[orderBy as keyof IMonster] || 0;
	const second =
		orderBy in b.stats
			? b.stats[orderBy as Stat]
			: b[orderBy as keyof IMonster] || 0;

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
		const zoneFilter =
			filters.zone === "all" || filters.zone === monster.zone;
		return nameFilter && challengeFilter && zoneFilter;
	};
};
