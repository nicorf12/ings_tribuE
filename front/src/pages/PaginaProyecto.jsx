import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";
import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import {  obtenerProyectos, obtenerCostos } from "../solicitudes.jsx";

// Función para calcular los meses entre dos fechas
function calcularMeses(start, end) {
    const mesesArray = [];
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();

    for (let year = startYear; year <= endYear; year++) {
        const startM = year === startYear ? startMonth : 0;
        const endM = year === endYear ? endMonth : 11;

        for (let month = startM; month <= endM; month++) {
            mesesArray.push(new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }));
        }
    }

    return mesesArray;
};

const PaginaProyecto = ({ proyecto_elegido }) => {
    const [costos, setCostos] = useState(null);
    const [proyecto, setProyecto] = useState(null);
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(endDate));
    const [endDatePick, setEndDatePick] = useState(new Date());
    const [startDatePick, setStartDatePick] = useState(new Date(endDate));
    const [meses, setMeses] = useState(null);

    const location = useLocation();

    // Establecer proyecto solo una vez o cuando cambie `location.state`
    useEffect(() => {
        const proyecto_aux = location.state;
        if (proyecto_aux) {
            setProyecto(proyecto_aux);
        }
    }, [location.state]);

    const handleConfirmarNuevaBusqueda = () => {
        console.log("FECHA CAMBIADA");

        setEndDate(endDatePick);

        const newStartDate = new Date();
        newStartDate.setFullYear(newEndDate.getFullYear() - 1);
        setStartDate(newStartDate);

        const mesesCalculados = calcularMeses(newStartDate, newEndDate);
        setMeses(mesesCalculados);

        // Simulación de costos
        setCostos({
            'Febrero 2024': 100,
            'Marzo 2024': 200,
            'Julio 2024': 300,
            'Junio 2024': 400,
        });
    }


    return (
        <>
            <Navegador />
            <NavegadorProyecto proyecto={proyecto} handle={handleConfirmarNuevaBusqueda} startDate={startDate} endDate={endDate} />
            <DataGridCostos costos={costos} meses={meses} />
        </>
    );
};

export default PaginaProyecto;