import React, { useState } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  RotateCcw,
  Sparkles,
  LogOut,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Info,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { user, alerts, markAlertRead, logout, resetToSampleData, setIsStoryModalOpen, setCurrentPage } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadAlerts = alerts.filter(a => !a.read);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('quote') || q.includes('price') || q.includes('steel') || q.includes('procure')) {
      setCurrentPage('procurement');
    } else if (q.includes('cost') || q.includes('margin') || q.includes('manufactur')) {
      setCurrentPage('costing');
    } else if (q.includes('inv') || q.includes('gst') || q.includes('tax')) {
      setCurrentPage('invoices');
    } else if (q.includes('suppl') || q.includes('vendor')) {
      setCurrentPage('suppliers');
    } else if (q.includes('report') || q.includes('spend')) {
      setCurrentPage('reports');
    } else {
      setCurrentPage('procurement');
    }
  };

  return (
    <header className="h-16 px-6 bg-[#1A1F36] border-b border-white/10 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Search Bar - Crisp White Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search materials, orders, suppliers, invoices..."
          className="w-full bg-white border border-transparent text-sm text-[#1E1638] placeholder:text-slate-400 pl-9 pr-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#523D8A] shadow-sm font-medium"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Storyboard Button: A Day with ForgeFlow (Mango Yellow Button) */}
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1A957E] hover:bg-[#15806b] text-white text-xs font-heading font-black transition-all shadow-md"
        >
          <BookOpen className="w-4 h-4" />
          <span>A Day with ForgeFlow</span>
        </button>

        {/* Reset Sample Data Pill */}
        <button
          onClick={resetToSampleData}
          className="p-2 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#1A957E] transition-all shadow-sm"
          title="Reset Sample Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#1A957E] transition-all relative shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-slate-100 rounded-3xl shadow-cardLg overflow-hidden z-50 text-[#1E1638] animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#F8C8BE]">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-sm text-[#1E1638]">Notifications</span>
                  <span className="text-xs bg-[#523D8A] text-white px-2 py-0.5 rounded-full font-bold">
                    {unreadAlerts.length} new
                  </span>
                </div>
                <button
                  onClick={() => alerts.forEach(a => markAlertRead(a.id))}
                  className="text-xs text-[#523D8A] font-bold hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      markAlertRead(alert.id);
                      if (alert.linkPage) setCurrentPage(alert.linkPage as any);
                      setShowNotifications(false);
                    }}
                    className={`p-3.5 text-xs cursor-pointer transition-colors ${
                      alert.read ? 'opacity-60 hover:opacity-100 hover:bg-slate-50' : 'bg-emerald-50/50 hover:bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {alert.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#F5A636] shrink-0 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />}
                      {alert.type === 'info' && <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{alert.title}</span>
                          <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-1 leading-snug font-medium">
                          {alert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge (Ravi) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-white text-[#1E1638] shadow-sm hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#523D8A] text-white flex items-center justify-center text-xs font-black">
              {user.avatarInitials}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">{user.name}</span>
              <span className="text-[10px] text-slate-500 font-medium block leading-tight">Ravi Fabrication</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-slate-100 rounded-3xl shadow-cardLg overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-[#1E1638]">
              <div className="p-4 border-b border-slate-100 bg-[#F8C8BE]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#523D8A] text-white flex items-center justify-center font-black">
                    {user.avatarInitials}
                  </div>
                  <div>
                    <h5 className="font-heading font-black text-xs text-slate-900">{user.name}</h5>
                    <p className="text-[11px] text-slate-700 font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-700 font-mono">
                  <Building2 className="w-3.5 h-3.5 text-[#523D8A]" />
                  <span>GSTIN: {user.gstin}</span>
                </div>
              </div>

              <div className="p-2 space-y-1 text-xs font-medium">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setCurrentPage('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Workshop Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    resetToSampleData();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-slate-800 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#F5A636]" />
                  <span>Reset Sample Data</span>
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
