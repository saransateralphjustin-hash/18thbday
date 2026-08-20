# Renzy Jewel Saransate — 18th Birthday Invitation

A one-page, responsive invitation site in an olive-green & deep-brown palette: hero,
welcome letter, a live countdown (accurate to Philippine Time), celebration & venue
details, story section, photo gallery with lightbox, the full entourage (18 Roses, 18
Candles, 18 Treasurers, 18 Blue Bills, 18 Shots), order of events, dress code, and an
RSVP section that links to a Google Form.

It's plain HTML/CSS/JS — no build step, no dependencies — so it deploys to Vercel in minutes.

## 1. Connect your Google Form (required)

The RSVP section is set up for a Google Form but needs your real form's link:

1. Create your form at [forms.google.com](https://forms.google.com) with the fields you
   want (Name, Number of Guests, Attendance, Message, etc).
2. Click **Send** → the link icon → copy the short link. This is what you'll use for the button.
3. For the embedded version: click **Send** → the `< >` (embed) icon, copy the `src="..."`
   URL from the `<iframe>` code Google gives you.
4. In `index.html`, find the RSVP section and replace both placeholders:
   ```html
   <a class="btn-solid" id="rsvpFormLink" href="https://forms.google.com/" ...>
   ```
   → paste your real form link as the `href`.
   ```html
   <iframe id="rsvpEmbed" src="https://docs.google.com/forms/d/e/PLACEHOLDER_FORM_ID/viewform?embedded=true" ...>
   ```
   → replace with the embed `src` Google gave you.

If you'd rather not embed the form inline, you can delete the whole `.rsvp-embed-wrap`
block and keep just the "Open RSVP Form" button.

## 2. Double-check the details

Already filled in from what you provided — search `index.html` for these if anything changes:

- Celebrant: Renzy Jewel Saransate, 18th Birthday, **September 12, 2026, Saturday, 6:00 PM**
- Venue: Lex Forum Function Hall, Andrade Subdivision, Yumang Street, General Santos City
- Countdown target: `data-date="2026-09-12T18:00:00+08:00"` — the `+08:00` locks it to
  Philippine Time, so the countdown is accurate for every visitor regardless of their own timezone.
- Dress code: Olive green or deep brown for guests; black for the 18 Roses / Candles /
  Treasurers / Blue Bills / Shots.
- Entourage names: all five groups (18 Roses, 18 Candles, 18 Treasurers, 18 Blue Bills,
  18 Shots) are listed in full under the "Entourage" section.

Replace photos: every image on the page is currently a soft gradient placeholder block
(`.photo-frame` and `.g-item` elements) so nothing copyrighted is baked in. To use real photos:

1. Drop your image files into the `images/` folder.
2. In `index.html`, replace a placeholder div, e.g.:
   ```html
   <div class="photo-frame photo-frame--a"><span>Photo</span></div>
   ```
   with:
   ```html
   <img class="photo-frame photo-frame--a" src="images/your-photo.jpg" alt="Description" />
   ```
   The CSS already sizes `.photo-frame` as a framed rectangle, so an `<img>` with that class
   will drop right in.

## 3. Push the project to GitHub

Open a terminal in this project folder and run:

```bash
git init
git add .
git commit -m "Initial commit — Renzy's 18th birthday invitation site"
```

Create a new **empty** repository on GitHub (no README/license, so it stays empty):
[github.com/new](https://github.com/new)

Then connect and push (replace `YOUR-USERNAME` and `YOUR-REPO`):

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## 4. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (you can sign in with your GitHub account).
2. Click **Add New… → Project**.
3. Select **Import Git Repository**, and choose the repo you just pushed.
4. Vercel will detect it as a static site — no framework, no build command needed.
   Leave the settings as-is (Framework Preset: **Other**, Build Command: empty,
   Output Directory: empty) and click **Deploy**.
5. In under a minute you'll get a live URL like `your-repo.vercel.app`.

## 5. Updating the site later

Any time you edit files and want the live site to update:

```bash
git add .
git commit -m "Update details"
git push
```

Vercel automatically redeploys on every push to `main` — no extra steps.

## 6. Custom domain (optional)

In the Vercel project, go to **Settings → Domains** and add your own domain
(e.g. `renzyjewel18.com`). Vercel will show you the DNS records to add
at your domain registrar.

## Project structure

```
index.html        the whole page
css/style.css      all styling
js/script.js       countdown, scroll animations, gallery lightbox
images/            put your real photos here
```
