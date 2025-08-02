import axios from 'axios';

const API_URL_CLIENT = process.env.NEXT_PUBLIC_API_URL_CLIENT;

const backendApi = axios.create({
    baseURL: `${API_URL_CLIENT}/api/v1`,
    withCredentials: true,
});

export { backendApi };
