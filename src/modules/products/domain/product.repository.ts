import { ProductInterface } from './product.entity';

export type ProductUpdatePayload = Partial<ProductInterface> | FormData;

export interface ProductRepository {
    getAll(): Promise<ProductInterface[]>;
    getById(id: string): Promise<ProductInterface>;
    create(product: ProductInterface | FormData): Promise<ProductInterface>;
    update(product: ProductUpdatePayload): Promise<ProductInterface>;
    delete(id: string): Promise<void>;
}
