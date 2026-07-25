# Gib Rabboni Limited — Premium Website Blueprint (Part 1)

**Industry:** Acoustic Engineering · Professional Audio Installation · Soundproofing · Entertainment Infrastructure
**Market:** Lagos, Nigeria (national reach)

---

## 1. Brand Strategy

**Positioning statement:** Gib Rabboni Limited is Nigeria's premier acoustic engineering partner — the firm churches, studios, hotels, and developers call when sound has to be perfect and the build has to last.

**Brand pillars:**
| Pillar | What it signals | How the site expresses it |
|---|---|---|
| Precision Engineering | We measure, model, and verify — we don't guess | Technical language, spec-driven service copy, process diagrams |
| Premium Craftsmanship | Every install looks as good as it sounds | Large-format photography, generous whitespace, restrained palette |
| Industry Fluency | We speak "church," "studio," and "hotel" fluently | Industry-tagged services and projects, sector-specific CTAs |
| Trust & Longevity | We're still answering the phone in year 10 | Stats counters, testimonials, clear contact paths, project history |

**Voice:** Confident, technical-but-clear, outcome-led. Never generic ("we deliver solutions") — always specific ("we reduce reverberation time in a 400-seat sanctuary from 2.8s to 1.1s").

---

## 2. Sitemap

```
/ (Home)
├── /about
├── /services
│   └── #anchors: acoustic-soundproofing, acoustic-treatments, live-music-studio,
│                 digital-studio, podcast-room, church-soundproofing,
│                 clubs-lounge, sound-reinforcement, sound-design,
│                 audio-installation, sound-lighting-rentals
├── /projects
│   └── ?filter= churches | studios | podcast | corporate | events | clubs
├── /gallery
│   └── ?filter= installations | equipment | studios | churches | lighting | team
└── /contact
```

Six pages, flat hierarchy (max 1 click from any page to any other via header/footer). No orphan pages. Services uses in-page anchors rather than sub-pages, per spec.

---

## 3. Information Architecture & Content Hierarchy

### Home
1. Hero (H1 + supporting copy + Quote CTA + WhatsApp CTA)
2. Company Introduction (who we are, one paragraph, credibility line)
3. Featured Services (6 cards, "View all services" → /services)
4. Why Choose Us (4–6 differentiators as icon cards)
5. Industries We Serve (logo/icon strip: churches, studios, hotels, clubs, corporate, gov, education)
6. Featured Projects (3–4 cards → /projects)
7. Statistics (years in business, projects completed, sq. ft. treated, client satisfaction)
8. Testimonials (slider)
9. Final CTA band (Request a Quote / WhatsApp / Call)

### About
1. Page banner + breadcrumb
2. Company Story (origin, what changed the industry for them)
3. Mission / Vision / Core Values (3-column or card grid)
4. Management Team (photo cards: name, title, 1-line bio)
5. Company Philosophy ("engineering-first" approach)
6. Why Clients Trust Us (certifications, years active, notable clients/sectors — no fabricated claims)
7. CTA band

### Services
1. Page banner + breadcrumb
2. Intro paragraph framing the full capability set
3. 11 service sections, alternating image/content layout, each with:
   - Large image, headline, description, benefits list, ideal applications, industries served, CTA
4. Service Process (how an engagement runs: Consult → Survey → Design → Install → Handover/Support)
5. FAQ accordion
6. Final CTA

### Projects
1. Page banner + breadcrumb
2. Filter bar (All / Churches / Studios / Podcast Rooms / Corporate / Events / Clubs)
3. Project card grid (image, title, category tag, short description, "View details")
4. CTA band

### Gallery
1. Page banner + breadcrumb
2. Filter bar (Installations / Equipment / Studios / Churches / Lighting / Team / Finished Projects)
3. Masonry image grid with lightbox
4. CTA band

### Contact
1. Page banner + breadcrumb
2. Contact info cards (Phone, WhatsApp, Email, Address, Hours)
3. Map embed placeholder
4. Enquiry form (see Part 2 field spec)
5. FAQ preview (3 items, link to Services FAQ)
6. CTA band

---

## 4. User Journey

