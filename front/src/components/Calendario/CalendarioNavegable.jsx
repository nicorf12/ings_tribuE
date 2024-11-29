import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {Button, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"; // Importa Link de react-router-dom
import "react-datepicker/dist/react-datepicker.css";
import DatePickerExclude from "../DatePicker/DatePickerExclude.jsx";
import {useState} from "react";
import {func} from "prop-types";


// eslint-disable-next-line react/prop-types
const CalendarioNavegable = ( {carga , setFecha, setDeletion} ) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const confirmDelete = async () => {
        setShowModal(false);
        try {
            const response = await fetch(`http://localhost:8080/api/delete/${carga.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Deleted successfully');
                setDeletion(true);
            } else {
                console.error('Error deleting');
            }
        } catch (error) {
            console.error('Error:', error);
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
                <DatePickerExclude setFecha={setFecha} />
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
