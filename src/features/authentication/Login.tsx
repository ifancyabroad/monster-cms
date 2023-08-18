import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { closeLoginModal } from "features/modals/modalsSlice";
import { useRef, useState } from "react";
import { auth } from "firebaseSetup";

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();
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
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper elevation={3} sx={{ p: 3 }}>
				<Stack spacing={2}>
					<Typography variant="h4" textAlign="center" gutterBottom>
						Login
					</Typography>
					<Typography>
						Please enter your email and password to login.
					</Typography>
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
					<div>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={signIn}
							color="primary"
							disabled={isLoading}
						>
							Login
						</Button>
					</div>
				</Stack>
			</Paper>
		</Box>
	);
};
