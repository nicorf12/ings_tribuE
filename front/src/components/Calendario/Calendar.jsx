import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";
import { obtenerTareas, obtenerProyectos, obtenerCargas } from "../../solicitudes.jsx";
import {func} from "prop-types";
import seedrandom from "seedrandom";

const Calendar = ({ setCarga, fecha, setFecha }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [cargas, setCargas] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [projects, setProjects] = useState([]);
    const [tareas, setTareas] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            let projects_aux = await obtenerProyectos();
            let tareas_aux = await obtenerTareas();
            setProjects(projects_aux);
            setTareas(tareas_aux)
        };
        fetchData()
    }, [])

    seedrandom('123', { global: true });

    // useEffect para obtener las cargas cuando la fecha cambia o al inicializar
    useEffect(() => {
        const fetchData = async () => {
            let cargas_aux = await obtenerCargas();
            setCargas(formatCargas(cargas_aux, tareas, projects));
        };
        fetchData();

        console.log(cargas);

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
    }, [fecha, projects, tareas]); // Esto asegura que se ejecute cada vez que 'fecha' cambie


    const handleSelected = (task) => {
        setSelectedTask(prevId => (prevId === task.id ? null : task.id));
        setCarga(prevCarga => (prevCarga && prevCarga.id === task.id) ? null : task);
        console.log(task.id);
    };

    const today = new Date(fecha);
    const todayIndex = today.getDay();

    return (
        <Container className="mt-4">
            <Table bordered hover responsive>
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
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <td key={index} className={todayIndex === index ? "bg-light" : ""}>
                            {
                                (tasksByDay[day] || []).map((task) => {
                                    console.log(task);
                                    return (
                                <Card style={{backgroundColor:`${task.color}`}} key={task.id} className={`mb-3 shadow-sm  ${selectedTask === task.id ? 'bg-primary text-white' : ''}`} onClick={() => handleSelected(task)}>
                                    <Card.Body  style ={{ height:task.hours*65 , display:"flex" , flexDirection:"column" ,justifyContent:"center",textAlign:"center"}}>
                                        <Card.Title className="mb-1">{task.project}</Card.Title>
                                        <Card.Subtitle className="mb-1 text-muted">{task.task}</Card.Subtitle>
                                        <Card.Text className="mb-0">Horas: {task.hours}</Card.Text>
                                    </Card.Body>
                                </Card>
                            )})}
                        </td>
                    ))}
                </tr>
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
