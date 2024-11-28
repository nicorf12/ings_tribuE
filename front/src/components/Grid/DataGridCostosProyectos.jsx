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

const DataGridCostosProyectos = ({projects}) => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


    const drawProjectHeader = () => (
        <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
            Proyecto
        </TableCell>
    );

    const drawMonthsHeader = () => (
        months.map((month, index) => (
            <TableCell
                key={index}
                align="center"
                sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center', maxWidth: 80 }}
            >
                {month}
            </TableCell>
        ))
    );

    const drawTotalHeader = () => (
        <TableCell
            align="center"
            sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
        >
            Total
        </TableCell>
    );

    const drawHeader = () => (
        <TableRow>
            {drawProjectHeader()}
            {drawMonthsHeader()}
            {drawTotalHeader()}
        </TableRow>
    );

    const drawProjectValue = (project) => (
        <TableCell
            component="th"
            scope="row"
            sx={{ color: 'text.primary', textAlign: 'center' }}
        >
            {project.name}
        </TableCell>
    );

    const drawMonthValues = (byMonth) => (
        Object.entries(byMonth).map(([month, amount], index) => (
            drawAmountValue(amount, month)
        ))
    );

    const drawAmountValue = (amount, key) => (
        <TableCell
            key={key}
            align="center"
            sx={{ color: 'text.primary', textAlign: 'center' }}
        >
            $ {amount.toLocaleString('es-ES')}
        </TableCell>
    );



    const drawBody = () => (
        projects.map((row, rowIndex) => (
            <TableRow
                key={row.project.id}
                sx={{
                    backgroundColor: rowIndex % 2 === 0 ? 'secondary.main' : 'white',
                }}
            >
                {drawProjectValue(row.project)}
                {drawMonthValues(row.cost.byMonth)}
                {drawAmountValue(row.cost.total, 'total-amount')}
            </TableRow>
        ))
    );

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TableContainer component={Paper} sx={{ backgroundColor: 'secondary.main', padding: 2 }}>
                    <Table sx={{ minWidth: 1200 }} aria-label="tabla de costos">
                        <TableHead>
                            {drawHeader()}
                        </TableHead>
                        <TableBody>
                            {drawBody()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default DataGridCostosProyectos;