import { createSelector } from "@reduxjs/toolkit";
import { armoursSelector } from "../armours/armoursSlice";
import { weaponsSelector } from "../weapons/weaponsSlice";

export const equipmentSelector = createSelector(
	armoursSelector,
	weaponsSelector,
	({ armours }, { weapons }) => [...armours, ...weapons]
);

export const selectEquipmentById = createSelector(
	equipmentSelector,
	(equipment) => (id: string) => equipment.find((item) => item.id === id)
);
