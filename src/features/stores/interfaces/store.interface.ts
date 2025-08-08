export interface StoreInterface {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phone?: string | null;
    mapUrl?: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateStoreDTO {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phone?: string;
    mapUrl?: string;
}

export interface UpdateStoreDTO extends CreateStoreDTO {
    id: string;
    isActive?: boolean;
}
