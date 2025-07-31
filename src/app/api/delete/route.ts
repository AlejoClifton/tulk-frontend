import { NextResponse } from 'next/server';

import { deleteImage } from '@/shared/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { publicIds } = data;

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
