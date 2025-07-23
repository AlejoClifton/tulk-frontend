import { backendApi } from '@/shared/http/clients/backend.client';
import { CategoryInterface } from '@/modules/categories/domain/category.entity';

export const getAllCategories = () => backendApi.get('/categories');
export const getCategoryById = (id: string) => backendApi.get(`/categories/${id}`);
export const createCategory = (data: CategoryInterface) => backendApi.post('/categories', data);
export const updateCategory = (id: string, data: CategoryInterface) => backendApi.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) => backendApi.delete(`/categories/${id}`);
