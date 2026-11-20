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
    <header className="h-16 px-6 bg-[#392A62]/90 backdrop-blur-md border-b border-[#4E3C80] flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-[#D4C8EE] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search materials, orders, suppliers, invoices..."
          className="w-full bg-[#2E2052] border border-[#4E3C80] text-sm text-white placeholder:text-[#D4C8EE]/60 pl-9 pr-4 py-2 rounded-2xl focus:outline-none focus:border-[#FAD5C8] focus:ring-1 focus:ring-[#FAD5C8] transition-all"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Storyboard Button: A Day with ForgeFlow */}
        <button
          onClick={() => setIsStoryModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-heading font-bold transition-all shadow-md"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>A Day with ForgeFlow</span>
        </button>

        {/* Reset Demo Data quick pill */}
        <button
          onClick={resetToSampleData}
          className="p-2 rounded-xl text-[#D4C8EE] hover:text-white hover:bg-[#4E3C80] transition-colors border border-transparent hover:border-[#4E3C80]"
          title="Reset Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-[#D4C8EE] hover:text-white hover:bg-[#4E3C80] transition-colors relative border border-transparent hover:border-[#4E3C80]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#392A62]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#2E2052] border border-[#4E3C80] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-[#4E3C80] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-white">Notifications</span>
                  <span className="text-xs bg-[#FAD5C8] text-[#1E1736] px-2 py-0.5 rounded-full font-bold">
                    {unreadAlerts.length} new
                  </span>
                </div>
                <button
                  onClick={() => alerts.forEach(a => markAlertRead(a.id))}
                  className="text-[11px] text-[#D4C8EE] hover:text-white transition-colors"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#4E3C80]/60">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      markAlertRead(alert.id);
                      if (alert.linkPage) setCurrentPage(alert.linkPage as any);
                      setShowNotifications(false);
                    }}
                    className={`p-3 text-xs cursor-pointer transition-colors ${
                      alert.read ? 'opacity-60 hover:opacity-100 hover:bg-[#392A62]' : 'bg-white/5 hover:bg-[#392A62]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {alert.type === 'danger' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#F9C349] shrink-0 mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />}
                      {alert.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{alert.title}</span>
                          <span className="text-[10px] text-[#D4C8EE]">{alert.timestamp}</span>
                        </div>
                        <p className="text-[#D4C8EE] text-[11px] mt-1 leading-snug">
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

        {/* User Profile Badge (Ravi Sharma) */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl hover:bg-[#4E3C80] transition-colors border border-transparent hover:border-[#4E3C80]"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FAD5C8] to-[#F9C349] flex items-center justify-center text-[#1E1736] text-xs font-black shadow-sm">
              {user.avatarInitials}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-bold text-white block leading-tight">{user.name}</span>
              <span className="text-[10px] text-[#D4C8EE] block leading-tight">Ravi Fabrication</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#D4C8EE]" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#2E2052] border border-[#4E3C80] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-[#4E3C80]">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#FAD5C8] text-[#1E1736] flex items-center justify-center font-bold">
                    {user.avatarInitials}
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-white">{user.name}</h5>
                    <p className="text-[11px] text-[#D4C8EE]">{user.email}</p>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#4E3C80]/60 flex items-center gap-1.5 text-[11px] text-[#D4C8EE]">
                  <Building2 className="w-3.5 h-3.5 text-[#FAD5C8]" />
                  <span>GSTIN: {user.gstin}</span>
                </div>
              </div>

              <div className="p-1.5 space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setCurrentPage('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-[#392A62] transition-colors"
                >
                  Plant & GST Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    resetToSampleData();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-white hover:bg-[#392A62] flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#F9C349]" />
                  <span>Reset Sample Data</span>
                </button>
                <div className="border-t border-[#4E3C80]/60 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-300 hover:bg-rose-500/20 flex items-center gap-2 transition-colors"
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
