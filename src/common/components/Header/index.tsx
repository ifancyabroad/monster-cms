import { useContext } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useAppDispatch } from "common/hooks";
import { DRAWER_WIDTH } from "common/utils";
import { openLoginModal } from "features/modals";
import { openSidedrawer } from "features/sidedrawer";
import { AuthContext } from "common/context";
import { auth } from "firebaseSetup";

export const Header = () => {
	const dispatch = useAppDispatch();
	const user = useContext(AuthContext);

	const handleDrawerToggle = () => {
		dispatch(openSidedrawer());
	};

	const handleOpenLogin = () => {
		dispatch(openLoginModal());
	};

	const signOut = async () => {
		await auth.signOut();
	};

	return (
		<AppBar
			sx={{
				width: {
					sm: `calc(100% - ${DRAWER_WIDTH}px)`,
				},
				marginLeft: {
					sm: DRAWER_WIDTH,
				},
			}}
			position="fixed"
		>
			<Toolbar
				sx={{
					backgroundColor: "primary.main",
					color: "common.black",
				}}
			>
				<IconButton
					sx={{
						marginRight: 2,
						display: {
							sm: "none",
						},
					}}
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
				>
					<Menu />
				</IconButton>
				<Typography sx={{ flexGrow: 1 }} variant="h6">
					Monster Manual
				</Typography>
				{user ? (
					<Button color="inherit" type="button" onClick={signOut}>
						Logout
					</Button>
				) : (
					<Button
						color="inherit"
						type="button"
						onClick={handleOpenLogin}
					>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};
