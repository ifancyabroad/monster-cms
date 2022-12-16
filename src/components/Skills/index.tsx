import { Typography } from "@mui/material";
import { SkillsTable } from "./SkillsTable";

export const Skills: React.FC = () => {
	return (
		<div>
			<Typography variant="h2" gutterBottom>
				Skills
			</Typography>
			<SkillsTable />
		</div>
	);
};
