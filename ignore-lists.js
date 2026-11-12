// ============================================
// NDM Extension — Ignore Lists
// ============================================
// Two independent lists:
//
//   1. DOMAINS    — never intercept anything from these sites.
//   2. FILE TYPES — never intercept these extensions, on any site.
//
// Edit either list below, then reload the extension in Brave
// (brave://extensions → refresh icon).
//
// You can also use the options page:
//   brave://extensions → Details → Extension options
// ============================================


// ---- 1. DOMAINS ----
// Subdomains match automatically: 'example.com' also covers 'api.example.com'.
var DEFAULT_IGNORE_DOMAINS = [
  // Confirmed problematic — serves .data files during page navigation.
  'commandcode.ai',
  'api.commandcode.ai',

  // Add your own below:
  // 'raw.githubusercontent.com',
  // 'gist.githubusercontent.com',
];


// ---- 2. FILE TYPES ----
// Extensions only. The dot is optional ("data" and ".data" both work).
// Checked against the URL filename, the Content-Type, and the
// Content-Disposition filename.
//
// Careful: these apply on EVERY site, so only list extensions you never
// want a download manager to grab.
var DEFAULT_BLOCKED_EXTENSIONS = [
  'data',   // API routes like /settings/billing.data (commandcode.ai)

  // Common ones people hit — uncomment if they get grabbed:
  // 'csv',
  // 'log',
  // 'bin',
  // 'yaml',
  // 'toml',
];


if (typeof self !== 'undefined') {
  self.DEFAULT_IGNORE_DOMAINS = DEFAULT_IGNORE_DOMAINS;
  self.DEFAULT_BLOCKED_EXTENSIONS = DEFAULT_BLOCKED_EXTENSIONS;
}
if (typeof window !== 'undefined') {
  window.DEFAULT_IGNORE_DOMAINS = DEFAULT_IGNORE_DOMAINS;
  window.DEFAULT_BLOCKED_EXTENSIONS = DEFAULT_BLOCKED_EXTENSIONS;
}
