import React, { useState } from 'react';
import { Inbox, X, ArrowRight, Package, MapPin, Calendar, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

const rfqs = [
  {
    id: 'RFQ-2847', material: 'MS Sheet 3mm', buyer: 'Ravi Precision Fabrication Works',
    buyerCity: 'Bhosari MIDC, Pune', qty: 500, unit: 'kg', neededBy: '25 Nov 2026',
    status: 'New', note: 'Need IS 2062 grade. Test certificate required with delivery batch.',
  },
  {
    id: 'RFQ-2846', material: 'CRCA Cold Rolled Coils', buyer: 'Mehta Fab Works',
    buyerCity: 'Peenya, Bangalore', qty: 1200, unit: 'kg', neededBy: '22 Nov 2026',
    status: 'Quoted', yourQuote: '₹68/kg + ₹2,000 delivery',
    note: 'IS 513 grade preferred. Payment: 30 days net.',
  },
  {
    id: 'RFQ-2845', material: 'SS Round Bar 304', buyer: 'Kumar Engineers',
    buyerCity: 'Chakan, Pune', qty: 300, unit: 'kg', neededBy: '20 Nov 2026',
    status: 'Negotiating', yourQuote: '₹245/kg', buyerCounter: '₹240/kg',
    note: 'ASTM A276 spec required for aerospace fixture machining.',
  },
  {
    id: 'RFQ-2844', material: 'GI Sheets (0.8mm)', buyer: 'Sharma Sheet Metal',
    buyerCity: 'Narela, Delhi', qty: 800, unit: 'kg', neededBy: '18 Nov 2026',
    status: 'Won', winQuote: '₹89/kg', note: 'IS 277 grade. Purchase order generated.',
  },
  {
    id: 'RFQ-2843', material: 'Mild Steel Plates', buyer: 'VK Fabricators',
    buyerCity: 'Worli, Mumbai', qty: 400, unit: 'kg', neededBy: '15 Nov 2026',
    status: 'Lost', note: 'Competitor offered ₹56/kg with local free freight.',
  },
];

const statusConfig: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  New: { label: 'NEW', cls: 'bg-[#16B8A5]/10 text-[#16B8A5] border border-[#16B8A5]/30', icon: <Inbox className="w-3.5 h-3.5" /> },
  Quoted: { label: 'QUOTED', cls: 'bg-purple-500/10 text-purple-400 border border-purple-500/30', icon: <Clock className="w-3.5 h-3.5" /> },
  Negotiating: { label: 'NEGOTIATING', cls: 'bg-[#E5A84B]/10 text-[#E5A84B] border border-[#E5A84B]/30', icon: <AlertCircle className="w-3.5 h-3.5" /> },
  Won: { label: 'WON ✓', cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  Lost: { label: 'LOST', cls: 'bg-rose-500/10 text-rose-400 border border-rose-500/30', icon: <XCircle className="w-3.5 h-3.5" /> },
};

const tabs = [
  { label: 'All', count: 7 }, { label: 'New', count: 3 },
  { label: 'Quoted', count: 2 }, { label: 'Negotiating', count: 1 }, { label: 'Won', count: 1 },
];

export const SellerRFQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [modalRfq, setModalRfq] = useState<typeof rfqs[0] | null>(null);
  const [unitPrice, setUnitPrice] = useState('');
  const [delivery, setDelivery] = useState('');
  const [taxRate, setTaxRate] = useState('18');
  const [leadDays, setLeadDays] = useState('5');
  const [notes, setNotes] = useState('');

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

  const filtered = activeTab === 'All' ? rfqs : rfqs.filter(r => r.status === activeTab);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-heading font-black text-2xl text-white">Incoming RFQs</h1>
        <p className="text-slate-400 text-sm mt-0.5">Buyer requests for quotation — calculate true landed cost &amp; respond to win</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.label} onClick={() => setActiveTab(t.label)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${activeTab === t.label ? 'bg-[#16B8A5] text-[#0B1320] font-black' : 'bg-[#131F33] text-slate-400 border border-[#1E2E48] hover:border-slate-500 hover:text-white'}`}>
            <span>{t.label}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activeTab === t.label ? 'bg-[#0B1320]/20 text-[#0B1320]' : 'bg-[#1E2E48] text-slate-400'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* RFQ Cards */}
      <div className="space-y-4">
        {filtered.map(rfq => {
          const st = statusConfig[rfq.status];
          return (
            <div key={rfq.id} className="bg-[#131F33] rounded-2xl border border-[#1E2E48] shadow-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400">#{rfq.id}</span>
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${st.cls}`}>
                      {st.icon}{st.label}
                    </span>
                    {rfq.status === 'New' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16B8A5] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16B8A5]" />
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-lg text-white">{rfq.material}</h3>

                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300"><Package className="w-3.5 h-3.5 text-[#16B8A5]" />{rfq.buyer}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" />{rfq.buyerCity}</span>
                    <span className="flex items-center gap-1.5 text-[#E5A84B]"><Calendar className="w-3.5 h-3.5" />Needed by {rfq.neededBy}</span>
                  </div>

                  <div className="mt-3.5 flex flex-wrap gap-3 text-xs">
                    <div className="bg-[#182842] rounded-xl px-3 py-2 border border-[#233550]">
                      <div className="font-bold text-slate-400 text-[10px]">QUANTITY</div>
                      <div className="font-black text-white mt-0.5">{rfq.qty} {rfq.unit}</div>
                    </div>
                    {rfq.yourQuote && (
                      <div className="bg-purple-500/10 rounded-xl px-3 py-2 border border-purple-500/25">
                        <div className="font-bold text-purple-400 text-[10px]">YOUR QUOTE</div>
                        <div className="font-black text-purple-200 mt-0.5">{rfq.yourQuote}</div>
                      </div>
                    )}
                    {rfq.buyerCounter && (
                      <div className="bg-[#E5A84B]/10 rounded-xl px-3 py-2 border border-[#E5A84B]/25">
                        <div className="font-bold text-[#E5A84B] text-[10px]">BUYER COUNTER</div>
                        <div className="font-black text-[#E5A84B] mt-0.5">{rfq.buyerCounter}</div>
                      </div>
                    )}
                    {rfq.winQuote && (
                      <div className="bg-emerald-500/10 rounded-xl px-3 py-2 border border-emerald-500/25">
                        <div className="font-bold text-emerald-400 text-[10px]">WINNING QUOTE</div>
                        <div className="font-black text-emerald-300 mt-0.5">{rfq.winQuote}</div>
                      </div>
                    )}
                  </div>

                  {rfq.note && (
                    <p className="text-xs text-slate-400 mt-3 italic border-l-2 border-[#1E2E48] pl-3 py-0.5">"{rfq.note}"</p>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                  {rfq.status === 'New' && (
                    <button onClick={() => { setModalRfq(rfq); setUnitPrice(''); setDelivery(''); }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-xs font-heading font-black transition-all shadow-md shadow-[#16B8A5]/20 flex items-center justify-center gap-1.5">
                      Submit Quote <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {rfq.status === 'Quoted' && (
                    <button className="px-4 py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-heading font-bold transition-all">
                      View / Edit Quote
                    </button>
                  )}
                  {rfq.status === 'Negotiating' && (
                    <button onClick={() => { setModalRfq(rfq); setUnitPrice('240'); setDelivery('1500'); }}
                      className="px-4 py-2.5 rounded-xl bg-[#E5A84B]/15 hover:bg-[#E5A84B]/25 text-[#E5A84B] border border-[#E5A84B]/30 text-xs font-heading font-bold transition-all">
                      Update Quote
                    </button>
                  )}
                  {rfq.status === 'Won' && (
                    <button className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-heading font-bold transition-all">
                      View Order
                    </button>
                  )}
                  {rfq.status === 'Lost' && (
                    <button className="px-4 py-2.5 rounded-xl bg-[#182842] hover:bg-[#223556] text-slate-400 border border-[#233550] text-xs font-heading font-bold transition-all">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote Submission Modal */}
      {modalRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1320]/80 backdrop-blur-md">
          <div className="bg-[#131F33] border border-[#233550] rounded-3xl shadow-2xl w-full max-w-md p-6 text-white">
            <div className="flex items-center justify-between mb-4 border-b border-[#1E2E48] pb-4">
              <div>
                <h3 className="font-heading font-black text-lg text-white">Submit Quote to Buyer</h3>
                <p className="text-xs text-slate-400">{modalRfq.material} • {modalRfq.buyer}</p>
              </div>
              <button onClick={() => setModalRfq(null)} className="p-2 rounded-xl bg-[#182842] hover:bg-[#223556] text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {[
                { label: 'Unit Base Price (₹/kg)', val: unitPrice, set: setUnitPrice, type: 'number', placeholder: 'e.g. 52' },
                { label: 'Delivery / Freight Charges (₹)', val: delivery, set: setDelivery, type: 'number', placeholder: 'e.g. 1200' },
                { label: 'Applicable GST Rate (%)', val: taxRate, set: setTaxRate, type: 'number', placeholder: '18' },
                { label: 'Delivery Lead Time (days)', val: leadDays, set: setLeadDays, type: 'number', placeholder: '5' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-slate-300 mb-1">{f.label}</label>
                  <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                    className="w-full bg-[#0E1726] border border-[#233550] rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Notes / Terms for Buyer</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Mill test cert provided, 30 days credit terms..."
                  className="w-full bg-[#0E1726] border border-[#233550] rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] resize-none" />
              </div>
            </div>

            {/* Live landed cost preview */}
            {landedCost !== null && (
              <div className="mt-4 p-4 bg-[#16B8A5]/10 border border-[#16B8A5]/25 rounded-2xl">
                <div className="text-xs font-bold text-[#16B8A5] mb-1">Buyer's True Landed Cost Preview</div>
                <div className="font-heading font-black text-2xl text-white">₹{landedCost.toLocaleString('en-IN')}</div>
                <div className="text-xs text-slate-400 mt-0.5">for {modalRfq.qty} {modalRfq.unit} • Effective: ₹{(landedCost / modalRfq.qty).toFixed(2)}/{modalRfq.unit}</div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalRfq(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#182842] hover:bg-[#223556] text-slate-300 text-sm font-bold transition-all border border-[#233550]">
                Cancel
              </button>
              <button onClick={() => setModalRfq(null)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-sm font-heading font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#16B8A5]/25">
                Send Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
