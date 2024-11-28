import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "react-bootstrap/Container";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Button, InputAdornment} from '@mui/material';
import TextField from "@mui/material/TextField";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Azul principal
        },
        secondary: {
            main: '#e3f2fd', // Fondo azul claro
        }
    },
});

// Define RoleAPI object structure
const createRole = (id, name, experience) => ({ id, name, experience });

// Function to create data
function createData(id, role, incomeByHour, month, year) {
    return { id, role, incomeByHour, incomeEditValue: null, edit: false };
}

const columnsNames = ["Nivel", "Experiencia", "Costo Por Hora"];


const DataGridCostosRoles = () => {

    const [rows, setRows] = useState([
        createData(1, createRole('1', 'Desarrollador', 'Junior'), 10),
        createData(2, createRole('2', 'Desarrollador', 'Semi Senior'), 15),
        createData(3, createRole('3', 'Desarrollador', 'Senior'), 20),
    ]);


    const handleEdit = (rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].edit = true;
        newRows[rowIndex].incomeEditValue = newRows[rowIndex].incomeByHour;
        setRows(newRows);
    };

    const handleConfirm = (rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].edit = false;
        newRows[rowIndex].incomeByHour = newRows[rowIndex].incomeEditValue;
        newRows[rowIndex].incomeEditValue = null;
        setRows(newRows);
    };

    const handleCancel = (rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].edit = false;
        setRows(newRows);
    };

    const handleDelete = (rowIndex) => {
        const newRows = [...rows];
        newRows[rowIndex].edit = false;
        newRows[rowIndex].incomeByHour = 0;
        setRows(newRows);
    };

    const handleEditIncome = (rowIndex, value) => {
        const newRows = [...rows];
        newRows[rowIndex].incomeEditValue = value;
        setRows(newRows);
    };

    const editButton = (rowIndex) =>
        actionButton('Editar', <EditIcon/>, () => handleEdit(rowIndex));
    const deleteButton = (rowIndex) =>
        actionButton('Eliminar', <DeleteIcon/>, () => handleDelete(rowIndex), 'secondary');
    const confirmButton = (rowIndex) =>
        actionButton('Guardar', <CheckIcon/>, () => handleConfirm(rowIndex));
    const cancelButton = (rowIndex) =>
        actionButton('Cancelar', <CloseIcon/>, () => handleCancel(rowIndex), 'secondary');

    const actionButton = (text, startIcon, onClick, color = 'primary') => (
        <Button
            variant="contained"
            color={color}
            startIcon={startIcon}
            onClick={onClick}
            sx={{borderRadius: '8px', margin: '4px 0', border: '1px solid black', width: '120px'}}
        >
            {text}
        </Button>
    );

    const drawColumnsHeader = () => (
        columnsNames.map((nombre, index) => (
            <TableCell
                key={index}
                align="center"
                sx={{backgroundColor: '#1976d2', color: 'white', textAlign: 'center', maxWidth: 100}}
            >
                {nombre}
            </TableCell>
        ))
    );

    const drawActionsHeader = () => (
        <TableCell
            sx={{backgroundColor: '#1976d2', color: 'white', textAlign: 'center', width: 240}}
        >
            Acciones
        </TableCell>
    );

    const drawHeader = () => (
        <TableRow>
            {drawColumnsHeader()}
            {drawActionsHeader()}
        </TableRow>
    );

    const drawLevelValue = (row) => (
        <TableCell component="th" scope="row" sx={{color: 'text.primary', textAlign: 'center'}}>
            {row.role.name}
        </TableCell>
    );

    const drawExperienceValue = (row) => (
        <TableCell align="center" sx={{color: 'text.primary', textAlign: 'center'}}>
            {row.role.experience}
        </TableCell>
    );

    const drawIncomeValue = (row, rowIndex) => (
        <TableCell align="center" sx={{color: 'text.primary', textAlign: 'center', maxWidth: 80}}>
            {row.edit ? (
                <TextField
                    value={row.incomeEditValue !== null ? row.incomeEditValue : row.incomeByHour}
                    onChange={(e) => handleEditIncome(rowIndex, e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{width: 100, fontSize: 'inherit', background: rowIndex % 2 === 0 ? 'white' : 'secondary.main'}}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        },
                    }}
                />
            ) : (
                `$ ${row.incomeByHour.toLocaleString("es-ES")}`
            )}
        </TableCell>
    );

    const drawActionValue = (row, rowIndex) => (
        <TableCell sx={{color: 'text.primary', textAlign: 'center'}}>
            {row.edit ? (
                <>
                    {confirmButton(rowIndex)}
                    {cancelButton(rowIndex)}
                </>
            ) : (
                <>
                    {editButton(rowIndex)}
                    {deleteButton(rowIndex)}
                </>
            )}
        </TableCell>
    );

    const drawBody = () => (
        rows.map((row, rowIndex) => (
            <TableRow
                key={row.id}
                sx={{
                    backgroundColor: rowIndex % 2 === 0 ? 'secondary.main' : 'white',
                }}
            >
                {drawLevelValue(row)}
                {drawExperienceValue(row)}
                {drawIncomeValue(row, rowIndex)}
                {drawActionValue(row, rowIndex)}
            </TableRow>
        ))
    );

// Table
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <TableContainer component={Paper} sx={{backgroundColor: 'secondary.main', padding: 2}}>
                    <Table sx={{minWidth: 600}} aria-label="tabla de costos">
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
}

export default DataGridCostosRoles;