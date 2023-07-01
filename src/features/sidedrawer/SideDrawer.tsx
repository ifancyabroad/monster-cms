import { Box, Drawer } from "@mui/material";
import { DRAWER_TOP, DRAWER_WIDTH } from "common/utils/constants";
import { closeSidedrawer } from "./sidedrawerSlice";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { SideDrawerContent } from "./SideDrawerContent";

export const SideDrawer: React.FC = () => {
	const dispatch = useAppDispatch();
	const mobileOpen = useAppSelector((state) => state.sidedrawer.open);

	const handleDrawerToggle = () => {
		dispatch(closeSidedrawer());
	};

	return (
		<Box
			sx={{
				width: {
					sm: DRAWER_WIDTH,
				},
				flexShrink: {
					sm: 0,
				},
			}}
			aria-label="monsters list"
		>
			<Drawer
				sx={{ display: { sm: "none", xs: "block" } }}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				PaperProps={{
					sx: {
						width: DRAWER_WIDTH,
					},
				}}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				<SideDrawerContent />
			</Drawer>
			<Drawer
				sx={{ display: { xs: "none", sm: "block" } }}
				variant="permanent"
				PaperProps={{
					sx: {
						width: DRAWER_WIDTH,
						top: DRAWER_TOP,
					},
				}}
				open
			>
				<SideDrawerContent />
			</Drawer>
		</Box>
	);
};
