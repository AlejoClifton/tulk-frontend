import { CategoryInterface } from '@/modules/categories/domain/category.entity';
import { CategoryRepository } from '@/modules/categories/domain/category.repository';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class CategoryApi implements CategoryRepository {
    private readonly backendAdapter: BackendAdapter;
    private readonly url: string;

    constructor() {
        this.backendAdapter = new BackendAdapter();
        this.url = '/categories';
    }

    async getAll(): Promise<CategoryInterface[]> {
        const categories = await this.backendAdapter.get<CategoryInterface[]>(this.url);
        return categories;
    }

    async create(category: CategoryInterface, token: string): Promise<CategoryInterface> {
        const newCategory = await this.backendAdapter.postWithData<CategoryInterface>(this.url, category, token);
        return newCategory;
    }

    async update(category: CategoryInterface, token: string): Promise<CategoryInterface> {
        const updatedCategory = await this.backendAdapter.putWithData<CategoryInterface>(this.url, category, token);
        return updatedCategory;
    }

    async delete(id: string, token: string): Promise<void> {
        await this.backendAdapter.delete(`${this.url}/${id}`, token);
    }
}
