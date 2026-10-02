# dayarathna-store

Official storefront and merchandise portal for Shashika Dayarathna, deployed at [store.dayarathna.com](https://store.dayarathna.com).

## Scope & Status

This repository hosts the public concept space for future engineering references, architecture schematics, and developer goods.

- **Current Status**: Concept space in preparation. No products or digital items are offered for sale at this time.
- **Checkout Policy**: Checkout and payment processing are disabled. No transactions or orders are accepted on this domain.

## Architecture

- **Stack**: Pure semantic HTML5, pure CSS3, and vanilla ES6+ JavaScript.
- **Visual System**: Celestial space aesthetic matching `dayarathna.com`, dark palette (`#070a10`), neon lime accents (`#c7f44a`), typography (`DM Sans`, `IBM Plex Mono`, `Instrument Serif`), and HTML5 Canvas starfield.
- **Dependencies**: Zero runtime dependencies, zero build steps.
- **Hosting**: Firebase Hosting targeting site `shashika-dev-store` under project `shashika-dev`.

## Edit Workflow

1. To update storefront concepts or policies, edit `index.html`.
2. Static product photography or graphics belong in `public/`.
3. Preview locally with any static HTTP server (`python -m http.server 8080`).

## Deployment

Deploy strictly to the dedicated store hosting site:

```sh
npx firebase-tools deploy --only hosting:store --project shashika-dev
```

## Maintainer

Maintained by Shashika Dayarathna. Main portfolio: [https://dayarathna.com](https://dayarathna.com).
