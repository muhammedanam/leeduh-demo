/**
 * LEEDUH — Atelier Dubai Custom Perfume Prototype
 * ============================================================================
 * Sections:
 * 1. Data Definitions (S: Scents, PC: Pieces & Sizes)
 * 2. State & Persistence (Bag, Selection, Carousel Position)
 * 3. Inline SVG Asset Generators (Perfume Bottle, Travel Atomizer, Coffret, Home & Car Purifiers)
 * 4. 3D Ring Carousel & Critically Damped Spring Physics
 * 5. Carousel Controls, Autoplay & Gestures (Drag, Trackpad, Keys)
 * 6. Inertia Custom Cursor (Hover & Fine Pointer)
 * 7. "View Scent" Notes Popup & Interactive Pins
 * 8. Shopping Panel & Bundle Calculations
 * 9. Bag Dialog, Delivery Threshold & Checkout
 * 10. Initialization & Lifecycle
 * ============================================================================
 */

/* ==========================================================================
   1. Data Definitions (S: Scents, PC: Pieces)
   ========================================================================== */

/**
 * S: The 4 Exclusive Bespoke Fragrances of LEE DUH PERFUMES
 * Exactly the 4 collection creations: Oud Rose, Avenor, Scentra, Oud Maracuja.
 */
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

/**
 * PC: Strictly Fine Perfume formats for every scent on the 3D Runway
 * Separate from Home Purifiers and Car Purifiers.
 */
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
 * Separate Purifier Fragrances — crafted strictly for Living Spaces & Automobiles.
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

  // 1. Fine Perfumes Line (Extrait Flacons + Travel Atomizers)
  S.forEach((scent, scentIndex) => {
    const meta = SCENT_META[scent.id] || { family: scent.tagline, story: scent.tagline };

    // Extrait & Atomizer formats (separate from purifier lines)
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
        notesPreview: `Top: ${scent.top} · Heart: ${scent.heart}`,
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

  // 2. Separate Home Purifiers & Car Purifiers Lines
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
      notesPreview: `Top: ${purifier.top} · Heart: ${purifier.heart}`,
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
  theme: 'dark',
  activeScentIndex: 0,
  selectedSizes: {
    0: '50 ml',
    1: '10 ml',
    2: 'Gift Box'
  },
  expandedRow: null,
  bag: [],
  wishlist: [], // array of { catalogId, size }
  profile: JSON.parse(JSON.stringify(DEFAULT_PROFILE)),
  catalogSelectedSizes: {},
  purifierTab: 'all',
  bestsellerSpotlightSize: '50 ml',
  catalogFilters: {
    search: '',
    category: 'all',
    scent: 'all',
    sort: 'featured'
  },
  // Carousel Physics State
  cur: -1.15, // Turns in from -1.15 steps on first load
  target: 0,
  vel: 0,
  isSleeping: false,
  // Autoplay State
  autoplayActive: true,
  autoplayDuration: 5000,
  autoplayStartTime: performance.now(),
  autoplayPaused: false,
  // Drag State
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragStartCur: 0,
  dragStartTime: 0,
  hasMovedSignificantly: false,
  lastWheelTime: 0,
  // Custom Cursor
  cursorX: 0,
  cursorY: 0,
  targetCursorX: 0,
  targetCursorY: 0,
  isCursorOverStage: false,
  isCursorOverFrontBottle: false
};

CATALOG.forEach((item) => {
  STATE.catalogSelectedSizes[item.catalogId] = item.defaultSize;
});

const STORAGE_KEY = 'leeduh-bag';
const WISHLIST_KEY = 'leeduh-wishlist';
const PROFILE_KEY = 'leeduh-profile';
const THEME_KEY = 'leeduh-theme';

function updateThemeUI() {
  const isLight = STATE.theme === 'light';
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    toggleBtn.setAttribute('title', isLight ? 'Switch to Dark Atelier' : 'Switch to Light Atelier');
  }
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  if (mobileThemeBtn) {
    mobileThemeBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');
  if (mobileThemeLabel) {
    mobileThemeLabel.textContent = isLight ? 'Light Mode' : 'Dark Mode';
  }
}

function applyTheme(theme, announce = false) {
  const next = theme === 'light' ? 'light' : 'dark';
  STATE.theme = next;
  document.documentElement.setAttribute('data-theme', next);
  const tcMeta = document.getElementById('themeColorMeta');
  if (tcMeta) {
    tcMeta.setAttribute('content', next === 'light' ? '#f7f2e8' : '#0b0a09');
  }
  updateThemeUI();
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (err) {
    console.warn('Unable to persist theme preference', err);
  }
  if (announce && typeof showToast === 'function') {
    showToast(next === 'light' ? 'Switched to Light Atelier' : 'Switched to Dark Atelier');
  }
}

function loadTheme() {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    }
  } catch (err) {
    console.warn('Unable to load theme preference', err);
  }
  applyTheme(theme, false);
}

function toggleTheme() {
  applyTheme(STATE.theme === 'light' ? 'dark' : 'light', true);
}

function formatAED(amount) {
  return 'AED ' + Number(amount).toLocaleString('en-US');
}

function getHeartSVG(filled = false) {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
}

function loadBag() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      STATE.bag = JSON.parse(raw);
    }
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
    if (raw) {
      STATE.wishlist = JSON.parse(raw);
    }
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

/* ==========================================================================
   3. Inline Handcrafted SVG Asset Generators
   ========================================================================== */

/**
 * Creates the signature LEEDUH arch-topped glass perfume bottle SVG.
 * Inspired by Gulf Islamic architecture with heavy glass base & gold accents.
 */
function createBottleSVG(scent, isFront = false, idPrefix = 'ring') {
  const gradId = `${idPrefix}-grad-${scent.id}`;
  const goldCapGradId = `${idPrefix}-gold-cap-${scent.id}`;
  const glassReflectId = `${idPrefix}-glass-ref-${scent.id}`;

  return `
    <svg class="bottle-svg" viewBox="0 0 240 480" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${scent.name} Extrait de Parfum Bottle">
      <defs>
        <!-- Liquid Jewel Gradient -->
        <linearGradient id="${gradId}" x1="30" y1="120" x2="210" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${scent.highlight}" stop-opacity="0.9" />
          <stop offset="45%" stop-color="${scent.color}" stop-opacity="0.96" />
          <stop offset="100%" stop-color="#0b0a09" stop-opacity="0.98" />
        </linearGradient>

        <!-- Brushed Gold Cap Gradient -->
        <linearGradient id="${goldCapGradId}" x1="80" y1="20" x2="160" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#e6c878" />
          <stop offset="50%" stop-color="#c9a24a" />
          <stop offset="100%" stop-color="#8a6a25" />
        </linearGradient>

        <!-- Glass Left Highlight -->
        <linearGradient id="${glassReflectId}" x1="30" y1="120" x2="80" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
          <stop offset="35%" stop-color="#ffffff" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Soft Ground Drop Shadow under bottle -->
      <ellipse cx="120" cy="460" rx="76" ry="14" fill="#000000" opacity="0.7" />

      <!-- Sprayer Tube (Inside glass) -->
      <line x1="120" y1="110" x2="120" y2="425" stroke="#c9a24a" stroke-width="2.5" opacity="0.38" />

      <!-- Outer Heavy Glass Body with Gulf Lancet Arch -->
      <!-- Arch shoulder begins at y=170, rises to lancet arch peak at y=110 -->
      <path d="
        M 42 444
        L 42 180
        C 42 136 84 108 120 108
        C 156 108 198 136 198 180
        L 198 444
        C 198 449 194 452 189 452
        L 51 452
        C 46 452 42 449 42 444
        Z"
        fill="url(#${gradId})"
        stroke="#c9a24a"
        stroke-width="1.2"
        stroke-opacity="0.35"
      />

      <!-- Heavy Glass Base Rim -->
      <path d="M 45 432 L 195 432 L 195 448 C 195 450 193 451 190 451 L 50 451 C 47 451 45 450 45 448 Z" fill="#0b0a09" opacity="0.65" />
      <line x1="45" y1="432" x2="195" y2="432" stroke="#c9a24a" stroke-width="1" stroke-opacity="0.25" />

      <!-- Soft Glass Left Highlight (Key rule: reads as glass against black) -->
      <path d="
        M 46 440
        L 46 182
        C 46 142 80 114 116 114
        L 116 122
        C 86 122 55 146 55 184
        L 55 440
        Z"
        fill="url(#${glassReflectId})"
      />

      <!-- Right Edge Micro-Reflection -->
      <path d="M 194 186 L 194 440" stroke="#ffffff" stroke-width="1" stroke-opacity="0.15" />

      <!-- Golden Neck Band -->
      <rect x="98" y="92" width="44" height="16" rx="2" fill="url(#${goldCapGradId})" stroke="#8a6a25" stroke-width="1" />
      <line x1="98" y1="100" x2="142" y2="100" stroke="#e6c878" stroke-width="1" opacity="0.7" />

      <!-- Architectural Gold Cap -->
      <rect x="94" y="24" width="52" height="68" rx="3" fill="url(#${goldCapGradId})" stroke="#8a6a25" stroke-width="1" />
      <!-- Cap Precision Fluting Details -->
      <line x1="104" y1="28" x2="104" y2="88" stroke="#e6c878" stroke-width="1.2" opacity="0.6" />
      <line x1="120" y1="26" x2="120" y2="90" stroke="#ffffff" stroke-width="1.5" opacity="0.45" />
      <line x1="136" y1="28" x2="136" y2="88" stroke="#8a6a25" stroke-width="1.2" opacity="0.7" />
      <rect x="92" y="88" width="56" height="5" rx="1.5" fill="#e6c878" />

      <!-- Official Interlocking LD Monogram on Gold Cap Facet -->
      <image href="brand-monogram.png" x="105" y="44" width="30" height="26" opacity="0.8" />

      <!-- Official Brand Typography on Bottle Glass -->
      <!-- Monogram Crest on Bottle Glass -->
      <image href="brand-monogram.png" x="104" y="200" width="32" height="28" />

      <!-- Brand Wordmark: LEE DUH -->
      <image href="brand-wordmark.png" x="70" y="238" width="100" height="14" />

      <!-- Perfumes Subtitle flanked by Gold Rules -->
      <line x1="74" y1="262" x2="94" y2="262" stroke="#c9a24a" stroke-width="0.75" stroke-opacity="0.6" />
      <text x="120" y="265" text-anchor="middle" font-family="'Syne', sans-serif" font-size="6.5" font-weight="700" letter-spacing="3.5" fill="#e6c878" opacity="0.9">PERFUMES</text>
      <line x1="146" y1="262" x2="166" y2="262" stroke="#c9a24a" stroke-width="0.75" stroke-opacity="0.6" />

      <!-- Scent Name in Gold Uppercase Serif matching Official Packaging -->
      <text x="120" y="302" text-anchor="middle" font-family="'Newsreader', Georgia, serif" font-size="17" font-weight="500" letter-spacing="3" fill="#efe6d3" opacity="0.98">${scent.name.toUpperCase()}</text>

      <!-- Ornate Arabesque Filigree Motif from Official Packaging -->
      <g transform="translate(120, 318)" opacity="0.88">
        <line x1="-36" y1="0" x2="-10" y2="0" stroke="#c9a24a" stroke-width="0.75" />
        <circle cx="-10" cy="0" r="1.5" fill="#e6c878" />
        <path d="M 0 -6 C 2 -2 3 -1 5 0 C 3 1 2 2 0 6 C -2 2 -3 1 -5 0 C -3 -1 -2 -2 0 -6 Z" fill="#e6c878" stroke="#8a6a25" stroke-width="0.5" />
        <circle cx="10" cy="0" r="1.5" fill="#e6c878" />
        <line x1="10" y1="0" x2="36" y2="0" stroke="#c9a24a" stroke-width="0.75" />
      </g>

      <!-- Classification -->
      <text x="120" y="340" text-anchor="middle" font-family="'Syne', sans-serif" font-size="7.5" font-weight="500" letter-spacing="2.5" fill="#c9a24a" opacity="0.75">EXTRAIT DE PARFUM</text>
      <text x="120" y="356" text-anchor="middle" font-family="'Newsreader', serif" font-size="8.5" font-style="italic" fill="#9b9183" opacity="0.7">Dubai · 50 ml</text>
    </svg>
  `;
}

