import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { StatsTable } from "./StatsTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        image: {
            marginBottom: theme.spacing(3),
            maxWidth: "100%"
        }
    }),
);

export const Monster: React.FC = () => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <div className={classes.toolbar} />
            <Typography variant="h2" gutterBottom>
                Lorem Ipsum
            </Typography>
            <img className={classes.image} src={"https://via.placeholder.com/800x600"} alt={"Placeholder"} />
            <Grid container spacing={3}>
                <Grid item sm={12} md={4}>
                    <StatsTable />
                </Grid>
                <Grid item sm={12} md={8}>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Grid>
            </Grid>
        </main>
    )
}