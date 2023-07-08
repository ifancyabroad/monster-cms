import { Box, Typography } from "@mui/material";
import { IStatusEffect } from "common/types";
import {
	AUXILIARY_STATS_NAME_MAP,
	AuxiliaryStat,
	DamageType,
	RESISTANCES_NAME_MAP,
	Stat,
	STATS_NAME_MAP,
} from "common/utils";

export const StatusEffect: React.FC<IStatusEffect> = ({
	target,
	modifiers,
	accuracy,
	duration,
}) => {
	const { stats, auxiliaryStats, resistances } = modifiers;

	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Target:{" "}
				</Box>
				{target}
			</Typography>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Accuracy:{" "}
				</Box>
				{accuracy}%
			</Typography>
			<Typography component="li" variant="body2">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Duration:{" "}
				</Box>
				{duration} turns
			</Typography>
			{stats && (
				<Typography component="li" variant="body2">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Stat Modifiers
					</Box>
					<Box component="ul">
						{Object.keys(stats).map((stat) => (
							<Typography
								key={stat}
								component="li"
								variant="body2"
							>
								<Box
									component="span"
									sx={{ fontWeight: "medium" }}
								>
									{STATS_NAME_MAP[stat as Stat]}:{" "}
								</Box>
								{stats[stat as Stat]}
							</Typography>
						))}
					</Box>
				</Typography>
			)}
			{auxiliaryStats && (
				<Typography component="li" variant="body2">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Auxiliary Stat Modifiers
					</Box>
					<Box component="ul">
						{Object.keys(auxiliaryStats).map((stat) => (
							<Typography
								key={stat}
								component="li"
								variant="body2"
							>
								<Box
									component="span"
									sx={{ fontWeight: "medium" }}
								>
									{
										AUXILIARY_STATS_NAME_MAP[
											stat as AuxiliaryStat
										]
									}
									:{" "}
								</Box>
								{auxiliaryStats[stat as AuxiliaryStat]}
							</Typography>
						))}
					</Box>
				</Typography>
			)}
			{resistances && (
				<Typography component="li" variant="body2">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Resistance Modifiers
					</Box>
					<Box component="ul">
						{Object.keys(resistances).map((resistance) => (
							<Typography
								key={resistance}
								component="li"
								variant="body2"
							>
								<Box
									component="span"
									sx={{ fontWeight: "medium" }}
								>
									{
										RESISTANCES_NAME_MAP[
											resistance as DamageType
										]
									}
									:{" "}
								</Box>
								{resistances[resistance as DamageType]}%
							</Typography>
						))}
					</Box>
				</Typography>
			)}
		</Box>
	);
};
