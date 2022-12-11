import { Fragment } from "react";
import { Box, DialogContentText, MenuItem, TextField } from "@mui/material";
import { STATS, STATS_NAME_MAP } from "../../../utils";
import { useEffectContext } from "./effectContext";

export const HealEffect: React.FC = () => {
	const {
		state: { healEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		dispatch({
			type: healEffectForm.type,
			payload: {
				...healEffectForm,
				[name as string]: value,
			},
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
				<Box display="flex">
					<TextField
						sx={{
							width: "30ch",
						}}
						select
						label="Modifier"
						name="modifier"
						value={healEffectForm.modifier}
						onChange={handleChange}
						disabled
					>
						{STATS.map((stat) => (
							<MenuItem key={stat} value={stat}>
								{STATS_NAME_MAP[stat]}
							</MenuItem>
						))}
					</TextField>
				</Box>
			</Box>
			<Box my={3}>
				<Box display="flex" flexWrap="wrap">
					<TextField
						sx={{
							marginRight: 2,
							width: "20ch",
						}}
						margin="dense"
						name="multiplier"
						label="Multiplier"
						type="number"
						value={healEffectForm.multiplier}
						onChange={handleChange}
						required
						inputProps={{
							min: 0,
							max: 99,
						}}
					/>
					<TextField
						sx={{
							marginRight: 2,
							width: "20ch",
						}}
						margin="dense"
						name="min"
						label="Minimum Roll"
						type="number"
						value={healEffectForm.min}
						onChange={handleChange}
						required
						inputProps={{
							min: 1,
							max: 99,
						}}
					/>
					<TextField
						sx={{
							width: "20ch",
						}}
						margin="dense"
						name="max"
						label="Maximum Roll"
						type="number"
						value={healEffectForm.max}
						onChange={handleChange}
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
