import { Box, Typography } from "@mui/material";
import { IAuxiliaryEffect } from "common/types";
import { AUXILIARY_EFFECTS_NAME_MAP } from "common/utils";

export const AuxiliaryEffect: React.FC<IAuxiliaryEffect> = ({
	effect,
	accuracy,
	duration,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Accuracy:{" "}
				</Box>
				{accuracy}%
			</Typography>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Duration:{" "}
				</Box>
				{duration} turns
			</Typography>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Effect:{" "}
				</Box>
				{AUXILIARY_EFFECTS_NAME_MAP[effect]}
			</Typography>
		</Box>
	);
};