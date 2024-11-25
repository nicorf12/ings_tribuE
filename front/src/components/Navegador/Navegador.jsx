import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"


const Navegador = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">PSA</Navbar.Brand>
                <Navbar.Text href="/" >Home</Navbar.Text>
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
