import { nextjsClient } from '@/shared/http/clients/next-js.client';
import { IHttpAdapter } from '@/shared/http/interfaces/http.adapter.interface';

export class NextjsAdapter implements IHttpAdapter {
    async delete<T>(url: string): Promise<T> {
        const { data } = await nextjsClient.delete<T>(url);

        return data;
    }

    async deleteWithData<T>(url: string, dataJson: object): Promise<T> {
        const { data } = await nextjsClient.delete<T>(url, dataJson);

        return data;
    }

    async get<T>(url: string): Promise<T> {
        const { data } = await nextjsClient.get<T>(url);

        return data;
    }

    async post<T>(url: string): Promise<T> {
        const { data } = await nextjsClient.post<T>(url);

        return data;
    }

    async patchWithData<T>(url: string, dataJson: object): Promise<T> {
        const { data } = await nextjsClient.patch<T>(url, dataJson);

        return data;
    }

    async postWithData<T>(url: string, dataJson: object): Promise<T> {
        const { data } = await nextjsClient.post<T>(url, dataJson);

        return data;
    }

    async putWithData<T>(url: string, dataJson: object): Promise<T> {
        const { data } = await nextjsClient.put<T>(url, dataJson);

        return data;
    }
}
