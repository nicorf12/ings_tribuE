import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";
import { obtenerTareas, obtenerProyectos, obtenerCargas } from "../../solicitudes.jsx";
import "./Card.css"
import seedrandom from "seedrandom";


const Calendar = ({ setCarga, fecha, setFecha, deletion }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [cargas, setCargas] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [projects, setProjects] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            let projects_aux
            let tareas_aux
            try {
                projects_aux = await obtenerProyectos();
                tareas_aux = await obtenerTareas();
            } catch (e) {
                setError(e)
                setLoading(false);
                return;
            }
            setProjects(projects_aux);
            setTareas(tareas_aux);
        };
        fetchData();
    }, [])

    seedrandom('123', { global: true });


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
    }, [fecha, cargas])

    // useEffect para obtener las cargas cuando la fecha cambia o al inicializar
    useEffect(() => {
        if (tareas.length === 0) {
            return;
        }
        if (deletion) {
            setCargas(cargas.filter(carga => carga.id !== deletion.id));
        }
        const fetchData = async () => {

            let cargas_aux;
            try {
                cargas_aux = await obtenerCargas();
            } catch (e) {
                setError(e)
                return;
            } finally {
                setLoading(false);
            }
            cargas_aux = formatCargas(cargas_aux, tareas, projects);
            setCargas(cargas_aux);
        };
        fetchData();
    }, [tareas, deletion]);


    const handleSelected = (task) => {
        console.log(deletion)
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
                    {/* All columns get the same width */}
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
                                                            display: "-webkit-box",         // Enable the multi-line truncation
                                                            WebkitBoxOrient: "vertical",    // Stack lines vertically
                                                            overflow: "hidden",             // Hide overflow
                                                            textOverflow: "ellipsis",       // Add ellipsis for overflowing content
                                                            WebkitLineClamp: task.hours <= 2 ? 1 : 3,             // Limit to 1 line (you can adjust the value if you want more lines)
                                                            whiteSpace: "normal",           // Allow wrapping to get truncated
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
                                                            display: "-webkit-box",         // Enable the multi-line truncation
                                                            WebkitBoxOrient: "vertical",    // Stack lines vertically
                                                            overflow: "hidden",             // Hide overflow
                                                            textOverflow: "ellipsis",       // Add ellipsis for overflowing content
                                                            WebkitLineClamp: task.hours <= 2 ? 1 : 3,             // Limit to 1 line (you can adjust the value if you want more lines)
                                                            whiteSpace: "normal",           // Allow wrapping to get truncated
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
                color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
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


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default Calendar;
