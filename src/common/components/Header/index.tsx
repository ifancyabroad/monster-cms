import { useContext, useState } from "react";
import {
	AppBar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openLoginModal } from "features/modals";
import { openSidedrawer } from "features/sidedrawer";
import { AuthContext } from "common/context";
import { auth } from "firebaseSetup";
import { AccountCircle, Login, Menu as MenuIcon } from "@mui/icons-material";
import { ReactComponent as Logo } from "assets/images/icons/sea-dragon.svg";
import { ScriptButton } from "common/components";

export const Header = () => {
	const dispatch = useAppDispatch();
	const user = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleDrawerToggle = () => {
		dispatch(openSidedrawer());
	};

	const handleOpenLogin = () => {
		dispatch(openLoginModal());
	};

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const signOut = async () => {
		setAnchorEl(null);
		await auth.signOut();
	};

	return (
		<AppBar position="fixed">
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
					<MenuIcon />
				</IconButton>
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Logo height={32} width={32} />
					<Typography variant="h6" fontWeight="bold">
						Monster Manual
					</Typography>
				</Box>
				{user ? (
					<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
						<ScriptButton />
						<IconButton
							aria-label="account menu"
							color="inherit"
							type="button"
							onClick={handleOpenMenu}
						>
							<AccountCircle fontSize="large" />
						</IconButton>
						<Menu
							id="lock-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "lock-button",
								role: "listbox",
							}}
						>
							<MenuItem onClick={signOut}>Sign Out</MenuItem>
						</Menu>
					</Box>
				) : (
					<IconButton
						aria-label="login"
						color="inherit"
						type="button"
						onClick={handleOpenLogin}
					>
						<Login fontSize="large" />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
};
