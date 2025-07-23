import { backendApi } from '@/shared/http/clients/backend.client';
import { ProductInterface } from '../domain/product.entity';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

const backendAdapter = new BackendAdapter();

export const getAllProducts = () => backendApi.get('/products');
export const getProductById = (id: string) => backendAdapter.get(`/products/${id}`);
export const createProduct = (data: ProductInterface, token: string) => backendAdapter.postWithData('/products', data, token);
export const updateProduct = (data: ProductInterface, token: string) =>
    backendAdapter.putWithData(`/products`, data, token);
export const deleteProduct = (id: string, token: string) => backendAdapter.delete(`/products/${id}`, token);
