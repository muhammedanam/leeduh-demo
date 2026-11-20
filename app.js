/**
 * LEEDUH — Minimalist Luxury Parfumerie & Ambient Purifiers (Dubai)
 * ============================================================================
 * Sections:
 * 1. Data Definitions (4 Fine Perfumes, 3 Formats, 6 Separate Purifiers, 14 Catalog Items)
 * 2. State & LocalStorage Persistence
 * 3. Handcrafted Inline SVG Asset Generators
 * 4. Unified Minimalist Boutique Card Renderer & Size Selection Sync
 * 5. Collections, Best Sellers, Fine Perfumes & Purifiers Renderers
 * 6. Complete Catalog Search, Filter & Sort (#catalog)
 * 7. Quick-View Product Modal (#quickViewDialog)
 * 8. Slide-Over Shopping Bag Drawer, Delivery Threshold & Prototype Checkout
 * 9. Slide-Over Wishlist Drawer (#wishlistDialog)
 * 10. Customer Profile Dialog, Order History & Scent Wardrobe (#profileDialog)
 * 11. Header Navigation, Mobile Drawer, Scroll Spy & Initialization
 * ============================================================================
 */

/* ==========================================================================
   1. Data Definitions
   ========================================================================== */

const S = [
  {
    id: 'oud-rose',
    name: 'Oud Rose',
    arabic: 'عود ورد',
    tagline: 'Taif rose & smoky Cambodian oud',
    color: '#8c4c1a',
    highlight: '#dca04c',
    bottleImg: 'bottle-oud-rose.png',
    top: 'Pink pepper and Taif rose',
    heart: 'Aged Cambodian oud and geranium',
    base: 'Smoky amber and dark leather'
  },
  {
    id: 'avenor',
    name: 'Avenor',
    arabic: 'أفينور',
    tagline: 'Regal citrus & smoky birch wood',
    color: '#161412',
    highlight: '#c9a24a',
    bottleImg: 'bottle-avenor.png',
    top: 'Italian bergamot and blackcurrant',
    heart: 'Birch wood and patchouli',
    base: 'Precious ambergris and royal oakmoss'
  },
  {
    id: 'scentra',
    name: 'Scentra',
    arabic: 'سنترا',
    tagline: 'Radiant amber & golden saffron',
    color: '#3d1d07',
    highlight: '#e59b2d',
    bottleImg: 'bottle-scentra.png',
    top: 'Golden saffron and crushed cardamom',
    heart: 'Warm cedar and white honey',
    base: 'Precious amber and bourbon vanilla'
  },
  {
    id: 'oud-maracuja',
    name: 'Oud Maracuja',
    arabic: 'عود ماراكوجا',
    tagline: 'Exotic passionfruit & dark Assam oud',
    color: '#7a3e12',
    highlight: '#e8a538',
    bottleImg: 'bottle-oud-maracuja.png',
    top: 'Ripe passionfruit and Turkish rose',
    heart: 'Dark Assam oud and Indonesian patchouli',
    base: 'Leather, labdanum and benzoin'
  }
];

const PC = [
  {
    id: 'extrait',
    name: 'Extrait de Parfum',
    desc: '25% concentration · Crystal flacon',
    type: 'parfum',
    sizes: [
      { size: '30 ml', price: 280 },
      { size: '50 ml', price: 380, default: true },
      { size: '100 ml', price: 660 }
    ]
  },
  {
    id: 'atomizer',
    name: 'Travel Atomizer',
    desc: '10 ml pocket gold sleeve',
    type: 'atomizer',
    sizes: [
      { size: '10 ml', price: 140, default: true },
      { size: '3×10 ml Case', price: 360 }
    ]
  },
  {
    id: 'coffret',
    name: 'Atelier Gift Coffret',
    desc: 'Lacquered box & 2 ml vault sample',
    type: 'coffret',
    sizes: [
      { size: 'Gift Box', price: 90, default: true },
      { size: 'Gold Engraved', price: 140 }
    ]
  }
];

const SCENT_META = {
  'oud-rose': {
    family: 'Oud & Taif Rose',
    story: 'Wild-harvested Cambodian oud softened by hand-picked Taif rose petals and smoked amber leather. Our signature house icon, macerated for twelve weeks.'
  },
  'avenor': {
    family: 'Woods & Citrus',
    story: 'Crisp Italian bergamot and blackcurrant leaf cut cleanly through smoky birch tar and aged oakmoss.'
  },
  'scentra': {
    family: 'Amber & Saffron',
    story: 'Red saffron threads steeped over white desert honey, warm cedarheart, and bourbon vanilla bean.'
  },
  'oud-maracuja': {
    family: 'Oud & Exotic Fruit',
    story: 'Sun-ripened passionfruit collided with dark resinous Assam oud, Turkish rose absolute, and burnished leather.'
  }
};

/**
 * Dedicated Home & Car Purifiers — formulated strictly separate from Fine Perfumes.
 * Zero fragrance overlap with the 4 Fine Perfumes above.
 */
const PURIFIER_LINES = [
  {
    id: 'qasr-velvet',
    category: 'home-purifier',
    categoryLabel: 'Home Purifier',
    scentName: 'Qasr Velvet',
    arabic: 'قصر مخمل',
    title: 'Qasr Velvet Home Purifier',
    subtitle: 'Architectural Reed Diffuser · Interior Scent',
    family: 'Frankincense & Fig Suede',
    color: '#543d25',
    highlight: '#d6b16a',
    img: 'diffuser-home-qasr-velvet.png',
    top: 'Smoked frankincense and white tea',
    heart: 'Dried fig leaf and soft suede',
    base: 'Atlas cedarwood and cashmere',
    story: 'Designed strictly for quiet architectural interiors—diffuse smoke-free Omani resin and velvety suede continuously for up to 16 weeks.',
    sizes: [
      { size: '200 ml Diffuser', price: 310, default: true },
      { size: '500 ml Decanter', price: 590 }
    ],
    sales: 296,
    rating: '4.96',
    badge: 'Best-Selling Home'
  },
  {
    id: 'alabaster-dusk',
    category: 'home-purifier',
    categoryLabel: 'Home Purifier',
    scentName: 'Alabaster Dusk',
    arabic: 'مرمر الغسق',
    title: 'Alabaster Dusk Home Purifier',
    subtitle: 'Matte Vessel Diffuser · Interior Scent',
    family: 'White Iris & Mineral Musk',
    color: '#2c3335',
    highlight: '#b9c3c4',
    img: 'diffuser-home-alabaster-dusk.png',
    top: 'Fresh neroli and silver eucalyptus',
    heart: 'Orris butter and white iris',
    base: 'Mineral musk and hinoki cypress',
    story: 'Clean stone-cool botanicals formulated exclusively to purify modern residences, foyers, and private dressing rooms.',
    sizes: [
      { size: '200 ml Diffuser', price: 290, default: true },
      { size: '500 ml Decanter', price: 550 }
    ],
    sales: 198,
    rating: '4.92',
    badge: 'Sanctuary Blend'
  },
  {
    id: 'sahara-incense',
    category: 'home-purifier',
    categoryLabel: 'Home Purifier',
    scentName: 'Sahara Incense',
    arabic: 'بخور الصحراء',
    title: 'Sahara Incense Home Purifier',
    subtitle: 'Warm Resin Diffuser · Interior Scent',
    family: 'Roasted Myrrh & Tonka',
    color: '#4c2416',
    highlight: '#df9555',
    img: 'diffuser-home-sahara-incense.png',
    top: 'Black cardamom and elemi resin',
    heart: 'Roasted myrrh and dry amber',
    base: 'Guaiac wood and toasted tonka',
    story: 'Rich desert amber warmth bottled purely as a smoke-free architectural diffuser for evening lounges and dining halls.',
    sizes: [
      { size: '200 ml Diffuser', price: 330, default: true },
      { size: '500 ml Decanter', price: 620 }
    ],
    sales: 215,
    rating: '4.94',
    badge: 'Evening Interior'
  },
  {
    id: 'carbon-drift',
    category: 'car-purifier',
    categoryLabel: 'Car Purifier',
    scentName: 'Carbon Drift',
    arabic: 'كربون دريفت',
    title: 'Carbon Drift Car Purifier',
    subtitle: 'Anodized Vent Diffuser · Cabin Formulation',
    family: 'Ozone & Smoked Cabin Leather',
    color: '#1e242b',
    highlight: '#a3b8cc',
    img: 'purifier-car-carbon-drift.png',
    top: 'Alpine ozone and cold mint leaf',
    heart: 'Brushed grey suede and violet',
    base: 'Smoked leather and black vetiver',
    story: 'Precision-milled obsidian rotary clip crafted exclusively for grand tourer cabins—neutralizes stale air with crisp ozone and matte leather.',
    sizes: [
      { size: 'Diffuser + 2 Cores', price: 190, default: true },
      { size: '3 Refill Cores', price: 140 }
    ],
    sales: 302,
    rating: '4.95',
    badge: 'Most Coveted Car'
  },
  {
    id: 'dune-espresso',
    category: 'car-purifier',
    categoryLabel: 'Car Purifier',
    scentName: 'Dune Espresso',
    arabic: 'قهوة الكثبان',
    title: 'Dune Espresso Car Purifier',
    subtitle: 'Rotary Gold Vent Clip · Cabin Formulation',
    family: 'Roasted Arabica & Cedar',
    color: '#3d2817',
    highlight: '#cfa061',
    img: 'purifier-car-dune-espresso.png',
    top: 'Spiced petitgrain and black pepper',
    heart: 'Dark-roasted Arabica and cocoa nib',
    base: 'Virginia cedar and dry amber',
    story: 'An energizing nocturnal cabin purifier blending freshly ground Arabian roast beans over dry cedarwood.',
    sizes: [
      { size: 'Diffuser + 2 Cores', price: 210, default: true },
      { size: '3 Refill Cores', price: 150 }
    ],
    sales: 190,
    rating: '4.91',
    badge: 'Nocturne Drive'
  },
  {
    id: 'chrome-citrus',
    category: 'car-purifier',
    categoryLabel: 'Car Purifier',
    scentName: 'Chrome Citrus',
    arabic: 'حمضيات الكروم',
    title: 'Chrome Citrus Car Purifier',
    subtitle: 'Metallic Cabin Diffuser · Cabin Formulation',
    family: 'Green Mandarin & Neroli',
    color: '#22362d',
    highlight: '#8fc9a7',
    img: 'purifier-car-chrome-citrus.png',
    top: 'Crushed green mandarin and lemon',
    heart: 'Crisp orange blossom and bamboo',
    base: 'Driftwood and sheer air musk',
    story: 'Sunlit coastal vitality formulated strictly as a cabin purifier core to keep daytime desert drives bright and effortless.',
    sizes: [
      { size: 'Diffuser + 2 Cores', price: 180, default: true },
      { size: '3 Refill Cores', price: 130 }
    ],
    sales: 164,
    rating: '4.89',
    badge: 'Daylight Drive'
  }
];

const SALES_RANK_METRICS = {
  'oud-rose-extrait': { sales: 412, rating: '4.98', badge: '#1 Best Seller' },
  'oud-maracuja-extrait': { sales: 346, rating: '4.96', badge: 'Collector Choice' },
  'avenor-extrait': { sales: 294, rating: '4.94', badge: 'Atelier Icon' },
  'scentra-extrait': { sales: 240, rating: '4.92', badge: 'Golden Reserve' },
  'oud-rose-atomizer': { sales: 175, rating: '4.91', badge: 'Travel Extrait' },
  'oud-maracuja-atomizer': { sales: 158, rating: '4.90', badge: 'Travel Extrait' },
  'avenor-atomizer': { sales: 142, rating: '4.88', badge: 'Travel Extrait' },
  'scentra-atomizer': { sales: 126, rating: '4.87', badge: 'Travel Extrait' }
};

/**
 * Generates the unified 14-item catalog:
 * - 8 Fine Perfumes (4 Extraits + 4 Travel Atomizers)
 * - 3 Home Purifiers (separate ambient scents)
 * - 3 Car Purifiers (separate automotive scents)
 */
