import { createContext, Dispatch, useContext } from "react";
import { IEffectState, IUpdateFormAction } from "./effectReducer";

interface IContextProps {
	state: IEffectState;
	dispatch: Dispatch<IUpdateFormAction>;
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
