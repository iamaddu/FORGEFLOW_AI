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
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { user, alerts, markAlertRead, logout, resetToSampleData, setIsJudgeTourOpen, setCurrentPage } = useApp();
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
    <header className="h-16 px-6 bg-[#0A111D]/80 backdrop-blur-md border-b border-[#1C2E46] flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search materials, orders, suppliers, invoices..."
          className="w-full bg-[#132032] border border-[#1C2E46] text-sm text-slate-200 placeholder:text-slate-400 pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-[#16B8A5] focus:ring-1 focus:ring-[#16B8A5] transition-all"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Hackathon Judge Tour Quick Button */}
        <button
          onClick={() => setIsJudgeTourOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E5A84B]/15 hover:bg-[#E5A84B]/25 border border-[#E5A84B]/40 text-[#E5A84B] text-xs font-semibold transition-all shadow-glowAmber"
          title="Guided 9-step demo flow for hackathon judges"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hackathon Demo Guide</span>
        </button>

        {/* Reset Demo Data quick pill */}
        <button
          onClick={resetToSampleData}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#132032] transition-colors border border-transparent hover:border-[#1C2E46]"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#132032] transition-colors relative border border-transparent hover:border-[#1C2E46]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0A111D] animate-ping" />
            )}
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0A111D]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#132032] border border-[#1C2E46] rounded-2xl shadow-card overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-[#1C2E46] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-sm text-white">Notifications</span>
                  <span className="text-xs bg-[#16B8A5]/20 text-[#16B8A5] px-2 py-0.5 rounded-full font-medium">
                    {unreadAlerts.length} new
                  </span>
                </div>
                <button
                  onClick={() => alerts.forEach(a => markAlertRead(a.id))}
                  className="text-[11px] text-slate-400 hover:text-[#16B8A5] transition-colors"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#1C2E46]/60">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      markAlertRead(alert.id);
                      if (alert.linkPage) setCurrentPage(alert.linkPage as any);
                      setShowNotifications(false);
                    }}
                    className={`p-3 text-xs cursor-pointer transition-colors ${
                      alert.read ? 'opacity-60 hover:opacity-100 hover:bg-[#182940]' : 'bg-[#16B8A5]/5 hover:bg-[#182940]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {alert.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#E5A84B] shrink-0 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16B8A5] shrink-0 mt-0.5" />}
                      {alert.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-200">{alert.title}</span>
                          <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-1 leading-snug">
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
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#132032] transition-colors border border-transparent hover:border-[#1C2E46]"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#16B8A5] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {user.avatarInitials}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-semibold text-slate-200 block leading-tight">{user.name}</span>
              <span className="text-[10px] text-slate-400 block leading-tight">Apex Forge LLP</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#132032] border border-[#1C2E46] rounded-2xl shadow-card overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-[#1C2E46]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#16B8A5]/20 text-[#16B8A5] flex items-center justify-center font-bold">
                    {user.avatarInitials}
                  </div>
                  <div>
                    <h5 className="font-heading font-semibold text-xs text-white">{user.name}</h5>
                    <p className="text-[11px] text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#1C2E46]/60 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Building2 className="w-3.5 h-3.5 text-[#16B8A5]" />
                  <span>GSTIN: {user.gstin}</span>
                </div>
              </div>

              <div className="p-1.5 space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setCurrentPage('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#182940] transition-colors"
                >
                  Company & GST Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    resetToSampleData();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#182940] flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#E5A84B]" />
                  <span>Reset Demo Data</span>
                </button>
                <div className="border-t border-[#1C2E46]/60 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
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
