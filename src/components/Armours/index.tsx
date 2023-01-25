import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { AuthContext } from "../../context/AuthContext";
import { openArmourModal } from "../../features/modals/modalsSlice";
import { ArmoursTable } from "../ArmourTable";

export const Armours: React.FC = () => {
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();

	const handleOpenArmourModal = () => {
		dispatch(openArmourModal());
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
				<Typography variant="h2">Armours</Typography>

				{user && (
					<Button variant="contained" onClick={handleOpenArmourModal}>
						Add Armour
					</Button>
				)}
			</Box>
			<ArmoursTable />
		</div>
	);
};
