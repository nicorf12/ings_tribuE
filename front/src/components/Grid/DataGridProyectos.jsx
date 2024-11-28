import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Azul principal
        },
        secondary: {
            main: '#e3f2fd', // Fondo azul claro
        },
        text: {
            primary: '#000000', // Texto negro
        },
    },
});

// Componente DataGridProyectos
const DataGridProyectos = ({ proyectos, onSelect }) => {

    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper} sx={{ backgroundColor: 'secondary.main', padding: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de proyectos">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
                            >
                                Nombre
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
                            >
                                Descripción
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
                            >
                                Detalles
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proyectos.map((proyecto, rowIndex) => (
                            <TableRow
                                key={proyecto.id}
                                sx={{
                                    backgroundColor: rowIndex % 2 === 0 ? 'white' : '#f5f5f5',
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell
                                    align="center"
                                    sx={{ color: 'text.primary', textAlign: 'center' }}
                                >
                                    {proyecto.nombre}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: 'text.primary', textAlign: 'center' }}
                                >
                                    {proyecto.descripcion}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ color: 'text.primary', textAlign: 'center' }}
                                >
                                    <Link to={"/lider/proyecto"} state={proyecto.id} style={{ color: '#1976d2', textDecoration: 'none' }}>Ir</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

export default DataGridProyectos;
