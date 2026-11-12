# NDM Extension Patch — Ignore Lists

## What This Is
A patched version of the Neat Download Manager browser extension (v1.9.92) with two
configurable ignore lists:

1. **Domains** — never intercept anything from these sites.
2. **File types** — never intercept these extensions, on any site.

This prevents NDM from grabbing `.data` files (and similar) that sites serve during
normal page navigation.

## Problem
NDM's extension intercepts any request that looks like a download (by URL extension,
content-type, or content-disposition). Sites like `commandcode.ai` serve `.data` files
while you browse, and NDM treats them as downloads.

## Files
| File | Purpose |
|---|---|
| `ignore-lists.js` | **The config.** Both lists, heavily commented. |
| `bg.js` | Patched service worker (original kept as `bg-original.js`) |
| `options.html` / `options.js` / `options.css` | Options page for editing both lists |
| `manifest.json` | Adds the options page |

## How to Load
1. `brave://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → select this folder (the one containing `manifest.json`)
4. **Disable the original NDM extension** (two copies will fight)

## How to Add Entries

### Option A — Options page
`brave://extensions` → Details → **Extension options**.
Two boxes: ignored domains, blocked file types. Save each.

### Option B — Edit the file
Open `ignore-lists.js`, edit either array, reload the extension.

```js
var DEFAULT_IGNORE_DOMAINS = [
  'commandcode.ai',   // whole site
];

var DEFAULT_BLOCKED_EXTENSIONS = [
  'data',             // any .data file, any site
];
```

## How Matching Works
- **Domains:** exact or subdomain match. `example.com` covers `api.example.com`.
- **File types:** compared against the URL filename, the `Content-Type`, and the
  `Content-Disposition` filename. `data` and `.data` are equivalent.
- Defaults and user-added entries are merged; defaults cannot be removed via the
  options page (edit the file to change them).

## Pre-Populated
- Domain: `commandcode.ai`, `api.commandcode.ai`
- File type: `data`

## How to Revert
Delete the unpacked extension in `brave://extensions` and re-enable the original.

## Troubleshooting
- **Still intercepting?** Reload the extension; check `brave://extensions` for errors.
- **A file type you need got blocked?** Remove it from `ignore-lists.js` and reload.
- **Both extensions active?** Disable the original NDM extension.

## Backup
Original service worker preserved as `bg-original.js`.

## License
The patch, ignore-list config, and options page are released under the [MIT License](LICENSE).
The original Neat Download Manager extension code (`bg-original.js`, `ct.js`, `manifest.json`
key, icons) remains the property of its respective author.
