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
	openConfirmationModal,
	openWeaponModal,
} from "features/modals";
import { WeaponPropertiesTable } from "./WeaponPropertiesTable";
import { EffectCard, StatsTable } from "common/components";
import { AuthContext } from "common/context";
import {
	deleteWeapon,
	fetchWeaponImagePath,
	selectWeaponById,
	selectWeaponImagePathById,
} from "./weaponsSlice";
import {
	getPartialAuxiliaryStatsArray,
	getPartialResistancesArray,
	getPartialStatsArray,
} from "common/utils";

interface IRouteParams {
	id: string;
}

export const Weapon: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const weapon = useSelector(selectWeaponById)(id);
	const weaponImagePath = useSelector(selectWeaponImagePathById)(id);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

	useEffect(() => {
		if (weapon?.icon) {
			dispatch(fetchWeaponImagePath(weapon));
		}
	}, [dispatch, weapon]);

	if (!weapon) {
		return null;
	}

	const handleUpdate = () => {
		dispatch(openWeaponModal(weapon));
	};

	const handleDelete = async () => {
		dispatch(openConfirmationModal());
	};

	const handleCloseConfirmationModal = () => {
		dispatch(closeConfirmationModal());
	};

	const handleConfirmDelete = async () => {
		try {
			await dispatch(deleteWeapon(weapon)).unwrap();
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
				<Typography variant="h2">{weapon.name}</Typography>
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
				) : weaponImagePath ? (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src={weaponImagePath}
						alt={weapon.name}
					/>
				) : (
					<Box
						component="img"
						sx={{
							maxWidth: "100%",
							verticalAlign: "middle",
						}}
						src="https://via.placeholder.com/600"
						alt={weapon.name}
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
					{weapon.description || "No description available."}
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
						<WeaponPropertiesTable {...weapon} />
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

				{weapon.modifiers ? (
					<Grid container spacing={3} marginBottom={3}>
						{weapon.modifiers.resistances && (
							<Grid item xs={12} md={3} lg={4}>
								<StatsTable
									title="Resistances"
									suffix="%"
									stats={getPartialResistancesArray(
										weapon.modifiers.resistances
									)}
								/>
							</Grid>
						)}
						{weapon.modifiers.stats && (
							<Grid item xs={12} md={3} lg={4}>
								<StatsTable
									title="Stats"
									stats={getPartialStatsArray(
										weapon.modifiers.stats
									)}
									max={10}
								/>
							</Grid>
						)}
						{weapon.modifiers.auxiliaryStats && (
							<Grid item xs={12} md={3} lg={4}>
								<StatsTable
									title="Auxiliary Stats"
									stats={getPartialAuxiliaryStatsArray(
										weapon.modifiers.auxiliaryStats
									)}
									max={10}
								/>
							</Grid>
						)}
					</Grid>
				) : (
					<Typography>No weapon bonuses</Typography>
				)}
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

				{weapon.effects ? (
					<Grid container spacing={2}>
						{weapon.effects.map((effect, index) => (
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
				) : (
					<Typography>No weapon effects</Typography>
				)}
			</Box>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${weapon.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</div>
	);
};
