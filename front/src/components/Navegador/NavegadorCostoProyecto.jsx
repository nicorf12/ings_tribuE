import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import DatePickerYear from "./DatePickerYear.jsx";
import {useState} from "react";
import {getProjects} from "../../services/ProjectService.js";
import SearchButton from "./SearchButton.jsx";

const NavegadorCostoProyecto = ({setProjects}) => {
    const header = {
        title: "Costos de Proyectos",
        subtitule:
            "Seleccione un año para poder visualizar los costos de los proyectos de la empresa desglosado de forma mensual. ",
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [lastYearSearched, setlastYearSearched] = useState(null);
    const [loading, setLoading] = useState(false);


    const isSearchDisabled = () => {
        return selectedDate == null || selectedDate.getFullYear() === lastYearSearched;
    };

    const handleSearch = async () => {
        setLoading(true);
        const year = selectedDate.getFullYear();
        const responseJson = await getProjects(year);
        (responseJson != null) ? setProjects(responseJson) : setProjects([]);
        if (responseJson != null) setlastYearSearched(selectedDate.getFullYear());
        setLoading(false);
    }

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
                            <SearchButton isDisabled={isSearchDisabled()} isLoading={loading} onClick={handleSearch} />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavegadorCostoProyecto;