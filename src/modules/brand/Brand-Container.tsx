import React from 'react';
import { BrandContactInfo, BrandForm } from './components';

const BrandContainer = () => {
    return (
        <div className="my-8 flex flex-col gap-8 md:flex-row md:justify-center">
            <BrandForm />
            <BrandContactInfo />
        </div>
    );
};

export default BrandContainer;
