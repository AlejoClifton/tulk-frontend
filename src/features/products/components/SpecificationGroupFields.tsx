import React from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { TrashIcon } from '@/assets/SvgContainer';
import { Button, Input } from '@/components';
import { ProductFormData } from '@/interfaces/product.types';

interface SpecificationGroupFieldsProps {
    groupIndex: number;
    removeGroup: (index: number) => void;
}

export const SpecificationGroupFields = ({ groupIndex, removeGroup }: SpecificationGroupFieldsProps) => {
    const { control, register } = useFormContext<ProductFormData>();

    const {
        fields: specFields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: `technicalSpecification.${groupIndex}.specifications`,
    });

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <Input
                    {...register(`technicalSpecification.${groupIndex}.title`)}
                    placeholder="Título del Grupo (ej. Potencia y Rendimiento)"
                    className="flex-grow font-semibold"
                />
                <Button type="button" variant="error" onClick={() => removeGroup(groupIndex)} size="icon">
                    <TrashIcon name="close" className="h-4 w-4" />
                </Button>
            </div>
            {specFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 pl-4">
                    <Input
                        {...register(`technicalSpecification.${groupIndex}.specifications.${index}.key`)}
                        placeholder="Clave (ej. Potencia térmica)"
                        className="w-1/3"
                    />
                    <Input
                        {...register(`technicalSpecification.${groupIndex}.specifications.${index}.value`)}
                        placeholder="Valor (ej. 5000 W)"
                        className="flex-grow"
                    />
                    <Button type="button" variant="error" onClick={() => remove(index)} size="icon">
                        <TrashIcon name="close" className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button type="button" onClick={() => append({ key: '', value: '' })} className="self-start" size="md">
                Añadir Especificación
            </Button>
        </div>
    );
};
