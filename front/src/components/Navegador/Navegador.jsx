import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"


const Navegador = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">PSA</Navbar.Brand>
                <Navbar.Text href="#home" >Home</Navbar.Text>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        mpetean@fi.uba.ar | <a href="#login">Log out</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navegador;
