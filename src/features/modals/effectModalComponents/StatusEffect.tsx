import { Fragment, useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import {
	AuxiliaryStat,
	DamageType,
	getAuxiliaryStatsArray,
	getResistancesArray,
	getStatsArray,
	MAX_DURATION,
	Stat,
} from "common/utils";
import { StatGroup } from "common/components";
import { TAuxiliaryStats, TDamageTypes, TStats } from "common/types";
import { useEffectContext } from "common/context";

const DEFAULT_STAT_VALUES = {
	[Stat.Strength]: 0,
	[Stat.Dexterity]: 0,
	[Stat.Constitution]: 0,
	[Stat.Intelligence]: 0,
	[Stat.Wisdom]: 0,
	[Stat.Charisma]: 0,
};

const DEFAULT_AUXILIARY_STAT_VALUES = {
	[AuxiliaryStat.Defence]: 0,
	[AuxiliaryStat.HitChance]: 0,
	[AuxiliaryStat.CritChance]: 0,
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
	const [auxiliaryStats, setAuxiliaryStats] = useState<TAuxiliaryStats>({
		...DEFAULT_AUXILIARY_STAT_VALUES,
		...statusEffectForm.modifiers.auxiliaryStats,
	});
	const [resistances, setResistances] = useState<TDamageTypes>({
		...DEFAULT_RESISTANCE_VALUES,
		...statusEffectForm.modifiers.resistances,
	});
	const [damageBonuses, setDamageBonuses] = useState<TDamageTypes>(
		DEFAULT_RESISTANCE_VALUES
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;

		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				[name as string]: finalValue,
			},
		});
	};

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, valueAsNumber } = e.currentTarget;

		setStats({
			...stats,
			[name as string]: valueAsNumber,
		});

		const newStats = {
			...statusEffectForm.modifiers.stats,
			[name as string]: valueAsNumber,
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

	const handleChangeAuxiliaryStats = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, valueAsNumber } = e.currentTarget;

		setAuxiliaryStats({
			...auxiliaryStats,
			[name as string]: valueAsNumber,
		});

		const newStats = {
			...statusEffectForm.modifiers.auxiliaryStats,
			[name as string]: valueAsNumber,
		};

		Object.keys(newStats).forEach((key) => {
			if (!newStats[key as AuxiliaryStat]) {
				delete newStats[key as AuxiliaryStat];
			}
		});

		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				modifiers: {
					...statusEffectForm.modifiers,
					auxiliaryStats: newStats,
				},
			},
		});
	};

	const handleChangeResistances = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, valueAsNumber } = e.currentTarget;

		setResistances({
			...resistances,
			[name as string]: valueAsNumber,
		});

		const newResistances = {
			...statusEffectForm.modifiers.resistances,
			[name as string]: valueAsNumber,
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

	const handleChangeDamageBonuses = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, valueAsNumber } = e.currentTarget;

		setDamageBonuses({
			...damageBonuses,
			[name as string]: valueAsNumber,
		});

		const newDamageBonuses = {
			...statusEffectForm.modifiers.damage,
			[name as string]: valueAsNumber,
		};

		Object.keys(newDamageBonuses).forEach((key) => {
			if (!newDamageBonuses[key as DamageType]) {
				delete newDamageBonuses[key as DamageType];
			}
		});

		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				modifiers: {
					...statusEffectForm.modifiers,
					damage: newDamageBonuses,
				},
			},
		});
	};

	return (
		<Fragment>
			<Box my={3}>
				<StatGroup
					title="Stats (-10-10)"
					stats={getStatsArray(stats)}
					min={-10}
					max={10}
					handleChange={handleChangeStats}
				/>
				<StatGroup
					title="Auxiliary Stats (%)"
					stats={getAuxiliaryStatsArray(auxiliaryStats)}
					min={-100}
					max={100}
					step={5}
					handleChange={handleChangeAuxiliaryStats}
				/>
				<StatGroup
					title="Resistances (%)"
					stats={getResistancesArray(resistances)}
					min={-100}
					max={100}
					step={5}
					handleChange={handleChangeResistances}
				/>
				<StatGroup
					title="Damage Bonuses (%)"
					stats={getResistancesArray(damageBonuses)}
					min={-100}
					max={100}
					step={5}
					handleChange={handleChangeDamageBonuses}
				/>
			</Box>
			<Box my={3}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							margin="dense"
							name="accuracy"
							label="Accuracy (%)"
							type="number"
							value={statusEffectForm.accuracy}
							onChange={handleChange}
							required
							inputProps={{
								min: 0,
								max: 100,
								step: 5,
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							margin="dense"
							name="duration"
							label={`Duration (1-${MAX_DURATION})`}
							type="number"
							value={statusEffectForm.duration}
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
		</Fragment>
	);
};
