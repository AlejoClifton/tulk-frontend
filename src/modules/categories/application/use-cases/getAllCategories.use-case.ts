import { CategoryRepository } from '@/modules/categories/domain/category.repository';
import { CategoryInterface } from '@/modules/categories/domain/category.entity';

export class GetAllCategoriesUseCase {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute(): Promise<CategoryInterface[]> {
        return this.categoryRepository.getAll();
    }
} 