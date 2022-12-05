import {
	Button,
	Card,
	CardActions,
	CardContent,
	createStyles,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";
import { IDamageEffect } from "../../../types";
import { EFFECTS_NAME_MAP } from "../../../utils";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minWidth: 275,
		},
		pos: {
			marginBottom: 12,
		},
	})
);

export const DamageEffectCard: React.FC<IDamageEffect> = ({ type }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{EFFECTS_NAME_MAP[type]}
				</Typography>
				<Typography variant="body2" component="p"></Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};
