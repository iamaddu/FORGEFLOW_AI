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
  Check
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
      {/* 1. Slide 2 Style Top Header Bar: "Start local. Scale across manufacturing clusters." */}
      <div className="bg-white rounded-3xl p-5 shadow-card text-center relative overflow-hidden border-2 border-white/60">
        <h2 className="font-heading font-black text-xl sm:text-2xl text-[#1E1638] tracking-tight">
          Start local. Scale across manufacturing clusters.
        </h2>
        <div className="w-48 h-1 bg-[#1A957E] mx-auto mt-2 rounded-full" />
      </div>

      {/* 2. Hero Row: Big Metric Card (7.16 crore style) + Pilot/Expand/Scale Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 7.16 crore / Workshop Reality Card (lg:col-span-6) */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white shadow-card border-2 border-white/60 flex flex-col justify-between">
          <div>
            <div className="font-heading font-black text-5xl sm:text-6xl text-[#523D8A] tracking-tight">
              7.16 crore
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-2 leading-relaxed">
              registered MSMEs in India, reported Feb 2026. <br />
              <span className="text-slate-500 font-normal">Market context: helping fabricators eliminate hidden purchasing leakages.</span>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="italic">Source: Business Today, Feb 2026</span>
            <button
              onClick={() => setCurrentPage('procurement')}
              className="text-[#523D8A] font-bold hover:underline flex items-center gap-1"
            >
              <span>Explore MSME Landed Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Slide 2 Peach List (Pilot / Expand / Scale) (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
          {/* Step 1: Pilot */}
          <div className="p-4 rounded-3xl bg-[#F8C8BE] text-[#1E1638] shadow-card flex items-center gap-4 border border-[#F5C5B8]">
            <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm shrink-0">
              1
            </div>
            <div>
              <h4 className="font-heading font-black text-base text-[#1E1638]">Pilot</h4>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Selected MSMEs in one cluster (Ravi's fabrication unit in Bhosari MIDC, Pune)
              </p>
            </div>
          </div>

          {/* Step 2: Expand */}
          <div className="p-4 rounded-3xl bg-[#F8C8BE] text-[#1E1638] shadow-card flex items-center gap-4 border border-[#F5C5B8]">
            <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm shrink-0">
              2
            </div>
            <div>
              <h4 className="font-heading font-black text-base text-[#1E1638]">Expand</h4>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Through engineering associations, supplier networks, and metal trade partners
              </p>
            </div>
          </div>

          {/* Step 3: Scale */}
          <div className="p-4 rounded-3xl bg-[#F8C8BE] text-[#1E1638] shadow-card flex items-center gap-4 border border-[#F5C5B8]">
            <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm shrink-0">
              3
            </div>
            <div>
              <h4 className="font-heading font-black text-base text-[#1E1638]">Scale</h4>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Across Indian manufacturing clusters (Chakan, Coimbatore, Peenya, Manesar)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Operational Manufacturing Metrics (Spend ₹4.8L, Suppliers 12, Orders 8, Margin 24%) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Spend */}
        <div
          onClick={() => setCurrentPage('procurement')}
          className="p-5 rounded-3xl bg-white text-[#1E1638] shadow-card hover:border-[#523D8A] border-2 border-white transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#EFEBF8] text-[#523D8A]">
              <Coins className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>12%</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">₹4.8L</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Total Procurement Spend</div>
            </div>
            <MiniSparkline color="#523D8A" path="M0 24 Q 25 18, 50 22 T 100 8" />
          </div>
        </div>

        {/* Card 2: Active Suppliers */}
        <div
          onClick={() => setCurrentPage('suppliers')}
          className="p-5 rounded-3xl bg-white text-[#1E1638] shadow-card hover:border-[#523D8A] border-2 border-white transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#FEF3D6] text-amber-700">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>1</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">12</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Active Suppliers</div>
            </div>
            <MiniSparkline color="#F5A636" path="M0 26 Q 30 20, 60 24 T 100 10" />
          </div>
        </div>

        {/* Card 3: Orders in Progress */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-3xl bg-white text-[#1E1638] shadow-card hover:border-[#523D8A] border-2 border-white transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#F8C8BE] text-orange-900">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>2</span>
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">8</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Orders in Progress</div>
            </div>
            <MiniSparkline color="#EA580C" path="M0 28 Q 35 15, 70 20 T 100 12" />
          </div>
        </div>

        {/* Card 4: Estimated Profit Margin */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-3xl bg-white text-[#1E1736] shadow-card hover:border-[#523D8A] border-2 border-white transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
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

      {/* 4. Middle Section: Chart + Smart Insight Card + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Order Profitability Trend (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white text-[#1E1638] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-[#EFEBF8] text-[#523D8A]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-black text-sm text-[#1E1638]">
                Order Profitability Trend
              </h3>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-100 border border-slate-200 text-xs text-slate-700 rounded-xl px-2.5 py-1 focus:outline-none font-bold"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Year to Date</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-xs mb-2 px-1 text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#523D8A]" />
              <span className="font-bold text-slate-800">Ravi's Margin</span>
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
                  <linearGradient id="purpleGradBright" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#523D8A" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#523D8A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `${v}%`} domain={[0, 35]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '16px', fontSize: '11px', color: '#1E1638', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [`${val}%`, 'Margin']}
                />
                <ReferenceLine y={20} stroke="#94A3B8" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="#523D8A"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#purpleGradBright)"
                  dot={{ stroke: '#523D8A', strokeWidth: 2, r: 4, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, fill: '#F5A636', stroke: '#523D8A' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle: Smart Insight Card (Peach / Coral Theme - lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#F8C8BE] text-[#1E1638] shadow-card flex flex-col justify-between border border-[#F5C5B8]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-2xl bg-white text-[#523D8A] shadow-sm">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-xs text-[#523D8A] tracking-wider uppercase">
                Smart Procurement Insight
              </span>
            </div>

            <h3 className="font-heading font-black text-lg text-[#1E1736] leading-snug">
              Your current supplier quote is <span className="underline decoration-2 decoration-[#523D8A]">8% higher</span> than the lowest offer.
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Jindal Alloys quoted ₹48/kg for <strong>MS Sheet 3mm</strong>, but charges ₹1,500 freight. Apex Steel’s lower delivery charge yields a lower true landed cost!
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white text-xs font-heading font-black transition-all shadow-md"
            >
              <span>View Landed Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold text-[#523D8A]">Save ₹2,400</span>
          </div>
        </div>

        {/* Right: Alerts (lg:col-span-3) */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-white text-[#1E1638] shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F5A636]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Alerts</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#523D8A] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Alert 1 */}
            <div
              onClick={() => setCurrentPage('invoices')}
              className="p-2.5 rounded-2xl bg-[#FEF2F2] border border-rose-200 transition-colors cursor-pointer flex items-start gap-2.5"
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
              className="p-2.5 rounded-2xl bg-[#FEF3D6] border border-amber-200 transition-colors cursor-pointer flex items-start gap-2.5"
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
              className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 transition-colors cursor-pointer flex items-start gap-2.5"
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

      {/* 5. Bottom Row: Three Slide 2 Style Cards ([SEGMENTS], [ALTERNATIVES TODAY], [PRICING HYPOTHESIS]) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: SEGMENTS */}
        <div className="bg-white rounded-3xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#523D8A] text-white text-[10px] font-heading font-black uppercase tracking-wider mb-3">
              SEGMENTS
            </span>
            <p className="text-sm font-bold text-[#1E1638] leading-relaxed">
              Metal fabrication, precision CNC machining, sheet metal works, and automotive component makers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1A957E]">
            <span>Active in Bhosari, Pune</span>
            <span>✓ Verified</span>
          </div>
        </div>

        {/* Card 2: ALTERNATIVES TODAY */}
        <div className="bg-white rounded-3xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#523D8A] text-white text-[10px] font-heading font-black uppercase tracking-wider mb-3">
              ALTERNATIVES TODAY
            </span>
            <p className="text-sm font-bold text-[#1E1638] leading-relaxed">
              WhatsApp and unorganized Excel sheets, standalone accounting software, and bulky expensive ERPs.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
            <span>High manual error rate</span>
            <span>8% profit leak</span>
          </div>
        </div>

        {/* Card 3: PRICING HYPOTHESIS */}
        <div className="bg-white rounded-3xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#523D8A] text-white text-[10px] font-heading font-black uppercase tracking-wider mb-3">
              PRICING HYPOTHESIS
            </span>
            <p className="text-sm font-bold text-[#1E1638] leading-relaxed">
              Affordable monthly subscription per manufacturing unit plus premium modules for multi-plant costing.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#523D8A]">
            <span>Tailored for Indian MSMEs</span>
            <button
              onClick={() => setIsStoryModalOpen(true)}
              className="hover:underline flex items-center gap-1"
            >
              <span>See Story →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
