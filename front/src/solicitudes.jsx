export function obtenerTareas() {
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

export function obtenerProyectos() {
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

/*
export function obtenerCargas() {
    return [
        { id:'1', idResource: "1", idProject: "Ford", idTask: "f635b4ca-c091-472c-8b5a-cb3086d1973", date: "2024-11-20", hours: 2 },
        { id:'2', idResource: "2", idProject: "CRM v3.0", idTask: "1635b4ca-c091-472c-8b5a-cb3086d1973", date: "2024-11-21", hours: 4 },
    ]
}
*/



export async function obtenerCargas() {
    const url = `http://localhost:8080/api/loadhour`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener cargas:", error);
        throw error;
    }
}



export function obtenerCostos() {
    return  [
        {
            "id":1,
            "role":{
                "id":"3e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Semi-Senior"
            },
            "incomeByHour":50.00,
            "month":2,
            "year":2024
        },
        {
            "id":2,
            "role":{
                "id":"4e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":1,
            "year":2024
        },
        {
            "id":3,
            "role":{
                "id":"4e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":4,
            "year":2024
        },
        {
            "id":3,
            "role":{
                "id":"4e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":3,
            "year":2024
        }
        ]
}