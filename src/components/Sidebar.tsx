import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Calculator,
  FileSpreadsheet,
  Receipt,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp, PageId } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsStoryModalOpen } = useApp();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'procurement', name: 'Smart Procurement', icon: ShoppingCart },
    { id: 'costing', name: 'Intelligent Costing', icon: Calculator },
    { id: 'quotations', name: 'Quotation Generator', icon: FileSpreadsheet },
    { id: 'invoices', name: 'Invoice Intelligence', icon: Receipt },
    { id: 'suppliers', name: 'Supplier Management', icon: Users },
    { id: 'reports', name: 'Reports & Insights', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#523D8A] border-r border-[#3E2C6B] flex flex-col justify-between shrink-0 min-h-screen text-white select-none shadow-2xl">
      <div>
        {/* Brand Logo Header */}
        <div className="p-5 flex items-center gap-3 border-b border-white/15">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A636] flex items-center justify-center shadow-md text-[#1E1638] font-heading font-black text-2xl tracking-tighter">
            <span>F</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white tracking-tight">ForgeFlow</span>
              <span className="text-[#F8C8BE] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#F8C8BE] font-bold block -mt-1">
              MSME Smart Engine
            </span>
          </div>
        </div>

        {/* Interactive Story Showcase Pill (Peach Pill) */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#F8C8BE] text-[#1E1638] hover:bg-[#f3b5a8] transition-all text-xs font-heading font-bold shadow-sm group"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#523D8A]" />
              <span>A Day with ForgeFlow</span>
            </span>
            <span className="text-[10px] bg-[#523D8A] text-white px-2 py-0.5 rounded-full font-bold">
              Story
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as PageId)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-heading font-bold transition-all ${
                  isActive
                    ? 'bg-white text-[#523D8A] shadow-lg translate-x-1'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#523D8A]' : 'text-white/80'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo: Slide 1 "Buy smarter. Build profit." Style */}
      <div className="p-4">
        <div className="rounded-3xl p-4 bg-[#F8C8BE] text-[#1E1638] shadow-card relative overflow-hidden border border-[#F5C5B8]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#523D8A] block mb-1">
            THE IMPACT
          </span>

          <h4 className="font-heading font-black text-sm text-[#1E1638] leading-tight">
            Every purchase should protect profit.
          </h4>

          <div className="mt-2.5 space-y-1 text-[11px] font-bold text-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-700">✓</span>
              <span>Smarter purchasing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-700">✓</span>
              <span>More accurate quotes</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('procurement')}
            className="mt-3.5 w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-xs font-heading font-black transition-all shadow-md"
          >
            <span>Buy smarter. Build profit.</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
