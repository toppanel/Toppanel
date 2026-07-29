export type Model = {
  slug: string;
  code: string;
  codeS?: string;
  name: string;
  nameKo: string;
  /** Filenames of real uploaded photos for this model, relative to its category's image folder. First is used as the cover. */
  images?: string[];
};

export type ProductCategory = {
  slug: string;
  label: string;
  labelSub: string;
  description: string;
  models: Model[];
  /** Filename of a real uploaded cover photo for this category, relative to its image folder. */
  image?: string;
};

// Product image base paths grouped by purpose so the site can scale cleanly as
// more photography is added.
const PRODUCT_IMAGE_BASE = "/images/products";
const PROJECT_IMAGE_BASE = "/images/projects";

// Fallback image used until a real product photo exists for a given model/category.
export const FALLBACK_IMAGE = `${PRODUCT_IMAGE_BASE}/placeholder.jpg`;

// A starter image catalog that follows a realistic folder-and-file naming pattern.
// Each category already has multiple example filenames so the structure is easy to
// expand into a full product photo library later.
// Kept in sync with the real files under public/images/products/<category>/ — for
// `cubicle`, which has many model types, files are further split one subfolder per
// model slug (e.g. `cubicle/design/cubicle-design-01.jpg`) so it stays manageable
// at scale; other categories stay flat until they need the same treatment.
// Used as a fallback pool for any model that doesn't have its own explicit
// `images` list yet (see Model.images).
const PRODUCT_IMAGES: Record<string, string[]> = {
  cubicle: [
    "metro/cubicle-metro-01.jpg", "metro/cubicle-metro-02.jpg", "metro/cubicle-metro-03.png", "metro/cubicle-metro-04.jpg", "metro/cubicle-metro-05.jpg",
    "basic/cubicle-basic-01.jpg", "basic/cubicle-basic-02.jpg", "basic/cubicle-basic-03.jpg", "basic/cubicle-basic-04.jpg", "basic/cubicle-basic-05.jpg",
    "basic/cubicle-basic-06.jpg", "basic/cubicle-basic-07.jpg", "basic/cubicle-basic-08.png", "basic/cubicle-basic-09.png", "basic/cubicle-basic-10.png",
    "basic/cubicle-basic-11.png", "basic/cubicle-basic-12.png", "basic/cubicle-basic-13.jpg", "basic/cubicle-basic-14.png", "basic/cubicle-basic-15.png",
    "basic/cubicle-basic-16.jpg", "basic/cubicle-basic-17.png", "basic/cubicle-basic-18.png", "basic/cubicle-basic-19.jpg",
    "metal/cubicle-metal-01.jpg", "metal/cubicle-metal-02.png", "metal/cubicle-metal-03.png", "metal/cubicle-metal-04.jpg",
    "design/cubicle-design-01.jpg", "design/cubicle-design-02.jpg", "design/cubicle-design-03.jpg", "design/cubicle-design-04.jpg", "design/cubicle-design-05.jpg",
    "design/cubicle-design-06.jpg", "design/cubicle-design-07.jpg", "design/cubicle-design-08.jpg", "design/cubicle-design-09.jpg", "design/cubicle-design-10.jpg",
    "kids/cubicle-kids-01.png",
    "stainless/cubicle-stainless-01.jpg", "stainless/cubicle-stainless-02.jpg", "stainless/cubicle-stainless-03.jpg",
    "urinal/cubicle-urinal-01.jpg", "urinal/cubicle-urinal-02.png",
    "ordermade/cubicle-ordermade-01.jpg", "ordermade/cubicle-ordermade-02.jpg", "ordermade/cubicle-ordermade-03.jpg",
    "ordermade/cubicle-ordermade-04.jpg", "ordermade/cubicle-ordermade-05.png", "ordermade/cubicle-ordermade-06.jpg", "ordermade/cubicle-ordermade-07.jpg",
  ].map((f) => `${PRODUCT_IMAGE_BASE}/cubicle/${f}`),
  accessible: [
    "accessible-sliding-01.jpg", "accessible-sliding-02.jpg", "accessible-double-sliding-01.jpg",
    "accessible-folding-01.png", "accessible-folding-02.png", "accessible-auto-door-04.png",
  ].map((f) => `${PRODUCT_IMAGE_BASE}/accessible/${f}`),
  glass: [
    "cubicle-urinal-01.jpg", "cubicle-urinal-02.png", "cubicle-urinal-03.jpg",
    "cubicle-urinal-04.jpg", "cubicle-urinal-05.jpg", "cubicle-urinal-07.png",
    "glass-shower-booth-01.jpg", "glass-shower-partition-01.png",
  ].map((f) => `${PRODUCT_IMAGE_BASE}/glass/${f}`),
  "changing-room": [
    "changing-room-01.jpg", "changing-room-02.jpg", "changing-room-03.jpg",
    "changing-room-04.jpg", "changing-room-05.jpg", "changing-room-06.jpg",
  ].map((f) => `${PRODUCT_IMAGE_BASE}/changing-room/${f}`),
  // No real photos uploaded yet — falls back to FALLBACK_IMAGE.
  "lower-cabinet": [],
  "wall-panel": [
    "wall-panel-01.jpg", "wall-panel-02.jpg", "wall-panel-03.jpg", "wall-panel-04.jpg", "wall-panel-05.jpg",
    "wall-panel-06.jpg", "wall-panel-07.jpg", "wall-panel-08.jpg", "wall-panel-09.jpg", "wall-panel-10.jpg",
    "wall-panel-11.jpg", "wall-panel-12.jpg", "wall-panel-13.jpg", "wall-panel-14.jpg", "wall-panel-15.jpg",
    "wall-panel-16.jpg", "wall-panel-17.jpg",
  ].map((f) => `${PRODUCT_IMAGE_BASE}/wall-panel/${f}`),
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function getCategoryImages(categorySlug: string): string[] {
  const images = PRODUCT_IMAGES[categorySlug];
  return images?.length ? images : [FALLBACK_IMAGE];
}

// Look up which category a model actually belongs to (rather than guessing from
// the slug), so the right image folder is used even for slugs without a dash.
function getModelCategorySlug(model: Model): string {
  const category = PRODUCT_CATEGORIES.find((c) => c.models.includes(model));
  return category?.slug ?? "cubicle";
}

export function getModelImage(model: Model): string {
  const categorySlug = getModelCategorySlug(model);
  if (model.images?.length) return `${PRODUCT_IMAGE_BASE}/${categorySlug}/${model.images[0]}`;
  const images = getCategoryImages(categorySlug);
  return images[hashString(model.slug) % images.length];
}

export function getCategoryImage(category: Pick<ProductCategory, "slug" | "image">): string {
  if (category.image) return `${PRODUCT_IMAGE_BASE}/${category.slug}/${category.image}`;
  const images = getCategoryImages(category.slug);
  return images[hashString(category.slug) % images.length];
}

// A model's gallery. Models with real uploaded photos (model.images) show exactly
// those — no padding, no unrelated photos mixed in. Models without real photos yet
// fall back to a hash-picked sample from the category's shared placeholder pool.
export function getModelGallery(model: Model, count = 6): string[] {
  const categorySlug = getModelCategorySlug(model);
  if (model.images?.length) {
    return model.images.map((file) => `${PRODUCT_IMAGE_BASE}/${categorySlug}/${file}`);
  }
  const images = getCategoryImages(categorySlug);
  const seed = hashString(model.slug);
  return Array.from({ length: count }, (_, i) => images[(seed + i) % images.length]);
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: "cubicle",
    label: "화장실칸막이",
    labelSub: "TOILET CUBICLE",
    description: "불연·기본·메탈·디자인·어린이·스테인리스 등 다양한 소재와 마감으로 모든 공간 요건에 맞는 화장실 칸막이 라인업입니다.",
    image: "design/cubicle-design-01.jpg",
    models: [
      {
        slug: "metro", code: "METRO", name: "불연 METRO", nameKo: "불연 METRO",
        images: ["metro/cubicle-metro-01.jpg", "metro/cubicle-metro-02.jpg", "metro/cubicle-metro-03.png", "metro/cubicle-metro-04.jpg", "metro/cubicle-metro-05.jpg"],
      },
      {
        slug: "basic", code: "BASIC", name: "기본 BASIC", nameKo: "기본 BASIC",
        images: [
          "basic/cubicle-basic-01.jpg", "basic/cubicle-basic-02.jpg", "basic/cubicle-basic-03.jpg", "basic/cubicle-basic-04.jpg", "basic/cubicle-basic-05.jpg",
          "basic/cubicle-basic-06.jpg", "basic/cubicle-basic-07.jpg", "basic/cubicle-basic-08.png", "basic/cubicle-basic-09.png", "basic/cubicle-basic-10.png",
          "basic/cubicle-basic-11.png", "basic/cubicle-basic-12.png", "basic/cubicle-basic-13.jpg", "basic/cubicle-basic-14.png", "basic/cubicle-basic-15.png",
          "basic/cubicle-basic-16.jpg", "basic/cubicle-basic-17.png", "basic/cubicle-basic-18.png", "basic/cubicle-basic-19.jpg",
        ],
      },
      {
        slug: "metal", code: "METAL", name: "메탈 METAL", nameKo: "메탈 METAL",
        images: ["metal/cubicle-metal-01.jpg", "metal/cubicle-metal-02.png", "metal/cubicle-metal-03.png", "metal/cubicle-metal-04.jpg"],
      },
      {
        slug: "design", code: "DESIGN", name: "디자인 DESIGN", nameKo: "디자인 DESIGN",
        images: Array.from({ length: 42 }, (_, i) => `design/cubicle-design-${String(i + 1).padStart(2, "0")}.jpg`),
      },
      {
        slug: "kids", code: "KIDS", name: "어린이 KIDS", nameKo: "어린이 KIDS",
        images: ["kids/cubicle-kids-01.png"],
      },
      {
        slug: "stainless", code: "STAINLESS", name: "스테인리스 STAINLESS", nameKo: "스테인리스 STAINLESS",
        images: ["stainless/cubicle-stainless-01.jpg", "stainless/cubicle-stainless-02.jpg", "stainless/cubicle-stainless-03.jpg"],
      },
      {
        slug: "urinal", code: "URINAL", name: "소변기칸막이", nameKo: "소변기칸막이",
        images: ["urinal/cubicle-urinal-01.jpg", "urinal/cubicle-urinal-02.png"],
      },
      {
        slug: "ordermade", code: "ORDERMADE", name: "주문제작형 ORDERMADE", nameKo: "주문제작형 ORDERMADE",
        images: [
          "ordermade/cubicle-ordermade-01.jpg", "ordermade/cubicle-ordermade-02.jpg", "ordermade/cubicle-ordermade-03.jpg",
          "ordermade/cubicle-ordermade-04.jpg", "ordermade/cubicle-ordermade-05.png", "ordermade/cubicle-ordermade-06.jpg", "ordermade/cubicle-ordermade-07.jpg",
        ],
      },
    ],
  },
  {
    slug: "accessible",
    label: "장애인칸막이",
    labelSub: "ACCESSIBLE",
    description: "장애인 편의시설 기준을 충족하는 슬라이딩·접이식 수동·자동 도어 시스템 라인업입니다.",
    image: "accessible-sliding-01.jpg",
    models: [
      { slug: "sd",  code: "SD",  name: "슬라이딩 도어",      nameKo: "슬라이딩 도어", images: ["accessible-sliding-01.jpg", "accessible-sliding-02.jpg"] },
      { slug: "dsd", code: "DSD", name: "이단 슬라이딩 도어", nameKo: "이단 슬라이딩 도어", images: ["accessible-double-sliding-01.jpg"] },
      { slug: "fd",  code: "FD",  name: "접이식 도어",        nameKo: "접이식 도어", images: ["accessible-folding-01.png", "accessible-folding-02.png"] },
      // Only one generic auto-door photo exists so far — shared across all auto variants
      // until dedicated per-variant photos are uploaded.
      { slug: "sd-auto",  code: "SD-AUTO",  name: "슬라이딩 도어 자동문",      nameKo: "슬라이딩 도어 자동문", images: ["accessible-auto-door-04.png"] },
      { slug: "dsd-auto", code: "DSD-AUTO", name: "이단 슬라이딩 도어 자동문", nameKo: "이단 슬라이딩 도어 자동문", images: ["accessible-auto-door-04.png"] },
      { slug: "fd-auto",  code: "FD-AUTO",  name: "접이식 도어 자동문",        nameKo: "접이식 도어 자동문", images: ["accessible-auto-door-04.png"] },
    ],
  },
  {
    slug: "glass",
    label: "유리칸막이",
    labelSub: "GLASS PARTITION",
    description: "강화유리 소재의 소변기칸막이·샤워파티션·샤워부스 라인업입니다. 투명·반투명·불투명 다양한 조합이 가능합니다.",
    image: "glass-shower-booth-01.jpg",
    models: [
      {
        slug: "ur", code: "UR", name: "소변기칸막이", nameKo: "소변기칸막이",
        images: [
          "cubicle-urinal-01.jpg", "cubicle-urinal-02.png", "cubicle-urinal-03.jpg",
          "cubicle-urinal-04.jpg", "cubicle-urinal-05.jpg", "cubicle-urinal-07.png",
        ],
      },
      { slug: "shp", code: "SHP", name: "샤워파티션",   nameKo: "샤워파티션", images: ["glass-shower-partition-01.png"] },
      { slug: "shb", code: "SHB", name: "샤워부스",     nameKo: "샤워부스", images: ["glass-shower-booth-01.jpg"] },
    ],
  },
  {
    slug: "changing-room",
    label: "탈의실",
    labelSub: "CHANGING ROOM",
    description: "탈의실·락커룸·샤워룸 등 다목적 공간에 적용 가능한 탈의실 칸막이 라인업입니다.",
    image: "changing-room-01.jpg",
    models: [
      {
        slug: "fit", code: "FIT", name: "탈의실칸막이", nameKo: "탈의실칸막이",
        images: [
          "changing-room-01.jpg", "changing-room-02.jpg", "changing-room-03.jpg",
          "changing-room-04.jpg", "changing-room-05.jpg", "changing-room-06.jpg",
        ],
      },
    ],
  },
  {
    slug: "lower-cabinet",
    label: "하부장",
    labelSub: "LOWER CABINET",
    description: "세면대 하부 공간을 활용한 수납 하부장 라인업입니다. 내수성 소재로 화장실 환경에 최적화되어 있습니다.",
    models: [
      { slug: "sink", code: "SINK", name: "세면대하부장", nameKo: "세면대하부장" },
    ],
  },
  {
    slug: "wall-panel",
    label: "월패널",
    labelSub: "WALL PANEL",
    description: "실내 벽체 마감에 사용하는 고품질 패널 라인업입니다. 다양한 컬러와 텍스처로 공간을 완성합니다.",
    image: "wall-panel-01.jpg",
    models: [
      { slug: "wp",    code: "WP",    name: "실내벽체마감패널", nameKo: "실내벽체마감패널" },
      { slug: "smart", code: "SMART", name: "S.M.ART BOARD",   nameKo: "S.M.ART BOARD" },
    ],
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getModelBySlug(categorySlug: string, modelSlug: string): Model | undefined {
  return getCategoryBySlug(categorySlug)?.models.find((m) => m.slug === modelSlug);
}
