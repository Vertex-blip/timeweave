# How Timeweave works

The browser loads `index.html`, the shared workspace controller in `app.js`, and the product-specific screens and actions in `product.js`. There is no application server, build pipeline, or runtime package dependency.

- **product.js** defines the form schema, illustrative seed data, views, domain validation, and actions.
- **app.js** manages navigation, modal forms, local storage, safe backup import/export, installation, and announcements.
- **ui.js** provides escaped HTML helpers, icons, and local-date utilities.
- **core.js** contains pure calculations. Tests run with Node’s built-in runner.
- **styles.css** implements responsive layout, visual identity, and reduced-motion support.
- **sw.js** precaches the complete app shell. Cache names are product-specific so other Pages apps on the same origin are not deleted.

## Data lifecycle

Interaction → schema/domain validation → in-memory workspace → localStorage → rerender. Backups include an application identifier and version; cross-product files are rejected. Import is size-limited and replaces the workspace only after an explicit confirmation. Text is HTML-escaped before rendering.

## Offline and updates

A successful first visit caches all runtime resources. The service worker uses a versioned cache-first shell. Increment its cache version with each deployment that changes runtime files. On activation, only older caches belonging to this product are removed. Offline use depends on the browser retaining site storage.

## Limits

Local storage is not encrypted or synchronized. This is a single-person workspace, not a multi-user backend. Keep exported backups for important data. Illustrative sample data is clearly labeled in the UI.
