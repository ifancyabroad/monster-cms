import { TEquipment } from "common/types";

export const hasEquipment = (equipment: Partial<TEquipment> | undefined) => {
	return Boolean(equipment && Object.keys(equipment));
};
