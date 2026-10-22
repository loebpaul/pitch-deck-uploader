# Pitch Deck Uploader

## Overview

This is an application which accepts a PDF file upload, converts the PDF to individual png images, and then displays the result for the user as an image gallery.

## Demo

[Demo Screen Recording](https://www.loom.com/share/23b2bf603d41450ba94165a01b00031f)

## Installing Pre-Requests

Requirements: Node.js, npm

### Ubuntu:

`sudo apt-get install imagemagick graphicsmagick`

### Mac:

`brew install imagemagick && brew install graphicsmagick`

## Running the server

This will launch both the backend Node.js server and the front-end react/next application

```
npm install
yarn stack
```

## Viewing the application

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Runtime and verification

Use Node.js 22 or newer. `npm run server` uses the built-in Node watcher.
`npm test` exercises the actual upload handler in a fresh private fixture: missing/malformed multipart requests and a synthetic file upload. PDF conversion is stubbed for this HTTP contract; it does not validate an installed GraphicsMagick/Ghostscript conversion stack. Synthetic outputs remain under `artifacts/`. `npm run build` validates the Next.js frontend.
