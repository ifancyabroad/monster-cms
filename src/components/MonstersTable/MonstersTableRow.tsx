import { TableCell, TableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IMonster } from "../../types";
import { STATS } from "../../utils";
import { ConfirmationModal } from "../Modals";
import { AuthContext } from "../../context/AuthContext";
import { deleteMonster } from "../../features/monsters/monstersSlice";
import { MonstersTableDefaultActions } from "./MonstersTableDefaultActions";

interface IProps {
	monster: IMonster;
}

export const MonstersTableRow: React.FC<IProps> = ({ monster }) => {
	const dispatch = useAppDispatch();
	const user = useContext(AuthContext);
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
	const isLoading = useAppSelector(
		(state) => state.monsters.status === "loading"
	);

	const handleDeleteMonster = () => {
		setConfirmationModalOpen(true);
	};

	const handleCloseConfirmationModal = () => {
		setConfirmationModalOpen(false);
	};

	const handleConfirmDeleteMonster = async () => {
		try {
			await dispatch(deleteMonster(monster)).unwrap();
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
						<MonstersTableDefaultActions
							monster={monster}
							onDeleteMonster={handleDeleteMonster}
						/>
					</TableCell>
				)}
			</TableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${monster.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDeleteMonster}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
