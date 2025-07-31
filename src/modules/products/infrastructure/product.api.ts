import { ProductInterface, ProductRepository } from '@/modules/products/domain';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class ProductApi implements ProductRepository {
    private readonly backendAdapter: BackendAdapter;
    private readonly url: string;

    constructor() {
        this.backendAdapter = new BackendAdapter();
        this.url = '/products';
    }

    async getAll(): Promise<ProductInterface[]> {
        const products = await this.backendAdapter.get<ProductInterface[]>(this.url);
        return products;
    }

    async getById(id: string): Promise<ProductInterface> {
        console.log(`${this.url}/${id}`);
        const product = await this.backendAdapter.get<ProductInterface>(`${this.url}/${id}`);

        return product;
    }

    async create(product: ProductInterface, token: string): Promise<ProductInterface> {
        const newProduct = await this.backendAdapter.postWithData<ProductInterface>(this.url, product, token);
        return newProduct;
    }

    async update(product: ProductInterface, token: string): Promise<ProductInterface> {
        const updatedProduct = await this.backendAdapter.putWithData<ProductInterface>(this.url, product, token);
        return updatedProduct;
    }

    async delete(id: string, token: string): Promise<void> {
        await this.backendAdapter.delete(`${this.url}/${id}`, token);
    }
}