/**
 * Creates the Pocket Travel Atomizer SVG for Fine Perfume editions.
 */
function createTravelAtomizerSVG(scent) {
  return `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Nozzle & Gold Cap -->
      <rect x="43" y="12" width="14" height="6" rx="1" fill="#c9a24a" />
      <rect x="38" y="18" width="24" height="16" rx="2" fill="#e6c878" stroke="#8a6a25" stroke-width="1" />
      <line x1="38" y1="26" x2="62" y2="26" stroke="#8a6a25" stroke-width="1" />
      <!-- Brushed Metal Case -->
      <rect x="36" y="34" width="28" height="54" rx="4" fill="#14110e" stroke="#c9a24a" stroke-width="1.2" />
      <!-- Accent Window Stripe -->
      <rect x="39" y="38" width="5" height="46" rx="1" fill="${scent.color}" opacity="0.85" />
      <rect x="45" y="48" width="14" height="22" rx="1" fill="#0b0a09" stroke="#c9a24a" stroke-width="0.6" stroke-opacity="0.45" />
      <image href="brand-monogram.png" x="45" y="49" width="14" height="13" />
      <text x="52" y="67" text-anchor="middle" font-family="'Syne', sans-serif" font-size="4.5" font-weight="700" letter-spacing="1" fill="#e6c878">10ML</text>
    </svg>
  `;
}

/**
 * Creates the Lacquered Gift Coffret SVG for Fine Perfume editions.
 */
function createCoffretSVG(scent) {
  return `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Outer Lacquered Box -->
      <rect x="18" y="26" width="64" height="52" rx="3" fill="#14110e" stroke="#c9a24a" stroke-width="1.2" />
      <!-- Lid Seam -->
      <line x1="18" y1="42" x2="82" y2="42" stroke="#c9a24a" stroke-width="1.2" />
      <!-- Satin Gold Ribbon Band -->
      <rect x="44" y="26" width="12" height="52" fill="${scent.color}" fill-opacity="0.55" stroke="#c9a24a" stroke-width="0.7" />
      <!-- Central Medallion -->
      <circle cx="50" cy="42" r="9" fill="#0b0a09" stroke="#e6c878" stroke-width="1.1" />
      <image href="brand-monogram.png" x="43" y="36" width="14" height="12" />
      <text x="50" y="68" text-anchor="middle" font-family="'Syne', sans-serif" font-size="5" font-weight="700" letter-spacing="1.4" fill="#c9a24a">COFFRET</text>
    </svg>
  `;
}

/**
 * Creates the Architectural Home Purifier Reed Diffuser Vessel SVG.
 */
function createHomePurifierSVG(purifier) {
  return `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Ground reflection -->
      <ellipse cx="60" cy="108" rx="30" ry="5" fill="#000000" opacity="0.65" />
      <!-- Architectural Rattan Reeds -->
      <line x1="58" y1="42" x2="36" y2="10" stroke="#8a6a25" stroke-width="2" stroke-linecap="round" />
      <line x1="60" y1="42" x2="52" y2="6" stroke="#c9a24a" stroke-width="2" stroke-linecap="round" />
      <line x1="61" y1="42" x2="68" y2="7" stroke="#9b9183" stroke-width="2" stroke-linecap="round" />
      <line x1="63" y1="42" x2="84" y2="12" stroke="#c9a24a" stroke-width="2" stroke-linecap="round" />
      <!-- Brushed Gold Neck Collar -->
      <rect x="49" y="34" width="22" height="9" rx="1.5" fill="#c9a24a" stroke="#e6c878" stroke-width="0.75" />
      <!-- Matte Architectural Diffuser Body -->
      <path d="M 32 54 C 32 45 42 43 60 43 C 78 43 88 45 88 54 L 84 102 C 84 105 81 107 78 107 L 42 107 C 39 107 36 105 36 102 Z" fill="${purifier.color}" stroke="#c9a24a" stroke-width="1.2" stroke-opacity="0.55" />
      <!-- Subtle Glass Highlight -->
      <path d="M 38 56 L 41 101" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.22" stroke-linecap="round" />
      <!-- Front Plaquet -->
      <rect x="42" y="60" width="36" height="32" rx="1" fill="#0b0a09" stroke="#c9a24a" stroke-width="0.8" stroke-opacity="0.7" />
      <image href="brand-monogram.png" x="52" y="63" width="16" height="14" />
      <text x="60" y="84" text-anchor="middle" font-family="'Syne', sans-serif" font-size="5" font-weight="700" letter-spacing="1.2" fill="#e6c878">HOME</text>
      <text x="60" y="90" text-anchor="middle" font-family="'Newsreader', serif" font-size="4.5" font-style="italic" fill="#9b9183">Purifier</text>
    </svg>
  `;
}

/**
 * Creates the Precision Metallic Rotary Car Purifier Vent Diffuser SVG.
 */
function createCarPurifierSVG(purifier) {
  return `
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Ambient Shadow -->
      <ellipse cx="60" cy="108" rx="28" ry="5" fill="#000000" opacity="0.65" />
      <!-- Rear Vent Clip Stem -->
      <rect x="55" y="90" width="10" height="12" rx="1.5" fill="#1c1813" stroke="#8a6a25" stroke-width="1" />
      <!-- Outer Brushed Gold Chamfer Ring -->
      <circle cx="60" cy="56" r="36" fill="#0b0a09" stroke="#c9a24a" stroke-width="2" />
      <circle cx="60" cy="56" r="32" fill="${purifier.color}" stroke="#e6c878" stroke-width="0.8" stroke-opacity="0.55" />
      <!-- Precision Diffusion Turbine Louvers -->
      <circle cx="60" cy="56" r="24" fill="#14110e" stroke="#c9a24a" stroke-width="0.8" stroke-dasharray="3 3" />
      <line x1="60" y1="24" x2="60" y2="88" stroke="#c9a24a" stroke-width="0.7" stroke-opacity="0.25" />
      <line x1="28" y1="56" x2="92" y2="56" stroke="#c9a24a" stroke-width="0.7" stroke-opacity="0.25" />
      <!-- Central Lacquered Cap with Monogram -->
      <circle cx="60" cy="56" r="16" fill="#0b0a09" stroke="#e6c878" stroke-width="1.2" />
      <image href="brand-monogram.png" x="51" y="45" width="18" height="15" />
      <text x="60" y="67" text-anchor="middle" font-family="'Syne', sans-serif" font-size="4.8" font-weight="700" letter-spacing="1.2" fill="#e6c878">CAR</text>
      <!-- Highlight glint -->
      <path d="M 35 36 A 32 32 0 0 1 60 24" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.25" stroke-linecap="round" fill="none" />
    </svg>
  `;
}

/**
 * Unified thumbnail/card visual generator so Fine Perfumes, Home Purifiers, and Car Purifiers
 * never break regardless of card, runner-up, wishlist, or catalog context.
 */
function getItemVisualHTML(item, mode = 'card') {
  if (item.visualType === 'parfum' && item.bottleImg) {
    const cls = mode === 'thumb' ? 'thumb-flacon-img' : (mode === 'runner' ? 'runner-bottle-img' : 'catalog-card-img');
    return `<img src="${item.bottleImg}" alt="${item.title}" class="${cls}">`;
  }
  if (item.visualType === 'atomizer') {
    const svg = createTravelAtomizerSVG(item);
    return mode === 'card' ? `<div class="catalog-card-svg">${svg}</div>` : svg;
  }
  if (item.visualType === 'coffret') {
    const svg = createCoffretSVG(item);
    return mode === 'card' ? `<div class="catalog-card-svg">${svg}</div>` : svg;
  }
  if (item.visualType === 'home-purifier') {
    const svg = createHomePurifierSVG(item);
    return mode === 'purifier-showcase'
      ? `<div class="purifier-card-svg">${svg}</div>`
      : (mode === 'card' ? `<div class="catalog-card-svg">${svg}</div>` : svg);
  }
  if (item.visualType === 'car-purifier') {
    const svg = createCarPurifierSVG(item);
    return mode === 'purifier-showcase'
      ? `<div class="purifier-card-svg">${svg}</div>`
      : (mode === 'card' ? `<div class="catalog-card-svg">${svg}</div>` : svg);
  }
  return item.bottleImg ? `<img src="${item.bottleImg}" alt="${item.title}" class="catalog-card-img">` : createHomePurifierSVG(item);
}

