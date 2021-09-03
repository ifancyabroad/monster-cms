import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

function createData(name: string, value: number) {
    return { name, value };
}

const rows = [
    createData('Strength', 10),
    createData('Dexterity', 15),
    createData('Constitution', 8),
    createData('Intelligence', 12),
    createData('Wisdom', 18),
    createData('Charisma', 10),
];

export const StatsTable: React.FC = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="stats table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}