import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


import {useState} from "react";
import DatePickerWeek from "../DatePicker/DatePickerWeek.jsx";
import {eliminarCarga} from "../../solicitudes.jsx";



const CalendarioNavegable = ( {carga , setFecha, setDeletion, setError, setLoading} ) => {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const confirmDelete = async () => {
        setShowModal(false);
        setLoading(true);
        try {
            await eliminarCarga(carga)
            setDeletion(carga.id)
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }

    };

    const cancelUpdate = () => {
        setShowUpdateModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const handleTrashClick = () => {
        setShowModal(true);
    };

    function handleCargarHoras(e) {
        if (carga == null) {
            e.preventDefault();
            e.stopPropagation();
            setShowUpdateModal(true);
        }
    }

    let modal = null;
    let modalUpdate = null;

    if (showUpdateModal) {
        modalUpdate = <Modal show={showUpdateModal} onHide={cancelUpdate}>
            <Modal.Header>
                <Modal.Title>Alerta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                No has seleccionado ninguna tarea.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelUpdate}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    }

    // Crea el modal que corresponde cuando el usuario clickea la opcion de borrar
    if (showModal) {
        if (carga) {
            modal = <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar la carga de {carga.hours} horas en la tarea "{carga.task}"?
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
        } else{
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
                <DatePickerWeek setFecha={setFecha} />
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="d-flex align-items-center">
                        <Link to={"/dev/editar"} state={carga} onClick={handleCargarHoras}>
                        <FaPencilAlt className="me-4"
                                     style={{ cursor: 'pointer' }}
                        />
                        </Link>
                        {modalUpdate}
                        <Link>
                        <FaTrash className="me-4"
                                 style={{ cursor: 'pointer' }}
                                 onClick={handleTrashClick}
                        />
                        </Link>
                        {modal}

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
