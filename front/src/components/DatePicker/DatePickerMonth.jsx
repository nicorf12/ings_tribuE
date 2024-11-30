import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerMonth = ({ startDate, endDate, setStartDate, setEndDate }) => {
    const [startDateLocal, setStartDateLocal] = useState(startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    const [endDateLocal, setEndDateLocal] = useState(endDate || new Date());

    // Sincronizar los estados locales con las propiedades del padre
    useEffect(() => {
        if (startDate) setStartDateLocal(startDate);
        console.log(startDate);
    }, [startDate]);

    useEffect(() => {
        if (endDate) setEndDateLocal(endDate);
        console.log(endDate);
    }, [endDate]);

    const generateExcludedDates = () => {
        const excludedDates = [];
        const today = new Date();
        const oneYearFromNow = new Date(today);
        oneYearFromNow.setFullYear(today.getFullYear() + 1);

        // Empezamos con el próximo mes
        const startMonth = new Date(today);
        startMonth.setMonth(today.getMonth() + 1);

        for (let d = new Date(startMonth); d <= oneYearFromNow; d.setMonth(d.getMonth() + 1)) {
            excludedDates.push(new Date(d));
        }

        return excludedDates;
    };

    const handleChange = ([newStartDate, newEndDate]) => {
        setStartDateLocal(newStartDate);
        setEndDateLocal(newEndDate);

        // Notificar al padre
        console.log("New start date" ,newStartDate);
        console.log(newEndDate);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    const filterDate = (date) => {
        if (!startDateLocal) return true; // Si no hay fecha de inicio, permitir cualquier fecha
        const maxEndDate = new Date(startDateLocal);
        maxEndDate.setMonth(startDateLocal.getMonth() + 12); // Sumar 12 meses al inicio
        return date <= maxEndDate;
    };

    return (
        <DatePicker
            selected={startDateLocal}
            startDate={startDateLocal}
            endDate={endDateLocal}
            onChange={handleChange}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            dateFormat="MM/yyyy"
            excludeDates={generateExcludedDates()}
            showMonthYearPicker
            selectsRange
            filterDate={filterDate}
        />
    );
};

export default DatePickerMonth;
