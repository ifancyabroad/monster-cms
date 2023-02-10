import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { EquipmentSlot, EQUIPMENT_TYPE_NAME_MAP } from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectEquipmentById } from "../../../features/equipment";
import { EquipmentSlotIcon } from "../../EquipmentSlotIcon";

interface IProps {
	id: string;
	slot: EquipmentSlot;
	onRemove: (equipment: string) => void;
}

export const EquipmentItem: React.FC<IProps> = ({ id, slot, onRemove }) => {
	const equipment = useSelector(selectEquipmentById)(id);

	const handleRemove = () => {
		if (id) {
			onRemove(id);
		}
	};

	if (!equipment) {
		return null;
	}

	const secondaryText = `Level ${equipment.level} ${
		EQUIPMENT_TYPE_NAME_MAP[equipment.type]
	}`;

	return (
		<ListItem
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="remove equipment"
					color="warning"
					onClick={handleRemove}
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemAvatar>
				<Avatar variant="square">
					<EquipmentSlotIcon slot={slot} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={equipment.name} secondary={secondaryText} />
		</ListItem>
	);
};
