import {
	Button,
	Card,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
} from "@mui/material";
import { useEffect, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeAddSkillsModal } from "features/modals/modalsSlice";
import { SkillsTable } from "common/components";
import {
	AddSkillsContext,
	addSkillsReducer,
	useAddSkillsContext,
} from "common/context";
import { useSelector } from "react-redux";
import { SkillIcon, selectSkillById } from "features/skills";
import {
	ATTACK_SKILL_ID,
	SKILL_TYPE_NAME_MAP,
	getSkillType,
} from "common/utils";
import CloseIcon from "@mui/icons-material/Close";

interface ISkillCardProps {
	id: string;
}

const SkillCard: React.FC<ISkillCardProps> = ({ id }) => {
	const skill = useSelector(selectSkillById)(id);
	const context = useAddSkillsContext();

	const handleRemove = () => {
		context.dispatch({
			type: "REMOVE",
			payload: id,
		});
	};

	if (!skill) {
		return null;
	}

	const isAttack = skill.id === ATTACK_SKILL_ID;
	const secondaryText = `Level ${skill.level} ${
		SKILL_TYPE_NAME_MAP[getSkillType(skill)]
	}`;

	return (
		<Card variant="outlined">
			<CardHeader
				avatar={<SkillIcon skill={skill} />}
				title={skill.name}
				subheader={secondaryText}
				action={
					!isAttack && (
						<IconButton aria-label="remove" onClick={handleRemove}>
							<CloseIcon />
						</IconButton>
					)
				}
			/>
		</Card>
	);
};

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
					<Grid container spacing={2}>
						{state.map((skill) => (
							<Grid key={skill} item xs={12} md={6} lg={3}>
								<SkillCard id={skill} />
							</Grid>
						))}
					</Grid>
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
