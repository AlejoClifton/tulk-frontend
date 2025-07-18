import { deleteProduct as deleteProductApi } from '@/features/products/infrastructure/product-api';

export const deleteProductCommand = async (id: string) => {
    const res = await deleteProductApi(id);

    return res;
};
