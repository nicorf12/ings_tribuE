import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import "react-datepicker/dist/react-datepicker.css";

const CalendarioNavegable = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Navbar>
            <Container>
                <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="d-flex align-items-center">
                        <a href={""} >
                            <FaPencilAlt className="me-4" />
                        </a>
                        <a href={""}>
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
