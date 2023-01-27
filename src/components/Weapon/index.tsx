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
import { Delete, Edit } from "@mui/icons-material";
import {
	closeConfirmationModal,
	openConfirmationModal,
	openWeaponModal,
} from "../../features/modals/modalsSlice";
import { ConfirmationModal } from "../Modals";
import { WeaponPropertiesTable } from "./WeaponPropertiesTable";
import { EffectCard } from "../EffectCard";
import { AuthContext } from "../../context/AuthContext";
import {
	deleteWeapon,
	fetchWeaponImagePath,
	selectWeaponById,
	selectWeaponImagePathById,
} from "../../features/weapons/weaponsSlice";
import { StatsTable } from "../StatsTable";
import { getPartialResistancesArray, getPartialStatsArray } from "../../utils";

const Icon = styled("img")({
	width: "64px",
});

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
					{weaponImagePath && (
						<Icon src={weaponImagePath} alt={weapon.name} />
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
							{weapon.description || "No description available."}
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
					<Grid item xs={12} md={4}>
						<WeaponPropertiesTable {...weapon} />
					</Grid>
					{weapon.modifiers?.resistances && (
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
					{weapon.modifiers?.stats && (
						<Grid item xs={12} md={3} lg={4}>
							<StatsTable
								title="Stats"
								stats={getPartialStatsArray(
									weapon.modifiers.stats
								)}
							/>
						</Grid>
					)}
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
