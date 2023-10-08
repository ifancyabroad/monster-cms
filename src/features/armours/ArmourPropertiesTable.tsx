import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { IArmour } from "common/types";
import { ARMOUR_TYPE_NAME_MAP, EQUIPMENT_TYPE_NAME_MAP } from "common/utils";

export const ArmourPropertiesTable: React.FC<IArmour> = (armour) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="armour properties table">
				<TableBody>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Type
						</TableCell>
						<TableCell align="right">
							{EQUIPMENT_TYPE_NAME_MAP[armour.type]}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Armour Type
						</TableCell>
						<TableCell align="right">
							{ARMOUR_TYPE_NAME_MAP[armour.armourType]}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Defence
						</TableCell>
						<TableCell align="right">{armour.defence}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Level
						</TableCell>
						<TableCell align="right">{armour.level}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Price
						</TableCell>
						<TableCell align="right">{armour.price}g</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
