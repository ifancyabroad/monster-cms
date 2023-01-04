import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { AuthContext } from "../../context/AuthContext";
import { openMonsterModal } from "../../features/modals/modalsSlice";
import { MonstersTable } from "../MonstersTable";

export const Monsters: React.FC = () => {
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();

	const handleOpenMonsterModal = () => {
		dispatch(openMonsterModal());
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
				<Typography variant="h2">Monsters</Typography>

				{user && (
					<Button
						variant="contained"
						onClick={handleOpenMonsterModal}
					>
						Add Monster
					</Button>
				)}
			</Box>
			<MonstersTable />
		</div>
	);
};