const SEED_CATALOG = (() => {
  const items = [];

  S.forEach((scent, scentIndex) => {
    const meta = SCENT_META[scent.id] || { family: scent.tagline, story: scent.tagline };

    PC.slice(0, 2).forEach((piece) => {
      const catalogId = `${scent.id}-${piece.id}`;
      const metrics = SALES_RANK_METRICS[catalogId] || { sales: 110, rating: '4.88', badge: null };
      const defaultObj = piece.sizes.find((s) => s.default) || piece.sizes[0];
      const title = `${scent.name} ${piece.name}`;

      items.push({
        catalogId,
        scentIndex,
        scentId: scent.id,
        scentName: scent.name,
        arabic: scent.arabic,
        color: scent.color,
        highlight: scent.highlight,
        bottleImg: scent.bottleImg,
        visualType: piece.type, // 'parfum' or 'atomizer'
        category: 'perfume',
        categoryLabel: 'Fine Perfume',
        subLabel: piece.name,
        title,
        subtitle: piece.desc,
        family: meta.family,
        story: meta.story,
        top: scent.top,
        heart: scent.heart,
        base: scent.base,
        sizes: piece.sizes.map((s) => ({ ...s })),
        defaultSize: defaultObj.size,
        salesCount: metrics.sales,
        rating: metrics.rating,
        badge: metrics.badge,
        searchableText: `${title} fine perfume extrait ${scent.name} ${scent.arabic} ${piece.name} ${meta.family} ${scent.top} ${scent.heart} ${scent.base} ${meta.story}`.toLowerCase()
      });
    });
  });

  PURIFIER_LINES.forEach((purifier) => {
    const defaultObj = purifier.sizes.find((s) => s.default) || purifier.sizes[0];
    items.push({
      catalogId: purifier.id,
      scentIndex: null,
      scentId: purifier.id,
      scentName: purifier.scentName,
      arabic: purifier.arabic,
      color: purifier.color,
      highlight: purifier.highlight,
      bottleImg: purifier.img || null,
      visualType: purifier.category, // 'home-purifier' or 'car-purifier'
      category: purifier.category,
      categoryLabel: purifier.categoryLabel,
      subLabel: purifier.categoryLabel,
      title: purifier.title,
      subtitle: purifier.subtitle,
      family: purifier.family,
      story: purifier.story,
      top: purifier.top,
      heart: purifier.heart,
      base: purifier.base,
      sizes: purifier.sizes.map((s) => ({ ...s })),
      defaultSize: defaultObj.size,
      salesCount: purifier.sales,
      rating: purifier.rating,
      badge: purifier.badge,
      searchableText: `${purifier.title} ${purifier.categoryLabel} ${purifier.scentName} ${purifier.arabic} ${purifier.family} ${purifier.top} ${purifier.heart} ${purifier.base} ${purifier.story}`.toLowerCase()
    });
  });

  return items;
})();

/* ==========================================================================
   Atelier CMS Client-Side Persistence & Live State Service
   ========================================================================== */

let CATALOG = null;

const CMS_STORAGE_KEY = 'leeduh_cms_catalog';
const CMS_SETTINGS_KEY = 'leeduh_cms_settings';
const CMS_ORDERS_KEY = 'leeduh_cms_orders';
const CMS_REGISTRY_KEY = 'leeduh_cms_registry';

const DEFAULT_SETTINGS = {
  announcementText: 'Complimentary UAE delivery on orders over AED 500 · Prices include 5% VAT',
  deliveryThreshold: 500,
  bundleDiscountPercent: 10,
  ritualBundlePrice: 549,
  ritualBundleWasPrice: 610,
  featuredScentIndex: 0,
  conciergePhone: '+971 4 248 1900',
  conciergeEmail: 'concierge@leeduh.ae',
  conciergeAddress: 'Building 7, Dubai Design District (d3), Dubai, UAE'
};

const AtelierCMS = {
  getSeedCatalog() {
    return JSON.parse(JSON.stringify(SEED_CATALOG));
  },
  getCatalog() {
    try {
      const raw = localStorage.getItem(CMS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('CMS read catalog fallback:', e);
    }
    const seed = this.getSeedCatalog();
    this.saveCatalog(seed, false);
    return seed;
  },
  saveCatalog(items, notify = true) {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(items));
      CATALOG = items;
      if (notify) {
        window.dispatchEvent(new CustomEvent('atelier-cms-catalog-updated', { detail: items }));
      }
    } catch (e) {
      console.error('CMS save catalog error:', e);
    }
  },
  getSettings() {
    try {
      const raw = localStorage.getItem(CMS_SETTINGS_KEY);
      if (raw) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn('CMS read settings fallback:', e);
    }
    return { ...DEFAULT_SETTINGS };
  },
  saveSettings(settings, notify = true) {
    try {
      const merged = { ...this.getSettings(), ...settings };
      localStorage.setItem(CMS_SETTINGS_KEY, JSON.stringify(merged));
      if (notify) {
        window.dispatchEvent(new CustomEvent('atelier-cms-settings-updated', { detail: merged }));
      }
      return merged;
    } catch (e) {
      console.error('CMS save settings error:', e);
      return settings;
    }
  },
  getOrders() {
    try {
      const raw = localStorage.getItem(CMS_ORDERS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  },
  saveOrder(order) {
    try {
      const orders = this.getOrders();
      orders.unshift(order);
      localStorage.setItem(CMS_ORDERS_KEY, JSON.stringify(orders));
      return orders;
    } catch (e) {
      console.error('CMS save order error:', e);
      return [];
    }
  },
  getSubscribers() {
    try {
      const raw = localStorage.getItem(CMS_REGISTRY_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  },
  addSubscriber(email) {
    try {
      const subs = this.getSubscribers();
      if (!subs.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
        subs.unshift({ email, date: new Date().toLocaleDateString('en-GB') });
        localStorage.setItem(CMS_REGISTRY_KEY, JSON.stringify(subs));
      }
      return subs;
    } catch (e) {
      return [];
    }
  },
  clearSubscribers() {
    localStorage.removeItem(CMS_REGISTRY_KEY);
  },
  resetToFactory() {
    const seed = this.getSeedCatalog();
    this.saveCatalog(seed, true);
    this.saveSettings(DEFAULT_SETTINGS, true);
    return { catalog: seed, settings: DEFAULT_SETTINGS };
  }
};

window.AtelierCMS = AtelierCMS;

CATALOG = AtelierCMS.getCatalog();

/**
 * Helper: Build a formatted Fine Perfume item for #perfumes (including Gift Coffret)
 */
function buildPerfumeFormatItem(scentIndex, formatId) {
  const scent = S[scentIndex];
  const piece = PC.find((p) => p.id === formatId) || PC[0];
  if (!scent || !piece) return null;

  const catalogId = `${scent.id}-${piece.id}`;
  const fromCatalog = CATALOG.find((c) => c.catalogId === catalogId);
  if (fromCatalog) return fromCatalog;

  const meta = SCENT_META[scent.id] || { family: scent.tagline, story: scent.tagline };
  const defaultObj = piece.sizes.find((s) => s.default) || piece.sizes[0];

  return {
    catalogId,
    scentIndex,
    scentId: scent.id,
    scentName: scent.name,
    arabic: scent.arabic,
    color: scent.color,
    highlight: scent.highlight,
    bottleImg: null,
    visualType: piece.type, // 'coffret'
    category: 'perfume',
    categoryLabel: 'Fine Perfume',
    subLabel: piece.name,
    title: `${scent.name} ${piece.name}`,
    subtitle: piece.desc,
    family: meta.family,
    story: meta.story,
    top: scent.top,
    heart: scent.heart,
    base: scent.base,
    sizes: piece.sizes.map((s) => ({ ...s })),
    defaultSize: defaultObj.size,
    salesCount: 95,
    rating: '4.93',
    badge: 'Gift Edition'
  };
}

function findBuyableItem(catalogId) {
  if (!catalogId) return null;
  const fromCatalog = CATALOG.find((c) => c.catalogId === catalogId);
  if (fromCatalog) return fromCatalog;

  if (catalogId.endsWith('-coffret')) {
    const scentId = catalogId.replace(/-coffret$/, '');
    const scentIndex = S.findIndex((s) => s.id === scentId);
    if (scentIndex >= 0) {
      return buildPerfumeFormatItem(scentIndex, 'coffret');
    }
  }
  return null;
}

/* ==========================================================================
   2. State & Persistence
   ========================================================================== */

const DEFAULT_PROFILE = {
  isSignedIn: true,
  fullName: 'Layla Al Maktoum',
  email: 'layla.almaktoum@atelier-client.ae',
  phone: '+971 50 482 1920',
  emirate: 'Dubai',
  address: 'Villa 14, Jumeirah 1, Dubai',
  preferredFamily: 'Oud & Floral',
  orders: [
    {
      id: 'LD-2026-0418',
      date: '24 Oct 2026',
      status: 'Delivered · Dubai Courier',
      total: 880,
      items: [
        { title: 'Oud Rose Extrait de Parfum', size: '50 ml', qty: 1, price: 380 },
        { title: 'Qasr Velvet Home Purifier', size: '200 ml Diffuser', qty: 1, price: 310 },
        { title: 'Carbon Drift Car Purifier', size: 'Diffuser + 2 Cores', qty: 1, price: 190 }
      ]
    }
  ]
};

const STATE = {
  activePerfumeFormat: 'extrait',
  purifierTab: 'all',
  selectedSizesById: {},
  quickViewId: null,
  bag: [],
  wishlist: [],
  profile: JSON.parse(JSON.stringify(DEFAULT_PROFILE)),
  catalogFilters: {
    search: '',
    category: 'all',
    scent: 'all',
    family: 'all',
    priceRange: 'all',
    maxPrice: 660,
    format: 'all',
    sort: 'featured'
  }
};

// Seed default selected sizes for all catalog items & coffrets
CATALOG.forEach((item) => {
  STATE.selectedSizesById[item.catalogId] = item.defaultSize;
});
S.forEach((scent) => {
  const coffretPiece = PC.find((p) => p.id === 'coffret');
  if (coffretPiece) {
    STATE.selectedSizesById[`${scent.id}-coffret`] = coffretPiece.sizes[0].size;
  }
});

const STORAGE_KEY = 'leeduh-bag';
const WISHLIST_KEY = 'leeduh-wishlist';
const PROFILE_KEY = 'leeduh-profile';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function formatAED(amount) {
  return 'AED ' + Number(amount).toLocaleString('en-US');
}

function getHeartSVG(filled = false) {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
}

function loadBag() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) STATE.bag = JSON.parse(raw);
  } catch (err) {
    console.warn('Unable to load bag from localStorage', err);
    STATE.bag = [];
  }
}

function saveBag() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.bag));
  } catch (err) {
    console.warn('Unable to persist bag to localStorage', err);
  }
}

function loadWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (raw) STATE.wishlist = JSON.parse(raw);
  } catch (err) {
    console.warn('Unable to load wishlist from localStorage', err);
    STATE.wishlist = [];
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(STATE.wishlist));
  } catch (err) {
    console.warn('Unable to persist wishlist to localStorage', err);
  }
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      STATE.profile = { ...JSON.parse(JSON.stringify(DEFAULT_PROFILE)), ...parsed };
    }
  } catch (err) {
    console.warn('Unable to load profile from localStorage', err);
    STATE.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
  }
}

function saveProfile() {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(STATE.profile));
  } catch (err) {
    console.warn('Unable to persist profile to localStorage', err);
  }
}

function showToast(message) {
  const container = document.getElementById('toastRegion');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3400);
}

/* ==========================================================================
   3. Inline SVG Asset Generators (Atomizers, Coffrets, Home & Car Purifiers)
   ========================================================================== */

function createTravelAtomizerSVG(scent) {
  return `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="43" y="12" width="14" height="6" rx="1" fill="#c9a24a" />
      <rect x="38" y="18" width="24" height="16" rx="2" fill="#e6c878" stroke="#8a6a25" stroke-width="1" />
      <line x1="38" y1="26" x2="62" y2="26" stroke="#8a6a25" stroke-width="1" />
      <rect x="36" y="34" width="28" height="54" rx="4" fill="#14110e" stroke="#c9a24a" stroke-width="1.2" />
      <rect x="39" y="38" width="5" height="46" rx="1" fill="${scent.color}" opacity="0.9" />
      <rect x="45" y="48" width="14" height="22" rx="1" fill="#0b0a09" stroke="#c9a24a" stroke-width="0.6" stroke-opacity="0.55" />
      <image href="brand-monogram.png" x="45" y="49" width="14" height="13" />
      <text x="52" y="67" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.5" font-weight="700" letter-spacing="1" fill="#e6c878">10ML</text>
    </svg>
  `;
}

