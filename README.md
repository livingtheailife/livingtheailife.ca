# Living the AI Life — Static Website

A complete static website for the "Living the AI Life" brand — bridging ancient wellness wisdom with modern AI technology.

## Project Structure

```
living-the-ai-life/
├── index.html              # Home page
├── about.html              # About page
├── contact.html            # Contact page
├── community.html          # Facebook community landing
├── ai-tools.html           # AI Tools & Reviews
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Use
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── css/
│   └── main.css            # Complete stylesheet
├── js/
│   └── main.js             # All JavaScript
├── blog/
│   ├── index.html          # Blog index
│   └── post-template.html  # Blog post template
├── mind/
│   ├── index.html          # Mind pillar home
│   ├── positive-affirmations.html
│   ├── building-confidence.html
│   ├── manifestation.html
│   └── mental-health.html
├── body/
│   ├── index.html          # Body pillar home
│   ├── yoga.html
│   └── body-movements.html
├── mindfulness/
│   ├── index.html          # Mindfulness pillar home
│   ├── meditation.html
│   ├── breathing.html      # Includes interactive timer
│   ├── relaxation.html
│   └── self-hypnosis.html
└── inputs/
    ├── index.html          # Inputs pillar home
    ├── food.html
    ├── sounds.html         # Includes audio players
    └── music.html
```

## Features

- **Dark mode** by default with elegant lavender/sage/gold palette
- **Fully responsive** — mobile, tablet, and desktop
- **Interactive breathing timer** — 4 patterns (4-4-4, 4-7-8, Box, Calm)
- **Custom audio players** on the sounds page
- **Affirmation shuffle** with copy-to-clipboard
- **Contact form** via Formspree (update your email)
- **Fade-up scroll animations** throughout
- **SEO ready** — meta tags, sitemap, robots.txt
- **No frameworks** — pure HTML, CSS, vanilla JavaScript

## Setup Before Deploying

### 1. Update your Formspree endpoint
Open `contact.html` and replace the form action:
```html
<!-- Change this: -->
<form action="https://formspree.io/your-email" ...>
<!-- To this (after creating a free Formspree account): -->
<form action="https://formspree.io/f/YOUR_FORM_ID" ...>
```

### 2. Update Facebook Group link
Search for `#facebook-group-link` across all files and replace with your actual Facebook Group URL.

### 3. Update your domain in sitemap.xml
Replace `https://livingtheailife.com` with your actual domain.

### 4. Add real audio files (optional)
On `inputs/sounds.html`, replace `src="#"` on each `<audio>` element with real `.mp3` or `.ogg` file paths or CDN URLs.

---

## Deploying to Netlify (Drag & Drop)

1. Zip the entire `living-the-ai-life` folder
2. Go to [netlify.com](https://netlify.com) and sign in (free account)
3. Click **"Add new site"** → **"Deploy manually"**
4. Drag and drop the zip file onto the deploy area
5. Your site is live! Netlify gives you a random URL (e.g., `amazing-name-123.netlify.app`)
6. In Site Settings → Domain Management, add your custom domain

**For clean URLs on Netlify**, add a `netlify.toml` at the root:
```toml
[[redirects]]
  from = "/*"
  to = "/:splat"
  status = 200
```

---

## Deploying to Vercel (via Git)

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Living the AI Life website"
   git remote add origin https://github.com/YOUR_USERNAME/living-the-ai-life.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repository
4. Vercel auto-detects it as a static site — click **Deploy**
5. Your site is live at `your-repo-name.vercel.app`
6. Add your custom domain in Project Settings → Domains

---

## Customization Tips

- **Colors**: Edit CSS custom properties at the top of `css/main.css` (`:root { ... }`)
- **Fonts**: Change the Google Fonts import link in `main.css`
- **Logo**: Replace `Living the AI Life` text in nav/footer with an `<img>` tag
- **Blog posts**: Duplicate `blog/post-template.html` for each new post
- **Analytics**: Add Google Analytics or Plausible script before `</body>`

---

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No libraries or frameworks
- **Google Fonts** — Cormorant Garamond + Inter
- **Formspree** — Contact form backend (free tier available)

---

*Built with love for the Living the AI Life brand. Ancient wisdom, amplified by AI.*
