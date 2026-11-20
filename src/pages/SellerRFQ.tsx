import React, { useState } from 'react';
import { Inbox, X, ArrowRight, Package, MapPin, Calendar, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

const rfqs = [
  {
    id: 'RFQ-2847', material: 'MS Sheet 3mm', buyer: 'Ravi Precision Fabrication Works',
    buyerCity: 'Bhosari MIDC, Pune', qty: 500, unit: 'kg', neededBy: '25 Nov 2026',
    status: 'New', note: 'Need IS 2062 grade. Test certificate required.',
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
    note: 'ASTM A276 spec needed.',
  },
  {
    id: 'RFQ-2844', material: 'GI Sheets (0.8mm)', buyer: 'Sharma Sheet Metal',
    buyerCity: 'Narela, Delhi', qty: 800, unit: 'kg', neededBy: '18 Nov 2026',
    status: 'Won', winQuote: '₹89/kg', note: 'IS 277 grade. Order confirmed.',
  },
  {
    id: 'RFQ-2843', material: 'Mild Steel Plates', buyer: 'VK Fabricators',
    buyerCity: 'Worli, Mumbai', qty: 400, unit: 'kg', neededBy: '15 Nov 2026',
    status: 'Lost', note: 'Competitor offered ₹56/kg with free delivery.',
  },
];

const statusConfig: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  New: { label: 'NEW', cls: 'bg-blue-100 text-blue-700', icon: <Inbox className="w-3.5 h-3.5" /> },
  Quoted: { label: 'QUOTED', cls: 'bg-purple-100 text-purple-700', icon: <Clock className="w-3.5 h-3.5" /> },
  Negotiating: { label: 'NEGOTIATING', cls: 'bg-amber-100 text-amber-700', icon: <AlertCircle className="w-3.5 h-3.5" /> },
  Won: { label: 'WON ✓', cls: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  Lost: { label: 'LOST', cls: 'bg-rose-100 text-rose-700', icon: <XCircle className="w-3.5 h-3.5" /> },
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
    <div className="space-y-5 pb-10">
      <div>
        <h1 className="font-heading font-black text-2xl text-white">Incoming RFQs</h1>
        <p className="text-white/60 text-sm mt-0.5">Buyer requests for quotation — respond to win orders</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.label} onClick={() => setActiveTab(t.label)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${activeTab === t.label ? 'bg-[#523D8A] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-[#523D8A]/50'}`}>
            {t.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activeTab === t.label ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* RFQ Cards */}
      <div className="space-y-4">
        {filtered.map(rfq => {
          const st = statusConfig[rfq.status];
          return (
            <div key={rfq.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400">#{rfq.id}</span>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${st.cls}`}>
                      {st.icon}{st.label}
                    </span>
                    {rfq.status === 'New' && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-base text-[#1E1638]">{rfq.material}</h3>

                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{rfq.buyer}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{rfq.buyerCity}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Needed by {rfq.neededBy}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs">
                    <div className="bg-slate-50 rounded-lg px-3 py-2">
                      <div className="font-bold text-slate-400 text-[10px]">QUANTITY</div>
                      <div className="font-black text-slate-800 mt-0.5">{rfq.qty} {rfq.unit}</div>
                    </div>
                    {rfq.yourQuote && (
                      <div className="bg-purple-50 rounded-lg px-3 py-2">
                        <div className="font-bold text-purple-400 text-[10px]">YOUR QUOTE</div>
                        <div className="font-black text-purple-800 mt-0.5">{rfq.yourQuote}</div>
                      </div>
                    )}
                    {rfq.buyerCounter && (
                      <div className="bg-amber-50 rounded-lg px-3 py-2">
                        <div className="font-bold text-amber-500 text-[10px]">BUYER COUNTER</div>
                        <div className="font-black text-amber-800 mt-0.5">{rfq.buyerCounter}</div>
                      </div>
                    )}
                    {rfq.winQuote && (
                      <div className="bg-emerald-50 rounded-lg px-3 py-2">
                        <div className="font-bold text-emerald-500 text-[10px]">WINNING QUOTE</div>
                        <div className="font-black text-emerald-800 mt-0.5">{rfq.winQuote}</div>
                      </div>
                    )}
                  </div>

                  {rfq.note && (
                    <p className="text-xs text-slate-500 mt-2 italic">"{rfq.note}"</p>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col gap-2">
                  {rfq.status === 'New' && (
                    <button onClick={() => { setModalRfq(rfq); setUnitPrice(''); setDelivery(''); }}
                      className="px-4 py-2.5 rounded-xl bg-[#1A957E] hover:bg-[#15806b] text-white text-xs font-heading font-black transition-all flex items-center gap-1.5">
                      Submit Quote <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {rfq.status === 'Quoted' && (
                    <button className="px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-heading font-black transition-all">
                      View / Edit Quote
                    </button>
                  )}
                  {rfq.status === 'Negotiating' && (
                    <button onClick={() => { setModalRfq(rfq); setUnitPrice('240'); setDelivery('1500'); }}
                      className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-heading font-black transition-all">
                      Update Quote
                    </button>
                  )}
                  {rfq.status === 'Won' && (
                    <button className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-heading font-black transition-all">
                      View Order
                    </button>
                  )}
                  {rfq.status === 'Lost' && (
                    <button className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-heading font-black transition-all">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote Modal */}
      {modalRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 text-[#1E1638]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-black text-lg">Submit Quote</h3>
                <p className="text-xs text-slate-500">{modalRfq.material} • {modalRfq.buyer} • {modalRfq.qty} {modalRfq.unit}</p>
              </div>
              <button onClick={() => setModalRfq(null)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Unit Price (₹/kg)', val: unitPrice, set: setUnitPrice, type: 'number', placeholder: 'e.g. 52' },
                { label: 'Delivery Charges (₹)', val: delivery, set: setDelivery, type: 'number', placeholder: 'e.g. 1200' },
                { label: 'GST Rate (%)', val: taxRate, set: setTaxRate, type: 'number', placeholder: '18' },
                { label: 'Lead Time (days)', val: leadDays, set: setLeadDays, type: 'number', placeholder: '5' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{f.label}</label>
                  <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-[#1A957E]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Notes for Buyer</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Grade, packing, payment terms..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-[#1A957E] resize-none" />
              </div>
            </div>

            {/* Live landed cost */}
            {landedCost !== null && (
              <div className="mt-4 p-4 bg-[#EFEBF8] rounded-2xl">
                <div className="text-xs font-bold text-[#523D8A] mb-1">Total Landed Cost (Buyer's side)</div>
                <div className="font-heading font-black text-2xl text-[#523D8A]">₹{landedCost.toLocaleString('en-IN')}</div>
                <div className="text-xs text-slate-500 mt-0.5">for {modalRfq.qty} {modalRfq.unit} incl. GST & delivery</div>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button onClick={() => setModalRfq(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all">
                Cancel
              </button>
              <button onClick={() => setModalRfq(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#1A957E] hover:bg-[#15806b] text-white text-sm font-heading font-black transition-all flex items-center justify-center gap-2">
                Send Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
