import { Typography } from "@mui/material";
import { MonstersTable } from "../MonstersTable";

export const Monsters: React.FC = () => {
	return (
		<div>
			<Typography variant="h2" gutterBottom>
				Monsters
			</Typography>
			<MonstersTable />
		</div>
	);
};
