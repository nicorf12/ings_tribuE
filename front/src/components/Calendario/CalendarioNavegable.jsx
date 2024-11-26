import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {Button, Modal} from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import "react-datepicker/dist/react-datepicker.css";
import DatePickerExclude from "../DatePicker/DatePickerExclude.jsx";
import {useState} from "react";


// eslint-disable-next-line react/prop-types
const CalendarioNavegable = ( {carga} ) => {
    const [showModal, setShowModal] = useState(false);
    const confirmDelete = () => {
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const handleTrashClick = () => {
        setShowModal(true);
    };
    function handleCargarHoras() {
        // eslint-disable-next-line react/prop-types
        console.log(carga.id);
    }

    let modal = null;
    if (showModal) {
        if (carga) {
            modal = <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar la tarea con ID {carga.id}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        }
        else{
            modal = <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header >
                    <Modal.Title>Alerta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    No has seleccionado ninguna tarea.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        }

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
                        <Link>
                        <FaTrash className="me-4"
                            style={{ cursor: 'pointer' }}
                            onClick={handleTrashClick}
                        />
                        {modal}
                            </Link>

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
