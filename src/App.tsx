import { Header, LoginModal, Main, SideDrawer } from "./components";

function App() {
	return (
		<div style={{display: "flex"}}>
			<Header />
			<SideDrawer />
			<Main />
			<LoginModal />
		</div>
	);
}

export default App;
