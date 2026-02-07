# Business & Finance Tools Implementation Plan

This document outlines the technical implementation details for the Business & Finance category tools. All tools must be entirely client-side (static) and use the recommended libraries.

---

## 1. Investment ROI Calculator (`roi-calc`)
**Goal**: Calculate Return on Investment (ROI), annualized return, and visualize growth over time.  
**Tech Stack**: 
- `recharts` (Chart visualization)
- `lucide-react` (Icons)
- Standard JS Math

**User Flow**:
1. User inputs: Initial Investment, Total Revenue/Current Value, Length of Time (Years/Months), Additional Costs.
2. User clicks "Calculate".
3. System computes:
   - ROI % = `(Net Profit / Cost of Investment) * 100`
   - Annualized ROI %
   - Total Profit
4. Results are displayed in large cards.
5. A line chart renders showing the growth trajectory vs a standard savings account baseline.

**Key Challenges**:
- Handling division by zero.
- Formatting large currency numbers clearly (e.g. IDR/USD formatting).

---

## 2. Invoice Generator (`invoice-gen`)
**Goal**: Create professional PDF invoices instantly in the browser.  
**Tech Stack**:
- `jspdf` (PDF generation)
- `jspdf-autotable` (Table formatting in PDF)
- `react-hook-form` (Form handling)

**User Flow**:
1. User sees a live preview of an invoice template on the right (desktop) or below (mobile).
2. User fills form: My Details, Client Details, Line Items (dynamic add/remove), Tax %, Discount, Currency Symbol.
3. The preview updates in real-time (React state).
4. User clicks "Download PDF".
5. Browser generates and downloads `Invoice-INV001.pdf`.

**Key Challenges**:
- PDF layout consistency across devices.
- Supporting special characters (Currency symbols) in PDF font.
- Calculating subtotal, tax, and grand total accurately (avoiding floating point errors).

---

## 3. Tax Calculator (PPN/PPh) (`tax-calc`)
**Goal**: Calculate Indonesian tax obligations (PPN 11%, PPh 21/23).  
**Tech Stack**: Pure React State.

**User Flow**:
1. User selects Tax Type: "PPN (VAT)" or "PPh (Income Tax)".
2. User inputs Amount (Before or After Tax).
3. System calculates the base price and the tax component.
4. Shows clear breakdown: "Harga DPP", "Nilai PPN", "Total Bayar".

**Key Challenges**:
- "Inclusive" vs "Exclusive" calculation logic (Back-calculating tax from total).

---

## 4. Profit Margin Calculator (`profit-calc`)
**Goal**: Calculate Gross Margin and Markup based on Cost and Revenue.  
**Tech Stack**: Pure React State.

**User Flow**:
1. User inputs: Cost of Goods Sold (COGS) and Selling Price.
2. System Auto-calculates: Gross Profit, Margin %, and Markup %.
3. Alternate Mode: User inputs Cost and Desired Margin %, system suggests Selling Price.

---

## 5. Discount & Sale Calculator (`discount-calc`)
**Goal**: Calculate final price after multiple discounts or tax.  
**Tech Stack**: Pure React State.

**User Flow**:
1. User inputs: Original Price.
2. User adds one or more Discount tiers (e.g., "50% + 20%").
3. System shows: Total Saved, Final Price.
4. Visual representation: "You save Rp X!".

---

## 6. Compound Interest Calculator (`compound-interest`)
**Goal**: Verify investment growth including regular contributions.  
**Tech Stack**: 
- `recharts` (Growth chart)
- Standard JS Math (`P(1 + r/n)^(nt)`)

**User Flow**:
1. Form: Principal, Monthly Contribution, Interest Rate (Annual), Years to Grow, Compounding Frequency.
2. Output: Future Value, Total Interest Earned, breakdown table by year.
3. Chart: Visualize Principal vs Interest growth over time.

---

## 7. Business Name Generator (`biz-name-gen`)
**Goal**: Suggest creative business names by combining keywords.  
**Tech Stack**: Local Arrays (Prefixes, Suffixes, Industry Terms).

**User Flow**:
1. User enters a keyword (e.g. "Coffee").
2. User selects industry style: "Modern", "Classic", "Tech".
3. System combines keyword with predefined arrays based on style.
4. Output: List of 20-50 generated names.
5. Action: "Copy to Clipboard" button next to each name.

**Key Challenges**:
- Ensuring generated names sound natural (requires curated word lists, not just random strings).

---

## 8. Receipt Maker (`receipt-maker`)
**Goal**: Simpler/Smaller version of Invoice Generator for POS-style receipts.  
**Tech Stack**: 
- `html2canvas` (Capture DOM element as image) OR `jspdf` (Small format).

**User Flow**:
1. User enters Store Name, Date, List of Items.
2. Preview shows a "Thermal Paper" style receipt layout.
3. User clicks "Download Image/PDF".

---

## 9. Break-Even Point Calculator (`break-even-calc`)
**Goal**: Determine sales volume needed to cover costs.  
**Tech Stack**: `recharts` (Break-even chart).

**User Flow**:
1. Input: Fixed Costs (Rent, Salaries), Variable Cost per Unit, Selling Price per Unit.
2. Calculate: Break-Even Units = `Fixed Costs / (Price - Variable Cost)`.
3. Chart: Show intersection of Total Revenue and Total Cost lines.

---

## 10. Salary/Take Home Pay Calc (`salary-calc`)
**Goal**: Estimate net salary after BPJS/Tax deductions (Indonesian Context).  
**Tech Stack**: Pure React Logic.

**User Flow**:
1. Input: Gross Monthly Salary, Status (Single/Married/Children).
2. Calculate: BPJS Kesehatan (1%), BPJS Ketenagakerjaan (2%), PPh 21 (TER logic simplified).
3. Output: Estimate Take Home Pay.
*Note: Add disclaimer "Estimation Only".*

---

## 11. Unit Price Comparison (`unit-price-comp`)
**Goal**: Compare two products to find the better deal.  
**Tech Stack**: Pure React.

**User Flow**:
1. Item A: Price, Quantity/Weight.
2. Item B: Price, Quantity/Weight.
3. System calculates Price Per Unit for both.
4. Highlight the "Winner" (Cheapest per unit) in Green.
5. Show savings % if switching to the cheaper option.

---

## 12. Simple Bookkeeping Tool (`bookkeeping`)
**Goal**: Track daily income/expense locally.  
**Tech Stack**: 
- `localStorage` (Persistence)
- `xlsx` or `papaparse` (Export data)

**User Flow**:
1. Dashboard shows Current Balance, Total Income, Total Expense.
2. "Add Transaction" Modal: Date, Description, Type (In/Out), Amount.
3. Transaction List table below.
4. Data saved to browser LocalStorage.
5. Button "Export to Excel" to download data.
