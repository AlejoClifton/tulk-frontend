'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import OutsideClickHandler from '@shared/utils/OutsideClickHandler';
import { IOptions } from '@/shared/types/selectedOption.interface';

import { Text } from '@/shared/components';

interface CustomSelectProps<T> {
    options: T[];
    onSelect: (option: T) => void;
    selectedValue: T | null;
    placeholder?: string;
    variant?: 'primary' | 'secondary';
}

const variantClasses = {
    primary: 'bg-white text-black placeholder-text-gray-2 py-2 px-4',
    secondary: 'border border-gray-300 rounded-2xl py-2 px-4',
};

const CustomSelect = <T extends IOptions>({
    options,
    onSelect,
    selectedValue = null,
    placeholder = '',
    variant = 'primary',
}: CustomSelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: T) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                className={classNames(
                    'flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-all duration-300 border border-gray-300 rounded-md',
                    variantClasses[variant],
                )}
                onClick={toggleDropdown}
                type="button">
                <div className="flex items-center gap-2">
                    {selectedValue ? (
                        <Text variant="secondary">
                            {selectedValue.label}
                        </Text>
                    ) : (
                        <Text>{placeholder}</Text>
                    )}
                </div>
            </button>

            {isOpen && (
                <OutsideClickHandler onOutsideClick={toggleDropdown}>
                    <div
                        className="absolute top-2 right-0 z-50 w-[95%] overflow-y-auto bg-white text-black shadow-lg md:top-5 md:w-4/5"
                        onClick={(e) => e.stopPropagation()}>
                        {options.map((option) => {
                            const classes = classNames(
                                'flex items-center justify-start px-4 h-[2.8125rem] text-sm cursor-pointer transition-all duration-300 w-full hover:bg-gray-100 border-b border-gray-200',
                            );

                            return (
                                <button
                                    key={option.value}
                                    className={classes}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={option.isDisabled}
                                    type="button">
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </OutsideClickHandler>
            )}
        </div>
    );
};

export default CustomSelect;