function createCoffretSVG(scent) {
  return `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="18" y="26" width="64" height="52" rx="3" fill="#14110e" stroke="#c9a24a" stroke-width="1.2" />
      <line x1="18" y1="42" x2="82" y2="42" stroke="#c9a24a" stroke-width="1.2" />
      <rect x="44" y="26" width="12" height="52" fill="${scent.color}" fill-opacity="0.65" stroke="#c9a24a" stroke-width="0.7" />
      <circle cx="50" cy="42" r="9" fill="#0b0a09" stroke="#e6c878" stroke-width="1.1" />
      <image href="brand-monogram.png" x="43" y="36" width="14" height="12" />
      <text x="50" y="68" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="700" letter-spacing="1.4" fill="#c9a24a">COFFRET</text>
    </svg>
  `;
}

function createHomePurifierSVG(purifier) {
  return `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="108" rx="28" ry="4" fill="#121110" opacity="0.18" />
      <line x1="58" y1="42" x2="36" y2="10" stroke="#8a6a25" stroke-width="2" stroke-linecap="round" />
      <line x1="60" y1="42" x2="52" y2="6" stroke="#c9a24a" stroke-width="2" stroke-linecap="round" />
      <line x1="61" y1="42" x2="68" y2="7" stroke="#9b9183" stroke-width="2" stroke-linecap="round" />
      <line x1="63" y1="42" x2="84" y2="12" stroke="#c9a24a" stroke-width="2" stroke-linecap="round" />
      <rect x="49" y="34" width="22" height="9" rx="1.5" fill="#c9a24a" stroke="#8a6a25" stroke-width="0.75" />
      <path d="M 32 54 C 32 45 42 43 60 43 C 78 43 88 45 88 54 L 84 102 C 84 105 81 107 78 107 L 42 107 C 39 107 36 105 36 102 Z" fill="${purifier.color}" stroke="#c9a24a" stroke-width="1.2" stroke-opacity="0.65" />
      <path d="M 38 56 L 41 101" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.22" stroke-linecap="round" />
      <rect x="42" y="60" width="36" height="32" rx="1" fill="#0b0a09" stroke="#c9a24a" stroke-width="0.8" stroke-opacity="0.7" />
      <image href="brand-monogram.png" x="52" y="63" width="16" height="14" />
      <text x="60" y="84" text-anchor="middle" font-family="'Inter', sans-serif" font-size="5" font-weight="700" letter-spacing="1.2" fill="#e6c878">HOME</text>
      <text x="60" y="90" text-anchor="middle" font-family="'Cormorant', serif" font-size="5" font-style="italic" fill="#c9bfa9">Purifier</text>
    </svg>
  `;
}

function createCarPurifierSVG(purifier) {
  return `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="108" rx="26" ry="4" fill="#121110" opacity="0.18" />
      <rect x="55" y="90" width="10" height="12" rx="1.5" fill="#1c1813" stroke="#8a6a25" stroke-width="1" />
      <circle cx="60" cy="56" r="36" fill="#0b0a09" stroke="#c9a24a" stroke-width="2" />
      <circle cx="60" cy="56" r="32" fill="${purifier.color}" stroke="#e6c878" stroke-width="0.8" stroke-opacity="0.6" />
      <circle cx="60" cy="56" r="24" fill="#14110e" stroke="#c9a24a" stroke-width="0.8" stroke-dasharray="3 3" />
      <line x1="60" y1="24" x2="60" y2="88" stroke="#c9a24a" stroke-width="0.7" stroke-opacity="0.3" />
      <line x1="28" y1="56" x2="92" y2="56" stroke="#c9a24a" stroke-width="0.7" stroke-opacity="0.3" />
      <circle cx="60" cy="56" r="16" fill="#0b0a09" stroke="#e6c878" stroke-width="1.2" />
      <image href="brand-monogram.png" x="51" y="45" width="18" height="15" />
      <text x="60" y="67" text-anchor="middle" font-family="'Inter', sans-serif" font-size="4.8" font-weight="700" letter-spacing="1.2" fill="#e6c878">CAR</text>
      <path d="M 35 36 A 32 32 0 0 1 60 24" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.28" stroke-linecap="round" fill="none" />
    </svg>
  `;
}

function getItemVisualHTML(item) {
  if (item.bottleImg) {
    return `<img src="${item.bottleImg}" alt="${item.title}" loading="lazy">`;
  }
  if (item.visualType === 'atomizer') {
    return createTravelAtomizerSVG(item);
  }
  if (item.visualType === 'coffret') {
    return createCoffretSVG(item);
  }
  if (item.visualType === 'home-purifier') {
    return createHomePurifierSVG(item);
  }
  if (item.visualType === 'car-purifier') {
    return createCarPurifierSVG(item);
  }
  return createHomePurifierSVG(item);
}

/* ==========================================================================
   4. Shared Minimalist Card Renderer & Size Selection Sync
   ========================================================================== */

function getSelectedSizeObj(item) {
  const chosenSize = STATE.selectedSizesById[item.catalogId] || item.defaultSize;
  return item.sizes.find((s) => s.size === chosenSize) || item.sizes[0];
}

function renderBoutiqueCard(item, badgeOverride = null) {
  const sizeObj = getSelectedSizeObj(item);
  const saved = isInWishlist(item.catalogId);
  const badgeText = badgeOverride !== null ? badgeOverride : item.badge;
  const lineCaption = `${item.categoryLabel} · ${sizeObj.size}`;

  return `
    <article class="boutique-card" data-catalog-card="${item.catalogId}">
      <div class="card-media-box">
        ${badgeText ? `<span class="card-subtle-badge">${badgeText}</span>` : ''}
        <button type="button" class="card-wish-btn ${saved ? 'active' : ''}" data-wishlist-id="${item.catalogId}" aria-pressed="${saved ? 'true' : 'false'}" aria-label="Save ${item.title} to wishlist">
          ${getHeartSVG(saved)}
        </button>
        <button type="button" class="card-media-trigger" data-quick-view="${item.catalogId}" aria-label="View details for ${item.title}">
          ${getItemVisualHTML(item)}
        </button>
        <div class="card-gissah-actions">
          <button type="button" class="card-hover-add-btn" data-card-add="${item.catalogId}">
            Add to Cart
          </button>
          <button type="button" class="card-hover-buy-btn" data-card-buy="${item.catalogId}">
            &#9889; Buy Now
          </button>
        </div>
      </div>

      <div class="card-info-body">
        <span class="card-line-caption">${lineCaption}</span>
        <button type="button" class="card-title-btn" data-quick-view="${item.catalogId}">
          <span class="card-title-text">${item.title}</span>
          ${item.arabic ? `<span class="card-title-arabic">${item.arabic}</span>` : ''}
        </button>
        <span class="card-notes-sub">${item.family || item.subtitle || ''}</span>
        <div class="card-price-row">
          <span class="card-price-text">${formatAED(sizeObj.price)}</span>
          <span class="card-vat-pill">VAT incl.</span>
        </div>
      </div>
    </article>
  `;
}

function selectCardSize(catalogId, sizeLabel) {
  const item = findBuyableItem(catalogId);
  if (!item) return;
  const sizeObj = item.sizes.find((s) => s.size === sizeLabel) || item.sizes[0];
  STATE.selectedSizesById[catalogId] = sizeObj.size;

  // Sync price and selected size caption across every matching lookbook card
  document.querySelectorAll(`[data-catalog-card="${catalogId}"]`).forEach((card) => {
    card.querySelectorAll('.card-size-pill').forEach((pill) => {
      const match = pill.getAttribute('data-card-size') === sizeObj.size;
      pill.classList.toggle('active', match);
      pill.setAttribute('aria-checked', match ? 'true' : 'false');
    });
    const captionEl = card.querySelector('.card-line-caption');
    if (captionEl) captionEl.textContent = `${item.categoryLabel} · ${sizeObj.size}`;
    const priceEl = card.querySelector('.card-price-text');
    if (priceEl) priceEl.textContent = formatAED(sizeObj.price);
  });

  // Update Slide-Over Quick-View drawer in place if open for this item
  if (STATE.quickViewId === catalogId) {
    const qvDialog = document.getElementById('quickViewDialog');
    if (qvDialog && qvDialog.open) {
      document.querySelectorAll('#quickViewDialog [data-qv-size]').forEach((pill) => {
        const match = pill.getAttribute('data-qv-size') === sizeObj.size;
        pill.classList.toggle('active', match);
        pill.setAttribute('aria-checked', match ? 'true' : 'false');
      });
      const qvPrice = document.getElementById('qvLivePrice');
      const qvAddBtn = document.getElementById('qvAddToBagBtn');
      if (qvPrice) qvPrice.textContent = formatAED(sizeObj.price);
      if (qvAddBtn) qvAddBtn.textContent = `Add to Bag · ${formatAED(sizeObj.price)}`;
    }
  }

  // Re-run catalog sort dynamically if currently sorted by price
  if (STATE.catalogFilters.sort === 'price-asc' || STATE.catalogFilters.sort === 'price-desc') {
    renderCatalog();
  }
}

/* ==========================================================================
   5. Collections, Best Sellers, Fine Perfumes & Purifiers Renderers
   ========================================================================== */

function mountCategoryIcons() {
  const homeMount = document.getElementById('catHomeSvgMount');
  const carMount = document.getElementById('catCarSvgMount');
  if (homeMount) {
    homeMount.innerHTML = `<img src="${PURIFIER_LINES[0].img}" alt="Home Purifiers" loading="lazy">`;
  }
  if (carMount) {
    carMount.innerHTML = `<img src="${PURIFIER_LINES[3].img}" alt="Car Purifiers" loading="lazy">`;
  }
}

function initCategoryTiles() {
  document.querySelectorAll('#collections .category-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const targetSel = tile.getAttribute('data-scroll-target') || '#perfumes';
      const jumpFormat = tile.getAttribute('data-jump-format');
      const jumpCategory = tile.getAttribute('data-jump-category');
      const jumpPurifier = tile.getAttribute('data-jump-purifier');

      if (jumpPurifier) {
        const targetEl = document.querySelector(targetSel);
        if (targetEl) {
          setActivePurifierTab(jumpPurifier);
          const offsetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 78;
          window.scrollTo({
            top: Math.max(0, offsetPos),
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
          });
        } else {
          window.location.href = `purifiers.html?tab=${jumpPurifier}`;
        }
        return;
      }

      if (jumpFormat) {
        setActivePerfumeFormat(jumpFormat);
      } else if (jumpCategory === 'perfume') {
        setActivePerfumeFormat('extrait');
      }

      const targetEl = document.querySelector(targetSel);
      if (targetEl) {
        const offsetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 78;
        window.scrollTo({
          top: Math.max(0, offsetPos),
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    });
  });
}

function renderBestSellers() {
  const grid = document.getElementById('bestsellersGrid');
  if (!grid) return;

  const topFour = [...CATALOG].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);
  grid.innerHTML = topFour.map((item, idx) => renderBoutiqueCard(item, idx === 0 ? '#1 Best Seller' : item.badge)).join('');
}

function animateDynamicGrid(grid) {
  if (!grid || prefersReducedMotion.matches) return;
  Array.from(grid.children).forEach((el, idx) => {
    el.style.setProperty('--enter-delay', `${Math.min(idx, 7) * 55}ms`);
    el.classList.add('card-enter');
  });
}

