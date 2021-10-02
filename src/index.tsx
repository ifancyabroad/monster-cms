import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthProvider } from "./provider/AuthProvider";
import { DatabaseListener } from "./components/DatabaseListener";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<DatabaseListener>
						<CssBaseline />
						<App />
					</DatabaseListener>
				</ThemeProvider>
			</AuthProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
