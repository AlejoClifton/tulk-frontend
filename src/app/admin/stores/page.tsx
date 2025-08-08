'use client';

import { useState } from 'react';

import { PlusIcon } from '@/assets/SvgContainer';
import { Button } from '@/components/ui/Button';
import { Subtitle } from '@/components/ui/Subtitle';
import { ModalStore } from '@/features/stores/components/ModalStore';
import { StoreTable } from '@/features/stores/components/StoreTable';
import type { StoreInterface } from '@/features/stores/interfaces/store.interface';

export default function StoresPage() {
    const [selectedStore, setSelectedStore] = useState<StoreInterface | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setSelectedStore(null);
        setIsModalOpen(true);
    };

    const handleEdit = (store: StoreInterface) => {
        setSelectedStore(store);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStore(null);
    };

    return (
        <main className="flex flex-col bg-slate-100 p-4 lg:ml-64 lg:p-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Subtitle variant="lg">Sucursales</Subtitle>
                    <Button variant="success" size="md" onClick={handleOpenModal} className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Agregar Sucursal
                    </Button>
                </div>
                <StoreTable onEdit={handleEdit} />
            </div>

            {isModalOpen && <ModalStore onClose={handleCloseModal} store={selectedStore || undefined} />}
        </main>
    );
}
