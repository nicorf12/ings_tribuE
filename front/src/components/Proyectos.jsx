import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useEffect, useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import DataGridProyectos from "./Grid/DataGridProyectos.jsx";
import {useNavigate} from "react-router-dom";
import {obtenerProyectos} from "../solicitudes.jsx";

const Proyectos = () => {
    // Inicializa el estado de projects con los datos de los proyectos
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    const [project, setProject] = useState(null); // Para almacenar el proyecto seleccionado
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)



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
        console.log("Proyecto seleccionado:", project);
        navigate("/lider/proyecto", {state: project})
    };


    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3 w-100">
                <Form onSubmit={handleSubmit} className="d-flex w-100 align-items-center">
                    <Form.Group className="mb-0 w-100"> {/* Ajusta el grupo al 100% */}
                        <Autocomplete
                            options={projects}
                            value={project}
                            onChange={(event, newValue) => {
                                setProject(newValue); // Actualiza el proyecto seleccionado
                            }}
                            getOptionLabel={(option) => option.nombre} // Muestra el nombre del proyecto
                            renderInput={(params) => <TextField {...params} label="Seleccione un proyecto" />}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" size="lg" className="ms-3" style={{ flexShrink: 0 }}>
                        Confirmar
                    </Button>
                </Form>
            </div>
            <DataGridProyectos proyectos={projects} loading={loading} error={error}/>
        </Container>
    );
};

export default Proyectos;
