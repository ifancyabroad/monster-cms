export type TAddSkillsFormAction =
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
