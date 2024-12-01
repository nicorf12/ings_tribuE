import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";
import {FaAngleLeft, FaAngleRight, FaPencilAlt} from "react-icons/fa";



const DatePickerExclude = ({ date ,setFecha,excludeDates}) => {


  const [startDate, setStartDate] = useState(new Date());



  useEffect(() => {
    const today = new Date();
    // Asegúrate de que 'date' sea un objeto Date válido
    const parsedDate = new Date(date);

    // Solo establece startDate si la fecha es válida y no es futura
    if (!isNaN(parsedDate) && parsedDate <= today) {
      setStartDate(parsedDate);
    }
    console.log(excludeDates);
  }, [date]);


  const excludeDatesFilter = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to the previous Sunday

    const endOfWeek = new Date(startOfWeek);

    for(let i = 0; i < 6; i++) {
      if(endOfWeek < today) {
        endOfWeek.setDate(startOfWeek.getDate() + i); // Set to the next Saturday
      }
    }
    return (date) => {
      return date < startOfWeek || date > endOfWeek;
    };
  };

  const isDateExcluded = (date) => {

    if(excludeDates === true){
      return excludeDatesFilter();
    }
    else{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() ); // Establece la fecha de mañana

    // Devuelve true si la fecha es mañana o en adelante
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