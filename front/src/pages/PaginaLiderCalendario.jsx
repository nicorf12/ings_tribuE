import Navegador from "../components/Navegador/Navegador.jsx";

import Calendar from "../components/Calendario/Calendar.jsx"
import CalendarioNavegableLider from "../components/Calendario/CalendarioNavegableLider.jsx";
import {useEffect, useState} from "react";
import {obtenerCargasDeRecurso,  obtenerRecursos} from "../solicitudes.jsx";

const PaginaLiderCalendario = () => {
    const [recurso, setRecurso] = useState(null);
    const [recursos, setRecursos] = useState([]);
    const [fecha, setFecha] = useState(new Date());



    useEffect(() => {
        const f = async () => {
            const recursos_aux = await obtenerRecursos();
            setRecursos(recursos_aux);
        }
        f();
    }, []);


    return (
        <>
            <Navegador/>
            <h2 className="text-center m-3 ">Calendario de Tareas</h2>
            <CalendarioNavegableLider setFecha={setFecha} recurso={recurso} setRecurso={setRecurso} recursos={recursos}/>
            <Calendar fecha={fecha} setFecha={setFecha} recurso={recurso}/>
        </>
    )
}

export default PaginaLiderCalendario