import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeClassModal,
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
	FormGroup,
	List,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { saveClass, updateClass } from "features/classes";
import {
	IBaseCharacterClass,
	ICharacterClass,
	ISaveClass,
	TEquipment,
} from "common/types";
import {
	EquipmentSlot,
	EQUIPMENT_SLOTS,
	SkillClass,
	getStatsArray,
	CHARACTER_CLASSES,
	CLASS_NAME_MAP,
	ArmourType,
	WeaponType,
	ARMOUR_TYPES,
	ARMOUR_TYPE_NAME_MAP,
	WEAPON_TYPES,
	EQUIPMENT_TYPE_NAME_MAP,
	ATTACK_SKILL_ID,
	Tactics,
	TACTICS,
} from "common/utils";
import { AddSkillsModal } from "./AddSkillsModal";
import { EquipmentItem, SkillItem } from "./monsterModalComponents";
import { AddEquipmentModal } from "./AddEquipmentModal";
import { StatGroup } from "common/components";

const defaultClassValues: IBaseCharacterClass = {
	description: "",
	name: "",
	portrait: "",
	fallenImage: "",
	icon: "",
	skillClasses: [SkillClass.Warrior],
	armourTypes: [ArmourType.Heavy],
	weaponTypes: [WeaponType.Sword],
	skills: [ATTACK_SKILL_ID],
	stats: {
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	tactics: Tactics.Default,
	equipment: {},
};

const defaultFormValues: ISaveClass = {
	characterClass: defaultClassValues,
	image: null,
	fallenImage: null,
	icon: null,
};

const getBaseClassValues = (characterClass: ICharacterClass) => {
	const { id, ...baseClass } = characterClass;
	return baseClass as IBaseCharacterClass;
};

export const ClassModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.classModal.open);
	const characterClass = useAppSelector(
		(state) => state.modals.classModal.characterClass
	);
	const isLoading = useAppSelector(
		(state) => state.classes.status === "loading"
	);
	const [formValues, setFormValues] = useState(defaultFormValues);
	const classValues = useMemo(
		() => characterClass && getBaseClassValues(characterClass),
		[characterClass]
	);

	const title = characterClass ? "Update Class" : "Add Class";
	const subtitle = characterClass
		? `Updating ${characterClass?.name}`
		: "Add a new class to the database.";
	const hasSkills = formValues.characterClass.skills.length > 0;
	const hasEquipment =
		formValues.characterClass.equipment &&
		Object.values(formValues.characterClass.equipment).filter(Boolean)
			.length > 0;
	const hasSkillClass = formValues.characterClass.skillClasses.length > 0;
	const hasArmourType = formValues.characterClass.armourTypes.length > 0;
	const hasWeaponType = formValues.characterClass.weaponTypes.length > 0;

	useEffect(() => {
		setFormValues({
			characterClass: classValues || defaultClassValues,
			image: null,
			fallenImage: null,
			icon: null,
		});
	}, [classValues]);

	const handleClose = () => {
		dispatch(closeClassModal());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;
		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
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
			characterClass: {
				...formValues.characterClass,
				portrait,
			},
		});
	};

	const handleChangeFallenImage = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const fallenImage = e.currentTarget.files?.item(0) || null;
		const fallenImageName = fallenImage?.name || "";
		setFormValues({
			...formValues,
			fallenImage,
			characterClass: {
				...formValues.characterClass,
				fallenImage: fallenImageName,
			},
		});
	};

	const handleChangeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
		const icon = e.currentTarget.files?.item(0) || null;
		const iconName = icon?.name || "";
		setFormValues({
			...formValues,
			icon,
			characterClass: {
				...formValues.characterClass,
				icon: iconName,
			},
		});
	};

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, valueAsNumber } = e.currentTarget;
		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
				stats: {
					...formValues.characterClass.stats,
					[name]: valueAsNumber,
				},
			},
		});
	};

	const handleChangeSkillClasses = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { checked, value } = e.currentTarget;
		const skillClass = value as SkillClass;
		const skillClasses = checked
			? formValues.characterClass.skillClasses.concat(skillClass)
			: formValues.characterClass.skillClasses.filter(
					(skClass) => skClass !== skillClass
			  );

		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
				skillClasses,
			},
		});
	};

	const handleChangeArmourTypes = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { checked, value } = e.currentTarget;
		const armourType = value as ArmourType;
		const armourTypes = checked
			? formValues.characterClass.armourTypes.concat(armourType)
			: formValues.characterClass.armourTypes.filter(
					(arType) => arType !== armourType
			  );

		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
				armourTypes,
			},
		});
	};

	const handleChangeWeaponTypes = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { checked, value } = e.currentTarget;
		const weaponType = value as WeaponType;
		const weaponTypes = checked
			? formValues.characterClass.weaponTypes.concat(weaponType)
			: formValues.characterClass.weaponTypes.filter(
					(wpClass) => wpClass !== weaponType
			  );

		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
				weaponTypes,
			},
		});
	};

	const handleSaveClass = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (!hasSkills) {
				dispatch(
					openErrorModal({ message: "Please add at least 1 skill." })
				);
				return;
			}

			if (!hasSkillClass) {
				dispatch(
					openErrorModal({
						message: "Please include at least 1 skill class.",
					})
				);
				return;
			}

			if (!hasArmourType) {
				dispatch(
					openErrorModal({
						message: "Please include at least 1 armour type.",
					})
				);
				return;
			}

			if (!hasWeaponType) {
				dispatch(
					openErrorModal({
						message: "Please include at least 1 weapon type.",
					})
				);
				return;
			}

			if (characterClass) {
				const payload = {
					...formValues,
					id: characterClass.id,
					oldImage: characterClass.portrait,
					oldFallenImage: characterClass.fallenImage,
					oldIcon: characterClass.icon,
				};
				await dispatch(updateClass(payload)).unwrap();
			} else {
				await dispatch(saveClass(formValues)).unwrap();
			}
			dispatch(closeClassModal());
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
			characterClass: {
				...formValues.characterClass,
				equipment,
			},
		});
	};

	const handleRemoveEquipment = (slot: EquipmentSlot) => {
		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
				equipment: {
					...formValues.characterClass.equipment,
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
			characterClass: {
				...formValues.characterClass,
				skills,
			},
		});
	};

	const handleRemoveSkill = (skill: string) => {
		setFormValues({
			...formValues,
			characterClass: {
				...formValues.characterClass,
				skills: formValues.characterClass.skills.filter(
					(sk) => sk !== skill
				),
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
			<form onSubmit={handleSaveClass}>
				<DialogContent>
					<DialogContentText>{subtitle}</DialogContentText>
					<Stack spacing={1} my={3}>
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
						<FormControl>
							<input
								accept="image/*"
								style={{ display: "none" }}
								id="contained-button-file-1"
								multiple
								type="file"
								onChange={handleChangeFallenImage}
							/>
							<label htmlFor="contained-button-file-1">
								<Button variant="contained" component="span">
									Upload Image for fallen state
								</Button>
								{formValues.fallenImage && (
									<Typography
										sx={{
											marginLeft: 2,
											display: "inline",
										}}
									>
										{formValues.fallenImage.name}
									</Typography>
								)}
							</label>
						</FormControl>
						<FormControl>
							<input
								accept="image/*"
								style={{ display: "none" }}
								id="contained-button-file-2"
								multiple
								type="file"
								onChange={handleChangeIcon}
							/>
							<label htmlFor="contained-button-file-2">
								<Button variant="contained" component="span">
									Upload Icon
								</Button>
								{formValues.icon && (
									<Typography
										sx={{
											marginLeft: 2,
											display: "inline",
										}}
									>
										{formValues.icon.name}
									</Typography>
								)}
							</label>
						</FormControl>
					</Stack>
					<Box my={3}>
						<TextField
							autoFocus
							name="name"
							label="Name"
							value={formValues.characterClass.name}
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
							value={formValues.characterClass.description}
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
							Skill Classes
						</DialogContentText>
						<FormGroup row>
							{CHARACTER_CLASSES.map((skillClass) => (
								<FormControlLabel
									key={skillClass}
									control={
										<Checkbox
											value={skillClass}
											checked={formValues.characterClass.skillClasses.includes(
												skillClass
											)}
											onChange={handleChangeSkillClasses}
										/>
									}
									label={CLASS_NAME_MAP[skillClass]}
								/>
							))}
						</FormGroup>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Armour Types
						</DialogContentText>
						<FormGroup row>
							{ARMOUR_TYPES.map((armourType) => (
								<FormControlLabel
									key={armourType}
									control={
										<Checkbox
											value={armourType}
											checked={formValues.characterClass.armourTypes.includes(
												armourType
											)}
											onChange={handleChangeArmourTypes}
										/>
									}
									label={ARMOUR_TYPE_NAME_MAP[armourType]}
								/>
							))}
						</FormGroup>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Weapon Types
						</DialogContentText>
						<FormGroup row>
							{WEAPON_TYPES.map((weaponType) => (
								<FormControlLabel
									key={weaponType}
									control={
										<Checkbox
											value={weaponType}
											checked={formValues.characterClass.weaponTypes.includes(
												weaponType
											)}
											onChange={handleChangeWeaponTypes}
										/>
									}
									label={EQUIPMENT_TYPE_NAME_MAP[weaponType]}
								/>
							))}
						</FormGroup>
					</Box>
					<StatGroup
						title="Stats (6-18)"
						stats={getStatsArray(formValues.characterClass.stats)}
						min={6}
						max={18}
						handleChange={handleChangeStats}
					/>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Tactics
						</DialogContentText>
						<TextField
							fullWidth
							select
							margin="dense"
							label="Tactics"
							name="tactics"
							value={formValues.characterClass.tactics}
							onChange={handleChange}
							sx={{ textTransform: "capitalize", maxWidth: 200 }}
						>
							{TACTICS.map((tactic) => (
								<MenuItem
									key={tactic}
									value={tactic}
									sx={{ textTransform: "capitalize" }}
								>
									{tactic}
								</MenuItem>
							))}
						</TextField>
					</Box>
					<Box my={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Starting Equipment
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
										formValues.characterClass.equipment &&
										formValues.characterClass.equipment[
											slot
										];

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
							Starting Skills
						</DialogContentText>
						{hasSkills ? (
							<List
								sx={{
									width: "100%",
									bgcolor: "background.paper",
								}}
							>
								{formValues.characterClass.skills.map(
									(skill) => (
										<SkillItem
											key={skill}
											id={skill}
											onRemoveSkill={handleRemoveSkill}
										/>
									)
								)}
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
				equipment={formValues.characterClass.equipment || {}}
				onSetEquipment={handleSetEquipment}
			/>
			<AddSkillsModal
				skills={formValues.characterClass.skills}
				onSetSkills={handleSetSkills}
			/>
		</Dialog>
	);
};
