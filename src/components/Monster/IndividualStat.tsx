import { Box, createStyles, makeStyles, Paper, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

interface IProps {
    title: string;
    value: number;
}

export const IndividualStat: React.FC<IProps> = ({ title, value }) => {
    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.individualStat}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="h2">
                    {title}
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
                        {value}
                    </Box>
                </Typography>
            </Box>
        </Paper>
    );
}