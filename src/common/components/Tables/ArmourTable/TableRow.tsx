import { TableCell, TableRow as MUITableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour } from "common/types";
import { ConfirmationModal } from "features/modals";
import { TableDefaultActions } from "./TableDefaultActions";
import { TableAddActions } from "./TableAddActions";
import { AuthContext } from "common/context";
import { deleteArmour } from "features/armours";
import { EquipmentIcon, EquipmentTypeIcon } from "features/equipment";
import { ARMOUR_TYPE_NAME_MAP } from "common/utils";
import { selectClassById } from "features/classes";

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
	const classById = useAppSelector(selectClassById);

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
				<TableCell>
					<EquipmentIcon equipment={armour} />
				</TableCell>
				<TableCell
					component="th"
					id={`table-${armour.name}`}
					scope="row"
				>
					{armour.name}
				</TableCell>
				<TableCell>
					<EquipmentTypeIcon equipment={armour} width={32} />
				</TableCell>
				<TableCell align="left">
					{armour.armourType &&
						ARMOUR_TYPE_NAME_MAP[armour.armourType]}
				</TableCell>
				<TableCell align="left">
					{armour.characterClass &&
						classById(armour.characterClass)?.name}
				</TableCell>
				<TableCell align="right">{armour.armourClass}</TableCell>
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
