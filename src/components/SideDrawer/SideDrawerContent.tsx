import { Add } from "@mui/icons-material";
import {
	Box,
	Collapse,
	Divider,
	IconButton,
	List,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthContext } from "../../context/AuthContext";
import {
	openMonsterModal,
	openSkillModal,
	openWeaponModal,
} from "../../features/modals/modalsSlice";

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
	const isMonsters = useRouteMatch("/monsters");
	const isSkills = useRouteMatch("/skills");
	const isWeapons = useRouteMatch("/weapons");

	const addMonster = () => {
		dispatch(openMonsterModal());
	};

	const addSkill = () => {
		dispatch(openSkillModal());
	};

	const addWeapon = () => {
		dispatch(openWeaponModal());
	};

	return (
		<div>
			<Box sx={(theme) => theme.mixins.toolbar} />
			<Divider />
			<List>
				<ListItemButton component={Link} to="/">
					<ListItemText>Dashboard</ListItemText>
				</ListItemButton>
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
				<ListItemButton component={Link} to="/armour">
					<ListItemText>Armour</ListItemText>
				</ListItemButton>
				<ListItemButton component={Link} to="/classes">
					<ListItemText>Classes</ListItemText>
				</ListItemButton>
				<ListItemButton component={Link} to="/settings">
					<ListItemText>Settings</ListItemText>
				</ListItemButton>
			</List>
		</div>
	);
};
