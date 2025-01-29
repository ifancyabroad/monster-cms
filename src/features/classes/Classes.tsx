import { Box, Button, Typography } from "@mui/material";
import { ClassesTable } from "common/components";
import { AuthContext } from "common/context";
import { useAppDispatch } from "common/hooks";
import { openClassModal } from "features/modals";
import { useContext } from "react";

export const Classes: React.FC = () => {
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();

	const handleOpenClassModal = () => {
		dispatch(openClassModal());
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
						onClick={handleOpenClassModal}
					>
						Add Monster
					</Button>
				)}
			</Box>
			<ClassesTable />
		</div>
	);
};
