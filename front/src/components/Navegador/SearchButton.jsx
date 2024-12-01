import React from 'react';
import {Button, Spinner} from 'react-bootstrap';

const SearchButton = ({ isDisabled, isLoading, onClick }) => {
    return (
        <>
            {isLoading ? (
                <Spinner animation="border" role="status" className="ms-2" />
            ) : (
                <Button
                    className="ms-2 btn-sm"
                    style={{ backgroundColor: isDisabled ? 'grey' : 'blue' }}
                    disabled={isDisabled}
                    onClick={onClick}
                >
                    Buscar
                </Button>
            )}
        </>
    );
};

export default SearchButton;