'use client';

import { Modal } from '@/components/layout/Modal';
import { StoreInterface } from '@/features/stores/interfaces/store.interface';

import { FormStore } from './FormStore';

interface Props {
    onClose: () => void;
    store?: StoreInterface;
}

export function ModalStore({ onClose, store }: Props) {
    return (
        <Modal variant="primary" onClose={onClose} title={store ? 'Editar Punto de Venta' : 'Nuevo Punto de Venta'}>
            <FormStore store={store} onClose={onClose} />
        </Modal>
    );
}
