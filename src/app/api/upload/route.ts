import { NextResponse } from 'next/server';

import { deleteImage, uploadImage } from '@/shared/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const files = data.getAll('files') as File[];
        const folder = data.get('folder') as string;

        if (!folder) {
            return NextResponse.json({ message: 'No folder provided' }, { status: 400 });
        }

        if (!files || files.length === 0) {
            return NextResponse.json({ message: 'No files provided' }, { status: 400 });
        }

        const uploads = await Promise.all(
            files.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const response = await uploadImage(buffer, folder);
                return {
                    url: response.secure_url,
                    public_id: response.public_id,
                };
            }),
        );

        return NextResponse.json({ uploads });
    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json({ message: 'Error uploading images' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { publicIds } = await request.json();

        if (!Array.isArray(publicIds) || publicIds.length === 0) {
            return NextResponse.json({ message: 'Invalid publicIds' }, { status: 400 });
        }

        await Promise.all(publicIds.map((id) => deleteImage(id)));

        return NextResponse.json({ message: 'Images deleted successfully' });
    } catch (error) {
        console.error('Error deleting images:', error);
        return NextResponse.json({ message: 'Error deleting images' }, { status: 500 });
    }
}
