'use client';

import { useState } from 'react';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import { Input } from '@/components/form/Input';
import { Label } from '@/components/form/Label';
import { Button } from '@/components/ui/Button';
import { useStoreMutations } from '@/features/stores/hooks/queries/useStoreMutations';
import type { CreateStoreDTO, StoreInterface } from '@/features/stores/interfaces/store.interface';

import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Props {
    store?: StoreInterface;
    onClose: () => void;
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e: L.LeafletMouseEvent) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export function FormStore({ store, onClose }: Props) {
    const [formData, setFormData] = useState<CreateStoreDTO>({
        name: store?.name || '',
        address: store?.address || '',
        latitude: store?.latitude || -34.6037,
        longitude: store?.longitude || -58.3816,
        phone: store?.phone || '',
        mapUrl: store?.mapUrl || '',
    });

    const { createStoreMutation, updateStoreMutation } = useStoreMutations();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (store) {
                await updateStoreMutation.mutateAsync({
                    id: store.id,
                    ...formData,
                });
            } else {
                await createStoreMutation.mutateAsync(formData);
            }
            onClose();
        } catch (error) {
            console.error('Error saving store:', error);
        }
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                />
            </div>

            <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    required
                />
            </div>

            <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />
            </div>

            <div>
                <Label htmlFor="mapUrl">URL del mapa (Google Maps)</Label>
                <Input
                    id="mapUrl"
                    value={formData.mapUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mapUrl: e.target.value }))}
                />
            </div>

            <div className="relative h-[300px]">
                <Label>Ubicación (haz clic en el mapa para seleccionar)</Label>
                <MapContainer
                    center={[formData.latitude, formData.longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[formData.latitude, formData.longitude]} />
                    <MapEvents onLocationSelect={handleLocationSelect} />
                </MapContainer>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="error" onClick={onClose} size="md">
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={createStoreMutation.isPending || updateStoreMutation.isPending}
                    size="md">
                    {store ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    );
}
