import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {Button, Spinner} from "react-bootstrap";
import DatePickerYear from "./DatePickerYear.jsx";
import {useState} from "react";
import {request} from '../../utils/Json';

const NavegadorCostoProyecto = ({setProjects}) => {
    const header = {
        title: "Costos de Proyectos",
        subtitule:
            "Seleccione un año para poder visualizar los costos de los proyectos de la empresa desglosado de forma mensual. ",
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [lastYearSearched, setlastYearSearched] = useState(null);
    const [loading, setLoading] = useState(false);


    const testProjects = [
        { project: { id: 1, name: 'P1', description: 'Description P1' }, cost: { byMonth: { 1: '100,1', 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: '1200,1' } },
        { project: { id: 2, name: 'P2', description: 'Description P2' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 0, 12: 0 }, total: 1000 }},
        { project: { id: 3, name: 'P3', description: 'Description P3' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 } },
        { project: { id: 4, name: 'P4', description: 'Description P4' }, cost: { byMonth: { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 1200 }},
        { project: { id: 5, name: 'P5', description: 'Description P5' }, cost: { byMonth: { 1: 50000, 2: 50000, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100, 9: 100, 10: 100, 11: 100, 12: 100 }, total: 51000 }},
    ];

    const prodBaseUrl = "https://two0242c-is-squad12.onrender.com/finance/projects/reports";
    const baseUrl = "http://localhost:9290/finance/projects/reports";

    const isSearchDisabled = () => {
        return selectedDate == null || selectedDate.getFullYear() === lastYearSearched;
    };

    const handleSearch = async () => {
        setLoading(true);
        const year = selectedDate.getFullYear();
        const url = `${prodBaseUrl}?year=${year}`;
        //const json = await request(url);
        const json = testProjects;
        (json != null) ? setProjects(json) : setProjects([]);
        if (json != null) setlastYearSearched(selectedDate.getFullYear());
        setLoading(false);
    }

    const searchButton = () => (
        <Button
            className="ms-2 btn-sm"
            style={{ backgroundColor: isSearchDisabled() ? 'grey' : 'blue' }}
            disabled={isSearchDisabled()}
            onClick={handleSearch}
        >
            Buscar
        </Button>
    );

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Toggle />
                    <div className="mt-2">
                        <h3>{header.title}</h3>
                        <p>{header.subtitule}</p>
                    </div>
                    <Navbar.Collapse className="ms-4 justify-content-end">
                        <Navbar.Text className="d-flex align-items-center">
                            <DatePickerYear selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                            {loading ? <Spinner animation="border" role="status" className="ms-2" /> : searchButton()}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavegadorCostoProyecto;
