import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const DataGridProyectos = ({ proyectos, onSelect }) => {

    return (
        <TableContainer component={Paper} sx={{ backgroundColor: 'grey.300' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: 'red' }}>ID</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: 'red' }}>Nombre</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: 'red' }}>Descripcion</TableCell>

                        <TableCell align="right" sx={{ backgroundColor: 'red' }}>Detalles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {proyectos.map((proyecto) => (
                        <TableRow
                            key={proyecto.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => onSelect(proyecto)} // Llama a onSelect al hacer clic en la fila
                        >
                            <TableCell component="th" scope="row">
                                {proyecto.id}
                            </TableCell>
                            <TableCell align="right">{proyecto.nombre}</TableCell>
                            <TableCell align="right">{proyecto.descripcion}</TableCell>

                            <TableCell align="right"><a href="">Ir</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataGridProyectos;