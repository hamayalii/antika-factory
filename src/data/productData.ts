export type VerificationStatus =
  | "VERIFIED"
  | "DERIVED_SAFE"
  | "REQUIRES_BUSINESS_CONFIRMATION";

export interface ProductCategory {
  id: string;
  slug: string;
  titleKu: string;
  titleEn: string;
  shortDescriptionKu: string;
  descriptionKu: string;
  image?: string;
  modelCount: number;
}

export interface VerifiedProduct {
  id: string;
  slug: string;
  categoryId: string;
  categoryTitleKu: string;
  titleKu: string;
  titleEn: string;
  productFamilyKu?: string;
  modelCode?: string;
  shortDescriptionKu: string;
  descriptionKu: string | null;
  dimensionsRaw: string | null;
  dimensionUnitStatus?: VerificationStatus | null;
  dimensionOrder?: string | null;
  heightRaw?: string | null;
  widthRaw?: string | null;
  lengthRaw?: string | null;
  areaRaw?: string | null;
  levels?: string | null;
  materials?: string | null;
  applicationsKu: string[];
  featuresKu: { title: string; desc: string }[];
  images: string[];
  verificationStatus: VerificationStatus;
  technicalStatus?: VerificationStatus;
  internalNotes?: string;
  cta: {
    primaryKu: string;
    secondaryKu: string;
  };
}

export const productCategories: ProductCategory[] = [
  {
    id: "as",
    slug: "as",
    titleKu: "کەپسولەکانی خزمەتگوزاری AS",
    titleEn: "AS Service Capsules",
    shortDescriptionKu: "کەپسولی خزمەتگوزاریی پڕۆژەیی بۆ پێداویستییە تایبەتەکان.",
    descriptionKu: "کۆمەڵە کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
    image: "/images/capsule-4.jpg",
    modelCount: 6,
  },
  {
    id: "am",
    slug: "am",
    titleKu: "کەپسولەکانی ئیش و کاری AM",
    titleEn: "AM Capsule Series",
    shortDescriptionKu: "زنجیرەی کەپسولە مۆدولارەکانی مۆدێلی AM بە کۆدە تایبەتەکانەوە.",
    descriptionKu: "زنجیرەی کەپسولەکانی AM لە کارگەی ئەنتیکا، دیزاین کراوە بۆ پڕۆژە و شوێنە جیاوازەکان بەپێی کۆدی مۆدێلەکان.",
    image: "/images/capsule-2.jpg",
    modelCount: 6,
  },
  {
    id: "al",
    slug: "al",
    titleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleEn: "AL Residential Capsule Series",
    shortDescriptionKu: "کەپسولەکانی نیشتەجێبوون لە زنجیرەی ئەپڵ بە قەبارە و دیزاینی جیاواز.",
    descriptionKu: "زنجیرەی کەپسولەکانی نیشتەجێبوونی AL (کەپسولی ئەپڵ)، بەرهەمهێنراو لە کارگەی ئەنتیکا بۆ شوێنی نیشتەجێبوون، باخچە و پڕۆژەی تایبەت بەپێی پێوانەی ڕاگەیەنراو.",
    image: "/images/capsule-1.jpg",
    modelCount: 6,
  },
  {
    id: "container-house",
    slug: "container-house",
    titleKu: "خانووی حاویە",
    titleEn: "Container House",
    shortDescriptionKu: "یەکەی خانووی مۆدولاری حاویە بە دیزاینی ئەندازیاری.",
    descriptionKu: "یەکەی خانووی حاویە بە مۆدێلی CL لە کارگەی ئەنتیکا بەرهەم دەهێنرێت بەپێی پێوانەی ڕاگەیەنراوی ئەندازیاری.",
    image: "/images/container-cabin-2.jpg",
    modelCount: 1,
  },
  {
    id: "standard-house",
    slug: "standard-house",
    titleKu: "خانووی ئاسایی",
    titleEn: "Standard Modular House",
    shortDescriptionKu: "خانووی مۆدولاری ستاندارد بۆ پڕۆژە و شوێنی جیاواز.",
    descriptionKu: "خانووی مۆدولاری ئاسایی مۆدێلی ZL بە دیزاینی پێکهاتەیی لە کارگەی ئەنتیکا فاکتۆری بەرهەم دەهێنرێت.",
    image: "/images/work-capsule.png",
    modelCount: 1,
  },
  {
    id: "garden-house",
    slug: "garden-house",
    titleKu: "خانووی باخچە",
    titleEn: "Garden House",
    shortDescriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و باخچەیی بەپێی خواستی کڕیار.",
    descriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و پڕۆژەیی، بە پێی دیزاین و پێداویستیی کڕیار.",
    image: "/images/capsule-3.jpg",
    modelCount: 1,
  },
  {
    id: "cabin-house",
    slug: "cabin-house",
    titleKu: "خانووی کوخ",
    titleEn: "Cabin House",
    shortDescriptionKu: "خانووی کوخی دوو قات بە دیزاینی مۆدێرن و ڕووبەری ڕاگەیەنراو.",
    descriptionKu: "خانووی کوخی دوو قات مۆدێلی KL لە کارگەی ئەنتیکا، پێکهاتوو لە دوو نهۆم بەپێی پێوانە و ڕووبەری ڕاگەیەنراو.",
    image: "/images/capsule-5.jpg",
    modelCount: 1,
  },
];

export const verifiedProducts: VerifiedProduct[] = [
  /* ---------------- AS SERVICE CAPSULES (6 models) ---------------- */
  {
    id: "monitoring-capsule",
    slug: "monitoring-capsule",
    categoryId: "as",
    categoryTitleKu: "کەپسولەکانی AS",
    titleKu: "کەپسولی چاودێری",
    titleEn: "Monitoring Capsule",
    modelCode: "AS",
    shortDescriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی چاودێری پڕۆژە بەپێی دیزاین و شوێنی دیاریکراو.",
    descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/watch-cabin.jpg"],
    verificationStatus: "VERIFIED",
    technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    internalNotes: "Monitoring equipment and specifications require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "shower-capsule",
    slug: "shower-capsule",
    categoryId: "as",
    categoryTitleKu: "کەپسولەکانی AS",
    titleKu: "کەپسولی شاوەر(خۆ شووشتن)",
    titleEn: "Shower Capsule",
    modelCode: "AS",
    shortDescriptionKu: "کەپسولێکی خزمەتگوزاری بۆ بەشی شاور، بە دیزاینێک کە بەپێی داواکاری پڕۆژە ئامادە دەکرێت.",
    descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/shower-cabin.jpg"],
    verificationStatus: "VERIFIED",
    technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    internalNotes: "Plumbing, drainage and sanitary fittings require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "acoustic-capsule",
    slug: "acoustic-capsule",
    categoryId: "as",
    categoryTitleKu: "کەپسولەکانی AS",
    titleKu: "کەپسولی بێدەنگ (کاتم الصوت )",
    titleEn: "Acoustic Capsule",
    modelCode: "AS",
    shortDescriptionKu: "کەپسولێکی تایبەتی خزمەتگوزاری بە دیزاینی ئارام و کەمکردنەوەی دەنگ بۆ شوێنی کار و پڕۆژە.",
    descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/silent-cabin.jpg"],
    verificationStatus: "VERIFIED",
    technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    internalNotes: "Acoustic rating and STC values require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "air-smoke-exchange-capsule",
    slug: "air-smoke-exchange-capsule",
    categoryId: "as",
    categoryTitleKu: "کەپسولەکانی AS",
    titleKu: "کەپسولی ئاڵوگۆڕی هەوا و دووکەڵ",
    titleEn: "Air & Smoke Exchange Capsule",
    modelCode: "AS",
    shortDescriptionKu: "کەپسولێکی خزمەتگوزاری بۆ بەڕێوەبردنی هەواگۆڕکێ بەپێی دیزاینی شوێن و پڕۆژەکە.",
    descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/air-cabin.jpg"],
    verificationStatus: "VERIFIED",
    technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    internalNotes: "Airflow metrics and smoke ventilation details require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "sterilization-room-capsule",
    slug: "sterilization-room-capsule",
    categoryId: "as",
    categoryTitleKu: "کەپسولەکانی AS",
    titleKu: "کەپسولی ژووری تەعقیم",
    titleEn: "Sterilization Room Capsule",
    modelCode: "AS",
    shortDescriptionKu: "کەپسولێکی خزمەتگوزاری بۆ فەزای تەعقیم، بە دیزاینێک کە دەتوانێت بەپێی پێداویستی ڕێکبخرێت.",
    descriptionKu: "کەپسولێکی تایبەت بۆ بەکارهێنانی خزمەتگوزاریی پڕۆژە، بە دیزاینێک کە دەتوانێت بەپێی پێداویستیی شوێن و جۆری بەکارهێنان ڕێکبخرێت.",
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/med-cabin.jpg"],
    verificationStatus: "VERIFIED",
    technicalStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    internalNotes: "Medical-grade sterilization capabilities require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },

  /* ---------------- AM CAPSULE SERIES (6 models) ---------------- */
  {
    id: "am-a",
    slug: "am-a",
    categoryId: "am",
    categoryTitleKu: "کەپسولەکانی AM",
    titleKu: "کەپسولی AM • A",
    titleEn: "AM.A Capsule",
    modelCode: "AM.A",
    shortDescriptionKu: "مۆدێلی AM • A لە زنجیرەی کەپسولەکانی AM لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/am-a.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Meaning of suffix 'A' and specifications require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "am-p",
    slug: "am-p",
    categoryId: "am",
    categoryTitleKu: "کەپسولەکانی AM",
    titleKu: "کەپسولی AM • P",
    titleEn: "AM.P Capsule",
    modelCode: "AM.P",
    shortDescriptionKu: "مۆدێلی AM • P لە زنجیرەی کەپسولەکانی AM لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/am-p.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Meaning of suffix 'P' and specifications require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "am-k",
    slug: "am-k",
    categoryId: "am",
    categoryTitleKu: "کەپسولەکانی AM",
    titleKu: "کەپسولی AM • K",
    titleEn: "AM.K Capsule",
    modelCode: "AM.K",
    shortDescriptionKu: "مۆدێلی AM • K لە زنجیرەی کەپسولەکانی AM لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/am-k.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Meaning of suffix 'K' and specifications require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "am-g",
    slug: "am-g",
    categoryId: "am",
    categoryTitleKu: "کەپسولەکانی AM",
    titleKu: "کەپسولی AM • G",
    titleEn: "AM.G Capsule",
    modelCode: "AM.G",
    shortDescriptionKu: "مۆدێلی AM • G لە زنجیرەی کەپسولەکانی AM لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/am-g.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Meaning of suffix 'G' and specifications require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "am-t",
    slug: "am-t",
    categoryId: "am",
    categoryTitleKu: "کەپسولەکانی AM",
    titleKu: "کەپسولی AM • T",
    titleEn: "AM.T Capsule",
    modelCode: "AM.T",
    shortDescriptionKu: "مۆدێلی AM • T لە زنجیرەی کەپسولەکانی AM لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: null,
    dimensionUnitStatus: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/am-t.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Meaning of suffix 'T' and specifications require business confirmation.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },

  /* ---------------- AL RESIDENTIAL CAPSULES (6 models) ---------------- */
  {
    id: "al-2",
    slug: "al-2",
    categoryId: "al",
    categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleKu: "AL • 2 - Casule",
    titleEn: "AL 2 Apple Capsule",
    productFamilyKu: "کەپسولی ئەپڵ",
    modelCode: "AL 2",
    shortDescriptionKu: "AL 2 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: "6 × 3",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/al-2.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Raw dimensions 6 × 3. Unit not explicitly confirmed.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "al-4",
    slug: "al-4",
    categoryId: "al",
    categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleKu: "AL • 4 - Casule",
    titleEn: "AL 4 Apple Capsule",
    productFamilyKu: "کەپسولی ئەپڵ",
    modelCode: "AL 4",
    shortDescriptionKu: "AL 4 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: "8.5 × 3.2",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/al-4.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Raw dimensions 8.5 × 3.2. Unit not explicitly confirmed.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "al-6",
    slug: "al-6",
    categoryId: "al",
    categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleKu: "AL • 6 - Casule",
    titleEn: "AL 6 Apple Capsule",
    productFamilyKu: "کەپسولی ئەپڵ",
    modelCode: "AL 6",
    shortDescriptionKu: "AL 6 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: "9.5 × 3.5",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/al-6.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Raw dimensions 9.5 × 3.5. Unit not explicitly confirmed.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "al-8",
    slug: "al-8",
    categoryId: "al",
    categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleKu: "AL • 8 - Casule",
    titleEn: "AL 8 Apple Capsule",
    productFamilyKu: "کەپسولی ئەپڵ",
    modelCode: "AL 8",
    shortDescriptionKu: "AL 8 لە زنجیرەی کەپسولەکانی نیشتەجێبوونی ئەپڵ لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: "11.5 × 3",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/al-8.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Raw dimensions 11.5 × 3. Unit not explicitly confirmed.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "al-d",
    slug: "al-d",
    categoryId: "al",
    categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleKu: "ئەپڵی لێکدراو (مدمج)",
    titleEn: "Apple Integrated Model (AL.D)",
    productFamilyKu: "کەپسولی ئەپڵ",
    modelCode: "AL.D",
    shortDescriptionKu: "ئەپڵی لێکدراو (مدمج) مۆدێلی AL.D بە ڕووبەری ڕاگەیەنراوی 52m².",
    descriptionKu: null,
    dimensionsRaw: "11.5 × 4.40 × 2.45",
    heightRaw: "2.45",
    widthRaw: "4.40",
    lengthRaw: "11.5",
    areaRaw: "52m²",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/mixed-apple.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Confirm dimension units and total area calculation before final publication.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
  {
    id: "al-f",
    slug: "al-f",
    categoryId: "al",
    categoryTitleKu: "کەپسولەکانی نیشتەجێبوونی AL",
    titleKu: "ئەپڵی دووقات",
    titleEn: "Apple Two-Level Model (AL.F)",
    productFamilyKu: "کەپسولی ئەپڵ",
    modelCode: "AL.F",
    shortDescriptionKu: "ئەپڵی طابق مۆدێلی AL.F بە ڕووبەری ڕاگەیەنراوی 52m² لە ئەنتیکا فاکتۆری.",
    descriptionKu: null,
    dimensionsRaw: "11.5 × 2.20 × 2.45",
    heightRaw: "2.45",
    widthRaw: "2.20",
    lengthRaw: "11.5",
    areaRaw: "52m²",
    levels: "دوو قات",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/apple-cabin-2qat.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Confirm whether 52m² is the combined area of both levels.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },

  /* ---------------- CONTAINER HOUSE (1 model) ---------------- */
  {
    id: "cl",
    slug: "cl",
    categoryId: "container-house",
    categoryTitleKu: "خانووی حاویە",
    titleKu: "خانووی حاویە",
    titleEn: "Container House",
    modelCode: "دیاری نەکراوە",
    shortDescriptionKu: "خانووی حاویە مۆدێلی  بە پێوانەی ڕاگەیەنراوی 590 × 3 × 280.",
    descriptionKu: null,
    dimensionsRaw: "590 × 3 × 280",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    dimensionOrder: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/container-cabin-2.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "DimensionsRaw: 590 × 3 × 280. Unit and order requires business confirmation. Do not claim standard shipping container.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },

  /* ---------------- STANDARD MODULAR HOUSE (1 model) ---------------- */
  {
    id: "zl",
    slug: "zl",
    categoryId: "standard-house",
    categoryTitleKu: "خانووی ئاسایی",
    titleKu: "خانووی ئاسایی",
    titleEn: "Standard Modular House",
    modelCode: "دیاری نەکراوە",
    shortDescriptionKu: "خانووی ئاسایی مۆدێلی بە پێوانەی ڕاگەیەنراوی 5800 × 2480 × 2530.",
    descriptionKu: null,
    dimensionsRaw: "5800 × 2480 × 2530",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    dimensionOrder: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/house-cabin.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Raw dimensions 5800 × 2480 × 2530 (appears mm-style). Do not silently convert to meters.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },

  /* ---------------- GARDEN HOUSE (1 model) ---------------- */
  {
    id: "pl",
    slug: "pl",
    categoryId: "garden-house",
    categoryTitleKu: "خانووی باخچە",
    titleKu: "خانووی باخچە",
    titleEn: "Garden House",
    modelCode: "دیاری نەکراوە",
    shortDescriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و پڕۆژەیی، بە پێی دیزاین و پێداویستیی کڕیار.",
    descriptionKu: "خانوویەکی مۆدولار بۆ بەکارهێنانی تایبەت و پڕۆژەیی، بە پێی دیزاین و پێداویستیی کڕیار.",
    dimensionsRaw: "6000 × 3000 × 2500",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    dimensionOrder: null,
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/baxcha-cabin.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Raw dimensions 6000 × 3000 × 2500. Do not assume guest house/studio unless confirmed.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },

  /* ---------------- CABIN HOUSE (1 model) ---------------- */
  {
    id: "kl",
    slug: "kl",
    categoryId: "cabin-house",
    categoryTitleKu: "خانووی کوخ",
    titleKu: "خانووی کوخ(دوو قات)",
    titleEn: "Cabin House(Two-Level)",
    modelCode: "دیاری نەکراوە",
    shortDescriptionKu: "خانووی کوخی دوو قات مۆدێلی  بە ڕووبەری ڕاگەیەنراوی 29.4m².",
    descriptionKu: null,
    dimensionsRaw: "7500 × 3000 × 4600",
    areaRaw: "29.4m²",
    levels: "خانووی کوخی دوو قات",
    dimensionUnitStatus: "REQUIRES_BUSINESS_CONFIRMATION",
    materials: null,
    applicationsKu: [],
    featuresKu: [],
    images: ["/images/kux-cabin.jpg"],
    verificationStatus: "VERIFIED",
    internalNotes: "Confirm units and whether 29.4m² refers to one floor or total building.",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
];

/* Capsule and House Groupings */
export const capsuleCategories = productCategories.filter((c) =>
  ["as", "am", "al"].includes(c.id)
);

export const houseCategories = productCategories.filter((c) =>
  ["container-house", "standard-house", "garden-house", "cabin-house"].includes(c.id)
);

export const capsuleProducts = verifiedProducts.filter((p) =>
  ["as", "am", "al"].includes(p.categoryId)
);

export const houseProducts = verifiedProducts.filter((p) =>
  ["container-house", "standard-house", "garden-house", "cabin-house"].includes(p.categoryId)
);

export const lightingProducts: VerifiedProduct[] = [
  {
    id: "lighting-ambient",
    slug: "lighting",
    categoryId: "lighting",
    categoryTitleKu: "لایتی ڕووناکی",
    titleKu: "لایتی ڕووناکی هونەری",
    titleEn: "Artistic Ambient Lighting",
    shortDescriptionKu: "تێکەڵەیەک لە جوانیی سروشت و دیزاینی مۆدێرن بە شێوەیەکی بێهاوتا لە دار و کانزا.",
    descriptionKu: "دیزاین و دروستکردنی لایتی ڕووناکی مۆدێرن و هونەری لە کارگەی ئەنتیکا بە ستانداردی بەرز بۆ ناوماڵ، کافێ، ئۆفیس و شوێنە تایبەتەکان.",
    dimensionsRaw: "بەپێی داواکاری کڕیار",
    materials: "دار و کانزا و LED",
    applicationsKu: ["ناوماڵ", "کافێ و ڕێستۆرانت", "ئۆفیس و شوێنی کار"],
    featuresKu: [
      { title: "دیزاینی دەستکرد", desc: "دیزاینی تایبەت و بێهاوتا بە کەرەستەی سروشتی" },
      { title: "ڕووناکی کەم‌مەسرەف", desc: "سیستەمی پێشکەوتووی LED بە بەکارهێنانی کەمترین وزە" },
    ],
    images: ["/images/work-lighting.jpg"],
    verificationStatus: "VERIFIED",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
];

export const shelvesProducts: VerifiedProduct[] = [
  {
    id: "shelves-modular",
    slug: "shelves",
    categoryId: "shelves",
    categoryTitleKu: "ڕەفەکان",
    titleKu: "ڕەفەی ئەندازیاری و مۆدێرن",
    titleEn: "Modern Engineering Shelves",
    shortDescriptionKu: "ڕێکخستنێکی نموونەیی و پێدانی جوانییەکی تایبەت لە پۆڵا و ئاسن و دار.",
    descriptionKu: "دیزاین و دروستکردنی ڕەفەی ئەندازیاری و مۆدێرن بە کوالێتی باڵا بۆ ناوماڵ، کارگە، مارکێت و ئۆفیس.",
    dimensionsRaw: "بەپێی پێوانەی شوێنەکەت",
    materials: "پۆڵا، ئاسن، داری سروشتی",
    applicationsKu: ["ناوماڵ", "ئۆفیس", "کافێ و مارکێت", "کارگە و کۆگا"],
    featuresKu: [
      { title: "پتەو و سەلامەت", desc: "بەرگەی کێشی بەرز دەگرێت بە سەلامەتی تەواو" },
      { title: "دیزاینی پیشەسازی مۆدێرن", desc: "گونجاو لەگەڵ دیزاینی ناوەوەی هاوچەرخ" },
    ],
    images: ["/images/work-shelves.jpg"],
    verificationStatus: "VERIFIED",
    cta: {
      primaryKu: "داوای نرخ بکە",
      secondaryKu: "پەیوەندیمان پێوە بکە",
    },
  },
];

export const allProducts: VerifiedProduct[] = [
  ...capsuleProducts,
  ...houseProducts,
  ...lightingProducts,
  ...shelvesProducts,
];

export function isHouseCategory(categoryIdOrSlug: string): boolean {
  return ["container-house", "standard-house", "garden-house", "cabin-house"].includes(
    categoryIdOrSlug
  );
}

export function isHouseProduct(product: VerifiedProduct): boolean {
  return isHouseCategory(product.categoryId);
}

/* Helper query functions */
export function getProductBySlug(slug: string): VerifiedProduct | undefined {
  return verifiedProducts.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(categoryIdOrSlug: string): VerifiedProduct[] {
  return verifiedProducts.filter(
    (p) => p.categoryId === categoryIdOrSlug || p.categoryTitleKu === categoryIdOrSlug
  );
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug || c.id === slug);
}

export function getRelatedProducts(currentSlug: string, count: number = 3): VerifiedProduct[] {
  const current = getProductBySlug(currentSlug);
  return verifiedProducts
    .filter((p) => p.slug !== currentSlug && p.id !== currentSlug)
    .sort((a, b) => {
      if (current && a.categoryId === current.categoryId && b.categoryId !== current.categoryId) {
        return -1;
      }
      if (current && b.categoryId === current.categoryId && a.categoryId !== current.categoryId) {
        return 1;
      }
      return 0;
    })
    .slice(0, count);
}
