import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import { IDictionary } from "../../types";
import { getStatsArray } from "../../utils";

interface IProps {
    stats: IDictionary<number>;
}

export const StatsTable: React.FC<IProps> = ({stats}) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="stats table">
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