# theGurucool.ai — Website

## What This Is

thegurucool.ai is an AI-powered teacher professional development platform for K-12 educators across Southeast Asia. The website is a static multi-file HTML site with no build tools, no frameworks, and no dependencies beyond Google Fonts.

---

## File Structure

```
/
├── index.html          # Home page
├── blog.html           # Blog index (all posts listed)
├── style.css           # Shared stylesheet — all pages link to this
├── CLAUDE.md           # This file
└── posts/
    ├── ai-6-hours.html
    ├── ai-asian-classrooms.html
    ├── philippines-deped.html
    ├── teachers-financial.html
    ├── vietnam-reform.html
    ├── singapore-teachers.html
    ├── india-burnout.html
    └── did-anyone-learn.html
```

---

## Brand

### Colours
```css
--black:     #111111   /* primary background, nav, footer */
--orange:    #F47B5A   /* brand accent — buttons, links, highlights */
--white:     #FFFFFF
--paper:     #FAFAFA   /* light section backgrounds */
--chalk:     #F0EDE8   /* text on dark backgrounds */
--chalk-dim: rgba(240,237,232,0.55)  /* subdued text on dark */
--mid:       #888888   /* body text on light backgrounds */
```

### Typography
- **Body / UI:** Montserrat (Google Fonts) — weights 300, 400, 600, 700
- **Display / Headings:** Instrument Serif (Google Fonts) — regular and italic
- **No other fonts.** Do not introduce Inter, Roboto, or system fonts.

### Logo
- The logo is embedded as a base64 PNG in every HTML file (transparent background).
- Source file: `logo_transparent.png` (379×96px, cropped from brand PNG with black background removed).
- Always use `alt="theGurucool.ai — Teacher Professional Development Platform"`.

### Voice
- Lowercase brand name: **thegurucool** or **thegurucool.ai** — never "TheGurucool" or "TheGurucool.AI"
- No em dashes anywhere. Use commas or rewrite the sentence.
- No exclamation marks in body copy.
- Tone: direct, warm, credible. Not corporate. Not hype.

---

## Architecture Rules

### Static HTML only
- No React, Vue, Next.js, or any framework.
- No npm, no build step, no bundler.
- CSS is in `style.css` (shared) plus `<style>` blocks inside each HTML file for page-specific styles.
- JavaScript is inline `<script>` at the bottom of each file. Keep it minimal.

### Navigation between pages
- All nav links are standard `<a href="">` links. No JavaScript routing.
- Links from `index.html` and `blog.html` to posts: `href="posts/[slug].html"`
- Links from post pages back: `href="../index.html"` and `href="../blog.html"`
- Link to stylesheet from posts: `href="../style.css"`

### Page size limit
- Keep every HTML file under 100KB. The logo base64 is ~58KB so page-specific content should stay under 40KB.
- Do not put all pages in a single file (the old gurucool-v7.html approach caused JS loading failures).

---

## Adding a New Blog Post

### Step 1 — Create the post file
Copy any existing post as a template, e.g. `posts/india-burnout.html`. Save as `posts/[new-slug].html`.

Update these fields in the new file:
```html
<!-- <title> tag -->
<title>[Post Title] | theGurucool.ai</title>

<!-- Meta description -->
<meta name="description" content="[150-char description]"/>

<!-- Canonical -->
<link rel="canonical" href="https://www.thegurucool.ai/blog/[slug]"/>

<!-- OG tags -->
<meta property="og:title" content="[Post Title]"/>
<meta property="og:image" content="[image URL]"/>
<meta property="og:url" content="https://www.thegurucool.ai/blog/[slug]"/>

<!-- Twitter -->
<meta name="twitter:title" content="[Post Title]"/>
<meta name="twitter:image" content="[image URL]"/>

<!-- JSON-LD -->
"headline":"[Post Title]"
"author":{"@type":"Person","name":"[Author Name]"}
"datePublished":"[Date]"
"image":"[image URL]"

<!-- Post hero -->
<span class="post-cat">[Category]</span>
<h1 class="post-title">[Post Title]</h1>
<p class="post-meta">[Date] &nbsp;·&nbsp; By [Author]</p>

<!-- Thumbnail -->
<img src="[image URL]" alt="[Post Title]" class="post-thumb">

<!-- Body -->
<div class="post-body-wrap">
  [HTML content — use <h2>, <h3>, <p>, <strong>, <ul>, <li>, <hr>]
</div>
```

### Step 2 — Add a card to blog.html
Find the `blog-featured` div (for the top 3 posts) or the `blog-sub-grid` div (for all others).

