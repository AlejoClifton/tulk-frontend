import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';
import { BrandInterface } from '@features/brand/domain/brand.entity';

export class BrandApi {
    private readonly adapter: BackendAdapter;
    private readonly url: string;

    constructor() {
        this.adapter = new BackendAdapter();
        this.url = '/brands';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getBrands(token: string): Promise<BrandInterface> {
        // TODO: Descomentar cuando la API esté lista
        // try {
        //   const response = await this.adapter.get<BrandInterface>(this.url, token);
        //   return response;
        // } catch (error) {
        //   console.error("Error fetching brands:", error);
        //   throw error;
        // }

        // Simulación de datos ficticios mientras la API no esté lista
        const mockBrand: BrandInterface = {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Tulk',
            description: 'Estamos haciendo un proyecto de prueba',
            image: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Nike',
            email: 'contact@tulk.com.ar',
            phone: '+541123871729',
            address: 'Sarmiento 953, Garin, Buenos Aires, Argentina',
            addressLink: 'https://maps.app.goo.gl/6AnqbxJ6D2Hknhdk8',
            hours: ['Lunes a Viernes: 9:00 - 18:00', 'Sábado: 9:00 - 13:00', 'Domingo: Cerrado'],
        };

        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500));

        return mockBrand;
    }
}
