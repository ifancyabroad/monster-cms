import {
	DeleteMonsterModal,
	Header,
	LoginModal,
	Monster,
	MonsterModal,
	SideDrawer,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div style={{ display: "flex" }}>
				<Header />
				<SideDrawer />
				<Switch>
					<Route exact={true} path="/" />
					<Route path="/:id" component={Monster} />
				</Switch>
				<LoginModal />
				<MonsterModal />
				<DeleteMonsterModal />
			</div>
		</Router>
	);
}

export default App;
