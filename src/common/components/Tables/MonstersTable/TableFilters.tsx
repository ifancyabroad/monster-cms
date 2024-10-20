import {
	Box,
	Grid,
	InputAdornment,
	MenuItem,
	Slider,
	TextField,
	Typography,
} from "@mui/material";
import { IMonsterFilters } from "common/types";
import SearchIcon from "@mui/icons-material/Search";
import { MAX_CHALLENGE_RATING, ZONES } from "common/utils";

interface IProps {
	filters: IMonsterFilters;
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
				<Grid item xs={12} md={3}>
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
				<Grid item xs={12} md={3}>
					<TextField
						fullWidth
						size="small"
						select
						label="Zone"
						name="zone"
						value={filters.zone}
						onChange={onChangeFilters}
						sx={{ textTransform: "capitalize" }}
					>
						<MenuItem value="all">All</MenuItem>
						{ZONES.map((zone) => (
							<MenuItem
								key={zone}
								value={zone}
								sx={{ textTransform: "capitalize" }}
							>
								{zone}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography variant="body2">Challenge</Typography>
					<Slider
						size="small"
						name="challenge"
						value={filters.challenge}
						onChange={onChangeSlider}
						valueLabelDisplay="auto"
						step={1}
						min={1}
						max={MAX_CHALLENGE_RATING}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
