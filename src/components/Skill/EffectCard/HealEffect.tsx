import { Box, Typography } from "@mui/material";
import { IHealEffect } from "../../../types";
import { STATS_NAME_MAP } from "../../../utils";

export const HealEffect: React.FC<IHealEffect> = ({
	modifier,
	multiplier,
	min,
	max,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
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
				{multiplier}
			</Typography>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Health:{" "}
				</Box>
				{min}-{max}
			</Typography>
		</Box>
	);
};
