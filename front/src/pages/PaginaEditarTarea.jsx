import Navegador from "../components/Navegador/Navegador.jsx";

import {useLocation} from "react-router-dom";
import Carga from "../components/Carga.jsx";

const PaginaEditarTarea =() =>{

    const location = useLocation();
    const carga = location.state || {};
    return(
        <>
            <Navegador />
            <Carga editar={true} carga={carga} />


        </>
    )
}

export default PaginaEditarTarea;