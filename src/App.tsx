import { Header, Main, SideDrawer } from "./components";

function App() {
	return (
		<div style={{display: "flex"}}>
			<Header />
			<SideDrawer />
			<Main />
		</div>
	);
}

export default App;
