import {
	Box,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	ConfirmationModal,
	openArmourModal,
	openConfirmationModal,
} from "features/modals";
import { ArmourPropertiesTable } from "./ArmourPropertiesTable";
import { AuthContext } from "common/context";
import { StatsTable } from "common/components";
import {
	getPartialAuxiliaryStatsArray,
	getPartialResistancesArray,
	getPartialStatsArray,
} from "common/utils";
import {
	deleteArmour,
	fetchArmourImagePath,
	selectArmourById,
	selectArmourImagePathById,
} from "./armoursSlice";

interface IRouteParams {
	id: string;
}

export const Armour: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const armour = useSelector(selectArmourById)(id);
	const armourImagePath = useSelector(selectArmourImagePathById)(id);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

	useEffect(() => {
		if (armour?.icon) {
			dispatch(fetchArmourImagePath(armour));
		}
	}, [dispatch, armour]);

	if (!armour) {
		return null;
	}

	const handleUpdate = () => {
		dispatch(openArmourModal(armour));
	};

	const handleDelete = async () => {
		dispatch(openConfirmationModal());
	};

	const handleCloseConfirmationModal = () => {
		dispatch(closeConfirmationModal());
	};

	const handleConfirmDelete = async () => {
		try {
			await dispatch(deleteArmour(armour)).unwrap();
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
				<Typography variant="h2">{armour.name}</Typography>
				{user && (
					<Box sx={{ display: "flex" }}>
						<IconButton
							aria-label="add"
							color="secondary"
							onClick={handleUpdate}
						>
							<Edit fontSize="large" />
						</IconButton>
						<IconButton
							aria-label="add"
							color="warning"
							onClick={handleDelete}
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
				) : armourImagePath ? (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src={armourImagePath}
						alt={armour.name}
					/>
				) : (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src="https://via.placeholder.com/600"
						alt={armour.name}
					/>
				)}
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
					Description
				</Typography>
				<Typography variant="h5" paragraph>
					{armour.description || "No description available."}
				</Typography>
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
					<Grid item xs={12} md={4}>
						<ArmourPropertiesTable {...armour} />
					</Grid>
				</Grid>
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
					Resistances/Bonuses
				</Typography>
				{armour.modifiers ? (
					<Grid container spacing={3} marginBottom={3}>
						{armour.modifiers.resistances && (
							<Grid item xs={12} md={3} lg={4}>
								<StatsTable
									title="Resistances"
									suffix="%"
									stats={getPartialResistancesArray(
										armour.modifiers.resistances
									)}
								/>
							</Grid>
						)}
						{armour.modifiers.stats && (
							<Grid item xs={12} md={3} lg={4}>
								<StatsTable
									title="Stats"
									stats={getPartialStatsArray(
										armour.modifiers.stats
									)}
									max={10}
								/>
							</Grid>
						)}
						{armour.modifiers.auxiliaryStats && (
							<Grid item xs={12} md={3} lg={4}>
								<StatsTable
									title="Auxiliary Stats"
									stats={getPartialAuxiliaryStatsArray(
										armour.modifiers.auxiliaryStats
									)}
									max={10}
								/>
							</Grid>
						)}
					</Grid>
				) : (
					<Typography>No armour bonuses</Typography>
				)}
			</Box>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${armour.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</div>
	);
};
