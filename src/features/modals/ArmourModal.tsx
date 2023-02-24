import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeArmourModal } from "features/modals/modalsSlice";
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
	IArmour,
	IBaseArmour,
	ISaveArmour,
	TDamageTypes,
	TStats,
} from "common/types";
import { StatGroup } from "common/components";
import {
	ARMOUR_TYPES,
	DamageType,
	EquipmentType,
	EQUIPMENT_TYPE_NAME_MAP,
	getResistancesArray,
	getStatsArray,
	MAX_DEFENSE,
	MAX_GOLD_VALUE,
	MAX_ITEM_LEVEL,
	Stat,
} from "common/utils";
import { saveArmour, updateArmour } from "features/armours";

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

const defaultValues: IBaseArmour = {
	type: EquipmentType.Armour,
	name: "",
	description: "",
	icon: "",
	price: 100,
	level: 1,
	defense: 0,
	modifiers: {
		stats: {},
		resistances: {},
	},
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
	const [stats, setStats] = useState<TStats>({
		...DEFAULT_STAT_VALUES,
		...formValues.armour.modifiers?.stats,
	});
	const [resistances, setResistances] = useState<TDamageTypes>({
		...DEFAULT_RESISTANCE_VALUES,
		...formValues.armour.modifiers?.resistances,
	});

	const title = armour ? "Update Armour" : "Add Armour";
	const subtitle = armour
		? `Updating ${armour?.name}`
		: "Add a new armour to the database.";

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

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, valueAsNumber } = e.currentTarget;

		setStats({
			...stats,
			[name as string]: valueAsNumber,
		});

		const newStats = {
			...formValues.armour.modifiers?.stats,
			[name as string]: valueAsNumber,
		};

		Object.keys(newStats).forEach((key) => {
			if (!newStats[key as Stat]) {
				delete newStats[key as Stat];
			}
		});

		setFormValues({
			...formValues,
			armour: {
				...formValues.armour,
				modifiers: {
					...formValues.armour.modifiers,
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
			...formValues.armour.modifiers?.resistances,
			[name as string]: valueAsNumber,
		};

		Object.keys(newResistances).forEach((key) => {
			if (!newResistances[key as DamageType]) {
				delete newResistances[key as DamageType];
			}
		});

		setFormValues({
			...formValues,
			armour: {
				...formValues.armour,
				modifiers: {
					...formValues.armour.modifiers,
					resistances: newResistances,
				},
			},
		});
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (armour) {
				const payload = {
					...formValues,
					id: armour.id,
					oldImage: armour.icon,
				};
				await dispatch(updateArmour(payload)).unwrap();
			} else {
				await dispatch(saveArmour(formValues)).unwrap();
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
							autoFocus
							name="description"
							label="Description"
							value={formValues.armour.description}
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
									{ARMOUR_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{EQUIPMENT_TYPE_NAME_MAP[type]}
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
							<Grid item xs={4}>
								<TextField
									fullWidth
									margin="dense"
									name="defense"
									label={`Defense (0-${MAX_DEFENSE})`}
									type="number"
									value={formValues.armour.defense}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: MAX_DEFENSE,
									}}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									fullWidth
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
							<Grid item xs={4}>
								<TextField
									fullWidth
									margin="dense"
									name="price"
									label={`Price (1-${MAX_GOLD_VALUE})`}
									type="number"
									value={formValues.armour.price}
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary" disabled={isLoading}>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
