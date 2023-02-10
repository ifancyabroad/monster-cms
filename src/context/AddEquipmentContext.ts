import { createContext, Dispatch, useContext } from "react";
import { TEquipment } from "../types";
import { EquipmentSlot } from "../utils";

type TAddEquipmentFormAction =
	| {
			type: "ADD" | "REMOVE";
			payload: {
				slot: EquipmentSlot;
				value: string;
			};
	  }
	| {
			type: "RESET";
			payload: Partial<TEquipment>;
	  };

export const addEquipmentReducer = (
	state: Partial<TEquipment>,
	action: TAddEquipmentFormAction
) => {
	switch (action.type) {
		case "ADD":
			return {
				...state,
				[action.payload.slot]: action.payload.value,
			};
		case "REMOVE":
			return {
				...state,
				[action.payload.slot]: undefined,
			};
		case "RESET":
			return action.payload;
		default:
			throw Error("Unknown action");
	}
};

interface IContextProps {
	state: Partial<TEquipment>;
	dispatch: Dispatch<TAddEquipmentFormAction>;
}

export const AddEquipmentContext = createContext<IContextProps | null>(null);

export const useAddEquipmentContext = () => {
	const addEquipmentContext = useContext(AddEquipmentContext);
	if (!addEquipmentContext) {
		throw new Error(
			"No AddEquipmentContext.Provider found when calling useAddEquipmentContext."
		);
	}
	return addEquipmentContext;
};
