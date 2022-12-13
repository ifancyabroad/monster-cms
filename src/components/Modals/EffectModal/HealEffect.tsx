import { Fragment } from "react";
import {
	Box,
	DialogContentText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { STATS, STATS_NAME_MAP } from "../../../utils";
import { useEffectContext } from "./effectContext";

export const HealEffect: React.FC = () => {
	const {
		state: { healEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		dispatch({
			type: healEffectForm.type,
			payload: {
				...healEffectForm,
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
							label="Modifier"
							name="modifier"
							value={healEffectForm.modifier}
							onChange={handleChange}
							disabled
						>
							{STATS.map((stat) => (
								<MenuItem key={stat} value={stat}>
									{STATS_NAME_MAP[stat]}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
			</Box>
			<Box my={3}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={4}>
						<TextField
							fullWidth
							margin="dense"
							name="min"
							label="Minimum Roll"
							type="number"
							value={healEffectForm.min}
							onChange={handleChange}
							required
							inputProps={{
								min: 1,
								max: 99,
							}}
						/>
					</Grid>
					<Grid item xs={6} md={4}>
						<TextField
							fullWidth
							margin="dense"
							name="max"
							label="Maximum Roll"
							type="number"
							value={healEffectForm.max}
							onChange={handleChange}
							required
							inputProps={{
								min: 1,
								max: 99,
							}}
						/>
					</Grid>
					<Grid item xs={6} md={4}>
						<TextField
							fullWidth
							margin="dense"
							name="multiplier"
							label="Multiplier"
							type="number"
							value={healEffectForm.multiplier}
							onChange={handleChange}
							required
							inputProps={{
								min: 0,
								max: 99,
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	);
};
