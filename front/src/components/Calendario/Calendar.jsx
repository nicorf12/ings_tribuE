import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "../../../index.css";

function obtenerTareas() {
    return [
        {
            "id": "f635b4ca-c091-472c-8b5a-cb3086d1973",
            "nombre": "Diseño de la Base de Datos",
            "descripcion": "Definir la estructura de la base de datos para almacenar la información de los proyectos, usuarios, y otros elementos relacionados. Esto incluye la creación de tablas, relaciones, restricciones, índices y claves foráneas para asegurar la integridad y eficiencia del sistema",
            "recursoId": "ff14a491-e26d-4092-86ea-d76f20c165d1",
            "proyectoId": "a6e2167f-67a1-4f60-b9e9-6bae7bc3a15"
        },
        {
            "id": "1635b4ca-c091-472c-8b5a-cb3086d1973",
            "nombre": "Definición de la API RESTful",
            "descripcion": "Crear los endpoints para la API que gestionará las solicitudes de alta, baja y modificación de proyectos. Cada endpoint debe definir claramente los métodos HTTP (GET, POST, PUT, DELETE) que permitirá, además de los parámetros necesarios para cada operación.",
            "recursoId": "ff14a491-e26d-4092-86ea-d76f20c165d1",
            "proyectoId": "a6e2167f-67a1-4f60-b9e9-6bae7bc3a15"
        },
        {
            "id": "d635b4ca-c091-472c-8b5a-cb3086d1973",
            "nombre": "Implementación de la Lógica de Negocio",
            "descripcion": "Programar la lógica que permita procesar las operaciones del sistema según las reglas de negocio. Por ejemplo, asegurarse de que ciertos campos del proyecto sean únicos o validar que el usuario tenga permisos adecuados para modificar o eliminar un proyecto.",
            "recursoId": "2e6ecd47-fa18-490e-b25a-c9101a398b6d",
            "proyectoId": "a6e2167f-67a1-4f60-b9e9-6bae7bc3a15"
        },
        {
            "id": "b635b4ca-c091-472c-8b5a-cb3086d1973",
            "nombre": "Interfaz de Usuario (UI) para el CRUD de Proyectos",
            "descripcion": "Desarrollar las pantallas en el frontend que permitan a los usuarios ver, crear, editar y eliminar proyectos. Esto incluye formularios, listas de proyectos, y botones de acción para cada operación.",
            "recursoId": "2e6ecd47-fa18-490e-b25a-c9101a398b6d",
            "proyectoId": "a6e2167f-67a1-4f60-b9e9-6bae7bc3a15"
        },
        {
            "id": "a635b4ca-c091-472c-8b5a-cb3086d1973",
            "nombre": "Gestión de Autenticación y Autorización",
            "descripcion": "Implementar un sistema de autenticación para que solo usuarios registrados puedan acceder a las funciones del sistema. Además, gestionar los permisos y roles para garantizar que los usuarios solo puedan acceder a los proyectos y funcionalidades a los que están autorizados.",
            "recursoId": "2e6ecd47-fa18-490e-b25a-c9101a398b6d",
            "proyectoId": "0d4e3470-4dc8-4fda-a08f-bb822cb9fc7f"
        }
    ];
}

function obtenerProyectos() {
    return [
        {
            "id": "a6e2167f-67a1-4f60-b9e9-6bae7bc3a15",
            "nombre": "Sistema de Gestión de Inventarios",
            "descripcion": "Un sistema para llevar el control de los productos en un almacén, incluyendo funciones para agregar, actualizar y eliminar productos, gestionar niveles de stock, y generar reportes de inventario. Suele incluir integración con otras áreas, como ventas y compras, y permite la optimización de recursos."
        },
        {
            "id": "1635b4ca-c091-472c-8b5a-cb3086d197b",
            "nombre": "Aplicación de Comercio Electrónico (E-commerce)",
            "descripcion": "Plataforma que permite a los usuarios comprar productos o servicios en línea. Incluye un catálogo de productos, un carrito de compras, métodos de pago seguros, y funciones de administración de pedidos y usuarios. A menudo, se desarrolla tanto la interfaz de usuario como el panel de administración."
        },
        {
            "id": "0d4e3470-4dc8-4fda-a08f-bb822cb9fc7f",
            "nombre": "Sistema de Gestión de Proyectos",
            "descripcion": "Herramienta para planificar, asignar, y hacer seguimiento a tareas dentro de proyectos. Incluye funcionalidades como la creación de proyectos, asignación de tareas a miembros del equipo, control de tiempos, gestión de recursos, y generación de reportes de progreso."
        }
    ];
}

// eslint-disable-next-line react/prop-types
const Calendar = ({ setCarga, fecha, setFecha }) => {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasksByDay, setTasksByDay] = useState({});
    const [projects, setProjects] = useState([]);
    const [tareas, setTareas] = useState([]);

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

            const url = `https://psa-loadhour.onrender.com/api/hours?initDate=${formatDate(startOfWeek)}&endDate=${formatDate(endOfWeek)}`;

            const fetchData = async () => {
                try {
                    let response = await fetch(url, {
                        headers:{Accept:"*/*"}
                });
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status}`);
                    }

                    const cargas = await response.json();
                    console.log(cargas);

                    // Conectar cargas con tareas y proyectos
                    const updatedCargas = cargas.map(carga => {
                        const tarea = tareas.find(t => t.id === carga.idTask);
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
                } catch (error) {
                    console.error('Hubo un problema con la solicitud GET:', error);
                }
            };

            fetchData();
        }
    }, [fecha, tareas, projects]);

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