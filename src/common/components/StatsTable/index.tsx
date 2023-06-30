import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";

interface ITableStat {
	key: string;
	name: string;
	value: number;
}

interface IProps {
	title: string;
	stats: ITableStat[];
	prefix?: string;
	suffix?: string;
}

export const StatsTable: React.FC<IProps> = ({
	title,
	stats,
	prefix = "",
	suffix = "",
}) => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="stats table">
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								backgroundColor: "common.black",
								color: "common.white",
							}}
							colSpan={2}
						>
							{title}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{stats.map((stat) => (
						<TableRow key={stat.name}>
							<TableCell component="th" scope="row">
								{stat.name}
							</TableCell>
							<TableCell align="right">
								{prefix}
								{stat.value}
								{suffix}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};