import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { ISkill } from "common/types";
import {
	CLASS_NAME_MAP,
	SKILL_TYPE_NAME_MAP,
	getSkillType,
} from "common/utils";

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
							Type
						</TableCell>
						<TableCell align="right">
							{SKILL_TYPE_NAME_MAP[getSkillType(skill)]}
						</TableCell>
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
						<TableCell align="right">{skill.price}g</TableCell>
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
