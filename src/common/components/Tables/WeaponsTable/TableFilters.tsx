import {
	Box,
	Grid,
	InputAdornment,
	MenuItem,
	Slider,
	TextField,
	Typography,
} from "@mui/material";
import { IWeaponFilters } from "common/types";
import SearchIcon from "@mui/icons-material/Search";
import {
	EQUIPMENT_TYPE_NAME_MAP,
	MAX_GOLD_VALUE,
	MAX_SKILL_LEVEL,
	RESISTANCES,
	RESISTANCES_NAME_MAP,
	WEAPON_TYPES,
} from "common/utils";

interface IProps {
	filters: IWeaponFilters;
	onChangeFilters: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSlider: (e: Event, value: number | number[]) => void;
}

export const TableFilters: React.FC<IProps> = ({
	filters,
	onChangeFilters,
	onChangeSlider,
}) => {
	return (
		<Box
			sx={{
				p: 2,
				backgroundColor: "black",
			}}
		>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={12} md={2}>
					<TextField
						fullWidth
						size="small"
						label="Search"
						type="search"
						name="name"
						value={filters.name}
						onChange={onChangeFilters}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<TextField
						fullWidth
						size="small"
						select
						label="Type"
						name="type"
						value={filters.type}
						onChange={onChangeFilters}
					>
						<MenuItem value="all">All</MenuItem>
						{WEAPON_TYPES.map((type) => (
							<MenuItem key={type} value={type}>
								{EQUIPMENT_TYPE_NAME_MAP[type]}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={6} md={2}>
					<TextField
						fullWidth
						size="small"
						select
						label="Damage Type"
						name="damageType"
						value={filters.damageType}
						onChange={onChangeFilters}
					>
						<MenuItem value="all">All</MenuItem>
						{RESISTANCES.map((resistance) => (
							<MenuItem key={resistance} value={resistance}>
								{RESISTANCES_NAME_MAP[resistance]}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={6} md={3}>
					<Typography variant="body2">Price</Typography>
					<Slider
						size="small"
						name="price"
						value={filters.price}
						onChange={onChangeSlider}
						valueLabelDisplay="auto"
						step={100}
						min={100}
						max={MAX_GOLD_VALUE}
					/>
				</Grid>
				<Grid item xs={6} md={3}>
					<Typography variant="body2">Level</Typography>
					<Slider
						size="small"
						name="level"
						value={filters.level}
						onChange={onChangeSlider}
						valueLabelDisplay="auto"
						step={1}
						min={0}
						max={MAX_SKILL_LEVEL}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
