import { Fragment } from "react";
import {
	Box,
	DialogContentText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { useEffectContext } from "common/context";
import {
	AUXILIARY_EFFECTS,
	AUXILIARY_EFFECTS_NAME_MAP,
	MAX_DURATION,
	STATS,
	STATS_NAME_MAP,
} from "common/utils";

export const AuxiliaryEffect: React.FC = () => {
	const {
		state: { auxiliaryEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;
		const payload = {
			...auxiliaryEffectForm,
			[name as string]: finalValue,
		};

		if (payload.modifier) {
			payload.difficulty = payload.difficulty ?? 15;
			dispatch({
				type: "UPDATE",
				payload,
			});
			return;
		}

		const { modifier, difficulty, ...updatedPayload } = payload;
		dispatch({
			type: "UPDATE",
			payload: updatedPayload,
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
			<Box my={3}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							select
							margin="dense"
							label="Modifier"
							name="modifier"
							value={auxiliaryEffectForm.modifier ?? ""}
							onChange={handleChange}
						>
							<MenuItem value="">None</MenuItem>
							{STATS.map((stat) => (
								<MenuItem key={stat} value={stat}>
									{STATS_NAME_MAP[stat]}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					{auxiliaryEffectForm.modifier && (
						<Grid item xs={6}>
							<TextField
								fullWidth
								margin="dense"
								name="difficulty"
								label="Difficulty (1-30)"
								type="number"
								value={auxiliaryEffectForm.difficulty}
								onChange={handleChange}
								required
								inputProps={{
									min: 1,
									max: 30,
								}}
							/>
						</Grid>
					)}
				</Grid>
			</Box>
		</Fragment>
	);
};
