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

export class ProductEntity {
    constructor(
        public id: UuidValueObject,
        public name: string,
        public description: string,
        public categoryId: UuidValueObject,
        public mainImageUrl: string,
        public imagesUrl: string[],
        public isActive: boolean,
    ) {}

    static create(
        id: string,
        name: string,
        description: string,
        categoryId: string,
        mainImageUrl: string,
        imagesUrl: string[],
        isActive: boolean,
    ) {
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
    ) {
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
            id: this.id.toString(),
            name: this.name,
            description: this.description,
            categoryId: this.categoryId.toString(),
            mainImageUrl: this.mainImageUrl,
            imagesUrl: this.imagesUrl,
            isActive: this.isActive,
        };
    }
}
