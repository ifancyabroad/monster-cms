import {
	Box,
	Collapse,
	DialogContentText,
	Grid,
	IconButton,
	IconButtonProps,
	Paper,
	styled,
	TextField,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

interface ITableStat {
	key: string;
	name: string;
	value: number;
}

interface IProps {
	title: string;
	stats: ITableStat[];
	min: number;
	max: number;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StatGroup: React.FC<IProps> = ({
	title,
	stats,
	min,
	max,
	handleChange,
}) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Paper sx={{ p: 1, my: 3 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<DialogContentText variant="subtitle1" component="h5">
					{title}
				</DialogContentText>

				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon fontSize="small" />
				</ExpandMore>
			</Box>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<Grid container spacing={2}>
					{stats.map((stat) => (
						<Grid key={stat.key} item xs={6} md={4}>
							<TextField
								key={stat.key}
								fullWidth
								margin="dense"
								name={stat.key}
								label={stat.name}
								type="number"
								value={stat.value}
								onChange={handleChange}
								required
								inputProps={{
									min,
									max,
								}}
							/>
						</Grid>
					))}
				</Grid>
			</Collapse>
		</Paper>
	);
};
