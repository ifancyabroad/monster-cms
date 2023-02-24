import { Box, Typography } from "@mui/material";
import { IWeaponDamageEffect } from "common/types";

export const WeaponDamageEffect: React.FC<IWeaponDamageEffect> = ({
	multiplier,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Multiplier:{" "}
				</Box>
				x{multiplier}
			</Typography>
		</Box>
	);
};
