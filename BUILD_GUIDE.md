# Build guide (Windows)

Step-by-step guide to get the Redoxtronics Technologies website onto your computer, run it, build it and publish it.

- **Repository:** https://github.com/raghulrajg/redoxtronics-frontend
- **Local folder:** `E:\Project\REDOXTRONICS Company project\redoxtronics-frontend`
- **Live site (after setup):** https://raghulrajg.github.io/redoxtronics-frontend/ (later https://redoxtronics.com)

---

## 1. Install the tools (one time)

| Tool | Download | Check it works (in PowerShell) |
| --- | --- | --- |
| **Node.js** (LTS, version 22.23 or newer) | https://nodejs.org → **LTS** installer, default options | `node -v` and `npm -v` |
| **Git** | https://git-scm.com/download/win, default options | `git --version` |
| **VS Code** (optional editor) | https://code.visualstudio.com | — |

After installing, **close and reopen PowerShell** so it finds the new programs.

---

## 2. Get the code into your folder

Open **PowerShell** and run:

```powershell
cd "E:\Project\REDOXTRONICS Company project"
git clone https://github.com/raghulrajg/redoxtronics-frontend.git
cd redoxtronics-frontend
```

This creates `E:\Project\REDOXTRONICS Company project\redoxtronics-frontend` with all the files.

> If Git says *"destination path 'redoxtronics-frontend' already exists and is not an empty directory"*, rename or delete the old `redoxtronics-frontend` folder and run `git clone` again. An empty folder is fine.

**Alternative, without typing commands:** in the Claude desktop app, open a **Claude Code** session in the `redoxtronics-frontend` folder and type:
`Clone https://github.com/raghulrajg/redoxtronics-frontend into this folder`

---

## 3. Install the website's packages (first time only)

In PowerShell, inside the `redoxtronics-frontend` folder:

```powershell
npm install
```

This downloads everything the site needs into a `node_modules` folder (1–2 minutes). Run it again only if `package.json` changes.

---

## 4. Run the website on your computer

```powershell
npm run dev
```

Open **http://localhost:4321** in Chrome. The page updates automatically when you save a file. Press <kbd>Ctrl</kbd> + <kbd>C</kbd> in PowerShell to stop.

---

## 5. Build the final website

```powershell
npm run check     # finds mistakes in the code (optional, recommended)
npm run build     # creates the finished website in the "dist" folder
npm run preview   # shows the finished build at http://localhost:4321
```

You don't need to upload `dist` yourself: GitHub builds it automatically (next step).

---

## 6. Publish on the internet (GitHub Pages)

**One-time setup:** on GitHub, open the repository → **Settings → Pages** → under **Build and deployment → Source**, choose **GitHub Actions**.

**Every time you change something**, run these in PowerShell inside the project folder:

```powershell
git add .
git commit -m "Describe what you changed"
git push
```

Then open the **Actions** tab on GitHub. When **Deploy to GitHub Pages** shows a green tick (about 2 minutes), the live site is updated.

> Keep the `.github` folder: it contains the workflow that publishes the site.

To use **redoxtronics.com** instead of the github.io address, follow **"Use your own domain"** in [README.md](README.md). That section also explains how to keep your Zoho Mail working.

---

## 7. Common edits

| To change… | Edit this file |
| --- | --- |
| Email, phone, address | `src/config.ts` |
| Product details (versions, specifications, photos, datasheets) | `src/data/products.ts` |
| Software downloads | `src/data/software.ts` |
| Page text | `src/data/content.ts` and `src/pages/*.astro` |
| Colours | `src/styles/global.css` |
| Logo | `public/brand/` (see below) |

### Replacing the logo

The logo files are in `public/brand/`, all with transparent backgrounds:

- `redoxtronics-logo.png` / `.webp`: the full logo (shown in the footer)
- `redoxtronics-mark.png` / `.webp`: the DNA + circuit emblem (header and icons)

The original logo file is kept in `brand/redoxtronics-logo-original.webp`. After replacing these files, regenerate the browser icons and the share image:

```powershell
npm run build
npm i -D playwright
npx playwright install chromium
npm run assets
```

---

## 8. Troubleshooting

| Problem | Fix |
| --- | --- |
| `node` or `git` *is not recognized* | Install the tool (step 1), then close and reopen PowerShell. |
| *running scripts is disabled on this system* (when running `npm`) | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in PowerShell, or use **Command Prompt** (`cmd`) instead. |
| `npm install` warns about an unsupported Node version | Install the latest **LTS** Node.js from nodejs.org. Version 22.23 or newer is needed. |
| Port 4321 is already in use | `npm run dev -- --port 4322`, then open http://localhost:4322 |
| The site didn't update after `git push` | GitHub → **Actions** → open the latest run. A red ❌ shows which step failed. Fix the error, then commit and push again. |
| The live site shows *404 / There isn't a GitHub Pages site here* | Check **Settings → Pages → Source** is **GitHub Actions**, then re-run the workflow (**Actions → Deploy to GitHub Pages → Run workflow**). |
