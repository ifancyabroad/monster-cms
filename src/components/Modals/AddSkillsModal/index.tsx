import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useEffect, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeAddSkillsModal } from "../../../features/modals/modalsSlice";
import { SkillsTable } from "../../Tables";
import { AddSkillsContext, addSkillsReducer } from "../../../context";

interface IProps {
	skills: string[];
	onSetSkills: (skills: string[]) => void;
}

export const AddSkillsModal: React.FC<IProps> = ({ skills, onSetSkills }) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.addSkillsModalOpen);
	const [state, localDispatch] = useReducer(addSkillsReducer, skills);

	const providerState = {
		state,
		dispatch: localDispatch,
	};

	useEffect(() => {
		if (open) {
			localDispatch({ type: "RESET", payload: skills });
		}
	}, [open, skills]);

	const handleClose = () => {
		dispatch(closeAddSkillsModal());
	};

	const handleConfirm = () => {
		onSetSkills(state);
		dispatch(closeAddSkillsModal());
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			fullWidth
			maxWidth="lg"
		>
			<DialogTitle id="form-dialog-title">Add Skills</DialogTitle>
			<DialogContent>
				<AddSkillsContext.Provider value={providerState}>
					<SkillsTable type="addSkills" />
				</AddSkillsContext.Provider>
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
