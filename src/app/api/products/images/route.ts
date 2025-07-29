import { writeFile } from 'fs/promises';
import path from 'path';

import { NextResponse } from 'next/server';

import { deleteImage, uploadImage } from '@/shared/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const files: File[] = data.getAll('files') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ message: 'No files provided' }, { status: 400 });
        }

        const imageUrls = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filePath = path.join(process.cwd(), 'public', file.name);
            await writeFile(filePath, buffer);

            const response = await uploadImage(filePath);
            imageUrls.push(response.secure_url);
        }

        return NextResponse.json({ urls: imageUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json({ message: 'Error uploading images' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { urls } = await request.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
        }

        for (const url of urls) {
            const publicId = url.split('/').pop()?.split('.')[0];
            if (publicId) {
                await deleteImage(`products/${publicId}`);
            }
        }

        return NextResponse.json({ message: 'Images deleted successfully' });
    } catch (error) {
        console.error('Error deleting images:', error);
        return NextResponse.json({ message: 'Error deleting images' }, { status: 500 });
    }
} 