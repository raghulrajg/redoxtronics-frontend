# Redoxtronics — website

Website for **Redoxtronics** ([redoxtronics.com](https://redoxtronics.com)), R&D specialists in electrochemical workstations, gas sensors and embedded systems.

![Redoxtronics — Where redox meets electronics](public/og-image.png)

- **Royal blue design.** Deep navy instrument panels, royal-blue accents and a live cyclic-voltammetry plot in the hero. Works on phones, tablets and desktops.
- **Pages:** Home, Products, Software downloads, About, Contact, plus a custom 404 page.
- **Placeholders ready to fill.** Product versions and software downloads show "Coming soon" until you add the details in one data file each.
- **Fast and static.** Built with [Astro](https://astro.build) and ships almost no JavaScript. The illustrations are SVG and need no image files.
- **SEO-ready.** Page titles and descriptions, Open Graph share image, structured data (organisation, address and phone), sitemap and robots.txt.

---

## 1. Publish on GitHub Pages (free)

### Step 1: Create the repository

1. Sign in to [github.com](https://github.com) and click **New repository**.
2. Name it, for example `redoxtronics-website`. Choose **Public**. (GitHub Pages on a private repository needs a paid plan.)
3. Click **Create repository**.

### Step 2: Upload the files

**Option A, in the browser (no tools needed):**

1. Unzip `redoxtronics-website.zip` on your computer.
2. On the new repository page, click **uploading an existing file**.
3. Open the unzipped `redoxtronics-website` folder. Select **everything inside it**, including the `.github` folder, and drag it onto the GitHub page.
4. Click **Commit changes**.

> ⚠️ The `.github` folder contains the deploy workflow. On a Mac, Finder hides folders that start with a dot: press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> to show them. After uploading, check that the repository contains `.github/workflows/deploy.yml`.

**Option B, with Git on the command line**, from inside the unzipped folder:

```bash
git init
git add .
git commit -m "Redoxtronics website"
git branch -M main
git remote add origin https://github.com/<your-username>/redoxtronics-website.git
git push -u origin main
```

### Step 3: Turn on GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab. If the workflow has not started yet, click **Deploy to GitHub Pages → Run workflow**.
4. When it shows a green tick (about 1–2 minutes), the site is live at `https://<your-username>.github.io/redoxtronics-website/`.

Every later change pushed to the `main` branch republishes the site automatically.

### Step 4: Use your own domain (redoxtronics.com)

1. In **Settings → Pages → Custom domain**, enter `redoxtronics.com` and click **Save**.
2. At your domain provider (where you bought redoxtronics.com), open the DNS settings and add:

   | Type  | Name / Host | Value                     |
   | ----- | ----------- | ------------------------- |
   | A     | `@`         | `185.199.108.153`         |
   | A     | `@`         | `185.199.109.153`         |
   | A     | `@`         | `185.199.110.153`         |
   | A     | `@`         | `185.199.111.153`         |
   | CNAME | `www`       | `<your-username>.github.io` |

   Delete any **old** `A` or `CNAME` records for `@` or `www` that point somewhere else, such as a parking page.

   > ✅ **Do not change the Zoho Mail records** (`MX`, the SPF `TXT` record and the DKIM `TXT` record). Email at sales@redoxtronics.com keeps working because the website and email use different DNS records.

3. Wait until GitHub shows "DNS check successful". This can take from a few minutes up to 24 hours. Then tick **Enforce HTTPS**.
4. Re-run the deploy (**Actions → Deploy to GitHub Pages → Run workflow**) so that links and the sitemap use `https://redoxtronics.com`.

Optional but recommended: verify the domain under your GitHub **profile Settings → Pages**. This stops anyone else from using it on GitHub.

---

## 2. Edit the content

| What | Where |
| --- | --- |
| Company name, email, phone, registered address, social links | `src/config.ts` |
| Products and their versions (specifications, photos, datasheets) | `src/data/products.ts` |
| Software downloads | `src/data/software.ts` |
| Focus areas, applications, "how we work" steps, values | `src/data/content.ts` |
| Page text and section order | `src/pages/*.astro` and `src/components/home/*.astro` |
| Colours, fonts, spacing (royal-blue design tokens are at the top) | `src/styles/global.css` |
| Logo | `src/components/ui/Logo.astro` (then run `npm run assets`, see below) |

You can edit any file directly on github.com (open the file → ✏️ pencil icon → **Commit changes**). The site redeploys automatically.

### Add product details

Each product has two versions in `src/data/products.ts`. While a version is empty it shows **"Details coming soon"**. To publish one, fill it in:

```ts
{
  name: 'Version 1',
  summary: 'Compact, battery-powered workstation for teaching and field work.',
  specs: [
    { label: 'Potential range', value: '±2 V' },
    { label: 'Interface', value: 'USB-C' },
  ],
  image: '/images/products/workstation-v1.jpg',         // put the photo in public/images/products/
  datasheet: '/downloads/workstation-v1-datasheet.pdf', // put the PDF in public/downloads/
},
```

(The values above are only examples.)

### Publish a software download

Each entry in `src/data/software.ts` shows **"Coming soon"** with a disabled button until you add a download link:

1. Upload the installer:
   - **Recommended:** create a **GitHub Release** (repository → **Releases → Draft a new release**), attach the installer and copy its download link. Releases accept large files.
   - Small files (under 25 MB) can also go in `public/downloads/`. They are then available at `/downloads/<file name>`.
2. In `src/data/software.ts`, fill in `url`, `version`, `platform`, `size` and `released`.
3. Commit. The download button switches on automatically.

---

## 3. Receive enquiries from the contact form

By default, the contact form opens the visitor's email app with the message filled in, addressed to sales@redoxtronics.com. No setup is needed.

To receive enquiries **directly in your Zoho inbox** without the visitor's email app, use the free [Web3Forms](https://web3forms.com) service:

1. On web3forms.com, enter `sales@redoxtronics.com` to get an access key. The key is emailed to you.
2. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**.
3. Name: `WEB3FORMS_KEY`. Secret: paste the key. Click **Add secret**.
4. Re-run the deploy (**Actions → Deploy to GitHub Pages → Run workflow**).

The key is not stored in the code. (A static site's form sends the key from the visitor's browser, so it is visible in the page source. Web3Forms is designed this way: the key can only send messages to your own inbox.)

---

## 4. Before you go live ✅

- [ ] **Review the text.** The company profile, focus areas, applications and "how we work" steps were written from a short brief. Check that they describe your work accurately.
- [ ] **Product versions.** Both products currently list two versions (Version 1 and Version 2) as placeholders. Rename or remove versions in `src/data/products.ts` to match your real line-up.
- [ ] **Software list.** Two software entries (workstation and gas detector) are placeholders. Edit or remove them in `src/data/software.ts`.
- [ ] **Logo.** The ⇌ mark (the chemical equilibrium sign) is a placeholder. Replace it with your official logo if you have one.
- [ ] **Social links.** Add LinkedIn or YouTube URLs in `src/config.ts` (empty values are hidden).

---

## 5. Work on the site locally (optional)

Requires **Node.js 22.23 or newer** (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build in ./dist
npm run preview    # serve the production build locally
npm run check      # TypeScript / Astro diagnostics
```

### Regenerate icons and the share image

The generated files in `public/` are already included. Run this only after changing the logo, colours or headline:

```bash
npm run build
npm i -D playwright && npx playwright install chromium
npm run assets
```

### Other hosts (Netlify, Vercel, Cloudflare Pages)

Import the repository and use build command `npm run build`, output directory `dist` and environment variable `SITE_URL=https://redoxtronics.com`. For any other web host, run `npm run build` and upload the contents of `dist/`.

### Project structure

```text
src/
├── components/
│   ├── home/            # Home-page sections (Hero, FocusAreas, ProductsPreview, SoftwareBand, Applications)
│   ├── illustrations/   # SVG illustrations (instrument panel, workstation, gas detector, software)
│   ├── ui/              # Reusable pieces (Icon, Logo, PageHero, SectionHeader, CtaBand, FieldLines)
│   ├── Header.astro
│   └── Footer.astro
├── data/                # Products, software downloads and site copy
├── layouts/BaseLayout.astro   # <head>, SEO meta, structured data, fonts
├── lib/                 # URL helpers, icon registry, voltammogram + background generators
├── pages/               # One file per page
├── scripts/reveal.ts    # Scroll-reveal animation
└── styles/global.css    # Design system (royal-blue tokens)
public/                  # Favicons, share image, web manifest
scripts/generate-assets.cjs    # Regenerates favicons + share image (optional)
```

## Credits

Site structure adapted from the Deccan Robotics website. Icons: [Lucide](https://lucide.dev) (ISC). Fonts: [Sora](https://fonts.google.com/specimen/Sora), [Inter](https://rsms.me/inter/) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (SIL Open Font License), self-hosted via Fontsource.