/* ==========================================================================
   4. 3D Ring Carousel & Critically Damped Spring Physics
   ========================================================================== */

const ringContainer = document.getElementById('ringBodiesContainer');
const stageSection = document.getElementById('stageSection');
const stageSpotlight = document.getElementById('stageSpotlight');
const ghostArabic = document.getElementById('ghostArabic');
const ringBodies = [];

function buildCarouselBodies() {
  ringContainer.innerHTML = '';
  ringBodies.length = 0;

  S.forEach((scent, i) => {
    const bodyEl = document.createElement('div');
    bodyEl.className = 'ring-body';
    bodyEl.id = `ringBody-${i}`;
    bodyEl.setAttribute('role', 'button');
    bodyEl.setAttribute('tabindex', '0');
    bodyEl.setAttribute('aria-label', `Fragrance ${scent.name}, ${scent.tagline}`);

    const frameEl = document.createElement('div');
    frameEl.className = 'bottle-frame';
    frameEl.innerHTML = `
      <div class="flacon-wrapper">
        <div class="flacon-ground-shadow" aria-hidden="true"></div>
        <img src="${scent.bottleImg}" alt="${scent.name} Eau de Parfum" class="flacon-real-img" draggable="false" loading="eager">
      </div>
    `;

    bodyEl.appendChild(frameEl);
    ringContainer.appendChild(bodyEl);
    ringBodies.push(bodyEl);

    // Click behaviour: Side bottle brings to front, front bottle opens popup
    bodyEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const N = S.length;
      const currentLook = Math.round(STATE.cur);
      const wrappedCur = ((currentLook % N) + N) % N;
      if (wrappedCur === i) {
        openScentPopup(i);
      } else {
        goToLook(i);
      }
    });

    bodyEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const N = S.length;
        const currentLook = Math.round(STATE.cur);
        const wrappedCur = ((currentLook % N) + N) % N;
        if (wrappedCur === i) {
          openScentPopup(i);
        } else {
          goToLook(i);
        }
      }
    });
  });
}

/**
 * Critically Damped Spring Simulation:
 * K = 90, C = 2 * sqrt(K) = 18.973665961
 * 3 sub-steps per frame for absolute numeric stability.
 */
