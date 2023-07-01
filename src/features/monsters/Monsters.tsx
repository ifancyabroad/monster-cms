import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "common/hooks";
import { AuthContext } from "common/context";
import { openMonsterModal } from "features/modals";
import { MonstersTable } from "common/components";

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
						color="secondary"
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
