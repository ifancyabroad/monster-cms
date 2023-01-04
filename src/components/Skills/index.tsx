import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { AuthContext } from "../../context/AuthContext";
import { openSkillModal } from "../../features/modals/modalsSlice";
import { SkillsTable } from "../SkillsTable";

export const Skills: React.FC = () => {
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();

	const handleOpenSkillModal = () => {
		dispatch(openSkillModal());
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
				<Typography variant="h2">Skills</Typography>

				{user && (
					<Button variant="contained" onClick={handleOpenSkillModal}>
						Add Skill
					</Button>
				)}
			</Box>
			<SkillsTable />
		</div>
	);
};
