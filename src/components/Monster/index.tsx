import { Box, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { clearMonsterImagePath, deleteMonster, fetchMonsterImagePath, selectMonsterById, selectMonsterImagePath } from "../../features/monsters/monstersSlice";
import { getResistancesArray, getStatsArray } from "../../utils";
import { IndividualStat } from "./IndividualStat";
import { StatsTable } from "./StatsTable";
import { Delete, Edit } from '@material-ui/icons';
import { openMonsterModal } from "../../features/modals/modalsSlice";

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

    const handleUpdateMonster = () => {
        dispatch(openMonsterModal(monster));
    }

    const handleDeleteMonster = async () => {
        try {
            await dispatch(deleteMonster(monster)).unwrap();
        } catch (error) {
            // TODO: Show error popup
        }
    }

    return (
        <main className={classes.root}>
            <div className={classes.toolbar} />
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2}>
                <Typography variant="h2">
                    {monster.name}
                </Typography>
                <Box display="flex">
                    <IconButton aria-label="add" color="primary" onClick={handleUpdateMonster}>
                        <Edit fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="add" color="primary" onClick={handleDeleteMonster}>
                        <Delete fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
            {monsterImagePath && <img className={classes.image} src={monsterImagePath} alt={monster.name} />}
            <Grid item xs={12}>
                <Typography paragraph>
                    {monster.description || "No description available."}
                </Typography>
            </Grid>
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
                    <StatsTable title="Base Stats" stats={getStatsArray(monster.stats)} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <StatsTable title="Resistances" stats={getResistancesArray(monster.resistances)} />
                </Grid>
            </Grid>
        </main>
    )
}