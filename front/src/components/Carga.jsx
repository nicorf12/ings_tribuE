import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { obtenerTareas, obtenerProyectos, obtenerCargas } from "../solicitudes.jsx";


import DatePickerExclude from "./DatePicker/DatePickerExclude.jsx";

const Carga = ({editar,carga}) => {
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);
    const [hours, setHours] = useState("");


    //const projects = ["Ford", "CRM v3.0", "Toyota"];
    const projects = getProjectSelectList();
    const tasks = getTasksSelectMap(projects);
    //const tasks = {
    //    Ford: ["Tarea 1265", "Tarea 1266"],
    //    "CRM v3.0": ["Tarea 5435", "Tarea 5436"],
    //    Toyota: ["Tarea 1232", "Tarea 1233"],
    //};

    let proyecto;
    let tarea;
    let horas;
    let fecha;

    if (editar && carga) {
        proyecto = <Autocomplete
            options={projects}
            value={project}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={carga.project}
                    InputProps={{
                        ...params.InputProps,
                        readOnly: true,   // Hace que el campo sea solo lectura
                    }}
                />
            )}
        />
        tarea = <Autocomplete
            options={project ? tasks[project] || [] : []}
            value={task}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={carga.task}
                    InputProps={{
                        ...params.InputProps,
                        readOnly: true,   // Hace que el campo sea solo lectura
                    }} // Deshabilitar si no hay un proyecto seleccionado
                />
            )}
        />

        horas = <TextField
            type="number"
            fullWidth
            value={carga.hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Ingrese las horas"
        />

        let dateCalendar = new Date(carga.date);
        dateCalendar.setDate(dateCalendar.getDate() + 1);
        fecha = <DatePickerExclude date={dateCalendar} />
    } else {
        proyecto = <Autocomplete
            options={projects}
            value={project}
            onChange={(event, newValue) => {
                setProject(newValue);
                setTask(null);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccione un proyecto" />}
        />

        tarea = <Autocomplete
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

        horas = <TextField
            type="number"
            fullWidth
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Ingrese las horas"
        />

        fecha = <DatePickerExclude date={new Date()} />
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();

        const request = {
            idResource:
            idTask:

        }

        try {
            const response = await fetch('http://localhost:8080/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Carga de horas</h2>
            <Form onSubmit={handleSubmit}>
                {/* Campo Proyecto */}
                <Form.Group className="mb-3">
                    <Form.Label>Proyecto</Form.Label>
                    {proyecto}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tarea</Form.Label>
                    {tarea}
                </Form.Group>

                {/* Campo Horas */}
                <Form.Group className="mb-3">
                    <Form.Label>Horas</Form.Label>
                    {horas}
                </Form.Group>


                {/* Botón Cambiar fecha*/}
                <div className="d-flex justify-content-between align-items-center mb-3 w-100">
                    {fecha}

                {/* Botón Confirmar */}
                <Button variant="primary" type="submit">
                    Confirmar
                </Button>

                </div>
            </Form>
        </Container>
    );
};

const getProjectSelectList = () => {
    const projects = obtenerProyectos();
    const result = [];
    projects.forEach((project) => {
        result.push(project.nombre + project.id)
    })
    return result;
}

const getTasksSelectMap = (projects) => {
    const tareas = obtenerTareas();
    const result = {}
    projects.forEach((project) => {
        result[project.nombre + project.id] = getTasksInProject(tareas, project.id)
    })
    return result;
}

const getTasksInProject = (tareas, projectId) => {
    const result = []
    tareas.forEach((task) => {
        if (task.proyectoId === projectId) {
            result.push(task.nombre)
        }
    })
    return result;
}

export default Carga;
