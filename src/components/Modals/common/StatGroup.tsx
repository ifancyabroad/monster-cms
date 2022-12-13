import { Box, DialogContentText, Grid, TextField } from "@mui/material";

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
	return (
		<Box my={3}>
			<DialogContentText variant="subtitle1" component="h5" gutterBottom>
				{title}
			</DialogContentText>
			<Grid container spacing={2}>
				{stats.map((stat) => (
					<Grid item xs={6} md={4}>
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
		</Box>
	);
};
