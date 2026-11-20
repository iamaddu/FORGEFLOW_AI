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
  BookOpen,
  Package,
  Inbox,
  Truck,
  RefreshCw,
} from 'lucide-react';
import { useApp, PageId, UserRole } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsStoryModalOpen, userRole, setUserRole } = useApp();

  const buyerNav = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'procurement', name: 'Smart Procurement', icon: ShoppingCart },
    { id: 'costing', name: 'Intelligent Costing', icon: Calculator },
    { id: 'quotations', name: 'Quotation Generator', icon: FileSpreadsheet },
    { id: 'invoices', name: 'Invoice Intelligence', icon: Receipt },
    { id: 'suppliers', name: 'Supplier Management', icon: Users },
    { id: 'reports', name: 'Reports & Insights', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const sellerNav = [
    { id: 'seller-dashboard', name: 'Seller Dashboard', icon: LayoutDashboard },
    { id: 'seller-catalog', name: 'My Catalog', icon: Package },
    { id: 'seller-rfq', name: 'Incoming RFQs', icon: Inbox },
    { id: 'seller-orders', name: 'Orders & Delivery', icon: Truck },
    { id: 'seller-analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const navigation = userRole === 'seller' ? sellerNav : buyerNav;

  const switchRole = () => {
    const next: UserRole = userRole === 'buyer' ? 'seller' : 'buyer';
    setUserRole(next);
  };

  return (
    <aside className="w-64 bg-[#0B1320] border-r border-[#1E2D44] flex flex-col justify-between shrink-0 min-h-screen text-slate-200 select-none shadow-2xl z-20">
      <div>
        {/* Brand */}
        <div className="p-5 flex items-center gap-3 border-b border-[#1E2D44]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16B8A5] to-[#0E8576] flex items-center justify-center shadow-lg text-[#0B1320] font-heading font-black text-2xl">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white tracking-tight">ForgeFlow</span>
              <span className="text-[#16B8A5] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block -mt-1">
              MSME Smart Engine
            </span>
          </div>
        </div>

        {/* Role Badge + Toggle */}
        <div className="px-4 pt-4 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#121E31] border border-[#1E2E48]">
            <div className="flex items-center gap-2">
              {userRole === 'buyer'
                ? <ShoppingCart className="w-3.5 h-3.5 text-[#16B8A5]" />
                : <Package className="w-3.5 h-3.5 text-[#E5A84B]" />
              }
              <span className="text-xs font-heading font-black text-white">
                {userRole === 'buyer' ? 'BUYER MODE' : 'SUPPLIER MODE'}
              </span>
            </div>
            <button
              onClick={switchRole}
              title="Switch role"
              className="p-1 rounded-lg bg-[#182842] hover:bg-[#203456] text-slate-400 hover:text-white transition-all"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Story pill — buyer only */}
          {userRole === 'buyer' && (
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#16B8A5]/10 border border-[#16B8A5]/25 text-[#16B8A5] hover:bg-[#16B8A5]/20 transition-all text-xs font-heading font-bold shadow-sm"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#16B8A5]" />
                A Day with ForgeFlow
              </span>
              <span className="text-[10px] bg-[#16B8A5] text-[#0B1320] px-2 py-0.5 rounded-full font-black">Story</span>
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="p-3 space-y-1 mt-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as PageId)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-heading font-bold transition-all ${
                  isActive
                    ? 'bg-[#16B8A5] text-[#0B1320] shadow-md shadow-[#16B8A5]/20 translate-x-1'
                    : 'text-slate-400 hover:text-white hover:bg-[#121E31]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B1320]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Impact card */}
      <div className="p-4">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-[#121E31] to-[#0D1624] border border-[#1E2E48] text-[#F3F5F7] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#16B8A5]/10 rounded-full blur-xl pointer-events-none" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#16B8A5] block mb-1">
            {userRole === 'buyer' ? 'THE IMPACT' : 'YOUR ADVANTAGE'}
          </span>
          <h4 className="font-heading font-black text-sm text-white leading-tight">
            {userRole === 'buyer'
              ? 'Every purchase should protect profit.'
              : 'Win more RFQs. Deliver on time.'}
          </h4>
          <button
            onClick={() => setCurrentPage(userRole === 'buyer' ? 'procurement' : 'seller-rfq')}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9584] hover:from-[#139E8E] hover:to-[#0C8474] text-[#0B1320] text-xs font-heading font-black transition-all shadow-md"
          >
            <span>{userRole === 'buyer' ? 'Buy smarter.' : 'Respond to RFQs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
