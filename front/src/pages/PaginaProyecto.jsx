import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {obtenerCostos, obtenerCargas, obtenerRecursos, obtenerTareas} from "../solicitudes.jsx";

const PaginaProyecto = () => {
    const [costos, setCostos] = useState([]);
    const [meses, setMeses] = useState(null);
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));  // Hace un año
    const location = useLocation();

    const [cargas, setCargas] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const proyecto = location.state ? location.state : null;

    const agruparPorRecurso = (costos, cargas, recursos, meses) => {
        const mesesMap = {
            "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
            "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
        };

        const recursosMap = {};
        recursos.forEach(recurso => {
            recursosMap[recurso.id] = `${recurso.nombre} ${recurso.apellido}`;
        });

        const costosMap = {};
        for (let costoAux of costos) {
            costoAux.forEach(costo => {
                const key = `${costo.role.id}-${costo.month}-${costo.year}`;
                costosMap[key] = costo.incomeByHour;
            });
        }
        const mesesIndices = {};
        meses.forEach((mesAnio, index) => {
            const [mes, anio] = mesAnio.split(' ');
            const mesNumero = mesesMap[mes];
            mesesIndices[`${mesNumero}-${anio}`] = index;
        });



        const resultado = {};

        Object.values(recursosMap).forEach(nombre => {
            resultado[nombre] = Array(meses.length).fill(0);
        });

        cargas.forEach(carga => {
            const recursoId = carga.idResource;
            const rolId = recursos.find((r) => r.id === recursoId).rolId;
            const nombreRecurso = recursosMap[recursoId];
            const fecha = new Date(carga.date);
            const mes = fecha.getMonth() + 1;
            const anio = fecha.getFullYear();

            const indexMes = mesesIndices[`${mes}-${anio}`];
            if (indexMes !== undefined) {
                const key = `${rolId}-${mes}-${anio}`;
                const incomeByHour = costosMap[key];
                if (incomeByHour) {
                    resultado[nombreRecurso][indexMes] += carga.hours * incomeByHour;
                }
            }
        });

        return resultado;
    };

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
                const mes = new Date(year, month).toLocaleString('default', { month: 'long' });
                const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);
                mesesArray.push(`${mesCapitalizado} ${year}`);
            }
        }
        return mesesArray;
    };

    useEffect(() => {
        const mesesCalculados = calcularMeses();
        setMeses(mesesCalculados);
        const f = async () => {
            setLoading(true);
            try {
                const cargas_aux = await obtenerCargas();
                const recursos_aux = await obtenerRecursos();
                const tareas_aux = await obtenerTareas();
                setCargas(cargas_aux);
                setRecursos(recursos_aux);
                setTareas(tareas_aux);
            } catch (e) {
                console.error(e)
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        f();
    }, []);


    useEffect(() => {
        if (tareas.length === 0) {
            return;
        }
        setLoading(true);
        const f = async () => {
            const arrAnios = [];
            arrAnios.push(startDate.getFullYear());
            arrAnios.push(endDate.getFullYear());
            try {
                const costosAux = await obtenerCostos(arrAnios);
                const costosPorRecurso = agruparPorRecurso(costosAux, filtrarPorProyecto(cargas, tareas, proyecto?.id), recursos, meses);
                setCostos(costosPorRecurso);
            } catch (e) {
                console.error(e)
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        f();
    }, [meses, tareas])



    const handleConfirmarNuevaBusqueda = () => {
        if (startDate == null || endDate == null) {
            // Asignar fechas por defecto si alguna es nula
            const defaultStartDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)); // Hace un año
            const defaultEndDate = new Date();

            setStartDate(defaultStartDate);
            setEndDate(defaultEndDate);
        }

        const mesesCalculados = calcularMeses();
        setMeses(mesesCalculados);


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
    <DataGridCostos costos={costos} meses={meses} loading={loading} error={error}/>
</>
);
};

function filtrarPorProyecto(cargas, tareas, idProyecto) {
    return cargas.filter((carga) => tareas.find((tarea) => carga.idTask === tarea.id).proyectoId === idProyecto)
}

export default PaginaProyecto;
