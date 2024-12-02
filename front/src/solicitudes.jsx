export async function obtenerTareas() {
    const response = await fetch(`https://psa-loadhour.onrender.com/psa/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}

export async function obtenerProyectos() {

    const response = await fetch(`https://psa-loadhour.onrender.com/psa/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }

}


export async function obtenerRecursos() {
    const response = await fetch(`https://psa-loadhour.onrender.com/psa/resources`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}

export async function obtenerCargas() {
    const response = await fetch(`https://psa-loadhour.onrender.com/api/loadhour`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}


export async function obtenerCargasDeRecurso(idRecurso) {
    const response = await fetch(`https://psa-loadhour.onrender.com/api/loadhour/${idRecurso}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}

export async function obtenerCargasEnPeriodo(startDate, endDate, idRecurso) {
    const response = await fetch(`https://psa-loadhour.onrender.com/api/hours?initDate=${startDate}&endDate=${endDate}&idRecurso=${idRecurso}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': "*"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}

export async function eliminarCarga(carga) {

    const response = await fetch(`https://psa-loadhour.onrender.com/api/delete/${carga.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },

    });

    if (response.ok) {
        return response;
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }

}

export async function modificarCarga(carga, request) {
    const response = await fetch(`https://psa-loadhour.onrender.com/api/modify/${carga.id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        return response;
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}

export async function agregarCarga(request) {
    const response = await fetch(`https://psa-loadhour.onrender.com/api/add`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return await response;
    } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
}


export async function obtenerCostos(years) {
    const urlBase = `https://two0242c-is-squad12.onrender.com/finance/incomes?year=`;
    const resultados = [];

    for (const year of years) {

        const url = `${urlBase}${year}`; // Construir la URL con el año actual

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            resultados.push(data); // Almacena los resultados
        } else {
            throw new Error(`Error en la solicitud para el año ${year}: ${response.status}`);
        }
    }

    return resultados; // Devuelve un array con los resultados de todos los años
}



