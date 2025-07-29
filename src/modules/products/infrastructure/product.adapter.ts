import { ProductInterface, ProductRepository, ProductUpdatePayload } from '@/modules/products/domain';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class ProductAdapter implements ProductRepository {
    private readonly backendAdapter: BackendAdapter;
    private readonly token: string;
    private readonly url: string;

    constructor(token: string) {
        this.token = token;
        this.backendAdapter = new BackendAdapter();
        this.url = '/products';
    }

    async getAll(): Promise<ProductInterface[]> {
        const products = await this.backendAdapter.get<ProductInterface[]>(this.url, this.token);
        return products;
    }

    async create(product: ProductInterface): Promise<ProductInterface> {
        const newProduct = await this.backendAdapter.postWithData<ProductInterface>(this.url, product, this.token);
        return newProduct;
    }

    async update(product: ProductUpdatePayload): Promise<ProductInterface> {
        const updatedProduct = await this.backendAdapter.putWithData<ProductInterface>(this.url, product, this.token);
        return updatedProduct;
    }

    async delete(id: string): Promise<void> {
        await this.backendAdapter.delete(`${this.url}/${id}`, this.token);
    }
}