```
Discover (Home hero + intro)
   ↓
Understand (Why Choose Us + Industries)
   ↓
Explore capability (Services)
   ↓
Validate with evidence (Projects → Gallery)
   ↓
Build confidence (Testimonials, Stats, About/Team)
   ↓
Convert (Contact: WhatsApp / Call / Form)
```

Every page ends in a CTA band that either advances the journey (e.g., Services → Contact) or deepens trust (About → Projects). No dead ends.

---

## 5. Navigation Strategy

**Desktop:** Home · About · Services · Projects · Gallery · Contact, plus a standalone "Request a Quote" button (visually distinct, always visible). Transparent over hero → glass/blur background once scrolled past ~80px, with subtle shadow and shrinking header height.

**Mobile:** Logo + animated hamburger (three lines → X). Full-screen or slide-in panel, staggered link reveal, WhatsApp/Call buttons pinned at the bottom of the panel.

**Active state:** Current page underlined/colored in Electric Blue. On Services, an optional in-page scroll-spy highlights the active service section if a secondary in-page nav is used.

**Breadcrumbs:** Present on every page except Home (Home > Services > Church Soundproofing pattern using anchor, or Home > Services for the page-level crumb).

---

## 6. Internal Linking Strategy

| From | To | Trigger |
|---|---|---|
| Home hero | Contact | Primary CTA |
| Home services grid | Services (#anchor) | "Learn more" per card |
| Home projects | Projects | "View all projects" |
| About trust section | Projects | "See our work" |
| Services (each block) | Contact | Per-service CTA ("Get a quote for this service") |
| Projects card | Gallery | "See more photos" |
| Gallery | Services | "Need this for your space?" CTA |
| Footer (every page) | All 6 pages + social | Persistent global links |

This creates a mesh rather than a single funnel, so search engines and users can reach any page within 2 clicks from anywhere.

---

## 7. SEO Strategy

**Per-page unique targets (natural, non-stuffed):**

| Page | Primary keyword focus |
|---|---|
| Home | Acoustic Engineering Company Lagos / Nigeria |
| About | Acoustic Engineering Company — About / Team |
| Services | Acoustic Soundproofing, Church Soundproofing Lagos, Studio Soundproofing Nigeria, Sound Reinforcement |
| Projects | Acoustic Engineering Projects Nigeria, Church/Studio Case Studies |
| Gallery | Soundproofing Installation Photos Lagos |
| Contact | Acoustic Engineering Company Contact Lagos |

**Technical requirements per page:** unique `<title>`, unique meta description, canonical tag, Open Graph + Twitter Card tags, favicon set, Schema.org JSON-LD (`Organization`/`LocalBusiness` sitewide; `Service` on Services; `BreadcrumbList` on all sub-pages; `FAQPage` on Services/Contact), single H1, logical H2/H3 hierarchy, descriptive image alt text tied to what's actually shown (e.g., "Acoustic panel installation in Lagos church sanctuary").

**Local SEO:** Consistent NAP (Name, Address, Phone) in footer and Contact page, `LocalBusiness` schema with Lagos/Nigeria geo data, service-area language woven into Services and Contact copy.

---

## 8. Design System Recommendations

**Color system**
- Primary background: Rich Matte Black (`#090909`)
- Secondary background: Dark Charcoal (`#141414`)
- Card / glass surface: `rgba(255,255,255,0.06–0.08)`
- Primary accent: Electric Blue
- Secondary accent: Premium Gold (sparingly — CTAs, highlights, dividers)
- Text: White (headings), Soft Gray (body), Muted Gray (captions/meta)

**Typography pairing:** Space Grotesk (display/headings) + Inter (body) — technical yet refined. Alternates: Manrope + DM Sans, or Poppins + Inter.

**Type scale (indicative):**
| Role | Size (desktop) |
|---|---|
| Hero title | 56–72px |
| Page title (banner) | 40–48px |
| Section title | 32–36px |
| Card title | 20–22px |
| Body | 16–18px |
| Caption/label | 13–14px |

**Motif language:** waveform dividers between sections, subtle equalizer-bar accents near stats/testimonials, soft blurred glow orbs in Electric Blue/Gold behind hero and CTA sections — used sparingly so they read as engineering polish, not decoration.

**Spacing:** generous section padding (96–160px desktop), consistent 8px base spacing scale, max content width 1200–1400px.

---

## 9. Component Inventory

Shared: Header, Sticky/Glass Nav, Mobile Menu, Footer (multi-column), Breadcrumbs, Page Hero Banner, Section Header, Primary/Secondary/WhatsApp Buttons, Card (base), Service Block, Project Card, Gallery Item, Testimonial Slider, Statistics Counter, CTA Band, Contact Form, FAQ Accordion, Lightbox/Modal, Back-to-Top Button, Filter Bar (Projects/Gallery).

Each component is built once and reused across pages with page-level modifier classes (e.g., `.card--service`, `.card--project`) to allow visual variation without duplicating structure.

---

## 10. Conversion Strategy

- **Primary CTA:** "Request a Quote" — appears in nav, hero, every service block, and every CTA band.
- **Secondary CTA:** "Chat on WhatsApp" — nav, contact cards, floating/fixed presence on mobile.
- **Tertiary CTA:** "Call Now" — contact cards, footer, sticky mobile bar.
- CTAs are never stacked more than 2 at a time in a single visual moment (primary + one alternative) to avoid decision fatigue.

---

## 11. Accessibility Approach (WCAG 2.2 AA)

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one H1 per page, logical heading order.
- Visible focus states on all interactive elements (not just `:hover`).
- Minimum 4.5:1 text contrast against matte black/charcoal backgrounds — Electric Blue and Gold tuned/tested against dark surfaces specifically for this.
- Fully keyboard-operable nav, filters, accordion, lightbox (arrow keys, Escape, Tab trapping in modals).
- Form fields with explicit `<label>`, `aria-describedby` for hints/errors, `autocomplete` attributes.
- `prefers-reduced-motion` respected across all animation modules.

---

## 12. Responsive Design Strategy

Breakpoints: Large Desktop (1440px+) · Desktop (1200px) · Laptop (1024px) · Tablet (768px) · Large Mobile (480px) · Small Mobile (360px).

Approach: mobile-first fluid grids (CSS Grid/Flexbox), fluid typography (`clamp()`), touch targets ≥44px, no horizontal scroll at any breakpoint, images with defined aspect-ratio boxes to prevent layout shift.

---

## 13. Performance Optimization Plan

- Pure HTML5/CSS3/vanilla JS, no framework overhead.
- Native lazy loading (`loading="lazy"`) on all below-the-fold images.
- Responsive images (`srcset`/`sizes`) once real photography is integrated in Part 5.
- Minimal, purposeful animation using transform/opacity only (GPU-friendly, no layout thrashing).
- Deferred/async JS loading, single consolidated `script.js` and `style.css` (no bloated dependency chains).
- Target: strong Core Web Vitals (LCP, CLS, INP) on 3G/mid-tier mobile.

---

## 14. Image Placement Strategy (pre-ZIP)

| Section | Placeholder filename convention |
|---|---|
| Home hero | `hero-home.jpg` |
| About | `about-company.jpg`, `team-management.jpg` |
| Services (×11) | `service-[slug].jpg` e.g. `service-church-soundproofing.jpg` |
| Projects | `project-[category]-[n].jpg` |
| Gallery | `gallery-[category]-[n].jpg` |
| Contact | `contact-office.jpg` |

When the photo archive is supplied (Part 5), each image will be categorized and matched to the best-fit section, cropped without distortion, and given descriptive alt text.

---

## 15. Development Roadmap (Parts 2–5)

| Part | Deliverable | Status |
|---|---|---|
| Part 2 | Full semantic HTML for all 6 pages, one at a time, approval gated | Next |
| Part 3 | `css/style.css` — complete design system, no frameworks | Pending |
| Part 4 | `js/script.js` — nav, filters, lightbox, forms, counters, etc. | Pending |
| Part 5 | Image integration, content polish, SEO/accessibility/performance audit, deployment prep | Pending |

**Recommended next step:** approve this blueprint, then I'll generate `index.html` (Home) first for your review before moving to About, Services, Projects, Gallery, and Contact in sequence.
