import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeMonsterModal } from "../../../features/modals/modalsSlice";
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
	skills: ["Jab", "Quick Fingers", "Go For The Eyes"],
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
		const { name, value } = e.currentTarget;
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				[name]: value,
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
		const { name, value } = e.currentTarget;
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				resistances: {
					...formValues.monster.resistances,
					[name]: value,
				},
			},
		});
	};

	const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setFormValues({
			...formValues,
			monster: {
				...formValues.monster,
				stats: {
					...formValues.monster.stats,
					[name]: value,
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

	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
							autoFocus
							name="description"
							label="Description"
							value={formValues.monster.description}
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
					<StatGroup
						title="Stats"
						stats={getStatsArray(formValues.monster.stats)}
						min={1}
						max={30}
						handleChange={handleChangeStats}
					/>
					<StatGroup
						title="Resistances"
						stats={getResistancesArray(
							formValues.monster.resistances
						)}
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
							Difficulty Rating
						</DialogContentText>
						<TextField
							sx={{
								width: "20ch",
							}}
							margin="dense"
							name="challenge"
							label="Rating"
							type="number"
							value={formValues.monster.challenge}
							onChange={handleChange}
							required
							inputProps={{
								min: 0,
								max: 20,
							}}
						/>
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
