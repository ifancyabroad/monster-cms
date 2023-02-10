import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectSkillById } from "../../../features/skills/skillsSlice";
import { getSkillType, SKILL_TYPE_NAME_MAP } from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { SkillIcon } from "../../SkillIcon";

interface IProps {
	id: string;
	onRemoveSkill: (skill: string) => void;
}

export const SkillItem: React.FC<IProps> = ({ id, onRemoveSkill }) => {
	const skill = useSelector(selectSkillById)(id);

	const handleRemoveSkill = () => {
		onRemoveSkill(id);
	};

	if (!skill) {
		return null;
	}

	const secondaryText = `Level ${skill.level} ${
		SKILL_TYPE_NAME_MAP[getSkillType(skill)]
	}`;

	return (
		<ListItem
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="remove skill"
					color="warning"
					onClick={handleRemoveSkill}
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemAvatar>
				<Avatar variant="square">
					<SkillIcon skill={skill} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={skill.name} secondary={secondaryText} />
		</ListItem>
	);
};
