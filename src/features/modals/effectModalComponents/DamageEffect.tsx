import { Fragment } from "react";
import {
	Box,
	DialogContentText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import {
	MAX_DAMAGE,
	MAX_MULTIPLIER,
	RESISTANCES,
	RESISTANCES_NAME_MAP,
	STATS,
	STATS_NAME_MAP,
} from "common/utils";
import { useEffectContext } from "common/context";

export const DamageEffect: React.FC = () => {
	const {
		state: { damageEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;

		dispatch({
			type: "UPDATE",
			payload: {
				...damageEffectForm,
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
							label="Modifier"
							name="modifier"
							value={damageEffectForm.modifier}
							onChange={handleChange}
						>
							{STATS.map((stat) => (
								<MenuItem key={stat} value={stat}>
									{STATS_NAME_MAP[stat]}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							select
							margin="dense"
							label="Damage Type"
							name="damageType"
							value={damageEffectForm.damageType}
							onChange={handleChange}
						>
							{RESISTANCES.map((resistance) => (
								<MenuItem key={resistance} value={resistance}>
									{RESISTANCES_NAME_MAP[resistance]}
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
							label={`Minimum Roll (1-${MAX_DAMAGE})`}
							type="number"
							value={damageEffectForm.min}
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
							label={`Maximum Roll (1-${MAX_DAMAGE})`}
							type="number"
							value={damageEffectForm.max}
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
							name="multiplier"
							label={`Multiplier (0-${MAX_MULTIPLIER})`}
							type="number"
							value={damageEffectForm.multiplier}
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
