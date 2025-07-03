import axios from 'axios';

const nextjsClient = axios.create({
    baseURL: `/api`,
});

nextjsClient.interceptors.request.use((config) => {
    return config;
});

export { nextjsClient };
