import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  PieChart as PieIcon,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';
import { SPEND_MONTHLY_DATA } from '../data/mockData';

const MATERIAL_TRENDS_DATA = [
  { month: 'Jan', msSteel: 47, ss304: 210, aluminium: 195 },
  { month: 'Feb', msSteel: 49, ss304: 215, aluminium: 198 },
  { month: 'Mar', msSteel: 52, ss304: 220, aluminium: 202 },
  { month: 'Apr', msSteel: 50, ss304: 218, aluminium: 200 },
  { month: 'May', msSteel: 51, ss304: 224, aluminium: 205 },
  { month: 'Jun', msSteel: 53, ss304: 228, aluminium: 210 },
];

export const Reports: React.FC = () => {
  const { costingOrders, invoices, showToast } = useApp();
  const [timeframe, setTimeframe] = useState('H1 2025');

  const orderProfitabilityData = costingOrders.map(o => ({
    name: o.orderNumber.replace('ORD-2025-', '#'),
    product: o.productName,
    productionCost: o.totalProductionCost,
    sellingPrice: o.suggestedSellingPrice,
    grossProfit: o.estimatedGrossProfit,
    margin: o.estimatedProfitMargin
  }));

  const handleExportCSV = () => {
    showToast('Exporting business intelligence summary to CSV...', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-bold text-2xl text-white">Reports & Insights</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#16B8A5]/20 text-[#16B8A5] border border-[#16B8A5]/30 uppercase">
              Spend & Margin Analytics
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Aggregate procurement expenditures, raw material price inflation, and order profitability margins across your plant.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-[#132032] border border-[#1C2E46] text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#16B8A5]"
          >
            <option>H1 2025 (Jan - Jun)</option>
            <option>Q2 2025</option>
            <option>Financial Year 2024-25</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#16B8A5] hover:bg-[#13A291] text-[#0A111D] text-xs font-heading font-bold transition-all shadow-glow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Row: Procurement Spend Over Time + Order Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spend Over Time (lg:col-span-6) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-sm text-white">
                Monthly Procurement Spend (INR)
              </h3>
              <p className="text-[11px] text-slate-400">Total raw material purchasing volume</p>
            </div>
            <span className="font-heading font-bold text-base text-[#16B8A5]">
              ₹24.3L Total
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SPEND_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2E46" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(val: any) => [formatINR(val), 'Spend']}
                  contentStyle={{ backgroundColor: '#132032', borderColor: '#1C2E46', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }}
                />
                <Bar dataKey="spend" fill="#16B8A5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Profitability Comparison (lg:col-span-6) */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-sm text-white">
                Manufacturing Order Profitability
              </h3>
              <p className="text-[11px] text-slate-400">Production cost vs Gross profit realized</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" />
                <span>Cost</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                <span>Profit</span>
              </span>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderProfitabilityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2E46" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [formatINR(val), name === 'productionCost' ? 'Cost' : 'Profit']}
                  contentStyle={{ backgroundColor: '#132032', borderColor: '#1C2E46', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }}
                />
                <Bar dataKey="productionCost" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar dataKey="grossProfit" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Material Price Inflation Trends */}
      <div className="p-5 rounded-2xl bg-[#101B2B] border border-[#1C2E46] shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-semibold text-sm text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E5A84B]" />
              <span>Raw Material Spot Price Index (₹/kg)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Benchmark wholesale price fluctuations across Ferrous and Non-Ferrous commodities
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-0.5 bg-[#16B8A5]" />
              <span>MS Steel (₹/kg)</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-0.5 bg-[#E5A84B]" />
              <span>SS 304 (₹/kg)</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-0.5 bg-[#A855F7]" />
              <span>Aluminium 6061 (₹/kg)</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MATERIAL_TRENDS_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2E46" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}/kg`, '']}
                contentStyle={{ backgroundColor: '#132032', borderColor: '#1C2E46', borderRadius: '12px', fontSize: '11px', color: '#F3F5F7' }}
              />
              <Line type="monotone" dataKey="msSteel" stroke="#16B8A5" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="ss304" stroke="#E5A84B" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="aluminium" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
