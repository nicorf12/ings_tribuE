import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";
import { obtenerTareas, obtenerProyectos, obtenerCargas } from "../../solicitudes.jsx";
import {func} from "prop-types";

const Calendar = ({ setCarga, fecha, setFecha }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [cargas, setCargas] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const projects = obtenerProyectos();
    const tareas = obtenerTareas();

    // useEffect para obtener las cargas cuando la fecha cambia o al inicializar
    useEffect(() => {
        const fetchData = async () => {
            let cargas_aux = await obtenerCargas();
            setCargas(formatCargas(cargas_aux, tareas, projects));
        };
        fetchData();

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
    }, [fecha]); // Esto asegura que se ejecute cada vez que 'fecha' cambie


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
                                (tasksByDay[day] || []).map((task) => (
                                <Card key={task.id} className={`mb-3 shadow-sm  ${selectedTask === task.id ? 'bg-primary text-white' : ''}`} onClick={() => handleSelected(task)}>
                                    <Card.Body  style ={{ height:task.hours*65 , display:"flex" , flexDirection:"column" ,justifyContent:"center",textAlign:"center" }}>
                                        <Card.Title className="mb-1">{task.project}</Card.Title>
                                        <Card.Subtitle className="mb-1 text-muted">{task.task}</Card.Subtitle>
                                        <Card.Text className="mb-0">Horas: {task.hours}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </td>
                    ))}
                </tr>
                </tbody>
            </Table>
        </Container>
    );
};

const formatCargas = (cargas, tareas, proyectos) => {
    let cargas_formateadas = [];
    cargas.forEach((carga) => {
        const task = tareas.find((t) => t.id === carga.idTask);
        const project = proyectos.find((p) => p.id === task.proyectoId);
        cargas_formateadas.push({
            hours: carga.hours,
            task: task.nombre,
            project: project.nombre,
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
