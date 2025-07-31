import { NextResponse } from 'next/server';

import { uploadImage } from '@/shared/lib/cloudinary';

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