const SPRING_K = 90;
const SPRING_C = 2 * Math.sqrt(SPRING_K);
const SUB_STEPS = 3;
const DT = (1 / 60) / SUB_STEPS;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateRingPositions() {
  const stageWidth = stageSection.clientWidth || 800;
  const stageHeight = stageSection.clientHeight || 650;
  const isMobile = window.innerWidth <= 750;

  // Exact formulas specified in section 6:
  const R = (isMobile ? 0.5 : 0.6) * stageWidth;
  const P = 1.6 * stageWidth;
  const centreX = stageWidth / 2;

  // Bottle height scales to stage (min 220px, max 520px)
  const bottleHeight = Math.min(Math.max(stageHeight * 0.54, 220), 520);
  const bottleWidth = bottleHeight * 0.46;

  // Horizon at 40% of stage height; front baseline sits at ~73% of stage height
  const horizonY = stageHeight * 0.40;
  const frontBaselineY = stageHeight * 0.74;

  const N = S.length;
  const stepAngle = (2 * Math.PI) / N;

  S.forEach((scent, a) => {
    const el = ringBodies[a];
    if (!el) return;

    // phi = wrap(a - cur) * step
    let diff = (a - STATE.cur) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;

    const phi = diff * stepAngle;
    const slots_from_front = Math.abs(diff);

    // depth z = R * (1 - cos phi), perspective ps = P / (P + z)
    const z = R * (1 - Math.cos(phi));
    const ps = P / (P + z);

    // x = centre + R * sin(phi) * ps
    const x = centreX + R * Math.sin(phi) * ps;

    // Back-of-ring bodies sit higher and smaller toward horizon line at 40%
    const y = horizonY + (frontBaselineY - horizonY) * ((1 + Math.cos(phi)) * 0.5) * ps;

    // scale = ps * (1 + 0.1 * clamp(1 - slots_from_front, 0, 1))
    const scale = ps * (1 + 0.1 * Math.min(Math.max(1 - slots_from_front, 0), 1));

    // blur = min(2px per slot from front, 6px)
    const blur = prefersReducedMotion.matches ? 0 : Math.min(2 * slots_from_front, 6);

    // opacity = clamp((cos phi + 0.5) / 0.35, 0, 1)
    const opacity = Math.min(Math.max((Math.cos(phi) + 0.5) / 0.35, 0), 1);

    // z-index = round(scale * 1000)
    const zIndex = Math.round(scale * 1000);

    // Cull when opacity is under 0.01
    if (opacity < 0.01) {
      el.style.display = 'none';
      return;
    }

    el.style.display = 'block';
    el.style.width = `${bottleWidth}px`;
    el.style.height = `${bottleHeight}px`;
    el.style.zIndex = zIndex;
    el.style.opacity = opacity.toFixed(3);
    el.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none';

    // Position transforms
    const posX = (x - bottleWidth / 2).toFixed(1);
    const posY = (y - bottleHeight).toFixed(1);
    el.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale.toFixed(4)})`;

    // Visual mark for front bottle
    if (slots_from_front < 0.25) {
      el.classList.add('ring-body-front');
    } else {
      el.classList.remove('ring-body-front');
    }
  });

  // Check look change based on target look
  const currentFrontLook = Math.round(STATE.target);
  const wrappedActiveIndex = ((currentFrontLook % N) + N) % N;

  if (wrappedActiveIndex !== STATE.activeScentIndex) {
    onLookChange(wrappedActiveIndex);
  }
}

function physicsStep(frameDt = 1 / 60) {
  if (prefersReducedMotion.matches) {
    STATE.cur = STATE.target;
    STATE.vel = 0;
    STATE.isSleeping = true;
    updateRingPositions();
    return;
  }

  const subDt = Math.min(Math.max(frameDt, 0.001), 0.05) / SUB_STEPS;
  for (let i = 0; i < SUB_STEPS; i++) {
    const force = -SPRING_K * (STATE.cur - STATE.target) - SPRING_C * STATE.vel;
    STATE.vel += force * subDt;
    STATE.cur += STATE.vel * subDt;
  }

  if (Math.abs(STATE.cur - STATE.target) < 0.0005 && Math.abs(STATE.vel) < 0.0005) {
    STATE.cur = STATE.target;
    STATE.vel = 0;
    STATE.isSleeping = true;
  }

  updateRingPositions();
}

let rafId = null;
let lastFrameTimestamp = null;

function animationLoop(timestamp) {
  const frameDt = lastFrameTimestamp !== null ? (timestamp - lastFrameTimestamp) / 1000 : DT * SUB_STEPS;
  lastFrameTimestamp = timestamp;

  if (!STATE.isSleeping) {
    physicsStep(frameDt);
  }

  // Handle Autoplay & active tick fill bar
  handleAutoplay(timestamp);

  // Handle inertia custom cursor
  updateCustomCursor();

  rafId = requestAnimationFrame(animationLoop);
}

function wakePhysics() {
  if (STATE.isSleeping) {
    STATE.isSleeping = false;
  }
}

/* ==========================================================================
   5. State Changes, Autoplay, Controls & Gestures
   ========================================================================== */

function onLookChange(newIndex) {
  STATE.activeScentIndex = newIndex;
  const scent = S[newIndex];

  // 1. Stage spotlight color
  if (stageSpotlight) {
    stageSpotlight.style.background = `radial-gradient(circle, ${scent.highlight} 0%, transparent 70%)`;
  }

  // 2. Ghost Arabic Scent Name
  if (ghostArabic) {
    ghostArabic.style.opacity = '0';
    setTimeout(() => {
      ghostArabic.textContent = scent.arabic;
      ghostArabic.style.opacity = '';
    }, 180);
  }

  // 3. Update Progress Ticks
  updateActiveTickUI(newIndex);

  // 4. Update Shopping Panel contents
  renderShoppingPanel();

  // 5. Close any open popup
  closeScentPopup(true);

  // Reset autoplay progress for the new look
  STATE.autoplayStartTime = performance.now();
}

/**
 * Autoplay Engine (Advances every 5s unless paused or permanently stopped)
 */
function handleAutoplay(timestamp) {
  if (!STATE.autoplayActive || prefersReducedMotion.matches) return;

  const tickEl = document.querySelector(`.scent-tick[data-index="${STATE.activeScentIndex}"]`);
  const fillBar = tickEl ? tickEl.querySelector('.tick-fill-bar') : null;

  if (STATE.autoplayPaused || STATE.isDragging || document.hidden) {
    // Hold current fill
    return;
  }

  const elapsed = timestamp - STATE.autoplayStartTime;
  const progress = Math.min(Math.max(elapsed / STATE.autoplayDuration, 0), 1);

  if (fillBar) {
    fillBar.style.width = `${(progress * 100).toFixed(1)}%`;
  }

  if (elapsed >= STATE.autoplayDuration) {
    STATE.autoplayStartTime = timestamp;
    if (fillBar) fillBar.style.width = '0%';
    STATE.target += 1;
    wakePhysics();
  }
}

function stopAutoplayPermanently() {
  if (STATE.autoplayActive) {
    STATE.autoplayActive = false;
    updatePlayPauseButtonUI();
    const allBars = document.querySelectorAll('.tick-fill-bar');
    allBars.forEach((bar) => { bar.style.width = '0%'; });
  }
}

function toggleAutoplay() {
  STATE.autoplayActive = !STATE.autoplayActive;
  if (STATE.autoplayActive) {
    STATE.autoplayStartTime = performance.now();
  }
  updatePlayPauseButtonUI();
}

const playPauseBtn = document.getElementById('playPauseBtn');
function updatePlayPauseButtonUI() {
  if (!playPauseBtn) return;
  const pauseIcon = playPauseBtn.querySelector('.icon-pause');
  const playIcon = playPauseBtn.querySelector('.icon-play');

  if (STATE.autoplayActive) {
    playPauseBtn.setAttribute('aria-pressed', 'false');
    playPauseBtn.setAttribute('aria-label', 'Pause autoplay');
    if (pauseIcon) pauseIcon.style.display = 'block';
    if (playIcon) playIcon.style.display = 'none';
  } else {
    playPauseBtn.setAttribute('aria-pressed', 'true');
    playPauseBtn.setAttribute('aria-label', 'Resume autoplay');
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playIcon) playIcon.style.display = 'block';
  }
}

function goToLook(targetIndex) {
  stopAutoplayPermanently();
  const N = S.length;
  const currentSlot = Math.round(STATE.target);
  let currentWrapped = ((currentSlot % N) + N) % N;
  let diff = targetIndex - currentWrapped;
  if (diff > N / 2) diff -= N;
  if (diff < -N / 2) diff += N;

  STATE.target = currentSlot + diff;
  wakePhysics();
}

function buildProgressTicks() {
  const group = document.getElementById('progressTicksGroup');
  if (!group) return;
  group.innerHTML = '';

  S.forEach((scent, i) => {
    const tick = document.createElement('button');
    tick.type = 'button';
    tick.className = `scent-tick ${i === STATE.activeScentIndex ? 'active' : ''}`;
    tick.setAttribute('data-index', i);
    tick.setAttribute('role', 'tab');
    tick.setAttribute('aria-label', `Select fragrance ${scent.name}`);
    tick.setAttribute('aria-selected', i === STATE.activeScentIndex ? 'true' : 'false');
    if (i === STATE.activeScentIndex) {
      tick.setAttribute('aria-current', 'true');
    }

    tick.innerHTML = `
      <div class="tick-fill-bar"></div>
      <span class="tick-label-text">${scent.name}</span>
    `;

    tick.addEventListener('click', () => {
      goToLook(i);
    });

    group.appendChild(tick);
  });
}

function updateActiveTickUI(activeIndex) {
  const ticks = document.querySelectorAll('.scent-tick');
  ticks.forEach((tick, i) => {
    const fillBar = tick.querySelector('.tick-fill-bar');
    if (i === activeIndex) {
      tick.classList.add('active');
      tick.setAttribute('aria-selected', 'true');
      tick.setAttribute('aria-current', 'true');
    } else {
      tick.classList.remove('active');
      tick.setAttribute('aria-selected', 'false');
      tick.removeAttribute('aria-current');
      if (fillBar) fillBar.style.width = '0%';
    }
  });
}

// Arrow Controls
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    stopAutoplayPermanently();
    STATE.target -= 1;
    wakePhysics();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    stopAutoplayPermanently();
    STATE.target += 1;
    wakePhysics();
  });
}

if (playPauseBtn) {
  playPauseBtn.addEventListener('click', () => {
    toggleAutoplay();
  });
}

// Keyboard Navigation on Stage
if (stageSection) {
  stageSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stopAutoplayPermanently();
      STATE.target -= 1;
      wakePhysics();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      stopAutoplayPermanently();
      STATE.target += 1;
      wakePhysics();
    }
  });
}

// Trackpad Horizontal Scroll: Step once per 45px, 520ms lock
let wheelAccumX = 0;
stageSection.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
    wheelAccumX += e.deltaX;
    const now = performance.now();
    if (now - STATE.lastWheelTime > 520 && Math.abs(wheelAccumX) >= 45) {
      STATE.lastWheelTime = now;
      stopAutoplayPermanently();
      if (wheelAccumX > 0) {
        STATE.target += 1;
      } else {
        STATE.target -= 1;
      }
      wheelAccumX = 0;
      wakePhysics();
    }
  }
}, { passive: false });

// Pointer Drag & Swipe
let pointerId = null;

stageSection.addEventListener('pointerdown', (e) => {
  // Only left click or primary touch
  if (e.button !== 0) return;
  STATE.dragStartX = e.clientX;
  STATE.dragStartY = e.clientY;
  STATE.dragStartCur = STATE.cur;
  STATE.dragStartTime = performance.now();
  STATE.hasMovedSignificantly = false;
  STATE.isDragging = false;
  pointerId = e.pointerId;
});

stageSection.addEventListener('pointermove', (e) => {
  if (pointerId === null || pointerId !== e.pointerId) return;

  const dx = e.clientX - STATE.dragStartX;
  const dy = e.clientY - STATE.dragStartY;

  if (!STATE.isDragging) {
    // If movement is under 8px, do not trigger drag
    if (Math.hypot(dx, dy) < 8) return;

    // If gesture is mostly vertical on mobile/touch, do not hijack page scroll!
    if (Math.abs(dy) > Math.abs(dx)) {
      pointerId = null;
      return;
    }

    STATE.isDragging = true;
    STATE.hasMovedSignificantly = true;
    try {
      stageSection.setPointerCapture(e.pointerId);
    } catch (_) {}
    stopAutoplayPermanently();
  }

  if (STATE.isDragging) {
    const stageWidth = stageSection.clientWidth || 800;
    const unit = stageWidth * 0.45; // ~200-350px per look
    STATE.target = STATE.dragStartCur - (dx / unit);
    STATE.cur = STATE.target; // direct tracking during drag
    wakePhysics();
  }
});

function handlePointerUpOrCancel(e) {
  if (pointerId === null || pointerId !== e.pointerId) return;

  if (STATE.isDragging) {
    try {
      stageSection.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const dt = Math.max((performance.now() - STATE.dragStartTime) / 1000, 0.05);
    const dx = e.clientX - STATE.dragStartX;
    const velocity = (dx / dt);

    // Apply momentum clamped to maximum 2 looks
    let momentum = -velocity / 900;
    momentum = Math.min(Math.max(momentum, -1.8), 1.8);

    const projectedTarget = STATE.target + momentum;
    const snapped = Math.round(projectedTarget);

    // Clamp total change from start to maximum 2 looks
    const startSnapped = Math.round(STATE.dragStartCur);
    const maxLook = startSnapped + 2;
    const minLook = startSnapped - 2;
    STATE.target = Math.min(Math.max(snapped, minLook), maxLook);

    STATE.isDragging = false;
    wakePhysics();
  }

  pointerId = null;
}

stageSection.addEventListener('pointerup', handlePointerUpOrCancel);
stageSection.addEventListener('pointercancel', handlePointerUpOrCancel);

/* ==========================================================================
   6. Custom Inertia Cursor
   ========================================================================== */

const customCursor = document.getElementById('customCursor');
const cursorText = document.getElementById('cursorText');
const hasFineHover = window.matchMedia('(hover: hover) and (pointer: fine)');

function initCustomCursor() {
  if (!hasFineHover.matches || !customCursor) {
    if (customCursor) customCursor.remove();
    return;
  }

  stageSection.addEventListener('mouseenter', () => {
    STATE.isCursorOverStage = true;
    customCursor.classList.add('active');
  });

  stageSection.addEventListener('mouseleave', () => {
    STATE.isCursorOverStage = false;
    customCursor.classList.remove('active');
  });

  stageSection.addEventListener('mousemove', (e) => {
    STATE.targetCursorX = e.clientX;
    STATE.targetCursorY = e.clientY;

    // Check if hovering front bottle
    const frontEl = document.querySelector('.ring-body-front');
    if (frontEl && frontEl.contains(e.target)) {
      STATE.isCursorOverFrontBottle = true;
    } else {
      STATE.isCursorOverFrontBottle = false;
    }
  });
}

function updateCustomCursor() {
  if (!hasFineHover.matches || !customCursor || !STATE.isCursorOverStage) return;

  // Inertia lerp 0.18
  STATE.cursorX += (STATE.targetCursorX - STATE.cursorX) * 0.18;
  STATE.cursorY += (STATE.targetCursorY - STATE.cursorY) * 0.18;

  customCursor.style.transform = `translate3d(${STATE.cursorX.toFixed(1)}px, ${STATE.cursorY.toFixed(1)}px, 0) translate(-50%, -50%)`;

  if (STATE.isDragging) {
    customCursor.classList.add('dragging');
  } else {
    customCursor.classList.remove('dragging');
  }

  if (STATE.isCursorOverFrontBottle && !STATE.isDragging) {
    customCursor.classList.add('view-mode');
    if (cursorText) cursorText.textContent = 'View';
  } else {
    customCursor.classList.remove('view-mode');
    if (cursorText) cursorText.textContent = 'Drag';
  }
}

/* ==========================================================================
   7. "View Scent" Notes Popup & Interactive Pins
   ========================================================================== */

const scentPopup = document.getElementById('scentPopup');
const popupBackdrop = document.getElementById('popupBackdrop');
const popupCloseBtn = document.getElementById('popupCloseBtn');
const popupTitle = document.getElementById('popupScentTitle');
const popupTagline = document.getElementById('popupScentTagline');
const showcaseBottleArt = document.getElementById('showcaseBottleArt');
const topNoteText = document.getElementById('topNoteText');
const heartNoteText = document.getElementById('heartNoteText');
const baseNoteText = document.getElementById('baseNoteText');
const pinBtnTop = document.getElementById('pinBtnTop');
const pinBtnHeart = document.getElementById('pinBtnHeart');
const pinBtnBase = document.getElementById('pinBtnBase');

function openScentPopup(scentIndex) {
  stopAutoplayPermanently();
  const scent = S[scentIndex];

  if (popupTitle) popupTitle.textContent = scent.name;
  if (popupTagline) popupTagline.textContent = scent.tagline;
  if (topNoteText) topNoteText.textContent = scent.top;
  if (heartNoteText) heartNoteText.textContent = scent.heart;
  if (baseNoteText) baseNoteText.textContent = scent.base;

  if (pinBtnTop) pinBtnTop.setAttribute('aria-label', `Top note: ${scent.top}`);
  if (pinBtnHeart) pinBtnHeart.setAttribute('aria-label', `Heart note: ${scent.heart}`);
  if (pinBtnBase) pinBtnBase.setAttribute('aria-label', `Base note: ${scent.base}`);

  // Overlay in scent color tailored to active theme
  if (popupBackdrop) {
    popupBackdrop.style.background = `radial-gradient(circle at center, ${scent.color}36 0%, var(--popup-backdrop-edge) 80%)`;
  }
  const popupPanelEl = document.getElementById('popupPanel');
  if (popupPanelEl) {
    popupPanelEl.style.borderColor = `rgba(201, 162, 74, 0.45)`;
  }

  if (showcaseBottleArt) {
    showcaseBottleArt.innerHTML = `
      <div class="popup-flacon-wrapper">
        <img src="${scent.bottleImg}" alt="${scent.name} Eau de Parfum" class="popup-flacon-img" draggable="false">
      </div>
    `;
  }

  if (scentPopup) {
    scentPopup.removeAttribute('hidden');
    // Force reflow for CSS transition
    void scentPopup.offsetWidth;
    scentPopup.classList.add('open');
    if (popupCloseBtn) popupCloseBtn.focus();
  }
}

function closeScentPopup(silent = false) {
  if (!scentPopup || scentPopup.hasAttribute('hidden')) return;

  scentPopup.classList.remove('open');
  setTimeout(() => {
    scentPopup.setAttribute('hidden', '');
    if (!silent && stageSection) {
      stageSection.focus();
    }
  }, 250);
}

if (popupCloseBtn) {
  popupCloseBtn.addEventListener('click', () => closeScentPopup());
}

if (popupBackdrop) {
  popupBackdrop.addEventListener('click', () => closeScentPopup());
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && scentPopup && !scentPopup.hasAttribute('hidden')) {
    closeScentPopup();
  }
});

// Interactive Pin Hover/Focus Toggles
[
  { pin: document.getElementById('pinTop'), btn: pinBtnTop },
  { pin: document.getElementById('pinHeart'), btn: pinBtnHeart },
  { pin: document.getElementById('pinBase'), btn: pinBtnBase }
].forEach(({ pin, btn }) => {
  if (!btn || !pin) return;
  btn.addEventListener('click', () => {
    pin.classList.toggle('active');
  });
});

/* ==========================================================================
   8. Shopping Panel & Bundle Calculations
   ========================================================================== */

const productRowsList = document.getElementById('productRowsList');
const panelCurrentScentName = document.getElementById('panelCurrentScentName');
const bundleStruckPrice = document.getElementById('bundleStruckPrice');
const bundleLivePrice = document.getElementById('bundleLivePrice');
const addRitualBtn = document.getElementById('addRitualBtn');

function getPieceCurrentPrice(pieceIndex) {
  const piece = PC[pieceIndex];
  const chosenSize = STATE.selectedSizes[pieceIndex];
  const sizeObj = piece.sizes.find((s) => s.size === chosenSize) || piece.sizes[0];
  return sizeObj.price;
}

function calculateBundleTotals() {
  const sum = PC.reduce((acc, _, idx) => acc + getPieceCurrentPrice(idx), 0);
  const discounted = Math.round(sum * 0.9); // 10% off
  return { sum, discounted };
}

function renderShoppingPanel() {
  const currentScent = S[STATE.activeScentIndex];

  if (panelCurrentScentName) {
    panelCurrentScentName.textContent = `${currentScent.name} · ${currentScent.tagline}`;
  }

  if (!productRowsList) return;
  productRowsList.innerHTML = '';

  PC.forEach((piece, idx) => {
    const isExpanded = STATE.expandedRow === idx;
    const currentPrice = getPieceCurrentPrice(idx);
    const chosenSize = STATE.selectedSizes[idx];

    const rowCard = document.createElement('div');
    rowCard.className = `product-row-card ${isExpanded ? 'expanded' : ''}`;
    rowCard.setAttribute('data-piece-index', idx);

    // Thumbnail Icon (Strictly Fine Perfume formats)
    let thumbSvg = '';
    if (piece.type === 'parfum') {
      thumbSvg = `<img src="${currentScent.bottleImg}" alt="${currentScent.name}" class="thumb-flacon-img">`;
    } else if (piece.type === 'atomizer') {
      thumbSvg = createTravelAtomizerSVG(currentScent);
    } else if (piece.type === 'coffret') {
      thumbSvg = createCoffretSVG(currentScent);
    }

    const rowCatalogId = `${currentScent.id}-${piece.id}`;
    const isSavedWishlist = typeof isInWishlist === 'function' ? isInWishlist(rowCatalogId) : false;

    rowCard.innerHTML = `
      <div class="product-row-main">
        <div class="product-thumbnail-tile" aria-hidden="true">
          ${thumbSvg}
        </div>
        <div class="product-info-wrap">
          <h3 class="product-item-title">${currentScent.name} ${piece.name}</h3>
          <p class="product-item-desc">${piece.desc}</p>
          <p class="product-item-price" id="rowPrice-${idx}">${formatAED(currentPrice)}</p>
        </div>
        <div class="product-row-actions">
          <button type="button" class="wishlist-heart-btn row-wishlist-btn ${isSavedWishlist ? 'is-wishlisted' : ''}" data-wishlist-id="${rowCatalogId}" aria-pressed="${isSavedWishlist}" aria-label="${isSavedWishlist ? 'Remove' : 'Save'} ${currentScent.name} ${piece.name} from wishlist">
            ${getHeartSVG(isSavedWishlist)}
          </button>
          <button type="button" class="product-plus-btn" id="plusBtn-${idx}" aria-label="Select size for ${currentScent.name} ${piece.name}" aria-expanded="${isExpanded}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="product-size-drawer" id="drawer-${idx}">
        <div class="size-drawer-inner">
          <div class="size-pills-group" role="radiogroup" aria-label="Select size for ${piece.name}">
            ${piece.sizes.map((s) => `
              <button type="button" class="size-pill-btn ${s.size === chosenSize ? 'active' : ''}" role="radio" aria-checked="${s.size === chosenSize}" data-size="${s.size}" data-price="${s.price}">
                ${s.size}
              </button>
            `).join('')}
          </div>
          <button type="button" class="btn-add-line-item" id="addLineBtn-${idx}">
            Add to bag · ${formatAED(currentPrice)}
          </button>
        </div>
      </div>
    `;

    // Event Listeners for Row
    const wishlistBtn = rowCard.querySelector(`.row-wishlist-btn`);
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        stopAutoplayPermanently();
        toggleWishlist(rowCatalogId, chosenSize);
      });
    }

    const plusBtn = rowCard.querySelector(`#plusBtn-${idx}`);
    plusBtn.addEventListener('click', () => {
      stopAutoplayPermanently();
      STATE.expandedRow = STATE.expandedRow === idx ? null : idx;
      renderShoppingPanel();
    });

    const pills = rowCard.querySelectorAll('.size-pill-btn');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        stopAutoplayPermanently();
        const newSize = pill.getAttribute('data-size');
        STATE.selectedSizes[idx] = newSize;
        renderShoppingPanel();
      });
    });

    const addLineBtn = rowCard.querySelector(`#addLineBtn-${idx}`);
    addLineBtn.addEventListener('click', () => {
      stopAutoplayPermanently();
      addItemToBag(currentScent, piece, chosenSize, currentPrice, false);
    });

    productRowsList.appendChild(rowCard);
  });

  // Update Bundle Pricing
  const { sum, discounted } = calculateBundleTotals();
  if (bundleStruckPrice) bundleStruckPrice.textContent = formatAED(sum);
  if (bundleLivePrice) bundleLivePrice.textContent = formatAED(discounted);
}

