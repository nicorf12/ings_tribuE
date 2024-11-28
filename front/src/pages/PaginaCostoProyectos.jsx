import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorCostoProyecto from "../components/Navegador/NavegadorCostoProyecto.jsx";
import DataGridCostosProyectos from "../components/Grid/DataGridCostosProyectos.jsx";

const PaginaCostoProyectos = () =>{
    return (
        <>
            <Navegador/>
            <NavegadorCostoProyecto />
            <DataGridCostosProyectos />
        </>
    )
}

export default PaginaCostoProyectos