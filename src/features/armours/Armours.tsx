import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "common/hooks";
import { AuthContext } from "common/context/AuthContext";
import { openArmourModal } from "features/modals";
import { ArmoursTable } from "common/components";

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
					<Button
						variant="contained"
						color="secondary"
						onClick={handleOpenArmourModal}
					>
						Add Armour
					</Button>
				)}
			</Box>
			<ArmoursTable />
		</div>
	);
};
