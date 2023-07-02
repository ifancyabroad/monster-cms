import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { LinearProgressWithLabel } from "common/components";

interface ITableStat {
	key: string;
	name: string;
	value: number;
	colour?: string;
}

interface IProps {
	title: string;
	stats: ITableStat[];
	prefix?: string;
	suffix?: string;
	min?: number;
	max?: number;
}

export const StatsTable: React.FC<IProps> = ({
	title,
	stats,
	prefix = "",
	suffix = "",
	min,
	max,
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
								<LinearProgressWithLabel
									value={stat.value}
									label={prefix + stat.value + suffix}
									customColor={stat.colour}
									min={min}
									max={max}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
