import { Typography } from "@mui/material";
import { IAuxiliaryEffect } from "../../../../types";

export const AuxiliaryEffect: React.FC<IAuxiliaryEffect> = ({
	effect,
	accuracy,
	duration,
}) => {
	return (
		<Typography variant="body2" component="p">
			effect: {effect}, accuracy: {accuracy}, duration: {duration}
		</Typography>
	);
};
