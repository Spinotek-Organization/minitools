# Security & Privacy Tools Implementation Plan

This document outlines the technical implementation details for the Security & Privacy category. All tools must be entirely client-side (static).

---

## 1. Strong Password Generator (`password-gen`)
**Goal**: Create secure, random passwords.
**Tech Stack**: `crypto.getRandomValues()` (Web Crypto API) for true randomness.

**User Flow**:
1. Length Slider (8 - 64+).
2. Options: 
   - A-Z (Uppercase)
   - a-z (Lowercase)
   - 0-9 (Numbers)
   - !@# (Symbols)
   - Avoid Ambiguous (O/0, l/1)
3. "Generate" button.
4. "Copy" button.
5. Visual feedback: Password Strength Metre (Green/Red).

---

## 2. Password Strength Checker (`password-strength`)
**Goal**: Estimate password crack time.
**Tech Stack**: `zxcvbn` (Dropbox's library) is best, but large. Suggest finding a lighter alternative or port.

**User Flow**:
1. Input Password (masked by default, toggle visibility).
2. Output:
   - Score (0-4): Very Weak -> Very Strong.
   - Crack Time Estimate: "2 days", "300 years".
   - Feedback: "Add more numbers," "Don't use dictionary words."

---

## 3. Subnet Calculator (`subnet-calc`)
**Goal**: IP Addressing and CIDR calculations.
**Tech Stack**: Bitwise operations (`<<`, `>>`, `&`, `|`).

**User Flow**:
1. Input IP Address (e.g. `192.168.1.10`).
2. Input Subnet Mask (CIDR `/24` or dotted `255.255.255.0`).
3. Output Table:
   - Network Address (`192.168.1.0`)
   - Broadcast Address (`192.168.1.255`)
   - First Host IP
   - Last Host IP
   - Total Hosts (254)
   - Binary Representation (Bit view).

---

## 4. Fake Identity Generator (`fake-identity`)
**Goal**: Generate mock PII data for testing.
**Tech Stack**: `faker-js` (or similar lightweight mock library).

**User Flow**:
1. Country/Locale Selection (US, UK, ID, etc.).
2. Gender (Male/Female/Random).
3. "Generate" button creates a Profile Card:
   - Name, Address, Phone, Email (fake), Job, Birthday.
   - Credit Card Number (Failed Luhn check / test numbers only).
   - Avatar (generated from `ui-avatars.com` or similar).

---

## 5. Email Spam Trigger Checker (`spam-checker`)
**Goal**: Identify risky words in email copy.
**Tech Stack**: Curated array of "Spam Words" (e.g. "Free", "Win", "$$$", "Act Now").

**User Flow**:
1. Textarea: Paste Email Subject + Body.
2. Highlight any word matching the blacklists.
3. Score: "Low Risk" (Green) -> "High Risk" (Red).
4. Suggestions: "Don't use ALL CAPS in Subject."

---

## 6. Secret Note (`secret-note`)
**Goal**: Encrypt a message locally and generate a link to decrypt it (Client-side usage).
**Tech Stack**: `AES-GCM` encryption via `Web Crypto API`.
*Note: True "One-time view" requires a server to delete the note. Since we are static, we can only do "Encrypted Link" where the decryption key is in the URL hash part (`#key=...`) so the server never sees it. But we cannot guarantee "Self-Destruct" without a backend database. We should rename this to **"Encrypted Link Generator"** or similar.*

**Revised User Flow (Static Friendly)**:
1. Input Secret Message.
2. Enter Password (Key).
3. "Encrypt" -> Generates ciphertext.
4. Output: A long text block of ciphertext that can be sent manually. (Simpler/Safer than URL hash method for pure static).

---

## 7. IP Address Checker (`ip-checker`)
**Goal**: Display user's public IP.
**Tech Stack**: `fetch('https://api.ipify.org?format=json')`.

**User Flow**:
1. On Load -> "Checking...".
2. Result: "Your IP is: 202.x.x.x".
3. Show ISP / Location (using `ip-api.com` free tier - non-commercial only!).
4. Map view (Leaflet/Mapbox optional).

---

## 8. Browser Info Fingerprint (`browser-fingerprint`)
**Goal**: Show what the browser reveals.
**Tech Stack**: `navigator` object + Canvas Fingerprinting (basic).

**User Flow**:
1. Grid of information:
   - User Agent string
   - Screen Resolution (Width x Height)
   - Color Depth
   - Timezone
   - Language
   - Plugins installed
   - Do Not Track status
   - Canvas Fingerprint Hash (Unique-ish ID).

---

## 9. HTTP Header Analyzer (`header-analyzer`)
**Goal**: Inspect Request Headers.
**Tech Stack**: Server-echo service (like `httpbin.org/headers`).

**User Flow**:
1. Button: "Analyze My Headers".
2. Fetch `https://httpbin.org/headers`.
3. Display JSON response:
   - `User-Agent`
   - `Accept-Language`
   - `Sec-Ch-Ua` (Client Hints)
   - `Referer`

---

## 10. Password Hash Generator (`password-hash`)
**Goal**: Hash a string (Bcrypt, Argon2, SHA).
**Tech Stack**: `bcryptjs` (Pure JS implementation) or `hash-wasm` (for Argon2).

**User Flow**:
1. Input Password.
2. Select Algorithm: Bcrypt (Default cost 10), SHA-256, SHA-512, MD5.
3. Salt: Auto-generated or custom.
4. "Hash" button.
5. Output string (`$2a$10$...`).

---

## 11. 2FA Code Generator (`2fa-gen`)
**Goal**: Generate TOTP codes (Google Authenticator style) from a secret key.
**Tech Stack**: `otpauth` or `otplib`.

**User Flow**:
1. Input Secret Key (Base32, e.g. `JBSWY3DPEHPK3PXP`).
2. "Add Account".
3. List of active codes (updating every 30s with a progress circle).
4. No QR scanning (webcams are tricky), just Key input.
