import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface IProps {
	title: string;
	description: string;
	image: string;
	link: string;
	onAdd: () => void;
}

export const DashboardCard: React.FC<IProps> = ({
	title,
	description,
	image,
	link,
	onAdd,
}) => {
	const user = useContext(AuthContext);

	return (
		<Card>
			<CardMedia sx={{ height: 200 }} image={image} title={title} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" component={Link} to={link}>
					View
				</Button>
				{user && (
					<Button size="small" onClick={onAdd}>
						Add
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
