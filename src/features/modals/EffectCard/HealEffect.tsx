import { Box, Typography } from "@mui/material";
import { IHealEffect } from "common/types";

export const HealEffect: React.FC<IHealEffect> = ({ target, min, max }) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Target:{" "}
				</Box>
				{target}
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
