import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "react-bootstrap/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Azul principal
        },
        secondary: {
            main: '#e3f2fd', // Fondo azul claro
        },
    },
});

// Función para crear datos
function createData(name, ...values) {
    return { name, values };
}

// Componente DataGridCostos
const DataGridCostos = ({costos ,meses}) => {
    // Crear filas de ejemplo (puedes modificar esto según tus datos)
    const rows = [
        createData('Frozen yoghurt', 159, 6.0),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Eclair', 262, 16.0),
        createData('Cupcake', 305, 3.7),
        createData('Gingerbread', 356, 16.0),
    ];



    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TableContainer component={Paper} sx={{ backgroundColor: 'secondary.main', padding: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla de costos">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
                                >
                                    Recurso
                                </TableCell>

                                { meses ? meses.map((mes, index) => (
                                    <TableCell
                                        key={index}
                                        align="center"
                                        sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
                                    >
                                        {mes} (g)
                                    </TableCell>
                                )): (
                                    <TableCell>
                                        No hay meses
                                    </TableCell>
                                )}
                                <TableCell
                                    align="center"
                                    sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
                                >
                                    Total (g)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, rowIndex) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        backgroundColor: rowIndex % 2 === 0 ? 'secondary.main' : 'white',
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ color: 'text.primary', textAlign: 'center' }}
                                    >
                                        {row.name}
                                    </TableCell>
                                    {row.values.map((value, index) => (
                                        <TableCell
                                            key={index}
                                            align="center"
                                            sx={{ color: 'text.primary', textAlign: 'center' }}
                                        >
                                            {value}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        align="center"
                                        sx={{ color: 'text.primary', textAlign: 'center' }}
                                    >
                                        {row.values.reduce((a, b) => a + b, 0)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default DataGridCostos;
