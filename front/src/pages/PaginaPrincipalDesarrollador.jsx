import Navegador from "../components/Navegador/Navegador.jsx";

import Calendar from "../components/Calendario/Calendar.jsx"
import CalendarioNavegable from "../components/Calendario/CalendarioNavegable.jsx";
import {useEffect, useState} from "react";

import {useLocation} from "react-router-dom";

import {Box} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import {errorRed, loadingGray, successGreen} from "../utils/constants.js";

const PaginaPrincipalDesarrollador = () => {
    const location = useLocation();

    const [carga, setCarga] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [deletion, setDeletion] = useState(null);
    const [deletionNotif, setDeletionNotif] = useState(deletion !== null);
    const [additionNotif, setAdditionNotif] = useState(false);
    const [editionNotif, setEditionNotif] = useState(false);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Manejo en caso de que se halla borrado una carga
    useEffect(() => {
        if (deletion) {
            setDeletion(null);
            setDeletionNotif(true);
            setCarga(null);
        }
    }, [deletion])


    useEffect(() => {
        if (sessionStorage.getItem('ignoreState') === "false") {
            setAdditionNotif(location.state ? location.state === 2 : false)
            setEditionNotif(location.state ? location.state === 1 : false)
            sessionStorage.setItem('ignoreState', "true");
        }

    }, [sessionStorage.getItem('ignoreState')])


    const handleAdditionNotifClose = () => {
        setAdditionNotif(false);
    }
    const handleEditionNotifClose = () => {
        setEditionNotif(false);
    }
    const handleDeletionNotifClose = () => {
        setDeletionNotif(false);
    }

    const handleErrorNotifClose = () => {
        setError(null);
    }
    const handleLoadingNotifClose = () => {
        setLoading(false);
    }

    return (
        <>
            <Navegador/>
            <div className="">
                <h2 className="text-center m-3 ">Calendario de Tareas</h2>
                <CalendarioNavegable carga={carga} setFecha={setFecha} setDeletion={setDeletion} setError={setError} setLoading={setLoading}/>
                <Calendar setCarga={setCarga} fecha={fecha} setFecha={setFecha} deletion={deletion} recurso={{id: "ff14a491-e26d-4092-86ea-d76f20c165d1"}}/>
                <Snackbar
                    open={additionNotif}
                    autoHideDuration={4000}
                    message="Carga de horas agregada con exito."
                    onClose={handleAdditionNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: successGreen,
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Carga de horas agregada con exito.
                    </Box>
                </Snackbar>
                <Snackbar
                    open={editionNotif}
                    autoHideDuration={4000}
                    onClose={handleEditionNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: successGreen,
                            color: "white", // White text
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Carga de horas editada con exito.
                    </Box>
                </Snackbar>
                <Snackbar
                    open={deletionNotif}
                    autoHideDuration={4000}
                    onClose={handleDeletionNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: successGreen,
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Carga de horas eliminada con exito.
                    </Box>
                </Snackbar>
                <Snackbar
                    open={error != null}
                    autoHideDuration={4000}
                    onClose={handleErrorNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: errorRed,
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Hubo un error al eliminar la carga. Vuelve a intentarlo más tarde.
                    </Box>
                </Snackbar>
                <Snackbar
                    open={loading}
                    autoHideDuration={10000}
                    onClose={handleLoadingNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: loadingGray,
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Eliminando carga...
                    </Box>
                </Snackbar>
            </div>
        </>
    )
}

export default PaginaPrincipalDesarrollador