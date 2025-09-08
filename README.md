# Raghav Sethi – Portfolio

Modern, fast React + Vite portfolio site with TailwindCSS, SWC, PWA, image optimization, and production Docker/Nginx.

## Prerequisites

- Node 18+ (or Bun 1.1+ if using Dockerfile build stage)
- pnpm or npm (examples use npm)

## Environment Variables

Create a `.env` file at the repo root for local development:

```
VITE_GEOAPIFY_API_KEY=your_geoapify_key
VITE_POCKETBASE_URL=https://raghav.pockethost.io
```

For CI/hosting, configure the same variables in your platform as build-time env vars.

## Install dependencies

```bash
npm install
```

## Run locally (development)

```bash
npm run dev
```

Then open the printed local URL (default: http://localhost:5173).

## Build for production

```bash
npm run build
```

The optimized static site will be generated in `build/`.

## Preview production build locally

```bash
npm run preview
```

## Update dependencies

```bash
npm outdated
npm update
# or pin specific packages in package.json and run
npm install
```

## Deploy

This repo currently supports GitHub Pages deployment via `gh-pages`:

```bash
npm run predeploy  # builds
npm run deploy     # publishes build/ to gh-pages branch
```

Ensure `homepage` in `package.json` is set correctly to your Pages URL.

## Docker (production)

Build and run with Docker using Nginx:

```bash
docker build -t raghav-portfolio .
docker run -p 3000:80 --env-file .env raghav-portfolio
```

Or via docker-compose:

```bash
docker compose up --build
```

## Nginx in container

The container serves `build/` via Nginx with gzip/brotli and caching headers. See `nginx/nginx.conf`.

## Linting

```bash
npm run lint
```

---

Notes
- PWA is enabled; first load caches assets for offline use.
- Large routes like the map are lazy-loaded to improve TTI.

