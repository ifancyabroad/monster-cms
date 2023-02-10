import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IArmour } from "../../../types";
import { useAddEquipmentContext } from "../../../context";
import { EQUIPMENT_SLOT_TYPE_MAP } from "../../../utils";

interface IProps {
	armour: IArmour;
}

export const TableAddActions: React.FC<IProps> = ({ armour }) => {
	const { state, dispatch } = useAddEquipmentContext();

	const slots = EQUIPMENT_SLOT_TYPE_MAP[armour.type];
	const availableSlot = slots.find((slot) => state[slot] === undefined);
	const currentSlot = slots.find((slot) => state[slot] === armour.id);

	const handleAdd = () => {
		if (availableSlot) {
			dispatch({
				type: "ADD",
				payload: {
					slot: availableSlot,
					value: armour.id,
				},
			});
		}
	};

	const handleRemove = () => {
		if (currentSlot) {
			dispatch({
				type: "REMOVE",
				payload: {
					slot: currentSlot,
					value: armour.id,
				},
			});
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				gap: 2,
			}}
		>
			{availableSlot ? (
				<IconButton
					aria-label="add"
					color="primary"
					onClick={handleAdd}
				>
					<AddCircleIcon />
				</IconButton>
			) : (
				<IconButton
					aria-label="remove"
					color="warning"
					onClick={handleRemove}
				>
					<RemoveCircleIcon />
				</IconButton>
			)}
		</Box>
	);
};
