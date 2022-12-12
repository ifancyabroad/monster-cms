import {
	Box,
	Divider,
	Grid,
	IconButton,
	Paper,
	Typography,
} from "@mui/material";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	clearMonsterImagePath,
	deleteMonster,
	fetchMonsterImagePath,
	selectMonsterById,
	selectMonsterImagePath,
} from "../../features/monsters/monstersSlice";
import {
	getAuxillaryResistancesArray,
	getElementalResistancesArray,
	getPhysicalResistancesArray,
	getStatsArray,
} from "../../utils";
import { StatsTable } from "./StatsTable";
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	openConfirmationModal,
	openMonsterModal,
} from "../../features/modals/modalsSlice";
import { ConfirmationModal } from "../Modals";

interface IRouteParams {
	id: string;
}

export const Monster: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const monster = useSelector(selectMonsterById)(id);
	const monsterImagePath = useSelector(selectMonsterImagePath);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.monsters.status === "loading"
	);

	useEffect(() => {
		if (monster?.portrait) {
			dispatch(fetchMonsterImagePath(monster));
		}

		return () => {
			dispatch(clearMonsterImagePath());
		};
	}, [dispatch, monster]);

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
				<Box sx={{ display: "flex" }}>
					<IconButton
						aria-label="add"
						color="primary"
						onClick={handleUpdateMonster}
					>
						<Edit fontSize="large" />
					</IconButton>
					<IconButton
						aria-label="add"
						color="primary"
						onClick={handleDeleteMonster}
					>
						<Delete fontSize="large" />
					</IconButton>
				</Box>
			</Box>
			{monsterImagePath && (
				<Box
					component="img"
					sx={{
						marginBottom: 3,
						maxWidth: "100%",
					}}
					src={monsterImagePath}
					alt={monster.name}
				/>
			)}

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
							<Fragment>
								<Box
									key={stat.key}
									sx={{ textAlign: "center", flex: 1 }}
								>
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
				<Grid container spacing={3}>
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
