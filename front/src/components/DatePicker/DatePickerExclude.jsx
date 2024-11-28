import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from "react";

const DatePickerExclude = ({ date }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    // Asegúrate de que 'date' sea un objeto Date válido
    const parsedDate = new Date(date);

    // Solo establece startDate si la fecha es válida y no es futura
    if (!isNaN(parsedDate) && parsedDate <= today) {
      setStartDate(parsedDate);
    }
  }, [date]);

  const isDateExcluded = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() ); // Establece la fecha de mañana

    // Devuelve true si la fecha es mañana o en adelante
    return date >= tomorrow;
  };

  return (
      <DatePicker
          selected={startDate}
          showIcon
          onChange={(date) => setStartDate(date)}
          filterDate={(date) => !isDateExcluded(date)} // Filtrar las fechas
          excludeDates={[]} // Aquí puedes agregar fechas específicas para excluir
          placeholderText="Select a date other than tomorrow or a future date"
      />
  );
};

export default DatePickerExclude;