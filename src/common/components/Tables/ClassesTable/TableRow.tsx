import { TableCell, TableRow as MUITableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ICharacterClass } from "common/types";
import { STATS } from "common/utils";
import { ConfirmationModal } from "features/modals";
import { AuthContext } from "common/context";
import { TableDefaultActions } from "./TableDefaultActions";
import { deleteClass } from "features/classes";

interface IProps {
	characterClass: ICharacterClass;
}

export const TableRow: React.FC<IProps> = ({ characterClass }) => {
	const dispatch = useAppDispatch();
	const user = useContext(AuthContext);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const isLoading = useAppSelector(
		(state) => state.classes.status === "loading"
	);

	const handleDelete = () => {
		setConfirmationModalOpen(true);
	};

	const handleCloseConfirmationModal = () => {
		setConfirmationModalOpen(false);
	};

	const handleConfirmDelete = async () => {
		try {
			await dispatch(deleteClass(characterClass)).unwrap();
			setConfirmationModalOpen(false);
		} catch (error) {
			// TODO: Show error popup
		}
	};

	return (
		<Fragment>
			<MUITableRow hover tabIndex={-1}>
				<TableCell>
					<img
						src={characterClass.icon}
						alt={characterClass.name}
						width="40"
					/>
				</TableCell>
				<TableCell
					component="th"
					id={`class-table-${characterClass.name}`}
					scope="row"
				>
					{characterClass.name}
				</TableCell>
				{STATS.map((stat) => (
					<TableCell key={stat} align="right">
						{characterClass.stats[stat]}
					</TableCell>
				))}
				{user && (
					<TableCell>
						<TableDefaultActions
							characterClass={characterClass}
							onDelete={handleDelete}
						/>
					</TableCell>
				)}
			</MUITableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${characterClass.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
