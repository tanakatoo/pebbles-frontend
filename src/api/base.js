import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
//const BASE_URL = "https://pebblescommunity.onrender.com" || "http://localhost:3001";

class PebblesApi {
    // the token for interaction with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //pass authorization token in the header
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PebblesApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.log('what is the error?', err)
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
}

// for now, put token ("asdffffff" / "stupid" on class)
// PebblesApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InJlZ3VsYXIiLCJpYXQiOjE2ODU0NjQ5ODZ9.mHJv4S-rTMIplmRdpOAzkLwcAnG_68i1GwzEx6oo22U";

export default PebblesApi