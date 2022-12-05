import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Fragment, useState } from "react";
import {
	Box,
	createStyles,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from "@material-ui/core";
import { IDamageEffect } from "../../../types";
import { EffectType, Stat } from "../../../enums";
import { STATS, STATS_NAME_MAP } from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dropdown: {
			marginRight: theme.spacing(2),
			width: "30ch",
			"&:last-of-type": {
				marginRight: theme.spacing(0),
			},
		},
		numberField: {
			marginRight: theme.spacing(2),
			width: "20ch",
			"&:last-of-type": {
				marginRight: theme.spacing(0),
			},
		},
	})
);

const defaultFormValues: IDamageEffect = {
	type: EffectType.Damage,
	modifier: Stat.Strength,
	multiplier: 1,
	min: 1,
	max: 6,
};

export const DamageEffect: React.FC = () => {
	const classes = useStyles();
	const [formValues, setFormValues] = useState(defaultFormValues);

	const handleChange = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name as string]: value,
		});
	};

	return (
		<Fragment>
			<Box my={3}>
				<DialogContentText component="h6">
					Effect Properties
				</DialogContentText>
				<Box display="flex">
					<FormControl className={classes.dropdown}>
						<InputLabel id="modifier-label">Modifier</InputLabel>
						<Select
							labelId="modifier-label"
							name="modifier"
							value={formValues.modifier}
							onChange={handleChange}
						>
							{STATS.map((stat) => (
								<MenuItem value={stat}>
									{STATS_NAME_MAP[stat]}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
			<Box my={3}>
				<Box display="flex" flexWrap="wrap">
					<TextField
						margin="dense"
						name="multiplier"
						label="Multiplier"
						type="number"
						value={formValues.multiplier}
						onChange={handleChange}
						className={classes.numberField}
						required
						inputProps={{
							min: 0,
							max: 99,
						}}
					/>
					<TextField
						margin="dense"
						name="min"
						label="Minimum Roll"
						type="number"
						value={formValues.min}
						onChange={handleChange}
						className={classes.numberField}
						required
						inputProps={{
							min: 1,
							max: 99,
						}}
					/>
					<TextField
						margin="dense"
						name="max"
						label="Maximum Roll"
						type="number"
						value={formValues.max}
						onChange={handleChange}
						className={classes.numberField}
						required
						inputProps={{
							min: 1,
							max: 99,
						}}
					/>
				</Box>
			</Box>
		</Fragment>
	);
};
