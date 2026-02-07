# Content & Social Media Tools Implementation Plan

This document outlines the technical implementation details for the Content & Social Media category tools. All tools must be entirely client-side (static) and use the recommended libraries.

---

## 1. Social Media Image Resizer (`img-resizer`)
**Goal**: Crop and resize images for popular social media dimensions.  
**Tech Stack**: 
- `react-image-crop` (Interactive cropping UI)
- `canvas` (Rendering output)

**User Flow**:
1. User uploads an image.
2. Select Platform: "Instagram", "Twitter", "Facebook", "LinkedIn".
3. Select Format: "Square (1:1)", "Portrait (4:5)", "Landscape (16:9)", "Story (9:16)".
4. Cropper overlay appears with locked aspect ratio. User adjusts crop area.
5. "Download Resized Image" (Downloads high-quality JPEG/PNG).

**Key Challenges**:
- Maintaining image quality during resize operations.

---

## 2. Video Script Outliner (`video-outline`)
**Goal**: Structure video content using proven storytelling frameworks.
**Tech Stack**: Pure React Logic.

**User Flow**:
1. User inputs Topic/Title.
2. Choose Framework: "Educational (How-to)", "Storytelling (Hero's Journey)", "Review/Comparison".
3. System generates editable text blocks: "Hook (0-5s)", "Intro (5-15s)", "Body (Key Points)", "CTA".
4. User edits each block directly.
5. "Copy Full Script" or "Download TXT".

---

## 3. Instagram Grid Preview (`ig-grid`)
**Goal**: Visualize how 9-12 posts will look together on a profile grid.
**Tech Stack**: `react-dnd` (Drag and drop) or HTML5 Drag/Drop API.

**User Flow**:
1. Upload multiple images (limit 12).
2. Images appear in a 3-column grid mimicking Instagram UI.
3. User can **drag and swap** images to reorder them.
4. Purpose: Planning the aesthetic flow. No export needed, purely a visual planner.

---

## 4. Hashtag Manager & Counter (`hashtag-manager`)
**Goal**: Organize, count, and save hashtag groups.  
**Tech Stack**: `localStorage`.

**User Flow**:
1. Text area for paste/typing hashtags.
2. Real-time stats: "Hashtag Count: 15/30" (Color turns red if >30).
3. "Format" buttons: "Remove Duplicates", "Add Spaces", "Lowercase All".
4. "Save Group" -> Modal to name the group (e.g. "Travel Monday").
5. Saved groups list displayed below for quick copy.

---

## 5. Video Aspect Ratio Calc (`aspect-ratio`)
**Goal**: Calculate dimensions (width/height) based on aspect ratio.  
**Tech Stack**: Math Logic.

**User Flow**:
1. Input: Width (px).
2. Select Ratio: 16:9, 4:3, 21:9, 9:16.
3. Output: Corresponding Height (px).
4. Conversely, input Height to get Width.

---

## 6. Caption Formatter (`caption-fmt`)
**Goal**: Add invisible line breaks to Instagram captions for clean spacing.  
**Tech Stack**: String Manipulation (Zero-width Space `\u200B` or similar).

**User Flow**:
1. Text area input. User types with normal Enter keys.
2. "Convert & Copy" button.
3. System replaces standard newlines with Instagram-friendly invisible separators.
4. User pastes into Instagram.

---

## 7. YouTube Thumbnail Preview (`yt-thumbnail`)
**Goal**: Preview how a thumbnail looks on YouTube (Dark/Light mode, Desktop/Mobile).  
**Tech Stack**: React Components mimicking YouTube UI.

**User Flow**:
1. Upload Thumbnail Image (1280x720).
2. Enter Video Title, Channel Name, View Count.
3. Toggle "Dark Mode" / "Light Mode".
4. Toggle "Sidebar" / "Homepage" view.
5. Render the thumbnail in context (surrounded by fake YouTube interface).

---

## 8. Podcast Episode Planner (`podcast-planner`)
**Goal**: Structure a podcast episode with timings.  
**Tech Stack**: Dynamic List/Form.

**User Flow**:
1. Sections: "Intro Music (15s)", "Host Intro", "Guest Bio", "Interview Questions (List)", "Ads/Sponsor", "Outro".
2. User adds/removes sections and estimates duration.
3. Total Estimated Duration is summarised at the top.
4. "Export Agenda" (TXT/PDF).

---

## 9. TikTok Viral Hook Ideas (`tiktok-hooks`)
**Goal**: Database of high-performing opening hooks.  
**Tech Stack**: Local JSON Data + Category Filter.

**User Flow**:
1. Filter: "Educational", "Shocking", "Storytime", "Listicle".
2. Display card list (e.g., "Stop doing THIS if you want...", "I tried X so you don't have to").
3. "Shuffle" button.
4. Copy text.

---

## 10. Emoji Keyboard/Picker (`emoji-picker`)
**Goal**: Search and copy emojis easily on desktop.  
**Tech Stack**: `emoji-picker-react` (Library) or custom JSON optimization.

**User Flow**:
1. Search bar (e.g. "rocket", "fire").
2. Grid of emojis updates instantly.
3. Click an emoji -> Copies to clipboard.
4. "Recent" section stores last 10 clicked emojis in `localStorage`.

---

## 11. Online Teleprompter (`teleprompter`)
**Goal**: Auto-scrolling script reader.  
**Tech Stack**: `requestAnimationFrame` for smooth scrolling.

**User Flow**:
1. **Editor Mode**: Text area to paste script. Settings for Font Size, Speed (WPM).
2. **Prompter Mode** (Full Screen):
   - Text displays large, high contrast (White on Black).
   - "Start" button begins auto-scroll.
   - Speed slider adjustable while scrolling.
   - "Mirror" toggle (Flip horizontal) for use with physical teleprompter glass.

**Key Challenges**:
- Smooth scrolling logic (avoid jittery CSS/JS updates).
- Keeping screen awake (Wake Lock API if supported).

---

## 12. Watermark Tool (`watermark-tool`)
**Goal**: Add logo/text watermark to images.  
**Tech Stack**: `canvas` API.

**User Flow**:
1. Upload Base Image.
2. Upload Watermark Image OR Type Text.
3. Controls: Opacity, Position (9-grid selector: Top-Left, Center, etc), Scale, Rotation.
4. Live Preview on Canvas.
5. "Download Watermarked Image".
