# Academic & Data Tools Implementation Plan

This document outlines the technical implementation details for the Academic & Data category. All tools must be entirely client-side (static).

---

## 1. Citation Generator (`citation-gen`)
**Goal**: Create references in APA, MLA, Chicago styles.
**Tech Stack**: String templates.

**User Flow**:
1. Type: Website, Book, Journal.
2. Input Fields: Author(s), Title, Publisher/Website Name, URL, Year, Month, Day, Accessed Date.
3. Live Preview: Format automatically as user types.
   - APA: Author, A. A. (Year). *Title*. Publisher.
   - MLA: Author. "Title". *Container*, Publisher, Year.
4. "Copy Citation" button.
5. "Copy In-text Citation" ((Author, Year)).

---

## 2. Percentage Calculator (`percentage-calc`)
**Goal**: Solve common percentage problems.
**Tech Stack**: Basic Math.

**User Flow**:
1. Dropdown: "What is X% of Y?", "X is what % of Y?", "Percentage Increase/Decrease from X to Y".
2. Inputs based on selection.
3. Result shown in large text.
4. Step-by-step Explanation: `(X / Y) * 100 = Z`.

---

## 3. Mean/Median/Mode Calc (`stats-calc`)
**Goal**: Basic statistics on a dataset.
**Tech Stack**: Array sorting and reduction.

**User Flow**:
1. Input: Comma-separated numbers (e.g. `1, 2, 5, 5, 8`).
2. Stats Grid:
   - Count (N): 5
   - Sum: 21
   - Mean (Average): 4.2
   - Median (Middle): 5
   - Mode (Most frequent): 5
   - Range (Max - Min): 7
   - Standard Deviation (optional).

---

## 4. Unit Converter (`unit-conv`)
**Goal**: Convert Metric <-> Imperial.
**Tech Stack**: Conversion factor constants.

**User Flow**:
1. Category Tabs: Length, Mass, Volume, Temperature, Area.
2. Left Input: Value + Unit (e.g. 10 kg).
3. Right Input: Unit (e.g. lbs) -> Auto-updates value (22.04).
4. Swap Button (`<->`).

---

## 5. Binary to Decimal Converter (`binary-conv`)
**Goal**: Convert number systems.
**Tech Stack**: `parseInt(x, 2)`, `toString(16)`.

**User Flow**:
1. Four inputs linked together:
   - Binary (Base 2)
   - Decimal (Base 10)
   - Octal (Base 8)
   - Hexadecimal (Base 16)
2. Typing in ANY input updates the other three in real-time.
3. Validation: Prevent `8` or `9` in Octal, etc.

---

## 6. Equation Solver (`equation-solver`)
**Goal**: Step-by-step solutions for Linear/Quadratic equations.
**Tech Stack**: Math logic (Quadratic formula).

**User Flow**:
1. Select Type: "Linear (ax + b = c)" or "Quadratic (ax² + bx + c = 0)".
2. Input Coefficients: a, b, c.
3. Solve Button.
4. Steps: 
   - `delta = b² - 4ac`
   - `x1 = (-b + sqrt(delta)) / 2a`
   - `x2 = (-b - sqrt(delta)) / 2a`
5. Graph Preview (using `recharts` or canvas plot) showing the parabola intersection.

---

## 7. Simple Graph Plotter (`graph-plotter`)
**Goal**: Visualize X,Y data quickly.
**Tech Stack**: `recharts` or `chart.js`.

**User Flow**:
1. Data Input: Table format (X, Y columns). Add rows dynamically.
2. Select Chart Type: Bar, Line, Area, Scatter.
3. Customization: Color, Grid lines, Axis Labels.
4. Render Chart.
5. "Download as PNG".

---

## 8. Sorting Visualizer (`sorting-visualizer`)
**Goal**: Educational animation of algorithms.
**Tech Stack**: React State + `setTimeout` loop.

**User Flow**:
1. Generate Random Array (Bars of different heights).
2. Select Algo: "Bubble Sort", "Quick Sort", "Insertion Sort".
3. "Start" Button.
4. Animation: Bars swap positions, change color (Red = Comparing, Green = Sorted).
5. Speed Slider (Slow <-> Fast).

---

## 9. Bibliography Manager (`bib-manager`)
**Goal**: Create and manage lists of references.
**Tech Stack**: `localStorage`.

**User Flow**:
1. "Add Reference" Form (Reuse Citation Generator logic).
2. Saved List: Display all added citations.
3. Sorting: Alphabetical by Author.
4. "Copy All to Clipboard" (Formatted with hanging indent spacing).
5. "Export to Word/RTF" (Blob download).

---

## 10. Fraction Calculator (`fraction-calc`)
**Goal**: Perform arithmetic on fractions.
**Tech Stack**: Custom Fraction Class (numerator, denominator).

**User Flow**:
1. Input 1: Whole (optional), Numerator, Denominator.
2. Operator: `+`, `-`, `*`, `/`.
3. Input 2: Same structure.
4. Result: Simplified Fraction (e.g. `1 1/2`) and Decimal value (`1.5`).
5. Steps: Show common denominator calculation.

---

## 11. Scientific Calculator (`sci-calc`)
**Goal**: Advanced mathematical functions.
**Tech Stack**: `Math.sin`, `Math.cos`, `Math.log` etc.

**User Flow**:
1. Standard Grid Layout + "Advanced" toggle.
2. Keys: Sin, Cos, Tan, Log, Ln, Sqrt, Pow (^), Pi, e, Factorial (!).
3. Display: Supports complex expressions `sin(30) + log(10)`.
4. History tape on the side.

---

## 12. Date Difference Calc (`date-diff`)
**Goal**: Calculate duration between dates.
**Tech Stack**: `date-fns`.

**User Flow**:
1. Start Date Picker.
2. End Date Picker.
3. Options: "Include End Date (+1 day)".
4. Result:
   - Total Days (e.g. 45 days).
   - Breakdown: "1 Month, 2 Weeks, 1 Day".
   - Working Days only (exclude Sat/Sun) - Toggle.
