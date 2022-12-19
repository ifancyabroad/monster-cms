import { createContext, Dispatch, useContext } from "react";
import { TAddSkillsFormAction } from "./addSkillsReducer";

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
