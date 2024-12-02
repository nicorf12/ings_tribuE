import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useEffect, useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import DataGridProyectos from "./Grid/DataGridProyectos.jsx";
import {useNavigate} from "react-router-dom";
import {obtenerProyectos} from "../solicitudes.jsx";

const Proyectos = () => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const navigate = useNavigate();


    // Fetchea los proyectos al inicializar
    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                let projects_aux = await obtenerProyectos();
                setProjects(projects_aux);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/lider/proyecto", {state: project})
    };


    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
                <Form onSubmit={handleSubmit} className="d-flex w-100 align-items-center">
                    <Form.Group className="mb-0 w-100">
                        <Autocomplete
                            options={projects}
                            value={project}
                            onChange={(event, newValue) => {
                                setProject(newValue);
                            }}
                            getOptionLabel={(option) => option.nombre}
                            renderInput={(params) => <TextField {...params} label="Seleccione un proyecto" />}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg" className="ms-3" style={{ flexShrink: 0 }}>
                        Confirmar
                    </Button>
                </Form>
                <Modal show={showModal} onHide={cancelDelete} >
                    <Modal.Header >
                        <Modal.Title>Alerta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        No has seleccionado ningun proyecto.
                    </Modal.Body>
                    <Modal.Footer onHide={cancelDelete}>
                        <Button variant="secondary" onClick={cancelDelete} >
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <DataGridProyectos proyectos={projects} loading={loading} error={error}/>
        </Container>
    );
};

export default Proyectos;
