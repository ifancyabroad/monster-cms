import { createContext, Dispatch, useContext } from "react";
import { IEffectState, TEffectFormAction } from "./effectReducer";

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
