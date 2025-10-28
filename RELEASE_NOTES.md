# Release Notes

This project follows a simple, human‑readable changelog. Versions aim to be SemVer‑ish. New entries go under Unreleased until a version is cut.

## Unreleased

### Added
- Background customization in Settings: choose Default gradient, Solid color, or upload an Image. Stored in browser storage and applied across sessions.

### Changed
- Minor i18n text mappings to support new Background settings.

---

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
