import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeClassModal,
	openAddEquipmentModal,
	openAddSkillsModal,
	openErrorModal,
} from "features/modals/modalsSlice";
import { Fragment, useEffect, useMemo, useState } from "react";
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
	List,
	MenuItem,
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
} from "common/utils";
import { AddSkillsModal } from "./AddSkillsModal";
import { EquipmentItem, SkillItem } from "./monsterModalComponents";
import { AddEquipmentModal } from "./AddEquipmentModal";
import { StatGroup } from "common/components";

const defaultClassValues: IBaseCharacterClass = {
	description: "",
	name: "",
	portrait: "",
	skillClass: SkillClass.Warrior,
	skills: [],
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

const defaultFormValues: ISaveClass = {
	characterClass: defaultClassValues,
	image: null,
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

	useEffect(() => {
		setFormValues({
			characterClass: classValues || defaultClassValues,
			image: null,
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

	const handleSaveClass = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (!hasSkills) {
				dispatch(
					openErrorModal({ message: "Please add at least 1 skill." })
				);
				return;
			}

			if (characterClass) {
				const payload = {
					...formValues,
					id: characterClass.id,
					oldImage: characterClass.portrait,
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
		<Fragment>
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
									<Button
										variant="contained"
										component="span"
									>
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
								Skill Class
							</DialogContentText>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<TextField
										select
										fullWidth
										margin="dense"
										name="skillClass"
										label="Skill Class"
										type="number"
										value={
											formValues.characterClass.skillClass
										}
										onChange={handleChange}
										required
									>
										{CHARACTER_CLASSES.map((skillClass) => (
											<MenuItem
												key={skillClass}
												value={skillClass}
											>
												{CLASS_NAME_MAP[skillClass]}
											</MenuItem>
										))}
									</TextField>
								</Grid>
							</Grid>
						</Box>
						<StatGroup
							title="Stats (6-18)"
							stats={getStatsArray(
								formValues.characterClass.stats
							)}
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
											formValues.characterClass
												.equipment &&
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
								<Typography>
									Please add some equipment!
								</Typography>
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
												onRemoveSkill={
													handleRemoveSkill
												}
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
						<Button
							type="submit"
							color="primary"
							disabled={isLoading}
						>
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>

			<AddEquipmentModal
				equipment={formValues.characterClass.equipment || {}}
				onSetEquipment={handleSetEquipment}
			/>
			<AddSkillsModal
				skills={formValues.characterClass.skills}
				onSetSkills={handleSetSkills}
			/>
		</Fragment>
	);
};
