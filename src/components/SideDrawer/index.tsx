import { useContext } from "react";
import {
	Box,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DRAWER_WIDTH } from "../../utils/constants";
import { closeSidedrawer } from "../../features/sidedrawer/sidedrawerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	openMonsterModal,
	openSkillModal,
} from "../../features/modals/modalsSlice";
import { Link, useRouteMatch } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const SideDrawer: React.FC = () => {
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();
	const mobileOpen = useAppSelector((state) => state.sidedrawer.open);
	const monstersList = useAppSelector((state) => state.monsters.monsters);
	const skillsList = useAppSelector((state) => state.skills.skills);
	const isMonsters = useRouteMatch("/monsters");
	const isSkills = useRouteMatch("/skills");

	const handleDrawerToggle = () => {
		dispatch(closeSidedrawer());
	};

	const addMonster = () => {
		dispatch(openMonsterModal());
	};

	const addSkill = () => {
		dispatch(openSkillModal());
	};

	const drawer = (
		<div>
			<Box sx={(theme) => theme.mixins.toolbar} />
			<Divider />
			<List>
				<ListItemButton component={Link} to="/">
					<ListItemText>Dashboard</ListItemText>
				</ListItemButton>
				<ListItemButton component={Link} to="/monsters">
					<ListItemText>Monsters</ListItemText>
					{user && (
						<ListItemSecondaryAction>
							<IconButton
								aria-label="add"
								color="primary"
								onClick={addMonster}
							>
								<Add />
							</IconButton>
						</ListItemSecondaryAction>
					)}
				</ListItemButton>
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
				<ListItemButton component={Link} to="/skills">
					<ListItemText>Skills</ListItemText>
					{user && (
						<ListItemSecondaryAction>
							<IconButton
								aria-label="add"
								color="primary"
								onClick={addSkill}
							>
								<Add />
							</IconButton>
						</ListItemSecondaryAction>
					)}
				</ListItemButton>
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
				<ListItemButton component={Link} to="/weapons">
					<ListItemText>Weapons</ListItemText>
				</ListItemButton>
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
	return (
		<Box
			sx={{
				width: {
					sm: DRAWER_WIDTH,
				},
				flexShrink: {
					sm: 0,
				},
			}}
			aria-label="monsters list"
		>
			<Drawer
				sx={{ display: { sm: "none", xs: "block" } }}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				PaperProps={{
					sx: {
						width: DRAWER_WIDTH,
					},
				}}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				sx={{ display: { xs: "none", sm: "block" } }}
				variant="permanent"
				PaperProps={{
					sx: {
						width: DRAWER_WIDTH,
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
};
