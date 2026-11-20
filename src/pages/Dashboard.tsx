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
  RotateCw,
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
import { Interactive3DMetalPart } from '../components/Interactive3DMetalPart';
import { Card3D } from '../components/Card3D';

// Premium Mini Area Sparkline with gradient fill and glow point
const MiniSparkline: React.FC<{ id: string; color: string; path: string; areaPath: string; endY: number }> = ({
  id,
  color,
  path,
  areaPath,
  endY,
}) => (
  <svg className="w-24 h-10 overflow-visible shrink-0" viewBox="0 0 100 32" fill="none">
    <defs>
      <linearGradient id={`grad-spark-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity={0.35} />
        <stop offset="100%" stopColor={color} stopOpacity={0.0} />
      </linearGradient>
    </defs>
    <path d={areaPath} fill={`url(#grad-spark-${id})`} />
    <path d={path} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="98" cy={endY} r="3" fill={color} />
    <circle cx="98" cy={endY} r="6" fill={color} opacity="0.3" />
  </svg>
);

export const Dashboard: React.FC = () => {
  const { user, setCurrentPage, invoices, activities, setIsStoryModalOpen } = useApp();
  const [timeRange, setTimeRange] = useState('Last 6 Months');

  const recentInvoices = invoices.slice(0, 3);
  const displayName = user?.name || 'Plant Owner';

  return (
    <div className="space-y-6 pb-12">

      {/* ── HERO BANNER with Precision Sheet Metal Fiber Laser Fabrication Photo ── */}
      <div className="relative rounded-3xl overflow-hidden min-h-[230px] flex items-center bg-gradient-to-r from-[#3E296C] via-[#523D8A] to-[#3E296C] border-2 border-white/20 shadow-2xl">
        {/* Ambient subtle light glow using Warm Mango Amber */}
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#F5A636]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10 max-w-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[#F8C8BE] text-xs sm:text-sm font-medium">Welcome back,</span>
            <span className="text-white text-xs sm:text-sm font-bold bg-white/20 border border-white/30 px-3 py-0.5 rounded-full shadow-sm">
              {displayName} 👋
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white leading-tight">
            Build Smarter.<br />
            <span className="text-[#F5A636]">
              Grow Stronger.
            </span>
          </h1>

          <p className="text-white/85 text-xs sm:text-sm mt-3 max-w-md leading-relaxed font-medium">
            AI-powered procurement &amp; costing for <span className="text-[#F8C8BE] font-bold">{user?.companyName}</span>. Compare quotes, protect margins &amp; quote profitably.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F5A636] hover:bg-[#e59524] text-[#1E1638] text-sm font-heading font-black transition-all shadow-[0_5px_0_#b87414,0_10px_20px_rgba(245,166,54,0.35)] active:translate-y-1 active:shadow-[0_1px_0_#b87414]"
            >
              <ShoppingCart className="w-4 h-4" />
              Compare Supplier Quotes
            </button>
            <button
              onClick={() => setCurrentPage('costing')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-sm font-heading font-bold transition-all border border-white/30 shadow-[0_4px_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none backdrop-blur-md"
            >
              <Calculator className="w-4 h-4 text-[#F8C8BE]" />
              Create Production Cost Sheet
            </button>
          </div>
        </div>

        {/* ── Interactive 3D Metal Fabrication Model Viewport ── */}
        <div className="absolute inset-0 flex items-stretch">
          <div className="flex-1" />
          <div className="w-full sm:w-7/12 relative pointer-events-auto">
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#523D8A] via-[#523D8A]/80 to-transparent z-10 pointer-events-none" />
            <Interactive3DMetalPart height={260} showTelemetry={true} />
          </div>
        </div>
      </div>

      {/* ── 4 KPI CARDS (Interactive 3D Perspective Tilt Cards) ─────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Spend (Royal Purple) */}
        <Card3D
          onClick={() => setCurrentPage('procurement')}
          className="p-5 bg-white/95 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.16)] border-2 border-white/80 flex flex-col justify-between text-[#1E1638]"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#EFEBF8] text-[#523D8A] shadow-inner">
              <Coins className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" /> 12%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E1638]">₹4.8L</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Total Procurement Spend</div>
            </div>
            <MiniSparkline
              id="spend"
              color="#523D8A"
              path="M0 24 Q 25 18, 50 22 T 98 8"
              areaPath="M0 24 Q 25 18, 50 22 T 98 8 L 98 32 L 0 32 Z"
              endY={8}
            />
          </div>
        </Card3D>

        {/* Card 2: Active Suppliers (Warm Mango Amber) */}
        <Card3D
          onClick={() => setCurrentPage('suppliers')}
          className="p-5 bg-white/95 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.16)] border-2 border-white/80 flex flex-col justify-between text-[#1E1638]"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#FEF3D6] text-amber-700 shadow-inner">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" /> 1 new
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E1638]">12</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Active Suppliers</div>
            </div>
            <MiniSparkline
              id="suppliers"
              color="#F5A636"
              path="M0 26 Q 30 20, 60 24 T 98 10"
              areaPath="M0 26 Q 30 20, 60 24 T 98 10 L 98 32 L 0 32 Z"
              endY={10}
            />
          </div>
        </Card3D>

        {/* Card 3: Orders in Progress (Soft Peach / Orange) */}
        <Card3D
          onClick={() => setCurrentPage('costing')}
          className="p-5 bg-white/95 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.16)] border-2 border-white/80 flex flex-col justify-between text-[#1E1638]"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-[#F8C8BE] text-orange-950 shadow-inner">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" /> 2 active
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E1638]">8</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Orders in Progress</div>
            </div>
            <MiniSparkline
              id="orders"
              color="#EA580C"
              path="M0 28 Q 35 15, 70 20 T 98 12"
              areaPath="M0 28 Q 35 15, 70 20 T 98 12 L 98 32 L 0 32 Z"
              endY={12}
            />
          </div>
        </Card3D>

        {/* Card 4: Estimated Profit Margin (Electric Teal / Emerald) */}
        <Card3D
          onClick={() => setCurrentPage('costing')}
          className="p-5 bg-white/95 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.16)] border-2 border-white/80 flex flex-col justify-between text-[#1E1638]"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 shadow-inner">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" /> 3% target
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#1E1638]">24%</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">Estimated Profit Margin</div>
            </div>
            <MiniSparkline
              id="margin"
              color="#10B981"
              path="M0 24 Q 40 16, 70 20 T 98 6"
              areaPath="M0 24 Q 40 16, 70 20 T 98 6 L 98 32 L 0 32 Z"
              endY={6}
            />
          </div>
        </Card3D>
      </div>

      {/* ── CHART + SMART INSIGHT + ALERTS ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Order Profitability Trend (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white shadow-card border-2 border-white/80 flex flex-col justify-between text-[#1E1638]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-[#EFEBF8] text-[#523D8A]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Order Profitability Trend</h3>
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

          <div className="flex items-center gap-4 text-xs mb-3 text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#523D8A]" />
              <span className="font-bold text-slate-800">Your Margin</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-slate-400 border-t border-dashed inline-block" />
              <span>Target (20%)</span>
            </span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROFITABILITY_TREND_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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

        {/* Smart Insight Card (PPT Soft Peach Slide Theme - lg:col-span-4) */}
        <div className="lg:col-span-4 rounded-3xl bg-[#F8C8BE] text-[#1E1638] border border-[#F5C5B8] p-6 flex flex-col justify-between shadow-card relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-2xl bg-white text-[#523D8A] shadow-sm">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="text-xs font-heading font-black tracking-widest uppercase text-[#523D8A]">
                Smart Procurement Insight
              </span>
            </div>

            <h3 className="font-heading font-black text-xl text-[#1E1638] leading-snug">
              Your current supplier quote is{' '}
              <span className="underline decoration-2 decoration-[#523D8A]">8% higher</span> than the lowest comparable offer.
            </h3>

            <p className="text-xs sm:text-sm text-slate-800 mt-3 leading-relaxed font-medium">
              Jindal Alloys quoted ₹48/kg for <strong>MS Sheet 3mm</strong>, but charges ₹1,500 freight. Apex Steel’s lower delivery charge yields a lower true landed cost!
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('procurement')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#523D8A] hover:bg-[#3E2C6B] text-white text-xs font-heading font-black transition-all shadow-md"
            >
              <span>View Landed Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#523D8A] bg-white/70 px-2.5 py-1 rounded-full shadow-sm">
              Save ₹2,400
            </span>
          </div>
        </div>

        {/* Alerts (lg:col-span-3) */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-white shadow-card border-2 border-white/80 flex flex-col justify-between text-[#1E1638]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F5A636]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Alerts</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#523D8A] hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="space-y-2.5 flex-1">
            <div
              onClick={() => setCurrentPage('invoices')}
              className="p-3 rounded-2xl bg-[#FEF2F2] border border-rose-200 cursor-pointer hover:bg-rose-100/60 transition-all flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>GST Document Missing</span>
                  <span className="text-[10px] text-slate-400 font-normal ml-2">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Invoice #INV-1042</p>
              </div>
            </div>

            <div
              onClick={() => setCurrentPage('procurement')}
              className="p-3 rounded-2xl bg-[#FEF3D6] border border-amber-200 cursor-pointer hover:bg-amber-100/60 transition-all flex items-start gap-2.5"
            >
              <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Price Hike Alert</span>
                  <span className="text-[10px] text-slate-400 font-normal ml-2">4h ago</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Steel prices up by 5%</p>
              </div>
            </div>

            <div
              onClick={() => setCurrentPage('quotations')}
              className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 cursor-pointer hover:bg-emerald-100/60 transition-all flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Quotation Ready</span>
                  <span className="text-[10px] text-slate-400 font-normal ml-2">5h ago</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">Order #Q-237</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: Recent Activity + Sheet Metal Works Video + Invoices ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <div className="p-6 rounded-3xl bg-white shadow-card border-2 border-white/80 text-[#1E1638]">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#F5A636]" />
            <h3 className="font-heading font-black text-sm text-[#1E1638]">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { icon: ShoppingCart, text: 'New supplier quotation added', sub: 'by You · 2m ago', color: '#523D8A' },
              { icon: Calculator, text: 'Costing analysis completed', sub: 'for Order #243 · 5m ago', color: '#16B8A5' },
              { icon: FileText, text: 'Invoice processed', sub: 'INV-1042 · 10m ago', color: '#F5A636' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="p-2.5 rounded-2xl shrink-0"
                  style={{
                    backgroundColor: `${a.color}18`,
                    color: a.color,
                  }}
                >
                  <a.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{a.text}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentic Sheet Metal Workshop Walkthrough Story Card */}
        <div
          onClick={() => setIsStoryModalOpen(true)}
          className="relative rounded-3xl overflow-hidden cursor-pointer group min-h-[160px] shadow-card border-2 border-white/80"
        >
          <img
            src="./sheet-metal-works.jpg"
            alt="Authentic Sheet Metal Manufacturing Workshop"
            className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/90 via-[#101827]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F5A636] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-[#101827] ml-0.5" fill="#101827" />
            </div>
            <div className="text-center px-4">
              <span className="text-white font-heading font-black text-sm block">A Day with ForgeFlow</span>
              <span className="text-[#F8C8BE] text-[11px] font-medium">Watch 4-step manufacturing walkthrough</span>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="p-6 rounded-3xl bg-white shadow-card border-2 border-white/80 text-[#1E1638]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#523D8A]" />
              <h3 className="font-heading font-black text-sm text-[#1E1638]">Recent Invoices</h3>
            </div>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-[#523D8A] hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2.5">
            {recentInvoices.map((inv) => {
              const statusBadge =
                inv.status === 'Verified' ? 'bg-emerald-100 text-emerald-800'
                : inv.status === 'Extracted' ? 'bg-[#EFEBF8] text-[#523D8A]'
                : 'bg-amber-100 text-amber-800';
              return (
                <div
                  key={inv.id}
                  onClick={() => setCurrentPage('invoices')}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-2xl px-2.5 py-2 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{inv.invoiceNumber}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{inv.supplierName.split(' ')[0]}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${statusBadge}`}>
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
