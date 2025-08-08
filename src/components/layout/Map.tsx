'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import type { StoreInterface } from '@/features/stores/interfaces/store.interface';

interface MapProps {
    stores: StoreInterface[];
    center: [number, number];
    selectedStore: string | null;
    onStoreClick: (storeId: string, lat: number, lng: number) => void;
}

export default function Map({ stores, center, selectedStore, onStoreClick }: MapProps) {
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);

    return (
        <div className="w-2/3">
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stores.map((store) => (
                    <Marker
                        key={store.id}
                        position={[store.latitude, store.longitude]}
                        eventHandlers={{
                            click: () => onStoreClick(store.id, store.latitude, store.longitude),
                        }}>
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
    );
}
