# ForgeFlow AI ⚡
> **Buy Smarter. Quote Better. Grow Profitably.**  
> *Modern B2B Manufacturing SaaS Built for Indian MSME Fabricators & Precision Machining Units*

---

## 📌 Product Overview

Indian Micro, Small & Medium Enterprises (MSMEs) in sheet-metal fabrication, precision machining, and forging face constant margin compression due to:
1. **The Hidden Freight Trap:** Suppliers quote cheap unit rates (e.g. ₹48/kg vs ₹50/kg) on WhatsApp or PDF, but freight and loading fees make the order significantly more expensive.
2. **Ad-Hoc Job Costing:** Production costs are estimated without factoring in machine hour rates, power overheads, and scrap recovery value.
3. **Slow Quotation Turnaround:** Generating customer proforma quotes takes too long, risking customer orders or underquoting.

**ForgeFlow AI** provides a deterministic landed cost engine, instant production cost calculation, and proforma quotation generator tailored for Indian MSME fabricators like Ravi.

---

## 🎨 Design System & Visual Identity

The design system incorporates a distinct, warm, and professional palette:
- **Royal Iris Purple:** `#4E3C80` (outer canvas, headers, primary buttons)
- **Soft Coral-Peach:** `#FAD5C8` (promotional cards, story badges, highlights)
- **Warm Sunlight Yellow:** `#F9C349` (warning alerts, spark accents)
- **Crisp White:** `#FFFFFF` (elevated cards with soft shadow and `rounded-3xl` corners)
- **Soft Lavender Tint:** `#E8E2F6` and `#F3F0FA`
- **Emerald Mint:** `#10B981` (profit gains, verified status)
- **Deep Slate Typography:** `#1E1736` for high-contrast reading.

---

## 📖 "A Day with ForgeFlow" — Interactive Storyboard

The application features an interactive storyboard illustrating how Ravi manages his fabrication unit:

1. **Meet Ravi:** A customer enquiry for precision flanges arrives at the workshop.
2. **Three Quotes Land:** Bids arrive over WhatsApp and PDF from Supplier A, B, and C.
3. **ForgeFlow Compares Landed Cost:** Exposes how Supplier B's ₹48/kg rate loses to Supplier A's ₹50/kg once ₹1,500 delivery is factored in!
4. **Costing Builds a Margin-Aware Quote:** Combines raw materials, labour, machine power, and overheads with a 20% gross margin.
5. **Invoice Mismatch Flagged Early:** Simulated OCR scanner catches a ₹300 freight variance before payment.
6. **Order Approved & Dispatched:** Quotation sent, customer PO received, and margins protected.

---

## 🚀 Core Functional Modules

- **Smart Procurement:** Compares multiple supplier quotes on base price, delivery freight, and 18% GST. Includes an interactive **Volume Sensitivity Slider** (100 kg to 2,500 kg).
- **Intelligent Costing:** Deterministic cost sheet with dynamic **Target Gross Margin Slider** (5% to 50%) updating suggested selling prices in real time.
- **Quotation Generator:** B2B proforma quotation generator with HSN codes, CGST/SGST/IGST, and 1-click **Print / High-Res PDF Export**.
- **Invoice Intelligence:** Simulated OCR scanner that extracts GSTIN, dates, and HSN line items while flagging missing E-Way bills.
- **Supplier Directory:** Centralized vendor performance ledger tracking on-time delivery rates and quote histories.
- **Reports & Spend Insights:** Monthly procurement spend, commodity spot price indices (MS Steel, SS 304, Aluminium 6061), and order profitability distributions.
- **Settings & Sample Reset:** Workshop GST profile management with a 1-click data reset button.

---

## 🛠️ Quick Start & Local Run

```bash
# Clone the repository
git clone https://github.com/iamaddu/FORGEFLOW_AI.git
cd FORGEFLOW_AI

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build

```bash
npm run build
```
The compiled bundle will be output to `./dist/` ready for Vercel or Netlify deployment.
