import { Typography } from "@mui/material";
import { DamageType, Stat } from "../../../../enums";
import { IStatusEffect } from "../../../../types";

export const StatusEffect: React.FC<IStatusEffect> = ({
	modifiers,
	target,
	accuracy,
	duration,
}) => {
	const { stats, resistances } = modifiers;
	const statModifiers =
		Object.keys(stats)
			.map((key) => `${key}: ${stats[key as Stat]}`)
			.join(", ") || "none";
	const resistanceModifiers =
		Object.keys(resistances)
			.map((key) => `${key}: ${resistances[key as DamageType]}`)
			.join(", ") || "none";

	return (
		<Typography variant="body2" component="p">
			target: {target}, stat modifiers: {statModifiers}, resistance
			modifiers: {resistanceModifiers}, accuracy: {accuracy}, duration:{" "}
			{duration}
		</Typography>
	);
};
