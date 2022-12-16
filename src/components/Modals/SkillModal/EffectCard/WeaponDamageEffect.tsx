import { Box, Typography } from "@mui/material";
import { IWeaponDamageEffect } from "../../../../types";

export const WeaponDamageEffect: React.FC<IWeaponDamageEffect> = ({
	multiplier,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Multiplier:{" "}
				</Box>
				x{multiplier}
			</Typography>
		</Box>
	);
};
