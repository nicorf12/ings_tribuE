import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PaginaPrincipalDesarrollador from './pages/PaginaPrincipalDesarrollador.jsx';
import PaginaCargaHoras from './pages/PaginaCargaHoras.jsx';
import PaginaProyecto from "./pages/PaginaProyecto.jsx";
import PaginaBuscarProyecto from "./pages/PaginaBuscarProyecto.jsx";
import PaginaEditarTarea from "./pages/PaginaEditarTarea.jsx";
import PaginaCostoProyectos from "./pages/PaginaCostoProyectos.jsx";
import PaginaCostoRoles from "./pages/PaginaCostoRoles.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Página principal */}
                <Route path="/dev" element={<PaginaPrincipalDesarrollador />} /> { /* Aca seria /dev */}
                <Route path="/dev/carga-horas" element={<PaginaCargaHoras />} />
                <Route path="/dev/editar" element={<PaginaEditarTarea />} />
                <Route path="/lider/proyecto" element={<PaginaProyecto />} />
                <Route path="/lider" element={<PaginaBuscarProyecto />} />
                <Route path="/costos/proyectos" element={<PaginaCostoProyectos/>} />
                <Route path="/costos/roles" element={<PaginaCostoRoles/>} />
            </Routes>
        </Router>
    </StrictMode>
);

// <Link to="/"> Texto ?? </Link> -> Como se usa