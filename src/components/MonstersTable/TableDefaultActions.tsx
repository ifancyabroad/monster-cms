import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { openMonsterModal } from "../../features/modals/modalsSlice";
import { IMonster } from "../../types";

interface IProps {
	monster: IMonster;
	onDelete: () => void;
}

export const TableDefaultActions: React.FC<IProps> = ({
	monster,
	onDelete,
}) => {
	const dispatch = useAppDispatch();

	const handleUpdate = () => {
		dispatch(openMonsterModal(monster));
	};

	const handleDelete = () => {
		onDelete();
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				gap: 2,
			}}
		>
			<IconButton
				aria-label="view"
				color="primary"
				component={Link}
				to={`/monsters/${monster.id}`}
			>
				<VisibilityIcon />
			</IconButton>
			<IconButton
				aria-label="update"
				color="secondary"
				onClick={handleUpdate}
			>
				<EditIcon />
			</IconButton>
			<IconButton
				aria-label="delete"
				color="warning"
				onClick={handleDelete}
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	);
};
