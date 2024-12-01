import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorCostoProyecto from "../components/Navegador/NavegadorCostoProyecto.jsx";
import DataGridCostosProyectos from "../components/Grid/DataGridCostosProyectos.jsx";
import {useState} from "react";

const PaginaCostoProyectos = () => {
    const [projects, setProjects] = useState([]);
    return (
        <>
            <Navegador/>
            <NavegadorCostoProyecto setProjects={setProjects} />
            <DataGridCostosProyectos projects={projects} />
        </>
    )
}

export default PaginaCostoProyectos