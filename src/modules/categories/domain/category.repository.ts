import { CategoryInterface } from './category.entity';

export interface CategoryRepository {
    getAll(): Promise<CategoryInterface[]>;
} 