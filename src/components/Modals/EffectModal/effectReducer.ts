import {
	AuxiliaryEffect,
	DamageType,
	EffectType,
	Stat,
	Target,
} from "../../../enums";
import {
	IAuxiliaryEffect,
	IDamageEffect,
	IHealEffect,
	ISkillEffect,
	IStatusEffect,
} from "../../../types";

export interface IUpdateFormAction {
	type: EffectType;
	payload: ISkillEffect;
}

export interface IEffectState {
	damageEffectForm: IDamageEffect;
	healEffectForm: IHealEffect;
	statusEffectForm: IStatusEffect;
	auxiliaryEffectForm: IAuxiliaryEffect;
}

const defaultDamageEffectValues: IDamageEffect = {
	type: EffectType.Damage,
	damageType: DamageType.Slashing,
	modifier: Stat.Strength,
	multiplier: 1,
	min: 1,
	max: 6,
};

const defaultHealEffectValues: IHealEffect = {
	type: EffectType.Heal,
	modifier: Stat.Wisdom,
	multiplier: 1,
	min: 1,
	max: 6,
};

const defaultStatusEffectValues: IStatusEffect = {
	type: EffectType.Status,
	target: Target.Enemy,
	modifiers: {
		stats: {},
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

export const initialState: IEffectState = {
	damageEffectForm: defaultDamageEffectValues,
	healEffectForm: defaultHealEffectValues,
	statusEffectForm: defaultStatusEffectValues,
	auxiliaryEffectForm: defaultAuxiliaryEffectValues,
};

export const effectReducer = (
	state: IEffectState,
	action: IUpdateFormAction
) => {
	const { type, payload } = action;
	switch (payload.type) {
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
		default:
			throw Error("Unknown action: " + type);
	}
};
