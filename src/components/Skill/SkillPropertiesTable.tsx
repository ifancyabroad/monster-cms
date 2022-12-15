import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { ISkill } from "../../types";
import { CLASS_NAME_MAP } from "../../utils";

export const SkillPropertiesTable: React.FC<ISkill> = (skill) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="skill properties table">
				<TableBody>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Class
						</TableCell>
						<TableCell align="right">
							{CLASS_NAME_MAP[skill.class]}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Target
						</TableCell>
						<TableCell align="right">{skill.target}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Level
						</TableCell>
						<TableCell align="right">{skill.level}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Price
						</TableCell>
						<TableCell align="right">{skill.price}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium", border: 0 }}
						>
							Max Uses
						</TableCell>
						<TableCell align="right" sx={{ border: 0 }}>
							{skill.maxUses}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