// Bundle "Add perfume set to bag"
if (addRitualBtn) {
  addRitualBtn.addEventListener('click', () => {
    stopAutoplayPermanently();
    const currentScent = S[STATE.activeScentIndex];

    PC.forEach((piece, idx) => {
      const chosenSize = STATE.selectedSizes[idx];
      const regularPrice = getPieceCurrentPrice(idx);
      const discountedPrice = Math.round(regularPrice * 0.9);
      addItemToBag(currentScent, piece, chosenSize, discountedPrice, true);
    });

    showToast(`Perfume set added to bag · 3 formats (${formatAED(calculateBundleTotals().discounted)})`);
  });
}

/* ==========================================================================
   9. Bag Dialog, Delivery Threshold & Checkout
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
  const existing = STATE.bag.find((item) =>
    item.title === lineTitle && item.size === size && item.isRitual === isRitual
  );

  if (existing) {
    if (existing.qty < 20) {
      existing.qty += 1;
    }
  } else {
    STATE.bag.push({
      id: `${scent.id}-${piece.id}-${size}-${isRitual ? 'ritual' : 'reg'}`,
      title: lineTitle,
      size: size,
      price: price,
      qty: 1,
      isRitual: isRitual
    });
  }

  saveBag();
  updateBagUI();
  if (!isRitual) {
    showToast(`${lineTitle} (${size}) added to bag`);
  }
}

function updateBagUI() {
  const totalCount = STATE.bag.reduce((acc, item) => acc + item.qty, 0);
  if (bagCountBadge) bagCountBadge.textContent = totalCount;
  if (bagTrigger) bagTrigger.setAttribute('aria-label', `Open shopping bag, ${totalCount} items`);

  if (!bagDialogBody) return;

  if (STATE.bag.length === 0) {
    bagDialogBody.innerHTML = `
      <div class="bag-empty-state">
        <p>Your bag is empty.</p>
        <p style="margin-top: 0.5rem; font-size: 0.9375rem; color: var(--text-dim);">Explore fine perfumes or home &amp; car purifiers to save them here.</p>
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
    <div class="bag-items-list">
      ${STATE.bag.map((item, index) => {
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;
        return `
          <div class="bag-item-row">
            <div class="bag-item-left">
              <div class="bag-item-name">${item.title}</div>
              <div class="bag-item-meta">
                <span class="bag-item-size">${item.size}</span>
                ${item.isRitual ? '<span class="bag-item-ritual-badge">set -10%</span>' : ''}
              </div>
              <div class="bag-qty-controls">
                <button type="button" class="bag-qty-btn" aria-label="Decrease quantity" data-action="dec" data-index="${index}">–</button>
                <span class="bag-qty-val" aria-label="Quantity ${item.qty}">${item.qty}</span>
                <button type="button" class="bag-qty-btn" aria-label="Increase quantity" data-action="inc" data-index="${index}">+</button>
              </div>
            </div>
            <div class="bag-item-right">
              <span class="bag-item-price">${formatAED(lineTotal)}</span>
              <button type="button" class="bag-item-remove-btn" data-action="remove" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  if (bagSubtotalAmount) bagSubtotalAmount.textContent = formatAED(subtotal);

  // Delivery Threshold Rule:
  // "Free UAE delivery over AED 500 · Prices include 5% VAT" (switches to "Free UAE delivery" once subtotal reaches 500)
  if (deliveryThresholdNote) {
    if (subtotal >= 500) {
      deliveryThresholdNote.textContent = 'Free UAE delivery · Prices include 5% VAT';
    } else {
      deliveryThresholdNote.textContent = 'Free UAE delivery over AED 500 · Prices include 5% VAT';
    }
  }

  // Bind item controls
  const decBtns = bagDialogBody.querySelectorAll('[data-action="dec"]');
  const incBtns = bagDialogBody.querySelectorAll('[data-action="inc"]');
  const removeBtns = bagDialogBody.querySelectorAll('[data-action="remove"]');

  decBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-index'));
      if (STATE.bag[idx].qty > 1) {
        STATE.bag[idx].qty -= 1;
      } else {
        STATE.bag.splice(idx, 1);
      }
      saveBag();
      updateBagUI();
    });
  });

  incBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-index'));
      if (STATE.bag[idx].qty < 20) {
        STATE.bag[idx].qty += 1;
        saveBag();
        updateBagUI();
      }
    });
  });

  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-index'));
      STATE.bag.splice(idx, 1);
      saveBag();
      updateBagUI();
    });
  });
}

function openBagModal() {
  stopAutoplayPermanently();
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

if (bagTrigger) {
  bagTrigger.addEventListener('click', openBagModal);
}

if (closeBagDialog) {
  closeBagDialog.addEventListener('click', closeBagModal);
}

if (bagDialog) {
  // Backdrop click closes dialog
  bagDialog.addEventListener('click', (e) => {
    const rect = bagDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeBagModal();
    }
  });
}

// Checkout Button Prototype Handler (Connects directly to Customer Profile Order History)
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
      if (typeof updateProfileUI === 'function') updateProfileUI();
    }

    STATE.bag = [];
    saveBag();
    updateBagUI();
    if (checkoutStatusMsg) {
      checkoutStatusMsg.textContent = `Thank you. Order #${orderId} saved to your Profile. This is a prototype, so no payment was taken.`;
    }
  });
}

// Accessible Toast Notification
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
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3600);
}

/**
 * Resolves any catalog item OR runway-only format (like Atelier Gift Coffret) by id
 */
