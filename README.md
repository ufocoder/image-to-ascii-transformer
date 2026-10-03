# Image to ASCII Transformer

[![Deploy project](https://github.com/ufocoder/image-to-ascii-transformer/actions/workflows/build.yml/badge.svg)](https://github.com/ufocoder/image-to-ascii-transformer/actions/workflows/build.yml)

A browser-based image-to-ASCII converter built with SolidJS. It supports static images and animated GIFs, with Canvas and plain-text output modes.

## Features

- Convert PNG, JPEG, and GIF images to ASCII.
- Preserve animated GIF frame delays, transparency, and disposal behavior.
- Keep the original and transformed GIF previews synchronized.
- Choose between two scale modes:
  - one source pixel per ASCII character;
  - output matching the source image dimensions.
- Render monochrome ASCII with custom text and background colors.
- Render characters using their source pixel colors.
- Keep transparent source areas transparent instead of converting them to characters.
- Select an individual GIF frame in text mode.
- Download the result as PNG, JPEG, animated GIF, or plain text.
- Process intermediate canvases with `OffscreenCanvas` when supported, with an HTML Canvas fallback.

## Usage

1. Upload an image or select one of the included presets.
2. Choose Canvas or Text output.
3. Configure scale, font size, colors, and transparency handling.
4. For animated GIFs in Text mode, choose the frame to preview.
5. Download the transformed result.

## Development

Node.js 24 is recommended.

```bash
npm ci
npm run dev
```

The development server is available at `http://localhost:3000/image-to-ascii-transformer/`.

### Available commands

```bash
npm run dev      # Start the development server
npm run lint     # Run Oxlint
npm run build    # Create a production build
npm run serve    # Preview the production build
```

## Technology

- [SolidJS](https://www.solidjs.com/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [gifuct-js](https://github.com/matt-way/gifuct-js) for GIF decoding
- [omggif](https://github.com/deanm/omggif) for GIF encoding

## Credits

Inspired by [Coding Challenge 166: ASCII Text Images](https://www.youtube.com/watch?v=55iwMYv8tGI).

The default cat image is from [Iconfinder](https://www.iconfinder.com/icons/7000035/pet_breed_halloween_animal_cat_icon).

## License

MIT
