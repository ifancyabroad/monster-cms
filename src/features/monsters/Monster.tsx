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
import { deleteMonster, selectMonsterById } from "./monstersSlice";
import {
	EQUIPMENT_SLOTS,
	getAuxillaryResistancesArray,
	getElementalResistancesArray,
	getPhysicalResistancesArray,
	getStatsArray,
	hasEquipment,
} from "common/utils";
import { StatsTable } from "common/components";
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	openConfirmationModal,
	openMonsterModal,
} from "features/modals";
import { ConfirmationModal } from "features/modals";
import { AuthContext } from "common/context";
import { SkillCard } from "features/skills";
import { EquipmentCard } from "features/equipment";

interface IRouteParams {
	id: string;
}

export const Monster: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const monster = useSelector(selectMonsterById)(id);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.monsters.status === "loading"
	);

	if (!monster) {
		return null;
	}

	const handleUpdateMonster = () => {
		dispatch(openMonsterModal(monster));
	};

	const handleDeleteMonster = async () => {
		dispatch(openConfirmationModal());
	};

	const handleCloseConfirmationModal = () => {
		dispatch(closeConfirmationModal());
	};

	const handleConfirmDeleteMonster = async () => {
		try {
			await dispatch(deleteMonster(monster)).unwrap();
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
				<Typography variant="h2">{monster.name}</Typography>
				{user && (
					<Box sx={{ display: "flex" }}>
						<IconButton
							aria-label="add"
							color="secondary"
							onClick={handleUpdateMonster}
						>
							<Edit fontSize="large" />
						</IconButton>
						<IconButton
							aria-label="add"
							color="warning"
							onClick={handleDeleteMonster}
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
				) : monster.portrait ? (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src={monster.portrait}
						alt={monster.name}
					/>
				) : (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src="https://via.placeholder.com/600"
						alt={monster.name}
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
					{monster.description || "No description available."}
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
						{getStatsArray(monster.stats).map((stat) => (
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
									}}
									orientation="vertical"
									flexItem
								/>
							</Fragment>
						))}

						<Box sx={{ textAlign: "center", flex: 1 }}>
							<Typography color="primary">Challenge</Typography>
							<Typography
								color="primary"
								variant="h5"
								component="p"
							>
								{monster.challenge}
							</Typography>
						</Box>
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
					Resistances
				</Typography>
				<Grid
					container
					spacing={3}
					sx={{
						marginBottom: 3,
					}}
				>
					<Grid item xs={12} sm={6} md={4}>
						<StatsTable
							title="Physical"
							stats={getPhysicalResistancesArray(
								monster.resistances
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<StatsTable
							title="Elemental"
							stats={getElementalResistancesArray(
								monster.resistances
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<StatsTable
							title="Auxillary"
							stats={getAuxillaryResistancesArray(
								monster.resistances
							)}
						/>
					</Grid>
				</Grid>
				<Divider />
			</Box>

			<Box marginBottom={4}>
				<Typography
					variant="body2"
					color="textSecondary"
					component="h5"
					gutterBottom
				>
					Equipment
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
							monster.equipment && monster.equipment[slot];

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
				{!hasEquipment(monster.equipment) && (
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
					Skills
				</Typography>
				<Grid container spacing={2}>
					{monster.skills.map((skill) => (
						<Grid key={skill} item xs={12} md={6} lg={3}>
							<SkillCard id={skill} />
						</Grid>
					))}
				</Grid>
			</Box>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${monster.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDeleteMonster}
				disabled={isLoading}
			/>
		</div>
	);
};
