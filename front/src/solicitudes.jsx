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

/*
export function obtenerCostos(handleSuccess= () => {}, handleError= () => {}) {
    const url = `https://two0242c-is-squad12.onrender.com/finance/incomes?year=X`; // URL DE FINANZAS
        const response = await fetch(url, {
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
*/


export function obtenerCostos() {
    return  [
        {
            "id":1,
            "role":{
                "id":"1f14a491-e26d-4092-86ea-d76f20c165d1",
                "name":"Desarrollador",
                "experience":"Semi-Senior"
            },
            "incomeByHour":50.00,
            "month": 11,
            "year":2024
        },
        {
            "id":2,
            "role":{
                "id":"1f14a491-e26d-4092-86ea-d76f20c165d1",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":1,
            "year":2024
        },
        {
            "id":7,
            "role":{
                "id":"1f14a491-e26d-4092-86ea-d76f20c165d1",
                "name":"Desarrollador",
                "experience":"Semi-Senior"
            },
            "incomeByHour":50.00,
            "month":4,
            "year":2024
        },
        {
            "id":8,
            "role":{
                "id":"1f14a491-e26d-4092-86ea-d76f20c165d1",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":3,
            "year":2024
        },
        {
            "id":9,
            "role":{
                "id":"1f14a491-e26d-4092-86ea-d76f20c165d1",
                "name":"Desarrollador",
                "experience":"Semi-Senior"
            },
            "incomeByHour":50.00,
            "month":6,
            "year":2024
        },
        {
            "id":3,
            "role":{
                "id":"6e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":4,
            "year":2024
        },
        {
            "id":3,
            "role":{
                "id":"6e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":3,
            "year":2024
        },
        {
            "id":4,
            "role":{
                "id":"6e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":2,
            "year":2024
        },
        {
            "id":5,
            "role":{
                "id":"6e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":1,
            "year":2024
        },
        {
            "id":6,
            "role":{
                "id":"6e6ecd47-fa18-490e-b25a-c9101a398b6d",
                "name":"Desarrollador",
                "experience":"Junior"
            },
            "incomeByHour":20.00,
            "month":6,
            "year":2024
        }
        ]
}