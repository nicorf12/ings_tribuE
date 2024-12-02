import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import {FaAngleLeft, FaAngleRight, FaPencilAlt} from "react-icons/fa";



const DatePickerExclude = ({ date ,setFecha,excludeDates}) => {


  const [startDate, setStartDate] = useState(new Date());



  useEffect(() => {
    const today = new Date();
    const parsedDate = new Date(date);

    // Solo establece startDate si la fecha es válida y no es futura
    if (!isNaN(parsedDate) && parsedDate <= today) {
      setStartDate(parsedDate);
    }
  }, [date]);


  const excludeDatesFilter = (date) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek - 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date < startOfWeek || date > today || date > endOfWeek;

  };

  // Devuelve true si la fecha es mañana o en adelante
  const isDateExcluded = (date) => {

    if (excludeDates === true){
      return excludeDatesFilter(date);
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate());

      return date >= tomorrow;
    }
  };

  const handleChange = (date) =>{
    setStartDate(date);
    if (date){
      setFecha(date);
    }
  };

  return (
      <DatePicker
          selected={startDate}
          showIcon
          onChange={handleChange}
          filterDate={(date) => !isDateExcluded(date)}

      />
  );
};

export default DatePickerExclude;