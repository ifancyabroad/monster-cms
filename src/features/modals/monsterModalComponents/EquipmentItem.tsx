import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { EquipmentSlot, EQUIPMENT_TYPE_NAME_MAP } from "common/utils";
import CloseIcon from "@mui/icons-material/Close";
import { selectEquipmentById } from "features/equipment";
import { EquipmentTypeIcon } from "features/equipment/EquipmentTypeIcon";

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
					onClick={handleRemove}
				>
					<CloseIcon />
				</IconButton>
			}
		>
			<ListItemAvatar>
				<Avatar
					variant="square"
					sx={{ backgroundColor: "transparent" }}
				>
					<EquipmentTypeIcon equipment={equipment} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={equipment.name} secondary={secondaryText} />
		</ListItem>
	);
};
