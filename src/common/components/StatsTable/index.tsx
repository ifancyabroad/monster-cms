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
	min?: number;
	max?: number;
	prefix?: string;
	suffix?: string;
	colour?: string;
}

interface IProps {
	title: string;
	stats: ITableStat[];
}

export const StatsTable: React.FC<IProps> = ({ title, stats }) => {
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
					{stats.map(
						({
							name,
							value,
							prefix = "",
							suffix = "",
							min,
							max,
							colour,
						}) => (
							<TableRow key={name}>
								<TableCell component="th" scope="row">
									{name}
									<LinearProgressWithLabel
										value={value}
										label={prefix + value + suffix}
										customColor={colour}
										min={min}
										max={max}
									/>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
