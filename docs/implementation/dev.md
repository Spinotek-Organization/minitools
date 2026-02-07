# Developer Tools Implementation Plan

This document outlines the technical implementation details for the Developer Kit category. All tools must be entirely client-side (static).

---

## 1. JSON Formatter/Validator (`json-formatter`)
**Goal**: Beautify, minify, and validate JSON data.
**Tech Stack**: Native `JSON.parse` / `JSON.stringify`.

**User Flow**:
1. Input Area: Paste JSON.
2. Actions: "Format" (Indentation: 2 spaces/4 spaces/Tab), "Minify" (Remove whitespace).
3. Output Area: Highlighted JSON (using `prismjs` or simple `<pre>`).
4. Error Handling: If invalid, show precise error message ("Unexpected token at line X").
5. "Copy" / "Download .json".

---

## 2. Base64 Encoder/Decoder (`base64-codec`)
**Goal**: Encode/Decode text or files to Base64 strings.
**Tech Stack**: `btoa()` / `atob()` (Text), `FileReader` (Images).

**User Flow**:
1. Two Tabs: "Text" and "Image/File".
2. **Text Mode**: Input Text -> Output Base64 string. Toggle "Encode" / "Decode".
3. **Image Mode**: Upload file -> Output `data:image/png;base64,...` string.
4. Preview the image if decoding.

---

## 3. Regex Tester (`regex-tester`)
**Goal**: Test regular expressions against sample text.
**Tech Stack**: Native `RegExp()`.

**User Flow**:
1. Input: Regex Pattern (e.g., `/[a-z]+/g`) and Flags (`g`, `i`, `m`).
2. Input: Test String.
3. Output: Highlight matches in the test string.
4. Cheatsheet: Sidebar with common patterns (Email, Phone, Date).

---

## 4. HTML Entity Encoder (`html-encoder`)
**Goal**: Convert special characters to HTML entities (`<` -> `&lt;`).
**Tech Stack**: String replacement or DOM API.

**User Flow**:
1. Input Text.
2. Toggle: "Encode (Special chars only)" / "Encode All" / "Decode".
3. Output Text.

---

## 5. URL Encoder/Decoder (`url-encoder`)
**Goal**: Percent-encode URLs for safe transmission.
**Tech Stack**: `encodeURIComponent()` / `decodeURIComponent()`.

**User Flow**:
1. Input Box.
2. Real-time encoding/decoding as user types (two-way binding).
3. "Copy" button.

---

## 6. JWT Debugger (`jwt-debug`)
**Goal**: Decode JWT tokens to inspect payload (Header, Payload, Signature).
**Tech Stack**: `jwt-decode` (library) or manual base64 decoding of parts.

**User Flow**:
1. Input: JWT Token string.
2. Output:
   - Header (Algorithm, Type).
   - Payload (User ID, Expiry, Scope).
   - Signature (Status: "Signature Verified" requires secret key input - optional feature).
3. Human-readable dates (convert 'exp' timestamp to Date).

---

## 7. SQL Formatter (`sql-formatter`)
**Goal**: Beautify messy SQL queries.
**Tech Stack**: `sql-formatter` (library).

**User Flow**:
1. Input: Minified/Messy SQL.
2. Select Dialect: Standard SQL, MySQL, PostgreSQL.
3. Output: Indented, uppercase keywords.

---

## 8. MD5/SHA256 Hasher (`hash-gen`)
**Goal**: Generate cryptographic hashes.
**Tech Stack**: `crypto-js` or `Web Crypto API`.

**User Flow**:
1. Input Text.
2. Output fields for multiple algos simultaneously: MD5, SHA-1, SHA-256, SHA-512.
3. Click to copy specific hash.

---

## 9. UUID/ULID Generator (`uuid-gen`)
**Goal**: Generate unique identifiers.
**Tech Stack**: `uuid` (library), `ulid`.

**User Flow**:
1. Input: Quantity (1 - 100).
2. Type: UUID v4 (Random), UUID v1 (Time-based), ULID (Sortable).
3. "Generate" button.
4. Output: List of IDs.
5. "Copy All" button.

---

## 10. Crontab Guru (`crontab-guru`)
**Goal**: Explain and generate Cron schedule expressions.
**Tech Stack**: `cronstrue` (library).

**User Flow**:
1. Input: Cron expression `* * * * *`.
2. Output: Human readable "At every minute".
3. Visual Editor: Select Minutes, Hours, Days, Months via UI checkboxes.

---

## 11. Diff Checker (`diff-checker`)
**Goal**: Compare two text blocks for differences.
**Tech Stack**: `diff` (library) or `jspad`.

**User Flow**:
1. Input Left (Original).
2. Input Right (Modified).
3. Output: Unified or Split view highlighting added (Green) and removed (Red) lines/chars.

---

## 12. Javascript Minifier (`js-minifier`)
**Goal**: Minify JS code.
**Tech Stack**: `terser` (browser version) or simple regex replacers (less robust).

**User Flow**:
1. Input Javascript code.
2. "Minify" button.
3. Output minified code.
4. Stats: "Original: 5kb, Minified: 3kb (40% smaller)".
