import DatePicker from "react-datepicker";
import {useState} from "react";

const DatePickerYear = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderYearContent = (year) => {
        const tooltipText = `Año: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };

    const handleChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <DatePicker
            selected={selectedDate}
            renderYearContent={renderYearContent}
            showYearPicker
            dateFormat="yyyy"
            onChange={handleChange}
            placeholderText="Selccione el año que desea visualizar"
            maxDate={new Date()}
            //showIcon
        />
    );
};

export default DatePickerYear;