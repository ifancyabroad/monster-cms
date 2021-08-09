import { AppBar, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useAppDispatch } from "../../app/hooks";
import { DRAWER_WIDTH } from "../../constants";
import { openSidedrawer } from "../../features/sidedrawer/sidedrawerSlice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                marginLeft: DRAWER_WIDTH,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              display: 'none',
            },
          },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => {
        dispatch(openSidedrawer());
    };

    return (
        <AppBar className={classes.root} position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Monster Manual
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}
