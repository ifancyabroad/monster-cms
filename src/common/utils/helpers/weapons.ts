import { IWeapon, IWeaponFilters, TOrder, TWeaponsOrderBy } from "common/types";

const descendingComparator = (
	a: IWeapon,
	b: IWeapon,
	orderBy: TWeaponsOrderBy
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

export const getWeaponsComparator = (
	order: TOrder,
	orderBy: TWeaponsOrderBy
): ((a: IWeapon, b: IWeapon) => number) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

export const applyWeaponsFilters = (
	filters: IWeaponFilters
): ((weapon: IWeapon) => boolean) => {
	return (weapon) => {
		const nameFilter = weapon.name
			.toLowerCase()
			.includes(filters.name.toLowerCase());
		const typeFilter =
			filters.type === "all" || weapon.weaponType === filters.type;
		const damageTypeFilter =
			filters.damageType === "all" ||
			weapon.damageType === filters.damageType;
		const priceFilter = filters.price >= weapon.price;
		const levelFilter = filters.level >= weapon.level;
		return (
			nameFilter &&
			typeFilter &&
			damageTypeFilter &&
			priceFilter &&
			levelFilter
		);
	};
};
