# Excella Braids — Development README

This repository contains a React + Vite site styled with Tailwind CSS. A minimal Java static-file server is included under `src/main/java` if you prefer to serve built files via Java.

## Frontend — Local development (recommended)

- Install dependencies:

```bash
npm install
```

- Start the Vite dev server (hot reload):

```bash
npm run dev
```

Open the local URL printed by Vite (default `http://localhost:5173/`; Vite will try the next free port if that one is in use).

- Tailwind CSS

Build compiled CSS once:

```bash
npm run build:css
```

Watch and auto-build while developing (run in a separate terminal):

```bash
npm run watch:css
```

- Build production bundle (Vite):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Optional: Java static server

If you want to compile and run the included Java server to serve static files:

```bash
javac -d out src/main/java/com/hair/Server.java
java -cp out com.hair.Server
```

Then open `http://localhost:8080`.

## Notes & troubleshooting

- If Vite reports a port in use it will try the next port (e.g., 5174, 5175). Check the terminal output for the actual URL.
- Make sure to run `npm run build:css` or `npm run watch:css` so Tailwind utilities are available if using the legacy static build.

## Recent changes (developer notes)

- Added a Ken Burns hero animation and a cohesive dark theme.
- Improved header/navigation visuals and responsive mobile sheet.
- Accessibility improvements: `Select` supports Arrow keys / Enter / Escape; mobile sheet closes on Escape and focuses the close button when opened.
- Visual polish: hover lift/scale/shadow on `Button` and `Card`, image hover zoom on product/gallery images.

## Next recommended steps

- Visual QA: visit the dev URL and review pages for color/contrast and spacing consistency.
- Optimize images for production (resize/compress, use WebP or AVIF where appropriate).
- Consider creating a small deployment guide (Vercel/Netlify/GitHub Pages) if you want automated deploys.

If you want, I can commit these changes and add a short changelog or deployment instructions.
