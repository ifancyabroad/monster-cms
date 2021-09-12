import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    disabled
}) =>  (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {content}
            </DialogContentText>
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
