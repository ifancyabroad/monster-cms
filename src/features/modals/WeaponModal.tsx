import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeWeaponModal,
	openPropertyModal,
	openEffectModal,
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
import {
	IBaseWeapon,
	ISaveWeapon,
	ISkillEffect,
	IWeapon,
	IWeaponEffect,
	TProperty,
} from "common/types";
import { EffectModal } from "./EffectModal";
import { EffectCard } from "./EffectCard";
import {
	DamageType,
	EquipmentType,
	MAX_DAMAGE,
	MAX_GOLD_VALUE,
	MAX_ITEM_LEVEL,
	RESISTANCES,
	RESISTANCES_NAME_MAP,
	WeaponSize,
	WeaponType,
	WEAPON_EFFECTS,
	WEAPON_SIZES,
	WEAPON_SIZE_NAME_MAP,
	WEAPON_TYPES,
	EQUIPMENT_TYPE_NAME_MAP,
} from "common/utils";
import { saveWeapon, updateWeapon } from "features/weapons";
import { PropertyModal } from "./PropertyModal";
import { PropertyCardEdit } from "../../common/components/PropertyCard";

const defaultWeaponValues: IBaseWeapon = {
	type: EquipmentType.Weapon,
	weaponType: WeaponType.Sword,
	size: WeaponSize.OneHanded,
	name: "",
	description: "",
	icon: "",
	effects: [],
	price: 100,
	level: 1,
	damageType: DamageType.Slashing,
	min: 1,
	max: 6,
	properties: [],
};

const defaultFormValues: ISaveWeapon = {
	weapon: defaultWeaponValues,
	image: null,
};

const getBaseWeaponValues = (weapon: IWeapon) => {
	const { id, ...baseWeapon } = weapon;
	return baseWeapon as IBaseWeapon;
};

