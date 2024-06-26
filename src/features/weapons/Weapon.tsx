import {
	Box,
	Divider,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { useContext } from "react";
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
import { EffectCard, PropertyCard } from "common/components";
import { AuthContext } from "common/context";
import { deleteWeapon, selectWeaponById } from "./weaponsSlice";
import { EquipmentIcon } from "features/equipment";

interface IRouteParams {
	id: string;
}

export const Weapon: React.FC = () => {
	const dispatch = useAppDispatch();
	let { id } = useParams<IRouteParams>();
	const user = useContext(AuthContext);
	const weapon = useSelector(selectWeaponById)(id);
	const confirmationModalOpen = useAppSelector(
		(state) => state.modals.confirmationModalOpen
	);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

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
					<EquipmentIcon equipment={weapon} width={64} />

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
					Details
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
					Properties
				</Typography>
				{weapon.properties ? (
					<Stack
						direction="row"
						flexWrap="wrap"
						spacing={1}
						marginBottom={3}
					>
						{weapon.properties.map((property, index) => (
							<PropertyCard
								key={property.name + index}
								property={property}
							/>
						))}
					</Stack>
				) : (
					<Typography marginBottom={3}>No Properties</Typography>
				)}

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
					<Stack direction="row" flexWrap="wrap" spacing={1}>
						{weapon.effects.map((effect, index) => (
							<EffectCard
								key={`${effect.type}-${index}`}
								effect={effect}
							/>
						))}
					</Stack>
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
