import { Fragment, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { getResistancesArray, getStatsArray } from "../../../utils";
import { StatGroup } from "../common";
import { DamageType, Stat } from "../../../enums";
import { TDamageTypes, TStats } from "../../../types";
import { useEffectContext } from "./effectContext";

const DEFAULT_STAT_VALUES = {
	[Stat.Strength]: 0,
	[Stat.Dexterity]: 0,
	[Stat.Constitution]: 0,
	[Stat.Intelligence]: 0,
	[Stat.Wisdom]: 0,
	[Stat.Charisma]: 0,
};

const DEFAULT_RESISTANCE_VALUES = {
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
};

export const StatusEffect: React.FC = () => {
	const {
		state: { statusEffectForm },
		dispatch,
	} = useEffectContext();
	const [stats, setStats] = useState<TStats>({
		...DEFAULT_STAT_VALUES,
		...statusEffectForm.modifiers.stats,
	});
	const [resistances, setResistances] = useState<TDamageTypes>({
		...DEFAULT_RESISTANCE_VALUES,
		...statusEffectForm.modifiers.resistances,
	});

	const handleChange = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const { name, value } = e.target;
		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
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
			...statusEffectForm.modifiers.stats,
			[name as string]: value,
		};

		Object.keys(newStats).forEach((key) => {
			if (!newStats[key as Stat]) {
				delete newStats[key as Stat];
			}
		});

		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				modifiers: {
					...statusEffectForm.modifiers,
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
			...statusEffectForm.modifiers.resistances,
			[name as string]: value,
		};

		Object.keys(newResistances).forEach((key) => {
			if (!newResistances[key as DamageType]) {
				delete newResistances[key as DamageType];
			}
		});

		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				modifiers: {
					...statusEffectForm.modifiers,
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
					min={-100}
					max={30}
					handleChange={handleChangeStats}
				/>
				<StatGroup
					title="Resistances"
					stats={getResistancesArray(resistances)}
					min={-1000}
					max={100}
					handleChange={handleChangeResistances}
				/>
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
							value={statusEffectForm.accuracy}
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
							value={statusEffectForm.duration}
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
