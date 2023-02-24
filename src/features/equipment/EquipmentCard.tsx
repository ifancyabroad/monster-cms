import { Card, CardHeader, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectEquipmentById } from "./equipmentSlice";
import { EquipmentSlot, EQUIPMENT_SLOT_NAME_MAP } from "common/utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { EquipmentSlotIcon } from "./EquipmentSlotIcon";

interface IProps {
	id: string;
	slot: EquipmentSlot;
}

export const EquipmentCard: React.FC<IProps> = ({ id, slot }) => {
	const equipment = useSelector(selectEquipmentById)(id);

	if (!equipment) {
		return null;
	}

	const equipmentLink =
		"weaponType" in equipment
			? `/weapons/${equipment.id}`
			: `/armours/${equipment.id}`;

	return (
		<Card variant="outlined">
			<CardHeader
				avatar={<EquipmentSlotIcon slot={slot} />}
				title={EQUIPMENT_SLOT_NAME_MAP[slot]}
				subheader={equipment.name}
				action={
					<IconButton
						aria-label="view"
						color="primary"
						component={Link}
						to={equipmentLink}
					>
						<VisibilityIcon />
					</IconButton>
				}
			/>
		</Card>
	);
};
