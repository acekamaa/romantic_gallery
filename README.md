# Romantic Gallery

A responsive photo gallery for collecting and browsing shared memories. The gallery supports category filters and a full-screen photo viewer with keyboard and touch navigation.

## Requirements

- Node.js and npm

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Using the gallery

- Choose **All memories** or a category button to filter the photos.
- Select a photo to open it in the viewer.
- Use the close button, click the backdrop, or press `Escape` to close the viewer.
- Move between photos with the previous/next buttons, the left/right arrow keys, or horizontal swipes on a touch screen.
- On mobile, the viewer accounts for screen safe areas and uses touch-sized controls.

## Adding photos

Place image files in a category folder under `src/assets/images/`. The gallery automatically discovers `.jpg`, `.jpeg`, `.png`, and `.webp` files in these folders.

```text
src/assets/images/
├── birthdays/
├── day1/
├── randoms/
└── valentines/
```

The folder name becomes the photo's category. The current filter buttons are configured in `src/components/Gallery.js`; add a button entry there if you introduce a new category folder. Photos currently receive generated alt text based on their category and have no captions by default.

## Project structure

```text
src/
├── assets/images/       # Gallery photos, grouped by category
├── components/
│   ├── Gallery.js       # Filter controls and photo grid
│   └── Lightbox.js      # Modal photo viewer and navigation
├── data/
│   ├── Photo.js         # Photo data model
│   └── gallery.js       # Image discovery and photo data
├── styles/main.css      # Responsive gallery and viewer styles
└── main.js              # App entry point and event handling
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
