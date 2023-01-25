export type TAddArmoursFormAction =
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
