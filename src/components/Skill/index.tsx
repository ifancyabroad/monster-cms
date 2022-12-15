import {
	Box,
	Divider,
	Grid,
	IconButton,
	styled,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	clearSkillImagePath,
	deleteSkill,
	fetchSkillImagePath,
	selectSkillById,
	selectSkillImagePath,
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

const Icon = styled("img")({
	width: "64px",
});

interface IRouteParams {
	id: string;
}

export const Skill: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const skill = useSelector(selectSkillById)(id);
	const skillImagePath = useSelector(selectSkillImagePath);
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

		return () => {
			dispatch(clearSkillImagePath());
		};
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
				<Box sx={{ display: "flex" }}>
					<IconButton
						aria-label="add"
						color="primary"
						onClick={handleUpdateSkill}
					>
						<Edit fontSize="large" />
					</IconButton>
					<IconButton
						aria-label="add"
						color="primary"
						onClick={handleDeleteSkill}
					>
						<Delete fontSize="large" />
					</IconButton>
				</Box>
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
				<Grid container spacing={3} marginBottom={3}>
					<Grid item xs={12} md={3}>
						<Typography
							variant="body2"
							color="textSecondary"
							component="h5"
							gutterBottom
						>
							Properties
						</Typography>

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
					{skill.effects.map((effect) => (
						<Grid item xs={12} sm={6} md={4}>
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