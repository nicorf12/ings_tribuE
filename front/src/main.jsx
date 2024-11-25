import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaPrincipalDesarrollador from './pages/PaginaPrincipalDesarrollador.jsx';
import PaginaCargaHoras from './pages/PaginaCargaHoras.jsx';
import PaginaProyecto from "./pages/PaginaProyecto.jsx";
import PaginaBuscarProyecto from "./pages/PaginaBuscarProyecto.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/dev" element={<PaginaPrincipalDesarrollador />} /> { /* Aca seria /dev */}
                <Route path="/dev/carga-horas" element={<PaginaCargaHoras />} />
                <Route path="/lider/proyecto" element={<PaginaProyecto />} />
                <Route path="/lider" element={<PaginaBuscarProyecto />} />
            </Routes>
        </Router>
    </StrictMode>
);

// <Link to="/"> Texto ?? </Link> -> Como se usa