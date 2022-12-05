import { EffectType, Stat } from "../../../enums";
import {
	IBuffEffect,
	IDamageEffect,
	IDebuffEffect,
	IHealEffect,
	IPoisonEffect,
	ISkillEffect,
	IStunEffect,
} from "../../../types";

interface IUpdateFormAction {
	type: EffectType;
	payload: ISkillEffect;
}

interface IEffectState {
	damageEffectForm: IDamageEffect;
	healEffectForm: IHealEffect;
	buffEffectForm: IBuffEffect;
	debuffEffectForm: IDebuffEffect;
	stunEffectForm: IStunEffect;
	poisonEffectForm: IPoisonEffect;
}

const defaultDamageEffectValues: IDamageEffect = {
	type: EffectType.Damage,
	modifier: Stat.Strength,
	multiplier: 1,
	min: 1,
	max: 6,
};

const defaultHealEffectValues: IHealEffect = {
	type: EffectType.Heal,
	modifier: Stat.Intelligence,
	multiplier: 1,
	min: 1,
	max: 6,
};

const defaultBuffEffectValues: IBuffEffect = {
	type: EffectType.Buff,
	modifiers: {
		stats: {
			[Stat.Strength]: 5,
		},
		resistances: {},
	},
	accuracy: 100,
	duration: 5,
};

const defaultDebuffEffectValues: IDebuffEffect = {
	type: EffectType.Debuff,
	modifiers: {
		stats: {
			[Stat.Strength]: 5,
		},
		resistances: {},
	},
	accuracy: 100,
	duration: 5,
};

const defaultStunEffectValues: IStunEffect = {
	type: EffectType.Stun,
	accuracy: 50,
	duration: 3,
};

const defaultPoisonEffectValues: IPoisonEffect = {
	type: EffectType.Poison,
	accuracy: 50,
	duration: 5,
	damage: 5,
};

export const initialState: IEffectState = {
	damageEffectForm: defaultDamageEffectValues,
	healEffectForm: defaultHealEffectValues,
	buffEffectForm: defaultBuffEffectValues,
	debuffEffectForm: defaultDebuffEffectValues,
	stunEffectForm: defaultStunEffectValues,
	poisonEffectForm: defaultPoisonEffectValues,
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
		case EffectType.Buff:
			return {
				...state,
				buffEffectForm: payload,
			};
		case EffectType.Debuff:
			return {
				...state,
				debuffEffectForm: payload,
			};
		case EffectType.Stun:
			return {
				...state,
				stunEffectForm: payload,
			};
		case EffectType.Poison:
			return {
				...state,
				poisonEffectForm: payload,
			};
		default:
			throw Error("Unknown action: " + type);
	}
};
