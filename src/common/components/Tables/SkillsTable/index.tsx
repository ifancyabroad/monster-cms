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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ISkill, ISkillFilters, TOrder, TSkillsOrderBy } from "common/types";
import { Fragment, useContext, useState } from "react";
import { useAppSelector } from "common/hooks";
import { TableRow } from "./TableRow";
import { TableFilters } from "./TableFilters";
import {
	ATTACK_SKILL_ID,
	applySkillsFilters,
	getSkillsComparator,
} from "common/utils";
import { AuthContext } from "common/context";

interface HeadCell {
	id: TSkillsOrderBy;
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
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: TSkillsOrderBy
	) => void;
	order: TOrder;
	orderBy: TSkillsOrderBy;
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = (props) => {
	const { order, orderBy, onRequestSort } = props;
	const user = useContext(AuthContext);

	const createSortHandler =
		(property: TSkillsOrderBy) => (event: React.MouseEvent<unknown>) => {
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

				{user && <TableCell align="right">Actions</TableCell>}
			</MUITableRow>
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

interface IProps {
	type?: "default" | "addSkills";
}

export const SkillsTable: React.FC<IProps> = ({ type = "default" }) => {
	const skillsList = useAppSelector((state) => state.skills.skills);
	const [order, setOrder] = useState<TOrder>("asc");
	const [orderBy, setOrderBy] = useState<TSkillsOrderBy>("name");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [filters, setFilters] = useState<ISkillFilters>(defaultFilters);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: TSkillsOrderBy
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

	const filterAttackSkill = (skill: ISkill) => {
		if (type === "addSkills") {
			return skill.id !== ATTACK_SKILL_ID;
		}
		return true;
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
								{skillsList
									.slice()
									.filter(filterAttackSkill)
									.filter(applySkillsFilters(filters))
									.sort(getSkillsComparator(order, orderBy))
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row) => (
										<TableRow
											key={row.id}
											skill={row}
											type={type}
										/>
									))}
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
