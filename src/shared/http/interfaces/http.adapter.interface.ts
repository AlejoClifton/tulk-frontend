export interface IHttpAdapter {
    delete<T>(url: string, token: string): Promise<T>;
    deleteWithData<T>(url: string, dataJson: object, token: string): Promise<T>;
    get<T>(url: string, token: string): Promise<T>;
    patchWithData<T>(url: string, dataJson: object, token: string): Promise<T>;
    postWithData<T>(url: string, dataJson: object, token: string): Promise<T>;
    putWithData<T>(url: string, dataJson: object, token: string): Promise<T>;
}
