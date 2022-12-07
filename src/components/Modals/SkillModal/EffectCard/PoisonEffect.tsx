import { Typography } from "@material-ui/core";
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
