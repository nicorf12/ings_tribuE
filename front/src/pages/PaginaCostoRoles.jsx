import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorCostoRoles from "../components/Navegador/NavegadorCostoRoles.jsx";
import DataGridCostosRoles from "../components/Grid/DataGridCostosRoles.jsx";
import {useState} from "react";

const PaginaCostoRoles = () => {
    const [roles, setRoles] = useState([]);
    return (
        <>
            <Navegador/>
            <NavegadorCostoRoles setRoles={setRoles} />
            <DataGridCostosRoles roles={roles} setRoles={setRoles}/>
        </>
    )
}

export default PaginaCostoRoles