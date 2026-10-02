# dayarathna-store

Official storefront and merchandise portal for Shashika Dayarathna, deployed at [store.dayarathna.com](https://store.dayarathna.com).

## Scope & Status

This repository hosts the public showcase for future digital artifacts, engineering schematics, and official brand goods.

- **Current Status**: Storefront in preparation. No products or items are actively offered for sale.
- **Checkout Policy**: Checkout, payments, and shopping carts are disabled. No commercial transactions are accepted until physical production runs or release packages are certified.

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
