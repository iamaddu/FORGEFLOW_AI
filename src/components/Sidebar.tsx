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
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useApp, PageId } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsJudgeTourOpen } = useApp();

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
    <aside className="w-64 bg-[#0D1624] border-r border-[#1C2E46] flex flex-col justify-between shrink-0 min-h-screen text-[#8A99AD] select-none">
      {/* Brand Logo Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-[#1C2E46]/50">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#16B8A5] to-[#14c7b2] flex items-center justify-center shadow-glow text-[#0B131F] font-black text-xl tracking-tighter">
            <span>F</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg text-white tracking-tight">ForgeFlow</span>
              <span className="text-[#16B8A5] font-heading font-bold text-lg">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block -mt-1">
              MSME Smart Engine
            </span>
          </div>
        </div>

        {/* Hackathon Judge Quick Action */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setIsJudgeTourOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-[#16B8A5]/15 to-[#E5A84B]/15 border border-[#16B8A5]/30 hover:border-[#16B8A5]/60 transition-all text-xs font-medium text-slate-200 group"
          >
            <span className="flex items-center gap-1.5 text-[#16B8A5]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Judge Tour Flow</span>
            </span>
            <span className="text-[10px] bg-[#16B8A5]/20 text-[#16B8A5] px-1.5 py-0.5 rounded font-mono">
              9 Steps
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
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#16B8A5] text-white shadow-glow font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#132032]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8A99AD]'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo / Value Card */}
      <div className="p-4">
        <div className="relative rounded-2xl p-4 overflow-hidden border border-[#1C2E46] bg-gradient-to-b from-[#132032] to-[#0A111D] group shadow-card">
          {/* Subtle industrial background glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#16B8A5]/10 rounded-full blur-2xl group-hover:bg-[#16B8A5]/20 transition-all pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-[#16B8A5]/20 text-[#16B8A5]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#16B8A5]">
              Enterprise Tier
            </span>
          </div>

          <h4 className="font-heading font-semibold text-sm text-white leading-snug">
            Smarter Decisions. <br />
            <span className="text-slate-300">Higher Profits.</span>
          </h4>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Multi-plant costing & live MCX raw material API feeds.
          </p>

          <button
            onClick={() => setCurrentPage('settings')}
            className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-semibold transition-all shadow-glow"
          >
            <span>Upgrade Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span>v1.0.4-hackathon</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Demo
          </span>
        </div>
      </div>
    </aside>
  );
};
