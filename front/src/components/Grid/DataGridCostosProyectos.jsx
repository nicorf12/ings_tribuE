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

const DataGridCostosProyectos = () => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const rows = [
        { project: { id: 1, name: 'P1', description: 'Description P1' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 } },
        { project: { id: 2, name: 'P2', description: 'Description P2' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 0, 12: 0 }, total: 1000 }},
        { project: { id: 3, name: 'P3', description: 'Description P3' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 } },
        { project: { id: 4, name: 'P4', description: 'Description P4' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 }},
        { project: { id: 5, name: 'P5', description: 'Description P5' }, cost: { byMonth: { 1: 50000, 2: 50000, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 51000 }},
    ];

    const drawProjectHeader = () => (
        <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
            Proyecto
        </TableCell>
    );

    const drawMonthsHeader = () => (
        months.map((mes, index) => (
            <TableCell
                key={index}
                align="center"
                sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center', maxWidth: 80 }}
            >
                {mes}
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
        Object.entries(byMonth).map(([month, value], index) => (
            <TableCell
                key={index}
                align="center"
                sx={{ color: 'text.primary', textAlign: 'center' }}
            >
                {value}
            </TableCell>
        ))
    );

    const drawTotalValue = (total) => (
        <TableCell
            align="center"
            sx={{ color: 'text.primary', textAlign: 'center' }}
        >
            {total}
        </TableCell>
    );

    const drawBody = () => (
        rows.map((row, rowIndex) => (
            <TableRow
                key={row.project.id}
                sx={{
                    backgroundColor: rowIndex % 2 === 0 ? 'secondary.main' : 'white',
                }}
            >
                {drawProjectValue(row.project)}
                {drawMonthValues(row.cost.byMonth)}
                {drawTotalValue(row.cost.total)}
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