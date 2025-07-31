import { ProductInterface } from './product.entity';

export interface ProductRepository {
    getAll(): Promise<ProductInterface[]>;
    getById(id: string): Promise<ProductInterface>;
    create(product: ProductInterface, token: string): Promise<ProductInterface>;
    update(product: ProductInterface, token: string): Promise<ProductInterface>;
    delete(id: string, token: string): Promise<void>;
}
