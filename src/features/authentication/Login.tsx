import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { auth } from "firebaseSetup";
import { ReactComponent as Logo } from "assets/images/icons/sea-dragon.svg";

export const Login: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const signIn = async () => {
		try {
			setIsLoading(true);
			await auth.signInWithEmailAndPassword(
				emailRef.current!.value,
				passwordRef.current!.value
			);
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
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: 2,
						}}
					>
						<Logo height={32} width={32} />
						<Typography variant="h6" fontWeight="bold">
							Monster Manual
						</Typography>
					</Box>
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
						<Button
							onClick={signIn}
							variant="contained"
							color="primary"
							disabled={isLoading}
							fullWidth
						>
							Login
						</Button>
					</div>
				</Stack>
			</Paper>
		</Box>
	);
};
