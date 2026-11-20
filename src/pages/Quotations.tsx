import React, { useState, useRef } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Printer,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  Trash2,
  DollarSign,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

export const Quotations: React.FC = () => {
  const {
    quotations,
    addQuotation,
    updateQuotation,
    deleteQuotation,
    costingOrders,
    user,
    showToast
  } = useApp();

  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(
    quotations[0]?.id || 'quot-101'
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const activeQuote = quotations.find(q => q.id === selectedQuoteId) || quotations[0];

  // Create Form State
  const [selectedOrderId, setSelectedOrderId] = useState(costingOrders[0]?.id || '');
  const [custCompany, setCustCompany] = useState('Bharat Auto Components Ltd');
  const [custName, setCustName] = useState('Anand Deshmukh');
  const [custGstin, setCustGstin] = useState('27AAACB9876Q1Z0');
  const [custEmail, setCustEmail] = useState('a.deshmukh@bharatauto.com');
  const [custPhone, setCustPhone] = useState('+91 98220 77611');
  const [custBilling, setCustBilling] = useState('Plot 44, MIDC Chakan Phase II, Pune - 410501');
  const [custDelivery, setCustDelivery] = useState('Plant Gate 4, MIDC Chakan Phase II, Pune - 410501');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast(`Generating high-resolution PDF for ${activeQuote?.quoteNumber}...`, 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleCreateNewQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const ord = costingOrders.find(o => o.id === selectedOrderId) || costingOrders[0];
    const unitPrice = ord ? ord.unitSellingPrice : 1000;
    const qty = ord ? ord.quantity : 100;
    const subtotal = ord ? ord.suggestedSellingPrice : unitPrice * qty;
    const cgst = Math.round(subtotal * 0.09);
    const sgst = Math.round(subtotal * 0.09);
    const grandTotal = subtotal + cgst + sgst;

    const newQuoteNum = `QUOT-2025-${Math.floor(100 + Math.random() * 900)}`;

    const newId = addQuotation({
      quoteNumber: newQuoteNum,
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      costingOrderId: ord?.id,
      customer: {
        company: custCompany,
        name: custName,
        gstin: custGstin,
        email: custEmail,
        phone: custPhone,
        billingAddress: custBilling,
        deliveryAddress: custDelivery
      },
      items: [
        {
          id: `item-${Date.now()}`,
          description: ord ? ord.productName : 'Custom Manufacturing Job',
          hsnCode: '73269099',
          quantity: qty,
          unit: ord?.unit || 'pcs',
          unitCost: ord?.costPerUnit || unitPrice * 0.75,
          unitPrice,
          gstRate: 18,
          totalCost: ord?.totalProductionCost || subtotal * 0.75,
          totalPrice: subtotal
        }
      ],
      paymentTerms: '30 Days Net from date of Delivery Challan',
      deliveryTerms: 'Ex-Works Pune / Standard dispatch within 10 days of formal PO',
      subtotal,
      cgst,
      sgst,
      igst: 0,
      totalTax: cgst + sgst,
      grandTotal,
      estimatedCost: ord?.totalProductionCost || subtotal * 0.75,
      estimatedProfit: grandTotal - (ord?.totalProductionCost || subtotal * 0.75) - (cgst + sgst),
      profitMarginPercent: ord?.estimatedProfitMargin || 25,
      status: 'Sent',
      notes: '1. Quotation strictly valid for 30 days from date of issue.\n2. Raw material price escalations beyond +/- 5% subject to mutual adjustment.\n3. Inspection: Standard 100% CMM & dimensional test reports provided.'
    });

    setSelectedQuoteId(newId);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header (Hidden when printing!) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-black text-3xl text-white">Quotation Generator</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
              B2B MSME Proforma
            </span>
          </div>
          <p className="text-xs text-[#E8E2F6] mt-1">
            Convert costed manufacturing orders into legally compliant, GST-ready customer quotations with 1-click PDF export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#1E1736] hover:bg-[#F3F0FA] text-xs font-bold transition-all shadow-md"
          >
            <Plus className="w-4 h-4 text-[#4E3C80]" />
            <span>New Quotation</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#1E1736] hover:bg-[#F3F0FA] text-xs font-bold transition-all shadow-md"
          >
            <Printer className="w-4 h-4 text-[#EA580C]" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-heading font-black transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Quotation Selector Ribbon (Hidden when printing!) */}
      <div className="bg-white rounded-3xl p-4 shadow-card border-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Saved Quotations:
          </span>
          {quotations.map(q => (
            <button
              key={q.id}
              onClick={() => setSelectedQuoteId(q.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                q.id === selectedQuoteId
                  ? 'bg-[#4E3C80] text-white shadow-md'
                  : 'bg-[#F3F0FA] text-slate-700 hover:text-black border border-[#D2C6EA]'
              }`}
            >
              <span>{q.quoteNumber}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                q.id === selectedQuoteId ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {q.customer.company.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {activeQuote && (
          <div className="text-xs text-slate-600 flex items-center gap-4 shrink-0 bg-[#F3F0FA] px-4 py-2 rounded-2xl border border-[#D2C6EA]">
            <div>
              <span className="text-slate-500">Total: </span>
              <span className="text-slate-900 font-mono font-black">{formatINR(activeQuote.grandTotal)}</span>
            </div>
            <div>
              <span className="text-slate-500">Margin: </span>
              <span className="text-emerald-700 font-mono font-bold">+{formatINR(activeQuote.estimatedProfit)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Quotation Document Preview (Crisp White Document Design) */}
      {activeQuote && (
        <div
          ref={printAreaRef}
          className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-slate-100 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:rounded-none"
        >
          {/* Document Top Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b-2 border-slate-900 gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#4E3C80] text-white flex items-center justify-center font-heading font-black text-xl shadow-md">
                  F
                </div>
                <div>
                  <h2 className="font-heading font-black text-2xl text-slate-900 tracking-tight leading-none">
                    {user.companyName}
                  </h2>
                  <span className="text-xs text-slate-600 font-medium tracking-wide">
                    Precision Machining & MSME Metal Fabrication
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-600 space-y-0.5 leading-relaxed">
                <p>Plot 88, Sector 10, PCMC Industrial Zone, Bhosari, Pune - 411026</p>
                <p>
                  <strong>GSTIN:</strong> {user.gstin} | <strong>Email:</strong> {user.email}
                </p>
                <p><strong>UDYAM Reg:</strong> UDYAM-MH-26-0045892 (MSME Registered)</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-slate-500 block mb-1">
                Commercial Proforma Quotation
              </span>
              <h3 className="font-heading font-black text-2xl text-[#4E3C80] font-mono">
                {activeQuote.quoteNumber}
              </h3>
              <div className="text-xs text-slate-600 mt-2 space-y-0.5">
                <p><strong>Date:</strong> {activeQuote.date}</p>
                <p><strong>Valid Until:</strong> {activeQuote.validUntil}</p>
                <p><strong>Payment Terms:</strong> 30 Days Net</p>
              </div>
            </div>
          </div>

          {/* Customer / Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Bill To Customer:
              </span>
              <h4 className="font-bold text-sm text-slate-900">{activeQuote.customer.company}</h4>
              <p className="text-slate-700 font-medium">Attn: {activeQuote.customer.name}</p>
              <p className="text-slate-600">{activeQuote.customer.billingAddress}</p>
              <p className="text-slate-700 font-mono">
                <strong>GSTIN:</strong> {activeQuote.customer.gstin}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Dispatch / Delivery Location:
              </span>
              <p className="text-slate-700 font-medium">{activeQuote.customer.company}</p>
              <p className="text-slate-600">{activeQuote.customer.deliveryAddress}</p>
              <p className="text-slate-600 mt-2">
                <strong>Terms of Delivery:</strong> {activeQuote.deliveryTerms}
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-800 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-2 w-10">#</th>
                  <th className="py-3 px-2">Item Description & Specification</th>
                  <th className="py-3 px-2 text-center w-24">HSN Code</th>
                  <th className="py-3 px-2 text-right w-20">Qty</th>
                  <th className="py-3 px-2 text-right w-28">Unit Rate (₹)</th>
                  <th className="py-3 px-2 text-right w-28">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeQuote.items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="py-4 px-2 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-4 px-2">
                      <div className="font-bold text-slate-900">{item.description}</div>
                      <span className="text-[11px] text-slate-500">
                        100% CMM inspected, zinc electroplated finish per ISO 4042.
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center font-mono text-slate-600">{item.hsnCode}</td>
                    <td className="py-4 px-2 text-right font-mono font-medium text-slate-900">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-4 px-2 text-right font-mono text-slate-900">
                      ₹{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-2 text-right font-mono font-bold text-slate-900">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax & Total Calculation Summary */}
          <div className="py-4 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-start gap-6 text-xs">
            <div className="max-w-md space-y-2">
              <span className="font-bold uppercase text-[10px] tracking-wider text-slate-700 block">
                Terms & Conditions:
              </span>
              <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-2xl border border-slate-200">
                {activeQuote.notes}
              </div>
            </div>

            <div className="w-full sm:w-72 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                <span>Taxable Subtotal:</span>
                <span className="font-mono font-semibold">₹{activeQuote.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                <span>CGST @ 9%:</span>
                <span className="font-mono">₹{activeQuote.cgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-700">
                <span>SGST @ 9%:</span>
                <span className="font-mono">₹{activeQuote.sgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 border-b-2 border-slate-900 text-sm font-bold text-slate-900">
                <span>Grand Total (INR):</span>
                <span className="font-mono text-base text-[#4E3C80]">
                  ₹{activeQuote.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Signatory Section */}
          <div className="pt-8 mt-6 border-t border-slate-200 flex justify-between items-end text-xs">
            <div className="text-slate-500 text-[10px]">
              Computer-generated quote via ForgeFlow AI.
            </div>
            <div className="text-right space-y-8">
              <span className="font-semibold text-slate-900 block">
                For {user.companyName}
              </span>
              <div className="pt-8 border-t border-slate-400 font-bold text-slate-800">
                Authorized Signatory / Plant Head
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Quotation */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in print:hidden">
          <div className="bg-white text-[#1E1736] rounded-3xl p-6 max-w-xl w-full shadow-2xl relative border-4 border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-heading font-black text-lg text-[#1E1736] flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#4E3C80]" />
                <span>Create Customer Quotation</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-black text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewQuote} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Link to Costing Order</label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                >
                  {costingOrders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber}: {o.productName} ({o.quantity} {o.unit} @ ₹{o.unitSellingPrice}/unit)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Customer / Company Name</label>
                  <input
                    type="text"
                    required
                    value={custCompany}
                    onChange={(e) => setCustCompany(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Customer GSTIN</label>
                  <input
                    type="text"
                    value={custGstin}
                    onChange={(e) => setCustGstin(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Billing & Delivery Address</label>
                <input
                  type="text"
                  value={custBilling}
                  onChange={(e) => setCustBilling(e.target.value)}
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3 py-2 text-[#1E1736] font-medium focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-[#4E3C80] text-white font-bold shadow-md"
                >
                  Generate Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
