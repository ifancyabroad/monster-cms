import { EquipmentSlot, EQUIPMENT_SLOT_NAME_MAP } from "common/utils";
import headIcon from "assets/images/icons/barbute.svg";
import neckIcon from "assets/images/icons/emerald-necklace.svg";
import bodyIcon from "assets/images/icons/leather-vest.svg";
import beltIcon from "assets/images/icons/belt.svg";
import handIcon from "assets/images/icons/hand.svg";
import bootsIcon from "assets/images/icons/boots.svg";
import fingerIcon from "assets/images/icons/diamond-ring.svg";
import mainHandIcon from "assets/images/icons/broadsword.svg";
import offHandIcon from "assets/images/icons/shield.svg";

const EQUIPMENT_SLOT_ICON_MAP: Record<EquipmentSlot, string> = {
	[EquipmentSlot.Head]: headIcon,
	[EquipmentSlot.Neck]: neckIcon,
	[EquipmentSlot.Body]: bodyIcon,
	[EquipmentSlot.Waist]: beltIcon,
	[EquipmentSlot.Hands]: handIcon,
	[EquipmentSlot.Feet]: bootsIcon,
	[EquipmentSlot.Finger1]: fingerIcon,
	[EquipmentSlot.Finger2]: fingerIcon,
	[EquipmentSlot.Hand1]: mainHandIcon,
	[EquipmentSlot.Hand2]: offHandIcon,
};

interface IProps {
	slot: EquipmentSlot;
	width?: number;
}

export const EquipmentSlotIcon: React.FC<IProps> = ({ slot, width = 40 }) => {
	return (
		<img
			src={EQUIPMENT_SLOT_ICON_MAP[slot]}
			alt={EQUIPMENT_SLOT_NAME_MAP[slot]}
			width={width}
		/>
	);
};
