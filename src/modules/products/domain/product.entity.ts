import { CategoryInterface } from '@/modules/categories/domain';
import { UuidValueObject } from '@/shared/value-objects';

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

export class ProductEntity implements ProductInterface {
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

    constructor(
        id: UuidValueObject | undefined,
        name: string,
        description: string,
        categoryId: UuidValueObject,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
        benefits?: string[],
        technicalSpecifications?: TechnicalSpecificationGroup[],
        faq?: Faq[],
    ) {
        this.id = id ? id.toString() : undefined;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId.toString();
        this.mainImageUrl = mainImageUrl;
        this.imagesUrl = imagesUrl;
        this.isActive = isActive;
        this.benefits = benefits;
        this.technicalSpecifications = technicalSpecifications;
        this.faq = faq;
    }

    static create(
        id: string | undefined,
        name: string,
        description: string,
        categoryId: string,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
        benefits?: string[],
        technicalSpecifications?: TechnicalSpecificationGroup[],
        faq?: Faq[],
    ): ProductEntity {
        return new ProductEntity(
            id ? UuidValueObject.create(id) : undefined,
            name,
            description,
            UuidValueObject.create(categoryId),
            mainImageUrl,
            imagesUrl,
            isActive,
            benefits,
            technicalSpecifications,
            faq,
        );
    }

    static fromJson(
        id: string | undefined,
        name: string,
        description: string,
        categoryId: string,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
        benefits?: string[],
        technicalSpecifications?: TechnicalSpecificationGroup[],
        faq?: Faq[],
    ): ProductEntity {
        return new ProductEntity(
            id ? UuidValueObject.create(id) : undefined,
            name,
            description,
            UuidValueObject.create(categoryId),
            mainImageUrl,
            imagesUrl,
            isActive,
            benefits,
            technicalSpecifications,
            faq,
        );
    }

    toJson(): ProductInterface {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            categoryId: this.categoryId,
            mainImageUrl: this.mainImageUrl,
            imagesUrl: this.imagesUrl,
            isActive: this.isActive,
            benefits: this.benefits,
            technicalSpecifications: this.technicalSpecifications,
            faq: this.faq,
        };
    }
}
