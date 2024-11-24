import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import {Button, Container, Form} from "react-bootstrap";

const Proyectos = () => {
    const [projects, setProjects] = useState([]); // Para almacenar los proyectos
    const [project, setProject] = useState(null); // Para almacenar el proyecto seleccionado

    setProjects([
        {
            id: "a6e2167f-67a1-4f60-b9e9-6bae7bc3a15",
            nombre: "Sistema de Gestión de Inventarios",
            descripcion: "Un sistema para llevar el control de los productos en un almacén, incluyendo funciones para agregar, actualizar y eliminar productos, gestionar niveles de stock, y generar reportes de inventario. Suele incluir integración con otras áreas, como ventas y compras, y permite la optimización de recursos."
        },
        {
            id: "1635b4ca-c091-472c-8b5a-cb3086d197b",
            nombre: "Aplicación de Comercio Electrónico (E-commerce)",
            descripcion: "Plataforma que permite a los usuarios comprar productos o servicios en línea. Incluye un catálogo de productos, un carrito de compras, métodos de pago seguros, y funciones de administración de pedidos y usuarios. A menudo, se desarrolla tanto la interfaz de usuario como el panel de administración."
        },
        {
            id: "0d4e3470-4dc8-4fda-a08f-bb822cb9fc7f",
            nombre: "Sistema de Gestión de Proyectos",
            descripcion: "Herramienta para planificar, asignar, y hacer seguimiento a tareas dentro de proyectos. Incluye funcionalidades como la creación de proyectos, asignación de tareas a miembros del equipo, control de tiempos, gestión de recursos, y generación de reportes de progreso."
        }
    ]);

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Proyecto</Form.Label>
                    <Autocomplete
                        options={projects}
                        value={project}
                        onChange={(event, newValue) => {
                            setProject(newValue); // Actualiza el proyecto seleccionado
                        }}
                        getOptionLabel={(option) => option.nombre} // Muestra el nombre del proyecto
                        renderInput={(params) => <TextField {...params} label="Seleccione un proyecto" />}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Confirmar
                </Button>
            </Form>
        </Container>
    );
};

export default Proyectos;
