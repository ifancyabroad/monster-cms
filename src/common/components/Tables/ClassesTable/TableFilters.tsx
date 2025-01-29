import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import { IClassFilters } from "common/types";
import SearchIcon from "@mui/icons-material/Search";

interface IProps {
	filters: IClassFilters;
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
			</Grid>
		</Box>
	);
};
