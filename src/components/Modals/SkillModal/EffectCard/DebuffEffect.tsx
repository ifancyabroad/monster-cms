import { Typography } from "@material-ui/core";
import { IDebuffEffect } from "../../../../types";

export const DebuffEffect: React.FC<IDebuffEffect> = ({
	modifiers,
	accuracy,
	duration,
}) => {
	return (
		<Typography variant="body2" component="p">
			accuracy: {accuracy}, duration: {duration}
		</Typography>
	);
};
