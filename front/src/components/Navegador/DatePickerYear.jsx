import DatePicker from "react-datepicker";

const DatePickerYear = ({ selectedDate, setSelectedDate }) => {

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
            placeholderText="Seleccione un año"
            maxDate={new Date()}
        />
    );
};

export default DatePickerYear;