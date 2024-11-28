import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorCostoRoles from "../components/Navegador/NavegadorCostoRoles.jsx";
import DataGridCostosRoles from "../components/Grid/DataGridCostosRoles.jsx";

const PaginaCostoRoles = () =>{
    return (
        <>
            <Navegador/>
            <NavegadorCostoRoles />
            <DataGridCostosRoles />
        </>
    )
}

export default PaginaCostoRoles