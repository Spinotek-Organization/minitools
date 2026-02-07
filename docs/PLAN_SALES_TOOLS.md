# Sales & Customer Support Tools Implementation Plan

This document outlines the technical implementation details for the Sales & Customer Support category tools. All tools must be entirely client-side (static) and use the recommended libraries.

---

## 1. WhatsApp Direct Link (`wa-direct`)
**Goal**: Create direct WhatsApp links (`wa.me`) without saving numbers, including pre-filled messages.
**Tech Stack**: Pure Typescript/React (String Manipulation).

**User Flow**:
1. User selects Country Code (Searchable dropdown, e.g. +62).
2. User enters Phone Number.
3. User enters optional Message (supporting line breaks).
4. System generates link: `https://wa.me/62812...?text=Encoded%20Message`.
5. Actions:
   - "Open Chat" (New Tab).
   - "Copy Link".
   - "Generate QR Code" (optional cross-link).

**Key Challenges**:
- Formatting phone numbers (auto-removing '0' prefix if country code is selected).
- URL encoding for special characters in messages.

---

## 2. Email Signature Generator (`email-sig`)
**Goal**: Build HTML email signatures compatible with Gmail, Outlook, etc.
**Tech Stack**: Pure React + Clipboard API.

**User Flow**:
1. **Form Input (Left Side)**:
   - Personal: Name, Title, Email, Phone.
   - Company: Name, Website, Address, Logo URL.
   - Social: LinkedIn, Twitter, Instagram links.
   - Style: Font, Color Theme.
2. **Live Preview (Right Side)**: Renders the HTML table structure.
3. User clicks "Copy Signature" -> Copies the rendered HTML (rich text) to clipboard.
4. Instructions modal: "How to paste this into Gmail settings".

**Key Challenges**:
- Using archaic HTML `<table>` layouts for email client compatibility.
- Avoiding external CSS classes; styles must be inline.

---

## 3. Cold Email Templates (`cold-email`)
**Goal**: Provide proven cold email templates with copy-paste functionality.
**Tech Stack**: Local JSON Data + Search.

**User Flow**:
1. Category Filter: "Intro", "Follow-up", "Re-engagement".
2. Display list of template cards.
3. User clicks a template -> Opens modal or expands.
4. Template has placeholders like `[First Name]`, `[Company]`.
5. "Copy" button specifically copies the body text.

---

## 4. Sales Script Generator (`sales-script`)
**Goal**: Generate script outlines based on sales methodology (SPIN, AIDA).
**Tech Stack**: Pure React Logic.

**User Flow**:
1. User inputs: Product Name, Target Audience, Key Pain Point, Key Benefit.
2. User Selects Framework: "Cold Call", "Gatekeeper", "Objection Handling".
3. System replaces placeholders in pre-written script structures.
4. Output: A readable script script tailored to the input.

---

## 5. Time Zone Converter (`tz-converter`)
**Goal**: Find suitable meeting times across multiple time zones.
**Tech Stack**: `date-fns` or `luxon`.

**User Flow**:
1. "My Time": Auto-detects user's local time.
2. "Add Location": User adds 1 or more cities (e.g. London, New YorK).
3. Slider UI: Dragging the slider changes the time for ALL locations simultaneously.
4. Visual indicators: "Business Hours" (Green), "Night" (Gray).
5. Output: "Copy Meeting Slot" (e.g. "Meeting at 2 PM Jakarta / 8 AM London").

**Key Challenges**:
- Handling Daylight Saving Time automatically (Library handles this).

---

## 6. Meeting Agenda Builder (`meeting-agenda`)
**Goal**: Create structured agendas to ensure productive meetings.
**Tech Stack**: Pure React + `jspdf` (optional).

**User Flow**:
1. Form: Meeting Title, Date, Attendees.
2. Sections: "Objective", "Discussion Points" (Dynamic List), "Action Items".
3. Preview shows a clean, professional document layout.
4. "Copy as Text" (for email/Slack) or "Download PDF".

---

## 7. Price Quote Generator (`price-quote`)
**Goal**: Generate a simple estimation quote for services.
**Tech Stack**: Similar to Invoice Generator (`jspdf`).

**User Flow**:
1. Very similar to Invoice Generator but labeled "QUOTATION" or "ESTIMATE".
2. Includes fields for "Valid Until" date.
3. Disclaimer footer: "This is an estimate, final price may vary."

---

## 8. Follow-up Reminder Calc (`followup-calc`)
**Goal**: Calculate strategic dates for follow-up emails (Fibonacci/Spaced Repetition).
**Tech Stack**: `date-fns`.

**User Flow**:
1. User selects "Start Date" (e.g. Sent Proposal today).
2. System generates a schedule:
   - Follow-up 1: +2 days (Date)
   - Follow-up 2: +5 days (Date)
   - Follow-up 3: +10 days (Date)
3. "Add to Calendar" links (.ics file generation).

---

## 9. Testimonial Card Maker (`testimonial-maker`)
**Goal**: Turn text testimonials into shareable images for social media.
**Tech Stack**: `html2canvas`.

**User Flow**:
1. Input: Client Name, Role/Company, Quote Text, Star Rating (1-5), Client Photo (Upload).
2. Select Theme: "Dark Material", "Light Clean", "Brand Color".
3. Preview: Render DOM element with selected style.
4. "Download PNG": Converts DOM to image.

---

## 10. Call-to-Action (CTA) Ideas (`cta-ideas`)
**Goal**: Directory of high-converting CTA phrases.
**Tech Stack**: Local JSON Data + Randomizer.

**User Flow**:
1. Filter by Goal: "Sign Up", "Purchase", "Learn More", "Newsletter".
2. Display list of phrases (e.g., "Join 5,000+ Marketers").
3. "Shuffle" button to show random ideas.
4. Copy button.

---

## 11. QR Code Generator (`qr-gen`)
**Goal**: Generate customizable QR codes.
**Tech Stack**: `qrcode.react`.

**User Flow**:
1. Input Content: URL, Text, WiFi credentials, vCard.
2. Customization (Real-time update):
   - Foreground Color / Background Color.
   - Error Correction Level (L/M/Q/H).
   - Size.
   - Center Logo (Upload optional image).
3. "Download PNG/SVG".

---

## 12. Business Card Mockup (`biz-card-mockup`)
**Goal**: Visualize business card designs on a realistic 3D-like canvas.
**Tech Stack**: HTML/CSS 3D Transforms or Overlay Images.

**User Flow**:
1. Upload Front Image.
2. Upload Back Image.
3. Select "Scene": "Stack of cards", "Held in hand", "Floating".
4. System overlays the user images onto the CSS/Image mockups using perspective transforms.
5. "Download Mockup" (via `html2canvas`).

**Key Challenges**:
- CSS `transform: perspective(...) rotateY(...)` requires fine-tuning to look realistic.
