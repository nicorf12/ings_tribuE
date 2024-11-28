import Navegador from "../components/Navegador/Navegador.jsx";

import Calendar from "../components/Calendario/Calendar.jsx"
import CalendarioNavegable from "../components/Calendario/CalendarioNavegable.jsx";
import {useState} from "react";


const PaginaPrincipalDesarrollador = () => {
    const [ carga, setCarga] = useState(null);
    const [fecha, setFecha] = useState(null);

    return (
        <>
            <Navegador/>
            <div className="">
                <h2 className="text-center m-3 ">Calendario de Tareas</h2>
                <CalendarioNavegable carga={carga} setFecha={setFecha} />
                <Calendar setCarga={setCarga} fecha={fecha} setFecha = {setFecha} />
            </div>
        </>
    )
}

export default PaginaPrincipalDesarrollador