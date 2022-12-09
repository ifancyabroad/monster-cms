import { Typography } from "@material-ui/core";
import { DamageType, Stat } from "../../../../enums";
import { IBuffEffect } from "../../../../types";

export const BuffEffect: React.FC<IBuffEffect> = ({
	modifiers,
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
			stat modifiers: {statModifiers}, resistance modifiers:{" "}
			{resistanceModifiers}, accuracy: {accuracy}, duration: {duration}
		</Typography>
	);
};
