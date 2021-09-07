import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeMonsterModal } from '../../features/modals/modalsSlice';
import { useState } from 'react';
import { Box, createStyles, FormControl, makeStyles, Theme, Typography } from '@material-ui/core';
import { saveMonster } from '../../features/monsters/monstersSlice';
import { ISaveMonster } from '../../types';
import { StatGroup } from './StatGroup';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        numberField: {
            marginRight: theme.spacing(2),
            width: '20ch',
            '&:last-of-type': {
                marginRight: theme.spacing(0)
            }
        },
        uploadFileName: {
            marginLeft: theme.spacing(2)
        }
    }),
);

const defaultFormValues: ISaveMonster = {
    monster: {
        challenge: 1,
        resistances: {
            physical: 5,
            arcane: 5,
            cold: 5,
            fire: 5,
            divine: 5,
            unholy: 5
        },
        description: "",
        name: "",
        portrait: "",
        rewards: {
            experience: 100,
            gold: 200,
        },
        skills: [
            "Jab",
            "Quick Fingers",
            "Go For The Eyes"
        ],
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        }
    },
    image: null
}

export const MonsterModal: React.FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.modals.monsterModalOpen);
    const isLoading = useAppSelector((state) => state.monsters.status === "loading");
    const [formValues, setFormValues] = useState(defaultFormValues);

    const handleClose = () => {
        dispatch(closeMonsterModal());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            monster: {
                ...formValues.monster,
                [name]: value,
            }
        });
    }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.currentTarget.files?.item(0) || null;
        const portrait = image?.name || "";
        setFormValues({
            ...formValues,
            image,
            monster: {
                ...formValues.monster,
                portrait
            }
        });
    }

    const handleChangeResistances = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            monster: {
                ...formValues.monster,
                resistances: {
                    ...formValues.monster.resistances,
                    [name]: value,
                }
            }
        });
    }

    const handleChangeStats = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            monster: {
                ...formValues.monster,
                stats: {
                    ...formValues.monster.stats,
                    [name]: value,
                }
            }
        });
    }

    const handleChangeRewards = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            monster: {
                ...formValues.monster,
                rewards: {
                    ...formValues.monster.rewards,
                    [name]: value,
                }
            }
        });
    }

    const handleSaveMonster = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveMonster(formValues));
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Monster</DialogTitle>
            <form onSubmit={handleSaveMonster}>
                <DialogContent>
                    <DialogContentText>Add a new monster to the database.</DialogContentText>
                    <Box my={3}>
                        <FormControl>
                            <input 
                                accept="image/*" 
                                style={{ display: "none" }}
                                id="contained-button-file"
                                multiple 
                                type="file"
                                onChange={handleChangeImage}
                            /> 
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Upload Image
                                </Button>
                                {formValues.monster.portrait && <Typography display="inline" className={classes.uploadFileName}>{formValues.monster.portrait}</Typography>}
                            </label> 
                        </FormControl>
                    </Box>
                    <Box my={3}>
                        <TextField
                            autoFocus
                            name="name"
                            label="Name"
                            value={formValues.monster.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            inputProps={{
                                minLength: 3,
                                maxLength: 25
                            }}
                        />
                    </Box>
                    <Box my={3}>
                        <TextField
                            autoFocus
                            name="description"
                            label="Description"
                            value={formValues.monster.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            minRows={4}
                            inputProps={{
                                minLength: 3,
                                maxLength: 25
                            }}
                        />
                    </Box>
                    <StatGroup
                        title="Stats"
                        stats={formValues.monster.stats}
                        min={1}
                        max={30}
                        handleChange={handleChangeStats}
                    />
                    <StatGroup
                        title="Resistances"
                        stats={formValues.monster.resistances}
                        min={0}
                        max={100}
                        handleChange={handleChangeResistances}
                    />
                    <StatGroup
                        title="Rewards"
                        stats={formValues.monster.rewards}
                        min={0}
                        max={9999}
                        handleChange={handleChangeRewards}
                    />
                    <Box my={3}>
                        <DialogContentText component="h6">Difficulty Rating</DialogContentText>
                        <TextField
                            margin="dense"
                            name="challenge"
                            label="Rating"
                            type="number"
                            value={formValues.monster.challenge}
                            onChange={handleChange}
                            className={classes.numberField}
                            required
                            inputProps={{
                                min: 0,
                                max: 20
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" disabled={isLoading}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
