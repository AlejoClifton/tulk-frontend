import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllCategoriesQueryOptions } from '@/features/categories/hooks/queries/getAllCategories.query-option';
import { CategoryInterface } from '@/features/categories/interfaces/category.interface';
import CustomSelect from '@/components/form/CustomSelect';
import { IOptions } from '@/interfaces/selectedOption.interface';

interface SelectListCategoriesProps {
    selectedValue: string;
    onSelect: (category: IOptions) => void;
}

const SelectListCategories = ({ onSelect, selectedValue }: SelectListCategoriesProps) => {
    const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions);

    const options = categories.map((category: CategoryInterface) => ({
        value: category.id,
        label: category.name,
    }));

    const selectedOption = options.find((option: IOptions) => option.value === selectedValue) || null;

    return <CustomSelect options={options} onSelect={onSelect} selectedValue={selectedOption} placeholder="Selecciona una categoría" />;
};

export default SelectListCategories;
