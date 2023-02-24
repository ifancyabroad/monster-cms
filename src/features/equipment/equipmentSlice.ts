import { createSelector } from "@reduxjs/toolkit";
import { armoursSelector } from "features/armours";
import { weaponsSelector } from "features/weapons";

export const equipmentSelector = createSelector(
	armoursSelector,
	weaponsSelector,
	({ armours }, { weapons }) => [...armours, ...weapons]
);

export const selectEquipmentById = createSelector(
	equipmentSelector,
	(equipment) => (id: string) => equipment.find((item) => item.id === id)
);
