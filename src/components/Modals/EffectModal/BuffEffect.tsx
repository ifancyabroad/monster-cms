import TextField from "@material-ui/core/TextField";
import { Fragment, useState } from "react";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { getResistancesArray, getStatsArray } from "../../../utils";
import { StatGroup } from "../common";
import { DamageType, Stat } from "../../../enums";
import { TDamageTypes, TStats } from "../../../types";
import { useEffectContext } from "./effectContext";

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

export const BuffEffect: React.FC = () => {
	const classes = useStyles();
	const {
		state: { buffEffectForm },
		dispatch,
	} = useEffectContext();
	const [stats, setStats] = useState<TStats>({
		[Stat.Strength]: 0,
		[Stat.Dexterity]: 0,
		[Stat.Constitution]: 0,
		[Stat.Intelligence]: 0,
		[Stat.Wisdom]: 0,
		[Stat.Charisma]: 0,
	});
	const [resistances, setResistances] = useState<TDamageTypes>({
		[DamageType.Slashing]: 0,
		[DamageType.Crushing]: 0,
		[DamageType.Piercing]: 0,
		[DamageType.Cold]: 0,
		[DamageType.Fire]: 0,
		[DamageType.Lighting]: 0,
		[DamageType.Radiant]: 0,
		[DamageType.Necrotic]: 0,
		[DamageType.Poison]: 0,
		[DamageType.Acid]: 0,
	});

	const handleChange = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const { name, value } = e.target;
		dispatch({
			type: buffEffectForm.type,
			payload: {
				...buffEffectForm,
				[name as string]: value,
			},
		});
	};

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;

		setStats({
			...stats,
			[name as string]: value,
		});

		const newStats = {
			...buffEffectForm.modifiers.stats,
			[name as string]: value,
		};

		Object.keys(newStats).forEach((key) => {
			if (!newStats[key as Stat]) {
				delete newStats[key as Stat];
			}
		});

		dispatch({
			type: buffEffectForm.type,
			payload: {
				...buffEffectForm,
				modifiers: {
					...buffEffectForm.modifiers,
					stats: newStats,
				},
			},
		});
	};

	const handleChangeResistances = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.currentTarget;

		setResistances({
			...resistances,
			[name as string]: value,
		});

		const newResistances = {
			...buffEffectForm.modifiers.resistances,
			[name as string]: value,
		};

		Object.keys(newResistances).forEach((key) => {
			if (!newResistances[key as DamageType]) {
				delete newResistances[key as DamageType];
			}
		});

		dispatch({
			type: buffEffectForm.type,
			payload: {
				...buffEffectForm,
				modifiers: {
					...buffEffectForm.modifiers,
					resistances: newResistances,
				},
			},
		});
	};

	return (
		<Fragment>
			<Box my={3}>
				<StatGroup
					title="Stats"
					stats={getStatsArray(stats)}
					min={0}
					max={30}
					handleChange={handleChangeStats}
				/>
				<StatGroup
					title="Resistances"
					stats={getResistancesArray(resistances)}
					min={0}
					max={100}
					handleChange={handleChangeResistances}
				/>
			</Box>
			<Box my={3}>
				<Box display="flex" flexWrap="wrap">
					<TextField
						margin="dense"
						name="accuracy"
						label="Accuracy"
						type="number"
						value={buffEffectForm.accuracy}
						onChange={handleChange}
						className={classes.numberField}
						required
						inputProps={{
							min: 1,
							max: 100,
						}}
					/>
					<TextField
						margin="dense"
						name="duration"
						label="Duration"
						type="number"
						value={buffEffectForm.duration}
						onChange={handleChange}
						className={classes.numberField}
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
