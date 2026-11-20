# ForgeFlow AI ⚡
> **Buy Smarter. Quote Better. Grow Profitably.**  
> *Production-Grade B2B Manufacturing SaaS Built for Indian MSMEs & Fabrication Units*

---

## 📌 Executive Summary & Problem Statement 4.1

Indian Micro, Small & Medium Enterprises (MSMEs) in precision machining, sheet-metal fabrication, forging, and injection moulding face three persistent profit leaks:
1. **The Deceptive "Lowest Unit Price" Trap:** Purchasing managers select raw materials based on headline unit rates (e.g., ₹48/kg vs ₹50/kg), only to discover that freight, loading/unloading fees, and GST input credit dynamics make the quote drastically more expensive.
2. **Ad-Hoc, Intuition-Based Job Costing:** Production costs are calculated on scraps of paper or unstandardized spreadsheets without factoring in machine hour rates, power fluctuations, direct labour overheads, and scrap recovery value.
3. **Slow, Inconsistent Quotation Turnaround:** Preparing B2B customer quotations takes days, leading to lost customer orders or accidental under-pricing that erodes gross margins.

**ForgeFlow AI** solves this with a deterministic, real-time procurement comparison and order costing engine designed specifically for the Indian manufacturing context.

---

## 🎨 Visual Identity & Design System

The application strictly follows modern Indian B2B SaaS aesthetics:
- **Midnight Navy:** `#0A111D` and `#101B2B`
- **Electric Teal (Action / Accent):** `#16B8A5`
- **Warm Amber (Warnings / Highlights):** `#E5A84B`
- **Off-White Typography:** `#F3F5F7`
- **Typography:** *Space Grotesk* for headings, *Inter* for numbers and clean body reading.
- Responsive across Desktop, Tablet, and Mobile devices with seamless print/PDF stylesheets.

---

## 🚀 Core Features

### 1. Smart Procurement (PS 4.1 Core Engine)
- **Material Requirement Management:** Define specifications (e.g. `MS Sheet 3mm IS 2062 Gr B`), quantity, and plant delivery gate.
- **True Landed Cost Matrix:** Compares quotes across Unit Price, Freight/Delivery charges, and 18% GST.
- **Interactive Landed Cost Simulator:** A dynamic volume slider (100 kg to 2,500 kg) that shows judges how freight shifts the winning supplier between **Supplier A, B, and C**.
- **Trap Detection Alert:** Flags when a supplier's misleading low unit rate is wiped out by freight charges.

### 2. Intelligent Costing
- **Deterministic Production Cost Centers:**
  $$\text{Total Cost} = \text{Raw Material} + \text{Labour} + \text{Machine/Power} + \text{Overheads} + \text{Other} - \text{Scrap Recovery}$$
- **Dynamic Target Margin Slider:** Drag from 5% to 50% and observe instant recalculation of:
  $$\text{Suggested Selling Price} = \frac{\text{Total Cost}}{1 - \frac{\text{Target Margin}}{100}}$$
- **Visual Donut Distribution:** Recharts breakdown of raw material %, labour %, machine hour rate %, and overheads.

### 3. Professional Quotation Generator & PDF Export
- Generates B2B proforma quotations with company letterhead, HSN/SAC codes, and GST breakdown (CGST + SGST or IGST).
- Includes MSME standard terms: payment terms, price escalation clauses, and warranty.
- **1-Click Print & Clean PDF Export:** Formatted with print-friendly CSS.

### 4. Invoice Intelligence & GST Document Reconciliation
- Simulated OCR ingestion for supplier invoices (PDF/Image).
- Automatically extracts Supplier Name, GSTIN, Invoice #, Date, HSN line items, and Taxable base.
- Flags discrepancy warnings (e.g. missing E-Way Bill or interstate IGST reconciliation).

### 5. Supplier Directory & Performance
- Vendor profiles with contact dossiers, GSTIN, on-time delivery percentages, and material specializations.

### 6. Reports & Spend Analytics
- Procurement spend over time (H1 2025).
- Commodity spot price tracking (MS Steel, SS 304, Aluminium 6061).
- Order-wise profit margin distributions.

---

## 🏆 Guided 9-Step Hackathon Walkthrough for Judges

ForgeFlow AI includes a built-in **"Hackathon Demo Guide"** modal accessible from the top navbar and sidebar. The 9-step evaluation path:

1. **Dashboard:** Inspect executive KPIs (₹4.8L spend, 12 active suppliers, 24% profit margin) and the glowing **Smart Insight** card.
2. **Smart Procurement:** Open the comparison matrix for *MS Steel Sheet 3mm*.
3. **Landed Cost Shift:** Note how Supplier B quotes ₹48/kg (lowest headline rate) but loses to Supplier A (₹50/kg) once ₹1,500 freight is accounted for!
4. **Volume Simulation:** Enable the volume slider to see how high order volumes absorb freight fees.
5. **Intelligent Costing:** Inspect Order `#ORD-2025-243` (*Heavy Flange Assembly*).
6. **Margin Recalculation:** Adjust the target margin slider from 20% to 35% and see suggested selling price update instantly with deterministic math.
7. **Quotation Generation:** Click *"Generate Customer Quotation"* to view proforma preview.
8. **Print / Export PDF:** Click *"Export PDF"* or *"Print"* to see the clean document layout.
9. **Invoice Intelligence:** Click *"Scan Sample Invoice: Apex Steel"* to test simulated OCR ingestion and discrepancy flagging.

---

## 🛠️ Quick Start & Local Run

### Prerequisites
- Node.js 18+ (tested on Node v22.15.0)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/iamaddu/FORGEFLOW_AI.git
cd FORGEFLOW_AI

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open your browser at `http://localhost:5173` to explore the application.

---

## 📦 Production Build & Deployment

### Build for Production
```bash
npm run build
```
The compiled, minified bundle will be output to `./dist/`.

### Preview Production Build Locally
```bash
npm run preview
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Accept default build settings (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`).

### Deploy to Netlify
1. Drag and drop the `./dist/` folder into Netlify Drop, or:
2. Connect your GitHub repository to Netlify with build command `npm run build` and publish directory `dist`.

---

## 🔒 Security & Data Integrity

- **Deterministic Mathematics:** Zero AI hallucinations on pricing, cost sheets, and GST calculations. All formulas are mathematically verified in `src/utils/calculations.ts`.
- **Zero Exposed Secrets:** No API keys or private credentials are included in frontend source code.
- **Client Persistence:** All mock data is cached in `localStorage` with a 1-click **"Reset Demo Data"** action.
