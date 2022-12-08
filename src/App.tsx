import {
	HOCLayout,
	LoginModal,
	Monster,
	MonsterModal,
	SkillModal,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<HOCLayout>
				<Switch>
					<Route exact={true} path="/" />
					<Route path="/:id" component={Monster} />
				</Switch>
			</HOCLayout>
			<LoginModal />
			<MonsterModal />
			<SkillModal />
		</Router>
	);
}

export default App;
