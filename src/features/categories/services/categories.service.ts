import type { CategoryInterface, CreateCategoryInterface } from '@/features/categories/interfaces/category.interface';
import { BackendAdapter } from '@/lib/adapters/backend.adapter';

const backend = new BackendAdapter();
const BASE_URL = '/categories';

export const getAllCategories = async (): Promise<CategoryInterface[]> => {
    return backend.get<CategoryInterface[]>(BASE_URL);
};

export const createCategory = async (category: CreateCategoryInterface, token: string): Promise<CategoryInterface> => {
    return backend.post<CategoryInterface>(BASE_URL, category, token);
};

export const updateCategory = async (category: CategoryInterface, token: string): Promise<CategoryInterface> => {
    return backend.putWithData<CategoryInterface>(`${BASE_URL}/${category.id}`, category, token);
};

export const deleteCategory = async (id: string, token: string): Promise<void> => {
    return backend.delete<void>(`${BASE_URL}/${id}`, token);
};
