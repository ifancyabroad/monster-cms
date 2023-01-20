import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { AuthContext } from "../../context/AuthContext";
import { openWeaponModal } from "../../features/modals/modalsSlice";
import { WeaponsTable } from "../WeaponsTable";

export const Weapons: React.FC = () => {
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();

	const handleOpenWeaponModal = () => {
		dispatch(openWeaponModal());
	};

	return (
		<div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
					gap: 1,
					marginBottom: 2,
				}}
			>
				<Typography variant="h2">Weapons</Typography>

				{user && (
					<Button variant="contained" onClick={handleOpenWeaponModal}>
						Add Weapon
					</Button>
				)}
			</Box>
			<WeaponsTable />
		</div>
	);
};
