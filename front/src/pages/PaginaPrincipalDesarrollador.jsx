import Navegador from "../components/Navegador/Navegador.jsx";

import Calendar from "../components/Calendario/Calendar.jsx"
import CalendarioNavegable from "../components/Calendario/CalendarioNavegable.jsx";
import {useEffect, useState} from "react";
import seedrandom from 'seedrandom';

const PaginaPrincipalDesarrollador = () => {
    const [carga, setCarga] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [deletion, setDeletion] = useState(false);
    useEffect(() => {
        if (deletion) {
            window.location.reload();
        }
    }, [deletion])
    return (
        <>
            <Navegador/>
            <div className="">
                <h2 className="text-center m-3 ">Calendario de Tareas</h2>
                <CalendarioNavegable carga={carga} setFecha={setFecha}  setDeletion = {setDeletion} />
                <Calendar setCarga={setCarga} fecha={fecha} setFecha = {setFecha} />
            </div>
        </>
    )
}

export default PaginaPrincipalDesarrollador