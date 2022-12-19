import { TableCell, TableRow } from "@mui/material";
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteSkill } from "../../features/skills/skillsSlice";
import { ISkill } from "../../types";
import { CLASS_NAME_MAP, getSkillType, SKILL_TYPE_NAME_MAP } from "../../utils";
import { ConfirmationModal } from "../Modals";
import { SkillsTableDefaultActions } from "./SkillsTableDefaultActions";
import { SkillsTableAddSkillActions } from "./SkillsTableAddSkillActions";

interface IProps {
	skill: ISkill;
	type?: "default" | "addSkills";
}

export const SkillsTableRow: React.FC<IProps> = ({ skill, type }) => {
	const dispatch = useAppDispatch();
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

	const handleDeleteSkill = () => {
		setConfirmationModalOpen(true);
	};

	const handleCloseConfirmationModal = () => {
		setConfirmationModalOpen(false);
	};

	const handleConfirmDeleteSkill = async () => {
		try {
			await dispatch(deleteSkill(skill)).unwrap();
			setConfirmationModalOpen(false);
		} catch (error) {
			// TODO: Show error popup
		}
	};

	return (
		<Fragment>
			<TableRow hover tabIndex={-1}>
				<TableCell
					component="th"
					id={`skill-table-${skill.name}`}
					scope="row"
				>
					{skill.name}
				</TableCell>
				<TableCell>{CLASS_NAME_MAP[skill.class]}</TableCell>
				<TableCell>
					{SKILL_TYPE_NAME_MAP[getSkillType(skill)]}
				</TableCell>
				<TableCell align="right">{skill.maxUses}</TableCell>
				<TableCell align="right">{skill.price}</TableCell>
				<TableCell align="right">{skill.level}</TableCell>
				<TableCell>
					{type === "addSkills" ? (
						<SkillsTableAddSkillActions skill={skill} />
					) : (
						<SkillsTableDefaultActions
							skill={skill}
							onDeleteSkill={handleDeleteSkill}
						/>
					)}
				</TableCell>
			</TableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${skill.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDeleteSkill}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
