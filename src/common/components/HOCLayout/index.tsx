import { Box, Container } from "@mui/material";
import { Header } from "common/components/Header";
import { SideDrawer } from "features/sidedrawer/SideDrawer";

export const HOCLayout: React.FC = ({ children }) => {
	return (
		<div style={{ display: "flex" }}>
			<Header />
			<SideDrawer />
			<Container sx={{ flexGrow: 1, padding: 3 }} maxWidth="lg">
				<Box sx={(theme) => theme.mixins.toolbar} />
				{children}
			</Container>
		</div>
	);
};
