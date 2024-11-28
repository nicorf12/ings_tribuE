
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


    let cargas ={}

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


             const url = `https://psa-loadhour.onrender.com/api/hours?initDate=${formatDate(startOfWeek)}&endDate=${formatDate(endOfWeek)}`;
            


            const fetchData = async () => {
                try {
                    console.log(url);
                    let response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                    }


                    cargas = await response.json(); // Espera la respuesta JSON
                    console.log(cargas);


                    // Crear un objeto para almacenar las tareas por día
                    const tasks = {};
                    if(cargas) {
                        daysOfWeek.forEach((day, index) => {
                            const currentDay = new Date(startOfWeek);
                            currentDay.setDate(startOfWeek.getDate() + index);
                            tasks[day] = cargas.filter(task => {
                                const taskDate = new Date(task.date);
                                return taskDate.toDateString() === currentDay.toDateString();
                            });
                        });
                    }
                    setTasksByDay(tasks);
                } catch (error) {
                    console.error('Hubo un problema con la solicitud GET:', error);
                    console.error(error);

                }
            };

            fetchData();
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


