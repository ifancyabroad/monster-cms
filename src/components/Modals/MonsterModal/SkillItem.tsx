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
						<Icon
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAjVJREFUWEftk8+L6VEYxh9NkkYRK0tipZQVKSXZTU1D2VhQChtRfjWkZlJTk2kMCykLZUf+AjsLxUKUZEvZiaQhaWZyO6fudO/tujP3nm7dbufdfH+d5/0+7+c8R6BSqY74h0vADTLuDifICBCcICfISoBVzzPICbISYNXzDHKChEC1WsV8Pkcul8Pt7S2MRiPG4zESiQR2u92nIIXDYVgsFrhcLlxdXcHn80EsFqNSqaDZbJ7s8WEGo9EonE4nOp0OptMpbDYbIpEIHh8f0e/38fT0hPPzc5jNZsxmMzw/P0On06HX672bt1qtSCaTeH19xeXlJRqNBtrtNg6HAy4uLuDxeE4O+kuDpHEwGMRqtcJ2u6VTyuVyBAIB3N/f0+fr62t6zefzkMlkEAgEWC6XlC4pYp4Ms9lsoFar6bpMJoNSqYT1eo1YLEa/d7vdn1I8aZA0LhQKdCuVSuW7+OzsjP78R4NarRbFYhHH4xGhUIjSJhWPx6HRaNBqteB2u6lB8o6Qf3t7+3ODer2eGlEoFJBKpdjv95hMJpBIJDQ/5XIZi8UCNzc31AihnUqlQAZ4eHighkjd3d3BYDBAKBRS+vV6HSaTiV5Jfv1+P+0xGo1+j+C3q7/SItnJZrN0cpFIRO/J1hDatVoNw+GQyoghr9f7Xa4cDgclSA5JOp2G3W7Hy8sLBoMBHexUfXhIPnVE/+IibpAVLifICbISYNXzDHKCrARY9TyDnCArAVY9z+B/T/ALay8JiOJVy/IAAAAASUVORK5CYII="
							alt={skill.name}
						/>
					)}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={skill.name} secondary={secondaryText} />
		</ListItem>
	);
};
