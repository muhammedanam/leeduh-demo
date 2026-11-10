# LEEDUH · Atelier Dubai Perfume, Home & Car Scent Storefront

A bespoke, editorial, interactive ecommerce prototype for **LEEDUH**, a small-batch haute parfumerie house based in Dubai, UAE. Built strictly with **plain HTML, vanilla CSS, and vanilla JavaScript** with zero frameworks or build tools.

Fine **Skin Perfumes** and **Home & Car Purifiers** are maintained as completely separate collections with zero shared fragrances.

---

## 1. Architecture & Key Sections

1. **Sticky Header & Action Bar ([`#mainHeader`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L25-L129))**
   - Features the **LD** interlocking monogram ([`brand-monogram.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-monogram.png)), **LEE DUH** serif wordmark ([`brand-wordmark.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-wordmark.png)), smooth-scrolling navigation (`Home`, `Best Sellers`, `Perfumes`, `Home & Car`, `All Creations`, `About`, `Concierge`) with `IntersectionObserver` scroll-spy tracking, and responsive slide-out drawer ([`#mobileNavDrawer`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L94-L128)).
   - Quick-access utility triggers: Atelier Theme Toggle ([`#themeToggleBtn`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L44-L52) and mobile [`#mobileThemeBtn`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L111-L114)), Instant Search ([`#navSearchTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L55-L60)), Saved Wishlist ([`#wishlistTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L63-L68)), Customer Profile ([`#profileTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L71-L77)), and Live Cart ([`#bagTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L80-L83)).

2. **Hero Showcase ([`#hero`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L132-L194))**
   - Editorial headline, harvest metrics (`25% Pure Extrait`, `500 Numbered Flacons`, `Dubai Private Atelier`), separate CTAs (`Shop All Creations`, `Fine Perfume Runway`, `Home & Car Purifiers →`), and an interactive 4-flacon showcase jumping straight to the selected fragrance on the 3D runway.

3. **Most Selling Creations ([`#bestsellers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L197-L221))**
   - Rendered by [`renderBestSellers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L2432-L2584): highlights `#1 Oud Rose Extrait de Parfum` (`412` acquired · ★ `4.98`) with live `30 ml` / `50 ml` / `100 ml` pills, scent pyramid, Wishlist toggle, Add to Cart CTA, and Notes popup launcher, alongside a 3-column grid featuring top-requested Perfume and Purifier commissions.

4. **Fine Perfume 3D Ring Runway & Panel ([`#scents`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L224-L376))**
   - Continuous 3D ring strictly showcasing the **4 Fine Perfumes** driven by critically damped spring physics ($K = 90,\; C = 2\sqrt{K}$ with 3 bounded sub-steps per frame) in [`updateRingPositions`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L911-L999) and [`physicsStep`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L1001-L1026).
   - **Controls**: 5s autoplay progress bar, drag/swipe momentum, wheel stepping, `ArrowLeft`/`ArrowRight` navigation, inertia custom cursor (`"Drag"` / `"View"`), ghost Arabic calligraphy backdrop (`~26vw`, 8% gold in Dark / 10% antique brass in Light), and radial stage lighting.
   - **Notes Inspection Popup ([`#scentPopup`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L280-L338))**: Interactive staggered pins (`1 Top`, `2 Heart`, `3 Base`) displaying fragrance notes in frosted pills.
   - **Shopping Panel ([`#shoppingPanel`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L347-L375))**: Per-perfume format selector (`Extrait de Parfum`, `Travel Atomizer`, `Atelier Gift Coffret`) with custom inline gold SVGs, inline size pills, Wishlist pins, and live `-10%` **Signature perfume pairing** (`Add perfume set to bag`, `AED 549` default).

5. **Dedicated Home & Car Purifiers Section ([`#purifiers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L379-L405))**
   - Rendered by [`renderPurifiersShowcase`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L2606-L2684) with live category tabs (`All Purifiers (6)`, `Home Purifiers (3)`, `Car Purifiers (3)`).
   - Displays 6 bespoke ambient & automotive compositions completely independent from the skin perfumes, illustrated with custom black-and-gold inline SVGs (reed decanters and rotary cabin vents) and live format switching (`200 ml Diffuser` / `500 ml Decanter` for Home; `Diffuser + 2 Cores` / `3 Refill Cores` for Car).

6. **All Creations Catalog ([`#catalog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L408-L481))**
   - Unified 14-item catalog (`8 Fine Perfumes` + `3 Home Purifiers` + `3 Car Purifiers`) defined in [`CATALOG`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L296-L378) and rendered by [`renderCatalog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L2780-L2902).
   - Real-time keyword search, **Line** filter pills (`All Creations`, `Fine Perfumes`, `Home Purifiers`, `Car Purifiers`), **Scent** filter pills (`All Signatures`, `Oud Rose`, `Avenor`, `Scentra`, `Oud Maracuja`, `Home & Car Blends`), live sorting (`Curated Collection`, `Most Selling`, `Price: Low to High`, `Price: High to Low`, `Name: A to Z`), and interactive per-card size switching.

7. **Wishlist, Customer Profile & Cart Portals**
   - **Wishlist Modal ([`#wishlistDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L685-L708))**: `localStorage['leeduh-wishlist']` persistence across Perfumes, Coffrets, Home Purifiers, and Car Purifiers, single-item Move to Cart, and batch Move All to Cart.
   - **Customer Profile Modal ([`#profileDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L711-L798))**: `localStorage['leeduh-profile']` persistence across **Account Details** (UAE Emirate & concierge address editor, Guest Mode switch), **Orders** (live checkout order log + 1-click Reorder), and **Scent Wardrobe** (personalized Fine Perfume recommendation + direct jump to Home & Car Purifiers).
   - **Cart Modal ([`#bagDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L652-L682))**: `localStorage['leeduh-bag']` persistence, max 20 quantity cap, `-10%` perfume set tags, live `"Free UAE delivery over AED 500 · Prices include 5% VAT"` notice, and prototype checkout creating order history entries.

8. **About Atelier, Delivery Concierge & Footer Registry ([`#about`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L484-L649))**
   - Three craft pillars, Master Parfumeur manifesto quote, white-glove delivery benefits, collection jump links, and Atelier Registry newsletter form.

---

## 2. Design Tokens & Dual Atelier Themes

- **Dark Atelier (`data-theme="dark"`, default)**: Lacquered Black (`#0b0a09`), Raised Black (`#14110e`), Card Black (`#1c1813`), Ivory (`#efe6d3`), Muted (`#9b9183`), Dim (`#756c60`). Metallic Gold (`#c9a24a`), Light Gold (`#e6c878`), Deep Gold (`#8a6a25`), Hairlines (`rgba(201, 162, 74, 0.35)`).
- **Light Atelier (`data-theme="light"`)**: Sunlit Limestone (`#f7f2e8`), Parchment Panel (`#efe7d7`), Crisp Ivory Paper (`#fcfaf4`), Deep Espresso Ink (`#1a1612`), Warm Bronze Taupe (`#584e42`). Burnished Antique Gold (`#8c6419` / `#704e0f`) calibrated for high legibility on light mineral paper, paired with `#fdfbf7` ink (`--on-gold-ink`) on solid brass controls and warm `rgba(26, 22, 18, ...)` drop shadows.
- **Theme Persistence & Zero-FOUC Boot**: Switched via [`applyTheme`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L479-L492) and [`toggleTheme`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L507-L509), stored in `localStorage['leeduh-theme']`, and pre-applied in [`<head>`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L14-L21) before initial paint.
- **Foil Gold Gradient**: `110deg` (`#e6c878` → `#8a6a25`) reserved strictly for primary CTAs and brand accents with black ink contrast (`--on-foil-ink`).
- **Typography**: `Syne` (500/700) for display headings/UI/AED pricing, `Newsreader` (400/500) for editorial copy, `Noto Naskh Arabic` (600) for ghost calligraphy — all backed by system font fallbacks for full offline operation.
- **Currency & Motion**: AED pricing including 5% VAT formatted via `en-US`; full `prefers-reduced-motion` support disabling springs, autoplay, and motion transitions.

---

## 3. Two Separate Scent Lines

### A. Four Official Fine Perfumes ([`S`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L26-L75) & [`PC`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L81-L113))

*Formats: Extrait de Parfum (`30 ml` AED 280 / `50 ml` AED 380 / `100 ml` AED 660), Travel Atomizer (`10 ml` AED 140 / `3×10 ml Case` AED 360), Atelier Gift Coffret (`Gift Box` AED 90 / `Gold Engraved` AED 140). Default Perfume Set (`-10%`): AED 549.*

| Perfume | Flacon Asset | Arabic | Palette (`color` / `highlight`) | Notes (`Top` / `Heart` / `Base`) |
| :--- | :--- | :---: | :---: | :--- |
| **Oud Rose** | [`bottle-oud-rose.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-oud-rose.png) | `عود ورد` | `#8c4c1a` / `#dca04c` | Pink pepper & Taif rose / Aged Cambodian oud & geranium / Smoky amber & dark leather |
| **Avenor** | [`bottle-avenor.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-avenor.png) | `أفينور` | `#161412` / `#c9a24a` | Italian bergamot & blackcurrant / Birch wood & patchouli / Precious ambergris & royal oakmoss |
| **Scentra** | [`bottle-scentra.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-scentra.png) | `سنترا` | `#3d1d07` / `#e59b2d` | Golden saffron & crushed cardamom / Warm cedar & white honey / Precious amber & bourbon vanilla |
| **Oud Maracuja** | [`bottle-oud-maracuja.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-oud-maracuja.png) | `عود ماراكوجا` | `#7a3e12` / `#e8a538` | Ripe passionfruit & Turkish rose / Dark Assam oud & Indonesian patchouli / Leather, labdanum & benzoin |

### B. Separate Home & Car Purifiers ([`PURIFIER_LINES`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L138-L277))

| Purifier | Type | Arabic | Notes (`Top` / `Base`) | Formats & Pricing (incl. 5% VAT) |
| :--- | :--- | :---: | :--- | :--- |
| **Qasr Velvet** | Home Purifier | `قصر مخمل` | Smoked frankincense & white tea / Atlas cedarwood & cashmere | `200 ml Diffuser` AED 310 · `500 ml Decanter` AED 590 |
| **Alabaster Dusk** | Home Purifier | `مرمر الغسق` | Fresh neroli & silver eucalyptus / Mineral musk & hinoki cypress | `200 ml Diffuser` AED 290 · `500 ml Decanter` AED 550 |
| **Sahara Incense** | Home Purifier | `بخور الصحراء` | Black cardamom & elemi resin / Guaiac wood & toasted tonka | `200 ml Diffuser` AED 330 · `500 ml Decanter` AED 620 |
| **Carbon Drift** | Car Purifier | `كربون دريفت` | Alpine ozone & cold mint leaf / Smoked leather & black vetiver | `Diffuser + 2 Cores` AED 190 · `3 Refill Cores` AED 140 |
| **Dune Espresso** | Car Purifier | `قهوة الكثبان` | Spiced petitgrain & black pepper / Virginia cedar & dry amber | `Diffuser + 2 Cores` AED 210 · `3 Refill Cores` AED 150 |
| **Chrome Citrus** | Car Purifier | `حمضيات الكروم` | Crushed green mandarin & lemon / Driftwood & sheer air musk | `Diffuser + 2 Cores` AED 180 · `3 Refill Cores` AED 130 |

---

## 4. Running Locally & Deploying to Vercel

- **Local preview**: Open [`index.html`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html) directly in any modern browser (`file://` or any static local server). Everything works completely offline except optional Google Fonts enhancement.
- **Vercel static hosting**: [`vercel.json`](file:///c:/Users/ASUS/Documents/demo%20leeduh/vercel.json) configures clean URLs, edge caching (`7d` for brand/bottle artwork, `1h` revalidating CSS/JS), and standard security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`). Import the repository on Vercel with **Framework Preset: `Other`** and no build command.
- **Browser & social previews**: [`<head>`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L4-L34) includes [`brand-monogram.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-monogram.png) favicon/Apple touch icon, dynamic dark/light `theme-color` meta sync in [`applyTheme`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L479-L496), and OpenGraph/Twitter tags backed by [`brand-full-lockup.jpg`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-full-lockup.jpg).
