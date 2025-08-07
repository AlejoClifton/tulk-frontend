import axios from 'axios';

const nextjsClient = axios.create({
    baseURL: `/api/v1`,
});

nextjsClient.interceptors.request.use((config) => {
    return config;
});

export { nextjsClient };
