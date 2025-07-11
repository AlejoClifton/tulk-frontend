import { EmailValueObject, PhoneValueObject, UuidValueObject } from '@/shared/value-objects';

export interface BrandInterface {
    id: string;
    name: string;
    description: string;
    image: string;
    email: string;
    phone: string;
    address: string;
    addressLink: string;
    hours: string[];
}

export class BrandEntity {
    constructor(
        public id: UuidValueObject,
        public name: string,
        public description: string,
        public image: string,
        public email: EmailValueObject,
        public phone: PhoneValueObject,
        public address: string,
        public addressLink: string,
        public hours: string[],
    ) {}

    static create(
        id: string,
        name: string,
        description: string,
        image: string,
        email: string,
        phone: string,
        address: string,
        addressLink: string,
        hours: string[],
    ) {
        return new BrandEntity(
            UuidValueObject.create(id),
            name,
            description,
            image,
            EmailValueObject.create(email),
            PhoneValueObject.create(phone),
            address,
            addressLink,
            hours,
        );
    }

    static fromJson(
        id: string,
        name: string,
        description: string,
        image: string,
        email: string,
        phone: string,
        address: string,
        addressLink: string,
        hours: string[],
    ) {
        return new BrandEntity(
            UuidValueObject.create(id),
            name,
            description,
            image,
            EmailValueObject.create(email),
            PhoneValueObject.create(phone),
            address,
            addressLink,
            hours,
        );
    }

    toJson(): BrandInterface {
        return {
            id: this.id.toString(),
            name: this.name,
            description: this.description,
            image: this.image,
            email: this.email.toString(),
            phone: this.phone.toString(),
            address: this.address,
            addressLink: this.addressLink,
            hours: this.hours,
        };
    }
}
