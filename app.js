/**
 * LEEDUH — Minimalist Luxury Parfumerie & Ambient Purifiers (Dubai)
 * ============================================================================
 * Sections:
 * 1. Data Definitions (4 Fine Perfumes, 3 Formats, 6 Separate Purifiers, 14 Catalog Items)
 * 2. State, Theme & LocalStorage Persistence (Light Gallery default + Dark Atelier toggle)
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
const CATALOG = (() => {
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
      bottleImg: null,
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
   2. State, Theme & Persistence
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
  theme: 'light',
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
const THEME_KEY = 'leeduh-theme';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function formatAED(amount) {
  return 'AED ' + Number(amount).toLocaleString('en-US');
}

function getHeartSVG(filled = false) {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
}

function updateThemeUI() {
  const isDark = STATE.theme === 'dark';
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  if (mobileThemeBtn) {
    mobileThemeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');
  if (mobileThemeLabel) {
    mobileThemeLabel.textContent = isDark ? 'Dark Mode' : 'Light Mode';
  }
}

function applyTheme(theme, announce = false) {
  const next = theme === 'dark' ? 'dark' : 'light';
  STATE.theme = next;
  document.documentElement.classList.add('is-theme-switching');
  document.documentElement.setAttribute('data-theme', next);
  const tcMeta = document.getElementById('themeColorMeta');
  if (tcMeta) {
    tcMeta.setAttribute('content', next === 'dark' ? '#0b0a09' : '#ffffff');
  }
  updateThemeUI();
  void document.documentElement.offsetHeight;
  document.documentElement.classList.remove('is-theme-switching');
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (err) {
    console.warn('Unable to persist theme preference', err);
  }
  if (announce) {
    showToast(next === 'dark' ? 'Switched to Dark Mode' : 'Switched to Light Mode');
  }
}

function loadTheme() {
  let theme = 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      theme = saved;
    }
  } catch (err) {
    console.warn('Unable to load theme preference', err);
  }
  applyTheme(theme, false);
}

function toggleTheme() {
  applyTheme(STATE.theme === 'dark' ? 'light' : 'dark', true);
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
      <text x="52" y="67" text-anchor="middle" font-family="'Syne', sans-serif" font-size="4.5" font-weight="700" letter-spacing="1" fill="#e6c878">10ML</text>
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
      <text x="50" y="68" text-anchor="middle" font-family="'Syne', sans-serif" font-size="5" font-weight="700" letter-spacing="1.4" fill="#c9a24a">COFFRET</text>
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
      <text x="60" y="84" text-anchor="middle" font-family="'Syne', sans-serif" font-size="5" font-weight="700" letter-spacing="1.2" fill="#e6c878">HOME</text>
      <text x="60" y="90" text-anchor="middle" font-family="'Newsreader', serif" font-size="4.5" font-style="italic" fill="#c9bfa9">Purifier</text>
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
      <text x="60" y="67" text-anchor="middle" font-family="'Syne', sans-serif" font-size="4.8" font-weight="700" letter-spacing="1.2" fill="#e6c878">CAR</text>
      <path d="M 35 36 A 32 32 0 0 1 60 24" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.28" stroke-linecap="round" fill="none" />
    </svg>
  `;
}

function getItemVisualHTML(item) {
  if (item.visualType === 'parfum' && item.bottleImg) {
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
  return item.bottleImg ? `<img src="${item.bottleImg}" alt="${item.title}" loading="lazy">` : createHomePurifierSVG(item);
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
  const lineCaption = `${item.categoryLabel} · ${item.family}`;

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
      </div>

      <div class="card-info-body">
        <span class="card-line-caption">${lineCaption}</span>
        <button type="button" class="card-title-btn" data-quick-view="${item.catalogId}">${item.title}</button>

        <div class="card-meta-row">
          <div class="card-sizes-list" role="radiogroup" aria-label="Select size for ${item.title}">
            ${item.sizes.map((s) => `
              <button type="button" class="card-size-pill ${s.size === sizeObj.size ? 'active' : ''}" data-card-id="${item.catalogId}" data-card-size="${s.size}" role="radio" aria-checked="${s.size === sizeObj.size ? 'true' : 'false'}">
                ${s.size}
              </button>
            `).join('')}
          </div>
          <span class="card-price-text">${formatAED(sizeObj.price)}</span>
        </div>

        <button type="button" class="card-add-btn" data-card-add="${item.catalogId}">
          Add to Bag
        </button>
      </div>
    </article>
  `;
}

function selectCardSize(catalogId, sizeLabel) {
  const item = findBuyableItem(catalogId);
  if (!item) return;
  const sizeObj = item.sizes.find((s) => s.size === sizeLabel) || item.sizes[0];
  STATE.selectedSizesById[catalogId] = sizeObj.size;

  // Update every rendered card matching catalogId in place without losing focus
  document.querySelectorAll(`[data-catalog-card="${catalogId}"]`).forEach((card) => {
    card.querySelectorAll('.card-size-pill').forEach((pill) => {
      const match = pill.getAttribute('data-card-size') === sizeObj.size;
      pill.classList.toggle('active', match);
      pill.setAttribute('aria-checked', match ? 'true' : 'false');
    });
    const priceEl = card.querySelector('.card-price-text');
    if (priceEl) priceEl.textContent = formatAED(sizeObj.price);
  });

  // Update Quick-View modal in place if open for this item
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
  if (homeMount && PURIFIER_LINES[0]) {
    homeMount.innerHTML = createHomePurifierSVG(PURIFIER_LINES[0]);
  }
  if (carMount && PURIFIER_LINES[3]) {
    carMount.innerHTML = createCarPurifierSVG(PURIFIER_LINES[3]);
  }
}

function initCategoryTiles() {
  document.querySelectorAll('#collections .category-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const targetSel = tile.getAttribute('data-scroll-target') || '#perfumes';
      const jumpFormat = tile.getAttribute('data-jump-format');
      const jumpCategory = tile.getAttribute('data-jump-category');
      const jumpPurifier = tile.getAttribute('data-jump-purifier');

      if (jumpFormat) {
        setActivePerfumeFormat(jumpFormat);
      } else if (jumpCategory === 'perfume') {
        setActivePerfumeFormat('extrait');
      }

      if (jumpPurifier) {
        setActivePurifierTab(jumpPurifier);
      }

      const targetEl = document.querySelector(targetSel);
      if (targetEl) {
        const offsetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
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

function setActivePerfumeFormat(formatId) {
  STATE.activePerfumeFormat = formatId;
  document.querySelectorAll('#perfumeFormatTabs [data-perfume-format]').forEach((tab) => {
    const active = tab.getAttribute('data-perfume-format') === formatId;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  renderFinePerfumes();
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
}

function initPurifierTabs() {
  document.querySelectorAll('#purifierSectionTabs [data-purifier-tab]').forEach((tab) => {
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

function resetCatalogFilters() {
  STATE.catalogFilters = {
    search: '',
    category: 'all',
    scent: 'all',
    sort: 'featured'
  };

  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');
  const sortSelect = document.getElementById('catalogSortSelect');
  if (searchInput) searchInput.value = '';
  if (searchClear) searchClear.hidden = true;
  if (sortSelect) sortSelect.value = 'featured';

  document.querySelectorAll('#catalogCategoryFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-category') === 'all');
  });
  document.querySelectorAll('#catalogScentFilters .filter-chip').forEach((chip) => {
    chip.classList.toggle('active', chip.getAttribute('data-scent') === 'all');
  });

  renderCatalog();
}

function initCatalogControls() {
  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');
  const sortSelect = document.getElementById('catalogSortSelect');
  const categoryChips = document.querySelectorAll('#catalogCategoryFilters .filter-chip');
  const scentChips = document.querySelectorAll('#catalogScentFilters .filter-chip');
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
    });
  }

  categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      categoryChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.category = chip.getAttribute('data-category') || 'all';
      renderCatalog();
    });
  });

  scentChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      scentChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      STATE.catalogFilters.scent = chip.getAttribute('data-scent') || 'all';
      renderCatalog();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', resetCatalogFilters);
  }
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  const countEl = document.getElementById('catalogResultCount');
  const resetBtn = document.getElementById('catalogResetBtn');
  if (!grid) return;

  const { search, category, scent, sort } = STATE.catalogFilters;
  const query = search.trim().toLowerCase();

  let filtered = CATALOG.filter((item) => {
    if (category !== 'all' && item.category !== category) return false;
    if (scent === 'ambient-purifiers') {
      if (item.category !== 'home-purifier' && item.category !== 'car-purifier') return false;
    } else if (scent !== 'all' && item.scentId !== scent) {
      return false;
    }
    if (query && !item.searchableText.includes(query)) return false;
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
  }

  const isFiltered = query !== '' || category !== 'all' || scent !== 'all' || sort !== 'featured';
  if (resetBtn) resetBtn.hidden = !isFiltered;

  if (countEl) {
    countEl.textContent = filtered.length === CATALOG.length
      ? `${CATALOG.length} creations`
      : `${filtered.length} of ${CATALOG.length} creations`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <p>No creations match your current search or filter selection.</p>
        <button type="button" class="btn-outline" id="emptyResetFiltersBtn">Reset Filters</button>
      </div>
    `;
    const emptyBtn = document.getElementById('emptyResetFiltersBtn');
    if (emptyBtn) emptyBtn.addEventListener('click', resetCatalogFilters);
    return;
  }

  grid.innerHTML = filtered.map((item) => renderBoutiqueCard(item)).join('');
}

/* ==========================================================================
   7. Quick-View Product Modal (#quickViewDialog)
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
    <div class="quickview-media-col">
      ${getItemVisualHTML(item)}
    </div>
    <div class="quickview-info-col">
      <div>
        <span class="section-kicker">${item.categoryLabel} &middot; ${item.family}</span>
        <span class="quickview-arabic" dir="rtl" lang="ar">${item.arabic}</span>
        <h2 class="section-title" id="quickViewTitle">${item.title}</h2>
      </div>

      <p class="quickview-desc">${item.story}</p>

      <div class="quickview-notes">
        <div class="qv-note-line"><strong>Top</strong><span>${item.top}</span></div>
        <div class="qv-note-line"><strong>Heart</strong><span>${item.heart}</span></div>
        <div class="qv-note-line"><strong>Base</strong><span>${item.base}</span></div>
      </div>

      <div class="qv-price-row">
        <div class="card-sizes-list" role="radiogroup" aria-label="Select format size for ${item.title}">
          ${item.sizes.map((s) => `
            <button type="button" class="card-size-pill ${s.size === sizeObj.size ? 'active' : ''}" data-qv-size="${s.size}" role="radio" aria-checked="${s.size === sizeObj.size ? 'true' : 'false'}">
              ${s.size}
            </button>
          `).join('')}
        </div>
        <span class="qv-live-price" id="qvLivePrice">${formatAED(sizeObj.price)}</span>
      </div>

      <div class="qv-actions-row">
        <button type="button" class="btn-solid" id="qvAddToBagBtn">Add to Bag &middot; ${formatAED(sizeObj.price)}</button>
        <button type="button" class="btn-outline qv-wish-btn ${isSaved ? 'active' : ''}" id="qvWishlistBtn" data-wishlist-id="${item.catalogId}" aria-pressed="${isSaved ? 'true' : 'false'}" aria-label="Save ${item.title} to wishlist">
          ${getHeartSVG(isSaved)}
          <span>${isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      ${item.category === 'perfume' ? `
        <button type="button" class="btn-outline btn-full" id="qvRitualSetBtn">
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
        const offset = purifiersSec.getBoundingClientRect().top + window.pageYOffset - 72;
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
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const footerRegistryForm = document.getElementById('footerRegistryForm');

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

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

  if (navSearchTrigger) {
    navSearchTrigger.addEventListener('click', () => {
      const catalogSec = document.getElementById('catalog');
      const searchInput = document.getElementById('catalogSearchInput');
      if (catalogSec) {
        const offsetPos = catalogSec.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({
          top: Math.max(0, offsetPos),
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
      if (searchInput) {
        setTimeout(() => searchInput.focus({ preventScroll: true }), 360);
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
        const offsetPos = targetElem.getBoundingClientRect().top + window.pageYOffset - 72;
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
        showToast(`Welcome to the Private Atelier Registry (${val})`);
        if (emailInput) emailInput.value = '';
      }
    });
  }

  // Scroll Spy
  const sectionsToWatch = ['hero', 'bestsellers', 'perfumes', 'purifiers', 'catalog', 'about'];
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

function init() {
  loadTheme();
  loadBag();
  loadWishlist();
  loadProfile();

  const bundlePricing = getRitualBundlePricing();
  const ritualPriceEl = document.getElementById('ritualBannerPrice');
  const addRitualBtn = document.getElementById('addRitualSetBtn');
  if (ritualPriceEl) ritualPriceEl.textContent = formatAED(bundlePricing.discounted);
  if (addRitualBtn) addRitualBtn.textContent = `Add 3-Piece Set · ${formatAED(bundlePricing.discounted)}`;

  mountCategoryIcons();
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
}

document.addEventListener('DOMContentLoaded', init);
