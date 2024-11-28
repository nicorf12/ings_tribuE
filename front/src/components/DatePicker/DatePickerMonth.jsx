import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de importar el CSS

const DatePickerMonth = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date().setFullYear(new Date().getFullYear() - 1));



    // Generar un array de fechas excluidas
    const generateExcludedDates = () => {
        const excludedDates = [];
        const today = new Date();
        const oneYearFromNow = new Date(today);
        oneYearFromNow.setFullYear(today.getFullYear() + 1);

        // Agregar todas las fechas excluidas (puedes personalizar esto)
        for (let d = new Date(today); d <= oneYearFromNow; d.setMonth(d.getMonth() + 1)) {
            excludedDates.push(new Date(d));
        }

        return excludedDates;
    };


    const handleChange = ([newStartDate, newEndDate]) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    return (
        <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={handleChange}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // Fecha máxima
            dateFormat="MM/yyyy"
            excludeDates={generateExcludedDates()}
            showMonthYearPicker
            selectsRange
        />
    );
}
export default DatePickerMonth;