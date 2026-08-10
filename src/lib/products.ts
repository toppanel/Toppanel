import productsData from "@/content/products.json";

export type Model = {
  slug: string;
  code: string;
  codeS?: string;
  name: string;
  nameKo: string;
  /** Full public paths of real uploaded photos for this model. First is used as the cover. */
  images?: string[];
};

export type ProductCategory = {
  slug: string;
  label: string;
  labelSub: string;
  description: string;
  models: Model[];
  /** Full public path of a real uploaded cover photo for this category. */
  image?: string;
  /** Shared pool of full public paths used for any model in this category that doesn't have its own `images` yet. */
  fallbackImages?: string[];
};

// Fallback image used until a real product photo exists for a given model/category.
export const FALLBACK_IMAGE = "/images/products/placeholder.svg";

export const PRODUCT_CATEGORIES: ProductCategory[] = productsData.categories as ProductCategory[];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function getCategoryImages(category: ProductCategory): string[] {
  const images = category.fallbackImages;
  return images?.length ? images : [FALLBACK_IMAGE];
}

// Look up which category a model actually belongs to (rather than guessing from
// the slug), so the right fallback pool is used even for slugs without a dash.
function getModelCategory(model: Model): ProductCategory {
  return PRODUCT_CATEGORIES.find((c) => c.models.includes(model)) ?? PRODUCT_CATEGORIES[0];
}

export function getModelImage(model: Model): string {
  if (model.images?.length) return model.images[0];
  const images = getCategoryImages(getModelCategory(model));
  return images[hashString(model.slug) % images.length];
}

export function getCategoryImage(category: ProductCategory): string {
  if (category.image) return category.image;
  const images = getCategoryImages(category);
  return images[hashString(category.slug) % images.length];
}

// A model's gallery. Models with real uploaded photos (model.images) show exactly
// those — no padding, no unrelated photos mixed in. Models without real photos yet
// fall back to a hash-picked sample from the category's shared placeholder pool.
export function getModelGallery(model: Model, count = 6): string[] {
  if (model.images?.length) return model.images;
  const images = getCategoryImages(getModelCategory(model));
  const seed = hashString(model.slug);
  return Array.from({ length: count }, (_, i) => images[(seed + i) % images.length]);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getModelBySlug(categorySlug: string, modelSlug: string): Model | undefined {
  return getCategoryBySlug(categorySlug)?.models.find((m) => m.slug === modelSlug);
}
