import React, { useState } from 'react';
import {
  Coins,
  Users,
  ClipboardList,
  TrendingUp,
  ArrowUpRight,
  Lightbulb,
  ArrowRight,
  Bell,
  AlertCircle,
  Calendar,
  CheckCircle2,
  FileText,
  Zap,
  ShoppingCart,
  Calculator,
  Play,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { PROFITABILITY_TREND_DATA } from '../data/mockData';

const MiniSparkline: React.FC<{ color: string; path: string }> = ({ color, path }) => (
  <svg className="w-20 h-7 overflow-visible" viewBox="0 0 100 32" fill="none">
    <path d={path} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Dashboard: React.FC = () => {
  const { user, setCurrentPage, invoices, activities, setIsStoryModalOpen } = useApp();
  const [timeRange, setTimeRange] = useState('Last 6 Months');

  const recentInvoices = invoices.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">

      {/* ── HERO BANNER with Industrial Robotic Welding & Sparks ── */}
      <div className="relative rounded-3xl overflow-hidden min-h-[240px] flex items-center bg-gradient-to-r from-[#0D1522] via-[#132034] to-[#0D1522] border border-[#1E2E48] shadow-2xl">
        {/* Ambient subtle light glow */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#E5A84B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10 max-w-xl">
          <p className="text-slate-400 text-xs sm:text-sm font-medium mb-1">
            Welcome back, <span className="text-white font-bold">{user?.name?.split(' ')[0] ?? 'Ravi'}</span> 👋
          </p>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white leading-tight">
            Build Smarter.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16B8A5] to-[#45DFCE]">
              Grow Stronger.
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 max-w-md leading-relaxed">
            Your AI-powered manufacturing partner for raw material procurement, job costing &amp; quotation margins.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-sm font-heading font-black transition-all shadow-lg shadow-[#16B8A5]/20"
            >
              <ShoppingCart className="w-4 h-4" />
              Compare Supplier Quotes
            </button>
            <button
              onClick={() => setCurrentPage('costing')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#152238] hover:bg-[#1C2D4A] text-white text-sm font-heading font-bold transition-all border border-[#233550] shadow-sm"
            >
              <Calculator className="w-4 h-4 text-[#E5A84B]" />
              Create Production Cost Sheet
            </button>
          </div>
        </div>

        {/* Industrial Photography Hero Image */}
        <div className="absolute inset-0 flex items-stretch pointer-events-none">
          <div className="flex-1" />
          <div className="w-full sm:w-7/12 relative">
            <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#0D1522] via-[#0D1522]/80 to-transparent z-10" />
            <img
              src="/industrial-hero.jpg"
              alt="Precision Industrial Robotic Welding"
              className="w-full h-full object-cover object-right-top opacity-75 mix-blend-screen"
              style={{ maxHeight: 260 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1522]/90 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* ── 4 KPI CARDS ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Spend */}
        <div
          onClick={() => setCurrentPage('procurement')}
          className="p-5 rounded-2xl bg-[#131F33] hover:bg-[#16253D] shadow-lg border border-[#1E2E48] hover:border-[#16B8A5]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#16B8A5]/10 text-[#16B8A5] border border-[#16B8A5]/20">
              <Coins className="w-4 h-4" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-[#16B8A5] bg-[#16B8A5]/10 px-2 py-0.5 rounded-full border border-[#16B8A5]/20">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">₹4.8L</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Total Procurement Spend</div>
            </div>
            <MiniSparkline color="#16B8A5" path="M0 24 Q 25 18, 50 22 T 100 8" />
          </div>
        </div>

        {/* Card 2: Active Suppliers */}
        <div
          onClick={() => setCurrentPage('suppliers')}
          className="p-5 rounded-2xl bg-[#131F33] hover:bg-[#16253D] shadow-lg border border-[#1E2E48] hover:border-[#8B5CF6]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-4 h-4" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              <ArrowUpRight className="w-3 h-3" /> 1
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">12</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Active Suppliers</div>
            </div>
            <MiniSparkline color="#8B5CF6" path="M0 26 Q 30 20, 60 24 T 100 10" />
          </div>
        </div>

        {/* Card 3: Orders in Progress */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-2xl bg-[#131F33] hover:bg-[#16253D] shadow-lg border border-[#1E2E48] hover:border-[#E5A84B]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#E5A84B]/10 text-[#E5A84B] border border-[#E5A84B]/20">
              <ClipboardList className="w-4 h-4" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-[#E5A84B] bg-[#E5A84B]/10 px-2 py-0.5 rounded-full border border-[#E5A84B]/20">
              <ArrowUpRight className="w-3 h-3" /> 2
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">8</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Orders in Progress</div>
            </div>
            <MiniSparkline color="#E5A84B" path="M0 28 Q 35 15, 70 20 T 100 12" />
          </div>
        </div>

        {/* Card 4: Estimated Profit Margin */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-2xl bg-[#131F33] hover:bg-[#16253D] shadow-lg border border-[#1E2E48] hover:border-[#10B981]/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <ArrowUpRight className="w-3 h-3" /> 3%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white">24%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Estimated Profit Margin</div>
            </div>
            <MiniSparkline color="#10B981" path="M0 24 Q 40 16, 70 20 T 100 6" />
          </div>
        </div>
      </div>

      {/* ── CHART + SMART INSIGHT + ALERTS ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Order Profitability Trend (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#131F33] shadow-lg border border-[#1E2E48] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#16B8A5]/10 text-[#16B8A5]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-black text-sm text-white">Order Profitability Trend</h3>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#182842] border border-[#243754] text-xs text-slate-300 rounded-lg px-2.5 py-1 focus:outline-none font-semibold"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-xs mb-3 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16B8A5]" />
              <span className="font-semibold text-slate-200">Your Margin</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-px bg-slate-500 border-t border-dashed inline-block" />
              <span>Target (20%)</span>
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROFITABILITY_TREND_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGrad3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16B8A5" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#16B8A5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickFormatter={(v) => `${v}%`} domain={[0, 35]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#131F33', borderColor: '#233550', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }}
                  formatter={(val: any) => [`${val}%`, 'Margin']}
                />
                <ReferenceLine y={20} stroke="#475569" strokeDasharray="4 4" />
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="#16B8A5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tealGrad3)"
                  dot={{ stroke: '#16B8A5', strokeWidth: 2, r: 3, fill: '#131F33' }}
                  activeDot={{ r: 5, fill: '#E5A84B', stroke: '#16B8A5' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Insight Card (lg:col-span-4) */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#122A36] via-[#112431] to-[#0E1F2C] border border-[#16B8A5]/30 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#16B8A5]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/30">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-black tracking-widest uppercase text-[#16B8A5]">
                Smart Insight
              </span>
            </div>
            <h3 className="font-heading font-black text-xl text-white leading-snug">
              Your current supplier quote is{' '}
              <span className="text-[#E5A84B] underline decoration-[#E5A84B]/60 decoration-2">8% higher</span> than the lowest offer.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Apex Steel’s lower delivery charge yields a lower true landed cost vs. Jindal Alloys for MS Sheet 3mm.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1E2E48] flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8A5] to-[#0E9786] hover:from-[#139E8E] hover:to-[#0C8575] text-[#0B1320] text-xs font-heading font-black transition-all shadow-md"
            >
              <span>View Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#E5A84B] bg-[#E5A84B]/10 px-2.5 py-1 rounded-full border border-[#E5A84B]/20">
              Save ₹2,400
            </span>
          </div>
        </div>

        {/* Alerts (lg:col-span-3) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-[#131F33] shadow-lg border border-[#1E2E48] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#E5A84B]" />
              <h3 className="font-heading font-black text-sm text-white">Alerts</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#16B8A5] hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="space-y-2.5 flex-1">
            <div
              onClick={() => setCurrentPage('invoices')}
              className="p-3 rounded-xl bg-[#1A1829] border border-rose-500/20 cursor-pointer hover:border-rose-500/40 transition-all flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">GST Document Missing</span>
                  <span className="text-[10px] text-slate-500 ml-2">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Invoice #INV-1042</p>
              </div>
            </div>

            <div
              onClick={() => setCurrentPage('procurement')}
              className="p-3 rounded-xl bg-[#231E18] border border-amber-500/20 cursor-pointer hover:border-amber-500/40 transition-all flex items-start gap-2.5"
            >
              <Calendar className="w-4 h-4 text-[#E5A84B] shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Price Hike Alert</span>
                  <span className="text-[10px] text-slate-500 ml-2">4h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Steel prices up by 5%</p>
              </div>
            </div>

            <div
              onClick={() => setCurrentPage('quotations')}
              className="p-3 rounded-xl bg-[#132822] border border-emerald-500/20 cursor-pointer hover:border-emerald-500/40 transition-all flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Quotation Ready</span>
                  <span className="text-[10px] text-slate-500 ml-2">5h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Order #Q-237</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Recent Activity + Modern CNC Video + Invoices ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <div className="p-5 rounded-2xl bg-[#131F33] shadow-lg border border-[#1E2E48]">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#E5A84B]" />
            <h3 className="font-heading font-black text-sm text-white">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: ShoppingCart, text: 'New supplier quotation added', sub: 'by You · 2m ago', color: '#16B8A5' },
              { icon: Calculator, text: 'Costing analysis completed', sub: 'for Order #243 · 5m ago', color: '#E5A84B' },
              { icon: FileText, text: 'Invoice processed', sub: 'INV-1042 · 10m ago', color: '#8B5CF6' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg shrink-0 border"
                  style={{
                    backgroundColor: `${a.color}15`,
                    borderColor: `${a.color}30`,
                    color: a.color,
                  }}
                >
                  <a.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{a.text}</p>
                  <p className="text-[11px] text-slate-500">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern CNC Machining & Plant Story Card */}
        <div
          onClick={() => setIsStoryModalOpen(true)}
          className="relative rounded-2xl overflow-hidden cursor-pointer group min-h-[160px] border border-[#1E2E48] shadow-lg"
        >
          <img
            src="/cnc-machining.jpg"
            alt="Modern Precision CNC Manufacturing"
            className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-500 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#16B8A5] flex items-center justify-center shadow-lg shadow-[#16B8A5]/30 group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-[#0B1320] ml-0.5" fill="#0B1320" />
            </div>
            <div className="text-center">
              <span className="text-white font-heading font-black text-sm block">A Day with ForgeFlow</span>
              <span className="text-slate-300 text-[11px]">Watch 4-step manufacturing walkthrough</span>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="p-5 rounded-2xl bg-[#131F33] shadow-lg border border-[#1E2E48]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#16B8A5]" />
              <h3 className="font-heading font-black text-sm text-white">Recent Invoices</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#16B8A5] hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2.5">
            {recentInvoices.map((inv) => {
              const statusBadge =
                inv.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : inv.status === 'Extracted' ? 'bg-[#16B8A5]/10 text-[#16B8A5] border border-[#16B8A5]/20'
                : 'bg-[#E5A84B]/10 text-[#E5A84B] border border-[#E5A84B]/20';
              return (
                <div
                  key={inv.id}
                  onClick={() => setCurrentPage('invoices')}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#182842] rounded-xl px-2.5 py-2 transition-colors border border-transparent hover:border-[#243754]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#182842] text-slate-400">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{inv.invoiceNumber}</p>
                      <p className="text-[10px] text-slate-400">{inv.supplierName.split(' ')[0]}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge}`}>
                    {inv.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
