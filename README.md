# Gib Rabboni Limited — Website

Premium multi-page website for Gib Rabboni Limited, a Nigerian acoustic
engineering, soundproofing, and professional audio installation company.

## Preview locally (before uploading anywhere)

**Do not open `index.html` by double-clicking it directly** — the site uses
clean URLs (`/about` instead of `/about.html`), and that only works when the
files are served by an actual web server, not opened straight from disk.
This is true of every website built with clean URLs, not just this one.

The fix takes 10 seconds and needs no installation on most computers
(Python ships with macOS and most Windows machines):

- **Windows**: double-click `preview-windows.bat`, then open
  `http://localhost:8000` in your browser.
- **Mac**: double-click `preview-mac.command` (right-click → Open the first
  time, since it's an unsigned script), and it'll open your browser
  automatically.
- **Don't have Python?** Any of these one-liners in a terminal, run from
  inside this folder, do the same thing:
  ```bash
  npx serve .
  # or, in VS Code, right-click index.html -> "Open with Live Server"
  ```

Once the local server is running, every page, clean URL, image, icon, and
animation behaves exactly as it will once deployed — same files, no
different "local version" to maintain.

To stop the server, go back to the terminal window and press `CTRL+C`.

## Structure (clean URLs)

```
/                       → index.html
/about/                 → about/index.html
/services/              → services/index.html
/projects/               → projects/index.html
/gallery/               → gallery/index.html
/contact/               → contact/index.html
/blog/                  → blog/index.html
/privacy-policy/        → privacy-policy/index.html
/terms-of-service/      → terms-of-service/index.html
/404.html               → custom error page (root, per hosting convention)

/css/style.css          → single stylesheet, no framework
/js/script.js           → single vanilla JS file, no dependencies
/images/                → hero, services, projects, gallery, about, brand, backgrounds
/favicon/               → favicon set + web manifest
```

All internal links and asset references use root-absolute paths
(`/css/style.css`, `/images/...`, `/about/`, etc.), so the site works
identically no matter how deep a page lives in the folder structure.

## Clean URLs on different hosts

- **Netlify / Vercel / GitHub Pages / any static host**: works out of the box —
  every "page" is really a folder with its own `index.html`, which is the
  standard way static hosts resolve `/about/` without needing `.html`.
- **Netlify**: `netlify.toml` included — redirects any old `/about.html` style
  link to `/about/` (301) and routes unmatched paths to `/404.html`.
- **Vercel**: `vercel.json` included — same redirect behavior plus
  `cleanUrls`/`trailingSlash` config.
- **Apache / cPanel**: `.htaccess` included — same legacy redirects, custom
  404 document, and a rule that sends `/about` (no slash) to `/about/`.

## Branding

- Logo: `/images/brand/logo.png` (your supplied emblem, transparent PNG).
  Used in the header and footer as a logo + wordmark lockup.
- Favicons generated from the same logo at all standard sizes
  (16, 32, 180, 192, 512) plus `site.webmanifest`.

## Icons & animation system

Every icon on the site is inline SVG (no external icon files to go missing).
See the "Music Iconography & Ambient Motion" section in `style.css` for:
- `.eq-bars` — animated equalizer bars used next to section eyebrows, in the
  footer, and on the 404 page.
- `.note-field` / `.note` — floating musical notes in the hero and CTA bands.
- `.icon-badge` — the gradient icon tile used on service/feature/team cards.
- `.waveform-divider` — decorative section divider on the homepage.

All decorative motion respects `prefers-reduced-motion`.

## Known gaps / next steps

- **Team photos**: no staff portraits were supplied — the About page uses a
  neutral avatar placeholder for each management card until real photos are
  available.
- **Studio / podcast / club photography**: the supplied photo archive was all
  from home theater / cinema room installations. A few service and project
  sections reuse the closest available real photo with honest, neutral alt
  text rather than a mismatched claim (e.g. nothing is labeled "podcast room"
  unless it visibly is one). Swap in category-specific photos when available.
- **Blog**: listing page is live with 4 placeholder articles; no individual
  post template has been built yet since there's no real content to publish.
- **Legal pages**: Privacy Policy and Terms of Service are solid starting
  templates, not legal advice — have them reviewed by a qualified professional
  before launch.
- **WhatsApp number / phone / email / address**: still placeholder values
  (`+234XXXXXXXXXX`, sample address) — search the codebase for `XXXXXXXXXX`
  and replace with real business details before going live.

## Deployment

Upload the contents of this folder as-is to GitHub, Netlify, Vercel, or any
Apache/cPanel host. No build step is required — it's plain HTML/CSS/JS.
