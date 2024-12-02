import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeArmourModal,
	openPropertyModal,
} from "features/modals/modalsSlice";
import { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	Grid,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { IArmour, IBaseArmour, ISaveArmour, TProperty } from "common/types";
import {
	EquipmentType,
	EQUIPMENT_ARMOUR_TYPES,
	EQUIPMENT_TYPE_NAME_MAP,
	MAX_GOLD_VALUE,
	MAX_ITEM_LEVEL,
	ArmourType,
	ARMOUR_TYPES,
	ARMOUR_TYPE_NAME_MAP,
} from "common/utils";
import { saveArmour, updateArmour } from "features/armours";
import { PropertyModal } from "./PropertyModal";
import { EditPropertyCard } from "common/components/PropertyCard";

const defaultValues: IBaseArmour = {
	type: EquipmentType.Amulet,
	name: "",
	description: "",
	icon: "",
	price: 100,
	level: 1,
	armourType: ArmourType.Miscellaneous,
	armourClass: 0,
	properties: [],
};

const defaultFormValues: ISaveArmour = {
	armour: defaultValues,
	image: null,
};

const getBaseValues = (armour: IArmour) => {
	const { id, ...baseArmour } = armour;
	return baseArmour as IBaseArmour;
};

export const ArmourModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.armourModal.open);
	const armour = useAppSelector((state) => state.modals.armourModal.armour);
	const isLoading = useAppSelector(
		(state) => state.armours.status === "loading"
	);
	const [formValues, setFormValues] = useState(defaultFormValues);
	const armourValues = useMemo(
		() => armour && getBaseValues(armour),
		[armour]
	);

	const title = armour ? "Update Armour" : "Add Armour";
	const subtitle = armour
		? `Updating ${armour?.name}`
		: "Add a new armour to the database.";
	const armourProperties = formValues.armour.properties || [];
	const hasProperties = armourProperties.length > 0;
	const isChest = formValues.armour.type === EquipmentType.Armour;

	useEffect(() => {
		setFormValues({
			armour: armourValues || defaultValues,
			image: null,
		});
	}, [armourValues]);

	const handleClose = () => {
		dispatch(closeArmourModal());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;
		setFormValues({
			...formValues,
			armour: {
				...formValues.armour,
				[name as string]: finalValue,
			},
		});
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.currentTarget.files?.item(0) || null;
		const icon = image?.name || "";
		setFormValues({
			...formValues,
			image,
			armour: {
				...formValues.armour,
				icon,
			},
		});
	};

	const handleOpenPropertyModal = () => {
		dispatch(openPropertyModal({}));
	};

	const handleAddProperty = (property: TProperty) => {
		setFormValues({
			...formValues,
			armour: {
				...formValues.armour,
				properties: armourProperties.concat(property),
			},
		});
	};

	const handleUpdateProperty = (property: TProperty, index: number) => {
		setFormValues({
			...formValues,
			armour: {
				...formValues.armour,
				properties: armourProperties.map((e, i) =>
					index === i ? property : e
				),
			},
		});
	};

	const handleRemoveProperty = (property: TProperty, index: number) => {
		const newProperties = [...armourProperties];
		newProperties.splice(index, 1);

		setFormValues({
			...formValues,
			armour: {
				...formValues.armour,
				properties: newProperties,
			},
		});
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			const {
				armour: { armourClass, ...baseArmour },
			} = formValues;

			const armourPayload: IBaseArmour = { ...baseArmour };

			if (isChest) {
				armourPayload.armourClass = armourClass;
			}

			const filteredFormValues: ISaveArmour = {
				...formValues,
				armour: armourPayload,
			};

			if (armour) {
				const payload = {
					...filteredFormValues,
					id: armour.id,
					oldImage: armour.icon,
				};
				await dispatch(updateArmour(payload)).unwrap();
			} else {
				await dispatch(saveArmour(filteredFormValues)).unwrap();
			}
			dispatch(closeArmourModal());
			setFormValues(defaultFormValues);
		} catch (error) {
			// TODO: Show error popup
			console.log(error);
		}
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
			<form onSubmit={handleSave}>
				<DialogContent>
					<DialogContentText>{subtitle}</DialogContentText>
					<Box my={3}>
						<FormControl>
							<input
								accept="image/*"
								style={{ display: "none" }}
								id="contained-button-file"
								multiple
								type="file"
								onChange={handleChangeImage}
							/>
							<label htmlFor="contained-button-file">
								<Button variant="contained" component="span">
									Upload Image
								</Button>
								{formValues.image && (
									<Typography
										sx={{
											marginLeft: 2,
											display: "inline",
										}}
									>
										{formValues.image.name}
									</Typography>
								)}
							</label>
						</FormControl>
					</Box>
					<Box my={3}>
						<TextField
							autoFocus
							name="name"
							label="Name"
							value={formValues.armour.name}
							onChange={handleChange}
							fullWidth
							required
							inputProps={{
								minLength: 3,
								maxLength: 25,
							}}
						/>
					</Box>
					<Box my={3}>
						<TextField
							name="description"
							label="Description"
							value={formValues.armour.description}
							onChange={handleChange}
							fullWidth
							multiline
							minRows={4}
							inputProps={{
								maxLength: 300,
							}}
						/>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Armour Type
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Type"
									name="type"
									value={formValues.armour.type}
									onChange={handleChange}
								>
									{EQUIPMENT_ARMOUR_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{EQUIPMENT_TYPE_NAME_MAP[type]}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Armour Type"
									name="armourType"
									value={formValues.armour.armourType}
									onChange={handleChange}
								>
									{ARMOUR_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{ARMOUR_TYPE_NAME_MAP[type]}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Armour Properties
						</DialogContentText>
						<Grid container spacing={2}>
							{isChest && (
								<Grid item xs={6} md={3}>
									<TextField
										fullWidth
										variant="filled"
										size="small"
										margin="dense"
										name="armourClass"
										label={`Armour Class (0-20)`}
										type="number"
										value={formValues.armour.armourClass}
										onChange={handleChange}
										required
										inputProps={{
											min: 0,
											max: 20,
										}}
									/>
								</Grid>
							)}
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									variant="filled"
									size="small"
									margin="dense"
									name="level"
									label={`Level (1-${MAX_ITEM_LEVEL})`}
									type="number"
									value={formValues.armour.level}
									onChange={handleChange}
									required
									inputProps={{
										min: 1,
										max: MAX_ITEM_LEVEL,
									}}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									variant="filled"
									size="small"
									margin="dense"
									name="price"
									label={`Price (1-${MAX_GOLD_VALUE})`}
									type="number"
									value={formValues.armour.price}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: MAX_GOLD_VALUE,
										step: 10,
									}}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Armour Properties
						</DialogContentText>
						{hasProperties ? (
							<Stack direction="row" flexWrap="wrap" spacing={1}>
								{armourProperties.map((property, index) => (
									<EditPropertyCard
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
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={handleOpenPropertyModal}
						color="secondary"
					>
						Add Property
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary" disabled={isLoading}>
						Save
					</Button>
				</DialogActions>
			</form>

			<PropertyModal
				onAddProperty={handleAddProperty}
				onUpdateProperty={handleUpdateProperty}
			/>
		</Dialog>
	);
};
