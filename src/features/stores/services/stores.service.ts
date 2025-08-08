import type { CreateStoreDTO, StoreInterface, UpdateStoreDTO } from '@/features/stores/interfaces/store.interface';
import { BackendAdapter } from '@/lib/adapters/backend.adapter';

const backend = new BackendAdapter();
const BASE_URL = '/stores';

export const getStores = async (): Promise<StoreInterface[]> => {
    return await backend.get<StoreInterface[]>(BASE_URL);
};

export const getStore = async (id: string): Promise<StoreInterface> => {
    return await backend.get<StoreInterface>(`${BASE_URL}/${id}`);
};

export const createStore = async (store: CreateStoreDTO, token: string): Promise<StoreInterface> => {
    return await backend.post<StoreInterface>(BASE_URL, store, token);
};

export const updateStore = async (id: string, store: UpdateStoreDTO, token: string): Promise<StoreInterface> => {
    return await backend.putWithData<StoreInterface>(`${BASE_URL}/${id}`, store, token);
};

export const deleteStore = async (id: string): Promise<void> => {
    await backend.delete(`${BASE_URL}/${id}`);
};
