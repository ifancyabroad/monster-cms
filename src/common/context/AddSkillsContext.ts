import { createContext, Dispatch, useContext } from "react";

type TAddSkillsFormAction =
	| {
			type: "ADD" | "REMOVE";
			payload: string;
	  }
	| {
			type: "RESET";
			payload: string[];
	  };

export const addSkillsReducer = (
	state: string[],
	action: TAddSkillsFormAction
) => {
	switch (action.type) {
		case "ADD":
			return state.concat(action.payload);
		case "REMOVE":
			return state.filter((skill) => skill !== action.payload);
		case "RESET":
			return action.payload;
		default:
			throw Error("Unknown action");
	}
};

interface IContextProps {
	state: string[];
	dispatch: Dispatch<TAddSkillsFormAction>;
}

export const AddSkillsContext = createContext<IContextProps | null>(null);

export const useAddSkillsContext = () => {
	const addSkillsContext = useContext(AddSkillsContext);
	if (!addSkillsContext) {
		throw new Error(
			"No AddSkillsContext.Provider found when calling useAddSkillsContext."
		);
	}
	return addSkillsContext;
};