Card template:
```html
<a class="bc" href="posts/[slug].html" data-cat="[category]">
  <div class="bc-img"><img src="[image URL]" alt="[Post Title]" loading="lazy"><div class="bc-tag">[Category Label]</div></div>
  <div class="bc-body">
    <div class="bc-meta"><span class="bc-cat-lbl">[Category Label]</span><span class="bc-sep"></span><span class="bc-date">[Month Year]</span></div>
    <div class="bc-title">[Post Title]</div>
    <div class="bc-excerpt">[2–3 sentence excerpt]</div>
    <div class="bc-foot"><div class="bc-author-row"><span class="bc-auth-emo">👩‍💻</span><span class="bc-auth-name">[Author]</span></div><span class="bc-arr">→</span></div>
  </div>
</a>
```

Valid `data-cat` values: `research`, `policy`, `wellbeing`, `opinion`

---

## Key Sections on index.html

| Section | ID / Class | Notes |
|---|---|---|
| Nav | `<nav>` | Fixed. Contains logo, Home, Blog, Join waitlist CTA |
| Hero | `.hero.ruled-bg` | Dark bg. H1, sub, CTA button, browser mockup |
| Platform toggle | `#panels-teacher` / `#panels-school` | JS `switchView()` shows/hides on click |
| TEACH-AI Framework | `.framework-section` | Dark bg. Split layout: foundations left, domains right |
| How it works | `.how-section` | 4 steps with animated circles on scroll |
| Home CTA | `.home-cta` | Dark bg. Links to `#waitlist` anchor |
| Waitlist form | `#waitlist` | Light bg. Submit calls `submitWL()`, shows success state |
| Footer | `<footer>` | Dark bg |

---

## JavaScript Functions (index.html)

```js
switchToggle('teacher' | 'school')
// Toggles platform panels. Applies inline styles to buttons.
// DO NOT use CSS classes for toggle state — inline styles only.

submitWaitlist()
// Hides #wl-form-body, shows #wl-success.
// Connect to actual email service (Brevo/Mailchimp) when ready.
```

## JavaScript Functions (blog.html)

```js
filterCat(btn, cat)
// Filters .bc cards by data-cat attribute.
// Shows all if cat === 'all'.
```

---

## SEO Requirements

Every page must have:
- Unique `<title>` — format: `[Page/Post Title] | theGurucool.ai`
- Unique `<meta name="description">` — 150–160 chars
- `<link rel="canonical" href="https://www.thegurucool.ai/[path]"/>`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:image`

Post pages also need:
- JSON-LD `Article` schema with `headline`, `author`, `datePublished`, `image`, `publisher`
- One `<h1>` only (the post title in `.post-title`)
- `loading="eager"` on the hero image, `loading="lazy"` on all other images

---

## The TEACH-AI Framework (do not change without approval)

7 competency domains, mapped to 4 pedagogical foundations:

**Foundations:**
1. Bloom's Taxonomy (Anderson and Krathwohl, 2001)
2. TPACK (Mishra and Koehler, 2006)
3. Universal Design for Learning (CAST, 2018)
4. Hattie's Visible Learning (Hattie, 2009)

**Domains (spell exactly as shown):**
- T — Technology Integration
- E — Ethics and Responsibility
- A — Assessment Design
- C — Curriculum and Content
- H — Human-AI Collaboration
- A — Adaptive Teaching
- I — Inclusion and Equity

---

## Platform Screens (index.html)

### Teacher view (3 panels):
1. **Competency Assessment** — 140 scenario-based questions, 7 domains, 25 minutes
2. **AI Tutor Chat** — Guide / Analyst / Examiner modes
3. **Personal Dashboard** — domain scores, earned badges, next milestone

### School view (3 panels):
1. **Assign Professional Development** — HODs assign paths by domain with deadlines
2. **Individual Teacher Analytics** — per-teacher domain breakdown and recommendations
3. **School-Level Metrics** — whole-school overview by department

---

## Pilot Context (Q2 2026)

- Status: **Pilot stage, Q2 2026**
- Geography: Southeast Asia (SG, PH, ID, MY, VN, TH) + India
- Contact: `admin@thegurucool.ai`
- Pricing reference (India): INR 1,000 per teacher per year
- Do not claim GA launch or live product unless instructed

---

## Do Not Change Without Asking

- The logo base64 string
- The TEACH-AI framework domain names or academic citations
- The waitlist form structure (fields: name, email, country, role)
- The brand colour palette
- The font stack (Montserrat + Instrument Serif only)
