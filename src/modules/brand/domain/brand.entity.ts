import { UuidValueObject } from '@shared/value-objects/uuid.vo';

export interface BrandInterface {
    id: UuidValueObject;
    name: string;
    description: string;
    image: string;
    email: string;
    phone: string;
    address: string;
    addressLink: string;
    hours: string;
}

export class Brand implements BrandInterface {
    id: UuidValueObject;
    name: string;
    description: string;
    image: string;
    email: string;
    phone: string;
    address: string;
    addressLink: string;
    hours: string;

    constructor(
        id: UuidValueObject,
        name: string,
        description: string,
        image: string,
        email: string,
        phone: string,
        address: string,
        addressLink: string,
        hours: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.addressLink = addressLink;
        this.hours = hours;
    }
}
