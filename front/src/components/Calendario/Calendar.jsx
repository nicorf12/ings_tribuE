import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";
import {obtenerTareas, obtenerProyectos, obtenerCargas, obtenerCargasEnPeriodo} from "../../solicitudes.jsx";
import "./Card.css"
import seedrandom from "seedrandom";
import {colorPalette} from "../../utils/constants.js";


const Calendar = ({ setCarga, fecha, setFecha, deletion, recurso }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [cargas, setCargas] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [projects, setProjects] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cargasGuardadas, setCargasGuardadas] = useState({})


    // Fetchear proyectos y tareas al inicializar
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let projects_aux = await obtenerProyectos();
                let tareas_aux = await obtenerTareas();
                setProjects(projects_aux);
                setTareas(tareas_aux);
            } catch (e) {
                setError(e)
                return;
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    seedrandom('123', { global: true });


    // Separar las cargas por dia
    useEffect(() => {
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const tasks = {};
        daysOfWeek.forEach((day, index) => {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + index);
            tasks[day] = cargas.filter(task => {
                const taskDate = new Date(task.date);
                taskDate.setDate(taskDate.getDate() + 1)
                return taskDate.toDateString() === currentDay.toDateString();
            });
        });
        setTasksByDay(tasks);
    }, [cargas])

    // Borra la carga de hora del calendario cuando hay un delete
    useEffect(() => {
        if (deletion) {
            const startOfWeek = new Date(fecha);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const cargasAux = cargas.filter(carga => carga.id !== deletion)
            setCargas(cargasAux);
            cargasGuardadas[recurso.id][startOfWeek] = cargasAux
            setCargasGuardadas(cargasGuardadas)
        }
    }, [deletion])

    // useEffect para obtener las cargas cuando la fecha cambia o al inicializar
    useEffect(() => {
        if (tareas.length === 0) {
            return;
        }
        if (recurso === null) {
            setCargas([])
            return;
        }
        const startOfWeek = new Date(fecha);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const fetchData = async () => {
            setLoading(true);
            let cargas_aux;
            try {

                cargas_aux = await obtenerCargasEnPeriodo(formatDate(startOfWeek), formatDate(endOfWeek), recurso.id);
            } catch (e) {
                setError(e)
                return;
            } finally {
                setLoading(false);
            }
            cargas_aux = formatCargas(cargas_aux, tareas, projects);
            if (!cargasGuardadas.hasOwnProperty(recurso.id)) {
                cargasGuardadas[recurso.id] = {[startOfWeek]: cargas_aux}
            } else {
                cargasGuardadas[recurso.id][startOfWeek] = cargas_aux
            }
            setCargasGuardadas(cargasGuardadas);
            setCargas(cargas_aux);
        };
        if (cargasGuardadas.hasOwnProperty(recurso.id) && cargasGuardadas[recurso.id].hasOwnProperty(startOfWeek)) {
            setCargas(cargasGuardadas[recurso.id][startOfWeek]);
        } else {
            fetchData();
        }
    }, [tareas, fecha, recurso]);



    const handleSelected = (task) => {
        if (deletion !== null) {
            return;
        }
        setSelectedTask(prevId => (prevId === task.id ? null : task.id));
        setCarga(prevCarga => (prevCarga && prevCarga.id === task.id) ? null : task);
    };

    const today = new Date(fecha);
    const todayIndex = today.getDay();

    return (
        <Container className="mt-4">
            <Table bordered hover responsive>
                <colgroup>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '14%'}}/>
                    <col style={{width: '14%'}}/>
                </colgroup>
                <thead className="bg-primary text-white">
                <tr>
                    {daysOfWeek.map((day, index) => {
                        const currentDay = new Date(new Date(fecha).setDate(new Date(fecha).getDate() - new Date(fecha).getDay() + index));
                        const dayNumber = currentDay.getDate();
                        return (
                            <th key={index} className={todayIndex === index ? "bg-light text-center" : "text-center"}>
                                {day} {dayNumber}
                            </th>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {error ? (
                        <tr>
                            <td colSpan={daysOfWeek.length} className="text-center">
                                Hubo un error. Vuelve a intentarlo más tarde.
                            </td>
                        </tr>
                    ) :
                    loading ? (
                        <tr>
                            <td colSpan={daysOfWeek.length} className="text-center">
                                Cargando...
                            </td>
                        </tr>
                    ) : (
                        <tr>

                            {daysOfWeek.map((day, index) => (
                                <td key={index} className={todayIndex === index ? "bg-light" : ""}>
                                    {
                                        (tasksByDay[day] || []).map((task) => {
                                            return (
                                                <Card style={{backgroundColor: `${task.color}`}} key={task.id}
                                                      className={`mb-3 shadow-sm card ${selectedTask === task.id ? 'bg-primary text-white expanded  ' : ''}`}
                                                      onClick={() => handleSelected(task)}
                                                >
                                                    <Card.Body style={{
                                                        width: "100%",
                                                        overflow: "hidden",
                                                        height: task.hours * 80,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        textAlign: "center"
                                                    }}>
                                                        <Card.Title
                                                            className="mb-1"
                                                            style={{
                                                                display: "-webkit-box",
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                WebkitLineClamp: task.hours <= 2 ? 1 : 3,
                                                                whiteSpace: "normal",
                                                                width: "100%",
                                                            }}
                                                            title= {task.hours !== 1 ? task.project : `${task.project}\nDescripción: ${task.task}`}
                                                        >
                                                            {task.project}
                                                        </Card.Title>
                                                        {task.hours !== 1 && (
                                                            <Card.Subtitle
                                                                className="mb-1 text-muted"
                                                                style={{
                                                                    display: "-webkit-box",
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    WebkitLineClamp: task.hours <= 2 ? 1 : 3,
                                                                    whiteSpace: "normal",
                                                                    width: "100%",
                                                                }}
                                                                title={task.task}
                                                            >
                                                                {task.task}
                                                            </Card.Subtitle>)}
                                                        <Card.Text
                                                            className="mb-0"
                                                        >
                                                            Horas: {task.hours}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                </td>
                            ))}
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

const formatCargas = (cargas, tareas, proyectos) => {

    let colors = {};
    let used_colors = [];
    let cargas_formateadas = [];
    cargas.forEach((carga) => {
        const task = tareas.find((t) => t.id === carga.idTask);
        const project = proyectos.find((p) => p.id === task.proyectoId);
        let color = "";
        if (colors.hasOwnProperty(project.id)) {
            color = colors[project.id];
        } else {
            do {
                color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            } while(used_colors.includes(color))
            used_colors.push(color);
            colors[project.id] = color
        }
        cargas_formateadas.push({
            hours: carga.hours,
            task: task.nombre,
            project: project.nombre,
            color: color,
            date: carga.date,
            id: carga.id
        });
    });
    return cargas_formateadas;
};



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default Calendar;