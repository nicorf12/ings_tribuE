import { useState, useEffect } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { obtenerTareas, obtenerProyectos, obtenerCargas } from "../solicitudes.jsx";
import { useNavigate } from 'react-router-dom';


import DatePickerExclude from "./DatePicker/DatePickerExclude.jsx";

const Carga = ({editar,carga}) => {
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);
    const [hours, setHours] = useState("");
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    let proyecto;
    let tarea;
    let horas;
    let fecha;

    const [fecha_elegida , setFecha] = useState(new Date());


    useEffect(() => {
        const fetchData = async () => {
            let projects_aux = await obtenerProyectos();
            let tareas_aux = await obtenerTareas();
            setProjects(getProjectSelectList(projects_aux));
            setTasks(getTasksSelectMap(projects_aux, tareas_aux));
        };
        fetchData()
    }, [])

    useEffect(() => {
        if (carga != null) {
            setHours(carga.hours)
            let dateCalendar = new Date(carga.date);
            dateCalendar.setDate(dateCalendar.getDate() + 1);
            setFecha(dateCalendar)
        }

    }, [])

    if (editar && carga) {
        proyecto = <Autocomplete
            disabled={true}
            options= {[]}
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
            disabled={true}
            options= {[]}
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
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Ingrese las horas"
        />

        fecha = <DatePickerExclude
            date={fecha_elegida}
            setFecha={setFecha}
        />
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
            getOptionLabel={(option) => option?.nombre || ""}
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

        fecha = <DatePickerExclude
            date={fecha_elegida}
            setFecha={setFecha}
        />
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        const request = {
            hours: parseInt(hours),
            date: formatDate(fecha.props.date)
        }

        try {
            const response = await fetch(`http://localhost:8080/api/modify/${carga.id}`, {
                method: 'PUT',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                navigate('/dev');
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            idResource: "ff14a491-e26d-4092-86ea-d76f20c165d1",
            idTask: task.id,
            hours: hours,
            date: formatDate(fecha.props.date)
        }
        console.log(JSON.stringify(request))
        try {
            const response = await fetch('http://localhost:8080/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                navigate('/dev');
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
            <Form onSubmit={editar ? handleSubmitUpdate : handleSubmit}>
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

const getProjectSelectList = (projects) => {
    const result = [];
    projects.forEach((project) => {
        result.push(project.nombre)
    })
    return result;
}

const getTasksSelectMap = (projects, tareas) => {
    const result = {}
    projects.forEach((project) => {
        result[project.nombre] = getTasksInProject(tareas, project.id)
    })
    return result;
}

const getTasksInProject = (tareas, projectId) => {
    const result = []
    tareas.forEach((task) => {
        if (task.proyectoId === projectId) {

            result.push(task)
        }
    })
    return result;
}

export default Carga;
