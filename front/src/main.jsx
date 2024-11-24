import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import PaginaPrincipalDesarrollador from "./pages/PaginaPrincipalDesarrollador.jsx";
import PaginaCargaHoras from "./pages/PaginaCargaHoras.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PaginaPrincipalDesarrollador />
  </StrictMode>,
)