function setActivePerfumeFormat(formatId) {
  STATE.activePerfumeFormat = formatId;
  document.querySelectorAll('#perfumeFormatTabs [data-perfume-format]').forEach((tab) => {
    const active = tab.getAttribute('data-perfume-format') === formatId;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  renderFinePerfumes();
  animateDynamicGrid(document.getElementById('finePerfumesGrid'));
}

function initPerfumeFormatTabs() {
  document.querySelectorAll('#perfumeFormatTabs [data-perfume-format]').forEach((tab) => {
    tab.addEventListener('click', () => {
      setActivePerfumeFormat(tab.getAttribute('data-perfume-format') || 'extrait');
    });
  });

  const addRitualBtn = document.getElementById('addRitualSetBtn');
  if (addRitualBtn) {
    addRitualBtn.addEventListener('click', () => {
      const select = document.getElementById('ritualScentSelect');
      const scentIndex = select ? Number(select.value) : 0;
      addRitualSetForScent(scentIndex);
    });
  }
}

function renderFinePerfumes() {
  const grid = document.getElementById('finePerfumesGrid');
  if (!grid) return;

  const formatId = STATE.activePerfumeFormat || 'extrait';
  const cards = S.map((_, idx) => {
    const item = buildPerfumeFormatItem(idx, formatId);
    return item ? renderBoutiqueCard(item, item.badge) : '';
  });

  grid.innerHTML = cards.join('');
}

function getRitualBundlePricing() {
  const extrav = PC[0].sizes.find((s) => s.default) || PC[0].sizes[1]; // 50ml -> 380
  const atom = PC[1].sizes.find((s) => s.default) || PC[1].sizes[0];   // 10ml -> 140
  const coff = PC[2].sizes.find((s) => s.default) || PC[2].sizes[0];   // Gift Box -> 90
  const sum = extrav.price + atom.price + coff.price; // 610
  const discounted = Math.round(extrav.price * 0.9) + Math.round(atom.price * 0.9) + Math.round(coff.price * 0.9); // 549
  return { sum, discounted };
}

function addRitualSetForScent(scentIndex) {
  const scent = S[scentIndex] || S[0];
  let setTotal = 0;

  PC.forEach((piece) => {
    const defaultSizeObj = piece.sizes.find((s) => s.default) || piece.sizes[0];
    const discountedPrice = Math.round(defaultSizeObj.price * 0.9);
    setTotal += discountedPrice;
    addItemToBag(scent, piece, defaultSizeObj.size, discountedPrice, true);
  });

  showToast(`3-Piece Set (${scent.name}) added to bag · ${formatAED(setTotal)}`);
}

function setActivePurifierTab(tabName) {
  STATE.purifierTab = tabName || 'all';
  document.querySelectorAll('#purifierSectionTabs [data-purifier-tab]').forEach((tab) => {
    const active = tab.getAttribute('data-purifier-tab') === STATE.purifierTab;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  renderPurifiersShowcase();
  animateDynamicGrid(document.getElementById('purifiersShowcaseGrid'));
}

function initPurifierTabs() {
  if (typeof window !== 'undefined' && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') || params.get('category');
    if (tabParam && ['all', 'home-purifier', 'car-purifier'].includes(tabParam)) {
      STATE.purifierTab = tabParam;
    }
  }

  document.querySelectorAll('#purifierSectionTabs [data-purifier-tab]').forEach((tab) => {
    const active = tab.getAttribute('data-purifier-tab') === STATE.purifierTab;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');

    tab.addEventListener('click', () => {
      setActivePurifierTab(tab.getAttribute('data-purifier-tab') || 'all');
    });
  });
}

function renderPurifiersShowcase() {
  const grid = document.getElementById('purifiersShowcaseGrid');
  if (!grid) return;

  const activeTab = STATE.purifierTab || 'all';
  const purifiers = CATALOG.filter((item) => {
    if (item.category !== 'home-purifier' && item.category !== 'car-purifier') return false;
    if (activeTab !== 'all' && item.category !== activeTab) return false;
    return true;
  });

  grid.innerHTML = purifiers.map((item) => renderBoutiqueCard(item)).join('');
}

/* ==========================================================================
   6. Complete Catalog Search, Filter & Sort (#catalog)
   ========================================================================== */

function getCatalogItemCurrentPrice(item) {
  return getSelectedSizeObj(item).price;
}

function matchesCategory(item, catFilter) {
  if (catFilter === 'all') return true;
  return item.category === catFilter;
}

function matchesScent(item, scentFilter) {
  if (scentFilter === 'all') return true;
  if (scentFilter === 'ambient-purifiers') {
    return item.category === 'home-purifier' || item.category === 'car-purifier';
  }
  return item.scentId === scentFilter;
}

function matchesFamily(item, familyFilter) {
  if (familyFilter === 'all') return true;
  const fam = (item.family || '').toLowerCase();
  const notes = `${item.top || ''} ${item.heart || ''} ${item.base || ''} ${item.subtitle || ''} ${item.story || ''}`.toLowerCase();

  switch (familyFilter) {
    case 'oud-rose':
      return fam.includes('rose') || fam.includes('taif') || notes.includes('rose');
    case 'woods-citrus':
      return fam.includes('woods') || fam.includes('citrus') || fam.includes('birch') || notes.includes('bergamot') || notes.includes('birch') || notes.includes('mandarin') || notes.includes('cedar');
    case 'amber-spice':
      return fam.includes('amber') || fam.includes('saffron') || fam.includes('spice') || fam.includes('tonka') || notes.includes('saffron') || notes.includes('cardamom') || notes.includes('tonka') || notes.includes('vanilla');
    case 'oud-fruit':
      return fam.includes('fruit') || fam.includes('maracuja') || notes.includes('passionfruit') || notes.includes('fig');
    case 'resin-leather':
      return fam.includes('leather') || fam.includes('suede') || fam.includes('resin') || fam.includes('frankincense') || fam.includes('myrrh') || notes.includes('leather') || notes.includes('frankincense') || notes.includes('myrrh') || notes.includes('suede');
    case 'fresh-mineral':
      return fam.includes('mineral') || fam.includes('ozone') || fam.includes('musk') || notes.includes('ozone') || notes.includes('iris') || notes.includes('neroli') || notes.includes('mint') || notes.includes('cypress');
    default:
      return true;
  }
}

function matchesFormat(item, formatFilter) {
  if (formatFilter === 'all') return true;
  if (formatFilter === 'parfum') {
    return item.visualType === 'parfum' || (item.category === 'perfume' && item.subLabel.toLowerCase().includes('extrait'));
  }
  if (formatFilter === 'atomizer') {
    return item.visualType === 'atomizer' || (item.category === 'perfume' && item.subLabel.toLowerCase().includes('atomizer'));
  }
  if (formatFilter === 'home-purifier') {
    return item.category === 'home-purifier';
  }
  if (formatFilter === 'car-purifier') {
    return item.category === 'car-purifier';
  }
  return true;
}

function matchesPrice(item, priceBracket, maxPrice) {
  const price = getCatalogItemCurrentPrice(item);
  if (maxPrice !== null && maxPrice !== undefined && price > maxPrice) return false;

  switch (priceBracket) {
    case 'under-200':
      return price < 200;
    case '200-400':
      return price >= 200 && price <= 400;
    case 'over-400':
      return price > 400;
    case 'all':
    default:
      return true;
  }
}

function resetCatalogFilters() {
  STATE.catalogFilters = {
    search: '',
    category: 'all',
    scent: 'all',
    family: 'all',
    priceRange: 'all',
    maxPrice: 660,
    format: 'all',
    sort: 'featured'
  };

  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');
  const sortSelect = document.getElementById('catalogSortSelect');
  const priceRangeSlider = document.getElementById('catalogPriceRange');
  const priceRangeReadout = document.getElementById('priceRangeReadout');

  if (searchInput) searchInput.value = '';
  if (searchClear) searchClear.hidden = true;
  if (sortSelect) sortSelect.value = 'featured';
  if (priceRangeSlider) priceRangeSlider.value = 660;
  if (priceRangeReadout) priceRangeReadout.textContent = 'Up to AED 660';

  document.querySelectorAll('#catalogCategoryFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-category') === 'all');
  });
  document.querySelectorAll('#catalogScentFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-scent') === 'all');
  });
  document.querySelectorAll('#catalogFamilyFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-family') === 'all');
  });
  document.querySelectorAll('#catalogPriceFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-price-range') === 'all');
  });
  document.querySelectorAll('#catalogFormatFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-format') === 'all');
  });

  renderCatalog();
}

function clearIndividualFilter(type) {
  if (type === 'search') {
    STATE.catalogFilters.search = '';
    const inp = document.getElementById('catalogSearchInput');
    const clr = document.getElementById('catalogSearchClear');
    if (inp) inp.value = '';
    if (clr) clr.hidden = true;
  } else if (type === 'category') {
    STATE.catalogFilters.category = 'all';
    document.querySelectorAll('#catalogCategoryFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-category') === 'all');
    });
  } else if (type === 'scent') {
    STATE.catalogFilters.scent = 'all';
    document.querySelectorAll('#catalogScentFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-scent') === 'all');
    });
  } else if (type === 'family') {
    STATE.catalogFilters.family = 'all';
    document.querySelectorAll('#catalogFamilyFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-family') === 'all');
    });
  } else if (type === 'priceRange') {
    STATE.catalogFilters.priceRange = 'all';
    document.querySelectorAll('#catalogPriceFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-price-range') === 'all');
    });
  } else if (type === 'maxPrice') {
    STATE.catalogFilters.maxPrice = 660;
    const slider = document.getElementById('catalogPriceRange');
    const readout = document.getElementById('priceRangeReadout');
    if (slider) slider.value = 660;
    if (readout) readout.textContent = 'Up to AED 660';
  } else if (type === 'format') {
    STATE.catalogFilters.format = 'all';
    document.querySelectorAll('#catalogFormatFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-format') === 'all');
    });
  }

  renderCatalog();
  animateDynamicGrid(document.getElementById('catalogGrid'));
}

function renderActiveFilterPills() {
  const container = document.getElementById('activeFilterChips');
  const badge = document.getElementById('activeFilterCountBadge');
  const resetBtn = document.getElementById('catalogResetBtn');
  const { search, category, scent, family, priceRange, maxPrice, format, sort } = STATE.catalogFilters;
  const pills = [];

  if (search.trim()) {
    pills.push({ type: 'search', label: `Search: "${search.trim()}"` });
  }
  if (category !== 'all') {
    const catLabels = { 'perfume': 'Fine Perfumes', 'home-purifier': 'Home Purifiers', 'car-purifier': 'Car Purifiers' };
    pills.push({ type: 'category', label: catLabels[category] || category });
  }
  if (scent !== 'all') {
    const scentLabels = { 'oud-rose': 'Oud Rose', 'avenor': 'Avenor', 'scentra': 'Scentra', 'oud-maracuja': 'Oud Maracuja', 'ambient-purifiers': 'Ambient Purifiers' };
    pills.push({ type: 'scent', label: scentLabels[scent] || scent });
  }
  if (family !== 'all') {
    const famLabels = {
      'oud-rose': 'Oud & Rose',
      'woods-citrus': 'Woods & Citrus',
      'amber-spice': 'Amber & Saffron',
      'oud-fruit': 'Oud & Exotic Fruit',
      'resin-leather': 'Resins & Leather',
      'fresh-mineral': 'Fresh & Mineral'
    };
    pills.push({ type: 'family', label: famLabels[family] || family });
  }
  if (priceRange !== 'all') {
    const prLabels = { 'under-200': 'Under AED 200', '200-400': 'AED 200 – 400', 'over-400': 'AED 400+' };
    pills.push({ type: 'priceRange', label: prLabels[priceRange] || priceRange });
  }
  if (maxPrice < 660) {
    pills.push({ type: 'maxPrice', label: `Max ${formatAED(maxPrice)}` });
  }
  if (format !== 'all') {
    const fmtLabels = {
      'parfum': 'Extrait (25%)',
      'atomizer': 'Travel Atomizer',
      'home-purifier': 'Reed Diffuser',
      'car-purifier': 'Car Vent Purifier'
    };
    pills.push({ type: 'format', label: fmtLabels[format] || format });
  }

  if (badge) {
    badge.textContent = pills.length;
    badge.hidden = pills.length === 0;
  }

  if (resetBtn) {
    resetBtn.hidden = pills.length === 0 && sort === 'featured';
  }

  if (!container) return;

  if (pills.length === 0) {
    container.innerHTML = '';
    container.hidden = true;
    return;
  }

  container.hidden = false;
  container.innerHTML = `
    <div class="active-pills-inner">
      <span class="active-pills-label">Active:</span>
      ${pills.map((p) => `
        <button type="button" class="active-filter-tag" data-clear-type="${p.type}" aria-label="Remove filter ${p.label}">
          <span>${p.label}</span>
          <span class="remove-x" aria-hidden="true">&times;</span>
        </button>
      `).join('')}
      <button type="button" class="active-filter-clear-all" id="clearAllFiltersInlineBtn">Clear all</button>
    </div>
  `;

  container.querySelectorAll('.active-filter-tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      const type = tag.getAttribute('data-clear-type');
      clearIndividualFilter(type);
    });
  });

  const clearAllInline = document.getElementById('clearAllFiltersInlineBtn');
  if (clearAllInline) {
    clearAllInline.addEventListener('click', () => {
      resetCatalogFilters();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  }
}

function readUrlParamsIntoFilters() {
  if (typeof window === 'undefined' || !window.location.search) return;
  const params = new URLSearchParams(window.location.search);

  const q = params.get('q') || params.get('search');
  if (q) STATE.catalogFilters.search = q;

  const category = params.get('category');
  if (category) STATE.catalogFilters.category = category;

  const scent = params.get('scent');
  if (scent) STATE.catalogFilters.scent = scent;

  const family = params.get('family');
  if (family) STATE.catalogFilters.family = family;

  const format = params.get('format');
  if (format) STATE.catalogFilters.format = format;

  const priceRange = params.get('priceRange') || params.get('price');
  if (priceRange) STATE.catalogFilters.priceRange = priceRange;

  const maxPrice = params.get('maxPrice');
  if (maxPrice && !isNaN(Number(maxPrice))) STATE.catalogFilters.maxPrice = Number(maxPrice);

  const sort = params.get('sort');
  if (sort) STATE.catalogFilters.sort = sort;

  // Sync inputs
  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');
  const sortSelect = document.getElementById('catalogSortSelect');
  const priceSlider = document.getElementById('catalogPriceRange');
  const priceReadout = document.getElementById('priceRangeReadout');

  if (searchInput && STATE.catalogFilters.search) {
    searchInput.value = STATE.catalogFilters.search;
    if (searchClear) searchClear.hidden = false;
  }
  if (sortSelect && STATE.catalogFilters.sort) {
    sortSelect.value = STATE.catalogFilters.sort;
  }
  if (priceSlider && STATE.catalogFilters.maxPrice < 660) {
    priceSlider.value = STATE.catalogFilters.maxPrice;
    if (priceReadout) priceReadout.textContent = `Up to ${formatAED(STATE.catalogFilters.maxPrice)}`;
  }

  // Sync chips
  if (category) {
    document.querySelectorAll('#catalogCategoryFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-category') === category);
    });
  }
  if (scent) {
    document.querySelectorAll('#catalogScentFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-scent') === scent);
    });
  }
  if (family) {
    document.querySelectorAll('#catalogFamilyFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-family') === family);
    });
  }
  if (priceRange) {
    document.querySelectorAll('#catalogPriceFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-price-range') === priceRange);
    });
  }
  if (format) {
    document.querySelectorAll('#catalogFormatFilters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-format') === format);
    });
  }
}

