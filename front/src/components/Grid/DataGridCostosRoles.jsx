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
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, CircularProgress, InputAdornment} from '@mui/material';
import TextField from "@mui/material/TextField";
import {updateRoles} from "../../services/RolesService.js";

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

const columnsNames = ["Nivel", "Experiencia", "Costo Por Hora"];

const DataGridCostosRoles = ({roles, setRoles}) => {

    const [editRoles, setEditRoles] = useState(null);
    const [saving, setSaving] = useState(false);

    const isEditing = editRoles !== null;
    const isEmpty = roles == null || roles.length === 0;


    const handleEdit = () => {
        setEditRoles(roles)
    };

    const handleConfirm = async () => {
        setSaving(true);
        try {
            await updateRoles(editRoles);
            setRoles(editRoles);
            setEditRoles(null);
        } catch (error) {
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditRoles(null);
    };

    const handleEditIncome = (roleIndex, value) => {
        const updatedRoles = [...editRoles];
        updatedRoles[roleIndex] = {
            ...updatedRoles[roleIndex],
            incomeByHour: value
        };
        setEditRoles(updatedRoles);
    };

    const actionButton = (text, startIcon, onClick, color = 'primary', visible = true, marginRight = 0) => (
        <Button
            variant="contained"
            color={color}
            startIcon={startIcon}
            onClick={onClick}
            sx={{ borderRadius: '8px', margin: '4px 0', marginRight: marginRight, border: '1px solid black', width: '120px', display: visible ? 'inline-flex' : 'none' }}
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

    const drawHeader = () => (
        <TableRow>
            {drawColumnsHeader()}
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

    const drawIncomeEditBox = (role, roleIndex) => (
        <TextField
            value={editRoles[roleIndex].incomeByHour != null ? editRoles[roleIndex].incomeByHour : role.incomeByHour}
            onChange={(e) => handleEditIncome(roleIndex, e.target.value)}
            variant="outlined"
            size="small"
            sx={{width: 100, fontSize: 'inherit', background: roleIndex % 2 === 0 ? 'white' : 'secondary.main'}}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
            }}
        />
    );

    const drawIncomeValue = (role, roleIndex) => (
        <TableCell align="center" sx={{color: 'text.primary', textAlign: 'center', maxWidth: 80}}>
            {isEditing ? (
                drawIncomeEditBox(role, roleIndex)
            ) : (
                `$ ${role.incomeByHour.toLocaleString("es-ES")}`
            )}
        </TableCell>
    );

    const drawBody = () => (
        roles.map((role, roleIndex) => (
            <TableRow
                key={role.id}
                sx={{
                    backgroundColor: roleIndex % 2 === 0 ? 'secondary.main' : 'white',
                }}
            >
                {drawLevelValue(role)}
                {drawExperienceValue(role)}
                {drawIncomeValue(role, roleIndex)}
            </TableRow>
        ))
    );

// Table
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    {saving && <CircularProgress size={24} sx={{ marginRight: 2, alignSelf: 'center' }} />}                    {actionButton('Guardar', <CheckIcon />, handleConfirm, 'primary', isEditing, 2)}
                    {actionButton('Cancelar', <CloseIcon />, handleCancel, 'secondary', isEditing)}
                    {actionButton('Editar', <EditIcon />, handleEdit, 'secondary', !isEditing && !isEmpty)}
                </Box>
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