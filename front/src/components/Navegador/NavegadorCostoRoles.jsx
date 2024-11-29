import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {Button, Spinner} from "react-bootstrap";
import DatePickerMonthAndYear from "./DatePickerMonthAndYear.jsx";
import {useState} from "react";

const NavegadorCostoRoles = ({setRoles}) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [lastSelectedDate, setLastSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const header = {
        title: "Costos de Roles",
        subtitule:
            "Seleccione un año y un mes para poder visualizar los costos por hora de cada rol ",
    };

    const testRoles = [
        {id: 1, role: {id: '1', name: 'Desarrollador', experience: 'Junior'}, incomeByHour: 10},
        {id: 2, role: {id: '2', name: 'Desarrollador', experience: 'Semi Senior'}, incomeByHour: 15},
        {id: 3, role: {id: '3', name: 'Desarrollador', experience: 'Senior'}, incomeByHour: 20}
    ];


    const isSearchDisabled = () => {
        return selectedDate == null || selectedDate === lastSelectedDate;
    };

    const handleSearch = async () => {
        setLoading(true);
        //const year = selectedDate.getFullYear();
        //const url = `${prodBaseUrl}?year=${year}`;
        //const json = await request(url);
        const json = testRoles;
        (json != null) ? setRoles(json) : setRoles([]);
        if (json != null) setLastSelectedDate(selectedDate.getFullYear());
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
                            <DatePickerMonthAndYear selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                            {loading ? <Spinner animation="border" role="status" className="ms-2" /> : searchButton()}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavegadorCostoRoles;
