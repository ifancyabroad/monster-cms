import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeWeaponModal, openEffectModal } from "features/modals/modalsSlice";
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
	TextField,
	Typography,
} from "@mui/material";
import {
	IBaseWeapon,
	ISaveWeapon,
	ISkillEffect,
	IWeapon,
	IWeaponEffect,
	TDamageTypes,
	TStats,
} from "common/types";
import { EffectModal } from "./EffectModal";
import { EffectCard } from "./EffectCard";
import { StatGroup } from "common/components";
import {
	DamageType,
	EquipmentType,
	getResistancesArray,
	getStatsArray,
	MAX_DAMAGE,
	MAX_GOLD_VALUE,
	MAX_ITEM_LEVEL,
	RESISTANCES,
	RESISTANCES_NAME_MAP,
	Stat,
	WeaponSize,
	WeaponType,
	WEAPON_EFFECTS,
	WEAPON_SIZES,
	WEAPON_SIZE_NAME_MAP,
	WEAPON_TYPES,
	WEAPON_TYPE_NAME_MAP,
} from "common/utils";
import { saveWeapon, updateWeapon } from "features/weapons";

const DEFAULT_STAT_VALUES = {
	[Stat.Strength]: 0,
	[Stat.Dexterity]: 0,
	[Stat.Constitution]: 0,
	[Stat.Intelligence]: 0,
	[Stat.Wisdom]: 0,
	[Stat.Charisma]: 0,
};

const DEFAULT_RESISTANCE_VALUES = {
	[DamageType.Slashing]: 0,
	[DamageType.Crushing]: 0,
	[DamageType.Piercing]: 0,
	[DamageType.Cold]: 0,
	[DamageType.Fire]: 0,
	[DamageType.Lighting]: 0,
	[DamageType.Radiant]: 0,
	[DamageType.Necrotic]: 0,
	[DamageType.Poison]: 0,
	[DamageType.Acid]: 0,
};

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
	modifiers: {
		stats: {},
		resistances: {},
	},
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
	const [formValues, setFormValues] = useState(defaultFormValues);
	const weaponValues = useMemo(
		() => weapon && getBaseWeaponValues(weapon),
		[weapon]
	);
	const [stats, setStats] = useState<TStats>({
		...DEFAULT_STAT_VALUES,
		...formValues.weapon.modifiers?.stats,
	});
	const [resistances, setResistances] = useState<TDamageTypes>({
		...DEFAULT_RESISTANCE_VALUES,
		...formValues.weapon.modifiers?.resistances,
	});

	const title = weapon ? "Update Weapon" : "Add Weapon";
	const subtitle = weapon
		? `Updating ${weapon?.name}`
		: "Add a new weapon to the database.";
	const weaponEffects = formValues.weapon.effects || [];
	const hasEffects = weaponEffects.length > 0;

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

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, valueAsNumber } = e.currentTarget;

		setStats({
			...stats,
			[name as string]: valueAsNumber,
		});

		const newStats = {
			...formValues.weapon.modifiers?.stats,
			[name as string]: valueAsNumber,
		};

		Object.keys(newStats).forEach((key) => {
			if (!newStats[key as Stat]) {
				delete newStats[key as Stat];
			}
		});

		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				modifiers: {
					...formValues.weapon.modifiers,
					stats: newStats,
				},
			},
		});
	};

	const handleChangeResistances = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, valueAsNumber } = e.currentTarget;

		setResistances({
			...resistances,
			[name as string]: valueAsNumber,
		});

		const newResistances = {
			...formValues.weapon.modifiers?.resistances,
			[name as string]: valueAsNumber,
		};

		Object.keys(newResistances).forEach((key) => {
			if (!newResistances[key as DamageType]) {
				delete newResistances[key as DamageType];
			}
		});

		setFormValues({
			...formValues,
			weapon: {
				...formValues.weapon,
				modifiers: {
					...formValues.weapon.modifiers,
					resistances: newResistances,
				},
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
							<Grid item xs={6}>
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
											{WEAPON_TYPE_NAME_MAP[type]}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6}>
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
							<Grid item xs={6} md={4}>
								<TextField
									fullWidth
									margin="dense"
									name="min"
									label={`Minimum Roll (1-${MAX_DAMAGE})`}
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
							<Grid item xs={6} md={4}>
								<TextField
									fullWidth
									margin="dense"
									name="max"
									label={`Maximum Roll (1-${MAX_DAMAGE})`}
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
							<Grid item xs={6}>
								<TextField
									fullWidth
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
							<Grid item xs={6}>
								<TextField
									fullWidth
									margin="dense"
									name="price"
									label={`Price (1-${MAX_GOLD_VALUE})`}
									type="number"
									value={formValues.weapon.price}
									onChange={handleChange}
									required
									inputProps={{
										min: 1,
										max: MAX_GOLD_VALUE,
									}}
								/>
							</Grid>
						</Grid>
					</Box>
					<StatGroup
						title="Stats (0-30)"
						stats={getStatsArray(stats)}
						min={0}
						max={30}
						handleChange={handleChangeStats}
					/>
					<StatGroup
						title="Resistances (%)"
						stats={getResistancesArray(resistances)}
						min={0}
						max={100}
						handleChange={handleChangeResistances}
					/>
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
									<Typography>
										Please add some effects!
									</Typography>
								</Grid>
							)}
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
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
		</Dialog>
	);
};
