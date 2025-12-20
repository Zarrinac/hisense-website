import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { useLocalContent } from '@/lib/contentSource';
import { findFallbackProduct, normalizeDbProduct } from '@/lib/api/products/normalizers';
import { mapProductMedia } from '@/lib/api/products/mediaPaths';

type DataSource = 'database' | 'fallback';

const DEFAULT_HEADERS = {
  'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
};

const loadProduct = async (idOrSlug: string) => {
  if (!useLocalContent && prisma) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
        include: { copies: true },
      });

      if (product) {
        return { product: normalizeDbProduct(product), source: 'database' as DataSource };
      }
    } catch (error) {
      console.error('[api/products/:id] database fetch failed', error);
    }
  }

  const fallback = findFallbackProduct(idOrSlug);
  if (fallback) {
    return { product: fallback, source: 'fallback' as DataSource };
  }

  return { product: null, source: 'fallback' as DataSource };
};

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolved = await params;
  const idOrSlug = resolved.id;
  const { product, source } = await loadProduct(idOrSlug);

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(mapProductMedia(product), {
    status: 200,
    headers: {
      ...DEFAULT_HEADERS,
      'X-Data-Source': source,
    },
  });
}
