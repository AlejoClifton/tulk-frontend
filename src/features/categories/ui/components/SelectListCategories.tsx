import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllCategoriesOptions } from '@/features/categories/application/getAllCategories.option';
import { CategoryInterface } from '@/features/categories/domain/category.entity';

import CustomSelect from '@/shared/components/ui/form/CustomSelect';
import { IOptions } from '@/shared/types/selectedOption.interface';

interface SelectListCategoriesProps {
    selectedValue: string;
    onSelect: (category: IOptions) => void;
}

const SelectListCategories = ({ onSelect, selectedValue }: SelectListCategoriesProps) => {
    const { data: categories } = useSuspenseQuery(getAllCategoriesOptions);

    const options = categories.map((category: CategoryInterface) => ({
        value: category.id,
        label: category.name,
    }));

    const selectedOption = options.find((option: IOptions) => option.value === selectedValue) || null;

    return <CustomSelect options={options} onSelect={onSelect} selectedValue={selectedOption} placeholder="Selecciona una categoría" />;
};

export default SelectListCategories;
