import { CategoryInterface } from '@/modules/categories/domain/category.entity';
import { CategoryRepository } from '@/modules/categories/domain/category.repository';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class CategoryApiAdapter implements CategoryRepository {
    private readonly backendAdapter: BackendAdapter;
    private readonly url: string;
    private readonly token: string;

    constructor(token: string) {
        this.backendAdapter = new BackendAdapter();
        this.url = '/categories';
        this.token = token;
    }

    async getAll(): Promise<CategoryInterface[]> {
        return await this.backendAdapter.get<CategoryInterface[]>(this.url, this.token);
    }
}
