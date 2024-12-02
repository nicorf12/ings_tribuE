import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerMonth = ({ startDate, endDate, setStartDate, setEndDate }) => {
    const [startDateLocal, setStartDateLocal] = useState(startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    const [endDateLocal, setEndDateLocal] = useState(endDate || new Date());

    useEffect(() => {
        if (startDate) setStartDateLocal(startDate);
    }, [startDate]);

    useEffect(() => {
        if (endDate) setEndDateLocal(endDate);
    }, [endDate]);


    const handleChange = ([newStartDate, newEndDate]) => {
        setStartDateLocal(newStartDate);
        setEndDateLocal(newEndDate);

        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    const filterDate = (date) => {
        if (!startDateLocal) return true;

        const maxEndDate = new Date(startDateLocal);
        maxEndDate.setMonth(startDateLocal.getMonth() + 12);

        const today = new Date();
        today.setDate(1);

        if (date > today) return false;

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
            showMonthYearPicker
            selectsRange
            filterDate={filterDate}
        />
    );
};

export default DatePickerMonth;