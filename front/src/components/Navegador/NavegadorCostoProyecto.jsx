import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import DatePickerYear from "./DatePickerYear.jsx";

const NavegadorCostoProyecto = () => {
    const encabezado = {
        nombre: "Costos de Proyectos",
        descripcion:
            "Seleccione un año para poder visualizar los costos de los proyectos de la empresa desglosado de forma mensual. ",
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
                            <DatePickerYear />
                            <Button className="ms-2 btn-sm">Buscar</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavegadorCostoProyecto;
