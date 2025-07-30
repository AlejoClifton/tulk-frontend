import { auth } from '@/auth';
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
        const session = await auth();

        const categories = await this.backendAdapter.get<CategoryInterface[]>(
            this.url,
            session?.user.accessToken || '',
        );
        return categories;
    }

    async getById(id: string): Promise<CategoryInterface> {
        const session = await auth();

        const category = await this.backendAdapter.get<CategoryInterface>(
            `${this.url}/${id}`,
            session?.user.accessToken || '',
        );
        return category;
    }

    async create(category: CategoryInterface): Promise<CategoryInterface> {
        const session = await auth();

        const newCategory = await this.backendAdapter.postWithData<CategoryInterface>(
            this.url,
            category,
            session?.user.accessToken || '',
        );
        return newCategory;
    }

    async update(category: CategoryInterface): Promise<CategoryInterface> {
        const session = await auth();

        const updatedCategory = await this.backendAdapter.putWithData<CategoryInterface>(
            this.url,
            category,
            session?.user.accessToken || '',
        );
        return updatedCategory;
    }

    async delete(id: string): Promise<void> {
        const session = await auth();

        await this.backendAdapter.delete(`${this.url}/${id}`, session?.user.accessToken || '');
    }
}
