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


  const excludeDatesFilter = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const endOfWeek = new Date(startOfWeek);

    for(let i = 0; i < 6; i++) {
      if(endOfWeek < today) {
        endOfWeek.setDate(startOfWeek.getDate() + i);
      }
    }
    return (date) => {
      return date < startOfWeek || date > endOfWeek;
    };
  };

  // Devuelve true si la fecha es mañana o en adelante
  const isDateExcluded = (date) => {

    if(excludeDates === true){
      return excludeDatesFilter();
    }
    else{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() );

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