import { Fragment } from "react";
import {
	Box,
	DialogContentText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { useEffectContext } from "./effectContext";
import {
	AUXILIARY_EFFECTS,
	AUXILIARY_EFFECTS_NAME_MAP,
	MAX_DURATION,
} from "../../../utils";

export const AuxiliaryEffect: React.FC = () => {
	const {
		state: { auxiliaryEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;

		dispatch({
			type: "UPDATE",
			payload: {
				...auxiliaryEffectForm,
				[name as string]: finalValue,
			},
		});
	};

	return (
		<Fragment>
			<Box my={3}>
				<DialogContentText
					variant="subtitle1"
					component="h5"
					gutterBottom
				>
					Effect Properties
				</DialogContentText>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							select
							margin="dense"
							label="Type"
							name="effect"
							value={auxiliaryEffectForm.effect}
							onChange={handleChange}
						>
							{AUXILIARY_EFFECTS.map((effect) => (
								<MenuItem key={effect} value={effect}>
									{AUXILIARY_EFFECTS_NAME_MAP[effect]}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
			</Box>
			<Box my={3}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							margin="dense"
							name="accuracy"
							label="Accuracy (%)"
							type="number"
							value={auxiliaryEffectForm.accuracy}
							onChange={handleChange}
							required
							inputProps={{
								min: 1,
								max: 100,
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							margin="dense"
							name="duration"
							label={`Duration (1-${MAX_DURATION})`}
							type="number"
							value={auxiliaryEffectForm.duration}
							onChange={handleChange}
							required
							inputProps={{
								min: 1,
								max: MAX_DURATION,
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	);
};