function findBuyableItem(catalogId) {
  const fromCatalog = CATALOG.find((c) => c.catalogId === catalogId);
  if (fromCatalog) return fromCatalog;

  // Check if Runway Gift Coffret
  if (catalogId && catalogId.endsWith('-coffret')) {
    const scentId = catalogId.replace(/-coffret$/, '');
    const scentIndex = S.findIndex((s) => s.id === scentId);
    const scent = S[scentIndex];
    const coffretPiece = PC.find((p) => p.id === 'coffret');
    if (scent && coffretPiece) {
      return {
        catalogId,
        scentIndex,
        scentId: scent.id,
        scentName: scent.name,
        arabic: scent.arabic,
        color: scent.color,
        highlight: scent.highlight,
        bottleImg: null,
        visualType: 'coffret',
        category: 'perfume',
        categoryLabel: 'Fine Perfume',
        subLabel: coffretPiece.name,
        title: `${scent.name} ${coffretPiece.name}`,
        family: (SCENT_META[scent.id] || {}).family || scent.tagline,
        sizes: coffretPiece.sizes.map((s) => ({ ...s })),
        defaultSize: coffretPiece.sizes[0].size
      };
    }
  }
  return null;
}

/**
 * Helper: Add any Perfume or Purifier creation to Cart
 */
function addCatalogItemToBag(catalogItem, selectedSize) {
  if (!catalogItem) return;

  // Fine Perfume item (linked to S[] + PC[])
  if (catalogItem.category === 'perfume' && catalogItem.scentIndex !== null) {
    const scent = S[catalogItem.scentIndex];
    if (!scent) return;
    const pieceSuffix = catalogItem.catalogId.split('-').pop();
    const piece = PC.find((p) => p.id === pieceSuffix) || PC[0];
    const sizeObj = catalogItem.sizes.find((s) => s.size === selectedSize) || catalogItem.sizes[0];
    addItemToBag(scent, piece, sizeObj.size, sizeObj.price, false);
    return;
  }

  // Separate Home Purifier or Car Purifier item
  const sizeObj = catalogItem.sizes.find((s) => s.size === selectedSize) || catalogItem.sizes[0];
  const pseudoScent = { id: catalogItem.scentId, name: catalogItem.scentName };
  const pseudoPiece = { id: catalogItem.category, name: catalogItem.categoryLabel };
  addItemToBag(pseudoScent, pseudoPiece, sizeObj.size, sizeObj.price, false);
}

/* ==========================================================================
   9a-bis. Wishlist Logic & Modal
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
    const sizeToSave = preferredSize || STATE.catalogSelectedSizes[catalogId] || item.defaultSize;
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
    btn.classList.toggle('is-wishlisted', saved);
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    btn.innerHTML = getHeartSVG(saved);
  });
}

function updateWishlistUI() {
  const count = STATE.wishlist.length;
  if (wishlistCountBadge) {
    wishlistCountBadge.textContent = count;
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
      <div class="bag-empty-state">
        <p>Your wishlist is empty.</p>
        <p style="margin-top: 0.5rem; font-size: 0.9375rem; color: var(--text-dim);">Tap the heart on any fine perfume, home purifier, or car purifier to curate your collection.</p>
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
        const thumbHTML = getItemVisualHTML(item, 'wishlist');

        return `
          <div class="wishlist-item-row">
            <div class="wishlist-item-thumb">${thumbHTML}</div>
            <div class="wishlist-item-info">
              <div class="wishlist-item-title">${item.title}</div>
              <div class="wishlist-item-sub">${sizeObj.size} · ${item.categoryLabel}</div>
              <div class="wishlist-item-price">${formatAED(sizeObj.price)}</div>
            </div>
            <div class="wishlist-item-actions">
              <button type="button" class="wishlist-move-btn" data-wish-move="${item.catalogId}" data-wish-size="${sizeObj.size}">Move to Cart</button>
              <button type="button" class="wishlist-remove-link" data-wish-remove="${item.catalogId}">Remove</button>
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
      const id = btn.getAttribute('data-wish-remove');
      toggleWishlist(id);
    });
  });
}

function openWishlistModal() {
  stopAutoplayPermanently();
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

if (wishlistTrigger) {
  wishlistTrigger.addEventListener('click', openWishlistModal);
}
if (closeWishlistDialog) {
  closeWishlistDialog.addEventListener('click', closeWishlistModal);
}
if (wishlistDialog) {
  wishlistDialog.addEventListener('click', (e) => {
    const rect = wishlistDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) closeWishlistModal();
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
   9a-ter. Customer Profile Dialog & Order History
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

  // Sync Form Values
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
      <div class="bag-empty-state">
        <p>No commissions placed yet.</p>
        <p style="margin-top:0.5rem; font-size:0.875rem; color:var(--text-dim);">Completed checkouts from your shopping cart will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map((order, oIdx) => `
    <div class="profile-order-card">
      <div class="order-card-head">
        <div>
          <div class="order-id-label">Order #${order.id}</div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">${order.date}</div>
        </div>
        <span class="order-status-pill">${order.status}</span>
      </div>
      <div class="order-items-mini">
        ${order.items.map((it) => `<div>${it.qty}× ${it.title} (${it.size}) — ${formatAED(it.price * it.qty)}</div>`).join('')}
      </div>
      <div class="order-card-foot">
        <span class="order-total-amount">Total: ${formatAED(order.total)}</span>
        <button type="button" class="wishlist-move-btn" data-reorder-idx="${oIdx}">Reorder Items</button>
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
      showToast(`Reordered ${order.items.length} pieces from #${order.id} into Cart`);
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
      <div style="margin-top:0.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button type="button" class="wishlist-move-btn" id="wardrobeTryScentBtn">Try ${recScent.name} Perfume</button>
        <button type="button" class="wishlist-move-btn" id="wardrobeTryPurifiersBtn">Explore Home & Car Purifiers</button>
        <button type="button" class="wishlist-move-btn" id="wardrobeOpenWishlistBtn">Open Wishlist (${STATE.wishlist.length})</button>
      </div>
    </div>
    <div class="wardrobe-card">
      <h4>Complimentary UAE Concierge Benefits</h4>
      <p>· Priority next-day courier across Dubai Design District & all Emirates.<br>
         · Two complimentary 2ml Extrait discovery vials included with every 50ml or 100ml commission.<br>
         · Dedicated Home &amp; Car Purifiers formulated separately from skin perfumes.</p>
    </div>
  `;

  const tryBtn = document.getElementById('wardrobeTryScentBtn');
  if (tryBtn) {
    tryBtn.addEventListener('click', () => {
      closeProfileModal();
      goToLook(recIdx);
      const runway = document.getElementById('scents');
      if (runway) runway.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
    });
  }
  const tryPurifiersBtn = document.getElementById('wardrobeTryPurifiersBtn');
  if (tryPurifiersBtn) {
    tryPurifiersBtn.addEventListener('click', () => {
      closeProfileModal();
      const purifiersSec = document.getElementById('purifiers');
      if (purifiersSec) purifiersSec.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
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
  stopAutoplayPermanently();
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
  document.querySelectorAll('.profile-tab-btn').forEach((btn) => {
    const active = btn.getAttribute('data-profile-tab') === tabName;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  document.querySelectorAll('.profile-tab-pane').forEach((pane) => {
    const matches = pane.id === `profilePane-${tabName}`;
    pane.classList.toggle('active', matches);
    if (matches) {
      pane.removeAttribute('hidden');
    } else {
      pane.setAttribute('hidden', '');
    }
  });
}

document.querySelectorAll('.profile-tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    switchProfileTab(btn.getAttribute('data-profile-tab'));
  });
});

if (profileTrigger) {
  profileTrigger.addEventListener('click', () => openProfileModal('details'));
}
if (closeProfileDialog) {
  closeProfileDialog.addEventListener('click', closeProfileModal);
}
if (profileDialog) {
  profileDialog.addEventListener('click', (e) => {
    const rect = profileDialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) closeProfileModal();
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
   9a-quater. Most Selling Creations Section (#bestsellers)
   ========================================================================== */

