import { promises as fs } from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

const brandFilePath = path.join(process.cwd(), 'brand.json');
const brandImagesDir = path.join(process.cwd(), 'public', 'brand');

async function ensureDirectoryExists(dir: string) {
    try {
        await fs.access(dir);
    } catch (error: unknown) {
        await fs.mkdir(dir, { recursive: true });
        console.error('Error al crear el directorio:', error);
    }
}

async function getBrandData() {
    try {
        await ensureDirectoryExists(brandImagesDir);
        const data = await fs.readFile(brandFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al obtener los datos de la marca:', error);
        return null;
    }
}

export async function GET() {
    const brand = await getBrandData();
    return NextResponse.json(brand);
}
