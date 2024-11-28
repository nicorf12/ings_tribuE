export const request = async (url) => {
    try {
        console.log("Fetching URL: ", url);
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
        console.error(`Error fetching URL: ${url}. Error: `, error);
        return null;
    }
};