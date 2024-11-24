
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "react-bootstrap/Container";

// Función para crear datos
function createData(name, ...values) {
    return { name, values };
}

const meses = ["Enero 2024","Febrero 2024"]

// Componente DataGridCostos
const DataGridCostos = (  ) => {
    // Crear filas de ejemplo (puedes modificar esto según tus datos)
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24,),
        createData('Ice cream sandwich', 237, 9.0, 37, ),
        createData('Eclair', 262, 16.0, 24, ),
        createData('Cupcake', 305, 3.7, 67,),
        createData('Gingerbread', 356, 16.0, 49, ),
    ];

    return (
        <Container>
        <TableContainer component={Paper}  sx={{ backgroundColor: 'grey.300' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: 'red' }}>Recurso</TableCell>
                        {meses.map((mes, index) => (
                            <TableCell key={index} align="right" sx={{ backgroundColor: 'red' }}>{mes} (g)</TableCell>
                        ))}
                        <TableCell align="right" sx={{ backgroundColor: 'red' }}>Total (g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            {row.values.map((value, index) => (
                                <TableCell key={index} align="right">{value}</TableCell>
                            ))}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
    );
}

export default DataGridCostos;