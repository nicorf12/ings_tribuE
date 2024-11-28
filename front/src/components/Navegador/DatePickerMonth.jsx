import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de importar el CSS

const DatePickerMonth = () => {
    const defaultStartDate = new Date("2024-08-01");
    const defaultEndDate = new Date("2024-10-01");
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const handleChange = ([newStartDate, newEndDate]) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
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

    return (
        <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={handleChange}
            excludeDates={generateExcludedDates()}
            dateFormat="MM/yyyy"
            placeholderText="Select a month other than the disabled months"
            showMonthYearPicker
            selectsRange
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        />
    );
};
export default DatePickerMonth;