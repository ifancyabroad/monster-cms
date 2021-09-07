import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { IDictionary } from '../../types';
import { getStatsArray } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        numberField: {
            marginRight: theme.spacing(2),
            width: '20ch',
            '&:last-of-type': {
                marginRight: theme.spacing(0)
            }
        },
    }),
);

interface IProps {
    title: string;
    stats: IDictionary<number>;
    min: number;
    max: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export const StatGroup: React.FC<IProps> = ({ title, stats, min, max, handleChange }) => {
    const classes = useStyles();

    return (
        <Box my={3}>
            <DialogContentText variant="subtitle1" component="h5">{title}</DialogContentText>
            <Box display="flex" flexWrap="wrap">
                {getStatsArray(stats).map((stat) => (
                    <TextField
                        key={stat.key}
                        margin="dense"
                        name={stat.key}
                        label={stat.name}
                        type="number"
                        value={stats[stat.key]}
                        onChange={handleChange}
                        className={classes.numberField}
                        required
                        inputProps={{
                            min,
                            max
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
