import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectSkillById } from "features/skills/skillsSlice";
import {
	ATTACK_SKILL_ID,
	getSkillType,
	SKILL_TYPE_NAME_MAP,
} from "common/utils";
import CloseIcon from "@mui/icons-material/Close";
import { SkillIcon } from "features/skills/SkillIcon";

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

	const isAttack = skill.id === ATTACK_SKILL_ID;
	const secondaryText = `Level ${skill.level} ${
		SKILL_TYPE_NAME_MAP[getSkillType(skill)]
	}`;

	return (
		<ListItem
			secondaryAction={
				!isAttack && (
					<IconButton
						edge="end"
						aria-label="remove skill"
						onClick={handleRemoveSkill}
					>
						<CloseIcon />
					</IconButton>
				)
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
