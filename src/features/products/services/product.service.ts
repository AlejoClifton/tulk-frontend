import type { ProductInterface } from '@/features/products/interfaces/product.interface';
import { NextjsAdapter } from '@/lib/adapters/next-js.adapter';

const backend = new NextjsAdapter();
const BASE_URL = '/products';

export const getAllProducts = async (): Promise<ProductInterface[]> => {
    return backend.get<ProductInterface[]>(BASE_URL);
};

export const getProductById = async (id: string): Promise<ProductInterface> => {
    return backend.get<ProductInterface>(`${BASE_URL}/${id}`);
};

export const createProduct = async (product: ProductInterface, token: string): Promise<ProductInterface> => {
    return backend.post<ProductInterface>(BASE_URL, product, token);
};

export const updateProduct = async (product: ProductInterface, token: string): Promise<ProductInterface> => {
    return backend.putWithData<ProductInterface>(`${BASE_URL}/${product.id}`, product, token);
};

export const deleteProduct = async (id: string, token: string): Promise<void> => {
    return backend.delete<void>(`${BASE_URL}/${id}`, token);
};
