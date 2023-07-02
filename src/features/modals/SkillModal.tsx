import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeSkillModal,
	openEffectModal,
	openErrorModal,
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
	TextField,
	Typography,
} from "@mui/material";
import { saveSkill, updateSkill } from "features/skills";
import { IBaseSkill, ISaveSkill, ISkill, ISkillEffect } from "common/types";
import { EffectModal } from "./EffectModal";
import { EffectCard } from "./EffectCard";
import {
	CharacterClass,
	CLASSES,
	CLASS_NAME_MAP,
	MAX_GOLD_VALUE,
	MAX_SKILL_LEVEL,
	MAX_SKILL_USES,
	SKILL_EFFECTS,
	Target,
} from "common/utils";

const defaultSkillValues: IBaseSkill = {
	name: "",
	description: "",
	icon: "",
	class: CharacterClass.Common,
	effects: [],
	price: 0,
	maxUses: 0,
	level: 0,
	target: Target.Enemy,
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
	const hasEffects = formValues.skill.effects.length > 0;

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
		const { name, type, value, valueAsNumber } = e.target;
		const finalValue = type === "number" ? valueAsNumber : value;
		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
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
			skill: {
				...formValues.skill,
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
			skill: {
				...formValues.skill,
				effects: formValues.skill.effects.concat(effect),
			},
		});
	};

	const handleUpdateEffect = (effect: ISkillEffect, index: number) => {
		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
				effects: formValues.skill.effects.map((e, i) =>
					index === i ? effect : e
				),
			},
		});
	};

	const handleRemoveEffect = (effect: ISkillEffect, index: number) => {
		const newEffects = [...formValues.skill.effects];
		newEffects.splice(index, 1);

		setFormValues({
			...formValues,
			skill: {
				...formValues.skill,
				effects: newEffects,
			},
		});
	};

	const handleSaveSkill = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			if (!hasEffects) {
				dispatch(
					openErrorModal({ message: "Please add at least 1 effect." })
				);
				return;
			}

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
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
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
							name="description"
							label="Description"
							value={formValues.skill.description}
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
							Skill Type
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Class"
									name="class"
									value={formValues.skill.class}
									onChange={handleChange}
								>
									{CLASSES.map((cl) => (
										<MenuItem key={cl} value={cl}>
											{CLASS_NAME_MAP[cl]}
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
							Skill Properties
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									fullWidth
									select
									margin="dense"
									name="target"
									label="Target"
									value={formValues.skill.target}
									onChange={handleChange}
									required
								>
									<MenuItem value="self">Self</MenuItem>
									<MenuItem value="enemy">Enemy</MenuItem>
								</TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									margin="dense"
									name="level"
									label={`Level (0-${MAX_SKILL_LEVEL})`}
									type="number"
									value={formValues.skill.level}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: MAX_SKILL_LEVEL,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									margin="dense"
									name="price"
									label={`Price (0-${MAX_GOLD_VALUE})`}
									type="number"
									value={formValues.skill.price}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: MAX_GOLD_VALUE,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									margin="dense"
									name="maxUses"
									label={`Max Uses (0-${MAX_SKILL_USES})`}
									type="number"
									value={formValues.skill.maxUses}
									onChange={handleChange}
									required
									inputProps={{
										min: 0,
										max: MAX_SKILL_USES,
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
							Skill Effects
						</DialogContentText>
						<Grid container spacing={1}>
							{hasEffects ? (
								formValues.skill.effects.map(
									(effect, index) => (
										<Grid key={index} item xs={12} sm={6}>
											<EffectCard
												effect={effect}
												index={index}
												onRemove={handleRemoveEffect}
											/>
										</Grid>
									)
								)
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
				effects={SKILL_EFFECTS}
				onAddEffect={handleAddEffect}
				onUpdateEffect={handleUpdateEffect}
			/>
		</Dialog>
	);
};
