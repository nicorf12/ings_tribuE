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
                                        {mes}
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
                            {Object.keys(costos).map((key, rowIndex) => (
                                <TableRow
                                    key={key}
                                    sx={{
                                        backgroundColor: rowIndex % 2 === 0 ? 'secondary.main' : 'white',
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ color: 'text.primary', textAlign: 'center' }}
                                    >
                                        {key}
                                    </TableCell>
                                    {Object.values(costos)[rowIndex].map((value, index) => (
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
                                        {costos[key].reduce((a, b) => a + b, 0)}
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
