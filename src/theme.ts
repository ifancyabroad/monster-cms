import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		background: {
			default: "#212121",
			paper: "#424242",
		},
		primary: {
			main: "#90caf9",
		},
		secondary: {
			main: "#f48fb1",
		},
		error: {
			main: "#f44336",
		},
		warning: {
			main: "#ff9800",
		},
		info: {
			main: "#2196f3",
		},
		success: {
			main: "#4caf50",
		},
		mode: "dark",
	},
});

export default theme;
