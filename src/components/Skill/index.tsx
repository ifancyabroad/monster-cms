import {
	Box,
	Divider,
	Grid,
	IconButton,
	styled,
	Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	deleteSkill,
	fetchSkillImagePath,
	selectSkillById,
	selectSkillImagePathById,
} from "../../features/skills/skillsSlice";
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	openConfirmationModal,
	openSkillModal,
} from "../../features/modals/modalsSlice";
import { ConfirmationModal } from "../Modals";
import { SkillPropertiesTable } from "./SkillPropertiesTable";
import { EffectCard } from "./EffectCard";
import { AuthContext } from "../../context/AuthContext";

const Icon = styled("img")({
	width: "64px",
});

interface IRouteParams {
	id: string;
}

export const Skill: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const skill = useSelector(selectSkillById)(id);
	const skillImagePath = useSelector(selectSkillImagePathById)(id);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

	useEffect(() => {
		if (skill?.icon) {
			dispatch(fetchSkillImagePath(skill));
		}
	}, [dispatch, skill]);

	if (!skill) {
		return null;
	}

	const handleUpdateSkill = () => {
		dispatch(openSkillModal(skill));
	};

	const handleDeleteSkill = async () => {
		dispatch(openConfirmationModal());
	};

	const handleCloseConfirmationModal = () => {
		dispatch(closeConfirmationModal());
	};

	const handleConfirmDeleteSkill = async () => {
		try {
			await dispatch(deleteSkill(skill)).unwrap();
			dispatch(closeConfirmationModal());
		} catch (error) {
			// TODO: Show error popup
		}
	};

	return (
		<div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
					marginBottom: 2,
				}}
			>
				<Typography variant="h2">{skill.name}</Typography>
				{user && (
					<Box sx={{ display: "flex" }}>
						<IconButton
							aria-label="add"
							color="secondary"
							onClick={handleUpdateSkill}
						>
							<Edit fontSize="large" />
						</IconButton>
						<IconButton
							aria-label="add"
							color="warning"
							onClick={handleDeleteSkill}
						>
							<Delete fontSize="large" />
						</IconButton>
					</Box>
				)}
			</Box>

			<Box
				sx={{
					marginBottom: 4,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-start",
						gap: 2,
						marginBottom: 3,
					}}
				>
					{skillImagePath && (
						<Icon src={skillImagePath} alt={skill.name} />
					)}
					<Box>
						<Typography
							variant="body2"
							color="textSecondary"
							component="h5"
							gutterBottom
						>
							Description
						</Typography>
						<Typography variant="h5" paragraph>
							{skill.description || "No description available."}
						</Typography>
					</Box>
				</Box>
				<Divider />
			</Box>

			<Box
				sx={{
					marginBottom: 4,
				}}
			>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Properties
				</Typography>

				<Grid container spacing={3} marginBottom={3}>
					<Grid item xs={12} md={6} lg={3}>
						<SkillPropertiesTable {...skill} />
					</Grid>
				</Grid>

				<Divider />
			</Box>

			<Box>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Effects
				</Typography>

				<Grid container spacing={2}>
					{skill.effects.map((effect, index) => (
						<Grid
							key={`${effect.type}-${index}`}
							item
							xs={12}
							md={6}
							lg={3}
						>
							<EffectCard {...effect} />
						</Grid>
					))}
				</Grid>
			</Box>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${skill.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDeleteSkill}
				disabled={isLoading}
			/>
		</div>
	);
};
