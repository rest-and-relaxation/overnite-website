# Overnite Studio

Responsive single-page studio website built from the supplied [Figma design](https://www.figma.com/design/MKMUYOaFjLXSU3qMVyBMBU/ON?node-id=62-13660).

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` for a production build.

## Implementation notes

- The page uses local Figma logos, icons, Handjet, and IBM Plex Mono files in `public/assets`.
- The featured work uses the supplied 2026 Present Company reel as an H.264/AAC MP4 with a local poster image. It is prepared for streaming and loaded on demand.
- GSAP animates the hero and scroll reveals, with reduced-motion support.
- The desktop composition follows the 1920px Figma frame. Mobile layouts adapt the same content at narrow widths.
- Instagram is shown as text until an official Overnite Studio profile URL is provided.

## Team workflow

The Mastermind reviewed the Figma design and assets, delegated bounded frontend implementation to one native agent (requested model `gpt-6-sol`; execution model not independently verified), then integrated and checked desktop and mobile browser output.
