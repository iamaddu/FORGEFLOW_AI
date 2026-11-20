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
            <h1 className="font-heading font-black text-3xl text-white">Reports & Insights</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAD5C8] text-[#1E1736]">
              Spend & Margin Analytics
            </span>
          </div>
          <p className="text-xs text-[#E8E2F6] mt-1">
            Aggregate procurement expenditures, raw material price inflation, and order profitability margins across your plant.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-white border border-[#D2C6EA] text-xs font-bold text-slate-800 rounded-2xl px-3.5 py-2.5 focus:outline-none shadow-sm"
          >
            <option>H1 2025 (Jan - Jun)</option>
            <option>Q2 2025</option>
            <option>Financial Year 2024-25</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FAD5C8] hover:bg-[#f6c6b6] text-[#1E1736] text-xs font-heading font-black transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Row: Spend Over Time & Order Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spend Over Time */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-black text-base text-slate-900">
                Monthly Procurement Spend (INR)
              </h3>
              <p className="text-xs text-slate-500 font-medium">Total raw material purchasing volume</p>
            </div>
            <span className="font-heading font-black text-lg text-[#4E3C80]">
              ₹24.3L Total
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SPEND_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(val: any) => [formatINR(val), 'Spend']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D2C6EA', borderRadius: '16px', fontSize: '11px', color: '#1E1736' }}
                />
                <Bar dataKey="spend" fill="#4E3C80" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Profitability */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-black text-base text-slate-900">
                Manufacturing Order Profitability
              </h3>
              <p className="text-xs text-slate-500 font-medium">Production cost vs Gross profit realized</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
                <span>Cost</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>Profit</span>
              </span>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderProfitabilityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [formatINR(val), name === 'productionCost' ? 'Cost' : 'Profit']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D2C6EA', borderRadius: '16px', fontSize: '11px', color: '#1E1736' }}
                />
                <Bar dataKey="productionCost" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="grossProfit" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Commodity Spot Price Trends */}
      <div className="p-6 rounded-3xl bg-white text-[#1E1736] border-2 border-slate-100 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-black text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#EA580C]" />
              <span>Raw Material Spot Price Index (₹/kg)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Benchmark wholesale price fluctuations across Ferrous and Non-Ferrous commodities
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-1 bg-[#4E3C80] rounded" />
              <span>MS Steel</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-1 bg-[#F59E0B] rounded" />
              <span>SS 304</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-1 bg-[#8B5CF6] rounded" />
              <span>Aluminium 6061</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MATERIAL_TRENDS_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                formatter={(val: any) => [`₹${val}/kg`, '']}
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D2C6EA', borderRadius: '16px', fontSize: '11px', color: '#1E1736' }}
              />
              <Line type="monotone" dataKey="msSteel" stroke="#4E3C80" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="ss304" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="aluminium" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
