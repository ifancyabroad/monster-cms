import { Add, Dashboard } from "@mui/icons-material";
import {
	Box,
	Collapse,
	Divider,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { AuthContext } from "common/context";
import {
	openArmourModal,
	openMonsterModal,
	openSkillModal,
	openWeaponModal,
} from "features/modals";

interface ISideDrawerItemProps {
	title: string;
	link: string;
	onAddItem: () => void;
}

const SideDrawerItem: React.FC<ISideDrawerItemProps> = ({
	title,
	link,
	onAddItem,
}) => {
	const user = useContext(AuthContext);

	return (
		<ListItemButton component={Link} to={link}>
			<ListItemIcon>
				<Dashboard />
			</ListItemIcon>
			<ListItemText>{title}</ListItemText>
			{user && (
				<ListItemSecondaryAction>
					<IconButton
						aria-label="add"
						color="primary"
						onClick={onAddItem}
					>
						<Add />
					</IconButton>
				</ListItemSecondaryAction>
			)}
		</ListItemButton>
	);
};

export const SideDrawerContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const monstersList = useAppSelector((state) => state.monsters.monsters);
	const skillsList = useAppSelector((state) => state.skills.skills);
	const weaponsList = useAppSelector((state) => state.weapons.weapons);
	const armoursList = useAppSelector((state) => state.armours.armours);
	const isMonsters = useRouteMatch("/monsters");
	const isSkills = useRouteMatch("/skills");
	const isWeapons = useRouteMatch("/weapons");
	const isArmours = useRouteMatch("/armours");

	const addMonster = () => {
		dispatch(openMonsterModal());
	};

	const addSkill = () => {
		dispatch(openSkillModal());
	};

	const addWeapon = () => {
		dispatch(openWeaponModal());
	};

	const addArmour = () => {
		dispatch(openArmourModal());
	};

	return (
		<div>
			<Box sx={(theme) => theme.mixins.toolbar} />
			<Divider />
			<List>
				<ListItemButton component={Link} to="/">
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText>Dashboard</ListItemText>
				</ListItemButton>
				<ListItemButton component={Link} to="/settings">
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText>Settings</ListItemText>
				</ListItemButton>
				<Divider />
				<ListSubheader>Game Data</ListSubheader>
				<SideDrawerItem
					title="Monsters"
					link="/monsters"
					onAddItem={addMonster}
				/>
				<Collapse in={Boolean(isMonsters)} unmountOnExit>
					<List>
						{monstersList.map((monster, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/monsters/${monster.id}`}
							>
								<ListItemText primary={monster.name} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Skills"
					link="/skills"
					onAddItem={addSkill}
				/>
				<Collapse in={Boolean(isSkills)} unmountOnExit>
					<List>
						{skillsList.map((skill, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/skills/${skill.id}`}
							>
								<ListItemText primary={skill.name} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Weapons"
					link="/weapons"
					onAddItem={addWeapon}
				/>
				<Collapse in={Boolean(isWeapons)} unmountOnExit>
					<List>
						{weaponsList.map((weapon, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/weapons/${weapon.id}`}
							>
								<ListItemText primary={weapon.name} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Armours"
					link="/armours"
					onAddItem={addArmour}
				/>
				<Collapse in={Boolean(isArmours)} unmountOnExit>
					<List>
						{armoursList.map((armour, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/armours/${armour.id}`}
							>
								<ListItemText primary={armour.name} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<ListItemButton component={Link} to="/classes">
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText>Classes</ListItemText>
				</ListItemButton>
			</List>
		</div>
	);
};
