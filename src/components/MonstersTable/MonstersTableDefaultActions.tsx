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
	onDeleteMonster: () => void;
}

export const MonstersTableDefaultActions: React.FC<IProps> = ({
	monster,
	onDeleteMonster,
}) => {
	const dispatch = useAppDispatch();

	const handleUpdateMonster = () => {
		dispatch(openMonsterModal(monster));
	};

	const handleDeleteMonster = () => {
		onDeleteMonster();
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
				onClick={handleUpdateMonster}
			>
				<EditIcon />
			</IconButton>
			<IconButton
				aria-label="delete"
				color="warning"
				onClick={handleDeleteMonster}
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	);
};
