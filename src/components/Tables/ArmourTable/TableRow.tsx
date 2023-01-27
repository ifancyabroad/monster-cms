import { TableCell, TableRow as MUITableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IArmour } from "../../../types";
import { EQUIPMENT_TYPE_NAME_MAP } from "../../../utils";
import { ConfirmationModal } from "../../Modals";
import { TableDefaultActions } from "./TableDefaultActions";
import { TableAddActions } from "./TableAddActions";
import { AuthContext } from "../../../context/AuthContext";
import { deleteArmour } from "../../../features/armours/armoursSlice";

interface IProps {
	armour: IArmour;
	type?: "default" | "addArmours";
}

export const TableRow: React.FC<IProps> = ({ armour, type }) => {
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
			await dispatch(deleteArmour(armour)).unwrap();
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
					id={`table-${armour.name}`}
					scope="row"
				>
					{armour.name}
				</TableCell>
				<TableCell>{EQUIPMENT_TYPE_NAME_MAP[armour.type]}</TableCell>
				<TableCell align="right">{armour.defense}</TableCell>
				<TableCell align="right">{armour.price}</TableCell>
				<TableCell align="right">{armour.level}</TableCell>
				{user && (
					<TableCell>
						{type === "addArmours" ? (
							<TableAddActions armour={armour} />
						) : (
							<TableDefaultActions
								armour={armour}
								onDelete={handleDelete}
							/>
						)}
					</TableCell>
				)}
			</MUITableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${armour.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</Fragment>
	);
};