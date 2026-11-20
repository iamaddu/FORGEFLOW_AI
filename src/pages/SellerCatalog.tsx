import React, { useState } from 'react';
import { Package, Search, Edit2, Inbox, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const materials = [
  { id: 1, name: 'MS Steel Sheets (3mm)', category: 'Steel', price: 52, unit: 'kg', stock: 8500, grade: 'IS 2062', minOrder: 100, leadDays: '3–5 days', active: true },
  { id: 2, name: 'CRCA Cold Rolled Coils', category: 'Steel', price: 68, unit: 'kg', stock: 4200, grade: 'IS 513', minOrder: 500, leadDays: '4–6 days', active: true },
  { id: 3, name: 'Mild Steel Plates (10mm)', category: 'Steel', price: 58, unit: 'kg', stock: 3000, grade: 'IS 2062 E250', minOrder: 200, leadDays: '3–4 days', active: true },
  { id: 4, name: 'SS Round Bar 304', category: 'Stainless', price: 245, unit: 'kg', stock: 1200, grade: 'ASTM A276', minOrder: 50, leadDays: '5–7 days', active: true },
  { id: 5, name: 'GI Sheet (0.8mm)', category: 'GI', price: 89, unit: 'kg', stock: 480, grade: 'IS 277', minOrder: 100, leadDays: '3–5 days', active: true },
  { id: 6, name: 'Aluminium Flat Bar', category: 'Aluminium', price: 185, unit: 'kg', stock: 650, grade: 'IS 733 Alloy 6061', minOrder: 25, leadDays: '5–7 days', active: false },
];

const stockStatus = (s: number) => {
  if (s > 1000) return { label: `${(s/1000).toFixed(1)}k kg`, cls: 'bg-[#16B8A5]/10 text-[#16B8A5] border border-[#16B8A5]/25' };
  if (s > 200) return { label: `${s} kg`, cls: 'bg-[#E5A84B]/10 text-[#E5A84B] border border-[#E5A84B]/25' };
  return { label: `${s} kg LOW`, cls: 'bg-rose-500/10 text-rose-400 border border-rose-500/25' };
};

export const SellerCatalog: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Steel', 'Stainless', 'GI', 'Aluminium'];
  const filtered = materials.filter(m =>
    (category === 'All' || m.category === category) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">My Material Catalog</h1>
          <p className="text-slate-400 text-sm mt-0.5">{materials.length} materials listed • {materials.filter(m => m.active).length} active in stock</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-sm font-heading font-black transition-all shadow-lg shadow-[#16B8A5]/20 shrink-0">
          <Plus className="w-4 h-4" /> Add New Material
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search catalog materials..."
            className="w-full bg-[#131F33] border border-[#1E2E48] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] font-medium"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${category === c ? 'bg-[#16B8A5] text-[#0B1320] font-black' : 'bg-[#131F33] text-slate-400 border border-[#1E2E48] hover:border-slate-500 hover:text-white'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(m => {
          const st = stockStatus(m.stock);
          return (
            <div key={m.id} className={`bg-[#131F33] rounded-2xl border p-5 shadow-lg flex flex-col gap-4 ${m.active ? 'border-[#1E2E48]' : 'border-[#1E2E48] opacity-70'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.category}</span>
                  <h3 className="font-heading font-black text-sm text-white leading-snug mt-0.5">{m.name}</h3>
                </div>
                {m.active
                  ? <CheckCircle2 className="w-4 h-4 text-[#16B8A5] shrink-0" />
                  : <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                }
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="font-heading font-black text-2xl text-[#16B8A5]">₹{m.price}<span className="text-sm font-medium text-slate-400">/{m.unit}</span></div>
                  <div className="text-xs text-slate-400 mt-0.5">Grade: {m.grade}</div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="bg-[#182842] rounded-xl px-3 py-2 border border-[#233550]">
                  <div className="font-bold text-slate-400 text-[10px]">MIN ORDER</div>
                  <div className="font-semibold text-white mt-0.5">{m.minOrder} {m.unit}</div>
                </div>
                <div className="bg-[#182842] rounded-xl px-3 py-2 border border-[#233550]">
                  <div className="font-bold text-slate-400 text-[10px]">LEAD TIME</div>
                  <div className="font-semibold text-white mt-0.5">{m.leadDays}</div>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#182842] hover:bg-[#203456] text-slate-200 text-xs font-bold transition-all border border-[#233550]">
                  <Edit2 className="w-3.5 h-3.5 text-slate-400" /> Edit
                </button>
                <button onClick={() => setCurrentPage('seller-rfq')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#16B8A5]/15 hover:bg-[#16B8A5]/25 border border-[#16B8A5]/30 text-[#16B8A5] text-xs font-heading font-black transition-all">
                  <Inbox className="w-3.5 h-3.5" /> View RFQs
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
