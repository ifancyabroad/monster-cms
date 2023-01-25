import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeEffectModal } from "../../../features/modals/modalsSlice";
import { useEffect, useReducer, useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { ISkillEffect } from "../../../types";
import { EFFECTS_NAME_MAP, EffectType } from "../../../utils";
import { DamageEffect } from "./DamageEffect";
import { HealEffect } from "./HealEffect";
import { StatusEffect } from "./StatusEffect";
import {
	EffectContext,
	effectReducer,
	initialEffectState,
} from "../../../context";
import { AuxiliaryEffect } from "./AuxiliaryEffect";
import { WeaponDamageEffect } from "./WeaponDamageEffect";

interface IProps {
	effects: Readonly<EffectType[]>;
	onAddEffect: (effect: ISkillEffect) => void;
	onUpdateEffect: (effect: ISkillEffect, index: number) => void;
}

export const EffectModal: React.FC<IProps> = ({
	effects,
	onAddEffect,
	onUpdateEffect,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.effectModal.open);
	const effect = useAppSelector((state) => state.modals.effectModal.effect);
	const index = useAppSelector((state) => state.modals.effectModal.index);
	const [effectType, setEffectType] = useState(effects[0]);
	const [state, localDispatch] = useReducer(
		effectReducer,
		initialEffectState
	);
	const title = effect ? "Update Effect" : "Add Effect";
	const confirm = effect ? "Update" : "Add";

	const providerState = {
		state,
		dispatch: localDispatch,
	};

	useEffect(() => {
		if (effect) {
			setEffectType(effect.type);
			localDispatch({ type: "UPDATE", payload: effect });
		}
	}, [effect]);

	useEffect(() => {
		if (!open) {
			localDispatch({ type: "RESET" });
		}
	}, [open]);

	const handleClose = () => {
		dispatch(closeEffectModal());
	};

	const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEffectType(value as EffectType);
	};

	const handleAddEffect = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formValues = {
			[EffectType.WeaponDamage]: state.weaponDamageEffectForm,
			[EffectType.Damage]: state.damageEffectForm,
			[EffectType.Heal]: state.healEffectForm,
			[EffectType.Status]: state.statusEffectForm,
			[EffectType.Auxiliary]: state.auxiliaryEffectForm,
		}[effectType];

		if (effect && typeof index === "number") {
			onUpdateEffect(formValues, index);
		} else {
			onAddEffect(formValues);
		}

		dispatch(closeEffectModal());
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
			<form onSubmit={handleAddEffect}>
				<DialogContent>
					<Box mb={3}>
						<DialogContentText
							variant="subtitle1"
							component="h5"
							gutterBottom
						>
							Effect Type
						</DialogContentText>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									fullWidth
									select
									margin="dense"
									label="Type"
									name="effectType"
									value={effectType}
									onChange={handleChangeType}
								>
									{effects.map((effect, index) => (
										<MenuItem key={index} value={effect}>
											{EFFECTS_NAME_MAP[effect]}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
					</Box>
					<EffectContext.Provider value={providerState}>
						{
							{
								[EffectType.WeaponDamage]: (
									<WeaponDamageEffect />
								),
								[EffectType.Damage]: <DamageEffect />,
								[EffectType.Heal]: <HealEffect />,
								[EffectType.Status]: <StatusEffect />,
								[EffectType.Auxiliary]: <AuxiliaryEffect />,
							}[effectType]
						}
					</EffectContext.Provider>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						{confirm}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
