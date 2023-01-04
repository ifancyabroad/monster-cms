import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
	closeMonsterModal,
	openAddSkillsModal,
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
	TextField,
	Typography,
} from "@mui/material";
import {
	saveMonster,
	updateMonster,
} from "../../../features/monsters/monstersSlice";
import { IBaseMonster, IMonster, ISaveMonster } from "../../../types";
import { StatGroup } from "../common";
import { getResistancesArray, getStatsArray } from "../../../utils";
import { DamageType } from "../../../enums";
import { AddSkillsModal } from "../AddSkillsModal";
import { SkillCard } from "./SkillCard";

const defaultMonsterValues: IBaseMonster = {
	challenge: 1,
	resistances: {
		[DamageType.Slashing]: 0,
		[DamageType.Crushing]: 0,
		[DamageType.Piercing]: 0,
		[DamageType.Fire]: 0,
		[DamageType.Cold]: 0,
		[DamageType.Lighting]: 0,
		[DamageType.Radiant]: 0,
		[DamageType.Necrotic]: 0,
		[DamageType.Poison]: 0,
		[DamageType.Acid]: 0,
	},
	description: "",
	name: "",
	portrait: "",
	skills: [],
	stats: {
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
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
		const { name, type, value, valueAsNumber } = e.currentTarget;
		const finalValue = type === "number" ? valueAsNumber : value;
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
		<Fragment>
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
								autoFocus
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
							min={-1000}
							max={100}
							handleChange={handleChangeResistances}
						/>
						<Box my={3}>
							<DialogContentText
								variant="subtitle1"
								component="h5"
								gutterBottom
							>
								Difficulty Rating (1-30)
							</DialogContentText>
							<Grid container spacing={2}>
								<Grid item xs={6} md={4}>
									<TextField
										fullWidth
										margin="dense"
										name="challenge"
										label="Rating"
										type="number"
										value={formValues.monster.challenge}
										onChange={handleChange}
										required
										inputProps={{
											min: 0,
											max: 30,
										}}
									/>
								</Grid>
							</Grid>
						</Box>
						<Box my={3}>
							<Grid container spacing={1}>
								{formValues.monster.skills.map((skill) => (
									<Grid key={skill} item xs={12} md={6}>
										<SkillCard
											id={skill}
											onRemoveSkill={handleRemoveSkill}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button
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

			<AddSkillsModal
				skills={formValues.monster.skills}
				onSetSkills={handleSetSkills}
			/>
		</Fragment>
	);
};
