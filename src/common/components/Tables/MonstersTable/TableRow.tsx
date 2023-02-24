import { TableCell, TableRow as MUITableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IMonster } from "common/types";
import { STATS } from "common/utils";
import { ConfirmationModal } from "features/modals";
import { AuthContext } from "common/context";
import { deleteMonster } from "features/monsters";
import { TableDefaultActions } from "./TableDefaultActions";

interface IProps {
	monster: IMonster;
}

export const TableRow: React.FC<IProps> = ({ monster }) => {
	const dispatch = useAppDispatch();
	const user = useContext(AuthContext);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const isLoading = useAppSelector(
		(state) => state.monsters.status === "loading"
	);

	const handleDelete = () => {
		setConfirmationModalOpen(true);
	};

	const handleCloseConfirmationModal = () => {
		setConfirmationModalOpen(false);
	};

	const handleConfirmDelete = async () => {
		try {
			await dispatch(deleteMonster(monster)).unwrap();
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
					id={`monster-table-${monster.name}`}
					scope="row"
				>
					{monster.name}
				</TableCell>
				{STATS.map((stat) => (
					<TableCell key={stat} align="right">
						{monster.stats[stat]}
					</TableCell>
				))}
				<TableCell align="right">{monster.challenge}</TableCell>
				{user && (
					<TableCell>
						<TableDefaultActions
							monster={monster}
							onDelete={handleDelete}
						/>
					</TableCell>
				)}
			</MUITableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${monster.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
