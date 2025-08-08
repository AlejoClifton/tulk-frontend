'use client';

import { useState, useRef } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { Subtitle, Text } from '@/components';
import { getAllStoresQueryOptions } from '@/features/stores/hooks/queries/getAllStores.query-option';

import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function PointsSales() {
    const { data: stores = [] } = useSuspenseQuery(getAllStoresQueryOptions);
    const [selectedStore, setSelectedStore] = useState<string | null>(null);
    const mapRef = useRef<L.Map | null>(null);

    const center =
        stores.length > 0
            ? [
                  stores.reduce((sum, store) => sum + store.latitude, 0) / stores.length,
                  stores.reduce((sum, store) => sum + store.longitude, 0) / stores.length,
              ]
            : [-34.6037, -58.3816];

    const handleStoreClick = (storeId: string, lat: number, lng: number) => {
        setSelectedStore(storeId);
        mapRef.current?.setView([lat, lng], 16);
    };

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
                            onClick={() => handleStoreClick(store.id, store.latitude, store.longitude)}
                            className={`mb-2 cursor-pointer rounded-lg p-4 transition-colors ${
                                selectedStore === store.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                            }`}>
                            <h3 className="font-bold text-white">{store.name}</h3>
                            <p className="text-sm text-gray-300">{store.address}</p>

                            {store.phone && <p className="text-sm text-gray-300">Tel: {store.phone}</p>}
                        </div>
                    ))}
                </div>
                {/* Mapa */}
                <div className="w-2/3">
                    <MapContainer
                        ref={mapRef}
                        center={center as [number, number]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        className="rounded-lg">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {stores.map((store) => (
                            <Marker key={store.id} position={[store.latitude, store.longitude]}>
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold">{store.name}</h3>
                                        <p>{store.address}</p>
                                        {store.phone && <p>Tel: {store.phone}</p>}
                                        {store.mapUrl && (
                                            <a href={store.mapUrl} target="_blank" rel="noopener noreferrer">
                                                Ver en Google Maps
                                            </a>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
