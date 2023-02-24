import { IArmour, IArmourFilters, TArmoursOrderBy, TOrder } from "common/types";

const descendingComparator = (
	a: IArmour,
	b: IArmour,
	orderBy: TArmoursOrderBy
) => {
	const first = a[orderBy] || 0;
	const second = b[orderBy] || 0;
	if (second < first) {
		return -1;
	}
	if (second > first) {
		return 1;
	}
	return 0;
};

export const getArmoursComparator = (
	order: TOrder,
	orderBy: TArmoursOrderBy
): ((a: IArmour, b: IArmour) => number) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const applyArmoursFilters = (
	filters: IArmourFilters
): ((armour: IArmour) => boolean) => {
	return (armour) => {
		const nameFilter = armour.name
			.toLowerCase()
			.includes(filters.name.toLowerCase());
		const typeFilter =
			filters.type === "all" || armour.type === filters.type;
		const priceFilter = filters.price >= armour.price;
		const levelFilter = filters.level >= armour.level;
		return nameFilter && typeFilter && priceFilter && levelFilter;
	};
};
