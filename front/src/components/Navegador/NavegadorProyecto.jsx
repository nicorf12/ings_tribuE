import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

import {Button} from "react-bootstrap";

import DatePickerMonth from "./DatePickerMonth.jsx";

const NavegadorProyecto = () =>{

    const proyecto = {
        "nombre" : "hola",
        "apellido" : "adfasdfasdf",
    };
    return (
        <>
            <Navbar >
                <Container>
                    <Navbar.Toggle />
                    <div className="mt-2">
                        <h3>{proyecto.nombre}</h3>
                        <p>{proyecto.apellido}</p>
                    </div>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="d-flex align-items-center" >
                            <DatePickerMonth  />
                            <Button >Buscar</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavegadorProyecto;