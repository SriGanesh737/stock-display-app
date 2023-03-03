import axios from 'axios';


const token = "cfijakhr01qjvrn4tgbgcfijakhr01qjvrn4tgc0";
const finnHub = axios.create(
    {
        baseURL: "https://finnhub.io/api/v1",
        params: {
            token:token
        }
    }
);

export default finnHub;