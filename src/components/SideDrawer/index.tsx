import { createStyles, Divider, Drawer, Hidden, List, ListItem, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { DRAWER_WIDTH } from "../../constants";
import { closeSidedrawer } from "../../features/sidedrawer/sidedrawerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

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
    }),
);

export const SideDrawer: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const mobileOpen = useAppSelector((state) => state.sidedrawer.open);

    const handleDrawerToggle = () => {
        dispatch(closeSidedrawer());
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Monster 1', 'Monster 2', 'Monster 3', 'Monster 4'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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
