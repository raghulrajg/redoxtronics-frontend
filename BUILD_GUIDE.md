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

## 7. Software downloads (automatic)

The Software page offers the newest **Gas Sensor Monitor** release from the private repository **raghulrajg/Gas-Sensor-Monitor**. On every deploy, the website downloads the newest release's zip file, publishes it at `/releases/gas-sensor-monitor/<file>.zip` and shows its version, date and size. The source code stays private; only the zip becomes public. Release notes are not published.

### One-time setup: give the website a read-only token

1. Sign in to GitHub as **raghulrajg** and open **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Fill in:
   - **Token name:** `redoxtronics website - releases`
   - **Expiration:** 1 year. Set a reminder to renew it.
   - **Repository access:** **Only select repositories** → **Gas-Sensor-Monitor**
   - **Permissions → Repository permissions → Contents:** **Read-only**
3. Click **Generate token** and copy it. GitHub shows it only once.
4. Open **redoxtronics-frontend → Settings → Secrets and variables → Actions → New repository secret**. Name: `RELEASES_TOKEN`. Secret: paste the token. Click **Add secret**.
5. Go to **Actions → Deploy to GitHub Pages → Run workflow**. When it shows a green tick, the Software page offers the download.

### When a new version is released

Every push to `main` in Gas-Sensor-Monitor builds a new release (`build-<number>`). The website picks it up:

- **automatically within 6 hours** (a scheduled check), or
- **right away:** in redoxtronics-frontend, go to **Actions → Deploy to GitHub Pages → Run workflow**.

**Optional: update the website the moment a release is built.**

1. Create a second fine-grained token with **Repository access:** only **redoxtronics-frontend**, and **Contents:** **Read and write**.
2. Save it in **Gas-Sensor-Monitor → Settings → Secrets and variables → Actions** as `WEBSITE_TOKEN`.
3. Add this step at the end of `Gas-Sensor-Monitor/.github/workflows/build.yml`, below **Publish release**:

```yaml
      - name: Update the website download
        if: github.ref_name == github.event.repository.default_branch
        shell: bash
        env:
          GH_TOKEN: ${{ secrets.WEBSITE_TOKEN }}
        run: |
          if [ -z "$GH_TOKEN" ]; then echo "No WEBSITE_TOKEN: the website updates within 6 hours."; exit 0; fi
          gh api repos/raghulrajg/redoxtronics-frontend/dispatches -f event_type=software-release
```

### Good to know

- **Token expiry:** when `RELEASES_TOKEN` expires, deploys stop with a red ❌ at **Fetch the latest software releases**, and the live site keeps its last good version. Create a new token (steps 1–4 above) and run the workflow again.
- **Scheduled checks pause after 60 days without changes** to this repository. GitHub then shows a banner in the **Actions** tab with a button to turn them back on.
- **More software:** add an entry to `src/data/release-sources.json` with the software's `id` from `src/data/software.ts` and its repository name. Then give the token access to that repository too.
- **See the download on your own PC:** in PowerShell, set the token and fetch the release before starting the site:

  ```powershell
  $env:RELEASES_TOKEN = "paste-your-token-here"
  npm run releases
  npm run dev
  ```

---

## 8. Common edits

| To change… | Edit this file |
| --- | --- |
| Email, phone, address | `src/config.ts` |
| Product details (versions, specifications, photos, datasheets) | `src/data/products.ts` |
| Software downloads (names, descriptions) | `src/data/software.ts` |
| Which GitHub repositories provide automatic downloads | `src/data/release-sources.json` |
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

## 9. Troubleshooting

| Problem | Fix |
| --- | --- |
| `node` or `git` *is not recognized* | Install the tool (step 1), then close and reopen PowerShell. |
| *running scripts is disabled on this system* (when running `npm`) | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in PowerShell, or use **Command Prompt** (`cmd`) instead. |
| `npm install` warns about an unsupported Node version | Install the latest **LTS** Node.js from nodejs.org. Version 22.23 or newer is needed. |
| Port 4321 is already in use | `npm run dev -- --port 4322`, then open http://localhost:4322 |
| The site didn't update after `git push` | GitHub → **Actions** → open the latest run. A red ❌ shows which step failed. Fix the error, then commit and push again. |
| The Software page shows "Coming soon" for Gas Sensor Monitor | The `RELEASES_TOKEN` secret is missing, expired or can't read Gas-Sensor-Monitor. Create a new token (section 7), update the secret and run the workflow. |
| Deploy fails at **Fetch the latest software releases** | Same cause: renew `RELEASES_TOKEN` (section 7). The live site keeps its last good version meanwhile. |
| The live site shows *404 / There isn't a GitHub Pages site here* | Check **Settings → Pages → Source** is **GitHub Actions**, then re-run the workflow (**Actions → Deploy to GitHub Pages → Run workflow**). |
