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
    <div className="space-y-5 pb-10">

      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden min-h-[220px] flex items-center bg-gradient-to-r from-[#3B2868] via-[#4F3987] to-[#3B2868] border border-white/20 shadow-xl">
        {/* Dark overlay + content */}
        <div className="relative z-10 p-8 max-w-lg">
          <p className="text-[#F8C8BE] text-sm font-bold mb-1">Welcome back, {user?.name?.split(' ')[0] ?? 'Ravi'} 👋</p>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white leading-tight">
            Build Smarter.<br />
            <span className="text-[#F5A636]">Grow Stronger.</span>
          </h1>
          <p className="text-white/80 text-sm mt-3 max-w-xs leading-relaxed font-medium">
            Your AI-powered manufacturing partner for raw material procurement, job costing &amp; quotation margins.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-sm font-heading font-black transition-all shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              Compare Supplier Quotes
            </button>
            <button
              onClick={() => setCurrentPage('costing')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-heading font-bold transition-all border border-white/25"
            >
              <Calculator className="w-4 h-4" />
              Create Production Cost Sheet
            </button>
          </div>
        </div>

        {/* Hero Image — Ravi's Workshop */}
        <div className="absolute inset-0 flex items-stretch">
          <div className="flex-1" />
          <div className="w-1/2 relative">
            {/* Gradient fade to left */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#4F3987] to-transparent z-10" />
            <img
              src="/ravi-workshop.jpg"
              alt="Ravi's fabrication workshop"
              className="w-full h-full object-cover object-center opacity-85"
              style={{ maxHeight: 240 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B2868]/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* ── KPI CARDS ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setCurrentPage('procurement')}
          className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-[#523D8A]/40 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-[#EFEBF8]">
              <Coins className="w-4 h-4 text-[#523D8A]" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />12%
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">₹4.8L</div>
              <div className="text-xs text-slate-500 mt-0.5">Total Procurement Spend</div>
            </div>
            <MiniSparkline color="#523D8A" path="M0 24 Q 25 18, 50 22 T 100 8" />
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setCurrentPage('suppliers')}
          className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-[#F5A636]/50 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-[#FEF3D6]">
              <Users className="w-4 h-4 text-amber-700" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />1
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">12</div>
              <div className="text-xs text-slate-500 mt-0.5">Active Suppliers</div>
            </div>
            <MiniSparkline color="#F5A636" path="M0 26 Q 30 20, 60 24 T 100 10" />
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-orange-400/50 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-orange-50">
              <ClipboardList className="w-4 h-4 text-orange-600" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />2
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">8</div>
              <div className="text-xs text-slate-500 mt-0.5">Orders in Progress</div>
            </div>
            <MiniSparkline color="#EA580C" path="M0 28 Q 35 15, 70 20 T 100 12" />
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => setCurrentPage('costing')}
          className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-emerald-400/50 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-emerald-50">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />3%
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="font-heading font-black text-2xl text-[#1E1638]">24%</div>
              <div className="text-xs text-slate-500 mt-0.5">Estimated Profit Margin</div>
            </div>
            <MiniSparkline color="#10B981" path="M0 24 Q 40 16, 70 20 T 100 6" />
          </div>
        </div>
      </div>

      {/* ── CHART + INSIGHT + ALERTS ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Order Profitability Trend */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#EFEBF8]">
                <TrendingUp className="w-4 h-4 text-[#523D8A]" />
              </div>
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Order Profitability Trend</h3>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-2 py-1 focus:outline-none font-semibold"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="flex items-center gap-4 text-xs mb-3 text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#523D8A]" />
              <span className="font-semibold text-slate-700">Your Margin</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-px bg-slate-400 border-t border-dashed inline-block" />
              <span>Target</span>
            </span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROFITABILITY_TREND_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#523D8A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#523D8A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#CBD5E1" fontSize={10} tickLine={false} />
                <YAxis stroke="#CBD5E1" fontSize={10} tickFormatter={(v) => `${v}%`} domain={[0, 35]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '11px', color: '#1E1638' }}
                  formatter={(val: any) => [`${val}%`, 'Margin']}
                />
                <ReferenceLine y={20} stroke="#CBD5E1" strokeDasharray="4 4" />
                <Area
                  type="monotone"
                  dataKey="margin"
                  stroke="#523D8A"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#purpleGrad)"
                  dot={{ stroke: '#523D8A', strokeWidth: 2, r: 3, fill: '#fff' }}
                  activeDot={{ r: 5, fill: '#F5A636', stroke: '#523D8A' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Insight */}
        <div className="lg:col-span-4 rounded-2xl bg-[#1A957E] text-white p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-white/20">
                <Lightbulb className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-white/80">Smart Insight</span>
            </div>
            <h3 className="font-heading font-black text-xl leading-snug">
              Your current supplier quote is{' '}
              <span className="text-yellow-300">8% higher</span> than the lowest comparable offer.
            </h3>
            <p className="text-sm text-white/70 mt-3 leading-relaxed">
              Apex Steel's lower delivery charge gives a better true landed cost vs. Jindal Alloys for MS Sheet 3mm.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('procurement')}
            className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-sm font-heading font-black transition-all"
          >
            View Comparison <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Alerts */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F5A636]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Alerts</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#1A957E] hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2.5 flex-1">
            <div
              onClick={() => setCurrentPage('invoices')}
              className="p-3 rounded-xl bg-rose-50 border border-rose-100 cursor-pointer hover:bg-rose-100 transition-colors flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">GST Document Missing</span>
                  <span className="text-[10px] text-slate-400 ml-2">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-500">Invoice #INV-1042</p>
              </div>
            </div>
            <div
              onClick={() => setCurrentPage('procurement')}
              className="p-3 rounded-xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors flex items-start gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Price Hike Alert</span>
                  <span className="text-[10px] text-slate-400 ml-2">4h ago</span>
                </div>
                <p className="text-[11px] text-slate-500">Steel prices up by 5%</p>
              </div>
            </div>
            <div
              onClick={() => setCurrentPage('quotations')}
              className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Quotation Ready</span>
                  <span className="text-[10px] text-slate-400 ml-2">5h ago</span>
                </div>
                <p className="text-[11px] text-slate-500">Order #Q-237</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Activity + Video + Invoices ───────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#F5A636]" />
            <h3 className="font-heading font-black text-sm text-[#1E1638]">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {(activities ?? [
              { icon: ShoppingCart, text: 'New supplier quotation added', sub: 'by You · 2m ago', color: '#523D8A' },
              { icon: Calculator, text: 'Costing analysis completed', sub: 'for Order #243 · 5m ago', color: '#1A957E' },
              { icon: FileText, text: 'Invoice processed', sub: 'INV-1042 · 10m ago', color: '#F5A636' },
            ]).slice(0, 3).map((a: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="p-1.5 rounded-lg shrink-0"
                  style={{ backgroundColor: (a.color ?? '#523D8A') + '18' }}
                >
                  {a.icon ? (
                    <a.icon className="w-3.5 h-3.5" style={{ color: a.color ?? '#523D8A' }} />
                  ) : (
                    <Zap className="w-3.5 h-3.5" style={{ color: a.color ?? '#523D8A' }} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{a.text ?? a.description}</p>
                  <p className="text-[11px] text-slate-400">{a.sub ?? a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Story Card */}
        <div
          onClick={() => setIsStoryModalOpen(true)}
          className="relative rounded-2xl overflow-hidden cursor-pointer group min-h-[160px]"
        >
          <img
            src="/ravi-workshop.jpg"
            alt="A day with ForgeFlow"
            className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-[#523D8A] ml-0.5" fill="#523D8A" />
            </div>
            <span className="text-white font-heading font-black text-sm">Watch Product Story</span>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1A957E]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Recent Invoices</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#1A957E] hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2.5">
            {(recentInvoices.length > 0 ? recentInvoices : [
              { id: 'INV-1042', date: 'Sun, Jun 15, 2025', status: 'Extracted' },
              { id: 'INV-1041', date: 'Fri, Jun 13, 2025', status: 'Verified' },
              { id: 'INV-1040', date: 'Wed, Jun 11, 2025', status: 'Pending' },
            ]).map((inv: any) => {
              const statusColor =
                inv.status === 'Verified' ? 'bg-emerald-100 text-emerald-700'
                : inv.status === 'Extracted' ? 'bg-blue-100 text-blue-700'
                : 'bg-amber-100 text-amber-700';
              return (
                <div
                  key={inv.id}
                  onClick={() => setCurrentPage('invoices')}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-xl px-2 py-1.5 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-100">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{inv.id}</p>
                      <p className="text-[10px] text-slate-400">{inv.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
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
