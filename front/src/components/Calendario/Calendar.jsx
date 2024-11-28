import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css"

// eslint-disable-next-line react/prop-types
const Calendar = ({ setCarga, fecha,setFecha }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});

    const cargas = [
        { id: "1", project: "Ford", task: "Tarea #1265", date: "2024-11-20", hours: 2 },
        { id: "2", project: "CRM v3.0", task: "Tarea #5435", date: "2024-11-21", hours: 4 },
        { id: "3", project: "Toyota", task: "Tarea #1232", date: "2024-11-22", hours: 4 },
        { id: "4", project: "Toyota", task: "Tarea #1232", date: "2024-11-17", hours: 4 },
        { id: "5", project: "Toyota", task: "Tarea #1232", date: "2024-11-18", hours: 4 },
        { id: "6", project: "Toyota", task: "Tarea #1232", date: "2024-11-25", hours: 4 }
    ];

    useEffect(() => {
        if(fecha == null) {
            //si es nula,la carga y vuelve al use effect
            setFecha(new Date());
        }else{
            const startOfWeek = new Date(fecha);
            //setea fecha hasta domingo de esa semana
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

            const tasks = {};
            daysOfWeek.forEach((day, index) => {
                const currentDay = new Date(startOfWeek);
                currentDay.setDate(startOfWeek.getDate() + index); // Añade el índice para obtener el día correcto
                tasks[day] = cargas.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate.toDateString() === currentDay.toDateString(); // Compara solo la fecha
                });
            });
            setTasksByDay(tasks);
        }

    }, [fecha]);



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
                        const dayNumber = currentDay.getDate(); // Obtener el número del día
                        return (
                            <th key={index} className={todayIndex === index ? "bg-ligth text-center" : "text-center"}>
                                {day} {dayNumber}
                            </th>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {daysOfWeek.map((day, index) => {

                        return (
                            <td key={index} className= {todayIndex === index ? "bg-light": ""}>
                                {(tasksByDay[day] || []).map((task) =>
                                    <Card key={task.id} className={`mb-3 shadow-sm py-${task.hours*5} ${selectedTask === task.id ? 'bg-primary text-white' : ''}`} onClick={() => handleSelected(task)}>
                                        <Card.Body >
                                            <Card.Title className="mb-2">{task.project}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{task.task}</Card.Subtitle>
                                            <Card.Text className="mb-0">Horas: {task.hours}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                )}
                            </td>
                        );
                    })}
                </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default Calendar;