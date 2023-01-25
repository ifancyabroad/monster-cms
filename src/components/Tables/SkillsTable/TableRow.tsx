import { TableCell, TableRow as MUITableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteSkill } from "../../../features/skills/skillsSlice";
import { ISkill } from "../../../types";
import {
	CLASS_NAME_MAP,
	getSkillType,
	SKILL_TYPE_NAME_MAP,
} from "../../../utils";
import { ConfirmationModal } from "../../Modals";
import { TableDefaultActions } from "./TableDefaultActions";
import { TableAddActions } from "./TableAddActions";
import { AuthContext } from "../../../context";

interface IProps {
	skill: ISkill;
	type?: "default" | "addSkills";
}

export const TableRow: React.FC<IProps> = ({ skill, type }) => {
	const dispatch = useAppDispatch();
	const user = useContext(AuthContext);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

	const handleDelete = () => {
		setConfirmationModalOpen(true);
	};

	const handleCloseConfirmationModal = () => {
		setConfirmationModalOpen(false);
	};

	const handleConfirmDelete = async () => {
		try {
			await dispatch(deleteSkill(skill)).unwrap();
			setConfirmationModalOpen(false);
		} catch (error) {
			// TODO: Show error popup
		}
	};

	return (
		<Fragment>
			<MUITableRow hover tabIndex={-1}>
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
				{user && (
					<TableCell>
						{type === "addSkills" ? (
							<TableAddActions skill={skill} />
						) : (
							<TableDefaultActions
								skill={skill}
								onDelete={handleDelete}
							/>
						)}
					</TableCell>
				)}
			</MUITableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${skill.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
