import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeMonsterModal,
	openAddEquipmentModal,
	openAddSkillsModal,
	openErrorModal,
} from "features/modals/modalsSlice";
import { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	List,
	TextField,
	Typography,
} from "@mui/material";
import { saveMonster, updateMonster } from "features/monsters";
import { IBaseMonster, IMonster, ISaveMonster, TEquipment } from "common/types";
import { StatGroup } from "common/components";
import {
	DamageType,
	EquipmentSlot,
	EQUIPMENT_SLOTS,
	getResistancesArray,
	getStatsArray,
	ATTACK_SKILL_ID,
	MAX_CHALLENGE_RATING,
} from "common/utils";
import { AddSkillsModal } from "./AddSkillsModal";
import { EquipmentItem, SkillItem } from "./monsterModalComponents";
import { AddEquipmentModal } from "./AddEquipmentModal";

const defaultMonsterValues: IBaseMonster = {
	challenge: 1,
	resistances: {
		[DamageType.Slashing]: 0,
		[DamageType.Crushing]: 0,
		[DamageType.Piercing]: 0,
		[DamageType.Fire]: 0,
		[DamageType.Cold]: 0,
		[DamageType.Lightning]: 0,
		[DamageType.Radiant]: 0,
		[DamageType.Necrotic]: 0,
		[DamageType.Poison]: 0,
		[DamageType.Acid]: 0,
	},
	description: "",
	name: "",
	portrait: "",
	boss: false,
	skills: [ATTACK_SKILL_ID],
	stats: {
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	equipment: {},
};

const defaultFormValues: ISaveMonster = {
	monster: defaultMonsterValues,
	image: null,
};

const getBaseMonsterValues = (monster: IMonster) => {
	const { id, ...baseMonster } = monster;
	return baseMonster as IBaseMonster;
};

export const MonsterModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.monsterModal.open);
	const monster = useAppSelector(
		(state) => state.modals.monsterModal.monster
	);
	const isLoading = useAppSelector(
		(state) => state.monsters.status === "loading"
	);
	const [formValues, setFormValues] = useState(defaultFormValues);
	const monsterValues = useMemo(
		() => monster && getBaseMonsterValues(monster),
		[monster]
	);

	const title = monster ? "Update Monster" : "Add Monster";
	const subtitle = monster
		? `Updating ${monster?.name}`
		: "Add a new monster to the database.";
	const hasSkills = formValues.monster.skills.length > 0;
	const hasEquipment =
		formValues.monster.equipment &&
		Object.values(formValues.monster.equipment).filter(Boolean).length > 0;

	useEffect(() => {
		setFormValues({
			monster: monsterValues || defaultMonsterValues,
			image: null,
		});
	}, [monsterValues]);

	const handleClose = () => {
		dispatch(closeMonsterModal());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber, checked } = e.currentTarget;

		let finalValue: number | string | boolean = value;
		if (type === "number") {
			finalValue = valueAsNumber;
		}
		if (name === "boss") {
			finalValue = checked;
		}
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				[name]: finalValue,
			},
		});
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.currentTarget.files?.item(0) || null;
		const portrait = image?.name || "";
		setFormValues({
			...formValues,
			image,
			monster: {
				...formValues.monster,
				portrait,
			},
		});
	};

	const handleChangeResistances = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, valueAsNumber } = e.currentTarget;
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				resistances: {
					...formValues.monster.resistances,
					[name]: valueAsNumber,
				},
			},
		});
	};

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, valueAsNumber } = e.currentTarget;
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				stats: {
					...formValues.monster.stats,
					[name]: valueAsNumber,
				},
			},
		});
	};

	const handleSaveMonster = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (!hasSkills) {
				dispatch(
					openErrorModal({ message: "Please add at least 1 skill." })
				);
				return;
			}

			if (monster) {
				const payload = {
					...formValues,
					id: monster.id,
					oldImage: monster.portrait,
				};
				await dispatch(updateMonster(payload)).unwrap();
			} else {
				await dispatch(saveMonster(formValues)).unwrap();
			}
			dispatch(closeMonsterModal());
			setFormValues(defaultFormValues);
		} catch (error) {
			// TODO: Show error popup
		}
	};

	const handleOpenAddEquipmentModal = () => {
		dispatch(openAddEquipmentModal());
	};

	const handleSetEquipment = (equipment: Partial<TEquipment>) => {
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				equipment,
			},
		});
	};

	const handleRemoveEquipment = (slot: EquipmentSlot) => {
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				equipment: {
					...formValues.monster.equipment,
					[slot]: null,
				},
			},
		});
	};

	const handleOpenAddSkillsModal = () => {
		dispatch(openAddSkillsModal());
	};

	const handleSetSkills = (skills: string[]) => {
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				skills,
			},
		});
	};

	const handleRemoveSkill = (skill: string) => {
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				skills: formValues.monster.skills.filter((sk) => sk !== skill),
			},
		});
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
			<form onSubmit={handleSaveMonster}>
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
							value={formValues.monster.name}
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
							value={formValues.monster.description}
							onChange={handleChange}
							fullWidth
							multiline
							minRows={4}
							inputProps={{
								maxLength: 200,
							}}
						/>
					</Box>
					<StatGroup
						title="Stats (1-30)"
						stats={getStatsArray(formValues.monster.stats)}
						min={1}
						max={30}
						handleChange={handleChangeStats}
					/>
					<StatGroup
						title="Resistances (%)"
						stats={getResistancesArray(
							formValues.monster.resistances
						)}
						min={-100}
						max={100}
						step={5}
						handleChange={handleChangeResistances}
					/>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Difficulty Rating (1-{MAX_CHALLENGE_RATING})
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={4} md={2}>
								<TextField
									variant="filled"
									size="small"
									fullWidth
									margin="dense"
									name="challenge"
									label="Rating"
									type="number"
									value={formValues.monster.challenge}
									onChange={handleChange}
									required
									inputProps={{
										min: 1,
										max: MAX_CHALLENGE_RATING,
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
							Type
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={4} md={2}>
								<FormControlLabel
									control={
										<Checkbox
											name="boss"
											checked={formValues.monster.boss}
											onChange={handleChange}
										/>
									}
									label="Boss"
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
							Equipment
						</DialogContentText>
						{hasEquipment ? (
							<List
								sx={{
									width: "100%",
									bgcolor: "background.paper",
								}}
							>
								{EQUIPMENT_SLOTS.map((slot) => {
									const equipment =
										formValues.monster.equipment &&
										formValues.monster.equipment[slot];

									const handleRemove = () => {
										handleRemoveEquipment(slot);
									};

									if (!equipment) {
										return null;
									}

									return (
										<EquipmentItem
											key={slot}
											id={equipment}
											slot={slot}
											onRemove={handleRemove}
										/>
									);
								})}
							</List>
						) : (
							<Typography>Please add some equipment!</Typography>
						)}
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Skills
						</DialogContentText>
						{hasSkills ? (
							<List
								sx={{
									width: "100%",
									bgcolor: "background.paper",
								}}
							>
								{formValues.monster.skills.map((skill) => (
									<SkillItem
										key={skill}
										id={skill}
										onRemoveSkill={handleRemoveSkill}
									/>
								))}
							</List>
						) : (
							<Typography>Please add some skills!</Typography>
						)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={handleOpenAddEquipmentModal}
						color="secondary"
					>
						Add Equipment
					</Button>
					<Button
						variant="contained"
						onClick={handleOpenAddSkillsModal}
						color="secondary"
					>
						Add Skills
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary" disabled={isLoading}>
						Save
					</Button>
				</DialogActions>
			</form>

			<AddEquipmentModal
				equipment={formValues.monster.equipment || {}}
				onSetEquipment={handleSetEquipment}
			/>
			<AddSkillsModal
				skills={formValues.monster.skills}
				onSetSkills={handleSetSkills}
			/>
		</Dialog>
	);
};
