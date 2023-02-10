import { Card, CardHeader, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSkillById } from "../../features/skills/skillsSlice";
import { getSkillType, SKILL_TYPE_NAME_MAP } from "../../utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { SkillIcon } from "../SkillIcon";

interface IProps {
	id: string;
}

export const SkillCard: React.FC<IProps> = ({ id }) => {
	const skill = useSelector(selectSkillById)(id);

	if (!skill) {
		return null;
	}

	const secondaryText = `Level ${skill.level} ${
		SKILL_TYPE_NAME_MAP[getSkillType(skill)]
	}`;

	return (
		<Card variant="outlined">
			<CardHeader
				avatar={<SkillIcon skill={skill} />}
				title={skill.name}
				subheader={secondaryText}
				action={
					<IconButton
						aria-label="view"
						color="primary"
						component={Link}
						to={`/skills/${skill.id}`}
					>
						<VisibilityIcon />
					</IconButton>
				}
			/>
		</Card>
	);
};
