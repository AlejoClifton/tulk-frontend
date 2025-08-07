import type { CategoryInterface } from '@/features/categories/interfaces/category.interface';

export interface TechnicalSpecificationItem {
    key: string;
    value: string;
}

export interface TechnicalSpecificationGroup {
    title: string;
    specifications: TechnicalSpecificationItem[];
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface ProductWithCategoryName extends ProductInterface {
    category: CategoryInterface;
}

export interface ProductInterface {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    categoryName?: string;
    mainImageUrl: string;
    imagesUrl?: string[];
    isActive: boolean;
    benefits?: string[];
    technicalSpecification?: TechnicalSpecificationGroup[];
    faq?: FaqItem[];
    category?: CategoryInterface;
}
