export const mediaUrl = (path: string) => {
  const baseRaw = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '';
  const base = baseRaw.endsWith('/') ? baseRaw.slice(0, -1) : baseRaw;
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};
