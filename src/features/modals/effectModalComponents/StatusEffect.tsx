import { Fragment } from "react";
import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { MAX_DURATION } from "common/utils";
import { useEffectContext } from "common/context";
import { PropertyModal } from "features/modals";
import { TProperty } from "common/types";
import { PropertyCardEdit } from "common/components";

export const StatusEffect: React.FC = () => {
	const {
		state: { statusEffectForm },
		dispatch,
	} = useEffectContext();
	const statusEffectProperties = statusEffectForm.properties || [];
	const hasProperties = statusEffectProperties.length > 0;

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

	const handleAddProperty = (property: TProperty) => {
		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				properties: statusEffectProperties.concat(property),
			},
		});
	};

	const handleUpdateProperty = (property: TProperty, index: number) => {
		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				properties: statusEffectProperties.map((e, i) =>
					index === i ? property : e
				),
			},
		});
	};

	const handleRemoveProperty = (property: TProperty, index: number) => {
		const newProperties = [...statusEffectProperties];
		newProperties.splice(index, 1);

		dispatch({
			type: "UPDATE",
			payload: {
				...statusEffectForm,
				properties: newProperties,
			},
		});
	};

	return (
		<Fragment>
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

			<Box my={3}>
				{hasProperties ? (
					<Stack direction="row" flexWrap="wrap" spacing={1}>
						{statusEffectProperties.map((property, index) => (
							<PropertyCardEdit
								key={property.name + index}
								property={property}
								index={index}
								onRemove={handleRemoveProperty}
							/>
						))}
					</Stack>
				) : (
					<Typography>No properties</Typography>
				)}
			</Box>

			<PropertyModal
				onAddProperty={handleAddProperty}
				onUpdateProperty={handleUpdateProperty}
			/>
		</Fragment>
	);
};
