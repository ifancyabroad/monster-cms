import {
	Box,
	Grid,
	InputAdornment,
	MenuItem,
	Slider,
	TextField,
	Typography,
} from "@mui/material";
import { ISkillFilters } from "common/types";
import SearchIcon from "@mui/icons-material/Search";
import {
	CLASSES,
	CLASS_NAME_MAP,
	MAX_GOLD_VALUE,
	MAX_SKILL_LEVEL,
	SKILL_TYPES,
	SKILL_TYPE_NAME_MAP,
} from "common/utils";

interface IProps {
	filters: ISkillFilters;
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
						label="Class"
						name="class"
						value={filters.class}
						onChange={onChangeFilters}
					>
						<MenuItem value="all">All</MenuItem>
						{CLASSES.map((cl) => (
							<MenuItem key={cl} value={cl}>
								{CLASS_NAME_MAP[cl]}
							</MenuItem>
						))}
					</TextField>
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
						{SKILL_TYPES.map((type) => (
							<MenuItem key={type} value={type}>
								{SKILL_TYPE_NAME_MAP[type]}
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
