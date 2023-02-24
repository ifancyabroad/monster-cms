import { Fragment } from "react";
import { Box, DialogContentText, Grid, TextField } from "@mui/material";
import { useEffectContext } from "common/context";
import { MAX_MULTIPLIER } from "common/utils";

export const WeaponDamageEffect: React.FC = () => {
	const {
		state: { weaponDamageEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;

		dispatch({
			type: "UPDATE",
			payload: {
				...weaponDamageEffectForm,
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
					<Grid item xs={6} md={4}>
						<TextField
							fullWidth
							margin="dense"
							name="multiplier"
							label={`Multiplier (0-${MAX_MULTIPLIER})`}
							type="number"
							value={weaponDamageEffectForm.multiplier}
							onChange={handleChange}
							required
							inputProps={{
								min: 0,
								max: MAX_MULTIPLIER,
								step: ".01",
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	);
};
