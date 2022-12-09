import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeEffectModal } from "../../../features/modals/modalsSlice";
import { useEffect, useReducer, useState } from "react";
import {
	Box,
	createStyles,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from "@material-ui/core";
import { ISkillEffect } from "../../../types";
import { EFFECTS, EFFECTS_NAME_MAP } from "../../../utils";
import { EffectType } from "../../../enums";
import { DamageEffect } from "./DamageEffect";
import { effectReducer, initialState } from "./effectReducer";
import { HealEffect } from "./HealEffect";
import { BuffEffect } from "./BuffEffect";
import { EffectContext } from "./effectContext";

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
	})
);

interface IProps {
	onAddEffect: (effect: ISkillEffect) => void;
	onUpdateEffect: (effect: ISkillEffect) => void;
}

export const EffectModal: React.FC<IProps> = ({
	onAddEffect,
	onUpdateEffect,
}) => {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.effectModal.open);
	const effect = useAppSelector((state) => state.modals.effectModal.effect);
	const [effectType, setEffectType] = useState(EffectType.Damage);
	const [state, localDispatch] = useReducer(effectReducer, initialState);
	const title = effect ? "Update Effect" : "Add Effect";

	const providerState = {
		state,
		dispatch: localDispatch,
	};

	useEffect(() => {
		if (effect) {
			localDispatch({ type: effect.type, payload: effect });
		}
	}, [effect]);

	const handleClose = () => {
		dispatch(closeEffectModal());
	};

	const handleChangeType = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const { value } = e.target;
		setEffectType(value as EffectType);
	};

	const handleAddEffect = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formValues = {
			[EffectType.Damage]: state.damageEffectForm,
			[EffectType.Heal]: state.healEffectForm,
			[EffectType.Buff]: state.buffEffectForm,
			[EffectType.Debuff]: state.debuffEffectForm,
			[EffectType.Stun]: state.stunEffectForm,
			[EffectType.Poison]: state.poisonEffectForm,
		}[effectType];

		if (effect) {
			onUpdateEffect(formValues);
		} else {
			onAddEffect(formValues);
		}

		dispatch(closeEffectModal());
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<form onSubmit={handleAddEffect}>
				<DialogContent>
					<Box mb={3}>
						<DialogContentText variant="subtitle1" component="h5">
							Effect Type
						</DialogContentText>
						<FormControl className={classes.dropdown}>
							<InputLabel id="effect-type-label">Type</InputLabel>
							<Select
								labelId="effect-type-label"
								name="effectType"
								value={effectType}
								onChange={handleChangeType}
							>
								{EFFECTS.map((effect, index) => (
									<MenuItem key={index} value={effect}>
										{EFFECTS_NAME_MAP[effect]}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<EffectContext.Provider value={providerState}>
						{
							{
								[EffectType.Damage]: <DamageEffect />,
								[EffectType.Heal]: <HealEffect />,
								[EffectType.Buff]: <BuffEffect />,
								[EffectType.Debuff]: <DamageEffect />,
								[EffectType.Stun]: <DamageEffect />,
								[EffectType.Poison]: <DamageEffect />,
							}[effectType]
						}
					</EffectContext.Provider>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
