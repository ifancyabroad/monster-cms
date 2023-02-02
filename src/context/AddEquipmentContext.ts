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
			payload: TEquipment;
	  };

export const initialEquipmentState: TEquipment = {
	[EquipmentSlot.Head]: null,
	[EquipmentSlot.Neck]: null,
	[EquipmentSlot.Body]: null,
	[EquipmentSlot.Waist]: null,
	[EquipmentSlot.Hands]: null,
	[EquipmentSlot.Feet]: null,
	[EquipmentSlot.Finger1]: null,
	[EquipmentSlot.Finger2]: null,
	[EquipmentSlot.Hand1]: null,
	[EquipmentSlot.Hand2]: null,
};

export const addEquipmentReducer = (
	state: TEquipment,
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
				[action.payload.slot]: null,
			};
		case "RESET":
			return action.payload;
		default:
			throw Error("Unknown action");
	}
};

interface IContextProps {
	state: TEquipment;
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
