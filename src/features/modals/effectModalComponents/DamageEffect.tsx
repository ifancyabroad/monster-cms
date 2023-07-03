import {
	Box,
	DialogContentText,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { MAX_DAMAGE, RESISTANCES, RESISTANCES_NAME_MAP } from "common/utils";
import { useEffectContext } from "common/context";

export const DamageEffect: React.FC = () => {
	const {
		state: { damageEffectForm },
		dispatch,
	} = useEffectContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;

		dispatch({
			type: "UPDATE",
			payload: {
				...damageEffectForm,
				[name as string]: finalValue,
			},
		});
	};

	return (
		<Box my={3}>
			<DialogContentText variant="subtitle1" component="h5" gutterBottom>
				Effect Properties
			</DialogContentText>
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<TextField
						fullWidth
						select
						margin="dense"
						label="Damage Type"
						name="damageType"
						value={damageEffectForm.damageType}
						onChange={handleChange}
					>
						{RESISTANCES.map((resistance) => (
							<MenuItem key={resistance} value={resistance}>
								{RESISTANCES_NAME_MAP[resistance]}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={6} md={4}>
					<TextField
						fullWidth
						margin="dense"
						name="min"
						label={`Min Roll (1-${MAX_DAMAGE})`}
						type="number"
						value={damageEffectForm.min}
						onChange={handleChange}
						required
						inputProps={{
							min: 1,
							max: MAX_DAMAGE,
						}}
					/>
				</Grid>
				<Grid item xs={6} md={4}>
					<TextField
						fullWidth
						margin="dense"
						name="max"
						label={`Max Roll (1-${MAX_DAMAGE})`}
						type="number"
						value={damageEffectForm.max}
						onChange={handleChange}
						required
						inputProps={{
							min: 1,
							max: MAX_DAMAGE,
						}}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
