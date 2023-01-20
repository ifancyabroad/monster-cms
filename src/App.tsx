import {
	Armour,
	Classes,
	Dashboard,
	ErrorModal,
	HOCLayout,
	LoginModal,
	Monster,
	MonsterModal,
	Monsters,
	Settings,
	Skill,
	SkillModal,
	Skills,
	Weapon,
	WeaponModal,
	Weapons,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router basename="/monster-cms">
			<HOCLayout>
				<Switch>
					<Route exact={true} path="/" component={Dashboard} />
					<Route path="/settings" component={Settings} />
					<Route path="/monsters/:id" component={Monster} />
					<Route path="/monsters" component={Monsters} />
					<Route path="/skills/:id" component={Skill} />
					<Route path="/skills" component={Skills} />
					<Route path="/weapons/:id" component={Weapon} />
					<Route path="/weapons" component={Weapons} />
					<Route path="/armour" component={Armour} />
					<Route path="/classes" component={Classes} />
				</Switch>
			</HOCLayout>
			<LoginModal />
			<MonsterModal />
			<SkillModal />
			<WeaponModal />
			<ErrorModal />
		</Router>
	);
}

export default App;
