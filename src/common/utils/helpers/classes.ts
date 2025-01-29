import { Stat } from "common/utils";
import {
	ICharacterClass,
	IClassFilters,
	TClassesOrderBy,
	TOrder,
} from "common/types";

const descendingComparator = (
	a: ICharacterClass,
	b: ICharacterClass,
	orderBy: TClassesOrderBy
) => {
	const first =
		orderBy in a.stats
			? a.stats[orderBy as Stat]
			: a[orderBy as keyof ICharacterClass] || 0;
	const second =
		orderBy in b.stats
			? b.stats[orderBy as Stat]
			: b[orderBy as keyof ICharacterClass] || 0;

	if (second < first) {
		return -1;
	}
	if (second > first) {
		return 1;
	}
	return 0;
};

export const getClassesComparator = (
	order: TOrder,
	orderBy: TClassesOrderBy
): ((a: ICharacterClass, b: ICharacterClass) => number) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const applyClassesFilters = (
	filters: IClassFilters
): ((characterClass: ICharacterClass) => boolean) => {
	return (characterClass) => {
		const nameFilter = characterClass.name
			.toLowerCase()
			.includes(filters.name.toLowerCase());
		return nameFilter;
	};
};
