import axios from "axios";

if (process.env.REACT_APP_SERVER_URL) {
    // axios.defaults.baseURL = "http://localhost:1111"
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
}

export const getStats = async () => {
    const { data } = await axios.get('http://localhost:1111/monitor/stats');
    return data;
}