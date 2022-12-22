import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	IconButtonProps,
	styled,
	Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
	fetchSkillImagePath,
	selectSkillById,
	selectSkillImagePathById,
} from "../../features/skills/skillsSlice";
import { CLASS_NAME_MAP, getSkillType, SKILL_TYPE_NAME_MAP } from "../../utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const Icon = styled("img")({
	width: "40px",
});

interface IProps {
	id: string;
}

export const SkillCard: React.FC<IProps> = ({ id }) => {
	const dispatch = useAppDispatch();
	const skill = useSelector(selectSkillById)(id);
	const skillImagePath = useSelector(selectSkillImagePathById)(id);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		if (skill?.icon) {
			dispatch(fetchSkillImagePath(skill));
		}
	}, [dispatch, skill]);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	if (!skill) {
		return null;
	}

	return (
		<Card variant="outlined">
			<CardHeader
				avatar={
					skillImagePath ? (
						<Icon src={skillImagePath} alt={skill.name} />
					) : (
						<Box
							sx={{
								height: 40,
								width: 40,
								bgcolor: "background.default",
							}}
						/>
					)
				}
				title={skill.name}
				subheader={SKILL_TYPE_NAME_MAP[getSkillType(skill)]}
				action={
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				}
			/>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography gutterBottom>{skill.description}</Typography>
					<Box component="ul" sx={{ margin: 0 }}>
						<Typography component="li">
							<Box component="span" sx={{ fontWeight: "medium" }}>
								Class:{" "}
							</Box>
							{CLASS_NAME_MAP[skill.class]}
						</Typography>
						<Typography component="li">
							<Box component="span" sx={{ fontWeight: "medium" }}>
								Target:{" "}
							</Box>
							{skill.target}
						</Typography>
						<Typography component="li">
							<Box component="span" sx={{ fontWeight: "medium" }}>
								Level:{" "}
							</Box>
							{skill.level}
						</Typography>
						<Typography component="li">
							<Box component="span" sx={{ fontWeight: "medium" }}>
								Value:{" "}
							</Box>
							{skill.price}g
						</Typography>
						<Typography component="li">
							<Box component="span" sx={{ fontWeight: "medium" }}>
								Max Uses:{" "}
							</Box>
							{skill.maxUses}
						</Typography>
					</Box>
				</CardContent>
			</Collapse>
		</Card>
	);
};
