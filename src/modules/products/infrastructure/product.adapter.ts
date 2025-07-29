import { auth } from '@/auth';
import { ProductInterface, ProductRepository, ProductUpdatePayload } from '@/modules/products/domain';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class ProductAdapter implements ProductRepository {
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

    async create(product: ProductInterface): Promise<ProductInterface> {
        const session = await auth();

        const newProduct = await this.backendAdapter.postWithData<ProductInterface>(
            this.url,
            product,
            session?.user.accessToken || '',
        );
        return newProduct;
    }

    async update(product: ProductUpdatePayload): Promise<ProductInterface> {
        const session = await auth();

        const updatedProduct = await this.backendAdapter.putWithData<ProductInterface>(
            this.url,
            product,
            session?.user.accessToken || '',
        );
        return updatedProduct;
    }

    async delete(id: string): Promise<void> {
        const session = await auth();

        await this.backendAdapter.delete(`${this.url}/${id}`, session?.user.accessToken || '');
    }
}
