import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { FALLBACK_PRODUCTS, normalizeDbProducts } from '@/lib/api/products/normalizers';
import type { ApiProduct } from '@/lib/api/products/types';

const DEFAULT_HEADERS = {
  'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
};

type DataSource = 'database' | 'fallback';

const loadProducts = async (): Promise<{ products: ApiProduct[]; source: DataSource }> => {
  if (process.env.DATABASE_URL) {
    try {
      const products = await prisma.product.findMany({
        orderBy: { series: 'asc' },
        include: { copies: true },
      });
      if (products.length > 0) {
        return { products: normalizeDbProducts(products), source: 'database' };
      }
    } catch (error) {
      console.error('[api/products] database fetch failed', error);
    }
  }

  return { products: FALLBACK_PRODUCTS, source: 'fallback' };
};

export async function GET() {
  const { products, source } = await loadProducts();

  return NextResponse.json(products, {
    status: 200,
    headers: {
      ...DEFAULT_HEADERS,
      'X-Data-Source': source,
    },
  });
}
