import React, { useState } from 'react';
import {
  Inbox,
  X,
  ArrowRight,
  Package,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card3D } from '../components/Card3D';

interface RFQItem {
  id: string;
  material: string;
  buyer: string;
  buyerCity: string;
  qty: number;
  unit: string;
  neededBy: string;
  status: 'New' | 'Quoted' | 'Negotiating' | 'Won' | 'Lost';
  note?: string;
  yourQuote?: string;
  buyerCounter?: string;
  winQuote?: string;
}

const INITIAL_RFQS: RFQItem[] = [
  {
    id: 'RFQ-2847',
    material: 'MS Sheet 3mm',
    buyer: 'Ravi Precision Fabrication Works',
    buyerCity: 'Bhosari MIDC, Pune',
    qty: 500,
    unit: 'kg',
    neededBy: '25 Nov 2026',
    status: 'New',
    note: 'Need IS 2062 grade. Mill test certificate required with shipment batch.',
  },
  {
    id: 'RFQ-2846',
    material: 'CRCA Cold Rolled Coils',
    buyer: 'Mehta Fab Works',
    buyerCity: 'Peenya, Bangalore',
    qty: 1200,
    unit: 'kg',
    neededBy: '22 Nov 2026',
    status: 'Quoted',
    yourQuote: '₹68/kg + ₹2,000 delivery',
    note: 'IS 513 grade preferred. Payment: 30 days net.',
  },
  {
    id: 'RFQ-2845',
    material: 'SS Round Bar 304',
    buyer: 'Kumar Engineers',
    buyerCity: 'Chakan, Pune',
    qty: 300,
    unit: 'kg',
    neededBy: '20 Nov 2026',
    status: 'Negotiating',
    yourQuote: '₹245/kg',
    buyerCounter: '₹240/kg',
    note: 'ASTM A276 spec required for aerospace fixture machining.',
  },
  {
    id: 'RFQ-2844',
    material: 'GI Sheets (0.8mm)',
    buyer: 'Sharma Sheet Metal',
    buyerCity: 'Narela, Delhi',
    qty: 800,
    unit: 'kg',
    neededBy: '18 Nov 2026',
    status: 'Won',
    winQuote: '₹89/kg',
    note: 'IS 277 grade. Purchase order generated.',
  },
  {
    id: 'RFQ-2843',
    material: 'Mild Steel Plates',
    buyer: 'VK Fabricators',
    buyerCity: 'Worli, Mumbai',
    qty: 400,
    unit: 'kg',
    neededBy: '15 Nov 2026',
    status: 'Lost',
    note: 'Competitor offered ₹56/kg with local free freight.',
  },
];

const statusConfig: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  New: { label: 'NEW', cls: 'bg-[#EFEBF8] text-[#523D8A] border border-[#523D8A]/20', icon: <Inbox className="w-3.5 h-3.5" /> },
  Quoted: { label: 'QUOTED', cls: 'bg-purple-100 text-purple-800 border border-purple-200', icon: <Clock className="w-3.5 h-3.5" /> },
  Negotiating: { label: 'NEGOTIATING', cls: 'bg-[#FEF3D6] text-amber-800 border border-amber-200', icon: <AlertCircle className="w-3.5 h-3.5" /> },
  Won: { label: 'WON ✓', cls: 'bg-emerald-100 text-emerald-800 border border-emerald-200', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  Lost: { label: 'LOST', cls: 'bg-rose-100 text-rose-800 border border-rose-200', icon: <XCircle className="w-3.5 h-3.5" /> },
};

