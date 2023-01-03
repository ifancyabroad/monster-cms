import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { ISkill } from "../../types";
import { useAddSkillsContext } from "../Modals/AddSkillsModal/addSkillsContext";

interface IProps {
	skill: ISkill;
}

export const SkillsTableAddSkillActions: React.FC<IProps> = ({ skill }) => {
	const { state, dispatch } = useAddSkillsContext();

	const handleAddSkill = () => {
		dispatch({
			type: "ADD",
			payload: skill.id,
		});
	};

	const handleRemoveSkill = () => {
		dispatch({
			type: "REMOVE",
			payload: skill.id,
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
			{state.includes(skill.id) ? (
				<IconButton
					aria-label="remove"
					color="warning"
					onClick={handleRemoveSkill}
				>
					<RemoveCircleIcon />
				</IconButton>
			) : (
				<IconButton
					aria-label="add"
					color="primary"
					onClick={handleAddSkill}
				>
					<AddCircleIcon />
				</IconButton>
			)}
		</Box>
	);
};
