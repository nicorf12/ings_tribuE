import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import {FaAngleLeft, FaAngleRight, FaPencilAlt} from "react-icons/fa";

const DatePickerWeek = ({ date ,setFecha}) => {
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const today = new Date();
        const parsedDate = new Date(date);

        if (!isNaN(parsedDate) && parsedDate <= today) {
            setStartDate(parsedDate);
        }
    }, [date]);

    // Devuelve true si la fecha es mañana o en adelante
    const isDateExcluded = (date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() );

        return date >= tomorrow;
    };

    const handleChange = (date) =>{
        setStartDate(date);
        if (date){
            setFecha(date);
        }
    };

    const prevWeek = () => {
        let newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() - 7)
        if (isDateExcluded(newDate)) {
            return;
        }
        setStartDate(newDate);
        setFecha(newDate);
    }

    const nextWeek = () => {
        let newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + 7)
        if (isDateExcluded(newDate)) {
            return;
        }
        setStartDate(newDate);
        setFecha(newDate);
    }
    return (
        <>
            <FaAngleLeft
                style={{ cursor: 'pointer' }}
                onClick={prevWeek}
            />
            <DatePicker
                selected={startDate}
                showIcon
                onChange={handleChange}
                filterDate={(date) => !isDateExcluded(date)}
                excludeDates={[]}
                placeholderText="Select a date other than tomorrow or a future date"
            />
            <FaAngleRight
                style={{ cursor: 'pointer' }}
                onClick={nextWeek}
            />
        </>
    );
};

export default DatePickerWeek;

