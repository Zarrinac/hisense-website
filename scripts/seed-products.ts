/* eslint-disable no-console */
import Module from 'module';
import fs from 'node:fs';
import path from 'node:path';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import type { TvProduct } from '@/types/tv';
import type { WmProduct } from '@/types/wm';

const envFiles = ['.env.local', '.env', '.env.production'];
for (const file of envFiles) {
  const full = path.resolve(process.cwd(), file);
  if (fs.existsSync(full)) {
    dotenv.config({ path: full });
    break;
  }
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const toSlug = (id: string, slug?: string | null) =>
  slug && slug.trim().length > 0 ? slug : id.toLowerCase();
const toJsonField = (value: unknown): Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue =>
  value === null || value === undefined ? Prisma.DbNull : (value as Prisma.InputJsonValue);
const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
type ResolveFilename = (
  request: string,
  parent: unknown,
  isMain: unknown,
  options: unknown,
) => string;
type ModuleInternals = typeof Module & {
  _resolveFilename?: ResolveFilename;
  _extensions: NodeJS.RequireExtensions;
};
const moduleInternals = Module as ModuleInternals;

const registerModuleStubs = () => {
  const originalResolveFilename = moduleInternals._resolveFilename;

  if (!originalResolveFilename) return;

  moduleInternals._resolveFilename = function patchedResolve(
    request: string,
    parent: unknown,
    isMain: unknown,
    options: unknown,
  ) {
    if (request === 'next/image') {
      return path.resolve(process.cwd(), 'scripts/stubs/next-image.cjs');
    }
    if (request.startsWith('@/')) {
      const basePath = path.resolve(process.cwd(), request.replace('@/', ''));
      const tsPath = `${basePath}.ts`;
      if (fs.existsSync(tsPath)) return tsPath;
      const jsPath = `${basePath}.js`;
      if (fs.existsSync(jsPath)) return jsPath;
      return basePath;
    }
    return originalResolveFilename.call(this, request, parent, isMain, options);
  };
};
const registerAssetHooks = () => {
  const stubExtension: NodeJS.RequireExtensions[string] = () => null;
  const exts = ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.mp4'];
  exts.forEach((ext) => {
    moduleInternals._extensions[ext] = stubExtension;
  });
};

type ContentProduct = TvProduct | WmProduct;

const isContentProduct = (value: unknown): value is ContentProduct => {
  if (!value || typeof value !== 'object') return false;
  const record = value as { id?: unknown; copy?: unknown };
  if (typeof record.id !== 'string') return false;
  if (!record.copy || typeof record.copy !== 'object') return false;
  return true;
};

async function seed() {
  registerModuleStubs();
  registerAssetHooks();
  const { normalizeContentProduct } = await import('../lib/api/products/normalizers');
  const tvModuleUnknown = (await import(
    path.resolve(process.cwd(), 'content/tvProducts.ts')
  )) as unknown;
  const { TV_PRODUCTS } = tvModuleUnknown as { TV_PRODUCTS: unknown };
  if (!Array.isArray(TV_PRODUCTS)) {
    throw new Error('TV_PRODUCTS content module did not export a product array');
  }
  const tvProducts = TV_PRODUCTS.filter(isContentProduct);
  if (tvProducts.length !== TV_PRODUCTS.length) {
    throw new Error('TV_PRODUCTS contains invalid product entries');
  }
  const wmModuleUnknown = (await import(
    path.resolve(process.cwd(), 'content/WmProducts.ts')
  )) as unknown;
  const { WM_PRODUCTS } = wmModuleUnknown as { WM_PRODUCTS: unknown };
  if (!Array.isArray(WM_PRODUCTS)) {
    throw new Error('WM_PRODUCTS content module did not export a product array');
  }
  const wmProducts = WM_PRODUCTS.filter(isContentProduct);
  if (wmProducts.length !== WM_PRODUCTS.length) {
    throw new Error('WM_PRODUCTS contains invalid product entries');
  }
  const normalizedTv = tvProducts.map((product) => normalizeContentProduct(product, 'TVS'));
  const normalizedWm = wmProducts.map((product) => normalizeContentProduct(product, 'WMS'));
  const normalized = [...normalizedTv, ...normalizedWm];

  console.log(`Seeding ${normalized.length} products...`);

  for (const product of normalized) {
    const sizes = toStringArray(product.sizes);
    const connectivity = toStringArray(product.connectivity);
    const extras = toStringArray(product.extras);
    const tvSpecData =
      product.category === 'TVS'
        ? {
            panel: product.panel,
            resolution: product.resolution,
            refreshRate: product.refreshRate,
            os: product.os,
            sound: product.sound,
            connectivity,
            tuner: product.tuner,
          }
        : null;

    const createData: Prisma.ProductCreateInput = {
      id: product.id,
      slug: toSlug(product.id, product.slug),
      category: product.category,
      sku: product.sku ?? null,
      series: product.series,
      seriesLabel: product.seriesLabel ?? null,
      size: product.size ?? null,
      sizes,
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
      ...(tvSpecData ? { tvSpec: { create: tvSpecData } } : {}),
    };

    const updateData: Prisma.ProductUpdateInput = {
      slug: createData.slug,
      category: createData.category,
      sku: createData.sku ?? null,
      series: createData.series,
      seriesLabel: createData.seriesLabel ?? null,
      size: createData.size ?? null,
      sizes: { set: sizes },
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
      ...(tvSpecData
        ? {
            tvSpec: {
              upsert: {
                update: tvSpecData,
                create: tvSpecData,
              },
            },
          }
        : {}),
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
