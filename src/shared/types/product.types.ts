import { ProductInterface, TechnicalSpecificationGroup } from '@/modules/products/domain/product.entity';

export type Benefit = { value: string };

export type ProductFormData = Omit<ProductInterface, 'benefits' | 'technicalSpecifications'> & {
    mainImageFile?: File | null;
    imagesFiles?: File[];
    imagesToDelete?: string[];
    benefits?: Benefit[];
    technicalSpecifications?: TechnicalSpecificationGroup[];
};
