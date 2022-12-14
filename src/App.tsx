import {
	HOCLayout,
	LoginModal,
	Monster,
	MonsterModal,
	Settings,
	Skill,
	SkillModal,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<HOCLayout>
				<Switch>
					<Route exact={true} path="/" />
					<Route path="/settings" component={Settings} />
					<Route path="/monsters/:id" component={Monster} />
					<Route path="/skills/:id" component={Skill} />
				</Switch>
			</HOCLayout>
			<LoginModal />
			<MonsterModal />
			<SkillModal />
		</Router>
	);
}

export default App;