function initMobileFilterDrawer() {
  const toggleBtn = document.getElementById('mobileFilterToggle');
  const sidebar = document.getElementById('shopFilterSidebar');
  const backdrop = document.getElementById('shopFilterBackdrop');
  const closeBtn = document.getElementById('closeFilterSidebarBtn');
  const applyBtn = document.getElementById('applyMobileFiltersBtn');

  if (!toggleBtn || !sidebar) return;

  function openSidebar() {
    sidebar.classList.add('is-open');
    if (backdrop) backdrop.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    if (backdrop) backdrop.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      closeSidebar();
      const resultsCol = document.querySelector('.shop-results-col') || document.getElementById('catalog');
      if (resultsCol) {
        resultsCol.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      }
    });
  }
}

function initCatalogControls() {
  readUrlParamsIntoFilters();
  initMobileFilterDrawer();

  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');
  const sortSelect = document.getElementById('catalogSortSelect');
  const categoryChips = document.querySelectorAll('#catalogCategoryFilters .filter-chip');
  const scentChips = document.querySelectorAll('#catalogScentFilters .filter-chip');
  const familyChips = document.querySelectorAll('#catalogFamilyFilters .filter-chip');
  const priceChips = document.querySelectorAll('#catalogPriceFilters .filter-chip');
  const formatChips = document.querySelectorAll('#catalogFormatFilters .filter-chip');
  const priceSlider = document.getElementById('catalogPriceRange');
  const priceReadout = document.getElementById('priceRangeReadout');
  const resetBtn = document.getElementById('catalogResetBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      STATE.catalogFilters.search = val;
      if (searchClear) searchClear.hidden = val.trim().length === 0;
      renderCatalog();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      STATE.catalogFilters.search = '';
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClear.hidden = true;
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      STATE.catalogFilters.sort = e.target.value;
      renderCatalog();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  }

  categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      categoryChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.category = chip.getAttribute('data-category') || 'all';
      renderCatalog();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  });

  scentChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      scentChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.scent = chip.getAttribute('data-scent') || 'all';
      renderCatalog();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  });

  familyChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      familyChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.family = chip.getAttribute('data-family') || 'all';
      renderCatalog();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  });

  priceChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      priceChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.priceRange = chip.getAttribute('data-price-range') || 'all';
      renderCatalog();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  });

  formatChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      formatChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.format = chip.getAttribute('data-format') || 'all';
      renderCatalog();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  });

  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      const maxVal = Number(e.target.value);
      STATE.catalogFilters.maxPrice = maxVal;
      if (priceReadout) {
        priceReadout.textContent = maxVal >= 660 ? 'Up to AED 660' : `Up to ${formatAED(maxVal)}`;
      }
      renderCatalog();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetCatalogFilters();
      animateDynamicGrid(document.getElementById('catalogGrid'));
    });
  }
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  const countEl = document.getElementById('catalogResultCount');
  const mobileApplyCount = document.getElementById('mobileApplyCount');
  if (!grid) return;

  const { search, category, scent, family, priceRange, maxPrice, format, sort } = STATE.catalogFilters;
  const query = search.trim().toLowerCase();

  let filtered = CATALOG.filter((item) => {
    if (!matchesCategory(item, category)) return false;
    if (!matchesScent(item, scent)) return false;
    if (!matchesFamily(item, family)) return false;
    if (!matchesFormat(item, format)) return false;
    if (!matchesPrice(item, priceRange, maxPrice)) return false;

    if (query) {
      const corpus = `${item.title} ${item.subtitle || ''} ${item.arabic || ''} ${item.scentName || ''} ${item.categoryLabel || ''} ${item.subLabel || ''} ${item.family || ''} ${item.top || ''} ${item.heart || ''} ${item.base || ''} ${item.story || ''} ${item.searchableText || ''}`.toLowerCase();
      if (!corpus.includes(query)) return false;
    }

    return true;
  });

  if (sort === 'bestselling') {
    filtered.sort((a, b) => b.salesCount - a.salesCount);
  } else if (sort === 'price-asc') {
    filtered.sort((a, b) => getCatalogItemCurrentPrice(a) - getCatalogItemCurrentPrice(b));
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => getCatalogItemCurrentPrice(b) - getCatalogItemCurrentPrice(a));
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'rating-desc') {
    filtered.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
  }

  renderActiveFilterPills();

  if (countEl) {
    countEl.textContent = filtered.length === CATALOG.length
      ? `${CATALOG.length} creations`
      : `${filtered.length} of ${CATALOG.length} creations`;
  }

  if (mobileApplyCount) {
    mobileApplyCount.textContent = filtered.length;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <div class="catalog-empty-icon" aria-hidden="true">&#9671;</div>
        <p class="catalog-empty-title">No creations found</p>
        <p class="catalog-empty-sub">We couldn't find any creations matching your search and filter criteria.</p>
        <button type="button" class="btn-pill-dark" id="emptyResetFiltersBtn">Reset All Filters</button>
      </div>
    `;
    const emptyBtn = document.getElementById('emptyResetFiltersBtn');
    if (emptyBtn) emptyBtn.addEventListener('click', resetCatalogFilters);
    return;
  }

  grid.innerHTML = filtered.map((item) => renderBoutiqueCard(item)).join('');
}

/* ==========================================================================
   7. Slide-Over Quick-View Drawer (#quickViewDialog)
   ========================================================================== */

const quickViewDialog = document.getElementById('quickViewDialog');
const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
const quickViewBody = document.getElementById('quickViewBody');

function openQuickView(catalogId) {
  const item = findBuyableItem(catalogId);
  if (!item || !quickViewDialog || !quickViewBody) return;

  STATE.quickViewId = item.catalogId;
  const sizeObj = getSelectedSizeObj(item);
  const isSaved = isInWishlist(item.catalogId);
  const bundlePricing = getRitualBundlePricing();

  quickViewBody.innerHTML = `
    <div class="qv-drawer-media">
      ${getItemVisualHTML(item)}
    </div>

    <div>
      <div class="qv-head-row">
        <span class="section-kicker">${item.categoryLabel} &middot; ${item.family}</span>
        <span class="quickview-arabic" dir="rtl" lang="ar">${item.arabic}</span>
      </div>
      <h2 class="qv-drawer-title" id="quickViewTitle">${item.title}</h2>
      <div class="qv-live-price" id="qvLivePrice">${formatAED(sizeObj.price)}</div>
    </div>

    <p class="quickview-desc">${item.story}</p>

    <div class="quickview-notes">
      <div class="qv-note-line"><strong>Top</strong><span>${item.top}</span></div>
      <div class="qv-note-line"><strong>Heart</strong><span>${item.heart}</span></div>
      <div class="qv-note-line"><strong>Base</strong><span>${item.base}</span></div>
    </div>

    <div class="qv-sizes-block">
      <span class="qv-sizes-label">Select Size / Format</span>
      <div class="card-sizes-list" role="radiogroup" aria-label="Select format size for ${item.title}">
        ${item.sizes.map((s) => `
          <button type="button" class="card-size-pill ${s.size === sizeObj.size ? 'active' : ''}" data-qv-size="${s.size}" role="radio" aria-checked="${s.size === sizeObj.size ? 'true' : 'false'}">
            ${s.size}
          </button>
        `).join('')}
      </div>
    </div>

    <div class="qv-actions-stack">
      <div class="qv-gissah-btn-row">
        <button type="button" class="gissah-pdp-add" id="qvAddToBagBtn">Add to Cart &middot; ${formatAED(sizeObj.price)}</button>
        <button type="button" class="gissah-pdp-buy" id="qvBuyNowBtn">&#9889; Buy Now</button>
      </div>
      <button type="button" class="btn-pill-outline btn-full qv-wish-btn ${isSaved ? 'active' : ''}" id="qvWishlistBtn" data-wishlist-id="${item.catalogId}" aria-pressed="${isSaved ? 'true' : 'false'}" aria-label="Save ${item.title} to wishlist">
        ${getHeartSVG(isSaved)}
        <span>${isSaved ? 'Saved' : 'Save'}</span>
      </button>
      ${item.category === 'perfume' ? `
        <button type="button" class="btn-pill-outline btn-full" id="qvRitualSetBtn">
          Add 3-Piece Perfume Set (-10%) &middot; ${formatAED(bundlePricing.discounted)}
        </button>
      ` : ''}
    </div>
  `;

  quickViewBody.querySelectorAll('[data-qv-size]').forEach((pill) => {
    pill.addEventListener('click', () => {
      selectCardSize(item.catalogId, pill.getAttribute('data-qv-size'));
    });
  });

  const qvAddBtn = document.getElementById('qvAddToBagBtn');
  if (qvAddBtn) {
    qvAddBtn.addEventListener('click', () => {
      const currentSize = getSelectedSizeObj(item);
      addCatalogItemToBag(item, currentSize.size);
    });
  }

  const qvBuyNowBtn = document.getElementById('qvBuyNowBtn');
  if (qvBuyNowBtn) {
    qvBuyNowBtn.addEventListener('click', () => {
      const currentSize = getSelectedSizeObj(item);
      addCatalogItemToBag(item, currentSize.size);
      closeQuickViewModal();
      openBagModal();
    });
  }

  const qvRitualBtn = document.getElementById('qvRitualSetBtn');
  if (qvRitualBtn && item.scentIndex !== null) {
    qvRitualBtn.addEventListener('click', () => {
      addRitualSetForScent(item.scentIndex);
    });
  }

  if (typeof quickViewDialog.showModal === 'function') {
    quickViewDialog.showModal();
  }
}

function closeQuickViewModal() {
  if (quickViewDialog && quickViewDialog.open) {
    quickViewDialog.close();
  }
  STATE.quickViewId = null;
}

if (closeQuickViewBtn) {
  closeQuickViewBtn.addEventListener('click', closeQuickViewModal);
}
if (quickViewDialog) {
  quickViewDialog.addEventListener('click', (e) => {
    const rect = quickViewDialog.getBoundingClientRect();
    const inDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!inDialog) closeQuickViewModal();
  });
}

/* ==========================================================================
   8. Slide-Over Shopping Bag Drawer, Delivery Threshold & Checkout
   ========================================================================== */

const bagDialog = document.getElementById('bagDialog');
const bagTrigger = document.getElementById('bagTrigger');
const closeBagDialog = document.getElementById('closeBagDialog');
const bagDialogBody = document.getElementById('bagDialogBody');
const bagCountBadge = document.getElementById('bagCountBadge');
const deliveryThresholdNote = document.getElementById('deliveryThresholdNote');
const bagSubtotalAmount = document.getElementById('bagSubtotalAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutStatusMsg = document.getElementById('checkoutStatusMsg');

function addItemToBag(scent, piece, size, price, isRitual = false) {
  const lineTitle = `${scent.name} ${piece.name}`;
  const existing = STATE.bag.find((entry) =>
    entry.title === lineTitle && entry.size === size && entry.isRitual === isRitual
  );

  if (existing) {
    if (existing.qty < 20) existing.qty += 1;
  } else {
    STATE.bag.push({
      id: `${scent.id}-${piece.id}-${size}-${isRitual ? 'ritual' : 'reg'}`,
      title: lineTitle,
      size,
      price,
      qty: 1,
      isRitual
    });
  }

  saveBag();
  updateBagUI();
  if (bagCountBadge && !prefersReducedMotion.matches) {
    bagCountBadge.classList.remove('is-bump');
    void bagCountBadge.offsetWidth;
    bagCountBadge.classList.add('is-bump');
  }
  if (!isRitual) {
    showToast(`${lineTitle} (${size}) added to bag`);
  }
}

function addCatalogItemToBag(catalogItem, selectedSize) {
  if (!catalogItem) return;

  if (catalogItem.category === 'perfume' && catalogItem.scentIndex !== null) {
    const scent = S[catalogItem.scentIndex];
    if (!scent) return;
    const pieceSuffix = catalogItem.catalogId.split('-').pop();
    const piece = PC.find((p) => p.id === pieceSuffix) || PC[0];
    const sizeObj = catalogItem.sizes.find((s) => s.size === selectedSize) || catalogItem.sizes[0];
    addItemToBag(scent, piece, sizeObj.size, sizeObj.price, false);
    return;
  }

  const sizeObj = catalogItem.sizes.find((s) => s.size === selectedSize) || catalogItem.sizes[0];
  const pseudoScent = { id: catalogItem.scentId, name: catalogItem.scentName };
  const pseudoPiece = { id: catalogItem.category, name: catalogItem.categoryLabel };
  addItemToBag(pseudoScent, pseudoPiece, sizeObj.size, sizeObj.price, false);
}

function addHeroOfferToBag(offerKey) {
  const offers = {
    'duo-99': {
      id: 'hero-offer-duo-99',
      title: 'Signature Duo (Oud Rose + Avenor)',
      size: '2 Perfumes · Was AED 110',
      price: 99,
      offerTag: 'duo AED 99',
      toast: 'Duo Offer (2 for AED 99) added to bag'
    },
    'b2g1-110': {
      id: 'hero-offer-b2g1-110',
      title: 'Signature Trio (Avenor, Oud Rose & Oud Maracuja)',
      size: '3 Perfumes · Buy 2, Get 1 Free',
      price: 110,
      offerTag: 'buy 2 get 1',
      toast: 'Buy 2, Get 1 Free Trio (AED 110) added to bag'
    }
  };

  const offer = offers[offerKey];
  if (!offer) return;

  const existing = STATE.bag.find((entry) => entry.id === offer.id);
  if (existing) {
    if (existing.qty < 20) existing.qty += 1;
  } else {
    STATE.bag.push({
      id: offer.id,
      title: offer.title,
      size: offer.size,
      price: offer.price,
      qty: 1,
      isRitual: false,
      offerTag: offer.offerTag
    });
  }

  saveBag();
  updateBagUI();
  if (bagCountBadge && !prefersReducedMotion.matches) {
    bagCountBadge.classList.remove('is-bump');
    void bagCountBadge.offsetWidth;
    bagCountBadge.classList.add('is-bump');
  }
  showToast(offer.toast);
}

function initHeroOffers() {
  document.querySelectorAll('[data-hero-offer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      addHeroOfferToBag(btn.getAttribute('data-hero-offer'));
      if (btn.getAttribute('data-buy-now') === 'true') {
        openBagModal();
      }
    });
  });

  document.querySelectorAll('[data-bundle-ritual]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const scentIdx = Number(btn.getAttribute('data-bundle-ritual') || '0');
      addRitualSetForScent(scentIdx);
      if (btn.getAttribute('data-buy-now') === 'true') {
        openBagModal();
      }
    });
  });
}

function initHeroCarousel() {
  const viewport = document.getElementById('heroCarousel');
  if (!viewport) return;

  const slides = Array.from(viewport.querySelectorAll('[data-hero-slide]'));
  const dots = Array.from(viewport.querySelectorAll('[data-hero-goto]'));
  const prevBtn = document.getElementById('heroCarouselPrev');
  const nextBtn = document.getElementById('heroCarouselNext');
  const counterEl = document.getElementById('heroSlideCounter');

  if (slides.length === 0) return;

  let currentIdx = 0;
  let autoplayTimer = null;
  let isPaused = false;
  const AUTOPLAY_MS = 5500;

  function renderSlide(nextIdx) {
    currentIdx = ((nextIdx % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
      const active = idx === currentIdx;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, idx) => {
      const active = idx === currentIdx;
      dot.classList.remove('is-active');
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) {
        void dot.offsetWidth;
        dot.classList.add('is-active');
      }
    });

    const activeSlide = slides[currentIdx];
    const isDark = activeSlide.classList.contains('is-slide-twilight') ||
      activeSlide.classList.contains('is-slide-emerald');
    viewport.classList.toggle('is-dark-slide', isDark);

    if (counterEl) {
      counterEl.textContent = `${String(currentIdx + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    if (prefersReducedMotion.matches || isPaused) return;
    autoplayTimer = setInterval(() => {
      renderSlide(currentIdx + 1);
    }, AUTOPLAY_MS);
  }

  function goToSlide(idx) {
    renderSlide(idx);
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIdx + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = Number(dot.getAttribute('data-hero-goto'));
      if (!Number.isNaN(target)) goToSlide(target);
    });
  });

  viewport.addEventListener('mouseenter', () => {
    isPaused = true;
    viewport.classList.add('is-paused');
    clearInterval(autoplayTimer);
  });

  viewport.addEventListener('mouseleave', () => {
    isPaused = false;
    viewport.classList.remove('is-paused');
    startAutoplay();
  });

  viewport.addEventListener('focusin', () => {
    isPaused = true;
    viewport.classList.add('is-paused');
    clearInterval(autoplayTimer);
  });

  viewport.addEventListener('focusout', (e) => {
    if (!viewport.contains(e.relatedTarget)) {
      isPaused = false;
      viewport.classList.remove('is-paused');
      startAutoplay();
    }
  });

  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIdx - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIdx + 1);
    }
  });

  let touchStartX = 0;
  viewport.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX = e.changedTouches[0].clientX;
    }
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) >= 42) {
      goToSlide(dx < 0 ? currentIdx + 1 : currentIdx - 1);
    }
  }, { passive: true });

  renderSlide(0);
  startAutoplay();
}

