export function formatDate(stamp: number) {
    const date = new Date(stamp);
    return date.toLocaleString();
}