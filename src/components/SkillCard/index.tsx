import { Box, Card, CardHeader, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {
	fetchSkillImagePath,
	selectSkillById,
	selectSkillImagePathById,
} from "../../features/skills/skillsSlice";
import { getSkillType, SKILL_TYPE_NAME_MAP } from "../../utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";

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

	useEffect(() => {
		if (skill?.icon) {
			dispatch(fetchSkillImagePath(skill));
		}
	}, [dispatch, skill]);

	if (!skill) {
		return null;
	}

	const secondaryText = `Level ${skill.level} ${
		SKILL_TYPE_NAME_MAP[getSkillType(skill)]
	}`;

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
