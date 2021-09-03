import { useState } from "react";
import { Collapse, createStyles, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Theme } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { DRAWER_WIDTH } from "../../constants";
import { closeSidedrawer } from "../../features/sidedrawer/sidedrawerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openMonsterModal } from "../../features/modals/modalsSlice";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('sm')]: {
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
    }),
);

export const SideDrawer: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const mobileOpen = useAppSelector((state) => state.sidedrawer.open);
    const monstersList = useAppSelector((state) => state.monsters.monsters);
    const [monstersOpen, setMonstersOpen] = useState(true);

    const handleDrawerToggle = () => {
        dispatch(closeSidedrawer());
    };

    const handleClick = () => {
        setMonstersOpen(!monstersOpen);
    };

    const addMonster = () => {
        dispatch(openMonsterModal());
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemText>Monsters</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="add" color="primary" onClick={addMonster}>
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={monstersOpen} unmountOnExit>
                    <List>
                        {monstersList.map((monster, index) => (
                            <ListItem button key={index} className={classes.nested} component={Link} to={`/${monster.id}`}>
                                <ListItemText primary={monster.name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemText>Items</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Abilities</ListItemText>
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
}
