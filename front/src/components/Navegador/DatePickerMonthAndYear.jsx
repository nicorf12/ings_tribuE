import {useState} from "react";
import DatePicker from "react-datepicker";

const DatePickerMonthAndYear = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        const fullYear = new Date(day).getFullYear();
        const tooltipText = `Fecha: ${longMonth} ${fullYear}`;

        return <span title={tooltipText}>{shortMonth}</span>;
    };

    return (
        <DatePicker
            selected={selectedDate}
            renderMonthContent={renderMonthContent}
            onChange={handleChange}
            dateFormat="MM/yyyy"
            placeholderText="Seleciona un mes y un año"
            showMonthYearPicker
            maxDate={new Date()}
        />
    );
};

export default DatePickerMonthAndYear;