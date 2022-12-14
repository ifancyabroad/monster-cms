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
		<TableContainer component={Paper} sx={{ maxWidth: 250 }}>
			<Table aria-label="skill properties table">
				<TableBody>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: 500 }}
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
							sx={{ fontWeight: 500 }}
						>
							Level
						</TableCell>
						<TableCell align="right">{skill.level}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: 500 }}
						>
							Price
						</TableCell>
						<TableCell align="right">{skill.price}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: 500, border: 0 }}
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
