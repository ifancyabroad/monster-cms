import {
	Header,
	LoginModal,
	Monster,
	MonsterModal,
	SideDrawer,
	SkillModal,
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
				<SkillModal />
			</div>
		</Router>
	);
}

export default App;
