import { Box, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import LockIcon from "@mui/icons-material/Lock";
import { IArmour } from "common/types";
import { useAddEquipmentContext } from "common/context";
import {
	EQUIPMENT_SLOT_TYPE_MAP,
	EquipmentSlot,
	getAvailableArmourSlot,
} from "common/utils";
import { useSelector } from "react-redux";
import { isTwoHandedWeapon } from "features/weapons";

interface IProps {
	armour: IArmour;
}

export const TableAddActions: React.FC<IProps> = ({ armour }) => {
	const { state, dispatch } = useAddEquipmentContext();
	const isTwoHandedWeaponEquipped = useSelector(isTwoHandedWeapon)(
		state[EquipmentSlot.Hand1] ?? ""
	);
	const slots = EQUIPMENT_SLOT_TYPE_MAP[armour.type];
	const availableSlot = getAvailableArmourSlot(
		armour,
		state,
		isTwoHandedWeaponEquipped
	);
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
			) : currentSlot ? (
				<IconButton
					aria-label="remove"
					color="warning"
					onClick={handleRemove}
				>
					<RemoveCircleIcon />
				</IconButton>
			) : (
				<Tooltip title="No available slot" placement="top">
					<span>
						<IconButton
							aria-label="locked"
							color="primary"
							disabled
						>
							<LockIcon />
						</IconButton>
					</span>
				</Tooltip>
			)}
		</Box>
	);
};
