import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
//const BASE_URL = "https://pebblescommunity.onrender.com" || "http://localhost:3001";

class PebblesApi {
    // the token for interaction with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        console.debug("base url is", BASE_URL)

        //pass authorization token in the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PebblesApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {

            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
}

export default PebblesApi