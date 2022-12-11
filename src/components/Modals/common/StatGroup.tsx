import { Box, DialogContentText, TextField } from "@mui/material";

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
			<Box display="flex" flexWrap="wrap">
				{stats.map((stat) => (
					<TextField
						sx={{
							marginRight: 2,
							width: "20ch",
							"&:last-of-type": {
								marginRight: 0,
							},
						}}
						key={stat.key}
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
				))}
			</Box>
		</Box>
	);
};
