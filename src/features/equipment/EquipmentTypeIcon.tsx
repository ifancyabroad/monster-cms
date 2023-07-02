import { EQUIPMENT_TYPE_NAME_MAP, EquipmentType } from "common/utils";
import helmetIcon from "assets/images/icons/barbute.svg";
import amuletIcon from "assets/images/icons/emerald-necklace.svg";
import armourIcon from "assets/images/icons/armor-vest.svg";
import beltIcon from "assets/images/icons/belt.svg";
import glovesIcon from "assets/images/icons/gloves.svg";
import bootsIcon from "assets/images/icons/boots.svg";
import ringIcon from "assets/images/icons/diamond-ring.svg";
import weaponIcon from "assets/images/icons/broadsword.svg";
import shieldIcon from "assets/images/icons/shield.svg";
import { Tooltip } from "@mui/material";

const EQUIPMENT_TYPE_ICON_MAP: Record<EquipmentType, string> = {
	[EquipmentType.Amulet]: amuletIcon,
	[EquipmentType.Armour]: armourIcon,
	[EquipmentType.Belt]: beltIcon,
	[EquipmentType.Boots]: bootsIcon,
	[EquipmentType.Gloves]: glovesIcon,
	[EquipmentType.Helmet]: helmetIcon,
	[EquipmentType.Ring]: ringIcon,
	[EquipmentType.Shield]: shieldIcon,
	[EquipmentType.Weapon]: weaponIcon,
};

interface IProps {
	type: EquipmentType;
	width?: number;
}

export const EquipmentTypeIcon: React.FC<IProps> = ({ type, width = 40 }) => {
	return (
		<Tooltip title={EQUIPMENT_TYPE_NAME_MAP[type]} placement="top">
			<img
				src={EQUIPMENT_TYPE_ICON_MAP[type]}
				alt={EQUIPMENT_TYPE_NAME_MAP[type]}
				width={width}
			/>
		</Tooltip>
	);
};
