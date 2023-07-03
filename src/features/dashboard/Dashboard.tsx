import { Grid, Typography } from "@mui/material";
import { DashboardCard } from "./DashboardCard";
import monstersImage from "assets/images/monsters.jpg";
import skillsImage from "assets/images/skills.png";
import weaponsImage from "assets/images/weapons.webp";
import armourImage from "assets/images/armour.jpg";
import { useAppDispatch } from "common/hooks";
import {
	openArmourModal,
	openMonsterModal,
	openSkillModal,
	openWeaponModal,
} from "features/modals";

export const Dashboard: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleAddMonster = () => {
		dispatch(openMonsterModal());
	};

	const handleAddSkill = () => {
		dispatch(openSkillModal());
	};

	const handleAddWeapon = () => {
		dispatch(openWeaponModal());
	};

	const handleAddArmour = () => {
		dispatch(openArmourModal());
	};

	return (
		<div>
			<Typography variant="h2" gutterBottom>
				Dashboard
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} lg={3}>
					<DashboardCard
						title="Monsters"
						description="A complete list of monsters"
						image={monstersImage}
						link="/monsters"
						onAdd={handleAddMonster}
					/>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<DashboardCard
						title="Skills"
						description="A complete list of skills"
						image={skillsImage}
						link="/skills"
						onAdd={handleAddSkill}
					/>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<DashboardCard
						title="Weapons"
						description="A complete list of weapons"
						image={weaponsImage}
						link="/weapons"
						onAdd={handleAddWeapon}
					/>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<DashboardCard
						title="Armour"
						description="A complete list of armour"
						image={armourImage}
						link="/armours"
						onAdd={handleAddArmour}
					/>
				</Grid>
			</Grid>
		</div>
	);
};
