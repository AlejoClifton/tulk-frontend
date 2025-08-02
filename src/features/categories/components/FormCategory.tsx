'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { CategoryInterface } from '@/features/categories/interfaces/category.interface';
import { Button, Input, Label } from '@/components';

const formSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface FormCategoryProps {
    category: CategoryInterface;
    onSubmit: (values: FormValues) => void;
    isLoading: boolean;
}

export const FormCategory = ({ category, onSubmit, isLoading }: FormCategoryProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name || '',
            isActive: category?.isActive || true,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register('name')} placeholder="Nombre de la categoría" />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" {...register('isActive')} className="h-4 w-4" />
                <Label htmlFor="isActive">Activa</Label>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full" size="md">
                {isLoading ? 'Guardando...' : category.id ? 'Actualizar' : 'Crear'}
            </Button>
        </form>
    );
};
