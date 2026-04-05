# Release Notes

This project follows a simple, human‑readable changelog. Versions aim to be SemVer‑ish. New entries go under Unreleased until a version is cut.

## Unreleased

_No notable changes yet._

---

## 1.0.9 — Feature flags, productivity widgets, and directional layout

### Added
- Developer Feature Flags panel (`Ctrl+Shift+D`) with persistent toggles for weather, background customization, animations, clock, profile, debug mode, pinned tabs, and recent history.
- Pinned Tabs module on New Tab with up to 4 quick links, placeholders, mini add dialog, and settings management.
- Recent History module (up to 8 visited sites) with runtime permission request flow.
- Monthly calendar card in the up-expanded view.
- Background image overlay opacity slider.
- Optional `history` permission in `manifest.json` to support recent-history rendering.

### Changed
- Main layout now supports directional expansion (up for calendar, down for tabs/history) with chevron controls and `ArrowUp`/`ArrowDown` keyboard shortcuts.
- Settings dialog now includes dedicated sections/subtitles for background, weather, and pinned tabs.
- When expanded down, profile text is mirrored in the header for better context.

### Fixed
- i18n copy/translation consistency for new UI sections and controls.
- Feature flag and directional state handling refinements in `newtab.js` (stability and behavior cleanup).

---

## 1.0.8 — Version header and coord fixes

### Added
- Display current extension version in the Settings dialog header.

### Fixed
- Validation for invalid latitude/longitude values.
- More reliable saving of settings.

---

## 1.0.7 — Responsive dialog and backgrounds

### Added
- Background customization in Settings: choose Default gradient, Solid color, or upload an Image. Stored in browser storage and applied across sessions.

### Changed
- Settings dialog layout is responsive across viewports.
- Minor i18n text mappings to support new Background settings.

## 1.0.6 — Initial notes

### Added
- New Tab override with greeting and live, locale‑aware clock.
- Settings dialog: username, profile name, and weather controls (enable/disable, latitude, longitude, units, optional API base).
- Weather integration using Open‑Meteo (host permission required).
- English and Spanish i18n for UI labels and messages.
- Respect user’s reduced‑motion preference and optional “Disable animations” toggle.
- Animated soft gradient background.


# Release Process (suggested)

- Update `manifest.json` version.
- Move items from Unreleased into a new version heading with today’s date.
- Build with `web-ext build` and test via `web-ext run`.
- Tag the commit in VCS if desired.
