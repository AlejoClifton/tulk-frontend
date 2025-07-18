import * as React from 'react';
import Image from 'next/image';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import type { ProductInterface } from '@/features/products/domain/product.entity';
import { Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/shared/components';
import { EditIcon, TrashIcon } from '@/shared/components/icons/SvgContainer';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllProductsOptions } from '../../application/queries/getAllProducts.option';
import { getAllCategoriesOptions } from '@/features/categories/application/getAllCategories.option';
import { CategoryInterface } from '@/features/categories/domain/category.entity';

interface ProductTableProps {
    handleOpenModal: (product: ProductInterface) => void;
    handleDelete: (id: string) => void;
}

export function ProductTable({ handleOpenModal, handleDelete }: ProductTableProps) {
    const { data: products } = useSuspenseQuery(getAllProductsOptions);
    const { data: categories } = useSuspenseQuery(getAllCategoriesOptions);

    const columns: ColumnDef<ProductInterface>[] = [
        {
            header: 'Nombre',
            accessorKey: 'name',
            cell: (info) => <span className="block max-w-[130px] truncate">{info.getValue() as string}</span>,
        },
        {
            header: 'Descripción',
            accessorKey: 'description',
            cell: (info) => <span className="block max-w-[130px] truncate">{info.getValue() as string}</span>,
        },
        {
            header: 'Categoría',
            accessorKey: 'categoryId',
            cell: (info) => {
                const categoryId = info.getValue() as string;
                const category = categories?.find((category: CategoryInterface) => category.id === categoryId);
                return <span className="block max-w-[120px] truncate">{category?.name}</span>;
            },
        },
        {
            header: 'Imagen',
            accessorKey: 'mainImageUrl',
            cell: (info) =>
                info.getValue() ? (
                    <Image
                        src={info.getValue() as string}
                        alt=""
                        className="h-12 w-30 rounded border border-gray-200 object-cover"
                        width={100}
                        height={100}
                    />
                ) : null,
        },
        {
            header: 'Imágenes',
            accessorKey: 'imagesUrl',
            cell: (info) => {
                const images = info.getValue() as string[];
                return (
                    <div className="flex max-w-40 gap-2 truncate">
                        {images?.map((src, idx) => (
                            <Image
                                key={idx}
                                src={src}
                                alt=""
                                className="h-10 w-10 rounded border border-gray-200 object-cover"
                                width={100}
                                height={100}
                            />
                        ))}
                    </div>
                );
            },
        },
        {
            header: 'Estado',
            accessorKey: 'isActive',
            cell: (info) => (
                <StatusBadge variant={info.getValue() ? 'success' : 'error'} isActive={info.getValue() as boolean}>
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
                        variant="error"
                        size="icon"
                        className="flex h-10 w-120 items-center justify-center"
                        onClick={() => handleDelete(row.original.id)}>
                        <TrashIcon className="h-5 w-5" />
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

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
