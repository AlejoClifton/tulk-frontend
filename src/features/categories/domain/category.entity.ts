import { UuidValueObject } from '@/shared/value-objects';

export interface CategoryInterface {
    id: string;
    name: string;
    isActive: boolean;
}

export class CategoryEntity {
    constructor(
        public id: UuidValueObject,
        public name: string,
        public isActive: boolean,
    ) {}

    static create(id: string, name: string, isActive: boolean) {
        return new CategoryEntity(UuidValueObject.create(id), name, isActive);
    }

    static fromJson(id: string, name: string, isActive: boolean) {
        return new CategoryEntity(UuidValueObject.create(id), name, isActive);
    }

    toJson(): CategoryInterface {
        return {
            id: this.id.toString(),
            name: this.name,
            isActive: this.isActive,
        };
    }
}
