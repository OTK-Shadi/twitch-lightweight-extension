# Lightweight Twitch Stream Extension

A small Chrome extension that opens Twitch channels in the lightweight embedded player (`player.twitch.tv`) instead of the full Twitch page.

## What it does

- Detects the active tab and checks whether you are on a Twitch channel page.
- Pre-fills the streamer name when a Twitch channel is detected.
- Lets you enter any streamer name manually from the popup.
- Opens the stream in a new tab using Twitch's embed player URL.

## Project structure

- `manifest.json` – Extension metadata, permissions, and entry points.
- `popup.html` – Popup UI and styles.
- `popup.js` – Popup behavior (tab detection + open stream actions).
- `background.js` – Background listener for extension action clicks.

## Install locally (Chrome)

1. Download or clone this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select this project folder.

## How to use

1. Click the extension icon.
2. If you are on a Twitch channel page, use the detected quick action.
3. Or type a streamer name manually.
4. Click **Open Stream** (or press Enter).

## Notes

- Current implementation builds the player URL with `parent=localhost`.
- Twitch embed rules may require changing the `parent` parameter depending on environment/host expectations.

## Version

Current extension version is `1.0`.
