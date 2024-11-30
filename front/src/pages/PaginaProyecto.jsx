import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { obtenerProyectos, obtenerCostos } from "../solicitudes.jsx";

// Función para calcular los meses entre dos fechas
const PaginaProyecto = () => {
    const [costos, setCostos] = useState(null);
    const [proyecto, setProyecto] = useState(null);
    const [meses, setMeses] = useState(null);

    // Inicialización con fechas por defecto (1 año atrás y fecha actual)
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));  // Hace un año

    const location = useLocation();


    const calcularMeses = () => {
        const mesesArray = [];
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();

        for (let year = startYear; year <= endYear; year++) {
            const startM = year === startYear ? startMonth : 0;
            const endM = year === endYear ? endMonth : 11;

            for (let month = startM; month <= endM; month++) {
                mesesArray.push(new Date(year, month).toLocaleString('default', {month: 'long', year: 'numeric'}));
            }

        }
        return mesesArray;
    }
    // Establecer proyecto solo una vez o cuando cambie `location.state`
    useEffect(() => {
        const proyecto_aux = location.state;
        if (proyecto_aux) {
            setProyecto(proyecto_aux);
        }
        const mesesCalculados = calcularMeses()
        setMeses(mesesCalculados);

    }, [location.state]);

    // Función para calcular los meses entre startDate y endDate



    const handleConfirmarNuevaBusqueda = () => {
        console.log("FECHA CAMBIADA");

        console.log("Nuevas fechas confirmadas:");
        console.log("Fecha de inicio:", startDate);
        console.log("Fecha de fin:", endDate);

        // Verificar si las fechas son nulas o no definidas
        if (startDate == null || endDate == null) {
            // Asignar fechas por defecto si alguna es nula
            const defaultStartDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); // Hace un año
            const defaultEndDate = new Date(); // Fecha actual

            setStartDate(defaultStartDate);
            setEndDate(defaultEndDate);
        }

        const mesesCalculados = calcularMeses();
        setMeses(mesesCalculados);
        console.log("Meses calculados", mesesCalculados);

        // Simulación de costos
        setCostos({
            'Febrero 2024': 100,
            'Marzo 2024': 200,
            'Julio 2024': 300,
            'Junio 2024': 400,
        });
    };

    return (
        <>
            <Navegador />
            <NavegadorProyecto
                proyecto={proyecto}
                handle={handleConfirmarNuevaBusqueda}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <DataGridCostos costos={costos} meses={meses} />
        </>
    );
};

export default PaginaProyecto;
