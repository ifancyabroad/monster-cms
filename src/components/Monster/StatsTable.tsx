import { createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, withStyles } from "@material-ui/core";
import { IDictionary } from "../../types";
import { getStatsArray } from "../../utils";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
    }),
)(TableCell);

interface IProps {
    title: string;
    stats: IDictionary<number>;
}

export const StatsTable: React.FC<IProps> = ({ title, stats }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="stats table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell colSpan={2}>{title}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getStatsArray(stats).map((stat) => (
                        <TableRow key={stat.name}>
                            <TableCell component="th" scope="row">
                                {stat.name}
                            </TableCell>
                            <TableCell align="right">{stat.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}