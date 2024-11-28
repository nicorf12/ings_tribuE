import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";
import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import {  obtenerProyectos, obtenerCostos } from "../solicitudes.jsx";

function getProyecto(proyectoId) {

    const proyectos = obtenerProyectos();

    /*
    for (let i = 0; i < proyectos.length; i++) {
        if (proyectos[i].id === proyectoId) {
            return proyectos[i];
        }
    }
    */
    return proyectos.find(proyecto => proyecto.id === proyectoId);
}

const PaginaProyecto = () => {
    const [costos, setCostos] = useState(null);
    const [proyecto, setProyecto] = useState(null);
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(endDate));

    const [meses, setMeses] = useState(null);



    // Función para calcular los meses entre dos fechas
    const calcularMeses = (start, end) => {
        const mesesArray = [];
        const startYear = start.getFullYear();
        console.log(startYear);
        const endYear = end.getFullYear() ;
        console.log(endYear);
        const startMonth = start.getMonth();
        console.log(startMonth);
        const endMonth = end.getMonth();
        console.log(endMonth);

        for (let year = startYear; year <= endYear; year++) {
            const startM = year === startYear ? startMonth : 0;
            const endM = year === endYear ? endMonth : 11;

            for (let month = startM; month <= endM; month++) {
                mesesArray.push(new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }));
            }
        }

        return mesesArray;
    };

    const location = useLocation();
    const proyectoId = location.state;
    //setProyecto(getProyecto(proyectoId));

    useEffect(() => {
        // Establecer el proyecto y los costos solo una vez al montar el componente

        const costos_aux = obtenerCostos();

        setCostos({
            'Febrero 2024': 100,
            'Marzo 2024': 200,
            'Julio': 300,
            'Junio': 400
        });


        const newEndDate = new Date();
       setEndDate(newEndDate);
       const newStartDate = new Date();
       newStartDate.setFullYear(newEndDate.getFullYear() - 1);
       setStartDate(newStartDate);



       //nesecito agarrar los meses entre fecha y fecha
        const mesesCalculados = calcularMeses(startDate, endDate);
        setMeses(mesesCalculados);

    }, [ endDate]); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    return (
        <>
            <Navegador />
            <NavegadorProyecto proyecto={proyecto} startDate={startDate} endDate={endDate} />
            <DataGridCostos costos={costos} meses={meses} />
        </>
    );
}

export default PaginaProyecto;