function updateBagUI() {
  const totalCount = STATE.bag.reduce((acc, item) => acc + item.qty, 0);
  if (bagCountBadge) bagCountBadge.textContent = totalCount;
  if (bagTrigger) bagTrigger.setAttribute('aria-label', `Open shopping bag, ${totalCount} items`);

  if (!bagDialogBody) return;

  if (STATE.bag.length === 0) {
    bagDialogBody.innerHTML = `
      <div class="empty-bag-state">
        <p>Your bag is empty.</p>
        <p style="margin-top: 0.45rem; font-size: 0.9375rem;">Explore fine perfumes or home &amp; car purifiers to save them here.</p>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (bagSubtotalAmount) bagSubtotalAmount.textContent = formatAED(0);
    if (deliveryThresholdNote) {
      deliveryThresholdNote.textContent = 'Free UAE delivery over AED 500 · Prices include 5% VAT';
    }
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  let subtotal = 0;
  bagDialogBody.innerHTML = `
    <div class="bag-list-items">
      ${STATE.bag.map((item, index) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    return `
          <div class="bag-row-item">
            <div class="bag-row-info">
              <div class="bag-row-title">${item.title}</div>
              <div class="bag-row-sub">
                <span>${item.size}</span>
                ${item.isRitual ? '<span class="ritual-tag">set -10%</span>' : ''}
                ${item.offerTag ? `<span class="ritual-tag">${item.offerTag}</span>` : ''}
              </div>
              <div class="qty-controls">
                <button type="button" class="qty-btn" aria-label="Decrease quantity" data-bag-action="dec" data-bag-index="${index}">&minus;</button>
                <span class="qty-val" aria-label="Quantity ${item.qty}">${item.qty}</span>
                <button type="button" class="qty-btn" aria-label="Increase quantity" data-bag-action="inc" data-bag-index="${index}">+</button>
              </div>
            </div>
            <div class="bag-row-right">
              <span class="bag-line-total">${formatAED(lineTotal)}</span>
              <button type="button" class="text-link-muted" data-bag-action="remove" data-bag-index="${index}">Remove</button>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;

  if (bagSubtotalAmount) bagSubtotalAmount.textContent = formatAED(subtotal);

  if (deliveryThresholdNote) {
    deliveryThresholdNote.textContent = subtotal >= 500
      ? 'Free UAE delivery · Prices include 5% VAT'
      : 'Free UAE delivery over AED 500 · Prices include 5% VAT';
  }

  bagDialogBody.querySelectorAll('[data-bag-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-bag-action');
      const idx = Number(btn.getAttribute('data-bag-index'));
      if (!STATE.bag[idx]) return;

      if (action === 'dec') {
        if (STATE.bag[idx].qty > 1) {
          STATE.bag[idx].qty -= 1;
        } else {
          STATE.bag.splice(idx, 1);
        }
      } else if (action === 'inc') {
        if (STATE.bag[idx].qty < 20) STATE.bag[idx].qty += 1;
      } else if (action === 'remove') {
        STATE.bag.splice(idx, 1);
      }

      saveBag();
      updateBagUI();
    });
  });
}

function openBagModal() {
  updateBagUI();
  if (checkoutStatusMsg) checkoutStatusMsg.textContent = '';
  if (bagDialog && typeof bagDialog.showModal === 'function') {
    bagDialog.showModal();
  }
}

function closeBagModal() {
  if (bagDialog && bagDialog.open) {
    bagDialog.close();
  }
}

if (bagTrigger) bagTrigger.addEventListener('click', openBagModal);
if (closeBagDialog) closeBagDialog.addEventListener('click', closeBagModal);
if (bagDialog) {
  bagDialog.addEventListener('click', (e) => {
    const rect = bagDialog.getBoundingClientRect();
    const inDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!inDialog) closeBagModal();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (STATE.bag.length === 0) return;

    const totalAmount = STATE.bag.reduce((acc, item) => acc + item.price * item.qty, 0);
    const orderId = 'LD-2026-' + Math.floor(1000 + Math.random() * 9000);
    const todayStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    if (STATE.profile) {
      if (!Array.isArray(STATE.profile.orders)) STATE.profile.orders = [];
      STATE.profile.orders.unshift({
        id: orderId,
        date: todayStr,
        status: 'Confirmed · Prototype Commission',
        total: totalAmount,
        items: STATE.bag.map((i) => ({
          title: i.title,
          size: i.size,
          qty: i.qty,
          price: i.price
        }))
      });
      saveProfile();
      updateProfileUI();
    }

    if (window.AtelierCMS) {
      window.AtelierCMS.saveOrder({
        id: orderId,
        date: todayStr,
        customer: (STATE.profile && STATE.profile.name) ? STATE.profile.name : 'Layla Al Maktoum',
        emirate: (STATE.profile && STATE.profile.emirate) ? STATE.profile.emirate : 'Dubai',
        total: totalAmount,
        status: 'Confirmed Commission',
        items: STATE.bag.map((i) => ({
          title: i.title,
          size: i.size,
          qty: i.qty,
          price: i.price
        }))
      });
    }

    STATE.bag = [];
    saveBag();
    updateBagUI();
    if (checkoutStatusMsg) {
      checkoutStatusMsg.textContent = `Thank you. Order #${orderId} saved to your Profile. This is a prototype, so no payment was taken.`;
    }
  });
}

