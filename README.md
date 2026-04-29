# thegurucool.ai

Static website for thegurucool.ai — an AI-powered teacher professional development platform for K-12 educators across Southeast Asia and India.

## Local development

No build step. Serve the folder with any static server, e.g.:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

Note: clean URLs (`/blog`, `/blog/:slug`) only work on Vercel, not on the local server. Locally, use `blog.html` and `posts/<slug>.html` directly.

## Deployment

Hosted on Vercel. Deploys automatically on push to `main`.

Routing rules live in `vercel.json` — clean URLs and rewrites that match the canonical paths in each page's `<link rel="canonical">`.

## Conventions

See `CLAUDE.md` for brand, file structure, and copy guidelines.
