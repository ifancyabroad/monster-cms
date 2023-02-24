import { Box, Typography } from "@mui/material";
import { IHealEffect } from "common/types";
import { STATS_NAME_MAP } from "common/utils";

export const HealEffect: React.FC<IHealEffect> = ({
	modifier,
	multiplier,
	min,
	max,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Modifier:{" "}
				</Box>
				{STATS_NAME_MAP[modifier]}
			</Typography>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Multiplier:{" "}
				</Box>
				x{multiplier}
			</Typography>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Health:{" "}
				</Box>
				{min}-{max}
			</Typography>
		</Box>
	);
};
