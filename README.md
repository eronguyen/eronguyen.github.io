# E-Ro Nguyen Personal Website

Personal academic website for **E-Ro Nguyen**.

This repo serves a static site from `docs/` (GitHub Pages), including:
- About, Education, Experience, Publications, Awards
- Custom particle background + theme toggle
- Tracking page (currently hidden from navbar)

## Live Site
- Main: https://eronguyen.github.io/

## Tech Stack
- HTML + CSS + vanilla JavaScript
- Font Awesome + Google Fonts
- GitHub Pages for hosting

## Repository Structure
- `docs/`: all published website files
- `docs/index.html`: homepage
- `docs/js/app.js`: shared site logic (theme, nav active state, particles, tracking fetch)
- `docs/css/styles.css`: shared styles
- `docs/images/`: static assets
- `docs/google_scholar_crawler/`: scholar data crawler utilities

## Local Development
From repo root:

```bash
cd docs
python3 -m http.server 8000
```

Open: `http://localhost:8000`

## Deployment (GitHub Pages)
This project is deployed as a **GitHub Pages User Site**.

Recommended settings:
1. Repository name: `eronguyen.github.io`
2. Pages source: `main` branch, `/docs` folder
3. Commit + push changes to `main`

## Content Editing Notes
- Page-level content lives directly in each `docs/*.html` file.
- Shared behavior should go in `docs/js/app.js`.
- Shared visual rules should go in `docs/css/styles.css`.
- `404.html` is included for unknown routes.

## Tracking Page
- Route: `docs/tracking.html`
- Hidden from main navbar for now.
- Pulls live data from:
  - GitHub public API (`api.github.com`)
  - LeetCode API endpoint configured in `docs/js/app.js`

## Optional Scholar Crawler
If you use the crawler scripts:

```bash
cd docs/google_scholar_crawler
pip install -r requirements.txt
python main.py
```

## Attribution
This website version is built upon design/style inspiration from:
- Hai Truong-Nguyen: https://itruonghai.github.io/
