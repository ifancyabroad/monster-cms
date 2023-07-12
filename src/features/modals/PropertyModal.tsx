import { useAppDispatch, useAppSelector } from "common/hooks";
import { closePropertyModal } from "./modalsSlice";
import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	MenuItem,
	Slider,
	TextField,
} from "@mui/material";
import { TProperty } from "common/types";
import { DamageType, PropertyType } from "common/utils";
import { PROPERTY_CONFIG, PROPERTY_TYPES } from "common/utils/constants/config";

const defaultFormValues: TProperty = {
	type: PropertyType.Resistance,
	name: DamageType.Fire,
	value: 0,
};

interface IProps {
	onAddProperty: (property: TProperty) => void;
	onUpdateProperty: (property: TProperty, index: number) => void;
}

export const PropertyModal: React.FC<IProps> = ({
	onAddProperty,
	onUpdateProperty,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.propertyModal.open);
	const property = useAppSelector(
		(state) => state.modals.propertyModal.property
	);
	const index = useAppSelector((state) => state.modals.propertyModal.index);
	const [formValues, setFormValues] = useState<TProperty>(defaultFormValues);
	const config = PROPERTY_CONFIG[formValues.type];

	const title = property ? "Update Property" : "Add Property";
	const confirm = property ? "Update" : "Add";
	const isDisabled = !formValues.value;

	useEffect(() => {
		if (property) {
			setFormValues(property);
		}
	}, [property]);

	useEffect(() => {
		if (!open) {
			setFormValues(defaultFormValues);
		}
	}, [open]);

	const handleClose = () => {
		dispatch(closePropertyModal());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "type") {
			const newConfig = PROPERTY_CONFIG[value as PropertyType];
			const defaultValue = newConfig.properties[0].key;

			setFormValues({
				...formValues,
				type: value,
				name: defaultValue,
				value: 0,
			} as TProperty);

			return;
		}

		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleChangeSlider = (event: Event, value: number | number[]) => {
		const { name } = event.target as HTMLInputElement;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleAddProperty = () => {
		if (property && typeof index === "number") {
			onUpdateProperty(formValues, index);
		} else {
			onAddProperty(formValues);
		}

		dispatch(closePropertyModal());
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<Box mb={3}>
					<DialogContentText
						variant="subtitle1"
						component="h5"
						gutterBottom
					>
						Property Type
					</DialogContentText>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								fullWidth
								select
								margin="dense"
								label="Type"
								name="type"
								value={formValues.type}
								onChange={handleChange}
							>
								{PROPERTY_TYPES.map((property, index) => (
									<MenuItem key={index} value={property}>
										{PROPERTY_CONFIG[property].name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								select
								margin="dense"
								name="name"
								label="Name"
								value={formValues.name}
								onChange={handleChange}
								required
							>
								{config.properties.map((property, index) => (
									<MenuItem key={index} value={property.key}>
										{property.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
				</Box>
				<Box mb={3}>
					<DialogContentText
						variant="subtitle1"
						component="h5"
						gutterBottom
					>
						Value
					</DialogContentText>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Slider
								name="value"
								value={formValues.value}
								onChange={handleChangeSlider}
								valueLabelDisplay="auto"
								step={config.step}
								min={config.min}
								max={config.max}
							/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button
					onClick={handleAddProperty}
					color="primary"
					disabled={isDisabled}
				>
					{confirm}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
