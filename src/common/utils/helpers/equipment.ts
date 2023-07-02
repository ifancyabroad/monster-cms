import { IArmour, IWeapon, TEquipment } from "common/types";
import { EQUIPMENT_SLOT_TYPE_MAP } from "common/utils/constants";
import { EquipmentSlot, EquipmentType, WeaponSize } from "common/utils/enums";

export const hasEquipment = (equipment: Partial<TEquipment> | undefined) => {
	return Boolean(equipment && Object.keys(equipment));
};

const handSlots = [EquipmentSlot.Hand1, EquipmentSlot.Hand2];

const getFilteredSlots = (
	equipmentType: EquipmentType,
	isTwoHandedWeaponEquipped: boolean
) =>
	EQUIPMENT_SLOT_TYPE_MAP[equipmentType].filter(
		(slot) => !(handSlots.includes(slot) && isTwoHandedWeaponEquipped)
	);

export const getAvailableWeaponSlot = (
	weapon: IWeapon,
	equipment: Partial<TEquipment>,
	isTwoHandedWeaponEquipped: boolean
) => {
	if (weapon.size === WeaponSize.TwoHanded) {
		const isBothHandsFree = handSlots.every(
			(slot) => equipment[slot] === undefined
		);
		return isBothHandsFree ? EquipmentSlot.Hand1 : undefined;
	}

	const slots = getFilteredSlots(weapon.type, isTwoHandedWeaponEquipped);
	return slots.find((slot) => equipment[slot] === undefined);
};

export const getAvailableArmourSlot = (
	armour: IArmour,
	equipment: Partial<TEquipment>,
	isTwoHandedWeaponEquipped: boolean
) => {
	const slots = getFilteredSlots(armour.type, isTwoHandedWeaponEquipped);
	return slots.find((slot) => equipment[slot] === undefined);
};
