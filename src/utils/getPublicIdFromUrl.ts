export function getPublicIdFromUrl(url: string): string | null {
    try {
        const withoutExtension = url.substring(0, url.lastIndexOf('.'));
        const parts = withoutExtension.split('/');
        const fileName = parts.pop();
        const folder = parts.pop();

        return folder && fileName ? `${folder}/${fileName}` : null;
    } catch {
        return null;
    }
}