function renderBestSellers() {
  const spotlightMount = document.getElementById('bestsellerSpotlightMount');
  const runnersGrid = document.getElementById('bestsellersRunnersGrid');

  const sortedBySales = [...CATALOG].sort((a, b) => b.salesCount - a.salesCount);
  const heroItem = sortedBySales[0]; // Oud Rose Extrait de Parfum
  const runners = sortedBySales.slice(1, 4);

  if (spotlightMount && heroItem) {
    const heroScent = S[heroItem.scentIndex];
    const selectedSize = STATE.bestsellerSpotlightSize || heroItem.defaultSize;
    const sizeObj = heroItem.sizes.find((s) => s.size === selectedSize) || heroItem.sizes[0];
    const isSaved = isInWishlist(heroItem.catalogId);

    spotlightMount.innerHTML = `
      <article class="bestseller-spotlight-card" aria-label="Featured #1 Best Selling Creation: ${heroItem.title}">
        <div class="bestseller-stage-col">
          <div class="bestseller-rank-crest">★ #01 MOST SELLING CREATION</div>
          <span class="bestseller-arabic-bg" aria-hidden="true">${heroItem.arabic}</span>
          <img src="${heroItem.bottleImg}" alt="${heroItem.title}" class="bestseller-bottle-img">
        </div>

        <div class="bestseller-details-col">
          <div class="bestseller-meta-top">
            <span class="bestseller-metrics-pill">${heroItem.family} · ★ ${heroItem.rating} (${heroItem.salesCount} acquired)</span>
            <button type="button" class="wishlist-heart-btn ${isSaved ? 'is-wishlisted' : ''}" data-wishlist-id="${heroItem.catalogId}" id="bestsellerWishlistBtn" aria-pressed="${isSaved}" aria-label="Save ${heroItem.title} to wishlist">
              ${getHeartSVG(isSaved)}
            </button>
          </div>

          <div class="bestseller-title-group">
            <h3 class="bestseller-name">${heroItem.title}</h3>
            <p class="bestseller-subtitle">${heroItem.arabic} · ${heroScent.tagline}</p>
          </div>

          <p class="bestseller-copy">${heroItem.story}</p>

          <div class="bestseller-notes-triad">
            <div class="triad-item">
              <span class="triad-label">Top Note</span>
              <span class="triad-value">${heroScent.top}</span>
            </div>
            <div class="triad-item">
              <span class="triad-label">Heart Note</span>
              <span class="triad-value">${heroScent.heart}</span>
            </div>
            <div class="triad-item">
              <span class="triad-label">Base Note</span>
              <span class="triad-value">${heroScent.base}</span>
            </div>
          </div>

          <div class="bestseller-purchase-bar">
            <div class="bestseller-size-price-row">
              <div class="catalog-size-pills" role="radiogroup" aria-label="Select size for ${heroItem.title}">
                ${heroItem.sizes.map((s) => `
                  <button type="button" class="catalog-size-pill ${s.size === sizeObj.size ? 'active' : ''}" data-bs-size="${s.size}" role="radio" aria-checked="${s.size === sizeObj.size}">
                    ${s.size}
                  </button>
                `).join('')}
              </div>
              <span class="bestseller-live-price" id="bestsellerLivePrice">${formatAED(sizeObj.price)}</span>
            </div>

            <div class="bestseller-cta-row">
              <button type="button" class="btn-flat-gold" id="bestsellerAddBtn">
                Add to Cart · ${formatAED(sizeObj.price)}
              </button>
              <button type="button" class="btn-secondary-gold" id="bestsellerNotesBtn">
                Inspect Scent Notes
              </button>
            </div>
          </div>
        </div>
      </article>
    `;

    // Bind events
    spotlightMount.querySelectorAll('[data-bs-size]').forEach((pill) => {
      pill.addEventListener('click', () => {
        STATE.bestsellerSpotlightSize = pill.getAttribute('data-bs-size');
        renderBestSellers();
      });
    });

    const bsWishBtn = document.getElementById('bestsellerWishlistBtn');
    if (bsWishBtn) {
      bsWishBtn.addEventListener('click', () => {
        toggleWishlist(heroItem.catalogId, sizeObj.size);
      });
    }

    const bsAddBtn = document.getElementById('bestsellerAddBtn');
    if (bsAddBtn) {
      bsAddBtn.addEventListener('click', () => {
        addCatalogItemToBag(heroItem, sizeObj.size);
      });
    }

    const bsNotesBtn = document.getElementById('bestsellerNotesBtn');
    if (bsNotesBtn) {
      bsNotesBtn.addEventListener('click', () => {
        goToLook(heroItem.scentIndex);
        openScentPopup(heroItem.scentIndex);
      });
    }
  }

  if (runnersGrid) {
    runnersGrid.innerHTML = runners.map((item, idx) => {
      const rankNum = `0${idx + 2}`;
      const sizeObj = item.sizes.find((s) => s.size === item.defaultSize) || item.sizes[0];
      const saved = isInWishlist(item.catalogId);

      return `
        <article class="runner-card">
          <div class="runner-thumb-box">
            <span class="runner-rank-num">#${rankNum}</span>
            ${getItemVisualHTML(item, 'runner')}
          </div>
          <div class="runner-info-col">
            <span class="runner-category-tag">${item.badge || item.categoryLabel}</span>
            <h4 class="runner-title">${item.title}</h4>
            <p class="runner-sales-note">${sizeObj.size} · ★ ${item.rating} · ${item.salesCount} acquired</p>
            <div class="runner-bottom-row">
              <span class="runner-price">${formatAED(sizeObj.price)}</span>
              <div class="runner-actions">
                <button type="button" class="wishlist-heart-btn row-wishlist-btn ${saved ? 'is-wishlisted' : ''}" data-wishlist-id="${item.catalogId}" aria-pressed="${saved}" aria-label="Save ${item.title} to wishlist">
                  ${getHeartSVG(saved)}
                </button>
                <button type="button" class="runner-add-btn" data-runner-add="${item.catalogId}">Add</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    runnersGrid.querySelectorAll('[data-wishlist-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggleWishlist(btn.getAttribute('data-wishlist-id'));
      });
    });

    runnersGrid.querySelectorAll('[data-runner-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-runner-add');
        const item = CATALOG.find((c) => c.catalogId === id);
        if (item) addCatalogItemToBag(item, item.defaultSize);
      });
    });
  }
}

/* ==========================================================================
   9a-quater-bis. Home & Car Purifiers Section (#purifiers)
   ========================================================================== */

function initPurifierTabs() {
  const tabs = document.querySelectorAll('#purifierSectionTabs [data-purifier-tab]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      STATE.purifierTab = tab.getAttribute('data-purifier-tab') || 'all';
      renderPurifiersShowcase();
    });
  });
}

function renderPurifiersShowcase() {
  const grid = document.getElementById('purifiersShowcaseGrid');
  if (!grid) return;

  const activeTab = STATE.purifierTab || 'all';
  const purifierItems = CATALOG.filter((item) => {
    if (item.category !== 'home-purifier' && item.category !== 'car-purifier') return false;
    if (activeTab !== 'all' && item.category !== activeTab) return false;
    return true;
  });

  grid.innerHTML = purifierItems.map((item) => {
    const activeSize = STATE.catalogSelectedSizes[item.catalogId] || item.defaultSize;
    const sizeObj = item.sizes.find((s) => s.size === activeSize) || item.sizes[0];
    const saved = isInWishlist(item.catalogId);

    return `
      <article class="catalog-card" data-purifier-card="${item.catalogId}">
        <div class="catalog-card-stage purifier-card-stage" style="background: radial-gradient(circle at 50% 50%, ${item.highlight}22 0%, var(--card-stage-edge) 75%);">
          ${item.badge ? `<span class="catalog-card-tag">${item.badge}</span>` : ''}
          <button type="button" class="wishlist-heart-btn catalog-wishlist-pin ${saved ? 'is-wishlisted' : ''}" data-wishlist-id="${item.catalogId}" aria-pressed="${saved}" aria-label="Save ${item.title} to wishlist">
            ${getHeartSVG(saved)}
          </button>
          ${getItemVisualHTML(item, 'purifier-showcase')}
        </div>

        <div class="catalog-card-body">
          <div class="catalog-card-meta">
            <span>${item.categoryLabel}</span>
            <span>${item.arabic}</span>
          </div>
          <h3 class="catalog-card-title">${item.title}</h3>
          <p class="catalog-card-notes">${item.story}</p>
          <p class="catalog-card-notes" style="font-size: 0.8125rem; color: var(--gold); opacity: 0.9;">
            Top: ${item.top} · Base: ${item.base}
          </p>

          <div class="catalog-size-pills" role="radiogroup" aria-label="Select format for ${item.title}">
            ${item.sizes.map((s) => `
              <button type="button" class="catalog-size-pill ${s.size === sizeObj.size ? 'active' : ''}" data-pur-id="${item.catalogId}" data-pur-size="${s.size}" role="radio" aria-checked="${s.size === sizeObj.size}">
                ${s.size}
              </button>
            `).join('')}
          </div>

          <div class="catalog-card-footer">
            <span class="catalog-card-price">${formatAED(sizeObj.price)}</span>
            <button type="button" class="catalog-add-btn" data-pur-add="${item.catalogId}">Add to Cart</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-wishlist-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wishlist-id');
      toggleWishlist(id, STATE.catalogSelectedSizes[id]);
    });
  });

  grid.querySelectorAll('[data-pur-size]').forEach((pill) => {
    pill.addEventListener('click', () => {
      const id = pill.getAttribute('data-pur-id');
      const size = pill.getAttribute('data-pur-size');
      STATE.catalogSelectedSizes[id] = size;
      renderPurifiersShowcase();
      renderCatalog();
    });
  });

  grid.querySelectorAll('[data-pur-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-pur-add');
      const item = CATALOG.find((c) => c.catalogId === id);
      if (item) addCatalogItemToBag(item, STATE.catalogSelectedSizes[id]);
    });
  });
}

