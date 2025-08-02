export interface CategoryInterface {
    id: string;
    name: string;
    isActive: boolean;
}

export type CreateCategoryInterface = Omit<CategoryInterface, 'id'>;
