import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const Calendar = () => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const [selectedTask, setSelectedTask] = useState(null);

        const handleSelected = (taskId) =>{
            setSelectedTask(prevId => (prevId === taskId ? null : taskId));
            console.log(taskId);
            console.log(taskId);

    }
    const cargas = [
        {
            id: "aas34asd1",
            project: "Ford",
            task: "Tarea #1265",
            date: "2024-11-20",
            hours: 2,
        },
        {
            id: "aas34asd2",
            project: "CRM v3.0",
            task: "Tarea #5435",
            date: "2024-11-21",
            hours: 4,
        },
        {
            id: "aas34asd3",
            project: "Toyota",
            task: "Tarea #1232",
            date: "2024-11-22",
            hours: 4,
        },
        {
            id: "aas34asd3",
            project: "Toyota",
            task: "Tarea #1232",
            date: "2024-11-17",
            hours: 4,
        },
        {
            id: "aas34asd3",
            project: "Toyota",
            task: "Tarea #1232",
            date: "2024-11-18",
            hours: 4,
        },
        {
            id: "aas34asd3",
            project: "Toyota",
            task: "Tarea #1232",
            date: "2024-11-25",
            hours: 4,
        }
    ];

    const tasksByDay = {};

    daysOfWeek.forEach((day, index) => {
        tasksByDay[day] = cargas.filter((task) => {
            const fecha = new Date(task.date);
            return fecha.getDay() === index;
        });
    });

    const handleTrashClick = () => {
        if (selectedTask) {
            alert(`¿Estás seguro de que deseas eliminar la tarea con ID ${selectedTask}?`);
        } else {
            alert("No has seleccionado ninguna tarea para eliminar.");
        }
    };

    return (
        <Container className="mt-4">

            <Table bordered hover responsive>
                <thead className="bg-primary text-white">
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <th key={index} className="text-center">{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <td key={index}>
                            { (
                                tasksByDay[day].map((task) => (
                                    <Card key={task.id} className={`mb-3 shadow-sm ${selectedTask === task.id ? 'bg-primary text-white' : ''}`} onClick={() => handleSelected(task.id)} >
                                        <Card.Body>
                                            <Card.Title className="mb-2">{task.project}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{task.task}</Card.Subtitle>
                                            <Card.Text className="mb-0">Horas: {task.hours}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </td>
                    ))}
                </tr>
                </tbody>
            </Table>
            <FaTrash
                            style={{ cursor: 'pointer' }}
                            onClick={handleTrashClick} // El botón de basura ejecuta la función de borrar
                        />
        </Container>
    );
};

export default Calendar;
