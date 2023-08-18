import { HOCLayout } from "common/components";
import { DatabaseListener } from "common/components/DatabaseListener";
import { AuthContext } from "common/context";
import { Armour, Armours } from "features/armours";
import { Login } from "features/authentication";
import { Class, Classes } from "features/classes";
import { Dashboard } from "features/dashboard";
import {
	ArmourModal,
	ClassModal,
	ErrorModal,
	MonsterModal,
	SkillModal,
	WeaponModal,
} from "features/modals";
import { Monster, Monsters } from "features/monsters";
import { Settings } from "features/settings";
import { Skill, Skills } from "features/skills";
import { Weapon, Weapons } from "features/weapons";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const user = useContext(AuthContext);

	return (
		<Router basename="/admin">
			{user ? (
				<DatabaseListener>
					<HOCLayout>
						<Switch>
							<Route
								exact={true}
								path="/"
								component={Dashboard}
							/>
							<Route path="/settings" component={Settings} />
							<Route path="/monsters/:id" component={Monster} />
							<Route path="/monsters" component={Monsters} />
							<Route path="/skills/:id" component={Skill} />
							<Route path="/skills" component={Skills} />
							<Route path="/weapons/:id" component={Weapon} />
							<Route path="/weapons" component={Weapons} />
							<Route path="/armours/:id" component={Armour} />
							<Route path="/armours" component={Armours} />
							<Route path="/classes/:id" component={Class} />
							<Route path="/classes" component={Classes} />
						</Switch>
					</HOCLayout>
				</DatabaseListener>
			) : (
				<Route path="/" component={Login} />
			)}
			<MonsterModal />
			<ClassModal />
			<SkillModal />
			<WeaponModal />
			<ArmourModal />
			<ErrorModal />
		</Router>
	);
}

export default App;
