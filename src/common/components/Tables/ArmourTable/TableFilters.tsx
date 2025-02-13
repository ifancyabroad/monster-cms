import {
	Box,
	Grid,
	InputAdornment,
	MenuItem,
	Slider,
	TextField,
	Typography,
} from "@mui/material";
import { IArmourFilters } from "common/types";
import SearchIcon from "@mui/icons-material/Search";
import {
	ARMOUR_TYPES,
	ARMOUR_TYPE_NAME_MAP,
	EQUIPMENT_ARMOUR_TYPES,
	EQUIPMENT_TYPE_NAME_MAP,
	MAX_GOLD_VALUE,
	MAX_ITEM_LEVEL,
} from "common/utils";

interface IProps {
	filters: IArmourFilters;
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
						{EQUIPMENT_ARMOUR_TYPES.map((type) => (
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
						label="Armour Type"
						name="armourType"
						value={filters.armourType}
						onChange={onChangeFilters}
					>
						<MenuItem value="all">All</MenuItem>
						{ARMOUR_TYPES.map((type) => (
							<MenuItem key={type} value={type}>
								{ARMOUR_TYPE_NAME_MAP[type]}
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
						max={MAX_ITEM_LEVEL}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
