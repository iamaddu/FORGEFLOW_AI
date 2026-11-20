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
  Receipt
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
      strokeWidth="2.5"
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
    setIsJudgeTourOpen
  } = useApp();

  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [showDemoVideoModal, setShowDemoVideoModal] = useState(false);

  return (
    <div className="space-y-6 pb-10">
      {/* 1. Hero Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#1C2E46] bg-gradient-to-r from-[#101B2B] via-[#0D1827] to-[#122238] shadow-card">
        {/* Subtle Industrial Robotic / Welder Aesthetic Background Overlay */}
        <div className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#16B8A5]/40 via-transparent to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none hidden md:block">
          {/* Stylized manufacturing spark geometric graphic */}
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" fill="none">
            <circle cx="320" cy="80" r="120" stroke="#16B8A5" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="320" cy="80" r="80" stroke="#E5A84B" strokeWidth="1" opacity="0.4" />
            <path d="M220 180 L320 80 L380 120" stroke="#16B8A5" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="320" cy="80" r="6" fill="#16B8A5" />
            <circle cx="350" cy="50" r="3" fill="#E5A84B" />
          </svg>
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between max-w-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1 text-slate-400 text-sm font-medium">
              <span>Welcome back,</span>
              <span className="text-white font-semibold">{user.name}</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Build Smarter. <br />
              <span className="text-[#16B8A5]">Grow Stronger.</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              Your AI-powered manufacturing partner for raw material procurement, job costing & quotation margins.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] font-heading font-bold text-xs transition-all shadow-glow"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Compare Supplier Quotes</span>
            </button>
            <button
              onClick={() => setCurrentPage('costing')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#132032] hover:bg-[#182940] border border-[#1C2E46] text-white text-xs font-semibold transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-[#E5A84B]" />
              <span>Create Production Cost Sheet</span>
            </button>
            <button
              onClick={() => setIsJudgeTourOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E5A84B]/10 hover:bg-[#E5A84B]/20 border border-[#E5A84B]/30 text-[#E5A84B] text-xs font-semibold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hackathon Walkthrough</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Procurement Spend */}
        <div
          onClick={() => setCurrentPage('procurement')}
          className="p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] hover:border-[#16B8A5]/50 transition-all cursor-pointer group shadow-card flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#16B8A5]/15 text-[#16B8A5] group-hover:scale-110 transition-transform">
              <Coins className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>12%</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-bold text-2xl text-white tracking-tight">₹4.8L</div>
              <div className="text-xs text-slate-400 mt-0.5">Total Procurement Spend</div>
            </div>
            <MiniSparkline color="#16B8A5" path="M0 24 Q 25 18, 50 22 T 100 8" />
          </div>
        </div>

        {/* Card 2: Active Suppliers */}
        <div
          onClick={() => setCurrentPage('suppliers')}
          className="p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] hover:border-purple-500/50 transition-all cursor-pointer group shadow-card flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-purple-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>1</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-bold text-2xl text-white tracking-tight">12</div>
              <div className="text-xs text-slate-400 mt-0.5">Active Suppliers</div>
            </div>
            <MiniSparkline color="#A855F7" path="M0 26 Q 30 20, 60 24 T 100 10" />
          </div>
        </div>

        {/* Card 3: Orders in Progress */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] hover:border-[#E5A84B]/50 transition-all cursor-pointer group shadow-card flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#E5A84B]/15 text-[#E5A84B] group-hover:scale-110 transition-transform">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#E5A84B]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>2</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-bold text-2xl text-white tracking-tight">8</div>
              <div className="text-xs text-slate-400 mt-0.5">Orders in Progress</div>
            </div>
            <MiniSparkline color="#E5A84B" path="M0 28 Q 35 15, 70 20 T 100 12" />
          </div>
        </div>

        {/* Card 4: Estimated Profit Margin */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] hover:border-emerald-500/50 transition-all cursor-pointer group shadow-card flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>3%</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-bold text-2xl text-white tracking-tight">24%</div>
              <div className="text-xs text-slate-400 mt-0.5">Estimated Profit Margin</div>
            </div>
            <MiniSparkline color="#10B981" path="M0 24 Q 40 16, 70 20 T 100 6" />
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Chart + Smart Insight + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Order Profitability Trend (lg:col-span-5) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#16B8A5]/15 text-[#16B8A5]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-white">Order Profitability Trend</h3>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#132032] border border-[#1C2E46] text-[11px] text-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#16B8A5]"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-[11px] mb-2 px-1 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16B8A5]" />
              <span className="text-slate-300">Your Margin</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-500 border-t border-dashed" />
              <span>Target (20%)</span>
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROFITABILITY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="marginTealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16B8A5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16B8A5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#4B5563" fontSize={11} tickLine={false} />
                <YAxis stroke="#4B5563" fontSize={11} tickFormatter={(v) => `${v}%`} domain={[0, 35]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#132032', borderColor: '#1C2E46', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }}
                  formatter={(val: any) => [`${val}%`, 'Margin']}
                />
                <ReferenceLine y={20} stroke="#64748B" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="#16B8A5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#marginTealGrad)"
                  dot={{ stroke: '#16B8A5', strokeWidth: 2, r: 3, fill: '#0A111D' }}
                  activeDot={{ r: 5, fill: '#16B8A5' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle: Smart Insight Card (lg:col-span-4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-[#132032] via-[#0E2030] to-[#0D1827] border border-[#16B8A5]/40 shadow-glow relative overflow-hidden flex flex-col justify-between">
          {/* Subtle industrial steel stack visual accent */}
          <div className="absolute right-3 bottom-3 opacity-20 pointer-events-none w-28 h-28">
            <svg viewBox="0 0 100 100" fill="none">
              <rect x="10" y="30" width="80" height="15" rx="3" fill="#16B8A5" />
              <rect x="15" y="50" width="75" height="15" rx="3" fill="#E5A84B" />
              <rect x="25" y="70" width="65" height="15" rx="3" fill="#16B8A5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-[#16B8A5]/20 text-[#16B8A5] shadow-glow">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="font-heading font-semibold text-xs text-[#16B8A5] tracking-wide uppercase">
                Smart Insight
              </span>
            </div>

            <h3 className="font-heading font-bold text-lg text-white leading-snug">
              Your current supplier quote is <span className="text-[#E5A84B]">8% higher</span> than the lowest offer.
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Based on recent quotes for <strong>MS Sheet 3mm</strong>, Jindal Alloys offers ₹48/kg, but Apex Steel’s lower freight yields a better landed cost.
            </p>
          </div>

          <div className="mt-5 relative z-10">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E5A84B] hover:bg-[#d6983b] text-[#0A111D] text-xs font-heading font-bold transition-all shadow-glowAmber"
            >
              <span>View Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Alerts (lg:col-span-3) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#E5A84B]" />
              <h3 className="font-heading font-semibold text-sm text-white">Alerts</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-[11px] text-[#16B8A5] hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Alert 1 */}
            <div
              onClick={() => setCurrentPage('invoices')}
              className="p-2.5 rounded-xl bg-[#132032] border border-rose-500/20 hover:border-rose-500/40 transition-colors cursor-pointer flex items-start gap-2.5"
            >
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-white truncate">GST Document Missing</span>
                  <span className="text-[10px] text-slate-400 shrink-0">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Invoice #INV-1042</p>
              </div>
            </div>

            {/* Alert 2 */}
            <div
              onClick={() => setCurrentPage('procurement')}
              className="p-2.5 rounded-xl bg-[#132032] border border-[#E5A84B]/20 hover:border-[#E5A84B]/40 transition-colors cursor-pointer flex items-start gap-2.5"
            >
              <div className="p-1.5 rounded-lg bg-[#E5A84B]/20 text-[#E5A84B] shrink-0 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-white truncate">Price Hike Alert</span>
                  <span className="text-[10px] text-slate-400 shrink-0">4h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Steel prices up by 5%</p>
              </div>
            </div>

            {/* Alert 3 */}
            <div
              onClick={() => setCurrentPage('quotations')}
              className="p-2.5 rounded-xl bg-[#132032] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer flex items-start gap-2.5"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs text-white truncate">Quotation Ready</span>
                  <span className="text-[10px] text-slate-400 shrink-0">5h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Order #Q-237</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Activity + Product Demo + Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Recent Activity (lg:col-span-4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#E5A84B]" />
            <h3 className="font-heading font-semibold text-sm text-white">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 3).map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[#132032] border border-[#1C2E46] text-[#16B8A5] shrink-0 mt-0.5">
                  {act.iconType === 'cart' && <ShoppingCart className="w-3.5 h-3.5" />}
                  {act.iconType === 'calculator' && <Calculator className="w-3.5 h-3.5" />}
                  {act.iconType === 'invoice' && <Receipt className="w-3.5 h-3.5" />}
                  {act.iconType === 'supplier' && <Users className="w-3.5 h-3.5" />}
                  {act.iconType === 'alert' && <AlertCircle className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 font-medium leading-snug">{act.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    by <span className="text-slate-300">{act.actor}</span> • {act.timeAgo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Watch Product Demo Card (lg:col-span-4) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card overflow-hidden flex flex-col justify-between group">
          <div
            onClick={() => setShowDemoVideoModal(true)}
            className="relative h-44 bg-gradient-to-t from-[#0A111D] to-[#1E293B] cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {/* Visual representation of manufacturing facility */}
            <div className="absolute inset-0 bg-[#0E1B2D] opacity-90 flex items-center justify-center">
              <svg className="w-full h-full opacity-30 object-cover" viewBox="0 0 300 160">
                <rect x="20" y="40" width="80" height="90" fill="#1C2E46" />
                <rect x="110" y="30" width="90" height="100" fill="#182940" />
                <rect x="210" y="50" width="70" height="80" fill="#1C2E46" />
                <polygon points="20,40 60,15 100,40" fill="#2A4060" />
                <polygon points="110,30 155,10 200,30" fill="#2A4060" />
                <polygon points="210,50 245,25 280,50" fill="#2A4060" />
              </svg>
            </div>

            {/* Play Button Icon */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-[#16B8A5]/90 text-[#0A111D] flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
              <span className="font-heading font-semibold">Watch Product Demo</span>
              <span className="p-1 rounded bg-[#0A111D]/80 text-[10px] text-slate-300 px-2">2:15 min</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Invoices (lg:col-span-4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#16B8A5]" />
              <h3 className="font-heading font-semibold text-sm text-white">Recent Invoices</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-[11px] text-[#16B8A5] hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {invoices.slice(0, 3).map((inv) => (
              <div
                key={inv.id}
                onClick={() => setCurrentPage('invoices')}
                className="p-2.5 rounded-xl bg-[#132032] border border-[#1C2E46] hover:border-slate-500 transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono font-medium text-white block">{inv.invoiceNumber}</span>
                    <span className="text-[10px] text-slate-400 block">{inv.invoiceDate}</span>
                  </div>
                </div>

                <div>
                  {inv.status === 'Extracted' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Extracted
                    </span>
                  )}
                  {inv.status === 'Verified' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      Verified
                    </span>
                  )}
                  {inv.status === 'Pending' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E5A84B]/20 text-[#E5A84B] border border-[#E5A84B]/30">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Demo Video Modal */}
      {showDemoVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#101B2B] border border-[#1C2E46] rounded-2xl p-6 max-w-xl w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1C2E46]">
              <div className="flex items-center gap-2 text-white font-heading font-semibold text-base">
                <Play className="w-4 h-4 text-[#16B8A5]" />
                <span>ForgeFlow AI Product Walkthrough</span>
              </div>
              <button
                onClick={() => setShowDemoVideoModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A111D] border border-[#1C2E46] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#16B8A5]/20 text-[#16B8A5] flex items-center justify-center mx-auto shadow-glow">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">Interactive Live Hackathon Demo</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Rather than watching a pre-recorded video, explore the live functional application right now! Jump through the 9-step guided walkthrough to test landed cost comparison, dynamic costing, quotations, and invoice OCR extraction.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDemoVideoModal(false);
                    setIsJudgeTourOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-bold shadow-glow flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start 9-Step Walkthrough</span>
                </button>
                <button
                  onClick={() => setShowDemoVideoModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#1C2E46] text-slate-300 text-xs font-medium hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
