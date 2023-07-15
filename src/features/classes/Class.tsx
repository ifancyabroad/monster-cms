import {
	Box,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	Paper,
	Typography,
} from "@mui/material";
import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { deleteClass, selectClassById } from "./classesSlice";
import { EQUIPMENT_SLOTS, getStatsArray, hasEquipment } from "common/utils";
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	openConfirmationModal,
	openClassModal,
} from "features/modals";
import { ConfirmationModal } from "features/modals";
import { AuthContext } from "common/context";
import { SkillCard } from "features/skills";
import { EquipmentCard } from "features/equipment";

interface IRouteParams {
	id: string;
}

export const Class: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const characterClass = useSelector(selectClassById)(id);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.classes.status === "loading"
	);

	if (!characterClass) {
		return null;
	}

	const handleUpdateClass = () => {
		dispatch(openClassModal(characterClass));
	};

	const handleDeleteClass = async () => {
		dispatch(openConfirmationModal());
	};

	const handleCloseConfirmationModal = () => {
		dispatch(closeConfirmationModal());
	};

	const handleConfirmDeleteClass = async () => {
		try {
			await dispatch(deleteClass(characterClass)).unwrap();
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
				<Typography variant="h2">{characterClass.name}</Typography>
				{user && (
					<Box sx={{ display: "flex" }}>
						<IconButton
							aria-label="add"
							color="secondary"
							onClick={handleUpdateClass}
						>
							<Edit fontSize="large" />
						</IconButton>
						<IconButton
							aria-label="add"
							color="warning"
							onClick={handleDeleteClass}
						>
							<Delete fontSize="large" />
						</IconButton>
					</Box>
				)}
			</Box>
			<Box
				sx={{
					marginBottom: 3,
					width: "100%",
					maxWidth: 600,
					aspectRatio: "1/1",
				}}
			>
				{isLoading ? (
					<Box
						sx={{
							height: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CircularProgress />
					</Box>
				) : characterClass.portrait ? (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src={characterClass.portrait}
						alt={characterClass.name}
					/>
				) : (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src="https://via.placeholder.com/600"
						alt={characterClass.name}
					/>
				)}
			</Box>

			<Box marginBottom={4}>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Description
				</Typography>
				<Typography variant="h5" paragraph>
					{characterClass.description || "No description available."}
				</Typography>
				<Divider />
			</Box>

			<Box marginBottom={4}>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Attributes
				</Typography>
				<Paper
					sx={{
						marginBottom: 3,
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-around",
							flexWrap: {
								xs: "wrap",
								lg: "nowrap",
							},
							gridGap: 16,
							padding: 2,
						}}
					>
						{getStatsArray(characterClass.stats).map((stat) => (
							<Fragment key={stat.key}>
								<Box sx={{ textAlign: "center", flex: 1 }}>
									<Typography>{stat.name}</Typography>
									<Typography variant="h5" component="p">
										{stat.value}
									</Typography>
								</Box>

								<Divider
									sx={{
										display: { xs: "none", lg: "block" },
										"&:last-child": { display: "none" },
									}}
									orientation="vertical"
									flexItem
								/>
							</Fragment>
						))}
					</Box>
				</Paper>
				<Divider />
			</Box>

			<Box marginBottom={4}>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Starting Equipment
				</Typography>
				<Grid
					container
					spacing={2}
					sx={{
						marginBottom: 3,
					}}
				>
					{EQUIPMENT_SLOTS.map((slot) => {
						const equipment =
							characterClass.equipment &&
							characterClass.equipment[slot];

						if (equipment) {
							return (
								<Grid key={slot} item xs={12} md={6} lg={3}>
									<EquipmentCard id={equipment} slot={slot} />
								</Grid>
							);
						}

						return null;
					})}
				</Grid>
				{!hasEquipment(characterClass.equipment) && (
					<Typography
						sx={{
							marginBottom: 3,
						}}
					>
						No equipment
					</Typography>
				)}
				<Divider />
			</Box>

			<Box marginBottom={4}>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Starting Skills
				</Typography>
				<Grid container spacing={2}>
					{characterClass.skills.map((skill) => (
						<Grid key={skill} item xs={12} md={6} lg={3}>
							<SkillCard id={skill} />
						</Grid>
					))}
				</Grid>
			</Box>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${characterClass.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDeleteClass}
				disabled={isLoading}
			/>
		</div>
	);
};
