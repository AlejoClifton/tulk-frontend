import { CategoryInterface } from '@/modules/categories/domain/category.entity';
import { CategoryRepository } from '@/modules/categories/domain/category.repository';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class CategoryApiAdapter implements CategoryRepository {
    private readonly backendAdapter: BackendAdapter;
    private readonly token: string;
    private readonly url: string;

    constructor(token: string) {
        this.token = token;
        this.backendAdapter = new BackendAdapter();
        this.url = '/categories';
    }

    async getAll(): Promise<CategoryInterface[]> {
        const categories = await this.backendAdapter.get<CategoryInterface[]>(this.url, this.token);
        return categories;
    }

    async getById(id: string): Promise<CategoryInterface> {
        const category = await this.backendAdapter.get<CategoryInterface>(`${this.url}/${id}`, this.token);
        return category;
    }

    async create(category: CategoryInterface): Promise<CategoryInterface> {
        const newCategory = await this.backendAdapter.postWithData<CategoryInterface>(this.url, category, this.token);
        return newCategory;
    }

    async update(id: string, category: CategoryInterface): Promise<CategoryInterface> {
        const updatedCategory = await this.backendAdapter.putWithData<CategoryInterface>(
            `${this.url}/${id}`,
            category,
            this.token,
        );
        return updatedCategory;
    }

    async delete(id: string): Promise<void> {
        await this.backendAdapter.delete(`${this.url}/${id}`, this.token);
    }
}
