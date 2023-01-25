import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IWeapon } from "../../types";
import { useAddWeaponsContext } from "../../context";

interface IProps {
	weapon: IWeapon;
}

export const TableAddActions: React.FC<IProps> = ({ weapon }) => {
	const { state, dispatch } = useAddWeaponsContext();

	const handleAdd = () => {
		dispatch({
			type: "ADD",
			payload: weapon.id,
		});
	};

	const handleRemove = () => {
		dispatch({
			type: "REMOVE",
			payload: weapon.id,
		});
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				gap: 2,
			}}
		>
			{state.includes(weapon.id) ? (
				<IconButton
					aria-label="remove"
					color="warning"
					onClick={handleRemove}
				>
					<RemoveCircleIcon />
				</IconButton>
			) : (
				<IconButton
					aria-label="add"
					color="primary"
					onClick={handleAdd}
				>
					<AddCircleIcon />
				</IconButton>
			)}
		</Box>
	);
};
