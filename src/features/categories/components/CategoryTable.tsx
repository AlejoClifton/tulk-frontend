'use client';

import * as React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { EditIcon, TrashIcon } from '@/assets/SvgContainer';
import { getAllCategoriesQueryOptions } from '@/features/categories/hooks/queries/getAllCategories.query-option';
import type { CategoryInterface } from '@/features/categories/interfaces/category.interface';
import { Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/components';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface CategoryTableProps {
    handleOpenModal: (category: CategoryInterface) => void;
    handleDelete: (id: string) => void;
    isLoading: boolean;
}

export function CategoryTable({ handleOpenModal, handleDelete, isLoading }: CategoryTableProps) {
    const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions);

    const columns: ColumnDef<CategoryInterface>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
            cell: (info) => <span className="block max-w-[130px] truncate">{info.getValue() as string}</span>,
        },
        {
            header: 'Estado',
            accessorKey: 'isActive',
            cell: (info) => (
                <StatusBadge
                    className="w-30"
                    variant={info.getValue() ? 'success' : 'error'}
                    isActive={info.getValue() as boolean}>
                    {info.getValue() ? 'Activo' : 'Inactivo'}
                </StatusBadge>
            ),
        },
        {
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex max-w-30 items-center justify-center gap-2 truncate text-center">
                    <Button
                        variant="success"
                        size="icon"
                        className="flex h-10 w-120 items-center justify-center"
                        onClick={() => handleOpenModal(row.original)}>
                        <EditIcon className="h-5 w-5" />
                    </Button>
                    <Button
                        variant={isLoading ? 'loading' : 'error'}
                        size="icon"
                        className="flex h-10 w-120 items-center justify-center"
                        onClick={() => handleDelete(row.original.id)}
                        disabled={isLoading}>
                        {isLoading ? <LoadingSpinner size={20} /> : <TrashIcon className="h-5 w-5" />}
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: categories,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return <LoadingSpinner size={20} />;
    }

    if (!categories || categories.length === 0) {
        return <div className="flex items-center justify-center">No hay categorías</div>;
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
