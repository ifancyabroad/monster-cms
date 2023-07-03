import { Box, Typography } from "@mui/material";
import { IDamageEffect } from "common/types";
import { RESISTANCES_NAME_MAP } from "common/utils";

export const DamageEffect: React.FC<IDamageEffect> = ({
	damageType,
	min,
	max,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Damage Type:{" "}
				</Box>
				{RESISTANCES_NAME_MAP[damageType]}
			</Typography>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Damage:{" "}
				</Box>
				{min}-{max}
			</Typography>
		</Box>
	);
};
