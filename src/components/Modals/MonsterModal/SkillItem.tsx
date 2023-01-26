import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
	selectSkillById,
	selectSkillImagePathById,
} from "../../../features/skills/skillsSlice";
import { getSkillType, SKILL_TYPE_NAME_MAP } from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const Icon = styled("img")({
	width: "40px",
});

interface IProps {
	id: string;
	onRemoveSkill: (skill: string) => void;
}

export const SkillItem: React.FC<IProps> = ({ id, onRemoveSkill }) => {
	const skill = useSelector(selectSkillById)(id);
	const skillImagePath = useSelector(selectSkillImagePathById)(id);

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
					{skillImagePath ? (
						<Icon src={skillImagePath} alt={skill.name} />
					) : (
						<Box
							sx={{
								height: 40,
								width: 40,
								bgcolor: "background.default",
							}}
						/>
					)}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={skill.name} secondary={secondaryText} />
		</ListItem>
	);
};
