import { createContext, Dispatch, useContext } from "react";

type TAddArmoursFormAction =
	| {
			type: "ADD" | "REMOVE";
			payload: string;
	  }
	| {
			type: "RESET";
			payload: string[];
	  };

export const addArmoursReducer = (
	state: string[],
	action: TAddArmoursFormAction
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