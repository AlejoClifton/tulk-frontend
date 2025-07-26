import { ProductInterface } from './product.entity';

export type ProductUpdatePayload = Partial<ProductInterface> | FormData;

export interface ProductRepository {
    getAll(): Promise<ProductInterface[]>;
    create(product: ProductInterface | FormData): Promise<ProductInterface>;
    update(id: string, product: ProductUpdatePayload): Promise<ProductInterface>;
    delete(id: string): Promise<void>;
} 