# 💕 Romantic Surprise Website

A beautiful, animated romantic website built with **Vite + React**.

---

## 📁 Project Structure

```
romantic-surprise/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── heart-icon.svg          ← browser tab favicon
└── src/
    ├── main.jsx
    ├── App.jsx                  ← routing + entry overlay + music
    ├── index.css                ← global CSS variables & resets
    ├── assets/
    │   ├── images/              ← 📸 PUT YOUR COUPLE PHOTOS HERE
    │   │   ├── photo1.jpg
    │   │   ├── photo2.jpg
    │   │   └── ...
    │   └── audio/               ← 🎵 PUT YOUR MUSIC FILE HERE
    │       └── romantic.mp3
    └── components/
        ├── LandingPage.jsx      ← hero section + gallery
        ├── Gallery.jsx          ← slideshow + mosaic + lightbox
        ├── LoveLetter.jsx       ← envelope reveal + letter
        ├── FloatingHearts.jsx   ← animated hearts overlay
        └── AudioPlayer.jsx      ← music player (bottom-right)
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:5173
```

---

## 🖼️ Adding Your Couple Photos

1. Copy your photo files into **`src/assets/images/`**
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Recommended: 6–8 photos, ideally landscape or square

2. Open **`src/components/LandingPage.jsx`**

3. Find the imports section near the top and uncomment/add your photos:
   ```js
   import photo1 from '../assets/images/photo1.jpg'
   import photo2 from '../assets/images/photo2.jpg'
   import photo3 from '../assets/images/photo3.jpg'
   // add more as needed
   ```

4. Update the `photos` array in the same file:
   ```js
   const photos = [
     { src: photo1, alt: 'Our first date 🌹' },
     { src: photo2, alt: 'Summer together ☀️' },
     { src: photo3, alt: 'My favourite smile 💕' },
     // add more...
   ]
   ```

---

## 🎵 Adding Your Romantic Music

1. Copy your music file into **`src/assets/audio/`**
   - Recommended format: `.mp3` (best browser support)
   - File name: `romantic.mp3` (or update the import below)

2. Open **`src/components/AudioPlayer.jsx`**

3. Find this section near the top:
   ```js
   // Comment out this import if you haven't added audio yet:
   // import musicSrc from '../assets/audio/romantic.mp3'

   // Fallback: use a royalty-free public URL for testing
   const musicSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
   ```

4. Swap it to use your local file:
   ```js
   import musicSrc from '../assets/audio/romantic.mp3'
   // (remove or comment out the fallback const line above)
   ```

> **💡 Music Autoplay Note:** Browsers block autoplay until the user interacts.  
> That's why there's an entry overlay ("Open Your Surprise 💕") — clicking it  
> both unlocks audio and starts the music. This is the correct, browser-friendly approach.

---

## 💌 Personalising the Love Letter

Open **`src/components/LoveLetter.jsx`** and find the `LETTER_LINES` array:

```js
const LETTER_LINES = [
  "My dearest love,",         // greeting
  "Your first paragraph...",
  "Your second paragraph...",
  // ...
  "Forever yours,",           // sign-off
  "Your name 💕",
]
```

Edit any line to make it personal. Each string becomes its own paragraph,  
with the first and last two lines styled differently (larger, cursive font).

---

## 🎨 Customising Colors

Open **`src/index.css`** and edit the CSS variables at the top:

```css
:root {
  --rose:       #e8a0b4;   /* soft pink accents */
  --rose-deep:  #c2185b;   /* buttons, glows    */
  --gold:       #d4a853;   /* gold decorations  */
  --dark:       #1a0810;   /* page background   */
  /* ... */
}
```

---

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile phones (375px+)
- 📟 Tablets (768px+)  
- 🖥️ Desktop (1200px+)

All font sizes and layout dimensions use `clamp()` for fluid scaling.

---

## 🏗️ Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder — upload it to any static host  
(Netlify, Vercel, GitHub Pages, etc.) for free hosting.

---

## 🌹 Pages

| Route    | Description                                      |
|----------|--------------------------------------------------|
| `/`      | Landing hero + floating hearts + photo gallery   |
| `/letter`| Envelope with wax seal → animated love letter   |

---

Made with ❤️ using React + Vite + Framer Motion
