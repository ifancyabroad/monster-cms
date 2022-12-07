import { Typography } from "@material-ui/core";
import { IDamageEffect } from "../../../../types";

export const DamageEffect: React.FC<IDamageEffect> = ({
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
