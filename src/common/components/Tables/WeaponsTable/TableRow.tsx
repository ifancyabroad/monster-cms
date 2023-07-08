import { TableCell, TableRow as MUITableRow } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IWeapon } from "common/types";
import { RESISTANCES_NAME_MAP, WEAPON_SIZE_NAME_MAP } from "common/utils";
import { ConfirmationModal } from "features/modals";
import { TableDefaultActions } from "./TableDefaultActions";
import { TableAddActions } from "./TableAddActions";
import { AuthContext } from "common/context";
import { deleteWeapon } from "features/weapons";
import { EquipmentTypeIcon } from "features/equipment";

interface IProps {
	weapon: IWeapon;
	type?: "default" | "addWeapons";
}

export const TableRow: React.FC<IProps> = ({ weapon, type }) => {
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
			await dispatch(deleteWeapon(weapon)).unwrap();
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
					id={`table-${weapon.name}`}
					scope="row"
				>
					{weapon.name}
				</TableCell>
				<TableCell>
					<EquipmentTypeIcon equipment={weapon} width={32} />
				</TableCell>
				<TableCell>{RESISTANCES_NAME_MAP[weapon.damageType]}</TableCell>
				<TableCell>{WEAPON_SIZE_NAME_MAP[weapon.size]}</TableCell>
				<TableCell align="right">{weapon.price}</TableCell>
				<TableCell align="right">{weapon.level}</TableCell>
				{user && (
					<TableCell>
						{type === "addWeapons" ? (
							<TableAddActions weapon={weapon} />
						) : (
							<TableDefaultActions
								weapon={weapon}
								onDelete={handleDelete}
							/>
						)}
					</TableCell>
				)}
			</MUITableRow>

			<ConfirmationModal
				open={confirmationModalOpen}
				title="Are you sure?"
				content={`This action will permanently delete ${weapon.name} from the database.`}
				handleClose={handleCloseConfirmationModal}
				handleConfirm={handleConfirmDelete}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