/* ==========================================================================
   9. Slide-Over Wishlist Drawer (#wishlistDialog)
   ========================================================================== */

const wishlistDialog = document.getElementById('wishlistDialog');
const wishlistTrigger = document.getElementById('wishlistTrigger');
const closeWishlistDialog = document.getElementById('closeWishlistDialog');
const wishlistDialogBody = document.getElementById('wishlistDialogBody');
const wishlistCountBadge = document.getElementById('wishlistCountBadge');
const wishlistModalCount = document.getElementById('wishlistModalCount');
const addAllWishlistBtn = document.getElementById('addAllWishlistBtn');

function isInWishlist(catalogId) {
  return STATE.wishlist.some((entry) => entry.catalogId === catalogId);
}

function toggleWishlist(catalogId, preferredSize = null) {
  const item = findBuyableItem(catalogId);
  if (!item) return;

  const existingIdx = STATE.wishlist.findIndex((entry) => entry.catalogId === catalogId);
  if (existingIdx >= 0) {
    STATE.wishlist.splice(existingIdx, 1);
    saveWishlist();
    updateWishlistUI();
    showToast(`Removed ${item.title} from wishlist`);
  } else {
    const sizeToSave = preferredSize || STATE.selectedSizesById[catalogId] || item.defaultSize;
    STATE.wishlist.push({ catalogId, size: sizeToSave });
    saveWishlist();
    updateWishlistUI();
    if (!prefersReducedMotion.matches) {
      document.querySelectorAll(`[data-wishlist-id="${catalogId}"]`).forEach((btn) => {
        btn.classList.remove('is-pop');
        void btn.offsetWidth;
        btn.classList.add('is-pop');
      });
    }
    showToast(`Saved ${item.title} (${sizeToSave}) to wishlist`);
  }
}

function syncWishlistHeartButtons() {
  document.querySelectorAll('[data-wishlist-id]').forEach((btn) => {
    const id = btn.getAttribute('data-wishlist-id');
    const saved = isInWishlist(id);
    btn.classList.toggle('active', saved);
    btn.classList.toggle('is-wishlisted', saved);
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');

    if (btn.id === 'qvWishlistBtn') {
      btn.innerHTML = `${getHeartSVG(saved)} <span>${saved ? 'Saved' : 'Save'}</span>`;
    } else {
      btn.innerHTML = getHeartSVG(saved);
    }
  });
}

function updateWishlistUI() {
  const count = STATE.wishlist.length;
  if (wishlistCountBadge) {
    wishlistCountBadge.textContent = count;
    wishlistCountBadge.setAttribute('data-count', String(count));
    wishlistCountBadge.classList.toggle('has-items', count > 0);
  }
  if (wishlistTrigger) {
    wishlistTrigger.setAttribute('aria-label', `Open wishlist, ${count} saved items`);
  }
  if (wishlistModalCount) {
    wishlistModalCount.textContent = `${count} saved`;
  }
  const mobileWishlistBadge = document.getElementById('mobileWishlistBadge');
  if (mobileWishlistBadge) {
    mobileWishlistBadge.textContent = count;
  }

  syncWishlistHeartButtons();

  if (!wishlistDialogBody) return;

  if (count === 0) {
    wishlistDialogBody.innerHTML = `
      <div class="empty-bag-state">
        <p>Your wishlist is empty.</p>
        <p style="margin-top: 0.45rem; font-size: 0.9375rem;">Tap the heart on any fine perfume, home purifier, or car purifier to curate your collection.</p>
      </div>
    `;
    if (addAllWishlistBtn) addAllWishlistBtn.hidden = true;
    return;
  }

  if (addAllWishlistBtn) addAllWishlistBtn.hidden = false;

  wishlistDialogBody.innerHTML = `
    <div class="wishlist-items-list">
      ${STATE.wishlist.map((entry) => {
    const item = findBuyableItem(entry.catalogId);
    if (!item) return '';
    const sizeObj = item.sizes.find((s) => s.size === entry.size) || item.sizes[0];
    const thumbHTML = getItemVisualHTML(item);

    return `
          <div class="wishlist-item-row">
            <div class="wishlist-item-thumb">${thumbHTML}</div>
            <div class="wishlist-item-info">
              <div class="wishlist-item-title">${item.title}</div>
              <div class="wishlist-item-sub">${sizeObj.size} &middot; ${item.categoryLabel}</div>
              <div class="wishlist-item-price">${formatAED(sizeObj.price)}</div>
            </div>
            <div class="wishlist-item-actions">
              <button type="button" class="btn-mini-outline" data-wish-move="${item.catalogId}" data-wish-size="${sizeObj.size}">Move to Bag</button>
              <button type="button" class="text-link-muted" data-wish-remove="${item.catalogId}">Remove</button>
            </div>
          </div>
        `;
  }).join('')}
    </div>
  `;

  wishlistDialogBody.querySelectorAll('[data-wish-move]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wish-move');
      const size = btn.getAttribute('data-wish-size');
      const item = findBuyableItem(id);
      if (item) {
        addCatalogItemToBag(item, size);
        STATE.wishlist = STATE.wishlist.filter((w) => w.catalogId !== id);
        saveWishlist();
        updateWishlistUI();
      }
    });
  });

  wishlistDialogBody.querySelectorAll('[data-wish-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleWishlist(btn.getAttribute('data-wish-remove'));
    });
  });
}

function openWishlistModal() {
  updateWishlistUI();
  if (wishlistDialog && typeof wishlistDialog.showModal === 'function') {
    wishlistDialog.showModal();
  }
}

function closeWishlistModal() {
  if (wishlistDialog && wishlistDialog.open) {
    wishlistDialog.close();
  }
}

if (wishlistTrigger) wishlistTrigger.addEventListener('click', openWishlistModal);
if (closeWishlistDialog) closeWishlistDialog.addEventListener('click', closeWishlistModal);
if (wishlistDialog) {
  wishlistDialog.addEventListener('click', (e) => {
    const rect = wishlistDialog.getBoundingClientRect();
    const inDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!inDialog) closeWishlistModal();
  });
}
if (addAllWishlistBtn) {
  addAllWishlistBtn.addEventListener('click', () => {
    if (STATE.wishlist.length === 0) return;
    STATE.wishlist.forEach((entry) => {
      const item = findBuyableItem(entry.catalogId);
      if (item) addCatalogItemToBag(item, entry.size);
    });
    STATE.wishlist = [];
    saveWishlist();
    updateWishlistUI();
    closeWishlistModal();
    openBagModal();
  });
}

/* ==========================================================================
   10. Customer Profile Dialog, Order History & Scent Wardrobe
   ========================================================================== */

const profileDialog = document.getElementById('profileDialog');
const profileTrigger = document.getElementById('profileTrigger');
const closeProfileDialog = document.getElementById('closeProfileDialog');
const profileDetailsForm = document.getElementById('profileDetailsForm');
const toggleSignOutBtn = document.getElementById('toggleSignOutBtn');

function getProfileInitials(name) {
  if (!name || !STATE.profile.isSignedIn) return 'G';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function updateProfileUI() {
  const p = STATE.profile;
  const initials = getProfileInitials(p.fullName);

  const headerInitials = document.getElementById('headerProfileInitials');
  const modalAvatar = document.getElementById('profileModalAvatar');
  const modalTitle = document.getElementById('profileDialogTitle');
  const tierBadge = document.getElementById('profileTierBadge');
  const orderCountEl = document.getElementById('profileOrderCount');
  const mobileProfileLabel = document.getElementById('mobileProfileLabel');

  if (headerInitials) headerInitials.textContent = p.isSignedIn ? initials : 'Sign In';
  if (modalAvatar) modalAvatar.textContent = initials;
  if (modalTitle) modalTitle.textContent = p.isSignedIn ? p.fullName : 'Guest Collector';
  if (tierBadge) {
    tierBadge.textContent = p.isSignedIn
      ? `Private Atelier Member · ${p.emirate}`
      : 'Guest Visitor · Sign in to save preferences';
  }
  if (mobileProfileLabel) {
    mobileProfileLabel.textContent = p.isSignedIn ? p.fullName.split(' ')[0] : 'Guest';
  }
  if (orderCountEl) {
    orderCountEl.textContent = (p.orders || []).length;
  }

  const profName = document.getElementById('profName');
  const profEmail = document.getElementById('profEmail');
  const profPhone = document.getElementById('profPhone');
  const profEmirate = document.getElementById('profEmirate');
  const profAddress = document.getElementById('profAddress');
  const profScentFamily = document.getElementById('profScentFamily');

  if (profName) profName.value = p.isSignedIn ? p.fullName : '';
  if (profEmail) profEmail.value = p.isSignedIn ? p.email : '';
  if (profPhone) profPhone.value = p.isSignedIn ? p.phone : '';
  if (profEmirate) profEmirate.value = p.emirate || 'Dubai';
  if (profAddress) profAddress.value = p.isSignedIn ? p.address : '';
  if (profScentFamily) profScentFamily.value = p.preferredFamily || 'Oud & Floral';

  if (toggleSignOutBtn) {
    toggleSignOutBtn.textContent = p.isSignedIn ? 'Switch to Guest Mode' : 'Restore Atelier Member Demo';
  }

  renderProfileOrders();
  renderProfileWardrobe();
}

function renderProfileOrders() {
  const container = document.getElementById('profileOrdersList');
  if (!container) return;

  const orders = STATE.profile.orders || [];
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-bag-state">
        <p>No commissions placed yet.</p>
        <p style="margin-top:0.45rem; font-size:0.875rem;">Completed checkouts from your shopping bag will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map((order, oIdx) => `
    <div class="profile-order-card">
      <div class="order-card-head">
        <div>
          <div class="order-id-label">Order #${order.id}</div>
          <div class="order-date-sub">${order.date}</div>
        </div>
        <span class="order-status-pill">${order.status}</span>
      </div>
      <div class="order-items-mini">
        ${order.items.map((it) => `<div>${it.qty}&times; ${it.title} (${it.size}) &mdash; ${formatAED(it.price * it.qty)}</div>`).join('')}
      </div>
      <div class="order-card-foot">
        <span class="order-total-amount">Total: ${formatAED(order.total)}</span>
        <button type="button" class="btn-mini-outline" data-reorder-idx="${oIdx}">Reorder Items</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-reorder-idx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-reorder-idx'));
      const order = orders[idx];
      if (!order) return;

      order.items.forEach((it) => {
        const existing = STATE.bag.find((b) => b.title === it.title && b.size === it.size);
        if (existing) {
          existing.qty = Math.min(20, existing.qty + it.qty);
        } else {
          STATE.bag.push({
            id: `reorder-${it.title.toLowerCase().replace(/\s+/g, '-')}-${it.size}`,
            title: it.title,
            size: it.size,
            price: it.price,
            qty: it.qty,
            isRitual: false
          });
        }
      });

      saveBag();
      updateBagUI();
      showToast(`Reordered ${order.items.length} pieces from #${order.id} into Bag`);
    });
  });
}

