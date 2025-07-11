import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, Button } from '@/shared/components/index';

const Admin = () => {
    return (
        <div className="container mx-auto flex flex-col gap-4 p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Descripción</TableHeaderCell>
                        <TableHeaderCell>Categoría</TableHeaderCell>
                        <TableHeaderCell>Imagen</TableHeaderCell>
                        <TableHeaderCell>Imagenes</TableHeaderCell>
                        <TableHeaderCell>Estado</TableHeaderCell>
                        <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Lámpara de escritorio</TableCell>
                        <TableCell>Es una lámpara de escritorio</TableCell>
                        <TableCell>Lámparas</TableCell>
                        <TableCell>imagen.jpg</TableCell>
                        <TableCell>imagen2.jpg, imagen3.jpg</TableCell>
                        <TableCell>Activo</TableCell>
                        <TableCell>
                            <Button>Editar</Button>
                            <Button>Eliminar</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default Admin;
