import { createContext, Dispatch, useContext } from "react";
import { AuxiliaryEffect, DamageType, EffectType } from "common/utils";
import {
	IAuxiliaryEffect,
	IDamageEffect,
	IHealEffect,
	ISkillEffect,
	IStatusEffect,
	IWeaponDamageEffect,
} from "common/types";

type TEffectFormAction =
	| {
			type: "UPDATE";
			payload: ISkillEffect;
	  }
	| {
			type: "RESET";
	  };

export interface IEffectState {
	weaponDamageEffectForm: IWeaponDamageEffect;
	damageEffectForm: IDamageEffect;
	healEffectForm: IHealEffect;
	statusEffectForm: IStatusEffect;
	auxiliaryEffectForm: IAuxiliaryEffect;
}

const defaultWeaponDamageEffectValues: IWeaponDamageEffect = {
	type: EffectType.WeaponDamage,
	multiplier: 1,
};

const defaultDamageEffectValues: IDamageEffect = {
	type: EffectType.Damage,
	damageType: DamageType.Slashing,
	min: 1,
	max: 6,
};

const defaultHealEffectValues: IHealEffect = {
	type: EffectType.Heal,
	min: 1,
	max: 6,
};

const defaultStatusEffectValues: IStatusEffect = {
	type: EffectType.Status,
	modifiers: {
		stats: {},
		auxiliaryStats: {},
		resistances: {},
	},
	accuracy: 100,
	duration: 5,
};

const defaultAuxiliaryEffectValues: IAuxiliaryEffect = {
	type: EffectType.Auxiliary,
	effect: AuxiliaryEffect.Stun,
	accuracy: 50,
	duration: 3,
};

export const initialEffectState: IEffectState = {
	weaponDamageEffectForm: defaultWeaponDamageEffectValues,
	damageEffectForm: defaultDamageEffectValues,
	healEffectForm: defaultHealEffectValues,
	statusEffectForm: defaultStatusEffectValues,
	auxiliaryEffectForm: defaultAuxiliaryEffectValues,
};

export const effectReducer = (
	state: IEffectState,
	action: TEffectFormAction
) => {
	if (action.type === "UPDATE") {
		const { payload } = action;
		switch (payload.type) {
			case EffectType.WeaponDamage:
				return {
					...state,
					weaponDamageEffectForm: payload,
				};
			case EffectType.Damage:
				return {
					...state,
					damageEffectForm: payload,
				};
			case EffectType.Heal:
				return {
					...state,
					healEffectForm: payload,
				};
			case EffectType.Status:
				return {
					...state,
					statusEffectForm: payload,
				};
			case EffectType.Auxiliary:
				return {
					...state,
					auxiliaryEffectForm: payload,
				};
		}
	}

	if (action.type === "RESET") {
		return initialEffectState;
	}

	throw Error("Unknown action");
};

interface IContextProps {
	state: IEffectState;
	dispatch: Dispatch<TEffectFormAction>;
}

export const EffectContext = createContext<IContextProps | null>(null);

export const useEffectContext = () => {
	const effectContext = useContext(EffectContext);
	if (!effectContext) {
		throw new Error(
			"No EffectContext.Provider found when calling useEffectContext."
		);
	}
	return effectContext;
};
