import { CategoryInterface } from './category.entity';

export interface CategoryRepository {
    getAll(): Promise<CategoryInterface[]>;
    getById(id: string): Promise<CategoryInterface>;
    create(category: CategoryInterface): Promise<CategoryInterface>;
    update(category: CategoryInterface): Promise<CategoryInterface>;
    delete(id: string): Promise<void>;
} 