import Navegador from "../components/Navegador/Navegador.jsx";

import {useLocation} from "react-router-dom";
import Carga from "../components/Carga.jsx";
import Snackbar from "@mui/material/Snackbar";
import {Box} from "@mui/material";
import {useState} from "react";

const PaginaEditarTarea =() =>{
    const location = useLocation();
    const carga = location.state || {};

    return(
        <>
            <Navegador />
            <Carga editar={true} carga={carga}/>

        </>
    )
}

export default PaginaEditarTarea;