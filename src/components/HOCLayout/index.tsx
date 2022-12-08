import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Header } from "../Header";
import { SideDrawer } from "../SideDrawer";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
	})
);

export const HOCLayout: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<div style={{ display: "flex" }}>
			<Header />
			<SideDrawer />
			<Container className={classes.root} maxWidth="lg">
				<div className={classes.toolbar} />
				{children}
			</Container>
		</div>
	);
};
