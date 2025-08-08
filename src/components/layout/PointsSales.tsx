'use client';

import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import { Subtitle, Text } from '@/components';
import { getAllStoresQueryOptions } from '@/features/stores/hooks/queries/getAllStores.query-option';

const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <div className="w-2/3 rounded-lg bg-gray-800" />,
});

export default function PointsSales() {
    const { data: stores = [] } = useSuspenseQuery(getAllStoresQueryOptions);
    const [selectedStore, setSelectedStore] = useState<string | null>(null);

    const center =
        stores.length > 0
            ? [
                  stores.reduce((sum, store) => sum + store.latitude, 0) / stores.length,
                  stores.reduce((sum, store) => sum + store.longitude, 0) / stores.length,
              ]
            : [-34.6037, -58.3816];

    const handleStoreClick = (storeId: string) => {
        if (selectedStore === storeId) {
            setSelectedStore(null);
            setTimeout(() => {
                setSelectedStore(storeId);
            }, 0);
        } else {
            setSelectedStore(storeId);
        }
    };

    if (stores.length === 0) return null;

    return (
        <div className="container mx-auto flex flex-col gap-4 py-16">
            <div className="flex flex-col items-center gap-4">
                <Subtitle variant="xl">Puntos de Venta</Subtitle>
                <Text size="xl" variant="secondary" className="max-w-xl text-center">
                    Encuéntranos en las siguientes sucursales
                </Text>
            </div>
            <div className="flex h-[600px] gap-4">
                <div className="w-1/3 overflow-y-auto rounded-lg bg-gray-800 p-4">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            onClick={() => handleStoreClick(store.id)}
                            className={`mb-2 cursor-pointer rounded-lg p-4 transition-colors ${
                                selectedStore === store.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                            }`}>
                            <h3 className="font-bold text-white">{store.name}</h3>
                            <p className="text-sm text-gray-300">{store.address}</p>

                            {store.phone && <p className="text-sm text-gray-300">Tel: {store.phone}</p>}
                        </div>
                    ))}
                </div>
                <Map
                    stores={stores}
                    center={center as [number, number]}
                    selectedStore={selectedStore}
                    onStoreClick={handleStoreClick}
                />
            </div>
        </div>
    );
}
