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

    async create(product: ProductInterface | FormData): Promise<ProductInterface> {
        const newProduct = await this.backendAdapter.postWithData<ProductInterface>(this.url, product, this.token);
        return newProduct;
    }

    async update(id: string, product: ProductUpdatePayload): Promise<ProductInterface> {
        if (product instanceof FormData) {
            product.append('_method', 'PUT');
            const updatedProduct = await this.backendAdapter.postWithData<ProductInterface>(
                `${this.url}/${id}`,
                product,
                this.token,
            );
            return updatedProduct;
        }

        const updatedProduct = await this.backendAdapter.putWithData<ProductInterface>(
            `${this.url}/${id}`,
            product,
            this.token,
        );
        return updatedProduct;
    }

    async delete(id: string): Promise<void> {
        await this.backendAdapter.delete(`${this.url}/${id}`, this.token);
    }
}
