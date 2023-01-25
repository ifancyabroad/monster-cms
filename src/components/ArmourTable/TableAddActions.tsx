import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IArmour } from "../../types";
import { useAddArmoursContext } from "../Modals/AddArmoursModal/addArmoursContext";

interface IProps {
	armour: IArmour;
}

export const TableAddActions: React.FC<IProps> = ({ armour }) => {
	const { state, dispatch } = useAddArmoursContext();

	const handleAdd = () => {
		dispatch({
			type: "ADD",
			payload: armour.id,
		});
	};

	const handleRemove = () => {
		dispatch({
			type: "REMOVE",
			payload: armour.id,
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
			{state.includes(armour.id) ? (
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
