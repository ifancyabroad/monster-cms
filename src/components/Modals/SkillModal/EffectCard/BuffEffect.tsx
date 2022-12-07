import { Typography } from "@material-ui/core";
import { IBuffEffect } from "../../../../types";

export const BuffEffect: React.FC<IBuffEffect> = ({
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
