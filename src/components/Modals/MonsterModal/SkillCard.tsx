import {
	Card,
	CardActions,
	CardContent,
	Collapse,
	IconButton,
	IconButtonProps,
	styled,
	Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectSkillById } from "../../../features/skills/skillsSlice";
import { getSkillType, SKILL_TYPE_NAME_MAP } from "../../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

interface IProps {
	id: string;
	onRemoveSkill: (skill: string) => void;
}

export const SkillCard: React.FC<IProps> = ({ id, onRemoveSkill }) => {
	const skill = useSelector(selectSkillById)(id);
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleRemoveSkill = () => {
		onRemoveSkill(id);
	};

	if (!skill) {
		return null;
	}

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="textSecondary">
					{SKILL_TYPE_NAME_MAP[getSkillType(skill)]}
				</Typography>
				<Typography variant="h5">{skill.name}</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					aria-label="remove skill"
					color="warning"
					onClick={handleRemoveSkill}
				>
					<DeleteIcon fontSize="small" />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon fontSize="small" />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography>{skill.description}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};
