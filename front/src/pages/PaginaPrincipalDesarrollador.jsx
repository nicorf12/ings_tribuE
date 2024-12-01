import Navegador from "../components/Navegador/Navegador.jsx";

import Calendar from "../components/Calendario/Calendar.jsx"
import CalendarioNavegable from "../components/Calendario/CalendarioNavegable.jsx";
import {useEffect, useState} from "react";

import {useLocation} from "react-router-dom";

import {Box} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const PaginaPrincipalDesarrollador = () => {
    const location = useLocation();
    const [carga, setCarga] = useState(null);
    const [fecha, setFecha] = useState(new Date());
    const [deletion, setDeletion] = useState("");
    const [deletionNotif, setDeletionNotif] = useState(deletion !== "");
    const [additionNotif, setAdditionNotif] = useState(location.state ? location.state === 2 : false);
    const [editionNotif, setEditionNotif] = useState(location.state ? location.state === 1 : false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (deletion) {
            setDeletionNotif(true);
        }
    }, [deletion])



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
                <Calendar setCarga={setCarga} fecha={fecha} setFecha={setFecha} deletion={deletion}/>
                <Snackbar
                    open={additionNotif}
                    autoHideDuration={4000}
                    message="Carga de horas agregada con exito."
                    onClose={handleAdditionNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#4caf50", // Green background color
                            color: "white", // White text
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
                            backgroundColor: "#4caf50", // Green background color
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
                            backgroundColor: "#4caf50", // Green background color
                            color: "white", // White text
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
                            backgroundColor: "#FF4C4C", // Green background color
                            color: "white", // White text
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Hubo un error al eliminar la carga. Vuelve a intentarlo más tarde.
                    </Box>
                </Snackbar>;
                <Snackbar
                    open={loading}
                    autoHideDuration={10000}
                    onClose={handleLoadingNotifClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#A6A6A6",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            fontSize: "16px",
                        }}
                    >
                        Eliminando carga...
                    </Box>
                </Snackbar>;
            </div>
        </>
    )
}

export default PaginaPrincipalDesarrollador