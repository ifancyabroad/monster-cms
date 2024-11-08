import { Add, Dashboard, Settings } from "@mui/icons-material";
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
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { AuthContext } from "common/context";
import {
	openArmourModal,
	openClassModal,
	openMonsterModal,
	openSkillModal,
	openWeaponModal,
} from "features/modals";
import { ReactComponent as WeaponsIcon } from "assets/images/icons/broad-dagger.svg";
import { ReactComponent as ArmourIcon } from "assets/images/icons/breastplate.svg";
import { ReactComponent as MonstersIcon } from "assets/images/icons/imp-laugh.svg";
import { ReactComponent as SkillsIcon } from "assets/images/icons/bookmarklet.svg";
import { ReactComponent as ClassesIcon } from "assets/images/icons/sheikah-eye.svg";

enum Menu {
	Monsters,
	Skills,
	Weapons,
	Armours,
	Classes,
}

interface ISideDrawerItemProps {
	title: string;
	link: string;
	icon: JSX.Element;
	menu: Menu;
	onAddItem: () => void;
	toggleMenu: (menu: Menu) => void;
}

const SideDrawerItem: React.FC<ISideDrawerItemProps> = ({
	title,
	link,
	icon,
	menu,
	onAddItem,
	toggleMenu,
}) => {
	const user = useContext(AuthContext);
	const location = useLocation();

	const handleToggle = () => {
		toggleMenu(menu);
	};

	return (
		<ListItemButton
			component={Link}
			to={link}
			selected={location.pathname.includes(link)}
			onClick={handleToggle}
		>
			<ListItemIcon>{icon}</ListItemIcon>
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
	const classesList = useAppSelector((state) => state.classes.classes);
	const [active, setActive] = useState<Menu | null>(null);
	const location = useLocation();

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

	const addClass = () => {
		dispatch(openClassModal());
	};

	const toggleMenu = (menu: Menu) => {
		if (active === menu) {
			setActive(null);
		} else {
			setActive(menu);
		}
	};

	return (
		<div>
			<Box sx={(theme) => theme.mixins.toolbar} />
			<Divider />
			<List>
				<ListItemButton
					component={Link}
					to="/"
					selected={location.pathname === "/"}
				>
					<ListItemIcon>
						<Dashboard />
					</ListItemIcon>
					<ListItemText>Dashboard</ListItemText>
				</ListItemButton>
				<ListItemButton
					component={Link}
					to="/settings"
					selected={location.pathname === "/settings"}
				>
					<ListItemIcon>
						<Settings />
					</ListItemIcon>
					<ListItemText>Settings</ListItemText>
				</ListItemButton>
				<Divider />
				<ListSubheader>Game Data</ListSubheader>
				<SideDrawerItem
					title="Monsters"
					link="/monsters"
					icon={<MonstersIcon height={24} width={24} />}
					menu={Menu.Monsters}
					onAddItem={addMonster}
					toggleMenu={toggleMenu}
				/>
				<Collapse in={active === Menu.Monsters} unmountOnExit>
					<List>
						{monstersList.map((monster, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/monsters/${monster.id}`}
								selected={
									location.pathname ===
									`/monsters/${monster.id}`
								}
							>
								<ListItemText
									primary={monster.name}
									primaryTypographyProps={{
										variant: "body2",
										color: "textSecondary",
									}}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Skills"
					link="/skills"
					icon={<SkillsIcon height={24} width={24} />}
					menu={Menu.Skills}
					onAddItem={addSkill}
					toggleMenu={toggleMenu}
				/>
				<Collapse in={active === Menu.Skills} unmountOnExit>
					<List>
						{skillsList.map((skill, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/skills/${skill.id}`}
								selected={
									location.pathname === `/skills/${skill.id}`
								}
							>
								<ListItemText
									primary={skill.name}
									primaryTypographyProps={{
										variant: "body2",
										color: "textSecondary",
									}}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Weapons"
					link="/weapons"
					icon={<WeaponsIcon height={24} width={24} />}
					menu={Menu.Weapons}
					onAddItem={addWeapon}
					toggleMenu={toggleMenu}
				/>
				<Collapse in={active === Menu.Weapons} unmountOnExit>
					<List>
						{weaponsList.map((weapon, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/weapons/${weapon.id}`}
								selected={
									location.pathname ===
									`/weapons/${weapon.id}`
								}
							>
								<ListItemText
									primary={weapon.name}
									primaryTypographyProps={{
										variant: "body2",
										color: "textSecondary",
									}}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Armours"
					link="/armours"
					icon={<ArmourIcon height={24} width={24} />}
					menu={Menu.Armours}
					onAddItem={addArmour}
					toggleMenu={toggleMenu}
				/>
				<Collapse in={active === Menu.Armours} unmountOnExit>
					<List>
						{armoursList.map((armour, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/armours/${armour.id}`}
								selected={
									location.pathname ===
									`/armours/${armour.id}`
								}
							>
								<ListItemText
									primary={armour.name}
									primaryTypographyProps={{
										variant: "body2",
										color: "textSecondary",
									}}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
				<SideDrawerItem
					title="Classes"
					link="/classes"
					icon={<ClassesIcon height={24} width={24} />}
					menu={Menu.Classes}
					onAddItem={addClass}
					toggleMenu={toggleMenu}
				/>
				<Collapse in={active === Menu.Classes} unmountOnExit>
					<List>
						{classesList.map((characterClass, index) => (
							<ListItemButton
								sx={{
									paddingLeft: 4,
								}}
								key={index}
								component={Link}
								to={`/classes/${characterClass.id}`}
								selected={
									location.pathname ===
									`/classes/${characterClass.id}`
								}
							>
								<ListItemText
									primary={characterClass.name}
									primaryTypographyProps={{
										variant: "body2",
										color: "textSecondary",
									}}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
			</List>
		</div>
	);
};
