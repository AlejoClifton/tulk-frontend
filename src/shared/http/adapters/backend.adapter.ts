import { backendApi } from "@/shared/http/clients/backend.client";

export class BackendAdapter {
    async delete<T>(url: string, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.delete<T>(url, { headers: header });

        return data;
    }

    async deleteWithData<T>(url: string, dataJson: object, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.delete<T>(url, { headers: header, data: dataJson });

        return data;
    }

    async get<T>(url: string, token?: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.get<T>(url, { headers: header });

        return data;
    }

    async patchWithData<T>(url: string, dataJson: object, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.patch<T>(url, dataJson, { headers: header });

        return data;
    }

    async post<T>(url: string, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.post<T>(url, { headers: header });

        return data;
    }

    async postWithData<T>(url: string, dataJson: object, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.post<T>(url, dataJson, { headers: header });

        return data;
    }

    async putFormData<T>(url: string, dataJson: object, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.put<T>(url, dataJson, { headers: header });

        return data;
    }

    async postWithDataNotToken<T>(url: string, dataJson: object): Promise<T> {
        const { data } = await backendApi.post<T>(url, dataJson);

        return data;
    }

    async putWithData<T>(url: string, dataJson: object, token: string): Promise<T> {
        const header = {
            Authorization: `Bearer ${token}`,
        };

        const { data } = await backendApi.put<T>(url, dataJson, { headers: header });

        return data;
    }
}
