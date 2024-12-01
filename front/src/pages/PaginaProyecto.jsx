import Navegador from "../components/Navegador/Navegador.jsx";
import NavegadorProyecto from "../components/Navegador/NavegadorProyecto.jsx";
import DataGridCostos from "../components/Grid/DataGridCostos.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {obtenerCostos, obtenerCargas, obtenerRecursos, obtenerTareas} from "../solicitudes.jsx";

const PaginaProyecto = () => {
    const [costos, setCostos] = useState([]);
    const [proyecto, setProyecto] = useState(null);
    const [meses, setMeses] = useState(null);

    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));  // Hace un año

    const location = useLocation();

    const [cargas, setCargas] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [recursos, setRecursos] = useState([]);

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
        costos.forEach(costo => {
            const key = `${costo.role.id}-${costo.month}-${costo.year}`;
            costosMap[key] = costo.incomeByHour;
        });

        const mesesIndices = {};
        meses.forEach((mesAnio, index) => {
            const [mes, anio] = mesAnio.split(' ');
            const mesNumero = mesesMap[mes];
            mesesIndices[`${mesNumero}-${anio}`] = index;
        });

        console.log(mesesIndices);

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
                console.log(costosMap);
                console.log(key);
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
                mesesArray.push(new Date(year, month).toLocaleString('default', {month: 'long', year: 'numeric'}));
            }

        }
        return mesesArray;
    }

    useEffect(() => {
        let cargas_aux;
        let recursos_aux;
        let tareas_aux;
        const f = async () => {
            cargas_aux = await obtenerCargas();
            recursos_aux = await obtenerRecursos();
            tareas_aux = await obtenerTareas();
            setCargas(cargas_aux)
            setRecursos(recursos_aux)
            setTareas(tareas_aux)
        }
        f();
        const mesesCalculados = calcularMeses()
        setMeses(mesesCalculados);
    }, [])

    useEffect(() => {
        const proyecto_aux = location.state;
        if (proyecto_aux) {
            setProyecto(proyecto_aux);
        }
    }, [location.state]);

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


        console.log(filtrarPorProyecto(cargas,tareas, proyecto.id));
        let costosPorRecurso = agruparPorRecurso(obtenerCostos(),filtrarPorProyecto(cargas,tareas, proyecto.id),recursos,mesesCalculados);
        setCostos(costosPorRecurso);
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

function filtrarPorProyecto(cargas, tareas, idProyecto) {
    return cargas.filter((carga) => tareas.find((tarea) => carga.idTask === tarea.id).proyectoId === idProyecto)
}

export default PaginaProyecto;
