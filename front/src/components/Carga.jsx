import { useState, useEffect } from 'react';
import {Container, Form, Button, Modal} from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { obtenerTareas, obtenerProyectos,  modificarCarga, agregarCarga } from "../solicitudes.jsx";
import { useNavigate } from 'react-router-dom';


import DatePickerExclude from "./DatePicker/DatePickerExclude.jsx";
import Snackbar from "@mui/material/Snackbar";
import {Box} from "@mui/material";






const Carga = ({editar,carga}) => {
    const [project, setProject] = useState(null);
    const [task, setTask] = useState(null);
    const [hours, setHours] = useState("");
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showInvalidValueAlert, setShowInvalidValueAlert] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let proyecto;
    let tarea;
    let horas;
    let fecha;

    const [fecha_elegida , setFecha] = useState(new Date());
    const [excludeFilter] = useState(true);




    useEffect(() => {

    }, [error])


    useEffect(() => {
        const fetchData = async () => {
            let projects_aux;
            let tareas_aux;
            try {
                projects_aux = await obtenerProyectos();
                tareas_aux = await obtenerTareas();
            } catch (e) {
                setError(e);
            }

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
            excludeDates ={excludeFilter}

        />
    }
    else {
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
            excludeDates={excludeFilter}
        />
    }

    const handleErrorNotifClose = () => {
        setError(null);
    }
    const handleLoadingNotifClose = () => {
        setLoading(false);
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const checkForm = () => {
        if (!editar) {
            if (project == null) {
                return "Por favor selecciona un proyecto";
            }
            if (task == null) {
                return "Por favor selecciona una tarea";
            }
        }
        if (isNaN(parseInt(hours))) {
            return "Por favor agrega una cantidad de horas"
        }
        if (parseInt(hours) <= 0) {
            return "Las horas deben ser mayor a 0";
        }
        if (parseInt(hours) > 24) {
            return "Las horas no pueden ser mayor a 24";
        }
        return null;
    }

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        let errorMessage = checkForm()
        if (errorMessage !== null) {
            setShowInvalidValueAlert(errorMessage);
            return;
        }
        const request = {
            hours: parseInt(hours),
            date: formatDate(fecha.props.date)
        }
        setLoading(true);
        try {
            await modificarCarga(carga, request);
            navigate('/dev', { state: 1 });
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorMessage = checkForm()
        if (errorMessage !== "") {
            setShowInvalidValueAlert(errorMessage);
            return;
        }

        const request = {
            idResource: "ff14a491-e26d-4092-86ea-d76f20c165d1",
            idTask: task.id,
            hours: parseInt(hours),
            date: formatDate(fecha.props.date)
        }
        setLoading(true);
        try {
            await agregarCarga(request);
            navigate('/dev', { state: 2 });
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const hideAlert = () => {
        setShowInvalidValueAlert(false);
    }



    let modal = null;
    if (showInvalidValueAlert) {
        modal = <Modal show={showInvalidValueAlert} onHide={hideAlert}>
            <Modal.Header>
                <Modal.Title>Formulario invalido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showInvalidValueAlert}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideAlert}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    }

    return (
        <Container className="mt-5">
            {modal}
            <h2 className="text-center mb-4">Carga de horas</h2>
            <Form onSubmit={editar ? handleSubmitUpdate : handleSubmit}>
                {/* Campo Proyecto */}
                <Form.Group
                    className="mb-3"
                    name="proyecto"
                >
                    <Form.Label>Proyecto</Form.Label>
                    {proyecto}
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    Por favor elige un proyecto
                </Form.Control.Feedback>

                <Form.Group
                    className="mb-3"
                    name="tarea"
                >
                    <Form.Label>Tarea</Form.Label>
                    {tarea}
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    Por favor elige una tarea
                </Form.Control.Feedback>

                {/* Campo Horas */}
                <Form.Group
                    className="mb-3"
                    name="hours"
                >
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

            <Snackbar
                open={error != null}
                autoHideDuration={4000}
                onClose={handleErrorNotifClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Box
                    sx={{
                        backgroundColor: "#FF4C4C",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                        fontSize: "16px",
                    }}
                >
                    Hubo un error al guardar la carga. Vuelve a intentarlo mas tarde.
                </Box>
            </Snackbar>
            <Snackbar
                open={loading}
                autoHideDuration={10000}
                onClose={handleLoadingNotifClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Box
                    sx={{
                        backgroundColor: "#A6A6A6",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                        fontSize: "16px",
                    }}
                >
                    Enviando formulario...
                </Box>
            </Snackbar>
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
