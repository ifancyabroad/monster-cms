import { useContext, useState } from "react";
import {
	Collapse,
	createStyles,
	Divider,
	Drawer,
	Hidden,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Theme,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DRAWER_WIDTH } from "../../utils/constants";
import { closeSidedrawer } from "../../features/sidedrawer/sidedrawerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	openMonsterModal,
	openSkillModal,
} from "../../features/modals/modalsSlice";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[theme.breakpoints.up("sm")]: {
				width: DRAWER_WIDTH,
				flexShrink: 0,
			},
		},
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: DRAWER_WIDTH,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
);

export const SideDrawer: React.FC = () => {
	const classes = useStyles();
	const user = useContext(AuthContext);
	const dispatch = useAppDispatch();
	const mobileOpen = useAppSelector((state) => state.sidedrawer.open);
	const monstersList = useAppSelector((state) => state.monsters.monsters);
	const skillsList = useAppSelector((state) => state.skills.skills);
	const [monstersOpen, setMonstersOpen] = useState(true);
	const [skillsOpen, setSkillsOpen] = useState(true);

	const handleDrawerToggle = () => {
		dispatch(closeSidedrawer());
	};

	const handleMonstersClick = () => {
		setMonstersOpen(!monstersOpen);
	};

	const handleSkillsClick = () => {
		setSkillsOpen(!monstersOpen);
	};

	const addMonster = () => {
		dispatch(openMonsterModal());
	};

	const addSkill = () => {
		dispatch(openSkillModal());
	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<ListItem button component={Link} to="/settings">
					<ListItemText>Settings</ListItemText>
				</ListItem>
				<ListItem button onClick={handleMonstersClick}>
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
				</ListItem>
				<Collapse in={monstersOpen} unmountOnExit>
					<List>
						{monstersList.map((monster, index) => (
							<ListItem
								button
								key={index}
								className={classes.nested}
								component={Link}
								to={`/monsters/${monster.id}`}
							>
								<ListItemText primary={monster.name} />
							</ListItem>
						))}
					</List>
				</Collapse>
				<ListItem button>
					<ListItemText>Items (coming soon)</ListItemText>
				</ListItem>
				<ListItem button onClick={handleSkillsClick}>
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
				</ListItem>
				<Collapse in={skillsOpen} unmountOnExit>
					<List>
						{skillsList.map((skill, index) => (
							<ListItem
								button
								key={index}
								className={classes.nested}
								component={Link}
								to={`/skills/${skill.id}`}
							>
								<ListItemText primary={skill.name} />
							</ListItem>
						))}
					</List>
				</Collapse>
				<ListItem button>
					<ListItemText>Classes (coming soon)</ListItemText>
				</ListItem>
			</List>
		</div>
	);
	return (
		<nav className={classes.root} aria-label="monsters list">
			<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
						paper: classes.drawerPaper,
					}}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};
