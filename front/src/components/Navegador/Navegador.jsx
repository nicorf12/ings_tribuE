import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const Navegador = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>PSA</Navbar.Brand>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    startIcon={<HomeIcon />}
                    sx={{ textDecoration: 'none', color: 'white' }}
                >
                    Home
                </Button>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        mpetean@fi.uba.ar | <a href="https://www.google.com/">Log out</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navegador;
