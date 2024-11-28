import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {Button} from "react-bootstrap";
import DatePickerMonthAndYear from "./DatePickerMonthAndYear.jsx";

const NavegadorCostoRoles = () => {
    const encabezado = {
        nombre: "Costos de Roles",
        descripcion:
            "Seleccione un año y un mes para poder visualizar los costos por hora de cada rol ",
    };

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Toggle />
                    <div className="mt-2">
                        <h3>{encabezado.nombre}</h3>
                        <p>{encabezado.descripcion}</p>
                    </div>
                    <Navbar.Collapse className="ms-4 justify-content-end">
                        <Navbar.Text className="d-flex align-items-center">
                            <DatePickerMonthAndYear />
                            <Button className="ms-2 btn-sm">Buscar</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavegadorCostoRoles;
