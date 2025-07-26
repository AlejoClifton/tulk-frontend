import { UuidValueObject } from '@/shared/value-objects';

export interface ProductInterface {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    mainImageUrl: string;
    imagesUrl: string[];
    isActive: boolean;
}

export class ProductEntity implements ProductInterface {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    mainImageUrl: string;
    imagesUrl: string[];
    isActive: boolean;

    constructor(
        id: UuidValueObject,
        name: string,
        description: string,
        categoryId: UuidValueObject,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
    ) {
        this.id = id.toString();
        this.name = name;
        this.description = description;
        this.categoryId = categoryId.toString();
        this.mainImageUrl = mainImageUrl;
        this.imagesUrl = imagesUrl;
        this.isActive = isActive;
    }

    static create(
        id: string,
        name: string,
        description: string,
        categoryId: string,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
    ): ProductEntity {
        return new ProductEntity(
            UuidValueObject.create(id),
            name,
            description,
            UuidValueObject.create(categoryId),
            mainImageUrl,
            imagesUrl,
            isActive,
        );
    }

    static fromJson(
        id: string,
        name: string,
        description: string,
        categoryId: string,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
    ): ProductEntity {
        return new ProductEntity(
            UuidValueObject.create(id),
            name,
            description,
            UuidValueObject.create(categoryId),
            mainImageUrl,
            imagesUrl,
            isActive,
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
        };
    }
}
