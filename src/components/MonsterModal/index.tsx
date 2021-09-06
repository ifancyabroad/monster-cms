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
        defense: {
            armour: 5,
            magicResistance: 5,
        },
        description: "",
        expValue: 100,
        goldValue: 200,
        name: "",
        portrait: "",
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
            initiative: 10,
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

    const handleChangeDefense = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setFormValues({
            ...formValues,
            monster: {
                ...formValues.monster,
                defense: {
                    ...formValues.monster.defense,
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
                    <Box my={3}>
                        <DialogContentText variant="subtitle1" component="h5">Stats</DialogContentText>
                        <Box display="flex" flexWrap="wrap">
                            <TextField
                                margin="dense"
                                name="strength"
                                label="Strength"
                                type="number"
                                value={formValues.monster.stats.strength}
                                onChange={handleChangeStats}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="dexterity"
                                label="Dexterity"
                                type="number"
                                value={formValues.monster.stats.dexterity}
                                onChange={handleChangeStats}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="constitution"
                                label="Constitution"
                                type="number"
                                value={formValues.monster.stats.constitution}
                                onChange={handleChangeStats}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="intelligence"
                                label="Intelligence"
                                type="number"
                                value={formValues.monster.stats.intelligence}
                                onChange={handleChangeStats}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="initiative"
                                label="Initiative"
                                type="number"
                                value={formValues.monster.stats.initiative}
                                onChange={handleChangeStats}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                        </Box>
                    </Box>
                    <Box my={3}>
                        <DialogContentText component="h6">Defense</DialogContentText>
                        <Box display="flex" flexWrap="wrap">
                            <TextField
                                margin="dense"
                                name="armour"
                                label="Armour"
                                type="number"
                                value={formValues.monster.defense.armour}
                                onChange={handleChangeDefense}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="magicResistance"
                                label="Magic Resistance"
                                type="number"
                                value={formValues.monster.defense.magicResistance}
                                onChange={handleChangeDefense}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 1,
                                    max: 30
                                }}
                            />
                        </Box>
                    </Box>
                    <Box my={3}>
                        <DialogContentText component="h6">Rewards</DialogContentText>
                        <Box display="flex" flexWrap="wrap">
                            <TextField
                                margin="dense"
                                name="expValue"
                                label="Experience"
                                type="number"
                                value={formValues.monster.expValue}
                                onChange={handleChange}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 0,
                                    max: 100000
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="goldValue"
                                label="Gold"
                                type="number"
                                value={formValues.monster.goldValue}
                                onChange={handleChange}
                                className={classes.numberField}
                                required
                                inputProps={{
                                    min: 0,
                                    max: 10000
                                }}
                            />
                        </Box>
                    </Box>
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
