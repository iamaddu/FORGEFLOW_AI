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
  Play,
  X,
  Sparkles,
  Zap,
  ShoppingCart,
  Calculator,
  Receipt,
  BookOpen,
  Truck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useApp } from '../context/AppContext';
import { PROFITABILITY_TREND_DATA } from '../data/mockData';

// Mini Sparkline SVG component for the 4 metric cards
const MiniSparkline: React.FC<{ color: string; path: string }> = ({ color, path }) => (
  <svg className="w-24 h-8 overflow-visible" viewBox="0 0 100 32" fill="none">
    <path
      d={path}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Dashboard: React.FC = () => {
  const {
    user,
    setCurrentPage,
    invoices,
    alerts,
    activities,
    setIsStoryModalOpen
  } = useApp();

  const [timeRange, setTimeRange] = useState('Last 6 Months');

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Header Banner matching Ravi's Storyboard Theme */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#392A62] via-[#4E3C80] to-[#5D4996] border-2 border-white/20 shadow-2xl p-6 sm:p-8 text-white">
        {/* Soft sunlight background radial orb */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#F9C349]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-[#FAD5C8] text-[#1E1736] px-3 py-1 rounded-full text-xs font-bold font-heading">
                Ravi's Fabrication Unit
              </span>
              <span className="text-xs text-[#E8E2F6]">MIDC Bhosari, Pune</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Build Smarter. <br />
              <span className="text-[#FAD5C8]">Grow Profitably.</span>
            </h1>

            <p className="text-sm text-[#E8E2F6] leading-relaxed">
              Real-time landed cost comparison, deterministic job costing, and automated invoice verification for your workshop.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentPage('procurement')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] font-heading font-bold text-xs transition-all shadow-md"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Compare Supplier Bids</span>
              </button>

              <button
                onClick={() => setCurrentPage('costing')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-[#F9C349]" />
                <span>Create Cost Sheet</span>
              </button>

              <button
                onClick={() => setIsStoryModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F9C349] hover:bg-[#eab33a] text-[#1E1736] text-xs font-heading font-bold transition-all shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>A Day with ForgeFlow</span>
              </button>
            </div>
          </div>

          {/* Right Visual Badge: Ravi Character / Story Teaser */}
          <div
            onClick={() => setIsStoryModalOpen(true)}
            className="bg-white text-[#1E1736] rounded-2xl p-4 shadow-xl border-2 border-slate-100 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform shrink-0"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FEF3D6] flex items-center justify-center text-3xl shadow-sm">
              👨🏽‍🏭
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#4E3C80] tracking-wider block">
                Illustrative Scenario
              </span>
              <div className="font-heading font-black text-sm text-[#1E1736]">
                Ravi's Workflow
              </div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                <span>See 6-step journey</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards (Crisp White / Lavender Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Spend */}
        <div
          onClick={() => setCurrentPage('procurement')}
          className="p-5 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card hover:border-[#4E3C80] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#E8E2F6] text-[#4E3C80]">
              <Coins className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>12%</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1736]">₹4.8L</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Total Procurement Spend</div>
            </div>
            <MiniSparkline color="#4E3C80" path="M0 24 Q 25 18, 50 22 T 100 8" />
          </div>
        </div>

        {/* Card 2: Active Suppliers */}
        <div
          onClick={() => setCurrentPage('suppliers')}
          className="p-5 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card hover:border-[#4E3C80] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#FEF3D6] text-[#D97706]">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>1</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1736]">12</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Active Suppliers</div>
            </div>
            <MiniSparkline color="#F59E0B" path="M0 26 Q 30 20, 60 24 T 100 10" />
          </div>
        </div>

        {/* Card 3: Orders in Progress */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card hover:border-[#4E3C80] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#FDECE6] text-[#EA580C]">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>2</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1736]">8</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Orders in Progress</div>
            </div>
            <MiniSparkline color="#EA580C" path="M0 28 Q 35 15, 70 20 T 100 12" />
          </div>
        </div>

        {/* Card 4: Estimated Profit Margin */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card hover:border-[#4E3C80] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#D1FAE5] text-[#059669]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              <span>3%</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1736]">24%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Estimated Profit Margin</div>
            </div>
            <MiniSparkline color="#10B981" path="M0 24 Q 40 16, 70 20 T 100 6" />
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Chart + Smart Insight + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Order Profitability Trend (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-[#E8E2F6] text-[#4E3C80]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#1E1736]">
                Order Profitability Trend
              </h3>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#F3F0FA] border border-[#D2C6EA] text-xs text-slate-700 rounded-xl px-2.5 py-1 focus:outline-none font-medium"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-xs mb-2 px-1 text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#4E3C80]" />
              <span className="font-semibold text-slate-700">Ravi's Margin</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-400 border-t border-dashed" />
              <span>Target (20%)</span>
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROFITABILITY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4E3C80" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4E3C80" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `${v}%`} domain={[0, 35]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D2C6EA', borderRadius: '16px', fontSize: '11px', color: '#1E1736', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [`${val}%`, 'Margin']}
                />
                <ReferenceLine y={20} stroke="#94A3B8" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="#4E3C80"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#purpleGradient)"
                  dot={{ stroke: '#4E3C80', strokeWidth: 2, r: 4, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, fill: '#FAD5C8', stroke: '#4E3C80' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle: Smart Insight Card (Peach / Coral Theme - lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#FAD5C8] text-[#1E1736] border-2 border-[#F8C4B4] shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-2xl bg-white text-[#4E3C80] shadow-sm">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-xs text-[#4E3C80] tracking-wide uppercase">
                Smart Procurement Insight
              </span>
            </div>

            <h3 className="font-heading font-black text-lg text-[#1E1736] leading-snug">
              Your current supplier quote is <span className="underline decoration-2 decoration-[#4E3C80]">8% higher</span> than the lowest offer.
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Jindal Alloys quoted ₹48/kg for <strong>MS Sheet 3mm</strong>, but charges ₹1,500 freight. Apex Steel’s lower delivery charge yields a lower true landed cost!
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E1736]/10 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4E3C80] hover:bg-[#3B2C63] text-white text-xs font-heading font-bold transition-all shadow-md"
            >
              <span>View Landed Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-[#4E3C80]">Save ₹2,400</span>
          </div>
        </div>

        {/* Right: Alerts (lg:col-span-3) */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="font-heading font-bold text-sm text-[#1E1736]">Alerts</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#4E3C80] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Alert 1 */}
            <div
              onClick={() => setCurrentPage('invoices')}
              className="p-2.5 rounded-2xl bg-[#FEF2F2] border border-rose-200 hover:border-rose-300 transition-colors cursor-pointer flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="truncate">GST Document Missing</span>
                  <span className="text-[10px] text-slate-400 font-normal">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate">Invoice #INV-1042</p>
              </div>
            </div>

            {/* Alert 2 */}
            <div
              onClick={() => setCurrentPage('procurement')}
              className="p-2.5 rounded-2xl bg-[#FEF3D6] border border-amber-200 hover:border-amber-300 transition-colors cursor-pointer flex items-start gap-2.5"
            >
              <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="truncate">Steel Price Hike</span>
                  <span className="text-[10px] text-slate-400 font-normal">4h ago</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate">Steel prices up by 5%</p>
              </div>
            </div>

            {/* Alert 3 */}
            <div
              onClick={() => setCurrentPage('quotations')}
              className="p-2.5 rounded-2xl bg-[#D1FAE5] border border-emerald-200 hover:border-emerald-300 transition-colors cursor-pointer flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="truncate">Quotation Ready</span>
                  <span className="text-[10px] text-slate-400 font-normal">5h ago</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate">Order #Q-237</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Activity + Story Teaser + Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Recent Activity (lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="font-heading font-bold text-sm text-[#1E1736]">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 3).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-xl bg-[#F3F0FA] text-[#4E3C80] shrink-0 mt-0.5">
                  {act.iconType === 'cart' && <ShoppingCart className="w-3.5 h-3.5" />}
                  {act.iconType === 'calculator' && <Calculator className="w-3.5 h-3.5" />}
                  {act.iconType === 'invoice' && <Receipt className="w-3.5 h-3.5" />}
                  {act.iconType === 'supplier' && <Users className="w-3.5 h-3.5" />}
                  {act.iconType === 'alert' && <AlertCircle className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-semibold leading-snug">{act.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    by {act.actor} • {act.timeAgo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: A Day with ForgeFlow Visual Comic Card (lg:col-span-4) */}
        <div
          onClick={() => setIsStoryModalOpen(true)}
          className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#FEF3D6] to-[#FAD5C8] border-2 border-[#FAD5C8] shadow-card p-6 flex flex-col justify-between cursor-pointer hover:shadow-2xl transition-all group"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono font-bold text-[#4E3C80] tracking-wider">
                Illustrated Journey
              </span>
              <span className="bg-[#4E3C80] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                6 Steps
              </span>
            </div>

            <h3 className="font-heading font-black text-xl text-[#1E1736]">
              A day with ForgeFlow
            </h3>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              How Ravi receives 3 quotes on WhatsApp, compares landed costs, and sends margin-safe quotes with zero surprises.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between bg-white/70 backdrop-blur-sm p-3 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨🏽‍🏭</span>
              <span className="text-xs font-bold text-[#1E1736]">Ravi's Fabrication Unit</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-[#4E3C80] group-hover:translate-x-1 transition-transform">
              <span>Read Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right: Recent Invoices (lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4E3C80]" />
              <h3 className="font-heading font-bold text-sm text-[#1E1736]">Recent Invoices</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#4E3C80] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {invoices.slice(0, 3).map((inv) => (
              <div
                key={inv.id}
                onClick={() => setCurrentPage('invoices')}
                className="p-3 rounded-2xl bg-[#F3F0FA] hover:bg-[#E8E2F6] transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-[#1E1736] block">{inv.invoiceNumber}</span>
                  <span className="text-[10px] text-slate-500 block">{inv.invoiceDate}</span>
                </div>

                <div>
                  {inv.status === 'Extracted' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D1FAE5] text-emerald-800">
                      Extracted
                    </span>
                  )}
                  {inv.status === 'Verified' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8E2F6] text-[#4E3C80]">
                      Verified
                    </span>
                  )}
                  {inv.status === 'Pending' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FEF3D6] text-amber-800">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
