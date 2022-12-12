import { Fragment } from "react";
import { Box, DialogContentText, MenuItem, TextField } from "@mui/material";
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
				<Box>
					<TextField
						sx={{
							width: "30ch",
						}}
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
				</Box>
			</Box>
			<Box my={3}>
				<Box
					sx={{
						display: "flex",
					}}
				>
					<TextField
						sx={{
							marginRight: 2,
							width: "30ch",
						}}
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
					<TextField
						sx={{
							width: "30ch",
						}}
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
				</Box>
			</Box>
		</Fragment>
	);
};