export const SellerRFQ: React.FC = () => {
  const { showToast, setCurrentPage } = useApp();
  const [rfqs, setRfqs] = useState<RFQItem[]>(INITIAL_RFQS);
  const [activeTab, setActiveTab] = useState('All');
  const [modalRfq, setModalRfq] = useState<RFQItem | null>(null);
  const [viewDetailsRfq, setViewDetailsRfq] = useState<RFQItem | null>(null);

  const [unitPrice, setUnitPrice] = useState('52');
  const [delivery, setDelivery] = useState('1200');
  const [taxRate, setTaxRate] = useState('18');
  const [leadDays, setLeadDays] = useState('5');
  const [notes, setNotes] = useState('Mill test certificate included. Ready for dispatch.');

  const landedCost = (() => {
    const qty = modalRfq?.qty ?? 0;
    const up = parseFloat(unitPrice) || 0;
    const dl = parseFloat(delivery) || 0;
    const tax = parseFloat(taxRate) || 0;
    if (!up || !qty) return null;
    const base = up * qty;
    const taxAmt = base * (tax / 100);
    return base + taxAmt + dl;
  })();

  const tabs = [
    { label: 'All', count: rfqs.length },
    { label: 'New', count: rfqs.filter((r) => r.status === 'New').length },
    { label: 'Quoted', count: rfqs.filter((r) => r.status === 'Quoted').length },
    { label: 'Negotiating', count: rfqs.filter((r) => r.status === 'Negotiating').length },
    { label: 'Won', count: rfqs.filter((r) => r.status === 'Won').length },
  ];

  const filtered = activeTab === 'All' ? rfqs : rfqs.filter((r) => r.status === activeTab);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalRfq) return;

    const formattedQuote = `₹${unitPrice}/${modalRfq.unit}${delivery ? ` + ₹${delivery} freight` : ''}`;

    setRfqs((prev) =>
      prev.map((r) =>
        r.id === modalRfq.id
          ? {
              ...r,
              status: 'Quoted',
              yourQuote: formattedQuote,
            }
          : r
      )
    );

    showToast(
      `Quote of ${formattedQuote} sent for #${modalRfq.id} (${modalRfq.buyer})!`,
      'success'
    );
    setModalRfq(null);
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      <div>
        <h1 className="font-heading font-black text-2xl text-white">Incoming RFQs</h1>
        <p className="text-[#F8C8BE] text-sm mt-0.5">
          Buyer requests for quotation — calculate true landed cost &amp; respond to win orders
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.label}
            onClick={() => setActiveTab(t.label)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === t.label
                ? 'bg-white text-[#523D8A] shadow-md font-black'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>{t.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === t.label ? 'bg-[#523D8A] text-white' : 'bg-white/30 text-white'
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* RFQ Cards */}
      <div className="space-y-4">
        {filtered.map((rfq) => {
          const st = statusConfig[rfq.status];
          return (
            <Card3D
              key={rfq.id}
              className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.14)] p-6 text-[#1E1638]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">#{rfq.id}</span>
                    <span className={`flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full ${st.cls}`}>
                      {st.icon}
                      {st.label}
                    </span>
                    {rfq.status === 'New' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#523D8A] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#523D8A]" />
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-xl text-[#1E1638]">{rfq.material}</h3>

                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                      <Package className="w-4 h-4 text-[#523D8A]" />
                      {rfq.buyer}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {rfq.buyerCity}
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-700 font-bold">
                      <Calendar className="w-4 h-4" />
                      Needed by {rfq.neededBy}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <div className="bg-slate-50 rounded-2xl px-3.5 py-2 border border-slate-100">
                      <div className="font-bold text-slate-400 text-[10px]">QUANTITY</div>
                      <div className="font-black text-slate-900 mt-0.5">
                        {rfq.qty} {rfq.unit}
                      </div>
                    </div>
                    {rfq.yourQuote && (
                      <div className="bg-[#EFEBF8] rounded-2xl px-3.5 py-2 border border-[#D2C6EA]">
                        <div className="font-bold text-[#523D8A] text-[10px]">YOUR QUOTE</div>
                        <div className="font-black text-[#523D8A] mt-0.5">{rfq.yourQuote}</div>
                      </div>
                    )}
                    {rfq.buyerCounter && (
                      <div className="bg-[#FEF3D6] rounded-2xl px-3.5 py-2 border border-amber-200">
                        <div className="font-bold text-amber-700 text-[10px]">BUYER COUNTER</div>
                        <div className="font-black text-amber-900 mt-0.5">{rfq.buyerCounter}</div>
                      </div>
                    )}
                    {rfq.winQuote && (
                      <div className="bg-emerald-50 rounded-2xl px-3.5 py-2 border border-emerald-200">
                        <div className="font-bold text-emerald-700 text-[10px]">WINNING QUOTE</div>
                        <div className="font-black text-emerald-900 mt-0.5">{rfq.winQuote}</div>
                      </div>
                    )}
                  </div>

                  {rfq.note && (
                    <p className="text-xs text-slate-600 mt-3 italic border-l-2 border-[#523D8A] pl-3 py-0.5 font-medium">
                      "{rfq.note}"
                    </p>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                  {rfq.status === 'New' && (
                    <button
                      type="button"
                      onClick={() => {
                        setModalRfq(rfq);
                        setUnitPrice('52');
                        setDelivery('1200');
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white text-xs font-heading font-black transition-all shadow-[0_4px_0_#2b1a52] active:translate-y-1 active:shadow-none flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Submit Quote <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {rfq.status === 'Quoted' && (
                    <button
                      type="button"
                      onClick={() => {
                        setModalRfq(rfq);
                        setUnitPrice('68');
                        setDelivery('2000');
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-heading font-black transition-all shadow-sm cursor-pointer"
                    >
                      Edit Quote
                    </button>
                  )}
                  {rfq.status === 'Negotiating' && (
                    <button
                      type="button"
                      onClick={() => {
                        setModalRfq(rfq);
                        setUnitPrice('240');
                        setDelivery('1500');
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-xs font-heading font-black transition-all shadow-[0_4px_0_#b87414] active:translate-y-1 active:shadow-none cursor-pointer"
                    >
                      Accept Counter
                    </button>
                  )}
                  {rfq.status === 'Won' && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage('seller-orders')}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-heading font-black transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Track Order →
                    </button>
                  )}
                  {rfq.status === 'Lost' && (
                    <button
                      type="button"
                      onClick={() => setViewDetailsRfq(rfq)}
                      className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-heading font-bold transition-all cursor-pointer"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Quote Submission Modal */}
      {modalRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-[#1E1638] border-4 border-white/60">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-heading font-black text-xl text-[#1E1638]">Submit Quote to Buyer</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {modalRfq.material} • {modalRfq.buyer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalRfq(null)}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-3.5">
              {[
                { label: 'Unit Base Price (₹/kg)', val: unitPrice, set: setUnitPrice, type: 'number', placeholder: 'e.g. 52' },
                { label: 'Delivery / Freight Charges (₹)', val: delivery, set: setDelivery, type: 'number', placeholder: 'e.g. 1200' },
                { label: 'Applicable GST Rate (%)', val: taxRate, set: setTaxRate, type: 'number', placeholder: '18' },
                { label: 'Delivery Lead Time (days)', val: leadDays, set: setLeadDays, type: 'number', placeholder: '5' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    required
                    className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1E1638] focus:outline-none focus:border-[#523D8A]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Terms for Buyer</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Test certificate provided, 30 days PDC terms..."
                  className="w-full bg-[#F3F0FA] border border-[#D2C6EA] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1E1638] focus:outline-none focus:border-[#523D8A] resize-none"
                />
              </div>

              {/* Live landed cost preview */}
              {landedCost !== null && (
                <div className="mt-4 p-4 bg-[#F8C8BE] rounded-2xl border border-[#F5C5B8]">
                  <div className="text-xs font-bold text-[#523D8A] mb-1">Buyer's True Landed Cost Preview</div>
                  <div className="font-heading font-black text-2xl text-[#1E1638]">
                    ₹{landedCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5 font-medium">
                    for {modalRfq.qty} {modalRfq.unit} • Effective: ₹
                    {(landedCost / modalRfq.qty).toFixed(2)}/{modalRfq.unit}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalRfq(null)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white text-sm font-heading font-black transition-all flex items-center justify-center gap-2 shadow-[0_4px_0_#2b1a52] active:translate-y-1 active:shadow-none"
                >
                  <span>Send Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal for Lost RFQs */}
      {viewDetailsRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 text-[#1E1638] border-4 border-white/60">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-black text-lg">RFQ Feedback: #{viewDetailsRfq.id}</h3>
              <button
                type="button"
                onClick={() => setViewDetailsRfq(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 space-y-2 text-xs">
              <p><strong>Material:</strong> {viewDetailsRfq.material}</p>
              <p><strong>Buyer:</strong> {viewDetailsRfq.buyer} ({viewDetailsRfq.buyerCity})</p>
              <p><strong>Lost Reason:</strong> {viewDetailsRfq.note}</p>
            </div>
            <button
              type="button"
              onClick={() => setViewDetailsRfq(null)}
              className="w-full py-2.5 rounded-xl bg-[#523D8A] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
