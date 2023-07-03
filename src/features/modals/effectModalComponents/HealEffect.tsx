import { Box, DialogContentText, Grid, TextField } from "@mui/material";
import { MAX_DAMAGE } from "common/utils";
import { useEffectContext } from "common/context";

export const HealEffect: React.FC = () => {
	const {
		state: { healEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;

		dispatch({
			type: "UPDATE",
			payload: {
				...healEffectForm,
				[name as string]: finalValue,
			},
		});
	};

	return (
		<Box my={3}>
			<DialogContentText variant="subtitle1" component="h5" gutterBottom>
				Effect Properties
			</DialogContentText>
			<Grid container spacing={2}>
				<Grid item xs={6} md={4}>
					<TextField
						fullWidth
						margin="dense"
						name="min"
						label={`Min Roll (1-${MAX_DAMAGE})`}
						type="number"
						value={healEffectForm.min}
						onChange={handleChange}
						required
						inputProps={{
							min: 1,
							max: MAX_DAMAGE,
						}}
					/>
				</Grid>
				<Grid item xs={6} md={4}>
					<TextField
						fullWidth
						margin="dense"
						name="max"
						label={`Max Roll (1-${MAX_DAMAGE})`}
						type="number"
						value={healEffectForm.max}
						onChange={handleChange}
						required
						inputProps={{
							min: 1,
							max: MAX_DAMAGE,
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
