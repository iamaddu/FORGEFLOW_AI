import React, { useState } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  RotateCcw,
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
    <header className="h-16 px-6 bg-[#0F1826]/90 backdrop-blur-md border-b border-[#1E2D44] flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search materials, orders, suppliers, invoices..."
          className="w-full bg-[#152238] border border-[#233550] text-sm text-[#F3F5F7] placeholder:text-slate-400 pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] transition-all font-medium"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Storyboard Button */}
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#16B8A5]/15 hover:bg-[#16B8A5]/25 border border-[#16B8A5]/40 text-[#16B8A5] text-xs font-heading font-bold transition-all shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#16B8A5]" />
          <span>A Day with ForgeFlow</span>
        </button>

        {/* Reset Sample Data Pill */}
        <button
          onClick={resetToSampleData}
          className="p-2 rounded-xl bg-[#152238] hover:bg-[#1E2E48] text-slate-300 hover:text-white border border-[#233550] transition-all shadow-sm"
          title="Reset Sample Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#152238] hover:bg-[#1E2E48] text-slate-300 hover:text-white border border-[#233550] transition-all relative shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5A84B] ring-2 ring-[#0F1826]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#121D2F] border border-[#233550] rounded-2xl shadow-2xl overflow-hidden z-50 text-[#F3F5F7] animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-[#1E2D44] flex items-center justify-between bg-[#152238]">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-sm text-white">Notifications</span>
                  <span className="text-xs bg-[#16B8A5] text-[#0D1522] px-2 py-0.5 rounded-full font-black">
                    {unreadAlerts.length} new
                  </span>
                </div>
                <button
                  onClick={() => alerts.forEach(a => markAlertRead(a.id))}
                  className="text-xs text-[#16B8A5] font-bold hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#1E2D44]">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      markAlertRead(alert.id);
                      if (alert.linkPage) setCurrentPage(alert.linkPage as any);
                      setShowNotifications(false);
                    }}
                    className={`p-3.5 text-xs cursor-pointer transition-colors ${
                      alert.read ? 'opacity-60 hover:opacity-100 hover:bg-[#152238]' : 'bg-[#152238]/60 hover:bg-[#152238]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {alert.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#E5A84B] shrink-0 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16B8A5] shrink-0 mt-0.5" />}
                      {alert.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{alert.title}</span>
                          <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-1 leading-snug font-medium">
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

        {/* User Profile Badge */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#152238] border border-[#233550] text-white shadow-sm hover:bg-[#1E2E48] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#16B8A5] to-[#0E8576] text-[#0D1522] flex items-center justify-center text-xs font-black shadow-sm">
              {user.avatarInitials}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-bold text-white block leading-tight">{user.name}</span>
              <span className="text-[10px] text-slate-400 font-medium block leading-tight">{user.companyName.split(' ')[0]} Fab</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#121D2F] border border-[#233550] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-[#F3F5F7]">
              <div className="p-4 border-b border-[#1E2D44] bg-[#152238]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#16B8A5] text-[#0D1522] flex items-center justify-center font-black">
                    {user.avatarInitials}
                  </div>
                  <div>
                    <h5 className="font-heading font-black text-xs text-white">{user.name}</h5>
                    <p className="text-[11px] text-slate-400 font-medium truncate">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-[#233550] flex items-center gap-1.5 text-[11px] text-slate-300 font-mono">
                  <Building2 className="w-3.5 h-3.5 text-[#16B8A5]" />
                  <span>GSTIN: {user.gstin}</span>
                </div>
              </div>

              <div className="p-2 space-y-1 text-xs font-medium">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setCurrentPage('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:bg-[#1E2E48] transition-colors"
                >
                  Workshop Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    resetToSampleData();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:bg-[#1E2E48] flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#E5A84B]" />
                  <span>Reset Sample Data</span>
                </button>
                <div className="border-t border-[#1E2D44] my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors font-bold"
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
