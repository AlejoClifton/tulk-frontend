import { CategoryInterface, CreateCategoryInterface } from './category.entity';

export interface CategoryRepository {
    getAll(): Promise<CategoryInterface[]>;
    create(category: CreateCategoryInterface, token: string): Promise<CategoryInterface>;
    update(category: CategoryInterface, token: string): Promise<CategoryInterface>;
    delete(id: string, token: string): Promise<void>;
} 