import { Typography } from "@mui/material";
import { IWeaponDamageEffect } from "../../../../types";

export const WeaponDamageEffect: React.FC<IWeaponDamageEffect> = ({
	multiplier,
}) => {
	return (
		<Typography variant="body2" component="p">
			multiplier: {multiplier}
		</Typography>
	);
};
