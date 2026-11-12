# LEEDUH · Fine Perfumes & Architectural Purifiers (Dubai)

A clean, minimalist luxury lookbook storefront prototype for **LEEDUH**, a small-batch haute parfumerie house based in Dubai Design District, UAE. Built strictly with **plain HTML, vanilla CSS, and vanilla JavaScript** with zero frameworks, dependencies, or build steps.

Fine **Skin Perfumes** and **Home & Car Purifiers** are curated as completely separate fragrance lines with zero scent overlap.

---

## 1. Architecture & Key Storefront Flows

1. **Espresso Bar & Minimal Sticky Header ([`#mainHeader`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L38-L96))**
   - Top deep espresso strip (`#352824`) above a crisp white header featuring the **LD** monogram ([`brand-monogram.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-monogram.png)) and **LEE DUH** wordmark ([`brand-wordmark.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-wordmark.png)), subtle scroll elevation shadow, `IntersectionObserver` scroll-spy nav (`Best Sellers`, `Fine Perfumes`, `Home & Car`, `All Creations`, `Our Story`), and an external slide-over mobile drawer ([`#mobileNavDrawer`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L99-L124)).
   - Clean utility controls: Search jump ([`#navSearchTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L59)), Customer Profile ([`#profileTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L66)), Wishlist ([`#wishlistTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L74)), and Shopping Bag ([`#bagTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L81)).

2. **Centered Editorial Hero & Warm Stone Lookbook Bands ([`#hero`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L128-L158) & [`#collections`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L172-L217))**
   - Centered `Cormorant` editorial campaign headline (*"A signature **held** in memory."*), staggered three-flacon showcase (`Avenor`, `Oud Rose`, `Oud Maracuja`), champagne gold `#D7B56D` primary CTA, and underlined Purifier discovery link.
   - Followed by a white Best Sellers section ([`#bestsellers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L161-L169), rendered by [`renderBestSellers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L777-L783)) and a warm stone (`#F5F2ED`) editorial quote band with four crisp white `20px`-radius category tiles (`Fine Perfumes`, `Travel & Coffrets`, `Home Purifiers`, `Car Purifiers`).

3. **Unboxed Gallery Product Cards ([`renderBoutiqueCard`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L661-L689))**
   - Borderless unboxed lookbook presentation with `1:1` rounded `#F7F7F7` image tiles (switching to `#FFFFFF` inside warm stone/sand bands), hover-revealed white pill `Add to Bag` button & circular Wishlist toggle (keeping dedicated unobstructed tap strips on touch screens), and left-aligned 3-line product captions (`Category · Size`, `Inter` title, bold `AED` price).

4. **The Four Fine Perfumes & Separate Purifiers ([`#perfumes`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L220-L257) & [`#purifiers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L260-L277))**
   - **Fine Perfumes**: Strictly the **4 Fine Perfumes** rendered by [`renderFinePerfumes`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L821-L832) with capsule format tabs (`Extrait (25%)`, `Travel Atomizer`, `Gift Coffret`) and the single-row **3-Piece Signature Pairing (-10%)** bar ([`addRitualSetForScent`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L843-L855), `AED 549` vs `AED 610`).
   - **Home & Car Purifiers**: Warm sand (`#F3EEEA`) band rendered by [`renderPurifiersShowcase`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L876-L888) with category capsule tabs (`All (6)`, `Home Purifiers (3)`, `Car Purifiers (3)`) and inline architectural reed decanter & anodized vent diffuser SVGs.

5. **All Creations Archive ([`#catalog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L280-L334))**
   - Complete 14-item searchable catalog (`8 Fine Perfumes` + `3 Home Purifiers` + `3 Car Purifiers`) in [`CATALOG`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L289-L363) and [`renderCatalog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L982-L1034), supporting pill search, Line & Signature filter chips, live price/name/popularity sorting, empty-state reset, and synchronized cross-grid size & caption updates ([`selectCardSize`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L691-L730)).

6. **Slide-Over Quick-View Drawer, Bag, Wishlist & Profile Portals**
   - **Slide-Over Quick-View Drawer ([`#quickViewDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L451-L459))**: Opened via [`openQuickView`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L1044-L1124) on any card tile, title, hero flacon, or footer signature link; displays Arabic script, house story, Top/Heart/Base olfactory notes, interactive black/white pill sizes, Save toggle, Add to Bag, and 3-Piece Perfume Set pairing.
   - **Slide-Over Bag Drawer ([`#bagDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L462-L481))**: `localStorage['leeduh-bag']` persistence, max 20 quantity cap, `-10%` set badges, dynamic `"Free UAE delivery over AED 500 · Prices include 5% VAT"` status, and prototype checkout logging orders directly into the Profile order list.
   - **Slide-Over Wishlist Drawer ([`#wishlistDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L484-L500))**: `localStorage['leeduh-wishlist']` persistence with individual Move to Bag and batch Move All to Bag.
   - **Customer Profile Modal ([`#profileDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L503-L580))**: `localStorage['leeduh-profile']` persistence for Account Details (7 UAE Emirates + Guest Mode switch), Order History with 1-click Reorder, and Scent Wardrobe quick-view links.

7. **50/50 Editorial Split Story, 4-Column Trust Bar & Light Footer ([`#about`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L337-L448))**
   - Asymmetric split panel pairing [`brand-full-lockup.jpg`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-full-lockup.jpg) with `#F3EEEA` sand editorial storytelling, a 4-column Guarantee icon bar ([`#delivery`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L356-L395)), and a clean light footer with a `#F5F5F5` pill email registry input.

---

## 2. Design System

- **Light Lookbook Palette ([`styles.css`](file:///c:/Users/ASUS/Documents/demo%20leeduh/styles.css#L5-L62))**: Canvas White (`#ffffff`), Warm Stone (`#f5f2ed`), Warm Sand (`#f3eeea`), Unboxed Product Tile (`#f7f7f7`), Espresso Top Bar (`#352824`), Soft Charcoal Ink (`#1f1f1f`), Champagne Gold (`#d7b56d`), and Antique Gold (`#8c661c`).
- **GPU-Composited Motion Layer ([`styles.css`](file:///c:/Users/ASUS/Documents/demo%20leeduh/styles.css#L2239-L2368) & [`initScrollReveals`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L2001-L2037))**: Animates strictly compositor-only `transform` and `opacity` properties with zero scroll-listener polling. Includes transform-only above-the-fold `heroGentleSettle` entrance (preserving immediate LCP/FCP), subtle staggered `flaconBreathe` hero float (paused on hover), single shared `IntersectionObserver` scroll reveals with instant `unobserve`, `card-enter` tab transitions ([`animateDynamicGrid`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L785-L791)), drawer/dialog slide & scale transitions, and tactile heart/bag badge micro-feedback.
- **Typography & Accessibility**: Editorial `Cormorant` (400/500/italic), clean UI `Inter` (400/500/600/700), and `Noto Naskh Arabic` (600) with offline system fallbacks; `prefers-reduced-motion` disables transitions cleanly; `AED` VAT-inclusive pricing formatted in `en-US`.

---

## 3. Two Separate Scent Lines

### A. Four Official Fine Perfumes ([`S`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L23-L72) & [`PC`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L74-L106))

*Formats: Extrait de Parfum (`30 ml` AED 280 / `50 ml` AED 380 / `100 ml` AED 660), Travel Atomizer (`10 ml` AED 140 / `3×10 ml Case` AED 360), Atelier Gift Coffret (`Gift Box` AED 90 / `Gold Engraved` AED 140). Default 3-Piece Set (`-10%`): AED 549.*

| Perfume | Flacon Asset | Arabic | Palette (`color` / `highlight`) | Olfactory Notes (`Top` / `Heart` / `Base`) |
| :--- | :--- | :---: | :---: | :--- |
| **Oud Rose** | [`bottle-oud-rose.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-oud-rose.png) | `عود ورد` | `#8c4c1a` / `#dca04c` | Pink pepper & Taif rose / Aged Cambodian oud & geranium / Smoky amber & dark leather |
| **Avenor** | [`bottle-avenor.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-avenor.png) | `أفينور` | `#161412` / `#c9a24a` | Italian bergamot & blackcurrant / Birch wood & patchouli / Precious ambergris & royal oakmoss |
| **Scentra** | [`bottle-scentra.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-scentra.png) | `سنترا` | `#3d1d07` / `#e59b2d` | Golden saffron & crushed cardamom / Warm cedar & white honey / Precious amber & bourbon vanilla |
| **Oud Maracuja** | [`bottle-oud-maracuja.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/bottle-oud-maracuja.png) | `عود ماراكوجا` | `#7a3e12` / `#e8a538` | Ripe passionfruit & Turkish rose / Dark Assam oud & Indonesian patchouli / Leather, labdanum & benzoin |

### B. Separate Home & Car Purifiers ([`PURIFIER_LINES`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L131-L270))

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

- **Local preview**: Open [`index.html`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html) directly in any modern browser (`file://` or static server). All assets, interactions, inline SVGs, and persistence operate standalone offline.
- **Vercel static hosting**: [`vercel.json`](file:///c:/Users/ASUS/Documents/demo%20leeduh/vercel.json) configures clean URLs, `7d` image caching, `1h` revalidating CSS/JS caching, and security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`). Import on Vercel with **Framework Preset: `Other`** and empty build/output settings.
