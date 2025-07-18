import { backendApi } from '@/shared/http/clients/backend.client';
import { ProductInterface } from '../domain/product.entity';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

const backendAdapter = new BackendAdapter();

export const getAllProducts = () => backendApi.get('/products');
export const getProductById = (id: string) => backendAdapter.get(`/products/${id}`);
export const createProduct = (data: ProductInterface) => backendAdapter.postWithData('/products', data);
export const updateProduct = (data: ProductInterface) =>
    backendAdapter.putWithData(`/products`, data);
export const deleteProduct = (id: string) => backendAdapter.delete(`/products/${id}`);
