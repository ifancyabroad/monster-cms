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
import { IMonsterFilters, TMonstersOrderBy, TOrder } from "common/types";
import { Fragment, useContext, useState } from "react";
import { useAppSelector } from "common/hooks";
import { TableRow } from "./TableRow";
import { TableFilters } from "./TableFilters";
import {
	applyMonstersFilters,
	getMonstersComparator,
	MAX_CHALLENGE_RATING,
	Stat,
	STATS_ABBR_MAP,
	STATS_NAME_MAP,
} from "common/utils";
import { AuthContext } from "common/context";

interface HeadCell {
	id: TMonstersOrderBy;
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
	{
		id: "challenge",
		align: "right",
		label: "CR",
		tooltip: "Challenge Rating",
	},
	{
		id: "naturalArmourClass",
		align: "right",
		label: "AC",
		tooltip: "Armour Class",
	},
	{
		id: "naturalMinDamage",
		align: "right",
		label: "Min",
		tooltip: "Minimum Damage",
	},
	{
		id: "naturalMaxDamage",
		align: "right",
		label: "Max",
		tooltip: "Maximum Damage",
	},
	{
		id: "boss",
		align: "right",
		label: "Boss",
	},
	{
		id: "zone",
		align: "right",
		label: "Zone",
	},
];

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: TMonstersOrderBy
	) => void;
	order: TOrder;
	orderBy: TMonstersOrderBy;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
	const { order, orderBy, onRequestSort } = props;
	const user = useContext(AuthContext);

	const createSortHandler =
		(property: TMonstersOrderBy) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<MUITableRow>
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

const defaultFilters: IMonsterFilters = {
	name: "",
	zone: "all",
	challenge: MAX_CHALLENGE_RATING,
};

export const MonstersTable: React.FC = () => {
	const monstersList = useAppSelector((state) => state.monsters.monsters);
	const [order, setOrder] = useState<TOrder>("asc");
	const [orderBy, setOrderBy] = useState<TMonstersOrderBy>("challenge");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [filters, setFilters] = useState<IMonsterFilters>(defaultFilters);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: TMonstersOrderBy
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
								{monstersList
									.slice()
									.filter(applyMonstersFilters(filters))
									.sort(getMonstersComparator(order, orderBy))
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row) => (
										<TableRow key={row.id} monster={row} />
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={monstersList.length}
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
