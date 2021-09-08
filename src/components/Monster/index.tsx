import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { clearMonsterImagePath, fetchMonsterImagePath, selectMonsterById, selectMonsterImagePath } from "../../features/monsters/monstersSlice";
import { IndividualStat } from "./IndividualStat";
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
                    <IndividualStat
                        title="Challenge"
                        value={monster.challenge}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <IndividualStat
                        title="Experience"
                        value={monster.rewards.experience}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <IndividualStat
                        title="Gold"
                        value={monster.rewards.gold}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsTable title="Base Stats" stats={monster.stats} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsTable title="Resistances" stats={monster.resistances} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography paragraph>
                        {monster.description || "No description available."}
                    </Typography>
                </Grid>
            </Grid>
        </main>
    )
}