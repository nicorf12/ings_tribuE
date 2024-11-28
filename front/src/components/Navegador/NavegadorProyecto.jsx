import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import DatePickerMonth from "../DatePicker/DatePickerMonth.jsx";

const NavegadorProyecto = ({ proyecto, handle, startDatePick,endDatePick,setStartDatePick,setEndDatePick }) => {
    return (
        <Navbar>
            <Container>
                <Navbar.Toggle />
                <div className="mt-2">
                    {proyecto ? (
                        <>
                            <h3>{proyecto.nombre}</h3>
                            <p>{proyecto.descripcion}</p>
                        </>
                    ) : (
                        <p>Cargando proyecto...</p>
                    )}
                </div>
                <Navbar.Collapse className="ms-4 justify-content-end">
                    <Navbar.Text className="d-flex align-items-center">
                        <DatePickerMonth startDate={startDatePick} endDate={endDatePick} setStartDate={setStartDatePick} setEndDate={setEndDatePick} />
                        <Button className="ms-2 btn-sm" onClick={handle}>Buscar</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavegadorProyecto;