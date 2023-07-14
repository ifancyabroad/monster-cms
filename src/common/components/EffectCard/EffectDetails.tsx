import { Box, Typography } from "@mui/material";
import { ISkillEffect } from "common/types";
import {
	AUXILIARY_EFFECTS_NAME_MAP,
	EffectType,
	RESISTANCES_NAME_MAP,
	getPropertyConfig,
} from "common/utils";
import { Fragment } from "react";

export const EffectDetails: React.FC<ISkillEffect> = (effect) => (
	<Box component="ul" sx={{ margin: 0 }}>
		<Typography component="li" variant="body2">
			<Box component="span" sx={{ fontWeight: "medium" }}>
				Target:{" "}
			</Box>
			{effect.target}
		</Typography>
		{"accuracy" in effect && (
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Accuracy:{" "}
				</Box>
				{effect.accuracy}%
			</Typography>
		)}
		{"damageType" in effect && (
			<Fragment>
				<Typography component="li" variant="body2">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Damage Type:{" "}
					</Box>
					{RESISTANCES_NAME_MAP[effect.damageType]}
				</Typography>
				<Typography component="li" variant="body2">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Damage:{" "}
					</Box>
					{effect.min}-{effect.max}
				</Typography>
			</Fragment>
		)}
		{effect.type === EffectType.Heal && (
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Health:{" "}
				</Box>
				{effect.min}-{effect.max}
			</Typography>
		)}
		{"multiplier" in effect && (
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Multiplier:{" "}
				</Box>
				x{effect.multiplier}
			</Typography>
		)}
		{"duration" in effect && (
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Duration:{" "}
				</Box>
				{effect.duration} turns
			</Typography>
		)}
		{"effect" in effect && (
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Effect:{" "}
				</Box>
				{AUXILIARY_EFFECTS_NAME_MAP[effect.effect]}
			</Typography>
		)}
		{"properties" in effect && (
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Properties
				</Box>
				<Box component="ul">
					{effect.properties?.map((stat) => (
						<Typography
							key={stat.name}
							component="li"
							variant="body2"
						>
							<Box component="span" sx={{ fontWeight: "medium" }}>
								{getPropertyConfig(stat)?.name}:{" "}
							</Box>
							{stat.value}
						</Typography>
					))}
				</Box>
			</Typography>
		)}
	</Box>
);
