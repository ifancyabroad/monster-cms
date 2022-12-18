import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openSkillModal } from "../../features/modals/modalsSlice";
import { deleteSkill } from "../../features/skills/skillsSlice";
import { ISkill } from "../../types";
import { CLASS_NAME_MAP, getSkillType, SKILL_TYPE_NAME_MAP } from "../../utils";
import { ConfirmationModal } from "../Modals";

export const SkillsTableRow: React.FC<ISkill> = (skill) => {
	const dispatch = useAppDispatch();
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const isLoading = useAppSelector(
		(state) => state.skills.status === "loading"
	);

	const handleUpdateSkill = () => {
		dispatch(openSkillModal(skill));
	};

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
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							gap: 2,
						}}
					>
						<IconButton
							aria-label="view"
							color="primary"
							component={Link}
							to={`/skills/${skill.id}`}
						>
							<VisibilityIcon />
						</IconButton>
						<IconButton
							aria-label="update"
							color="secondary"
							onClick={handleUpdateSkill}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							aria-label="delete"
							color="warning"
							onClick={handleDeleteSkill}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
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
