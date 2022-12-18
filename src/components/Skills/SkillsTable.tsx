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
	TableRow,
	TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ISkill, ISkillFilters } from "../../types";
import { Fragment, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { SkillsTableRow } from "./SkillsTableRow";
import { SkillTableFilters } from "./SkillsTableFilters";
import { getSkillType } from "../../utils";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
	id: string;
	label: string;
	align?: "right";
}

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		label: "Name",
	},
	{
		id: "class",
		label: "Class",
	},
	{
		id: "type",
		label: "Type",
	},
	{
		id: "maxUses",
		align: "right",
		label: "Max Uses",
	},
	{
		id: "price",
		align: "right",
		label: "Value",
	},
	{
		id: "level",
		align: "right",
		label: "Level",
	},
];

interface EnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	order: Order;
	orderBy: string;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler =
		(property: string) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.align}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
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
					</TableCell>
				))}

				<TableCell align="right">Actions</TableCell>
			</TableRow>
		</TableHead>
	);
};

const defaultFilters: ISkillFilters = {
	name: "",
	class: "all",
	type: "all",
	price: 10000,
	level: 9,
};

export const SkillsTable: React.FC = () => {
	const skillsList = useAppSelector((state) => state.skills.skills);
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<string>("name");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [filters, setFilters] = useState<ISkillFilters>(defaultFilters);

	const handleApplyFilters = (skill: ISkill) => {
		const nameFilter = skill.name
			.toLowerCase()
			.includes(filters.name.toLowerCase());
		const classFilter =
			filters.class === "all" || skill.class === filters.class;
		const typeFilter =
			filters.type === "all" || getSkillType(skill) === filters.type;
		const priceFilter = filters.price >= skill.price;
		const levelFilter = filters.level >= skill.level;
		return (
			nameFilter &&
			classFilter &&
			typeFilter &&
			priceFilter &&
			levelFilter
		);
	};

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string
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

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - skillsList.length)
			: 0;

	return (
		<Fragment>
			<Box sx={{ width: "100%" }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<SkillTableFilters
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
								{skillsList
									.slice()
									.filter(handleApplyFilters)
									.sort(getComparator(order, orderBy))
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row) => (
										<SkillsTableRow key={row.id} {...row} />
									))}
								{emptyRows > 0 && (
									<TableRow
										style={{
											height: 53 * emptyRows,
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={skillsList.length}
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
