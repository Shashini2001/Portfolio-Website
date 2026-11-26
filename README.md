# Shashini Ruwanthika | 3D Portfolio

An interactive 3D portfolio website for **Shashini Ruwanthika**, an AI / ML Engineer, IT undergraduate and software developer. It shows my projects, skills and education in a smooth-scrolling page with a 3D character sitting at a desk.

> Live demo: _add your link here after deploying_

---

## Features

- **3D character scene** - an animated character at a desk that follows the mouse and reacts while you scroll.
- **Smooth scrolling** - GSAP ScrollSmoother with scroll-driven animations.
- **3D PC loading screen** - a CSS 3D computer shows the loading progress, then the camera zooms into the screen.
- **Horizontal "My Work" section** - 10 projects, each with a short description, tools and a GitHub link.
- **3D tech stack** - a neat grid of 21 glossy balls (Python, Java, Kotlin, C++, Go, Ballerina, TensorFlow, Docker and more) that bounce into place and move away from the mouse.
- **Skills section** - category tabs (AI / ML, Languages, Frameworks & Tools, Networking & Security, Databases & Deployment), a search box and an icon grid.
- **Certificates & Activities** - tabbed cards taken from the CV.
- **Open to internships** badge in the Contact and CV sections.
- **Download my CV** button and a **Contact** section.
- Responsive layout: the full 3D experience on desktop, a lighter layout on small screens.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | GSAP (ScrollTrigger, ScrollSmoother, SplitText), `@gsap/react` |
| Icons / UI | React Icons, React Fast Marquee |
| Hosting | Vercel |

## Getting started

### Requirements

- [Node.js](https://nodejs.org) (LTS version)
- npm (comes with Node.js)

### Install and run

```bash
# 1. open the project folder
cd Portfolio-Website

# 2. install the packages
npm install

# 3. start the development server
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:5173`). On small windows the 3D character is hidden, so use a window wider than **1024px** to see the full scene.

### Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Type-checks and builds the site into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Project structure

```text
Portfolio-Website/
├── public/
│   ├── models/
│   │   ├── character.glb        # source 3D model (Blender export)
│   │   ├── character.enc        # encrypted model that the site loads
│   │   ├── encrypt.cjs          # turns character.glb into character.enc
│   │   └── char_enviorment.hdr  # lighting / reflections
│   ├── draco/                   # Draco decoder files
│   ├── images/projects/         # project thumbnails (01.svg - 10.svg)
│   └── Shashini_Ruwanthika_CV.pdf
├── src/
│   ├── components/
│   │   ├── Character/           # 3D character, animations, mouse + scroll logic
│   │   ├── Landing.tsx          # name and title
│   │   ├── About.tsx
│   │   ├── WhatIDo.tsx          # AI / ML and DEVELOP boxes
│   │   ├── Career.tsx           # education and journey
│   │   ├── Skills.tsx           # skill categories + icon grid
│   │   ├── Learning.tsx         # certificates and activities
│   │   ├── Work.tsx             # horizontal project section
│   │   ├── TechStack.tsx        # 3D ball grid
│   │   ├── CvSection.tsx        # Download my CV button
│   │   ├── Contact.tsx
│   │   ├── Loading.tsx          # 3D PC loading screen
│   │   └── styles/              # one CSS file per component
│   ├── main.tsx
│   └── index.css
└── index.html
```

## Customising the content

| I want to change... | Edit this file |
| --- | --- |
| Name and title on the first screen | `src/components/Landing.tsx` |
| About text | `src/components/About.tsx` |
| Skills boxes | `src/components/WhatIDo.tsx` |
| Skills grid (categories, icons) | `src/components/Skills.tsx` |
| Certificates and activities | `src/components/Learning.tsx` |
| Education / journey | `src/components/Career.tsx` |
| Projects, descriptions and links | the `projects` list at the top of `src/components/Work.tsx` |
| Project thumbnails | `public/images/projects/` |
| Tech stack balls | the `techs` list at the top of `src/components/TechStack.tsx` |
| Email, GitHub, LinkedIn | `Contact.tsx`, `SocialIcons.tsx`, `Navbar.tsx` |
| Page title | `index.html` |

### Updating the CV

Replace `public/Shashini_Ruwanthika_CV.pdf` with your own PDF and keep the **same file name**. The button in `CvSection.tsx` downloads that file.

### Changing the 3D character

1. Edit the model in Blender and export it as **glTF Binary (.glb)** with animations turned on.
2. Save it as `public/models/character.glb`.
3. Encrypt it so the site can load it:
   ```bash
   cd public/models
   node encrypt.cjs
   cd ../..
   ```
4. Run `npm run dev` and refresh the browser with `Ctrl + Shift + R`.

The code looks for some names inside the model, so keep them when you export:

| Name | Used for |
| --- | --- |
| `spine005`, `spine006` | neck and head bones (mouse follow and scroll movement) |
| `Plane004` (material `Material.027`) | the monitor |
| `screenlight` | the screen light |
| `introAnimation` | main character animation |
| `Blink` (optional) | eye blink animation |
| `key1` ... `key6` (optional) | keyboard key animations |

> Do not compress the model with Draco unless `public/draco/` contains the full decoder (`draco_wasm_wrapper.js`, `draco_decoder.js` and `draco_decoder.wasm`). A missing decoder makes the loading screen stop at about 92%.

## Deploying

The site works well on [Vercel](https://vercel.com):

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Use the defaults (Framework: Vite, Build command: `npm run build`, Output: `dist`).

## Troubleshooting

- **`npm install` fails with `ETIMEDOUT` for `npm.greensock.com`** - an old `package-lock.json` points to a server that no longer exists. Delete `package-lock.json` and `node_modules`, then run `npm install` again.
- **`'vite' is not recognized`** - the install did not finish. Run `npm install` again and wait until it ends.
- **Loading stays at about 92%** - the 3D model could not be decoded. Check the browser console (`F12`) and see the Draco note above.
- **Sections overlap while scrolling in development** - make sure React `StrictMode` is not used in `src/main.tsx`. It runs effects twice and breaks the pinned "My Work" section.
- **Character does not appear** - use a window wider than 1024px and press `Ctrl + Shift + R`.

## Credits

- Portfolio template and scene structure are based on an open-source 3D portfolio by **Moncy** ([moncy.dev](https://www.moncy.dev)). Please read that repository's license and README, and keep the credit it asks for.
- 3D character, desk and environment models: _add the model names, authors and licenses here._
- Animation library: [GSAP](https://gsap.com). The project currently installs `gsap-trial`; check GSAP's current license terms and switch to the standard `gsap` package before a public release.
- Built with [React](https://react.dev), [Three.js](https://threejs.org) and [Vite](https://vite.dev).

## Contact

- Email: [shashiniruwanthika607@gmail.com](mailto:shashiniruwanthika607@gmail.com)
- GitHub: [github.com/Shashini2001](https://github.com/Shashini2001)
- LinkedIn: [Ranasinghe Arachchige Shashini Ruwanthika](https://www.linkedin.com/in/ranasinghe-arachchige-shashini-ruwanthika-54a1962a6/)