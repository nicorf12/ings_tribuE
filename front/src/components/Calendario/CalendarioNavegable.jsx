import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import "react-datepicker/dist/react-datepicker.css";
import DatePickerExclude from "../DatePicker/DatePickerExclude.jsx";

// eslint-disable-next-line react/prop-types
const CalendarioNavegable = ( {carga} ) => {


    function handleCargarHoras() {
        // eslint-disable-next-line react/prop-types
        console.log(carga.id);
    }
    
    return (
        <Navbar>
            <Container>
                <DatePickerExclude />
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="d-flex align-items-center">
                        <Link to="/dev/editar" state={carga} onClick={handleCargarHoras}>
                        <FaPencilAlt className="me-4" />
                        </Link>
                        <a >
                            <FaTrash className="me-4" />
                        </a>
                        <Link to="/dev/carga-horas">
                            <Button>Cargar horas</Button>
                        </Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CalendarioNavegable;
