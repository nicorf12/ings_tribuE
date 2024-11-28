import React from 'react';
import Navegador from '../components/Navegador/Navegador.jsx';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {
    const header = {
        title: "Bienvenido"
    };

    const redirectButton = (text, path, color = 'primary') => (
        <Button
            component={Link}
            to={path}
            variant="contained"
            color={color}
            sx={{borderRadius: '8px', margin: '4px 0', border: '1px solid black', width: '300px'}}
        >
            {text}
        </Button>
    );

    return (
        <>
            <Navegador />
            <Container>
                <div className="mt-2">
                    <h3>{header.title}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {redirectButton('Desarrollador', '/dev')}
                    {redirectButton('Carga Horas Desarrolladores', '/dev/carga-horas')}
                    {redirectButton('Editar Tarea', '/dev/editar')}
                    {redirectButton('Proyectos', '/lider/proyecto')}
                    {redirectButton('Buscar Proyecto', '/lider')}
                    {redirectButton('Costo de Proyectos', '/costos/proyectos')}
                    {redirectButton('Costo de Roles', '/costos/roles')}
                </div>
            </Container>
        </>
    );
};

export default Home;