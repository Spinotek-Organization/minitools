# Office & Admin Tools Implementation Plan

This document outlines the technical implementation details for the Office & Admin category tools. All tools must be entirely client-side (static) and use the recommended libraries.

---

## 1. PDF Merge/Split (`pdf-merge`)
**Goal**: Combine or extract pages from PDFs purely in browser.  
**Tech Stack**: 
- `pdf-lib` (Most lightweight for manipulation).

**User Flow**:
1. Dropzone for multiple files.
2. Drag and drop reordering of files.
3. Split Mode: Upload 1 file -> "Extract Page X to Y" (e.g. 1-3).
4. Merge Mode: Combine all uploaded files.
5. "Download Merged PDF" or "Download Split Pages (Zip)".

**Key Challenges**:
- Dealing with corrupted or password-protected PDFs (Show explicit error).

---

## 2. Word Counter (`word-counter`)
**Goal**: Real-time stats on text.  
**Tech Stack**: Pure Regex `str.match(/\S+/g)`.

**User Flow**:
1. Large Textarea.
2. Live Stats Bar: Words, Characters (with/without spaces), Sentences, Paragraphs.
3. Reading Time estimate (Standard 200 wpm).
4. Keyword Density (Top 5 repeated words) listed below.

---

## 3. Lorem Ipsum Generator (`lorem-gen`)
**Goal**: Generate placeholder text.  
**Tech Stack**: Local Array / `lorem-ipsum` package.

**User Flow**:
1. Count Input: Number of Paragraphs/Sentences/Words.
2. Type: "Standard Lorem", "Hipster Ipsum", "Corporate Ipsum".
3. Toggle: "Start with 'Lorem ipsum dolor sit amet'".
4. Output Text Area.
5. "Copy" button.

---

## 4. Batch Search & Replace (`batch-replace`)
**Goal**: Find/Replace text across multiple lines or a large block.  
**Tech Stack**: Pure JS `replaceAll()`.

**User Flow**:
1. Source Text Area.
2. Find Input, Replace Input.
3. Options: "Case Sensitive", "Use Regex", "Whole Words Only".
4. "Replace All" -> Live Update.
5. Highlight changed words (optional).
6. "Original/Modified" toggle view.

---

## 5. Roman Numeral Converter (`roman-conv`)
**Goal**: Convert Integers <-> Roman Numerals.  
**Tech Stack**: Math Logic.

**User Flow**:
1. Two Inputs: Arabic Digital (1, 2, 3) and Roman (I, II, III).
2. Typing in one updates the other instantly.
3. Validation: Prevent invalid Roman chars (e.g. IIII -> IV).

---

## 6. Signature Pad (`signature-pad`)
**Goal**: Draw signature and save as transparent PNG.  
**Tech Stack**: `react-signature-canvas`.

**User Flow**:
1. Canvas Area.
2. Pen Controls: Color (Black/Blue/Red), Thickness.
3. Clear Button.
4. "Save as PNG" (transparent background) / "Save as SVG".

---

## 7. Alphabetical Sorter (`sort-list`)
**Goal**: Organize lists.  
**Tech Stack**: `Array.sort()`, `localeCompare`.

**User Flow**:
1. Paste List (Line separated).
2. Sort Options: A-Z, Z-A, Length (Short-Long), Randomize.
3. Clean Options: "Trim Whitespace", "Remove Duplicates", "Remove Empty Lines".
4. Output Area.

---

## 8. Duplicate Line Remover (`remove-duplicates`)
**Goal**: Clean up lists.  
**Tech Stack**: `Set` or `filter`.

**User Flow**:
1. Input Text Area.
2. "Remove Duplicates" button.
3. Stats: "Removed X duplicate lines. Original: Y lines -> New: Z lines."
4. Case Sensitivity toggle.

---

## 9. Case Converter (`case-converter`)
**Goal**: Change text casing.  
**Tech Stack**: String methods.

**User Flow**:
1. Input Text Area.
2. Buttons: "UPPERCASE", "lowercase", "Title Case", "Sentence case", "kebab-case", "snake_case".
3. Instant update.
4. Copy to Clipboard.

---

## 10. Markdown Editor (`md-editor`)
**Goal**: Write Markdown with live preview.  
**Tech Stack**: 
- `react-markdown` (Renderer).
- `github-markdown-css`.

**User Flow**:
1. Split Pane: Editor (Left), Preview (Right).
2. Editor Syntax Highlighting (optional).
3. Toolbar: Bold, Italic, Link, Image, Quote, Code Block.
4. Sync Scroll (scrolling editor scrolls preview).

---

## 11. CSV to JSON Converter (`csv-to-json`)
**Goal**: Convert formats.  
**Tech Stack**: `papaparse`.

**User Flow**:
1. Upload CSV or Paste Text.
2. Options: "Header Row included?", "Transpose".
3. Output: JSON formatted text.
4. "Minify JSON" toggle.
5. Download `.json`.

---

## 12. Number to Words (`num-to-words`)
**Goal**: Convert numbers to written text (Indonesian/English).  
**Tech Stack**: Custom recursive function for "Terbilang".

**User Flow**:
1. Input Number (e.g., 12500).
2. Language: ID (Indonesian) / EN (English).
3. Output: "Dua belas ribu lima ratus" / "Twelve thousand five hundred".
4. Format Currency Mode: "Rp 12,500.00" -> "Dua belas ribu lima ratus Rupiah".
