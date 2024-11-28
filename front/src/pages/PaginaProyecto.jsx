import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";
import {useState} from "react";




const PaginaProyecto = () =>{
    const [costos,  setCostos] = useState(null);
    const [proyecto,  setProyecto] = useState(null);


    setProyecto({
        nombre: "Sistema de Gestión de Inventarios",
        descripcion:
            "Un sistema para llevar el control de los productos en un almacén, incluyendo funciones para agregar, actualizar y eliminar productos, gestionar niveles de stock, y generar reportes de inventario. Suele incluir integración con otras áreas, como ventas y compras, y permite la optimización de recursos.",
    });

    setCostos({
        'Febrero 2024': 100,
        'Marzo 2024' : 200,
        'Julio' : 300,
        'Junio' : 400
    });



    return (
        <>
            <Navegador/>
            <NavegadorProyecto proyecto={proyecto}/>
            <DataGridCostos costos={costos}/>
        </>
    )
}

export default PaginaProyecto