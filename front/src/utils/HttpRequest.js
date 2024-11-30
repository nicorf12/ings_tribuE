export const get = async (url) => {
    console.debug("GET - URL: ", url);
    const response = await fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

export const put = async (url, body) => {
    console.debug("PUT - URL: ", url);
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return await response.json();
};