function renderProfileWardrobe() {
  const container = document.getElementById('profileWardrobeContent');
  if (!container) return;

  const fam = STATE.profile.preferredFamily || 'Oud & Floral';
  const scentMatchMap = {
    'Oud & Floral': 0,
    'Wood & Citrus': 1,
    'Amber & Spice': 2,
    'Oud & Fruit': 3
  };
  const recIdx = scentMatchMap[fam] !== undefined ? scentMatchMap[fam] : 0;
  const recScent = S[recIdx];

  container.innerHTML = `
    <div class="wardrobe-card">
      <h4>Recommended Fine Perfume</h4>
      <p>Based on your preference for <strong>${fam}</strong>, we recommend wearing <strong>${recScent.name}</strong> (${recScent.tagline}) from our four pure extrait perfumes.</p>
      <div style="margin-top:0.45rem; display:flex; gap:0.65rem; flex-wrap:wrap;">
        <button type="button" class="btn-mini-outline" id="wardrobeTryScentBtn">View ${recScent.name} Perfume</button>
        <button type="button" class="btn-mini-outline" id="wardrobeTryPurifiersBtn">Explore Home &amp; Car Purifiers</button>
        <button type="button" class="btn-mini-outline" id="wardrobeOpenWishlistBtn">Open Wishlist (${STATE.wishlist.length})</button>
      </div>
    </div>
    <div class="wardrobe-card">
      <h4>Complimentary UAE Concierge Benefits</h4>
      <p>&middot; Priority next-day courier across Dubai Design District &amp; all seven Emirates.<br>
         &middot; Two complimentary 2 ml Extrait discovery samples included inside every flacon commission.<br>
         &middot; Dedicated Home &amp; Car Purifiers formulated separately from skin perfumes.</p>
    </div>
  `;

  const tryBtn = document.getElementById('wardrobeTryScentBtn');
  if (tryBtn) {
    tryBtn.addEventListener('click', () => {
      closeProfileModal();
      openQuickView(`${recScent.id}-extrait`);
    });
  }
  const tryPurifiersBtn = document.getElementById('wardrobeTryPurifiersBtn');
  if (tryPurifiersBtn) {
    tryPurifiersBtn.addEventListener('click', () => {
      closeProfileModal();
      const purifiersSec = document.getElementById('purifiers');
      if (purifiersSec) {
        const offset = purifiersSec.getBoundingClientRect().top + window.pageYOffset - 78;
        window.scrollTo({ top: Math.max(0, offset), behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      }
    });
  }
  const openWishBtn = document.getElementById('wardrobeOpenWishlistBtn');
  if (openWishBtn) {
    openWishBtn.addEventListener('click', () => {
      closeProfileModal();
      openWishlistModal();
    });
  }
}

function openProfileModal(defaultTab = 'details') {
  updateProfileUI();
  switchProfileTab(defaultTab);
  if (profileDialog && typeof profileDialog.showModal === 'function') {
    profileDialog.showModal();
  }
}

function closeProfileModal() {
  if (profileDialog && profileDialog.open) {
    profileDialog.close();
  }
}

function switchProfileTab(tabName) {
  document.querySelectorAll('.profile-tabs-row .profile-tab').forEach((btn) => {
    const active = btn.getAttribute('data-profile-tab') === tabName;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  document.querySelectorAll('.profile-pane').forEach((pane) => {
    const matches = pane.id === `profilePane-${tabName}`;
    pane.classList.toggle('active', matches);
    if (matches) {
      pane.removeAttribute('hidden');
    } else {
      pane.setAttribute('hidden', '');
    }
  });
}

document.querySelectorAll('.profile-tabs-row .profile-tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    switchProfileTab(btn.getAttribute('data-profile-tab'));
  });
});

if (profileTrigger) profileTrigger.addEventListener('click', () => openProfileModal('details'));
if (closeProfileDialog) closeProfileDialog.addEventListener('click', closeProfileModal);
if (profileDialog) {
  profileDialog.addEventListener('click', (e) => {
    const rect = profileDialog.getBoundingClientRect();
    const inDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!inDialog) closeProfileModal();
  });
}

if (profileDetailsForm) {
  profileDetailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    STATE.profile.isSignedIn = true;
    STATE.profile.fullName = document.getElementById('profName').value.trim() || 'Atelier Collector';
    STATE.profile.email = document.getElementById('profEmail').value.trim();
    STATE.profile.phone = document.getElementById('profPhone').value.trim();
    STATE.profile.emirate = document.getElementById('profEmirate').value;
    STATE.profile.address = document.getElementById('profAddress').value.trim();
    STATE.profile.preferredFamily = document.getElementById('profScentFamily').value;
    saveProfile();
    updateProfileUI();
    showToast(`Profile updated for ${STATE.profile.fullName}`);
  });
}

if (toggleSignOutBtn) {
  toggleSignOutBtn.addEventListener('click', () => {
    if (STATE.profile.isSignedIn) {
      STATE.profile.isSignedIn = false;
      saveProfile();
      updateProfileUI();
      showToast('Switched to Guest Collector mode');
    } else {
      STATE.profile.isSignedIn = true;
      STATE.profile.fullName = DEFAULT_PROFILE.fullName;
      STATE.profile.email = DEFAULT_PROFILE.email;
      STATE.profile.phone = DEFAULT_PROFILE.phone;
      STATE.profile.emirate = DEFAULT_PROFILE.emirate;
      STATE.profile.address = DEFAULT_PROFILE.address;
      saveProfile();
      updateProfileUI();
      showToast(`Signed in as ${STATE.profile.fullName}`);
    }
  });
}

/* ==========================================================================
   11. Navigation, Mobile Drawer, Delegated Grid Actions & Initialization
   ========================================================================== */

function initDelegatedCardActions() {
  document.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('[data-wishlist-id]');
    if (wishBtn) {
      const id = wishBtn.getAttribute('data-wishlist-id');
      toggleWishlist(id, STATE.selectedSizesById[id]);
      return;
    }

    const sizePill = e.target.closest('[data-card-size]');
    if (sizePill) {
      const id = sizePill.getAttribute('data-card-id');
      const size = sizePill.getAttribute('data-card-size');
      selectCardSize(id, size);
      return;
    }

    const addBtn = e.target.closest('[data-card-add]');
    if (addBtn) {
      const id = addBtn.getAttribute('data-card-add');
      const item = findBuyableItem(id);
      if (item) addCatalogItemToBag(item, getSelectedSizeObj(item).size);
      return;
    }

    const buyBtn = e.target.closest('[data-card-buy]');
    if (buyBtn) {
      const id = buyBtn.getAttribute('data-card-buy');
      const item = findBuyableItem(id);
      if (item) {
        addCatalogItemToBag(item, getSelectedSizeObj(item).size);
        openBagModal();
      }
      return;
    }

    const qvTrigger = e.target.closest('[data-quick-view]');
    if (qvTrigger) {
      const qvId = qvTrigger.getAttribute('data-quick-view');
      if (qvTrigger.tagName === 'A') e.preventDefault();
      openQuickView(qvId);
    }
  });
}

function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const desktopLinks = document.querySelectorAll('#desktopNav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navSearchTrigger = document.getElementById('navSearchTrigger');
  const mobileWishlistBtn = document.getElementById('mobileWishlistBtn');
  const mobileProfileBtn = document.getElementById('mobileProfileBtn');
  const footerRegistryForm = document.getElementById('footerRegistryForm');
  const mainHeader = document.getElementById('mainHeader');

  if (mainHeader) {
    const syncHeaderShadow = () => {
      mainHeader.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', syncHeaderShadow, { passive: true });
    syncHeaderShadow();
  }

  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.removeAttribute('hidden');
    void mobileNavDrawer.offsetWidth;
    mobileNavDrawer.classList.add('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (mobileNavClose) mobileNavClose.focus();
  }

  function closeMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!mobileNavDrawer.classList.contains('open')) {
        mobileNavDrawer.setAttribute('hidden', '');
      }
    }, 320);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

  if (mobileWishlistBtn) {
    mobileWishlistBtn.addEventListener('click', () => {
      closeMobileNav();
      openWishlistModal();
    });
  }

  if (mobileProfileBtn) {
    mobileProfileBtn.addEventListener('click', () => {
      closeMobileNav();
      openProfileModal('details');
    });
  }

  if (navSearchTrigger) {
    navSearchTrigger.addEventListener('click', () => {
      const catalogSec = document.getElementById('catalog');
      const searchInput = document.getElementById('catalogSearchInput');
      if (catalogSec && searchInput) {
        const offsetPos = catalogSec.getBoundingClientRect().top + window.pageYOffset - 78;
        window.scrollTo({
          top: Math.max(0, offsetPos),
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
        setTimeout(() => searchInput.focus({ preventScroll: true }), 360);
      } else {
        window.location.href = 'shop.html';
      }
    });
  }

  document.querySelectorAll('a[href^="#"]:not([data-quick-view])').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        closeMobileNav();
        const offsetPos = targetElem.getBoundingClientRect().top + window.pageYOffset - 78;
        window.scrollTo({
          top: Math.max(0, offsetPos),
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    });
  });

  if (footerRegistryForm) {
    footerRegistryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('registryEmailInput');
      const val = emailInput ? emailInput.value.trim() : '';
      if (val) {
        if (window.AtelierCMS) window.AtelierCMS.addSubscriber(val);
        showToast(`Welcome to the Private Atelier Registry (${val})`);
        if (emailInput) emailInput.value = '';
      }
    });
  }

  // Scroll Spy
  const sectionsToWatch = ['hero', 'bestsellers', 'bundles', 'perfumes', 'purifiers', 'archiveTeaser', 'catalog', 'about'];
  const sectionElements = sectionsToWatch.map((id) => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window && sectionElements.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          desktopLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === currentId);
          });
          mobileLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === currentId);
          });
        }
      });
    }, { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sectionElements.forEach((sec) => navObserver.observe(sec));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
      closeMobileNav();
      if (navToggle) navToggle.focus();
    }
  });
}

function initScrollReveals() {
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.section-center-head, .editorial-quote, .campaign-media-frame, .campaign-copy-col, .bundle-card, .section-head-row, .category-tile, .boutique-card, .ritual-banner, .editorial-split-card, .trust-item'
  );
  if (targets.length === 0) return;

  document.documentElement.classList.add('anim-ready');

  const vh = window.innerHeight || 900;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -12px 0px', threshold: 0.02 });

  targets.forEach((el, idx) => {
    const isGridCard = el.classList.contains('boutique-card') ||
      el.classList.contains('category-tile') ||
      el.classList.contains('trust-item');
    if (isGridCard) {
      el.style.setProperty('--reveal-delay', `${(idx % 4) * 75}ms`);
    }
    el.classList.add('reveal-item');

    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.95) {
      el.classList.add('is-revealed');
    } else {
      observer.observe(el);
    }
  });
}

function initPreloader() {
  const preloader = document.getElementById('atelierPreloader');
  if (!preloader) return;

  if (prefersReducedMotion.matches) {
    preloader.classList.add('is-done');
    return;
  }

  let dismissed = false;
  const dismissPreloader = () => {
    if (dismissed) return;
    dismissed = true;
    preloader.classList.add('is-leaving');
    setTimeout(() => {
      preloader.classList.add('is-done');
    }, 620);
  };

  setTimeout(dismissPreloader, 1100);
  preloader.addEventListener('click', dismissPreloader, { once: true });
}

function applyStorefrontSettings() {
  if (!window.AtelierCMS) return;
  const settings = window.AtelierCMS.getSettings();

  const annTextEl = document.querySelector('.announcement-text');
  if (annTextEl && settings.announcementText) {
    annTextEl.textContent = settings.announcementText;
  }

  const thresholdNoteEl = document.getElementById('deliveryThresholdNote');
  if (thresholdNoteEl && settings.deliveryThreshold) {
    thresholdNoteEl.textContent = `Free UAE delivery over AED ${settings.deliveryThreshold} · Prices include 5% VAT`;
  }

  const ritualPriceEl = document.getElementById('ritualBannerPrice');
  const addRitualBtn = document.getElementById('addRitualSetBtn');
  if (ritualPriceEl && settings.ritualBundlePrice) {
    ritualPriceEl.textContent = formatAED(settings.ritualBundlePrice);
  }
  if (addRitualBtn && settings.ritualBundlePrice) {
    addRitualBtn.textContent = `Add 3-Piece Set · ${formatAED(settings.ritualBundlePrice)}`;
  }
}

function init() {
  initPreloader();
  loadBag();
  loadWishlist();
  loadProfile();

  applyStorefrontSettings();

  mountCategoryIcons();
  initHeroOffers();
  initHeroCarousel();
  initCategoryTiles();
  initPerfumeFormatTabs();
  initPurifierTabs();
  initCatalogControls();
  initDelegatedCardActions();
  initNavigation();

  renderBestSellers();
  renderFinePerfumes();
  renderPurifiersShowcase();
  renderCatalog();
  updateBagUI();
  updateWishlistUI();
  updateProfileUI();
  initScrollReveals();

  // Cross-tab real-time sync with Atelier CMS Console
  window.addEventListener('storage', (e) => {
    if (e.key === CMS_STORAGE_KEY) {
      CATALOG = window.AtelierCMS.getCatalog();
      renderBestSellers();
      renderFinePerfumes();
      renderPurifiersShowcase();
      renderCatalog();
    } else if (e.key === CMS_SETTINGS_KEY) {
      applyStorefrontSettings();
    }
  });

  window.addEventListener('atelier-cms-catalog-updated', (e) => {
    CATALOG = e.detail || window.AtelierCMS.getCatalog();
    renderBestSellers();
    renderFinePerfumes();
    renderPurifiersShowcase();
    renderCatalog();
  });

  window.addEventListener('atelier-cms-settings-updated', () => {
    applyStorefrontSettings();
  });
}

document.addEventListener('DOMContentLoaded', init);
