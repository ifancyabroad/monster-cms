import { createContext, Dispatch, useContext } from "react";
import { TAddArmoursFormAction } from "./addArmoursReducer";

interface IContextProps {
	state: string[];
	dispatch: Dispatch<TAddArmoursFormAction>;
}

export const AddArmoursContext = createContext<IContextProps | null>(null);

export const useAddArmoursContext = () => {
	const addArmoursContext = useContext(AddArmoursContext);
	if (!addArmoursContext) {
		throw new Error(
			"No AddArmoursContext.Provider found when calling useAddArmoursContext."
		);
	}
	return addArmoursContext;
};
