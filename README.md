<img width="2932" height="1488" alt="image" src="https://github.com/user-attachments/assets/63cc432b-e566-4941-8068-d9ccd66a3a75" />

# Greeting New Tab (Firefox Extension)

A minimal Firefox extension that replaces the default new tab page with a friendly greeting and a live, locale-aware clock. It lets you set your display name and a profile name, which are saved in browser storage. A small toolbar popup is included for quick edits.

## Features

- New Tab override with a clean greeting view.
- Live clock formatted using your browser locale.
- Customizable user name and profile name (persisted via `storage`).
- Toolbar popup to quickly update values.
- In-page settings menu and dialog to change the username.
- Minimal permissions (only `storage`).

## How It Works

- `manifest.json` (MV3) overrides the New Tab page to `newtab.html` and defines a toolbar popup (`popup.html`).
- `newtab.js` renders the greeting and a ticking clock, reading values from `browser.storage.local`.
- Styling is handled in `style.css` and shared by both pages.

## File Structure

- `manifest.json` — WebExtension manifest (v3).
- `newtab.html`, `newtab.js` — New Tab UI and logic.
- `popup.html`, `popup.js` — Toolbar popup UI and logic.
- `style.css` — Shared styles.
- `icon.png`, `github-brands-solid-full.svg` — Icons.

## Install (Temporary in Firefox)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click “Load Temporary Add-on…”.
3. Select this project’s `manifest.json`.
4. Open a new tab to see the greeting.

Note: Temporary add-ons are unloaded when Firefox restarts. For day‑to‑day development use the steps below; for distribution, see Packaging.

## Usage

- Open a new tab to view the greeting and clock.
- Click the toolbar icon to open the popup and set:
  - Name (`username`)
  - Profile name (`profile_name`)
- Alternatively, on the New Tab page, click the settings button to open the in-page menu and change the username via the dialog.

## Development

- Recommended: use `web-ext` for a fast dev loop (auto‑reload).
  - Install: `npm install -g web-ext`
  - Run in Firefox: `web-ext run`
  - Build a distributable: `web-ext build`

Edits to `newtab.*` or `style.css` are picked up on reload. Values are stored with `browser.storage.local` and will persist between sessions.

## Packaging / Signing (Optional)

- Build an unsigned package: `web-ext build` (artifacts go to `web-ext-artifacts/`).
- To publish on AMO, sign with your AMO credentials:
  - `web-ext sign --api-key <AMO_JWT_ISSUER> --api-secret <AMO_JWT_SECRET>`

## Requirements

- Firefox with WebExtension MV3 support (Firefox 109+ recommended).
- No special build steps required for basic use.

## Permissions

- `storage` — used to save `username` and `profile_name` locally.

## Notes

- The clock uses `navigator.language` when available, defaulting to `es-ES` for formatting.
- If you customize links or icons in the footer of `newtab.html`, update the `href` as needed.

