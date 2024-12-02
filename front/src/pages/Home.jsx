
import Navegador from '../components/Navegador/Navegador.jsx';
import { Link } from "react-router-dom";

const Home = () => {
    const header = {
        title: "Bienvenido",
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        padding: '20px',

    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const buttonStyle = {
        display: 'block',
        padding: '10px 20px',
        margin: '10px 0',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        borderRadius: '8px',
        border: '1px solid #0056b3',
        width: '300px',
        fontSize: '16px',
        transition: 'all 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const redirectButton = (text, path) => (
        <Link
            to={path}
            style={buttonStyle}
            onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
        >
            {text}
        </Link>
    );

    return (
        <>
            <Navegador />
            <div style={containerStyle}>
                <h3 style={titleStyle}>{header.title}</h3>
                {redirectButton('Desarrollador', '/dev')}
                {redirectButton('Lider Proyectos', '/lider')}
                {redirectButton('Lider Calendario', '/lider/calendario')}
                {redirectButton('Costo de Proyectos', '/costos/proyectos')}
                {redirectButton('Costo de Roles', '/costos/roles')}
            </div>
        </>
    );
};

export default Home;