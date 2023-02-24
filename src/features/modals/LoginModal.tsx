import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeLoginModal } from "features/modals/modalsSlice";
import { useRef, useState } from "react";
import { auth } from "firebaseSetup";

export const LoginModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.loginModalOpen);
	const [isLoading, setIsLoading] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleClose = () => {
		dispatch(closeLoginModal());
	};

	const signIn = async () => {
		try {
			setIsLoading(true);
			await auth.signInWithEmailAndPassword(
				emailRef.current!.value,
				passwordRef.current!.value
			);
			setIsLoading(false);
			dispatch(closeLoginModal());
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">Login</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please enter your email and password to login.
				</DialogContentText>
				<TextField
					inputRef={emailRef}
					autoFocus
					margin="dense"
					id="name"
					label="Email Address"
					type="email"
					fullWidth
				/>
				<TextField
					inputRef={passwordRef}
					margin="dense"
					id="standard-basic"
					label="Password"
					type="password"
					fullWidth
					required
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={signIn} color="primary" disabled={isLoading}>
					Login
				</Button>
			</DialogActions>
		</Dialog>
	);
};
