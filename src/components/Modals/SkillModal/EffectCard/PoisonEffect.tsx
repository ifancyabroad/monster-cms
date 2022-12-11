import { Typography } from "@mui/material";
import { IPoisonEffect } from "../../../../types";

export const PoisonEffect: React.FC<IPoisonEffect> = ({
	damage,
	accuracy,
	duration,
}) => {
	return (
		<Typography variant="body2" component="p">
			damage: {damage}, accuracy: {accuracy}, duration: {duration}
		</Typography>
	);
};
