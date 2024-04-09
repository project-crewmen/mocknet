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

export const getAffinityList = async () => {
    const { data } = await axios.get('http://localhost:1111/monitor/affinity/');

    return data;
}

export const getAffinityFactorList = async () => {
    const { data } = await axios.get('http://localhost:1111/monitor/affinityFactor');
    return data;
}

export const getMachineList = async () => {
    const { data } = await axios.get('http://localhost:2222/sdc/machine');

    return data;
}

export const getLinkList = async () => {
    const { data } = await axios.get('http://localhost:2222/sdc/link');

    return data;
}

export const getLinkMachinesList = async () => {
    const { data } = await axios.get('http://localhost:2222/sdc/network');

    return data;
}

export const getAffinityCostListDetailed = async () => {
    const { data } = await axios.get('http://localhost:1111/monitor/affinityCostDetailed/1');

    return data;
}