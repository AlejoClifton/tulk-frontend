import { NextRequest, NextResponse } from 'next/server';

import { deleteImage, uploadImage } from '@/shared/lib/cloudinary';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;
        const folder = data.get('folder') as string;
        const publicId = data.get('publicId') as string;

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        if (!folder) {
            return NextResponse.json({ message: 'No folder provided' }, { status: 400 });
        }

        if (publicId) {
            try {
                await deleteImage(publicId);
                console.log('Previous image deleted:', publicId);
            } catch (error) {
                console.error('Error deleting previous image:', error);
            }
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const response = await uploadImage(buffer, folder);

        return NextResponse.json({
            url: response.secure_url,
            public_id: response.public_id,
        });
    } catch (error) {
        console.error('Error replacing image:', error);
        return NextResponse.json({ message: 'Error replacing image' }, { status: 500 });
    }
}
