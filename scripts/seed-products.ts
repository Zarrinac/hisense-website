/* eslint-disable no-console */
import 'dotenv/config';
import Module from 'module';
import path from 'node:path';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const toSlug = (id: string, slug?: string | null) =>
  slug && slug.trim().length > 0 ? slug : id.toLowerCase();
const toJsonField = (value: unknown): Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue =>
  value === null || value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue);
const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
const registerModuleStubs = () => {
  const originalResolveFilename = (Module as unknown as { _resolveFilename?: unknown })
    ._resolveFilename as
    | ((request: string, parent: unknown, isMain: unknown, options: unknown) => string)
    | undefined;

  if (!originalResolveFilename) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Module as any)._resolveFilename = function patchedResolve(
    request: string,
    parent: unknown,
    isMain: unknown,
    options: unknown,
  ) {
    if (request === 'next/image') {
      return path.resolve(process.cwd(), 'scripts/stubs/next-image.cjs');
    }
    if (request.startsWith('@/')) {
      return path.resolve(process.cwd(), request.replace('@/', ''));
    }
    return originalResolveFilename.call(this, request, parent, isMain, options);
  };
};
const registerAssetHooks = () => {
  const noop = () => null;
  const exts = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.mp4'];
  exts.forEach((ext) => {
    // @ts-expect-error - _extensions is a Node internals hook used here to stub asset imports
    Module._extensions[ext] = noop;
  });
};

async function seed() {
  registerModuleStubs();
  registerAssetHooks();
  const [{ normalizeContentProduct }, { TV_PRODUCTS }] = await Promise.all([
    import('../lib/api/products/normalizers'),
    import('../content/tvProducts'),
  ]);
  const normalized = TV_PRODUCTS.map(normalizeContentProduct);

  console.log(`Seeding ${normalized.length} products...`);

  for (const product of normalized) {
    const sizes = toStringArray(product.sizes);
    const connectivity = toStringArray(product.connectivity);
    const extras = toStringArray(product.extras);

    const createData: Prisma.ProductCreateInput = {
      id: product.id,
      slug: toSlug(product.id, product.slug),
      sku: product.sku ?? null,
      series: product.series,
      seriesLabel: product.seriesLabel ?? null,
      size: product.size ?? null,
      sizes,
      panel: product.panel,
      resolution: product.resolution,
      refreshRate: product.refreshRate,
      os: product.os,
      sound: product.sound,
      connectivity,
      tuner: product.tuner,
      extras,
      imageUrl: product.imageUrl,
      posterImageUrl: product.posterImageUrl ?? null,
      heroVideoUrl: product.heroVideoUrl ?? null,
      gallery: toJsonField(product.gallery ?? []),
      banners: toJsonField(product.banners ?? []),
      featureCards: toJsonField(product.featureCards ?? []),
      sectionGroups: toJsonField(product.sectionGroups ?? []),
      contentSections: toJsonField(product.contentSections ?? []),
      stackedSections: toJsonField(product.stackedSections ?? []),
      bottomStackedSections: toJsonField(product.bottomStackedSections ?? []),
      comparisonSections: toJsonField(product.comparisonSections ?? []),
      experienceSection: toJsonField(product.experienceSection),
      badges: toJsonField(product.badges ?? []),
      specs: toJsonField(product.specs ?? {}),
    };

    const updateData: Prisma.ProductUpdateInput = {
      slug: createData.slug,
      sku: createData.sku ?? null,
      series: createData.series,
      seriesLabel: createData.seriesLabel ?? null,
      size: createData.size ?? null,
      sizes: { set: sizes },
      panel: createData.panel,
      resolution: createData.resolution,
      refreshRate: createData.refreshRate,
      os: createData.os,
      sound: createData.sound,
      connectivity: { set: connectivity },
      tuner: createData.tuner,
      extras: { set: extras },
      imageUrl: createData.imageUrl,
      posterImageUrl: createData.posterImageUrl ?? null,
      heroVideoUrl: createData.heroVideoUrl ?? null,
      gallery: toJsonField(product.gallery ?? []),
      banners: toJsonField(product.banners ?? []),
      featureCards: toJsonField(product.featureCards ?? []),
      sectionGroups: toJsonField(product.sectionGroups ?? []),
      contentSections: toJsonField(product.contentSections ?? []),
      stackedSections: toJsonField(product.stackedSections ?? []),
      bottomStackedSections: toJsonField(product.bottomStackedSections ?? []),
      comparisonSections: toJsonField(product.comparisonSections ?? []),
      experienceSection: toJsonField(product.experienceSection),
      badges: toJsonField(product.badges ?? []),
      specs: toJsonField(product.specs ?? {}),
    };

    console.log(`- upserting ${product.id}`);
    await prisma.product.upsert({
      where: { id: product.id },
      update: updateData,
      create: createData,
    });

    // Replace copies to keep the latest content.
    await prisma.productCopy.deleteMany({ where: { productId: product.id } });
    const copies = Object.values(product.copy);
    await prisma.productCopy.createMany({
      data: copies.map((copy) => ({
        productId: product.id,
        locale: copy.locale,
        name: copy.name,
        tagline: copy.tagline,
        description: copy.description ?? null,
        highlights: copy.highlights ?? [],
        blocks: copy.blocks ?? {},
      })),
      skipDuplicates: true,
    });
  }

  console.log('Seed complete.');
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
