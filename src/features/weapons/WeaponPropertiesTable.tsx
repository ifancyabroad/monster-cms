import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { IWeapon } from "common/types";
import {
	EQUIPMENT_TYPE_NAME_MAP,
	RESISTANCES_NAME_MAP,
	WEAPON_SIZE_NAME_MAP,
} from "common/utils";

export const WeaponPropertiesTable: React.FC<IWeapon> = (weapon) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="weapon properties table">
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
							{EQUIPMENT_TYPE_NAME_MAP[weapon.weaponType]}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Size
						</TableCell>
						<TableCell align="right">
							{WEAPON_SIZE_NAME_MAP[weapon.size]}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Damage Type
						</TableCell>
						<TableCell align="right">
							{RESISTANCES_NAME_MAP[weapon.damageType]}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Damage
						</TableCell>
						<TableCell align="right">
							{weapon.min}-{weapon.max}
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
						<TableCell align="right">{weapon.level}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							component="th"
							scope="row"
							sx={{ fontWeight: "medium" }}
						>
							Price
						</TableCell>
						<TableCell align="right">{weapon.price}g</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
