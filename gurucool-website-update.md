# theGurucool.ai — Website Update Spec
**For:** Claude Code / Developer  
**Scope:** Update existing homepage + build two new subpages (`/teachers`, `/schools`)  
**Constraint:** Do not change any existing design elements, brand tokens, CSS variables, typography, or colour values on the homepage. All new pages must use the same design system.

---

## 0. Ground rules

- **Do not modify** any existing CSS variables, colour values, fonts, spacing tokens, border-radius values, or component styles on `index.html`.
- All new pages (`teachers.html`, `schools.html`) must share the same design system as `index.html` — same CSS variables, same nav, same footer.
- All copy must be implemented exactly as specified in this document. Do not paraphrase or rewrite.
- All images must be pulled from `/images/` using the exact filenames listed. Add `onerror` fallbacks on school-page images as noted.
- Forms are static HTML (no backend required at this stage). The existing waitlist form on `index.html` wires to whatever service is already connected — replicate that same connection on the new pages.
- Preserve all existing SEO meta tags on `index.html`. Add the new meta tags specified below to the new pages.

---

## 1. Homepage changes (`index.html`)

### 1a. Navigation — update only these two things

**Add two nav links** between the logo and the existing Blog link:

```html
<li><a href="/teachers">For Teachers</a></li>
<li><a href="/schools">For Schools</a></li>
```

Final nav link order: For Teachers · For Schools · Blog · Join waitlist (CTA button)

**Change the hero CTA** from two buttons ("I'm a teacher" / "I'm from a school") to a single button:

```html
<a href="#waitlist" class="cta-button">Join the waitlist</a>
```

Use the existing `.cta-button` class (or whatever the existing primary button class is). Do not create a new class.

### 1b. Remove two sections entirely

Remove the following two sections from `index.html` — delete the full HTML blocks including their wrapper elements:

1. **"What teachers get"** section (the three-block feature section for teacher-side product)
2. **"What schools get"** section (the three-block feature section for school-side product)

Everything else on the homepage stays exactly as-is. Section order after the removal:

> Hero → Ticker → Audience split → Why it exists → Framework → How it works → Waitlist → Footer

### 1c. No other changes to homepage

Do not change colours, fonts, copy, layout, spacing, animations, or any other element on `index.html`.

---

## 2. New page: `/teachers` (`teachers.html`)

### Meta

```html
<title>For Teachers | AI Professional Development | theGurucool.ai</title>
<meta name="description" content="GuruCool gives K-12 teachers a personal AI learning coach, competency assessment across 7 domains, and verified credentials — built for real classrooms in Southeast Asia.">
<meta property="og:title" content="For Teachers | theGurucool.ai">
<meta property="og:description" content="Know where you stand. Learn at your own pace. Earn credentials that prove it.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://thegurucool.ai/teachers">
```

### Nav

Same nav as homepage. Mark "For Teachers" as active. CTA button text: "Join waitlist".

```html
<li><a href="/teachers" class="active">For Teachers</a></li>
```

### Page section order

```
Nav → Hero → Pain section → Product blocks (01, 02, 03) → Waitlist → Footer
```

---

### Section: Hero

Dark ink background (`var(--ink)`). Two-column grid: copy left, dashboard card right.

**Left column copy:**

```
Breadcrumb: Home / For Teachers

Eyebrow pill: For K-12 Teachers

H1: Professional development that actually fits your teaching life

Subheadline: Know exactly where you stand. Learn at your own pace. Earn credentials that prove it. GuruCool is the AI tutor built for teachers who don't have time for generic PD.

CTA button (links to #waitlist):
  Join the waitlist — it's free  →

Trust line: Built for SEA classrooms. Grounded in Bloom's Taxonomy, TPACK, UDL, and Visible Learning.
```

**Right column — dashboard card** (dark glass card, same style as the hero dashboard card on the homepage):

```
Header:  My Dashboard · Ms. Lim W.Y.   [Live pill]

Score row (3 boxes):
  74%  Overall
  12   Lessons
  3    Badges

Domain progress bars:
  Technology    ████████░░  78%
  Ethics        █████░░░░░  55%
  Assessment    ████░░░░░░  41%  (warning colour: var(--gold))
  Inclusion     ███░░░░░░░  36%  (warning colour: var(--gold))

Badge row:
  🏅 AI Tech Integration · L2
  🏅 Curriculum Design · L1
```

---

### Section: Pain

Two-column grid on `var(--cream-warm)` background.

**Left — copy:**

```
Section label: Why most PD fails teachers

H2: Most professional development is a waste of your time. Here's why.

Body paragraphs:
  You sit through a full-day workshop. Someone presents slides you've seen before. You get a certificate of attendance. On Monday morning, nothing in your classroom is different.

  That's not a training problem. That's a relevance problem.

  Generic PD doesn't know what you already know. It can't adapt to your subject, your level, or your students. It measures completion, not growth.

  GuruCool starts with an honest picture of where you actually stand — then builds everything from there.
```

