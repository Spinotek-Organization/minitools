# Marketing & SEO Tools Implementation Plan

This document outlines the technical implementation details for the Marketing & SEO category. All tools must be entirely client-side (static).

---

## 1. UTM Link Builder (`utm-builder`)
**Goal**: Generate tracking URLs for Google Analytics.
**Tech Stack**: `URLSearchParams` API.

**User Flow**:
1. Input: Website URL (Required).
2. Input: Source (e.g. `google`), Medium (e.g. `cpc`), Campaign (e.g. `summer_sale`), Content, Term (Optional).
3. "Generate Link" -> Updates the URL string live.
4. "Shorten URL" -> External call (Optional, requires API, default to `bit.ly` linker text).
5. "Copy" button.

---

## 2. Google SERP Preview (`serp-preview`)
**Goal**: Visualize how a page looks in search results.
**Tech Stack**: Pure React/CSS (Mimicking Google UI).

**User Flow**:
1. Input: SEO Title, Meta Description, URL/Breadcrumb, Favicon (Upload or default).
2. Preview Box (Desktop) & Preview Box (Mobile) side-by-side or tabbed.
3. Character Count Progress Bar:
   - Title: Recommended < 60 chars (Warn if exceeded aka truncated).
   - Desc: Recommended < 160 chars (Warn if exceeded).
4. Bold keywords in description if they match title words (optional).

---

## 3. Article Text Analyzer (`text-analyzer`)
**Goal**: Analyze readability, keyword density, and word count from pasted text.
**Tech Stack**: String analysis logic.

**User Flow**:
1. Large Textarea: Paste article draft.
2. Stats Panel: Word Count, Character Count, Reading Time (200wpm), Speaking Time (130wpm).
3. "Keyword Density" Table: Top 1-word, 2-word, 3-word phrases with frequency count and percentage.
4. "Readability Score": Simple Flesch-Kincaid implementation (optional).

---

## 4. Meta Tag Generator (`meta-gen`)
**Goal**: Create HTML `<meta>` tags for SEO.
**Tech Stack**: String templates.

**User Flow**:
1. Form: Title, Description, Keywords (comma separated), Author, Viewport settings.
2. Output: Code block:
   ```html
   <meta name="description" content="...">
   <meta name="keywords" content="...">
   ```
3. "Copy to Clipboard".

---

## 5. Twitter/X Thread Counter (`tweet-counter`)
**Goal**: Split long text into tweet-sized chunks.
**Tech Stack**: String split logic.

**User Flow**:
1. Input: Long text.
2. Output: Multiple cards, each max 280 characters.
3. Numbering automatically added (1/X, 2/X).
4. "Copy All" button.

---

## 6. Link Cleaner / Stripper (`link-cleaner`)
**Goal**: Remove tracking params (`utm_source`, `fbclid`, `gclid`) from URLs.
**Tech Stack**: `URL` API + whitelist of params to keep.

**User Flow**:
1. Input: Dirty URL (e.g., `example.com?utm_source=...`).
2. Output: Clean URL (`example.com`).
3. Explanation: List of parameters removed.

---

## 7. Robots.txt Generator (`robots-gen`)
**Goal**: Create `robots.txt` file instructions.
**Tech Stack**: String builder.

**User Flow**:
1. Section 1: Default User-Agent `*`. Allow/Disallow paths.
2. Section 2: Add specific User-Agents (Googlebot, Bingbot).
3. Section 3: Input Sitemap URL.
4. Output: Formatted text file content.
5. "Download robots.txt".

---

## 8. URL List to Sitemap (`url-sitemap`)
**Goal**: Convert a list of links into XML Sitemap format.
**Tech Stack**: String template (XML).

**User Flow**:
1. Textarea: Paste list of URLs (one per line).
2. Options: Default Frequency (weekly/daily), Default Priority (0.8).
3. Processing: Wrap each URL in `<url><loc>...</loc>...</url>`.
4. Output: Valid XML string.
5. "Download sitemap.xml".

---

## 9. Social Post Mockup (`social-mockup`)
**Goal**: Preview posts on LinkedIn, Twitter, Facebook.
**Tech Stack**: React components styling.

**User Flow**:
1. Tab Selector: LinkedIn / Twitter / Facebook.
2. Input: Profile Name, Avatar (Upload), Post Text, Post Image (Upload).
3. Preview Area: Renders the post exactly as it looks on the platform (fonts, colors, spacing).
4. "Download Mockup Image" (html2canvas).

---

## 10. Ad Copy Character Counter (`ad-counter`)
**Goal**: Validate text length for Google Ads / Meta Ads limits.
**Tech Stack**: Simple length checks.

**User Flow**:
1. Platform Selector: "Google Search Ad" / "Facebook Feed Ad".
2. **Google Mode**:
   - Headline 1 (Max 30)
   - Headline 2 (Max 30)
   - Headline 3 (Max 30)
   - Description 1 (Max 90)
   - Description 2 (Max 90)
3. Visual validation: Inputs turn red if limit exceeded.
4. Live Preview of the Ad unit.

---

## 11. Headline Analyzer (`headline-analyzer`)
**Goal**: Score headlines based on emotional/power words.
**Tech Stack**: Local dictionary of "Power Words".

**User Flow**:
1. Input: Headline.
2. Analyze Button.
3. Score (0-100).
4. Breakdown:
   - "Common Words" (20%)
   - "Uncommon Words" (10%)
   - "Emotional Words" (Tree, Secret, Powerful) -> Adds points.
   - "Power Words" (Desperate, Free, Help) -> Adds points.
5. Suggestions: "Add more emotional words to increase CTR."

---

## 12. Slug Generator (`slug-gen`)
**Goal**: Convert titles to URL-friendly slugs.
**Tech Stack**: `slugify` or regex.

**User Flow**:
1. Input: "Hello World! This is a Title (2024)".
2. Output: `hello-world-this-is-a-title-2024`.
3. Options: separator (`-` or `_`), remove numbers, remove stop words (a/the/and).
