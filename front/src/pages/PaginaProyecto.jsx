import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";




const PaginaProyecto = () =>{
    return (
        <>
            <Navegador/>
            <NavegadorProyecto />
            <DataGridCostos />

        </>
    )
}

export default PaginaProyecto