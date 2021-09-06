import { Box, createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { clearMonsterImagePath, fetchMonsterImagePath, selectMonsterById, selectMonsterImagePath } from "../../features/monsters/monstersSlice";
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
        },
        individualStat: {
            padding: theme.spacing(2, 3),
        },
        individualStatValue: {
            height: "80px",
            width: "80px",
            color: theme.palette.getContrastText(theme.palette.primary.main)
        }
    }),
);

interface IRouteParams {
    id: string
}

export const Monster: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    let { id } = useParams<IRouteParams>();
    const monster = useSelector(selectMonsterById)(id);
    const monsterImagePath = useSelector(selectMonsterImagePath);

    useEffect(() => {
        if (monster?.portrait) {
            dispatch(fetchMonsterImagePath(monster.portrait))
        }

        return () => {
            dispatch(clearMonsterImagePath());
        }
    }, [dispatch, monster]);

    if (!monster) {
        return null;
    }

    return (
        <main className={classes.root}>
            <div className={classes.toolbar} />
            <Typography variant="h2" gutterBottom>
                {monster.name}
            </Typography>
            {monsterImagePath && <img className={classes.image} src={monsterImagePath} alt={monster.name} />}
            <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper variant="outlined" className={classes.individualStat}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5" component="h2">
                                    Challenge
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bgcolor="primary.main"
                                        borderRadius="50%"
                                        fontWeight="fontWeightBold"
                                        className={classes.individualStatValue}
                                    >
                                        {monster.challenge}
                                    </Box>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper variant="outlined" className={classes.individualStat}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5" component="h2">
                                    Experience
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bgcolor="primary.main"
                                        borderRadius="50%"
                                        fontWeight="fontWeightBold"
                                        className={classes.individualStatValue}
                                    >
                                        {monster.expValue}
                                    </Box>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                     <Paper variant="outlined" className={classes.individualStat}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5" component="h2">
                                    Gold
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bgcolor="primary.main"
                                        borderRadius="50%"
                                        fontWeight="fontWeightBold"
                                        className={classes.individualStatValue}
                                    >
                                        {monster.goldValue}
                                    </Box>
                                </Typography>
                            </Box>
                        </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsTable stats={monster.stats} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsTable stats={monster.defense} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography paragraph>
                        {monster.description}
                    </Typography>
                </Grid>
            </Grid>
        </main>
    )
}