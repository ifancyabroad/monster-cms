import {
	Box,
	Grid,
	InputAdornment,
	Slider,
	TextField,
	Typography,
} from "@mui/material";
import { IMonsterFilters } from "../../types";
import SearchIcon from "@mui/icons-material/Search";

interface IProps {
	filters: IMonsterFilters;
	onChangeFilters: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSlider: (e: Event, value: number | number[]) => void;
}

export const MonstersTableFilters: React.FC<IProps> = ({
	filters,
	onChangeFilters,
	onChangeSlider,
}) => {
	return (
		<Box
			sx={{
				p: 2,
			}}
		>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={6} md={6}>
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
				<Grid item xs={12} md={6}>
					<Typography variant="body2">Challenge</Typography>
					<Slider
						size="small"
						name="challenge"
						value={filters.challenge}
						onChange={onChangeSlider}
						valueLabelDisplay="auto"
						step={1}
						min={1}
						max={30}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