**Right — 2×2 stat grid** (white cards, same style as existing stat cards on homepage if present, else plain white border-radius cards):

```
7           AI competency domains mapped to internationally recognised frameworks
140         Scenario-based diagnostic questions — not a tick-box survey
25min       To complete your full competency diagnostic
10–15min    Lessons designed around real teaching schedules
```

---

### Section: Product blocks — copy verbatim from `index.html`

**Do not rewrite or rebuild this section.** Copy the existing "What teachers get" HTML block from `index.html` verbatim and paste it into `teachers.html`.

The section to copy is the **teacher-side tab panel** inside the "Built for teachers. Visible to schools." tabbed section on the homepage. It contains exactly these three blocks displayed when the "For Teachers" tab is active:

```
01  Competency Assessment
    140 scenario-based questions across 7 TEACH-AI domains, grounded in Bloom's Taxonomy,
    TPACK, and UDL. Not a tick-box survey. A real diagnostic that reveals how you think
    about AI in your classroom.
    Tags: 25 minutes · 140 questions · 7 domains
    Image: /images/competency-assessment.png

02  GuruCool, your personal AI Tutor
    Your personal AI learning coach available any time. Three modes: Guide walks you through
    new concepts, Analyst breaks down your results, Examiner tests your understanding.
    Always contextualised to your classroom.
    Tags: Guide mode · Analyst mode · Examiner mode · Always on
    Image: /images/ai-tutor.png

03  Personal Dashboard
    See your progress across all 7 domains, your earned badges, and your next learning
    milestone. A growing portfolio of verified credentials that proves your professional
    development over time.
    Tags: Verified badges · Domain progress · Shareable
    (Right column: the interactive dashboard UI component, not a static image)
```

**Implementation notes:**
- Copy the exact HTML — all classes, inline styles, data attributes, and JS behaviour intact.
- The tab toggle mechanism is not needed on `/teachers` — the teacher panel is always visible. Remove the tab switcher UI (the "For Teachers / For Schools" toggle buttons) but keep all the panel HTML and CSS exactly as-is.
- The interactive dashboard component in Block 03 (the one showing domain scores, badges, and the live UI) must render correctly — do not replace it with a static image.
- Do not strip any classes or restructure the markup. The existing CSS on `index.html` already styles this section correctly; link to the same stylesheet or copy the relevant CSS rules.

---

### Section: Waitlist

Use `var(--sage)` background. Same form layout as the existing homepage waitlist section. Replicate the existing form component exactly — same field styles, same submit button style, same post-submit confirmation state if one exists.

```
Section label: Reserve your spot
H2: Be first in the classroom
Subheadline: GuruCool is launching soon. Join the waitlist and get early access — plus a behind-the-scenes look at how we built it.

Form fields:
  First name         (text, placeholder: Maya)
  Work email         (email, placeholder: you@school.edu)
  School name        (text, full width, placeholder: Your school)
  I am a...          (select, full width)
    Options: Classroom Teacher / Head of Department / Teacher Educator / EdTech Coordinator
  Country            (select, full width)
    Options: Singapore / Malaysia / Philippines / Indonesia / Thailand / Vietnam / Other

Submit button: Reserve my spot →

Below-form note: For K-12 classroom teachers, HODs, and teacher educators. No spam — just product updates and early access when we launch.
```

### Footer

Identical to homepage footer.

---

## 3. New page: `/schools` (`schools.html`)

### Meta

```html
<title>For Schools | AI Readiness & Teacher Development | theGurucool.ai</title>
<meta name="description" content="GuruCool gives school leaders a live view of teacher AI readiness across every department — with tools to assign development, track progress, and close the gaps that matter.">
<meta property="og:title" content="For Schools | theGurucool.ai">
<meta property="og:description" content="Know exactly where your teachers stand on AI — and what to do about it.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://thegurucool.ai/schools">
```

### Nav

Same nav as homepage. Mark "For Schools" as active. CTA button text: "Request early access".

```html
<li><a href="/schools" class="active">For Schools</a></li>
```

### Page section order

```
Nav → Hero → Problem section → Product blocks (01, 02, 03) → Use cases → Waitlist → Footer
```

### Design accent note

The schools page uses **gold** (`var(--gold)`) as the accent colour throughout — section labels, eyebrow pills, CTA button, step numbers, tag pill backgrounds, and the waitlist submit button. This differentiates it visually from the teachers page (which uses sage green) while staying within the existing brand palette. Do not introduce any new colour values — use only `var(--gold)` and `var(--gold-pale)` from the existing CSS variables.

---

### Section: Hero

