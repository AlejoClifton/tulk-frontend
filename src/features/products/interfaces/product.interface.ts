import type { CategoryInterface } from '@/features/categories/interfaces/category.interface';

export interface TechnicalSpecification {
    key: string;
    value: string;
}

export interface TechnicalSpecificationGroup {
    title: string;
    specifications: TechnicalSpecification[];
}

export interface Faq {
    question: string;
    answer: string;
}

export interface ProductInterface {
    id?: string;
    name: string;
    description: string;
    categoryId: string;
    mainImageUrl: string;
    imagesUrl: string[];
    isActive: boolean;
    benefits?: string[];
    technicalSpecifications?: TechnicalSpecificationGroup[];
    faq?: Faq[];
    category?: CategoryInterface;
}
