import { Typography } from "@mui/material";
import { IHealEffect } from "../../../../types";

export const HealEffect: React.FC<IHealEffect> = ({
	modifier,
	multiplier,
	min,
	max,
}) => {
	return (
		<Typography variant="body2" component="p">
			modifier: {modifier}, multiplier: {multiplier}, minimum: {min},
			maximum: {max}
		</Typography>
	);
};
