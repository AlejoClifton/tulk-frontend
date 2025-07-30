import { NextResponse } from 'next/server';

import { deleteImage, uploadImage } from '@/shared/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const folder = formData.get('folder') as string;
        const oldPublicId = formData.get('publicId') as string | null;
        const file = formData.get('file') as File;

        if (!folder || !file) {
            return NextResponse.json({ message: 'Folder and file are required' }, { status: 400 });
        }

        if (oldPublicId) {
            try {
                await deleteImage(oldPublicId);
            } catch (error) {
                console.warn('No se pudo eliminar la imagen anterior:', error);
            }
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadImage(buffer, folder);

        return NextResponse.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        console.error('Error reemplazando imagen:', error);
        return NextResponse.json({ message: 'Error replacing image' }, { status: 500 });
    }
}
