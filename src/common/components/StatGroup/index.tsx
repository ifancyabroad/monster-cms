import {
	Box,
	Collapse,
	DialogContentText,
	Grid,
	IconButton,
	IconButtonProps,
	styled,
	TextField,
	Tooltip,
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
	abbr: string;
	name: string;
	value: number;
}

interface IProps {
	title: string;
	stats: ITableStat[];
	min: number;
	max: number;
	step?: number;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StatGroup: React.FC<IProps> = ({
	title,
	stats,
	min,
	max,
	step,
	handleChange,
}) => {
	const [expanded, setExpanded] = useState(true);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Box sx={{ my: 3 }}>
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
						<Grid key={stat.key} item xs={4} md={2}>
							<Tooltip title={stat.name} placement="top">
								<TextField
									key={stat.key}
									variant="filled"
									size="small"
									fullWidth
									margin="dense"
									name={stat.key}
									label={stat.abbr}
									type="number"
									value={stat.value}
									onChange={handleChange}
									required
									inputProps={{
										min,
										max,
										step,
									}}
								/>
							</Tooltip>
						</Grid>
					))}
				</Grid>
			</Collapse>
		</Box>
	);
};
