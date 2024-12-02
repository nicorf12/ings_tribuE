import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";
import {obtenerTareas, obtenerProyectos, obtenerCargas, obtenerCargasEnPeriodo} from "../../solicitudes.jsx";
import "./Card.css"
import seedrandom from "seedrandom";
import colorPalette, {defaultErrorMessage, defaultLoadingMessage} from "../../utils/constants.js";
import {formatDate} from "../../utils/lib.js";


const Calendar = ({ setCarga, fecha, setFecha, deletion }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [cargas, setCargas] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [projects, setProjects] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cargasGuardadas, setCargasGuardadas] = useState({})

    // Para que los colores al azar de las cargas sean siempre los mismos
    seedrandom('123', { global: true });


    // Hace un fetch de las tareas y los proyectos
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


    // Separa las cargas en dias
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

    // Filtra la carga que fue borrada en caso de que alguna haya sido borrada
    useEffect(() => {
        if (deletion) {
            const startOfWeek = new Date(fecha);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            setCargas(cargas.filter(carga => carga.id !== deletion.id));
            delete cargasGuardadas[startOfWeek]
            setCargasGuardadas(cargasGuardadas)
        }
    }, [deletion]);

    // useEffect para obtener las cargas al inicializar o cuando cambia la fecha
    useEffect(() => {
        if (tareas.length === 0) {
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
                cargas_aux = await obtenerCargasEnPeriodo(formatDate(startOfWeek), formatDate(endOfWeek), "ff14a491-e26d-4092-86ea-d76f20c165d1");
            } catch (e) {
                setError(e)
                return;
            } finally {
                setLoading(false);
            }
            cargas_aux = formatCargas(cargas_aux, tareas, projects);
            cargasGuardadas[startOfWeek] = cargas_aux;
            setCargasGuardadas(cargasGuardadas);
            setCargas(cargas_aux);
        };

        // Para evitar fetchear cargas que ya fueron fetcheadas se leen del objeto que guarda las cargas ya fetcheadas por semana
        if (cargasGuardadas.hasOwnProperty(startOfWeek)) {
            setCargas(cargasGuardadas[startOfWeek]);
        } else {
            fetchData();
        }
    }, [tareas, fecha]);


    // Maneja el click del usuario en una fecha para seleccionarla
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
                            {defaultErrorMessage}
                            Hubo un error. Vuelve a intentarlo más tarde.
                        </td>
                    </tr>
                ) :
                loading ? (
                    <tr>
                        <td colSpan={daysOfWeek.length} className="text-center">
                            {defaultLoadingMessage}
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
                color = colorPalette[Math.floor(Math.random() * colorPallete.length)];
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
/*
const colorPallete = [
    "#FF9999",
    "#FFAA99",
    "#FFBB99",
    "#FFCC99",
    "#FFDD99",
    "#FFEE99",
    "#FFFF99",
    "#EEFF99",
    "#DDFF99",
    "#CCFF99",
    "#BBFF99",
    "#AAFF99",
    "#99FF99",
    "#99FFAA",
    "#99FFBB",
    "#99FFCC",
    "#99FFDD",
    "#99FFEE",
    "#99FFFF",
    "#99EEFF",
    "#99DDFF",
    "#99CCFF",
    "#99BBFF",
    "#99AAFF",
    "#9999FF",
    "#AA99FF",
    "#BB99FF",
    "#CC99FF",
    "#DD99FF",
    "#EE99FF",
    "#FF99FF",
    "#FF99EE",
    "#FF99DD",
    "#FF99CC",
    "#FF99BB",
    "#FF99AA",
]
*/

//const formatDate = (date) => {
//    const year = date.getFullYear();
//    const month = (date.getMonth() + 1).toString().padStart(2, '0');
//    const day = date.getDate().toString().padStart(2, '0');
//    return `${year}-${month}-${day}`;
//};

export default Calendar;
