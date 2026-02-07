# Design & Visual Tools Implementation Plan

This document outlines the technical implementation details for the Design & Visual category tools. All tools must be entirely client-side (static) and use the recommended libraries.

---

## 1. Color Palette Generator (`palette-gen`)
**Goal**: Create harmonious color schemes based on a seed color.  
**Tech Stack**: 
- `chroma-js` or `tinycolor2` (Color manipulation).
- Canvas/SVG for export.

**User Flow**:
1. User picks a Base Color (Input HEX/RGB or Color Picker).
2. Select Method: "Monochromatic", "Analogous", "Complementary", "Triadic".
3. System generates 5-swatch palette based on rules.
4. Each swatch shows HEX code. Click to copy.
5. "Lock" icon on swatches to keep them while changing others (optional).
6. "Export as PNG/CSS" button.

---

## 2. Contrast Ratio Checker (`contrast-check`)
**Goal**: Ensure text meets WCAG accessibility standards (AA/AAA).  
**Tech Stack**: `chroma-js`.

**User Flow**:
1. Input Foreground Color (Text).
2. Input Background Color.
3. Live Preview: Text on Background.
4. Calculation: Contrast Ratio (e.g., "4.5:1").
5. Grading:
   - WCAG AA Small Text: Pass/Fail.
   - WCAG AAA Large Text: Pass/Fail.
6. Suggestion: "Your text is too light, try color X instead."

---

## 3. CSS Gradient Maker (`gradient-maker`)
**Goal**: Visual editor for linear and radial gradients.  
**Tech Stack**: Pure React State.

**User Flow**:
1. Visual Gradient Bar with "Stops" (draggable points).
2. Click Bar to add stop. Click stop to change color. Drag stop to change position %.
3. Controls: Angle (0-360deg), Type (Linear/Radial).
4. Output: Generated CSS code block (`background: linear-gradient(...)`).
5. Copy to Clipboard.

---

## 4. CSS Shadow Maker (`shadow-maker`)
**Goal**: Create complex, layered box-shadows.  
**Tech Stack**: Pure React State.

**User Flow**:
1. Preview Box (Cube/Card) in center.
2. Sliders: X Offset, Y Offset, Blur Radius, Spread Radius.
3. Color Picker (Shadow Color & Opacity).
4. Toggle: "Inset" / "Outset".
5. Layering: "Add Another Shadow" button to stack effects (comma-separated CSS).
6. Output: CSS code block.

---

## 5. SVG Placeholder Generator (`svg-placeholder`)
**Goal**: Create geometric SVG placeholders for prototyping.  
**Tech Stack**: SVG construction string.

**User Flow**:
1. Input: Width, Height.
2. Enter Text (e.g. "Logo").
3. Background Color, Font Color, Font Size.
4. Live Preview.
5. Output: "Copy Data URI" (for `src="..."`) or "Download SVG".

---

## 6. Image-to-WebP Converter (`webp-conv`)
**Goal**: Convert JPG/PNG to WebP in browser.  
**Tech Stack**: HTML5 `canvas.toDataURL('image/webp')`.

**User Flow**:
1. Dropzone for multiple files.
2. Quality Slider (e.g. 80%).
3. Process button -> Loops through files, draws to canvas, exports as WebP.
4. Display original vs new size (e.g. "Saved 40%!").
5. "Download All" (Zip file via `jszip`).

**Key Challenges**:
- Managing memory for large batch conversions.
- Creating Zip file client-side.

---

## 7. SVG Icon Viewer/Editor (`icon-viewer`)
**Goal**: Inspect, recolor, and optimize uploaded SVG files.  
**Tech Stack**: XML Parser or String replacement.

**User Flow**:
1. User uploads SVG file.
2. Preview large version.
3. Controls: Change Fill Color, Stroke Color, Stroke Width.
4. "Optimize" toggle (Remove unnecessary metadata via regex).
5. Output: View Source Code / Download Modified SVG.

---

## 8. Font Pairer Suggestions (`font-pairer`)
**Goal**: Display curated pairings of Google Fonts.  
**Tech Stack**: `react-google-font-loader`.

**User Flow**:
1. Select Theme: "Modern", "Classic", "Fun", "Minimal".
2. Display Heading (Font A) + Body (Font B) examples.
3. User creates custom: Select Heading Font from dropdown, Select Body Font.
4. Visual preview with sample paragraphs.
5. "Get Code" -> Shows `<link>` tag and CSS font-family rules.

---

## 9. Favicon Generator (`favicon-gen`)
**Goal**: Create `.ico` and PNG icons from image or text.  
**Tech Stack**: `canvas` -> standard image formats.

**User Flow**:
1. **Source**: "Upload Image" OR "Text/Emoji".
2. **Text Mode**: Choose Background Color (Circle/Square/Rounded), Font, Letter ("S").
3. **Upload Mode**: Crop to square.
4. **Generate**: Creates 16x16, 32x32, 180x180 (Apple Touch), 192x192 (Android).
5. "Download Package" (Zip).

---

## 10. Image Filters & Effects (`image-filters`)
**Goal**: Apply CSS filters (and bake them) to images.  
**Tech Stack**: `canvas` `filter` property or pixel manipulation.

**User Flow**:
1. Upload Image.
2. Preset filters: "Grayscale", "Sepia", "Vintage", "Bright".
3. Custom Sliders: Brightness, Contrast, Saturation, Blur, Hue.
4. "Compare" button (Hold to see original).
5. "Download" (Applies filters to canvas 2D context and saves).

---

## 11. Aspect Ratio Calculator (`aspect-calc`)
**Goal**: Calculate missing dimension based on ratio.  
**Tech Stack**: Math.

**User Flow**:
1. (Similar to Video Aspect Ratio tool but focused on design/UI).
2. Common UI Ratios: 4:3, 16:9, 1:1, 1.618 (Golden Ratio).
3. Input Width -> Get Height.
4. Visual representation of rectangle shape.

---

## 12. Pixel to REM Converter (`pixel-rem`)
**Goal**: Quick conversion for responsive CSS units.  
**Tech Stack**: Simple Math.

**User Flow**:
1. Base Font Size Input (Default: 16px).
2. Input Pixels -> Output REM.
3. Input REM -> Output Pixels.
4. Two-way binding (typing in either box updates the other).
5. Quick Reference Table (10px, 12px, 14px... to REM).
