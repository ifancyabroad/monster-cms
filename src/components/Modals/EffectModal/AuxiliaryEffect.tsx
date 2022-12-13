import { Fragment } from "react";
import {
	Box,
	DialogContentText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { useEffectContext } from "./effectContext";

export const AuxiliaryEffect: React.FC = () => {
	const {
		state: { auxiliaryEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		dispatch({
			type: auxiliaryEffectForm.type,
			payload: {
				...auxiliaryEffectForm,
				[name as string]: value,
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
							<MenuItem value="stun">Stun</MenuItem>
							<MenuItem value="poison">Poison</MenuItem>
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
							label="Accuracy"
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
							label="Duration"
							type="number"
							value={auxiliaryEffectForm.duration}
							onChange={handleChange}
							required
							inputProps={{
								min: 1,
								max: 100,
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	);
};
