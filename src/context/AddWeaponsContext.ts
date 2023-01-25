import { createContext, Dispatch, useContext } from "react";

type TAddWeaponsFormAction =
	| {
			type: "ADD" | "REMOVE";
			payload: string;
	  }
	| {
			type: "RESET";
			payload: string[];
	  };

export const addWeaponsReducer = (
	state: string[],
	action: TAddWeaponsFormAction
) => {
	switch (action.type) {
		case "ADD":
			return state.concat(action.payload);
		case "REMOVE":
			return state.filter((weapon) => weapon !== action.payload);
		case "RESET":
			return action.payload;
		default:
			throw Error("Unknown action");
	}
};

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
