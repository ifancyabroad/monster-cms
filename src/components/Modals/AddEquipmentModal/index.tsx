import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Tab,
	Tabs,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeAddEquipmentModal } from "../../../features/modals/modalsSlice";
import { ArmoursTable } from "../../Tables/ArmourTable";
import { AddEquipmentContext, addEquipmentReducer } from "../../../context";
import { TEquipment } from "../../../types";
import { WeaponsTable } from "../../Tables";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`equipment-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
};

interface IProps {
	equipment: Partial<TEquipment>;
	onSetEquipment: (equipment: Partial<TEquipment>) => void;
}

export const AddEquipmentModal: React.FC<IProps> = ({
	equipment,
	onSetEquipment,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.addEquipmentModalOpen);
	const [state, localDispatch] = useReducer(addEquipmentReducer, equipment);
	const [activeTab, setActiveTab] = useState(0);

	const providerState = {
		state,
		dispatch: localDispatch,
	};

	useEffect(() => {
		if (open) {
			localDispatch({ type: "RESET", payload: equipment });
		}
	}, [open, equipment]);

	const handleClose = () => {
		dispatch(closeAddEquipmentModal());
	};

	const handleConfirm = () => {
		onSetEquipment(state);
		dispatch(closeAddEquipmentModal());
	};

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			fullWidth
			maxWidth="lg"
		>
			<DialogTitle id="form-dialog-title">Add Equipment</DialogTitle>
			<DialogContent>
				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={activeTab}
							onChange={handleChangeTab}
							aria-label="equipment table tabs"
						>
							<Tab
								label="Weapons"
								id="equipment-tab-0"
								aria-controls="tabpanel-0"
							/>
							<Tab
								label="Armour"
								id="equipment-tab-1"
								aria-controls="tabpanel-1"
							/>
						</Tabs>
					</Box>
					<TabPanel value={activeTab} index={0}>
						<AddEquipmentContext.Provider value={providerState}>
							<WeaponsTable type="addWeapons" />
						</AddEquipmentContext.Provider>
					</TabPanel>
					<TabPanel value={activeTab} index={1}>
						<AddEquipmentContext.Provider value={providerState}>
							<ArmoursTable type="addArmours" />
						</AddEquipmentContext.Provider>
					</TabPanel>
				</Box>
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
