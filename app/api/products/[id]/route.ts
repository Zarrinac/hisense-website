import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { findFallbackProduct, normalizeDbProduct } from '@/lib/api/products/normalizers';

const DEFAULT_HEADERS = {
  'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
};

type DataSource = 'database' | 'fallback';

const getProduct = async (
  idOrSlug: string,
): Promise<{ product: ReturnType<typeof normalizeDbProduct> | null; source: DataSource }> => {
  if (process.env.DATABASE_URL) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          OR: [
            { id: { equals: idOrSlug, mode: 'insensitive' } },
            { slug: { equals: idOrSlug, mode: 'insensitive' } },
          ],
        },
        include: { copies: true },
      });

      if (product) {
        return { product: normalizeDbProduct(product), source: 'database' };
      }
    } catch (error) {
      console.error(`[api/products/${idOrSlug}] database fetch failed`, error);
    }
  }

  const fallback = findFallbackProduct(idOrSlug);
  if (fallback) {
    return { product: fallback, source: 'fallback' };
  }

  return { product: null, source: 'fallback' };
};

export async function GET(_request: Request, { params }: { params: { id?: string } }) {
  const id = params?.id;

  if (!id) {
    return NextResponse.json(
      { error: 'Product id is required' },
      { status: 400, headers: DEFAULT_HEADERS },
    );
  }

  const { product, source } = await getProduct(id);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404, headers: DEFAULT_HEADERS },
    );
  }

  return NextResponse.json(product, {
    status: 200,
    headers: {
      ...DEFAULT_HEADERS,
      'X-Data-Source': source,
    },
  });
}
