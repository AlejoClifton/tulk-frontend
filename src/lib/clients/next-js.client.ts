import axios from 'axios';

const API_URL_CLIENT = process.env.NEXT_PUBLIC_API_URL_CLIENT;

const nextjsClient = axios.create({
    baseURL: `${API_URL_CLIENT}/api/`,
});

nextjsClient.interceptors.request.use((config) => {
    return config;
});

export { nextjsClient };