Dark ink background (`var(--ink)`). Two-column grid: copy left, school dashboard card right.

**Left column copy:**

```
Breadcrumb: Home / For Schools

Eyebrow pill: For School Leaders
  (pill background: rgba(201,168,76,0.15), border: rgba(201,168,76,0.3), text: #e8c96a)

H1: Know exactly where your teachers stand on AI — and what to do about it
  (italic portion: "and what to do about it", colour: #e8c96a)

Subheadline: GuruCool gives school leaders a live view of teacher AI readiness across every department, with structured pathways to close the gaps before they become problems.

CTA button (gold, links to #waitlist):
  Request early access for your school  →

Trust line: Built for K-12 schools in Southeast Asia. Grounded in Bloom's Taxonomy, TPACK, UDL, and Visible Learning.
```

**Right column — school dashboard card** (dark glass card):

```
Header: School Overview · Q2 2026   [Live pill — gold tint]

Metric row (4 boxes):
  68%     School avg
  47      Badges
  17/24   On track
  Ethics  Top gap (gold text)

Department table:
  Department      Avg Score   Badges   Status
  📐 Mathematics   78%         12       Leading   (sage green pill)
  🔬 Science       68%         8        On track  (gold pill)
  📚 English       54%         4        Needs support (muted pill)
  🌍 Humanities    49%         3        Needs support (muted pill)
```

---

### Section: Problem

Two-column grid on `var(--cream-warm)` background.

**Left — copy:**

```
Section label (gold): The visibility gap

H2: Most schools are flying blind on teacher AI readiness

Body paragraphs:
  AI is already in your classrooms — in the tools students use, the assessments teachers set, and the lessons being generated overnight. The question is no longer whether your teachers are using AI. It's whether they're using it well.

  But when was the last time you had data on that?

  Most PD programmes track attendance, not competency. They tell you who showed up, not who grew. GuruCool changes that — starting with a 140-question diagnostic that gives your school a live view of readiness, gaps, and progress you can act on.
```

**Right — 2×2 stat grid** (gold accent on numbers):

```
7           AI competency domains assessed across every teacher in your school
Live        Dashboard updates as teachers complete their diagnostics and lessons
0           Manual reports needed — everything is calculated and displayed automatically
Board-ready Data formatted for leadership reporting and accreditation panels
```

---

### Section: Product blocks

Section intro header (on `var(--cream)` background):

```
Section label (gold): Inside the platform
H2: What schools get
```

### Section: Product blocks — copy verbatim from `index.html`

**Do not rewrite or rebuild this section.** Copy the existing "What schools get" HTML block from `index.html` verbatim and paste it into `schools.html`.

The section to copy is the **school-side tab panel** inside the "Built for teachers. Visible to schools." tabbed section on the homepage. It contains exactly these three blocks displayed when the "For Schools" tab is active:

```
01  Assign Professional Development
    HODs can assign specific learning paths to individual teachers or whole departments,
    set target completion dates, and track progress in real time. No more chasing people
    to attend workshops.
    Tags: For HODs · Assign by domain · Set deadlines
    Right column: the interactive Assign PD UI component (table with teachers, scores,
    assign checkboxes, due dates, and "Assign to selected" button)

02  Individual Teacher Analytics
    Drill down into any teacher's competency profile. See their scores across all 7 domains,
    their learning history, badges earned, and where they need the most support. Data to
    have better conversations.
    Tags: Per teacher · Domain breakdown · Progress over time
    Right column: the interactive Teacher Profile UI component (Ms. Priya N. profile with
    domain scores and recommendation)

03  School-Level Metrics
    A live view of your entire school's AI readiness. See overall scores, completion rates,
    top gaps by domain, and which departments are ahead or behind. Board-ready data at a glance.
    Tags: For principals · Live data · Board-ready
    Right column: the interactive School Overview UI component (metrics + department table)
```

**Implementation notes:**
- Copy the exact HTML — all classes, inline styles, data attributes, and JS behaviour intact.
- The tab toggle mechanism is not needed on `/schools` — the school panel is always visible. Remove the tab switcher UI (the "For Teachers / For Schools" toggle buttons) but keep all the panel HTML and CSS exactly as-is.
- All three right-column UI components are interactive (not static images) — they must render correctly. Do not replace them with screenshots or placeholder images.
- Do not strip any classes or restructure the markup. The existing CSS on `index.html` already styles this section correctly; link to the same stylesheet or copy the relevant CSS rules.

---

### Section: Use cases

Three-card grid on `var(--cream-warm)` background.

