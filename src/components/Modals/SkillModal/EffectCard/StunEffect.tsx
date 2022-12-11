import { Typography } from "@mui/material";
import { IStunEffect } from "../../../../types";

export const StunEffect: React.FC<IStunEffect> = ({ accuracy, duration }) => {
	return (
		<Typography variant="body2" component="p">
			accuracy: {accuracy}, duration: {duration}
		</Typography>
	);
};
