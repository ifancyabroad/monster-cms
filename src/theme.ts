import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#56E39F",
		},
		secondary: {
			main: "#0091ad",
		},
		background: {
			default: "#171d1c",
			paper: "#293132",
		},
		mode: "dark",
	},
	typography: {
		allVariants: {
			fontFamily: "'Open Sans', sans-serif",
		},
	},
});

export default theme;
