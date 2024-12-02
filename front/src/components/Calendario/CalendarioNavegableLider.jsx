import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import DatePickerWeek from "../DatePicker/DatePickerWeek.jsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const CalendarioNavegableLider = ({ setFecha, recurso, setRecurso, recursos }) => {

    const handleChange = (event, newValue) => {
        setRecurso(newValue)
    }
    return (
        <Navbar>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                        <DatePickerWeek setFecha={setFecha} />
                    </div>
                    <div style={{ flex: '0 0 25%' }}>
                        <Autocomplete
                            options={recursos}
                            value={recurso}
                            onChange={handleChange} // Actualiza el proyecto seleccionado
                            getOptionLabel={(option) => option.nombre + ' ' + option.apellido} // Muestra el nombre del proyecto
                            renderInput={(params) => (
                                <TextField {...params} label="Seleccione un recurso" fullWidth />
                            )}
                        />
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};

export default CalendarioNavegableLider;