import {
	Box,
	Divider,
	Grid,
	IconButton,
	Paper,
	Typography,
} from "@mui/material";
import { Fragment, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	deleteMonster,
	fetchMonsterImagePath,
	selectMonsterById,
	selectMonsterImagePathById,
} from "../../features/monsters/monstersSlice";
import {
	getAuxillaryResistancesArray,
	getElementalResistancesArray,
	getPhysicalResistancesArray,
	getStatsArray,
} from "../../utils";
import { StatsTable } from "../StatsTable";
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	openConfirmationModal,
	openMonsterModal,
} from "../../features/modals/modalsSlice";
import { ConfirmationModal } from "../Modals";
import { AuthContext } from "../../context/AuthContext";
import { SkillCard } from "../SkillCard";

interface IRouteParams {
	id: string;
}

export const Monster: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const monster = useSelector(selectMonsterById)(id);
	const monsterImagePath = useSelector(selectMonsterImagePathById)(id);
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
			{monsterImagePath && (
				<Box
					component="img"
					sx={{
						marginBottom: 3,
						maxWidth: "100%",
						maxHeight: 600,
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
							suffix="%"
							stats={getPhysicalResistancesArray(
								monster.resistances
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<StatsTable
							title="Elemental"
							suffix="%"
							stats={getElementalResistancesArray(
								monster.resistances
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<StatsTable
							title="Auxillary"
							suffix="%"
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
					Skills
				</Typography>
				<Grid container spacing={2}>
					{monster.skills.map((skill) => (
						<Grid key={skill} item xs={12} md={6} lg={3}>
							<SkillCard key={skill} id={skill} />
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
