'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { toast } from 'sonner';

import { EditIcon, TrashIcon } from '@/assets/SvgContainer';
import { Table } from '@/components/table/Table';
import { TableBody } from '@/components/table/TableBody';
import { TableCell } from '@/components/table/TableCell';
import { TableHeader } from '@/components/table/TableHeader';
import { TableHeaderCell } from '@/components/table/TableHeaderCell';
import { TableRow } from '@/components/table/TableRow';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getAllStoresQueryOptions } from '@/features/stores/hooks/queries/getAllStores.query-option';
import { useStoreMutations } from '@/features/stores/hooks/queries/useStoreMutations';
import type { StoreInterface } from '@/features/stores/interfaces/store.interface';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

interface Props {
    onEdit: (store: StoreInterface) => void;
}

export function StoreTable({ onEdit }: Props) {
    const { data: stores = [] } = useQuery(getAllStoresQueryOptions);
    const { deleteStoreMutation } = useStoreMutations();

    const handleDelete = async (id: string) => {
        await deleteStoreMutation.mutateAsync(id);
        toast.success('Sucursal eliminada correctamente');
        trackUmamiEvent(ANALYTICS_EVENTS.DELETE_STORE, { id });
    };

    const columns: ColumnDef<StoreInterface>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Dirección',
            accessorKey: 'address',
        },
        {
            header: 'Teléfono',
            accessorKey: 'phone',
        },
        {
            header: 'Mapa',
            accessorKey: 'mapUrl',
        },
        {
            header: 'Estado',
            accessorKey: 'isActive',
            cell: ({ row }) => (
                <StatusBadge isActive={row.original.isActive}>
                    {row.original.isActive ? 'Activo' : 'Inactivo'}
                </StatusBadge>
            ),
        },
        {
            header: 'Acciones',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="success" size="md" onClick={() => onEdit(row.original)}>
                        <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="error"
                        size="md"
                        onClick={() => handleDelete(row.original.id)}
                        className="flex items-center gap-2">
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: stores,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (stores.length === 0) {
        return <div className="flex items-center justify-center">No hay sucursales</div>;
    }

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHeaderCell key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="px-6 py-4 align-middle whitespace-nowrap text-gray-900">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