/* ==========================================================================
   9a-quinquies. All Creations Catalog (#catalog) — Search, Filter & Sort
   ========================================================================== */

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

  document.querySelectorAll('#catalogCategoryFilters .filter-pill').forEach((p) => {
    p.classList.toggle('active', p.getAttribute('data-category') === 'all');
  });
  document.querySelectorAll('#catalogScentFilters .filter-pill').forEach((p) => {
    p.classList.toggle('active', p.getAttribute('data-scent') === 'all');
  });

  renderCatalog();
}

function initCatalogControls() {
  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');
  const sortSelect = document.getElementById('catalogSortSelect');
  const categoryPills = document.querySelectorAll('#catalogCategoryFilters .filter-pill');
  const scentPills = document.querySelectorAll('#catalogScentFilters .filter-pill');
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

  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.catalogFilters.category = pill.getAttribute('data-category') || 'all';
      renderCatalog();
    });
  });

  scentPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      scentPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.catalogFilters.scent = pill.getAttribute('data-scent') || 'all';
      renderCatalog();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', resetCatalogFilters);
  }
}

function getCatalogItemCurrentPrice(item) {
  const activeSize = STATE.catalogSelectedSizes[item.catalogId] || item.defaultSize;
  const obj = item.sizes.find((s) => s.size === activeSize) || item.sizes[0];
  return obj.price;
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

  // Sort
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
      ? `Showing all ${CATALOG.length} creations`
      : `Showing ${filtered.length} of ${CATALOG.length} creations`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <p>No creations match your current search or filter criteria.</p>
        <button type="button" class="btn-secondary-gold" id="emptyResetFiltersBtn">Reset All Filters</button>
      </div>
    `;
    const emptyBtn = document.getElementById('emptyResetFiltersBtn');
    if (emptyBtn) emptyBtn.addEventListener('click', resetCatalogFilters);
    return;
  }

  grid.innerHTML = filtered.map((item) => {
    const activeSize = STATE.catalogSelectedSizes[item.catalogId] || item.defaultSize;
    const sizeObj = item.sizes.find((s) => s.size === activeSize) || item.sizes[0];
    const saved = isInWishlist(item.catalogId);
    const visualMarkup = getItemVisualHTML(item, 'card');

    return `
      <article class="catalog-card" data-catalog-card="${item.catalogId}">
        <div class="catalog-card-stage" style="background: radial-gradient(circle at 50% 50%, ${item.highlight}22 0%, var(--card-stage-edge) 75%);">
          ${item.badge ? `<span class="catalog-card-tag">${item.badge}</span>` : ''}
          <button type="button" class="wishlist-heart-btn catalog-wishlist-pin ${saved ? 'is-wishlisted' : ''}" data-wishlist-id="${item.catalogId}" aria-pressed="${saved}" aria-label="Save ${item.title} to wishlist">
            ${getHeartSVG(saved)}
          </button>
          ${visualMarkup}
        </div>

        <div class="catalog-card-body">
          <div class="catalog-card-meta">
            <span>${item.categoryLabel}</span>
            <span>${item.arabic}</span>
          </div>
          <h3 class="catalog-card-title">${item.title}</h3>
          <p class="catalog-card-notes">${item.notesPreview}</p>

          <div class="catalog-size-pills" role="radiogroup" aria-label="Select size for ${item.title}">
            ${item.sizes.map((s) => `
              <button type="button" class="catalog-size-pill ${s.size === sizeObj.size ? 'active' : ''}" data-cat-id="${item.catalogId}" data-cat-size="${s.size}" role="radio" aria-checked="${s.size === sizeObj.size}">
                ${s.size}
              </button>
            `).join('')}
          </div>

          <div class="catalog-card-footer">
            <span class="catalog-card-price">${formatAED(sizeObj.price)}</span>
            <button type="button" class="catalog-add-btn" data-cat-add="${item.catalogId}">Add to Cart</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Bind Wishlist hearts on grid cards
  grid.querySelectorAll('[data-wishlist-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wishlist-id');
      toggleWishlist(id, STATE.catalogSelectedSizes[id]);
    });
  });

  // Bind Size Pills on grid cards
  grid.querySelectorAll('[data-cat-size]').forEach((pill) => {
    pill.addEventListener('click', () => {
      const id = pill.getAttribute('data-cat-id');
      const size = pill.getAttribute('data-cat-size');
      STATE.catalogSelectedSizes[id] = size;
      renderCatalog();
      renderPurifiersShowcase();
    });
  });

  // Bind Add to Cart buttons on grid cards
  grid.querySelectorAll('[data-cat-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cat-add');
      const item = CATALOG.find((c) => c.catalogId === id);
      if (item) {
        addCatalogItemToBag(item, STATE.catalogSelectedSizes[id]);
      }
    });
  });
}

/* ==========================================================================
   9b. Navigation, Scroll Spy & Mobile Menu
   ========================================================================== */

function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const desktopLinks = document.querySelectorAll('.atelier-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');
  const navSearchTrigger = document.getElementById('navSearchTrigger');
  const mobileWishlistBtn = document.getElementById('mobileWishlistBtn');
  const mobileProfileBtn = document.getElementById('mobileProfileBtn');
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const footerRegistryForm = document.getElementById('footerRegistryForm');

  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.removeAttribute('hidden');
    void mobileNavDrawer.offsetWidth; // trigger reflow
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
    }, 350);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

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

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', toggleTheme);
  }

  // Header search icon scrolls smoothly to catalog search & focuses input
  if (navSearchTrigger) {
    navSearchTrigger.addEventListener('click', () => {
      const catalogSec = document.getElementById('catalog');
      const searchInput = document.getElementById('catalogSearchInput');
      if (catalogSec) {
        const offsetPosition = catalogSec.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
      if (searchInput) {
        setTimeout(() => searchInput.focus({ preventScroll: true }), 420);
      }
    });
  }

  // Smooth scrolling for navigation links
  const allNavAnchors = document.querySelectorAll('a[href^="#"]');
  allNavAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        closeMobileNav();

        const jumpIdx = anchor.getAttribute('data-jump-scent');
        if (jumpIdx !== null) {
          goToLook(Number(jumpIdx));
        }

        const headerOffset = 72;
        const elemPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elemPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });

        if (targetElem.hasAttribute('tabindex')) {
          targetElem.focus();
        }
      }
    });
  });

  // Hero bottle card click navigation -> jump directly to that scent on runway
  const heroCards = document.querySelectorAll('.hero-bottle-card');
  const perfumeNameToIndex = {
    'oud-rose': 0,
    'avenor': 1,
    'scentra': 2,
    'oud-maracuja': 3
  };

  heroCards.forEach((card) => {
    card.style.cursor = 'pointer';
    const activateCard = () => {
      const perfumeKey = card.getAttribute('data-perfume');
      const idx = perfumeNameToIndex[perfumeKey];
      if (idx !== undefined) {
        goToLook(idx);
        const runway = document.getElementById('scents');
        if (runway) {
          const offsetPosition = runway.getBoundingClientRect().top + window.pageYOffset - 72;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
          });
        }
      }
    };
    card.addEventListener('click', activateCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCard();
      }
    });
  });

  // Footer registry form clean submission
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

  // Scroll Spy via IntersectionObserver
  const sectionsToWatch = ['hero', 'bestsellers', 'scents', 'purifiers', 'catalog', 'about', 'delivery'];
  const sectionElements = sectionsToWatch.map((id) => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window && sectionElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

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
    }, observerOptions);

    sectionElements.forEach((sec) => navObserver.observe(sec));
  }

  // Keyboard accessibility: Escape closes mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
      closeMobileNav();
      if (navToggle) navToggle.focus();
    }
  });
}

/* ==========================================================================
   10. Initialization & Lifecycle
   ========================================================================== */

function init() {
  loadTheme();
  loadBag();
  loadWishlist();
  loadProfile();
  buildCarouselBodies();
  buildProgressTicks();
  renderShoppingPanel();
  renderBestSellers();
  initPurifierTabs();
  renderPurifiersShowcase();
  initCatalogControls();
  renderCatalog();
  updateBagUI();
  updateWishlistUI();
  updateProfileUI();
  
  // Set initial stage spotlight & ghost name
  const initialScent = S[0];
  if (stageSpotlight) {
    stageSpotlight.style.background = `radial-gradient(circle, ${initialScent.highlight} 0%, transparent 70%)`;
  }
  if (ghostArabic) {
    ghostArabic.textContent = initialScent.arabic;
  }

  updateRingPositions();
  initCustomCursor();
  initNavigation();

  // Resize Listener to update ring geometry smoothly
  window.addEventListener('resize', () => {
    updateRingPositions();
  });

  // Pause autoplay when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      STATE.autoplayPaused = true;
    } else {
      STATE.autoplayPaused = false;
      STATE.autoplayStartTime = performance.now();
    }
  });

  // Pause autoplay when shopping panel is hovered
  const shoppingPanel = document.getElementById('shoppingPanel');
  if (shoppingPanel) {
    shoppingPanel.addEventListener('mouseenter', () => {
      STATE.autoplayPaused = true;
    });
    shoppingPanel.addEventListener('mouseleave', () => {
      STATE.autoplayPaused = false;
      STATE.autoplayStartTime = performance.now();
    });
  }

  // Reduced motion preference changes
  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      STATE.autoplayActive = false;
      STATE.cur = STATE.target;
      STATE.vel = 0;
      updateRingPositions();
      updatePlayPauseButtonUI();
    }
  });

  // Start Animation Loop
  STATE.autoplayStartTime = performance.now();
  rafId = requestAnimationFrame(animationLoop);
}

document.addEventListener('DOMContentLoaded', init);
