import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Carga = () => {
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);
    const [hours, setHours] = useState("");

    const projects = ["Ford", "CRM v3.0", "Toyota"];

    const tasks = {
        Ford: ["Tarea 1265", "Tarea 1266"],
        "CRM v3.0": ["Tarea 5435", "Tarea 5436"],
        Toyota: ["Tarea 1232", "Tarea 1233"],
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Carga de horas</h2>
            <Form>
                {/* Campo Proyecto */}
                <Form.Group className="mb-3">
                    <Form.Label>Proyecto</Form.Label>
                    <Autocomplete
                        options={projects}
                        value={project}
                        onChange={(event, newValue) => {
                            setProject(newValue);
                            setTask(null); // Reiniciar la tarea seleccionada al cambiar de proyecto
                        }}
                        renderInput={(params) => <TextField {...params} label="Seleccione un proyecto" />}
                    />
                </Form.Group>

                {/* Campo Tarea */}
                <Form.Group className="mb-3">
                    <Form.Label>Tarea</Form.Label>
                    <Autocomplete
                        options={project ? tasks[project] || [] : []}
                        value={task}
                        onChange={(event, newValue) => setTask(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Seleccione una tarea"
                                disabled={!project} // Deshabilitar si no hay un proyecto seleccionado
                            />
                        )}
                    />
                </Form.Group>

                {/* Campo Horas */}
                <Form.Group className="mb-3">
                    <Form.Label>Horas</Form.Label>
                    <TextField
                        type="number"
                        fullWidth
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="Ingrese las horas"
                    />
                </Form.Group>
                {/* Botón Cambiar fecha */}

                {/* Botón Confirmar */}
                <Button variant="primary" type="submit">
                    Confirmar
                </Button>
            </Form>
        </Container>
    );
};

export default Carga;
