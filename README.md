# LEEDUH · Fine Perfumes & Architectural Purifiers (Dubai)

A minimalist, responsive ecommerce storefront prototype for **LEEDUH**, a small-batch haute parfumerie house based in Dubai Design District, UAE. Built strictly with **plain HTML, vanilla CSS, and vanilla JavaScript** with zero frameworks, dependencies, or build steps.

Fine **Skin Perfumes** and **Home & Car Purifiers** are curated as completely separate fragrance lines with zero scent overlap.

---

## 1. Architecture & Key Storefront Flows

1. **Announcement Strip & Minimal Header ([`#mainHeader`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L43-L96))**
   - Features the **LD** monogram ([`brand-monogram.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-monogram.png)) and **LEE DUH** wordmark ([`brand-wordmark.png`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-wordmark.png)), smooth single-row navigation (`Best Sellers`, `Fine Perfumes`, `Home & Car`, `All Creations`, `Our Story`) with `IntersectionObserver` scroll-spy tracking, and mobile slide-over drawer ([`#mobileNavDrawer`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L99-L124)).
   - Quiet utility controls: Search jump ([`#navSearchTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L59)), Customer Profile ([`#profileTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L66)), Wishlist ([`#wishlistTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L74)), and Shopping Bag ([`#bagTrigger`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L81)).

2. **Calm Boutique Hero & 4-Tile Collection Strip ([`#hero`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L128-L200))**
   - Staggered three-flacon spotlight (`Avenor`, `Oud Rose`, `Oud Maracuja`) opening rich product Quick-View inspection, paired with a four-tile Shop-by-Line grid (`Fine Perfumes`, `Travel & Coffrets`, `Home Purifiers`, `Car Purifiers`) that activates the corresponding collection format or purifier tab on scroll.

3. **Best Sellers 4-Column Grid ([`#bestsellers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L203-L214))**
   - Rendered by [`renderBestSellers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L786-L792) showcasing top-requested Fine Perfume and Purifier creations with synced inline size pills, live `AED` pricing, wishlist pinning, and 1-click Add to Bag.

4. **The Four Fine Perfumes ([`#perfumes`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L217-L254))**
   - Strictly features the **4 Fine Perfumes** rendered by [`renderFinePerfumes`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L821-L832) with instant format tabs (`Extrait (25%)`, `Travel Atomizer`, `Gift Coffret`) and an interactive **3-Piece Signature Pairing (-10%)** bar ([`addRitualSetForScent`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L843-L855), default `AED 549` vs `AED 610`).

5. **Separate Home & Car Purifiers ([`#purifiers`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L257-L274))**
   - Rendered by [`renderPurifiersShowcase`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L875-L887) with category tabs (`All (6)`, `Home Purifiers (3)`, `Car Purifiers (3)`) and custom inline architectural reed decanter & anodized vent diffuser SVGs.

6. **All Creations Archive ([`#catalog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L277-L331))**
   - Complete 14-item searchable catalog (`8 Fine Perfumes` + `3 Home Purifiers` + `3 Car Purifiers`) in [`CATALOG`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L289-L363) and [`renderCatalog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L981-L1033), supporting keyword search, Line & Signature filter chips, live price/name/popularity sorting, empty-state reset, and synchronized multi-grid size selection ([`selectCardSize`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L702-L739)).

7. **Product Quick-View Modal & Slide-Over Customer Portals**
   - **Quick-View Modal ([`#quickViewDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L412-L417))**: Opened via [`openQuickView`](file:///c:/Users/ASUS/Documents/demo%20leeduh/app.js#L1043-L1122) on any bottle artwork, title, hero bottle, or footer signature link; displays Arabic script, house story, Top/Heart/Base olfactory notes, interactive size pills, Save toggle, Add to Bag, and 3-Piece Perfume Set pairing.
   - **Slide-Over Bag Drawer ([`#bagDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L420-L439))**: `localStorage['leeduh-bag']` persistence, max 20 quantity cap, `-10%` set badges, dynamic `"Free UAE delivery over AED 500 · Prices include 5% VAT"` status, and prototype checkout logging orders directly into the Profile order list.
   - **Slide-Over Wishlist Drawer ([`#wishlistDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L442-L458))**: `localStorage['leeduh-wishlist']` persistence with individual Move to Bag and batch Move All to Bag.
   - **Customer Profile Modal ([`#profileDialog`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L461-L538))**: `localStorage['leeduh-profile']` persistence for Account Details (7 UAE Emirates + Guest Mode switch), Order History with 1-click Reorder, and Scent Wardrobe quick-view links.

8. **Story, Delivery Concierge & Footer Registry ([`#about`](file:///c:/Users/ASUS/Documents/demo%20leeduh/index.html#L334-L409))**
   - Editorial crest display ([`brand-full-lockup.jpg`](file:///c:/Users/ASUS/Documents/demo%20leeduh/brand-full-lockup.jpg)), UAE concierge commitments, signature shortcuts, and Atelier Registry email opt-in toast.

---

## 2. Design System

- **Light Gallery Palette ([`styles.css`](file:///c:/Users/ASUS/Documents/demo%20leeduh/styles.css#L5-L59))**: Crisp White (`#ffffff`), Warm Stone Neutral (`#f7f6f3`), Cream Plinth (`#f5f3ee`), Obsidian Ink (`#121110`), Muted Warm Gray (`#5c5750`), and Antique Gold (`#8c661c` / `#6f4f12`).
- **Typography & Accessibility**: `Syne` (500/700), `Newsreader` (400/500), and `Noto Naskh Arabic` (600) with offline system fallbacks; `prefers-reduced-motion` disables transitions cleanly; `AED` VAT-inclusive pricing formatted in `en-US`.

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
