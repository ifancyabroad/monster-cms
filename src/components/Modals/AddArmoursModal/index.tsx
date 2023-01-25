import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useEffect, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeAddArmoursModal } from "../../../features/modals/modalsSlice";
import { ArmoursTable } from "../../ArmourTable";
import { AddArmoursContext, addArmoursReducer } from "../../../context";

interface IProps {
	armours: string[];
	onSetArmours: (armours: string[]) => void;
}

export const AddArmoursModal: React.FC<IProps> = ({
	armours,
	onSetArmours,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.addArmoursModalOpen);
	const [state, localDispatch] = useReducer(addArmoursReducer, armours);

	const providerState = {
		state,
		dispatch: localDispatch,
	};

	useEffect(() => {
		if (open) {
			localDispatch({ type: "RESET", payload: armours });
		}
	}, [open, armours]);

	const handleClose = () => {
		dispatch(closeAddArmoursModal());
	};

	const handleConfirm = () => {
		onSetArmours(state);
		dispatch(closeAddArmoursModal());
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			fullWidth
			maxWidth="lg"
		>
			<DialogTitle id="form-dialog-title">Add Armours</DialogTitle>
			<DialogContent>
				<AddArmoursContext.Provider value={providerState}>
					<ArmoursTable type="addArmours" />
				</AddArmoursContext.Provider>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleConfirm} color="primary">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};
