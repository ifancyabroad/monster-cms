import {
	Box,
	Paper,
	SxProps,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow as MUITableRow,
	TableSortLabel,
	Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { IClassFilters, TClassesOrderBy, TOrder } from "common/types";
import { Fragment, useContext, useState } from "react";
import { useAppSelector } from "common/hooks";
import { TableRow } from "./TableRow";
import { TableFilters } from "./TableFilters";
import {
	applyClassesFilters,
	getClassesComparator,
	Stat,
	STATS_ABBR_MAP,
	STATS_NAME_MAP,
} from "common/utils";
import { AuthContext } from "common/context";

interface HeadCell {
	id: TClassesOrderBy;
	label: string;
	tooltip?: string;
	align?: "right";
}

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		label: "Name",
	},
	{
		id: Stat.Strength,
		align: "right",
		label: STATS_ABBR_MAP[Stat.Strength],
		tooltip: STATS_NAME_MAP[Stat.Strength],
	},
	{
		id: Stat.Dexterity,
		align: "right",
		label: STATS_ABBR_MAP[Stat.Dexterity],
		tooltip: STATS_NAME_MAP[Stat.Dexterity],
	},
	{
		id: Stat.Constitution,
		align: "right",
		label: STATS_ABBR_MAP[Stat.Constitution],
		tooltip: STATS_NAME_MAP[Stat.Constitution],
	},
	{
		id: Stat.Intelligence,
		align: "right",
		label: STATS_ABBR_MAP[Stat.Intelligence],
		tooltip: STATS_NAME_MAP[Stat.Intelligence],
	},
	{
		id: Stat.Wisdom,
		align: "right",
		label: STATS_ABBR_MAP[Stat.Wisdom],
		tooltip: STATS_NAME_MAP[Stat.Wisdom],
	},
	{
		id: Stat.Charisma,
		align: "right",
		label: STATS_ABBR_MAP[Stat.Charisma],
		tooltip: STATS_NAME_MAP[Stat.Charisma],
	},
];

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: TClassesOrderBy
	) => void;
	order: TOrder;
	orderBy: TClassesOrderBy;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
	const { order, orderBy, onRequestSort } = props;
	const user = useContext(AuthContext);

	const createSortHandler =
		(property: TClassesOrderBy) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<MUITableRow>
				<TableCell />
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.align}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<Tooltip title={headCell.tooltip} placement="top">
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={
									orderBy === headCell.id ? order : "asc"
								}
								onClick={createSortHandler(headCell.id)}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box
										component="span"
										sx={visuallyHidden as SxProps}
									>
										{order === "desc"
											? "sorted descending"
											: "sorted ascending"}
									</Box>
								) : null}
							</TableSortLabel>
						</Tooltip>
					</TableCell>
				))}

				{user && <TableCell align="right">Actions</TableCell>}
			</MUITableRow>
		</TableHead>
	);
};

const defaultFilters: IClassFilters = {
	name: "",
};

export const ClassesTable: React.FC = () => {
	const classesList = useAppSelector((state) => state.classes.classes);
	const [order, setOrder] = useState<TOrder>("asc");
	const [orderBy, setOrderBy] = useState<TClassesOrderBy>("name");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [filters, setFilters] = useState<IClassFilters>(defaultFilters);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: TClassesOrderBy
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeFilters = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	const handleChangeSlider = (event: Event, value: number | number[]) => {
		const { name } = event.target as HTMLInputElement;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	return (
		<Fragment>
			<Box sx={{ width: "100%" }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<TableFilters
						filters={filters}
						onChangeFilters={handleChangeFilters}
						onChangeSlider={handleChangeSlider}
					/>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
						>
							<EnhancedTableHead
								order={order}
								orderBy={orderBy}
								onRequestSort={handleRequestSort}
							/>
							<TableBody>
								{classesList
									.slice()
									.filter(applyClassesFilters(filters))
									.sort(getClassesComparator(order, orderBy))
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row) => (
										<TableRow
											key={row.id}
											characterClass={row}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={classesList.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</Fragment>
	);
};
