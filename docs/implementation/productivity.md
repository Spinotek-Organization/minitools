# Productivity & Self-Care Tools Implementation Plan

This document outlines the technical implementation details for the Productivity & Self-Care category. All tools must be entirely client-side (static).

---

## 1. Pomodoro Timer (`pomodoro`)
**Goal**: Manage work intervals (e.g. 25m Work / 5m Break).
**Tech Stack**: `setInterval`, `document.title` (update title with timer).

**User Flow**:
1. Default: 25:00.
2. Buttons: Start, Pause, Reset.
3. Settings: Edit Work Duration, Short Break, Long Break.
4. Auto-Sound: Play a "ding!" when timer ends (Web Audio API or `<audio>`).
5. Background: Change color slightly for Work (Red) vs Break (Green).

---

## 2. Ambient Noise Generator (`ambient-noise`)
**Goal**: Play soothing background sounds.
**Tech Stack**: `<audio>` loop.

**User Flow**:
1. Grid of Sound Cards: Rain, Thunder, Coffee Shop, Forest, White Noise.
2. Each card has a Play/Pause toggle and a **Volume Slider**.
3. User can mix multiple sounds (e.g., Rain + Coffee Shop).
4. "Mute All" button.

---

## 3. Daily Habit Tracker (`habit-tracker`)
**Goal**: Track daily routines (streak visualization).
**Tech Stack**: `localStorage`.

**User Flow**:
1. Input: New Habit Name (e.g., "Drink Water").
2. List View: 
   - Habit Name.
   - Week Grid (Mon-Sun).
   - "Check" today.
   - Current Streak count (flame icon).
3. Reset: Manual reset or auto-reset at midnight (logic check on load).
4. Celebration confetti on completing all habits.

---

## 4. Minimalist To-Do List (`todo-list`)
**Goal**: Simple task management.
**Tech Stack**: `localStorage`.

**User Flow**:
1. Input: "Add a task..." (Enter key adds).
2. List Item: Text, Checkbox (strikethrough when done), Delete button.
3. "Clear Completed" button.
4. Drag and Drop to reorder (optional/advanced).

---

## 5. Water Intake Reminder (`water-reminder`)
**Goal**: Track hydration goal.
**Tech Stack**: `localStorage`, Notification API (optional permissions).

**User Flow**:
1. Set Goal: e.g., 2000ml (8 glasses).
2. Big Progress Circle (Wave animation).
3. "Add 250ml" / "Add 500ml" buttons.
4. Log history (timestamps).
5. "Reset Day" button.

---

## 6. Eye Break Timer (`eye-break`)
**Goal**: Prevent eye strain (20-20-20 rule).
**Tech Stack**: `setInterval`, Notifications.

**User Flow**:
1. Concept: Every 20 mins, look at something 20 feet away for 20 seconds.
2. "Start Working" button.
3. Countdown: 20:00.
4. At 00:00 -> Full screen overlay or Notification: "Look away now!".
5. 20-second break timer starts.
6. "Resume Work".

---

## 7. Gratitude Journal Template (`gratitude-journal`)
**Goal**: Quick journaling.
**Tech Stack**: `localStorage` or `jspdf` export.

**User Flow**:
1. Prompt 1: "I am grateful for..."
2. Prompt 2: "What would make today great?"
3. Prompt 3: "Daily Affirmation."
4. User types in text areas.
5. "Save Entry" (adds to local history list with date).
6. "Download Journal" (PDF).

---

## 8. Decision Matrix (`decision-matrix`)
**Goal**: Help make a choice between options.
**Tech Stack**: Weighted Scoring logic.

**User Flow**:
1. Step 1: Add Options (e.g., "Buy House A", "Buy House B").
2. Step 2: Add Criteria (e.g., "Price", "Location", "Size") & Weight (1-5).
3. Step 3: Rate each Option for each Criteria (1-10).
4. Result: Calculated Score table. Highlights the winner.

---

## 9. Break Timer (`break-timer`)
**Goal**: A simple "nap" or break timer.
**Tech Stack**: `setInterval`.

**User Flow**:
1. Quick Presets: 5m, 10m, 15m, 30m.
2. Custom Input.
3. Visual Dial (Circle decreases).
4. Alarm sound options.

---

## 10. Daily Reflection Prompt (`daily-reflection`)
**Goal**: Random thoughtful question.
**Tech Stack**: Array of strings.

**User Flow**:
1. Big Card: "What is one thing you learned today?".
2. User can type an answer (private, not saved anywhere unless exported).
3. "New Prompt" button (shuffles array).
4. "Share Quote" (Web Share API).

---

## 11. Simple Stopwatch (`stopwatch`)
**Goal**: Count up timer with laps.
**Tech Stack**: `requestAnimationFrame` (high precision).

**User Flow**:
1. Large Display: `00:00:00.00` (Hours, Mins, Secs, Ms).
2. Buttons: Start, Stop, Lap, Reset.
3. Lap Table below: Lap #, Split Time, Total Time.

---

## 12. Time Boxing Planner (`time-boxing`)
**Goal**: Assign tasks to hour slots.
**Tech Stack**: Drag & Drop logic or simple form.

**User Flow**:
1. Schedule View: 08:00 - 09:00, 09:00 - 10:00, etc.
2. Input Task for each slot.
3. "Priorities" box on the side (Top 3 tasks).
4. "Brain Dump" box (Unscheduled tasks).
5. "Print Plan" (CSS optimized for print).
