import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath: string) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'products',
    });
}

export async function deleteImage(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
}
