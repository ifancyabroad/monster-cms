import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeSkillModal } from "../../../features/modals/modalsSlice";
import { useEffect, useMemo, useState } from "react";
import {
	Box,
	createStyles,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
	Typography,
} from "@material-ui/core";
import { saveSkill, updateSkill } from "../../../features/skills/skillsSlice";
import { IBaseSkill, ISaveSkill, ISkill } from "../../../types";
import { CharacterClass, EffectType } from "../../../enums";
import { RESISTANCES, RESISTANCES_NAME_MAP } from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dropdown: {
			marginRight: theme.spacing(2),
			width: "30ch",
			"&:last-of-type": {
				marginRight: theme.spacing(0),
			},
		},
		numberField: {
			marginRight: theme.spacing(2),
			width: "20ch",
			"&:last-of-type": {
				marginRight: theme.spacing(0),
			},
		},
		uploadFileName: {
			marginLeft: theme.spacing(2),
		},
	})
);

const defaultSkillValues: IBaseSkill = {
	name: "",
	description: "",
	icon: "",
	class: "basic",
	damageType: "physical",
	effects: [
		{
			type: EffectType.Damage,
			modifier: "strength",
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
	const classes = useStyles();
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

	const handleChange = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const { name, value } = e.target;
		console.log(name, value);
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
								<Button variant="contained" component="span">
									Upload Image
								</Button>
								{formValues.image && (
									<Typography
										display="inline"
										className={classes.uploadFileName}
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
						<DialogContentText variant="subtitle1" component="h5">
							Skill Type
						</DialogContentText>
						<Box display="flex">
							<FormControl className={classes.dropdown}>
								<InputLabel id="skill-class-label">
									Class
								</InputLabel>
								<Select
									labelId="skill-class-label"
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
								</Select>
							</FormControl>
							<FormControl className={classes.dropdown}>
								<InputLabel id="skill-damage-type-label">
									Damage Type
								</InputLabel>
								<Select
									labelId="skill-damage-type-label"
									name="damageType"
									value={formValues.skill.damageType}
									onChange={handleChange}
								>
									{RESISTANCES.map((resistance) => (
										<MenuItem value={resistance}>
											{RESISTANCES_NAME_MAP[resistance]}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					</Box>
					<Box my={3}>
						<DialogContentText component="h6">
							Skill Properties
						</DialogContentText>
						<Box display="flex" flexWrap="wrap">
							<TextField
								margin="dense"
								name="price"
								label="Price"
								type="number"
								value={formValues.skill.price}
								onChange={handleChange}
								className={classes.numberField}
								required
								inputProps={{
									min: 0,
									max: 9999,
								}}
							/>
							<TextField
								margin="dense"
								name="maxUses"
								label="Max Uses"
								type="number"
								value={formValues.skill.maxUses}
								onChange={handleChange}
								className={classes.numberField}
								required
								inputProps={{
									min: 0,
									max: 9999,
								}}
							/>
							<TextField
								margin="dense"
								name="level"
								label="Level"
								type="number"
								value={formValues.skill.level}
								onChange={handleChange}
								className={classes.numberField}
								required
								inputProps={{
									min: 0,
									max: 30,
								}}
							/>
						</Box>
					</Box>
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
