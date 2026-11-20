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
    <aside className="w-64 bg-[#392A62] border-r border-[#4E3C80] flex flex-col justify-between shrink-0 min-h-screen text-[#D4C8EE] select-none shadow-2xl">
      {/* Brand Logo Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-[#4E3C80]/60">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FAD5C8] to-[#F9C349] flex items-center justify-center shadow-lg text-[#1E1736] font-heading font-black text-2xl tracking-tighter">
            <span>F</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white tracking-tight">ForgeFlow</span>
              <span className="text-[#FAD5C8] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#D4C8EE]/80 font-medium block -mt-1">
              MSME Smart Engine
            </span>
          </div>
        </div>

        {/* Interactive Story Showcase Pill */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FAD5C8]/20 to-[#F9C349]/20 border border-[#FAD5C8]/40 hover:border-[#FAD5C8] transition-all text-xs font-semibold text-white group shadow-sm"
          >
            <span className="flex items-center gap-2 text-[#FAD5C8]">
              <BookOpen className="w-4 h-4" />
              <span>A Day with ForgeFlow</span>
            </span>
            <span className="text-[10px] bg-[#FAD5C8] text-[#1E1736] px-2 py-0.5 rounded-full font-bold">
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
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#FAD5C8] text-[#1E1736] font-bold shadow-lg shadow-[#FAD5C8]/20 translate-x-1'
                    : 'text-[#E8E2F6] hover:text-white hover:bg-[#4E3C80]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1E1736]' : 'text-[#D4C8EE]'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Card / Plant Status */}
      <div className="p-4">
        <div className="rounded-2xl p-4 border border-[#4E3C80] bg-[#2E2052] shadow-card relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FAD5C8]">
              Ravi's Fabrication Unit
            </span>
          </div>

          <h4 className="font-heading font-bold text-sm text-white leading-snug">
            Buy Smarter. <br />
            <span className="text-[#FAD5C8]">Quote Better.</span>
          </h4>
          <p className="text-[11px] text-[#D4C8EE] mt-1 leading-relaxed">
            True landed cost calculations & instant margin protections.
          </p>

          <button
            onClick={() => setCurrentPage('procurement')}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-bold transition-all shadow-md"
          >
            <span>Compare Supplier Bids</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
