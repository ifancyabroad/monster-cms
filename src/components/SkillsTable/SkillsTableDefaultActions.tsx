import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { openSkillModal } from "../../features/modals/modalsSlice";
import { ISkill } from "../../types";

interface IProps {
	skill: ISkill;
	onDeleteSkill: () => void;
}

export const SkillsTableDefaultActions: React.FC<IProps> = ({
	skill,
	onDeleteSkill,
}) => {
	const dispatch = useAppDispatch();

	const handleUpdateSkill = () => {
		dispatch(openSkillModal(skill));
	};

	const handleDeleteSkill = () => {
		onDeleteSkill();
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
				to={`/skills/${skill.id}`}
			>
				<VisibilityIcon />
			</IconButton>
			<IconButton
				aria-label="update"
				color="secondary"
				onClick={handleUpdateSkill}
			>
				<EditIcon />
			</IconButton>
			<IconButton
				aria-label="delete"
				color="warning"
				onClick={handleDeleteSkill}
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	);
};
