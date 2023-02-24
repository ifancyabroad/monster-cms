import { EquipmentSlot, EQUIPMENT_SLOT_NAME_MAP } from "common/utils";

interface IProps {
	slot: EquipmentSlot;
	width?: number;
}

export const EquipmentSlotIcon: React.FC<IProps> = ({ slot, width = 40 }) => {
	return (
		<img
			src={`https://via.placeholder.com/${width}`}
			alt={EQUIPMENT_SLOT_NAME_MAP[slot]}
		/>
	);
};
