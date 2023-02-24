import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

interface IProps {
	open: boolean;
	title: string;
	content: string;
	handleClose: () => void;
	handleConfirm: () => void;
	disabled?: boolean;
}

export const ConfirmationModal: React.FC<IProps> = ({
	open,
	title,
	content,
	handleClose,
	handleConfirm,
	disabled,
}) => (
	<Dialog
		open={open}
		onClose={handleClose}
		aria-labelledby="form-dialog-title"
	>
		<DialogTitle id="form-dialog-title">{title}</DialogTitle>
		<DialogContent>
			<DialogContentText>{content}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleClose} color="primary">
				Cancel
			</Button>
			<Button onClick={handleConfirm} color="primary" disabled={disabled}>
				Confirm
			</Button>
		</DialogActions>
	</Dialog>
);
