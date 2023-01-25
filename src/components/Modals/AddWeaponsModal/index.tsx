import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useEffect, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeAddWeaponsModal } from "../../../features/modals/modalsSlice";
import { WeaponsTable } from "../../Tables";
import { AddWeaponsContext, addWeaponsReducer } from "../../../context";

interface IProps {
	weapons: string[];
	onSetWeapons: (weapons: string[]) => void;
}

export const AddWeaponsModal: React.FC<IProps> = ({
	weapons,
	onSetWeapons,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.addWeaponsModalOpen);
	const [state, localDispatch] = useReducer(addWeaponsReducer, weapons);

	const providerState = {
		state,
		dispatch: localDispatch,
	};

	useEffect(() => {
		if (open) {
			localDispatch({ type: "RESET", payload: weapons });
		}
	}, [open, weapons]);

	const handleClose = () => {
		dispatch(closeAddWeaponsModal());
	};

	const handleConfirm = () => {
		onSetWeapons(state);
		dispatch(closeAddWeaponsModal());
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			fullWidth
			maxWidth="lg"
		>
			<DialogTitle id="form-dialog-title">Add Weapons</DialogTitle>
			<DialogContent>
				<AddWeaponsContext.Provider value={providerState}>
					<WeaponsTable type="addWeapons" />
				</AddWeaponsContext.Provider>
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
