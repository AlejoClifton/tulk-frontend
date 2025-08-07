import * as Sentry from '@sentry/nextjs';
import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

export type AuthHandlers = {
    refreshAuth: () => Promise<void>;
    signOut: () => void;
};

export class BaseAxiosAdapter {
    private axiosClient: AxiosInstance;
    private handlers: AuthHandlers;

    constructor(axiosClient: AxiosInstance, handlers: AuthHandlers) {
        this.axiosClient = axiosClient;
        this.handlers = handlers;
    }

    private async request<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (err: unknown) {
            const axiosError = err as AxiosError;

            Sentry.captureException(axiosError, {
                tags: {
                    route: axiosError?.config?.url,
                    method: axiosError?.config?.method,
                },
            });

            if (axiosError?.response?.status === 401) {
                try {
                    await this.handlers.refreshAuth();
                    return await fn();
                } catch (refreshErr) {
                    this.handlers.signOut();
                    throw refreshErr;
                }
            }
            throw err;
        }
    }

    protected makeHeaders(token?: string, customHeaders?: AxiosRequestConfig['headers']) {
        const headers: AxiosRequestConfig['headers'] = { ...customHeaders };
        if (token) headers.Authorization = `Bearer ${token}`;
        return headers;
    }

    async get<T>(url: string, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .get<T>(url, { headers: this.makeHeaders(token, config?.headers), ...config })
                .then((r) => r.data),
        );
    }

    async delete<T>(url: string, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .delete<T>(url, { headers: this.makeHeaders(token, config?.headers), ...config })
                .then((r) => r.data),
        );
    }

    async deleteWithData<T>(url: string, dataJson: object, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .delete<T>(url, { headers: this.makeHeaders(token, config?.headers), data: dataJson, ...config })
                .then((r) => r.data),
        );
    }

    async post<T>(url: string, dataJson?: object, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .post<T>(url, dataJson, { headers: this.makeHeaders(token, config?.headers), ...config })
                .then((r) => r.data),
        );
    }

    async postWithDataNotToken<T>(url: string, dataJson: object, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() => this.axiosClient.post<T>(url, dataJson, { ...config }).then((r) => r.data));
    }

    async putWithData<T>(url: string, dataJson: object, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .put<T>(url, dataJson, { headers: this.makeHeaders(token, config?.headers), ...config })
                .then((r) => r.data),
        );
    }

    async patchWithData<T>(url: string, dataJson: object, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .patch<T>(url, dataJson, { headers: this.makeHeaders(token, config?.headers), ...config })
                .then((r) => r.data),
        );
    }

    async putFormData<T>(url: string, formData: FormData, token?: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request(() =>
            this.axiosClient
                .put<T>(url, formData, {
                    headers: { ...this.makeHeaders(token, config?.headers), 'Content-Type': 'multipart/form-data' },
                    ...config,
                })
                .then((r) => r.data),
        );
    }
}
