import { Box, Typography } from "@mui/material";
import { IDamageEffect } from "common/types";
import { RESISTANCES_NAME_MAP, STATS_NAME_MAP } from "common/utils";

export const DamageEffect: React.FC<IDamageEffect> = ({
	damageType,
	modifier,
	multiplier,
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
					Modifier:{" "}
				</Box>
				{STATS_NAME_MAP[modifier]}
			</Typography>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Multiplier:{" "}
				</Box>
				x{multiplier}
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
