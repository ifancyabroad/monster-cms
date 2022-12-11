import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
	closeSkillModal,
	openEffectModal,
} from "../../../features/modals/modalsSlice";
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
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { saveSkill, updateSkill } from "../../../features/skills/skillsSlice";
import { IBaseSkill, ISaveSkill, ISkill, ISkillEffect } from "../../../types";
import { CharacterClass, DamageType, EffectType, Stat } from "../../../enums";
import { RESISTANCES, RESISTANCES_NAME_MAP } from "../../../utils";
import { EffectModal } from "../EffectModal";
import { EffectCard } from "./EffectCard";

const defaultSkillValues: IBaseSkill = {
	name: "",
	description: "",
	icon: "",
	class: "basic",
	damageType: DamageType.Slashing,
	effects: [
		{
			type: EffectType.Damage,
			modifier: Stat.Strength,
			multiplier: 1,
			min: 1,
			max: 6,
		},
	],
	price: 0,
	maxUses: 0,
	level: 0,
};

const defaultFormValues: ISaveSkill = {
	skill: defaultSkillValues,
	image: null,
};

const getBaseSkillValues = (skill: ISkill) => {
	const { id, ...baseSkill } = skill;
	return baseSkill as IBaseSkill;
};

export const SkillModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.skillModal.open);
	const skill = useAppSelector((state) => state.modals.skillModal.skill);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);
	const [formValues, setFormValues] = useState(defaultFormValues);
	const skillValues = useMemo(
		() => skill && getBaseSkillValues(skill),
		[skill]
	);

	const title = skill ? "Update Skill" : "Add Skill";
	const subtitle = skill
		? `Updating ${skill?.name}`
		: "Add a new skill to the database.";

	useEffect(() => {
		setFormValues({
			skill: skillValues || defaultSkillValues,
			image: null,
		});
	}, [skillValues]);

	const handleClose = () => {
		dispatch(closeSkillModal());
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
				[name as string]: value as string,
			},
		});
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const image = e.currentTarget.files?.item(0) || null;
		const icon = image?.name || "";
		setFormValues({
			...formValues,
			image,
			skill: {
				...formValues.skill,
				icon,
			},
		});
	};

	const handleOpenEffectModal = () => {
		dispatch(openEffectModal());
	};

	const handleAddEffect = (effect: ISkillEffect) => {
		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
				effects: formValues.skill.effects.concat(effect),
			},
		});
	};

	const handleUpdateEffect = (effect: ISkillEffect) => {
		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
				effects: formValues.skill.effects.concat(effect),
			},
		});
	};

	const handleRemoveEffect = (effect: ISkillEffect) => {
		console.log("remove");
		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
				effects: formValues.skill.effects.filter((e) => e !== effect),
			},
		});
	};

	const handleSaveSkill = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			if (skill) {
				const payload = {
					...formValues,
					id: skill.id,
					oldImage: skill.icon,
				};
				await dispatch(updateSkill(payload)).unwrap();
			} else {
				await dispatch(saveSkill(formValues)).unwrap();
			}
			dispatch(closeSkillModal());
			setFormValues(defaultFormValues);
		} catch (error) {
			// TODO: Show error popup
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">{title}</DialogTitle>
				<form onSubmit={handleSaveSkill}>
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
											}}
											display="inline"
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
								value={formValues.skill.name}
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
								value={formValues.skill.description}
								onChange={handleChange}
								fullWidth
								multiline
								minRows={4}
								inputProps={{
									minLength: 3,
									maxLength: 25,
								}}
							/>
						</Box>
						<Box my={3}>
							<DialogContentText
								variant="subtitle1"
								component="h5"
								gutterBottom
							>
								Skill Type
							</DialogContentText>
							<Box display="flex">
								<TextField
									sx={{
										marginRight: 2,
										width: "30ch",
									}}
									select
									label="Class"
									name="class"
									value={formValues.skill.class}
									onChange={handleChange}
								>
									<MenuItem value="basic">Basic</MenuItem>
									<MenuItem value={CharacterClass.Warrior}>
										Warrior
									</MenuItem>
									<MenuItem value={CharacterClass.Rogue}>
										Rogue
									</MenuItem>
									<MenuItem value={CharacterClass.Mage}>
										Mage
									</MenuItem>
								</TextField>
								<TextField
									sx={{
										width: "30ch",
									}}
									select
									label="Damage Type"
									name="damageType"
									value={formValues.skill.damageType}
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
							</Box>
						</Box>
						<Box my={3}>
							<DialogContentText
								variant="subtitle1"
								component="h5"
								gutterBottom
							>
								Skill Properties
							</DialogContentText>
							<Box display="flex" flexWrap="wrap">
								<TextField
									sx={{
										marginRight: 0,
										width: "20ch",
									}}
									margin="dense"
									name="price"
									label="Price"
									type="number"
									value={formValues.skill.price}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: 9999,
									}}
								/>
								<TextField
									sx={{
										marginRight: 0,
										width: "20ch",
									}}
									margin="dense"
									name="maxUses"
									label="Max Uses"
									type="number"
									value={formValues.skill.maxUses}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: 9999,
									}}
								/>
								<TextField
									sx={{
										width: "20ch",
									}}
									margin="dense"
									name="level"
									label="Level"
									type="number"
									value={formValues.skill.level}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: 30,
									}}
								/>
							</Box>
						</Box>
						<Box my={3}>
							<DialogContentText
								variant="subtitle1"
								component="h5"
								gutterBottom
							>
								Skill Effects
							</DialogContentText>
							<Grid container spacing={3}>
								{formValues.skill.effects.map(
									(effect, index) => (
										<Grid key={index} item xs={12} sm={6}>
											<EffectCard
												effect={effect}
												onRemove={handleRemoveEffect}
											/>
										</Grid>
									)
								)}
							</Grid>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleOpenEffectModal}
							color="secondary"
						>
							Add Effect
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

			<EffectModal
				onAddEffect={handleAddEffect}
				onUpdateEffect={handleUpdateEffect}
			/>
		</Fragment>
	);
};
