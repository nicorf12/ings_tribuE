export const get = async (url) => {
    try {
        console.log("GET - URL: ", url);
        const response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Response Successfully.");
        return data;
    } catch (error) {
        console.error(`Error GET - URL: ${url} \nError: `, error);
        return null;
    }
};

export const put = async (url, body) => {
    try {
        console.log("PUT - URL: ", url);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log("Response Successfully.");
        return data;
    } catch (error) {
        console.error(`Error PUT - URL: ${url}. \nError: `, error);
        return null;
    }
};