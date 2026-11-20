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
    <aside className="w-64 bg-[#523D8A] border-r border-[#3E2C6B] flex flex-col justify-between shrink-0 min-h-screen text-white select-none shadow-2xl">
      <div>
        {/* Brand */}
        <div className="p-5 flex items-center gap-3 border-b border-white/15">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A636] flex items-center justify-center shadow-md text-[#1E1638] font-heading font-black text-2xl">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl text-white">ForgeFlow</span>
              <span className="text-[#F8C8BE] font-heading font-black text-xl">AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#F8C8BE] font-bold block -mt-1">
              MSME Smart Engine
            </span>
          </div>
        </div>

        {/* Role Badge + Toggle */}
        <div className="px-4 pt-4 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white/10 border border-white/15">
            <div className="flex items-center gap-2">
              {userRole === 'buyer'
                ? <ShoppingCart className="w-3.5 h-3.5 text-[#F5A636]" />
                : <Package className="w-3.5 h-3.5 text-[#1A957E]" />
              }
              <span className="text-xs font-heading font-black text-white">
                {userRole === 'buyer' ? 'BUYER MODE' : 'SUPPLIER MODE'}
              </span>
            </div>
            <button
              onClick={switchRole}
              title="Switch role"
              className="p-1 rounded-lg bg-white/10 hover:bg-white/25 transition-all"
            >
              <RefreshCw className="w-3 h-3 text-white/70" />
            </button>
          </div>

          {/* Story pill — buyer only */}
          {userRole === 'buyer' && (
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-[#F8C8BE] text-[#1E1638] hover:bg-[#f3b5a8] transition-all text-xs font-heading font-bold shadow-sm"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#523D8A]" />
                A Day with ForgeFlow
              </span>
              <span className="text-[10px] bg-[#523D8A] text-white px-2 py-0.5 rounded-full font-bold">Story</span>
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
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-heading font-bold transition-all ${
                  isActive
                    ? 'bg-white text-[#523D8A] shadow-lg translate-x-1'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#523D8A]' : 'text-white/70'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom card */}
      <div className="p-4">
        <div className="rounded-3xl p-4 bg-[#F8C8BE] text-[#1E1638] border border-[#F5C5B8]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#523D8A] block mb-1">
            {userRole === 'buyer' ? 'THE IMPACT' : 'YOUR ADVANTAGE'}
          </span>
          <h4 className="font-heading font-black text-sm text-[#1E1638] leading-tight">
            {userRole === 'buyer'
              ? 'Every purchase should protect profit.'
              : 'Win more RFQs. Deliver on time.'}
          </h4>
          <button
            onClick={() => setCurrentPage(userRole === 'buyer' ? 'procurement' : 'seller-rfq')}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-xs font-heading font-black transition-all shadow-md"
          >
            {userRole === 'buyer' ? 'Buy smarter.' : 'Respond to RFQs'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
