import { createContext, Dispatch, useContext } from "react";
import { TAddWeaponsFormAction } from "./addWeaponsReducer";

interface IContextProps {
	state: string[];
	dispatch: Dispatch<TAddWeaponsFormAction>;
}

export const AddWeaponsContext = createContext<IContextProps | null>(null);

export const useAddWeaponsContext = () => {
	const addWeaponsContext = useContext(AddWeaponsContext);
	if (!addWeaponsContext) {
		throw new Error(
			"No AddWeaponsContext.Provider found when calling useAddWeaponsContext."
		);
	}
	return addWeaponsContext;
};