```
Section label (gold): Built for every school leader
H2: The decisions GuruCool helps you make

Card 1:
  Role label (gold): For Principals
  Title: School-wide AI readiness at a glance
  Body: Get a single view of where your school stands across all 7 competency domains — with the department-level breakdown you need to make resourcing decisions and report upward with confidence.

Card 2:
  Role label (gold): For Heads of Department
  Title: Close the gaps before appraisal season
  Body: See exactly where each teacher in your department stands. Assign targeted learning paths. Track progress in real time. Have development conversations grounded in data, not guesswork.

Card 3:
  Role label (gold): For EdTech Coordinators
  Title: One platform. Every teacher. Full visibility.
  Body: Replace scattered workshops and self-reported CPD logs with a structured, trackable programme — aligned to an internationally recognised framework and delivered through an AI tutor.
```

---

### Section: Waitlist

Use `var(--ink)` background (dark, not sage green — differentiates from teachers page). Same form layout. Submit button uses `var(--gold)` background.

```
Section label (gold tint): Early access
H2: Get your school on the list
Subheadline: GuruCool is launching soon. Schools that join now get priority onboarding, pilot access, and direct input into what we build next.

Form fields:
  First name         (text, placeholder: Siti)
  Last name          (text, placeholder: Rahman)
  Work email         (email, full width, placeholder: you@school.edu)
  School name        (text, full width, placeholder: Your school)
  Role               (select, full width)
    Options: Principal / Head of Department / EdTech Coordinator / PD Lead / Other
  Country            (select)
    Options: Singapore / Malaysia / Philippines / Indonesia / Thailand / Vietnam / Other
  Number of teachers (select)
    Options: Under 20 / 20–50 / 51–100 / 100+

Submit button (gold): Request early access for my school →

Below-form note: For principals, HODs, EdTech coordinators, and PD leads. We'll be in touch within 48 hours.
```

### Footer

Identical to homepage footer.

---

## 4. Shared CSS — what to reuse, what to add

The new pages share the full CSS variable set from `index.html`. These must be declared identically on both new pages:

```css
--sage: #4a7c6f
--sage-light: #6ba898
--sage-pale: #e8f2ef
--ink: #1a2420
--ink-mid: #3d4f49
--ink-muted: #6b7c77
--cream: #faf8f4
--cream-warm: #f3efe7
--gold: #c9a84c
--gold-pale: #f7f0de
--white: #ffffff
--border: #dde6e3
--font-display: 'Fraunces', Georgia, serif
--font-body: 'DM Sans', sans-serif
--radius: 12px
--radius-lg: 20px
```

**For the product blocks sections:** No new CSS required. The existing stylesheet from `index.html` already contains all the classes and styles for the "Built for teachers. Visible to schools." section. Either:
- Link both new pages to the same stylesheet as `index.html`, or
- Copy the relevant CSS rules (everything scoped to the platform/feature section) into a shared `subpages.css` file

Do not rewrite or re-implement these styles. The goal is pixel-identical output to what renders on `index.html`.

**New CSS only needed for:**
- Hero section (dark ink background, two-column layout, breadcrumb, eyebrow pill, dashboard card)
- Pain section / Problem section (two-column layout, stat grid cards)
- Use cases section on `/schools` (three-card grid)
- Waitlist section styling variations (sage background on `/teachers`, ink background on `/schools`)
- Nav active state (`.active` class on the current page link)

**Mobile breakpoint** — ensure all new two-column layouts collapse to single column below 768px:

```css
@media (max-width: 768px) {
  .hero-inner,
  .pain-inner,
  .problem-inner {
    grid-template-columns: 1fr;
  }
  .nav-links {
    display: none;
  }
}
```

---

## 5. Checklist before handoff

- [ ] `index.html` nav updated with For Teachers and For Schools links
- [ ] `index.html` hero has single CTA button (not dual)
- [ ] "What teachers get" tabbed section removed from `index.html`
- [ ] "What schools get" tabbed section removed from `index.html`
- [ ] No other changes to `index.html`
- [ ] `teachers.html` created with all sections in correct order
- [ ] `schools.html` created with all sections in correct order
- [ ] Teachers product blocks: HTML copied verbatim from `index.html` teacher tab panel
- [ ] Schools product blocks: HTML copied verbatim from `index.html` school tab panel
- [ ] Tab toggle UI removed from both subpages (teacher panel always visible on `/teachers`, school panel always visible on `/schools`)
- [ ] All interactive UI components in product blocks render correctly on both subpages
- [ ] All copy outside the product blocks matches this spec exactly
- [ ] Existing stylesheet linked or CSS rules copied to subpages — no styles broken
- [ ] Waitlist forms on both new pages connected to same service as `index.html`
- [ ] Post-submit confirmation state preserved on both new forms
- [ ] Meta tags added to both new pages
- [ ] Canonical URLs set correctly
- [ ] Both new pages render correctly on mobile (single column below 768px)
- [ ] Active nav state set correctly on each page (`/teachers` highlights For Teachers, `/schools` highlights For Schools)
- [ ] Footer identical across all three pages