export const WeaponModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.weaponModal.open);
	const weapon = useAppSelector((state) => state.modals.weaponModal.weapon);
	const isLoading = useAppSelector(
		(state) => state.weapons.status === "loading"
	);
	const isEffectModalOpen = useAppSelector(
		(state) => state.modals.effectModal.open
	);
	const [formValues, setFormValues] = useState(defaultFormValues);
	const weaponValues = useMemo(
		() => weapon && getBaseWeaponValues(weapon),
		[weapon]
	);

	const title = weapon ? "Update Weapon" : "Add Weapon";
	const subtitle = weapon
		? `Updating ${weapon?.name}`
		: "Add a new weapon to the database.";
	const weaponEffects = formValues.weapon.effects || [];
	const hasEffects = weaponEffects.length > 0;
	const weaponProperties = formValues.weapon.properties || [];
	const hasProperties = weaponProperties.length > 0;

	useEffect(() => {
		setFormValues({
			weapon: weaponValues || defaultWeaponValues,
			image: null,
		});
	}, [weaponValues]);

	const handleClose = () => {
		dispatch(closeWeaponModal());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;
		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
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
			weapon: {
				...formValues.weapon,
				icon,
			},
		});
	};

	const handleOpenEffectModal = () => {
		dispatch(openEffectModal({}));
	};

	const handleAddEffect = (effect: ISkillEffect) => {
		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				effects: weaponEffects.concat(effect as IWeaponEffect),
			},
		});
	};

	const handleUpdateEffect = (effect: ISkillEffect, index: number) => {
		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				effects: weaponEffects.map((e, i) =>
					index === i ? (effect as IWeaponEffect) : e
				),
			},
		});
	};

	const handleRemoveEffect = (effect: ISkillEffect, index: number) => {
		const newEffects = [...weaponEffects];
		newEffects.splice(index, 1);

		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				effects: newEffects,
			},
		});
	};

	const handleOpenPropertyModal = () => {
		dispatch(openPropertyModal({}));
	};

	const handleAddProperty = (property: TProperty) => {
		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				properties: weaponProperties.concat(property),
			},
		});
	};

	const handleUpdateProperty = (property: TProperty, index: number) => {
		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				properties: weaponProperties.map((e, i) =>
					index === i ? property : e
				),
			},
		});
	};

	const handleRemoveProperty = (property: TProperty, index: number) => {
		const newProperties = [...weaponProperties];
		newProperties.splice(index, 1);

		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				properties: newProperties,
			},
		});
	};

	const handleSaveWeapon = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (weapon) {
				const payload = {
					...formValues,
					id: weapon.id,
					oldImage: weapon.icon,
				};
				await dispatch(updateWeapon(payload)).unwrap();
			} else {
				await dispatch(saveWeapon(formValues)).unwrap();
			}
			dispatch(closeWeaponModal());
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
			<form onSubmit={handleSaveWeapon}>
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
							value={formValues.weapon.name}
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
							value={formValues.weapon.description}
							onChange={handleChange}
							fullWidth
							multiline
							minRows={4}
							inputProps={{
								maxLength: 200,
							}}
						/>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Weapon Type
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Type"
									name="weaponType"
									value={formValues.weapon.weaponType}
									onChange={handleChange}
								>
									{WEAPON_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{EQUIPMENT_TYPE_NAME_MAP[type]}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Size"
									name="size"
									value={formValues.weapon.size}
									onChange={handleChange}
								>
									{WEAPON_SIZES.map((size) => (
										<MenuItem key={size} value={size}>
											{WEAPON_SIZE_NAME_MAP[size]}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Damage Type"
									name="damageType"
									value={formValues.weapon.damageType}
									onChange={handleChange}
								>
									{RESISTANCES.map((resistance) => (
										<MenuItem
											key={resistance}
											value={resistance}
										>
											{RESISTANCES_NAME_MAP[resistance]}
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
							Weapon Properties
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									variant="filled"
									size="small"
									margin="dense"
									name="min"
									label={`Min Roll (1-${MAX_DAMAGE})`}
									type="number"
									value={formValues.weapon.min}
									onChange={handleChange}
									required
									inputProps={{
										min: 1,
										max: MAX_DAMAGE,
									}}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									variant="filled"
									size="small"
									margin="dense"
									name="max"
									label={`Max Roll (1-${MAX_DAMAGE})`}
									type="number"
									value={formValues.weapon.max}
									onChange={handleChange}
									required
									inputProps={{
										min: 1,
										max: MAX_DAMAGE,
									}}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									fullWidth
									variant="filled"
									size="small"
									margin="dense"
									name="level"
									label={`Level (1-${MAX_ITEM_LEVEL})`}
									type="number"
									value={formValues.weapon.level}
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
									value={formValues.weapon.price}
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
							Weapon Properties
						</DialogContentText>
						{hasProperties ? (
							<Stack direction="row" flexWrap="wrap" spacing={1}>
								{weaponProperties.map((property, index) => (
									<PropertyCardEdit
										key={property.name + index}
										property={property}
										index={index}
										onRemove={handleRemoveProperty}
									/>
								))}
							</Stack>
						) : (
							<Typography>No Properties</Typography>
						)}
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Weapon Effects
						</DialogContentText>
						<Grid container spacing={1}>
							{hasEffects ? (
								weaponEffects.map((effect, index) => (
									<Grid key={index} item xs={12} sm={6}>
										<EffectCard
											effect={effect}
											index={index}
											onRemove={handleRemoveEffect}
										/>
									</Grid>
								))
							) : (
								<Grid item xs={12}>
									<Typography>No effects</Typography>
								</Grid>
							)}
						</Grid>
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
					<Button
						variant="contained"
						onClick={handleOpenEffectModal}
						color="secondary"
					>
						Add Effect
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary" disabled={isLoading}>
						Save
					</Button>
				</DialogActions>
			</form>

			<EffectModal
				effects={WEAPON_EFFECTS}
				onAddEffect={handleAddEffect}
				onUpdateEffect={handleUpdateEffect}
			/>

			{!isEffectModalOpen && (
				<PropertyModal
					onAddProperty={handleAddProperty}
					onUpdateProperty={handleUpdateProperty}
				/>
			)}
		</Dialog>
	);
};
