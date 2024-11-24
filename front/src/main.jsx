import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaPrincipalDesarrollador from './pages/PaginaPrincipalDesarrollador.jsx';
import PaginaCargaHoras from './pages/PaginaCargaHoras.jsx';
import PaginaPrincipalLider from "./pages/PaginaPrincipalLider.jsx";
import PaginaProyecto from "./pages/PaginaProyecto.jsx";
import PaginaBuscarProyecto from "./pages/PaginaBuscarProyecto.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                {/* Definimos las rutas */}
                <Route path="/" element={<PaginaPrincipalDesarrollador />} /> { /* Aca seria /dev */}
                <Route path="/carga-horas" element={<PaginaCargaHoras />} />
                <Route path="/lider" element={<PaginaPrincipalLider />} />
                <Route path="/proyectos" element={<PaginaProyecto />} />
                <Route path="/buscar-proyecto" element={<PaginaBuscarProyecto />} />
            </Routes>
        </Router>
    </StrictMode>
);

// <Link to="/"> Texto ?? </Link> -> Como se usa