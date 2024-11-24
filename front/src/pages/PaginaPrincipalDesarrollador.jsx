import Navegador from "../components/Navegador/Navegador.jsx";

import Calendar from "../components/Calendar.jsx"
import CalendarioNavegable from "../components/Calendario/CalendarioNavegable.jsx";

const PaginaPrincipalDesarrollador = () =>{
    return (
        <>
            <Navegador/>

            <div className="">
                <h2 className="text-center m-3 ">Calendario de Tareas</h2>
                <CalendarioNavegable/>
                <Calendar/>
            </div>
        </>
    )
}

export default PaginaPrincipalDesarrollador