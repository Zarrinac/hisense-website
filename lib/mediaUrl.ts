export const mediaUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  if (!path.startsWith('/')) path = `/${path}`;

  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? '';
  return base ? `${base}${path}` : path;
};
