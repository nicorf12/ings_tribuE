import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";
import { obtenerTareas, obtenerProyectos, obtenerCargas } from "../../solicitudes.jsx";




// eslint-disable-next-line react/prop-types
const Calendar = ({ setCarga, fecha, setFecha }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [projects, setProjects] = useState([]);
    const [tareas, setTareas] = useState([]);

    const cargas = obtenerCargas();

    useEffect(() => {
        // Cargar proyectos y tareas al montar el componente
        setProjects(obtenerProyectos());
        setTareas(obtenerTareas());
    }, []);

    useEffect(() => {
        if (fecha == null) {
            setFecha(new Date());
        } else {
            const startOfWeek = new Date(fecha);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

           // const url = `https://psa-loadhour.onrender.com/api/hours?initDate=${formatDate(startOfWeek)}&endDate=${formatDate(endOfWeek)}`;

            /*
            const fetchData = async () => {
                try {
                    let response = await fetch(url, {
                        headers:{Accept:"}
                });
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                    }

                    const cargas = await response.json();
                    console.log(cargas);

                */
                    // Conectar cargas con tareas y proyectos
                    const updatedCargas = cargas.map(carga => {
                        const tarea = tareas.find(t => t.id === carga.task);

                        const proyecto = projects.find(p => p.id === tarea?.proyectoId);
                        return {
                            ...carga,
                            nameTask: tarea ? tarea.nombre : 'Tarea Desconocida',
                            nameProject: proyecto ? proyecto.nombre : 'Proyecto Desconocido',
                        };
                    });

                    // Crear un objeto para almacenar las tareas por día
                    const tasks = {};
                    daysOfWeek.forEach((day, index) => {
                        const currentDay = new Date(startOfWeek);
                        currentDay.setDate(startOfWeek.getDate() + index);
                        tasks[day] = updatedCargas.filter(task => {
                            const taskDate = new Date(task.date);
                            return taskDate.toDateString() === currentDay.toDateString();
                        });
                    });
                    setTasksByDay(tasks);
                    /*
                } catch (error) {
                    console.error('Hubo un problema con la solicitud GET:', error);
                }

                     */

    }}, [fecha, tareas, projects]);

    const handleSelected = (task) => {
        setSelectedTask(prevId => (prevId === task.id ? null : task.id));
        setCarga(prevCarga => (prevCarga && prevCarga.id === task.id) ? null : task);
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
                            {(tasksByDay[day] || []).map((task) => (
                                <Card key={task.id} className={`mb-3 shadow-sm py-${task.hours * 5} ${selectedTask === task.id ? 'bg-primary text-white' : ''}`} onClick={() => handleSelected(task)}>
                                    <Card.Body>
                                        <Card.Title className="mb-2">{task.nameProject}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{task.nameTask}</Card.Subtitle>
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

export default Calendar;