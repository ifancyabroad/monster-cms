import { Box, Typography } from "@mui/material";
import { IStatusEffect } from "common/types";
import { getPropertyConfig } from "common/utils";

export const StatusEffect: React.FC<IStatusEffect> = ({
	target,
	properties,
	accuracy,
	duration,
}) => {
	return (
		<Box component="ul" sx={{ margin: 0 }}>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Target:{" "}
				</Box>
				{target}
			</Typography>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Accuracy:{" "}
				</Box>
				{accuracy}%
			</Typography>
			<Typography component="li">
				<Box component="span" sx={{ fontWeight: "medium" }}>
					Duration:{" "}
				</Box>
				{duration} turns
			</Typography>
			{properties && (
				<Typography component="li">
					<Box component="span" sx={{ fontWeight: "medium" }}>
						Properties
					</Box>
					<Box component="ul">
						{properties.map((stat) => (
							<Typography key={stat.name} component="li">
								<Box
									component="span"
									sx={{ fontWeight: "medium" }}
								>
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
};
