import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import DatePickerMonthAndYear from "./DatePickerMonthAndYear.jsx";
import {useState} from "react";
import {getRoles} from "../../services/RolesService.js";
import SearchButton from "./SearchButton.jsx";

const NavegadorCostoRoles = ({setRoles}) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [lastSelectedDate, setLastSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const header = {
        title: "Costos de Roles",
        subtitule:
            "Seleccione un año y un mes para poder visualizar los costos por hora de cada rol ",
    };

    const isSearchDisabled = () => {
        return selectedDate == null || selectedDate === lastSelectedDate;
    };

    const handleSearch = async () => {
        setLoading(true);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const responseJson = await getRoles(year, month);
        (responseJson != null) ? setRoles(responseJson) : setRoles([]);
        if (responseJson != null) setLastSelectedDate(selectedDate.getFullYear());
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
                            <DatePickerMonthAndYear selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                            <SearchButton isDisabled={isSearchDisabled()} isLoading={loading} onClick={handleSearch} />
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavegadorCostoRoles;