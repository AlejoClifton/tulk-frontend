import axios from 'axios';

const API_URL_CLIENT = process.env.API_URL_CLIENT;

const backendApi = axios.create({
    baseURL: `${API_URL_CLIENT}/api/v1`,
});

backendApi.interceptors.request.use((config) => {
    return config;
});

export { backendApi };
