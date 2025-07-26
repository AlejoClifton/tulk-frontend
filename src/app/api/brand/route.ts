import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const brandFilePath = path.join(process.cwd(), 'brand.json');
const brandImagesDir = path.join(process.cwd(), 'public', 'brand');

async function ensureDirectoryExists(dir: string) {
    try {
        await fs.access(dir);
    } catch (error) {
        await fs.mkdir(dir, { recursive: true });
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
