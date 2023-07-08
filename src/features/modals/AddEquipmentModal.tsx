import {
	Box,
	Button,
	Card,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Tab,
	Tabs,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeAddEquipmentModal } from "features/modals/modalsSlice";
import { ArmoursTable, WeaponsTable } from "common/components";
import {
	AddEquipmentContext,
	addEquipmentReducer,
	useAddEquipmentContext,
} from "common/context";
import { TEquipment } from "common/types";
import {
	EQUIPMENT_SLOTS,
	EQUIPMENT_SLOT_NAME_MAP,
	EquipmentSlot,
} from "common/utils";
import { useSelector } from "react-redux";
import { EquipmentTypeIcon, selectEquipmentById } from "features/equipment";
import CloseIcon from "@mui/icons-material/Close";

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

interface IEquipmentCardProps {
	id: string;
	slot: EquipmentSlot;
}

const EquipmentCard: React.FC<IEquipmentCardProps> = ({ id, slot }) => {
	const equipment = useSelector(selectEquipmentById)(id);
	const context = useAddEquipmentContext();

	const handleRemove = () => {
		context.dispatch({
			type: "REMOVE",
			payload: {
				slot,
				value: id,
			},
		});
	};

	if (!equipment) {
		return null;
	}

	return (
		<Card variant="outlined">
			<CardHeader
				avatar={<EquipmentTypeIcon equipment={equipment} />}
				title={EQUIPMENT_SLOT_NAME_MAP[slot]}
				subheader={equipment.name}
				action={
					<IconButton aria-label="remove" onClick={handleRemove}>
						<CloseIcon />
					</IconButton>
				}
			/>
		</Card>
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
					<Grid container spacing={2}>
						{EQUIPMENT_SLOTS.map((slot) => {
							const equipment = state[slot];

							if (equipment) {
								return (
									<Grid key={slot} item xs={12} md={6} lg={3}>
										<AddEquipmentContext.Provider
											value={providerState}
										>
											<EquipmentCard
												id={equipment}
												slot={slot}
											/>
										</AddEquipmentContext.Provider>
									</Grid>
								);
							}

							return null;
						})}
					</Grid>
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
